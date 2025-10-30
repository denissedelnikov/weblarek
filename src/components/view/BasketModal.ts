import { Component } from '../base/Component';
import { EnsureElement } from '../../utils/utils';
import { EventEmitter } from '../base/Events';

export interface IBasketModal {
  list: HTMLElement[];
  buttonStatus: boolean;
  priceCounter: string;
}

const NO_ITEM = 'Корзина пустая'; // Сообшение о пустой корзине

export class BasketModal extends Component<IBasketModal> {
  /**
   * Класс для отображения элементов находяшихся в корзине
   */
  /**
   * @type {HTMLButtonElement} elementButton - Кнопка перехода к оформлению заказа
   */
  private elementButton: HTMLButtonElement;
  /**
   * @type {HTMLSpanElement} elementPriceCounter - Поле для хранения общей стоимости всех предметов в корзине
   */
  private elementPriceCounter: HTMLSpanElement;
  /** @type {HTMLElement} elementBasketList - Поле для отображения карточек товара */
  private elementBasketList: HTMLElement;
  //EventEmitter
  private emmit: EventEmitter;

  /**
   * @param {HTMLElement} container - Родительский элемент.
   * @param {EventEmitter} _emmit - Обработчик событий
   */
  constructor(container: HTMLElement, _emmit: EventEmitter) {
    super(container);

    this.emmit = _emmit;

    /**
     * Поиск элементов кнопки корзины,
     * Поле для отрисовки суммы товаров в корзине,
     * Поле для вставки карточек
     */
    this.elementButton = EnsureElement<HTMLButtonElement>(
      '.basket__button',
      this.container
    );
    this.elementPriceCounter = EnsureElement<HTMLSpanElement>(
      '.basket__price',
      this.container
    );
    this.elementBasketList = EnsureElement<HTMLElement>(
      '.basket__list',
      this.container
    );

    /**
     * Ожидание клика по кнопке перехода к оформлению заказа
     */
    this.elementButton.addEventListener('click', () => {
      this.emmit.emit('click_basket_buy');
    });
  }

  /**
   * Сделать доступной или недоступной кнопку
     @param  {boolean} value - tru - Отключить | false - Включить    *
  */
  set buttonStatus(value: boolean) {
    this.elementButton.disabled = value;
  }

  /**
   * Расчитать общую стоимость всех предметов в корзине
   * @param  {string} value - tru - Отключить | false - Включить
   */
  set priceCounter(value: string) {
    this.elementPriceCounter.textContent = value;
  }

  /**
   * Метод для вставки карточек
   * @param  {HTMLElement[]} value - Отрендереные карточки товара находяшиесь в корзине или пусто
   */
  set list(value: HTMLElement[]) {
    this.elementBasketList.innerHTML = value.length > 0 ? '' : NO_ITEM;
    this.elementBasketList.append(...value);
  }
}
