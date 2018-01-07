# create-node-app

## Getting Started

Fork the repo

### Prerequisites

We assume you will be using postgres. You can use any db you like as long as sequelize supports it in their dialiect. If you plan on using postgres, make sure you have it installed on your machine

* [PostgreSQL](https://www.postgresql.org/download/)

### Installing

First, install the dependencies

```
npm install
```

and then create & migrate the databases

```
bash create-db.sh
```

Done.

## Running the tests

Make sure all tests pass

```
npm test
```

### User tests

We're testing the create user endpoint; which will create a user or get a user if it already exists

The response should be successful

```
it("should not return an error", () => {
    should.not.exist(error);
});
```

The response should contain the correct code
```
it("should return a 200 code", () => {
    result.should.have.status(200);
});
```

The response should let us know a new entry was made
```
it("should have created a new entry", () => {
    result.body.created.should.equal(true);
});
```

The response should contain the user's ID
```
it("should return the user's id", () => {
    result.body.id.should.be.a('number');
}); 
```
We want to write tests that make sure the endpoints we create are responding with expected behavior. We can even write tests first and then write code to make it pass!

## Deployment

TBD

## Built With

* [Express](https://expressjs.com/) - The framework used
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Sequelize](http://docs.sequelizejs.com/) - promised based ORM and migration manager
* [Mocha](https://mochajs.org/) - testing framework

## Contributing

If something doesn't look right, feel free to make a pull request.

## Versioning

TBD

## Authors

* **Anthony Keating** 

See also the list of [contributors](https://github.com/anthonyk1225/create-node-app/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License

## Acknowledgments

* Hat tip to anyone who's code was used
