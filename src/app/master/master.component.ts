import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MasterService } from '../services/Master.service';
import { Master } from '../models/Master.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
})
export class MasterComponent {
  username: string = 'gangu';
  password: string = 'gangu';

  @ViewChild('masterForm') form: NgForm;

  isCorrect: boolean = null;
  fetched: boolean = false;

  onEditMode: boolean = false;

  masterDetails: Master[] = [];

  constructor(
    private master: MasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.master.fetchMasterDeails().subscribe((data) => {
      this.masterDetails = data;

      console.log(data);
    });
  }

  onSubmitForm(form: NgForm) {
    const { username, password } = form.value;
    if (username === this.username && password === this.password) {
      this.isCorrect = true;
    } else {
      this.isCorrect = false;
    }
    this.fetched = true;
    form.reset();
  }

  onSubmitMaster(form: NgForm) {
    const masterData: Master = form.value;

    if (this.onEditMode === false) {
      masterData.id = 0;
    }

    this.master.insertMasterDetails(masterData).subscribe((resData: Master) => {
      // Needs To Update Master Data
      this.masterDetails = this.masterDetails.map((mastDet) =>
        mastDet.id === resData.id ? resData : mastDet
      );
    });

    this.onEditMode = false;

    form.reset();
  }

  onClickEdit(master: Master) {
    this.onEditMode = true;

    this.form.form.patchValue({
      id: master.id,
      standard: master.standard,
      totalFee: master.totalFee,
      bookFee: master.bookFee,
      transportFee: master.transportFee,
      tutionFee: master.tutionFee,
    });
  }

  onDisableEdit() {
    this.onEditMode = false;
    this.form.reset();
  }
}
