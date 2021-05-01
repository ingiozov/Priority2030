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

//////////////////////////
// Sticky nav
const header = document.querySelector('.intro')
const nav = document.querySelector('.nav')

const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
  const [entry] = entries

  if (!entry.isIntersecting) nav.classList.add('sticky2')
  else nav.classList.remove('sticky2')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
})

headerObserver.observe(header)

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

    // accImg2.classList.add('hidden')
    // accImg3.classList.add('hidden')
  })
  accBtns[1].addEventListener('click', () => {
    accImg2.classList.remove('hidden')
    accImg2.nextElementSibling.classList.add('hidden')
    accImg2.previousElementSibling.classList.add('hidden')
  })
  accBtns[2].addEventListener('click', () => {
    accImg3.classList.remove('hidden')
    accImg3.previousElementSibling.classList.add('hidden')
    accImg2.previousElementSibling.classList.add('hidden')
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

let futureDate = new Date(2021, 6, 19, 12, 30, 0)

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

/////////////////////
// NEWS FILTERING
const menu = [
  {
    id: 1,
    category: 'Наука и технологии',
    img: 'img-news-1.jpg',
    date: '22 июля 2020',
    text:
      'Университетам - участникам ПСАЛ будут выделены дополнительные средства на развитие науки',
  },
  {
    id: 2,
    category: 'Регионы',
    img: 'img-news-2.jpg',
    date: '21 июля 2020',
    text: 'Старт новой Программы поддержки вузов будет дан в конце сентября',
  },
  {
    id: 3,
    category: 'Таланты',
    img: 'img-news-3.jpg',
    date: '15 июля 2020',
    text: 'Особые условия для творческих вузов',
  },
  {
    id: 4,
    category: 'Партнерство',
    img: 'img-news-4.jpg',
    date: '10 июля 2020',
    text:
      'Дизайн Программы стратегического академического лидерства обсужден с университетским и академическим сообществом',
  },
  {
    id: 5,
    category: 'События',
    img: 'img-news-6.jpg',
    date: '10 июля 2020',
    text:
      'Новый проект господдержки вузов учтет позитивный опыт предшествующих программ',
  },
  {
    id: 1,
    category: 'Наука и технологии',
    img: 'img-news-1.jpg',
    date: '22 июля 2020',
    text:
      'Университетам - участникам ПСАЛ будут выделены дополнительные средства на развитие науки',
  },
  {
    id: 2,
    category: 'Регионы',
    img: 'img-news-2.jpg',
    date: '21 июля 2020',
    text: 'Старт новой Программы поддержки вузов будет дан в конце сентября',
  },
  {
    id: 3,
    category: 'Таланты',
    img: 'img-news-3.jpg',
    date: '15 июля 2020',
    text: 'Особые условия для творческих вузов',
  },
  {
    id: 4,
    category: 'Партнерство',
    img: 'img-news-4.jpg',
    date: '10 июля 2020',
    text:
      'Дизайн Программы стратегического академического лидерства обсужден с университетским и академическим сообществом',
  },
  {
    id: 5,
    category: 'События',
    img: 'img-news-6.jpg',
    date: '10 июля 2020',
    text:
      'Новый проект господдержки вузов учтет позитивный опыт предшествующих программ',
  },
]

const newsContainer = document.querySelector('.news-container')

if (document.body.contains(document.querySelector('.news'))) {
  const newsBtnsContainer = document.querySelector('.news-buttons')

  // Load items
  window.addEventListener('DOMContentLoaded', function () {
    displayMenuItems(menu)
    displayMenuButtons()
  })

  const displayMenuItems = (menuItems) => {
    let displayMenu = menuItems
      .map((item) => {
        return `<div class="news-item cell small-12 medium-6">
            <div class="news-item--img">
                <img src="../assets/img/${item.img}" alt="news-image">
            </div>
            <div class="label-date">
              <p class="label-date__label">${item.category}</p>
              <img src="../assets/img/news-slash.png" alt="" />
              <p class="label-date__date">${item.date}</p>
            </div>

            <div class="news-item__text">
              ${item.text}
            </div>
            <a href="news.html" class="news-item__btn news-item__btn--main">
              подробнее
            </a>
        </div>`
      })
      .join('')

    newsContainer.innerHTML = displayMenu
  }

  const displayMenuButtons = () => {
    // const categories = new Set(menu.map((item) => item.category))
    const categories = menu.reduce(
      function (values, item) {
        if (!values.includes(item.category)) {
          values.push(item.category)
        }
        return values
      },
      ['Все']
    )

    const categoryBtns = categories
      .map((category) => {
        return `<button href="" class="btn-news" data-id="${category}">${category}</button>`
      })
      .join('')
    newsBtnsContainer.innerHTML = categoryBtns
    const newsBtns = newsBtnsContainer.querySelectorAll('.btn-news')
    // Filter items
    newsBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const category = e.currentTarget.dataset.id
        const menuCategory = menu.filter((menuItem) => {
          if (menuItem.category === category) {
            return menuItem
          }
        })
        if (category === 'Все') {
          displayMenuItems(menu)
        } else {
          displayMenuItems(menuCategory)
        }
      })
    })
  }
}

////////////////////////
// END NEWS FILTERING

///////////////////////
// LOAD MORE

if (document.body.contains(document.querySelector('#loadmore'))) {
  const loadmore = document.querySelector('#loadmore')

  let currentItems = 2
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
