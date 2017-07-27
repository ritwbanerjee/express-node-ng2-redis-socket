import { Component, OnInit, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-navbar',
  templateUrl: './navbar.component.pug',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  @Output() navbarPosition = new EventEmitter();
  @Input() navPosition;
  constructor(
      private router: Router,
      private element: ElementRef
  ) { }
  
  ngOnInit() {
    window.scrollTo(0, 0);
    this.navbarPosition.emit({ position: this.element.nativeElement.offsetTop });
    this.navPosition = this.element.nativeElement.offsetTop;
  }
  
  goToAbout() {
    this.router.navigate(['/about']);
  }
  goToServices() {
    this.router.navigate(['/services']);
  }
  goToReviews() {
    this.router.navigate(['/reviews']);
  }
  goToBlog() {
    this.router.navigate(['/blog']);
  }
  goToContact() {
    this.router.navigate(['/contact']);
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.navPosition = this.element.nativeElement.offsetTop;
    this.navbarPosition.emit({ position: this.element.nativeElement.offsetTop });
  }
  
}