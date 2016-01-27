function Queue (name, client) {
  this.name = name;
  // `client`, when passed in, is expected be a Redis client connection instance
  this.client = client;
  this.timeout = 0;
}

Queue.prototype.push = function (data) {
  // Pushes `data` onto the tail of the list at key `this.name`
  this.client.rpush(this.name, data, function (err, replies) {
    if (err) throw new Error(err);

    console.log(replies + '\n');
    this.client.quit();
  });
};

Queue.prototype.pop = function (callback) {
  // Pops, or indefinitely waits to pop off the head of the list at `this.name`
  this.client.blpop(this.name, this.timeout, callback);
};

module.exports = Queue;
