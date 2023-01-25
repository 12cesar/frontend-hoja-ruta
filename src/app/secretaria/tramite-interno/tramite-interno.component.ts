import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area, ResultAreas } from 'src/app/interface/area';
import { Prioridad, ResultPrioridades } from 'src/app/interface/prioridad';
import {
  ResultTramiteInternos,
  ResultTramiteInterno,
  TramiteInterno,
} from 'src/app/interface/tramite.interno';
import { AreaService } from 'src/app/services/area.service';
import { TramiteInternoService } from 'src/app/services/tramite-interno.service';
import { PrioridadService } from '../../services/prioridad.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RutaInternaService } from 'src/app/services/ruta-interna.service';
import { EnvioTramiteInterno } from 'src/app/interface/envio-tramite-interno';
import { ResultRutaInterna } from 'src/app/interface/ruta.interna';
import { closeAlert, loadData } from 'src/app/alerts/loadData';
import { apiHojaRuta } from 'src/app/api/apiHojaRuta';

export interface DropList {
  item_id: number,
  item_text: string
}
@Component({
  selector: 'app-tramite-interno',
  templateUrl: './tramite-interno.component.html',
  styleUrls: ['./tramite-interno.component.css']
})
export class TramiteInternoComponent implements OnInit {
  listTramiteInterno?: TramiteInterno[];
  listPrioridad?: Prioridad[];
  listArea: Area[] = [];
  tramiteForm: FormGroup;
  rutaForm: FormGroup;
  ids?: string;
  busca:string=''
  dropdownSettingsUni: IDropdownSettings = {};
  dropdownSettings: IDropdownSettings = {};
  api=`${apiHojaRuta}/pdfcreator`;
  dropdownList = [{}];
  dropDownListUni = [{}];
  codigo: string = '';
  p: number = 1;
  title='Actualizar Tramite';
  // Select Multiple
  // Fin select multiple
  constructor(
    private fb: FormBuilder,
    private tramiteInterService: TramiteInternoService,
    private prioridadService: PrioridadService,
    private areaService: AreaService,
    private rutaService: RutaInternaService,
    private toastr: ToastrService
  ) {
    this.tramiteForm = this.fb.group({
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
    this.dropdownSettingsUni = {
      singleSelection: true,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: false
    }
  }
  mostrarTramite() {
    this.tramiteInterService.getTramiteInternos(this.busca).subscribe(
      (data: ResultTramiteInternos) => {
        this.listTramiteInterno = data.tramiteInterno;
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
          const obj = { item_id: this.listArea[i].id, item_text: this.listArea[i].nombre }
          this.dropdownList.push(obj);
        }
        for (let i = 0; i < this.listArea.length; i++) {
          const obj = { item_id: this.listArea[i].id, item_text: this.listArea[i].nombre }
          this.dropDownListUni.push(obj);

        }
      },
      (error) => {
        console.log(error);

      }
    )
  }
  crearRuta() {
    const cantidad = this.rutaForm.get('cantidad')?.value;
    const destinoUno = this.rutaForm.get('destinoUno')?.value;
    const destinoDos = this.rutaForm.get('destinoDos')?.value;
    if (cantidad === '1' && destinoUno.length >= 1) {
      console.log(destinoUno);
      const envio: EnvioTramiteInterno = {
        cantidad,
        codigo: this.codigo,
        id_destino: destinoUno
      }
      this.rutaService.postRutaInterna(envio).subscribe(
        (data) => {
          console.log(data);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.msg,
            showConfirmButton: false,
            timer: 1500
          })
        },
        (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.error.msg,
            showConfirmButton: false,
            timer: 1500
          })

        }
      )

    } else if (cantidad === '2' && destinoDos.length >= 1) {
      const envio: EnvioTramiteInterno = {
        cantidad,
        codigo: this.codigo,
        id_destino: destinoDos
      }
      this.rutaService.postRutaInterna(envio).subscribe(
        (data) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.msg,
            showConfirmButton: false,
            timer: 1500
          })

        },
        (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.error.msg,
            showConfirmButton: false,
            timer: 1500
          })
        }
      )

    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Seleccione un destino',
        showConfirmButton: false,
        timer: 1500
      })

    }
  }
  agregarCodigo(cod: string) {
    console.log(cod);
    this.codigo = cod;
    this.rutaService.getRutaInterna(this.codigo).subscribe(
      (data: ResultRutaInterna) => {
        if (String(data.rutaInterna.cantidad) === "1") {
          document.getElementById('seleTwo')?.classList.remove('invi');
          document.getElementById('seleOne')?.classList.add('invi');
          this.rutaForm.setValue({
            destinoUno: data.area,
            destinoDos: [{}],
            cantidad: String(data.rutaInterna.cantidad)
          });
        }
        if (String(data.rutaInterna.cantidad) === '2') {
          document.getElementById('seleTwo')?.classList.add('invi')
          document.getElementById('seleOne')?.classList.remove('invi');
          this.rutaForm.setValue({
            destinoUno: [{}],
            destinoDos: data.area,
            cantidad: String(data.rutaInterna.cantidad)
          });
        }
        if (!data.rutaInterna.cantidad) {
          document.getElementById('seleTwo')?.classList.add('invi')
          document.getElementById('seleOne')?.classList.add('invi');
        }

      },
      (error) => {
        console.log(error);

      }
    )

  }
  obtenerDatos(cod:string){
    this.title='Actualizar Tramite';
    this.ids = cod;
    this.tramiteInterService.getTramiteInterno(this.ids).subscribe(
      (data:ResultTramiteInterno)=>{
        console.log(data);
        this.tramiteForm.setValue({
          asunto: data.tramiteInterno.asunto,
          observacion: data.tramiteInterno.observacion,
          folio: data.tramiteInterno.folio,
          prioridad: data.tramiteInterno.id_prioridad
        });
      },
      (error)=>{
        console.log(error);
        
      }
    )
    
  }
  verTipoRuta(event: any) {
    if (event.target.value !== "" && event.target.value === "1") {
      document.getElementById('seleTwo')?.classList.remove('invi');
      document.getElementById('seleOne')?.classList.add('invi');
    }
    if (event.target.value !== "" && event.target.value === '2') {
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
      formData.append('asunto', this.tramiteForm.get('asunto')?.value);
      formData.append('observacion', this.tramiteForm.get('observacion')?.value);
      formData.append('folio', this.tramiteForm.get('folio')?.value);
      formData.append('id_prioridad', this.tramiteForm.get('prioridad')?.value);
      this.tramiteInterService.postTramiteInterno(formData).subscribe(
        (data) => {
          this.tramiteForm.setValue({
            asunto: '',
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
      const formData = new FormData();
      formData.append('asunto', this.tramiteForm.get('asunto')?.value);
      formData.append('observacion', this.tramiteForm.get('observacion')?.value);
      formData.append('folio', this.tramiteForm.get('folio')?.value);
      formData.append('id_prioridad', this.tramiteForm.get('prioridad')?.value);
      this.tramiteInterService.putTramiteInterno(formData,this.ids).subscribe(
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
    console.log(valor);

    this.busca = valor;
    if (this.busca.length>=1) {
      this.tramiteInterService.getTramiteInternos(valor).subscribe(
        (data: ResultTramiteInternos) => {
          this.listTramiteInterno = data.tramiteInterno;
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      )
    }else{
      this.busca = '';
      this.mostrarTramite();

    }
  }
  cancelar() {
    this.title='Crear Tramite';
    this.ids = undefined
    this.tramiteForm.setValue({
      asunto: '',
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
