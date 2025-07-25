export interface User {
  id: string;
  email: string;
  username?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
