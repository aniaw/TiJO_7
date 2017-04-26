'use strict';

var app = require('../app/app');
var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('generateMessage without sinon.spy and sinon.stub', function () {
    describe('when string: is palindrome and has vowels', function () {
        it('expecting: "ala" is palindrome and has 2 vowels', function () {
            expect(app.generateMessage('ala')).to.eql({
                vowel: 2, palindrome: true,
                message: 'ala is palindrome and has 2 vowels'
            })
        });
    });
    describe('when string: is palindrome and hasn\'t vowels', function () {
        it('expecting: "xzx" is palindrome and has 0 vowels', function () {
            expect(app.generateMessage('xzx')).to.eql({
                vowel: 0, palindrome: true,
                message: 'xzx is palindrome and has 0 vowels'
            })
        });
    });
    describe('when string: isn\'t palindrome and has vowels', function () {
        it('expecting: "abc" is not palindrome and has 1 vowels', function () {
            expect(app.generateMessage('abc')).to.eql({
                vowel: 1, palindrome: false,
                message: 'abc is not palindrome and has 1 vowels'
            })
        });
    });
    describe('when string: isn\'t palindrome and hasn\'t vowels', function () {
        it('should return "NFZ" is not palindrome and has 0 vowels', function () {
            expect(app.generateMessage('NFZ')).to.eql({
                vowel: 0, palindrome: false,
                message: 'NFZ is not palindrome and has 0 vowels'
            })
        });
    });

describe('generateMessage with sinon.spy and sinon.stub', function () {
    describe('exercise: spying', function () {
        var spyVowelCount;
        var spyIsPalindrome;
        before(function () {
            spyVowelCount = sinon.spy(app, 'vowelCount');
            spyIsPalindrome = sinon.spy(app, 'isPalindrome');
            app.generateMessage('ala');
            app.generateMessage('xzx');
            app.generateMessage('abc');
            app.generateMessage('NFZ');
        });
        after(function () {
            spyVowelCount.restore();
            spyIsPalindrome.restore();
        })
        describe('count of calls', function () {
            it('expect: call vowelCount 4 times', function () {
                expect(vowelCountSpy).callCount(4);
            })
            it('expect: call isPalindrome 4 times', function () {
                expect(isPalindromeSpy).callCount(4);
            })
        });
        describe('call arguments', function () {
            it('expect: call vowelCount with "ala" first time', function () {
                expect(vowelCountSpy.getCall(0)).calledWith('ala');
            })
            it('expect: call vowelCount with "xzx" first time', function () {
                expect(vowelCountSpy.getCall(1)).calledWith('xzx');
            })
            it('expect: call vowelCount with "abc" first time', function () {
                expect(vowelCountSpy.getCall(2)).calledWith('abc');
            })
            it('expect: call vowelCount with "NFZ" first time', function () {
                expect(vowelCountSpy.getCall(3)).calledWith('NFZ');
            })
            it('expect: call isPalindrome with "ala" first time', function () {
                expect(isPalindromeSpy.getCall(0)).calledWith('ala');
            })
            it('expect: call isPalindrome with "xzx" first time', function () {
                expect(isPalindromeSpy.getCall(1)).calledWith('xzx');
            })
            it('expect::uld call isPalindrome with "abc" first time', function () {
                expect(isPalindromeSpy.getCall(2)).calledWith('abc');
            })
            it('expect: call isPalindrome with "NFZ" first time', function () {
                expect(isPalindromeSpy.getCall(3)).calledWith('NFZ');
            })
        });
    });
    describe('exercise: stub', function () {
        var stubIsPalindrome;
        var stubVowelCount;
        describe('returns', function () {
            before(function () {
                stubIsPalindrome = sinon.stub(app, 'isPalindrome').returns(true);
                stubVowelCount = sinon.stub(app, 'vowelCount').returns(7);
            });
            after(function () {
                stubIsPalindrome.restore();
                stubVowelCount.restore();
            });
            it('expect: string is palindrome and has 7 vowels', function () {
                expect(app.generateMessage('bcdfgh')).to.eql({
                    vowel: 7,
                    palindrome: true,
                    message: 'bcdfgh is palindrome and has 7 vowels'
                });
            })
        });
        describe('withArgs', function () {
            before(function () {
                stubIsPalindrome = sinon.stub(app, 'isPalindrome');
                stubIsPalindrome.withArgs('lol').returns(false);
                stubIsPalindrome.withArgs('lmao').returns(true);
                stubVowelCount = sinon.stub(app, 'vowelCount');
                stubVowelCount.withArgs('lol').returns(7);
                stubVowelCount.withArgs('lmao').returns(5);
            });
            after(function () {
                stubIsPalindrome.restore();
                stubVowelCount.restore();
            });
            it('expect: string is not palindrome and has 7 vowels', function () {
                expect(app.generateMessage('lol')).to.eql({
                    vowel: 7,
                    palindrome: false,
                    message: 'lol is not palindrome and has 7 vowels'
                })
            })
            it('expect: is palindrome and has 5 vowels', function () {
                expect(app.generateMessage('lmao')).to.eql({
                    vowel: 5,
                    palindrome: true,
                    message: 'lmao is palindrome and has 5 vowels'
                })
            })
        });
    });
        describe('callsFake', function () {
            var fakeIsPalindrome;
            var fakeVowelCount;
            before(function () {
                fakeVowelCount = sinon.stub(app, 'vowelCount').callsFake(function (str) {
                    return 42;
                });
                fakeIsPalindrome = sinon.stub(app, 'isPalindrome').callsFake(function (str) {
                    return false;
                });
            });
            after(function () {
                fakeIsPalindrome.restore();
                fakeVowelCount.restore();
            });
            it('expect: fake function result', function () {
                expect(app.generateMessage('lol')).to.eql({
                    vowel: 42,
                    palindrome: false,
                    message: "lol is palindrome and has 42 vowels"
                });
                expect(app.generateMessage('lmao')).to.eql({
                    vowel: 42,
                    palindrome: false,
                    message: "lmao is palindrome and has 42 vowels"
                });
            });
        });
    });
});