import os
from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId

host = os.environ.get('MONGODB_URI', 'mongodb://localhost:27017/Type9Art')
client = MongoClient(host=f'{host}?retryWrites=false')
db = client.get_default_database()
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
    return redirect(url_for('art_index'))

@app.route('/art/<piece_id>') # viewing a particular piece
def show_art(piece_id):
    artpiece = portfolio.find_one({'id': piece_id})
    return render_template('art_view.html', artpiece=artpiece)

@app.route('/art/<piece_id>/edit') # editing a particular piece
def edit_art(piece_id):
    artpiece = portfolio.find_one({'id': piece_id})
    return render_template('art_edit.html', artpiece=artpiece)
@app.route('/art/<piece_id>/<piece_objectid>', methods=['POST'])
def update_art(piece_id, piece_objectid):
    updated_artpiece = {
        'id': request.form.get('id'),
        'title': request.form.get('title'),
        'caption': request.form.get('caption'),
        'description': request.form.get('description'),
        'date': request.form.get('date')
    }
    portfolio.update_one({'_id': ObjectId(piece_objectid)}, {'$set': updated_artpiece})
    return redirect(url_for('show_art', piece_id=piece_id))

@app.route('/art/<piece_id>/remove') # editing a particular piece
def remove_art(piece_id):
    portfolio.delete_one({'id': piece_id})
    return redirect(url_for('art_index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))
