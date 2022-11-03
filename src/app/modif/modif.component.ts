import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {VoitureService} from "../service/voiture.service";
import {AppComponent} from "../app.component";
import {ViewportScroller} from "@angular/common";
import {W3wmapComponent} from "../w3wmap/w3wmap.component";

@Component({
  selector: 'app-modif',
  templateUrl: './modif.component.html',
  styleUrls: ['./modif.component.css']
})
export class ModifComponent implements OnInit {
  snapForm!: FormGroup;
  val: string = "";
  display: boolean = false;

  constructor(
    private app: AppComponent,
    private voitureService: VoitureService,
    private formBuilder: FormBuilder,
    private scroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.snapForm = this.formBuilder.group({
      id: [null, Validators.required],
      location: [null, Validators.required],
    });

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

  async openMap() {
    this.display = !this.display;
    await new Promise(f => setTimeout(f, 5));
    this.scroller.scrollToAnchor("buttonMap");
  }

}
