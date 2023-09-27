import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  IconButton,
  MD3Colors,
  Text,
  useTheme,
} from "react-native-paper";

import ContainerView from "../../../src/components/ContainerView";
import LockedQuestView from "../../../src/components/Quest/QuestView/LockedQuestView";
import UnlockedQuestView from "../../../src/components/Quest/QuestView/UnlockedQuestView/UnlockedQuestView";
import QuestViewFooter from "../../../src/components/Quest/QuestViewFooter";
import ThemedButton from "../../../src/components/themed/ThemedButton";
import { useAuth } from "../../../src/context/AuthProvider";
import useFetchQuest from "../../../src/hooks/useFetchQuestPackage";
import { Quest } from "../../../src/services/firestore/quests";
import { CustomTheme } from "../../../src/types/theme";

function LoadingView() {
  return <ActivityIndicator size="large" />;
}

function ErrorView() {
  return <Text>Error loading quest</Text>;
}

export default function QuestPage() {
  const { colors } = useTheme<CustomTheme>();
  const params = useLocalSearchParams();
  const id = params.id as string | undefined;
  const { user, loadingUser } = useAuth();
  const [viewingIndex, setViewingIndex] = useState(0);
  const [viewedQuest, setViewedQuest] = useState<Quest | null | undefined>(
    null,
  );

  const {
    questPackage,
    error: fetchQuestError,
    loading: loadingQuest,
  } = useFetchQuest(id);

  useEffect(() => {
    console.log("questPackage", questPackage);
    const activeQuest = questPackage?.quests.find((quest) => quest.unlocked);
    setViewingIndex(activeQuest?.initialIndex || 0);
  }, [questPackage]);

  useEffect(() => {
    setViewedQuest(questPackage?.quests[viewingIndex]);
  }, [questPackage, viewingIndex]);

  if (!user || loadingUser) {
    return null;
  }

  return (
    <ContainerView
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {loadingQuest && <LoadingView />}
      {fetchQuestError && <ErrorView />}
      {questPackage && viewedQuest && (
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          {viewedQuest.unlocked ? (
            <UnlockedQuestView quest={viewedQuest} />
          ) : (
            <LockedQuestView
              quest={viewedQuest}
              unlockQuest={() => {
                setViewedQuest({ ...viewedQuest, unlocked: true });
              }}
            />
          )}
        </View>
      )}
      {questPackage && (
        <View
          style={{
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 40,
            alignItems: "center",
            paddingVertical: 20,
            backgroundColor: colors.primaryContainer,
          }}
        >
          <Text
            variant="bodyLarge"
            style={{ fontWeight: "bold", color: colors.primary }}
          >
            {questPackage.title}
          </Text>
          <QuestViewFooter
            onArrowLeftPress={() =>
              setViewingIndex((viewingIndex - 1) % questPackage.quests.length)
            }
            onArrowRightPress={() =>
              setViewingIndex((viewingIndex + 1) % questPackage.quests.length)
            }
            currentQuestIndex={viewingIndex}
            maxQuestIndex={questPackage.quests.length}
          />
        </View>
      )}
    </ContainerView>
  );
}
