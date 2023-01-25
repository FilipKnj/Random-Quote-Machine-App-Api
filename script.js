const quoteBtn = document.querySelector('#quoteBtn'),
      quoteText = document.querySelector('.quote'),
      author = document.querySelector('.author span'),
      speakBtn = document.querySelector('#soundBtn'),
      copyBtn = document.querySelector('#copyBtn'),
      twitterBtn = document.querySelector('#twitterBtn');

const colors = [
        {
            bck : '#3c181c',
            txt : '#b9405b'
        },
        {
            bck : '#213586',
            txt : '#7086db'
        },
        {
            bck : '#9e619e',
            txt : '#d8bfd8'
        },
        {
            bck : '#b64262',
            txt : '#c96984',
        },
        {
            bck : '#633663',
            txt : '#b77bb7'
        },
        {
            bck : '#6e6259',
            txt : '#a4988e',
        },
        {
            bck : '#f3b4a5',
            txt : '#fad9d1'
        },
        {
            bck : '#b68a99',
            txt : '#ceb1ba'
        },
        {
            bck : '#381f1a',
            txt : '#7a4338'
        },
        {
            bck : '#546a2f',
            txt : '#98b95f'
        }];
let counter = 0;

    
const randQuote = () => {
    //Asinhronost JS 
    quoteBtn.classList.add('loading');
    quoteBtn.innerText = `Loading Quote`
    //Hvatanje random quota/data preko API i pretvaranje u JSON format
    fetch('https://api.quotable.io/random').then(res => res.json()).then(data => {
        quoteText.innerText = `${data['content']}`;
        author.innerText = `${data['author']}`;
        quoteBtn.classList.remove('loading');
        quoteBtn.innerText = 'New Quote'
        colorChange();
    }).catch(error => {
        //Hvatanje i prijavljivanje greske tokom izavrasanja zadatka
        alert(error)
    });
};     

quoteBtn.addEventListener('click',randQuote);

speakBtn.addEventListener('click', () => {
    //SpeechSynthesisUtterance je web speech api koji predstavlja speech zahtev
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${author.innerText}`);
    speechSynthesis.speak(utterance) // speak metoda speechSynthesis koja izgovarav utterance 
});

copyBtn.addEventListener('click', () => {
    //Kopira tekst na copy dugme
    //writeText() svojstvo skladisti kopirani tekst u clipboard
    navigator.clipboard.writeText(`${quoteText.innerText}`)
})

twitterBtn.addEventListener('click', () => {
    let twitUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(twitUrl, '_blank'); //Otvara twitter sa prenesenim tekstom za postovanje
})

const colorChange = () => {
    counter++;
    document.querySelector('body').style.background = `${colors[counter].bck}`;
    document.querySelector('.main-container').style.boxShadow = `5px 5px 15px 5px ${colors[counter].txt}`;
    document.querySelector('.buttons').style.borderTop = `1px solid ${colors[counter].bck}`;
    let li = document.querySelectorAll('li');
    li.forEach(el => {
        el.style.color = `${colors[counter].bck}`;
        el.style.border = `3px solid ${colors[counter].bck}`;
    })
    quoteBtn.style.background = `${colors[counter].bck}`;
    if(counter === colors.length - 1){
        counter = 0;
    }
}