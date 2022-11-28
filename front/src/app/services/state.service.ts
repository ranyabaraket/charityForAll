import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
besoins:any
  constructor() { }
getBesoins():void{
  return this.besoins
}
setBesoins(bes):void{
   this.besoins=bes
}
}
