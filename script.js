//Manipulating HTML document elements by DOM
const quoteContainer = document.getElementById("quoteContainer");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitterBtn");
const newQuoteButton = document.getElementById("newQuoteBtn");
const loaderElement = document.getElementById("loader");

// To hide quote generator
function loading(){
    loaderElement.hidden = false;
    quoteContainer.hidden = true;
}
function complete(){
    loaderElement.hidden = true;
    quoteContainer.hidden = false;
}
//Getting an array of quotes
apiQuotes=[];
// To print any random quote
function randomQuote(){
    loading();
    quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = Unknown;
    }
    else{
        authorText.textContent = quote.author;
    }
    if(quote.text.length>100){
        quoteText.classList.add('longQuote');
    }
    else{
        quoteText.classList.remove('longQuote')
    }
    quoteText.textContent = quote.text;
    complete();
}
// Getting an array of quotes
async function getQuotes(){
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        randomQuote();
    }
    catch(error){
        alert();
    }
}
function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterURL,'_blank');
}
twitterButton.addEventListener('click',tweetQuote);
newQuoteButton.addEventListener('click',randomQuote);
getQuotes();