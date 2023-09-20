import React from "react";

import WizardController from "../../../src/components/ChallengeWizard/WizardController";
import ContainerView from "../../../src/components/ContainerView";

export default function NewChallenge() {
  return (
    <ContainerView style={{ alignItems: "center" }}>
      <WizardController />
    </ContainerView>
  );
}
