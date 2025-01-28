console.log('hello olaneye ahmed oladapo')


const modalBtns = [...document.getElementsByClassName('modal-button')]
const modalBody = document.getElementById('modal-body-confirm')
const startBtn  = document.getElementById('start-button')


const url = window.location.href


modalBtns.forEach(modalBtn=> modalBtn.addEventListener('click', ()=>{
    const pk = modalBtn.getAttribute('data-pk')
    const name = modalBtn.getAttribute('data-quiz')
    const number_of_questions = modalBtn.getAttribute('data-questions')
    const difficulty = modalBtn.getAttribute('data-difficulty')
    const time = modalBtn.getAttribute('data-time')
    const pass_mark = modalBtn.getAttribute('data-pass_mark')
    // console.log(pk)


    modalBody.innerHTML=`
        <div class="h5 mb-3">Are you sure you want to start "<b>${name}</b>"?</div>
        <div class="text-muted">
            <ul>
                <li>Difficulty: <b>${difficulty}</b></li>
                <li>Number of Questions: <b>${number_of_questions}</b></li>
                <li>Pass Mark: <b>${pass_mark}%</b></li>
                <li>Duration for Test: <b>${time} minute(s)</b></li>
            </ul>
        </div> 
    `
    const modal = document.getElementById('StartQuiz');
    modal.setAttribute('aria-hidden', 'false');

    startBtn.addEventListener('click', ()=>{
        window.location.href = url + pk
    })
}))

const modal = document.getElementById('StartQuiz');
modal.addEventListener('hidden.bs.modal', () => {
    modal.setAttribute('aria-hidden', 'true'); 
});
