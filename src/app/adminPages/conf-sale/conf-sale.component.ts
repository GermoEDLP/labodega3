import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../../services/options.service';
import { Options } from 'src/app/interfaces/interfaces';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conf-sale',
  templateUrl: './conf-sale.component.html',
  styleUrls: ['./conf-sale.component.css']
})
export class ConfSaleComponent implements OnInit {

  options: Options;
  optForm: FormGroup;

  boton = {
    state: false,
    content: 'Actualizar'
  }

  constructor(private optSvc: OptionsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.arranque();
  }

  arranque(){
    this.optSvc.getOptions().subscribe((opt: Options)=>{
      this.crearFormulario(opt);      
      this.options = opt;      
    });
  }

  crearFormulario(opt: Options){
    this.optForm = this.fb.group({
      bussnessName: [opt.bussnessName, [Validators.required]],
      buyAdress: [opt.buyAdress, [Validators.required]],
      buyBankAcount: [opt.buyBankAcount, [Validators.required]],
      buyCBU: [opt.buyCBU, [Validators.required]],
      buyCUIL: [opt.buyCUIL, [Validators.required]],
      buyEmailCount: [opt.buyEmailCount, [Validators.required]],
      buyEmailPass: [opt.buyEmailPass, [Validators.required]],
      buyRazonSocial: [opt.buyRazonSocial, [Validators.required]],
      buySchedule: [opt.buySchedule, [Validators.required]],
      deliverySchedule: [opt.deliverySchedule, [Validators.required]]
    })
  }

  checkear(){
    if(this.optForm.valid){
      Swal.fire({
        title: 'Actualizar información',
        text: "Esta información es crucial para el manejo de la cuenta. Por favor cerciorate de que todos los datos son correctos antes de aceptar.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.botonLoading(true);
          this.optSvc.updateOptions(this.optForm.value).then(()=>{
            this.botonLoading(false);
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Información actualizada correctamente'
            })
          })
        }
      })
    }else{
      Swal.fire(
        'Campos incompletos',
        'Verifique que todos los campos esten completos y con un valor valido',
        'error'
      )
    }
    
  }

  botonLoading(state: boolean){
    if(state){
      this.boton.content = `<i class="fa fa-spin fa-refresh"></i> Espere`,
      this.boton.state = true
    }else{
      this.boton.content = `Actualizar`,
      this.boton.state = false
    }
  }

}
