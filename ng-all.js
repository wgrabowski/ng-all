#!/usr/bin/env node
const {exec} = require('child_process');
const path = require('path');
const {cwd} = require('process');

const angularFile = require(path.join(cwd(), './angular.json'));
const projects = angularFile.projects;
const projectNames = Object.keys();

const [, , ngCommand, ...ngCommandArgs] = process.argv;

if(ngCommand) {
	let projectQueue = getProjectQueueForCommand(ngCommand);
	
  projectQueue.forEach(project => {
    exec(`ng ${ngCommand} ${project} ${ngCommandArgs.join(' ')}`, (err, stdout) => {
      if(err) {
        console.error(err);
        return;
      }
      console.log("%s",stdout);
    });
  });
}

function getProjectQueueForCommand(command){
	return projectNames.reduce((commandProjects, project) => {
		if(projects[project].architect.hasOwnProperty(command)){
			commandProjects.push(commmand);
		}
		return commandProjects
	},{});
}
