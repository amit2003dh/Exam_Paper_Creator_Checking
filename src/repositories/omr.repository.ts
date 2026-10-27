import { db } from '@/lib/db';
import { OMRTemplate, OMRResult } from '@/types';
import { randomUUID } from 'crypto';

export class OMRRepository {
  async getTemplates(instituteId: string): Promise<OMRTemplate[]> {
    return Array.from(db.omrTemplates.values()).filter(t => t.institute_id === instituteId);
  }

  async getTemplateById(instituteId: string, id: string): Promise<OMRTemplate | null> {
    const t = db.omrTemplates.get(id);
    if (!t || t.institute_id !== instituteId) return null;
    return t;
  }

  async createTemplate(instituteId: string, data: Omit<OMRTemplate, 'id' | 'institute_id'>): Promise<OMRTemplate> {
    const id = `omr-tpl-${data.total_questions}-q-${Date.now()}`;
    const template: OMRTemplate = {
      ...data,
      id,
      institute_id: instituteId,
      created_at: new Date().toISOString(),
    };
    db.omrTemplates.set(id, template);
    return template;
  }

  async getResults(instituteId: string, paperId?: string): Promise<OMRResult[]> {
    let list = Array.from(db.omrResults.values()).filter(r => r.institute_id === instituteId);
    if (paperId) {
      list = list.filter(r => r.paper_id === paperId);
    }
    return list.sort((a, b) => (b.total_marks || 0) - (a.total_marks || 0));
  }

  async getResultById(instituteId: string, id: string): Promise<OMRResult | null> {
    const res = db.omrResults.get(id);
    if (!res || res.institute_id !== instituteId) return null;
    return res;
  }

  async saveResult(instituteId: string, data: Omit<OMRResult, 'id' | 'institute_id' | 'created_at'>): Promise<OMRResult> {
    const id = `res-${randomUUID()}`;
    const result: OMRResult = {
      ...data,
      id,
      institute_id: instituteId,
      created_at: new Date().toISOString(),
    };
    db.omrResults.set(id, result);
    return result;
  }

  async updateResult(instituteId: string, id: string, updates: Partial<OMRResult>): Promise<OMRResult | null> {
    const existing = await this.getResultById(instituteId, id);
    if (!existing) return null;
    const updated = { ...existing, ...updates };
    db.omrResults.set(id, updated);
    return updated;
  }
}
