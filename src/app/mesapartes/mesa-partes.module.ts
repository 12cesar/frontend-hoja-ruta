import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesaPartesComponent } from './mesa-partes.component';
import { TramiteExternoComponent } from './tramite-externo/tramite-externo.component';
import { DerivacionExternoComponent } from './derivacion-externo/derivacion-externo.component';
import { SeguimientoExternoComponent } from './seguimiento-externo/seguimiento-externo.component';
import { SeguimientoExternoGlobalComponent } from './seguimiento-externo-global/seguimiento-externo-global.component';
import { SeguimientoInternoGlobalComponent } from './seguimiento-interno-global/seguimiento-interno-global.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SeguimientoDerivacionInternoComponent } from './seguimiento-derivacion-interno/seguimiento-derivacion-interno.component';
import { SeguimientoDerivacionExternoComponent } from './seguimiento-derivacion-externo/seguimiento-derivacion-externo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    MesaPartesComponent,
    TramiteExternoComponent,
    DerivacionExternoComponent,
    SeguimientoExternoComponent,
    SeguimientoExternoGlobalComponent,
    SeguimientoInternoGlobalComponent,
    DashboardComponent,
    SeguimientoDerivacionInternoComponent,
    SeguimientoDerivacionExternoComponent
  ],
  exports:[
    MesaPartesComponent,
    TramiteExternoComponent,
    DerivacionExternoComponent,
    SeguimientoExternoComponent,
    SeguimientoExternoGlobalComponent,
    SeguimientoInternoGlobalComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatSelectModule,
    ToastrModule.forRoot(),
  ]
})
export class MesaPartesModule { }
