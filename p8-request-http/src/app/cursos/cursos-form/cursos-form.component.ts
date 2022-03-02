import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    const curso = this.route.snapshot.data['curso'];
    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })

  }

  ngOnInit() {
    // this.form = this.fb.group({
    //   // id: [curso.id],
    //   nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    // })


    // this.route.params
    // .pipe(
    //   map((params : any)=> params['id']),
    //   switchMap(id => this.service.loadByID(id))
    // )
    // .subscribe(curso => this.updateForm(curso));




  }

  // updateForm(curso: any) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

  hasError(field: string): any {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!';
      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso, tente novamente!';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
            this.location.back();
        },
        error => this.modal.showAlertDanger(msgError)
      );
    }

    // if (this.form.value.id) {
    //   this.service.update(this.form.value).subscribe(
    //     sucess => {
    //       this.modal.showAlertSuccess('Curso atualizado com sucesso'),
    //         this.location.back()
    //     },
    //     error => this.modal.showAlertDanger('Erro ao atualizar o curso. Tente novamente.'),
    //     () => console.log('update completo')
    //   )
    // } else {
    //   this.service.create(this.form.value).subscribe(
    //     sucess => {
    //       this.modal.showAlertSuccess('Curso criado com sucesso'),
    //         this.location.back()
    //     },
    //     error => this.modal.showAlertDanger('Erro ao criar o curso. Tente novamente.'),
    //     () => console.log('request completo')
    //   )
    // }


  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel');
  }

}
