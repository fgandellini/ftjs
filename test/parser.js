'use strict';

var expect = require('chai').expect;
var parser = require('../lib/parser');

describe('parser', function() {

  it('should exist', function() {
    expect(parser).to.exist;
  });

  it('should be a nodejs module', function() {
    expect(parser).to.be.a('function');
  });

  describe('get', function() {

    it('should give an error if pdf is null and map is null', function(done) {
      parser(null).get(null, null).then(
        function(data) {
          expect(data).to.not.exist;
          done();
        },
        function(err) {
          expect(err).to.exist
            .and.be.instanceof(Error)
            .and.have.property('message', 'pdf file is null');
          done();
        }
      );
    });

    it('should give an error if pdf is null and map is empty', function(done) {
      parser(null).get({
        x: 0,
        y: 0,
        h: 0,
        w: 0
      }, 'root').then(
        function(data) {
          expect(data).to.not.exist;
          done();
        },
        function(err) {
          expect(err).to.exist
            .and.be.instanceof(Error)
            .and.have.property('message', 'pdf file is null');
          done();
        }
      );
    });

    it('should give an error if pdf is null and map is good', function(done) {
      parser(null).get({
        x: 10,
        y: 10,
        h: 10,
        w: 10
      }, 'root').then(
        function(data) {
          expect(data).to.not.exist;
          done();
        },
        function(err) {
          expect(err).to.exist
            .and.be.instanceof(Error)
            .and.have.property('message', 'pdf file is null');
          done();
        }
      );
    });

    it('should give an error if pdf is null and map is malformed (number of params)', function(done) {
      parser(null).get({
        x: 10,
        y: 10,
        h: 10,
        w: 10,
        k: 10
      }, 'root').then(
        function(data) {
          expect(data).to.not.exist;
          done();
        },
        function(err) {
          expect(err).to.exist
            .and.be.instanceof(Error)
            .and.have.property('message', 'pdf file is null');
          done();
        }
      );
    });

    it('should give an error if pdf is null and map is malformed (type of params)', function(done) {
      parser(null).get({
        x: 'a',
        y: 10,
        h: 10,
        w: 10,
      }, 'root').then(
        function(data) {
          expect(data).to.not.exist;
          done();
        },
        function(err) {
          expect(err).to.exist
            .and.be.instanceof(Error)
            .and.have.property('message', 'pdf file is null');
          done();
        }
      );
    });

    it('should return same map if pdf does not exist and map is null', function(done) {
      parser('notfound.pdf').get(null, 'root').then(
        function(data) {
          expect(data).to.exist;
          expect(data.node).to.equal('root');
          expect(data.value).to.equal(null);
          done();
        },
        function(err) {
          expect(err).to.not.exist
          done();
        }
      );
    });

    it('should give an empty string if pdf does not exist and map is empty', function(done) {
      parser('notfound.pdf').get({
        x: 0,
        y: 0,
        h: 0,
        w: 0
      }, 'root').then(
        function(data) {
          expect(data).to.exist;
          expect(data.node).to.equal('root');
          expect(data.value).to.equal('');
          done();
        },
        function(err) {
          expect(err).to.not.exist;
          done();
        }
      );
    });

    it('should give an error if pdf does not exist and map is good', function(done) {
      parser('notfound.pdf').get({
        x: 10,
        y: 10,
        h: 10,
        w: 10
      }, 'root').then(
        function(data) {
          expect(data).to.not.exist;
          done();
        },
        function(err) {
          expect(err).to.exist
            .and.be.instanceof(Error)
            .and.have.property('message', 'Command failed: Error: Couldn\'t open file \'notfound.pdf\': No such file or directory.\r\n');
          done();
        }
      );
    });

    it('should return same map if pdf does not exist and map is malformed (number of params)', function(done) {
      parser('notfound.pdf').get({
        x: 10,
        y: 10,
        h: 10,
        w: 10,
        k: 10
      }, 'root').then(
        function(data) {
          expect(data).to.exist;
          expect(data.node).to.equal('root');
          expect(data.value).to.deep.equal({
            x: 10,
            y: 10,
            h: 10,
            w: 10,
            k: 10
          });
          done();
        },
        function(err) {
          expect(err).to.not.exist;
          done();
        }
      );
    });

    it('should return same map if pdf does not exist and map is malformed (type of params)', function(done) {
      parser('notfound.pdf').get({
        x: 'a',
        y: 10,
        h: 10,
        w: 10
      }, 'root').then(
        function(data) {
          expect(data).to.exist;
          expect(data.node).to.equal('root');
          expect(data.value).to.deep.equal({
            x: 'a',
            y: 10,
            h: 10,
            w: 10
          });
          done();
        },
        function(err) {
          expect(err).to.not.exist;
          done();
        }
      );
    });

    it('should return the same map if pdf file exist and map is null', function(done) {
      parser('test/test.pdf').get(null, 'root').then(
        function(data) {
          expect(data).to.exist;
          expect(data.node).to.equal('root');
          expect(data.value).to.equal(null);
          done();
        },
        function(err) {
          expect(err).to.not.exist
          done();
        }
      );
    });

    it('should give an empty string if pdf file exist and map is empty', function(done) {
      parser('test/test.pdf').get({
        x: 0,
        y: 0,
        h: 0,
        w: 0
      }, 'root').then(
        function(data) {
          expect(data).to.exist;
          expect(data.node).to.equal('root');
          expect(data.value).to.equal('');
          done();
        },
        function(err) {
          expect(err).to.not.exist;
          done();
        }
      );
    });

    it('should give an error if pdf file exist and map is malformed (number of params)', function(done) {
      parser('test/test.pdf').get({
        x: 10,
        y: 10,
        h: 10,
        w: 10,
        k: 10
      }, 'root').then(
        function(data) {
          expect(data).to.exist;
          expect(data.node).to.equal('root');
          expect(data.value).to.deep.equal({
            x: 10,
            y: 10,
            h: 10,
            w: 10,
            k: 10
          });
          done();
        },
        function(err) {
          expect(err).to.not.exist;
          done();
        }
      );
    });

    it('should give an error if pdf file exist and map is malformed (type of params)', function(done) {
      parser('test/test.pdf').get({
        x: 'a',
        y: 10,
        h: 10,
        w: 10
      }, 'root').then(
        function(data) {
          expect(data).to.exist;
          expect(data.node).to.equal('root');
          expect(data.value).to.deep.equal({
            x: 'a',
            y: 10,
            h: 10,
            w: 10
          });
          done();
        },
        function(err) {
          expect(err).to.not.exist;
          done();
        }
      );
    });

    it('should give "TEST 01" if called with test.pdf and map {x:1400, y:160, h:100, w:990}', function(done) {
      parser('test/test.pdf').get({
        x: 1400,
        y: 160,
        h: 100,
        w: 990
      }, 'root').then(
        function(data) {
          expect(data).to.exist;
          expect(data.node).to.equal('root');
          expect(data.value).to.equal('TEST 01');
          done();
        },
        function(err) {
          expect(err).to.not.exist;
          done();
        }
      );
    });

    it('should give multiple lines as single line if called with test.pdf and map {x:75, y:200, h:120, w:610}', function(done) {
      parser('test/test.pdf').get({
        x: 75,
        y: 200,
        h: 120,
        w: 610
      }, 'root').then(
        function(data) {
          expect(data).to.exist;
          expect(data.node).to.equal('root');
          expect(data.value).to.equal('MODELLO DI PAGAMENTO UNIFICATO');
          done();
        },
        function(err) {
          expect(err).to.not.exist;
          done();
        }
      );
    });

  });

});