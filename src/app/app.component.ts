import {Component, OnInit} from '@angular/core';
import {VoitureService} from "./service/voiture.service";
import {Voiture} from "./interface/voiture";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

import {ViewportScroller} from "@angular/common";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  snapForm!: FormGroup;
  snapForm2!: FormGroup;
  snapForm3!: FormGroup;
  voitures: Voiture[];
  voiture: Voiture;
  displayedColumns: string[] = [
    'id',
    'color',
    'location',
    'wheels',
  ];

  title = 'voiture-app';
  show: boolean = true;
  buttonState: string = "btn-outline-danger";
  buttonShow: string = "Hide";

  ngOnInit(): void {
    this.onGetVoitures();
  }

  constructor(
    private voitureService: VoitureService,
    private formBuilder: FormBuilder,
    private scroller: ViewportScroller,
    private router: Router
  ) {
  }


  onGetVoitures(): void {
    this.voitureService.getVoitures().subscribe(
      (response) => {
        this.voitures = response
      }
    )
  }

  getVoituresValidate(response: Voiture | Response) {
    alert( "Success !" );
    console.log( response );
    this.router.navigate(['/']);
    this.onGetVoitures();
  }

  catchPostError(error: any): Observable<Response> {
    if (error && error.error && error.error.message) {
      alert(error.error.message);
    } else if (error && error.message) {
      alert(error.message);
    } else {
      alert(JSON.stringify(error))
    }
    return throwError(error);
  }

  formSubmit3(): void {
    this.voitureService.deleteVoiture(this.snapForm3).pipe(
      catchError(err => this.catchPostError(err))
    ).subscribe(
      (response) => this.getVoituresValidate(response)
    );
    this.snapForm3.reset();

  }

  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.buttonShow = "Hide";
      this.buttonState = "btn-outline-danger";
    } else {
      this.buttonShow = "Show";
      this.buttonState = "btn-outline-success";
    }
  }

}
