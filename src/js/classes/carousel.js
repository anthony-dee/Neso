import '../../scss/_partials/_carousel.scss';

export default class Carousel {

  constructor(element) {
    this.carousel = element;

    this.currentItem = 0;

    this.items = this.carousel.querySelectorAll('.carousel-item');

    this.track = this.carousel.querySelector('.carousel-track');

    this.indicators = this.carousel.querySelectorAll('.carousel-indicator');

    this.registerListeners();
  }

  registerListeners() {
    this.carousel.addEventListener('click', (event) => {
      if (event.target.matches('.carousel-indicator')) {
        this.pause();
        this.slideTo(event.target.getAttribute('data-slide-to'));
        this.play();
      }

      if (event.target.closest('.carousel-prev')) {
        this.pause();
        this.slideTo(this.getPreviousItem());
        this.play();
      }

      if (event.target.closest('.carousel-next')) {
        this.pause();
        this.slideTo(this.getNextItem());
        this.play();
      }
    });

    window.onresize = () => {
      this.track.scrollLeft = this.calculateTrackScrollLeft();
    };
  }

  slideTo(itemTo) {
    this.setCurrentItem(itemTo);

    this.track.scrollTo({
      behavior: "smooth",
      top: 0,
      left: this.calculateTrackScrollLeft()
    });

    this.indicators.forEach((indicator, key) => {
      if (indicator.classList.contains('active')) {
        indicator.classList.remove('active');
      }

      if (this.currentItem == key) {
        indicator.classList.add('active');
      }
    });
  }

  play() {
    this.interval = setInterval(
      () => {this.slideTo(this.getNextItem())},
      5000
    );
  }

  pause() {
    clearInterval(this.interval);
  }

  setCurrentItem(item) {
    this.currentItem = parseInt(item);
  }

  calculateTrackScrollLeft() {
    return Math.floor(this.track.scrollWidth * (this.currentItem / this.items.length));
  }

  getNextItem() {
    if (this.currentItem === this.items.length - 1) {
      return 0;
    } else {
      return this.currentItem + 1;
    }
  }

  getPreviousItem() {
    if (this.currentItem === 0) {
      return this.items.length - 1;
    } else {
      return this.currentItem - 1;
    }
  }
}
