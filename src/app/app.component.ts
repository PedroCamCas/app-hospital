import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router){}

  title = 'app-hospital';

  redirectTo(view: string){
    this.router.navigate([view]);
  }

  openModalToEditUser(){

  }

  sesionClose(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
