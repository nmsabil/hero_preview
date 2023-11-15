
// Nav logic start
let Navlogic = () => {
     // sticky logic
     var header = document.querySelector('.component.header.newNav');
     var navbarToggler = document.querySelector('.component.header.newNav .navbar-toggler');
     var togglerClicked = false;

     if (window.scrollY > 0) {
          header.classList.add('scrolled');
     }

     window.addEventListener('scroll', function () {
          if (window.scrollY > 0 || togglerClicked) {
               header.classList.add('scrolled');
          } else {
               header.classList.remove('scrolled');
          }
     });

     navbarToggler.addEventListener('click', function () {
          togglerClicked = !togglerClicked;
          if (window.scrollY === 0) {
               header.classList.toggle('scrolled');
          }
     });


     // dropdown logic
     const dropdowns = document.querySelectorAll('.component.header.newNav .navbar-nav .dropdown');

     if (window.innerWidth <= 778) {
          dropdowns.forEach(function (dropdown) {
               dropdown.addEventListener('click', clickHandler);
          });
     } else {
          dropdowns.forEach(function (dropdown) {

               dropdown.removeEventListener('click', clickHandler);

               dropdown.addEventListener('mouseenter', mouseEnterHandler);
               dropdown.addEventListener('mouseleave', mouseLeaveHandler);
          });
     }

     function mouseEnterHandler() {
          if (window.innerWidth > 778) {
               this.classList.add('open');
          }
     }

     function mouseLeaveHandler() {
          if (window.innerWidth > 778) {
               this.classList.remove('open');
          }
     }

     function clickHandler() {
          const wasOpen = this.classList.contains('open');

          dropdowns.forEach(function (dropdown) {
               dropdown.classList.remove('open');
          });

          if (!wasOpen) {
               this.classList.add('open');
          }
     }


     dropdowns.forEach(function (dropdown) {
          dropdown.addEventListener('mouseenter', mouseEnterHandler);
          dropdown.addEventListener('mouseleave', mouseLeaveHandler);
          dropdown.addEventListener('click', clickHandler);
     });
}
// Nav logic end

// covarage carousel start
let covarageCarousel = () => {
     var mainCarousel = $('.owl-carousel.main').owlCarousel({
          items: 1,
          loop: false,
          dots: false,
          // animateIn: 'fadeIn',
          // animateOut: 'fadeOut',
          // mouseDrag: false,
          // pullDrag: false,
          // touchDrag: false,
     });

     var contentCarousel = $('.owl-carousel.content').owlCarousel({
          items: 1,
          loop: false,
          dots: false,
          margin: 0,
          animateIn: 'fadeIn',
          animateOut: 'fadeOut',
          mouseDrag: false,
          pullDrag: false,
          touchDrag: false,
     });

     function updateActiveButton(index) {
          $('.switch-buttons.mobile .prev-arrow, .switch-buttons.mobile .next-arrow').removeClass('active');
          if (index === 0) {
               $('.switch-buttons.mobile .prev-arrow').addClass('active');
          } else {
               $('.switch-buttons.mobile .next-arrow').addClass('active');
          }
     }

     mainCarousel.on('changed.owl.carousel', function (event) {
          contentCarousel.trigger('to.owl.carousel', [event.item.index, 300, false]);
          updateActiveButton(event.item.index);
     });

     contentCarousel.on('changed.owl.carousel', function (event) {
          mainCarousel.trigger('to.owl.carousel', [event.item.index, 300, false]);
          updateActiveButton(event.item.index);
     });

     // $('.switch-buttons.mobile .prev-arrow, .switch-buttons.mobile .next-arrow').click(function (e) {
     //      $('.switch-buttons.mobile .prev-arrow, .switch-buttons.mobile .next-arrow').removeClass('active');
     //      $(this).addClass('active');
     // });


     $('.prev-arrow').click(function (e) {
          contentCarousel.trigger('prev.owl.carousel');
          console.log(e)
     });

     $('.next-arrow').click(function (e) {
          contentCarousel.trigger('next.owl.carousel');
          console.log(e)
     });
}
// covarage carousel end


document.addEventListener('DOMContentLoaded', function () {
     var newNavSection = document.querySelector('.newNav');
     var covarageCarouselSection = document.querySelector('.newCovarageCarousel');
     if (newNavSection) {
          Navlogic()
     }
     if (covarageCarouselSection) {
          covarageCarousel();
     }


});
