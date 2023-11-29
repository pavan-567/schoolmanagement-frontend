import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StuCreateComponent } from './stu-create/stu-create.component';
import { StuDetailsComponent } from './stu-details/stu-details.component';
import { StuEditComponent } from './stu-edit/stu-edit.component';
import { StuDeleteComponent } from './stu-delete/stu-delete.component';
import { SearchComponent } from './search/search.component';
import { StudentSearchComponent } from './search/student-search/student-search.component';
import { PaymentSearchComponent } from './search/payment-search/payment-search.component';
import { StuResolver } from './services/StudentResolver.service';
import { StuPaymentComponent } from './stu-payment/stu-payment.component';
import { MasterComponent } from './master/master.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'students/create', component: StuCreateComponent },
  { path: 'students/details', component: StuDetailsComponent },
  { path: 'students/edit/:id', component: StuEditComponent },
  { path: 'students/delete/:id', component: StuDeleteComponent },
  {
    path: 'students/search',
    component: SearchComponent,
    children: [
      {
        path: 'stuSearch/:year/:standard',
        component: StudentSearchComponent,
        resolve: { data: StuResolver },
      },
      {
        path: 'paymentSearch/:year/:standard',
        component: PaymentSearchComponent,
        resolve: { data: StuResolver },
      },
    ],
  },
  {
    path: 'students/payment',
    component: StuPaymentComponent,
  },
  {
    path: 'master',
    component: MasterComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
