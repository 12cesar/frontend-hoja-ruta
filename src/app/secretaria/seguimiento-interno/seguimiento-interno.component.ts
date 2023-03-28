import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultRutaInternas, RutaInterna } from 'src/app/interface/ruta.interna';
import { ResultSeguimientos, SeguimientoInterno } from 'src/app/interface/seguimiento';
import { RutaInternaService } from 'src/app/services/ruta-interna.service';
import { SeguimientoInternoService } from 'src/app/services/seguimiento-interno.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AreaService } from 'src/app/services/area.service';
import { Area, ResultAreas } from 'src/app/interface/area';
import { ResultRutaInterna } from 'src/app/interface/ruta.interna';
import Swal from 'sweetalert2';
import { Accione, ResultAcciones } from 'src/app/interface/accion';
import { EnvioTramiteInternoDos } from 'src/app/interface/envio-tramite-interno';
import { AccionService } from 'src/app/services/accion.service';
@Component({
  selector: 'app-seguimiento-interno',
  templateUrl: './seguimiento-interno.component.html',
  styleUrls: ['./seguimiento-interno.component.css']
})
export class SeguimientoInternoComponent implements OnInit {

  listTramite?: RutaInterna[];
  listSeguimiento?: SeguimientoInterno[];
  formSeguimiento: FormGroup;
  busca: string = '';
  p: number = 1;
  dropdownSettingsUni: IDropdownSettings = {};
  dropdownSettings: IDropdownSettings = {};
  dropdownList = [{}];
  dropDownListUni = [{}];
  listArea: Area[] = [];
  rutaForm: FormGroup;
  ruta: number = 0;
  listAcciones?: Accione[];
  constructor(
    private rutaInterna: RutaInternaService,
    private seguimientoInterno: SeguimientoInternoService,
    private fb: FormBuilder,
    private areaService: AreaService,
    private rutaService: RutaInternaService,
    private accionService: AccionService,
  ) {
    this.formSeguimiento = this.fb.group({
      codigo_tramite: { value: '', disabled: true },
      asunto: { value: '', disabled: true },
      observacion: { value: '', disabled: true },
      fecha: { value: '', disabled: true },
      hora: { value: '', disabled: true },
      folio: { value: '', disabled: true }
    });
    this.rutaForm = this.fb.group({
      destinoUno: [[]],
      destinoDos: [[]],
      cantidad: ['', Validators.required],
      accion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.mostrarTramite();
    this.mostrarAreas();
    this.mostrarAcciones();
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
    this.rutaInterna.getTramiteDerivado(this.busca).subscribe(
      (data: ResultRutaInternas) => {
        this.listTramite = data.rutaInterna;

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
  mostrarAcciones() {
    this.accionService.getAcciones('1').subscribe(
      (data: ResultAcciones) => {
        this.listAcciones = data.acciones;
      },
      (error) => {
        console.log(error);

      }
    )
  }
  obetenerDatos(
    codigo_tramite: string,
    asunto: string,
    observacion: any,
    fecha: string,
    hora: string,
    folio: string
  ) {
    console.log(codigo_tramite, asunto, observacion, fecha, hora);
    const fechaNu = `${fecha} - ${hora}`
    this.formSeguimiento.setValue({
      codigo_tramite,
      asunto,
      observacion,
      fecha: fechaNu,
      hora,
      folio
    });
    this.seguimientoInterno.getSeguimiento(codigo_tramite).subscribe(
      (data: ResultSeguimientos) => {
        this.listSeguimiento = data.seguimiento;
      },
      (error) => {
        console.log(error);

      }
    )
  }
  obtenerRuta(id: number) {
    this.ruta = id;
    this.rutaService.getRutaInterna(this.ruta).subscribe(
      (data: ResultRutaInterna) => {
        console.log(data);

        if (String(data.rutaInterna.cantidad) === "1") {
          document.getElementById('seleTwo')?.classList.remove('invi');
          document.getElementById('seleOne')?.classList.add('invi');
          this.rutaForm.setValue({
            destinoUno: data.area,
            destinoDos: [{}],
            cantidad: String(data.rutaInterna.cantidad),
            accion:''
          });
        }
        if (String(data.rutaInterna.cantidad) === '2') {
          document.getElementById('seleTwo')?.classList.add('invi')
          document.getElementById('seleOne')?.classList.remove('invi');
          this.rutaForm.setValue({
            destinoUno: [{}],
            destinoDos: data.area,
            cantidad: String(data.rutaInterna.cantidad),
            accion:''
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
  crearRuta() {
    const cantidad = this.rutaForm.get('cantidad')?.value;
    const destinoUno = this.rutaForm.get('destinoUno')?.value;
    const destinoDos = this.rutaForm.get('destinoDos')?.value;
    const accion = this.rutaForm.get('accion')?.value;
    if (cantidad === '1' && destinoUno.length >= 1) {
      console.log(destinoUno);
      const envio: EnvioTramiteInternoDos = {
        cantidad,
        id: this.ruta,
        id_destino: destinoUno,
        accion
      }
      this.rutaService.putRutaInterna(this.ruta, envio).subscribe(
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
      const envio: EnvioTramiteInternoDos = {
        cantidad,
        id: this.ruta,
        id_destino: destinoDos,
        accion
      }
      this.rutaService.putRutaInterna(this.ruta, envio).subscribe(
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
  buscar(valor: any) {
    console.log(valor);

    this.busca = valor;
    if (this.busca.length >= 1) {
      this.rutaInterna.getTramiteDerivado(valor).subscribe(
        (data: ResultRutaInternas) => {
          this.listTramite = data.rutaInterna;
        },
        (error) => {
          console.log(error);

        }
      )
    } else {
      this.busca = '';
      this.mostrarTramite();

    }
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
  cancelar() {
    this.formSeguimiento.setValue({
      codigo_tramite: '',
      asunto: '',
      observacion: '',
      fecha: '',
      hora: '',
      folio: ''
    });
    this.rutaForm.setValue({
      destinoUno: [[]],
      destinoDos: [[]],
      cantidad: '',
      accion: ''
    })
  }

}
