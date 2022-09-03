interface IUpdateProductDTO {
  id: string;
  name: string;
  price: number;
  image_product: string;
  promotion: boolean;
  category_id: string;
};

export { IUpdateProductDTO };
