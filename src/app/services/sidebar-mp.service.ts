import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarMpService {
  menu: any[] = [
    {
      titulo: 'Tramite Externo',
      icono: 'mdi mdi-file-import',
      submenu: [
        { titulo: 'Generar Tramite Externo', url: 'tramite-externo' },
        { titulo: 'Derivacion Tramite Interno', url: 'derivacion-externo' },
        { titulo: 'Seguimiento Tramite Interno', url: 'seguimiento-externo' },
      ]
    },
    {
      titulo: 'Derivaciones',
      icono: 'mdi mdi-call-received',
      submenu: [
        { titulo: 'Derivacion Interna', url: 'seguimiento-derivacion-interno' },
        { titulo: 'Derivacion Externa', url: 'seguimiento-derivacion-externo' },
      ]
    },
    {
      titulo: 'Tramite Global',
      icono: 'mdi mdi-file-chart',
      submenu: [
        { titulo: 'Tramite Interno', url: 'seguimiento-global-interno' },
        { titulo: 'Tramite Externa', url: 'seguimiento-global-externo' },
      ]
    },

  ];
  constructor() { }
}
