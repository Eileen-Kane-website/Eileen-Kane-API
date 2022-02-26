const pool = require('../utils/pool');

module.exports = class Series {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }

  static async insert(series) {
    const { rows } = await pool.query(
      `INSERT INTO series (
        name
      )
      VALUE ($1)
      RETURNING *`,
      [series.name]
    );
    return new Series(rows[0]);
  }

  static async getAllSeries() {
    console.log('SERIES MODEL');
    const { rows } = await pool.query(
      `SELECT *
      FROM series
      `
    );
    return rows.map(row => new Series(row));
  }
};
