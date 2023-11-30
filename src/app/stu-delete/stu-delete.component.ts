import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/Student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/Student.model';
import { StudentFee } from '../models/StudentFee.model';

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

  stuFee: StudentFee = null;
  isFetched: boolean = false;

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.stu.fetchStuFeeData(id).subscribe((res) => {
      this.stuFee = res;
      console.log(this.stuFee);
      this.isFetched = true;
    });
  }

  onDeleteStu() {
    this.stu.deleteStudentWithId(+this.stuFee.id).subscribe((res) => {
      console.log(res);
    });
    this.router.navigate(['/students', 'display']);
  }
}
