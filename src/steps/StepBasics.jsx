import TextInput from "../components/ui/TextInput.jsx";
import TextArea from "../components/ui/TextArea.jsx";
import Select from "../components/ui/Select.jsx";
import RadioGroup from "../components/ui/RadioGroup.jsx";
import Button from "../components/ui/Button.jsx";
import { useBountyForm } from "../context/BountyFormContext.jsx";
import map from "../../public/assests/map.png"

const BOUNTY_TYPES = ["Content", "Design", "Development", "Marketing", "Other"];
const IMPACT_CORES = ["Water", "Earth", "Social", "Energy"];

const InfoIcon = () => (
  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-500">
    i
  </span>
);

export default function StepBasics({ currentStep, totalSteps, onNext }) {
  const { formData, setFormData, errors, validateStep1, clearErrors } =
    useBountyForm();

  const handleNext = () => {
    clearErrors();
    if (validateStep1()) onNext();
  };

  return (
    <div className="space-y-8">
      {/* Step indicator */}
      <header className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
          Step {currentStep} of {totalSteps}
        </p>
      </header>

      {/* MAIN FORM */}
      <section className="space-y-6">
        {/* ===== Bounty Title ===== */}
        <div className="space-y-1">
          <div className="flex items-baseline justify-between">
            <label className="flex items-center gap-1 text-sm font-medium text-slate-800">
              <span>Bounty Title</span>
              <InfoIcon />
            </label>
            <span className="text-[11px] text-slate-400">
              character limit: {formData.title.length}/40
            </span>
          </div>
          <input
            type="text"
            maxLength={40}
            placeholder="Type your bounty's title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition
            ${
              errors.title
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-500">{errors.title}</p>
          )}
        </div>

        {/* ===== Bounty Description ===== */}
        <div className="space-y-1">
          <div className="flex items-baseline justify-between">
            <label className="flex items-center gap-1 text-sm font-medium text-slate-800">
              <span>Bounty Description</span>
              <InfoIcon />
            </label>
            <span className="text-[11px] text-slate-400">
              character limit: {formData.description.length}/1000
            </span>
          </div>
          <textarea
            rows={4}
            maxLength={1000}
            placeholder="Briefly describe what the bounty does"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition resize-none
            ${
              errors.description
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }`}
          />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description}</p>
          )}
        </div>

        {/* ===== Project (no info icon) ===== */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-800">Project</label>
          <input
            type="text"
            placeholder="Choose a project to link the bounty"
            value={formData.projectTitle}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                projectTitle: e.target.value,
              }))
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* ===== Bounty Type + Dominant Impact Core ===== */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Select
              label={
                <span className="flex items-center gap-1">
                  <span>Bounty Type</span>
                  <InfoIcon />
                </span>
              }
              required
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: e.target.value }))
              }
              error={errors.type}
            >
              <option value="">Choose category</option>
              {BOUNTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Select
              label={
                <span className="flex items-center gap-1">
                  <span>Dominant Impact Core</span>
                  <InfoIcon />
                </span>
              }
              required
              value={formData.dominant_core}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dominant_core: e.target.value,
                }))
              }
              error={errors.dominant_core}
            >
              <option value="">Choose core</option>
              {IMPACT_CORES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* ===== Bounty Mode + radios ===== */}
        <div className="space-y-2">
          <label className="flex items-center gap-1 text-sm font-medium text-slate-800">
            <span>Bounty Mode</span>
            <InfoIcon />
          </label>

          <RadioGroup
            value={formData.mode}
            onChange={(mode) =>
              setFormData((prev) => ({
                ...prev,
                mode,
                ...(mode === "digital" ? { location: "" } : {}),
              }))
            }
            options={[
              { label: "Digital Bounty", value: "digital" },
              { label: "Physical Bounty", value: "physical" },
            ]}
            error={errors.mode}
          />
        </div>

        {/* ===== Location + Map + Radius – only for physical ===== */}
        {formData.mode === "physical" && (
          <div className="space-y-4 mt-2">
            <label className="flex items-center gap-1 text-sm font-medium text-slate-800">
              <span>Enter Location</span>
              <InfoIcon />
            </label>

            {/* City/Town */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                City/Town where the bounty is live?*
              </label>
              <input
                type="text"
                placeholder="Type in the location where the bounty should be available"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                ${
                  errors.location
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
              />
              {errors.location && (
                <p className="text-xs text-red-500">{errors.location}</p>
              )}
            </div>

            {/* Map using YOUR image */}
            <div className="rounded-xl border border-slate-200 bg-slate-100 overflow-hidden">
              <img
                src={map}
                alt="Map preview"
                className="h-70 w-full object-cover"
              />
              <p className="px-3 py-2 text-[11px] text-slate-500">
                Click to change position of marker
              </p>
            </div>

            {/* Radius */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Enter Bounty Radius (in Kms)*
              </label>
              <input
                type="number"
                min={0}
                placeholder="50"
                value={formData.radius || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    radius: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        )}
      </section>

      {/* Bottom buttons */}
      <footer className="flex items-center justify-between pt-6">
        <Button variant="secondary" className="px-6">
          Save as Draft
        </Button>
        <Button variant="primary" className="px-8" onClick={handleNext}>
          Next
        </Button>
      </footer>
    </div>
  );
}
