import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {

  public hideCarousel = true
  constructor() { }
  images = ["../../assets/images/carousel-laptop.jpg", "../../assets/images/iphone12.jpg", "../../assets/images/pcscump.jpg", "../../assets/images/TV.jpg"];

  ngOnInit(): void {
    if(window.screen.width < 1024)
      this.hideCarousel = false
    else
      this.hideCarousel = true
  }

}
