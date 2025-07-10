Feature: list books
  Scenario: John lists 10 books from collection
    Given John is not logged in
    When he access the list of books
    Then he should get 10 books
    and from each book, he should get the title, author name and price

  Scenario: John lists all books, but he only sees the active ones
    Given the first book was deleted
    When John list the first 10 books
    Then he should not see the first book

  Scenario: John searches a book by title, but he only sees the active ones
    Given there was a book called "The color purple" by "Alice Walker"
    And it was deleted
    When John search for "The color purple"
    Then he should not see it

  Scenario: John searches a book by author, but he only sees the active ones
    Given there was a book called "The color purple" by "Alice Walker"
    And it was deleted
    When John search for "Alicie Walker"
    Then he should not see it

  Scenario: John does an advanced search for a book by title, but he only sees the active ones
    Given there was a book called "The color purple" by "Alice Walker"
    And it was deleted
    When John does an advanced search for the title "Alicie Walker"
    Then he should not see it

  Scenario: John does an advanced search for a book by author, but he only sees the active ones
    Given there was a book called "The color purple" by "Alice Walker"
    And it was deleted
    When John does an advanced search for the author "Alicie Walker"
    Then he should not see it