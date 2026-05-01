import { Component } from '@angular/core';
import { Demo } from './pages/demo/demo';

type Page = 'about' | 'demo' | 'try';
type SlideDirection = 'slide-left' | 'slide-right';

@Component({
  selector: 'app-root',
  imports: [Demo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  activePage: Page = 'about';
  slideDirection: SlideDirection = 'slide-left';

  private pageOrder: Page[] = ['about', 'demo', 'try'];

  setActivePage(page: Page): void {
    const currentIndex = this.pageOrder.indexOf(this.activePage);
    const nextIndex = this.pageOrder.indexOf(page);

    this.slideDirection = nextIndex > currentIndex ? 'slide-left' : 'slide-right';
    this.activePage = page;
  }
}