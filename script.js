const btnBurger = document.getElementById('btn-burger')
const listMenu = document.getElementById('list-menu')
const btnClose = document.getElementById('btn-close')
const btnTheme = document.getElementById('btn-theme')
const listProject = document.querySelector('#listProject')
const closeBtn = document.getElementById('close-modal')
const wrapperModal = document.getElementById('wrapper-modal')

const imgProject = document.getElementById('img-project')
const listStack = document.getElementById('list-stack')
const titleProject = document.getElementById('title-project')
const descProject = document.getElementById('desc-project')
const listDemo = document.getElementById('list-demo')

const body = document.querySelector('body')
const tempProjects = []

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

async function getProject() {  
    const req = await fetch("project.json")
    const res = await req.json()
    return res
}

function readMore() {  
    const textDesc = document.querySelectorAll('.read-more')
    textDesc.forEach((el, key) => {
        el.addEventListener('click', function(e) {
            const detail = tempProjects.filter((val) => {
                return val.id == e.target.dataset.id
            })
            wrapperModal.classList.remove('hidden')
            wrapperModal.classList.add('flex')
            wrapperModal.dataset.hidden = false
            body.classList.add('overflow-hidden')
            if(detail.length > 0) {
                imgProject.setAttribute('src', detail[0]?.photo)
                titleProject.innerText = detail[0]?.title
                descProject.innerText = detail[0]?.desc
                var stacks = ""
                detail[0]?.stack.map(stack => {
                    stacks += `<span class="bg-yellow-500 px-2 py-0 rounded text-sm">${stack}</span>`
                })
                listStack.innerHTML = stacks
                var demos = ""
                detail[0]?.demo.map(demo => {
                    demos += `<li><a href="${demo}" class="text-yellow-500 underline">${demo}</a></li>`
                })
                listDemo.innerHTML = demos
            }
        })
    })
}
body.addEventListener('keyup', e => {
    if(e.key == "Escape") {
        closeModal()
    }
})

closeBtn.addEventListener('click', e => {
    closeModal()
})


function closeModal() {  
    wrapperModal.classList.add('hidden')
    wrapperModal.classList.remove('flex')
    body.classList.remove('overflow-hidden')
    wrapperModal.dataset.hidden = true
}

getProject().then(result => result).then(res => {
    var html = "";
    if(res.length > 0) {
        res.map(result => {
            tempProjects.push(result)
            html += `<div class="bg-gray-900 bg-opacity-50">
                <div class="aspect-w-16 aspect-h-9">
                    <img src="${result.photo}" alt="${result.title}" class="object-cover">
                </div>
                <div class="flex flex-col p-2">
                    <span class="text-white font-bold font-playfair truncate text-sm" role="button">${result.title}</span>
                    <span class="text-xs font-playfair text-white text-justify line-clamp-2 text-desc">${result.desc}</span>
                    <button class="read-more bg-yellow-500 mt-2  p-1" data-id="${result.id}">Selengkapnya</button>
                </div>
            </div>`
        })
    }
    listProject.innerHTML = html
    readMore()
})


