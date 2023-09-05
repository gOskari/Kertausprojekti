const sqlite3 = require('sqlite3');
const sql_config = require('./sqlconfig.json');

// Function to execute SQLite queries
function query(sql, params) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(sql_config.database);
    db.all(sql, params, (err, rows) => {
      if (err) {
        db.close()
        reject(err);
      } else {
        db.close()
        resolve(rows);
      }
    });
  });
}

// Define your database functions here

// Example: Get all festivals
async function haeFestivaalit() {
  const sql = 'SELECT * FROM Festivaalit';
  try {
    const results = await query(sql);
    return results;
  } catch (error) {
    throw error;
  }
}

async function haeArtistit() {
    const sql = 'SELECT * FROM Artistit';
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      throw error;
    }
}

async function haeFestivaalinArtistit(festivaali) {
    const sql = `SELECT Artistit FROM Festivaalit WHERE Nimi LIKE '%${festivaali}%'`;
    console.log(sql)
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      throw error;
    }
}

async function haeArtistinKaupungit(artisti) {
    const sql = `SELECT DISTINCT Paikka FROM Festivaalit WHERE Artistit LIKE '%${artisti}%'`
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      throw error;
    }
}

async function haeFestivaalinKaupunki(festivaali) {
    const sql = `SELECT Paikka FROM Festivaalit WHERE Nimi LIKE '%${festivaali}%'`
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      throw error;
    }
}

async function haeArtistinFestivaalit(artisti) {
    const sql = `SELECT * FROM Festivaalit WHERE Artistit LIKE '%${artisti}%'`
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      throw error;
    }
}

async function haeEnitenArtisteja() {
    const sql = 'SELECT F.Nimi AS FestivalName, COUNT(K.ArtistiID) AS ArtistCount FROM Festivaalit F JOIN Keikat K ON F.FestivaaliID = K.FestivaaliID GROUP BY F.FestivaaliID ORDER BY ArtistCount DESC LIMIT 1;';
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      throw error;
    }
}

async function haeFestivaalitAikajarjestyksessa() {
    const sql = 'SELECT * FROM Festivaalit ORDER BY Aika ASC'
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      throw error;
    }
}

// Export your functions
module.exports = {
  haeFestivaalit,
  haeArtistit,
  haeFestivaalinArtistit,
  haeArtistinKaupungit,
  haeFestivaalinKaupunki,
  haeArtistinFestivaalit,
  haeEnitenArtisteja,
  haeFestivaalitAikajarjestyksessa
  // Define other functions here
};
