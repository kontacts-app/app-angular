import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';

export const routes: Routes = [
    { path: 'contacts', component: ContactsComponent, title: 'Contacts' },
    { path: '', redirectTo: '/contacts', pathMatch: 'full' }
];