var yeoman = require('yeoman-generator'),
spawn = require('child_process').spawn,
path = require("path"),
self

module.exports = yeoman.generators.Base.extend({
	promptTask: function () {
		self = this
		var done = this.async()
		var currentName
		this.log("Initializing Android Gradle project")

		this.prompt([{
			type : 'input',
			name : 'name',
			message : 'Project name: ',
			validate : function(input) {
				var done = this.async();
				currentName = input
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
			type : 'list',
			name : 'target',
			message : 'Build target: ',
			choices: [
				{
					name: "Android 4.0",
					value: "android-14"
				},
				{
					name: "Android 4.0.3",
					value: "android-15"
				},
				{
					name: "Android 4.1.2",
					value: "android-16"
				},
				{
					name: "Android 4.2.2",
					value: "android-17"
				},
				{
					name: "Android 4.3",
					value: "android-18"
				},
				{
					name: "Android 4.4.2",
					value: "android-19"
				},
				{
					name: "Android 4.4W",
					value: "android-20"
				},
				{
					name: "Android L (preview)",
					value: "android-L"
				}
			]		
		}, {
			type : 'list',
			name : 'min_target',
			message : 'Minimum sdkt: ',
			choices: [
				{
					name: "Android 4.0",
					value: "android-14"
				},
				{
					name: "Android 4.0.3",
					value: "android-15"
				},
				{
					name: "Android 4.1.2",
					value: "android-16"
				},
				{
					name: "Android 4.2.2",
					value: "android-17"
				},
				{
					name: "Android 4.3",
					value: "android-18"
				},
				{
					name: "Android 4.4.2",
					value: "android-19"
				},
				{
					name: "Android 4.4W",
					value: "android-20"
				},
				{
					name: "Android L (preview)",
					value: "android-L"
				}
			]		
		}, 
		{
			type : 'input',
			name : 'activity',
			message : 'Main Activity: ',
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