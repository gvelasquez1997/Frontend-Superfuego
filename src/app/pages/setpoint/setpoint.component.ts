import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetpointService } from '../../services/setpoint/setpoint.service';
import { SetPoint } from '../../models/SetPoint';
import { UiServiceService } from '../../services/ui-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-setpoint',
  templateUrl: './setpoint.component.html',
  styleUrls: ['./setpoint.component.css']
})
export class SetpointComponent implements OnInit {

  setPoints: SetPoint;
  isVisible = false;
  validateForm: FormGroup;
  update: boolean = false;
  idSetpoint;

  constructor( public servicio: SetpointService, private fb: FormBuilder, public uiService: UiServiceService,
    private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    /*this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);*/

    this.getListSetPoints();
    this.camposForm( '', '', null );
  }

  getListSetPoints() {
    this.servicio.getSetpoints().subscribe( 
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

  async saveNewSetPoint() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const setPoint: SetPoint = {
        Descripcion: this.validateForm.controls.descripcion.value,
        Valor: Number( this.validateForm.controls.valor.value ),
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }
      console.log( setPoint );
      const crear = await this.servicio.createSetpoint( setPoint );

      if ( crear ){
        this.isVisible = false;
        this.uiService.createMessage('create');
        await this.getListSetPoints();
        this.camposForm( '', '', null );
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

  camposForm( Descripcion, Valor, Estado ){
    this.validateForm = this.fb.group({
      descripcion: [ Descripcion, [Validators.required ]],
      valor: [ Valor, [Validators.required ]],
      estado: [ Estado , [Validators.required ]]
    });
  }

  selectSetPoint( item: SetPoint ){

    this.isVisible = true;
    this.update = true;
    this.camposForm( item.Descripcion, item.Valor, String( item.Estado ) );
    this.idSetpoint = item.Id;
  }

  async updateSetPoint(){

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const item: SetPoint = {
        Id: this.idSetpoint,
        Descripcion: this.validateForm.controls.descripcion.value,
        Valor: Number( Number( this.validateForm.controls.valor.value ).toFixed(2) ), 
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }
      console.log( item );
      const actualizar = await this.servicio.updateSetpoint( item );

      if ( actualizar ){
        this.isVisible = false;
        this.uiService.createMessage('update');
        await this.getListSetPoints();
        this.camposForm( '', '', null );
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

  async deleteSetPoint( item ){

    
    const confirmation = await this.uiService.showDeleteConfirm('Estas seguro de eliminar este SetPoint?');

    if( confirmation )
    {
      this.spinner.show();
      const eliminar = await this.servicio.deleteSetpoint( item.Id );
      if( eliminar ){
        this.uiService.createMessage('delete');
        await this.getListSetPoints();
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
    this.camposForm( '', '', null );
  }

}
