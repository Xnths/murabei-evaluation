import pytest
from pytest_bdd import scenarios, when, then, parsers
from backend.app import app

scenarios("../ping.feature")

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

@when(parsers.parse('the client calls "{path}"'))
def client_calls_path(client, path):
    client.response = client.get(path)

@then("the response status code should be 200")
def check_status_code(client):
    assert client.response.status_code == 200

@then('the response json should contain "pong"')
def check_response_json(client):
    assert client.response.get_json()["message"] == "pong"
