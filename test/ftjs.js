'use strict';

var expect = require('chai').expect;
var ftjs = require('../lib/ftjs');

var pdf = 'test/test.pdf';
var notFoundPdf = 'test/notfound.pdf';

describe('ftjs', function() {

  it('should exist', function() {
    expect(ftjs).to.exist;
  });

  it('should be a module', function() {
    expect(ftjs).to.be.a('function');
  });

  describe('parse', function() {

    it('should be a function', function() {
      expect(ftjs().parse).to.be.a('function');
    });

    it('should skip empty object', function(done) {
      var map = {};
      ftjs().parse(map, function(err, data) {
        expect(data).to.deep.equal({});
        done();
      });
    });

    it('should skip generic object', function(done) {
      var map = {
        str: 'string',
        num: 2,
        fn: function() {}
      };
      ftjs().parse(map, function(err, data) {
        expect(data.str).to.equal('string');
        expect(data.num).to.equal(2);
        expect(data.fn).to.be.a('function');
        done();
      });
    });

    it('should skip empty array', function(done) {
      var map = [];
      ftjs().parse(map, function(err, data) {
        expect(data).to.deep.equal([]);
        done();
      });
    });

    it('should skip generic array', function(done) {
      var map = [1, 2, 3];
      ftjs().parse(map, function(err, data) {
        expect(data[0]).to.equal(1);
        expect(data[1]).to.equal(2);
        expect(data[2]).to.equal(3);
        done();
      });
    });

    it('should skip number', function(done) {
      var map = 1;
      ftjs().parse(map, function(err, data) {
        expect(data).to.equal(map);
        done();
      });
    });

    it('should skip string', function(done) {
      var map = 'map';
      ftjs().parse(map, function(err, data) {
        expect(data).to.equal(map);
        done();
      });
    });

    it('should skip nested empty object', function(done) {
      var map = {
        nested: {}
      };
      ftjs().parse(map, function(err, data) {
        expect(data).to.deep.equal({
          nested: {}
        });
        done();
      });
    });

    it('should skip nested generic object', function(done) {
      var map = {
        nested: {
          str: 'string',
          num: 2,
          fn: function() {}
        }
      };
      ftjs().parse(map, function(err, data) {
        expect(data.nested.str).to.equal('string');
        expect(data.nested.num).to.equal(2);
        expect(data.nested.fn).to.be.a('function')
        done();
      });
    });

    it('should skip nested empty array', function(done) {
      var map = {
        nested: []
      };
      ftjs().parse(map, function(err, data) {
        expect(data).to.deep.equal({
          nested: []
        });
        done();
      });
    });

    it('should skip nested generic array', function(done) {
      var map = {
        nested: [1, 2, 3]
      };
      ftjs().parse(map, function(err, data) {
        expect(data).to.deep.equal({
          nested: [1, 2, 3]
        });
        done();
      });
    });

    it('should skip nested number', function(done) {
      var map = {
        nested: 1
      };
      ftjs().parse(map, function(err, data) {
        expect(data).to.deep.equal({
          nested: 1
        });
        done();
      });
    });

    it('should skip nested string', function(done) {
      var map = {
        nested: 'map'
      };
      ftjs().parse(map, function(err, data) {
        expect(data).to.deep.equal({
          nested: 'map'
        });
        done();
      });
    });

    it('should get map object', function(done) {
      var map = {
        x: 0,
        y: 0,
        h: 0,
        w: 0
      };
      ftjs(pdf).parse(map, function(err, data) {
        expect(data).to.equal('');
        done();
      });
    });

    it('should get map object with shuffled params', function(done) {
      var map = {
        h: 0,
        x: 0,
        w: 0,
        y: 0
      };
      ftjs(pdf).parse(map, function(err, data) {
        expect(data).to.equal('');
        done();
      });
    });

    it('should skip fake map object', function(done) {
      var map = {
        x: 0,
        y: 0,
        h: 0,
        w: 0,
        k: 0
      };
      ftjs().parse(map, function(err, data) {
        expect(data).to.deep.equal({
          x: 0,
          y: 0,
          h: 0,
          w: 0,
          k: 0
        });
        done();
      });
    });

    it('should skip array map', function(done) {
      var map = ['x', 'y', 'h', 'w'];
      ftjs().parse(map, function(err, data) {
        expect(data).to.deep.equal(['x', 'y', 'h', 'w']);
        done();
      });
    });

    it('should get nested map object', function(done) {
      var map = {
        nested: {
          x: 0,
          y: 0,
          h: 0,
          w: 0
        }
      };
      ftjs(pdf).parse(map, function(err, data) {
        expect(data).to.deep.equal({
          nested: ''
        });
        done();
      });
    });

    it('should get nested map object with shuffled params', function(done) {
      var map = {
        nested: {
          h: 0,
          x: 0,
          w: 0,
          y: 0
        }
      };
      ftjs(pdf).parse(map, function(err, data) {
        expect(data).to.deep.equal({
          nested: ''
        });
        done();
      });
    });

    it('should skip nested fake map object', function(done) {
      var map = {
        nested: {
          x: 0,
          y: 0,
          h: 0,
          w: 0,
          k: 0
        }
      };
      ftjs().parse(map, function(err, data) {
        expect(data).to.deep.equal({
          nested: {
            x: 0,
            y: 0,
            h: 0,
            w: 0,
            k: 0
          }
        });
        done();
      });
    });

    it('should skip nested array map', function(done) {
      var map = {
        nested: ['x', 'y', 'h', 'w']
      };
      ftjs().parse(map, function(err, data) {;
        expect(data).to.deep.equal({
          nested: ['x', 'y', 'h', 'w']
        });
        done();
      });
    });

    it('should parse complex map', function(done) {
      var map = {
        b: 1,
        c: 'hello',
        d: {
          e: 3,
          f: 'hello'
        },
        g: {
          x: 0,
          y: 0,
          h: 0,
          w: 0
        },
        h: [1, 2, 3, 4],
        i: [{
          x: 0,
          y: 0,
          h: 0,
          w: 0
        }, 'hello', 1],
        l: {
          x: 0,
          y: 0,
          h: 0,
          w: 0,
          k: 0
        },
        m: {
          x: 0,
          h: 0,
          y: 0,
          w: 0
        },
        fun: function() {}
      };
      ftjs(pdf).parse(map, function(err, data) {
        expect(data.b).to.equal(1);
        expect(data.c).to.equal('hello');
        expect(data.d.e).to.equal(3);
        expect(data.d.f).to.equal('hello');
        expect(data.g).to.equal('');
        expect(data.h[0]).to.equal(1);
        expect(data.h[1]).to.equal(2);
        expect(data.h[2]).to.equal(3);
        expect(data.h[3]).to.equal(4);
        expect(data.i[0]).to.equal('');
        expect(data.i[1]).to.equal('hello');
        expect(data.i[2]).to.equal(1);
        expect(data.l.x).to.equal(0);
        expect(data.l.y).to.equal(0);
        expect(data.l.h).to.equal(0);
        expect(data.l.w).to.equal(0);
        expect(data.l.k).to.equal(0);
        expect(data.m).to.equal('');
        expect(data.fun).to.be.a('function');
        done();
      });
    });

    it('should not modify map object', function(done) {
      var map = {};
      ftjs().parse(map, function(err, data) {
        expect(data).to.not.equal(map);
        done();
      });
    });

    it('should give an error if pdf file not exist and good map is passed', function(done) {
      var map = {
        x: 10,
        y: 10,
        h: 10,
        w: 10
      };
      ftjs(notFoundPdf).parse(map, function(err, data) {
        expect(err).to.exist;
        expect(data).to.not.exist;
        done();
      });
    });

    it('should extract data from valid pdf with no map nesting', function(done) {
      var map = {
        x: 470,
        y: 450,
        h: 63,
        w: 960
      };
      ftjs(pdf).parse(map, function(err, data) {
        if (err) {
          done(err);
        } else {
          expect(map).to.deep.equal({
            x: 470,
            y: 450,
            h: 63,
            w: 960
          });
          expect(data).to.equal('X X X J O H N H O L M E S X X X');
          done();
        }
      });
    });

    it('should extract data from valid pdf with 1 level nesting', function(done) {
      var map = {
        codiceFiscale: {
          x: 470,
          y: 450,
          h: 63,
          w: 960
        },
        cognome: {
          x: 470,
          y: 550,
          h: 63,
          w: 1200
        }
      };
      ftjs(pdf).parse(map, function(err, data) {
        if (err) {
          done(err);
        } else {
          expect(map).to.deep.equal({
            codiceFiscale: {
              x: 470,
              y: 450,
              h: 63,
              w: 960
            },
            cognome: {
              x: 470,
              y: 550,
              h: 63,
              w: 1200
            }
          });
          expect(data).to.deep.equal({
            codiceFiscale: 'X X X J O H N H O L M E S X X X',
            cognome: 'CURTIS ESTES'
          });
          done();
        }
      });
    });

    it('should extract data from valid pdf with 2 leves nesting', function(done) {
      var map = {
        codiceFiscale: {
          x: 470,
          y: 450,
          h: 63,
          w: 960
        },
        datiAnagrafici: {
          cognome: {
            x: 470,
            y: 550,
            h: 63,
            w: 1200
          },
          nome: {
            x: 1680,
            y: 550,
            h: 63,
            w: 680
          },
          sesso: 'M'
        }
      };
      ftjs(pdf).parse(map, function(err, data) {
        if (err) {
          done(err);
        } else {
          expect(map.codiceFiscale).to.deep.equal({
            x: 470,
            y: 450,
            h: 63,
            w: 960
          });
          expect(map.datiAnagrafici.cognome).to.deep.equal({
            x: 470,
            y: 550,
            h: 63,
            w: 1200
          });
          expect(map.datiAnagrafici.nome).to.deep.equal({
            x: 1680,
            y: 550,
            h: 63,
            w: 680
          });
          expect(map.datiAnagrafici.sesso).to.equal('M');
          expect(data.codiceFiscale).to.equal('X X X J O H N H O L M E S X X X');
          expect(data.datiAnagrafici.cognome).to.equal('CURTIS ESTES');
          expect(data.datiAnagrafici.nome).to.equal('JOHN');
          expect(data.datiAnagrafici.sesso).to.equal('M');
          done();
        }
      });
    });

    it('should extract data from valid pdf with complex map', function(done) {
      var map = {
        contribuente: {
          codiceFiscale: {
            x: 470,
            y: 450,
            h: 63,
            w: 960
          },
          datiAnagrafici: {
            cognome: [{
              x: 470,
              y: 550,
              h: 63,
              w: 1200
            }, 'a', 12],
            empty: {
              x: 0,
              y: 0,
              h: 0,
              w: 0
            }
          }
        }
      };
      ftjs(pdf).parse(map, function(err, data) {
        if (err) {
          done(err);
        } else {
          expect(data).to.deep.equal({
            contribuente: {
              codiceFiscale: 'X X X J O H N H O L M E S X X X',
              datiAnagrafici: {
                cognome: ['CURTIS ESTES', 'a', 12],
                empty: ''
              }
            }
          });
          done();
        }
      });
    });

  });

});