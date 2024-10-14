import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Moto } from '../model/moto.model';
import { MotoService } from '../services/moto.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-motos',
  templateUrl: './motos.component.html',
  
})
export class MotosComponent implements OnInit {

  motos?: Moto[];

  constructor(private motoService: MotoService, public authService: AuthService) {}

  ngOnInit(): void {
    this.chargerMotos();
  }

  // Chargement de la liste des motos
  chargerMotos() {
    this.motoService.listeMotos().subscribe(motos => {
      console.log(motos);
      this.motos = motos;
    });
  }

  // Suppression d'une moto
  supprimerMoto(m: Moto) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.motoService.supprimerMoto(m.idMotot).subscribe(() => {
        console.log("Moto supprimée");
        this.chargerMotos();
      });
    }
  }
}
