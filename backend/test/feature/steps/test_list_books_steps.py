import pytest
from pytest_bdd import scenarios, given, when, then, parsers
from backend.app import app

scenarios("../list_books.feature")


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


# -------------------- GIVEN --------------------

@given("there are 20 books in the collection")
def create_20_books(client):
    client.post("/api/v1/test/reset")
    for i in range(1, 21):
        client.post("/api/v1/books", json={
            "title": f"Book {i}",
            "author": f"Author {i}",
            "author_slug": f"author_{i}",
            "author_bio": f"{i} is cool",
            "authors": f"{i},{i+1},{i+2}",
            "publisher": f"publisher-{i}",
            "synopsis": f"{i} is amazing",
            "price": 10.0 + i
        })


@given("the first book was deleted")
def delete_first_book(client):
    client.post("/api/v1/test/reset")
    for i in range(1, 21):
        client.post("/api/v1/books", json={
            "title": f"Book {i}",
            "author": f"Author {i}",
            "author_slug": f"author_{i}",
            "author_bio": f"{i} is cool",
            "authors": f"{i},{i+1},{i+2}",
            "publisher": f"publisher-{i}",
            "synopsis": f"{i} is amazing",
            "price": 10.0 + i
        })
    client.delete("/api/v1/books/1")


@given(parsers.parse('there was a book called {title} by {author}'))
def create_specific_book(client, title, author):
    client.post("/api/v1/test/reset")
    client.post("/api/v1/books", json={
        "title": title,
        "author": author,
        "author_slug": "author",
        "author_bio": "is cool",
        "authors": author,
        "publisher": "publisher",
        "synopsis": "it is amazing",
        "price": 42.00
    })


@given("it was deleted")
def delete_last_book(client):
    response = client.get("/api/v1/books")
    books = response.get_json()["books"]
    last_id = books[-1]["id"]
    client.delete(f"/api/v1/books/{last_id}")


# -------------------- WHEN --------------------

@when("he access the list of books")
@when("John list the first 10 books")
def access_first_page(client):
    client.response = client.get("/api/v1/books?page=1")


@when("change the page")
def access_second_page(client):
    client.response = client.get("/api/v1/books?page=2")


@when(parsers.parse('John search for {text}'))
def search_books(client, text):
    client.response = client.get(f"/api/v1/books?title={text}")


@when(parsers.parse('John does an advanced search for the title {title}'))
def advanced_search_by_title(client, title):
    client.response = client.get(f"/api/v1/books/advanced?title={title}")


@when(parsers.parse('John does an advanced search for the author {author}'))
def advanced_search_by_author(client, author):
    client.response = client.get(f"/api/v1/books/advanced?author={author}")


# -------------------- THEN --------------------

@then("he should get 10 books")
def check_10_books(client):
    books = client.response.get_json()["books"]
    assert len(books) == 10


@then("he should get the other 10 books")
def check_other_10_books(client):
    previous_response = client.get("/api/v1/books?page=1")
    previous_titles = [book["title"] for book in previous_response.get_json()["books"]]

    current_books = client.response.get_json()["books"]
    current_titles = [book["title"] for book in current_books]

    assert len(current_titles) == 10

    for title in current_titles:
        assert title not in previous_titles


@then("from each book, he should get the title, author name and price")
def check_fields(client):
    books = client.response.get_json()["books"]
    for book in books:
        assert "title" in book
        assert "author" in book
        assert "price" in book


@then("he should not see the first book")
def check_first_book_not_present(client):
    books = client.response.get_json()["books"]
    for book in books:
        assert book['id'] != 1


@then("he should not see it")
def check_book_not_present(client):
    books = client.response.get_json()["books"]
    for book in books:
        assert book["title"] != "The color purple"

@then("he should be notified that the book was not found")
def not_found_book(client):
    assert client.response.status_code == 404