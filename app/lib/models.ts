import {
  Surat,
  User,
  ValidationStage,
  SuratNote,
  $Enums,
} from "@prisma/client";

export interface UserModel {
  id: string;
  name: string;
  password: string;
  role: $Enums.Role;
  surats: Surat[];
  validationStage: ValidationStage | null;
  suratNotes: SuratNote[];
  updatedAt: Date;
  createdAt: Date;
}

export interface ValidationStageModel {
  id: string;
  title: number;
  validator: UserModel;
  surat: Surat[];
}

export interface SuratModel {
  id: string;
  subject: string;
  author: User;
  receiver: string;
  file: string;
  validationStage: ValidationStage | null;
  validationStatus: boolean;
  notes: SuratNote[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestedSuratTableModel {
  id: string;
  subject: string;
  author: UserModel;
  receiver: string;
  validationStage: ValidationStageModel | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConfirmedSuratTableModel {
  id: string;
  subject: string;
  author: UserModel;
  receiver: string;
  createdAt: Date;
}
