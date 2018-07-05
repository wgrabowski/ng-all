#!/usr/bin/env node
const {exec} = require('child_process');
const path = require('path');
const {cwd} = require('process');

const angularFile = require(path.join(cwd(), './angular.json'));
const projects = Object.keys(angularFile.projects);

const [, , ngCommand, ...ngCommandArgs] = process.argv;

if(ngCommand) {
  projects.forEach(project => {
    exec(`ng ${ngCommand} ${project} ${ngCommandArgs.join(' ')}`, (err, stdout) => {
      if(err) {
        console.error(err);
        return;
      }
      console.log("%s",stdout);
    });
  });
}
