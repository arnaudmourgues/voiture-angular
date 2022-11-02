import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModifComponent} from "./modif/modif.component";
import {DeleteComponent} from "./delete/delete.component";
import {AjouterComponent} from "./ajouter/ajouter.component";
import {W3wmapComponent} from "./w3wmap/w3wmap.component";

const routes: Routes = [
  {path: 'delete', component: DeleteComponent},
  {path: 'modif', component: ModifComponent},
  {path: 'add', component: AjouterComponent},
  {path: 'map', component: W3wmapComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
