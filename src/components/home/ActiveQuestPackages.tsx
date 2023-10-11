import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import QuestPackageCarousel from "./QuestPackageCarousel";
import { QuestPackage } from "../../services/firestore/quests/quest.types";

interface Props {
  questPackages: QuestPackage[];
  isLoading: boolean;
}

const ActiveQuestPackages: React.FC<Props> = ({ questPackages, isLoading }) => {
  return (
    <View
      style={{
        width: "100%",
        minHeight: 200,
      }}
    >
      <View
        style={{
          padding: 20,
          paddingBottom: 0,
          backgroundColor: "inherit",
        }}
      >
        <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
          Active Quest Packages
        </Text>
      </View>
      {isLoading ? (
        <View
          style={{
            height: 150,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" animating={isLoading} />
        </View>
      ) : questPackages.length === 0 ? (
        <View
          style={{
            padding: 20,
            height: 100,
            justifyContent: "center",
          }}
        >
          <Text>There are no active quests right now.</Text>
          <Text>Generate some more to continue the adventure!</Text>
        </View>
      ) : (
        <QuestPackageCarousel questPackages={questPackages} />
      )}
    </View>
  );
};

export default ActiveQuestPackages;
