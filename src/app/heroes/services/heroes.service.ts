import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroe.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getHeroes = (): Observable<Heroe[]> => {
    return this.http.get<Heroe[]>(`${this.url}/heroes`);
  }

  getHeroeById = (id: string): Observable<Heroe> => {
    return this.http.get<Heroe>(`${this.url}/heroes/${id}`);
  }

  getSuggestions = (text: string): Observable<Heroe[]> => {
    return this.http.get<Heroe[]>(`${this.url}/heroes?q=${text}&_limit=6`);
  }

  saveHeroe = (heroe: Heroe): Observable<Heroe> => {
    return this.http.post<Heroe>(`${this.url}/heroes`, heroe);
  }

  editHeroe = (heroe: Heroe): Observable<Heroe> => {
    return this.http.put<Heroe>(`${this.url}/heroes/${heroe.id}`, heroe);
  }

  dropHeroe = (id: string): Observable<any> => {
    return this.http.delete(`${this.url}/heroes/${id}`);
  }
}
