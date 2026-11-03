import { useEffect, useState } from "react";

import "./planYourTripPage.css";

import PlanTripHero from "./components/PlanTripHero";
import QuickTripBuilder from "./components/QuickTripBuilder";
import FullTripBuilder from "./components/FullTripBuilder";
import GeneratedItinerary from "./components/GeneratedItinerary";
import FloatingTripSummary from "./components/FloatingTripSummary";

import { planTripHero, quickTripBuilderData } from "./data/planTripData";

export default function PlanYourTripPage() {
  /* =========================================================
     SHARED TRIP STATE
  ========================================================= */

  const [tripData, setTripData] = useState({
    /* =======================================================
       STEP 01 — TRIP BASICS
    ======================================================= */

    origin: quickTripBuilderData.defaultValues?.origin || "lahore",

    destination:
      quickTripBuilderData.defaultValues?.destination || "swat-kalam",

    travelDate: quickTripBuilderData.defaultValues?.travelDate || "",

    travelers: quickTripBuilderData.defaultValues?.travelers || 2,

    tripType: quickTripBuilderData.defaultValues?.tripType || "adventure",

    /* =======================================================
       STEP 02 — GETTING THERE
    ======================================================= */

    travelMode: "",
    routePreference: "recommended",
    pickupRequired: false,

    /* =======================================================
       STEP 03 — STAY & BUDGET
    ======================================================= */

    accommodationType: "",
    budgetLevel: "",
    rooms: 1,

    /* =======================================================
       STEP 04 — EXPERIENCES & INTERESTS
    ======================================================= */

    interests: [],

    /* =======================================================
       STEP 05 — TRIP PACE & DAILY PREFERENCES
    ======================================================= */

    tripPace: "balanced",
    dailyStart: "flexible",
    activityLevel: "moderate",

    /* =======================================================
       STEP 06 — SPECIAL REQUIREMENTS
    ======================================================= */

    travelingWithChildren: false,
    travelingWithElderly: false,
    accessibilityRequired: false,
    dietaryPreference: "none",
    specialRequests: "",

    /* =======================================================
       STEP 07 — GENERATED ITINERARY
    ======================================================= */

    itineraryGenerated: false,
    itineraryGenerationId: 0,
    tripStarted: false,
  });

  /* =========================================================
     UPDATE SHARED TRIP DATA
  ========================================================= */

  const updateTripData = (field, value) => {
    setTripData((current) => {
      if (field === "itineraryGenerated" && value === true) {
        return {
          ...current,
          itineraryGenerated: true,
          itineraryGenerationId: current.itineraryGenerationId + 1,
        };
      }

      const shouldInvalidateItinerary =
        current.itineraryGenerated &&
        field !== "tripStarted" &&
        field !== "itineraryGenerationId";

      return {
        ...current,
        [field]: value,
        itineraryGenerated: shouldInvalidateItinerary
          ? false
          : current.itineraryGenerated,
      };
    });
  };

  /* =========================================================
     QUICK BUILDER → FULL BUILDER
  ========================================================= */

  const handleBuildTrip = () => {
    setTripData((current) => ({
      ...current,
      tripStarted: true,
    }));

    const target = document.getElementById("full-trip-builder");

    if (!target) {
      return;
    }

    const headerOffset = 100;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });
  };

  /* =========================================================
     GENERATED ITINERARY AUTO SCROLL
  ========================================================= */

  useEffect(() => {
    if (!tripData.itineraryGenerated) {
      return undefined;
    }

    const scrollTimer = window.setTimeout(() => {
      const target = document.getElementById("generated-itinerary");

      if (!target) {
        return;
      }

      const headerOffset = 100;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth",
      });
    }, 120);

    return () => {
      window.clearTimeout(scrollTimer);
    };
  }, [tripData.itineraryGenerated, tripData.itineraryGenerationId]);

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="planTripPage">
      {/* =====================================================
          HERO
      ===================================================== */}

      <PlanTripHero content={planTripHero} />

      {/* =====================================================
          QUICK TRIP STARTER
      ===================================================== */}

      <QuickTripBuilder
        content={quickTripBuilderData}
        tripData={tripData}
        onChange={updateTripData}
        onBuildTrip={handleBuildTrip}
      />

      {/* =====================================================
          FULL CUSTOM TRIP BUILDER
      ===================================================== */}

      <FullTripBuilder
        tripData={tripData}
        content={quickTripBuilderData}
        onChange={updateTripData}
      />

      {/* =====================================================
          GENERATED ITINERARY
      ===================================================== */}

      <GeneratedItinerary tripData={tripData} />

      {/* =====================================================
          FLOATING TRIP SUMMARY
      ===================================================== */}

      <FloatingTripSummary tripData={tripData} content={quickTripBuilderData} />
    </main>
  );
}
