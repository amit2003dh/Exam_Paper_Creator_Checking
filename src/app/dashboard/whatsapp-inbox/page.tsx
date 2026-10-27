'use client';

import { useEffect, useState } from 'react';
import { Inbox, CheckCheck, Clock, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';

export default function WhatsAppInboxPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      const res = await fetch('/api/whatsapp/messages');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">WhatsApp Dispatch Inbox & Audit Log</h1>
          <p className="text-xs text-slate-500">
            Real-time delivery receipts, read status webhooks, and teacher bot conversation logs
          </p>
        </div>

        <button
          onClick={loadMessages}
          className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 text-indigo-600" /> Refresh Inbox
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Recipient Phone</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Message Snippet</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {messages.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-navy-900">{m.recipient_phone}</td>
                  <td className="py-3.5 px-4">
                    <span className="capitalize px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {m.message_type?.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-sm truncate text-slate-600 font-normal">
                    {m.content_preview}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                      <CheckCheck className="w-3.5 h-3.5 text-teal-600" />
                      {m.status?.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-400 font-mono text-[10px]">
                    {new Date(m.created_at || Date.now()).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
