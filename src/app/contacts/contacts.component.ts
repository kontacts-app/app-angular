import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Contact } from '../models';
import { mockContacts } from '../mocks';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  contacts: Iterable<Contact> = [];

  ngOnInit(): void {
    this.contacts = mockContacts;
  }
}
