import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { CustomTheme } from "../../../theme/theme.types";
import { WizardOptionObject } from "../WizardController";
import ColoredScreenButton from "../components/ColoredScreenButton";
import ScreenButton from "../components/ScreenButton";
import ScreenContainer from "../components/ScreenContainer";
import ScreenTitleText from "../components/ScreenTitleText";

interface Props {
  title: string;
  selectedOptions: WizardOptionObject[];
  onToggleOption: (option: WizardOptionObject) => void;
  onDone: () => void;
  onBack: () => void;
  secondaryText?: string;
  allOptions: WizardOptionObject[];
}

const WizardMultiToggleScreen: React.FC<Props> = ({
  title,
  selectedOptions,
  secondaryText,
  onToggleOption,
  onDone,
  onBack,
  allOptions,
}) => {
  const { colors } = useTheme<CustomTheme>();

  return (
    <ScreenContainer backgroundColor={colors.primaryContainer} onBack={onBack}>
      <ScreenTitleText title={title} />
      {secondaryText && (
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", marginBottom: 30 }}
        >
          {secondaryText}
        </Text>
      )}
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 10,
        }}
      >
        {allOptions
          .filter((option) => !!option)
          .map((option, index) => (
            <ColoredScreenButton
              key={option.value}
              index={index}
              onPress={() => onToggleOption(option)}
              toggled={selectedOptions.some(
                (selectedOption) => selectedOption.value === option.value,
              )}
              style={{}}
            >
              {option.label}
            </ColoredScreenButton>
          ))}
      </View>
      <ScreenButton onPress={onDone} style={{ marginTop: 10 }}>
        Done
      </ScreenButton>
    </ScreenContainer>
  );
};

export default WizardMultiToggleScreen;
