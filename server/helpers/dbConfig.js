var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : 'localhost',
    database : 'myDB',
    charset  : 'utf8',
  }
});

var db = require('bookshelf')(knex);

// Create users table with id, user_handle
db.knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('github_handle', 255);
      user.string('github_display_name', 255);
      user.string('github_avatar_url', 255);
      user.string('github_profileUrl', 255);
      user.string('email', 255);
      user.timestamps();
    }).then(function (table) {
      console.log('Created user Table', table);
    });
  }
});

// Create solutions table with id, start_time, end_time, total_time, content, user_id, and challenge_id
db.knex.schema.hasTable('solutions').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('solutions', function (solution) {
      solution.increments('id').primary();
      solution.dateTime('start_time');
      solution.dateTime('end_time');
      solution.integer('total_time');
      solution.string('content', 80000);  // user input solution string, might be large!
      solution.integer('user_id');
      solution.integer('challenge_id');
    }).then(function (table) {
      console.log('Created solutions Table', table);
    });
  }
});

// Create challenges table with id, name, prompt, and test_suite
db.knex.schema.hasTable('challenges').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('challenges', function (challenge) {
      challenge.increments('id').primary();
      challenge.string('name', 255);
      challenge.string('prompt', 255);
      challenge.string('test_suite', 8000); // test code that we will write per challenge
      challenge.timestamps();
    }).then(function (table) {
      console.log('Created challenges Table', table);
    });
  }
});

module.exports = db;
