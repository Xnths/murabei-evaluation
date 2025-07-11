INSERT INTO book (
  title, author, author_id, author_bio, authors,
  title_slug, author_slug, isbn13, isbn10, price,
  format, publisher, pubdate, edition, subjects,
  lexile, pages, dimensions, overview, excerpt,
  synopsis, toc, editorial_reviews
)
SELECT
  title, author, author_id, author_bio, authors,
  title_slug, author_slug, isbn13, isbn10, price,
  format, publisher, pubdate, edition, subjects,
  lexile, pages, dimensions, overview, excerpt,
  synopsis, toc, editorial_reviews
FROM book_backup;
