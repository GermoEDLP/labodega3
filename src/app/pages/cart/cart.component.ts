import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private us:UserService) {}

create(){
this.us.createUser().then((ok)=>{
  console.log('ok', ok);
  
}).catch(err =>{
  console.log('error', err);
  
});
}
}
