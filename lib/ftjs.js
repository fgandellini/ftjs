'use strict';

var _ = require('lodash');

var isMap = function(obj) {
	var keys = _.keys(obj);
	return _.isEqual(_.size(keys), 4) &&
		_.contains(keys, 'x') &&
		_.contains(keys, 'y') &&
		_.contains(keys, 'h') &&
		_.contains(keys, 'w');
};

var recursiveExtractMaps = function(mapObject) {
	if (isMap(mapObject)) {
		mapObject = '';
	} else {
		_.forEach(mapObject, function(val, key) {
			if (isMap(val)) {
				mapObject[key] = '';
			} else if (_.isObject(val)) {
				recursiveExtractMaps(val);
			}
		});
	}
	return mapObject;
};

module.exports = function(pdf) {
	return {

		extractMaps: function(mapObject, callback) {
			var clonedMapObject = _.clone(mapObject);
			callback(recursiveExtractMaps(clonedMapObject));
		}

	};
};