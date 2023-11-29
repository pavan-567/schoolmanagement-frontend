import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../services/Student.service';
import { Student } from '../models/Student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentFee } from '../models/StudentFee.model';
import { Stu } from '../models/Stud.model';

@Component({
  selector: 'app-stu-edit',
  templateUrl: './stu-edit.component.html',
  styleUrls: ['./stu-edit.component.css'],
})
export class StuEditComponent implements OnInit {
  studentDet: StudentFee = null;
  @ViewChild('form') form: NgForm;
  isFetched: boolean = false;

  constructor(
    private stu: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.stu.fetchStuFeeData(id).subscribe((resData) => {
      this.studentDet = resData;
      this.isFetched = true;
    });
  }

  onFormSubmit(form: NgForm) {
    const { studentData, feeData } = form.value;
    console.log(studentData, feeData);

    const fee: StudentFee = feeData;

    // Attaching Required Data Before Sending To Database
    fee.student = studentData;

    // Attaching Payments So That Their ID's Will Not Get Nulled Out In Database
    fee.student.payments = this.studentDet.student.payments;

    this.stu
      .insertStudentWithFeeSimple(fee)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['students', 'details']);
      });
    form.reset();
  }

}
