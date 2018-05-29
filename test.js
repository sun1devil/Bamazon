var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "topcharts5000_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  selectArtist();
  countArtists();
  selectRange();
  selectSong();
  
});

// A query which returns all data for songs sung by a specific artist
function selectArtist() {
    console.log("Selecting all from tracklist...\n");
  connection.query("SELECT * FROM tracklist WHERE artist_name ='Katy Perry'", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    for (var i = 0; i < res.length; i++) {
        formatter(res[i]);
      }
    connection.end();
  });
  }

// A query which returns all artists who appear within the top 5000 more than once
  function countArtists() {
    console.log("Selecting all from tracklist...\n");
  connection.query("SELECT artist_name, COUNT(*) c FROM tracklist GROUP BY artist_name HAVING c > 1", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    for (var i = 0; i < res.length; i++) {
        formatter(res[i]);
      }
    connection.end();
  });
  }

// A query which returns all data contained within a specific range
function selectRange() {
    console.log("Selecting all from tracklist...\n");
  connection.query("SELECT * FROM tracklist WHERE release_year BETWEEN 1971 AND 1975", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    for (var i = 0; i < res.length; i++) {
        formatter(res[i]);
      }
    connection.end();
  });
  }

// A query which searches for a specific song in the top 5000 and returns the data for it
function selectSong() {
  console.log("Selecting all from tracklist...\n");
  connection.query(
    "SELECT * FROM tracklist WHERE song_name='As Long As You Love Me'",
    function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      for (var i = 0; i < res.length; i++) {
        formatter(res[i]);
      }
      connection.end();
    }
  );
}

function formatter(obj) {
  console.log(
    obj.id +
      " | " +
      obj.artist_name +
      " | " +
      obj.song_name +
      " | " +
      obj.release_year +
      " | " +
      JSON.stringify(obj.raw_score) +
      "|" +
      JSON.stringify(obj.rawpopularity_usa) +
      "|" +
      JSON.stringify(obj.rawpopularity_uk) +
      "|" +
      JSON.stringify(obj.rawpopularity_europe) +
      "|" +
      JSON.stringify(obj.rawpopularity_row)
  );
}
