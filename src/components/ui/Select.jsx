export default function Select({
  label,
  required,
  error,
  helper,
  children,
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none
        ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-400"
            : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        }`}
        {...props}
      >
        {children}
      </select>
      {helper && !error && (
        <p className="text-xs text-slate-400">{helper}</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
