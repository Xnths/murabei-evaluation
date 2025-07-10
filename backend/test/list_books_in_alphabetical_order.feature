Feature: List books alphabetically

    Scenario: John lists books alphabetically
        Given John is not logged in
        When he access the list of books
        Then he should get the books in alphabetical order