import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResultRutaExternas, RutaExterna } from 'src/app/interface/ruta.externa';
import { ResultSeguimientoExternos, SeguimientoExterno } from 'src/app/interface/seguimiento.externo';
import { RutaExternaService } from 'src/app/services/ruta-externa.service';
import { SerguimientoExternoService } from 'src/app/services/serguimiento-externo.service';

@Component({
  selector: 'app-seguimiento-externo',
  templateUrl: './seguimiento-externo.component.html',
  styleUrls: ['./seguimiento-externo.component.css']
})
export class SeguimientoExternoComponent implements OnInit {

  listTramite?:RutaExterna[];
  listSeguimiento?:SeguimientoExterno[];
  formSeguimiento:FormGroup;
  constructor(
    private rutaExterna:RutaExternaService,
    private seguimientoExterno:SerguimientoExternoService,
    private fb:FormBuilder
  ) { 
    this.formSeguimiento= this.fb.group({
      codigo_tramite:{value:'',disabled:true},
      proveido:{value:'',disabled:true},
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
    this.rutaExterna.getTramiteDerivado().subscribe(
      (data:ResultRutaExternas)=>{
        this.listTramite = data.rutaExterna;
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  obetenerDatos(
    codigo_tramite:string,
    proveido:number,
    asunto:string,
    observacion:any,
    fecha:string,
    hora:string,
    folio:string
  ){
    const fechaNu = `${fecha} - ${hora}`
    this.formSeguimiento.setValue({
      codigo_tramite,
      proveido:String(proveido),
      asunto,
      observacion,
      fecha:fechaNu,
      hora,
      folio
    });
    this.seguimientoExterno.getSeguimiento(codigo_tramite).subscribe(
      (data:ResultSeguimientoExternos)=>{
        console.log(data);
        
        this.listSeguimiento = data.seguimiento;
        console.log(this.listSeguimiento);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  cancelar(){
    this.formSeguimiento.setValue({
      codigo_tramite:'',
      proveido:'',
      asunto:'',
      observacion:'',
      fecha:'',
      hora:'',
      folio:''
    })
  }
}
