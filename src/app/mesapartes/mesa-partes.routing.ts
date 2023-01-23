import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MesaPartesComponent } from './mesa-partes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TramiteExternoComponent } from './tramite-externo/tramite-externo.component';
import { DerivacionExternoComponent } from './derivacion-externo/derivacion-externo.component';
import { SeguimientoExternoComponent } from './seguimiento-externo/seguimiento-externo.component';
import { SeguimientoExternoGlobalComponent } from './seguimiento-externo-global/seguimiento-externo-global.component';
import { SeguimientoInternoGlobalComponent } from './seguimiento-interno-global/seguimiento-interno-global.component';
import { SeguimientoDerivacionInternoComponent } from './seguimiento-derivacion-interno/seguimiento-derivacion-interno.component';
import { SeguimientoDerivacionExternoComponent } from './seguimiento-derivacion-externo/seguimiento-derivacion-externo.component';
import { MpGuard } from '../guard/mp.guard';

const routes: Routes = [
  { path: 'mesa-de-partes',
    component: MesaPartesComponent,
    children:[
      {path:'', component:DashboardComponent},
      {path:'tramite-externo', component:TramiteExternoComponent},
      {path:'derivacion-externo', component:DerivacionExternoComponent},
      {path:'seguimiento-externo', component:SeguimientoExternoComponent},
      {path:'seguimiento-global-externo', component:SeguimientoExternoGlobalComponent},
      {path:'seguimiento-global-interno', component:SeguimientoInternoGlobalComponent},
      {path:'seguimiento-derivacion-interno', component:SeguimientoDerivacionInternoComponent},
      {path:'seguimiento-derivacion-externo', component:SeguimientoDerivacionExternoComponent},
    ],
    canActivateChild:[
      MpGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesaPartesRoutingModule {}
