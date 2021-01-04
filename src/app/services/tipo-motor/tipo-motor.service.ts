import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class TipoMotorService {

  constructor( private http: HttpClient ) { }

  getTiposMotor() {
    return this.http.get(`${ URL }/tipo-motors`);
  }

  createTipoMotor( tipoMotor ) {
    return new Promise( resolve => {

      this.http.post( `${ URL }/tipo-motors`, tipoMotor )
        .subscribe( resp => {
          //console.log( resp );
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }

  updateTipoMotor( tipoMotor ){
    return new Promise( resolve => {

      this.http.patch(`${ URL }/tipo-motors/${ tipoMotor.Id }`, tipoMotor)
        .subscribe( resp => {
          //console.log( resp );
          resolve( true );
        }, err =>{
          console.log( err );
          resolve( false );
        });
    });
  }

  deleteTipoMotor( id ){
    return new Promise( resolve => {
      this.http.delete(`${ URL }/tipo-motors/${ id }`)
        .subscribe( resp => {
          //console.log( resp );
          resolve( true);
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }
}
