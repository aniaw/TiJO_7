'use strict';
var expect = require('chai').expect;
var app = require('../app/app');

describe('generateMessage without sinon.spy and sinon.stub', function () {

    describe('Text is palindrom', function () {
        it('should return: {' +
            'vowel: 8,' +
            ' palindrome: true,' +
            ' message: \'aaaawaaaa is palindrome and has 8 vovels\'}; when aaaawaaa given', function () {
            expect(app.generateMessage('aaaawaaaa')).to.eql(
                {
                    vowel: 8,
                    palindrome: true,
                    message: 'aaaawaaaa is palindrome and has 8 vovels'
                }
            )
        })

        it('should return: {' +
            'vowel: 0,' +
            ' palindrome: true,' +
            ' message: \'bbbbwbbbb is palindrome and has no vovels\'};  when bbbbwbbbb given', function () {
            expect(app.generateMessage('bbbbwbbbb')).to.eql(
                {
                    vowel: 0,
                    palindrome: true,
                    message: 'bbbbwbbbb is palindrome and has no vovels'
                }
            )
        })

    })

    describe('Text is not palindrom', function () {
        it('should return: {' +
            'vowel: 0,' +
            ' palindrome: true,' +
            ' message: \'bbbbwbbb is not palindrome and has no vovels\'};  when bbbbwbbb given', function () {
            expect(app.generateMessage('bbbbwbbb')).to.eql(
                {
                    vowel: 0,
                    palindrome: false,
                    message: 'bbbbwbbb is not palindrome and has no vovels'
                }
            )
        })

        it('should return: {' +
            'vowel: 0,' +
            ' palindrome: true,' +
            ' message: \'aaawbbb is not palindrome and has vovels\'};  when aaawbbb given', function () {
            expect(app.generateMessage('aaawbbb')).to.eql(
                {
                    vowel: 3,
                    palindrome: false,
                    message: 'aaawbbb is not palindrome and has 3 vovels'
                }
            )
        })
    })

    describe('Incorect data given', function () {
        it('should throw exception when empty string given', function () {
            expect(app.generateMessage).to.throw('Argument is undefined, not a string or empty string!');
        })
    })
});

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var params = ['aba', 'add', 'pdp', 'aaaa', 'appapa'];
var vovelsSpy, palindromSpy;

describe('generateMessage with sinon.spy adn sinon.stub', function () {
    describe('spy', function () {

        before(function () {
            vovelsSpy = sinon.spy(app, 'vowelCount');
            palindromSpy = sinon.spy(app, 'isPalindrome');
            params.forEach(function myFunction(item, index) {
                app.generateMessage(item);
            })
        })

        after(function () {
            vovelsSpy.restore();
            palindromSpy.restore();
        })

        describe('callCount', function () {
            it('should call isPalindrome 5x', function () {
                expect(palindromSpy).callCount(5);
            })
            it('should call vovelCount 5x', function () {
                expect(palindromSpy).callCount(5);
            })
        });
        describe('calledWith', function () {

            params.forEach(function myFunction(item, index) {
                it("should call vovelCount for " + item + " given", function () {
                    expect(vovelsSpy.getCall(index)).calledWith(item);
                })
            })

            params.forEach(function myFunction(item, index) {
                it("should call isPalindrome for " + item + " given", function () {
                    expect(vovelsSpy.getCall(index)).calledWith(item);
                })
            })
        });
    });

    describe('stub', function () {

        describe('returns', function () {
            var palindromReturns, vovelsReturns;
            before(function () {
                palindromReturns = sinon.stub(app, 'isPalindrome').returns(false);
                vovelsReturns = sinon.stub(app, 'vowelCount').returns(10301312);
            })
            
            after(function () {
                palindromReturns.restore();
                vovelsReturns.restore();
            })

            it('Returns is not palindroem and has 10301312 vowels', function () {
                expect(app.generateMessage('daoskdaps')).to.eql({ vowel: 10301312
                    , palindrome: false,
                    message: 'daoskdaps is not palindrome and has 10301312 vovels' })
            })
        });
        describe('withArgs', function () {
            var palindromWithArgs, vovelsWithArgs;
            before(function () {
                palindromWithArgs = sinon.stub(app, 'isPalindrome');
                vovelsWithArgs = sinon.stub(app, 'vowelCount');
                palindromWithArgs.withArgs('aabbaa').returns(false); palindromWithArgs.withArgs('wwwd').returns(true);
                vovelsWithArgs.withArgs('aabbaa').returns(213312312); vovelsWithArgs.withArgs('wwwd').returns(321);
            })

            after(function () {
                palindromWithArgs.restore();
                vovelsWithArgs.restore();
            })

            it('Return is not palindrome and has 213312312 vovels for "aabbaa" given', function () {
                expect(app.generateMessage('aabbaa')).to.eql({ vowel: 213312312
                                                             , palindrome: false,
                                                               message: 'aabbaa is not palindrome and has 213312312 vovels' })
            })
            it('Return is palindrome and has 321 vovels for "wwwd" given', function () {
                expect(app.generateMessage('wwwd')).to.eql({ vowel: 321
                    , palindrome: true,
                    message: 'wwwd is palindrome and has 321 vovels' })
            })
        });
        describe('callsFake', function () {
            var fakeVovelsValue, fakeIsPalindromeValue;

            before(function () {
                fakeVovelsValue = sinon.stub(app, 'vowelCount').callsFake(function (str) { return 100;});
                fakeIsPalindromeValue = sinon.stub(app, 'isPalindrome').callsFake(function (str) { return false;});
            })
            
            after(function () {
                fakeVovelsValue.restore();
                fakeIsPalindromeValue.restore();
            })

            it('should return fake values', function () {
                expect(app.generateMessage('aba')).to.eql({ vowel: 100, palindrome: false, message: "aba is not palindrome and has 100 vovels" });
            })
        });
    });
});
