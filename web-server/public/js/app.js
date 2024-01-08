console.log('Client side js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ""
    weatherFunction(address)    
})

const weatherFunction = (address) => {
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = 'Error: ' + data.error
            } else {
                messageOne.textContent = 'Location: ' + data.location
                messageTwo.textContent = data.forecastData
            }
        })
    }) 
}