import { Injectable } from '@angular/core';
import { mockContacts } from './mocks';
import { Contact, NewContact } from './models';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts = new Map(
    mockContacts
      .map(contact => [contact.id, contact])
  );

  constructor() { }

  getAll(): Iterable<Contact> {
    return this.contacts.values();
  }

  addNew(newContact: NewContact) {
    let contact = new Contact({ name: newContact.name });
    this.contacts.set(contact.id, contact);
  }

  getById(id: string): Contact | undefined {
    return this.contacts.get(id);
  }

  updateNameById(id: string, newName: string) {
    let contact = this.getById(id)!;
    this.contacts.set(contact.id, new Contact({ id: contact.id, name: newName }));
  }

  deleteById(id: string) {
    this.contacts.delete(id);
  }
}
