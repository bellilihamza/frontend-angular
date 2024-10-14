import { Component, OnInit } from '@angular/core';
import { Type } from '../model/type.model'; // Utilisation du modèle Type
import { MotoService } from '../services/moto.service'; // Utilisation du service Moto
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
})
export class ListeTypesComponent implements OnInit {
  types!: Type[]; // Liste des types de motos
  ajout: boolean = true;
  updatedtype: Type = { idtype: 0, nomType: '' }; // Type initial pour la mise à jour

  constructor(private motoService: MotoService, public authService: AuthService) {}

  ngOnInit(): void {
    this.chargerTypes();
  }

  // Méthode pour charger les types de motos
  chargerTypes() {
    this.motoService.listeTypes().subscribe(types => {
      this.types = types; // Suppression de l'accès à _embedded
      console.log(types);
    });
  }

  // Méthode pour préparer la mise à jour d'un type
  updatedType(type: Type) {
    this.updatedtype = type;
    this.ajout = false;
  }

  // Méthode appelée après la mise à jour d'un type
  typeUpdated(type: Type) {
    console.log('Type reçu du composant updateType', type);

    // Ajouter ou mettre à jour le type dans la base de données
    this.motoService.ajouterType(type).subscribe(() => {
      this.chargerTypes();
    });
  }

  // Méthode pour supprimer un type de moto
  supprimerType(type: Type) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.motoService.supprimerType(type.idtype).subscribe(() => {
        console.log('Type supprimé');
        this.chargerTypes();
      });
    }
  }
}
