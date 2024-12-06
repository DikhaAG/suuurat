import { Surat, User } from "@prisma/client";

export interface UserModel {
  id: string;
  name: string;
  isAdmin: boolean;
  password: string;
  surat: Surat[];
  createdAt: Date;
}
export interface SuratModel {
  id: string;
  subject: string;
  author: User;
  receiver: string;
  file: string;
  status: boolean;
  noted: string | null;
  createdAt: Date;
}
export interface ConfirmedSuratModel {
  id: string;
  subject: string;
  author: { name: string };
  receiver: string;
  createdAt: Date;
}
