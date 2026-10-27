'use client';

import { useState } from 'react';
import MathView from '@/components/MathView';
import { Database, Search, Filter, Plus, CheckCircle2, BookOpen, Layers } from 'lucide-react';

export default function QuestionBankPage() {
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const questions = [
    {
      id: 'q-101',
      subject: 'Physics',
      topic: 'Rotational Dynamics',
      class_grade: 'Class 11',
      difficulty: 'hard',
      statement: 'A uniform solid cylinder of mass M and radius R rolls without slipping down an inclined plane with inclination angle theta. Find its linear acceleration.',
      latex: 'a = \\frac{g \\sin \\theta}{1 + \\frac{I}{MR^2}} = \\frac{2}{3} g \\sin \\theta',
      marks: 4,
      negative_marks: 1,
      options: [
        { letter: 'A', text: 'g sin(theta)', correct: false },
        { letter: 'B', text: '(2/3) g sin(theta)', correct: true },
        { letter: 'C', text: '(1/2) g sin(theta)', correct: false },
        { letter: 'D', text: '(3/4) g sin(theta)', correct: false },
      ],
      explanation: 'Moment of inertia of solid cylinder about its central axis is (1/2)MR^2.',
    },
    {
      id: 'q-102',
      subject: 'Physics',
      topic: 'Gravitation',
      class_grade: 'Class 11',
      difficulty: 'medium',
      statement: 'Escape velocity from the surface of Earth is v_e. If a projectile is fired with speed 2 * v_e, calculate its asymptotic speed in deep interstellar space.',
      latex: 'v_\\infty = \\sqrt{v^2 - v_e^2} = \\sqrt{(2v_e)^2 - v_e^2} = \\sqrt{3} v_e',
      marks: 4,
      negative_marks: 1,
      options: [
        { letter: 'A', text: 'v_e', correct: false },
        { letter: 'B', text: 'sqrt(3) * v_e', correct: true },
        { letter: 'C', text: 'sqrt(2) * v_e', correct: false },
        { letter: 'D', text: '2 * v_e', correct: false },
      ],
      explanation: 'By conservation of total mechanical energy: (1/2) m v^2 - GMm/R = (1/2) m v_inf^2.',
    },
    {
      id: 'q-103',
      subject: 'Chemistry',
      topic: 'Electrochemistry',
      class_grade: 'Class 12',
      difficulty: 'medium',
      statement: 'Given standard reduction potentials E°(Cu2+/Cu) = +0.34 V and E°(Zn2+/Zn) = -0.76 V. What is the standard cell EMF of the Daniell cell?',
      latex: 'E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = 0.34 - (-0.76) = +1.10\\text{ V}',
      marks: 4,
      negative_marks: 1,
      options: [
        { letter: 'A', text: '+1.10 V', correct: true },
        { letter: 'B', text: '-1.10 V', correct: false },
        { letter: 'C', text: '+0.42 V', correct: false },
        { letter: 'D', text: '-0.42 V', correct: false },
      ],
      explanation: 'EMF = E_cathode - E_anode = 0.34 - (-0.76) = 1.10 V.',
    },
    {
      id: 'q-104',
      subject: 'Mathematics',
      topic: 'Definite Integrals',
      class_grade: 'Class 12',
      difficulty: 'hard',
      statement: 'Evaluate the definite integral of (sin^3(x) + cos^5(x)) between -pi and +pi:',
      latex: 'I = \\int_{-\\pi}^{\\pi} (\\sin^3 x + \\cos^5 x) dx',
      marks: 4,
      negative_marks: 1,
      options: [
        { letter: 'A', text: '0', correct: false },
        { letter: 'B', text: '16/15', correct: false },
        { letter: 'C', text: '32/15', correct: true },
        { letter: 'D', text: 'pi', correct: false },
      ],
      explanation: 'sin^3(x) is an odd function, so its integral is 0. cos^5(x) is even: 2 * integral from 0 to pi of cos^5(x).',
    },
  ];

  const filtered = questions.filter((q) => {
    const matchesSub = subjectFilter === 'All' || q.subject === subjectFilter;
    const matchesSearch = 
      q.statement.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.topic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSub && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Master Question Bank</h1>
          <p className="text-xs text-slate-500">
            Curated repository of competitive exam questions with verified KaTeX formulas
          </p>
        </div>
        <button
          onClick={() => alert('New Question Form: You can type text, paste LaTeX, and add options.')}
          className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4 text-teal-400" /> Add New Question
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by keyword, topic, or statement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Physics', 'Chemistry', 'Mathematics'].map((s) => (
            <button
              key={s}
              onClick={() => setSubjectFilter(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-all ${
                subjectFilter === s
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Grid */}
      <div className="space-y-4">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 hover:border-indigo-200 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-navy-900">{q.subject}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-500">{q.topic}</span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                  {q.class_grade}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  q.difficulty === 'hard' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {q.difficulty}
                </span>
                <span className="text-xs text-slate-400 font-semibold">[+{q.marks}, -{q.negative_marks}]</span>
              </div>
            </div>

            <div className="text-xs font-medium text-slate-800 leading-relaxed">
              {q.statement}
            </div>

            {q.latex && (
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-serif text-xs text-navy-950 overflow-x-auto">
                <MathView math={q.latex} block />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {q.options.map((opt) => (
                <div
                  key={opt.letter}
                  className={`p-2 rounded-lg border text-xs flex items-center gap-2 ${
                    opt.correct
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                      : 'bg-slate-50/50 border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="text-slate-400 font-bold">({opt.letter})</span>
                  <span>{opt.text}</span>
                  {opt.correct && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto shrink-0" />}
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-500 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
              <strong>Solution Explanation:</strong> {q.explanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
