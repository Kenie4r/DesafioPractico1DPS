import { Seat } from "./asiento";
export interface ticketsBuy{
    movieId : number; 
    theatherId : number; 
    hour?: string;
    seats : Seat[];
    price : number;
    total?: number;
}