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
export interface SuratModel {
  id: string;
  subject: string;
  author: User;
  receiver: string;
  file: string;
  status: boolean;
  noted: string | null;
  validationStage: ValidationStage;
  validationStageId: string;
  validationStatus: boolean;
  notes: SuratNote[];
  createdAt: Date;
}
export interface ConfirmedSuratModel {
  id: string;
  subject: string;
  author: { name: string };
  receiver: string;
  createdAt: Date;
}
