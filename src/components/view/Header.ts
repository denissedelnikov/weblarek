import { Component } from '../base/Component';
import { IHeader } from "../../../src/main";
import { ensureElement } from '../../utils/utils'
import { EventEmitter } from '../base/Events';


export class Header extends Component<IHeader> {
  protected counterElement: HTMLElement;
   basketButton: HTMLButtonElement;
 emmiter:EventEmitter

  constructor(container: HTMLElement, _emmiter: EventEmitter) {
    super(container);

    this.emmiter = _emmiter
    this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);

   this.basketButton.addEventListener('click', () => {
    this.emmiter.emit('update_basket')
   })
  }

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}
