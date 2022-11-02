import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "../app.component";
import {VoitureService} from "../service/voiture.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  snapForm: FormGroup;

  constructor(
    private app: AppComponent,
    private voitureService: VoitureService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.snapForm = this.formBuilder.group({
      id: [null, Validators.required],
    });
  }

  formSubmit(): void {
    this.voitureService.deleteVoiture(this.snapForm).pipe(
      catchError(err => this.app.catchPostError(err))
    ).subscribe(
      (response) => this.app.getVoituresValidate(response)
    );
    this.snapForm.reset();
  }

}
