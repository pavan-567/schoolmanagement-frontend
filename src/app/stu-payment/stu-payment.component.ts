import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../services/StuSearch.service';
import { StudentFee } from '../models/StudentFee.model';
import { NgForm } from '@angular/forms';
import { Payment } from '../models/Payment.model';
import { Student } from '../models/Student.model';
import { Stu } from '../models/Stud.model';

@Component({
  selector: 'app-stu-payment',
  templateUrl: './stu-payment.component.html',
  styleUrls: ['./stu-payment.component.css'],
})
export class StuPaymentComponent implements OnInit {
  constructor(private service: SearchService) {}
  stuFee: StudentFee = null;
  isWarning: boolean = false;
  editMode: boolean = false;

  @ViewChild('submitForm') form: NgForm;

  ngOnInit(): void {}

  onClickEdit(payment: Payment) {
    console.log(payment);
    this.form.form.patchValue({
      paymentId: payment.id,
    })
  }

  calculateBalance(stuFee: StudentFee) {
    let totalPaidFee = this.stuFee.student.payments.reduce(
      (accumlator, payment) => accumlator + payment.paidFee,
      0
    );
    let bal = this.stuFee.totalFee - totalPaidFee;
    return bal > 0 ? bal : 0;
  }

  onSubmit(form: NgForm) {
    const { id, standard } = form.value;
    console.log(form.value);
    this.service.fetchStuFeeData(id).subscribe(
      (data: StudentFee) => {
        if (data && data.standard === standard) {
          this.error = null;
          this.stuFee = data;
          this.stuFee['balance'] = this.calculateBalance(this.stuFee);
          this.fetched = true;
        } else {
          this.error = 'Results Not Found For Given Student ID and Standard!';
          this.isWarning = true;
        }
      },
      (error) => {
        this.error =
          'There Is an Error With Server, So Please Try Again Later!';
        this.isWarning = false;
      }
    );
    form.reset();
  }

  onSubmitFeeForm(form: NgForm) {
    console.log(form.value);
    console.log(this.stuFee);
    const { totalFee, standard, discount, amount, student_id, paymentId } =
      form.value;

    let payment: Payment = {
      id: paymentId,
      totalFee: totalFee,
      standard: standard,
      discount: discount,
      paidFee: amount,
    };

    if (this.editMode === false) {
      payment.id = 0;
    }

    this.service
      .insertPaymentDetail(student_id, payment)
      .subscribe((res: Stu) => {
        this.stuFee.student.payments = res.payments;

        form.form.patchValue({
          amount: '',
          balance: this.calculateBalance(this.stuFee),
        });
        this.stuFee.student.payments = res.payments;
      });
  }

  fetched: boolean = false;
  error: string = null;
}
