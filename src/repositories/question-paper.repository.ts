import { db } from '@/lib/db';
import { QuestionPaper, Question } from '@/types';
import { randomUUID } from 'crypto';

export class QuestionPaperRepository {
  async getByInstitute(instituteId: string): Promise<QuestionPaper[]> {
    return Array.from(db.questionPapers.values())
      .filter(p => p.institute_id === instituteId)
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  }

  async getById(instituteId: string, id: string): Promise<QuestionPaper | null> {
    const paper = db.questionPapers.get(id);
    if (!paper || paper.institute_id !== instituteId) return null;
    return paper;
  }

  async create(instituteId: string, data: Omit<QuestionPaper, 'id' | 'institute_id' | 'created_at'>): Promise<QuestionPaper> {
    const id = randomUUID();
    const paper: QuestionPaper = {
      ...data,
      id,
      institute_id: instituteId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    db.questionPapers.set(id, paper);
    return paper;
  }

  async update(instituteId: string, id: string, updates: Partial<QuestionPaper>): Promise<QuestionPaper | null> {
    const existing = await this.getById(instituteId, id);
    if (!existing) return null;
    const updated: QuestionPaper = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    db.questionPapers.set(id, updated);
    return updated;
  }

  async delete(instituteId: string, id: string): Promise<boolean> {
    const existing = await this.getById(instituteId, id);
    if (!existing) return false;
    db.questionPapers.delete(id);
    return true;
  }

  // Master Question Bank
  async getQuestionsByInstitute(instituteId: string, subject?: string): Promise<Question[]> {
    const list = Array.from(db.questions.values()).filter(q => q.institute_id === instituteId);
    return list;
  }

  async addQuestion(instituteId: string, question: Omit<Question, 'id' | 'institute_id' | 'created_at'>): Promise<Question> {
    const id = randomUUID();
    const newQ: Question = {
      ...question,
      id,
      institute_id: instituteId,
      created_at: new Date().toISOString(),
    };
    db.questions.set(id, newQ);
    return newQ;
  }
}
