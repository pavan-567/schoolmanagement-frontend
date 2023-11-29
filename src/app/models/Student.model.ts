import { Payment } from './Payment.model';

export interface Student {
  id?: number;
  name: string;
  fatherName: string;
  motherName: string;
  phoneNo: number;
  address: string;
  prevSchool: string;
  cast: string;
  gender: string;
  dob: Date;
  aadharNo: string;
  status: number;
  dateOfJoining: Date;
  imageData?: Blob;
  imageName?: string;
  feeId?: string;
  actualFee?: number;
  transportFee?: number;
  bookFee?: number;
  tutionFee?: number;
  discount?: number;
  totalFee?: number;
  standard?: string;
  year?: number;
  payment?: Payment[];
}
