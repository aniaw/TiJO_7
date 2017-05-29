'use strict';

var app = require('../app/app');
var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('generateMessage without sinon.spy and sinon.stub', function () {
    describe('when text is palindrome and has vovels', function () {
        it('should return  "zaraz" is  palindrome and has 2 vovels', function () {
            expect(app.generateMessage('zaraz')).to.eql({
                vowel: 2, palindrome: true,
                message: 'zaraz is palindrome and has 2 vovels'
            })
        });
    });

    describe('when text is palindrome and has vovels', function () {
        it('should return  "gfjfg" is  palindrome and has no vovels', function () {
            expect(app.generateMessage('gfjfg')).to.eql({
                vowel: 0, palindrome: true,
                message: 'gfjfg is palindrome and has no vovels'
            })
        });
    });

    describe('when text isn\'t palindrome and has 1 vovels', function () {
        it('should return  "git" is not palindrome and has 1 vovels', function () {
            expect(app.generateMessage('git')).to.eql({
                vowel: 1, palindrome: false,
                message: 'git is not palindrome and has 1 vovels'
            })
        });
    });

    describe('when text isn\'t palindrome and has no vovels', function () {
        it('should return  "jhsv" is not palindrome and has no vovels', function () {
            expect(app.generateMessage('jhsv')).to.eql({
                vowel: 0, palindrome: false,
                message: 'jhsv is not palindrome and has no vovels'
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
            app.generateMessage('zaraz');
            app.generateMessage('gfjfg');
            app.generateMessage('git');
            app.generateMessage('jhsv');
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
            it('should call vowelCount with "zaraz" first time', function () {
                expect(vowelCountSpy.getCall(0)).calledWith('zaraz');
            })

            it('should call vowelCount with "gfjfg" first time', function () {
                expect(vowelCountSpy.getCall(1)).calledWith('gfjfg');
            })

            it('should call vowelCount with "git" first time', function () {
                expect(vowelCountSpy.getCall(2)).calledWith('git');
            })

            it('should call vowelCount with "jhsv" first time', function () {
                expect(vowelCountSpy.getCall(3)).calledWith('jhsv');
            })

            it('should call isPalindrome with "zaraz" first time', function () {
                expect(isPalindromeSpy.getCall(0)).calledWith('zaraz');
            })

            it('should call isPalindrome with "gfjfg" first time', function () {
                expect(isPalindromeSpy.getCall(1)).calledWith('gfjfg');
            })

            it('should call isPalindrome with "git" first time', function () {
                expect(isPalindromeSpy.getCall(2)).calledWith('git');
            })

            it('should call isPalindrome with "jhsv" first time', function () {
                expect(isPalindromeSpy.getCall(3)).calledWith('jhsv');
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
                expect(app.generateMessage('jhsv')).to.eql({ vowel: 5, palindrome: true, message: 'jhsv is palindrome and has 5 vovels' });
            })
        });

        describe('withArgs', function () {
            before(function () {
                isPalindromeStub = sinon.stub(app, 'isPalindrome');
                isPalindromeStub.withArgs('gfjfg').returns(false);
                isPalindromeStub.withArgs('jhsv').returns(true);

                vowelCountStub = sinon.stub(app, 'vowelCount');
                vowelCountStub.withArgs('gfjfg').returns(3);
                vowelCountStub.withArgs('jhsv').returns(5);
            });

            after(function () {
                isPalindromeStub.restore();
                vowelCountStub.restore();
            });

            it('should always return is not palindrome and has 3 vowels', function () {
                expect(app.generateMessage('gfjfg')).to.eql({ vowel: 3, palindrome: false, message: 'gfjfg is not palindrome and has 3 vovels' })
            })

            it('should always return is palindrome and has 5 vowels', function () {
                expect(app.generateMessage('jhsv')).to.eql({ vowel: 5, palindrome: true, message: 'jhsv is palindrome and has 5 vovels' })
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
                expect(app.generateMessage('gfjfg')).to.eql({ vowel: 13, palindrome: true, message: "gfjfg is palindrome and has 13 vovels" });
                expect(app.generateMessage('jhsv')).to.eql({ vowel: 13, palindrome: true, message: "jhsv is palindrome and has 13 vovels" });
            });
        });
    });
});