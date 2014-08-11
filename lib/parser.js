'use strict';

var exec = require('child_process').exec;
var _ = require('lodash');
var q = require('q');

module.exports = function(pdf) {

  var isMap = function(obj) {
    var keys = [];
    if (obj) {
      keys = _.keys(obj);
    }
    return _.isEqual(_.size(keys), 4) &&
      _.contains(keys, 'x') && _.isFinite(obj.x) &&
      _.contains(keys, 'y') && _.isFinite(obj.y) &&
      _.contains(keys, 'h') && _.isFinite(obj.h) &&
      _.contains(keys, 'w') && _.isFinite(obj.w);
  };

  var isEmptyMap = function(map) {
    return (map.x === 0) &&
      (map.y === 0) &&
      (map.h === 0) &&
      (map.w === 0);
  };

  var pdftotext = function(pdf, map, key, deferred) {
    var params = [
      '-f 1',
      '-l 1',
      '-r 300',
      '-x ' + map.x,
      '-y ' + map.y,
      '-H ' + map.h,
      '-W ' + map.w,
      '-raw',
      pdf,
      '-'
    ];

    var command = 'pdftotext ' + params.join(' ');

    exec(command, function(err, stdout, stderr) {
      if (err) {
        deferred.reject(err);
      } else {
        var lines = stdout.split(/\r?\n/);
        var data = _.initial(lines).join(' ');
        deferred.resolve({
          node: key,
          value: data
        });
      }
    });
  };

  return {

    get: function(map, key) {
      var deferred = q.defer();

      if (!pdf) {
        deferred.reject(new Error('pdf file is null'));
      } else {

        if (isMap(map)) {
          if (isEmptyMap(map)) {
            deferred.resolve({
              node: key,
              value: ''
            });
          } else {
            pdftotext(pdf, map, key, deferred);
          }
        } else {
          deferred.resolve({
            node: key,
            value: map
          });
        }

      }
      return deferred.promise;
    }

  };
};