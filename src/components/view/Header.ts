import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";

/**
 * Интерфейс для описания свойств Header.
 * @interface
 * @property {number} counter - Количество элементов в корзине.
 */
export interface IHeader {
  counter: number;
}

/**
 * Класс Header, предназначен для отображения шапки сайта
 * @extends {Component<IHeader>}
 */
export class Header extends Component<IHeader> {
  /**
   * Элемент, отображающий количество товаров в корзине.
   * @type {HTMLElement}
   * @protected
   */
  protected counterElement: HTMLElement;

  /**
   * Кнопка для открытия корзины.
   * @type {HTMLButtonElement}
   */
  basketButton: HTMLButtonElement;

  /**
   * Объект для emit-событий.
   * @type {EventEmitter}
   */
  emmiter: EventEmitter;

  /**
   * Создает экземпляр Header.
   * @param {HTMLElement} container - Контейнер элемента Header.
   * @param {EventEmitter} _emmiter - Объект для событий.
   */
  constructor(container: HTMLElement, _emmiter: EventEmitter) {
    super(container);
    this.emmiter = _emmiter;

    /**
     * Поле для отображения числа элементов в корзине
     */
    this.counterElement = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container
    );
    /**
     * Поиск кнопки отрытия корзины
     */
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container
    );

    /**
     * Обработка события клика на кнопку корзины.
     */
    this.basketButton.addEventListener("click", () => {
      this.emmiter.emit("update_basket");
    });
  }

  /**
   * Счетчик количества товаров в корзине.
   * @param {number} value - Количество.
   */
  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}
