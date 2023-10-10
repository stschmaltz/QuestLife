import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { firestore } from "../../../firebase.config";

abstract class FirestoreDatabase<T extends { [x: string]: any }> {
  protected ref: ReturnType<typeof collection>;

  constructor(collectionName: string) {
    this.ref = collection(firestore, collectionName);
  }

  async save(data: T & { id?: string }): Promise<void> {
    const documentRef = data.id ? doc(this.ref, data.id) : doc(this.ref);
    await setDoc(documentRef, data);
  }

  async findById(id: string): Promise<T | null> {
    const document = await getDoc(doc(this.ref, id));

    if (!document.exists()) {
      return null;
    }

    return document.data() as T;
  }

  async findByField(fieldName: string, value: any, x?: number): Promise<T[]> {
    let queryRef = query(this.ref, where(fieldName, "==", value));

    if (x) {
      queryRef = query(queryRef, orderBy("createdAt", "desc"), limit(x));
    }

    const result = await getDocs(queryRef);
    return result.docs.map((doc) => doc.data() as T);
  }

  async findOneByField(fieldName: string, value: any): Promise<T | null> {
    const result = await this.findByField(fieldName, value, 1);
    return result[0] || null;
  }

  async findAllByUserId(userId: string): Promise<T[]> {
    return this.findByField("uid", userId);
  }

  async update(id: string, data: T): Promise<void> {
    await setDoc(doc(this.ref, id), data);
  }

  generateId(): string {
    return doc(this.ref).id;
  }
}

export { FirestoreDatabase };
