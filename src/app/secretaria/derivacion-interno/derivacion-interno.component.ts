import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Accione, ResultAcciones } from 'src/app/interface/accion';
import {
  ResultRutaInternas,
  RutaInterna,
} from 'src/app/interface/ruta.interna';
import { AccionService } from 'src/app/services/accion.service';
import { DerivarInternoService } from 'src/app/services/derivar-interno.service';
import { RutaInternaService } from 'src/app/services/ruta-interna.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-derivacion-interno',
  templateUrl: './derivacion-interno.component.html',
  styleUrls: ['./derivacion-interno.component.css'],
})
export class DerivacionInternoComponent implements OnInit {
  listRuta?: RutaInterna[];
  listAcciones?:Accione[];
  rutaForm={
    codigo:'',
    destino:''
  }
  derivacionForm:FormGroup;
  constructor(
    private rutaInternaService: RutaInternaService,
    private accionService:AccionService,
    private derivarService:DerivarInternoService,
    private fb:FormBuilder
  ) {
    this.derivacionForm= this.fb.group({
      observacion:[''],
      accion:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarRutas();
    this.mostrarAcciones();
  }
  mostrarRutas() {
    this.rutaInternaService.getRutaInternas().subscribe(
      (data: ResultRutaInternas) => {
        this.listRuta = data.rutaInterna;
        console.log(this.listRuta);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mostrarAcciones() {
    this.accionService.getAcciones('1').subscribe(
      (data:ResultAcciones)=>{
        this.listAcciones= data.acciones;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  obtenerDatos(codigo:string,destino:string){
    this.rutaForm={
      codigo,
      destino
    }
    console.log(this.rutaForm);
    
  }
  derivar(){
    const formData = new FormData();
    if (this.rutaForm.codigo !== '') {
      formData.append('observacion',this.derivacionForm.get('observacion')?.value);
      formData.append('id_accion',this.derivacionForm.get('accion')?.value);
      formData.append('codigo_tramite',this.rutaForm.codigo);
      formData.append('destino',this.rutaForm.destino);
      this.derivarService.postDerivar(formData).subscribe(
        (data)=>{
          this.mostrarRutas();
          this.rutaForm={
            codigo:'',
            destino:''
          }
           Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.msg,
            showConfirmButton: false,
            timer: 1500
          })
      
        },
        (error)=>{
          console.log(error);
        }
      )
    }else{
      console.log('Cierre y vuelva a seleccionar un tramite');
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Cierre y vuelva a seleccionar un tramite',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  cancelar() {
    this.derivacionForm.setValue({
      observacion:'',
      accion:''
    });
    this.rutaForm={
      codigo:'',
      destino:''
    }
  }
}
