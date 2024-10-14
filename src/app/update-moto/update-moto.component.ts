import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moto } from '../model/moto.model'; // Importer le modèle Moto
import { MotoService } from '../services/moto.service'; // Importer le service Moto
import { Type } from '../model/type.model'; // Assurez-vous d'importer le modèle Type si nécessaire

@Component({
  selector: 'app-update-moto',
  templateUrl: './update-moto.component.html',
})
export class UpdateMotoComponent implements OnInit {
  currentMoto = new Moto(); // Changez de Equipe à Moto
  types!: Type[]; // Si vous avez un modèle Type pour les motos
  updatedTypeID!: number; // ID pour le type de moto

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private motoService: MotoService // Utilisez MotoService au lieu de EquipeService
  ) {}

  ngOnInit(): void {
    // Récupérer la liste des types de motos
    this.motoService.listeTypes().subscribe(types => {
      this.types = types; // Chargez les types disponibles
      console.log(types);
    });

    // Récupérer la moto actuelle basée sur l'ID
    this.motoService.consulterMoto(this.activatedRoute.snapshot.params['id']).subscribe(moto => {
      this.currentMoto = moto; 
      this.updatedTypeID = this.currentMoto.type.idtype; // Assurez-vous que 'type' est défini dans le modèle Moto
    });
  }

  updateMoto() {
    // Mettre à jour le type de la moto en fonction de l'ID sélectionné
    this.currentMoto.type = this.types.find(type => type.idtype == this.updatedTypeID)!;
    this.motoService.updateMoto(this.currentMoto).subscribe(() => {
      this.router.navigate(['motos']); // Redirige vers la liste des motos après mise à jour
    });
  }
}
