import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url = 'http://localhost:5000/labodegabebidas/us-central1';

  constructor(private http: HttpClient) { }


  getProductos(){
    return this.http.get(`${this.url}/products/getAll`);
  }


  createProd(prod: Product){

    return this.http.post(`${this.url}/products/newProd`, prod);


  }



}
