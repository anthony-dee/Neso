import '../../scss/_partials/_navbar.scss';
import '../../scss/test.scss';

export default class NavBar {

  constructor(navBar) {
      this.navBar = navBar;

      this.navBar.classList.remove('no-js');

      this.menuToggle = this.navBar.querySelector('.nav-menu-toggle');

      this.menu = this.navBar.querySelector('.nav-main-menu');

      if (window.innerWidth >= 768) {
        this.menu.setAttribute('aria-hidden', 'false');
      }

      this.setMenuHeight();

      this.baseMenuStyle = `--nav-height: ${this.getMenuHeight()}px; `;

      this.menu.setAttribute('style', this.baseMenuStyle)

      this.animation = null;

      this.isClosing = false;

      this.isExpanding = false;

      this.currentMenuButton = false;

      this.registerListeners();
  }

  registerListeners() {
    this.navBar.addEventListener('click', (event) => {
      if (event.target.closest('.nav-menu-toggle')) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        if (this.menuToggle.getAttribute('aria-expanded') === 'false') {
          this.menuToggle.setAttribute('aria-expanded', 'true');
          this.menu.setAttribute('aria-hidden', 'false');
        } else {
          this.menuToggle.setAttribute('aria-expanded', 'false');
          this.menu.setAttribute('aria-hidden', 'true');
        }

        /*if (!prefersReducedMotion.matches) {
          this.toggleBtnClick(event);
        }*/
      }

      if (event.target.closest('.nav-dropdown-toggle')) {
        const button = event.target;

        // close an open dropdown if there is one
        if (this.currentMenuButton && this.currentMenuButton !== button) {
          this.toggleDropdown(this.currentMenuButton);
        }

        this.toggleDropdown(button);
      }
    }, false);

    document.addEventListener( 'click', (e) => {
      this.closeOpenMenu(e);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.menu.setAttribute('aria-hidden', 'false');
      } else {
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.menu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  closeOpenMenu(e) {
    if (this.currentMenuButton && !e.target.closest( '.nav-list-dropdown')) {
      this.toggleDropdown(this.currentMenuButton);
    }
  }

  toggleDropdown(button) {
    const dropdown = document.getElementById(button.getAttribute('aria-controls'));
    if ('true' === button.getAttribute( 'aria-expanded' )) {
      button.setAttribute('aria-expanded', false);
      dropdown.setAttribute('aria-hidden', true)
      this.currentMenuButton = false;
    } else {
      button.setAttribute('aria-expanded', true);
      dropdown.setAttribute('aria-hidden', false)
      this.currentMenuButton = button;
    }
  }

  // Function called when user clicks on the nav menu toggle
  toggleBtnClick(event) {
    event.preventDefault();

    if (this.isClosing || !this.isNavMenuOpen) {
      this.openMenu();
    } else if (this.isExpanding || this.isNavMenuOpen) {
      this.closeMenu();
    }
  }

  // Function called to close the content with an animation
  closeMenu() {
    this.isClosing = true;
    const startHeight = `${this.menu.offsetHeight}px`;
    const endHeight = '0px';

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.menu.animate({
      height: [startHeight, endHeight],
      opacity: [1,0]
    }, {
      duration: 400, easing: 'ease-out'
    });

    this.menu.style.height = endHeight;
    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => this.isClosing = false;
  }

  // Function called to open the element after click
  openMenu() {
    this.isNavMenuOpen = true;
    window.requestAnimationFrame(() => this.expand());
  }

  // Function called to expand the content with an animation
  expand() {
    this.isExpanding = true;
    const startHeight = `0px`;
    const endHeight = `${this.menu.querySelector('.nav-list').offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.menu.animate({
      height: [startHeight, endHeight],
      opacity: [0,1]
    }, {
      duration: 400, easing: 'ease-out'
    });

    this.menu.style.height = endHeight;
    this.menu.style.opacity = 1;
    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => this.isExpanding = false;
  }

  // Callback when the shrink or expand animations are done
  onAnimationFinish(isNavMenuOpen) {
    this.isNavMenuOpen = isNavMenuOpen;
    this.menu.classList.toggle('menu-open', isNavMenuOpen);
    this.animation = null;
    this.isClosing = false;
    this.isExpanding =  false;

    if (this.isNavMenuOpen) {
       this.menu.style.height = 'auto';
    }
  }

  getMenuHeight() {
    return this.menuHeight;
  }

  setMenuHeight() {
    this.menuHeight = this.menu.offsetHeight;
  }
}
