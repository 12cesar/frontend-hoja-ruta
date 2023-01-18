import { Component, OnInit } from '@angular/core';
import { ResultRutaInternas, RutaInterna } from 'src/app/interface/ruta.interna';
import { RutaInternaService } from 'src/app/services/ruta-interna.service';

@Component({
  selector: 'app-derivacion-interno',
  templateUrl: './derivacion-interno.component.html',
  styleUrls: ['./derivacion-interno.component.css']
})
export class DerivacionInternoComponent implements OnInit {
  listRuta?:RutaInterna[];
  
  constructor(private rutaInternaService:RutaInternaService) { }

  ngOnInit(): void {
    this.mostrarRutas();
  }
  mostrarRutas(){
    this.rutaInternaService.getRutaInternas().subscribe(
      (data:ResultRutaInternas)=>{
        
        this.listRuta = data.rutaInterna;
        console.log(this.listRuta);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
}
