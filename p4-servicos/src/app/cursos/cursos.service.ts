import { Injectable } from "@angular/core";

@Injectable()

export class CursosServices {

    private cursos:string[] = ['Angular', 'JS', 'Bootstrap'];

    getCursos(){
        return this.cursos
    }

    addCurso(curso: string){
        this.cursos.push(curso);
    }
}