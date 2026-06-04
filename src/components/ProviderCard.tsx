import type { MockProvider } from '../types/service';

interface Props {
  provider: MockProvider;
  onBook: () => void;
}

export default function ProviderCard({ provider, onBook }: Props) {
  const stars = '★'.repeat(Math.floor(provider.rating)) + '☆'.repeat(5 - Math.floor(provider.rating));

  return (
    <div className="card border border-gray-100 hover:shadow-card-hover transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-gray-900 text-lg">{provider.name}</h4>
            <span className="text-xs px-2 py-0.5 bg-blue-gray-100 text-gray-600 rounded-full">{provider.type}</span>
            {provider.supportsLTC && (
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">支持长护险</span>
            )}
            {provider.supportsSubsidy && (
              <span className="text-xs px-2 py-0.5 bg-care-100 text-care-700 rounded-full">支持补贴咨询</span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{provider.address}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 flex-wrap">
            <span>📍 {provider.distance}km</span>
            <span className="text-warm-500">{stars} {provider.rating}</span>
            <span>🕐 {provider.availableTime}</span>
          </div>
          <p className="text-sm text-gray-700 mt-1">
            <strong>参考费用：</strong>
            {provider.estimatedCost}
          </p>
          <p className="text-sm text-gray-500">📞 {provider.phone}</p>
        </div>
        <button onClick={onBook} className="btn btn-primary whitespace-nowrap">
          预约参考
        </button>
      </div>
    </div>
  );
}
