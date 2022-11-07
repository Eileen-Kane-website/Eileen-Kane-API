const pool = require('../utils/pool');

module.exports = class ArtWork {
  id;
  title;
  medium;
  dimensions;
  year;
  slug;
  isFeatured;
  seriesId;
  seriesName;

  constructor(row) {
    this.id = row.id,
    this.title = row.title,
    this.medium = row.medium,
    this.dimensions = row.dimensions,
    this.year = row.year,
    this.slug = row.slug,
    this.isFeatured = row.is_featured,
    this.seriesId = row.series_id,
    this.seriesName = row.series_name;
  }

  static async insert(artWork) {
    const { rows } = await pool.query(
      `INSERT INTO art_works (
        title,
        medium,
        dimensions,
        year,
        slug,
        is_featured,
        series_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        artWork.title, 
        artWork.medium, 
        artWork.dimensions, 
        artWork.year, artWork.slug, 
        artWork.is_featured, 
        artWork.series_id
      ]
    );

    return new ArtWork(rows[0]);
  }

  static async getAllWorks() {
    const { rows } = await pool.query(
      `SELECT 
      "art_works".id as id, 
      title, 
      medium, 
      dimensions, 
      year, 
      slug, 
      is_featured, 
      series_id,
      series.name as series_name
      FROM "art_works"
      INNER JOIN series on "art_works".series_id=series.id
      `
    );

    return rows.map(row => new ArtWork(row));
  }

  static async updateIsFeatured (boolean, id) {
    const { rows } = await pool.query(
      `UPDATE art_works
      SET is_featured=$1
      WHERE id=$2
      RETURNING *
      `,
      [boolean, id]
    );

    return new ArtWork(rows[0]);
  }

  static async updateArtWork (id, artWork) {
    const { rows } = await pool.query(
      `UPDATE art_works
      SET title=$1,
          medium=$2,
          dimensions=$3,
          year=$4,
          slug=$5,
          is_featured=$6,
          series_id=$7
      WHERE id=$8
      RETURNING *
      `,
      [
        artWork.title, 
        artWork.medium, 
        artWork.dimensions, 
        artWork.year, 
        artWork.slug, 
        artWork.is_featured, 
        artWork.series_id, id
      ]
    );
    return new ArtWork(rows[0]);
  }

  static async deleteWork (id) {
    const { rows } = await pool.query(
      `DELETE FROM art_works
      WHERE id=$1
      RETURNING *
      `,
      [id]
    );

    return new ArtWork(rows[0]);
  }
};
