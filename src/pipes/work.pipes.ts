import { Pipe } from '@angular/core';

@Pipe({
  name: 'work'
})
export class WorkPipe {
  transform(value) {
    let result :string;
    switch(value){
        case 'GO'://上班
            result = '上班';
            break;
        case 'AFTER'://下班
            result = '下班'
            break;
        case 'PC'://PC端
            result = 'PC端'
            break;
        case 'MOBILE'://移动端
            result = '移动端'
            break;
        }
    return result;
  }
}
