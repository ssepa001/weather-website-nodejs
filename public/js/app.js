const weatherForm = document.querySelector('#form-location')
const search = document.querySelector('#input-location')
const msgOne = document.querySelector('#message-one')
const msgTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msgOne.textContent = 'Loading weather information...'
    msgTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error)
            return msgOne.textContent = data.error
        msgOne.textContent = data.forecast
        msgTwo.textContent = data.location
    })
})
})