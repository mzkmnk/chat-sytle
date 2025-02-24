import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatButton} from "@angular/material/button";

@Component({
  imports: [RouterModule, MatButton],
  selector: 'app-root',
  template:`
    <div>
      <button mat-flat-button>Click me!</button>
    </div>
  `
})
export class AppComponent {
  title = 'frontend';
}
