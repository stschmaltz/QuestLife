import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";

import { CustomTheme } from "../types/theme";

const ContainerView: React.FC<ViewProps> = ({ style, ...restProps }) => {
  const { colors } = useTheme<CustomTheme>();
  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
          flex: 1,
          justifyContent: "center",
        },
        style,
      ]}
      {...restProps}
    />
  );
};

export default ContainerView;
