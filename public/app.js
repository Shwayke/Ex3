const header = document.querySelector('h1')
const app = document.getElementById('app')
const ddMenu = document.querySelector('#ddMenu')
const sandwitch = document.querySelectorAll('svg')
const html = document.documentElement

// Toggle the 'dark' class on the <html> element to switch themes
const toggle = () => html.classList.toggle('dark')

// switch between views of the page (Calculator, About, Contact)
const setView = (v) => {
    header.innerText = v
    toggleMenu(true)

    if (v === 'Calculator') {
        renderCalculator()
    } else if (v === 'About') {
        renderAbout()
    } else if (v === 'Contact') {
        renderContact()
    }
}

// Toggle the visibility of the dropdown menu and the hamburger icon
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden')
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden')
        })
    } else {
        ddMenu.classList.add('hidden')
        document.querySelectorAll('svg')[0].classList.remove('hidden')
        document.querySelectorAll('svg')[1].classList.add('hidden')
    }
}

const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`
    container.insertAdjacentHTML('beforeend', row)
}

// adds monitor to render calculator
const addMonitor = (container, text) => {
    const t = text ?? ''
    // old version:
    //const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`
    //added classes to allow dark mode for calc
    const monitor = `<div id="monitor" class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl dark:bg-gray-700 dark:text-white p-4 vsc-initialized"></div>`
    container.insertAdjacentHTML('beforeend', monitor)
}

// creates div for a single button
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : ''
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`
}

const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('')
    addRow(container, btnHTML)
}

const click = (event) => {
    const monitor = document.getElementById('monitor')
    const bac = monitor.innerText.trim()
    const a = event.target.innerText
    console.log(a)
    if (a === 'clear') {
        monitor.innerText = ''
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac)
    } else {
        monitor.innerText += a
    }
}

// renders calculator in page
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear']
    app.innerHTML = ''
    // code we added to add dark theme functionality to calculator:
    app.classList.add('w-full', 'p-2', 'bg-blue-100', 'dark:bg-blue-500', 'text-white')
    addMonitor(app)
    addButtons(app, labels)
    const buttons = document.querySelectorAll('.d-btn')
    buttons.forEach((el) => el.addEventListener('click', click))
}

// renders 'About' section in page
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>'
}

// renders 'Contact' section in page
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>'
}

// renders top menu of page
const renderMenu = () => {
    const ddMenuDiv = document.getElementById('ddMenu')
    ddMenuDiv.classList = `absolute top-[56px] left-0 bg-blue-300 p-3 hidden w-full`

    const menuButtonsDiv = document.getElementById('menu-buttons')
    menuButtonsDiv.classList.add('justify-start', 'gap-4', 'hidden', 'sm:flex')
    
    const buttons = ['Calculator', 'About', 'Contact']

    // create each button
    buttons.forEach(buttonName => {
        // Drop down list button
        const ddListButton = `<button class="block py-1 px-2" onclick="setView('${buttonName}')">${buttonName}</button>`
        ddMenuDiv.insertAdjacentHTML('beforeend',ddListButton)

        // regular button
        const button = `<button onclick="setView('${buttonName}')">${buttonName}</button>`
        menuButtonsDiv.insertAdjacentHTML('beforeend',button)
    });
}

// render theme buttons (Light / Dark)
const renderThemeToggle = () => {
    const themeDiv = document.getElementById('theme')
    const buttonsInfo = [
        {
            name: 'Dark',
            classes: 'dark:hidden block'
        },
        {
            name: 'Light',
            classes: 'hidden dark:block'
        }
    ]

    const buttons = buttonsInfo.map((buttonInfo) => createThemeButton(buttonInfo))
    buttons.forEach(button => themeDiv.insertAdjacentHTML("beforeend",button))

/*
    const themeDiv = document.getElementById('theme')
    const buttonsInfo = [{name: 'Dark',classes: ['dark:hidden', 'block']},{name: 'Light',classes: ['hidden', 'dark:block']}]

    // create each button
    buttonsInfo.forEach(buttonInfo => {
        const button = document.createElement('button')
        button.textContent = buttonInfo.name
        button.addEventListener('click',toggle)
        buttonInfo.classes.forEach(classString => button.classList.add(classString))
        themeDiv.appendChild(button)
    })
    */
}

const createThemeButton = (buttonInfo) => {
    return `<button class="${buttonInfo.classes}" onclick="toggle()">${buttonInfo.name}</button>`
}
renderMenu()
renderThemeToggle()
renderCalculator()



