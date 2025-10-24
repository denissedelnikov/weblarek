import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";

export interface  IBasketModal {
  list:HTMLElement[]
  buttonStatus: boolean
  priceCounter: string
}

export class BasketModal extends Component<IBasketModal> {
  elementButton: HTMLButtonElement;
  elementPriceCounter: HTMLSpanElement;
  elementBasketList: HTMLElement;
  emmit: EventEmitter

  constructor(container: HTMLElement,_emmit:EventEmitter) {
    super(container);

    this.emmit = _emmit
    this.elementButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.elementPriceCounter = ensureElement<HTMLSpanElement>('.basket__price', this.container);
    this.elementBasketList = ensureElement<HTMLElement>('.basket__list', this.container);

    this.elementButton.addEventListener('click', () => {
      this.emmit.emit('click_basket_buy')
    })
  }


  set buttonStatus(value: boolean) {
    this.elementButton.disabled = value;
  }

  set priceCounter(value: string) {
    this.elementPriceCounter.textContent = value;
  }

  set list(value: HTMLElement[]) {
    this.elementBasketList.innerHTML = ''
    this.elementBasketList.append(...value);
  }
  render(data?: Partial<IBasketModal> | undefined): HTMLElement {
    if(!data) return this.container
    return super.render(data)
  }
}