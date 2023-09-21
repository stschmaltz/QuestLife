import React from "react";
import { useTheme } from "react-native-paper";

import { CustomTheme } from "../../../types/theme";
import { WizardOptionObject } from "../WizardController";
import ColoredScreenButton, {
  ValidColorMapIndexes,
} from "../components/ColoredScreenButton";
import ScreenContainer from "../components/ScreenContainer";
import ScreenTitleText from "../components/ScreenTitleText";

interface Props {
  options: WizardOptionObject[];
  onSelect: (value: string) => void;
  onBack: () => void;
  selectedOption?: string;
  screenIndex: number;
  title: string;
}

const WizardScreen: React.FC<Props> = ({
  onSelect,
  onBack,
  options,
  selectedOption,
  screenIndex,
  title,
}) => {
  const { colors } = useTheme<CustomTheme>();
  const colorMap: Record<ValidColorMapIndexes, string> = {
    0: colors.primaryContainer,
    1: colors.secondaryContainer,
    2: colors.tertiaryContainer,
    3: colors.quaternaryContainer,
  };

  const backgroundColor = colorMap[(screenIndex % 4) as ValidColorMapIndexes];

  return (
    <ScreenContainer backgroundColor={backgroundColor} onBack={onBack}>
      <ScreenTitleText title={title} />
      {options.map(({ value, label }, index) => (
        <ColoredScreenButton
          key={value}
          index={screenIndex + index + 1}
          onPress={() => onSelect(value)}
          toggled={selectedOption === value}
        >
          {label}
        </ColoredScreenButton>
      ))}
    </ScreenContainer>
  );
};

export default WizardScreen;
