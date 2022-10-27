import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Voiture} from "../interface/voiture";
import { catchError, retry, tap, map } from 'rxjs/operators';
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  apiUrl = "http://localhost:8080"

  constructor(
    private http: HttpClient
  ) { }

  getVoitures(): Observable<Voiture[]>{
    return this.http.get<Voiture[]>(this.apiUrl.concat("/getAllVoiture"));
  }

  createVoiture(snapForm: FormGroup ): Observable<Voiture> {
    return this.http.post<Voiture>(this.apiUrl.concat("/createMyVoiture"), snapForm.value as Voiture);
  }

  moveVoiture(snapForm2: FormGroup) {
    return this.http.put<Voiture>(this.apiUrl.concat("/moveMyVoiture"), snapForm2.value as Voiture);
  }

  deleteVoiture(snapForm3: FormGroup) {
    return this.http.delete<Voiture>(this.apiUrl.concat("/deleteById"), {params: snapForm3.value});
  }
}
