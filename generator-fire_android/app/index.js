var yeoman = require('yeoman-generator'),
spawn = require('child_process').spawn,
path = require("path"),
self

module.exports = yeoman.generators.Base.extend({
	promptTask: function () {
		self = this
		var done = this.async()
		this.log("Initializing Android Gradle project")

		this.prompt([{
			type : 'input',
			name : 'name',
			message : 'Project name: ',
			validate : function(input) {
				var done = this.async();
				setTimeout(function() {
					if (!input) {
						done("A project name is required");
						return;
					}
					done(true);
				}, 10);
			}
		}, {
			type : 'input',
			name : 'path',
			message : 'Project path: ',
			validate : function(input) {
				var done = this.async();
				setTimeout(function() {
					if (!input) {
						done("A project path is required");
						return;
					}
					done(true);
				}, 10);
			}		
		},  {
			type : 'input',
			name : 'package',
			message : 'Project package: ',
			validate : function(input) {
				var done = this.async();
				setTimeout(function() {
					if (!input) {
						done("A project package is required");
						return;
					}
					done(true);
				}, 10);
			}		
		}, {
			type : 'input',
			name : 'target',
			message : 'Build target: ',
			validate : function(input) {
				var done = this.async();
				setTimeout(function() {
					if (!input) {
						done("A project target is required");
						return;
					}
					done(true);
				}, 10);
			}		
		}], function (answers) {
			createAndroidProject(answers)
			done()
		}.bind(this))
	}
})

function createAndroidProject(params) {
	self.log(params)
	var file_loc = path.join(__dirname, "init_android.sh")
	self.log("Script location : " + file_loc)
	var init_android = spawn(file_loc, 
		[params.name, params.path, params.package, params.target])	
	init_android.stdout.on('data', function (data) {
  		console.log('stdout: ' + data);
	})
}