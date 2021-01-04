import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { NivelTanque } from '../../models/NivelTanque';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class NiveltanqueService {

  constructor( private http: HttpClient ) { }

  getNivelTanques() {
    return this.http.get( `${ URL }/nivel-tanques` );
  }

  createNivelTanques( nivelTanque: NivelTanque ) {
    return new Promise( resolve => {
      this.http.post( `${ URL }/nivel-tanques`, nivelTanque )
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }

  updateNivelTanques( nivelTanque: NivelTanque ) {
    return new Promise( resolve => {
      this.http.patch(`${ URL }/nivel-tanques/${ nivelTanque.Id }`, nivelTanque)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve ( false );
        });
    });
  }

  deleteNivelTanques( id ) {
    return new Promise( resolve =>{
      this.http.delete(`${ URL }/nivel-tanques/${ id }`)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }
}
