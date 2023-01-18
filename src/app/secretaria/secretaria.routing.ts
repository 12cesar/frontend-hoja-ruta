import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SecretariaComponent } from './secretaria.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TramiteInternoComponent } from './tramite-interno/tramite-interno.component';
import { TramiteExternoComponent } from './tramite-externo/tramite-externo.component';
import { SeguimientoInternoComponent } from './seguimiento-interno/seguimiento-interno.component';
import { DerivacionInternoComponent } from './derivacion-interno/derivacion-interno.component';
import { SecretariaGuard } from '../guard/secretaria.guard';


const routes: Routes = [
    { path: 'secretaria', 
      component: SecretariaComponent,
      children:[
        {path:'', component:DashboardComponent},
        {path:'tramite-interno', component:TramiteInternoComponent},
        {path:'tramite-externo', component:TramiteExternoComponent},
        {path:'seguimiento-interno', component:SeguimientoInternoComponent},
        {path:'derivacion-interno', component:DerivacionInternoComponent},
      ],
      canActivateChild:[
        SecretariaGuard
      ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecretariaRoutingModule {}
