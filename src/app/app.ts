import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// ❌ REMOVED AppLayout import (The router handles it now!)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // ✅ Only RouterOutlet needed here
  templateUrl: './app.html', // (Make sure this matches your file name: app.html or app.component.html)
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'crime-ui';
}