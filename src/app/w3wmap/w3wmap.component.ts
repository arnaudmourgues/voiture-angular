import {Component,OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup,} from "@angular/forms";
import {AjouterComponent} from "../ajouter/ajouter.component";
import {ModifComponent} from "../modif/modif.component";

@Component({
  selector: 'app-w3wmap',
  templateUrl: './w3wmap.component.html',
  styleUrls: ['./w3wmap.component.css']
})


export class W3wmapComponent implements OnInit {
  snapForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ajouter: AjouterComponent,
    private modif: ModifComponent

  ) { }

  ngOnInit(): void {
    this.snapForm = this.formBuilder.group({
      location: ["///records.beards.solar"]
    });
  }

  onClick(located: string) {
    if(this.router.url === "/add") {
      this.ajouter.val = located;
      this.ajouter.snapForm.get('location')?.setValue(located);
      this.ajouter.display = !this.ajouter.display;
    }else if(this.router.url === "/modif"){
      this.modif.val = located;
      this.modif.snapForm.get('location')?.setValue(located);
      this.modif.display = false;
    }
  }
}
