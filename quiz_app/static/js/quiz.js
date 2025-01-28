console.log('hello olaneye ahmed oladapo')

const url = window.location.href
// console.log(url)

const quizBox = document.getElementById('quiz-box')
const scoreBox = document.getElementById('score-box')
const resultBox = document.getElementById('result-box')
const timerBox = document.getElementById('timer-box')

const activateTimer = (time) =>{
    // console.log(time)

    if (time.toString().length < 2) {
        timerBox.innerHTML = `<b>0${time}:00</b>`
    }
    else {
        timerBox.innerHTML = `<b>${time}:00</b>`
    }

    let minutes = time - 1
    let seconds = 60
    let displaySeconds
    let displayMinutes

    const timer = setInterval(()=>{
        seconds --
        if (seconds < 0) {
            seconds = 59
            minutes --
        }
        if (minutes.toString().length < 2){
            displayMinutes = '0' + minutes
        }
        else{
            displayMinutes = minutes
        }

        if (seconds.toString().length < 2){
            displaySeconds = '0' + seconds
        }
        else{
            displaySeconds = seconds
        }
        if (minutes === 0 && seconds === 0){
            timerBox.innerHTML = `<b>00:00</b>`
            setTimeout(() => {
                // console.log('time over')
                clearInterval(timer)
                alert('Your time is up')
                sendData()
            }, 500)
            
        }

        timerBox.innerHTML = `<b>${displayMinutes}:${displaySeconds}</b>`
    }, 1000)
    // console.log(minutes)
}
$.ajax({ 
    type: 'GET',
    url: `${url}data`,
    success: function(response){
        // console.log(response)
        const data = response.data
        data.forEach(el => {
            for (const [question, answers] of Object.entries(el)){
                quizBox.innerHTML +=`
                    <hr>
                    <div class="mb-2">
                    <b>${question}</b>
                    </div>
                `
                answers.forEach(answer=>{
                    quizBox.innerHTML+=`
                    <div>
                        <input 
                            type="radio" class="ans" id="${question}-${answer}" 
                            name="${question}" 
                            value="${answer}"
                        >
                        <label for="${question}">${answer}</label>
                    </div>
                `
                })
            }
        });
        activateTimer(response.time)
    },
    error: function(error){
        console.log(error)
    }
})


// for the answer, score and percentage if passed or not

const quizForm  = document.getElementById('quiz-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')
// const elements = [...document.getElementsByClassName('ans')]


const sendData = ()=>{
    const elements = [...document.getElementsByClassName('ans')]
    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value
    elements.forEach(el=>{
        if (el.checked){
            data[el.name] = el.value
        } else {
            if (!data[el.name]){
                data[el.name] = null 
            }
        }
    })
    $.ajax({
        type: 'POST',
        url: `${url}save/`,
        data: data,
        success: function(response){
            // console.log(response)
            const results = response.results
            console.log(results)
            quizForm.classList.add('hidden')
            
            scoreBox.innerHTML = `${response.passed ? '' : ''} Your test result is ${response.score.toFixed(2)}%`

            results.forEach(res=>{
                const resDiv = document.createElement('div')
                for (const [question, response] of Object.entries(res)){
                    // console.log(question)
                    // console.log(response)
                    // console.log('****')

                    resDiv.innerHTML += question
                    const cls = ['container', 'p-3', 'text-light', 'h6']
                    resDiv.classList.add(...cls)

                    if (response == 'not answered') {
                        resDiv.innerHTML += '- not answered'
                        resDiv.classList.add('bg-danger')
                    }
                    else{
                        const answer = response ['answered']
                        const correct = response ['correct_answer']
                        console.log(answer, correct)

                        if (answer == correct){
                            resDiv.classList.add('bg-success')
                            resDiv.innerHTML += `| Selected Answer: ${answer}`
                        } 
                        else{
                            resDiv.classList.add('bg-danger')
                            resDiv.innerHTML += `| Correct Answer: ${correct}`
                            resDiv.innerHTML += ` | Selected Answer: ${answer}`

                        }
                    }
                }
                // const body = document.getElementsByTagName('BODY')[0]
                // body.append(resDiv)
                resultBox.append(resDiv)
            })
        },
        error: function(response){
            console.log(response)
        },
    })

}

quizForm.addEventListener('submit', e=>{
    e.preventDefault()


    sendData()
})
