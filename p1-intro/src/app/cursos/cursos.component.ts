import { Component, OnInit } from '@angular/core';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  nomePortal: string = 'http://loiane.training';
  cursos: string[];

  constructor(public cursosService : CursosService) {
    this.cursos = this.cursosService.getCursos()

  }

  ngOnInit(): void {
  }

}
