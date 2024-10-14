import { Pipe, PipeTransform } from '@angular/core';
import { Moto } from '../app/model/moto.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(motos: Moto[], searchTerm: string): Moto[] {
    if (!motos || !searchTerm) {
      return motos;
    }

    return motos.filter(moto => 
      moto.nomMoto && moto.nomMoto.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
