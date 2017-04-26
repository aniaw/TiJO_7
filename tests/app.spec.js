'use strict';

var app = require('../app/app');
var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('generateMessage without sinon.spy and sinon.stub', function () {
    describe('when text is palindrome and has vovels', function () {
        it('should return  "kajak" is  palindrome and has 2 vovels', function () {
            expect(app.generateMessage('kajak')).to.eql({
                vowel: 2, palindrome: true,
                message: 'kajak is palindrome and has 2 vovels'
            })
        });
    });

    describe('when text is palindrome and has no vovels', function () {
        it('should return  "trrt" is  palindrome and has 2 vovels', function () {
            expect(app.generateMessage('trrt')).to.eql({
                vowel: 0, palindrome: true,
                message: 'trrt is palindrome and has no vovels'
            })
        });
    });

    describe('when text isn\'t palindrome and has 1 vovels', function () {
        it('should return  "leci" is not palindrome and has 2 vovels', function () {
            expect(app.generateMessage('leci')).to.eql({
                vowel: 2, palindrome: false,
                message: 'leci is not palindrome and has 2 vovels'
            })
        });
    });

    describe('when text isn\'t palindrome and has no vovels', function () {
        it('should return  "wf" is not palindrome and has no vovels', function () {
            expect(app.generateMessage('wf')).to.eql({
                vowel: 0, palindrome: false,
                message: 'wf is not palindrome and has no vovels'
            })
        });
    });
});

describe('generateMessage with sinon.spy and sinon.stub', function () {
    describe('spy', function () {
        var vowelCountSpy;
        var isPalindromeSpy;

        before(function () {
            vowelCountSpy = sinon.spy(app, 'vowelCount');
            isPalindromeSpy = sinon.spy(app, 'isPalindrome');
            app.generateMessage('kajak');
            app.generateMessage('trrt');
            app.generateMessage('leci');
            app.generateMessage('wf');
        });

        after(function () {
            vowelCountSpy.restore();
            isPalindromeSpy.restore();
        })

        describe('callCount', function () {
            it('should call vowelCount 4 times', function () {
                expect(vowelCountSpy).callCount(4);
            })

            it('should call isPalindrome 4 times', function () {
                expect(isPalindromeSpy).callCount(4);
            })
        });


        describe('calledWith', function () {
            it('should call vowelCount with "kajak" ', function () {
                expect(vowelCountSpy.getCall(0)).calledWith('kajak');
            })

            it('should call vowelCount with "trrt" ', function () {
                expect(vowelCountSpy.getCall(1)).calledWith('trrt');
            })

            it('should call vowelCount with "leci" ', function () {
                expect(vowelCountSpy.getCall(2)).calledWith('leci');
            })

            it('should call vowelCount with "wf" ', function () {
                expect(vowelCountSpy.getCall(3)).calledWith('wf');
            })

            it('should call isPalindrome with "kajak" ', function () {
                expect(isPalindromeSpy.getCall(0)).calledWith('kajak');
            })

            it('should call isPalindrome with "trrt" ', function () {
                expect(isPalindromeSpy.getCall(1)).calledWith('trrt');
            })

            it('should call isPalindrome with "leci" ', function () {
                expect(isPalindromeSpy.getCall(2)).calledWith('leci');
            })

            it('should call isPalindrome with "wf" ', function () {
                expect(isPalindromeSpy.getCall(3)).calledWith('wf');
            })
        });
    });

    describe('stub', function () {
        var isPalindromeStub;
        var vowelCountStub;

        describe('returns', function () {
            before(function () {
                isPalindromeStub = sinon.stub(app, 'isPalindrome').returns(true);
                vowelCountStub = sinon.stub(app, 'vowelCount').returns(5);
            });

            after(function () {
                isPalindromeStub.restore();
                vowelCountStub.restore();
            });

            it('should always return is palindrome and has 5 vowels', function () {
                expect(app.generateMessage('wf')).to.eql({ vowel: 5, palindrome: true, message: 'wf is palindrome and has 5 vovels' });
            })
        });

        describe('withArgs', function () {
            before(function () {
                isPalindromeStub = sinon.stub(app, 'isPalindrome');
                isPalindromeStub.withArgs('trrt').returns(false);
                isPalindromeStub.withArgs('wf').returns(true);

                vowelCountStub = sinon.stub(app, 'vowelCount');
                vowelCountStub.withArgs('trrt').returns(3);
                vowelCountStub.withArgs('wf').returns(5);
            });

            after(function () {
                isPalindromeStub.restore();
                vowelCountStub.restore();
            });

            it('should always return is not palindrome and has 3 vowels', function () {
                expect(app.generateMessage('trrt')).to.eql({ vowel: 3, palindrome: false, message: 'trrt is not palindrome and has 3 vovels' })
            })

            it('should always return is palindrome and has 5 vowels', function () {
                expect(app.generateMessage('wf')).to.eql({ vowel: 5, palindrome: true, message: 'wf is palindrome and has 5 vovels' })
            })
        });

        describe('callsFake', function () {
            var fakeIsPalindrome;
            var fakeVowelCount;

            before(function () {
                fakeVowelCount = sinon.stub(app, 'vowelCount').callsFake(function (str) {
                    return 13;
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
                expect(app.generateMessage('trrt')).to.eql({ vowel: 13, palindrome: true, message: "trrt is palindrome and has 13 vovels" });
                expect(app.generateMessage('wf')).to.eql({ vowel: 13, palindrome: true, message: "wf is palindrome and has 13 vovels" });
            });
        });
    });
});