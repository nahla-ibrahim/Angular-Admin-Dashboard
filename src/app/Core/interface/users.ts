export interface Users {
  users: user[];
  total: number;
  skip: number;
  limit?: number;
}

export interface user {
  id: number;
  firstName: string;
  age: number;
  email: string;
  phone: string;
  role: 'admin' | 'moderator' | 'user';
}
