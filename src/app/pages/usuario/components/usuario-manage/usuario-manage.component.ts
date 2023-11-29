import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@shared/services/alert.service';
import { IconsService } from '@shared/services/icons.service';
import { UsuarioService } from '../../services/usuario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as configs from "../../../../../static-data/configs";
import { RolService } from '@shared/services/rol.service';
import { Roles } from '@shared/models/rol.interface';

@Component({
  selector: 'vex-usuario-manage',
  templateUrl: './usuario-manage.component.html',
  styleUrls: ['./usuario-manage.component.scss']
})
export class UsuarioManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  rolList: Roles[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      id: [0, [Validators.required]],
      username: ["", [Validators.required]],
      rol:["", [Validators.required]],
      pass: [""],
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _usuarioService: UsuarioService,
    public _dialogRef: MatDialogRef<UsuarioManageComponent>,
    private _rolService: RolService) {this.initForm();   }

  ngOnInit(): void {
    this.listRoles();

    if(this.data != null){
      this.usuarioById(this.data.data.id);
    }
  }

  usuarioById(id: number): void{
    this._usuarioService.usuarioById(id).subscribe((resp) => {
      this.form.reset({
        id: resp.id,
        username: resp.username,
        rol: resp.rol,
        pass: ''
      });
    })
  }

  listRoles(): void {
    this._rolService.listRol().subscribe((resp) => {
      this.rolList = resp;
    });
  }

  usuarioSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const id = this.form.get("id").value;

    if (id > 0) {
      this.usuarioEdit(id);
    } else {
      this.usuarioRegister();
    }
  }

  usuarioRegister(): void {
    this._usuarioService
      .usuarioRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  usuarioEdit(id: number): void {
    this._usuarioService.usuarioEdit(id, this.form.value)
    .subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    })
  }
}
