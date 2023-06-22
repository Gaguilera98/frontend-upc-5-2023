import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  PATH_BACKEND = environment.URL_BACKEND + environment.PORT_BACKEND;

  URL_GET_CARRITO_COMPRA = this.PATH_BACKEND + "/api/CarritoCompra"
  URL_GET_BY_ID_CATEGORIA = this.PATH_BACKEND + "/api/Categoria/GetCategoriaById"
  URL_ADD_CATEGORIA = this.PATH_BACKEND + "/api/CarritoCompra/AddCarritoCompra"
  URL_UPDATE_CATEGORIA = this.PATH_BACKEND + "/api/Categoria/UpdateCategoria"
  URL_DELETE_CATEGORIA = this.PATH_BACKEND + "/api/Categoria/DeleteCategoria"
  constructor( private http: HttpClient) { }

  public GetCarrito(): Observable<HttpResponse<any>> {

    return this.http
        .get<any>(this.URL_GET_CARRITO_COMPRA,
            { observe: 'response' })
        .pipe();
}
public AddCarrito(entidad): Observable<HttpResponse<any>> {

  return this.http
      .post<any>(this.URL_ADD_CATEGORIA, entidad,
          { observe: 'response' })
      .pipe();
}
}
