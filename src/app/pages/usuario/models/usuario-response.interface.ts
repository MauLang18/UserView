export interface UsuarioResponse{
  id: number;
  username: string;
  pass: string;
  rol: string;
  badgeColor: string;
  icEdit: any;
  icDelete: any;
}

export interface UsuarioById{
  id: number;
  username: string;
  pass: string;
  rol: number;
}