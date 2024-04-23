export interface User {
  UserID: number;
  username: string;
  email: string;
  password: string;
  profile?: null;
  verification: number;
  otp: string;
  userType: string;
  address?: string | null;
}
