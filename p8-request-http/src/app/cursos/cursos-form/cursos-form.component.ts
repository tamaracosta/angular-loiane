import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Location } from '@angular/common';

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
    private location: Location
    ) {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })

  }

  ngOnInit() {
    // this.form = this.fb.group({
    //   // id: [curso.id],
    //   nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    // })

  }

  hasError(field: string) : any {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.valid){
      console.log('submit')
    }

    this.service.create(this.form.value).subscribe(
      sucess => {
        this.modal.showAlertSuccess('Curso criado com sucesso'),
        this.location.back()
      },
      error => this.modal.showAlertDanger('Erro ao criar o curso. Tente novamente.'),
      () => console.log('request completo')
    )

  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel');
  }

}
