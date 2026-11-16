import json
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


#Home page
@app.route("/")
def index():
    return render_template("index.html")


#Receive word from js through POST
@app.route("/submit", methods=["POST"])
def submit_response():
    #Receives and parses json data from request
    data = request.get_json()
    #Extract the word from the data
    word = data["word"]

    #check that the word is valid, no empty strings or multiple words
    if not word.strip() or len(word.split()) != 1:
        #error message is sent back to the client as a JSON response with a 400 status code
        return jsonify({"message": "Please enter a single word."}), 400

    #read existing responses
    try:
        with open("responses.json", "r") as file:
            #converts the json data into a python list
            responses = json.load(file)
    #if there are no submitted words yet, an empty list is created         
    except FileNotFoundError:
        responses = []

    #Add the new word
    responses.append(word.strip())

    #Save the updated responses
    with open("responses.json", "w") as file:
        #converts the python list into json data and saves it to the file
        json.dump(responses, file, indent=4)

    return jsonify({"message": "Your response has been saved!"})

# route for gettign the words from Flask
@app.route("/getWord")
def get_word():
    #Read the words in JSON file
    with open("responses.json", "r") as file:
        words = json.load(file)
    #Return the words as a JSON response, for Javascript to use
    return jsonify(words)

#Run the Flask app, port 5001
if __name__ == "__main__":
    app.run(debug=True, port=5001)