import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, useTheme, Card, Divider } from "react-native-paper";

import { CustomTheme } from "../../../types/theme";
import { Context } from "../WizardStateMachine";
import ScreenButton from "../components/ScreenButton";
import ScreenContainer from "../components/ScreenContainer";
import ScreenTitleText from "../components/ScreenTitleText";

interface SummaryProps {
  context: Context;
  onBack: () => void;
  onConfirm: () => void;
}

const SummaryScreen: React.FC<SummaryProps> = ({
  context,
  onBack,
  onConfirm,
}) => {
  const { colors } = useTheme<CustomTheme>();

  if (
    !context.budget ||
    !context.category ||
    !context.duration ||
    !context.interests ||
    !context.objective
  ) {
    return null;
  }

  return (
    <ScreenContainer backgroundColor={colors.background} onBack={onBack}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenTitleText title="Your Quest Preferences" />

        <Card style={styles.cardStyle}>
          <Card.Title
            style={{
              backgroundColor: colors.primary,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            title="Category"
            titleStyle={{ fontWeight: "bold" }}
          />
          <Card.Content
            style={{
              backgroundColor: colors.primary,
            }}
          >
            <Text style={styles.textStyle}>{context.category.label}</Text>
          </Card.Content>
          <Divider />
          <Card.Title
            style={{
              backgroundColor: colors.secondary,
            }}
            title="Interests"
            titleStyle={{ fontWeight: "bold" }}
          />
          <Card.Content
            style={{
              backgroundColor: colors.secondary,
            }}
          >
            <Text style={styles.textStyle}>
              {context.interests.map((interest) => interest.label).join(", ")}
            </Text>
          </Card.Content>
          <Divider />
          <Card.Title
            style={{
              backgroundColor: colors.tertiary,
            }}
            title="Objective"
            titleStyle={{ fontWeight: "bold" }}
          />
          <Card.Content
            style={{
              backgroundColor: colors.tertiary,
            }}
          >
            <Text style={styles.textStyle}>{context.objective.label}</Text>
          </Card.Content>
          <Divider />
          <Card.Title
            style={{
              backgroundColor: colors.quaternary,
            }}
            title="Duration"
            titleStyle={{ fontWeight: "bold" }}
          />
          <Card.Content
            style={{
              backgroundColor: colors.quaternary,
            }}
          >
            <Text style={styles.textStyle}>{context.duration.label}</Text>
          </Card.Content>
          <Divider />
          <Card.Title
            style={{
              backgroundColor: colors.quinary,
            }}
            title="Budget"
            titleStyle={{ fontWeight: "bold" }}
          />
          <Card.Content
            style={{
              backgroundColor: colors.quinary,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text style={styles.textStyle}>{context.budget.label}</Text>
          </Card.Content>
        </Card>
      </ScrollView>
      <View
        style={{ position: "absolute", bottom: 80, width: "100%", left: 16 }}
      >
        <ScreenButton
          style={{
            alignSelf: "flex-end",
            width: "100%",
          }}
          onPress={onConfirm}
        >
          Confirm
        </ScreenButton>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
    borderWidth: 3,
  },
  textStyle: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  editButton: {
    width: "100%",
  },
});

export default SummaryScreen;
