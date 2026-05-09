import { create } from "zustand";

interface AuditResult {
  currentSpend: number;
  optimizedSpend: number;
  yearlySavings: number;
  recommendations: string[];
}

interface AuditStore {
  result: AuditResult | null;

  setResult: (result: AuditResult) => void;
}

export const useAuditStore = create<AuditStore>((set) => ({
  result: null,

  setResult: (result) => set({ result }),
}));