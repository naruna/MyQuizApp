'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: 'コーヒー生産地にも影響を与えている、太平洋赤道域の日付変更線付近から南米沿岸にかけて、海面水温が平年より高くなり、その状態が１年続く状態を何というでしょう?',c: ['エルニーニョ現象', 'ダイボールモード現象','ラニーニャ現象']},

    {q: '収穫量が少なく、メンテナンスに手間がかかる一方、この品種のコーヒーには素晴らしい深みがあると言われています。また、そのコーヒーチェリーは赤や黄色、オレンジ色になるものもあります。この品種は次のうちどれでしょう?',c: ['ブルボン種', 'カトゥーラ種','ゲイシャ種']},

    {q: 'アカテナンゴ、アティトラン、コバン、ウエウエテナンゴなどの生産地で知られる生産地はどこでしょう?',c: ['グアテマラ', 'コロンビア','ブラジル']},
  ]);
  let currentNum = 0; //いま何門目のクイズを解いてるか
  let isAnswered;
  let score = 0;

  
  function shuffle(arr) {
    
    for (let i = arr.length - 1; i > 0; i --) {
      const j = Math.floor(Math.random() * (i + 1));
     [arr[j],arr[i]] = [arr[i],arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) { 
    if(isAnswered ){
      return;
    }
      
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
       li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }
  
  function setQuiz(){
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

   const shuffledChoices = shuffle([...quizSet[currentNum].c]);
   shuffledChoices.forEach(choice => {
    const li = document.createElement('li');
    li.textContent = choice;
    li.addEventListener('click',  () => {
      checkAnswer(li);
    });
    choices.appendChild(li);
  });

  if (currentNum === quizSet.length - 1){  //currentNumが0スタートなので-1
    btn.textContent = 'Show Score';
  }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')){
      return;
    }
    btn.classList.add('disabled');

    if(currentNum === quizSet.length -1) {
      scoreLabel.textContent = (`Score: ${score} / ${quizSet.length}`);
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
      
    }
  });

}