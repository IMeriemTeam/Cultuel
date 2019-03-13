import { HttpClient } from '@angular/common/http';
import { ConnectionService } from './contact-my-suffix.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-contact-my-suffix',
    templateUrl: './contact-my-suffix.component.html',
    styleUrls: ['contact.css']
})
export class ContactMySuffixComponent implements OnInit {
    name: string;
    email: string;
    message: string;

    constructor() {}

    ngOnInit() {}

    /**
     * Process the form we have. Send to whatever backend
     * Only alerting for now
     */
    processForm() {
        const allInfo = `My name is ${this.name}. My email is ${this.email}. My message is ${this.message}`;
        alert(allInfo);
    }
}
