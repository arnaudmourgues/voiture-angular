import {Component, OnInit, ElementRef} from '@angular/core';
import {VoitureService} from "./service/voiture.service";
import {Voiture} from "./interface/voiture";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

import {ViewportScroller} from "@angular/common";


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
  show: boolean = false;
  buttonState: string = "btn-outline-success";
  buttonShow: string = "Show";

  ngOnInit(): void {
    this.onGetVoitures();
    this.snapForm = this.formBuilder.group({
      color: [null, Validators.required],
      wheels: [null, Validators.required],
      location: [null, Validators.required],
    });
    this.snapForm2 = this.formBuilder.group({
      id: [null, Validators.required],
      location: [null, Validators.required],
    });

    this.snapForm3 = this.formBuilder.group({
      id: [null, Validators.required],
    });

  }

  constructor(
    private voitureService: VoitureService,
    private formBuilder: FormBuilder,
    private scroller: ViewportScroller
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

  formSubmit(located: string): void {
    this.snapForm.get('location')?.setValue(located);
    this.voitureService.createVoiture(this.snapForm).pipe(
      catchError(err => this.catchPostError(err))
    ).subscribe(
      (response) => this.getVoituresValidate(response)
    );

  }

  formSubmit2(located: string): void {
    this.snapForm2.get('location')?.setValue(located);
    this.voitureService.moveVoiture(this.snapForm2).pipe(
      catchError(err => this.catchPostError(err))
    ).subscribe(
      (response) => this.getVoituresValidate(response)
    );
    this.snapForm2.reset();
  }

  formSubmit3(): void {
    this.voitureService.deleteVoiture(this.snapForm3).pipe(
      catchError(err => this.catchPostError(err))
    ).subscribe(
      (response) => this.getVoituresValidate(response)
    );
    this.snapForm3.reset();

  }

  async toggle() {
    this.show = !this.show;
    if (this.show) {
      this.buttonShow = "Hide";
      this.buttonState = "btn-outline-danger";
      await new Promise(f => setTimeout(f, 20));
      this.scroller.scrollToAnchor("target");
    } else {
      this.buttonShow = "Show";
      this.buttonState = "btn-outline-success";
    }
  }

}
