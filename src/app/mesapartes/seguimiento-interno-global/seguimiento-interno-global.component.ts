import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResultRutaInternas, RutaInterna } from 'src/app/interface/ruta.interna';
import { ResultSeguimientos, SeguimientoInterno } from 'src/app/interface/seguimiento';
import { RutaInternaService } from 'src/app/services/ruta-interna.service';
import { SeguimientoInternoService } from 'src/app/services/seguimiento-interno.service';

@Component({
  selector: 'app-seguimiento-interno-global',
  templateUrl: './seguimiento-interno-global.component.html',
  styleUrls: ['./seguimiento-interno-global.component.css']
})
export class SeguimientoInternoGlobalComponent implements OnInit {
  listTramite?:RutaInterna[];
  listSeguimiento?:SeguimientoInterno[];
  formSeguimiento:FormGroup;
  busca:string='';
  p: number = 1;
  constructor(
    private rutaInterna:RutaInternaService,
    private seguimientoInterno:SeguimientoInternoService,
    private fb:FormBuilder
  ) {
    this.formSeguimiento= this.fb.group({
      codigo_tramite:{value:'',disabled:true},
      asunto:{value:'',disabled:true},
      observacion:{value:'',disabled:true},
      fecha:{value:'',disabled:true},
      hora:{value:'',disabled:true},
      folio:{value:'',disabled:true}
    })
  }

  ngOnInit(): void {
    this.mostrarTramite()
  }
  mostrarTramite(){
    this.rutaInterna.getTramiteInternoGeneral(this.busca).subscribe(
      (data:ResultRutaInternas)=>{
        this.listTramite = data.rutaInterna;

      },
      (error)=>{
        console.log(error);

      }
    )
  }
  obetenerDatos(
    codigo_tramite:string,
    asunto:string,
    observacion:any,
    fecha:string,
    hora:string,
    folio:string
  ){
    console.log(codigo_tramite,asunto,observacion,fecha,hora);
    const fechaNu = `${fecha} - ${hora}`
    this.formSeguimiento.setValue({
      codigo_tramite,
      asunto,
      observacion,
      fecha:fechaNu,
      hora,
      folio
    });
    this.seguimientoInterno.getSeguimiento(codigo_tramite).subscribe(
      (data:ResultSeguimientos)=>{
        this.listSeguimiento = data.seguimiento;
      },
      (error)=>{
        console.log(error);

      }
    )
  }
  buscar(valor:any){
    console.log(valor);

    this.busca = valor;
    if (this.busca.length>=1) {
      this.rutaInterna.getTramiteInternoGeneral(valor).subscribe(
        (data:ResultRutaInternas)=>{
          this.listTramite = data.rutaInterna;
        },
        (error)=>{
          console.log(error);

        }
      )
    }else{
      this.busca = '';
      this.mostrarTramite();

    }
  }
  cancelar(){
    this.formSeguimiento.setValue({
      codigo_tramite:'',
      asunto:'',
      observacion:'',
      fecha:'',
      hora:'',
      folio:''
    })
  }
}
