import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarSecreService {
  menu: any[] = [
    {
      titulo: 'Tramite Interno',
      icono: 'mdi mdi-file-import',
      submenu: [
        { titulo: 'Generar Tramite Interno', url: 'tramite-interno' },
        { titulo: 'Derivacion Tramite Interno', url: 'derivacion-interno' },
        { titulo: 'Seguimiento Tramite Interno', url: 'seguimiento-interno' },
      ]
    },
    {
      titulo: 'Derivaciones',
      icono: 'mdi mdi-call-received',
      submenu: [
        { titulo: 'Derivacion Interna', url: 'seguimiento-derivacion-interno' },
        { titulo: 'Derivacion Externa', url: 'seguimiento-derivacion-externa' },
      ]
    },
    {
      titulo: 'Tramite Global',
      icono: 'mdi mdi-file-chart',
      submenu: [
        { titulo: 'Tramite Interno', url: 'tramite-global-interno' },
        { titulo: 'Tramite Externa', url: 'tramite-global-externo' },
      ]
    },

  ];
  constructor() { }
}
