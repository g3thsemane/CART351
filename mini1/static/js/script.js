//constant for html elements
const form = document.querySelector("#response-form");
const input = document.querySelector("#response");
const message = document.querySelector("#response-message");

//event listener for form submission
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const word = input.value.trim();

    //if empty input
    if (word === "") {
        message.textContent = "Please enter a word.";
        return;
    }

    //sending the word to flask
    const response = await fetch(form.action, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({word: word})
    });

    //Receive the response from Flask
    const result = await response.json();

    message.textContent = result.message;

    //Clear input if success
    if (response.ok) {
        form.reset();
    }
});