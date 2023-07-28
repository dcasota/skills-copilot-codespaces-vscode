// Create web server for comments
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var util = require('util');
var mkdirp = require('mkdirp');
var sanitize = require('sanitize-filename');

// Create folder for comments
var commentsFolder = path.join(__dirname, '../comments/');
mkdirp.sync(commentsFolder);

// GET /comments
router.get('/', function(req, res, next) {
  var comments = [];
  fs.readdirSync(commentsFolder).forEach(function(file) {
    var filePath = path.join(commentsFolder, file);
    var comment = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    comments.push(comment);
  });
  res.send(comments);
});

// POST /comments
router.post('/', function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var comment = {
      id: Date.now(),