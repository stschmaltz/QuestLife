import { UserObject } from "./user.types";
import { FirestoreDatabase } from "../firestoreDatabase";

class UserDatabase extends FirestoreDatabase<UserObject> {
  constructor() {
    super("users");
  }
}

export { UserDatabase };
