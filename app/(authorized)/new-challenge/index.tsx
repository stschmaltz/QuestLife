import React from "react";
import { Text } from "react-native-paper";

import WizardController from "../../../src/components/ChallengeWizard/WizardController";
import ContainerView from "../../../src/components/ContainerView";

export default function NewChallenge() {
  return (
    <ContainerView>
      <Text>new challenge</Text>
      <WizardController />
    </ContainerView>
  );
}
