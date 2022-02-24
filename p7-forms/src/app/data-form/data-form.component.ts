import { DropdownService } from './../shared/services/dropdown.service';
import { EstadoBr } from './../shared/models/estado-br';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { distinctUntilChanged, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { FormValidations } from '../shared/form-validations';
import { VerificarEmailService } from './services/verificar-email.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/models/cidade';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  //formulario: any = FormGroup;
  // estados: EstadoBr[] = [];
  estados!:Observable<EstadoBr[]>;
  cidades!:Observable<Cidade[]>;
  cargos : any[] = [];
  tecnologias: any[] = [];
  newsletterOp: any[] = [];
  frameworks : string[] = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService : DropdownService,
    private cepService: ConsultaCepService,
    private verificarEmailService: VerificarEmailService
  ) {
    super();
   }

  override ngOnInit(): void {
   // this.verificarEmailService.verificarEmail('').subscribe()
    this.estados = this.dropDownService.getEstadoBr();
    this.cargos = this.dropDownService.getCadastro();
    this.tecnologias = this.dropDownService.getTecnologias();
    this.newsletterOp = this.dropDownService.getNewsletter();


    // this.dropDownService.getEstadoBr()
    // .subscribe((dados: EstadoBr[]) => {
    //   this.estados = dados
    // });

    // });

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // })

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      cep: [null, [Validators.required, FormValidations.cepValidator]],
      numero: [null, Validators.required],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado:[null, Validators.required],
      cargo: [null],
      tecnologias: [null],
      newsLetter: ['S'],
      termos: [null, Validators.pattern('true')],
      // frameworks: [null]
      frameworks: this.buildFrameworks()


    })

    this.formulario.get('cep').statusChanges
    .pipe(
      distinctUntilChanged(),
      tap(value => console.log('status CEP:', value)),
      switchMap(status => status === 'VALID' ?
        this.cepService.consultaCEP(this.formulario.get('cep').value)
        : EMPTY
      )
    )
    .subscribe((dados: any) => dados ? this.populaDadosForm(dados) : {});



  }

  submit() {
    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v: any, i: any) => v ? this.frameworks[i] : null)
      .filter((v: any) => v !== null)
    });

    console.log(valueSubmit)

    if(this.formulario.valid){
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(map(dados => dados))
      .subscribe(dados => {
        console.log(dados)
        this.resetar()
      })
    } else {
      console.log('invalido')
      Object.keys(this.formulario.controls).forEach(campo => {
        console.log(campo)
        const controle = this.formulario.get(campo);
        controle.markAsDirty();
      })
    }


  }

  consultaCEP() {
    let cep = this.formulario.get('cep').value
    // Nova variável CEP, somente com dígitos
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != null && cep != "") {
      this.cepService.consultaCEP(cep)
      .pipe(map(dados => dados))
      .subscribe(dados => this.populaDadosForm(dados))
      }
    }

    resetaDadosForm() {
      this.formulario.patchValue({
        endereco: {
          rua: null,
          complemento: null,
          bairro: null,
          cidade: null,
          estado: null
        }
      });
    }

    populaDadosForm(dados: any) {
      this.formulario.patchValue({
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf

      });

    }

    setarCargo() {
      const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
      this.formulario.get('cargo').setValue(cargo);
    }

    compararCargos(obj1 : any, obj2: any) {
      // return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
      return obj1 && obj2 ? (obj1.nivel === obj2.nivel) : obj1 === obj2;
    }

    setarTecnologias() {
      this.formulario.get('tecnologias').setValue(['java', 'javascript', 'php']);
    }

    buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.minSelectedCheckboxes(1));
    }

    validarEmail(formControl: FormControl) {
      return this.verificarEmailService.verificarEmail(formControl.value)
        .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
    }

  }



