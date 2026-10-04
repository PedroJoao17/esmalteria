import type { Appointment, ClientProfile, Session } from "@/types/app";

const SESSION_KEY = "esmalteria:session";
const PROFILE_KEY = "esmalteria:profile";
const APPOINTMENTS_KEY = "esmalteria:appointments";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const sessionStorageAdapter = {
  get(): Session | null {
    return readJson<Session | null>(SESSION_KEY, null);
  },
  set(session: Session) {
    writeJson(SESSION_KEY, session);
  },
  clear() {
    if (typeof window !== "undefined") window.localStorage.removeItem(SESSION_KEY);
  },
};

export const profileStorageAdapter = {
  get(): ClientProfile | null {
    return readJson<ClientProfile | null>(PROFILE_KEY, null);
  },
  set(profile: ClientProfile) {
    writeJson(PROFILE_KEY, profile);
  },
};

export const appointmentStorageAdapter = {
  list(): Appointment[] {
    return readJson<Appointment[]>(APPOINTMENTS_KEY, []);
  },
  save(appointment: Appointment) {
    const current = this.list();
    writeJson(APPOINTMENTS_KEY, [appointment, ...current.filter((item) => item.id !== appointment.id)]);
  },
  update(id: string, patch: Partial<Appointment>) {
    writeJson(APPOINTMENTS_KEY, this.list().map((item) => item.id === id ? { ...item, ...patch } : item));
  },
};
