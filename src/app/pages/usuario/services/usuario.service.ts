import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { BaseApiResponse, BaseResponse } from '@shared/models/base-api-response.interface';
import { environment as env } from "./../../../../environments/environment";
import { endpoints } from '@shared/apis/endpoints';
import { UsuarioById, UsuarioResponse } from '../models/usuario-response.interface';
import { getIcon } from '@shared/functions/helpers';
import { UsuarioRequest } from '../models/usuario-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _http: HttpClient, private _alert: AlertService) { }

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoints.LIST_USUARIOS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1}${getInputs}`;

    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((resp) => {
        resp.data.items.forEach(function (prov: UsuarioResponse) {
          prov.icEdit = getIcon("icEdit", "Editar Usuario", true);
          prov.icDelete = getIcon(
            "icDelete",
            "Eliminar Usuario",
            true
          );
        });
        return resp;
      })
    );
  }

  usuarioById(id: number): Observable<UsuarioById> {
    const requestUrl = `${env.api}${endpoints.USUARIO_BY_ID}${id}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  usuarioRegister(usuario: UsuarioRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.REGISTER_USUARIO}`;

    return this._http.post(requestUrl, usuario).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  usuarioEdit(
    id: number,
    proveedor: UsuarioRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.EDIT_USUARIO}${id}`;

    return this._http.put<BaseResponse>(requestUrl, proveedor);
  }

  usuarioRemove(id: number): Observable<void> {
    const requestUrl = `${env.api}${endpoints.REMOVE_USUARIO}${id}`;

    return this._http.delete<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if(resp.isSuccess){
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
