import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/Student.model';
import { SearchService } from 'src/app/services/StuSearch.service';
import { StudentService } from 'src/app/services/Student.service';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css'],
})
export class StudentSearchComponent implements OnInit {
  constructor(
    private service: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  stuData: Student[] = null;

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      console.log(res.data);
      this.stuData = res.data;
      console.log(this.stuData);
    });
  }

  onNavigateEdit(id: number) {
    console.log('EDITING SOMETHING!');
    this.router.navigate(['/students', 'edit', id]);
  }
}
