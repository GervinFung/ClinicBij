import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser

DB = 'clinic.sqlite'

app = Flask(__name__)

@app.route('api/user/<str:user_id>', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    
    cursor.execute('SELECT * FROM user WHERE user_id=?', (userId))
    rows = cursor.fetchone()

    print(rows)

    db.close()


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=6000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)