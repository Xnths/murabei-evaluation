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
            "price": 10.0 + i
        })


@given("the first book was deleted")
def delete_first_book(client):
    create_20_books(client)
    client.delete("/api/v1/books/1")


@given(parsers.parse('there was a book called {title} by {author}'))
def create_specific_book(client, title, author):
    client.post("/api/v1/test/reset")
    client.post("/api/v1/books", json={
        "title": title,
        "author": author,
        "price": 42.00
    })


@given("it was deleted")
def delete_last_book(client):
    response = client.get("/api/v1/books/all")
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
    books = client.response.get_json()["books"]
    titles = [book["title"] for book in books]
    assert len(books) == 10
    assert "Book 1" not in titles
    assert "Book 10" not in titles
    assert "Book 11" in titles
    assert "Book 20" in titles


@then("from each book, he should get the title, author name and price")
def check_fields(client):
    books = client.response.get_json()["books"]
    for book in books:
        assert "title" in book
        assert "author" in book
        assert "price" in book


@then("he should not see the first book")
@then("he should not see it")
def check_book_not_present(client):
    books = client.response.get_json()["books"]
    for book in books:
        assert book["title"] != "Book 1"
        assert book["title"] != "The color purple"
