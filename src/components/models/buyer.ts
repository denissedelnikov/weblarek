import { IBuyer, TPpayment } from "../../types";
import { EventEmitter } from "../base/Events";

export class Buyer {
  /** ККласс для хранения данных которые необходимо ввести пользователю при покупке*/
  //** Обьект с данными не прошедшими валидацию*/
  /** Обьект с сохранеными данными пользователя*/
  buyerData: IBuyer = {
    payment: "",
    email: "",
    phone: "",
    address: "",
  };



  emmit: EventEmitter
  
  constructor(_emmit:EventEmitter) {
    this.emmit = _emmit
  }
  /**
   * Установить платежный метод
   * @param {string} payment - Строка с типом опалиы
   */
  setPayment(payment: TPpayment): void {
    this.buyerData.payment = payment;
    this.emmit.emit('update_order',this.validate())
  }

  /**
   * ССохранить в поле класса email введеный пользователем
   * @param {string} email - Строка с емейлом
   */
  setEmail(email: string): void {
    this.buyerData.email = email;
   this.emmit.emit('update_contacts',this.validate())
  }
  /**
   * Сохранить телефон котрый указал пользователь в  поле класса
   * @param {string} phone - Строка с телефоном
   */
  setPhone(phone: string): void {
    this.buyerData.phone = phone;
    this.emmit.emit('update_contacts',this.validate())
  }
  /**
   * Сохранить адресс котрый ввел пользователь в  поле класса
   * @param {string} address - Строка с адрессом
   */
  setAddress(address: string): void {
    this.buyerData.address = address;
    this.emmit.emit('update_order',this.validate())
  }

  /**
   * Вернуть поле класса - (buyerData: IBuyer) со всеми данными о пользователе
   * @returns {IBuyer} - Обьект
   */
  getBuyerData(): IBuyer {
    return this.buyerData;
  }

  /**
   * Очистить поле класса - (buyerData: IBuyer) со всеми данными о пользователе
   */
  clearBuyerData(): void {
    const buyerDataNew: IBuyer = {
      payment: "",
      email: "",
      phone: "",
      address: "",
    };

    this.buyerData = buyerDataNew;
  }

  /**
   * Валидация сохранных данных о пользователе в поле класса -  (buyerData: IBuyer).
   * @returns В случаи если все данные валидны вернется обьект {valid: true}, если в данных есть ошибка  вернтеся обьект  {valide: false, eror:[Имя поля с ошибкой]: тип ошибки }
   */
  validate() {
   return{ payment: this.buyerData.payment ? '': 'Необходимо выбрать способ оплаты',
    email: this.buyerData.email ? '': 'Не заполнен email',
    phone: this.buyerData.phone ? '': 'Не заполнен телефон',
    address: this.buyerData.address ? '': 'Не заполнен адресс',
   }
  }
}
