import { Component } from "./components/base/Component";
import { EventEmitter } from "./components/base/Events";
import { eventEmitter, ICard, ICardBasket, ICarddPrview } from "./main";
import { ensureElement } from "./utils/utils";


export class Card extends Component<ICard> {
  protected elementCategory!: HTMLElement;
  protected elementTitle!: HTMLElement;
  protected elementImage!: HTMLImageElement;
  protected elementPrice!: HTMLElement;

  constructor(container: HTMLButtonElement | HTMLElement) {
    super(container);

    this.initElements()
  }

  protected initElements()  {
      this.elementTitle = ensureElement<HTMLElement>(
      ".card__title",
      this.container
    ) 
    this.elementCategory = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    )
    this.elementImage = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    )  
    this.elementPrice = ensureElement<HTMLElement>(
      ".card__price",
      this.container
    ) 
  }

  set category(value: string) {
    this.elementCategory.textContent = value;
  }

  set title(value: string) {
    this.elementTitle.textContent = value;
  }

  set image(value: string) {
    super.setImage(this.elementImage, value);
  }

  set price(value: string) {
    this.elementPrice.textContent = value;
  }

  set id(value: string) {
    this.container.dataset.id = value
  }


}

export class CardCatalog extends Card {
  protected elementButton: HTMLElement;
  protected emmiter:EventEmitter
  constructor(conteiner: HTMLElement,_emmiter: EventEmitter) {
    super(conteiner);

      this.elementButton = conteiner;
      this.emmiter = _emmiter
  }

  
  set category(value: string) {
    super.category = value;
  }
  set title(value: string) {
    super.title = value;
  }

  set image(value: string) {
    super.setImage(this.elementImage, value);
  }

  set price(value: string) {
    super.price = value;
  }



  render(data?: Partial<ICard> | undefined): HTMLElement {
    const element =  super.render(data) 
    
    element.addEventListener('click', () =>{
      this.emmiter.emit('card_click', {id: data?.id})
    } )

    return element
  }

  
}

export class CardPreviw extends Card {
  elementText: HTMLElement;
  elementButtonPreviw: HTMLButtonElement;
  protected emmiter:EventEmitter

  constructor(container: HTMLElement, _emmiter: EventEmitter) {
    super(container);

    this.emmiter = _emmiter
    this.elementButtonPreviw = ensureElement<HTMLButtonElement>(".card__button", this.container);
    this.elementText = ensureElement<HTMLElement>(
      ".card__text",
      this.container
    );

    this.elementButtonPreviw.addEventListener('click', (e) => {
     this.emmiter.emit('click_button_previw',e)
    })
  }

  set category(value: string) {
    super.category = value;
  }
  set title(value: string) {
    super.title = value;
  }

  set image(value: string) {
    super.setImage(this.elementImage, value);
  }

  set price(value: string) {
    super.price = value;
  }

  set description(value: string) {
    this.elementText.textContent = value;
  }

  set buttonText(value: string) {
    this.elementButtonPreviw.textContent = value
  }
  
  set buttonStatus(value: boolean) {
    this.elementButtonPreviw.disabled = value
  }

  render(data?: Partial<ICarddPrview> | undefined): HTMLElement {
    if (!data) {return this.container}
    const cardPreviewRender = super.render(data)
    this.emmiter.emit('modal_content_render', cardPreviewRender)
    return cardPreviewRender
  }
}

export class CardBasket extends Card  {
  counterBasket:HTMLElement
  elementDeleteButton: HTMLElement;
  emmit: EventEmitter

  constructor(container: HTMLElement, _emmit:EventEmitter) {
  
    super(container);

    
    this.emmit = _emmit
    this.counterBasket = ensureElement<HTMLElement>('.basket__item-index',this.container)
    this.elementDeleteButton = ensureElement<HTMLElement>(
      ".basket__item-delete",
      this.container
    );

    this.elementDeleteButton.addEventListener('click', (e:Event) => {
      this.emmit.emit('card_delete_basket',e)
    })
  }

 protected initElements()  {
      this.elementTitle = ensureElement<HTMLElement>(
      ".card__title",
      this.container
    ) 

    this.elementPrice = ensureElement<HTMLElement>(
      ".card__price",
      this.container
    ) 
  }
  
  set id (value: string) {
    super.id = value
  }

  set price(value: string) {
    super.price = value;
  }

  set title(value: string) {
    super.title = value;
  }

  set counter(value:string) {
    this.counterBasket.textContent = value
  }

  render(data?: Partial<ICardBasket> | undefined): HTMLElement {
    return super.render(data)
  }
}

