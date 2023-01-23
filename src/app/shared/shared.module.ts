import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar-admin/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SidebarSecreComponent } from './sidebar-secre/sidebar-secre.component';
import { RouterModule } from '@angular/router';
import { SidebarMpComponent } from './sidebar-mp/sidebar-mp.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    SidebarSecreComponent,
    SidebarMpComponent
  ],
  exports:[
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    SidebarSecreComponent,
    SidebarMpComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule { }
