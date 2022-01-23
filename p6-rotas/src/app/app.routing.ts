import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosComponent } from './cursos/cursos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const APP_ROUTES: Routes = [
    { path: 'cursos', component : CursosComponent },
    { path: 'curso/:id', component : CursoDetalheComponent },
    { path: 'cursoNaoEncontrado', component : CursoNaoEncontradoComponent },
    { path: 'login', component : LoginComponent},
    { path: '', component : HomeComponent }
]

export const routing : ModuleWithProviders<RouterModule> = RouterModule.forRoot(APP_ROUTES);
