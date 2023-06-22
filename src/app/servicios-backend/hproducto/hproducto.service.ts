import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HproductoService {

  PATH_BACKEND = environment.URL_BACKEND + environment.PORT_BACKEND;

  URL_GET_HPRODUCTOS = this.PATH_BACKEND + "/api/HProducto"
  URL_GET_BY_ID_CATEGORIA = this.PATH_BACKEND + "/api/Categoria/GetCategoriaById"
  URL_ADD_CATEGORIA = this.PATH_BACKEND + "/api/Categoria/AddCategoria"
  URL_UPDATE_CATEGORIA = this.PATH_BACKEND + "/api/Categoria/UpdateCategoria"
  URL_DELETE_CATEGORIA = this.PATH_BACKEND + "/api/Categoria/DeleteCategoria"

  constructor(private http: HttpClient) { }

  public GetHProductos(): Observable<HttpResponse<any>> {

      return this.http
          .get<any>(this.URL_GET_HPRODUCTOS,
              { observe: 'response' })
          .pipe();
}
}