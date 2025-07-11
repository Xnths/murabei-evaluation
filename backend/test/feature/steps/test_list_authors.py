import pytest
from pytest_bdd import scenarios, given, when, then

from backend.app import app

scenarios("../list_authors.feature")


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


# -------------------- GIVEN --------------------

@given("there is at least 1 author")
def create_one_author(client):
    client.post("/api/v1/test/reset")
    client.post("/api/v1/authors", json={
        "name": "Author 1",
        "biography": "Author 1 biography"
    })


@given("there are 20 authors")
def create_20_authors(client):
    client.post("/api/v1/test/reset")
    for i in range(1, 21):
        client.post("/api/v1/authors", json={
            "name": f"Author {i}",
            "biography": f"This is the biography of Author {i}"
        })


# -------------------- WHEN --------------------

@when("John lists the authors")
def john_lists_authors(client):
    client.response = client.get("/api/v1/authors?page=1")


@when("changes the page")
def john_changes_page(client):
    client.response = client.get("/api/v1/authors?page=2")


# -------------------- THEN --------------------

@then("he gets the author name and author biography")
def check_author_fields(client):
    authors = client.response.get_json()["authors"]
    for author in authors:
        assert "name" in author
        assert "biography" in author


@then("he gets 10 authors")
def check_10_authors(client):
    authors = client.response.get_json()["authors"]
    assert len(authors) == 10


@then("he gets the other 10 authors")
def check_other_10_authors(client):
    first_page = client.get("/api/v1/authors?page=1").get_json()["authors"]
    first_names = [a["name"] for a in first_page]

    second_page = client.response.get_json()["authors"]
    second_names = [a["name"] for a in second_page]

    assert len(second_names) == 10

    for name in second_names:
        assert name not in first_names
