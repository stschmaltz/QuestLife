import React from "react";
import { Text, useTheme } from "react-native-paper";

import { CustomTheme } from "../../../types/theme";
import ScreenContainer from "../components/ScreenContainer";

interface Props {
  onBack: () => void;
  context: Record<string, unknown>;
}

const SummaryScreen: React.FC<Props> = ({ onBack, context }) => {
  const { colors } = useTheme<CustomTheme>();

  console.log(context);
  return (
    <ScreenContainer backgroundColor={colors.primaryContainer} onBack={onBack}>
      <Text>SummaryScreen</Text>
    </ScreenContainer>
  );
};

export default SummaryScreen;
