import $ from 'jquery'
import 'what-input'

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $
require('foundation-sites')

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

$(document).foundation()

/////////////////////////////
// Carousel
$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 29,
    nav: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  })
})

////////////////////////////
// Accordeon

$(function () {
  $('ul ul:not(:first)')
    .hide()
    .on('click', function (e) {
      e.stopPropagation()
    })

  $('.js-menu > li').on('click', function () {
    $(this).find('ul').stop(true, true).slideToggle()
  })
})

/////////////////////////
/////////////////////
// Reveal sections

const allSections = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
  const [entry] = entries

  if (entry.isIntersecting) entry.target.classList.remove('section--hidden')
  // else entry.target.classList.add('section--hidden')
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
})

allSections.forEach((section) => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

////////////////////
// parallax

var scene = document.getElementById('scene')
var parallaxInstance = new Parallax(scene)
