import { Curso } from './curso';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

private readonly API = "http://localhost:3000/cursos"
constructor(private http: HttpClient) { }

list(){
  this.http.get<Curso[]>(this.API)
}

}
