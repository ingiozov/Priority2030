import $ from 'jquery'
import 'what-input'

window.jQuery = $
require('foundation-sites')

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

////////////////////////////////////////
////////////////////////////////////////
// New Accordeon 'Grant page'

function initAcc(elem, option) {
  //addEventListener on mouse click
  document.addEventListener('click', function (e) {
    //check is the right element clicked
    if (!e.target.matches(elem + ' .a-btn')) return
    else {
      //check if element contains active class
      if (!e.target.parentElement.classList.contains('active')) {
        if (option == true) {
          //if option true remove active class from all other accordions
          var elementList = document.querySelectorAll(elem + ' .a-container')
          Array.prototype.forEach.call(elementList, function (e) {
            e.classList.remove('active')
          })
        }
        //add active class on cliked accordion
        e.target.parentElement.classList.add('active')
      } else {
        //remove active class on cliked accordion
        e.target.parentElement.classList.remove('active')
      }
    }
  })
}

//activate accordion function
initAcc('.accordion', false)

////////////////////////////
////////////////////////////
// modal

const popupLinks = document.querySelectorAll('.grant-link')
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true

const timeout = 800

if (popupLinks.length > 0) {
  popupLinks.forEach((popupLink) => {
    popupLink.addEventListener('click', (e) => {
      e.preventDefault()
      const popupName = popupLink.getAttribute('href').replace('#', '')
      const currentPopup = document.getElementById(popupName)
      popupOpen(currentPopup)
    })
  })
}

const popupCloseIcons = document.querySelectorAll('.close-popup')

popupCloseIcons.forEach((icon) => {
  icon.addEventListener('click', (e) => {
    e.preventDefault()
    popupClose(icon.closest('.popup'))
  })
})

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open')
    if (popupActive) {
      popupClose(popupActive, false)
    } else {
      bodyLock()
    }

    currentPopup.classList.add('open')
    currentPopup.addEventListener('click', (e) => {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open')
    if (doUnlock) {
      bodyUnLock()
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding; index++) {
      const el = lockPadding[index]
      el.style.paddingRight = lockPaddingValue
    }
  }

  body.style.paddingRight = lockPaddingValue
  body.classList.add('lock')

  unlock = false
  setTimeout(() => {
    unlock = true
  }, timeout)
}

function bodyUnLock() {
  setTimeout(() => {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding; index++) {
        const el = lockPadding[index]
        el.style.paddingRight = '0px'
      }
    }

    body.style.paddingRight = '0px'
    body.classList.remove('lock')
  }, timeout)

  unlock = false
  setTimeout(() => {
    unlock = true
  }, timeout)
}

//////////////////////////
// Sticky nav

const header = document.querySelector('.intro')
const nav = document.querySelector('.nav')

const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
  const [entry] = entries

  if (!entry.isIntersecting) nav.classList.add('_sticky')
  else nav.classList.remove('_sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
})

headerObserver.observe(header)

/////////////////////////
// New off canvas

const iconMenu = document.querySelector('.menu__icon')
if (iconMenu) {
  const menuBody = document.querySelector('.menu__body')
  iconMenu.addEventListener('click', () => {
    document.body.classList.toggle('_lock')
    iconMenu.classList.toggle('_active')
    menuBody.classList.toggle('_active')
  })
}

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
  threshold: 0.05,
})

allSections.forEach((section) => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

////////////////////
// parallax

var scene = document.getElementById('scene')
if (scene) {
  var parallaxInstance = new Parallax(scene)
}

//////////////////////////
// Accordeon

const accBtns = document.querySelectorAll('.accordeon__head')

if (accBtns.length > 0) {
  accBtns.forEach((item) => {
    item.addEventListener('click', (event) => {
      const accCollapse = item.nextElementSibling

      if (!item.classList.contains('open')) {
        accCollapse.style.display = 'block'
        let accHeight = accCollapse.clientHeight
        setTimeout(() => {
          accCollapse.style.height = accHeight + 'px'
          accCollapse.style.display = ''
        }, 1)

        accCollapse.classList = 'accordeon__collapse collapsing'

        setTimeout(() => {
          accCollapse.classList = 'accordeon__collapse collapse open'
          // accCollapse.style.height = ''
        }, 300)
      } else {
        accCollapse.classList = 'accordeon__collapse collapsing'

        setTimeout(() => {
          accCollapse.style.height = '0px'
        }, 1)

        setTimeout(() => {
          accCollapse.classList = 'accordeon__collapse collapse'
          accCollapse.style.height = ''
        }, 300)
      }

      item.classList.toggle('open')
      item.nextElementSibling.classList.toggle('open')
    })
  })

  const accImg1 = document.querySelector('.acc-img-1')
  const accImg2 = document.querySelector('.acc-img-2')
  const accImg3 = document.querySelector('.acc-img-3')

  accBtns[0].addEventListener('click', () => {
    accImg1.classList.remove('hidden')
    accImg1.nextElementSibling.classList.add('hidden')
    accImg2.nextElementSibling.classList.add('hidden')
  })
  accBtns[1].addEventListener('click', () => {
    if (accBtns[1].classList.contains('open')) {
      accImg2.classList.remove('hidden')
      accImg2.nextElementSibling.classList.add('hidden')
      accImg2.previousElementSibling.classList.add('hidden')
    } else {
      accImg2.classList.add('hidden')
      accImg2.previousElementSibling.classList.remove('hidden')
      accImg2.nextElementSibling.classList.add('hidden')
    }
  })
  accBtns[2].addEventListener('click', () => {
    if (accBtns[2].classList.contains('open')) {
      accImg3.classList.remove('hidden')
      accImg3.previousElementSibling.classList.add('hidden')
      accImg2.previousElementSibling.classList.add('hidden')
    } else {
      accImg3.classList.add('hidden')
      accImg2.previousElementSibling.classList.remove('hidden')
      accImg3.previousElementSibling.classList.add('hidden')
    }
  })
}

////////////////////////////
// NEW COUNTDOWN
const months = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
]

const weekdays = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
]

const deadline = document.querySelector('.deadline')
const items = document.querySelectorAll('.deadline-format h5')

let futureDate = new Date(2021, 6, 18, 12, 30, 0)

const year = futureDate.getFullYear()
const hours = futureDate.getHours()
const minutes = futureDate.getMinutes()

const month = months[futureDate.getMonth()]
const date = futureDate.getDate()
const weekday = weekdays[futureDate.getDay()]

// Future time in ms
const futureTime = futureDate.getTime()

function getRemainingTime() {
  const today = new Date().getTime()
  const t = futureTime - today

  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinute = 60 * 1000

  // calculate all values
  let days = Math.floor(t / oneDay)
  let hours = Math.floor((t % oneDay) / oneHour)
  let minutes = Math.floor((t % oneHour) / oneMinute)
  let seconds = Math.floor((t % oneMinute) / 1000)

  // set values array

  const values = [days, hours, minutes, seconds]

  const format = (item) => {
    if (item < 10) {
      return (item = `0${item}`)
    }
    return item
  }

  items.forEach((item, index) => {
    item.innerHTML = format(values[index])
  })

  if (t < 0) {
    clearInterval(countdown)
    deadline.innerHTML = `<h4>Прием заявок окончен</h4>`
  }
}

let countdown = setInterval(getRemainingTime, 1000)

getRemainingTime()
// END NEW COUNTDOWN
////////////////////

///////////////////////////
// New News Filtering

window.filterNews = (e) => {
  const loadmore = document.querySelector('#loadmore')
  const news = document.querySelectorAll('.news-item')
  let filter = e.target.dataset.filter
  if (filter === '*') {
    news.forEach((item, index) => {
      item.style.display = 'block'
      if (loadmore) loadmore.style.display = 'none'
    })
  } else {
    news.forEach((item) => {
      item.classList.contains(filter)
        ? (item.style.display = 'block')
        : (item.style.display = 'none')
    })
  }
}

///////////////////////
// LOAD MORE
// New Load More
if (document.body.contains(document.querySelector('#loadmore'))) {
  const loadmore = document.querySelector('#loadmore')

  let currentItems = 4
  loadmore.addEventListener('click', (e) => {
    const elementList = [...document.querySelectorAll('.news-item')]
    for (let i = currentItems; i < currentItems + 2; i++) {
      if (elementList[i]) {
        elementList[i].style.display = 'block'
      }
    }
    currentItems += 2

    // Load more button will be hidden after list fully loaded
    if (currentItems >= elementList.length) {
      event.target.style.display = 'none'
      currentItems = 4
    }
  })
}

////////////////////////////
// tabs
const tabsContent = document.querySelectorAll('.about-tabs--content')
const tabs = document.querySelectorAll('.about-tab')
const tabsContainer = document.querySelector('.about-tabs--container')

if (tabsContent.length > 0) {
  tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target

    if (!clicked) return

    // Remove active classes
    tabs.forEach((t) => t.classList.remove('about-tab--active'))
    tabsContent.forEach((c) =>
      c.classList.remove('about-tabs--content--active')
    )

    // Activate tab
    clicked.classList.add('about-tab--active')

    // Activate Content
    document
      .querySelector(`.about-tabs--content--${clicked.dataset.tab}`)
      .classList.add('about-tabs--content--active')
  })
}

///////////////////////////////
// text reveal

const text = [
  'Лидерство в&nbsp;науке, образовании и&nbsp;технологиях',
  'Содействие региональному развитию',
  'Формирование цифровых компетенций',
  'Глобальная конкурентоспособность российских университетов',
  'Развитие и&nbsp;самореализация талантов',
]
let counter = 0
const elem = document.getElementById('word')

if (elem) {
  // const inst = setInterval(change, 1000) // to stop after one loop

  const change = () => {
    elem.classList.add('hide2')
    setTimeout(() => {
      elem.innerHTML = text[counter]
      elem.classList.remove('hide2')
      counter++

      if (counter >= text.length) {
        counter = 0
      }
    }, 500)

    // clearInterval(inst)
  }

  setInterval(change, 4000)
}
