export interface RolResponse {
    id: number;
    rol: string;
    privilegios: string;
    badgeColor: string;
    icEdit: any;
    icDelete: any;
}

export interface RolById{
    id: number;
    rol: string;
    privilegios: string;
}