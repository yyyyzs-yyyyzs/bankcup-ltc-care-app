import { useState, useEffect } from 'react';
import type { BoundProfile } from '../types/service';

const STORAGE_KEY = 'elderly_care_profile';

function loadProfile(): BoundProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // corrupted data
  }
  return null;
}

function saveProfile(profile: BoundProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const emptyForm: BoundProfile = {
  name: '',
  age: '',
  phone: '',
  city: '',
  address: '',
  emergencyContact: '',
  emergencyPhone: '',
  isLivingAlone: '',
  hasLTCInsurance: '',
  mainCareNeeds: '',
  medicalHistory: '',
};

export default function ProfileBindingPanel({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<BoundProfile>(emptyForm);
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const existing = loadProfile();
      if (existing) setForm(existing);
      else setForm(emptyForm);
      setSaved(false);
      setShowDeleteConfirm(false);
    }
  }, [isOpen]);

  const handleChange = (field: keyof BoundProfile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    saveProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    localStorage.removeItem(STORAGE_KEY);
    setForm(emptyForm);
    setShowDeleteConfirm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-heading font-bold text-gray-900">👤 绑定用户信息（本机存储）</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-2">
              ✕
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Basic info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="请输入姓名"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">年龄</label>
              <input
                type="text"
                value={form.age}
                onChange={(e) => handleChange('age', e.target.value)}
                placeholder="请输入年龄"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="请输入电话"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">所在城市</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="如：北京市"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">详细地址</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="请输入详细地址（不对外传输）"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400"
            />
          </div>

          {/* Emergency contact */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">紧急联系人</label>
              <input
                type="text"
                value={form.emergencyContact}
                onChange={(e) => handleChange('emergencyContact', e.target.value)}
                placeholder="请输入紧急联系人"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">紧急联系电话</label>
              <input
                type="text"
                value={form.emergencyPhone}
                onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                placeholder="请输入紧急联系电话"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400"
              />
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">居住情况</label>
              <select
                value={form.isLivingAlone}
                onChange={(e) => handleChange('isLivingAlone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400 bg-white"
              >
                <option value="">请选择</option>
                <option value="alone">独居</option>
                <option value="spouse">与配偶同住</option>
                <option value="children">与子女同住</option>
                <option value="other">其他</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">长护险状态</label>
              <select
                value={form.hasLTCInsurance}
                onChange={(e) => handleChange('hasLTCInsurance', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400 bg-white"
              >
                <option value="">请选择</option>
                <option value="yes">已参保</option>
                <option value="no">未参保</option>
                <option value="unknown">不清楚</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">主要照护需求</label>
            <textarea
              value={form.mainCareNeeds}
              onChange={(e) => handleChange('mainCareNeeds', e.target.value)}
              placeholder="请简要描述主要照护需求"
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">既往病史</label>
            <textarea
              value={form.medicalHistory}
              onChange={(e) => handleChange('medicalHistory', e.target.value)}
              placeholder="请简要描述既往病史（仅保存在本机）"
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400 resize-none"
            />
          </div>

          {/* Privacy notice */}
          <div className="bg-blue-gray-50 rounded-xl p-3 text-xs text-gray-500">
            <p>🔒 所有信息仅保存在您的设备本地（localStorage），不会上传至任何服务器。本页面为比赛演示原型，不收集任何真实个人信息。关闭浏览器后数据仍保留在本机，可随时删除。</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div>
              {localStorage.getItem(STORAGE_KEY) && !showDeleteConfirm && (
                <button onClick={() => setShowDeleteConfirm(true)} className="text-sm text-red-500 hover:text-red-700">
                  删除已绑定信息
                </button>
              )}
              {showDeleteConfirm && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-red-600">确认删除？</span>
                  <button onClick={handleDelete} className="text-sm text-red-500 font-bold">
                    确认
                  </button>
                  <button onClick={() => setShowDeleteConfirm(false)} className="text-sm text-gray-400">
                    取消
                  </button>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={onClose} className="btn bg-gray-100 text-gray-600 hover:bg-gray-200">
                关闭
              </button>
              <button onClick={handleSave} className="btn btn-primary">
                {saved ? '已保存 ✓' : '保存信息'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { loadProfile };
