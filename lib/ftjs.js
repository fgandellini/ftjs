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

var recursiveExtractMaps = function(mapObject, parser) {
	if (isMap(mapObject)) {
		mapObject = parser(mapObject);
	} else {
		_.forEach(mapObject, function(val, key) {
			if (isMap(val)) {
				mapObject[key] = parser(mapObject[key]);
			} else if (_.isObject(val)) {
				recursiveExtractMaps(val, parser);
			}
		});
	}
	return mapObject;
};

module.exports = function(pdf) {
	return {

		extractMaps: function(mapObject, parser, callback) {
			var clonedMapObject = _.clone(mapObject);
			callback(recursiveExtractMaps(clonedMapObject, parser));
		}

	};
};