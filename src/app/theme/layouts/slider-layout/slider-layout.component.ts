import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-slider-layout",
  templateUrl: "./slider-layout.component.html",
  styleUrls: ["./slider-layout.component.scss"],
})
export class SliderLayoutComponent implements OnInit {

  slideOptions = {
    slidesPerView: 6, // Количество видимых слайдов
    spaceBetween: 10, // Промежуток между слайдами
    centeredSlides: false, // Размещение слайдов по центру
  };
  
  constructor() {}

  ngOnInit() {}
}
