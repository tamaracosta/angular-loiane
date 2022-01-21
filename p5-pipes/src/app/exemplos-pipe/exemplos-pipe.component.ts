import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplos-pipe',
  templateUrl: './exemplos-pipe.component.html',
  styleUrls: ['./exemplos-pipe.component.css']
})
export class ExemplosPipeComponent implements OnInit {
    livro: any = {
    titulo: 'Learning JavaScript Data Structures and Algorithms 2nd ed',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glqjpRP'
  };

  livros: string[] = ['Angular', 'Java'];
  filtro: string = "";
  addCurso(curso:string){
    this.livros.push(curso)
  }

  obterCursos(){
    if (this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === ''){
      return this.livros;
    }

    const filter = this.filtro.toLocaleString().toLocaleLowerCase();
    return this.livros.filter(
      (v:string) => v.toLocaleLowerCase().includes(filter)
    );
  }

  constructor() { }

  ngOnInit(): void {
  }

}
