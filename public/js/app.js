

const weatherForm=document.getElementsByTagName('button')[0]
const search=document.getElementsByTagName('input')[0]
const msgOne=document.querySelector('#message-one')
const msgTwo=document.querySelector('#message-two')


weatherForm.onclick=function(){
    const location=search.value

    msgOne.textContent='Loading.....'
    msgTwo.textContent=''
   

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgOne.textContent=data.error
        }else{
            msgOne.textContent=data.location 
            msgTwo.textContent=data.forecast 
        }
    })
})

}


// weatherForm.addEventListener('submit',(e)=>{
//     e.preventDefault()

//     const location=search.value

//     msgOne.textContent='Loading.....'
//     msgTwo.textContent=''
   

//     fetch('http://localhost:3000/weather?address='+location).then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             msgOne.textContent=data.location 
//             msgTwo.textContent=data.forecast 
//         }
//     })
// })

// })

