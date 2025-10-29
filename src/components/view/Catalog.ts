import { ICard } from './Card';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';

export class Catalog extends Component<ICard> {
  /**
   * @type {HTMLElement} gallery -  Поле для хранения блока каталога
   */
  private gallery: HTMLElement;
  /**
   *  @type {EventEmitter} emmit - Обработчик событий
   */
  protected emmit: EventEmitter;

  /**
   * Конструктор класса Catalog
   * @param {HTMLElement} container - Контейнер компонента.
   * @param {EventEmitter} _emmit - Объект для событий.
   */
  constructor(container: HTMLElement, _emmit: EventEmitter) {
    super(container);

    this.emmit = _emmit;
    this.gallery = container;
  }

  /**
   * Показать карточки товара
   * @param {HTMLElement } cardsPrepared - Массив разметок всех товаров в кталоге
   */
  set renderCatalog(cardsPrepared: HTMLElement[]) {
    this.gallery.append(...cardsPrepared);
  }
}
