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
