import { useEffect, useRef, useState, useMemo } from 'react';
import type { MockProvider } from '../types/service';
import { getUserLocation, scatterNearby } from '../utils/geo';
import type { UserLocation } from '../utils/geo';

interface Props {
  providers: MockProvider[];
  userLocation?: UserLocation | null;
}

const AMAP_KEY = import.meta.env.VITE_AMAP_KEY as string | undefined;
const HAS_REAL_KEY = !!(AMAP_KEY && AMAP_KEY !== 'your_amap_key_here');

export default function NearbyProviderMap({ providers, userLocation }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);

  const positionedProviders = useMemo(() => {
    if (!userLocation || userLocation.source === 'fallback') return providers;
    return scatterNearby(providers, userLocation.lng, userLocation.lat);
  }, [providers, userLocation]);

  const locLoading = !userLocation;

  useEffect(() => {
    if (!HAS_REAL_KEY || providers.length === 0) return;
    if (!userLocation) return;

    let cancelled = false;

    const initMap = async () => {
      try {
        const AMapLoader = (await import('@amap/amap-jsapi-loader')).default;
        const AMap = await AMapLoader.load({
          key: AMAP_KEY,
          version: '2.0',
        });

        if (cancelled || !mapRef.current) return;

        const useRealLoc = userLocation.source !== 'fallback';
        const centerLng = useRealLoc ? userLocation.lng : positionedProviders.reduce((s, p) => s + p.lng, 0) / positionedProviders.length;
        const centerLat = useRealLoc ? userLocation.lat : positionedProviders.reduce((s, p) => s + p.lat, 0) / positionedProviders.length;

        const map = new AMap.Map(mapRef.current, {
          zoom: 13,
          center: [centerLng, centerLat],
          viewMode: '2D',
        });

        map.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
          map.addControl(new AMap.ToolBar({ position: 'RT' }));
          map.addControl(new AMap.Scale({ position: 'LB' }));
        });

        // User location marker
        const userMarkerEl = document.createElement('div');
        userMarkerEl.innerHTML =
          '<div style="background:#3b82f6;border:3px solid #fff;border-radius:50%;width:18px;height:18px;box-shadow:0 0 8px rgba(59,130,246,0.5);animation:pulse 2s infinite;"></div><style>@keyframes pulse{0%,100%{box-shadow:0 0 8px rgba(59,130,246,0.5)}50%{box-shadow:0 0 20px rgba(59,130,246,0.9)}}</style>';

        const userMarker = new AMap.Marker({
          position: [centerLng, centerLat],
          content: userMarkerEl,
          anchor: 'center',
          title: useRealLoc ? '您的位置' : '您的位置（模拟）',
          zIndex: 100,
        });
        map.add(userMarker);

        const userLabelMarker = new AMap.Marker({
          position: [centerLng, centerLat],
          content: `<div style="background:rgba(255,255,255,0.9);padding:2px 8px;border-radius:4px;font-size:12px;font-weight:bold;color:#3b82f6;white-space:nowrap;border:1px solid #3b82f6;transform:translateY(-22px)">${
            useRealLoc ? '您的位置' : '您的位置（模拟）'
          }</div>`,
          anchor: 'center',
          zIndex: 99,
        });
        map.add(userLabelMarker);

        // Provider markers with repositioned coordinates near user
        positionedProviders.forEach((p, i) => {
          const tagHtml =
            (p.supportsLTC
              ? '<span style="display:inline-block;margin-top:4px;padding:2px 6px;background:#dbeafe;color:#1d4ed8;font-size:11px;border-radius:4px;">支持长护险</span>'
              : '') +
            (p.supportsSubsidy
              ? '<span style="display:inline-block;margin-top:4px;padding:2px 6px;background:#dcfce7;color:#15803d;font-size:11px;border-radius:4px;margin-left:4px;">支持补贴咨询</span>'
              : '');

          const content = `<div style="background:#fff;border:2px solid #f97316;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;color:#f97316;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.2)">${i + 1}</div>`;

          const marker = new AMap.Marker({
            position: [p.lng, p.lat],
            content,
            anchor: 'center',
            zIndex: 50,
          });

          const infoWin = new AMap.InfoWindow({
            content: `
              <div style="padding:8px 12px;max-width:240px;">
                <p style="font-weight:bold;font-size:14px;margin:0 0 4px;">${p.name}</p>
                <p style="font-size:12px;color:#666;margin:0 0 2px;">${p.type} · ~${p.distance}km</p>
                <p style="font-size:12px;color:#666;margin:0 0 2px;">⭐ ${p.rating} · ${p.estimatedCost}</p>
                <p style="font-size:12px;color:#666;margin:0;">📞 ${p.phone}</p>
                ${tagHtml}
              </div>
            `,
            offset: new AMap.Pixel(0, -35),
          });

          marker.on('click', () => {
            infoWin.open(map, marker.getPosition());
          });

          map.add(marker);
        });

        map.setFitView(null, false, [80, 80, 80, 80]);

        mapInstanceRef.current = { map };
        setMapReady(true);
      } catch {
        if (!cancelled) setMapError(true);
      }
    };

    initMap();

    return () => {
      cancelled = true;
      const instance = mapInstanceRef.current as { map?: { destroy: () => void } } | null;
      if (instance?.map) {
        instance.map.destroy();
      }
      mapInstanceRef.current = null;
    };
  }, [positionedProviders, userLocation]);

  // --- Mock map fallback ---
  if (!HAS_REAL_KEY || mapError) {
    return (
      <div className="bg-blue-gray-100 rounded-xl overflow-hidden border border-gray-200">
        <div className="bg-primary-500 text-white px-4 py-2 text-sm flex items-center justify-between">
          <span>📍 附近服务提供方分布参考（{mapError ? '地图加载失败，使用演示' : '演示'}地图）</span>
          <span className="text-xs opacity-75">
            {mapError ? '请检查 API Key 配置' : '配置 VITE_AMAP_KEY 以启用真实地图'}
          </span>
        </div>
        <MockMapView providers={providers} />
        <div className="bg-white px-4 py-3">
          <ProviderLegend providers={providers} />
          <p className="text-xs text-gray-400 mt-3">
            {mapError
              ? '高德地图加载失败，请确认 VITE_AMAP_KEY 有效且已开通 Web API 服务。当前使用演示地图。'
              : '如需接入真实地图，请创建 .env 文件并配置 VITE_AMAP_KEY（高德地图 Web JS API Key）。获取方式：https://lbs.amap.com/api/javascript-api-v2/summary'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-gray-100 rounded-xl overflow-hidden border border-gray-200">
      <div className="bg-primary-500 text-white px-4 py-2 text-sm flex items-center justify-between">
        <span>📍 附近服务提供方分布（高德地图）</span>
        <span className="text-xs opacity-75">
          {locLoading
            ? '正在定位...'
            : userLocation?.source === 'gps'
              ? '已定位 · 机构已分布至您附近'
              : '使用演示坐标'}
          {' · '}{positionedProviders.length} 个服务提供方
        </span>
      </div>

      <div
        ref={mapRef}
        className="w-full h-72"
        style={{ background: mapReady ? undefined : '#f5f0e8' }}
      />

      {!mapReady && (
        <div className="h-72 flex items-center justify-center bg-[#f5f0e8] text-gray-400">
          <div className="text-center">
            <p className="text-3xl mb-2">🗺️</p>
            <p>地图加载中{locLoading ? '，正在获取您的位置...' : '...'}</p>
          </div>
        </div>
      )}

      <div className="bg-white px-4 py-3">
        <ProviderLegend providers={positionedProviders} />
      </div>
    </div>
  );
}

function MockMapView({ providers }: { providers: MockProvider[] }) {
  if (providers.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-400 bg-[#f5f0e8]">
        <p>暂无位置数据</p>
      </div>
    );
  }

  const centerLat = providers.reduce((s, p) => s + p.lat, 0) / providers.length;
  const centerLng = providers.reduce((s, p) => s + p.lng, 0) / providers.length;

  return (
    <div className="relative h-56 bg-[#f5f0e8] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="absolute w-4 h-4 bg-primary-500 border-2 border-white rounded-full shadow z-10 animate-pulse"
        style={{ left: '48%', top: '48%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-primary-700 bg-white/80 px-1.5 rounded">
          您的位置（模拟）
        </div>
      </div>
      {providers.map((p, i) => {
        const left = 15 + ((p.lng - centerLng) * 2000 + i * 12) % 70;
        const top = 15 + ((p.lat - centerLat) * 2000 + i * 10) % 70;
        return (
          <div
            key={p.id}
            className="absolute z-10 group"
            style={{ left: `${Math.max(5, Math.min(85, left))}%`, top: `${Math.max(5, Math.min(80, top))}%` }}
          >
            <div className="w-6 h-6 bg-warm-500 border-2 border-white rounded-full shadow flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-125 transition-transform">
              {i + 1}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block">
              <div className="bg-white shadow-lg rounded-lg px-2 py-1 text-xs whitespace-nowrap border border-gray-200">
                <p className="font-bold text-gray-800">{p.name}</p>
                <p className="text-gray-500">{p.distance}km · {p.estimatedCost}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="absolute bottom-2 right-2 bg-white/90 rounded-lg px-2 py-1 text-xs text-gray-500 shadow">
        <span className="inline-block w-2.5 h-2.5 bg-primary-500 rounded-full mr-1" /> 您的位置
        <span className="inline-block w-2.5 h-2.5 bg-warm-500 rounded-full ml-2 mr-1" /> 服务提供方
      </div>
    </div>
  );
}

function ProviderLegend({ providers }: { providers: MockProvider[] }) {
  return (
    <>
      <p className="text-sm text-gray-500 mb-2">参考排序：综合评分、距离和支持政策（机构位置已根据您的定位重新分布）</p>
      <div className="flex flex-wrap gap-1.5">
        {providers.map((p, i) => (
          <span
            key={p.id}
            className="inline-flex items-center gap-1 text-xs text-gray-600 bg-blue-gray-50 px-2 py-1 rounded-full"
          >
            <span className="w-4 h-4 bg-warm-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
              {i + 1}
            </span>
            {p.name}
            <span className="text-gray-400">(~{p.distance}km)</span>
          </span>
        ))}
      </div>
    </>
  );
}
