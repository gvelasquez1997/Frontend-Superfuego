import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { CuartoBomba } from '../../models/CuartoBomba';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class CuartoBombasService {

  constructor( private http: HttpClient ) { }

  getCuartoBombas() {
    return this.http.get( `${ URL }/cuarto-bombas` );
  }

  createCuartoBombas( cuartoBomba: CuartoBomba ) {
    return new Promise( resolve => {
      this.http.post( `${ URL }/cuarto-bombas`, cuartoBomba )
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }

  updateCuartoBombas( cuartoBomba: CuartoBomba ) {
    return new Promise( resolve => {
      this.http.patch(`${ URL }/cuarto-bombas/${ cuartoBomba.Id }`, cuartoBomba)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve ( false );
        });
    });
  }

  deleteCuartoBombas( id ) {
    return new Promise( resolve =>{
      this.http.delete(`${ URL }/cuarto-bombas/${ id }`)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }
}
