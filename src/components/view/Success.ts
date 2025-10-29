import { Component } from '../../components/base/Component';
import { EnsureElement } from '../../utils/utils';
import { EventEmitter } from '../base/Events';

/**
 * Интерфейс для данных компонента Success.
 * @interface
 * @property {string} price - Цена, отображаемая в компоненте.
 */
interface ISuccess {
  price: string;
}

/**
 * Класс Success, расширяет базовый компонент для отображения успешного заказа.
 * @extends {Component<ISuccess>}
 */
export class Success extends Component<ISuccess> {
  /**
   * Поле для отображения потраченной суммы
   * @type {HTMLElement}
   */
  elementSellCounter: HTMLElement;

  /**
   * Элемент кнопки закрытия окна.
   * @type {HTMLElement}
   */
  elementCloseButton: HTMLElement;

  /**
   * Объект EventEmitter для эмита событий.
   * @type {EventEmitter}
   */
  emmit: EventEmitter;

  /**
   * Конструктор компонента Success.
   * @param {HTMLElement} container - Контейнер компонента.
   * @param {EventEmitter} _emmit - Объект для событий.
   */
  constructor(container: HTMLElement, _emmit: EventEmitter) {
    super(container);

    this.emmit = _emmit;

    /**
     * Поле для отображения потраченной суммы
     */
    this.elementSellCounter = EnsureElement<HTMLElement>(
      '.order-success__description',
      this.container
    );
    /**
     * Кнопка закрытия
     */
    this.elementCloseButton = EnsureElement<HTMLElement>(
      '.order-success__close',
      this.container
    );

    /**
     * Обработка клика по кнопке закрытия.
     */
    this.elementCloseButton.addEventListener('click', () => {
      this.emmit.emit('success_click');
    });
  }

  /**
   * Установка цены в компонент.
   * @param {string} value - Цена, отображаемая в компоненте.
   */
  set price(value: string) {
    this.elementSellCounter.textContent = value;
    this.emmit.emit('success_update', super.render());
  }
}
