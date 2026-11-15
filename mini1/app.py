import json
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


#Home page
@app.route("/")
def index():
    return render_template("index.html")


#Receive word from js
@app.route("/submit", methods=["POST"])
def submit_response():

    data = request.get_json()
    word = data["word"]

    #check that the word is valid
    if not word.strip() or len(word.split()) != 1:
        return jsonify({"message": "Please enter a single word."}), 400

    #read existing responses
    try:
        with open("responses.json", "r") as file:
            responses = json.load(file)
    except FileNotFoundError:
        responses = []

    #Add the new word
    responses.append(word.strip())

    #Save the updated responses
    with open("responses.json", "w") as file:
        json.dump(responses, file, indent=4)

    return jsonify({"message": "Your response has been saved!"})

# route for gettign the words from the json file
@app.route("/getWord")
def get_word():

    with open("responses.json", "r") as file:
        words = json.load(file)

    return jsonify(words)


if __name__ == "__main__":
    app.run(debug=True, port=5001)