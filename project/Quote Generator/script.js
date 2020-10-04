const quoteText = document.querySelector('.quote-text #quote');
const quoteAuthor = document.querySelector('.quote-author #author');
const newQuoteBtn = document.querySelector('#new-quote');
const tweetBtn = document.querySelector('#twitter');
const loader = document.querySelector('#loader');
const quoteContainer = document.querySelector('#quote-container');

async function getQuote() {
    loader.style.display = "block";
    quoteContainer.style.display = "none";
    
    try {
        const res = await fetch('https://cors-anywhere.herokuapp.com/' + 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json');
        const data = await res.json();
        loader.style.display = "none";
        quoteContainer.style.display = "block";
        setText(data.quoteText, data.quoteAuthor);
    }
    catch (error) {
        console.log('Woops!! ', error);
        getQuote();
    }
}
getQuote();
function setText(text, author) {
    if (text.length > 50) {
        quoteText.classList.add('long-quote');
    }
    else { quoteText.classList.remove('long-quote'); }
    quoteText.textContent = text;
    if (author === '') author = "Anonymous";
    quoteAuthor.textContent = '~' + author;
}
newQuoteBtn.addEventListener('click', getQuote);
tweetBtn.addEventListener('click', function () {
    const text = quoteText.textContent;
    const author = quoteAuthor.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text} - ${author.slice(1)}`;
    window.open(twitterUrl, '_blank');
});