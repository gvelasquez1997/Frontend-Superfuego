import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor( private message: NzMessageService,
               private modalService: NzModalService ) { }

  createMessage(type: string): void {
    if( type == 'create' ){
      this.message.create('success', `Datos guardados correctamente.`);
    } else if( type == 'update' ){
      this.message.create('success', `Datos actualizados correctamente.`);
    } else if( type == 'campos' ){
      this.message.create('warning', `Favor, llenar los campos obligatorios.`);
    } else if( type == 'error' ){
      this.message.create('error', `Error en el servicio.`);
    } else if( type == 'delete' ){
      this.message.create('success', `Datos eliminados correctamente.`);
    }
  }

  showDeleteConfirm( message ) {
    return new Promise( resolve => {
      this.modalService.confirm({
        nzTitle: message,
        nzContent: '<b style="color: red;">Esta accion es irreversible</b> ',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => { resolve( true ) },
        nzCancelText: 'No',
        nzOnCancel: () => { resolve( false ) }
      });
    });
  }
}
