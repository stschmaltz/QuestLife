import React from "react";
import { Card, CardProps } from "react-native-paper";

type OutlinedCardProps = {
  mode: "outlined";
  elevation?: never;
};

type ElevatedCardProps = {
  mode?: "elevated";
  elevation?: number;
};

type ContainedCardProps = {
  mode?: "contained";
  elevation?: never;
};

const ThemedCard: React.FC<
  CardProps & (OutlinedCardProps | ElevatedCardProps | ContainedCardProps)
> = (props) => {
  return (
    <Card
      {...props}
      style={[
        {
          borderWidth: 2,
        },
        props.style,
      ]}
      contentStyle={[{}, props.contentStyle]}
    />
  );
};

export default ThemedCard;
