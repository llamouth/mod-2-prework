const api_url = "https://api.quotable.io/random"
const quote = document.getElementById("quote")
const author = document.getElementById("author")

 const getQuote = async (url) => {
    const response = await fetch(url);
    let data = await response.json()
    quote.innerHTML = data.content
    author.innerHTML = data.author
}

const tweet = () => {
    window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + "---- by " + author.innerHTML, "Twwet Window", "width=600, height=300")
}

getQuote(api_url)