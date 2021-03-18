export interface Rental{
    id:number;
    carId:number;
    carName:string;
    userName:string;
    customerName:string;
    rentDate:Date;
    returnDate:Date;
    totalPrice:number;
}