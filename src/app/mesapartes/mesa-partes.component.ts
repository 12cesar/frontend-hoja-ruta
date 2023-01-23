import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mesa-partes',
  templateUrl: './mesa-partes.component.html',
  styleUrls: ['./mesa-partes.component.css']
})
export class MesaPartesComponent implements OnInit {

  ngOnInit(): void {
    this.cargar();
  }
  cargar(){
    if (sessionStorage.getItem('carga')==='0') {
      location.reload();
      sessionStorage.setItem('carga','1');
      //this.desconectarWs();
    }
  }
}
