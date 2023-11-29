import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Student } from '../models/Student.model';
import { inject } from '@angular/core';
import { StudentService } from './Student.service';
import { SearchService } from './StuSearch.service';

export const StuResolver: ResolveFn<Student[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const service = inject(SearchService);

  return service.fetchStuSpecificData(
    +route.params['year'],
    route.params['standard']
  );
};
