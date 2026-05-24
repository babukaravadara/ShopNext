import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl +'api/Users';
  constructor(private http: HttpClient, private router: Router) {
  }
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  addUser(user: any): Observable<any> {
    debugger
    const User = {
      Name: user.name,
      Email: user.email,
      Password: user.password,
      Role: "User"
    };
    return this.http.post(
      this.apiUrl,
      User
    );
  }
  updateUser(
    id: number,
    user: any
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      user
    );
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}
