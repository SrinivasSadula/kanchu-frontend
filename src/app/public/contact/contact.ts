import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };
  submitted = false;

  submitForm() {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.message) {
      this.submitted = true;
      console.log('Form submitted:', this.contactForm);
      // TODO: Send to API
      this.resetForm();
      setTimeout(() => this.submitted = false, 3000);
    }
  }

  resetForm() {
    this.contactForm = { name: '', email: '', message: '' };
  }
}
