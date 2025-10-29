import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

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
  emmiter: EventEmitter;

  /**
   * Конструктор класса Modal.
   * @param {HTMLElement} container - Контейнер модального окна.
   * @param {EventEmitter} _emmiter - Объект для событий.
   */
  constructor(container: HTMLElement, _emmiter: EventEmitter) {
    super(container);

    this.emmiter = _emmiter;
    this.elementModal = container;

    /**
     * Поле для контента
     */
    this.elementContent = ensureElement<HTMLElement>(
      ".modal__content",
      this.container
    );

    /**
     * Кнопка закрытия
     */
    this.elementCloseButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container
    );

    /**
     * Обработка нажатия на кнопку закрытия.
     */
    this.elementCloseButton.addEventListener("click", () => {
      this.close = 'modal_active'
    });

    /**
     * Обработка клика по фону модального окна (если клик вне контента модальное окно закроется).
     */
    this.elementModal.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target === this.container) {
        this.close = 'modal_active'
      }
    });
  }

  /**
   * Установка содержимого модального окна.
   * @param {HTMLElement} value - Элемент, который будет вставлен в содержимое.
   */
  set content(value: HTMLElement) {
    this.elementContent.innerHTML = "";
    this.elementContent.appendChild(value);
  }

  /**
   * Открытие модального окна, добавление класса.
   * @param {string} value - Класс, добавляемый к контейнеру при открытии.
   */
  set open(value: string) {
    this.container.classList.add(value);
    document.body.style.overflow = "hidden";
  }

  /**
   * Закрытие модального окна, удаление класса.
   * @param {string} value - Класс, удаляемый при закрытии.
   */
  set close(value: string) {
    this.container.classList.remove(value);
    document.body.style.overflow = "";
  }

}
