import { createContext, useContext, useState } from "react";

const BountyFormContext = createContext(null);

const defaultData = {
  title: "",
  description: "",
  projectTitle: "",
  type: "",
  dominant_core: "",
  mode: "digital", // "digital" | "physical"
  location: "",
  reward: {
    currency: "USD",
    amount: "",
    winners: "",
  },
  timeline: {
    expiration_date: "", // yyyy-mm-dd
    estimated_completion: {
      days: "",
      hours: "",
      minutes: "",
    },
  },
  hasImpactCertificate: false,
  impactBriefMessage: "",
  sdgs: [],

  has_backer: false,
  backer: {
    name: "",
    logo: null, // URL string or File
    message: "",
  },

  terms_accepted: false,
};

export function BountyFormProvider({ children }) {
  const [formData, setFormData] = useState(defaultData);
  const [errors, setErrors] = useState({});

  const clearErrors = () => setErrors({});

  const validateStep1 = () => {
    const e = {};

    if (!formData.title.trim()) {
      e.title = "Title is required";
    } else if (formData.title.trim().length > 40) {
      e.title = "Title must be at most 40 characters";
    }

    if (!formData.description.trim()) {
      e.description = "Description is required";
    }

    if (!formData.type) e.type = "Bounty type is required";
    if (!formData.dominant_core) e.dominant_core = "Impact core is required";
    if (!formData.mode) e.mode = "Bounty mode is required";

    if (formData.mode === "physical" && !formData.location.trim()) {
      e.location = "Location is required for physical bounties";
    }

    setErrors((prev) => ({ ...prev, ...e }));
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
  const e = {};
  const { reward, hasImpactCertificate, impactBriefMessage } = formData;

  // Currency required
  if (!reward.currency) {
    e.reward_currency = "Currency is required";
  }

  // Total reward amount required (> 0)
  const amount = Number(reward.amount);
  if (!reward.amount || isNaN(amount) || amount <= 0) {
    e.reward_amount = "Amount must be greater than 0";
  }

  // Number of winners required (>= 1)
  const winners = Number(reward.winners);
  if (!reward.winners || isNaN(winners) || winners <= 0) {
    e.reward_winners = "Winners must be at least 1";
  }

  // Impact brief only required when toggle is ON
  if (hasImpactCertificate && !impactBriefMessage.trim()) {
    e.impactBriefMessage = "Impact brief is required when Impact Certificate is enabled";
  }

  // SDGs, failureThreshold, eachAmount, etc. do NOT block going to next step
  setErrors(e);
  return Object.keys(e).length === 0;
};





  const validateStep3 = () => {
    const e = {};
    const { has_backer, backer, terms_accepted, hasImpactCertificate } =
      formData;

    if (has_backer) {
      if (!backer.name.trim()) {
        e.backer_name = "Backer name is required";
      }
      if (!backer.logo) {
        e.backer_logo = "Backer logo or URL is required";
      }
    }

    if (!terms_accepted) {
      e.terms_accepted = "You must accept the terms & conditions";
    }

    // Small extra check: if impact certificate is enabled, brief must be valid
    if (hasImpactCertificate && !formData.impactBriefMessage.trim()) {
      e.impactBriefMessage = "Impact brief is required";
    }

    setErrors((prev) => ({ ...prev, ...e }));
    return Object.keys(e).length === 0;
  };

  const buildPayload = () => {
    const d = formData;

    let expirationISO = null;
    if (d.timeline.expiration_date) {
      // 23:59:59 on selected date in UTC
      expirationISO = new Date(
        d.timeline.expiration_date + "T23:59:59.000Z"
      ).toISOString();
    }

    return {
      title: d.title.trim(),
      description: d.description.trim(),
      projectTitle: d.projectTitle.trim() || null,
      type: d.type,
      dominant_core: d.dominant_core,
      mode: d.mode,
      location: d.mode === "physical" ? d.location.trim() : undefined,

      reward: {
        currency: d.reward.currency,
        amount: Number(d.reward.amount),
        winners: Number(d.reward.winners),
      },

      timeline: {
        expiration_date: expirationISO,
        estimated_completion: {
          days: Number(d.timeline.estimated_completion.days || 0),
          hours: Number(d.timeline.estimated_completion.hours || 0),
          minutes: Number(d.timeline.estimated_completion.minutes || 0),
        },
      },

      hasImpactCertificate: d.hasImpactCertificate,
      impactBriefMessage: d.hasImpactCertificate
        ? d.impactBriefMessage.trim()
        : undefined,
      sdgs: d.sdgs,

      has_backer: d.has_backer,
      backer: d.has_backer
        ? {
            name: d.backer.name.trim(),
            logo: d.backer.logo,
            message: d.backer.message.trim(),
          }
        : undefined,

      terms_accepted: d.terms_accepted,
    };
  };

  const value = {
    formData,
    setFormData,
    errors,
    setErrors,
    clearErrors,
    validateStep1,
    validateStep2,
    validateStep3,
    buildPayload,
  };

  return (
    <BountyFormContext.Provider value={value}>
      {children}
    </BountyFormContext.Provider>
  );
}

export function useBountyForm() {
  const ctx = useContext(BountyFormContext);
  if (!ctx) {
    throw new Error("useBountyForm must be used within BountyFormProvider");
  }
  return ctx;
}
