'use strict';

var app = require('../app/app');
var chai = require('chai');
var expect = chai.expect;

describe('generateMessage without sinon.spy and sinon.stub', function ()
{
    describe("When argument is wrong", function(){
        it("should throw exception", function(){
            expect(function(){app.generateMessage(7)}).to.throw('Argument is undefined, not a string or empty string!');
        });
    });

    describe("When string is correct", function(){

        describe("and is not palindrome", function(){
            describe("and has vowels", function(){
                it("should return object with message", function(){
                    expect(app.generateMessage('Kamil')).to.eql({vowel: 2, palindrome: false, message: "Kamil is not palindrome and has 2 vovels"});
                });
            });
            describe("and doesnt have vowels", function(){
                it("should return object with message", function(){
                    expect(app.generateMessage('pst')).to.eql({vowel: 0, palindrome: false, message: "pst is not palindrome and has no vovels"});
                });
            });
        });


        describe("and is palindrome", function(){

            describe("and has vowels", function(){
                it("should return object with message", function(){
                    expect(app.generateMessage('Ikar łapał raki')).to.eql({vowel: 6, palindrome: true, message: "Ikar łapał raki is palindrome and has 6 vovels"});
                });
            });
            describe("and doesnt have vowels", function(){
                it("should return object with message", function(){
                    expect(app.generateMessage('123321')).to.eql({vowel: 0, palindrome: true, message: "123321 is palindrome and has no vovels"});
                });
            });
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
