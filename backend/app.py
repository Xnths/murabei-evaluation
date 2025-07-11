from datetime import datetime, timezone
import sqlite3

from flask import Flask, jsonify, request, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/ping")
def ping():
    return jsonify({"message": "pong"})

if __name__ == "__main__":
    app.run()

@app.route("/status", methods=["GET"])
def hello_world():
    return "online"

# GET /api/v1/books - returns a list of all books
@app.route('/api/v1/books', methods=['GET'])
def get_books_router():
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    query = request.args.get('q', default="", type=str).strip()
    title = request.args.get('title', default="", type=str).strip()
    author = request.args.get('author', default="", type=str).strip()

    filters = {
        "query": query,
        "title": title,
        "author": author
    }

    return jsonify(filter_books(filters, page, page_size))

# GET /api/v1/books/<book_id> - return the book with the given id
@app.route('/api/v1/books/<book_id>', methods=['GET'])
def get_book_route(book_id):
    book = get_book_by_id(book_id)

    # Return the books as a JSON response
    return jsonify({
        "book": book
    })

# PUT /api/v1/books/<book_id> - edit the book data with the given id
@app.route('/api/v1/books/<book_id>', methods=['PUT'])
def edit_book_route(book_id):
    try:
        book_id = int(book_id)
    except ValueError:
        abort(400, description="Invalid book ID")

    book_data = request.get_json()
    if not book_data:
        abort(400, description="Missing JSON body")

    updated_book = edit_book(book_id, book_data)

    return jsonify({
        "book": updated_book
    })

# DELETE /api/v1/books/<book_id> - soft delete the book by the given id
@app.route('/api/v1/books/<book_id>', methods=['DELETE'])
def delete_book_route(book_id):
    delete_book(book_id)

    return jsonify({"message": f"Book {book_id} logically deleted."}), 200


# GET /api/v1/books/author/<author> - returns a list of all books by the given author
@app.route('/api/v1/books/author/<author_slug>', methods=['GET'])
def get_books_by_author_route(author_slug):
    return jsonify(get_books_by_author_name(author_slug))

# GET /api/v1/books/subject/<subject_slug> - returns a list of all books by the given subject
@app.route('/api/v1/books/subjects', methods=['GET'])
def get_books_by_subject_route():
    return jsonify(get_books_by_subject())

# GET /api/v1/books/subjects/<subject_slug> - returns a list of books by the given subject


@app.route('/api/v1/books/subjects/<subject>', methods=['GET'])
def books_by_subject_slug_route(subject):
    return jsonify(get_books_by_subject_slug(subject))

# GET /api/v1/authors - returns a list of all authors


@app.route('/api/v1/authors', methods=['GET'])
def get_all_authors_route():
    return jsonify(get_authors())

# POST /api/v1/books - creates a new book


@app.route('/api/v1/books', methods=['POST'])
def create_book_route():

    # Get the book data from the request body
    book_data = request.get_json()

    return jsonify(create_new_book(book_data))


def get_all_books(page=1, page_size=10):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Calculate the offset based on the page number and page size
    offset = (page - 1) * page_size

    # Total de livros
    cursor.execute('SELECT COUNT(*) FROM book WHERE active = 1;')
    total_books = cursor.fetchone()[0]

    # Execute a SELECT query with pagination
    cursor.execute(f'SELECT * FROM book WHERE active = 1 LIMIT {page_size} OFFSET {offset};')
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []
    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'price': book[10],
            'biography': book[4],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return {'books': book_list, 'total': total_books}

def get_book_by_id(book_id=-1):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM book WHERE id = ? AND active = 1;", (book_id,))
    book = cursor.fetchone()
    conn.close()

    if book is None:
        abort(404, description="Book not found")

    book_dict = {
        'id': book[0],
        'title': book[1],
        'author': book[2],
        'biography': book[4]
    }

    return book_dict

def retrive_books_by_title(title):
    if not title:
        return []

    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    like_query = f"%{title}%"
    cursor.execute("SELECT * FROM book WHERE title LIKE ? AND active = 1", (like_query,))
    books = cursor.fetchall()

    conn.close()

    return [
        {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4]
        }
        for book in books
    ]


def retrive_books_by_author(author):
    if not author:
        return []

    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    like_query = f"%{author}%"
    cursor.execute("SELECT * FROM book WHERE author LIKE ? AND active = 1", (like_query,))
    books = cursor.fetchall()

    conn.close()

    return [
        {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4]
        }
        for book in books
    ]


def get_books_by_title_or_author(query, page=1, page_size=10):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    like_query = f"%{query}%"
    offset = (page - 1) * page_size

    cursor.execute('''
        SELECT COUNT(*) FROM book 
        WHERE (title LIKE ? OR author LIKE ?) AND active = 1
    ''', (like_query, like_query))
    total_books = cursor.fetchone()[0]

    cursor.execute('''
        SELECT * FROM book 
        WHERE (title LIKE ? OR author LIKE ?) AND active = 1 
        LIMIT ? OFFSET ?
    ''', (like_query, like_query, page_size, offset))

    books = cursor.fetchall()
    conn.close()

    book_list = []
    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4]
        }
        book_list.append(book_dict)

    return jsonify({'books': book_list, 'total': total_books})

def get_authors():
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all authors
    cursor.execute('SELECT * FROM author;')
    authors = cursor.fetchall()

    author_list = []

    for author in authors:
        author_dict = {
            'id': author[0],
            'title': author[1],
            'slug': author[2],
            'biography': author[3]
        }
        author_list.append(author_dict)

    # Close the database connection
    conn.close()

    # Return the authors as a JSON response
    return author_list


def get_books_by_author_name(author_slug):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all books by the given author
    cursor.execute(
        'SELECT * FROM book WHERE author_slug = ? AND active = 1;', (author_slug,))
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []

    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4],
            'authors': book[5],
            'publisher': book[12],
            'synopsis': book[21],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list


def get_books_by_subject():
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all subjects, and the slug from the table subject

    cursor.execute("SELECT subjects FROM book;")
    subjects = cursor.fetchall()

    conn.close()

    return subjects


def get_books_by_subject_slug(subject):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    query = '''
    SELECT title, author, author_slug, author_bio, authors, publisher, synopsis
    FROM book
    WHERE subjects = ? AND active = 1
    '''

    # Execute a SELECT query to fetch all books by the given subject
    cursor.execute(query, (subject,))
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []

    for book in books:
        book_dict = {
            'title': book[0],
            'author': book[1],
            'slug': book[2],
            'biography': book[3],
            'authors': book[4],
            'publisher': book[5],
            'synopsis': book[6],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list


def create_new_book(book_data):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Get the book data from the request body
    title = book_data['title']
    author = book_data['author']
    author_slug = book_data['author_slug']
    author_bio = book_data['author_bio']
    authors = book_data['authors']
    publisher = book_data['publisher']
    synopsis = book_data['synopsis']

    # Execute a query to create a new book
    cursor.execute('INSERT INTO book (title, author, author_slug, author_bio, authors, publisher, synopsis) VALUES (?, ?, ?, ?, ?, ?, ?);',
                   (title, author, author_slug, author_bio, authors, publisher, synopsis))

    # Commit the changes to the database
    conn.commit()

    # Close the database connection
    conn.close()

    # Return a message to the user
    return {'message': 'Book created successfully.'}, 201

def edit_book(book_id, book_data):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Verifica se o livro existe
    cursor.execute("SELECT * FROM book WHERE id = ?;", (book_id,))
    existing = cursor.fetchone()
    if existing is None:
        abort(404, description="Book not found")

    title = book_data.get("title", existing[1])
    author = book_data.get("author", existing[2])
    biography = book_data.get("biography", existing[4])

    cursor.execute("""
        UPDATE book
        SET title = ?, author = ?, author_bio = ?
        WHERE id = ?;
    """, (title, author, biography, book_id))

    conn.commit()
    conn.close()

    return {
        "id": book_id,
        "title": title,
        "author": author,
        "biography": biography
    }

def delete_book(book_id):
    deleted_at = datetime.now(timezone.utc).isoformat()

    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE book SET active = 0, deleted_at = ? WHERE id = ?;",
        (deleted_at, book_id)
    )
    conn.commit()
    conn.close()

def filter_books(filters, page=1, page_size=10):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    clauses = ["active = 1"]
    params = []

    if filters["query"]:
        clauses.append("(title LIKE ? OR author LIKE ?)")
        like = f"%{filters['query']}%"
        params.extend([like, like])
    else:
        if filters["title"]:
            clauses.append("title LIKE ?")
            params.append(f"%{filters['title']}%")
        if filters["author"]:
            clauses.append("author LIKE ?")
            params.append(f"%{filters['author']}%")

    where_clause = " AND ".join(clauses)
    offset = (page - 1) * page_size

    # Contagem total
    count_query = f"SELECT COUNT(*) FROM book WHERE {where_clause};"
    cursor.execute(count_query, params)
    total = cursor.fetchone()[0]

    # Consulta com paginação
    select_query = f"SELECT * FROM book WHERE {where_clause} LIMIT ? OFFSET ?;"
    cursor.execute(select_query, params + [page_size, offset])
    books = cursor.fetchall()

    conn.close()

    book_list = []
    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'price': book[10],
            'biography': book[4],
        }
        book_list.append(book_dict)

    return {"books": book_list, "total": total}


# # GET /api/v1/books
# @app.route("/api/v1/books", methods=["GET"])
# def get_books():

#     conn = sqlite3.connect('db.sqlite')
#     cursor = conn.cursor()

#     # Execute a SELECT query to fetch all books
#     cursor.execute('SELECT * FROM book;')
#     books = cursor.fetchall()

#     # Convert the books data to a list of dictionaries
#     book_list = []
#     for book in books:
#         book_dict = {
#             'id': book[0],
#             'title': book[1],
#             'author': book[2],
#             'year': book[3],
#             'genre': book[4]
#         }
#         book_list.append(book_dict)

#     # Close the database connection
#     conn.close()

#     # Return the books as a JSON response
#     return jsonify(book_list)

# # GET /api/v1/authors
