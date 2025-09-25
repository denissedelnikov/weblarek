import "./scss/styles.scss";
import { Product } from "./components/models/product";
import { apiProducts } from "./utils/data";
import { Basket } from "./components/models/basket";
import { Buyer } from "./components/models/buyer";
import { CommunicationLayer } from "./components/models/CommunicationLayer";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";

const productModal = new Product();

console.log(
  "Сохрнаить массив товаров переданых в аргументах",
  apiProducts.items
);
productModal.setProduct(apiProducts.items);
console.log("Получить массив всех товаров: ", productModal.getProduct());

const findProductById = productModal.getProductById(
  "b06cde61-912f-4663-9751-09956c0eed67"
);
console.log(
  "Получить товар по полю ID полученого в параметрах метода: ",
  findProductById
);

if (findProductById) productModal.setProductForDisplay(findProductById);

console.log("Сохранить товар для подробного осмотра: ", findProductById);
console.log(
  "Получить товар для подробного осмотра: ",
  productModal.getProductForDisplay()
);

const basket = new Basket();

console.log(
  "Добовление товара в массив корзины: ",
  apiProducts.items[3],
  apiProducts.items[1]
);
basket.addProduct(apiProducts.items[2]);
basket.addProduct(apiProducts.items[1]);

console.log(
  "Рассчет стоимости товара находяшегося в корзине",
  basket.calculatedPrice()
);
console.log("Расчет кол-ова товара в корзине :", basket.calculatedProduct());
const returnsBasket = basket.getAllProduct();
console.log("Вернуть массив продуктов находяшихся в корзине: ", returnsBasket);
console.log(
  "Вернуть товар нахядшийся в корзине = ID",
  basket.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9")
);

basket.deleteProduct(apiProducts.items[1]);
console.log(
  "Удаление этого -",
  apiProducts.items[1],
  "элемента: ",
  basket.getAllProduct()
);

const buyer = new Buyer();

buyer.setAddress("rusanov"); // Сохраняем адресс
buyer.setEmail("hdhdn"); // Сохраняем емейл
buyer.setPayment("online"); // Сохрняем метод оплаты
buyer.setPhone("ndndn"); // Сохроняем телефон

console.log("Получить все данные о покупателе", buyer.getBuyerData());
console.log(
  "True - при успешном проходении валидации, вернет обьект с невалидированыыми полями в случаи ошибки, ",
  buyer.validate()
);
buyer.clearBuyerData(),
  console.log("Удалить все данные о покупателе", buyer.getBuyerData());

const api = new Api(API_URL);
console.log(api);
//Создаем экземпляр класса комуникации
const communicationLayer = new CommunicationLayer(api);
// Получаем с сервера массив товаров
const product = await communicationLayer.fetchProducts();
console.log("Полученый массив с сервара: ", product);

productModal.setProduct(product.items);
const saveProduct = productModal.getProduct();
console.log(
  "Полученый с сервра массив пердаем в класс каталога и получаем: ",
  saveProduct
);
