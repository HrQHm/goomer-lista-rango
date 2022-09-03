interface ICreateRestaurantDTO {
  name: string;
  image_restaurant: string;
  address: string;
  weekDayOpen: number;
  weekDayClose: number;
  opening_time_week: string;
  closing_time_week: string;
  weekendOpen: number;
  weekendClose: number;
  opening_time_weekend: string;
  closing_time_weekend: string;
};

export { ICreateRestaurantDTO };