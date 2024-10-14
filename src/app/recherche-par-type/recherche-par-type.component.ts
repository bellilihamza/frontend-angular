import { Component, OnInit } from '@angular/core';
import { Moto } from '../model/moto.model';  // Modèle Moto
import { Type } from '../model/type.model';  // Modèle Type
import { MotoService } from '../services/moto.service';  // Service Moto

@Component({
  selector: 'app-recherche-par-type',
  templateUrl: './recherche-par-type.component.html',  // Template associé
})
export class RechercheParTypeComponent implements OnInit {
  motos: Moto[] = [];  // Liste des motos
  idType: number | null = null;  // ID du type sélectionné
  types: Type[] = [];  // Liste des types

  constructor(private motoService: MotoService) {}  // Injection de MotoService

  ngOnInit(): void {
    // Récupération de la liste des types de motos
    this.motoService.listeTypes().subscribe(types => {
      this.types = types; // Suppression de l'accès à _embedded
      console.log(types);
    });
  }

  onChange(): void {
    if (this.idType !== null) {
      // Recherche des motos par type
      this.motoService.rechercherParType(this.idType.toString()).subscribe(motos => {
        this.motos = motos;  
        console.log(this.motos)// Mise à jour de la liste des motos
      });
    } else {
      this.motos = []; // Réinitialisation si aucun type n'est sélectionné
    }
  }
}
                                                        