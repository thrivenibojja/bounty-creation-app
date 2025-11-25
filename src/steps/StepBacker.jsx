// src/steps/StepBacker.jsx
import { useEffect, useState } from "react";
import Button from "../components/ui/Button.jsx";
import Toggle from "../components/ui/Toggle.jsx";
import { useBountyForm } from "../context/BountyFormContext.jsx";

export default function StepBacker({
  currentStep,
  totalSteps,
  onBack,
  onCreateBounty,
}) {
  const { formData, setFormData, errors, validateStep3, clearErrors } =
    useBountyForm();

  const [logoPreview, setLogoPreview] = useState(null);

  // create / cleanup preview URL when logo changes
  useEffect(() => {
    const logo = formData.backer.logo;
    if (!logo) {
      setLogoPreview(null);
      return;
    }

    if (typeof logo === "string") {
      setLogoPreview(logo);
      return;
    }

    const url = URL.createObjectURL(logo);
    setLogoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [formData.backer.logo]);

  const handleCreate = () => {
    clearErrors();
    if (validateStep3()) {
      onCreateBounty(); // -> confirmation + result JSON
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({
      ...prev,
      backer: { ...prev.backer, logo: file },
    }));
  };

  const handleClearLogo = () => {
    setFormData((prev) => ({
      ...prev,
      backer: { ...prev.backer, logo: null },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header (STEP 3 OF 3) */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Step {currentStep} of {totalSteps}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            Backer Information
          </h2>
        </div>
      </header>

      <div className="space-y-6">
        {/* ===== Toggle + helper ===== */}
        <section className="space-y-2">
          <Toggle
            label="Does the bounty have a sponsor or backer?"
            helper="Select this option if you wish to display the bounty sponsor/backer’s logo and name on the bounty"
            checked={formData.has_backer}
            onChange={(checked) =>
              setFormData((prev) => ({
                ...prev,
                has_backer: checked,
                backer: checked
                  ? prev.backer
                  : { name: "", logo: null, message: "" },
              }))
            }
          />
        </section>

        {/* When toggle ON, show fields like in Figma */}
        {formData.has_backer && (
          <section className="space-y-6">
            {/* ===== Backer name ===== */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-900">
                Enter sponsor or backer’s name{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  maxLength={35}
                  placeholder="Mention the name that will appear on bounties & impact certs"
                  value={formData.backer.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      backer: {
                        ...prev.backer,
                        name: e.target.value,
                      },
                    }))
                  }
                  className={`w-full rounded-lg border px-3 py-2 text-sm outline-none
                    ${
                      errors.backer_name
                        ? "border-red-500 focus:ring-2 focus:ring-red-400"
                        : "border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                />

                {/* character limit text, right bottom */}
                <span className="absolute right-0 -bottom-5 text-[11px] text-slate-400">
                  (character limit: {formData.backer.name.length}/35)
                </span>
              </div>

              {errors.backer_name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.backer_name}
                </p>
              )}
            </div>

            {/* ===== Logo upload big box ===== */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">
                Upload sponsor or backer’s logo
                <span className="text-red-500">*</span>
              </label>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="flex min-h-[140px] items-center justify-between gap-4 rounded-xl border-2 border-dashed border-slate-200 bg-white px-4 py-4">
                  {/* Left: empty state or preview */}
                  {!logoPreview ? (
                    <label
                      htmlFor="backer-logo-input"
                      className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 text-center"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-xl text-slate-500">
                        +
                      </span>
                      <span className="text-sm text-slate-500">
                        click to choose files
                      </span>
                      <span className="mt-1 text-[11px] text-slate-400">
                        Max file size: 2 MB ; Ideal dimensions: 20×20 px
                      </span>
                    </label>
                  ) : (
                    <>
                      <div className="flex flex-1 items-center gap-4">
                        <img
                          src={logoPreview}
                          alt="Backer logo preview"
                          className="h-24 w-24 rounded-lg object-cover"
                        />
                        <span className="text-[11px] text-slate-400">
                          Max file size: 2 MB ; Ideal dimensions: 20×20 px
                        </span>
                      </div>

                      {/* Right: round X and pencil buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleClearLogo}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-500 text-sm hover:bg-slate-100"
                          title="Remove logo"
                        >
                          ✕
                        </button>
                        <label
                          htmlFor="backer-logo-input"
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-300 text-slate-500 text-sm hover:bg-slate-100"
                          title="Change logo"
                        >
                          ✎
                        </label>
                      </div>
                    </>
                  )}
                </div>

                {/* hidden file input */}
                <input
                  id="backer-logo-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>

              {errors.backer_logo && (
                <p className="text-xs text-red-500">{errors.backer_logo}</p>
              )}
            </div>

            {/* ===== Sponsor message ===== */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-900">
                Enter Sponsor Message
              </label>

              <div className="relative">
                <input
                  type="text"
                  maxLength={80}
                  placeholder="Add sponsor message if any, optional"
                  value={formData.backer.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      backer: {
                        ...prev.backer,
                        message: e.target.value,
                      },
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <span className="absolute right-0 -bottom-5 text-[11px] text-slate-400">
                  (character limit: {formData.backer.message.length}/80)
                </span>
              </div>
            </div>
          </section>
        )}

        {/* ===== Terms & conditions ===== */}
        <section className="space-y-2 pt-2 border-t border-slate-100">
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
              checked={formData.terms_accepted}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  terms_accepted: e.target.checked,
                }))
              }
            />
            <span>
              I agree to the{" "}
              <button
                type="button"
                className="text-blue-600 underline underline-offset-2"
              >
                terms &amp; conditions
              </button>
              .
            </span>
          </label>
          {errors.terms_accepted && (
            <p className="text-xs text-red-500">{errors.terms_accepted}</p>
          )}
        </section>
      </div>

      {/* Bottom buttons – can keep your existing styles */}
      <footer className="flex justify-between gap-3 pt-4">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create Bounty
        </Button>
      </footer>
    </div>
  );
}
