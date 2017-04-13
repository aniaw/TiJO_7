'use strict';
var expect = require('chai').expect;
var app = require('../app/app');

describe('generateMessage without sinon.spy and sinon.stub', function () {
    describe('if text is palindrome and has vowels', function () {
        it('should return \'kajak\' is palindrome has 2 vovels', function () {expect(app.generateMessage('kajak')).to.eql({vowel:2, palindrome:true,
                message: 'kajak is palindrome and has 2 vovels'})
        });
    });
    describe('if text is palindrome and has no vowels', function () {
        it('should return \'bcb\' is palindrome has no vovels', function () {expect(app.generateMessage('bcb')).to.eql({vowel:0, palindrome:true,
            message: 'bcb is palindrome and has no vovels'})
        });
    });
    describe('if text is not palindrome and has 1 vowels', function () {
        it('should return \'acb\' is not palindrome has 1 vovels', function () {expect(app.generateMessage('acb')).to.eql({vowel:1, palindrome:false,
            message: 'acb is not palindrome and has 1 vovels'})
        });
    });
    describe('if text is not palindrome and has not vowels', function () {
        it('should return \'ccb\' is not palindrome has not vovels', function () {expect(app.generateMessage('ccb')).to.eql({vowel:0, palindrome:false,
            message: 'ccb is not palindrome and has no vovels'})
        });
    });
});

describe('generateMessage with sinon.spy adn sinon.stub', function ()
{
    describe('spy', function ()
    {
        describe('callCount', function ()
        {
        });
        describe('calledWith', function ()
        {
        });
    });

    describe('stub', function ()
    {
        describe('returns', function ()
        {

        });
        describe('withArgs', function ()
        {

        });
        describe('callsFake', function ()
        {

        });
    });
});
