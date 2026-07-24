import { Seat } from "./asiento";
export interface ticketsBuy{
    movieId : number; 
    theatherId : number; 
    seats : Seat[];
    price : number;
}