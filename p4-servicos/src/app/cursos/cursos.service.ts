import { Injectable } from "@angular/core";

@Injectable()

export class CursosServices {
    getCursos(){
        return ['Angular', 'JS', 'Bootstrap']
    }
}