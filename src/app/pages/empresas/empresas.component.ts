import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresasService } from '../../services/empresas/empresas.service';
import { Empresas } from '../../models/Empresas';
import { UiServiceService } from '../../services/ui-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: Empresas;
  isVisible = false;
  validateForm: FormGroup;
  update: boolean = false;
  idEmpresa;
  
  constructor(public servicioEmpresas: EmpresasService, private fb: FormBuilder, public uiService: UiServiceService,
    private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.getListEmpresas();
    this.camposForm( '', null );
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

  async saveNewEmpresa() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const empresa: Empresas = {
        Nombre: this.validateForm.controls.nombre.value,
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }
      console.log( empresa );
      const crear = await this.servicioEmpresas.createEmpresas( empresa );

      if ( crear ){
        this.isVisible = false;
        this.uiService.createMessage('create');
        await this.getListEmpresas();
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


  camposForm( Nombre, Estado ){
    this.validateForm = this.fb.group({
      nombre: [ Nombre, [Validators.required ]],
      estado: [ Estado, [Validators.required ]],
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

  selectEmpresa( item: Empresas ){

    this.isVisible = true;
    this.update = true;
    this.camposForm( item.Nombre, String( item.Estado ) );
    this.idEmpresa = item.Id;
  }

  async updateEmpresa(){

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const empresa: Empresas = {
        Id: this.idEmpresa,
        Nombre: this.validateForm.controls.nombre.value,
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }
      console.log( empresa );
      const actualizar = await this.servicioEmpresas.updateEmpresas( empresa );

      if ( actualizar ){
        this.isVisible = false;
        this.uiService.createMessage('update');
        await this.getListEmpresas();
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

  async deleteEmpresa( item ){

    
    const confirmation = await this.uiService.showDeleteConfirm('Estas seguro de eliminar esta Empresa?');

    if( confirmation )
    {
      this.spinner.show();
      const eliminar = await this.servicioEmpresas.deleteEmpresas( item.Id );
      if( eliminar ){
        this.uiService.createMessage('delete');
        await this.getListEmpresas();
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
    this.camposForm( '', null );
  }

}
