'use strict';
var expect = require('chai').expect;
var app = require('../app/app');
var chai = require('chai');
var sinon  = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);


describe('generateMessage without sinon.spy and sinon.stub', function ()
{
    it('should generate message when word is palindrome',function(){
        expect(app.generateMessage('Igor łamał rogi')).to.eql({vowel:6, palindrome: true, message: 'Igor łamał rogi is palindrome and has 6 vovels'});
        expect(app.generateMessage('lwwl')).to.eql({vowel:0, palindrome: true, message: 'lwwl is palindrome and has no vovels'});
    });

    it('should generate message when word is not palindrome',function(){
        expect(app.generateMessage('igor łamał')).to.eql({vowel:4, palindrome: false, message: 'igor łamał is not palindrome and has 4 vovels'});
        expect(app.generateMessage('lwsl')).to.eql({vowel:0, palindrome: false, message: 'lwsl is not palindrome and has no vovels'});
    });

    it('should throw expception when arguments are wrong', function(){
        expect(function(){app.generateMessage('')}).to.throw('Argument is undefined, not a string or empty string!');
        expect(function () {app.generateMessage('1234').to.throw('Argument is undefined, not a string or empty string!');
        });
    });
});

describe('generateMessage with sinon.spy adn sinon.stub', function ()
{
    describe('spy', function ()
    {
        var callCountSpy;
        var isPalindromeSpy;
        before(function(){
            callCountSpy = sinon.spy(app, 'vowelCount');
            isPalindromeSpy = sinon.spy(app, 'isPalindrome');
            app.isPalindrome('abcd');
            app.generateMessage('Igor łamał rogi');
            app.generateMessage('Ikar łapał raki');
            app.generateMessage('message');
        });

        after(function () {
            isPalindromeSpy.restore();
            callCountSpy.restore();
        });

        describe('callCount', function ()
        {
            it('should call callCount function triple time',function() {
                expect(callCountSpy).callCount(3);
            })
        });
        describe('calledWith', function ()
        {
            it('should call isPalindrome function with \'abcd\' first time', function () {
                expect(isPalindromeSpy.getCall(0)).calledWith('abcd');
            });

            it('should call isPalindrome function with \'Igor łamał rogi\' second time',function(){
                expect(isPalindromeSpy.getCall(1)).calledWith('Igor łamał rogi');
            });

            it('should call isPalindrome function with \'Ikar łapał raki\' third time',function(){
                expect(isPalindromeSpy.getCall(2)).calledWith('Ikar łapał raki');
            });
        });
    });

    describe('stub', function ()
    {
        var isPalindromeStub;
        var generateMessageStub;
        var vovelCountStub;
        describe('returns', function () {

            before(function () {
                isPalindromeStub = sinon.stub(app, 'isPalindrome').returns(true);
                generateMessageStub = sinon.stub(app, 'generateMessage').returns({vowel: 3, palindrome: true, message: 'komornik is palindrome and has 3 vovels'});
            });
            after(function () {
                isPalindromeStub.restore();
                generateMessageStub.restore();
            });

            it('should always return object with vowel count = 3, palindrome = true and message: komornik is palindrome and has 3 vovels', function(){
                expect(app.generateMessage('komornik')).to.eql({vowel:3, palindrome: true, message:'komornik is palindrome and has 3 vovels'});
            })
        });
        describe('withArgs', function ()
        {
            before(function () {
                isPalindromeStub = sinon.stub(app, 'isPalindrome');
                isPalindromeStub.withArgs('ava').returns(false);
                isPalindromeStub.withArgs('qwerty').returns(true);

                vovelCountStub = sinon.stub(app, 'vowelCount');
                vovelCountStub.withArgs('ava').returns(0);
                vovelCountStub.withArgs('qwerty').returns(5);

            });
            after(function () {
                isPalindromeStub.restore();
                vovelCountStub.restore();
            });

            it('should return false, vovel count 0 and message',function(){
                expect(app.generateMessage('ava')).to.eql({vowel:0, palindrome: false, message: 'ava is not palindrome and has no vovels' });
            });

            it('should return true, vowel count 5 and message', function(){
                expect(app.generateMessage('qwerty')).to.eql({vowel:5, palindrome: true, message:'qwerty is palindrome and has 5 vovels'});
            });

        });
        describe('callsFake', function ()
        {
            var fakeMessageStub;

            before(function () {
                fakeMessageStub = sinon.stub(app, 'generateMessage').callsFake(function (text) {
                    return({vowel:3, palindrome:false, message: "What do you want?"});
                });

            });
            after(function () {
                fakeMessageStub.restore();
            });

            it('should return false, vowel count 3 and message : What do you want?',function(){
                expect(app.generateMessage('ava')).to.eql({vowel:3, palindrome: false, message: "What do you want?"});
                expect(app.generateMessage('qwerty')).to.eql({vowel:3, palindrome: false, message: "What do you want?"});
            })

        });
    });
});