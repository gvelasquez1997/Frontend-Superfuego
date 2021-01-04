import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SenialService } from '../../services/senial/senial.service';
import { Senial } from '../../models/Senial';
import { UnidadesService } from '../../services/unidades/unidades.service';
import { Unidad } from '../../models/Unidades';
import { UiServiceService } from '../../services/ui-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-senales',
  templateUrl: './senales.component.html',
  styleUrls: ['./senales.component.css']
})
export class SenalesComponent implements OnInit {

  senials: Senial;
  unidades: Unidad;
  isVisible = false;
  validateForm: FormGroup;
  update: boolean = false;
  idSenial;
  
  constructor( public servicioSenial: SenialService, public servicioUnidades: UnidadesService, private fb: FormBuilder, public uiService: UiServiceService,
    private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.getListUnidades();
    this.getListSenial();
    this.camposForm( null, '', '', '', null, null );
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

  getListUnidades() {
    this.servicioUnidades.getUnidades().subscribe( 
      resp => { 
        //console.log( resp ); 
        this.unidades = resp
      },
      err => {
        alert( err['message'] );
        //console.error( err );
      } 
    );
  }

  async saveNewSenial() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const senial: Senial = {
        UnidadId: Number( this.validateForm.controls.unidadId.value ),
        Descripcion: this.validateForm.controls.descripcion.value,
        Etiqueta: this.validateForm.controls.etiqueta.value,
        Servidor: this.validateForm.controls.servidor.value,
        Fuente: JSON.parse( this.validateForm.controls.fuente.value ),
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }
      console.log( senial );
      const crear = await this.servicioSenial.createSenial( senial );

      if ( crear ){
        this.isVisible = false;
        this.uiService.createMessage('create');
        await this.getListSenial();
        this.camposForm( null, '', '', '', null, null );
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

  camposForm( UnidadId, Descripcion, Etiqueta, Servidor, Fuente, Estado ){
    this.validateForm = this.fb.group({
      unidadId: [ UnidadId, [Validators.required ]],
      descripcion: [ Descripcion, [Validators.required ]],
      etiqueta: [ Etiqueta, [Validators.required ]],
      servidor: [ Servidor, [Validators.required ]],
      fuente: [ Fuente, [Validators.required ]],
      estado: [ Estado , [Validators.required ]]
    });
  }

  selectSenial( item: Senial ){

    this.isVisible = true;
    this.update = true;
    this.camposForm( item.UnidadId, item.Descripcion, item.Etiqueta, item.Servidor, String( item.Fuente ), String( item.Estado ) );
    this.idSenial = item.Id;
  }

  async updateSenial(){

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const senial: Senial = {
        Id: this.idSenial,
        UnidadId: Number( this.validateForm.controls.unidadId.value ),
        Descripcion: this.validateForm.controls.descripcion.value,
        Etiqueta: this.validateForm.controls.etiqueta.value,
        Servidor: this.validateForm.controls.servidor.value,
        Fuente: JSON.parse( this.validateForm.controls.fuente.value ),
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }
      console.log( senial );
      const actualizar = await this.servicioSenial.updateSenial( senial );

      if ( actualizar ){
        this.isVisible = false;
        this.uiService.createMessage('update');
        await this.getListSenial();
        this.camposForm( null, '', '', '', null, null );
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

  async deleteSenial( item ){

    
    const confirmation = await this.uiService.showDeleteConfirm('Estas seguro de eliminar esta Señal?');

    if( confirmation )
    {
      this.spinner.show();
      const eliminar = await this.servicioSenial.deleteSenial( item.Id );
      if( eliminar ){
        this.uiService.createMessage('delete');
        await this.getListSenial();
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
    this.camposForm( null, '', '', '', null, null );
  }

}
