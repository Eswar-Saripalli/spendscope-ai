"use client";

import SpendForm from "../features/form/SpendForm";
import ResultsPanel from "../features/results/ResultsPanel";
import SpendChart from "../features/results/SpendChart";
import DownloadReport from "../features/results/DownloadReport";
import AuditHistory from "../features/results/AuditHistory";

export default function Home() {

  return (

    <main className="min-h-screen bg-black px-6 py-16 text-white">

      <section className="mx-auto flex max-w-6xl flex-col items-center text-center">

        <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
          AI Spend Optimization Platform
        </div>

       <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">
          Stop Overpaying <br />
          For AI Tools
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          SpendScope AI analyzes your AI subscriptions,
          detects wasted spend, and recommends smarter,
          cheaper alternatives instantly.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <button
            onClick={() => {

              const section =
                document.getElementById(
                  "audit-form"
                );

              section?.scrollIntoView({
                behavior: "smooth",
              });

            }}
            className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
          >
            Start Free Audit
          </button>

          <button
            onClick={() => {

              const section =
                document.getElementById(
                  "results-section"
                );

              section?.scrollIntoView({
                behavior: "smooth",
              });

            }}
            className="rounded-2xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white/10"
          >
            View Demo
          </button>

        </div>

        <div className="mt-16 grid w-full grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">

            <h3 className="text-xl font-semibold">
              Instant Savings Audit
            </h3>

            <p className="mt-3 text-sm text-gray-400">
              Discover where your startup is wasting money
              on AI subscriptions and API usage.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">

            <h3 className="text-xl font-semibold">
              Smarter Recommendations
            </h3>

            <p className="mt-3 text-sm text-gray-400">
              Get personalized plan downgrades and alternative
              tool suggestions based on your usage.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">

            <h3 className="text-xl font-semibold">
              Shareable Reports
            </h3>

            <p className="mt-3 text-sm text-gray-400">
              Generate beautiful public audit reports
              with annual savings breakdowns.
            </p>

          </div>

        </div>

      </section>

      <div id="audit-form">

        <SpendForm />

      </div>

      <div id="results-section">

        <ResultsPanel />

        <SpendChart />

        <DownloadReport />

        <AuditHistory />

      </div>

    </main>
  );
}