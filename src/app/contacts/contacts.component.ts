import { NgFor, NgIf } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component, OnInit, inject, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Contact } from '../models';
import { ContactsService } from '../contacts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NonBlankDirective } from '../nonblank.directive';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  private modalService = inject(NgbModal);

  newContactForm = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      this.nonBlankValidator,
    ]),
  });
  contacts: Iterable<Contact> = [];

  constructor(
    private service: ContactsService
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  openNewContactModal(content: TemplateRef<any>): void {
    this.modalService.open(content, { centered: true });
  }

  nonBlankValidator(control: AbstractControl<any, any>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isBlank = (control.value || '').trim().length === 0;
      return isBlank ? { 'blank': 'value is blank' } : null;
    };
  }

  onSubmitNewContact(): void {
    let newName = this.newContactForm.value.name?.trim();
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
