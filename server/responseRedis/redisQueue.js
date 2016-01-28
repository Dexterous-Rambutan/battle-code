function Queue (name, client) {
  this.name = name;
  // `client`, when passed in, is expected be a Redis client connection instance
  this.client = client;
  this.timeout = 0;
}

Queue.prototype.push = function (data) {
  // Pushes `data` onto the tail of the list at key `this.name`
  console.log('Pushing to', this.name, 'at', this.client.address);
  this.client.rpush(this.name, data, function (err, replies) {
    if (err) throw new Error(err);
    console.log('Successfully pushed to', this.name, 'at', this.client.address, replies);
  }.bind(this));
};

Queue.prototype.pop = function (callback) {
  // Pops, or indefinitely waits to pop off the head of the list at `this.name`
  this.client.blpop(this.name, this.timeout, callback);
};

module.exports = Queue;
