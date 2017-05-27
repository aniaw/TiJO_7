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
        expect(app.generateMessage('aalaa')).to.eql({
            vowel:4,
            palindrome: true,
            message: 'aalaa is palindrome and has 4 vovels'})
        expect(app.generateMessage('kkkk')).to.eql({
            vowel:0,
            palindrome: true,
            message: 'kkkk is palindrome and has no vovels'})
    })

    it('should generate message when word is not palindrome',function(){
        expect(app.generateMessage('lot')).to.eql({
            vowel:1,
            palindrome: false,
            message: 'lot is not palindrome and has 1 vovels'})
        expect(app.generateMessage('lgkl')).to.eql({
            vowel:0,
            palindrome: false,
            message: 'lgkl is not palindrome and has no vovels'})
    })

    it('should throw expception when arguments are wrong', function(){
        expect(function(){app.generateMessage('')}).to.throw('Argument is undefined, not a string or empty string!');
        expect(function () {app.generateMessage('1234567890').to.throw('Argument is undefined, not a string or empty string!');
        })
    })
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
            app.isPalindrome('abcdefg');
            app.generateMessage('aalaa');
            app.generateMessage('myMessage');
        });

        after(function () {
            isPalindromeSpy.restore();
            callCountSpy.restore();
        });

        describe('callCount', function ()
        {
            it('should call callCount function twice',function() {
                expect(callCountSpy).callCount(2);
            })
        });
        describe('calledWith', function ()
        {
            it('should call isPalindrome function with \'abcdefg\' first time', function () {
                expect(isPalindromeSpy.getCall(0)).calledWith('abcdefg');
            })

            it('should call isPalindrome function with \'aalaa\' second time',function(){
                expect(isPalindromeSpy.getCall(1)).calledWith('aalaa');
            })
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
                generateMessageStub = sinon.stub(app, 'generateMessage').returns({
                    vowel: 10,
                    palindrome: true,
                    message: 'lol is palindrome and has 10 vovels'});
            });
            after(function () {
                isPalindromeStub.restore();
                generateMessageStub.restore();
            });

            it('should always return object with vowel count = 10, palindrome = true and message: lol is palindrome and has 10 vovels', function(){
                expect(app.generateMessage('omg')).to.eql({
                    vowel:10,
                    palindrome: true,
                    message:'lol is palindrome and has 10 vovels'});
            })
        });
        describe('withArgs', function ()
        {
            before(function () {
                isPalindromeStub = sinon.stub(app, 'isPalindrome');
                isPalindromeStub.withArgs('lol').returns(false);
                isPalindromeStub.withArgs('rotfl').returns(true);

                vovelCountStub = sinon.stub(app, 'vowelCount');
                vovelCountStub.withArgs('lol').returns(0);
                vovelCountStub.withArgs('rotfl').returns(10);

            });
            after(function () {
                isPalindromeStub.restore();
                vovelCountStub.restore();
            });

            it('should return false, vovel count 0 and message',function(){
                expect(app.generateMessage('lol')).to.eql({
                    vowel:0,
                    palindrome: false,
                    message: 'lol is not palindrome and has no vovels' })
            })

            it('should return true, vowel count 10 and message', function(){
                expect(app.generateMessage('rotfl')).to.eql({
                    vowel:10,
                    palindrome: true,
                    message:'rotfl is palindrome and has 10 vovels'})
            })

        });
        describe('callsFake', function ()
        {
            var fakeMessageStub

            before(function () {
                fakeMessageStub = sinon.stub(app, 'generateMessage').callsFake(function (text) {
                    return({
                        vowel:15,
                        palindrome:false,
                        message: "There is no message!"});
                });

            });
            after(function () {
                fakeMessageStub.restore();
            });

            it('should return false, vowel count 15 and message : There is no message!',function(){
                expect(app.generateMessage('lol')).to.eql({
                    vowel:15,
                    palindrome: false,
                    message: "There is no message!"});
                expect(app.generateMessage('rotfl')).to.eql({
                    vowel:15,
                    palindrome: false,
                    message: "There is no message!"});
            })

        });
    });
});