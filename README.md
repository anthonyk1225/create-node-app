# create-node-app

## Docs

Slate API docs can be found at http://keatinganthony.com/slate.

## Getting Started

Fork the repo.

### Prerequisites

We're going to be using postgres. If you prefer to use another DB, make sure sequelize supports it as a dialect. Make all necessary changes in
```create-node-app/lib/config/config.json ```.

* [PostgreSQL](https://www.postgresql.org/download/) - Download

We also want to be able to use es6, es7 and beyond. Make sure you have at least Node V8.0.0, which comes with NPM V5.

* [Node](https://nodejs.org/en/download/) - Download

### Installing

Install the dependencies.

```
npm install
```

Make sure that you can connect to your DB before proceeding.
* [PostgreSQL](https://www.postgresql.org/download/) - Tutorial for mac
* [PostgreSQL](http://suite.opengeo.org/docs/latest/dataadmin/pgGettingStarted/firstconnect.html) - Tutorial for linux

Create and migrate development and test databases.

```
bash create-db.sh // Creates databases
bash migrate-db.sh // Migrates databases
```

If for some reason you need to start fresh, go ahead and run
```
bash drop-db.sh // Drops databases
```

Make sure everything is running smoothly.
```
npm start // Creates a node_modules folder and installs all packages in packages.json
```

## Using sequelize
We have two examples in `create-node-app/lib/migrations`. Two files create an initial model, one is changing a already existing column and another is creating a new column for a model. 

Some documentation for what you will be working with.
* [Sequelize](http://docs.sequelizejs.com/manual/tutorial/models-definition.html) - Models
* [Sequelize](http://docs.sequelizejs.com/manual/tutorial/migrations.html) - Migrations


## Running tests

Let's test our endpoints.

```
npm test
```

### User tests

Let's go over the create user endpoint; this will either create or get a user, if it already exists. What does this test for?

The response should be successful.

```
it("should not return an error", () => {
    should.not.exist(error);
});
```

The response should contain the correct status code.
```
it("should return a 200 code", () => {
    result.should.have.status(200);
});
```

The response should let us know a new entry was made.
```
it("should have created a new entry", () => {
    result.body.created.should.equal(true);
});
```

The response should contain the user's ID.
```
it("should return the user's id", () => {
    result.body.id.should.be.a('number');
}); 
```
We want to write tests that make sure the endpoints we create are responding with expected behavior. We can even write tests first and then write code to make it pass (TDD)!

## Built With

* [Express](https://expressjs.com/) - The framework used
* [Sequelize](http://docs.sequelizejs.com/) - promised based ORM and migration manager
* [Mocha](https://mochajs.org/) - testing framework
* [Chai](http://chaijs.com/) - assertion library

*Node, NPM and postgres mentioned above*.

## Contributing

If you would like to add or amend anything, please feel free to make a pull request.

## Authors

* **Anthony Keating** 

 [contributors](https://github.com/anthonyk1225/create-node-app/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License.

## Acknowledgments

* The open source community
