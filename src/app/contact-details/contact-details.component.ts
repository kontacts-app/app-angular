import { Component, OnInit } from '@angular/core';
import { Contact } from '../models';
import { ActivatedRoute } from '@angular/router';
import { NgIf, Location } from '@angular/common';
import { ContactsService } from '../contacts.service';

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
    private service: ContactsService,
    private location: Location,
  ) {
    let id = route.snapshot.paramMap.get('id');
    if (!id) {
      throw Error("The id query parameter is required for the contact-details route");
    }
    this.id = id;
  }

  ngOnInit(): void {
      this.refreshData();
  }

  delete(): void {
    let contact = this.contact!;
    if (!confirm(`Are you sure do you want to delete ${contact.name}?`)) {
      return;
    }

    this.service.deleteById(this.id);
    this.back();
  }

  back(): void {
    this.location.back();
  }

  edit(): void {
    let contact = this.contact!;
    let newName = prompt("Edit contact name", contact.name)
      ?.trim();
    
    if (!newName || newName == "") {
      console.warn("No new name provided; not updating");
      return;
    }

    this.service.updateNameById(this.id, newName);
    this.refreshData();
  }

  private refreshData(): void {
    let contact = this.service.getById(this.id)!;
    if (!contact) {
      throw Error(`Contact not found with id ${this.id}`);
    }
    this.contact = contact;
  }
}
