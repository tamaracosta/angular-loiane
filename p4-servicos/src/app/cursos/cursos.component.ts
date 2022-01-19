import { Component, OnInit } from '@angular/core';
import { CursosServices } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: string[] = [];
  cursosServices: CursosServices
  
  constructor() {
    this.cursosServices = new CursosServices
  }

  ngOnInit(): void {
    this.cursos = this.cursosServices.getCursos()
  }

}
