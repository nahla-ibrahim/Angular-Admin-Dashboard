export interface Users {
  users: user[];
  total: number;
  skip: number;
  limit?: number;
}

export interface user {
  id: number;
  firstName: string;
  age: string;
  email: string;
  phone: string;
  role: 'admin' | 'moderator' | 'user';
}

export interface headers {
  key: string;
  label: string;
}
