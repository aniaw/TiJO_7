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
        var isPalindromeSpy;
        var vowelCountSpy;

        before(function () {
            isPalindromeSpy = sinon.spy(app, 'isPalindrome');
            vowelCountSpy = sinon.spy(app, 'vowelCount');

            app.isPalindrome('abcd');
            app.generateMessage('efgh');
            app.generateMessage('ijkl');
        });

        after(function () {
            isPalindromeSpy.restore();
            vowelCountSpy.restore();
        });

        describe('callCount', function ()
        {
            it('should call isPalindrome() function three times', function () {
                expect(isPalindromeSpy).callCount(3);
            });

            it('should call vowelCount() function twice', function () {
                expect(vowelCountSpy).callCount(2);
            });
        });

        describe('calledWith', function ()
        {
            it('should call isPalindrome() function with \'abcd\' first time', function () {
                expect(isPalindromeSpy.getCall(0)).calledWith('abcd');
            });
            it('should call isPalindrome() function with \'efgh\' second time', function () {
                expect(isPalindromeSpy.getCall(1)).calledWith('efgh');
            });
            it('should call isPalindrome() function with \'ijkl\' third time', function () {
                expect(isPalindromeSpy.getCall(2)).calledWith('ijkl');
            });

            it('should call vowelCount() function with \'efgh\' first time', function () {
                expect(vowelCountSpy.getCall(0)).calledWith('efgh');
            });
            it('should call vowelCount() function with \'ijkl\' second time', function () {
                expect(vowelCountSpy.getCall(1)).calledWith('ijkl');
            });
        });
    });


    describe('stub', function ()
    {
        var isPalindromeStub;
        var vowelCountStub;

        describe('returns', function ()
        {
            before(function () {
                isPalindromeStub = sinon.stub(app, 'isPalindrome').returns(true);
                vowelCountStub = sinon.stub(app, 'vowelCount').returns(10);
            });

            after(function () {
                isPalindromeStub.restore();
                vowelCountStub.restore();
            });

            it('should always return object with vowel count = 10, palindrome = true', function () {
                expect(app.generateMessage('ddde')).to.eql({vowel: 10, palindrome: true, message: "ddde is palindrome and has 10 vovels"});
                expect(app.generateMessage('aaaa')).to.eql({vowel: 10, palindrome: true, message: "aaaa is palindrome and has 10 vovels"});
            });

        });


        describe('withArgs', function ()
        {
            before(function () {
                vowelCountStub = sinon.stub(app, 'vowelCount');
                vowelCountStub.withArgs('ddde').returns(4);
                vowelCountStub.withArgs('aaaa').returns(0);

                isPalindromeStub = sinon.stub(app, 'isPalindrome');
                isPalindromeStub.withArgs('ddde').returns(true);
                isPalindromeStub.withArgs('aaaa').returns(false);
            });

            after(function () {
                isPalindromeStub.restore();
                vowelCountStub.restore();
            });

            it('should return vowelCount equal 4, palindrome = true', function () {
                expect(app.generateMessage('ddde')).to.eql({vowel: 4, palindrome: true, message: "ddde is palindrome and has 4 vovels"});
            });
            it('should return vowelCount equal 0, palindrome = false', function () {
                expect(app.generateMessage('aaaa')).to.eql({vowel: 0, palindrome: false, message: "aaaa is not palindrome and has no vovels"});
            });

        });

        describe('callsFake', function ()
        {
            var fakeIsPalindrome;
            var fakeVowelCount;
            
            before(function () {
                fakeVowelCount = sinon.stub(app, 'vowelCount').callsFake(function (str) {
                    return  str.length;
                });

                fakeIsPalindrome = sinon.stub(app, 'isPalindrome').callsFake(function (str) {
                    return str == 'ddde';
                });
            });

            after(function () {
                fakeIsPalindrome.restore();
                fakeVowelCount.restore();
            });

            it('should use fake function', function () {
                expect(app.generateMessage('ddde')).to.eql({vowel: 4, palindrome: true, message: "ddde is palindrome and has 4 vovels"});
                expect(app.generateMessage('aaaab')).to.eql({vowel: 5, palindrome: false, message: "aaaab is not palindrome and has 5 vovels"});
            });

        });
    });
});
