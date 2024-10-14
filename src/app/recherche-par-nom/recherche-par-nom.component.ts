import { Component, OnInit } from '@angular/core';
import { Moto } from '../model/moto.model'; // Importer le modèle Moto
import { MotoService } from '../services/moto.service'; // Importer le service Moto
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent implements OnInit {
  nomMoto!: string; // Remplacez nomEquipe par nomMoto
  motos!: Moto[]; // Remplacez equipes par motos
  allMotos!: Moto[]; // Remplacez allEquipes par allMotos
  searchTerm!: string;

  constructor(private motoService: MotoService,public authService: AuthService) {}

  ngOnInit(): void {
    this.motoService.listeMotos().subscribe(motos => {
      console.log(motos);
      this.motos = motos;
      this.allMotos = motos; // Assurez-vous de stocker toutes les motos pour le filtrage local
    });
  }

  supprimerMoto(moto: Moto) { // Ajoutez la méthode pour supprimer une moto
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette moto ?");
    if (confirmation) {
      this.motoService.supprimerMoto(moto.idMotot).subscribe(() => {
        console.log("Moto supprimée avec succès");
        // Filtrez la liste des motos pour retirer celle qui a été supprimée
        this.motos = this.motos.filter(m => m.idMotot !== moto.idMotot);
      });
    }
  }

  rechercherMotos() { // Renommez rechercherEqips en rechercherMotos
    this.motoService.rechercherParNom(this.nomMoto).subscribe(motos => {
      this.motos = motos;
      console.log(motos);
    });
  }

  onKeyUp(filterText: string) {
    if (filterText) {
      this.motos = this.allMotos.filter(item => 
        item.nomMoto && item.nomMoto.toLowerCase().includes(filterText.toLowerCase())
      );
    } else {
      // Si le champ de recherche est vide, afficher toutes les motos
      this.motos = this.allMotos;
    }
  }
  
}
