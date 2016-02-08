# Battle-Code
Battle your peers head-to-head with intense coding challenges.

<hr>

## Team

  - __Product Owner__: Hahnbi Sun
  - __Scrum Master__: Harun Davood
  - __Development Team Members__: [Harun Davood](https://github.com/puzzlehe4d), [Alan Fu](https://github.com/alanzfu), [Hahnbi Sun](https://github.com/hahnbi), [Kevin Weng](https://github.com/kweng2)

<hr>
## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)
1. [Architecture](#architecture)
1. [Deployment](#deployment)

<hr>
## Usage

Load up the arena and try to complete as many of the test cases for the coding challenge as possible before your opponent.
<hr>
## Requirements

- Node 0.10.x
- Express -
- Postgresql 9.1.x
  - ORM
- React -
- Redux -

<hr>
## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](https://github.com/Dexterous-Rambutan/battle-code/issues)

<hr>
## Contributing + Github Workflow

See [github.md](github.md) for contribution and github workflow guidelines.

<hr>
## Architecture
### High Level Architecture
![](http://i.imgur.com/mqdnWVh.png)

### Database Schema
Database in Postgres, using Bookshelf and Knex
![](http://i.imgur.com/d3GmVrG.png)

### Socket Interactions

![](http://i.imgur.com/7s7RKSD.png)

![](http://i.imgur.com/w3Qfhy7.png)

![](http://i.imgur.com/6437Led.png)

![](http://i.imgur.com/1N1vi5h.png)

### Folder Structure

## Deployment
This has been deployed onto Digital Ocean using Docker containers. The backend architecture allows horizontal scaling of the solution worker to handle higher loads
