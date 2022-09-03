interface IUpdateRestaurantDTO {
  id: string;
  name: string;
  image_restaurant: string;
  weekDayOpen: number;
  weekDayClose: number;
  opening_time_week: string;
  closing_time_week: string;
  weekendOpen: number;
  weekendClose: number;
  opening_time_weekend: string;
  closing_time_weekend: string;
  address: string;
};

export { IUpdateRestaurantDTO };