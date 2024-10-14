import { Component, OnInit } from '@angular/core'; // Ajout de OnInit
import { Moto } from '../model/moto.model';
import { MotoService } from '../services/moto.service';
import { Router } from '@angular/router';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-add-moto',
  templateUrl: './add-moto.component.html',
})
export class AddMotoComponent implements OnInit { // Implémentation de OnInit
  types!: Type[]; // Liste des types de motos
  newIdType!: number; // ID du nouveau type sélectionné
  newMoto: Moto = new Moto(); // Nouvelle moto à ajouter
  ajouterAvecSucces = false;

  constructor(private motoService: MotoService, private router: Router) {}

  ngOnInit(): void {
    // Récupération de la liste des types de motos
    this.motoService.listeTypes().subscribe(types => {
      this.types = types; // Suppression de l'accès à _embedded
     
    });
  }

  // Méthode pour ajouter une moto
  addMoto() {
    // Assurez-vous que le type est sélectionné avant de l'ajouter
    const selectedType = this.types.find(type => type.idtype == this.newIdType);  // Use strict equality (===)
    
    // Log for debugging
    console.log('Type sélectionné:', selectedType);
    
    if (selectedType) {
      // Assign the selected type to the new moto object
      this.newMoto.type = selectedType;
      console.table(this.newMoto)

      // Call the service to add the moto
      this.motoService.ajouterMoto(this.newMoto)
        .subscribe({
          
          next: (moto) => {
            console.log('Moto ajoutée avec succès:', moto);
            this.router.navigate(['motos']);  // Redirection vers la liste des motos après ajout
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout de la moto:', error);
          }
        });
    } else {
      console.error('Type de moto non trouvé');
    }
  }
  
}
