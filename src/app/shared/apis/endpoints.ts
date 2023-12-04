import { HttpHeaders } from "@angular/common/http";

export const endpoints = {
  //AUTH MODULE
  LOGIN: "Auth/Login",
  LOGIN_GOOGLE: "Auth/LoginWithGoogle",

  //USUARIO MODULE
  LIST_USUARIOS: "Usuario",
  USUARIO_BY_ID: "Usuario/",
  REGISTER_USUARIO: "Usuario/Register/",
  EDIT_USUARIO: "Usuario/Edit/",
  REMOVE_USUARIO: "Usuario/Remove/",

  //ROL MODULE
  LIST_ROL: "Rol",
  LIST_SELECT_ROL: "Rol/Select",
  ROL_BY_ID: "Rol/",
  REGISTER_ROL: "Rol/Register/",
  EDIT_ROL: "Rol/Edit/",
  REMOVE_ROL: "Rol/Remove/",

  //FAMILIAS MODULE
  LIST_FAMILIAS: "Familias",
};

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
