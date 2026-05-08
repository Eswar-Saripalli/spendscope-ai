"use client";

import { useState } from "react";

const tools = [
  "ChatGPT",
  "Claude",
  "Cursor",
  "GitHub Copilot",
  "Gemini",
];

export default function SpendForm() {
  const [selectedTool, setSelectedTool] = useState("ChatGPT");
  const [monthlySpend, setMonthlySpend] = useState("");
  const [teamSize, setTeamSize] = useState("");

  return (
    <section className="mx-auto mt-20 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
      
      <h2 className="text-3xl font-bold">
        Start Your AI Spend Audit
      </h2>

      <p className="mt-2 text-gray-400">
        Enter your current AI stack details to identify savings opportunities.
      </p>

      <div className="mt-8 space-y-6">

        <div>
          <label className="mb-2 block text-sm font-medium">
            AI Tool
          </label>

          <select
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-white/10 bg-black p-4 text-white outline-none transition hover:border-white/30"
          >
            {tools.map((tool) => (
              <option key={tool} value={tool}>
                {tool}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Monthly Spend ($)
          </label>

          <input
            type="number"
            placeholder="200"
            value={monthlySpend}
            onChange={(e) => setMonthlySpend(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none transition focus:border-white/40"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Team Size
          </label>

          <input
            type="number"
            placeholder="5"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none transition focus:border-white/40"
          />
        </div>

        <button className="w-full cursor-pointer rounded-2xl bg-white py-4 font-semibold text-black transition hover:scale-[1.01] hover:bg-gray-200">
          Generate Audit
        </button>

      </div>
    </section>
  );
}