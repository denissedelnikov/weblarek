import './scss/styles.scss';
import { Product } from './components/models/product';
import { Basket } from './components/models/basket';
import { Buyer } from './components/models/buyer';
import { CommunicationLayer } from './components/models/CommunicationLayer';
import { Api } from './components/base/Api';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { EnsureElement, cloneTemplate } from './utils/utils';
import { Contacts, Order } from './components/view/Form';
import { Success } from './components/view/Success';
import { Modal } from './components/view/modal';
import { EventEmitter } from './components/base/Events';
import {
  CardBasket,
  CardCatalog,
  CardPreviw,
  ICardCatalog,
  ICarddPrview,
} from './components/view/Card';
import { Header } from './components/view/Header';
import { Catalog } from './components/view/Catalog';
import { BasketModal } from './components/view/BasketModal';

// Переменные сообшений
// Предмет без цены
const NON_PRICE = 'Бесценно';
// Валюта
const SINAPS = 'синапсов';
// Недоступно
const NOT_AVAILABLE = 'Недоступно';
// Удалить из корзины
const DELETE_BASKET = 'Удалить из корзины';
// Купить
const BUY = 'Купить';
// Способо оплаты не выбран
const CHOICE_PAYMENT = 'Способ оплаты не выбран';

// Класс для модального окна чтобы сделать его видимым
export const MODAL_ACTIVE = 'modal_active';

// Темплейт коталга
const catalogTemp = EnsureElement<HTMLTemplateElement>('.gallery');
// Темплейт для класса первью
const cardPreviwTemp = cloneTemplate<HTMLTemplateElement>('#card-preview');
// Темплейт модального окна
const modalTemp = EnsureElement<HTMLElement>('#modal-container');
// Получем размеку хедера
const headerTemp = EnsureElement<HTMLElement>('.header');
// Темплейт корзины
const basketModalTemp = cloneTemplate<HTMLTemplateElement>('#basket');
// Темлейт формы = Способ оплаты, адресс
const orderTemp = cloneTemplate('#order');
// Тепоейт формы = Емейл, телефон
const conactsTemp = cloneTemplate('#contacts');
// Шаблон модального окна оформленого заказаа
const successTemp = cloneTemplate<HTMLTemplateElement>('#success');

// Создаем экземпляр класса обработчика
export const eventEmitter = new EventEmitter();
// Создаем экземпляр класса моделии даннх продакт
const product = new Product(eventEmitter);
// Создаем экземпляр класса корзины
const basket = new Basket(eventEmitter);
// Создаем экземпляр класса каталога
const catalog = new Catalog(catalogTemp, eventEmitter);
// Создаем экземпляр класса APi
const api = new Api(API_URL);
//Создаем экземпляр класса комуникации
const communicationLayer = new CommunicationLayer(api);
//Создаем экземпляр класса подробного отображения
const cardPreview = new CardPreviw(cardPreviwTemp, eventEmitter);
// Класс модальнго окна
const modal = new Modal(modalTemp, eventEmitter);
// Создаем класс хедера
const header = new Header(headerTemp, eventEmitter);
// Класс отоображения товара в корзине
const basketModal = new BasketModal(basketModalTemp, eventEmitter);
// Класс формы = Способ оплаты, адресс
const order = new Order(orderTemp, eventEmitter);
//Класс формы = Емейл, телефон
const contacts = new Contacts(conactsTemp, eventEmitter);
// Класс хранения данных о покупателе
const buyer = new Buyer(eventEmitter);
// Класс оформленого заказа
const success = new Success(successTemp, eventEmitter);

// Получаем с сервера массив товаров
communicationLayer
  .fetchProducts()
  .then((result) => {
    product.setProduct(result.items);
  })
  .catch((error) => {
    console.error('Ошибка при получении товара', error);
  });

/**
 * Создает карточки для каталоге.
 * @param items - массив товаров.
 */
eventEmitter.on('create_cards_catalog', (products: ICardCatalog[]) => {
  const cardCatlogProduct = products.map((product) => {
    // Темплейт карточек каталога
    const cardTemplate = cloneTemplate<HTMLTemplateElement>('#card-catalog');
    // Классс карточек катадога
    const cardCatlog = new CardCatalog(cardTemplate, eventEmitter);
    // Утсанавливаем  цену
    if (!product.price) {
      product.price = NON_PRICE;
    } else {
      product.price += ` ${SINAPS}`;
    }
    // Утсанавливаем img
    product.image = CDN_URL + product.image;
    // Устанавливем селектор категории
    product.categorySelector = settings[product.category];
    // Возврашаем разметку карточек
    return cardCatlog.render(product);
  });

  catalog.renderCatalog = cardCatlogProduct;
});

/**
 * Обработка клика по карточкам.
 * @param id - id товара по котрому кликнули
 */
eventEmitter.on('card_click', (data: { id: string }) => {
  //Поиск по id
  const setProductId = product.getProductById(data.id);
  //Устанавливем найденый элемент в поле подробного осмторпа
  if (setProductId) product.setProductForDisplay(setProductId);
});

/**
 * Установлен предмет для подробного осмотра
 * @param data - Контент товара
 */
eventEmitter.on('card_preview', (data: ICarddPrview) => {
  // Создаем контент окна подробного осмотра
  if (data.price == NON_PRICE) {
    data.buttonText = NOT_AVAILABLE;
    data.buttonStatus = true;
  } else {
    data.buttonText = basket.getProductById(data.id) ? DELETE_BASKET : BUY;
    data.buttonStatus = false;
  }

  modal_content_render(cardPreview.render(data));
});

/**
 * Показываем модальное окно
 * @param data - Контент модального окна
 */
function modal_content_render(data: HTMLElement) {
  modal.render({ open: MODAL_ACTIVE, content: data });
}

/**
 * Клик по кнопке купить в окне подробного осмотра
 */
eventEmitter.on('click_button_previw', () => {
  const peoductPrview = product.getProductForDisplay();
  if (peoductPrview) {
    if (!basket.getProductById(peoductPrview.id)) {
      cardPreview.buttonText = DELETE_BASKET;
      basket.addProduct(peoductPrview);
    } else {
      cardPreview.buttonText = BUY;
      basket.deleteProduct(peoductPrview);
    }
  }
});

/**
 * Счетчик товаров в корзине
 */
eventEmitter.on('basket_counter', () => {
  header.counter = basket.calculatedProduct();
});

/**
 * Рендер окна корзины
 */
export function update_basket(id?: string) {
  if (id) {
    const product = basket.getProductById(id);
    if (product)
      // Удаляем
      basket.deleteProduct(product);
  }
  const allProduct = basket.getAllProduct();
  if (allProduct.length > 0) {
    modal_content_render(
      basketModal.render({
        list: allProduct.map(({ title, price, id }, index) => {
          // Темп карточки корзины
          const cardBasketTemp =
            cloneTemplate<HTMLTemplateElement>('#card-basket');
          const cardBasket = new CardBasket(cardBasketTemp, eventEmitter);
          return cardBasket.render({
            id,
            title,
            price,
            counter: String(index + 1),
          });
        }),
        priceCounter: basket.calculatedPrice() + ' синапсов',
        buttonStatus: false,
      })
    );
  } else {
    modal_content_render(
      basketModal.render({
        priceCounter: '0 синапсов',
        buttonStatus: true,
        list: [],
      })
    );
  }
}

/** Клк по кнопке оформления заказа */
eventEmitter.on('click_basket_buy', () => {
  modal_content_render(order.render());
});

/**
 * Обновились данные платежного метода
 * @param {name: card | cash} - Способ оплаты
 */
eventEmitter.on('payment_method', (data: { name: 'cash' | 'card' }) => {
  // Добовляем класс для отображения рамки у выбраного метода оплаты
  order.render({ [data.name]: 'button_alt-active' });
  // Устанавливаем способ оплаты класс Buyer
  buyer.setPayment(data.name);
});

/**
 * Обновились данные адресса
 * @param {address: string} - Адресс введеный пользователем
 */
eventEmitter.on('address', (data: { address: string }) => {
  // Устанавливаем адресс в класс Buyer
  buyer.setAddress(data.address);
});

/**
 * Проверяем  на валидность поля формы - ордер
 * @param {payment: string, address: string} - Данные котрые ввел пользователь
 */
eventEmitter.on(
  'update_order',
  (data: { payment: string; address: string }) => {
    const error = data.payment ? data.address : CHOICE_PAYMENT;
    const buttonStatus = error ? true : false;

    order.render({ error, buttonStatus });
  }
);

/**
 * Клик по кнопке далее формы-ордер
 */
eventEmitter.on('click_button_order', () => {
  modal_content_render(contacts.render());
});

/**
 * Обновление данных email
 * @param {email: string}
 */
eventEmitter.on('email', (data: { email: string }) => {
  // Устанавливаем емейл в класс
  buyer.setEmail(data.email);
});

/**
 * Обновление данных телефона
 * @param {phone: string}
 */
eventEmitter.on('phone', (data: { phone: string }) => {
  // Устанавливаем телефон в класс
  buyer.setPhone(data.phone);
});

/**
 * Проверяем на валидность поля формы - контакты
 * @param {email: string; phone: string} -  Данные котрые ввел пользователь
 */
eventEmitter.on('update_contacts', (data: { email: string; phone: string }) => {
  const error = data.email || data.phone;
  const buttonStatus = error ? true : false;

  contacts.render({ error, buttonStatus });
});

/**
 * Клик по кнопке отправкм формы-контакты
 */
eventEmitter.on('click_button_contacts', () => {
  const items = basket.getAllProduct().map((item) => item.id);
  const total = basket.calculatedPrice();
  const buyerInfo = buyer.getBuyerData();

  communicationLayer
    .sendOrder({ ...buyerInfo, items, total })
    .then((result) => {
      // Передаем в отображении модального окна рендер success
      modal_content_render(
        success.render({ price: `Списано ${result.total} синапсов` })
      );
      basket.clear();
      buyer.clearBuyerData();
    })
    .catch((error) => {
      console.error('Ошибка при отправке запроса', error);
    });
});

/**
 * Обработка возврата к каталогу.
 */
eventEmitter.on('success_click', () => {
  modal.close = MODAL_ACTIVE;
});
