import { Tabs } from "expo-router";

import { useAuth, useProtectedRoute } from "../../src/context/AuthProvider";

export default function AuthorizedLayout() {
  const { user } = useAuth();
  useProtectedRoute(user);

  return (
    <>
      <Tabs>
        <Tabs.Screen name="home/index" options={{ title: "Home" }} />
        <Tabs.Screen name="account/index" options={{ title: "account" }} />
      </Tabs>
    </>
  );
}
