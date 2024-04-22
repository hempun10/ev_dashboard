export interface UserDetails {
  UserID: number;
  username: string;
  email: string;
  password: string;
  profile?: null;
  verification: number;
  otp: string;
  userType: string;
  address?: null;
}
