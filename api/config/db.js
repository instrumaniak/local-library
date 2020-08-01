/**
 *  Configuration for database
 */

module.exports = {
  MDB_URL: process.env.MDB_URL || 'mongodb://localhost/local-library',
  secret: 'thesecret!',
}
