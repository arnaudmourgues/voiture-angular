import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {VoitureService} from "../service/voiture.service";
import {AppComponent} from "../app.component";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {
  snapForm!: FormGroup;
  display: boolean = false;
  val: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private voitureService: VoitureService,
    private app: AppComponent,
    private scroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.snapForm = this.formBuilder.group({
      color: [null, Validators.required],
      wheels: [null, Validators.required],
      location: [null, Validators.required],
    });
  }

  formSubmit(located: string): void {
    this.snapForm.get('location')?.setValue(located);
    this.voitureService.createVoiture(this.snapForm).pipe(
      catchError(err => this.app.catchPostError(err))
    ).subscribe(
      (response) => this.app.getVoituresValidate(response)
    );

  }

  async openMap() {
    this.display = !this.display;
    await new Promise(f => setTimeout(f, 5));
    this.scroller.scrollToAnchor("buttonMap");
  }
}
