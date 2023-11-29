import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolRoutingModule } from './rol-routing.module';
import { RolListComponent } from './components/rol-list/rol-list.component';
import { RolManageComponent } from './components/rol-manage/rol-manage.component';
import { SharedModule } from '@shared/shared.module';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';


@NgModule({
  declarations: [
    RolListComponent,
    RolManageComponent
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
  ]
})
export class RolModule { }
