import { Component, OnInit } from '@angular/core';
import { CursosServices } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: string[] = [];

  constructor(private cursosServices: CursosServices) {

  }

  ngOnInit(): void {
    this.cursos = this.cursosServices.getCursos()
  }

}
