// openaiContext.ts
import React, { useContext } from "react";

import { OpenAIApi } from "../services/openai/gpt";

const OpenAIContext = React.createContext<OpenAIApi | null>(null);

export const useOpenAI = () => useContext(OpenAIContext);

export function OpenAIApiProvider({
  children,
  openAIApi,
}: {
  children: JSX.Element;
  openAIApi: OpenAIApi;
}) {
  return (
    <OpenAIContext.Provider value={openAIApi}>
      {children}
    </OpenAIContext.Provider>
  );
}
