from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient

client = MongoClient()
db = client.Type9Art
portfolio = db.art_portfolio

app = Flask(__name__, static_url_path='')

@app.route('/art')
def art_index():
    return render_template('art_index.html', portfolio=portfolio.find())

@app.route('/art/new') # submitting new art
def add_art():
    return render_template('art_new.html')
@app.route('/art', methods=['POST'])
def submit_art(): # on submission of new art
    artpiece = {
        'id': request.form.get('id'),
        'title': request.form.get('title'),
        'caption': request.form.get('caption'),
        'description': request.form.get('description'),
        'date': request.form.get('date')
    }
    portfolio.insert_one(artpiece)
    return redirect(url_for('art_index.html'))

@app.route('/art/<piece_id>') # viewing a particular piece
def playlists_show(piece_id):
    artpiece = portfolio.find_one({'id': piece_id})
    return render_template('art_view.html', artpiece=artpiece)

if __name__ == '__main__':
    app.run(debug=True)
