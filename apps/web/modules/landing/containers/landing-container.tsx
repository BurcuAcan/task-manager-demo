"use client";

import { HeroSection } from "../components/hero-section";
import { FeatureCard } from "../components/feature-card";
import { CTAButtons } from "../components/cta-buttons";
import { DemoAccountsInfo } from "../components/demo-accounts-info";
import { useLandingRedirect } from "../hooks/use-landing-redirect";
import { FEATURES } from "../constants/landing.constants";

export function LandingContainer() {
  useLandingRedirect();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 p-4">
      <div className="max-w-4xl space-y-8 text-center">
        <HeroSection />

        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              iconColor={feature.iconColor}
            />
          ))}
        </div>

        <CTAButtons />

        <DemoAccountsInfo />
      </div>
    </main>
  );
}
