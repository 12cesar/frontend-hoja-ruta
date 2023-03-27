import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Accione, ResultAcciones } from 'src/app/interface/accion';
import { Area, ResultAreas } from 'src/app/interface/area';
import { DerivacionExterna, ResultDerivacionExterna, ResultDerivacionExternas } from 'src/app/interface/derivacion.externa';
import { Respuesta, ResultRespuestas } from 'src/app/interface/respuesta';
import { ResultSeguimientoExternos, SeguimientoExterno } from 'src/app/interface/seguimiento.externo';
import { AccionService } from 'src/app/services/accion.service';
import { AreaService } from 'src/app/services/area.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import { SerguimientoExternoService } from 'src/app/services/serguimiento-externo.service';
import Swal from 'sweetalert2';
import { DerivacionExternaService } from '../../services/derivacion-externa.service';

@Component({
  selector: 'app-seguimiento-derivacion-externa',
  templateUrl: './seguimiento-derivacion-externa.component.html',
  styleUrls: ['./seguimiento-derivacion-externa.component.css']
})
export class SeguimientoDerivacionExternaComponent implements OnInit {
  listDerivacion?:DerivacionExterna[];
  listSeguimiento?:SeguimientoExterno[];
  listAcciones?:Accione[];
  listRespuesta?:Respuesta[];
  listArea?:Area[];
  codigoTramite:string='';
  idDerivado:number=0;
  tipoRespuesta?:string;
  dropdownSettings:IDropdownSettings = {};
  dropdownList =[{}];
  dropdownSettingsCopia: IDropdownSettings = {};
  dropDownListCopia = [{}];
  formSeguimiento:FormGroup;
  formRespuesta:FormGroup;
  p: number = 1;
  busca:string='';
  constructor(
    private derivacionService:DerivacionExternaService,
    private seguimientoExterno:SerguimientoExternoService,
    private accionService:AccionService,
    private respuestaService:RespuestaService,
    private areaService:AreaService,
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
    });
    this.formRespuesta = this.fb.group({
      respuesta:['',Validators.required],
      observacion:[''],
      accion:[''],
      destino:[[]],
      destinoDos: [[]],
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
    this.dropdownSettingsCopia = {
      singleSelection: false,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  mostrarDerivacion(){
    this.derivacionService.getDerivaciones(this.busca).subscribe(
      (data:ResultDerivacionExternas)=>{
        this.listDerivacion = data.derivacion;
        console.log(data);

      },
      (error)=>{
        console.log(error);

      }
    )
  }
  mostrarAccion(){
    this.accionService.getAcciones('1').subscribe(
      (data:ResultAcciones)=>{
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
        this.listArea = data.area;
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
    console.log(codigo_tramite,asunto,observacion,fecha,hora);
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

        this.respuestaService.putRespuestaExternoDerivado(formData).subscribe(
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
      this.respuestaService.putRespuestaExternoSinDerivado(formData).subscribe(
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

    }else if (this.tipoRespuesta === '3') {
      if (
        this.idDerivado !== 0 &&
        this.formRespuesta.get('accion')?.value !== '' &&
        this.formRespuesta.get('destinoDos')?.value.length >= 1
      ) {
        const formData = new FormData();
        formData.append('codigo_tramite', this.codigoTramite!);
        formData.append('id_derivacion', String(this.idDerivado));
        formData.append(
          'id_respuesta',
          this.formRespuesta.get('respuesta')?.value
        );
        const mostrar = this.formRespuesta.get('destinoDos')?.value;
        let id_destino = '';
        for (let i = 0; i < mostrar.length; i++) {

            id_destino += mostrar[i].id+`${(mostrar.length-1 === i) ? '':','}`;
        }
        formData.append('id_destino', String(id_destino));
        formData.append('accion', this.formRespuesta.get('accion')?.value);
        formData.append(
          'observacion',
          this.formRespuesta.get('observacion')?.value
        );
        console.log(id_destino);

        this.respuestaService.putRespuestaExternoDerivadoVarios(formData).subscribe(
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
      } else {
        console.log('Selecciona un nuevo tramite');
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Todos los campos son requeridos',
          showConfirmButton: false,
          timer: 1500,
        });
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
  buscar(valor:any){
    console.log(valor);
    this.busca = valor;
    this.mostrarDerivacion();
  }
  verTipoRuta(event:any){
    this.tipoRespuesta = event.target.value;
    if (event.target.value !== '' && event.target.value === '1') {
      document.getElementById('selectOne')?.classList.remove('invi');
      document.getElementById('selectTwo')?.classList.add('invi');
    }
    if (event.target.value !== '' && event.target.value === '2') {
      document.getElementById('selectOne')?.classList.add('invi');
      document.getElementById('selectTwo')?.classList.add('invi');
    }
    if (event.target.value !== '' && event.target.value === '3') {
      document.getElementById('selectTwo')?.classList.remove('invi');
      document.getElementById('selectOne')?.classList.add('invi');
    }
    if (event.target.value === '') {
      document.getElementById('selectOne')?.classList.add('invi');
      document.getElementById('selectTwo')?.classList.add('invi');
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
      confirmButtonText: 'Si, recepcionar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.seguimientoExterno.putSeguimientoExterno(id).subscribe(
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
      proveido:'',
      asunto:'',
      observacion:'',
      fecha:'',
      hora:'',
      folio:''
    });
    this.formRespuesta = this.fb.group({
      respuesta:'',
      observacion:'',
      accion:'',
      destino:[[]],
      destinoDos: [[]],
    });
    this.tipoRespuesta="";
    document.getElementById('selectOne')?.classList.add('invi');
    document.getElementById('selectTwo')?.classList.add('invi');
  }

}
