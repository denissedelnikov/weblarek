import { Component } from "../../components/base/Component";
import { ensureElement } from '../../utils/utils';
import { EventEmitter } from "../base/Events";

interface ISuccess {
  price: string;
}

export class Success extends Component<ISuccess> {
  elementSellCounter: HTMLElement;
  elementCloseButton: HTMLElement;
  emmit: EventEmitter

  constructor(container: HTMLElement,_emmit: EventEmitter) {
    super(container);

    this.emmit = _emmit
    this.elementSellCounter = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.elementCloseButton = ensureElement<HTMLElement>('.order-success__close', this.container);

    this.elementCloseButton.addEventListener('click', () => {
      this.emmit.emit('success_click')
    })
  }

  set price(value: string) {
    this.elementSellCounter.textContent =  value
  }
}
