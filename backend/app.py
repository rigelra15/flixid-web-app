from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import psycopg2
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host="db",
            port="5432",
            database="postgres",
            user="postgres",
            password="postgres"
        )
        return conn
    except Exception as e:
        print("Database connection error:", e)
        return None

@app.route('/movies', methods=['GET'])
def get_movies():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    cur = conn.cursor()
    cur.execute('SELECT * FROM movies;')
    records = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(records), 200

@app.route('/movies', methods=['POST'])
def add_movie():
    new_movie = request.json
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    cur = conn.cursor()
    try:
        cur.execute('INSERT INTO movies (title, overview, rating, cover, genre, release_date, duration, category, age_rating, trailer, episode) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id', 
                    (new_movie['title'], new_movie['overview'], new_movie['rating'], new_movie['cover'], new_movie['genre'], new_movie['release_date'], new_movie['duration'], new_movie['category'], new_movie['age_rating'], new_movie['trailer'], new_movie['episode']))
        movie_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({"message": "Movie added successfully", "id": movie_id}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": "Failed to add movie", "details": str(e)}), 400
    finally:
        cur.close()
        conn.close()

@app.route('/movies/<int:movie_id>', methods=['PUT'])
def edit_movie(movie_id):
    updated_movie = request.json
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    cur = conn.cursor()
    try:
        cur.execute('UPDATE movies SET title = %s, overview = %s, rating = %s, cover = %s, genre = %s, release_date = %s, duration = %s, category = %s, age_rating = %s, trailer = %s, episode = %s WHERE id = %s',
                    (updated_movie['title'], updated_movie['overview'], updated_movie['rating'], updated_movie['cover'], updated_movie['genre'], updated_movie['release_date'], updated_movie['duration'], updated_movie['category'], updated_movie['age_rating'], updated_movie['trailer'], updated_movie['episode'], movie_id))
        conn.commit()
        return jsonify({"message": "Movie updated successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": "Failed to update movie", "details": str(e)}), 400
    finally:
        cur.close()
        conn.close()

@app.route('/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    cur = conn.cursor()
    try:
        cur.execute('DELETE FROM movies WHERE id = %s', (movie_id,))
        conn.commit()
        return jsonify({"message": "Movie deleted successfully"}), 204
    except Exception as e:
        conn.rollback()
        return jsonify({"error": "Failed to delete movie", "details": str(e)}), 400
    finally:
        cur.close()
        conn.close()

@app.route('/movies/search', methods=['GET'])
def search_movies():
    query = request.args.get('search', '')
    if not query:
        return jsonify({"error": "Search query is required"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    cur = conn.cursor()
    try:
        search_query = f"%{query}%"
        cur.execute("SELECT * FROM movies WHERE title ILIKE %s", (search_query,))
        results = cur.fetchall()

        movies = [{"id": row[0], "title": row[1], "overview": row[2], "rating": row[3], "cover": row[4]} for row in results]

        return jsonify(movies), 200
    except Exception as e:
        return jsonify({"error": "Failed to search movies", "details": str(e)}), 400
    finally:
        cur.close()
        conn.close()

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return jsonify({'filename': filename}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0')