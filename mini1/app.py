from flask import Flask, render_template

#Flask
app = Flask(__name__)


#Route to idnex
@app.route("/")
def index():
    return render_template("index.html")


#Start the development server when this file is run directly.
if __name__ == "__main__":
    app.run(debug=True)
