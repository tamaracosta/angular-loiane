import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Cidade } from '../models/cidade';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

constructor(
  private http : HttpClient
  ) { }

  getEstadoBr(): Observable<any> {
    return this.http.get('assets/dados/estadosBr.json')

  }

   getCidades(idEstado: number): Observable<any> {
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
    );
  }

  getCadastro(){
    return [
      {cargo: 'dev', nivel: 'Junior', desc: 'Dev Jr.'},
      {cargo: 'dev', nivel: 'Pleno', desc: 'Dev Pl.'},
      {cargo: 'dev', nivel: 'Senior', desc: 'Dev Sr.'}
    ]
  }

  getTecnologias() {

    return [
      { nome: 'java', desc: 'Java' },
      { nome: 'javascript', desc: 'JavaScript' },
      { nome: 'php', desc: 'PHP' },
      { nome: 'ruby', desc: 'Ruby' }
    ];
  }

  getNewsletter() {
    return [
      { id:1, valor:'S', desc: 'Sim' },
      { id:0, valor:'N', desc: 'Não' },
    ];
  }

}

