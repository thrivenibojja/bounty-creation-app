export default function TextInput({
  label,
  required,
  error,
  helper,
  ...inputProps
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
         className={`w-full rounded-lg border px-3 py-2 text-sm bg-white
        ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-400"
            : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        }`}
        {...inputProps}
      />
      {helper && !error && (
        <p className="text-xs text-slate-400">{helper}</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
