import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

interface IModal {
  content: HTMLElement;
  open: string;
  close:string;
}

export class Modal extends Component<IModal> {
  elementContent: HTMLElement;
  elementCloseButton: HTMLButtonElement;
  elementModal: HTMLElement
  emmiter:EventEmitter

  constructor(container: HTMLElement,_emmiter:EventEmitter) {
    super(container);
    
    this.emmiter = _emmiter
    this.elementModal = container
    this.elementContent = ensureElement<HTMLElement>(
      ".modal__content",
      this.container
    );
    this.elementCloseButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container
    );

    this.elementCloseButton.addEventListener('click',() => {
      this.container.classList.remove('modal_active')
    })

 
  }

  set content(value: HTMLElement) {
    this.elementContent.innerHTML = ''
    this.elementContent.appendChild(value);
  }

  set open(value: string) {
    this.container.classList.add(value)
  }

  set close(value:string) {
    this.container.classList.remove(value)
  }
  
  render(data?: Partial<IModal> | undefined): HTMLElement {
    return super.render(data)
  }
}