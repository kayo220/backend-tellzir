import { Price } from "../entities/Price";

export interface IPriceRepository {
    save(price: Price): Promise<void>;
    update(price: Price): Promise<void>;
    searchByFrom(from: string): Promise<any>;
    searchByID(id: string): Promise<any>;
    alreadyExists(from: string, to: string): Promise<boolean>;
    searchPrice(from: string, to: string): Promise<any>;
    list(): Promise<any>;
}