export class Employee {
    id: number;
    name: string;
    email: string;
    position: string;

    constructor(name: string, email: string, position: string) {
        this.name = name;
        this.email = email;
        this.position = position;
    }
}