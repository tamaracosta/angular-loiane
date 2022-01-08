import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  nomePortal: string = 'http://loiane.training';
  cursos: string[] = ['Java', 'Angular', 'JS']

  constructor() {


  }

  ngOnInit(): void {
  }

}
