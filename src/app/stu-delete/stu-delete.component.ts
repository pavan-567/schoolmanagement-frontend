import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/Student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/Student.model';

@Component({
  selector: 'app-stu-delete',
  templateUrl: './stu-delete.component.html',
  styleUrls: ['./stu-delete.component.css'],
})
export class StuDeleteComponent implements OnInit {
  constructor(
    private stu: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  stuData: Student = null;
  isFetched: boolean = false;

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.stu.fetchStudentWithFee(id).subscribe((res) => {
      this.stuData = res;
      console.log(this.stuData);
      this.isFetched = true;
    });
  }

  onDeleteStu() {
    this.stu.deleteStudentWithId(+this.stuData.id).subscribe((res) => {
      console.log(res);
    });
    this.router.navigate(['/students', 'display']);
  }
}
