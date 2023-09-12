import { Link } from "expo-router";
import React from "react";

export default function UnAuthorizedHome() {
  return (
    <>
      <Link href="/login">Login</Link>
      <Link href="/sign-up">sign up</Link>
    </>
  );
}
