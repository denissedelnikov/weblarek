import { ICard } from "../../main";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";


export class Catalog extends Component<ICard> {
  private gallary: HTMLElement
  private emmiter: EventEmitter

  constructor(container: HTMLElement, _emmiter:EventEmitter){
    super(container)
    
    this.emmiter =_emmiter
    this.gallary = container
  }

  set renderCatalog(cardsPrepared: HTMLElement[]) {
    this.gallary.append(...cardsPrepared)
  }

}