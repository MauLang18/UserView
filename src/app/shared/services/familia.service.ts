import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '@shared/apis/endpoints';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { Familias } from '@shared/models/familias.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  constructor(private _http: HttpClient) { }

  listFamilias(): Observable<Familias[]> {
    const requestUrl = `${env.api}${endpoints.LIST_FAMILIAS}`;

    return this._http.get<any[]>(requestUrl).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }
}
