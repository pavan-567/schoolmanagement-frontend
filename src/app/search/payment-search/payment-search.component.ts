import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Payment } from 'src/app/models/Payment.model';
import { Student } from 'src/app/models/Student.model';
import { SearchService } from 'src/app/services/StuSearch.service';

@Component({
  selector: 'app-payment-search',
  templateUrl: './payment-search.component.html',
  styleUrls: ['./payment-search.component.css'],
})
export class PaymentSearchComponent implements OnInit {
  constructor(private stu: SearchService, private route: ActivatedRoute) {}

  stuData: Student[];

  ngOnInit(): void {
    this.route.data.subscribe((resData: Data) => {
      this.stuData = resData.data;
    });
  }
}
