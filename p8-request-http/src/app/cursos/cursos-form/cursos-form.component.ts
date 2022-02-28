import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
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

  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel');
  }

}
