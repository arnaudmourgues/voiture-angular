import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {VoitureService} from "../service/voiture.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-modif',
  templateUrl: './modif.component.html',
  styleUrls: ['./modif.component.css']
})
export class ModifComponent implements OnInit {
  snapForm: FormGroup;

  constructor(
    private app: AppComponent,
    private voitureService: VoitureService
  ) { }

  ngOnInit(): void {
  }

  formSubmit(located: string): void {
    this.snapForm.get('location')?.setValue(located);
    this.voitureService.moveVoiture(this.snapForm).pipe(
      catchError(err => this.app.catchPostError(err))
    ).subscribe(
      (response) => this.app.getVoituresValidate(response)
    );
    this.snapForm.reset();
  }
}
