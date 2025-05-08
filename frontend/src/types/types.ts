export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Chat {
  _id: string;
  firstName: string;
  lastName: string;
  userId: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  chatId: string;
  userId: string;
  text: string;
  isBot: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
}
