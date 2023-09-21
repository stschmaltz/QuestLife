import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { CustomTheme } from "../../../types/theme";
import { formatEnumValue } from "../../../utils/string-helper";
import ColoredScreenButton from "../components/ColoredScreenButton";
import ScreenButton from "../components/ScreenButton";
import ScreenContainer from "../components/ScreenContainer";
import ScreenTitleText from "../components/ScreenTitleText";

interface Props {
  interests: string[];
  onSelectInterest: (interest: string) => void;
  onDone: () => void;
  onBack: () => void;
}

const InterestsScreen: React.FC<Props> = ({
  interests,
  onSelectInterest,
  onDone,
  onBack,
}) => {
  const { colors } = useTheme<CustomTheme>();

  return (
    <ScreenContainer backgroundColor={colors.primaryContainer} onBack={onBack}>
      <ScreenTitleText title="What are some of your interests?" />
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 10,
        }}
      >
        {[
          "FOOD",
          "EXERCISE",
          "INDOOR_SPORTS",
          "VIDEO_GAMES",
          "OUTDOOR_SPORTS",
          "MUSIC",
          "MOVIES",
          "ARTS_AND_CRAFTS",
          "READING",
          "WRITING",
          "COOKING",
        ]
          .filter((interest) => interest !== "")
          .map((interest, index) => (
            <ColoredScreenButton
              key={interest}
              index={index}
              onPress={() => onSelectInterest(interest)}
              toggled={interests.includes(interest)}
              style={{
                width: "45%",
              }}
            >
              {formatEnumValue(interest)}
            </ColoredScreenButton>
          ))}
      </View>
      <ScreenButton onPress={onDone} style={{ marginTop: 50 }}>
        Done
      </ScreenButton>
    </ScreenContainer>
  );
};

export default InterestsScreen;
