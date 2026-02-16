interface UserBase {
  username: string;
  email: string;
}

export interface UserRead extends UserBase{
  id: number;
  roles: string;
}

export interface UserCreate extends UserBase{
  passwordHash: string;
}

export interface UserUpdate {
  username: string | null;
  email: string | null;
}

export interface UserUpdateRoles {
  roles: string;
}

export interface UserChangePassword {
  currentPassword: string;
  newPassword: string;
}