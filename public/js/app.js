// const { response } = require("express")

console.log("Client side javascript file is loaded..")

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


// fetch('localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }   
//     })
// })

const weatherForm=document.querySelector('form')
const searchElement=document.querySelector('input')
const messageOne=document.querySelector('#msg-1')
const messageTwo=document.querySelector('#msg-2')

//messageOne.textContent='From Javascript'

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    const location=searchElement.value
    
//    console.log(location)

    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    
fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }   
    })
})
}) 