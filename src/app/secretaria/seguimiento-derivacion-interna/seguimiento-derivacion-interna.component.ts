import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Accione, ResultAcciones } from 'src/app/interface/accion';
import { Derivacion, ResultDerivacionInternas } from 'src/app/interface/derivacion.interna';
import { Respuesta, ResultRespuestas } from 'src/app/interface/respuesta';
import { ResultSeguimientos, SeguimientoInterno } from 'src/app/interface/seguimiento';
import { AccionService } from 'src/app/services/accion.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import { SeguimientoInternoService } from 'src/app/services/seguimiento-interno.service';
import Swal from 'sweetalert2';
import { DerivarInternoService } from '../../services/derivar-interno.service';
import { Area, ResultAreas } from 'src/app/interface/area';
import { AreaService } from 'src/app/services/area.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
  codigoTramite:string='';
  idDerivado:number=0;
  tipoRespuesta?:string;
  dropdownSettings:IDropdownSettings = {};
  dropdownList =[{}];
  formSeguimiento:FormGroup;
  formRespuesta:FormGroup;
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
    });
    this.formRespuesta = this.fb.group({
      respuesta:['',Validators.required],
      observacion:[''],
      accion:[''],
      destino:[[]]
    })
  }

  ngOnInit(): void {
    this.mostrarDerivacion();
    this.mostrarAccion();
    this.mostrarRespuesta();
    this.mostrarArea();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: false
    };
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
      (data:ResultAreas)=>{
        console.log(data);
        this.listArea = data.area;
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
    console.log(this.tipoRespuesta);
    if(this.tipoRespuesta === '1'){
      if (this.idDerivado !==0 && this.formRespuesta.get('accion')?.value !=='' && this.formRespuesta.get('destino')?.value.length>=1 ) {
        const formData = new FormData();
        formData.append('codigo_tramite',this.codigoTramite!);
        formData.append('id_derivacion',String(this.idDerivado));
        formData.append('id_respuesta',this.formRespuesta.get('respuesta')?.value);
        const mostrar = this.formRespuesta.get('destino')?.value;
        let id_destino=0;
        mostrar.map((resp:any)=>{
          id_destino = resp.id
        })
        formData.append('id_destino',String(id_destino));
        formData.append('accion',this.formRespuesta.get('accion')?.value)
        formData.append('observacion',this.formRespuesta.get('observacion')?.value);

        this.respuestaService.putRespuestaInternoDerivado(formData).subscribe(
          (data)=>{
            this.mostrarDerivacion();
            console.log(data);
            this.idDerivado =0;
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Respuesta generado con exito',
              showConfirmButton: false,
              timer: 1500
            })
          },(error)=>{
            console.log(error);

          }
        )
      }else{
        console.log('Selecciona un nuevo tramite');
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Todos los campos son requeridos',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }else if (this.tipoRespuesta === '2') {
      console.log('derivado');
     if (this.idDerivado !==0) {
      const formData = new FormData();
      formData.append('codigo_tramite',this.codigoTramite!);
      formData.append('id_derivacion',String(this.idDerivado));
      formData.append('id_respuesta',this.formRespuesta.get('respuesta')?.value);
      this.respuestaService.putRespuestaInternoSinDerivado(formData).subscribe(
        (data)=>{
          console.log(data);
          this.mostrarDerivacion();
          this.idDerivado=0;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Respuesta generado con exito',
            showConfirmButton: false,
            timer: 1500
          })
        },
        (error)=>{
          console.log(error);

        }
      )
     }else{
      console.log('Selecciona un nuevo tramite');
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Selecciona un nuevo tramite',
        showConfirmButton: false,
        timer: 1500
      })

     }

    }else{
      console.log('error');
    }
  }
  obtenerDatos(codigo:string,id:number){
    this.codigoTramite = codigo;
    this.idDerivado = id;
    console.log(codigo);

  }
  verTipoRuta(event:any){
    this.tipoRespuesta = event.target.value;
    if (event.target.value !== "" && event.target.value === "1") {

      document.getElementById('selectOne')?.classList.remove('invi');
    }
    if (event.target.value !== "" && event.target.value=== '2') {

      document.getElementById('selectOne')?.classList.add('invi');
    }
    if (event.target.value === "") {
      document.getElementById('selectOne')?.classList.add('invi');
    }
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
