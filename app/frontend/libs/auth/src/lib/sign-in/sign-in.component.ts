import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'lib-sign-in',
  imports: [CommonModule, MatButton, FormsModule],
  template: `
    <div class="w-hull h-full flex flex-col items-center justify-center gap-6">
      <p class="text-3xl">sign in</p>

      <div class="flex flex-col gap-2 w-96">
        <label class="text-gray-600">Email address</label>
        <input
          type="email"
          class="border rounded-lg bg-gray-100 text-gray-900 border-gray-300 p-2.5 w-full focus:ring-cyan-800 focus:border-cyan-800 block"
          placeholder="E.g. mzkmnk@example.com"
          [(ngModel)]="email"
        />
      </div>

      <div class="flex flex-col gap-2 w-96">
        <label class="text-gray-600">Password</label>
        <input
          type="password"
          class="border rounded-lg bg-gray-100 text-gray-900 border-gray-300 p-2.5 w-full"
          placeholder="Password"
          [(ngModel)]="password"
        />
      </div>

      <button
        mat-flat-button
      >Sign In
      </button>
    </div>
  `
})
export class SignInComponent {

  email = signal<string>('');

  password = signal<string>('');

  onClickSignIn(): void {

  }
}
