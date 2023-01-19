import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Accione, ResultAcciones } from 'src/app/interface/accion';
import { Derivacion, ResultDerivacionInternas } from 'src/app/interface/derivacion.interna';
import { Respuesta, ResultRespuestas } from 'src/app/interface/respuesta';
import { ResultSeguimientos, SeguimientoInterno } from 'src/app/interface/seguimiento';
import { AccionService } from 'src/app/services/accion.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import { SeguimientoInternoService } from 'src/app/services/seguimiento-interno.service';
import Swal from 'sweetalert2';
import { DerivarInternoService } from '../../services/derivar-interno.service';
import { Area } from 'src/app/interface/area';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-seguimiento-derivacion-interna',
  templateUrl: './seguimiento-derivacion-interna.component.html',
  styleUrls: ['./seguimiento-derivacion-interna.component.css']
})
export class SeguimientoDerivacionInternaComponent implements OnInit {

  listDerivacion?:Derivacion[];
  listSeguimiento?:SeguimientoInterno[];
  listAcciones?:Accione[];
  listRespuesta?:Respuesta[];
  listArea?:Area[];
  formSeguimiento:FormGroup;
  constructor(
    private derivacionService:DerivarInternoService,
    private seguimientoInterno:SeguimientoInternoService,
    private accionService:AccionService,
    private respuestaService:RespuestaService,
    private areaService:AreaService,
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
    this.mostrarDerivacion();
    this.mostrarAccion();
    this.mostrarRespuesta();
    this.mostrarArea();
  }
  mostrarDerivacion(){
    this.derivacionService.getDerivaciones().subscribe(
      (data:ResultDerivacionInternas)=>{
        this.listDerivacion = data.derivacion;
        console.log(this.listDerivacion);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  mostrarAccion(){
    this.accionService.getAcciones('1').subscribe(
      (data:ResultAcciones)=>{
        console.log(data);
        this.listAcciones = data.acciones;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  mostrarRespuesta(){
    this.respuestaService.getRespuesta('1').subscribe(
      (data:ResultRespuestas)=>{
        console.log(data);
        this.listRespuesta = data.respuesta;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  mostrarArea(){
    this.areaService.getAreasSin().subscribe(
      (data)=>{
        console.log(data);
        
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
        console.log(this.listSeguimiento);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  responderTramite(){

  }
  verTipoRuta(event:any){

  }
  recepcionar(id:number){
    Swal.fire({
      title: 'Recepcionar?',
      text: "Estas seguro, no se podra revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.seguimientoInterno.putSeguimientoInterno(id).subscribe(
          (data)=>{
            console.log(data);
            Swal.fire(
              'Recepcionado!',
              data.msg,
              'success'
            )
            this.mostrarDerivacion();
          },
          (error)=>{
            console.log(error);
            
          }
        )
      }
    })
    
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
