import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NgxSpinnerModule } from 'ngx-spinner';

import { WelcomeComponent } from './pages/welcome/welcome.component';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTagModule } from 'ng-zorro-antd/tag';

// import { NZ_I18N } from 'ng-zorro-antd/i18n';
// import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LoginComponent } from './login/login.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { GrupoUsuarioComponent } from './pages/grupo-usuario/grupo-usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { SitiosComponent } from './pages/sitios/sitios.component';
import { CuartoBombasComponent } from './pages/cuarto-bombas/cuarto-bombas.component';
import { UnidadesComponent } from './pages/unidades/unidades.component';
import { SenalesComponent } from './pages/senales/senales.component';
import { TanquesAguaComponent } from './pages/tanques-agua/tanques-agua.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EnVivoComponent } from './pages/en-vivo/en-vivo.component';
import { SetpointComponent } from './pages/setpoint/setpoint.component';
import { TipoMotorComponent } from './pages/tipo-motor/tipo-motor.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    EmpresasComponent,
    GrupoUsuarioComponent,
    UsuariosComponent,
    SitiosComponent,
    CuartoBombasComponent,
    UnidadesComponent,
    SenalesComponent,
    TanquesAguaComponent,
    InicioComponent,
    EnVivoComponent,
    SetpointComponent,
    TipoMotorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ///////////////////////////
    NzCardModule,
    NzGridModule,
    NzLayoutModule,
    NzAvatarModule,
    NzTableModule,
    NzMenuModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzDrawerModule,
    NzFormModule,
    NzSelectModule,
    NzInputNumberModule,
    NzInputModule,
    NzSwitchModule,
    NzMessageModule,
    NzNotificationModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzEmptyModule,
    NzListModule,
    NzStatisticModule,
    NzDividerModule,
    NzSpinModule,
    NzCalendarModule,
    NzToolTipModule,
    NgxSpinnerModule,
    NzProgressModule,
    NzAlertModule,
    NzTagModule
    //////////////////////////
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
