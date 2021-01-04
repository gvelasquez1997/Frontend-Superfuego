import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoMotorService } from '../../services/tipo-motor/tipo-motor.service';
import { TipoMotor } from '../../models/Tipo-Motor';
import { UiServiceService } from '../../services/ui-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tipo-motor',
  templateUrl: './tipo-motor.component.html',
  styleUrls: ['./tipo-motor.component.css']
})
export class TipoMotorComponent implements OnInit {

  tiposMotores: TipoMotor;
  tipoMotor: TipoMotor;
  isVisible = false;
  validateForm: FormGroup;
  update: boolean = false;
  idTipoMotor;

  constructor( public servicio: TipoMotorService, private fb: FormBuilder, public uiService: UiServiceService,
    private spinner: NgxSpinnerService ) { }

   ngOnInit() {

    /*this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);*/

    this.getListTipoMotores();
    this.camposForm( '', null );

    
  }

  getListTipoMotores() {
    this.servicio.getTiposMotor().subscribe( 
      resp => { 
        //console.log( resp ); 
        this.tiposMotores = resp
      },
      err => {
        alert( err['message'] );
        //console.error( err );
      } 
    );
  }

  async saveNewTipoMotor() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      //console.log('Retorno true');
      this.tipoMotor = this.obtenerValores();
      //console.log(this.tipoMotor);
      const crear = await this.servicio.createTipoMotor( this.tipoMotor );

      if ( crear ){
        this.isVisible = false;
        this.uiService.createMessage('create');
        await this.getListTipoMotores();
        this.camposForm( '', null );
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

  obtenerValores(): TipoMotor {

    return {
      Descripcion: this.validateForm.controls.descripcion.value, 
      Estado: JSON.parse( this.validateForm.controls.estado.value )
    };

  }

  selectTipoMotor( item ){

    this.isVisible = true;
    this.update = true;
    this.camposForm( item.Descripcion, String( item.Estado ) );
    this.idTipoMotor = item.Id;
  }

  async updateTipoMotor(){

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const item: TipoMotor = {
        Id: this.idTipoMotor,
        Descripcion: this.validateForm.controls.descripcion.value, 
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }

      const actualizar = await this.servicio.updateTipoMotor( item );

      if ( actualizar ){
        this.isVisible = false;
        this.uiService.createMessage('update');
        await this.getListTipoMotores();
        this.camposForm( '', null );
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

  async deleteTipoMotor( item ){

    
    const confirmation = await this.uiService.showDeleteConfirm('Estas seguro de eliminar este Tipo de Motor?');

    if( confirmation )
    {
      this.spinner.show();
      const eliminar = await this.servicio.deleteTipoMotor( item.Id );
      if( eliminar ){
        this.uiService.createMessage('delete');
        await this.getListTipoMotores();
      } else {
        this.uiService.createMessage('error');
      }
    }

    this.spinner.hide();
  }

  camposForm( Descripcion, Estado ){
    this.validateForm = this.fb.group({
      descripcion: [ Descripcion, [Validators.required ]],
      estado: [ Estado , [Validators.required ]]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.update = false;
    this.camposForm( '', null );
  }

}
