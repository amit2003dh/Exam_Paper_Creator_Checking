import { db } from '@/lib/db';
import { Student } from '@/types';
import { randomUUID } from 'crypto';

export class StudentRepository {
  async getByInstitute(instituteId: string, search?: string): Promise<Student[]> {
    const list = Array.from(db.students.values()).filter(s => s.institute_id === instituteId && s.is_active);
    if (!search) return list;
    const lower = search.toLowerCase();
    return list.filter(s => 
      s.full_name.toLowerCase().includes(lower) || 
      s.roll_number.toLowerCase().includes(lower) ||
      (s.phone && s.phone.includes(lower)) ||
      (s.parent_phone && s.parent_phone.includes(lower))
    );
  }

  async getById(instituteId: string, id: string): Promise<Student | null> {
    const student = db.students.get(id);
    if (!student || student.institute_id !== instituteId) return null;
    return student;
  }

  async getByRollNumber(instituteId: string, rollNumber: string): Promise<Student | null> {
    for (const student of Array.from(db.students.values())) {
      if (student.institute_id === instituteId && student.roll_number.toLowerCase() === rollNumber.toLowerCase()) {
        return student;
      }
    }
    return null;
  }

  async create(instituteId: string, data: Omit<Student, 'id' | 'institute_id' | 'created_at'>): Promise<Student> {
    const id = randomUUID();
    const student: Student = {
      ...data,
      id,
      institute_id: instituteId,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    db.students.set(id, student);
    return student;
  }

  async update(instituteId: string, id: string, updates: Partial<Student>): Promise<Student | null> {
    const existing = await this.getById(instituteId, id);
    if (!existing) return null;
    const updated: Student = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    db.students.set(id, updated);
    return updated;
  }

  async delete(instituteId: string, id: string): Promise<boolean> {
    const existing = await this.getById(instituteId, id);
    if (!existing) return false;
    existing.is_active = false;
    db.students.set(id, existing);
    return true;
  }
}
