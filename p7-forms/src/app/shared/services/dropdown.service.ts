import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

constructor(
  private http : HttpClient
  ) { }

  // getEstadoBr() { return this.http.get<EstadoBr>('assets/dados/estadosBr.json').pipe();}
  getEstadoBr(): Observable<any> {
    return this.http.get('assets/dados/estadosBr.json')
    .pipe(map(res => res));
  }

}

