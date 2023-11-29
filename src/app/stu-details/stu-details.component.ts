import { Component, ViewChild } from '@angular/core';
import { StudentService } from '../services/Student.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-stu-details',
  templateUrl: './stu-details.component.html',
  styleUrls: ['./stu-details.component.css'],
})
export class StuDetailsComponent {
  constructor(private stu: StudentService, private router: Router) {}
  @ViewChild('form') form: NgForm;
  errorMessage: string = null;

  onSubmit(info, mode: string) {
    const { id, standard } = info;
    this.stu.fetchStudentWithFee(id).subscribe(
      (resData) => {
        if (resData?.standard === standard) {
          if (mode === 'edit') this.router.navigate(['students', 'edit', id]);
          else this.router.navigate(['students', 'delete', id]);
        } else {
          this.errorMessage = 'Please Select Correct Information!';
        }
      },
      (error) => {
        this.errorMessage =
          'There Is an Issue With Server, So Please Try Again Later!';
      }
    );
    this.form.reset();
    console.log(info);
  }
}
