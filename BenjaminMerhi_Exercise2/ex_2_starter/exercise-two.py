from flask import Flask,render_template,request,redirect,url_for,abort
from urllib.parse import urlencode
import requests
app = Flask(__name__)


# the default route
@app.route("/")
def index():
      return render_template("index.html")

#*************************************************
#Task-1: GET REQUEST
@app.route("/t1")
def t1():
    return render_template("t1.html",have_results=False)
#*************************************************
@app.route("/getSearchCriteria")
def getSearchCriteria():

# user input and nasa api url 
    search_term = request.args.get("search", "").strip()
    base_url = "https://images-api.nasa.gov/search"
    search_params = {"q": search_term, "media_type": "image"}

    nasa_url = f"{base_url}?{urlencode(search_params)}"

#request
  
    response = requests.get(nasa_url)
    response.raise_for_status()
    nasa_data = response.json()
    
# list of results
    items = nasa_data["collection"]["items"]

    first_item = items[0]
    imgFromNasa = first_item["links"][0]["href"]
    description = first_item["data"][0]["description"]

    #replace the empty space to be url encoded
    imgFromNasa = imgFromNasa.replace(' ', '%20')
    return render_template("t1.html",
                          have_results = True,
                          description=description,
                          imgPath = imgFromNasa
                          )

#*************************************************
#Task-2: GET REQUEST
@app.route("/t2")
def t2():
    return render_template("t2.html")
#*************************************************
@app.route("/getSearchCriteriaAdv", methods=["GET"])
def getSearchCriteria_adv():
    search_term = request.args.get("search", "").strip()
    encodedImageLinks = []
    response = requests.get("https://images-api.nasa.gov/search",
                            params={"q": search_term, "media_type": "image"})
    response.raise_for_status()
    items = response.json()["collection"]["items"]

    for item in items[:4]:
        links = item.get("links", [])
        if links:
            encodedImageLinks.append(links[0]["href"].replace(' ', '%20'))

    return render_template("t2.html",images=encodedImageLinks)
#*************************************************

#run
app.run(debug=True)
