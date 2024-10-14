import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Type } from '../model/type.model'; // Assurez-vous d'importer le bon modèle

@Component({
  selector: 'app-update-type',
  templateUrl: './update-type.component.html',
})
export class UpdateTypeComponent implements OnInit {
  @Input() type!: Type; // Remplacez Ligue par Type
  @Input() ajout!: boolean;

  @Output() typeUpdated = new EventEmitter<Type>(); // Changez le nom de l'événement

  constructor() {}

  ngOnInit(): void {}

  saveType() {
    this.typeUpdated.emit({ ...this.type }); // Utilisez l'opérateur de propagation pour éviter les problèmes de référence
  }

  modeAjout() {
    this.ajout = true;
    this.type.idtype = 0; // Réinitialisez l'ID pour l'ajout
    this.type.nomType = ''; // Réinitialisez le nom
  }
}
