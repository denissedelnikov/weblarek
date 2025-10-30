import { MODAL_ACTIVE } from '../../main';
import { EnsureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';

/**
 * Интерфейс описания данных для Modal.
 * @interface
 * @property {HTMLElement} content - Контент модального окна.
 * @property {string} open - Класс, добавляемый при открытии.
 * @property {string} close - Класс, удаляемый при закрытии.
 */
interface IModal {
  content: HTMLElement;
  open: string;
  close: string;
}

/**
 * Класс Modal, расширяет базовый компонент для управления модальным окном.
 * @extends {Component<IModal>}
 */
export class Modal extends Component<IModal> {
  /**
   * Поле для контента
   * @type {HTMLElement}
   */
  elementContent: HTMLElement;

  /**
   * Кнопка для закрытия модального окна.
   * @type {HTMLButtonElement}
   */
  elementCloseButton: HTMLButtonElement;

  /**
   * Разметка модального окна
   * @type {HTMLElement}
   */
  elementModal: HTMLElement;

  /**
   * Объект EventEmitter для коммуникации.
   * @type {EventEmitter}
   */
  emmit: EventEmitter;

  /**
   * Конструктор класса Modal.
   * @param {HTMLElement} container - Контейнер модального окна.
   * @param {EventEmitter} _emmit - Объект для событий.
   */
  constructor(container: HTMLElement, _emmit: EventEmitter) {
    super(container);

    this.emmit = _emmit;
    this.elementModal = container;

    /**
     * Поле для контента
     */
    this.elementContent = EnsureElement<HTMLElement>(
      '.modal__content',
      this.container
    );

    /**
     * Кнопка закрытия
     */
    this.elementCloseButton = EnsureElement<HTMLButtonElement>(
      '.modal__close',
      this.container
    );

    /**
     * Обработка нажатия на кнопку закрытия.
     */
    this.elementCloseButton.addEventListener('click', () => {
      this.close = MODAL_ACTIVE;
    });

    /**
     * Обработка клика по фону модального окна (если клик вне контента модальное окно закроется).
     */
    this.elementModal.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target === this.container) {
        this.close = MODAL_ACTIVE;
      }
    });
  }

  /**
   * Установка содержимого модального окна.
   * @param {HTMLElement} value - Элемент, который будет вставлен в содержимое.
   */
  set content(value: HTMLElement) {
    this.elementContent.innerHTML = '';
    this.elementContent.appendChild(value);
  }

  /**
   * Открытие модального окна, добавление класса.
   * @param {string} value - Класс, добавляемый к контейнеру при открытии.
   */
  set open(value: string) {
    this.container.classList.add(value);
    document.body.style.overflow = 'hidden';
  }

  /**
   * Закрытие модального окна, удаление класса.
   * @param {string} value - Класс, удаляемый при закрытии.
   */
  set close(value: string) {
    this.container.classList.remove(value);
    document.body.style.overflow = '';
  }
}
