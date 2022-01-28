import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AlunosDeactiveGuard } from "../guards/alunos-deactivate.guard";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunoFormComponent } from "./aluno-form/aluno-form.component";

import { AlunosComponent } from "./alunos.component";

const alunosRoutes: any = [
    { path: '', component: AlunosComponent, children: [ 
        { path: 'novo', component: AlunoFormComponent,
            canDeactivate: [ AlunosDeactiveGuard]  
        },
        { path: ':id', component: AlunoDetalheComponent },
        { path: ':id/editar', component: AlunoFormComponent,
            canDeactivate: [ AlunosDeactiveGuard] 
        }
    ] },
  
    
]

@NgModule({
    imports: [RouterModule.forChild(alunosRoutes)],
    exports: [RouterModule]
})

export class AlunosRoutingModule{}