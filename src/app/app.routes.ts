import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

export const routes: Routes = [
    { path: 'contacts', component: ContactsComponent, title: 'Contacts' },
    { path: 'contacts/:id', component: ContactDetailsComponent, title: 'Contact Details' }, // TODO instead of this title, set the name of the input contact
    { path: '', redirectTo: '/contacts', pathMatch: 'full' }
];
