import { useState, useEffect } from "react";

import { WizardOutputManager } from "../services/firestore/wizardOutput/wizardOutput";
import { WizardOutput } from "../services/firestore/wizardOutput/wizardOutput.types";

function useFetchWizardOutput(id: string | undefined) {
  const [wizardOutput, setWizardOutput] = useState<WizardOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuest = async () => {
      const wizardOutputManager = new WizardOutputManager();

      if (!id) {
        return;
      }

      try {
        const fetchedQuest = await wizardOutputManager.findById(id);
        if (fetchedQuest) {
          setWizardOutput(fetchedQuest);
        } else {
          setError("Wizard output not found");
        }
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        console.log("Error fetching wizardOutput:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuest();
  }, [id]);

  return { wizardOutput, loading, error };
}

export default useFetchWizardOutput;
