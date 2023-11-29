import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { RolService } from '../../services/rol.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { componentSettings } from './rol-list-config';
import { FiltersBox } from '@shared/models/search-options.interface';
import { RolResponse } from '../../models/rol-response.interface';
import { RowClick } from '@shared/models/row-click.interface';
import { RolManageComponent } from '../rol-manage/rol-manage.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'vex-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.scss'],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class RolListComponent implements OnInit {
  component: any;

  constructor(customTitle: CustomTitleService,
    public _rolService: RolService,
    public _dialog: MatDialog) 
    { customTitle.set("Roles");}

  ngOnInit(): void {
    this.component = componentSettings;
  }

  setMenu(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
  }

  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }

    this.component.getInputs = str;
  }

  openDialogRegister() {
    this._dialog.open(RolManageComponent, {
      disableClose: true,
      width: "400px"
    })
    .afterClosed()
    .subscribe((resp) =>{
      if(resp){
        this.setGetInputsRoles(true);
      }
    })
  }

  rowClick(rowClick: RowClick<RolResponse>){
    let action = rowClick.action;
    let rol = rowClick.row;

    switch(action){
      case "edit":
        this.rolEdit(rol);
        break;
      case "remove":
        this.rolRemove(rol);
        break;
    }

    return false;
  }

  rolEdit(rolData: RolResponse){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = rolData;

    this._dialog.open(RolManageComponent,{
      data: dialogConfig,
      disableClose: true,
      width: "400px",
    })
    .afterClosed()
    .subscribe((resp) => {
      if(resp){
        this.setGetInputsRoles(true);
      }
    })
  }

  rolRemove(rolData: RolResponse){
    Swal.fire({
      title: `¿Realmente deseas eliminar el rol ${rolData.rol}?`,
      text: "Se borrará de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210,155,253)",
      cancelButtonColor: "rgb(79,109,253)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._rolService
          .rolRemove(rolData.id)
          .subscribe(() => this.setGetInputsRoles(true));
      }
    });
  }

  setGetInputsRoles(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }
}
