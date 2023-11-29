import { Stu } from './Stud.model';
import { Student } from './Student.model';

export interface StudentFee {
  id: number;
  actualFee: number;
  transportFee: number;
  bookFee: number;
  tutionFee: number;
  discount: number;
  totalFee: number;
  standard: string;
  year: number;
  student: Stu;
  balance?: number;
}
