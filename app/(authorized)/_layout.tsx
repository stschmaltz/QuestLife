import { Tabs } from "expo-router";

export default function AuthorizedLayout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="home/index" options={{ title: "Home" }} />
        <Tabs.Screen name="account/index" options={{ title: "account" }} />
      </Tabs>
    </>
  );
}
