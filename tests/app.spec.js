'use strict';

var chai = require('chai');
var expect = chai.expect;
var app = require('../app/app');

var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('generateMessage without sinon.spy and sinon.stub', function ()
{
    describe('it is palindrome', function (){

        it('palindrom have a vovels', function() { expect(app.generateMessage('kok')).to.eql(
            {vowel: 1, palindrome: true, message:'kok is palindrome and has 1 vovels'});
        })

        it('palindrom havent a vovels', function() { expect(app.generateMessage('kkk')).to.eql(
            {vowel: 0, palindrome: true, message:'kkk is palindrome and has no vovels'});
        })

    });

    describe('it isnt palindrome', function (){

        it('palindrom have a vovels', function() { expect(app.generateMessage('koko')).to.eql(
            {vowel: 2, palindrome: false, message:'koko is not palindrome and has 2 vovels'});
        })

        it('palindrom havent a vovels', function() { expect(app.generateMessage('kkktt')).to.eql(
            {vowel: 0, palindrome: false, message:'kkktt is not palindrome and has no vovels'});
        })

    });


});
var isPalindromeSpy;

describe('generateMessage with sinon.spy adn sinon.stub', function ()
{


    before(function () {
        isPalindromeSpy = sinon.spy(app, 'isPalindrome' );
        app.generateMessage('kok');

    });

    describe('spy', function ()
    {

        afterEach(function () {
            isPalindromeSpy.restore();
        });

        describe('callCount', function ()
        {
            it('should call isPalindrome function once', function() {
                expect(isPalindromeSpy).callCount(1);
            });
        });

        describe('calledWith', function ()
        {
            it('should call isPalindrome with \'kokok\' first time', function() {
                expect(isPalindromeSpy.getCall(0)).calledWith('kok');
            });

        });
    });
});
