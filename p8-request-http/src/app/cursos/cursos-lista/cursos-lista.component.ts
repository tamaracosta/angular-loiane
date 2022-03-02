import { catchError, EMPTY, empty, Observable, Subject, switchMap, take } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';

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
  cursoSelecionado?: Curso;
  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;


  constructor(
    private service: Cursos2Service,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
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

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route});
  }

  onDelete(curso: any) {
    this.cursoSelecionado = curso;
   // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

   const result$ = this.alertModalService.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse curso?');
    result$?.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertModalService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
      }
    );
  }

  onConfirmDelete(){

    this.service.remove(this.cursoSelecionado?.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef?.hide();
      },
      error => {
        this.alertModalService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
        this.deleteModalRef?.hide();
      }
    );
  }

  onDeclineDelete(){
    this.deleteModalRef?.hide()
  }


}
