import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../services/Student.service';
import { MasterService } from '../services/Master.service';
import { Master } from '../models/Master.model';
import { Stu } from '../models/Stud.model';
import { StudentFee } from '../models/StudentFee.model';

@Component({
  selector: 'app-stu-create',
  templateUrl: './stu-create.component.html',
  styleUrls: ['./stu-create.component.css'],
})
export class StuCreateComponent implements OnInit {
  selectedFile: File = null;
  @ViewChild('form') form: NgForm;
  masterDetails: Master[];
  error: string = null;
  isFetched: boolean = false;

  id: number = null;

  constructor(private stu: StudentService, private master: MasterService) {}

  ngOnInit(): void {
    this.master.fetchMasterDeails().subscribe(
      (masData: Master[]) => {
        this.masterDetails = masData;
        console.log(masData);
        this.error = null;
        this.isFetched = true;
      },
      (error) => {
        this.isFetched = false;
        this.error = error.message;
      }
    );
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value);
    const { studentData, feeData } = form.value;
    console.log(studentData, feeData);

    const fee: StudentFee = feeData;
    fee.student = studentData;

    // this.stu
    //   .insertStudentWithFee(studentData, feeData, this.selectedFile)
    //   .subscribe((res) => {
    //     console.log(res);
    //     console.log('+_+');
    //   });
    this.stu
      .insertStudentWithFeeSimple(fee, this.selectedFile)
      .subscribe((data: Stu) => {
        this.id = data.id;
      });
    form.reset();
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onGradeSelected(event) {
    // Extracting Grade
    const grade: string = event.target.value;

    // Getting Specific Master Grade Details
    const queries: Master[] = this.masterDetails.filter(
      (master: Master) => master.standard === grade
    );

    // If No Queries Found, Then Return
    if (queries.length <= 0) return;

    // Getting Latest Master Record According To Grade
    const latestQuery: Master = queries[0];

    // Updating The Form Values
    this.form.form.patchValue({
      feeData: {
        actualFee: latestQuery.totalFee,
        bookFee: latestQuery.bookFee,
        tutionFee: latestQuery.tutionFee,
        transportFee: latestQuery.transportFee,
        totalFee: latestQuery.totalFee,
      },
    });
  }

  onHandleDiscount(event) {
    const disc = event.target.value;
    const totalFee = this.form.value.feeData.totalFee - disc;

    this.form.form.patchValue({
      feeData: {
        totalFee: totalFee >= 0 ? totalFee : 0,
      },
    });
  }

  generateDummy() {
    this.form.form.patchValue({
      studentData: {
        name: 'Badosa',
        fatherName: 'Som',
        motherName: 'Bom',
        phoneNo: 213252525,
        address: 'Hyderabad',
        prevSchool: 'Howle',
        cast: 'BC',
        gender: 'male',
        dob: new Date(2000, 6, 12),
        aadharNo: '103991248097142',
        dateOfJoining: new Date(2005, 12, 21),
      },
      feeData: {
        standard: 'V',
        actualFee: 2000,
        bookFee: 4000,
        tutionFee: 3000,
        transportFee: 1000,
        discount: 1000,
        totalFee: 5000,
      },
    });
  }
}
