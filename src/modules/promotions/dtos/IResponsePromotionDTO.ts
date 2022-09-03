interface IResponsePromotionDTO {
  id: string;
  description: string;
  day_promotion: string;
  promotion_price: number;
  promotion_start_time: string;
  promotion_end_time: string;
  id_product: string;
};

export { IResponsePromotionDTO };
