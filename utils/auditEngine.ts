interface AuditInput {
  tool: string;
  monthlySpend: number;
  teamSize: number;
}

interface AuditResult {
  currentSpend: number;
  optimizedSpend: number;
  yearlySavings: number;
  recommendations: string[];
}

export function generateAudit(
  data: AuditInput
): AuditResult {

  let optimizedSpend = data.monthlySpend;

  const recommendations: string[] = [];

  // ChatGPT Logic
  if (
    data.tool === "ChatGPT" &&
    data.teamSize <= 3 &&
    data.monthlySpend > 100
  ) {
    optimizedSpend = optimizedSpend - 40;

    recommendations.push(
      "Downgrade from ChatGPT Team to ChatGPT Plus."
    );
  }

  // Claude Logic
  if (
    data.tool === "Claude" &&
    data.monthlySpend > 80
  ) {
    optimizedSpend = optimizedSpend - 20;

    recommendations.push(
      "Claude usage appears expensive for your current team size."
    );
  }

  // Cursor Logic
  if (
    data.tool === "Cursor" &&
    data.teamSize <= 2 &&
    data.monthlySpend > 50
  ) {
    optimizedSpend = optimizedSpend - 15;

    recommendations.push(
      "Cursor Pro may be unnecessary for a very small team."
    );
  }

  // Gemini Logic
  if (
    data.tool === "Gemini" &&
    data.teamSize <= 3 &&
    data.monthlySpend > 60
  ) {
    optimizedSpend = optimizedSpend - 25;

    recommendations.push(
      "Consider switching to Gemini Advanced individual plans for smaller teams."
    );
  }

  // GitHub Copilot Logic
  if (
    data.tool === "GitHub Copilot" &&
    data.teamSize <= 2 &&
    data.monthlySpend > 40
  ) {
    optimizedSpend = optimizedSpend - 10;

    recommendations.push(
      "GitHub Copilot Business may be unnecessary for a very small team."
    );
  }

  const yearlySavings =
    (data.monthlySpend - optimizedSpend) * 12;

  return {
    currentSpend: data.monthlySpend,
    optimizedSpend,
    yearlySavings,
    recommendations,
  };
}