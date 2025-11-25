import { prettyJson } from "../utils/formatters.js";

export default function ResultScreen({ payload }) {
  if (!payload) {
    return (
      <div className="py-16 text-center text-sm text-slate-600">
        No payload yet. Please complete the wizard.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-xl font-semibold text-slate-900">
          Bounty Created – Final Payload
        </h2>
        <p className="text-sm text-slate-500">
          This is the JSON that would be sent to the backend API.
        </p>
      </header>

      <pre className="max-h-[460px] overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
{prettyJson(payload)}
      </pre>
    </div>
  );
}
