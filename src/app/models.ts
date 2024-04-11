export class Contact {
    readonly id: string;
    readonly name: string;

    constructor(
        {
            id = randomContactId(),
            name
        } : ContactProperties
    ) {
        this.id = id;
        this.name = name;
    }
}

interface ContactProperties {
    id?: string,
    name: string,
}

function randomContactId(): string {
    return crypto.randomUUID();
}

export interface NewContact {
    readonly name: string
}