import { db } from '@/lib/db';
import { Batch } from '@/types';
import { randomUUID } from 'crypto';

export class BatchRepository {
  async getByInstitute(instituteId: string): Promise<Batch[]> {
    return Array.from(db.batches.values()).filter(b => b.institute_id === instituteId && b.is_active);
  }

  async getById(instituteId: string, id: string): Promise<Batch | null> {
    const batch = db.batches.get(id);
    if (!batch || batch.institute_id !== instituteId) return null;
    return batch;
  }

  async create(instituteId: string, data: Omit<Batch, 'id' | 'institute_id' | 'created_at'>): Promise<Batch> {
    const id = randomUUID();
    const batch: Batch = {
      ...data,
      id,
      institute_id: instituteId,
      students_count: 0,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    db.batches.set(id, batch);
    return batch;
  }
}
