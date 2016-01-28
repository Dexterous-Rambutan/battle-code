function Queue (name, client) {
  this.name = name;
  // `client`, when passed in, is expected be a Redis client connection instance
  this.client = client;
  this.timeout = 0;
}

Queue.prototype.push = function (data, callback) {
  // TODO: Push `data` onto the tail of the list at key `this.name`
  setTimeout(function(){
    this.client.rpush(this.name, data, callback);
    console.log('pushing to queue!: ', this.name);
  }.bind(this), 1000);
};

Queue.prototype.pop = function (callback) {
  // TODO: Pop, or indefinitely wait to pop off the head of the list at `this.name`
  // Be sure that `callback` is invoked with the results of the pop
  this.client.blpop(this.name, this.timeout, callback);
};

module.exports = Queue;
