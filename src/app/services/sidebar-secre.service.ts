import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarSecreService {
  menu: any[] = [
    {
      titulo: 'Tramite Interno',
      icono: 'mdi mdi-file-multiple',
      submenu: [
        { titulo: 'Generar Tramite Interno', url: 'tramite-interno' },
        { titulo: 'Derivacion Tramite Interno', url: 'derivacion-interno' },
        { titulo: 'Seguimiento Tramite Interno', url: 'seguimiento-interno' },
      ]
    },
    {
      titulo: 'Tramite Externo',
      icono: 'mdi mdi-file-multiple',
      submenu: [
        { titulo: 'Generar Tramite Interno', url: 'tramite-externo' },
      ]
    },
  ];
  constructor() { }
}
