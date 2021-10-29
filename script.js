const btnBurger = document.getElementById('btn-burger')
const listMenu = document.getElementById('list-menu')
const btnClose = document.getElementById('btn-close')
const btnTheme = document.getElementById('btn-theme')
btnBurger.addEventListener('click', function(e) {
    e.preventDefault()
    listMenu.classList.remove('-left-1/2')
    listMenu.classList.add('left-0')
})

btnClose.addEventListener('click', function(e) {
    e.preventDefault()
    listMenu.classList.remove('left-0')
    listMenu.classList.add('-left-1/2')
})

