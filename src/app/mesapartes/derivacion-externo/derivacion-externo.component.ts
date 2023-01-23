import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Accione, ResultAcciones } from 'src/app/interface/accion';
import { AccionService } from 'src/app/services/accion.service';
import { RutaExternaService } from 'src/app/services/ruta-externa.service';
import Swal from 'sweetalert2';
import { RutaExterna, ResultRutaExternas } from '../../interface/ruta.externa';
import { DerivacionExternaService } from '../../services/derivacion-externa.service';

@Component({
  selector: 'app-derivacion-externo',
  templateUrl: './derivacion-externo.component.html',
  styleUrls: ['./derivacion-externo.component.css']
})
export class DerivacionExternoComponent implements OnInit {

  listRuta?: RutaExterna[];
  listAcciones?:Accione[];
  rutaForm={
    codigo:'',
    destino:''
  }
  derivacionForm:FormGroup;
  constructor(
    private rutaExternaService: RutaExternaService,
    private accionService:AccionService,
    private derivarService:DerivacionExternaService,
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
    this.rutaExternaService.getRutaExternas().subscribe(
      (data: ResultRutaExternas) => {
        this.listRuta = data.rutaExterna;
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
