import { Component, signal, OnInit, AfterViewInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('portfolio');
  name = 'Young Tech';
  role = 'Full-Stack Web Developer (Angular & Laravel)';
  isMenuOpen = false;
  isScrolled = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Smooth scroll for anchor links (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      this.setupSmoothScroll();
    }
  }

  ngAfterViewInit(): void {
    // Setup navigation scroll effect (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      this.checkScroll();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScroll();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  private checkScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isScrolled = window.scrollY > 50;
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (this.isScrolled) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  private setupSmoothScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Handle click events on anchor links
    setTimeout(() => {
      document.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
        
        if (link) {
          const href = link.getAttribute('href');
          if (href && href !== '#') {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
              const offsetTop = targetElement.offsetTop - 80;
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
              });
              
              // Close mobile menu if open
              this.closeMenu();
            }
          }
        }
      });
    }, 0);
  }
}
