var knex;
if (process.env.DEPLOYED) {
  knex = require('knex')({
    client: 'pg',
    connection: {
      host: 'postgres',
      user: 'postgres',
      password: 'mysecretpassword',
      database : 'postgres',
      charset  : 'utf8'
    }
  });
} else {
  knex = require('knex')({
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'myDB',
      charset: 'utf8'
    }
  });
}

var db = require('bookshelf')(knex);

// Shortcut function to create the users table
var createUsersTable = function () {
  return db.knex.schema.createTable('users', function (user) {
    user.increments('id').primary();
    user.string('github_handle', 255);
    user.string('github_display_name', 255);
    user.string('github_avatar_url', 255);
    user.string('github_profileUrl', 255);
    user.integer('elo_rating');
    user.string('email', 255);
    user.timestamps();
  }).then(function (table) {
    console.log('Created user Table', table);
  });
};

// Shortcut function to create the solutions table
var createSolutionsTable = function () {
  return db.knex.schema.createTable('solutions', function (solution) {
    solution.increments('id').primary();
    solution.dateTime('start_time');
    solution.dateTime('end_time');
    solution.integer('total_time');
    solution.string('content', 80000);  // user input solution string, might be large!
    solution.integer('user_id');
    solution.string('github_handle');
    solution.integer('challenge_id');
    solution.boolean('valid');
  }).then(function (table) {
    console.log('Created solutions Table', table);
  });
};

// Shortcut function to create the challenges table
var createChallengesTable = function () {
  return db.knex.schema.createTable('challenges', function (challenge) {
    challenge.increments('id').primary();
    challenge.string('name', 255);
    challenge.string('prompt', 1000);
    challenge.string('test_suite', 8000); // test code that we will write per challenge
    challenge.string('type', 50);
    challenge.timestamps();
  }).then(function (table) {
    console.log('Created challenges Table', table);
  });
};

var createMatchesTable = function () {
  return db.knex.schema.createTable('matches', function (match) {
    match.increments('id').primary();
    match.integer('user_id');
    match.string('user_github_handle', 50);
    match.string('opponent_github_handle', 50);
    match.string('opponent_avatar', 150);
    match.boolean('win');
    match.integer('challenge_id');
  }).then(function (table) {
    console.log('Created matches Table', table);
  });
};

// Shortcut function to reset users
var resetUsersTable = function () {
  return db.knex.schema.dropTable('users').then(createUsersTable);
};

// Shortcut function to reset solutions
var resetSolutionsTable = function () {
  return db.knex.schema.dropTable('solutions').then(createSolutionsTable);
};

// Shortcut function to reset challenges
var resetChallengesTable = function () {
  return db.knex.schema.dropTable('challenges').then(createChallengesTable);
};

// Shortcut function to reset matches
var resetMatchesTable = function () {
  return db.knex.schema.dropTable('matches').then(createMatchesTable);
};

// Exposed function that resets the entire database
db.resetEverything = function (req, res) {
  resetUsersTable().then(function() {
    resetSolutionsTable();
  }).then(function() {
    resetChallengesTable();
  }).then(function() {
    resetMatchesTable();
  }).then(function() {
    res.status(201).end();
  });
};

db.resetEverythingPromise = function () {
  return resetUsersTable().then(function() {
    return resetChallengesTable();
  }).then(function() {
    return resetSolutionsTable();
  }).then(function() {
    return resetMatchesTable();
  }).catch(function(e) {
    console.log(e);
  });
};

// Create users table with id, github_handle
db.knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    createUsersTable();
  }
});

// Create solutions table with id, start_time, end_time, total_time, content, user_id, and challenge_id
db.knex.schema.hasTable('solutions').then(function (exists) {
  if (!exists) {
    createSolutionsTable();
  }
});

// Create challenges table with id, name, prompt, and test_suite
db.knex.schema.hasTable('challenges').then(function(exists) {
  if (!exists) {
    createChallengesTable();
  }
});

// Create challenges table with id, user_id, opponent_id, win
db.knex.schema.hasTable('matches').then(function(exists) {
  if (!exists) {
    createMatchesTable();
  }
});

module.exports = db;
