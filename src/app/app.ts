import { Component, HostBinding } from '@angular/core';
import { About } from './pages/about/about';
import { Demo } from './pages/demo/demo';
import { TestDrive } from './pages/test-drive/test-drive';

type Page = 'about' | 'demo' | 'try';
type SlideDirection = 'slide-left' | 'slide-right';

@Component({
  selector: 'app-root',
  imports: [About, Demo, TestDrive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  activePage: Page = 'about';
  slideDirection: SlideDirection = 'slide-left';

  @HostBinding('class.theme-about')
  get themeAbout(): boolean {
    return this.activePage === 'about';
  }

  @HostBinding('class.theme-demo')
  get themeDemo(): boolean {
    return this.activePage === 'demo';
  }

  @HostBinding('class.theme-try')
  get themeTry(): boolean {
    return this.activePage === 'try';
  }
  private pageOrder: Page[] = ['about', 'demo', 'try'];

  setActivePage(page: Page): void {
    const currentIndex = this.pageOrder.indexOf(this.activePage);
    const nextIndex = this.pageOrder.indexOf(page);

    if (page !== this.activePage) {
      this.slideDirection = nextIndex > currentIndex ? 'slide-left' : 'slide-right';
      this.activePage = page;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
