import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Unidad } from '../../models/Unidades';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  constructor( private http: HttpClient ) { }

  getUnidades() {
    return this.http.get( `${ URL }/unidads` );
  }

  createUnidades( unidad: Unidad ) {
    return new Promise( resolve => {
      this.http.post( `${ URL }/unidads`, unidad )
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }

  updateUnidades( unidad: Unidad ) {
    return new Promise( resolve => {
      this.http.patch(`${ URL }/unidads/${ unidad.Id }`, unidad)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve ( false );
        });
    });
  }

  deleteUnidades( id ) {
    return new Promise( resolve =>{
      this.http.delete(`${ URL }/unidads/${ id }`)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }
}
