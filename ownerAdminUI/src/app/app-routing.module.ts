import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnersComponent } from './owners/owners.component';
import { ViewOwnersComponent } from './owners/view-owners/view-owners.component';

const routes: Routes = [
  {
    path: '',
    component: OwnersComponent
  },
  {
    path: 'owner',
    component: OwnersComponent
  },
  {
    path: 'owner/:id',
    component: ViewOwnersComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
