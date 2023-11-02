export type User = {
  id: string;
  image: string;
  name: string;
  email: string;
  password: string,
  friends: string[]
};

export type UpdateUser= {
  image?: string;
  name?: string;
  email?: string;
  password?: string,
  friends?: string[]
}
