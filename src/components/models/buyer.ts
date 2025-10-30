import { IBuyer, TPpayment } from '../../types';
import { EventEmitter } from '../base/Events';

export class Buyer {
  /** Класс для хранения данных которые необходимо ввести пользователю при покупке*/
  /** Обьект с сохранеными данными пользователя*/
  private buyerData: IBuyer = {
    payment: '',
    email: '',
    phone: '',
    address: '',
  };

  // EventEmmiter
  private emmit: EventEmitter;

  constructor(_emmit: EventEmitter) {
    this.emmit = _emmit;
  }
  /**
   * Установить платежный метод
   * @param {string} payment - Строка с типом опалиы
   */
  setPayment(payment: TPpayment): void {
    this.buyerData.payment = payment;
    this.emmit.emit('updateorder', this.validate());
  }

  /**
   * ССохранить в поле класса email введеный пользователем
   * @param {string} email - Строка с емейлом
   */
  setEmail(email: string): void {
    this.buyerData.email = email;
    this.emmit.emit('updatecontacts', this.validate());
  }
  /**
   * Сохранить телефон котрый указал пользователь в  поле класса
   * @param {string} phone - Строка с телефоном
   */
  setPhone(phone: string): void {
    this.buyerData.phone = phone;
    this.emmit.emit('updatecontacts', this.validate());
  }
  /**
   * Сохранить адресс котрый ввел пользователь в  поле класса
   * @param {string} address - Строка с адрессом
   */
  setAddress(address: string): void {
    this.buyerData.address = address;
    this.emmit.emit('updateorder', this.validate());
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
      payment: '',
      email: '',
      phone: '',
      address: '',
    };

    this.buyerData = buyerDataNew;
  }

  /**
   * Проверяет каждое значение обьекта buyerData,
   * если данные не прошли валидацию в соответсвуюшем поле будет указана ошибка
   * @returns {IBuyer}
   */
  validate(): IBuyer {
    return {
      payment: this.buyerData.payment,
      email: this.buyerData.email ? '' : 'Не заполнен email',
      phone: this.buyerData.phone ? '' : 'Не заполнен телефон',
      address: this.buyerData.address ? '' : 'Не заполнен адресс',
    };
  }
}
