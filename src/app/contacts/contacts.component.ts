import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Contact, NewContact } from '../models';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  contacts: Iterable<Contact> = [];

  constructor(
    private service: ContactsService
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  createNew(): void {
    let newName = prompt("Enter the contact name", "")
      ?.trim();
    
    if (!newName || newName == "") {
      console.warn("No new name provided; not creating any new contact");
      this.refreshData();
      return;
    }

    this.service.addNew({ name: newName });
    this.refreshData();
  }

  private refreshData(): void {
    this.contacts = this.service.getAll();
  }
}
