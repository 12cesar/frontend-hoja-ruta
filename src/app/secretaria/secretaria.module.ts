import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteInternoComponent } from './tramite-interno/tramite-interno.component';
import { TramiteExternoComponent } from './tramite-externo/tramite-externo.component';
import { SeguimientoInternoComponent } from './seguimiento-interno/seguimiento-interno.component';
import { DerivacionInternoComponent } from './derivacion-interno/derivacion-interno.component';
import { SecretariaComponent } from './secretaria.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import { MaterialModule } from '../material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { SeguimientoDerivacionInternaComponent } from './seguimiento-derivacion-interna/seguimiento-derivacion-interna.component';
import { SeguimientoDerivacionExternaComponent } from './seguimiento-derivacion-externa/seguimiento-derivacion-externa.component';
import { TramiteGlobalInternoComponent } from './tramite-global-interno/tramite-global-interno.component';
import { TramiteGlobalExternoComponent } from './tramite-global-externo/tramite-global-externo.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    TramiteInternoComponent,
    TramiteExternoComponent,
    SeguimientoInternoComponent,
    DerivacionInternoComponent,
    SecretariaComponent,
    DashboardComponent,
    SeguimientoDerivacionInternaComponent,
    SeguimientoDerivacionExternaComponent,
    TramiteGlobalInternoComponent,
    TramiteGlobalExternoComponent
  ],
  exports:[
    TramiteInternoComponent,
    TramiteExternoComponent,
    SeguimientoInternoComponent,
    DerivacionInternoComponent,
    SecretariaComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    MaterialModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatSelectModule,
    ToastrModule.forRoot(),
  ]
})
export class SecretariaModule { }
