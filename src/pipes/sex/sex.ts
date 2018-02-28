import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sex',
})
export class SexPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let result: string;
    switch (value) {
      case "MAN":
        result = "energy";
        break;
      case "WOMAN":
        result = "womenColor";
        break;
      case "NONE":
        result = "white";
        break;
      default:
        result = "white";
        break;
    }
    return result;
  }
}
