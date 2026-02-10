import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html', // ✅ Updated to match new filename
  styleUrl: './app.component.scss'     // ✅ Updated to match new filename
})
export class AppComponent {
  title = 'crime-ui';
}