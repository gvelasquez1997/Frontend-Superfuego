import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { SetPoint } from '../../models/SetPoint';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class SetpointService {

  constructor( private http: HttpClient ) { }

  getSetpoints() {
    return this.http.get( `${ URL }/set-points` );
  }

  createSetpoint( setpoint: SetPoint ) {
    return new Promise( resolve => {
      this.http.post( `${ URL }/set-points`, setpoint )
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }

  updateSetpoint( setpoint: SetPoint ) {
    return new Promise( resolve => {
      this.http.patch(`${ URL }/set-points/${ setpoint.Id }`, setpoint)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve ( false );
        });
    });
  }

  deleteSetpoint( id ) {
    return new Promise( resolve =>{
      this.http.delete(`${ URL }/set-points/${ id }`)
        .subscribe( resp => {
          resolve( true );
        }, err => {
          console.log( err );
          resolve( false );
        });
    });
  }
}
