import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";

/**
 * Интерфейс для формы.
 * @interface IForm
 * @property {boolean} buttonStatus - Статус кнопки отправки формы.
 * @property {string} error - Текст ошибки.
 */
interface IForm {
  buttonStatus: boolean;
  error: string;
}

/**
 * Класс формы.
 * @class
 * @extends {Component<IForm>}
 */
export class Form extends Component<IForm> {
  /** @type {HTMLButtonElement} elementSubmitButton -  Кнопка для подтверждения данных введенных в формах*/
  elementSubmitButton: HTMLButtonElement;
  /** @type {HTMLSpanElement} elementError - Поле для отображения ошибки */
  elementError: HTMLSpanElement;

  /**
   * Создает экземпляр формы.
   * @param {HTMLElement} container - Контейнер HTML для формы.
   */
  constructor(container: HTMLElement) {
    super(container);

    /**
     * Поиск кнопки подтверждения введенных данных
     * */
    this.elementSubmitButton = ensureElement<HTMLButtonElement>(
      ".modal__actions > .button",
      this.container
    );

    /**
     * Поиск поля для отображения ошибки
     * */
    this.elementError = ensureElement<HTMLSpanElement>(
      ".form__errors",
      this.container
    );
  }

  /**
   * Устанавливает статус активности кнопки.
   * @param {boolean} value - Если true, кнопка станет заблокирована.
   */
  set buttonStatus(value: boolean) {
    this.elementSubmitButton.disabled = value;
  }

  /**
   * Устанавливает сообщение ошибки.
   * @param {string} message - Текст ошибки.
   */
  set error(message: string) {
    this.elementError.textContent = message;
  }
}

/**
 * Форма Order для выбора способа оплаты и указать адресс доставки
 * @class
 * @extends {Form}
 */
export class Order extends Form {
  /**
   * Кнопка выбора оплаты картой.
   * @type {HTMLButtonElement}
   */
  elmentPaymentCard: HTMLButtonElement;

  /**
   * Кнопка выбора оплаты наличными.
   * @type {HTMLButtonElement}
   */
  elmentPaymentCash: HTMLButtonElement;

  /**
   * Поле ввода адреса.
   * @type {HTMLInputElement}
   */
  elementInputAddress: HTMLInputElement;

  /**
   * Объект для событий.
   * @type {EventEmitter}
   */
  emmit: EventEmitter;

  /**
   * Создает экземпляр формы.
   * @param {HTMLElement} container - Контейнер HTML.
   * @param {EventEmitter} _emmit - Объект событие-эмиттер.
   */
  constructor(container: HTMLElement, _emmit: EventEmitter) {
    super(container);
    this.emmit = _emmit;

    /**
     * Поиск элементов оплаты и поля для ввода адреса
     */
    this.elmentPaymentCard = ensureElement<HTMLButtonElement>(
      `[name="card"]`,
      this.container
    );
    this.elmentPaymentCash = ensureElement<HTMLButtonElement>(
      `[name="cash"]`,
      this.container
    );
    this.elementInputAddress = ensureElement<HTMLInputElement>(
      `[name="address"]`,
      this.container
    );

    /**
     * Обработка выбора платёжного метода
     */
    [this.elmentPaymentCard, this.elmentPaymentCash].forEach((item) => {
      item.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        this.emmit.emit("payment_method", {
          name: target.getAttribute("name"),
        });
      });
    });

    /**
     * Обработка изменения адреса
     */
    this.elementInputAddress.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLInputElement;
      const value = { address: target.value };
      this.emmit.emit("address", value);
    });

    /**
     * Обработка отправки формы 
     */
    this.container.addEventListener("submit", (e) => {
      e.preventDefault();
      this.emmit.emit("click_button_order");
    });
  }

  /**
   * Добавить рамку выбраному спосбу оплаты
   * @param {string} value - Класс для активации
   */
  set card(value: string) {
    this.elmentPaymentCash.classList.remove(value);
    this.elmentPaymentCard.classList.add(value);
  }

  /**
   * Добавить рамку выбраному спосбу оплаты
   * @param {string} value - Класс для активации.
   */
  set cash(value: string) {
    this.elmentPaymentCard.classList.remove(value);
    this.elmentPaymentCash.classList.add(value);
  }

  /**
   * Устанавливает сообщение об ошибке.
   * @param {string} value - Текст ошибки.
   */
  set error(value: string) {
    super.error = value;
  }

  /**
   * Устанавливает кликабельность для кнопки
   * @param {boolean} value - Статус.
   */
  set buttonStatus(value: boolean) {
    super.buttonStatus = value;
  }
}

/**
 * Форма Contacts, чтобы указать телефон и email
 * @class
 * @extends {Form}
 */
export class Contacts extends Form {
  /**
   * Поле для ввода email.
   * @type {HTMLInputElement}
   */
  elmentInputEmail: HTMLInputElement;

  /**
   * Поле для ввода телефона.
   * @type {HTMLInputElement}
   */
  elementInputPhone: HTMLInputElement;

  /**
   * Объект для событий.
   * @type {EventEmitter}
   */
  emmit: EventEmitter;

  /**
   * Создает экземпляр контактов.
   * @param {HTMLElement} container - Контейнер HTML.
   * @param {EventEmitter} _emmit - Объект событий.
   */
  constructor(container: HTMLElement, _emmit: EventEmitter) {
    super(container);
    this.emmit = _emmit;

    this.elmentInputEmail = ensureElement<HTMLInputElement>(
      `[name="email"]`,
      this.container
    );
    this.elementInputPhone = ensureElement<HTMLInputElement>(
      `[name="phone"]`,
      this.container
    );

    // Обработка изменения email
    this.elmentInputEmail.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLInputElement;
      const value = { email: target.value };
      this.emmit.emit("email", value);
    });

    // Обработка изменения инпута
    this.elementInputPhone.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLInputElement;
      const value = { phone: target.value };
      this.emmit.emit("phone", value);
    });

    // Обработка отправки формы контактов
    this.container.addEventListener("submit", (e) => {
      e.preventDefault();
      this.emmit.emit("click_button_contacts");
    });
  }

  /**
   * Устанавливает сообщение об ошибке.
   * @param {string} value - Текст ошибки.
   */
  set error(value: string) {
    super.error = value;
  }

  /**
   * Устанавливает кликабельность кнопки
   * @param {boolean} value - Статус.
   */
  set buttonStatus(value: boolean) {
    super.buttonStatus = value;
  }
}
