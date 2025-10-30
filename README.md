# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Интернет-магазин «Web-Larёk»

«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component

Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`

#### Класс Api

Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter

Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` - хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

### Данные

В ходе анализа проекта было установлено: в приложении используются две сущности, которые описывают данные, — товар и покупатель. Их можно описать такими интерфейсами:

Товар:
interface `IProduct `{
`id: string;` - Уникальное значение для каждого товара
`description: string;` Описание
`image: string;` - Фото
`title: string; ` - Название
`category: string;` - Категория
`price: number | null;` - Цена
}

Покупатель:
interface `IBuyer` {
`payment: string;` - Способ оплаты выбраный покупателем
`email: string;` - email  
`phone: string;` - телефон
`address: string;` - Доммашний адресс
}

Тип обьекта получаемого с сервера:
type getServerIProduct = {
`items: IProduct[];` - Массив обьектов:IPoduct полученых с сервера
`total: number;` - Количество обьектов в поле items
};

Тип обьекта отправляемого на сервер:
export interface postServerIBuyer extends IBuyer {
`Все поля IBuyer,`
`items: IProduct[];` - Массив обьектов:IProduct выбраных пользователем
}

### Модели данных

#### Класс Basket

Класс для хранения информации о товарах находяхся в корзине т.е выбраных пользователем для покупки

Поля класса:
`basketProduct: IProduct[] = []` - Массив товаров нахояшихся в корзине

Методы класса:
`addProduct (IProduct)` - Метод для добовления товара в массив корзины basketProduct
`getAllProduct() ` - Метод возвращает массив basketProduct, все товары находяшиеся в корзине
`clear()` - Метод очистки массива коризны basketProduct
`calculatedPrice()` - Рассчет общей стоимости товаров находяшихся в корзине. Метод вернет сумму
`calculatedProduct()` - Рассчет количества товаров находяшихся в корзине. Метод вернет сумму
`getProductById(id - строка с уникальных значением товара) ` - Поиск товара с id == строке преданой в параметр метода
`deleteProduct(IProduct) `- Удалить товар переденый в параметр метода из массива товаров

#### Класс Buyer

Класс для хранения данных которые необходимо ввести пользователю при покупке

Поля класса:
buyerData: Обьект с сохранеными данными пользователя = {
`payment: string` - Способ оплаты,
`email: string `- Email,
`phone: string` - Телефон,
`address: string `- Домашний адресс,
}

Методы класса:
`setPayment(payment: string)` - Сохранить метод оплаты котрый выбрал пользователь в поле класса - (buyerData.payment)
`setEmail(string)`- Сохранить email котрый ввел пользователь в поле класса - (buyerData.email)
`setPhone(string)` - Сохранить телефон котрый указал пользователь в поле класса - (buyerData.phone)
`setAddress(string)` - Сохранить адресс котрый ввел пользователь в поле класса - (buyerData.address)
`getBuyerData()` Вернуть поле класса - (buyerData: IBuyer) со всеми данными о пользователе
`clearBuyerData() `Очистить поле класса - (buyerData: IBuyer) со всеми данными о пользователе
`validate()` - Валидация сохранных данных о пользователе в поле класса - (buyerData: IBuyer). Если какое то поле не прошло валидацию в соответсвующем поле будет указана ошибка.

#### Класс Product

Класс для того чтобы хранить или получать информацию о товарах в каталоге и для модального окна подробного осмотра.

Полz класса:
`AllProduct:` - Поле для хранения массива обьектов:IProduct переданых в парметр метода
`setProductDisplay:` - Поле храения товара (обекта:IProduct) для подробного просмотра или ничего

Методы класса:
`setProduct(arrayProduct: IProduct[])`- Сохраняет переданный массив обьектов:IProduct в поле AllProduct
`getProduct()` - Вернет массив обьектов:IProduct из поля AllProduct
`getProductById(id - строка с уникальных значением товара)` - Вернет обьект:IProduct с id == строке переданой в праметрах метода
`setProductForDisplay(IProduct)`- Сохраняем переданый в праметрах метода обьект:IProduct для подробного просмотра в поле класса setProductDisplay  
`getProductForDisplay()` - Получить товар (обьект: IProduct) для подробного просмотра из поля setProductDisplay, если ничего не сохранено undefined

### Слой коммуникации

#### Класс CommunicationLayer

Класс CommunicationLayer реализует коммуникационный слой приложения. Его задача — осуществлять HTTP-запросы к API сервера через объект api, инкапсулируя детали общения с сервером: Получать данные товаров через GET-запрос и Отправлять данные заказа через POST-запрос

Конструктор:
`constructor(api: IApi - экземпляр интерфейса, реализующего методы HTTP-запросов (get и post)) `- Инициализирует поле api объекта, обеспечивая доступ к методам коммуникации с сервером

Поля класса:
`api: IApi ` - Хранит объект для выполнения HTTP-запросов (методы get и post)

Методы класса:
`async fetchProducts()` - Dыполняет GET-запрос на эндпоинт /product/ для получения списка товаров с сервера. Возвращает: Promise<getServerIProduct>
`async sendOrder(обьект: postServerIBuyer - содержащий информацию о покупателе и выбранных товарах.)` - выполняет POST-запрос на эндпоинт /order/, отправляя данные заказа на сервер

### Слой отображения

#### Класс Header

Класс Header, предназначен для отображения шапки сайта

Поля класса:
@type {HTMLElement} counterElement: HTMLElement; - Элемент, отображающий количество товаров в корзине.
@type {HTMLButtonElement} basketButton: HTMLButtonElement; - Кнопка для открытия корзины.
@type {EventEmitter}emmiter: EventEmitter; - Объект для событий

Конструктор:  
 `constructor(conteiner: HTMLElement - - Родительский элемент, \_emmiter: EventEmitter - Объект события)` {
this.counterElement = ensureElement<HTMLElement>(
".header**basket-counter",
this.container
) - `Поиск поля для счетиув элементов корзины`
this.basketButton = ensureElement<HTMLButtonElement>(
".header**basket",
this.container
); - `Кнопка отркытия корзины`

this.basketButton.addEventListener("click", () => {
this.emmiter.emit("updatebasket");
}); - `Обработка события клика на кнопку корзины.`

Методы класса:
Счетчик количества товаров в корзине. - `set counter(value: number) `

#### Класс Catalog

Класс Catalog отображает все доступные товары

Поля класса:
`@type {HTMLElement} gallery `- Поле для хранения блока каталога
`@type {EventEmitter} emmit` - Обработчик событий

Конструктор:
`constructor(container: HTMLElement - Родительский элемент, \_emmit: EventEmitter - Обработчик собыий)`

Методый класса:
Показать отрендерные карточки товара в каталоге - `set renderCatalog(cardsPrepared: HTMLElement[])`

#### Класс BasketModal

Класс BasketModal - Класс для отображения элементов находяшихся в корзине

Поля класса:
`@type {HTMLButtonElement} elementButton` - Кнопка перехода к оформлению заказа
`@type {HTMLSpanElement} elementPriceCounter` - Поле для хранения общей стоимости всех предметов в корзине
`@type {HTMLElement} elementBasketList` - Поле для отображения карточек предметовов \/
`@type {EventEmitter} emmit` - Обработчик событий

Конструктор:
`constructor(container: HTMLElement - Родительский элемент, \_emmit: EventEmitter - Обработчик собыий)`

this.elementButton.addEventListener("click", () => {
this.emmit.emit("clickbasketbuy")}) - ` Обработка клика по кнопке`

Методый класса:
Сделать доступной или недоступной кнопку - `set buttonStatus(value - tru - Отключить | false - Включить) `
Расчитать общую стоимость всех предметов в корзине - `set priceCounter(value: string)`
Метод для вставки карточек - `set list(value: HTMLElement[])`

#### Класс Modal

Класс Modal, расширяет базовый компонент для управления модальным окном.

Поля класса:
@type {HTMLElement} elementContent: HTMLElement; -` Поле для контента`
@type {HTMLButtonElement} elementCloseButton: HTMLButtonElement; -`Кнопка для закрытия модального окна.`
@type {HTMLElement} elementModal: HTMLElement - `Разметка модального окна`
@type {EventEmitter} emmiter: EventEmitter; - `Объект EventEmitter для коммуникации`

Конструктор:  
 `constructor(conteiner: HTMLElement - - Родительский элемент, \_emmiter: EventEmitter - Объект события)`
this.elementContent = ensureElement<HTMLElement>(
".modal\_\_content",
this.container
) -`Поиск поля для размешения контента`

this.elementCloseButton = ensureElement<HTMLButtonElement>(
".modal\_\_close",
this.container
); - `Кнопка закрытия модального окна`

this.elementCloseButton.addEventListener("click", () => {
this.close = ("modal_active");
}); - `Обработка нажатия на кнопку закрытия.`

`Клик вне контента закрывает модальное окно. Ожидание клика`
this.elementModal.addEventListener("click", (e) => {
const target = e.target as HTMLElement;
if (target === this.container) {
this.close = ("modal_active");
}
});

Методы класса:
Установка содержимого модального окна - `set content(value: HTMLElement - Элемент, который будет вставлен в содержимое) `
Открытие модального окна, добавление класса - `set open(value: Класс, добавляемый к контейнеру при открыти) `
Закрытие модального окна, удаление класса - `set close(value - Класс, удаляемый при закрытии) `

#### Карточки товара - Класс Card

Общий класс карточек товара

Поля класса:
`@protected {HTMLElement} elementTitle `- HTML элемент заголовка.
`@protected {HTMLElement} elementPrice` - HTML элемент отображения цены.
`@protected {string} protected elementId: string = '' `- id товара

Конструктор:
`constructor(container: HTMLElement - Родительский элемент)`

this.elementTitle = ensureElement<HTMLElement>(
".card\_\_title",
this.container
) - `Находим HTML элемент заголовка`

this.elementPrice = ensureElement<HTMLElement>(
".card\_\_price",
this.container
) - `Находим HTML элемент отображения цены`

Методы класса:
Установка заголовка - `set title(value: string)`
Установка цены - `set price(value: string)`
Установка ID карточки - `set id(value: string) `

#### Карточки товара - Класс CardCatalog

Класс отображения карточек каталога

Поля класса:
`@protected {HTMLElement} elementCategory `- Поле для категории товара .
`@protected {HTMLElement} elementButton` - Поля для карточки - кнопки
`@protected {HTMLImageElement} elementImage` - Поле для элемента изаброжения
`@protected {EventEmitter} emmiter` - Объект-обработчик события.

Конструтор:
`constructor(conteiner: HTMLElement - - Родительский элемент, \_emmiter: EventEmitter - Объект события)`
this.elementCategory = ensureElement<HTMLElement>(
".card\_\_category",
this.container
); - `Находим поле для отображения категории`

this.elementImage = ensureElement<HTMLImageElement>(
".card\_\_ima
this.container
); - `Находим поле для отображения`

this.container.addEventListener('click', () => {
this.emmiter.emit('cardclick', { id: this.elementId });
}); - `Событие клика по карточке`

Методы класса:
Установка категории. - `set category(value: string)`
Переопределить загаловок - `set title(value: string) `
Установка изображения. - `set image(value: string) `
Установка цены. - `set price(value: string)`
`Отрисовка карточки и добавление обработчика клика. -`

##### Карточки товара - Класс CardPreviw

Класс для отобраения элемента выбраного для подробного осмотра

Поля класса
@public {HTMLElement} elementText - `Элемент текста.`
@public {HTMLElement} elementCategory - `Элемент категории`
@protected {HTMLImageElement} elementImage - `Элемент изображения.`
@public {HTMLButtonElement} elementButtonPreviw - `Кнопка превью.`
@protected {EventEmitter} emmiter - `Объект события.`

Конструктор:
`constructor(conteiner: HTMLElement - - Родительский элемент, \_emmiter: EventEmitter - Объект события)`
this.elementButtonPreviw = ensureElement<HTMLButtonElement>(
".card\_\_button",
this.container
); - Находим кнопк

this.elementText = ensureElement<HTMLElement>(
".card\_\_text",
this.container
); - `Находим поле для отображения опсания товара`

this.elementCategory = ensureElement<HTMLElement>(
".card\_\_category",
this.container
); - `Находим поле для отображения категори товар `

this.elementImage = ensureElement<HTMLImageElement>(
".card\_\_image",
this.container
); - `Находим поле для отображения изаброжения товара `

this.elementButtonPreviw.addEventListener("click", () => {
this.emmiter.emit("clickbuttonpreviw");
}); - `Ожидаем клик по кнопке`

Методы класса:
Установка категории. - `set category(value: string) `
Установка заголовка - `set title(value: string) `
Установка изображения - `set image(value: string)`
Установка цены - `set price(value: string)`
Установка описания.- `set description(value: string)`
Установка текста кнопки. - `set buttonText(value: string)`
Установка статуса кнопки. - `set buttonStatus(value: boolean)`

`Рендер карточки товара для подробного осмотра`
render(data?: Partial<ICarddPrview>) {
if (!data) return this.container;
return cardPreviewRender = super.render(data)
}

##### Карточки товара - Класс CardBasket

Класс CardBasket - рендер карточки товара для отображения в корзине

Поля класса:
@public {HTMLElement} counterBasket - `Поле для отображения количества товара в корзине`
@public {HTMLElement} elementDeleteButton - `Элемент кнопки удаления`
@public {EventEmitter} emmit - `Объект события.`

Конструктор:
`constructor(conteiner: HTMLElement - - Родительский элемент, \_emmiter: EventEmitter - Объект события)`
this.counterBasket = ensureElement<HTMLElement>(
".basket\_\_item-index",
this.container
); - `Поиск поля счетчика товаров`

this.elementDeleteButton = ensureElement<HTMLElement>(
".basket\_\_item-delete",
this.container
) - `Поиск кнопки удаления`

this.elementDeleteButton.addEventListener("click", () => {
this.emmit.emit("card_delete_basket", {id: this.elementId });
}) -`Поиск кнопки удаления товара из корзины`

Методы класса:
Установка ID. - `set id(value: string)`
Установка цены. - `set price(value: string)`
Установка заголовка. - `set title(value: string)`
Установка количества - `set counter(value: string)`

`Отрисовка карточки корзины. - `
render(data?: Partial<ICardBasket>): HTMLElement {
return super.render(data);
}

#### Формы - Класс Form

class Form - Обший класс для форм

Поля класса:
`@type {HTMLButtonElement} elementSubmitButton` - Кнопка для подтверждения данных введенных в формах
`@type {HTMLSpanElement} elementError -` Поле для отображения ошибки /

Конструктор:
`constructor(container: HTMLElement - Родительский элемент)`

this.elementSubmitButton = ensureElement<HTMLButtonElement>(
".modal\_\_actions > .button",
this.container
);` -  Находим кнопку подтверждения`

this.elementError = ensureElement<HTMLSpanElement>(
".form\_\_errors",
this.container
); `- Находим поле для отображения ошибки`

Методы класса:
Устанавливает статус активности кнопки. - `set buttonStatus(value - Если true, кнопка станет заблокирована.)`
Устанавливает сообщение ошибки. - `set error(message - Текст ошибки)`

#### Формы - Класс Order

Класс Order - Форма для выбора способа оплаты и адреса доставки

Поля класса:
`@type {HTMLButtonElement} elmentPaymentCard` - Кнопка выбора оплаты картой.
`@type {HTMLButtonElement} elmentPaymentCash` - Кнопка выбора оплаты наличными.
`@type {HTMLInputElement} elementInputAddress`- Поле ввода адреса
`@type {EventEmitter} emmit` - Объект для событий.

Конструктор:
`constructor(container: HTMLElement - Родительский элемент, \_emmit: EventEmitter - Обработчик собыий)`

this.elmentPaymentCard = ensureElement<HTMLButtonElement>(
`[name="card"]`,
this.container
); `- Поле для выбора способа оплаты картой`

this.elmentPaymentCash = ensureElement<HTMLButtonElement>(
`[name="cash"]`,
this.container
) `- Поле для выбора способа оплаты наличными`

this.elementInputAddress = ensureElement<HTMLInputElement>(
`[name="address"]`,
this.container
) `- Поле для ввода адресса`

`Обработка выбора платёжного метода - ожидание клика по 1 из вариантов`
[this.elmentPaymentCard, this.elmentPaymentCash].forEach((item) => {
item.addEventListener("click", (e) => {
const target = e.target as HTMLElement;z
this.emmit.emit("paymentmethod", {
name: target.getAttribute("name"),});});});

`Обработка изменения адреса, ожидание ввода`
this.elementInputAddress.addEventListener("change", (e: Event) => {
const target = e.target as HTMLInputElement;
const value = { address: target.value };
this.emmit.emit("address", value);
});

`Обработка отправки формы заказа, стандарное поведение бразуера отключено`
this.container.addEventListener("submit", (e) => {
e.preventDefault();
this.emmit.emit("clickbuttonorder");
});

Методы класса:
Рамка для выбраного поля способа оплаты - `set card(value: string) | set cash(value: string)`
Устанавливает сообщение об ошибке. - `set error(value: string)`
Устанавливает статус кнопки -`set buttonStatus(value: boolean)`

#### Формы - Класс Contacts

Класс Contacts - Форма для ввода телефона и email

Поля класса:
`@type {HTMLInputElement} elmentInputEmail` - Поле для ввода email.
`@type {HTMLInputElement} elmentInputPhone` - Поле для ввода телефона
`@type {EventEmitter} emmit` - Объект для событий.

Конструктор:
`constructor(container: HTMLElement - Родительский элемент, \_emmit: EventEmitter - Обработчик собыий)`

this.elmentInputEmail = ensureElement<HTMLInputElement>(
`[name="email"]`,
this.container
); - `Находим поле ввода email`

this.elementInputPhone = ensureElement<HTMLInputElement>(
`[name="phone"]`,
this.container
); - `Находим поле ввода номера теоефона`,

`Обработка изменения email - `
this.elmentInputEmail.addEventListener("change", (e: Event) => {
const target = e.target as HTMLInputElement;
const value = { email: target.value };
this.emmit.emit("email", value);
});

`Обработка изменения телефона - `
this.elementInputPhone.addEventListener("change", (e: Event) => {
const target = e.target as HTMLInputElement;
const value = { phone: target.value };
this.emmit.emit("phone", value);
});

`Обработка отправки формы и отклбчение станлартного поведения браузера -`
this.container.addEventListener("submit", (e) => {
e.preventDefault();
this.emmit.emit("clickbuttoncontacts");
});

Метода класса:
`set error(value: string - Текст ошибки)` - Устанавливает сообщение об ошибке.
`set buttonStatus(value: boolean - true - отключение)` - Устанавливает видимость кнопки.

#### Класс Success

Класс Success - отображает успешный заказ.

Поля класса:
`@type {HTMLElement} elementSellCounter `- Элемент, отображающий описание (например, количество или цену).
`@type {HTMLElement} elementCloseButton`- Элемент кнопки закрытия окна.
`@type {EventEmitter} emmit `- Обработчик событий

Конструктор:
`constructor(container: HTMLElement - Родительский элемент, \_emmit: EventEmitter - Обработчик собыий)`

this.elementSellCounter = ensureElement<HTMLElement>(
".order-success\_\_description",
this.container
); `- Поле для отображения  суммы потраченой на покупки`

this.elementCloseButton = ensureElement<HTMLElement>(
".order-success\_\_close",
this.container
); `-  Кнопка закрытия окна Succses и переход обратно в каталог`

this.elementCloseButton.addEventListener("click", () => {
this.emmit.emit("successclick");
}) `- Клик по кнопке закрытия`

Методы класса:
Отображение цены - `set price(value: string) `

### Слой «Презентер»

_Слой Презентера реализует управление логикой взаимодействия пользовательского интерфейса с бизнес-логикой и моделью данных в рамках текущего проекта. Он использует событийную модель для обработки пользовательских действий и обновления интерфейса._

Основные компоненты и роли
`EventEmitter` — механизм для обмена событиями между слоями.
`Коммуникационный слой (communicationLayer)` — используется для получения данных с сервера.
`Модель` (product, basket, buyer, order, contacts) — хранит и управляет состояниями данных.
Интерфейсы (`ICardCatalog, ICarddPrview`) — определяют структуру данных для карточек товаров и их просмотра.
Вспомогательные классы (`CardCatalog, CardBasket, Modal, Order, Contacts, Success`) — отвечают за рендеринг UI и взаимодействие с DOM.

Основные сценарии и обработчики

Получение данных
`communicationLayer.fetchProducts()` — запрашивает список товаров с сервера и обновляет модель product черз метод setProduct().

Создание карточек каталога
`"createcardscatalog" `— слушатель, который принимает массив товаров из поля AllProduct, клонирует шаблоны карточек, создает экземпляры CardCatalog и устанавливает коректый путь картинки, отображение цены и селектор категирии, далее рендерит их.

Обработка кликов
`"cardclick"` — при клике по карточке товара в котологе, получает id товара, ищет в Product всю информацию на товар и устанавливает выбранный товар для подробного просмотра (класс Product метод setProductForDisplay()).
`"cardpreview"` — прослушивает поле хранения информции о товаре сохраненнного для подробного осмотра отображение.
`"clickbutton_previw"` — добавляет или удаляет товар из корзины передает информацию в класс basket методы addProduct() и deleteProduct().Меняет текст кнопки при добовлении в корзину или удалении.

Управление корзиной
`"basketcounter"` — обновляет счетчик товаров при обновлении в basket.addProduct() или basket.deleteProduct();
`"updatebasket"` — При клике по кнопке корзины в классе Header обновляет отображение корзины, рендерит список и сумму, регулирует доступность кнопки оформленич заказа в корзине .
`"carddeletebasket"` — Получает id товара по которому кликнули и удаляет из корзины

Оформление заказа
`"clickbasketbuy"` — инициирует открытие окна оформления заказа.
`"paymentmethod"` — меняет выбранный способ оплаты и устанавливает его Buyer.setPayment()
`"address"` — устанавливает адрес доставки Buyer.setaddress() .
`"updateorder" `— валидирует данные заказа,ошибку передает в поле form.seterror() или '', делает доступной кнопку для перехода дальше.
`"clickbuttonorder" `— переходит к вводу контактных данных.
`"email" и "phone" `— обновляют контактные данные пользователя.
`"updatecontacts"` — валидирует контакты, ошибку в contacts.error(), кнопка доступна для отправки - все ок.
`"clickbuttoncontacts"` — отправка на сервер данных пользователя и его покупки
`successupdate` - ожидание успешного ответа сервера, рендер окна успешой оплатыб передаем в модал
`"successclick"` — закрыть окно успешной оплататы и очистить данные
