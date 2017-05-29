'use strict';

var app = require('../app/app');

var expect = require('chai').expect;
var chai = require('chai');
var sinon  = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('generateMessage without sinon.spy and sinon.stub', function ()
{
    it('word is palindrome',function(){
        expect(app.generateMessage('kajak')).to.eql({vowel:2, palindrome: true, message: 'kajak is palindrome and has 2 vowels'})
        expect(app.generateMessage('bcdfdcb')).to.eql({vowel:0, palindrome: true, message: 'bcdfdcb is palindrome and has no vowels'})
    })

    it('word isn\'t palindrome',function(){
        expect(app.generateMessage('toniepalindom')).to.eql({vowel:6, palindrome: false, message: 'toniepalindom is not palindrome and has 6 vowels'})
        expect(app.generateMessage('bcdf')).to.eql({vowel:0, palindrome: false, message: 'bcdf is not palindrome and has no vowels'})
    })

    it('should throw exception', function(){
         expect(function() {app.generateMessage('').to.throw('Argument is undefined, not a string or empty string!');
        })
    })
});


describe('generateMessage with sinon.spy adn sinon.stub', function ()
{
    describe('spy', function ()
    {
        var callCountSpy, isPalindromeSpy;


        before(function(){
            callCountSpy = sinon.spy(app, 'vowelCount');
            isPalindromeSpy = sinon.spy(app, 'isPalindrome');


            app.isPalindrome('tojesttsejot');
            app.isPalindrome('tonie');
            app.generateMessage('PozdrowieniaOd');
            app.generateMessage('PawlaBakowskiego');
            app.generateMessage('boProsilBymPozdrowil');
            app.generateMessage('cossoc');
        });

        after(function () {
            isPalindromeSpy.restore();
            callCountSpy.restore();
        });



        describe('callCount', function ()
        {
            it('vowelCount was called 4? times', function(){
                expect(callCountSpy).callCount(4);
            })
        });


        describe('calledWith', function ()
        {
            it('call 0 is PozdrowieniaOd', function ()
            {
                expect(callCountSpy.getCall(0)).calledWith('PozdrowieniaOd');
            });
            it('call 1 is PawlaBakowskiego', function ()
            {
                expect(callCountSpy.getCall(1)).calledWith('PawlaBakowskiego');
            });
        });


        describe('callCount', function ()
        {
            it('isPalindromeSpy was called 6? times', function(){
                expect(isPalindromeSpy).callCount(6);
            })
        });


        describe('isPalindromeSpy CalledWith', function ()
        {
            it('call 2 is boProsilBymPozdrowil', function ()
            {
                expect(callCountSpy.getCall(2)).calledWith('boProsilBymPozdrowil');
            });
            it('call 3 is cossoc', function ()
            {
                expect(callCountSpy.getCall(3)).calledWith('cossoc');
            });
        });
    });

    describe('stub', function ()
    {
        var isPalindromeStub, generateMessageStub, vowelCountStub, fakeMessageStub;;



        describe('returns', function () {

            before(function () {
                isPalindromeStub = sinon.stub(app, 'isPalindrome').returns(true);
                generateMessageStub = sinon.stub(app, 'generateMessage').returns({vowel: 2, palindrome: true, message: 'randomword is palindrome and has 2 vovels'});
            });

            after(function () {
                isPalindromeStub.restore();
                generateMessageStub.restore();
            });

            it('vowelCount = 2, palindrome = true, message: \'randomWord etc...\'', function(){
                expect(app.generateMessage('anyOtherWord')).to.eql({vowel:2, palindrome: true, message:'randomword is palindrome and has 2 vovels'});
            })

        });

        describe('withArgs', function ()
        {
            before(function () {

                isPalindromeStub = sinon.stub(app, 'isPalindrome');
                vowelCountStub = sinon.stub(app, 'vowelCount');
                isPalindromeStub.withArgs('rand').returns(true);
                isPalindromeStub.withArgs('cottoc').returns(true);
                vowelCountStub.withArgs('cottoc').returns(1);

            });
            after(function () {
                isPalindromeStub.restore();
                vowelCountStub.restore();
            });

            it('should return true',function(){
                expect(app.isPalindrome('rand')).to.eql(true);

            })

            it('should return true and 1', function(){
                expect(app.generateMessage('cottoc')).to.eql({vowel:1, palindrome: true, message:'cottoc is palindrome and has 1 vowels'})
            })
        });


        describe('callsFake', function ()
        {


            before(function () {
                fakeMessageStub = sinon.stub(app, 'generateMessage').callsFake(function (text) {
                    return({vowel:0, palindrome:true, message: "Its a me, Fake-ario"});
                });

            });
            after(function () {
                fakeMessageStub.restore();
            });

            it('0/true/Its a me, Fake-ario',function(){
                expect(app.generateMessage('Hit me baby one more time')).to.eql({vowel:0, palindrome: true, message: "Its a me, Fake-ario"});
            })

        });

    });



});