import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap, map, of } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor(private httpClient: HttpClient) { }

  VerifyAuth = (): Observable<boolean> => {
    if (!localStorage.getItem('id')) {
      return of(false);
    }
    return this.httpClient.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(res => {
          this._auth = res;
          return true;
        })
      )
  }

  LogIn = (): Observable<Auth> => {
    return this.httpClient.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(res => this._auth = res),
        tap(res => localStorage.setItem('id', res.id))
      )
  }

  LogOut = () => {
    this._auth = undefined
  }
}
