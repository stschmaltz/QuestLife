import React from "react";
import { Text } from "react-native-paper";

interface Props {
  title: string;
}

const ScreenTitleText: React.FC<Props> = ({ title }) => {
  return (
    <Text
      variant="headlineMedium"
      style={{
        textAlign: "center",
        marginTop: 0,
        marginBottom: 20,
        fontWeight: "bold",
      }}
    >
      {title}
    </Text>
  );
};

export default ScreenTitleText;
