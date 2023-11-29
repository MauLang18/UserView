import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApiResponse, BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { environment as env } from "./../../../../environments/environment";
import { RolById, RolResponse } from "../models/rol-response.interface";
import { map } from "rxjs/operators";
import { endpoints } from "@shared/apis/endpoints";
import { getIcon } from "@shared/functions/helpers";
import { RolRequest } from "../models/rol-request.interface";

@Injectable({
  providedIn: "root",
})
export class RolService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoints.LIST_ROL
    }?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1}${getInputs}`;

    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((resp) => {
        resp.data.items.forEach(function (prov: RolResponse) {
          prov.icEdit = getIcon("icEdit", "Editar Rol", true);
          prov.icDelete = getIcon(
            "icDelete",
            "Eliminar Rol",
            true
          );
        });
        return resp;
      })
    );
  }

  rolById(id: number): Observable<RolById> {
    const requestUrl = `${env.api}${endpoints.ROL_BY_ID}${id}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  rolRegister(rol: RolRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.REGISTER_ROL}`;

    return this._http.post(requestUrl, rol).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  rolEdit(
    id: number,
    rol: RolRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.EDIT_ROL}${id}`;

    return this._http.put<BaseResponse>(requestUrl, rol);
  }

  rolRemove(id: number): Observable<void> {
    const requestUrl = `${env.api}${endpoints.REMOVE_ROL}${id}`;

    return this._http.delete<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if(resp.isSuccess){
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
