'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const Promise = require('bluebird');
const helpers = require('./helpers');

describe('router -', function () {
    let testRoute = helpers.RouteTester('fixtures/basic');

    beforeEach((done) => {
        require('rimraf')(path.join(process.cwd(), 'windshield-cache'), (err) => done(err));
    });

    it('route can be defined with just a path and no adapters', function (done) {
        let route = {
            path: '/bar',
            adapters: []
        };
        testRoute(route, function (response) {
            assert.equal(response.statusCode, 200);
            done();
        });
    });

    it('route can be defined with just a path and one adapter', function (done) {
        let route = {
            path: '/bar',
            adapters: [ function (context, request) { return Promise.resolve({}); }]
        };
        testRoute(route, function (response) {
            assert.equal(response.statusCode, 200);
            done();
        });
    });

});
