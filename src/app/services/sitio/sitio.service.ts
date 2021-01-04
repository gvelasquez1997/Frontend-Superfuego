import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Sitio } from '../../models/Sitio';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class SitioService {

  constructor( private http: HttpClient ) { }

  getSitios() {
    return this.http.get( `${ URL }/sitios` );
  }

  createSitios( sitio: Sitio ) {
    return new Promise( resolve => {
      this.http.post( `${ URL }/sitios`, sitio )
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }

  updateSitios( sitio: Sitio ) {
    return new Promise( resolve => {
      this.http.patch(`${ URL }/sitios/${ sitio.Id }`, sitio)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve ( false );
        });
    });
  }

  deleteSitios( id ) {
    return new Promise( resolve =>{
      this.http.delete(`${ URL }/sitios/${ id }`)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }
}
