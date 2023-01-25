import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { loadData } from 'src/app/alerts/loadData';
import { Area, ResultAreas } from 'src/app/interface/area';
import { EnvioTramiteExterno } from 'src/app/interface/envio-tramite-interno';
import { Prioridad, ResultPrioridades } from 'src/app/interface/prioridad';
import { ResultRutaExterna } from 'src/app/interface/ruta.externa';
import { ResultTramiteExterno, ResultTramiteExternos, TramiteExterno } from 'src/app/interface/tramite.externo';
import { AreaService } from 'src/app/services/area.service';
import { PrioridadService } from 'src/app/services/prioridad.service';
import { RutaExternaService } from 'src/app/services/ruta-externa.service';
import { TramiteExternoService } from 'src/app/services/tramite-externo.service';
import { ValidarSunatService } from 'src/app/services/validar-sunat.service';
import Swal from 'sweetalert2';
import { closeAlert } from '../../alerts/loadData';
import { ResultValidarSunat } from 'src/app/interface/validar.sunat';

@Component({
  selector: 'app-tramite-externo',
  templateUrl: './tramite-externo.component.html',
  styleUrls: ['./tramite-externo.component.css']
})
export class TramiteExternoComponent implements OnInit {

  listTramiteExterno?: TramiteExterno[];
  listPrioridad?: Prioridad[];
  listArea: Area[]=[];
  tramiteForm: FormGroup;
  rutaForm: FormGroup;
  ids?: string;
  dropdownSettingsUni:IDropdownSettings = {};
  dropdownSettings:IDropdownSettings = {};
  busca:string='';
  dropdownList =[{}];
  dropDownListUni=[{}];
  codigo:string='';
  validar={
    dni:'',
    ciudadano:''
  };
  p: number = 1;
  constructor(
    private fb: FormBuilder,
    private tramiteExterService: TramiteExternoService,
    private prioridadService: PrioridadService,
    private areaService: AreaService,
    private rutaService:RutaExternaService,
    private validarSunat:ValidarSunatService,
    private toastr:ToastrService
  ) {
    this.tramiteForm = this.fb.group({
      proveido:[Number,Validators.required],
      asunto: ['', Validators.required],
      observacion: [''],
      folio: [Number, Validators.required],
      prioridad: ['', Validators.required],

    });
    this.rutaForm = this.fb.group({
      destinoUno: [[]],
      destinoDos: [[]],
      cantidad: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.mostrarTramite();
    this.mostrarPrioridad();
    this.mostrarAreas();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsUni={
      singleSelection: true,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: false
    }
  }
  validarDni(){

    const dni = this.validar.dni;
    console.log(Number(dni));

    if (Number(dni) && dni.length===8) {
      loadData('Validando Datos','Porfavor Espere .....')
      const formData = new FormData();
      formData.append('dni',dni);
      this.validarSunat.postValidarSunat(formData).subscribe(
        (data:ResultValidarSunat)=>{

          this.validar.ciudadano = `${data.datos.nombre} ${data.datos.apellido}`;
          closeAlert();
        },(error)=>{
          console.log(error);

        }
      )

    }else{

      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Ingrese un dni valido',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  mostrarTramite() {
    this.tramiteExterService.getTramiteExternos(this.busca).subscribe(
      (data: ResultTramiteExternos) => {
        console.log(data);

        this.listTramiteExterno = data.tramiteExterno;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mostrarPrioridad() {
    this.prioridadService.getPrioridades('1').subscribe(
      (data: ResultPrioridades) => {
        this.listPrioridad = data.prioridad;
      },
      (error) => {
        console.log(error);

      }
    )
  }
  mostrarAreas() {
    this.areaService.getAreasSin().subscribe(
      (data: ResultAreas) => {
        this.listArea = data.area;

        for (let i = 0; i < this.listArea.length; i++) {
          const obj={item_id:this.listArea[i].id,item_text:this.listArea[i].nombre}
          this.dropdownList.push(obj);
        }
        for (let i = 0; i < this.listArea.length; i++) {
          const obj={item_id:this.listArea[i].id,item_text:this.listArea[i].nombre}
          this.dropDownListUni.push(obj);

        }
      },
      (error) => {
        console.log(error);

      }
    )
  }
  crearRuta(){
    const cantidad = this.rutaForm.get('cantidad')?.value;
    const destinoUno = this.rutaForm.get('destinoUno')?.value;
    const destinoDos = this.rutaForm.get('destinoDos')?.value;
    if (cantidad==='1' && destinoUno.length>=1) {
      console.log(destinoUno);
      const envio:EnvioTramiteExterno={
        cantidad,
        codigo:this.codigo,
        id_destino:destinoUno
      }
      this.rutaService.postRutaExterna(envio).subscribe(
        (data)=>{
          console.log(data);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.msg,
            showConfirmButton: false,
            timer: 1500
          })
        },
        (error)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.error.msg,
            showConfirmButton: false,
            timer: 1500
          })

        }
      )

    }else if (cantidad==='2' && destinoDos.length>=1) {
      const envio:EnvioTramiteExterno={
        cantidad,
        codigo:this.codigo,
        id_destino:destinoDos
      }
      this.rutaService.postRutaExterna(envio).subscribe(
        (data)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.msg,
            showConfirmButton: false,
            timer: 1500
          })

        },
        (error)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.error.msg,
            showConfirmButton: false,
            timer: 1500
          })
        }
      )

    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Seleccione un destino',
        showConfirmButton: false,
        timer: 1500
      })

    }
  }
  agregarCodigo(cod:string){
    console.log(cod);
    this.codigo = cod;
    this.rutaService.getRutaExterna(this.codigo).subscribe(
      (data:ResultRutaExterna)=>{
        if ( String(data.rutaExterna.cantidad)=== "1") {
          document.getElementById('seleTwo')?.classList.remove('invi');
          document.getElementById('seleOne')?.classList.add('invi');
          this.rutaForm.setValue({
            destinoUno: data.area,
            destinoDos: [{}],
            cantidad: String(data.rutaExterna.cantidad)
          });
        }
        if (String(data.rutaExterna.cantidad)=== '2') {
          document.getElementById('seleTwo')?.classList.add('invi')
          document.getElementById('seleOne')?.classList.remove('invi');
          this.rutaForm.setValue({
            destinoUno: [{}],
            destinoDos: data.area,
            cantidad: String(data.rutaExterna.cantidad)
          });
        }
        if ( !data.rutaExterna.cantidad) {
          document.getElementById('seleTwo')?.classList.add('invi')
          document.getElementById('seleOne')?.classList.add('invi');
        }

      },
      (error)=>{
        console.log(error);

      }
    )

  }
  verTipoRuta(event:any){
    if (event.target.value !== "" && event.target.value === "1") {
      document.getElementById('seleTwo')?.classList.remove('invi');
      document.getElementById('seleOne')?.classList.add('invi');
    }
    if (event.target.value !== "" && event.target.value=== '2') {
      document.getElementById('seleTwo')?.classList.add('invi')
      document.getElementById('seleOne')?.classList.remove('invi');
    }
    if (event.target.value === "") {
      document.getElementById('seleTwo')?.classList.add('invi')
      document.getElementById('seleOne')?.classList.add('invi');
    }
  }
  crearRditarTramite() {
    if (this.ids === undefined) {
      const formData = new FormData();
      formData.append('proveido', this.tramiteForm.get('proveido')?.value);
      formData.append('asunto', this.tramiteForm.get('asunto')?.value);
      formData.append('observacion', this.tramiteForm.get('observacion')?.value);
      formData.append('folio', this.tramiteForm.get('folio')?.value);
      formData.append('id_prioridad', this.tramiteForm.get('prioridad')?.value);
      formData.append('dni',this.validar.dni);
      formData.append('ciudadano',this.validar.ciudadano);
      this.tramiteExterService.postTramiteExterno(formData).subscribe(
        (data) => {
          this.tramiteForm.setValue({
            asunto: '',
            proveido:Number,
            observacion: '',
            folio: Number,
            prioridad: ''
          })
          this.mostrarTramite();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.msg,
            showConfirmButton: false,
            timer: 1500
          })
        },
        (error) => {
          console.log(error);

        }
      )
    } else {
      console.log('hi');

    }
  }
  buscar(valor:any){

    this.busca = valor;
    if (this.busca.length>=1) {
      this.tramiteExterService.getTramiteExternos(valor).subscribe(
        (data:ResultTramiteExternos)=>{
          this.listTramiteExterno = data.tramiteExterno;
        },(error)=>{
          console.log(error);

        }
      )
    }else{
      this.busca = '';
      this.mostrarTramite();

    }
  }
  cancelar() {
    this.ids = undefined
    this.tramiteForm.setValue({
      asunto: '',
      proveido:Number,
      observacion: '',
      folio: Number,
      prioridad: ''
    });
    this.rutaForm.setValue({
      destinoUno: [],
      destinoDos: [],
      cantidad: ''
    });
    document.getElementById('seleTwo')?.classList.add('invi')
      document.getElementById('seleOne')?.classList.add('invi');
  }
}
