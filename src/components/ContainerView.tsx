import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";

const ContainerView: React.FC<ViewProps> = ({ style, ...restProps }) => {
  return <View style={[styles.container, style]} {...restProps} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ContainerView;
