import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {PATH_BACKEND = environment.URL_BACKEND + environment.PORT_BACKEND;

  URL_GET_RESERVAS = this.PATH_BACKEND + "/api/Reserva"
 // URL_GET_BY_ID_CATEGORIA = this.PATH_BACKEND + "/api/Categoria/GetCategoriaById"
  URL_ADD_RESERVA = this.PATH_BACKEND + "/api/Reserva/AddReserva"
  URL_UPDATE_RESERVA = this.PATH_BACKEND + "/api/Reserva/UpdateReserva"
  URL_UPDATE_ESTADORESERVA = this.PATH_BACKEND + "/api/Reserva/CambiarestadoReserva"
  URL_DELETE_RESERVA = this.PATH_BACKEND + "/api/Reserva/DeleteReserva"
  URL_ACTIVATE_RESERVA = this.PATH_BACKEND + "/api/Reserva/ActivarReserva"
  constructor(private http: HttpClient) { }

  public GetReserva(): Observable<HttpResponse<any>> {

    return this.http
        .get<any>(this.URL_GET_RESERVAS,
            { observe: 'response' })
        .pipe();
}
public AddReserva(entidad): Observable<HttpResponse<any>> {

  return this.http
      .post<any>(this.URL_ADD_RESERVA, entidad,
          { observe: 'response' })
      .pipe();
}

public UpdateReserva(entidad): Observable<HttpResponse<any>> {

  return this.http
      .post<any>(this.URL_UPDATE_RESERVA, entidad,
          { observe: 'response' })
      .pipe();
}
public UpdateEstadoReserva(entidad): Observable<HttpResponse<any>> {

  return this.http
      .post<any>(this.URL_UPDATE_ESTADORESERVA, entidad,
          { observe: 'response' })
      .pipe();
}
public DeleteReserva(item): Observable<HttpResponse<any>> {
    
  let params = new HttpParams();
  params = params.set('id', item.id);

  return this.http
      .post<any>(this.URL_DELETE_RESERVA,  "", {params: params, observe: 'response' })
      .pipe();
}
public ActivateReserva(item): Observable<HttpResponse<any>> {
    
  let params = new HttpParams();
  params = params.set('id', item.id);

  return this.http
      .post<any>(this.URL_ACTIVATE_RESERVA,  "", {params: params, observe: 'response' })
      .pipe();
}
}
