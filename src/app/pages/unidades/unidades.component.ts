import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnidadesService } from '../../services/unidades/unidades.service';
import { Unidad } from '../../models/Unidades';
import { CuartoBombasService } from '../../services/cuarto-bombas/cuarto-bombas.service';
import { CuartoBomba } from '../../models/CuartoBomba';
import { UiServiceService } from '../../services/ui-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TipoMotorService } from '../../services/tipo-motor/tipo-motor.service';
import { TipoMotor } from '../../models/Tipo-Motor';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  cuartoBombas: CuartoBomba;
  unidades: Unidad;
  tiposMotores: TipoMotor;
  isVisible = false;
  validateForm: FormGroup;
  update: boolean = false;
  idUnidad;
  
  constructor( public servicio: TipoMotorService, public servicioCuartoBombas: CuartoBombasService, public servicioUnidades: UnidadesService, private fb: FormBuilder, public uiService: UiServiceService,
    private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.getListUnidades();
    this.getListCuartoBombas();
    this.getListTipoMotores();
    this.camposForm( null, null, '', '', '', '', '', '', null );
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

  async saveNewUnidades() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const unidad: Unidad = {
        CuartoBombaId: Number( this.validateForm.controls.cuartoBombaId.value ),
        TipoMotorId: Number( this.validateForm.controls.tipoMotorId.value ),
        Marca: this.validateForm.controls.marca.value,
        Modelo: this.validateForm.controls.modelo.value,
        GMP: Number( this.validateForm.controls.gmp.value ),
        PSI: Number( this.validateForm.controls.psi.value ),
        HP: Number( this.validateForm.controls.hp.value ),
        RPM: Number( this.validateForm.controls.rpm.value ),
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }
      console.log( unidad );
      const crear = await this.servicioUnidades.createUnidades( unidad );

      if ( crear ){
        this.isVisible = false;
        this.uiService.createMessage('create');
        await this.getListUnidades();
        this.camposForm( null, null, '', '', '', '', '', '', null );
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

  camposForm( CuartoBombaId, TipoMotorId, Marca, Modelo, GMP, PSI, HP, RPM, Estado ){
    this.validateForm = this.fb.group({
      cuartoBombaId: [ CuartoBombaId, [Validators.required ]],
      tipoMotorId: [ TipoMotorId, [Validators.required ]],
      marca: [ Marca, [Validators.required ]],
      modelo: [ Modelo, [Validators.required ]],
      gmp: [ GMP, [Validators.required ]],
      psi: [ PSI, [Validators.required ]],
      hp: [ HP, [Validators.required ]],
      rpm: [ RPM, [Validators.required ]],
      estado: [ Estado , [Validators.required ]]
    });
  }

  selectUnidad( item: Unidad ){

    this.isVisible = true;
    this.update = true;
    this.camposForm( item.CuartoBombaId, item.TipoMotorId, item.Marca, item.Modelo, item.GMP, item.PSI, item.HP, item.RPM, String( item.Estado ) );
    this.idUnidad = item.Id;
  }

  async updateUnidad(){

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      const unidad: Unidad = {
        Id: this.idUnidad,
        CuartoBombaId: Number( this.validateForm.controls.cuartoBombaId.value ),
        TipoMotorId: Number( this.validateForm.controls.tipoMotorId.value ),
        Marca: this.validateForm.controls.marca.value,
        Modelo: this.validateForm.controls.modelo.value,
        GMP: Number( this.validateForm.controls.gmp.value ),
        PSI: Number( this.validateForm.controls.psi.value ),
        HP: Number( this.validateForm.controls.hp.value ),
        RPM: Number( this.validateForm.controls.rpm.value ),
        Estado: JSON.parse( this.validateForm.controls.estado.value )
      }
      console.log( unidad );
      const actualizar = await this.servicioUnidades.updateUnidades( unidad );

      if ( actualizar ){
        this.isVisible = false;
        this.uiService.createMessage('update');
        await this.getListUnidades();
        this.camposForm( null, null, '', '', '', '', '', '', null );
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

  async deleteUnidad( item ){

    
    const confirmation = await this.uiService.showDeleteConfirm('Estas seguro de eliminar esta Unidad?');

    if( confirmation )
    {
      this.spinner.show();
      const eliminar = await this.servicioUnidades.deleteUnidades( item.Id );
      if( eliminar ){
        this.uiService.createMessage('delete');
        await this.getListUnidades();
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
    this.camposForm( null, null, '', '', '', '', '', '', null );
  }

}
