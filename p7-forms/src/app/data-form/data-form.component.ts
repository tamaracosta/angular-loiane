import { DropdownService } from './../shared/services/dropdown.service';
import { EstadoBr } from './../shared/models/estado-br';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: any = FormGroup;
  // estados: EstadoBr[] = [];
  estados!:Observable<EstadoBr[]>
  cargos : any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService : DropdownService,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit(): void {

    this.estados = this.dropDownService.getEstadoBr()
    this.cargos = this.dropDownService.getCadastro()

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
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      cep: [null, Validators.required],
      numero: [null, Validators.required],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado:[null, Validators.required],
      cargo: [null]

    })



  }

  onSubmit(){
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

  resetar(){
    this.formulario.reset();
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


  }



