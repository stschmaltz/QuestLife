import React from "react";
import { Text } from "react-native-paper";

interface Props {
  title: string;
}

const ScreenTitleText: React.FC<Props> = ({ title }) => {
  return (
    <Text
      variant="headlineMedium"
      style={{ textAlign: "center", marginBottom: 30, fontWeight: "bold" }}
    >
      {title}
    </Text>
  );
};

export default ScreenTitleText;
