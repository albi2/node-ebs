
export class User {
    name = 'Default name';
    lastnam = 'Default last name';

    constructor(name, lastname) {
        this.name = name;
        this.lastname = lastname;
    }   

    get name() {
        return this.name;
    }

    get lastName() {
        return this.lastName;
    }
}

