import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  isError: boolean = false;
  isFetched: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(
        'https://schoolmanagement-backend-production.up.railway.app/studentAPI/serverVerify'
      )
      .subscribe({
        next: (res) => {
          this.isError = false;
          this.isFetched = true;

          console.log('HOO!');
        },
        error: (err) => {
          this.isError = true;
          this.isFetched = true;
          console.log('METH!');
        },
      });
  }
  title = 'managementsystem';
}
