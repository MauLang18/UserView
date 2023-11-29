import { Component, Inject, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { RolService } from "../../services/rol.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FamiliaService } from "@shared/services/familia.service";
import { Familias } from "@shared/models/familias.interface";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";

@Component({
  selector: "vex-rol-manage",
  templateUrl: "./rol-manage.component.html",
  styleUrls: ["./rol-manage.component.scss"],
})
export class RolManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  rolList: Familias[];
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _rolService: RolService,
    public _dialogRef: MatDialogRef<RolManageComponent>,
    private _familiaService: FamiliaService
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      id: [0, [Validators.required]],
      rol: ["", [Validators.required]],
      privilegios: [],
    });
  }

  ngOnInit(): void {
    this.listFamilias();

    if (this.data != null) {
      this.RolById(this.data.data.id);
    }
  }

  RolById(id: number): void {
    this._rolService.rolById(id).subscribe((resp) => {
      this.form.patchValue({
        id: resp.id,
        rol: resp.rol,
        privilegios: resp.privilegios,
      });
      this.markMatchingCheckboxes();
    });
  }

  listFamilias(): void {
    this._familiaService.listFamilias().subscribe((resp) => {
      this.rolList = resp;
    });
  }

  markMatchingCheckboxes(): void {
    const privilegiosControl = this.form.get("privilegios");
    const selectedPrivilegios = privilegiosControl.value || "";

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox: any) => {
      if (selectedPrivilegios.includes(checkbox.value)) {
        checkbox.checked = true;
      }
    });
  }

  RolSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const id = this.form.get("id").value;

    if (id > 0) {
      this.RolEdit(id);
    } else {
      this.RolRegister();
    }
  }

  onChange(e: any) {
    const privilegiosControl = this.form.get("privilegios");

    let selectedPrivilegios = privilegiosControl.value || "";

    if (e.target.checked) {
      if (!selectedPrivilegios.includes(e.target.value)) {
        selectedPrivilegios +=
          (selectedPrivilegios.length > 0 ? "," : "") + e.target.value;
      }
    } else {
      selectedPrivilegios = selectedPrivilegios
        .split(",")
        .filter((value: string) => value !== e.target.value)
        .join(",");
    }

    privilegiosControl.setValue(selectedPrivilegios);
  }

  RolRegister(): void {
    this._rolService.rolRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  RolEdit(id: number): void {
    this._rolService.rolEdit(id, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }
}
