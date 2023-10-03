import React, { createContext, useContext, useEffect, useState } from "react";

import { QuestPackage } from "../services/firestore/quests/quest.types";

const QuestPackageContext = createContext<{
  questPackage: QuestPackage | null;
  setQuestPackage: React.Dispatch<React.SetStateAction<QuestPackage | null>>;
  loadingQuestPackage: boolean;
}>({
  questPackage: null,
  setQuestPackage: () => {},
  loadingQuestPackage: true,
});

export const useQuestPackage = () => useContext(QuestPackageContext);

export function QuestPackageProvider({ children }: { children: JSX.Element }) {
  const [questPackage, setQuestPackage] = useState<QuestPackage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (questPackage) {
      setLoading(false);
    }
  }, [questPackage]);

  return (
    <QuestPackageContext.Provider
      value={{ questPackage, setQuestPackage, loadingQuestPackage: loading }}
    >
      {children}
    </QuestPackageContext.Provider>
  );
}
