import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import ScreenButton from "./ScreenButton";
import { CustomTheme } from "../../../theme/theme.types";

interface Props {
  backgroundColor: string;
  children: React.ReactNode;
  onBack?: () => void;
  hideBackButton?: boolean;
}

const ScreenContainer: React.FC<Props> = ({
  onBack,
  backgroundColor,
  children,
  hideBackButton,
}) => {
  const { colors } = useTheme<CustomTheme>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        justifyContent: "center",
        padding: 16,
        width: "100%",
      }}
    >
      {children}
      {onBack && !hideBackButton && (
        <View
          style={{ position: "absolute", bottom: 20, width: "100%", left: 16 }}
        >
          <ScreenButton
            style={{
              alignSelf: "flex-end",
              width: "100%",
              backgroundColor: colors.backButton,
            }}
            onPress={onBack}
          >
            Back
          </ScreenButton>
        </View>
      )}
    </View>
  );
};

export default ScreenContainer;
