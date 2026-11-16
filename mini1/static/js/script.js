//Importing buildTerrain function from grid.js for commmunication with Flask
import { buildTerrain } from "./grid.js";

//constant for html elements
const form = document.querySelector("#response-form");
const input = document.querySelector("#response");
const message = document.querySelector("#response-message");
const button = form.querySelector("button");


//event listener for form submission
form.addEventListener("submit", async function(event) {
    //no reloading page 
    event.preventDefault();
    //Retrieving a submitted word
    const word = input.value.trim();

    //if empty input
    if (word === "") {
        message.textContent = "Please enter a word.";
        return;
    }
    //Temporarily disabling the submission to prevent spam while Flask receives data
    button.disabled = true;

    try {
        //Send the word to Flask with fetch, then retrieve the updated collection.
        const response = await fetch(form.action, {
            method: "POST", 
            //Data sent in JSON
            headers: {"Content-Type": "application/json"},
            //Turning a Js object into a JSON string 
            body: JSON.stringify({word: word})
        });
        //Retrieving the response from flask
        const result = await response.json();
        //Displaying the message
        message.textContent = result.message;
        //Checking if Flask responded succesfully to a new word
        if (response.ok) {
            //Resetting the text box
            form.reset();
            //Update landscape if succesful, and landscape now includes new word
            await getWords();
        }
      } 
      //If try does not work and there is an error
      catch (error) {
        message.textContent = "Something went wrong. Please try again.";
    } 
    //Activate the button again
    finally {
        button.disabled = false;
    }
});

//Async function while words are gathered from Flask    
async function getWords() {
    //getting the words stored in Flask
    const response = await fetch(form.dataset.wordsUrl);
    //Parsing JSON from Flask, added it to the json collection
    const words = await response.json();
    //Passing the words array into the buildTerrain function
    buildTerrain(words);
}
//calling, to retrieve all words when page loads 
getWords();