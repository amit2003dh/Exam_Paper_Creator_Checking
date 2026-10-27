import { db } from '@/lib/db';
import { Institute } from '@/types';

export class InstituteRepository {
  async getById(id: string): Promise<Institute | null> {
    return db.institutes.get(id) || null;
  }

  async getAll(): Promise<Institute[]> {
    return Array.from(db.institutes.values());
  }

  async update(id: string, updates: Partial<Institute>): Promise<Institute | null> {
    const existing = db.institutes.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...updates, updated_at: new Date().toISOString() };
    db.institutes.set(id, updated);
    return updated;
  }
}
