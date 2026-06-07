export interface Users {
  users: user[];
  total: number;
  skip: number;
  limit?: number;
}

export interface user {
  id?: number;
  firstName: string;
  age: string;
  email: string;
  phone: string;
  role: 'admin' | 'moderator' | 'user';
  lastName?: string;
  image?: string;
  gender?: 'male' | 'female' | 'other';
  birthDate?: string;
  university?: string;
  company?: {
    name: string;
    title: string;
    department: string;
  };
  bank?: {
    cardNumber: string;
    cardType: string;
    currency: string;
  };
  address?: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };
}
