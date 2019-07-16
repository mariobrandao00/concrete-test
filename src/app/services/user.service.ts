import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { catchError } from 'rxjs/operators'
import { forkJoin } from 'rxjs';
import { AppConstants } from '../app.constants';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) { }

  getAllDataBySlug(slug: string) {
    return forkJoin(
      this.http.get(AppConstants.GIT_API + slug),
      this.http.get(AppConstants.GIT_API + slug + AppConstants.GIT_API_FOLLOWERS),
      this.http.get(AppConstants.GIT_API + slug + AppConstants.GIT_API_REPOSITORIES),
    );
  }
}
