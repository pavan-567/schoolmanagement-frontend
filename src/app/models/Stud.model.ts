import { Payment } from './Payment.model';
import { StudentFee } from './StudentFee.model';

export interface Stu {
  id: number;
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
  imageName: string;
  studentFee?: StudentFee;
  payments: Payment[];
}
