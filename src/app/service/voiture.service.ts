import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
    let snapPreview$ = of(snapForm);
    snapPreview$.pipe(map(snapValue=> ({
      ...snapValue,
      id: 0,
      map: "",
      status: ""
    })));
    let voiture:Voiture;
    console.log(voiture.map)
    return this.http.post<Voiture>(this.apiUrl.concat("/createMyVoiture"), snapPreview$);
  }
}
