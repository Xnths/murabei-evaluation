Feature: Ping endpoint
  Scenario: Client requests /ping
    When the client calls "/ping"
    Then the response status code should be 200
    And the response json should contain "pong"
