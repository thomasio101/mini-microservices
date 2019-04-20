# mini-microservices
A small and simple NodeJS library for creating microservice based applications.
## Contents
- [Quickstart](#quickstart)
### Advanced features
- [Procedures](#procedures)
## Quickstart
To get started with *mini-microservices*, create a new folder in which your project will reside.

Once you've made this folder, it's time to install *mini-microservices*, for this you'll need to download the newest release from the [releases page](https://github.com/thomasio101/mini-microservices/releases). When the download has finished, extract the contents of the downloaded archive into your project folder, the file structure should look like this:
```
<Your project folder>
|-LICENSE
|-index.js
|-package.json
|-services.json
```

Now you can start writing your own services, in this case we'll make a simple express application which will send a greeting based on the provided name.

Firstly, create a new file called `greetingService.js` this service will take a name and return a personalised greeting.

Write the following in this file:
```javascript
module.exports = (serviceRegistry) => {
    return (name) => `Hello ${name}.`
}
```

Let's take a closer look at this code to understand how *mini-microservices* work:
- We always export a function that takes the `serviceRegistry` as an argument, this is the basic structure of any *mini-microservice*. (We'll get back to using the `serviceRegistry` when we create the next service.)
- Whatever you return from the module you export will be what other services will have access to, this can be anything, in our case it's a function.

Now you'll need to create the express service, for this, create a new folder called `expressService`. Now open a command line in this folder and run the following command (Just hit enter for all prompts):
```
npm init
```
Then install Express by running the following command:
```
npm i express
```
Now create a file in the `expressService` folder called `index.js`, open this file and enter the following code:
```javascript
const express = require('express')

module.exports = (serviceRegistry) => {
    const app = express()

    app.get('/greeting', function(req, res) {
        res.send(
            serviceRegistry.greetingService(req.query.name)
        )
    })

    app.listen(80)

    return app
}
```
Now open `services.json` and replace it with the following JSON:
```json
{
    "expressService": {
        "path": "./expressService/index.js",
        "dependencies": [
            "greetingService"
        ]
    },
    "greetingService": {
        "path": "./greetingService.js"
    }
}
```
Now run `index.js` and open your web browser, go to `http://localhost/greeting?name=<INSERT YOUR OWN NAME>` and you'll see a greeting!

Now you have a basic understanding of *mini-microservices*, go ahead and make something amazing!
## Procedures
Unmodified, the `procedures.js` file contains the following code:
```javascript
module.exports = (serviceRegistry) => {

}
```
This function is executed after all services have been loaded, an example of a situation where this can be useful is when you need to start an http server after the starting process is complete.