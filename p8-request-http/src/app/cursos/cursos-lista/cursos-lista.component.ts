import { catchError, empty, Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})

export class CursosListaComponent implements OnInit {

  bsModalRef: BsModalRef | undefined

  // cursos: Curso[] = [];
  cursos$!: Observable<Curso[]>
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    // private modalService: BsModalService
    private alertModalService: AlertModalService
    ) { }

  ngOnInit() {
    // this.service.list().subscribe( (dados: any) => this.cursos = dados)

    this.onRefresh()

  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty()
      })
    )
  }

  handleError(){
    this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.')
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }

}
