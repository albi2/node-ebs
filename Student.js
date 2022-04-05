

export class Student {
    Id = '0';
    Name = 'Name';
    Lastname = 'Lastname';

    constructor(Id, Name, Lastname) {
        this.Id = Id;
        this.Name = Name;
        this.Lastname = Lastname;
    }

    get Id() {
        return this.Id;
    }

    get Name() {
        return this.Name;
    }

    get Lastname() {
        return this.Lastname;
    }

    set Id(id) {
        this.id = id;
    }

    set Name(name) {
        this.name = name;
    }

    set Lastname(lastname) {
        this.Lastname = lastname;
    }
}