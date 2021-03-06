import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Aluno } from '../aluno';

import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit {

  aluno : any;
  inscricao: Subscription = new Subscription;

  constructor(private route: ActivatedRoute,
    private alunosService: AlunosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('ngIninit AlunoDetalheComponent')
    this.inscricao = this.route.data.subscribe(
      (info) => {
        const { aluno } = info;
        console.log(info, aluno);
        this.aluno = aluno;
      }
    );
  }


  ngOnDestroy() {
    this.inscricao.unsubscribe()
  }

  editarContato() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar'])
  }

}
