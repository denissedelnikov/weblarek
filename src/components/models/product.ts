import { IProduct } from "../../types";

export class Product {
  /** Класс для того чтобы хранить или получать информацию о товарах в каталоге и для модального окна подробного осмотра. */
  /** @type {IProduct[]} AllProduct - Поле для хранения массива обьектов:IProduct переданых в парметр метода */
  private AllProduct: IProduct[] = [];
  /** @type {IProduct} setProductDisplay - Поле храения товара (обекта:IProduct) для подробного просмотра или ничего  */
  private setProductDisplay: IProduct | undefined;

  /**
   * Сохраняет переданный массив обьектов:IProduct в поле AllProduct
   * @param {IProduct[]} arrayProduct — Массив обьектов
   */
  setProduct(arrayProduct: IProduct[]): void {
    this.AllProduct = arrayProduct;
  }
  /**
   * Вернет массив обьектов:IProduct из поля AllProduct
   * @returns {IProduct[]} AllProduct — Массив всех товаров
   */
  getProduct(): IProduct[] {
    return this.AllProduct;
  }

  /**
   * Получить товар по полю ID полученого в параметрах метода
   * @param {string} id — id для поиска
   * @returns {IProduct} - Обьект вида интерфейса IProduct, единичный товар  = id
   */
  getProductById(id: string): IProduct | undefined {
    return this.AllProduct.find((elements) => elements.id == id); //object вида IProduct | undefined
  }

  /**
   * Сохранить товар для подробного просмотра
   * @param {IProduct} IProductDisplay — Обьект вида интерфейса IProduct, единичный  товар
   * Устанавливаем в поле класса setProductDisplay
   */
  setProductForDisplay(IProductDisplay: IProduct): void {
    this.setProductDisplay = IProductDisplay;
  }

  /**
   * Получить товар для подробного просмотра
   * @return {IProduct} — Обьект вида интерфейса IProduct, единичный  товар
   */
  getProductForDisplay(): IProduct | undefined {
    return this.setProductDisplay;
  }
}
