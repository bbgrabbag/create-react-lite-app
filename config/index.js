module.exports = {
    githubUrl: "https://github.com/bbgrabbag/react-lite",
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