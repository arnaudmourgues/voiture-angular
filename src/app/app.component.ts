import {Component, OnInit, ElementRef} from '@angular/core';
import {VoitureService} from "./service/voiture.service";
import {Voiture} from "./interface/voiture";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  snapForm!: FormGroup;
  voitures : Voiture[];
  title = 'voiture-app';

  ngOnInit(): void {
    this.onGetVoitures();
    this.snapForm = this.formBuilder.group({
      color: [null, Validators.required],
      wheels: [null, Validators.required],
      location: [null, Validators.required ],
    });
  }

  constructor(
    private voitureService: VoitureService,
    private formBuilder: FormBuilder
  )
  {}


  onGetVoitures(): void {
    this.voitureService.getVoitures().subscribe(
      (response) => {this.voitures = response}
    )
  }


  formSubmit(): void {
    this.voitureService.createVoiture(this.snapForm);
    console.log(this.snapForm.value)
  }
}
