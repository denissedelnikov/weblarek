import { IProduct } from "../../types";

export class Basket {
  /** Класс для хранения информации о товарах находяхся в корзине  т.е выбраных пользователем для покупки
  /** @type {IProduct[]}  basketProduct - Массив товаров нахояшихся в корзине */
  private basketProduct: IProduct[] = [];

  /**
   * Метод для добовления товара в массив корзины basketProduct
   * @param {IProduct} product - Обьект типа IProduct, единичный товар
   */
  addProduct(product: IProduct): void {
    this.basketProduct.push(product);
  }

  /**
   * Метод возвращает массив basketProduct,  все товары находяшиеся в корзине
   * @returns {IProduct[]}
   */
  getAllProduct(): IProduct[] {
    return this.basketProduct;
  }

  /**
   * Метод очистки массива коризны basketProduct
   */
  clear(): void {
    this.basketProduct = [];
  }

  /**
   * Рассчет общей стоимости товаров находяшихся в корзине.
   * @returns {number} - Метод вернет сумму
   */
  calculatedPrice(): number {
    return this.basketProduct.reduce(
      (accumulator, currentProduct) =>
        accumulator + (currentProduct["price"] || 0),
      0
    );
  }

  /**
   * Рассчет количества товаров находяшихся в корзине. Метод число
   * @returns {number} - Колличсво
   */
  calculatedProduct(): number {
    return this.basketProduct.length;
  }

  /**
   * Поиск товара с id == строке преданой в параметр метода
   * @param {string} id - Строка с уникальных значением товара
   * @returns {IProduct} - Обьект вида интерфеса IProdcut, единичный товар  = id
   */
  getProductById(id: string): IProduct | undefined {
    return this.basketProduct.find((Product) => Product["id"] == id);
  }

  /**
   * Удалить товар переденый в параметр метода из массива товаров
   * @param {IProduct} product
   */
  deleteProduct(product: IProduct) {
    this.basketProduct = this.basketProduct.filter(
      (element) => element.id != product.id
    );
  }
}
