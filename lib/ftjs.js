'use strict';

var _ = require('lodash');
var q = require('q');
var parser = require('./parser');

var isMap = function(obj) {
	var keys = _.keys(obj);
	return _.isEqual(_.size(keys), 4) &&
		_.contains(keys, 'x') && _.isFinite(obj.x) &&
		_.contains(keys, 'y') && _.isFinite(obj.y) &&
		_.contains(keys, 'h') && _.isFinite(obj.h) &&
		_.contains(keys, 'w') && _.isFinite(obj.w);
};

var parseNode = function(doc, promises, node, key) {
	if (isMap(node)) {
		var promise = doc.get(node, key);
		promises.push(promise);
	} else if (!_.isEmpty(node) && _.isObject(node)) {
		for (var k in node) {
			var fullKey = key + '.' + k;
			parseNode(doc, promises, node[k], fullKey);
		}
	}
	return promises;
};

var setProperty = function(root, path, value) {
	var p = 1,
		pathParts = path.split('.'),
		pathLen = pathParts.length - 1;

	for (; p < pathLen; p++) {
		root = root[pathParts[p]];
	}

	root[pathParts[p]] = value;
};

module.exports = function(pdf) {

	var doc = parser(pdf);

	return {

		parse: function(map, callback) {
			var promises = [];
			var clonedMap = _.cloneDeep(map);

			parseNode(doc, promises, clonedMap, 'root');

			if (_.isEmpty(promises)) {
				callback(null, clonedMap);
			} else {
				q.all(promises).done(
					function(data) {
						for (var i = 0; i < data.length; i++) {
							if (data[i].node === 'root') {
								clonedMap = data[i].value;
							} else {
								setProperty(clonedMap, data[i].node, data[i].value);
							}
						}
						//console.log(JSON.stringify(clonedMap, null, '  '));
						callback(null, clonedMap);
					},
					function(err) {
						callback(err, null);
					}
				);
			}

		}

	}
};