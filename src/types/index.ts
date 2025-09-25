export type ApiPostMethods = "POST" | "PUT" | "DELETE";
export type TPpayment = 'online' | 'cash' | ''

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPpayment;
  email: string;
  phone: string;
  address: string;
}

export type getServerIProduct = {
  items: IProduct[];
  total: number;
};

export interface postServerIBuyer extends IBuyer {
  items: IProduct[];
}
