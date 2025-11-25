import Button from "../components/ui/Button.jsx";

export default function ConfirmationScreen({ loading, onViewResult }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
        <span className="text-3xl">✅</span>
      </div>
      <h2 className="text-xl font-semibold text-slate-900">
        Creating your bounty...
      </h2>
      <p className="text-sm text-slate-600 max-w-md">
        We are simulating a server request with a small delay using
        <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs">
          setTimeout
        </code>
        . Once done, you can view the final JSON payload.
      </p>

      <Button
        variant="primary"
        disabled={loading}
        onClick={onViewResult}
        className="mt-4"
      >
        {loading ? "Please wait..." : "View Result JSON"}
      </Button>
    </div>
  );
}
