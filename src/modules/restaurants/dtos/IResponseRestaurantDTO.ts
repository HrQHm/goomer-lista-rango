interface IResponseRestaurantDTO {
  id: string;
  name: string;
  image_restaurant: string;
  address: string;
  weekDayOpen: string;
  weekDayClose: string;
  opening_time_week: string;
  closing_time_week: string;
  weekendOpen: string;
  weekendClose: string;
  opening_time_weekend: string;
  closing_time_weekend: string;
};

export { IResponseRestaurantDTO };