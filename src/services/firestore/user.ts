import { doc, setDoc } from "firebase/firestore";

import { firestore } from "../../../firebase.config";
import { UserObject } from "../../types/user";

interface UserData {
  email: string;
  uid: string;
  emailVerified: boolean;
}

export const saveUser = async (user: UserData): Promise<UserObject> => {
  const userRef = doc(firestore, "users", user.uid);
  await setDoc(userRef, user);

  return {
    email: user.email,
    uid: user.uid,
    emailVerified: user.emailVerified,
  };
};
