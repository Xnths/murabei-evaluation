import pytest
from pytest_bdd import scenarios, given, when, then
from backend.app import app

scenarios("../list_books_in_alphabetical_order.feature")

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

@given("John is not logged in")
def john_not_logged_in():
    pass

@when("he access the list of books")
def access_books(client):
    client.post("/api/v1/test/reset")
    
    client.post("/api/v1/books", json={
            "title": "Because",
            "author": "Author ",
            "author_slug": "author_",
            "author_bio": " is cool",
            "authors": "author,author",
            "publisher": "publisher-",
            "synopsis": " is amazing",
            "price": 10.0
        })
    
    client.post("/api/v1/books", json={
            "title": "Asymetric",
            "author": "Author ",
            "author_slug": "author_",
            "author_bio": " is cool",
            "authors": "author,author",
            "publisher": "publisher-",
            "synopsis": " is amazing",
            "price": 10.0
        })
    
    client.response = client.get("/api/v1/books")

@then("he should get the books in alphabetical order")
def check_alphabetical_order(client):
    data = client.response.get_json()
    books = data["books"]
    titles = [book["title"] for book in books]
    assert titles == sorted(titles)
