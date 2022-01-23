import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosComponent } from './cursos.component';
import { CursosService } from './cursos.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatListModule,
        MatSliderModule
    ],
    exports: [],
    declarations: [
        CursoDetalheComponent,
        CursoNaoEncontradoComponent,
        CursosComponent
    ],
    providers: [CursosService],
})
export class CursosModule { }
