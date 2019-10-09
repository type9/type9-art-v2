from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient

client = MongoClient()
db = client.Type9Art
portfolio = db.art_portfolio

app = Flask(__name__, static_url_path='')

@app.route('/art')
def art_index():
    return render_template('art_index.html', portfolio=portfolio.find())

@app.route('/art/new')
def add_art():
    return render_template('art_new.html')
@app.route('/art', methods=['POST'])
def submit_art(): # on submission of new art
    artpiece = {
        'id': request.form.get('id'),
        'title': request.form.get('title'),
        'caption': request.form.get('caption'),
        'description': request.form.get('description')
    }
    portfolio.insert_one(artpiece)
    return redirect(url_for('art_index.html'))

if __name__ == '__main__':
    app.run(debug=True)
