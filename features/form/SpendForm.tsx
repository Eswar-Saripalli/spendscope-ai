"use client";

import { useState } from "react";

import { useAuditStore } from "@/lib/store";

const TOOL_OPTIONS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Cursor",
  "GitHub Copilot",
];

interface ToolInput {
  tool: string;
  spend: number;
}

export default function SpendForm() {

  const setResult = useAuditStore(
    (state) => state.setResult
  );

  const [tools, setTools] = useState<ToolInput[]>([
    {
      tool: "ChatGPT",
      spend: 200,
    },
  ]);

  const [teamSize, setTeamSize] = useState(2);

  const [loading, setLoading] = useState(false);

  const handleToolChange = (
    index: number,
    field: keyof ToolInput,
    value: string
  ) => {

    const updatedTools = [...tools];

    updatedTools[index] = {
      ...updatedTools[index],
      [field]:
        field === "spend"
          ? Number(value)
          : value,
    };

    setTools(updatedTools);
  };

  const addTool = () => {

    setTools([
      ...tools,
      {
        tool: "ChatGPT",
        spend: 0,
      },
    ]);
  };

  const removeTool = (index: number) => {

    const updatedTools = tools.filter(
      (_, i) => i !== index
    );

    setTools(updatedTools);
  };

  const handleAudit = () => {

    setLoading(true);

    let totalCurrentSpend = 0;

    let totalOptimizedSpend = 0;

    let allRecommendations: string[] = [];

    tools.forEach((item) => {

      totalCurrentSpend += item.spend;

      let optimized = item.spend;

      if (
        item.tool === "ChatGPT" &&
        item.spend >= 300
      ) {

        optimized -= 50;

        allRecommendations.push(
          "Downgrade from ChatGPT Team to ChatGPT Plus."
        );
      }

      if (
        item.tool === "Claude" &&
        teamSize <= 5 &&
        item.spend >= 100
      ) {

        optimized -= 20;

        allRecommendations.push(
          "Claude usage appears expensive for your current team size."
        );
      }

      if (
        item.tool === "Gemini" &&
        teamSize <= 3 &&
        item.spend >= 100
      ) {

        optimized -= 25;

        allRecommendations.push(
          "Consider switching to Gemini Advanced individual plans for smaller teams."
        );
      }

      if (
        item.tool === "Cursor" &&
        teamSize <= 2 &&
        item.spend >= 50
      ) {

        optimized -= 15;

        allRecommendations.push(
          "Cursor Pro may be unnecessary for a very small team."
        );
      }

      if (
        item.tool === "GitHub Copilot" &&
        teamSize <= 2 &&
        item.spend >= 70
      ) {

        optimized -= 10;

        allRecommendations.push(
          "GitHub Copilot Business may be unnecessary for a very small team."
        );
      }

      totalOptimizedSpend += optimized;
    });

    setResult({

      currentSpend: totalCurrentSpend,

      optimizedSpend: totalOptimizedSpend,

      yearlySavings:
        (totalCurrentSpend - totalOptimizedSpend) * 12,

      recommendations: allRecommendations,

      createdAt: new Date().toLocaleString(),

    });

    setLoading(false);
  };

  return (

    <section className="mx-auto mt-16 w-full max-w-5xl px-4 sm:px-6">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">

        <h2 className="text-3xl font-bold">
          Start Your AI Spend Audit
        </h2>

        <p className="mt-2 text-gray-400">
          Enter your current AI stack details to identify savings opportunities.
        </p>

        <div className="mt-8 space-y-6">

          {tools.map((item, index) => (

            <div
              key={index}
              className="rounded-2xl border border-white/10 p-5"
            >

              <div className="mb-4 flex items-center justify-between">

                <h3 className="font-semibold">
                  Tool #{index + 1}
                </h3>

                {tools.length > 1 && (

                  <button
                    onClick={() => removeTool(index)}
                    className="rounded-lg border border-red-500/30 px-3 py-1 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    Remove
                  </button>

                )}

              </div>

              <div>

                <label className="text-sm text-gray-300">
                  AI Tool
                </label>

                <select
                  value={item.tool}
                  onChange={(e) =>
                    handleToolChange(
                      index,
                      "tool",
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
                >

                  {TOOL_OPTIONS.map((tool) => (

                    <option
                      key={tool}
                      value={tool}
                    >
                      {tool}
                    </option>

                  ))}

                </select>

              </div>

              <div className="mt-5">

                <label className="text-sm text-gray-300">
                  Monthly Spend ($)
                </label>

                <input
                  type="number"
                  value={item.spend}
                  onChange={(e) =>
                    handleToolChange(
                      index,
                      "spend",
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
                />

              </div>

            </div>

          ))}

          <div>

            <label className="text-sm text-gray-300">
              Team Size
            </label>

            <input
              type="number"
              value={teamSize}
              onChange={(e) =>
                setTeamSize(
                  Number(e.target.value)
                )
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
            />

          </div>

          <button
            onClick={addTool}
            className="w-full rounded-2xl border border-white/10 bg-black py-4 font-semibold transition hover:bg-white/5"
          >
            + Add Another Tool
          </button>

          <button
            onClick={handleAudit}
            disabled={loading}
            className="w-full rounded-2xl bg-white py-4 font-semibold text-black transition hover:scale-[1.01]"
          >
            {loading
              ? "Generating Audit..."
              : "Generate Audit"}
          </button>

        </div>

      </div>

    </section>
  );
}