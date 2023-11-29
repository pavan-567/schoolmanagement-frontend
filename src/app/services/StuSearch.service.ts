import { Injectable, OnInit } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Student } from '../models/Student.model';
import { HttpClient } from '@angular/common/http';
import { StudentFee } from '../models/StudentFee.model';
import { Payment } from '../models/Payment.model';

@Injectable({ providedIn: 'root' })
export class SearchService implements OnInit {
  private API = 'https://schoolmanagement-backend-production.up.railway.app/studentAPI';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fetchStuData() {
    return this.http.get<Student[]>(`${this.API}/students`);
  }

  fetchStuSpecificData(year: number, standard: string) {
    return this.http.get<Student[]>(`${this.API}/student/${year}/${standard}`);
  }

  fetchStuFeeData(id: number) {
    return this.http.get<StudentFee>(`${this.API}/student-fee-excl/${id}`);
  }

  insertPaymentDetail(id: number, payment: Payment) {
    return this.http.post(`${this.API}/student-payment/${id}`, payment);
  }
}
