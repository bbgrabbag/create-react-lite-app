# React Lite CLI

## Author: **bbgrabbag**

### Description
A lightweight alternative to Facebook's CLI [Create React App](https://github.com/facebook/create-react-app).

Allows for a simple installation of a development-ready React environment.

See the actual boilerplate [HERE](https://github.com/bbgrabbag/react-boiler)

### Quick Install
* `npm install -g create-react-lite-app`
* `create-react-lite-app </path/to/dest>`

### API

* `create-react-lite-app </path/to/dest> [,-dep <dependency>...(limit 10)]`

If you wish to install extra dependencies ([Axios](https://github.com/axios/axios) or [Redux](https://github.com/reduxjs/redux) for example) you can specify them under the `-dep` flag. After the boilerplate downloads, the script will run `npm install --save` on all listed dependencies.

**NOTE**

There is a limit of 10 dependencies that can be listed under the `-dep` flag;


