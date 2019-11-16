var config = require(__dirname + "/../config")
var pg = require('pg')
var bookshelf = require(__dirname + '/../bookshelf')

var connectionString = config.PG.PG_URL
console.log(connectionString);
var models = require(__dirname + "/../models")

pg.connect(connectionString, function(err, client, done) {

  if (process.argv[2] == "drop") {
    client.query('DROP TABLE comments', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);
    });

    client.query('DROP TABLE lists', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);
    });

    client.query('DROP TABLE list_user', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);
    });

    client.query('DROP TABLE users', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);
    });

    client.query('DROP TABLE votes', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);

    });

    client.query('DROP TABLE comments_likes', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);

    });

    client.query('DROP TABLE replycomments', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);

    });

  } else if (process.argv[2] == "seed") {
    // seed 
  } else {
    client.query('CREATE TABLE comments (id SERIAL,list_id integer,user_id integer,comment text, created_at timestamp, updated_at timestamp)', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);
    });

    client.query('CREATE TABLE lists (id SERIAL,name varchar(40), created_at timestamp, updated_at timestamp)', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);

    });

    client.query('CREATE TABLE list_user (id SERIAL,list_id integer,user_id integer, created_at timestamp, updated_at timestamp)', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);
    });

    client.query('CREATE TABLE users (id SERIAL,email varchar(40),password varchar(40), name varchar(100),nickname varchar(40),approved boolean,salt varchar(40),lastlogin_at timestamp,logincount integer,created_at timestamp, updated_at timestamp)', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);
    });

    client.query('CREATE TABLE votes (id SERIAL,points integer,user_id integer,user_to_id integer,list_id integer,created_at timestamp, updated_at timestamp)', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);
    });

    client.query('CREATE TABLE comments_likes (id SERIAL,user_id integer,comment_id integer,created_at timestamp, updated_at timestamp)', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);
    });

    client.query('CREATE TABLE replycomments (id SERIAL,user_id integer,comment_id integer,reply text,created_at timestamp, updated_at timestamp)', function(err, result) {
      done();
      if (err) return console.error(err);
      console.log(result.rows);
    });

  }


});
