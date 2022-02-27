import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})

export class CursosListaComponent implements OnInit {
  cursos: Curso[] = [];
  cursos$!: Observable<Curso[]>
  constructor(private service: CursosService) { }

  ngOnInit() {
    // this.service.list().subscribe( (dados: any) => this.cursos = dados)
    this.cursos$ = this.service.list()


  }

}
