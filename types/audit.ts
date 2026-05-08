export type ToolName =
  | "ChatGPT"
  | "Claude"
  | "Cursor"
  | "GitHub Copilot"
  | "Gemini";

export interface ToolSpend {
  tool: ToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditFormData {
  teamSize: number;
  primaryUseCase: string;
  tools: ToolSpend[];
}