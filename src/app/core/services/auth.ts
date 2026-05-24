import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../../models/userresponse'; 


console.log(environment.apiUrl);


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = environment.apiUrl + "api/Auth";
  currentUser: any;
  constructor(private http: HttpClient, private router: Router) {
  }
  isLoggedIn = signal(false);
  // store role
  role = signal<string | null>(null);
  setUser(role: string) {
    this.role.set(role);
  }
  clearUser() {
    this.role.set(null);
  }
  getRole() {
    return this.role();
  }
  validateAuth() {
    return this.http.get <UserResponse>(
      `${this.apiUrl}/me`
    ).pipe(map((res) => {
      this.isLoggedIn.set(true);
      this.setUser(res.role)
        return true;
      }),
      catchError(() => {
        this.isLoggedIn.set(false);
        return of(false);
      })
    );
  }
  login(user: any): Observable<any> {
    return this.http.post(this.apiUrl + "/login",
      user
    );
  }
  logout() {
    this.http.post(
      `${this.apiUrl}/logout`,
      {}
    ).subscribe(() => {
      this.isLoggedIn.set(false);
      this.router.navigate(
        ['/login']
      );
    });

    this.clearUser()
  }

}
