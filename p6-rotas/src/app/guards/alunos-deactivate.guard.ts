import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { AlunoFormComponent } from "../alunos/aluno-form/aluno-form.component";
import { IFormCanDeactive } from "./iform-canDeactive";

@Injectable()   
export class AlunosDeactiveGuard implements CanDeactivate<IFormCanDeactive> {
    canDeactivate(
        component: IFormCanDeactive,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        return component.podeDesativar();
}
} 
   