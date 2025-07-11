Feature: list authors

    Scenario: John lists authors
        Given there is at least 1 author
        When John lists the authors
        Then he gets the author name and author biography

    Scenario: John lists 10 authors
        Given there are 20 authors
        When John lists the authors
        Then he gets 10 authors

    Scenario: John lists the other 10 authors
        Given there are 20 authors
        When John lists the authors
        And changes the page
        Then he gets the other 10 authors