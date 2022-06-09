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
      VALUES ($1)
      RETURNING *`,
      [series]
    );
    return new Series(rows[0]);
  }

  static async getAllSeries() {
    const { rows } = await pool.query(
      `SELECT *
      FROM series
      `
    );
    return rows.map(row => new Series(row));
  }

  static async updateSeries(series) {
    const { rows } = await pool.query(
      `UPDATE series
      SET name=$1
      WHERE id=$2
      RETURNING *
      `,
      [series.name, series.id]
    );
    return new Series(rows[0]);
  }

  static async deleteSeries(seriesId) {
    const { rows } = await pool.query(
      `DELETE from series
      WHERE id=$1
      RETURNING *
      `,
      [seriesId]
    );
    return new Series(rows[0]);
  }
};
