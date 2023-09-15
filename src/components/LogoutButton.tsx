import React from "react";
import { Button } from "react-native-paper";

import { useAuth } from "../../src/context/AuthProvider";
import { logout } from "../services/auth/auth";

export default function LogoutButton() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
      throw new Error("Error logging out");
    }
  };

  if (!user) {
    return null;
  }

  return <Button onPress={handleLogout}>Logout</Button>;
}
