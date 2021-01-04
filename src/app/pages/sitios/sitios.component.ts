import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SitioService } from '../../services/sitio/sitio.service';
import { Sitio } from '../../models/Sitio';
import { EmpresasService } from '../../services/empresas/empresas.service';
import { Empresas } from '../../models/Empresas';
import { UiServiceService } from '../../services/ui-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sitios',
  templateUrl: './sitios.component.html',
  styleUrls: ['./sitios.component.css']
})
export class SitiosComponent implements OnInit {
  
  empresas: Empresas;
  sitios: Sitio;
  isVisible = false;
  validateForm: FormGroup;
  update: boolean = false;
  idSitio;
  
  constructor(public servicioEmpresas: EmpresasService, public servicioSitios: SitioService, private fb: FormBuilder, public uiService: UiServiceService,
    private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.getListSitios();
    this.getListEmpresas();
    this.camposForm( '', '', '', '', '', null, null );
  }

  getListSitios() {
    this.servicioSitios.getSitios().subscribe( 
      resp => { 
        //console.log( resp ); 
        this.sitios = resp
      },
      err => {
        alert( err['message'] );
        //console.error( err );
      } 
    );
  }

  getListEmpresas() {
    this.servicioEmpresas.getEmpresas().subscribe( 
      resp => { 
        //console.log( resp ); 
        this.empresas = resp
      },
      err => {
        alert( err['message'] );
        //console.error( err );
      } 
    );
  }

  async saveNewSitio() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const sitio: Sitio = {
        Descripcion: this.validateForm.controls.descripcion.value ,
        Direccion: this.validateForm.controls.direccion.value,
        Latitud: Number( this.validateForm.controls.latitud.value ),
        Longitud: Number( this.validateForm.controls.longitud.value ),
        Altura: Number( this.validateForm.controls.altura.value ),
        Estado: JSON.parse( this.validateForm.controls.estado.value ),
        EmpresaId: Number( this.validateForm.controls.empresaId.value )
      }
      console.log( sitio );
      const crear = await this.servicioSitios.createSitios( sitio );

      if ( crear ){
        this.isVisible = false;
        this.uiService.createMessage('create');
        await this.getListSitios();
        this.camposForm( '', '', '', '', '', null, null );
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


  camposForm( Descripcion, Direccion, Latitud, Longitud, Altura, Estado, EmpresaId ){
    this.validateForm = this.fb.group({
      descripcion: [ Descripcion, [Validators.required ]],
      direccion: [ Direccion, [Validators.required ]],
      latitud: [ Latitud, [Validators.required ]],
      longitud: [ Longitud, [Validators.required ]],
      altura: [ Altura, [Validators.required ]],
      estado: [ Estado, [Validators.required ]],
      empresaId: [ EmpresaId, [Validators.required ]],
    });
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

  selectSitio( item: Sitio ){

    this.isVisible = true;
    this.update = true;
    this.camposForm( item.Descripcion, item.Direccion, item.Latitud, item.Longitud, item.Altura, String( item.Estado ), item.EmpresaId );
    this.idSitio = item.Id;
  }

  async updateSitio(){

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const sitio: Sitio = {
        Id: this.idSitio,
        Descripcion: this.validateForm.controls.descripcion.value ,
        Direccion: this.validateForm.controls.direccion.value,
        Latitud: Number( this.validateForm.controls.latitud.value ),
        Longitud: Number( this.validateForm.controls.longitud.value ),
        Altura: Number( this.validateForm.controls.altura.value ),
        Estado: JSON.parse( this.validateForm.controls.estado.value ),
        EmpresaId: Number( this.validateForm.controls.empresaId.value )
      }
      console.log( sitio );
      const actualizar = await this.servicioSitios.updateSitios( sitio );

      if ( actualizar ){
        this.isVisible = false;
        this.uiService.createMessage('update');
        await this.getListSitios();
        this.camposForm( '', '', '', '', '', null, null );
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

  async deleteSitio( item ){

    
    const confirmation = await this.uiService.showDeleteConfirm('Estas seguro de eliminar este Sitio?');

    if( confirmation )
    {
      this.spinner.show();
      const eliminar = await this.servicioSitios.deleteSitios( item.Id );
      if( eliminar ){
        this.uiService.createMessage('delete');
        await this.getListSitios();
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
    this.camposForm( '', '', '', '', '', null, null );
  }

}
