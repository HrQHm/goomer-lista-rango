interface ICreateProductDTO {
  name: string;
  price: number;
  image_product: string;
  category_id: string;
  restaurant_id: string;
  promotion: true;
};

export { ICreateProductDTO };
