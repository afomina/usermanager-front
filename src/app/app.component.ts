import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  showHeroes = true;
  showConfig = true;
  showDownloader = true;
  showSearch = true;

  toggleConfig() { this.showConfig = !this.showConfig; }
  toggleDownloader() { this.showDownloader = !this.showDownloader; }
  toggleSearch() { this.showSearch = !this.showSearch; }
 }
