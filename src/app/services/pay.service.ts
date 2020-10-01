import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { AngularFirestore } from '@angular/fire/firestore';
import { Venta } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PayService {
  url: string = environment.mpUrl;

  constructor(private http: HttpClient, private db: AngularFirestore) {}

  collRef = this.db.collection('sales');

  // Crea una venta nueva
  newVenta(venta: Venta) {
    return this.createNewVenta(venta)
      .then(() => {
        if (venta.payMethod.includes('bank')) {
          return this.bankPay(venta);
        } else if (venta.payMethod.includes('mp')) {
          return this.mercadoPagoPay(venta);
        } else {
          return this.sendPendMail(
            venta.userComplete.email,
            'Compra en La Bodega',
            venta.code
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Inserta en la BD los datos de la nueva venta
  async createNewVenta(venta: Venta) {
    let id = await this.db.createId();
    venta.date = new Date();
    venta.id = id;
    if (venta.payMethod.includes('bank')) {
      venta.state = 'transfer';
    } else if (venta.payMethod.includes('mp')) {
      venta.state = 'mpPay';
    } else {
      venta.state = 'pend';
    }
    venta.code = id.slice(0, 6).toLocaleUpperCase();
    return this.collRef.doc(id).set(venta);
  }

  // Envia un mail con el estado 'pendiente de armado'
  sendPendMail(to: string, subject: string, code: string) {
    let url = this.url + '/buy/pend';
    let data = {
      to: to,
      subject: subject,
      code: code,
    };
    return this.http.post(url, data);
  }

  // Envia un mail con los datos de transferencia al banco
  bankPay(venta: Venta) {
    let url = this.url + '/buy/bank';
    let data = {
      to: venta.userComplete.email,
      subject: 'Compra en La Bodega',
      code: venta.code,
      total: venta.products.subtotal,
    };
    return this.http.post(url, data);
  }

  // Crea un link de pago en MercadoPago y lo retorna
  mercadoPagoPay(venta: Venta) {
    let url = this.url + '/buy/mp';

    return this.http.post(url, venta);
  }

  // Confirma que el producto ya se puede retirar del local o se puede enviar
  confirm(venta: Venta): Observable<any> | void | Promise<any> {
    if (venta.state.includes('pend')) {
      return this.updateStateVenta(venta, 'confirm').then(() => {
        return this.sendConfirmMail(
          venta.userComplete.email,
          'Confirmación de compra en La Bodega',
          venta.code,
          venta.products.subtotal,
          venta.shipp
        ).subscribe((data)=>{
          return data
        });
      })
    }
  }

  // Envia mail confirmando que el producto se ´puede retirar del local o se puede enviar
  sendConfirmMail(
    to: string,
    subject: string,
    code: string,
    total: number,
    shipp: boolean
  ) {
    let url;
    if (shipp) {
      url = this.url + '/buy/confirmE';
    } else {
      url = this.url + '/buy/confirmTA';
    }
    let data = {
      to: to,
      subject: subject,
      code: code,
      total: total,
    };
    console.log(url, data);
    
    return this.http.post(url, data)
  }

  finalize(venta: Venta){
    return this.updateStateVenta(venta, 'finalize').then(() => {
      return this.sendFinalMail(
        venta.userComplete.email,
        'Pedido entregado'
      ).subscribe();
    })
  }

  sendFinalMail(to: string, subject: string){
    let url = this.url + '/buy/final';
    let data = {
      to: to,
      subject: subject
    };    
    return this.http.post(url, data);
  }

  // Cambia el estado de una venta
  updateStateVenta(venta: Venta, newState: string) {
    if (newState == 'confirm') {
      venta.dateConf = new Date();
    }
    if(newState== 'finalize'){
      venta.dateFinal = new Date();
    }
    venta.state = newState;
    return this.collRef.doc(venta.id).update(venta);
  }

  contactMail(name: string, email: string, subject: string, message: string){
    let url = this.url + '/contact';
    let data = {
      email: email,
      subject: subject,
      message: message,
      name: name
    };    
    return this.http.post(url, data);
  }


}
