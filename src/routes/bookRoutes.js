const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  const books = [{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Centre of the Earth',
    genre: 'Science Fiction',
    author: 'Henry Kuttner',
    read: false

  }
  ];

  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();

        const { recordset } = await request.query('select * from books');

        res.render('bookListView',
          {
            nav,
            title: 'Library',
            books: recordset
          });
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request
          .input('id', sql.Int, id)
          .query('select * from books where id = @id');
        res.render(
          'bookView',
          {
            nav,
            title: 'Library',
            book: recordset[0]
          }
        );
      }());
    });

  return bookRouter;
}

module.exports = router;
