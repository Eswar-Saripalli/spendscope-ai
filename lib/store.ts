import { create } from "zustand";

export interface AuditResult {

  currentSpend: number;

  optimizedSpend: number;

  yearlySavings: number;

  recommendations: string[];

  createdAt: string;
}

interface AuditStore {

  result: AuditResult | null;

  history: AuditResult[];

  setResult: (result: AuditResult) => void;

  clearHistory: () => void;
}

export const useAuditStore = create<AuditStore>((set) => ({

  result: null,

  history: [],

  setResult: (result) => {

    const updatedHistory = [
      result,
      ...JSON.parse(
        localStorage.getItem("audit-history") || "[]"
      ),
    ];

    localStorage.setItem(
      "audit-history",
      JSON.stringify(updatedHistory)
    );

    set({
      result,
      history: updatedHistory,
    });
  },

  clearHistory: () => {

    localStorage.removeItem(
      "audit-history"
    );

    set({
      history: [],
    });
  },
}));