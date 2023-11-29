import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '@shared/apis/endpoints';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { Roles } from '@shared/models/rol.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private _http: HttpClient) { }

  listRol(): Observable<Roles[]>{
    const requestUrl = `${env.api}${endpoints.LIST_SELECT_ROL}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse ) => {
        return resp.data;
      })
    );
  }
}
