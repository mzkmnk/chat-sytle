import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'lib-sign-in',
  imports: [CommonModule],
  template: `
    <div class="w-hull h-full flex items-center justify-center">
      <p class="text-3xl">sign in</p>
    </div>
  `
})
export class SignInComponent {

}
