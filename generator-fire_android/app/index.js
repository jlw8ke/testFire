var yeoman = require('yeoman-generator')
var self

module.exports = yeoman.generators.Base.extend({
  promptTask: function () {
  	self = this
    var done = this.async()
    this.log("Initializing Android project")

    this.prompt([{
      type : 'input',
      name : 'name',
      message : 'Project name: ',
      required : true
    }, {
    	type : 'input',
    	name : 'path',
    	message : 'Project path: ',
    	required : true
    },  {
    	type : 'input',
    	name : 'package',
    	message : 'Project package: ',
    	required : true
    }, {
    	type : 'input',
    	name : 'target',
    	message : 'Build target: ',
    	required : true
    }], function (answers) {
      createAndroidProject(answers)
      done()
    }.bind(this))
  }
})

function createAndroidProject(params) {
	self.log(params)
}