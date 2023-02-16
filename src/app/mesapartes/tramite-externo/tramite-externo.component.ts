import { apiHojaRuta } from './../../api/apiHojaRuta';
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
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { ResultTipoDocumento, TipoDoc } from 'src/app/interface/tipo.documento';

@Component({
  selector: 'app-tramite-externo',
  templateUrl: './tramite-externo.component.html',
  styleUrls: ['./tramite-externo.component.css']
})
export class TramiteExternoComponent implements OnInit {

  listTramiteExterno: TramiteExterno[] = [];
  listPrioridad?: Prioridad[];
  listArea: Area[]=[];
  listTipoDoc:TipoDoc[]=[];
  tramiteForm: FormGroup;
  rutaForm: FormGroup;
  ids?: string;
  dropdownSettingsUni:IDropdownSettings = {};
  dropdownSettings:IDropdownSettings = {};
  busca:string='';
  dropdownList =[{}];
  dropDownListUni=[{}];
  codigo:string='';
  api=`${apiHojaRuta}/pdfcreator/externo`;
  validar={
    dni:'',
    ciudadano:''
  };
  p: number = 1;
  title='Crear Tramite';
  constructor(
    private fb: FormBuilder,
    private tramiteExterService: TramiteExternoService,
    private prioridadService: PrioridadService,
    private areaService: AreaService,
    private rutaService:RutaExternaService,
    private validarSunat:ValidarSunatService,
    private toastr:ToastrService,
    private tipoDocumentoService:TipoDocumentoService
  ) {
    this.tramiteForm = this.fb.group({
      proveido:[Number,Validators.required],
      asunto: ['', Validators.required],
      observacion: [''],
      folio: [Number, Validators.required],
      prioridad: ['', Validators.required],
      tipo_documento:['',Validators.required],
      nom_documento:['',Validators.required]

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
    this.mostrarTipoDocumento();

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
  mostrarTipoDocumento(){
    this.tipoDocumentoService.getTipoDocumento().subscribe(
      (data:ResultTipoDocumento)=>{
        console.log(data);
        this.listTipoDoc = data.tipoDoc;
      },
      (error)=>{
        console.log(error);
        
      }
    )
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
  obtenerDatos(cod:string){
    this.ids = cod;
    this.title= 'Actualizar Tramite';
    this.tramiteExterService.getTramiteExterno(this.ids).subscribe(
      (data:ResultTramiteExterno)=>{
        console.log(data);
        this.tramiteForm.setValue({
          asunto: data.tramiteExterno.asunto,
          observacion: data.tramiteExterno.observacion,
          folio: data.tramiteExterno.folio,
          prioridad: data.tramiteExterno.id_prioridad
        });
      },
      (error)=>{
        console.log(error);
        
      }
    )
    
  }
  crearRditarTramite() {
    if (this.ids === undefined) {
      const formData = new FormData();
      formData.append('proveido', this.tramiteForm.get('proveido')?.value);
      formData.append('asunto', this.tramiteForm.get('asunto')?.value);
      formData.append('observacion', this.tramiteForm.get('observacion')?.value);
      formData.append('folio', this.tramiteForm.get('folio')?.value);
      formData.append('id_prioridad', this.tramiteForm.get('prioridad')?.value);
      formData.append('tipo_documento', this.tramiteForm.get('tipo_documento')?.value);
      formData.append('nom_documento', this.tramiteForm.get('nom_documento')?.value);
      this.tramiteExterService.postTramiteExterno(formData).subscribe(
        (data) => {
          this.tramiteForm.setValue({
            asunto: '',
            proveido:Number,
            observacion: '',
            folio: Number,
            prioridad: '',
            tipo_documento:'',
            nom_documento:''
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
      const formData = new FormData();
      formData.append('proveido', this.tramiteForm.get('proveido')?.value);
      formData.append('asunto', this.tramiteForm.get('asunto')?.value);
      formData.append('observacion', this.tramiteForm.get('observacion')?.value);
      formData.append('folio', this.tramiteForm.get('folio')?.value);
      formData.append('id_prioridad', this.tramiteForm.get('prioridad')?.value);
      formData.append('tipo_documento', this.tramiteForm.get('tipo_documento')?.value);
      formData.append('nom_documento', this.tramiteForm.get('nom_documento')?.value);
      this.tramiteExterService.putTramiteExterno(formData, this.ids).subscribe(
        (data) => {
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

    }
  }
  buscar(valor:any){

    this.busca = valor;
    console.log(this.busca);
    
    if (this.busca.length>=1) {
      this.mostrarTramite();
    }else{
      this.busca = '';
      this.mostrarTramite();

    }
  }
  cancelar() {
    this.validar={
      ciudadano:'',
      dni:''
    }
    this.ids = undefined
    this.title ='Crear Tramite'
    this.tramiteForm.setValue({
      asunto: '',
      proveido:Number,
      observacion: '',
      folio: Number,
      prioridad: '',
      tipo_documento:'',
      nom_documento:''
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
