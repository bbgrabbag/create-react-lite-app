//DEPENDENCIES
const shell = require("shelljs");

module.exports = {
    githubUrl: "https://github.com/bbgrabbag/create-react-lite-app",
    argRules: {
        limit: { value: 1, err: "Maximum argument count exceeded" },
        min: { value: 1, err: "Destination filepath required" }
    },
    validFlags: [
        {
            name: '-dep',
            argRules: {
                limit: { value: 10, err: "Maximum argument count exceeded" },
                min: { value: 1, err: "At least one dependency required" }
            }
        }
    ],

}