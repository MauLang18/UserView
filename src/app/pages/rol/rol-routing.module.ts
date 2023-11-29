import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolListComponent } from './components/rol-list/rol-list.component';

const routes: Routes = [
  {
    path: '',
    component: RolListComponent,
    data:{
      scrollDisabled: true,
      toolbarShadowEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule { }
