import { Component } from '@angular/core';
import { UsuariosService } from '../servicios-backend/usuarios/usuarios.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public idUsuario=""
  public nombreCompleto = ""
  public userName = ""
  public password = ""
  public swGuardarCambios= false;
  public filtro: string ;
  public filtrobtn =false;

public listUsuarios = [];

  constructor(private usuariosService: UsuariosService) {
    this.getUsuarios();
  }

  private getUsuarios(){
    this.usuariosService.GetUsuarios().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listUsuarios = response.body;
            //console.log(this.listUsuarios)
            this.filtrarUsuario();
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            //console.log('complete - this.getUsuarios()');
        },
    });
  }

  public addUsuario(){
    if (this.nombreCompleto.length > 0 && this.userName.length > 0 && this.password.length > 0) {
        var entidad = {
          nombreCompleto : this.nombreCompleto,
          userName : this.userName,
          password : this.password
        }
        console.log(entidad)
        this.usuariosService.AddUsuario(entidad).subscribe({
            next: (response: HttpResponse<any>) => {
                //console.log(response.body)//1
                if(response.body == 1){
                    alert("Se agrego al Usuario con exito :)");
                    this.getUsuarios();//Se actualize el listado
                    this.nombreCompleto = "";
                    this.userName = "";
                    this.password = "";
                }else{
                    alert("Al agregar al Usuario falló:(");
                }
            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                console.log('complete - this.addUsuario()');
            },
        });
    }
}

  public updateUsuario(item){

     console.log(item)
    this.idUsuario = item.id //oculto
    this.nombreCompleto = item.nombreCompleto //input
    this.userName = item.userName //input
    this.password = item.password
    this.swGuardarCambios = true;
  }

  public deleteUsuario(item){
    
  }
  public filtrarUsuario() {
    if (this.filtro) {
      this.listUsuarios = this.listUsuarios.filter((usuario) => {
        if (usuario && usuario.nombreCompleto) {
          return usuario.nombreCompleto.toLowerCase().includes(this.filtro.toLowerCase());
        }
        return false;
      });
    } else {
      if ( this.filtro.length ==0 ){
        this.getUsuarios();
      }
    }
  }
  
  
  
  
  
  
}
