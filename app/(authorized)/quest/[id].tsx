import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import ContainerView from "../../../src/components/ContainerView";
import LockedQuestView from "../../../src/components/Quest/QuestView/LockedQuestView";
import QuestTitle from "../../../src/components/Quest/QuestView/QuestTitle";
import QuestViewFooter from "../../../src/components/Quest/QuestView/QuestViewFooter";
import CompletedQuestView from "../../../src/components/Quest/QuestView/UnlockedQuestView/CompletedQuestView";
import UnlockedQuestView from "../../../src/components/Quest/QuestView/UnlockedQuestView/UnlockedQuestView";
import { useAuth } from "../../../src/context/AuthProvider";
import useFetchQuest from "../../../src/hooks/useFetchQuestPackage";
import useQuestManager from "../../../src/hooks/useQuestManager";
import {
  Quest,
  QuestPackage,
} from "../../../src/services/firestore/quests/quest.types";

function LoadingView() {
  return <ActivityIndicator size="large" />;
}

function ErrorView() {
  return <Text>Error loading quest</Text>;
}

export default function QuestPage() {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const { user, loadingUser } = useAuth();
  const [viewingIndex, setViewingIndex] = useState(0);
  const [viewedQuest, setViewedQuest] = useState<Quest | null | undefined>(
    null,
  );

  const {
    questPackage: initialQuestPackage,
    error: fetchQuestError,
    loading: loadingQuest,
  } = useFetchQuest(id);

  const {
    questPackage: updatedQuestPackage,
    unlockQuest: handleUnlock,
    completeQuest: handleComplete,
  } = useQuestManager(id);

  const questPackage = updatedQuestPackage || initialQuestPackage;

  useEffect(() => {
    const activeQuest = initialQuestPackage?.quests.find(
      (quest: Quest) => quest.unlocked,
    );
    setViewingIndex(activeQuest?.initialIndex || 0);
  }, [initialQuestPackage]);

  useEffect(() => {
    setViewedQuest(questPackage?.quests[viewingIndex]);
  }, [questPackage, viewingIndex]);

  if (!user || loadingUser) {
    return null;
  }

  const renderQuestView = (questPackage: QuestPackage, activeQuest: Quest) => {
    if (activeQuest.completedOn) {
      return (
        <CompletedQuestView
          quest={activeQuest}
          submitUserFeedback={(viewedQuest) => {
            console.log("submitUserFeedback", viewedQuest);
          }}
          uploadMemories={(viewedQuest) => {
            console.log("uploadMemories", viewedQuest);
          }}
        />
      );
    }

    if (activeQuest.unlocked) {
      return (
        <UnlockedQuestView
          quest={activeQuest}
          completeQuest={(viewedQuest) =>
            handleComplete(viewedQuest.initialIndex)
          }
        />
      );
    }

    return (
      <LockedQuestView
        quest={activeQuest}
        unlockQuest={async () => {
          await handleUnlock(activeQuest.initialIndex);
        }}
      />
    );
  };

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
          <View style={{ flex: 1, width: "100%", maxHeight: 100 }}>
            <QuestTitle title={viewedQuest.challengeTitle} />
          </View>
          {renderQuestView(questPackage, viewedQuest)}
        </View>
      )}
      {questPackage && (
        <QuestViewFooter
          questPackageTitle={questPackage.title}
          currentQuestIndex={viewingIndex}
          maxQuestIndex={questPackage.quests.length}
          onArrowLeftPress={() => {
            setViewingIndex((prevIndex) => {
              if (prevIndex === 0) {
                return questPackage.quests.length - 1;
              }
              return prevIndex - 1;
            });
          }}
          onArrowRightPress={() => {
            setViewingIndex(
              (prevIndex) => (prevIndex + 1) % questPackage.quests.length,
            );
          }}
        />
      )}
    </ContainerView>
  );
}
