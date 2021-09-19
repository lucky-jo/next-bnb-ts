export type UserType = {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage?: string;
};

export type StoredUserType = {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage: string;
};
