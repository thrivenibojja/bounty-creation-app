// src/components/ui/Toggle.jsx
export default function Toggle({ label, helper, checked, onChange }) {
  return (
    <div className="flex items-start gap-3">
      
      {/* Switch */}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={` 
          relative mt-1 flex h-6 w-11 items-center rounded-full transition-all duration-200
          ${
            checked
              ? "bg-[#ff6b4a]"   // 🔥 NO SHADOW HERE
              : "bg-slate-200"
          }
        `}
      >
        <span
          className={` 
            inline-block h-5 w-5 rounded-full bg-white transform transition-transform duration-200
            ${checked ? "translate-x-5" : "translate-x-1"}
          `}
        />
      </button>

      {/* Label + helper text */}
      <div className="flex flex-col">
        {label && (
          <div className="text-sm font-medium text-slate-900">{label}</div>
        )}
        {helper && (
          <p className="text-xs text-slate-500 mt-0.5">
            {helper}
          </p>
        )}
      </div>

    </div>
  );
}
