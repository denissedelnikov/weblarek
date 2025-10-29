import { getServerIProduct, postServerIBuyer, IApi } from '../../types';

export class CommunicationLayer {
  /** Класс CommunicationLayer реализует коммуникационный слой приложения. Его задача — осуществлять HTTP-запросы к API сервера через объект api, инкапсулируя детали общения с сервером: Получать данные товаров через GET-запрос и Отправлять данные заказа через POST-запрос*/

  /** Хранит объект для выполнения HTTP-запросов (методы get и post)м */
  private api: IApi;

  /**
   * Инициализирует поле api объекта, обеспечивая доступ к методам коммуникации с сервером
   * @param {IApi} api  - экземпляр интерфейса, реализующего методы HTTP-запросов (get и post)
   */
  constructor(api: IApi) {
    this.api = api;
  }

  /**
   * get запрос на эндпоинт /product/ котрый возвращает массив товаров
   * @returns {Promise<getServerIProduct>} = Массив товаров с сервера
   */
  async fetchProducts(): Promise<getServerIProduct> {
    return await this.api.get<getServerIProduct>('/product/');
  }

  /**
   * Выполняет post запрос на эндпоинт /order/ и передаёт в него данные, полученные в параметрах метода
   * @param {postServerIBuyer} orderData - Обьект с информациией о покупателе и выбраные товары
   */
  async sendOrder(
    orderData: postServerIBuyer
  ): Promise<{ total: string; id: string }> {
    return await this.api.post<{ total: string; id: string }>(
      '/order/',
      orderData
    );
  }
}
