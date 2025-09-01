export default interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  photoUrl?: string;
  friendsList?: User[];
  createdAt?: string;
  updatedAt?: string;
}
