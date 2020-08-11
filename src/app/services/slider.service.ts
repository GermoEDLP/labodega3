import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Slider } from '../interfaces/interfaces';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  collRef = this.db.collection('slider'); 
  filePath: any;
  downloadURL: any;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage,) { }


  getSliders(){
    return this.collRef.valueChanges();
  }

  getSliderById(id: string){
    return this.collRef.doc(id).valueChanges();
  }

  showOrHideById(slider: Slider){
    slider.show = !slider.show;
    this.actualizarSliderById(slider.id, slider);
  }

  deleteSliderById(id: string){
    return this.collRef.doc(id).delete();
  }

  actualizarSliderById(id: string, slider: Slider){
    return this.collRef.doc(id).update(slider)
  }

  crearSlider(slider: Slider){
    let id = this.db.createId();
    slider.id = id;
    return this.collRef.doc(id).set(slider);
  }

  private uploadImage(image: any, slider?: Slider, actualiza?: boolean) {
    const time = new Date().getTime();
    this.filePath = `sliders/${time}${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    return task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async(urlImage) => {
          this.downloadURL = await urlImage;
          if(actualiza){
            this.actualizaSlider(slider);
          }else{
            this.newSlider(slider);
          }
        });
      })
    ).subscribe()
  }

  private async newSlider(slider: Slider) {
    const id = this.db.createId();
    slider.id = id;
    slider.img = this.downloadURL;
    slider.show = false;
    console.log(slider);
    
    return this.collRef.doc(id).set(slider);
  }

  actualizaSlider(slider: Slider){    
    slider.img = this.downloadURL;
    return this.collRef.doc(slider.id).update(slider);
  }

  creaSliderYSubeImagen(slider: Slider, image: any, noFoto: boolean){
    if(noFoto){
      this.downloadURL = image;
      return this.newSlider(slider);
    }else{
      this.uploadImage(image, slider, false)
      return new Promise(res=>{
        return res('ok');
      }) 
    }
  }

  actualizaSliderYSubeImagen(slider: Slider, image: any, noFoto: boolean){
    if(noFoto){
      this.downloadURL = image;
      
      return this.actualizaSlider(slider);
    }else{
      this.uploadImage(image, slider, true);
      return new Promise(res=>{
        return res('ok');
      })
      
    }
  }
}
