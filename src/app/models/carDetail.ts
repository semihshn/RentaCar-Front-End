import { Car } from "./car";
import { CarImage } from "./carImage";

export interface CarDetail{
    carId:number;
    carName:string;
    brandName:string;
    colorName:string;
    dailyPrice:number;
    modelYear:string;
    description:string;
    imagePath:string;
    date:Date;
}