import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';
import { EnsureElement } from '../../utils/utils';

/**
 * Интерфейс для общего класса
 */
export interface ICard {
  title: string;
  price: string;
  id: string;
}

/**
 * Интерфейс для карточки товара в каталоге
 */
export interface ICardCatalog extends ICard {
  category: string;
  categorySelector: string;
  image: string;
}

/**
 * Интерфейс для карточки товара в окне подробного осмотра
 */
export interface ICarddPrview extends ICardCatalog, ICard {
  description: string;
  buttonText: string;
  buttonStatus: boolean;
}

/**
 * Интерфейс для карточки товара в корзине
 */
export interface ICardBasket extends ICard {
  counter: string;
}

/**
 * Обший класс карточек товара
 * @class
 * @param {Object} ICard - Данные карточки.
 */
export class Card extends Component<ICard> {
  /**
   * @protected {HTMLElement} elementTitle - HTML элемент заголовка.
   */
  protected elementTitle: HTMLElement;

  /**
   * @protected {HTMLElement} elementPrice - HTML элемент цены.
   */
  protected elementPrice: HTMLElement;

  /**
   * @protected {string} id - поле
   */
  protected elementId: string = '';

  /**
   * @param {HTMLElement} container - Родительский элемент.
   */
  constructor(container: HTMLElement) {
    super(container);
    /**
     * Инициализация элементов.
     */
    this.elementTitle = EnsureElement<HTMLElement>(
      '.card__title',
      this.container
    );
    this.elementPrice = EnsureElement<HTMLElement>(
      '.card__price',
      this.container
    );
  }

  /**
   * Установка заголовка.
   * @param {string} value
   */
  set title(value: string) {
    this.elementTitle.textContent = value;
  }

  /**
   * Установка цены.
   * @param {string} value
   */
  set price(value: string) {
    this.elementPrice.textContent = value;
  }

  /**
   * Установка ID карточки.
   * @param {string} value
   */
  set id(value: string) {
    this.elementId = value;
  }
}

/**
 * Класс отображения карточек каталога
 * @class
 */
export class CardCatalog extends Card {
  /**
   * @protected {HTMLElement} elementCategory - Элемент категории.
   */
  protected elementCategory: HTMLElement;

  /**
   * @protected {HTMLElement} elementButton - Элемент кнопки.
   */
  protected elementButton: HTMLElement;

  /**
   * @protected {HTMLImageElement} elementImage - Элемент изображения.
   */
  protected elementImage: HTMLImageElement;

  /**
   * @protected {EventEmitter} emmiter - Объект события.
   */
  protected emmiter: EventEmitter;

  /**
   * @param {HTMLElement} conteiner - Родительский элемент.
   * @param {EventEmitter} _emmiter - Объект события.
   */
  constructor(conteiner: HTMLElement, _emmiter: EventEmitter) {
    super(conteiner);
    this.elementButton = conteiner;
    this.emmiter = _emmiter;

    this.elementCategory = EnsureElement<HTMLElement>(
      '.card__category',
      this.container
    );
    this.elementImage = EnsureElement<HTMLImageElement>(
      '.card__image',
      this.container
    );

    this.container.addEventListener('click', () => {
      this.emmiter.emit('cardclick', { id: this.elementId });
    });
  }

  /**
   * Установка категории.
   * @param {string} value
   */
  set category(value: string) {
    this.elementCategory.textContent = value;
  }

  /**
   * Установка селектора категории.
   * @param {string} value
   */
  set categorySelector(value: string) {
    this.elementCategory.classList.add(value);
  }

  /**
   * Переопределение установки заголовка.
   * @param {string} value
   */
  set title(value: string) {
    super.title = value;
  }

  /**
   * Установка изображения.
   * @param {string} value
   */
  set image(value: string) {
    super.setImage(this.elementImage, value);
  }

  /**
   * Установка цены.
   * @param {string} value
   */
  set price(value: string) {
    super.price = value;
  }

  /**
   * Отрисовка карточки и добавление обработчика клика.
   * @param {Partial<ICard>} [data]
   * @returns {HTMLElement}
   */
  render(data?: Partial<ICard>): HTMLElement {
    return super.render(data);
  }
}

/**
 * Класс для отобраения элемента выбраного для подробного осмотра
 * @class
 */
export class CardPreviw extends Card {
  /**
   * @public {HTMLElement} elementText - Элемент текста.
   */
  elementText: HTMLElement;

  /**
   * @public {HTMLElement} elementCategory - Элемент категории.
   */
  elementCategory: HTMLElement;

  /**
   * @protected {HTMLImageElement} elementImage - Элемент изображения.
   */
  protected elementImage: HTMLImageElement;

  /**
   * @public {HTMLButtonElement} elementButtonPreviw - Кнопка превью.
   */
  elementButtonPreviw: HTMLButtonElement;

  /**
   * @protected {EventEmitter} emmiter - Объект события.
   */
  protected emmit: EventEmitter;

  /**
   * @param {HTMLElement} container - Родительский элемент.
   * @param {EventEmitter} _emmiter - Объект события.
   */
  constructor(container: HTMLElement, _emmit: EventEmitter) {
    super(container);
    this.emmit = _emmit;
    this.elementButtonPreviw = EnsureElement<HTMLButtonElement>(
      '.card__button',
      this.container
    );
    this.elementText = EnsureElement<HTMLElement>(
      '.card__text',
      this.container
    );
    this.elementCategory = EnsureElement<HTMLElement>(
      '.card__category',
      this.container
    );
    this.elementImage = EnsureElement<HTMLImageElement>(
      '.card__image',
      this.container
    );

    this.elementButtonPreviw.addEventListener('click', () => {
      this.emmit.emit('clickbuttonpreviw');
    });
  }

  /**
   * Установка категории.
   * @param {string} value
   */
  set category(value: string) {
    this.elementCategory.textContent = value;
  }

  /**
   * Установка заголовка.
   * @param {string} value
   */
  set title(value: string) {
    super.title = value;
  }

  /**
   * Установка изображения.
   * @param {string} value
   */
  set image(value: string) {
    super.setImage(this.elementImage, value);
  }

  /**
   * Установка цены.
   * @param {string} value
   */
  set price(value: string) {
    super.price = value;
  }

  /**
   * Установка описания.
   * @param {string} value
   */
  set description(value: string) {
    this.elementText.textContent = value;
  }

  /**
   * Установка текста кнопки.
   * @param {string} value
   */
  set buttonText(value: string) {
    this.elementButtonPreviw.textContent = value;
  }

  /**
   * Установка статуса кнопки.
   * @param {boolean} value
   */
  set buttonStatus(value: boolean) {
    this.elementButtonPreviw.disabled = value;
  }

  /**
   * Отображение кард-превью.
   * @param {Partial<ICarddPrview>} [data]
   * @returns {HTMLElement}
   */
  render(data?: Partial<ICarddPrview>): HTMLElement {
    if (!data) return this.container;
    return super.render(data);
  }
}
/**
 * Класс карточки в корзине
 * @class
 */
export class CardBasket extends Card {
  /**
   * @public {HTMLElement} counterBasket - Элемент счетчика.
   */
  counterBasket: HTMLElement;

  /**
   * @public {HTMLElement} elementDeleteButton - Элемент кнопки удаления.
   */
  elementDeleteButton: HTMLElement;

  /**
   * @public {EventEmitter} emmit - Объект события.
   */
  emmit: EventEmitter;

  /**
   * @param {HTMLElement} container - Родительский элемент.
   * @param {EventEmitter} _emmit - Объект события.
   */
  constructor(container: HTMLElement, _emmit: EventEmitter) {
    super(container);
    this.emmit = _emmit;
    this.counterBasket = EnsureElement<HTMLElement>(
      '.basket__item-index',
      this.container
    );
    this.elementDeleteButton = EnsureElement<HTMLElement>(
      '.basket__item-delete',
      this.container
    );

    this.elementDeleteButton.addEventListener('click', () => {
      this.emmit.emit('clickdeletebutton', { id: this.elementId });
    });
  }

  /**
   * Установка количества.
   * @param {string} value
   */
  set counter(value: string) {
    this.counterBasket.textContent = value;
  }

  /**
   * Отрисовка карточки корзины.
   * @param {Partial<ICardBasket>} [data]
   * @returns {HTMLElement}
   */
  render(data?: Partial<ICardBasket>): HTMLElement {
    return super.render(data);
  }
}
