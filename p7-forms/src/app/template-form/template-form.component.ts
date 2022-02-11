import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null,
  }

  onSubmit(form: any) {
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .pipe(map(dados => dados))
      .subscribe(dados => console.log(dados))
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  consultaCEP(cep: any, form: any) {

    // Nova variável CEP, somente com dígitos
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != null && cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        this.resetaDadosForm(form)
        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
          .pipe(map(dados => dados))
          .subscribe(dados => this.populaDadosForm(dados, form))
      }
    }

  }

  populaDadosForm(dados: any, formulario: any) {

    // form.setValue( {
    //     nome: null,
    //     email: null,
    //     endereco: {
    //       cep: dados.cep,
    //       numero: "",
    //       rua: dados.logradouro,
    //       bairro: dados.bairro,
    //       cidade: dados.localidade ,
    //       estado: dados.uf
    //     }

    // })

    formulario.form.patchValue({

      rua: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf

    });

  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}


