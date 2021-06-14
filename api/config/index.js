/**
 *  Configuration
 */

module.exports = {
  MDB_URL: process.env.MDB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || 604800, // 1 week
}
