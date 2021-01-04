import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Empresas } from '../../models/Empresas';

const URL = environment.URL;
@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private http: HttpClient) { }

  getEmpresas() {
    return this.http.get( `${ URL }/empresas` );
  }

  createEmpresas( empresas: Empresas ) {
    return new Promise( resolve => {
      this.http.post( `${ URL }/empresas`, empresas )
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }

  updateEmpresas( empresas: Empresas ) {
    return new Promise( resolve => {
      this.http.patch(`${ URL }/empresas/${ empresas.Id }`, empresas)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve ( false );
        });
    });
  }

  deleteEmpresas( id ) {
    return new Promise( resolve =>{
      this.http.delete(`${ URL }/empresas/${ id }`)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }
}
