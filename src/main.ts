import "./scss/styles.scss";
import { Product } from "./components/models/product";
import { apiProducts } from "./utils/data";
import { Basket } from "./components/models/basket";
import { Buyer } from "./components/models/buyer";
import { CommunicationLayer } from "./components/models/CommunicationLayer";
import { Api } from "./components/base/Api";
import { API_URL, CDN_URL } from "./utils/constants";
import { ensureElement, cloneTemplate, ensureAllElements } from "./utils/utils";
import { Contacts, Order } from "./components/view/Form";
import { Success } from "./components/view/Success";
import { Modal } from "./components/view/modal";
import { EventEmitter } from "./components/base/Events";
import { Card, CardBasket, CardCatalog, CardPreviw } from "./Card";
import { Header } from "./components/view/Header";
import { Catalog } from "./components/view/Catalog";
import { IProduct, TPpayment } from "./types";
import { BasketModal, IBasketModal } from "./components/view/BasketModal";

export interface IHeader {
  counter: number;
}
// const header = new Header(ensureElement<HTMLElement>('.header'))

export interface ICard extends ICardBasket {
  category: string;
  image: string;
  id: string;
}

export interface ICardBasket {
  id: string;
  counter?: string;
  title: string;
  price: string | undefined;
}

export interface ICarddPrview extends ICard {
  description: string;
  buttonText: string;
  buttonStatus: boolean;
}

// Иниициализация каталога
// Создаем обработчик
export const eventEmitter = new EventEmitter();
// Создаем экземпляр класса  моделии даннх продакт
const product = new Product(eventEmitter);
// Класс корзины
const basket = new Basket(eventEmitter);
// Темплейт каталга
const catalogTemp = ensureElement<HTMLTemplateElement>(".gallery");
// Класс каталога
const catalog = new Catalog(catalogTemp, eventEmitter);
const api = new Api(API_URL);
//Создаем экземпляр класса комуникации
const communicationLayer = new CommunicationLayer(api);
// Получаем с сервера массив товаров
communicationLayer.fetchProducts().then((result) => {
  product.setProduct(result.items);
});

eventEmitter.on("create_cards_catalog", (products: ICard[]) => {
  const cardCatlogProduct = products.map((product) => {
    // Темплейт карточек каталога
    const cardTemplate = cloneTemplate<HTMLTemplateElement>("#card-catalog");
    // Классс карточек катадога
    const cardCatlog = new CardCatalog(cardTemplate, eventEmitter);
    // Утсанавливаем коректно картинку и цену
    if (!product.price) {
      product.price = "Бесценно";
    } else {
      product.price += " синапсов";
    }
    product.image = CDN_URL + product.image;
    // Возврашаем разметку карточек
    return cardCatlog.render(product);
  });

  catalog.renderCatalog = cardCatlogProduct;
});

// Клик по карточке
eventEmitter.on("card_click", (target: { id: string }) => {
  // Поиск по id
  const setProductId = product.getProductById(target.id);
  // Устанавливем найденый оэлемент в поле подробного осмторпа
  if (setProductId) product.setProductForDisplay(setProductId);
});

// Темплейт для класса первью
const cardPreviwTemp = cloneTemplate<HTMLTemplateElement>("#card-preview");
// Класс кардпревью
const cardPreview = new CardPreviw(cardPreviwTemp, eventEmitter);
// Темплейт модального окна
const modalTemp = ensureElement<HTMLElement>("#modal-container");
// Класс модальнго окна
const modal = new Modal(modalTemp, eventEmitter);

// Установлен предмет для подробного осмотра
eventEmitter.on("card_preview", (data: ICarddPrview) => {
  // Создаем контент окна подробного осмотра

  if (data.price == "Бесценно") {
    data.buttonText = "Недоступно";
    data.buttonStatus = true;
  } else {
    data.buttonText = basket.getProductById(data.id)
      ? "Удалить из корзины"
      : "Купить";
    data.buttonStatus = false;
  }

  cardPreview.render(data);
});

// Показываем модальное окно
eventEmitter.on("modal_content_render", (data: HTMLElement) => {
  modal.render({ open: "modal_active", content: data });
});

// Клик по кнопке купить в модальном окне !!!!!
eventEmitter.on("click_button_previw", (e: Event) => {
  const peoductPrview = product.getProductForDisplay();
  if (peoductPrview) {
    if (!basket.getProductById(peoductPrview.id)) {
      cardPreview.buttonText = "Удалить из корзины";
      basket.addProduct(peoductPrview);
    } else {
      cardPreview.buttonText = "Купить";
      basket.deleteProduct(peoductPrview);
    }
  }
});

// Получем размеку хедера
const headerTemp = ensureElement<HTMLElement>(".header");
// Создаем класс хедера
const header = new Header(headerTemp, eventEmitter);

// Счетчик на кнопке корзины
eventEmitter.on("basket_counter", () => {
  header.counter = basket.calculatedProduct();
});

// Темплейт
const basketModalTemp = cloneTemplate<HTMLTemplateElement>("#basket");
// Класс корзинф
const basketModal = new BasketModal(basketModalTemp, eventEmitter);
// Клик по иконке корзины
eventEmitter.on("update_basket", () => {
  const allProduct = basket.getAllProduct();
  if (allProduct.length > 0) {
    eventEmitter.emit(
      "basket_render",
      basketModal.render({
        list: allProduct.map(({ title, price, id }, index) => {
          // Темп карточки корзины
          const cardBasketTemp =
            cloneTemplate<HTMLTemplateElement>("#card-basket");
          const cardBasket = new CardBasket(cardBasketTemp, eventEmitter);
          return cardBasket.render({
            id,
            title,
            price,
            counter: String(index + 1),
          });
        }),
        priceCounter: basket.calculatedPrice() + " синапсов",
        buttonStatus: false,
      })
    );
  } else {
    eventEmitter.emit(
      "basket_render",
      basketModal.render({
        priceCounter: "0 синапсов",
        buttonStatus: true,
        list: [],
      })
    );
  }
});

eventEmitter.on("basket_render", (data: HTMLElement) => {
  // ПЕредаем  в рендер модалного окна
  eventEmitter.emit("modal_content_render", data);
});

eventEmitter.on("card_delete_basket", (data: Event) => {
  const target = data.target as HTMLElement;
  // Родительский блок карточки берем его id
  const id = target.parentElement?.dataset.id;
  // Поиск по id в корзие
  if (id) {
    // Найденый элемент
    const product = basket.getProductById(id);
    if (product)
      // Удаляем
      basket.deleteProduct(product);
  }

  // Обновляем отображение всего баскета
  eventEmitter.emit("update_basket");
});

// Темлейт формы = Способ оплаты, адресс
const orderTemp = cloneTemplate("#order");
// Тепоейт формы = Емейл, телефон
const conactsTemp = cloneTemplate("#contacts");

const order = new Order(orderTemp, eventEmitter);
const contacts = new Contacts(conactsTemp, eventEmitter);

const buyer = new Buyer(eventEmitter);

eventEmitter.on("click_basket_buy", () => {
  eventEmitter.emit("modal_content_render", order.render());
});

eventEmitter.on("payment_method", (data: { name: "cash" | "card" }) => {
  // Добовляем класс для добовл.рамки у выбраного метода оплаты
  order.render({ [data.name]: "button_alt-active" });

  // Устанавливаем способ оплаты класс Buyer
  buyer.setPayment(data.name);
});

eventEmitter.on("address", (data: { address: string }) => {
  // Устанавливаем адресс в класс Buyer
  buyer.setAddress(data.address);
});

// Проверяем  на валидность поля ордера
eventEmitter.on(
  "update_order",
  (data:{ payment: string,
    address: string}) => {
      const error = data.payment || data.address
      const buttonStatus = error ? true: false

      order.render({error,buttonStatus})
});

// Клик  по кнопке далее ордер
eventEmitter.on('click_button_order',()=> {
   eventEmitter.emit("modal_content_render", contacts.render())
})


eventEmitter.on("email", (data: { email: string }) => {
  // Устанавливаем емейл
  buyer.setEmail(data.email);
    console.log(data,buyer.getBuyerData(),'email')
});

eventEmitter.on("phone", (data: { phone: string }) => {
  // Устанавливаем телефон в класс 
  buyer.setPhone(data.phone);
  console.log(data,buyer.getBuyerData(),'phone')
});

// Проверяем на валидность поля контактс
eventEmitter.on(
  'update_contacts',
  (data:{ email: string,phone: string }) => {
   const error = data.email || data.phone
    const buttonStatus = error ? true: false

    contacts.render({error,buttonStatus})
  }
);

// Шаблон модального окна оформленого заказаа
const successTemp = cloneTemplate<HTMLTemplateElement>('#success')
// Каласс оформленого заказа

const success = new Success(successTemp,eventEmitter)

eventEmitter.on('click_button_contacts',()=> {
   eventEmitter.emit("modal_content_render", success.render({price: `${basket.calculatedPrice()} синапсов`}))
})


eventEmitter.on('success_click', () => {
  basket.clear()
  buyer.clearBuyerData()
  modal.close = 'modal_active'
})