import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface Message {
  id?: string;
  userId: string;
  userName: string;
  userPhoto: string | null;
  text: string;
  imageUrl?: string;
  timestamp: Timestamp;
  createdAt: Date;
}
