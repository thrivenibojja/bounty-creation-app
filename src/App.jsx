import { useState } from "react";
import Sidebar from "./components/layout/Sidebar.jsx";
import StepBasics from "./steps/StepBasics.jsx";
import StepRewards from "./steps/StepRewards.jsx"; // step 2
import StepBacker from "./steps/StepBacker.jsx";   // step 3
import ConfirmationScreen from "./steps/ConfirmationScreen.jsx";
import ResultScreen from "./steps/ResultScreen.jsx";
import { useBountyForm } from "./context/BountyFormContext.jsx";

const TOTAL_STEPS = 3;

export default function App() {
  const [step, setStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finalPayload, setFinalPayload] = useState(null);

  const { buildPayload } = useBountyForm();

  const goNext = () => {
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    if (showResult) {
      setShowResult(false);
      setShowConfirmation(true);
      return;
    }
    if (showConfirmation) {
      setShowConfirmation(false);
      setStep(TOTAL_STEPS);
      return;
    }
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCreateBounty = () => {
    const payload = buildPayload();
    setLoading(true);
    setShowConfirmation(true);

    setTimeout(() => {
      setLoading(false);
      setFinalPayload(payload);
      setShowConfirmation(false);
      setShowResult(true);
    }, 1500);
  };

  let content;

  if (showResult) {
    content = <ResultScreen payload={finalPayload} />;
  } else if (showConfirmation) {
    content = (
      <ConfirmationScreen
        loading={loading}
        onViewResult={() => setShowResult(true)}
      />
    );
  } else if (step === 1) {
    // STEP 1: Basics
    content = (
      <StepBasics
        currentStep={step}
        totalSteps={TOTAL_STEPS}
        onNext={goNext}
      />
    );
} else if (step === 2) {
  content = (
    <StepRewards
      currentStep={step}
      totalSteps={TOTAL_STEPS}
      onBack={goBack}
      onNext={goNext}
    />
  );
} else {
  // STEP 3: Backer
  content = (
    <StepBacker
      currentStep={step}
      totalSteps={TOTAL_STEPS}
      onBack={goBack}
      onCreateBounty={handleCreateBounty} // 👈 final submit
    />
  );
}


  // sidebar should show 1/2/3, and stay on 3 for confirmation + result
  const sidebarStep = showConfirmation || showResult ? 3 : step;

// src/App.jsx
return (
  <div className="min-h-screen bg-[#F7F7F7] text-slate-900 flex">
    <Sidebar currentStep={sidebarStep} />

    {/* main scroll area */}
    <main className="flex-1 h-screen overflow-y-auto flex justify-center items-start px-4 py-10">
      <div className="w-full max-w-4xl rounded-2xl bg-[#F7F7F7] shadow-sm px-6 py-8 md:px-10">
        {content}
      </div>
    </main>
  </div>
);

}
