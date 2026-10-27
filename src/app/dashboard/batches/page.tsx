'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Plus, Users, Clock, Calendar, CheckCircle2 } from 'lucide-react';

export default function BatchesPage() {
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    class_grade: 'Class 11',
    stream: 'Science-JEE',
    timing: '07:30 AM - 01:00 PM',
  });
  const [notification, setNotification] = useState('');

  const loadBatches = async () => {
    try {
      const res = await fetch('/api/batches');
      const data = await res.json();
      if (data.success) {
        setBatches(data.data);
      }
    } catch (err) {
      console.error('Error loading batches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  const handleAddBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setNotification(`Batch "${formData.name}" created successfully!`);
        setShowAddModal(false);
        setFormData({ name: '', class_grade: 'Class 11', stream: 'Science-JEE', timing: '07:30 AM - 01:00 PM' });
        loadBatches();
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Batches & Sections</h1>
          <p className="text-xs text-slate-500">
            Class timetables, student assignments, and faculty schedules
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4 text-teal-400" /> Create New Batch
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {batches.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-teal-50 text-teal-700 border border-teal-200">
                  {b.class_grade}
                </span>
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  {b.stream}
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-navy-900">{b.name}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>{b.timing || 'Morning Shift'}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{b.students_count || 3} Students</span>
              </span>
              <span className="text-emerald-700 font-bold text-[11px]">Active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Batch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-navy-900">Create Academic Batch</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleAddBatch} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Batch Title</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  placeholder="e.g. JEE Main 2027 Dropper Batch"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Class</label>
                  <select
                    value={formData.class_grade}
                    onChange={(e) => setFormData({ ...formData, class_grade: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  >
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Class 12+">Class 12+ Droppers</option>
                    <option value="Class 10">Class 10 Foundation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Stream</label>
                  <select
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  >
                    <option value="Science-JEE">Science-JEE</option>
                    <option value="Medical-NEET">Medical-NEET</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Daily Schedule / Timing</label>
                <input
                  type="text"
                  value={formData.timing}
                  onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  placeholder="07:30 AM - 01:00 PM"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs">
                  Save Batch
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
