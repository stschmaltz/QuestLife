import React from "react";
import { Text, useTheme } from "react-native-paper";

import { CustomTheme } from "../../../types/theme";
import { WizardOptionObject } from "../WizardController";
import ColoredScreenButton, {
  ValidColorMapIndexes,
} from "../components/ColoredScreenButton";
import ScreenContainer from "../components/ScreenContainer";
import ScreenTitleText from "../components/ScreenTitleText";

interface Props {
  options: WizardOptionObject[];
  onSelect: (value: WizardOptionObject) => void;
  onBack: () => void;
  selectedOption?: WizardOptionObject;
  screenIndex: number;
  title: string;
  secondaryText?: string;
}

const WizardScreen: React.FC<Props> = ({
  onSelect,
  onBack,
  options,
  selectedOption,
  screenIndex,
  title,
  secondaryText,
}) => {
  const { colors } = useTheme<CustomTheme>();
  const colorMap: Record<ValidColorMapIndexes, string> = {
    0: colors.primaryContainer,
    1: colors.secondaryContainer,
    2: colors.tertiaryContainer,
    3: colors.quaternaryContainer,
    4: colors.quinaryContainer,
  };

  const backgroundColor = colorMap[(screenIndex % 4) as ValidColorMapIndexes];

  console.log("WizardScreen", { title, options, selectedOption });
  return (
    <ScreenContainer backgroundColor={backgroundColor} onBack={onBack}>
      <ScreenTitleText title={title} />
      {secondaryText && (
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", marginBottom: 30 }}
        >
          {" "}
          {secondaryText}
        </Text>
      )}
      {options.map((option, index) => (
        <ColoredScreenButton
          key={option.value}
          index={screenIndex + index + 1}
          onPress={() => onSelect(option)}
          toggled={selectedOption?.value === option.value}
        >
          {option.label}
        </ColoredScreenButton>
      ))}
    </ScreenContainer>
  );
};

export default WizardScreen;
