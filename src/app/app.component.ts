import { Component } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Minhas Transações Financeiras';

  constructor(private route: Router) { }

  redirectTo(rota: string) {
    this.route.navigate([rota])
  }

}
