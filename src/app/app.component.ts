// @ts-ignore
import {Component, OnInit, ElementRef} from '@angular/core';
import {VoitureService} from "./service/voiture.service";
import {Voiture} from "./interface/voiture";
// @ts-ignore
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {angularMajorCompatGuarantee} from "@angular/cli/src/commands/update/schematic";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  snapForm!: FormGroup;
  snapForm2!: FormGroup;
  snapForm3!: FormGroup;

  voitures: Voiture[];
  voiture: Voiture;
  title = 'voiture-app';

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
  ) {
  }


  onGetVoitures(): void {
    this.voitureService.getVoitures().subscribe(
      (response) => {
        this.voitures = response
      }
    )
  }

  private getVoituresValidate(response: Voiture | Response) {
    alert( "Success !" );
    this.onGetVoitures();
    this.snapForm.reset();
    this.snapForm2.reset();
    this.snapForm3.reset();
  }

  formSubmit(located: string): void {
    this.snapForm.get('location')?.setValue(located);
    this.voitureService.createVoiture(this.snapForm).pipe(
      catchError(err => this.catchPostError(err))
    ).subscribe(
      (response) => this.getVoituresValidate(response)
    );
  }

  private catchPostError(error: any): Observable<Response> {
    if (error && error.error && error.error.message) {
      alert(error.error.message);
    } else if (error && error.message) {
      alert(error.message);
    } else {
      alert(JSON.stringify(error))
    }
    return throwError(error);
  }

  formSubmit2(located: string): void {
    this.snapForm2.get('location')?.setValue(located);
    this.voitureService.moveVoiture(this.snapForm2).pipe(
      catchError(err => this.catchPostError(err))
    ).subscribe(
      (response) => this.getVoituresValidate(response)
    );
  }

  formSubmit3(): void {
    this.voitureService.deleteVoiture(this.snapForm3).pipe(
      catchError(err => this.catchPostError(err))
    ).subscribe(
      (response) => this.getVoituresValidate(response)
    );
  }
}
