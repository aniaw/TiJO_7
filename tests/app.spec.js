'use strict';
var expect = require('chai').expect;
var app = require('../app/app');
var chai = require('chai');
var sinon  = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('generateMessage without sinon.spy and sinon.stub', function ()
{
    describe('palindrome and has 2 vovels',function()
    {
        it('ala is  palindrome and has 2 vovels',function(){
            expect(app.generateMessage('ala')).to.eql({vowel: 2, palindrome: true,
                message: 'ala is palindrome and has 2 vovels'})
        });
    });

    describe('palindrome and has no vovels',function()
    {
        it('  wwwwww is  palindrome and has no vovels',function(){
            expect(app.generateMessage('wwwwww')).to.eql({vowel:0, palindrome: true,
                message: 'wwwwww is palindrome and has no vovels'})
        })
    });
    describe(' is  not palindrome and has vovels',function()
    {
        it(' witaj is not palindrome and has 2 vovels', function(){
            expect(app.generateMessage('witaj')).to.eql({vowel: 2, palindrome: false,
                message: 'witaj is not palindrome and has 2 vovels'})
        });
    });
    describe( 'is not palindrome and has no vovels',function()
    {
        it(' return aeuiouy is not palindrome and has 7 vovels', function(){
            expect(app.generateMessage('aeuiouy')).to.eql({vowel: 7, palindrome: false,
                message: 'aeuiouy is not palindrome and has 7 vovels'})
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
