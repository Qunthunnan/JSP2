export default function faqList (questionsClass, questionActivityClass, answersClass) {
    const questions = document.querySelectorAll(`.${questionsClass}`),
          answers = document.querySelectorAll(`.${answersClass}`);

          answers.forEach(answer => {
            answer.style.display = 'none';
          });

          questions.forEach((question, i) => {

            question.addEventListener('click', (e) => {
                answers.forEach(answer => {
                    answer.style.display = 'none';
                });    

                const curentActive = document.querySelector(`.${questionActivityClass}`);
                if(curentActive)
                    curentActive.classList.remove(questionActivityClass);
                question.classList.add(questionActivityClass);

                answers[i].style.display = 'block';
            });
          });
}