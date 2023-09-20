import React from "react";

import { useAuth } from "../../context/AuthProvider";
import { logout } from "../../services/auth/auth";
import ThemedButton from "../themed/ThemedButton";

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

  return <ThemedButton onPress={handleLogout}>Logout</ThemedButton>;
}
