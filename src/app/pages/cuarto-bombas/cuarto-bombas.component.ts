import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuartoBombasService } from '../../services/cuarto-bombas/cuarto-bombas.service';
import { CuartoBomba } from '../../models/CuartoBomba';
import { SitioService } from '../../services/sitio/sitio.service';
import { Sitio } from '../../models/Sitio';
import { UiServiceService } from '../../services/ui-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cuarto-bombas',
  templateUrl: './cuarto-bombas.component.html',
  styleUrls: ['./cuarto-bombas.component.css']
})
export class CuartoBombasComponent implements OnInit {
  
  cuartoBombas: CuartoBomba;
  sitios: Sitio;
  isVisible = false;
  validateForm: FormGroup;
  update: boolean = false;
  idCuartoBomba;
  
  constructor(public servicioCuartoBombas: CuartoBombasService, public servicioSitios: SitioService, private fb: FormBuilder, public uiService: UiServiceService,
    private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.getListSitios();
    this.getListCuartoBombas();
    this.camposForm( null, '', null );
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

  getListCuartoBombas() {
    this.servicioCuartoBombas.getCuartoBombas().subscribe( 
      resp => { 
        //console.log( resp ); 
        this.cuartoBombas = resp
      },
      err => {
        alert( err['message'] );
        //console.error( err );
      } 
    );
  }

  async saveNewCuartoBomba() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const cuartoBomba: CuartoBomba = {
        SitioId: Number( this.validateForm.controls.sitioId.value ),
        Descripcion: this.validateForm.controls.descripcion.value,
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }
      console.log( cuartoBomba );
      const crear = await this.servicioCuartoBombas.createCuartoBombas( cuartoBomba );

      if ( crear ){
        this.isVisible = false;
        this.uiService.createMessage('create');
        await this.getListCuartoBombas();
        this.camposForm( null, '', null );
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


  camposForm( SitioId, Descripcion, Estado ){
    this.validateForm = this.fb.group({
      sitioId: [ SitioId, [Validators.required ]],
      descripcion: [ Descripcion, [Validators.required ]],
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

  selectCuartoBombas( item: CuartoBomba ){

    this.isVisible = true;
    this.update = true;
    this.camposForm( item.SitioId, item.Descripcion, String( item.Estado ) );
    this.idCuartoBomba = item.Id;
  }

  async updateCuartoBombas(){

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const cuartoBomba: CuartoBomba = {
        Id: this.idCuartoBomba,
        SitioId: Number( this.validateForm.controls.sitioId.value ),
        Descripcion: this.validateForm.controls.descripcion.value,
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }
      console.log( cuartoBomba );
      const actualizar = await this.servicioCuartoBombas.updateCuartoBombas( cuartoBomba );

      if ( actualizar ){
        this.isVisible = false;
        this.uiService.createMessage('update');
        await this.getListCuartoBombas();
        this.camposForm( null, '', null );
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

  async deleteCuartoBombas( item ){

    
    const confirmation = await this.uiService.showDeleteConfirm('Estas seguro de eliminar este Cuarto de Bombas?');

    if( confirmation )
    {
      this.spinner.show();
      const eliminar = await this.servicioCuartoBombas.deleteCuartoBombas( item.Id );
      if( eliminar ){
        this.uiService.createMessage('delete');
        await this.getListCuartoBombas();
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
    this.camposForm( null, '', null );
  }

}
