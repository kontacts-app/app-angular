import { Component, OnInit } from '@angular/core';
import { Contact } from '../models';
import { ActivatedRoute } from '@angular/router';
import { mockContacts } from '../mocks';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit {
  id: string;
  contact?: Contact;

  constructor(
    route: ActivatedRoute,
  ) {
    let id = route.snapshot.paramMap.get('id');
    if (!id) {
      throw Error("The id query parameter is required for the contact-details route");
    }
    this.id = id;
  }

  ngOnInit(): void {
      let contact = mockContacts.find(contact => contact.id == this.id);
      if (!contact) {
        throw Error(`Contact not found with id ${this.id}`);
      }
      this.contact = contact;
  }
}
