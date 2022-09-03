interface IUpdatePromotionDTO {
  id: string;
  description: string;
  day_promotion: number;
  promotion_price: number;
  promotion_start_time: string;
  promotion_end_time: string;
};

export { IUpdatePromotionDTO };
