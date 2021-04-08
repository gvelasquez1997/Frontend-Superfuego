import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { WelcomeComponent } from './pages/welcome/welcome.component';
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
import { TipoMotorComponent } from './pages/tipo-motor/tipo-motor.component';
import { SetpointComponent } from './pages/setpoint/setpoint.component';
import { DatosHistoricosComponent } from './pages/reportes/datos-historicos/datos-historicos.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: 'grupo-usuarios', component: GrupoUsuarioComponent },
      { path: 'empresas', component: EmpresasComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'sitios', component: SitiosComponent },
      { path: 'cuarto-bombas', component: CuartoBombasComponent },
      { path: 'unidades', component: UnidadesComponent },
      { path: 'senales', component: SenalesComponent },
      { path: 'tanques-agua', component: TanquesAguaComponent },
      { path: 'inicio', component: InicioComponent },
      { path: 'en-vivo', component: EnVivoComponent },
      { path: 'tipo-motor', component: TipoMotorComponent },
      { path: 'setpoint', component: SetpointComponent },
      { path: 'datosHistoricos', component: DatosHistoricosComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
