// src/components/layout/Sidebar.jsx
export default function Sidebar({ currentStep }) {
  const steps = [
    { id: 1, label: "Basics" },
    { id: 2, label: "Rewards" },
    { id: 3, label: "Backer" },
  ];

  return (
    <aside
  className="
    hidden md:flex
    md:flex-col
    w-56
    h-screen
    bg-[#F7F7F7]
    border-r border-slate-200
    sticky top-0
  "
>

      {/* keep sidebar fixed-ish while content scrolls */}
      <div className="w-64 min-h-screen bg-[#F7F7F7] border-r border-slate-200 py-8 px-6">

        <h1 className="mb-8 text-sm font-semibold tracking-[0.18em] text-slate-400 uppercase">
          Bounty Steps
        </h1>

        <nav className="space-y-4">
          {steps.map((step) => {
            const active = step.id === currentStep;

            return (
              <div key={step.id} className="flex items-center gap-3">
                {/* step number circle */}
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold
                  ${
                    active
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-slate-300 bg-white text-slate-500"
                  }`}
                >
                  {step.id}
                </div>

                {/* label */}
                <span
                  className={`text-sm ${
                    active ? "font-semibold text-slate-900" : "text-slate-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
