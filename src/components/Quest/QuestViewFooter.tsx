import React from "react";
import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

import { CustomTheme } from "../../types/theme";

interface Props {
  onArrowRightPress: () => void;
  onArrowLeftPress: () => void;
  currentQuestIndex: number;
  maxQuestIndex: number;
}

const QuestViewFooter: React.FC<Props> = ({
  currentQuestIndex,
  maxQuestIndex,
  onArrowLeftPress,
  onArrowRightPress,
}) => {
  const { colors } = useTheme<CustomTheme>();
  return (
    <View
      style={{
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 40,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <IconButton
        icon="arrow-left"
        mode="contained"
        iconColor={colors.primary}
        size={40}
        style={{
          borderColor: colors.primary,
          borderWidth: 3,
          backgroundColor: colors.primaryContainer,
        }}
        onPress={() => onArrowLeftPress()}
      />
      <Text
        variant="headlineLarge"
        style={{ color: colors.primary, fontWeight: "bold" }}
      >
        {currentQuestIndex + 1}/{maxQuestIndex}
      </Text>
      <IconButton
        icon="arrow-right"
        mode="contained"
        style={{
          borderColor: colors.primary,
          borderWidth: 3,
          backgroundColor: colors.primaryContainer,
        }}
        iconColor={colors.primary}
        size={40}
        onPress={() => onArrowRightPress()}
      />
    </View>
  );
};

export default QuestViewFooter;
