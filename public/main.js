const mainUrl = 'https://is.gd/create.php?';

const queryParams = 'format=json&url=';


// selecting page elements
const inputField = document.querySelector('#input');
const input2 = document.querySelector('#input2')
const submit = document.querySelector('#submit');
const responseField = document.querySelector('.responseField');
responseField.innerHTML = "";
// AJAX function
const getShortUrl = async (event) => {
  event.preventDefault();
  const urlToShort = inputField.value;

if (input2.value.length == 0 && urlToShort.indexOf(".") == -1 && urlToShort.length > 0 ) {
  window.location.href = "https://is.gd/" + urlToShort;
  return;
}


  let shortUrl = input2;
  if (shortUrl.value != "" && shortUrl.value.length > 4 && urlToShort.length > 0) {
    shortUrl = '&shorturl=' + shortUrl.value;
  } else if (shortUrl.value == "" && urlToShort.length > 0) {
    shortUrl = "";
  } else return false;
  const endPoint = mainUrl + queryParams + urlToShort + shortUrl;

  try {
    responseField.innerHTML = "";
    input2.style.visibility = "hidden";
    input2.disabled = true;
    const response = await fetch(endPoint);
    if (response.ok) {
      let jsonResponse = await response.json();

      if (jsonResponse['shorturl']) {
        responseField.innerHTML = `<h3 class="result" onclick="fCopy();">${jsonResponse['shorturl']}</h3><img src="public/copy.png" onclick="fCopy();">`;
        input2.style.visibility = "visible";
        input2.style.display = "none";
        input2.disabled = true;
        submit.style.display = "none";
      } else if (jsonResponse['errorcode'] == 2) {
        responseField.innerHTML = `<text style="color:red;">Create another ending of a short url.</text>`;
        input2.style.visibility = "visible";
        input2.disabled = false;
      } else {
        responseField.innerHTML = `<text style="color:orange;">${JSON.stringify(jsonResponse)}</text>`;
        input2.style.visibility = "visible";
        input2.disabled = false;
      }
    }

  }
  catch (error) {
    console.log(error);
  }
}

const showElements = () => {
  input2.style.display = "";
  input2.disabled = false;
  submit.style.display = "";
}

const fCopy = ()=>{
  let temp = inputField.value;
  inputField.value = document.querySelector(".result").innerHTML;
  inputField.setSelectionRange(0, inputField.value.length)
  document.execCommand("copy");
  inputField.value = temp;

  let e = document.querySelector(".result");
  e.className += ' an';
  setTimeout(() => {
    e.className = 'result';
}, 900);

}


submit.addEventListener('click', getShortUrl);
input2.addEventListener('input', getShortUrl);
inputField.addEventListener("click", showElements);
inputField.addEventListener("input", showElements);


const about = () => {
  event.preventDefault();
  alert("Author: Alexey Kokorev\r\rThis is a link shortener, which communicates with a web service is.gd by API.\rYou can specify the short url's ending (optionally) (at least 5 symbols). \rIf ending for a future url has been used, the result should be like this: is.gd/yourending .\rIf url's ending's fielt is empty, url will be generated automatically by is.gd.\rAfter getting result, You can copy a new url by clicking on it.\rIf You would like to be redirected to a new url, just empty both fields, and enter a new url's ending (not the url itself) into the first field, then press Enter.\rRedirection can be used separately (without shortening). \rThe redirection option might be useful on a TV browsers, in order to get a quick access to a specific url on TV. In that case, link to my program can be saved into tv browser favorites.");
}

