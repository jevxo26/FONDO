export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avatar: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  role: string;
  status: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}
