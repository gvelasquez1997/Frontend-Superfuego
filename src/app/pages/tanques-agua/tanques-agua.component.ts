import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NiveltanqueService } from '../../services/niveltanque/niveltanque.service';
import { NivelTanque } from '../../models/NivelTanque';
import { UiServiceService } from '../../services/ui-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SetpointService } from '../../services/setpoint/setpoint.service';
import { SetPoint } from '../../models/SetPoint';
import { SenialService } from '../../services/senial/senial.service';
import { Senial } from '../../models/Senial';

@Component({
  selector: 'app-tanques-agua',
  templateUrl: './tanques-agua.component.html',
  styleUrls: ['./tanques-agua.component.css']
})
export class TanquesAguaComponent implements OnInit {
  
  nivelTanques: NivelTanque;
  setPoints: SetPoint;
  senials: Senial;
  isVisible = false;
  validateForm: FormGroup;
  update: boolean = false;
  idNivelTanque;

  constructor( public servicioSenial: SenialService, public servicioSetpoint: SetpointService, public servicio: NiveltanqueService, private fb: FormBuilder, public uiService: UiServiceService,
    private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    /*this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);*/

    this.getListNivelTanques();
    this.getListSetPoints();
    this.getListSenial();
    this.camposForm( null, '', null, null );
  }

  getListNivelTanques() {
    this.servicio.getNivelTanques().subscribe( 
      resp => { 
        //console.log( resp ); 
        this.nivelTanques = resp
      },
      err => {
        alert( err['message'] );
        //console.error( err );
      } 
    );
  }

  getListSetPoints() {
    this.servicioSetpoint.getSetpoints().subscribe( 
      resp => { 
        //console.log( resp ); 
        this.setPoints = resp
      },
      err => {
        alert( err['message'] );
        //console.error( err );
      } 
    );
  }

  getListSenial() {
    this.servicioSenial.getSenial().subscribe( 
      resp => { 
        //console.log( resp ); 
        this.senials = resp
      },
      err => {
        alert( err['message'] );
        //console.error( err );
      } 
    );
  }

  async saveNewNivelTanque() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const nivelTanque: NivelTanque = {
        SenialId: Number( this.validateForm.controls.senialId.value ),
        CapacidadMaxima: Number( this.validateForm.controls.capacidadMaxima.value ),
        SetPointId: Number( this.validateForm.controls.setpointId.value ),
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }
      console.log( nivelTanque );
      const crear = await this.servicio.createNivelTanques( nivelTanque );

      if ( crear ){
        this.isVisible = false;
        this.uiService.createMessage('create');
        await this.getListNivelTanques();
        this.camposForm( null, '', null, null );
      } else{
        this.uiService.createMessage('error');
      }
      
    } 
    else 
    {
      this.uiService.createMessage('campos');
    }

    this.spinner.hide();
  }

  validarCampos(): string {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    //console.log(this.validateForm.controls.estado.value);
    //console.log(this.validateForm.controls.descripcion.value);
    return this.validateForm.status;
  }

  camposForm( SenialId, CapacidadMaxima, SetPointId, Estado ){
    this.validateForm = this.fb.group({
      senialId: [ SenialId, [Validators.required ]],
      capacidadMaxima: [ CapacidadMaxima, [Validators.required ]],
      setpointId: [ SetPointId, [Validators.required ]],
      estado: [ Estado , [Validators.required ]]
    });
  }

  selectNivelTanque( item: NivelTanque ){

    this.isVisible = true;
    this.update = true;
    this.camposForm( item.SenialId, item.CapacidadMaxima, item.SetPointId, String( item.Estado ) );
    this.idNivelTanque = item.Id;
  }

  async updateNivelTanque(){

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const item: NivelTanque = {
        Id: this.idNivelTanque,
        SenialId: Number( this.validateForm.controls.senialId.value ), 
        CapacidadMaxima: Number( this.validateForm.controls.capacidadMaxima.value ),
        SetPointId: Number( this.validateForm.controls.setpointId.value ),  
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }
      console.log( item );
      const actualizar = await this.servicio.updateNivelTanques( item );

      if ( actualizar ){
        this.isVisible = false;
        this.uiService.createMessage('update');
        await this.getListNivelTanques();
        this.camposForm( null, '', null, null );
        this.update = false;
      } else{
        this.uiService.createMessage('error');
      }
      
    } 
    else 
    {
      this.uiService.createMessage('campos');
    }

    this.spinner.hide();

  }

  async deleteNivelTanque( item ){

    
    const confirmation = await this.uiService.showDeleteConfirm('Estas seguro de eliminar este Nivel de Tanque?');

    if( confirmation )
    {
      this.spinner.show();
      const eliminar = await this.servicio.deleteNivelTanques( item.Id );
      if( eliminar ){
        this.uiService.createMessage('delete');
        await this.getListNivelTanques();
      } else {
        this.uiService.createMessage('error');
      }
    }

    this.spinner.hide();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.update = false;
    this.camposForm( null, '', null, null );
  }

}
