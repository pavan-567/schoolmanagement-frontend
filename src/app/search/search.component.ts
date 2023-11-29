import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/StuSearch.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../models/Student.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  error: string = null;

  constructor(
    private stu: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  stuObservable: Observable<Student[]>;
  isWarning: boolean = false;

  ngOnInit(): void {}

  onSubmit(form: NgForm, mode: string) {
    const { year, standard } = form.value;
    this.stuObservable = this.stu.fetchStuSpecificData(year, standard);
    this.stuObservable.subscribe(
      (res) => {
        if (!res) {
          this.router.navigate([this.route.routeConfig.path]);
          this.isWarning = true;
          this.error = 'No Details Found For Given Year and Standard!';
        } else {
          this.error = null;
          if (mode === 'stu') {
            this.router.navigate(['stuSearch', year, standard], {
              relativeTo: this.route,
            });
          } else {
            this.router.navigate(['paymentSearch', year, standard], {
              relativeTo: this.route,
            });
          }
        }
      },
      (error) => {
        this.isWarning = false;
        this.error =
          'There Is an Issue With Server, So Please Try Again Later!';
      }
    );
    form.reset();
  }
}
