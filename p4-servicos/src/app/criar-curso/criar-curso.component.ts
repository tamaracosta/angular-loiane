import { Component, OnInit } from '@angular/core';

import { CursosServices } from '../cursos/cursos.service';

@Component({
  selector: 'app-criar-curso',
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.css'],
  providers: [CursosServices]
})
export class CriarCursoComponent implements OnInit {

  cursos:string[] = [];
  constructor(private cursosService : CursosServices) { }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos()
  }

  onAddCurso(curso: string){
    this.cursosService.addCurso(curso)
  }

}
