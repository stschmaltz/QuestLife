import { FirebaseError } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { mapFirebaseError } from "./firebaseErrors";
import { UserObject } from "../../types/user";
import { saveUser } from "../firestore/user";

const auth = getAuth();

async function signUpWithEmail(input: {
  email: string;
  password: string;
}): Promise<UserObject> {
  try {
    const { email, password } = input;

    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await saveUser({
      email: userCredential.user.email!,
      uid: userCredential.user.uid,
      emailVerified: userCredential.user.emailVerified,
    });

    return {
      email: userCredential.user.email!,
      emailVerified: false,
      uid: userCredential.user.uid,
    };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const userFriendlyMessage = mapFirebaseError(error.code);

      throw new Error(userFriendlyMessage);
    }

    throw new Error("An error occurred while signing up.");
  }
}

async function signInWithEmail(credentials: {
  email: string;
  password: string;
}): Promise<void> {
  await signInWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password,
  );
}

async function logout(): Promise<void> {
  const auth = getAuth();
  await signOut(auth);
}

export { signUpWithEmail, signInWithEmail, logout };
