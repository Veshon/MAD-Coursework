export class Item {
    id: number;
    description: string;
    price: number;
    qty: number;

    constructor(description: string, price: number, qty: number) {
        this.description = description;
        this.price = price;
        this.qty = qty;
    }
}