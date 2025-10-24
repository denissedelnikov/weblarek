import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";

interface IForm {
  buttonStatus: boolean;
  error: string;
}
export class Form extends Component<IForm> {
  elementSubmitButton: HTMLButtonElement;
  elementError: HTMLSpanElement;

  constructor(container: HTMLElement) {
    super(container);

    this.elementSubmitButton = ensureElement<HTMLButtonElement>('.modal__actions > .button', this.container);
    this.elementError = ensureElement<HTMLSpanElement>('.form__errors', this.container);
  }

  set buttonStatus(value: boolean) {
    this.elementSubmitButton.disabled = value;

  }

  set error(message: string) {
    this.elementError.textContent = message;
  }
}
export class Order extends Form {
  elmentPaymentCard: HTMLButtonElement;
  elmentPaymentCash: HTMLButtonElement;
  elementInputAddress: HTMLInputElement;
  emmit: EventEmitter

  constructor(container: HTMLElement, _emmit: EventEmitter) {
    super(container);

    this.emmit = _emmit
    this.elmentPaymentCard = ensureElement<HTMLButtonElement>(`${'[name= "card"]'}`, this.container);
    this.elmentPaymentCash = ensureElement<HTMLButtonElement>(`${'[name= "cash"]'}`, this.container);
    this.elementInputAddress = ensureElement<HTMLInputElement>(`${'[name= "address"]'}`, this.container);

    [this.elmentPaymentCard,this.elmentPaymentCash].forEach((item) => {
      item.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
       this.emmit.emit('payment_method',  {name: target.getAttribute('name')} )
      })
    })
   
    this.elementInputAddress.addEventListener('change', (e:Event) => {
      const target = e.target as HTMLInputElement;
      const value = {address:target.value}; // получаем значение из input

      this.emmit.emit('address', value); // передаем значение
    });

    this.container.addEventListener('submit', (e) => {
      e.preventDefault()

      this.emmit.emit('click_button_order')
    })
  }

  set card (value: string)  {
    this.elmentPaymentCash.classList.remove(value)
    this.elmentPaymentCard.classList.add(value)
  }

  set cash(value: string) {
    this.elmentPaymentCard.classList.remove(value)
    this.elmentPaymentCash.classList.add(value)
  }

  set error(value: string) {
    super.error = value
  }

  set buttonStatus(value:boolean) {
    super.buttonStatus = value
  }
}
export class Contacts extends Form {
  elmentInputEmail: HTMLInputElement;
  elementInputPhone: HTMLInputElement;
  emmit:EventEmitter

  constructor(container: HTMLElement, _emmit: EventEmitter) {
    super(container);

    this.emmit = _emmit
    this.elmentInputEmail = ensureElement<HTMLInputElement>(`${'[name= "email"]'}`, this.container);
    this.elementInputPhone = ensureElement<HTMLInputElement>(`${'[name= "phone"]'}`, this.container);


      this.elmentInputEmail.addEventListener('change', (e:Event) => {
      const target = e.target as HTMLInputElement;
      const value = {email:target.value}; // получаем значение из input

      this.emmit.emit('email', value); // передаем значение
    });
      this.elementInputPhone.addEventListener('change', (e:Event) => {
      const target = e.target as HTMLInputElement;
      const value = {phone:target.value}; // получаем значение из input

      this.emmit.emit('phone', value); // передаем значение

       this.container.addEventListener('submit', (e) => {
      e.preventDefault()

      this.emmit.emit('click_button_contacts')
    })
      
    });
  }

    set error(value: string) {
    super.error = value
  }

  set buttonStatus(value:boolean) {
    super.buttonStatus = value
  }
}

