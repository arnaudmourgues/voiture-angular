import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import { ModifComponent } from './modif/modif.component';

import { DeleteComponent } from './delete/delete.component';
import { AjouterComponent } from './ajouter/ajouter.component';
import { W3wmapComponent } from './w3wmap/w3wmap.component';

@NgModule({
  declarations: [
    AppComponent,
    ModifComponent,
    DeleteComponent,
    AjouterComponent,
    W3wmapComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
