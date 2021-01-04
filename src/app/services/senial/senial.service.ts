import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Senial } from '../../models/Senial';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class SenialService {

  constructor( private http: HttpClient ) { }

  getSenial() {
    return this.http.get( `${ URL }/senials` );
  }

  createSenial( senial: Senial ) {
    return new Promise( resolve => {
      this.http.post( `${ URL }/senials`, senial )
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }

  updateSenial( senial: Senial ) {
    return new Promise( resolve => {
      this.http.patch(`${ URL }/senials/${ senial.Id }`, senial)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve ( false );
        });
    });
  }

  deleteSenial( id ) {
    return new Promise( resolve =>{
      this.http.delete(`${ URL }/senials/${ id }`)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }

}
