interface ICreatePromotionDTO {
  description: string;
  day_promotion: number;
  promotion_price: number;
  promotion_start_time: string;
  promotion_end_time: string;
  id_product: string;
};

export { ICreatePromotionDTO };
