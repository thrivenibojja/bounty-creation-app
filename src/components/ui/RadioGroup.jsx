// src/components/ui/RadioGroup.jsx

export default function RadioGroup({ options, value, onChange, error }) {
  return (
    <div className="space-y-1">
      <div className="flex flex-wrap gap-6">
        {options.map((opt) => {
          const selected = value === opt.value;

          return (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => onChange(opt.value)}
            >
              {/* Custom Radio Circle */}
              <span
                className={`
                  h-5 w-5 rounded-full flex items-center justify-center
                  transition-all
                  ${selected ? "bg-[#0A84FF]" : "bg-white border border-slate-300"}
                `}
                style={{
                  boxShadow: selected
                    ? "0px 0px 4px rgba(10, 132, 255, 0.6)"
                    : "none",
                }}
              >
                {/* Inner white dot when selected */}
                {selected && (
                  <span className="h-2.5 w-2.5 rounded-full bg-white"></span>
                )}
              </span>

              {/* Label text */}
              <span className="text-[15px] text-slate-700">
                {opt.label}
              </span>
            </label>
          );
        })}
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
