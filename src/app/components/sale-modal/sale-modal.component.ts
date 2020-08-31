import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Venta } from '../../interfaces/interfaces';
import { PayService } from '../../services/pay.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sale-modal',
  templateUrl: './sale-modal.component.html',
  styleUrls: ['./sale-modal.component.css'],
})
export class SaleModalComponent implements OnInit {
  @Input('view') view: boolean = false;
  @Input('type') type: string;
  @Input('venta') venta: Venta;

  @Output() close = new EventEmitter<boolean>();

  constructor(private paySvc: PayService) {}

  ngOnInit(): void {}

  confirmarArmado() {
    Swal.fire({
      title: 'Confirmar armado',
      text:
        "Si confirma este pedido se le enviará un mail al comprador dando por hecho que ya puede retirarlo (en caso de 'Retiro en sucursal') o comunicarse para que le sea enviado (en caso de haber solicitado envio a domicilio).",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.paySvc.confirm(this.venta);
        this.cerrarModal();
        this.topBarInfoPopUp('Pedido confirmado');
      }
    });
  }
  pasarAPendiente() {
    Swal.fire({
      title: 'Pasar a pendiente',
      text:
        "Si pasa este pedido a Pendiente, se dara por hecho que el pago ya ha sido recibido o ya se ha acordado con el comprador, y se colocará este pedido como 'Disponible para Armar'.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Pasar a pendiente',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.paySvc
          .sendPendMail(
            this.venta.userComplete.email,
            'Confirmación de compra',
            this.venta.code
          )
          .subscribe((data) => {
            this.paySvc.updateStateVenta(this.venta, 'pend').then(() => {
              this.cerrarModal();
              this.topBarInfoPopUp('Pasado a Pendiente');
            });
          });
      }
    });
  }
  finalizarVenta() {
    Swal.fire({
      title: 'Finalizar Venta',
      text:
        "Si finaliza esta venta, se considerará que la misma fue entregada a su comprador y que no quedan mas acciones que realizarle.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Finalizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.paySvc.finalize(this.venta).then(()=>{
          this.cerrarModal();
          this.topBarInfoPopUp('Venta finalizada');
        })
      }
    });
  }

  cerrarModal() {
    this.view = false;
    this.close.emit(false);
  }

  topBarInfoPopUp(leyenda: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
    });
    Toast.fire({
      icon: 'success',
      title: leyenda,
    });
  }


}
