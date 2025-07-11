Feature: list books
  Scenario: John lists 10 books from collection
    Given there are 20 books in the collection
    When he access the list of books
    Then he should get 10 books
    And from each book, he should get the title, author name and price
  
  Scenario: John lists the other 10 books from collection
    Given there are 20 books in the collection
    When he access the list of books
    And change the page
    Then he should get the other 10 books
    And from each book, he should get the title, author name and price

  Scenario: John lists all books, but he only sees the active ones
    Given the first book was deleted
    When John list the first 10 books
    Then he should not see the first book

  Scenario: John searches a book by title, but he only sees the active ones
    Given there was a book called The color purple by Alice Walker
    And it was deleted
    When John search for The color purple
    Then he should not see it

  Scenario: John searches a book by author, but he only sees the active ones
    Given there was a book called The color purple by Alice Walker
    And it was deleted
    When John search for "Alicie Walker"
    Then he should not see it

  Scenario: John does an advanced search for a book by title, but he only sees the active ones
    Given there was a book called The color purple by Alice Walker
    And it was deleted
    When John does an advanced search for the title Alice Walker
    Then he should be notified that the book was not found

  Scenario: John does an advanced search for a book by author, but he only sees the active ones
    Given there was a book called The color purple by Alice Walker
    And it was deleted
    When John does an advanced search for the author "Alicie Walker"
    Then he should be notified that the book was not found