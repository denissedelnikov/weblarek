import { IBuyer, TPpayment } from "../../types";

export class Buyer {
  /** ККласс для хранения данных которые необходимо ввести пользователю при покупке*/

  /** Обьект с сохранеными данными пользователя*/
  buyerData: IBuyer = {
    payment: "",
    email: "",
    phone: "",
    address: "",
  };

  //** Обьект с данными не прошедшими валидацию*/
  errors: { [key: string]: string } = {};

  /**
   * Установить платежный метод
   * @param {string} payment - Строка с типом опалиы
   */
  setPayment(payment: TPpayment): void {
    this.buyerData.payment = payment;
  }

  /**
   * ССохранить в поле класса email введеный пользователем
   * @param {string} email - Строка с емейлом
   */
  setEmail(email: string): void {
    this.buyerData.email = email;
  }
  /**
   * Сохранить телефон котрый указал пользователь в  поле класса
   * @param {string} phone - Строка с телефоном
   */
  setPhone(phone: string): void {
    this.buyerData.phone = phone;
  }
  /**
   * Сохранить адресс котрый ввел пользователь в  поле класса
   * @param {string} address - Строка с адрессом
   */
  setAddress(address: string): void {
    this.buyerData.address = address;
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
  validate(): { valide: boolean; error?: { [key: string]: string } } {
    for (const [key, value] of Object.entries(this.buyerData)) {
      if (!value) {
        this.errors[key] = `Поле - ${key} не заполнено`;
      }
    }

    if (Object.keys(this.errors).length > 0)
      return { valide: false, error: this.errors };

    return { valide: true };
  }
}
