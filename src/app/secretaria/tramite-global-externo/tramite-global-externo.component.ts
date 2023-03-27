import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loadData } from 'src/app/alerts/loadData';
import { ResultRutaExternas, RutaExterna } from 'src/app/interface/ruta.externa';
import { ResultSeguimientoExternos, SeguimientoExterno } from 'src/app/interface/seguimiento.externo';
import { RutaExternaService } from 'src/app/services/ruta-externa.service';
import { SerguimientoExternoService } from 'src/app/services/serguimiento-externo.service';
import { closeAlert } from '../../alerts/loadData';

@Component({
  selector: 'app-tramite-global-externo',
  templateUrl: './tramite-global-externo.component.html',
  styleUrls: ['./tramite-global-externo.component.css']
})
export class TramiteGlobalExternoComponent implements OnInit {

  listTramite?:RutaExterna[];
  listSeguimiento?:SeguimientoExterno[];
  formSeguimiento:FormGroup;
  busca:string='';
  p: number = 1;
  filterPost='';
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
    this.rutaExterna.getTramiteExternoGeneral(this.busca).subscribe(
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
      loadData('Cargando Datos','Porfavor Espere .....');
      this.rutaExterna.getTramiteExternoGeneral(valor).subscribe(
        (data:ResultRutaExternas)=>{
          this.listTramite = data.rutaExterna;
          closeAlert();
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
      proveido:'',
      asunto:'',
      observacion:'',
      fecha:'',
      hora:'',
      folio:''
    })
  }

}
