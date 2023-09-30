import React from "react";
import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

import { CustomTheme } from "../../../types/theme";

interface Props {
  onArrowRightPress: () => void;
  onArrowLeftPress: () => void;
  currentQuestIndex: number;
  maxQuestIndex: number;
  questPackageTitle: string;
}

const QuestViewFooter: React.FC<Props> = ({
  currentQuestIndex,
  maxQuestIndex,
  onArrowLeftPress,
  onArrowRightPress,
  questPackageTitle,
}) => {
  const { colors } = useTheme<CustomTheme>();
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: colors.primaryContainer,
        borderBlockColor: colors.shadow,
        borderTopWidth: 1,
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          width: "100%",
          borderBlockColor: colors.shadow,
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
        <View style={{ alignItems: "center", flex: 1, paddingHorizontal: 5 }}>
          <Text variant="bodyLarge" style={{ color: colors.primary }}>
            {questPackageTitle}
          </Text>
          <Text
            variant="headlineLarge"
            style={{ color: colors.primary, fontWeight: "bold" }}
          >
            {currentQuestIndex + 1}/{maxQuestIndex}
          </Text>
        </View>
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
    </View>
  );
};

export default QuestViewFooter;
