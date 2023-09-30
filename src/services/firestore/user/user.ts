import { UserData, UserObject } from "./user.types";
import { UserDatabase } from "./userDatabase";

class UserManager {
  private db = new UserDatabase();

  async saveUser(user: UserData): Promise<UserObject> {
    await this.db.save(user);
    return user;
  }
}

export { UserManager };
