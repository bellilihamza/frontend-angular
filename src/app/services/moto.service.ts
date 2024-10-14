import { Injectable } from '@angular/core';
import { Moto } from '../model/moto.model';
import { Type } from '../model/type.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MotoService {
  private apiURL: string = 'http://localhost:8001/motos/api';
  private apiURLType: string = 'http://localhost:8001/motos/api/type';

  constructor(private http: HttpClient) {}

  // Liste des motos
  listeMotos(): Observable<Moto[]> {
    return this.http.get<Moto[]>(`${this.apiURL}/all`);
  }

  // Liste des types
  listeTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.apiURLType);
  }

  // Consulter un type par ID
  consulterType(id: number): Observable<Type> {
    const url = `${this.apiURLType}/${id}`;
    return this.http.get<Type>(url);
  }

  // Ajouter une moto
  ajouterMoto(moto: Moto): Observable<Moto> {
    return this.http.post<Moto>(this.apiURL, moto);
  }

  // Supprimer une moto
  supprimerMoto(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url);
  }

  // Consulter une moto par ID
  consulterMoto(id: number): Observable<Moto> {
    const url = `${this.apiURL}/getbyid/${id}`;
    return this.http.get<Moto>(url);
  }

  // Mettre à jour une moto
  updateMoto(moto: Moto): Observable<Moto> {
    return this.http.put<Moto>(`${this.apiURL}/updatemoto`, moto);
  }

  // Rechercher des motos par type
  rechercherParType(idType: string): Observable<Moto[]> {
    const url = `${this.apiURL}/motoType/${idType}`;
    return this.http.get<Moto[]>(url);
  }

  // Rechercher des motos par nom
  rechercherParNom(nom: string): Observable<Moto[]> {
    const url = `${this.apiURL}/motosByName/${nom}`;
    return this.http.get<Moto[]>(url);
  }

  // Ajouter un type
  ajouterType(type: Type): Observable<Type> {
    return this.http.post<Type>(this.apiURLType, type);
  }

  // Supprimer un type
  supprimerType(id: number): Observable<void> {
    const url = `${this.apiURLType}/${id}`;
    return this.http.delete<void>(url);
  }

  // Mettre à jour un type
  updateType(type: Type): Observable<Type> {
    const url = `${this.apiURLType}/${type.idtype}`;
    return this.http.put<Type>(url, type);
  }
}
