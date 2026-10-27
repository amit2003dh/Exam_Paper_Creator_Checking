import { db } from '@/lib/db';
import { WhatsAppMessage } from '@/types';
import { randomUUID } from 'crypto';

export class WhatsAppRepository {
  async getMessages(instituteId: string, limit = 50): Promise<WhatsAppMessage[]> {
    return Array.from(db.whatsappMessages.values())
      .filter(m => m.institute_id === instituteId)
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
      .slice(0, limit);
  }

  async logMessage(instituteId: string, data: Omit<WhatsAppMessage, 'id' | 'institute_id' | 'created_at'>): Promise<WhatsAppMessage> {
    const id = `wa-${randomUUID()}`;
    const msg: WhatsAppMessage = {
      ...data,
      id,
      institute_id: instituteId,
      created_at: new Date().toISOString(),
    };
    db.whatsappMessages.set(id, msg);
    return msg;
  }

  async updateStatus(id: string, status: WhatsAppMessage['status'], metaId?: string): Promise<void> {
    const msg = db.whatsappMessages.get(id);
    if (msg) {
      msg.status = status;
      if (status === 'sent') msg.sent_at = new Date().toISOString();
      if (status === 'delivered') msg.delivered_at = new Date().toISOString();
      if (status === 'read') msg.read_at = new Date().toISOString();
      db.whatsappMessages.set(id, msg);
    }
  }
}
