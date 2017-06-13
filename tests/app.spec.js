'use strict';

var expect = require('chai').expect;
var app = require('../app/app');
var chai = require('chai');
var sinon  = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('generateMessage without sinon.spy and sinon.stub', function () {
    it('should message ', function () {
        expect(app.generateMessage('ertyuifg')).to.eql({
            message: "ertyuifg is not palindrome and has 4 vovels",
            palindrome: false,
            vowel: 4
        });
        expect(app.generateMessage('kajak')).to.eql({
            message: "kajak is palindrome and has 2 vovels",
            palindrome: true,
            vowel: 2
        });
        expect(app.generateMessage('oko')).to.eql({
            message: "oko is palindrome and has 2 vovels",
            palindrome: true,
            vowel: 2
        });
        expect(app.generateMessage('*')).to.eql({
            message: "* is palindrome and has no vovels",
            palindrome: true,
            vowel: 0
        });
        expect(app.generateMessage('**')).to.eql({
            message: "** is palindrome and has no vovels",
            palindrome: true,
            vowel: 0
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

            app.isPalindrome('zxcv');
            app.generateMessage('wsad');
            app.generateMessage('ok');
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
            it('should call isPalindrome() function with zxcv first time', function () {
                expect(isPalindromeSpy.getCall(0)).calledWith('zxcv');
            });
            it('should call isPalindrome() function with wsad second time', function () {
                expect(isPalindromeSpy.getCall(1)).calledWith('wsad');
            });
            it('should call isPalindrome() function with ok third time', function () {
                expect(isPalindromeSpy.getCall(2)).calledWith('ok');
            });

            it('should call vowelCount() function with wsad first time', function () {
                expect(vowelCountSpy.getCall(0)).calledWith('wsad');
            });
            it('should call vowelCount() function with ok second time', function () {
                expect(vowelCountSpy.getCall(1)).calledWith('ok');
            });
        });
    });

    describe('stub', function ()
    {
        var isPalindromeStub;
        var vowelCountStub;
        describe('returns', function ()
        {
            describe('returns', function () {
                before(function () {
                    isPalindromeStub = sinon.stub(app, 'isPalindrome').returns(false);
                    vowelCountStub = sinon.stub(app, 'vowelCount').returns(3);
                });
                after(function () {
                    isPalindromeStub.restore();
                    vowelCountStub.restore();
                });

                it('should always return is not palindrome and has 3 vowels', function () {
                    expect(app.generateMessage('artur')).to.eql({ vowel: 3, palindrome: false, message: 'artur is not palindrome and has 3 vovels' });
                })
                it('should always return is not palindrome and has 3 vowels', function () {
                    expect(app.generateMessage('marek')).to.eql({ vowel: 3, palindrome: false, message: 'marek is not palindrome and has 3 vovels' });
                })
            });
        });
        describe('withArgs', function ()
        {
            before(function () {
                vowelCountStub = sinon.stub(app, 'vowelCount');
                vowelCountStub.withArgs('zzzz').returns(0);

                isPalindromeStub = sinon.stub(app, 'isPalindrome');
                isPalindromeStub.withArgs('zzzz').returns(false);
            });

            after(function () {
                isPalindromeStub.restore();
                vowelCountStub.restore();
            });


            it('should return vowelCount equal 0, palindrome = false', function () {
                expect(app.generateMessage('zzzz')).to.eql({vowel: 0, palindrome: false, message: "zzzz is not palindrome and has no vovels"});
            });
        });
        describe('callsFake', function ()
        {
            var fakeIsPalindrome;
            var fakeVowelCount;

            before(function () {
                fakeVowelCount = sinon.stub(app, 'vowelCount').callsFake(function (str) {
                    return 55;
                });

                fakeIsPalindrome = sinon.stub(app, 'isPalindrome').callsFake(function (str) {
                    return true;
                });
            });

            after(function () {
                fakeIsPalindrome.restore();
                fakeVowelCount.restore();
            });

            it('should use fake function', function () {
                expect(app.generateMessage('artur')).to.eql({ vowel: 55, palindrome: true, message: "artur is palindrome and has 55 vovels" });
            });
        });
    });
});
