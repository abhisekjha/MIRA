import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import type { ChatSession, ChatExportOptions, ChatSearchQuery } from './types';

const STORAGE_KEY = 'mira_chat_sessions';

class ChatStorage {
  private sessions: Map<string, ChatSession> = new Map();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const sessions = JSON.parse(data);
        sessions.forEach((session: ChatSession) => {
          this.sessions.set(session.id, session);
        });
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
    }
  }

  private saveToStorage(): void {
    try {
      const data = Array.from(this.sessions.values());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving chat sessions:', error);
    }
  }

  public saveSession(session: ChatSession): void {
    this.sessions.set(session.id, {
      ...session,
      updatedAt: new Date().toISOString()
    });
    this.saveToStorage();
  }

  public getSession(id: string): ChatSession | undefined {
    return this.sessions.get(id);
  }

  public deleteSession(id: string): boolean {
    const deleted = this.sessions.delete(id);
    if (deleted) {
      this.saveToStorage();
    }
    return deleted;
  }

  public searchSessions(query: ChatSearchQuery): ChatSession[] {
    return Array.from(this.sessions.values()).filter(session => {
      if (query.text && !this.sessionMatchesText(session, query.text)) {
        return false;
      }
      if (query.tags && !this.sessionMatchesTags(session, query.tags)) {
        return false;
      }
      if (query.dateRange && !this.sessionInDateRange(session, query.dateRange)) {
        return false;
      }
      if (query.language && session.language !== query.language) {
        return false;
      }
      return true;
    });
  }

  private sessionMatchesText(session: ChatSession, text: string): boolean {
    const searchText = text.toLowerCase();
    return (
      session.title.toLowerCase().includes(searchText) ||
      session.messages.some(msg => msg.content.toLowerCase().includes(searchText))
    );
  }

  private sessionMatchesTags(session: ChatSession, tags: string[]): boolean {
    return tags.every(tag => session.tags.includes(tag));
  }

  private sessionInDateRange(
    session: ChatSession,
    dateRange: { start: string; end: string }
  ): boolean {
    const sessionDate = new Date(session.createdAt);
    return (
      sessionDate >= new Date(dateRange.start) &&
      sessionDate <= new Date(dateRange.end)
    );
  }

  public async exportSession(
    sessionId: string,
    options: ChatExportOptions
  ): Promise<Blob | null> {
    const session = this.getSession(sessionId);
    if (!session) return null;

    switch (options.format) {
      case 'pdf':
        return this.exportToPDF(session, options);
      case 'json':
        return this.exportToJSON(session, options);
      case 'txt':
        return this.exportToText(session, options);
      default:
        return null;
    }
  }

  private async exportToPDF(
    session: ChatSession,
    options: ChatExportOptions
  ): Promise<Blob> {
    const doc = new jsPDF();
    const title = `Chat Session: ${session.title}`;
    const date = format(new Date(session.createdAt), 'PPP');

    doc.setFontSize(20);
    doc.text(title, 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 20, 30);

    let y = 40;
    session.messages.forEach((msg, index) => {
      const text = `${msg.role}: ${msg.content}`;
      const lines = doc.splitTextToSize(text, 170);
      
      if (y + lines.length * 7 > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(lines, 20, y);
      y += lines.length * 7 + 5;
    });

    if (options.includeMetadata) {
      doc.addPage();
      doc.text('Metadata:', 20, 20);
      doc.text(`Duration: ${session.metadata.duration}ms`, 20, 30);
      doc.text(`Messages: ${session.metadata.messageCount}`, 20, 40);
      doc.text(`Language: ${session.metadata.language}`, 20, 50);
    }

    return doc.output('blob');
  }

  private exportToJSON(
    session: ChatSession,
    options: ChatExportOptions
  ): Blob {
    const data = options.includeMetadata ? session : {
      id: session.id,
      title: session.title,
      messages: session.messages,
      createdAt: session.createdAt,
    };

    return new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
  }

  private exportToText(
    session: ChatSession,
    options: ChatExportOptions
  ): Blob {
    let content = `Chat Session: ${session.title}\n`;
    content += `Date: ${format(new Date(session.createdAt), 'PPP')}\n\n`;

    session.messages.forEach((msg, index) => {
      content += `${msg.role}: ${msg.content}\n\n`;
    });

    if (options.includeMetadata) {
      content += '\nMetadata:\n';
      content += `Duration: ${session.metadata.duration}ms\n`;
      content += `Messages: ${session.metadata.messageCount}\n`;
      content += `Language: ${session.metadata.language}\n`;
    }

    return new Blob([content], { type: 'text/plain' });
  }
}

export const chatStorage = new ChatStorage();