'use strict';

var app = require('../app/app');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

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
        var vowelCountSpy;
        var isPalindromeSpy;

        before(function () {
            vowelCountSpy = sinon.spy(app, 'vowelCount');
            isPalindromeSpy = sinon.spy(app, 'isPalindrome');

            app.generateMessage('pst');
            app.isPalindrome('Kamil');
        });

        after(function () {
            vowelCountSpy.restore();
            isPalindromeSpy.restore();
        });

        describe('callCount', function ()
        {

            it('should call vowelCount 1x', function () {
                expect(vowelCountSpy).callCount(1);
            });

            it('should call isPalindrome 2x', function () {
                expect(isPalindromeSpy).callCount(2);
            });

        });

        describe('calledWith', function ()
        {
            it('should call vowelCount with pst', function () {
                expect(vowelCountSpy.getCall(0)).calledWith('pst');
            });

            it('should call isPalindrome secondly with Kamil argument ', function () {
                expect(isPalindromeSpy.getCall(1)).calledWith('Kamil');
            });


        });
    });

    describe('stub', function ()
    {
        var vowelCountStub;
        var isPalindromeStub;

        describe('returns', function ()
        {
            before(function () {
                vowelCountStub = sinon.stub(app, 'vowelCount').returns(7);
                isPalindromeStub = sinon.stub(app, 'isPalindrome').returns(false);
            });

            after(function () {
                vowelCountStub.restore();
                isPalindromeStub.restore();
            });

            it('should always return palindrome false and vowel count 7', function () {
                expect(app.generateMessage('ikar łapał raki')).to.eql({vowel: 7, palindrome: false, message: "ikar łapał raki is not palindrome and has 7 vovels"});

                expect(app.generateMessage('pst')).to.eql({vowel: 7, palindrome: false, message: "pst is not palindrome and has 7 vovels"});
            });

        });


        describe('withArgs', function ()
        {
            before(function () {
                isPalindromeStub = sinon.stub(app, 'isPalindrome');
                isPalindromeStub.withArgs('Ikar łapał raki').returns(false);
                vowelCountStub = sinon.stub(app, 'vowelCount');
                vowelCountStub.withArgs('Ikar łapał raki').returns(77);
            });

            after(function () {
                vowelCountStub.restore();
                isPalindromeStub.restore();
            });

            it('should return palindrome false and vowelCount 77', function () {
                expect(app.generateMessage('Ikar łapał raki')).to.eql({vowel: 77, palindrome: false, message: "Ikar łapał raki is not palindrome and has 77 vovels"});
            });

        });

        describe('callsFake', function ()
        {
            var fakeVowelCount;
            var fakeIsPalindrome;

            before(function () {
                fakeIsPalindrome = sinon.stub(app, 'isPalindrome').callsFake(function (str) {
                    return true;
                });
                fakeVowelCount = sinon.stub(app, 'vowelCount').callsFake(function (str) {
                    return str.indexOf('a');
                });


            });

            after(function () {
                fakeVowelCount.restore();
                fakeIsPalindrome.restore();
            });

            it('should use fake function', function () {
                expect(app.generateMessage('Kamil')).to.eql({vowel: 1, palindrome: true, message: "Kamil is palindrome and has 1 vovels"});
            });

        });
    });
});
