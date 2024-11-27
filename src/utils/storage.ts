import { nanoid } from 'nanoid';

export interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  referredBy?: string;
  position: number;
  joinedAt: string;
  referralCount: number;
}

class WaitlistStorage {
  private readonly STORAGE_KEY = 'mira_waitlist';

  getAll(): WaitlistEntry[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  add(name: string, email: string, referredBy?: string): WaitlistEntry {
    const entries = this.getAll();
    const position = entries.length + 1;
    
    const entry: WaitlistEntry = {
      id: nanoid(),
      name,
      email,
      referralCode: nanoid(8),
      referredBy,
      position,
      joinedAt: new Date().toISOString(),
      referralCount: 0
    };

    entries.push(entry);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));

    if (referredBy) {
      this.incrementReferralCount(referredBy);
    }

    return entry;
  }

  getByEmail(email: string): WaitlistEntry | undefined {
    return this.getAll().find(entry => entry.email === email);
  }

  getByReferralCode(code: string): WaitlistEntry | undefined {
    return this.getAll().find(entry => entry.referralCode === code);
  }

  incrementReferralCount(referralCode: string): void {
    const entries = this.getAll();
    const referrer = entries.find(entry => entry.referralCode === referralCode);
    
    if (referrer) {
      referrer.referralCount += 1;
      // Move up in the waitlist for each referral
      if (referrer.position > 1) {
        const newPosition = Math.max(1, referrer.position - 1);
        // Adjust positions of other entries
        entries.forEach(entry => {
          if (entry.id !== referrer.id && entry.position >= newPosition && entry.position < referrer.position) {
            entry.position += 1;
          }
        });
        referrer.position = newPosition;
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));
    }
  }
}

export const waitlistStorage = new WaitlistStorage();