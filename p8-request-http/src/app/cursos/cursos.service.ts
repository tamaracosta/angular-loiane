import { environment } from './../../../../p8-request-http/src/environments/environment';
import { Curso } from './curso';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

private readonly API = `${environment.API}cursos`
constructor(private http: HttpClient) { }

list(){
  return this.http.get<Curso[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    )



}

}
