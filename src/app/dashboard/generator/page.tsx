'use client';

import { useState } from 'react';
import MathView from '@/components/MathView';
import { 
  Sparkles, 
  FileText, 
  Image as ImageIcon, 
  Upload, 
  Printer, 
  Key, 
  Edit3, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  Columns, 
  Maximize2,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function QuestionPaperGeneratorPage() {
  const [tab, setTab] = useState<'text' | 'image' | 'whatsapp'>('text');
  const [formData, setFormData] = useState({
    title: 'JEE Advanced Physics & Chemistry Minor Test',
    class_grade: 'Class 11',
    subject: 'Physics',
    total_questions: 4,
    total_marks: 16,
    duration_minutes: 45,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    language: 'bilingual' as 'en' | 'hi' | 'bilingual',
    layout: 'dual_column' as 'single_column' | 'dual_column',
    raw_text: 'Extract questions on Rotational Motion, Moment of Inertia, and Gravitation for Class 11 JEE Advanced.',
    instructions: 'Each question carries +4 marks. -1 mark will be deducted for every incorrect response.',
  });

  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState<any>(null);
  const [editingQuestionIdx, setEditingQuestionIdx] = useState<number | null>(null);
  const [editStatement, setEditStatement] = useState('');
  const [editLatex, setEditLatex] = useState('');
  const [notification, setNotification] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotification('');

    try {
      const res = await fetch('/api/question-papers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          class_grade: formData.class_grade,
          subject: formData.subject,
          total_questions: Number(formData.total_questions),
          total_marks: Number(formData.total_marks),
          duration_minutes: Number(formData.duration_minutes),
          difficulty: formData.difficulty,
          language: formData.language,
          layout: formData.layout,
          raw_text: formData.raw_text,
          instructions: formData.instructions,
          source_type: tab,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Generation failed');
      }

      setPaper(data.data);
      setNotification('AI Question Paper generated with LaTeX formulas! Review questions below.');
    } catch (err: any) {
      alert(`Error generating paper: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = (qIdx: number) => {
    if (!paper) return;
    const updated = { ...paper };
    updated.questions[qIdx].content_text = editStatement;
    updated.questions[qIdx].content_latex = editLatex;
    setPaper(updated);
    setEditingQuestionIdx(null);
  };

  const handleDeleteQuestion = (qIdx: number) => {
    if (!paper) return;
    const updated = { ...paper };
    updated.questions.splice(qIdx, 1);
    updated.total_questions = updated.questions.length;
    updated.total_marks = updated.questions.reduce((sum: number, q: any) => sum + (q.marks || 4), 0);
    setPaper(updated);
  };

  const handleOpenPrint = (solutions = false) => {
    if (!paper) return;
    const url = `/api/question-papers/${paper.id}/pdf${solutions ? '?solutions=true' : ''}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">AI Question Paper Generator</h1>
          <p className="text-xs text-slate-500">
            Powered by Google Gemini 1.5 Flash Vision • LaTeX mathematical rendering & human verification
          </p>
        </div>

        {paper && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenPrint(false)}
              className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
            >
              <Printer className="w-4 h-4 text-teal-400" /> Export A4 Paper
            </button>
            <button
              onClick={() => handleOpenPrint(true)}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Key className="w-4 h-4 text-indigo-600" /> Answer Key & Solutions
            </button>
          </div>
        )}
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Generator Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Form & Inputs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {/* Input Method Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Input Mode</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTab('text')}
                className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  tab === 'text' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Text / Syllabus
              </button>
              <button
                type="button"
                onClick={() => setTab('image')}
                className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  tab === 'image' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" /> Notes Photo
              </button>
              <button
                type="button"
                onClick={() => setTab('whatsapp')}
                className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  tab === 'whatsapp' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" /> WhatsApp Bot
              </button>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Test Title</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Class / Grade</label>
                <select
                  value={formData.class_grade}
                  onChange={(e) => setFormData({ ...formData, class_grade: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="Class 9">Class 9th</option>
                  <option value="Class 10">Class 10th</option>
                  <option value="Class 11">Class 11th (JEE/NEET)</option>
                  <option value="Class 12">Class 12th (Board/Competitive)</option>
                  <option value="Class 12+">Class 12+ Dropper Target</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology (NEET)</option>
                  <option value="Science Foundation">Science Foundation</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Questions</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.total_questions}
                  onChange={(e) => setFormData({ ...formData, total_questions: parseInt(e.target.value) || 5 })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Min)</label>
                <input
                  type="number"
                  min="10"
                  max="360"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) || 60 })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                  className="w-full px-2 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard (JEE Adv)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Layout</label>
                <select
                  value={formData.layout}
                  onChange={(e) => setFormData({ ...formData, layout: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none"
                >
                  <option value="dual_column">Dual Column (Save Paper)</option>
                  <option value="single_column">Single Column (Standard)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none"
                >
                  <option value="bilingual">Bilingual (English + Hindi)</option>
                  <option value="en">English Only</option>
                  <option value="hi">Hindi Only</option>
                </select>
              </div>
            </div>

            {/* Tab conditional input */}
            {tab === 'text' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Prompt / Syllabus Topics / Questions Text</label>
                <textarea
                  rows={4}
                  value={formData.raw_text}
                  onChange={(e) => setFormData({ ...formData, raw_text: e.target.value })}
                  placeholder="Paste questions or list chapters: e.g. Rotational dynamics, angular momentum conservation..."
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                ></textarea>
              </div>
            )}

            {tab === 'image' && (
              <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-2 bg-slate-50">
                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-xs font-semibold text-slate-700">Upload Handwritten Notes / Textbook Photo</div>
                <div className="text-[11px] text-slate-400">Supports JPG, PNG, WEBP up to 10MB</div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={() => alert('Photo selected! Gemini Flash Vision will parse the equations.')}
                  className="text-xs text-slate-500 mx-auto block pt-1"
                />
              </div>
            )}

            {tab === 'whatsapp' && (
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs space-y-1">
                <div className="font-bold">WhatsApp Inbound Bot Active</div>
                <div>Teachers can message our registered WhatsApp number directly with:</div>
                <div className="font-mono bg-white p-2 rounded border border-teal-200 text-teal-950 mt-1">
                  "Generate 20-Q physics test for class 12"
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-teal-400" />
                  Generating with Gemini Flash & LaTeX...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  Generate Exam Paper
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Live Paper Preview & Human Verification Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-navy-900">
                  {paper ? paper.title : 'Live Paper Preview & Verification'}
                </h2>
                <div className="text-xs text-slate-500">
                  {paper ? `${paper.questions?.length || 0} Questions • ${paper.total_marks} Marks • Layout: ${paper.layout}` : 'Generate a paper to inspect KaTeX equations and options'}
                </div>
              </div>

              {paper && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Verification Stage
                  </span>
                </div>
              )}
            </div>

            {/* Questions List */}
            {paper ? (
              <div className="space-y-6">
                {(paper.questions || []).map((q: any, idx: number) => {
                  const isEditing = editingQuestionIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-navy-900">
                          Q.{idx + 1} [{q.marks} Marks, -{q.negative_marks}]
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingQuestionIdx(idx);
                              setEditStatement(q.content_text);
                              setEditLatex(q.content_latex || '');
                            }}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 rounded hover:bg-slate-100"
                            title="Edit question statement or LaTeX"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(idx)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 rounded hover:bg-slate-100"
                            title="Delete question"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Editing modal inline */}
                      {isEditing ? (
                        <div className="space-y-3 bg-white p-3 rounded-lg border border-indigo-200">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Statement</label>
                            <textarea
                              rows={2}
                              value={editStatement}
                              onChange={(e) => setEditStatement(e.target.value)}
                              className="w-full p-2 text-xs border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">LaTeX Equation</label>
                            <input
                              type="text"
                              value={editLatex}
                              onChange={(e) => setEditLatex(e.target.value)}
                              className="w-full p-2 text-xs border rounded border-slate-300 font-mono"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveEdit(idx)}
                              className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-semibold"
                            >
                              Save Verification
                            </button>
                            <button
                              onClick={() => setEditingQuestionIdx(null)}
                              className="px-3 py-1 bg-slate-200 text-slate-700 rounded text-xs font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Statement */}
                          <div className="text-xs text-slate-800 font-medium leading-relaxed">
                            {q.content_text}
                          </div>

                          {/* KaTeX Math View */}
                          {q.content_latex && (
                            <div className="p-2.5 bg-slate-100/70 rounded-lg border border-slate-200 text-xs overflow-x-auto text-navy-950 font-serif">
                              <MathView math={q.content_latex} block />
                            </div>
                          )}

                          {/* Options */}
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {(q.options || []).map((opt: any) => (
                              <div
                                key={opt.option_letter}
                                className={`p-2 rounded-lg border text-xs flex items-center gap-2 ${
                                  opt.is_correct
                                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-semibold'
                                    : 'bg-white border-slate-200 text-slate-700'
                                }`}
                              >
                                <span className="font-bold text-slate-500">({opt.option_letter})</span>
                                <span className="truncate">{opt.option_text}</span>
                                {opt.option_latex && (
                                  <MathView math={opt.option_latex} className="text-[11px] text-indigo-700 ml-1" />
                                )}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 space-y-3">
                <FileText className="w-12 h-12 mx-auto text-slate-300" />
                <div className="text-sm font-semibold">No active question paper generated yet</div>
                <p className="text-xs max-w-sm mx-auto">
                  Configure your exam parameters on the left and click "Generate Exam Paper" to start.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
