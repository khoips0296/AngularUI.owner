import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnersComponent } from './owners/owners.component';

const routes: Routes = [
  {
    path: '',
    component: OwnersComponent
  },
  {
    path: 'owner',
    component: OwnersComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
