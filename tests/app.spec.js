'use strict';

var app = require('../app/app');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('generateMessage without sinon.spy and sinon.stub', function ()
{
    describe("When parameter is ok", function(){

        describe("and parameter is a palindrome", function(){
            describe("and has some vovels", function(){
                it("should return object with message, which contains info about being palindrome and vovel count > 0", function(){
                    expect(app.generateMessage('zaraz')).to.eql({vowel: 2, palindrome: true, message: "zaraz is palindrome and has 2 vovels"});
                });
            });
            describe("and has no vovels", function(){
                it("should return object with message, which contains info about being palindrome and vovel count = 0", function(){
                    expect(app.generateMessage('dppd')).to.eql({vowel: 0, palindrome: true, message: "dppd is palindrome and has no vovels"});
                });

            });
        });

        describe("and parameter is not a palindrome", function(){
            describe("and has some vovels", function(){
                it("should return object with message, which contains info about not being palindrome and vovel count > 0", function(){
                    expect(app.generateMessage('aab')).to.eql({vowel: 2, palindrome: false, message: "aab is not palindrome and has 2 vovels"});
                });
            });
            describe("and has no vovels", function(){
                it("should return object with message, which contains info about not being palindrome and vovel count = 0", function(){
                    expect(app.generateMessage('dppp')).to.eql({vowel: 0, palindrome: false, message: "dppp is not palindrome and has no vovels"});
                });

            });
        });
    });

    describe("When parameter is not ok", function(){
        it("should throw Error('Argument is undefined, not a string or empty string!)'", function(){
            expect(function(){app.generateMessage(123)}).to.throw('Argument is undefined, not a string or empty string!');
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
