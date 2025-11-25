import { useState } from "react";
import TextInput from "../components/ui/TextInput.jsx";
import Toggle from "../components/ui/Toggle.jsx";
import TextArea from "../components/ui/TextArea.jsx";
import Button from "../components/ui/Button.jsx";
import { useBountyForm } from "../context/BountyFormContext.jsx";

const CURRENCIES = ["USD", "EUR", "INR", "GBP"];

const SDG_OPTIONS = [
  "No Poverty",
  "Quality Education",
  "Climate Action",
  "Reduced Inequalities",
];

const InfoIcon = () => (
  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-500">
    i
  </span>
);

export default function StepRewards({
  currentStep,
  totalSteps,
  onBack,
  onNext,
}) {
  const { formData, setFormData, errors, validateStep2, clearErrors } =
    useBountyForm();

  const [sdgOpen, setSdgOpen] = useState(false);

  const handleNext = () => {
    clearErrors();
    if (validateStep2()) onNext();
  };

  const toggleSdg = (sdg) => {
    setFormData((prev) => {
      const exists = prev.sdgs.includes(sdg);
      return {
        ...prev,
        sdgs: exists
          ? prev.sdgs.filter((s) => s !== sdg)
          : [...prev.sdgs, sdg],
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Step {currentStep} of {totalSteps}
          </p>
          <h2 className="text-xl font-semibold text-slate-900">
            Rewards &amp; Timeline
          </h2>
        </div>
      </header>

      <div className="space-y-8">
        {/* ================= BOUNTY REWARD ================= */}
        <section className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Bounty Reward
            </h3>
            <p className="text-xs text-slate-500">
              Choose bounty reward token and set the amount
            </p>
          </div>

          {/* Budget */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-800">
              What is your budget for this bounty?
              <span className="text-red-500">*</span>
            </label>

            {/* input row */}
            <div className="flex items-end gap-3">
              <div
                className={`flex flex-1 overflow-hidden rounded-lg border bg-white
                ${
                  errors.reward_currency || errors.reward_amount
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
              >
                {/* currency select */}
                <select
                  className="w-28 border-r border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
                  value={formData.reward.currency}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      reward: { ...prev.reward, currency: e.target.value },
                    }))
                  }
                >
                  <option value="">₹ INR</option>
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                {/* amount input */}
                <input
                  type="number"
                  min={1}
                  placeholder="12,000"
                  className="flex-1 px-3 py-2 text-sm text-slate-800 outline-none"
                  value={formData.reward.amount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      reward: { ...prev.reward, amount: e.target.value },
                    }))
                  }
                />
              </div>
            </div>

            {/* USD text under the field */}
            <span className="block pt-1 text-xs text-slate-400 text-right">
              in USD: 400
            </span>

            {(errors.reward_currency || errors.reward_amount) && (
              <p className="text-xs text-red-500">
                {errors.reward_currency || errors.reward_amount}
              </p>
            )}
          </div>

          {/* Winners */}
          <TextInput
            label="How many winners?"
            placeholder="10"
            required
            type="number"
            min={1}
            value={formData.reward.winners}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                reward: { ...prev.reward, winners: e.target.value },
              }))
            }
            error={errors.reward_winners}
          />

          {/* Each winner */}
          <TextInput
            label="Each winner will be awarded:"
            placeholder="100"
            required
            type="number"
            min={0}
            value={formData.reward.eachAmount || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                reward: { ...prev.reward, eachAmount: e.target.value },
              }))
            }
          />

          <p className="text-sm text-slate-700">
            Maximum Impact Points allocated:{" "}
            <span className="font-semibold">175</span>
          </p>

          {/* Failure threshold */}
          <div className="space-y-1">
            <label className="flex items-center gap-1 text-sm font-medium text-slate-800">
              <span>Set Failure Threshold %</span>
              <span className="text-red-500">*</span>
              <InfoIcon />
            </label>

            <TextInput
              placeholder="Enter the pass %"
              type="number"
              min={0}
              max={100}
              value={formData.failureThreshold || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  failureThreshold: e.target.value,
                }))
              }
            />
          </div>
        </section>

        {/* ================= IMPACT CERTIFICATE ================= */}
        <section className="space-y-3">
          <Toggle
            label={
              <span className="inline-flex items-center gap-2">
                <span>Impact Certificate</span>
                <InfoIcon />
              </span>
            }
            helper="Do you wish to issue impact certificates for this bounty?"
            checked={formData.hasImpactCertificate}
            onChange={(checked) =>
              setFormData((prev) => ({
                ...prev,
                hasImpactCertificate: checked,
                impactBriefMessage: checked ? prev.impactBriefMessage : "",
              }))
            }
          />

          {formData.hasImpactCertificate && (
            <div className="space-y-1">
              <TextArea
                label={
                  <span className="inline-flex items-center gap-2">
                    <span>Impact Certificate Brief</span>
                    <span className="text-red-500">*</span>
                    <InfoIcon />
                  </span>
                }
                rows={3}
                maxLength={100}
                placeholder="Creating digital assets for fellow guild members"
                value={formData.impactBriefMessage}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    impactBriefMessage: e.target.value,
                  }))
                }
                error={errors.impactBriefMessage}
              />

              <div className="flex justify-end">
                <span className="text-[11px] text-slate-400">
                  Max 100 characters
                </span>
              </div>
            </div>
          )}
        </section>

        {/* ================= SDGs (dropdown with checkboxes) ================= */}
        <section className="space-y-2">
          <label className="flex items-center gap-1 text-sm font-medium text-slate-800">
            <span>SDGs</span>
            <span className="text-red-500">*</span>
            <InfoIcon />
          </label>

          <p className="text-xs text-slate-500">
            Choose upto 4 secondary SDGs (optional)
          </p>

          {/* Dropdown */}
          <div className="relative mt-1">
            {/* Display button */}
            <button
              type="button"
              onClick={() => setSdgOpen((open) => !open)}
              className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-700"
            >
              <span
                className={
                  formData.sdgs.length === 0 ? "text-slate-400" : undefined
                }
              >
                {formData.sdgs.length === 0
                  ? "Choose upto 4 secondary SDGs (optional)"
                  : formData.sdgs.join(", ")}
              </span>
              <span className="ml-2 text-xs text-slate-400">▾</span>
            </button>

            {/* Options panel */}
            {sdgOpen && (
              <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-md max-h-48 overflow-y-auto">
                {SDG_OPTIONS.map((sdg) => {
                  const active = formData.sdgs.includes(sdg);
                  const disabled = !active && formData.sdgs.length >= 4;

                  return (
                    <label
                      key={sdg}
                      className={`flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm hover:bg-slate-50
                        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300"
                        checked={active}
                        disabled={disabled}
                        onChange={() => toggleSdg(sdg)}
                      />
                      <span>{sdg}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer buttons */}
      <footer className="flex justify-between gap-3 pt-4">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>

        <Button variant="primary" onClick={handleNext}>
          Next
        </Button>
      </footer>
    </div>
  );
}
