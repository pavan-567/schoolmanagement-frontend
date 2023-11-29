import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StuCreateComponent } from './stu-create/stu-create.component';
import { StuDetailsComponent } from './stu-details/stu-details.component';

import { StuEditComponent } from './stu-edit/stu-edit.component';
import { StuDeleteComponent } from './stu-delete/stu-delete.component';
import { SearchComponent } from './search/search.component';
import { StudentSearchComponent } from './search/student-search/student-search.component';
import { PaymentSearchComponent } from './search/payment-search/payment-search.component';
import { StuPaymentComponent } from './stu-payment/stu-payment.component';
import { MasterComponent } from './master/master.component';
import { HomeComponent } from './home/home.component';
import { StuErrorComponent } from './stu-error/stu-error.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StuCreateComponent,
    StuDetailsComponent,
    StuEditComponent,
    StuDeleteComponent,
    SearchComponent,
    StudentSearchComponent,
    PaymentSearchComponent,
    StuPaymentComponent,
    MasterComponent,
    HomeComponent,
    StuErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
