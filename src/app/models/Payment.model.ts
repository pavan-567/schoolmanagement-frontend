export interface Payment {
  id?: number;
  totalFee: number;
  standard: string;
  discount: number;
  dateOfPayment?: Date;
  paidFee: number;
}
