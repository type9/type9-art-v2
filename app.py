from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient

app = Flask(__name__, static_url_path='')

@app.route('/art')
def art_index():
    return render_template('art_index.html')

if __name__ == '__main__':
    app.run(debug=True)
