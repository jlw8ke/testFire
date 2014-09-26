var yeoman = require('yeoman-generator'),
spawn = require('child_process').spawn,
path = require("path"),
self,
targets,
projectName

module.exports = yeoman.generators.Base.extend({
	generateTargetsTask: function() {
		self = this
		findAvailableTargets()
	},
	promptTask: function () {
		self = this
		var done = this.async()
		this.log("Initializing Android Gradle project")
		this.prompt([{
			type : 'input',
			name : 'name',
			message : 'Project name:',
			validate : function(input) {
				var done = this.async();
				setTimeout(function() {
					if (!input) {
						done("A project name is required")
						return
					}
					done(true)
				}, 10)
			}
		}, {
			type : 'input',
			name : 'path',
			message : 'Project path:',
			default : './'
		},  {
			type : 'input',
			name : 'package',
			message : 'Project package:',
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
			type : 'list',
			name : 'target',
			message : 'Build target:',
			choices: targets
		}, {
			type : 'list',
			name : 'min_target',
			message : 'Minimum sdk:',
			choices: targets	
		}, 
		{
			type : 'input',
			name : 'activity',
			message : 'Main Activity:',
			default : "MainActivity"
		}], function (answers) {
			createAndroidProject(answers)
			done()
		}.bind(this))
	}
})

function createAndroidProject(params) {
	self.log(params)
	var file_loc = path.join(__dirname, "init_android.sh")
	var init_android = spawn(file_loc, 
		[params.name, params.path, params.package, params.target, params.min_target, params.activity])	
	init_android.stdout.on('data', function (data) {
  		console.log('' + data);
	})
}

function findAvailableTargets() {
	self.log("Finding available targets")
	targets = new Array()
	var file_loc = path.join(__dirname, "find_targets.sh")
	var find_targets = spawn(file_loc);
	find_targets.stdout.on('data', function (data) {
  		var lines = String(data).split('\n')
  		for(var i = 0;i < lines.length-1;i+=2) {
  			var value = lines[i].split('or')
  			var name = lines[i+1].trim().substring(5)
  			var target = new Object()
  			target.name=name.trim()
  			target.value=value[1].trim()
  			targets.push(target)
  		}  		
	});
}