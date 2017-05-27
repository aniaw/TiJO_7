'use strict';

var expect = require('chai').expect;

var app = require('../app/app');

describe('generateMessage without sinon.spy and sinon.stub', function () {

    describe('is palindrom', function () {

        it('should return: vowel: 8, palindrome: true, message: \'zez is palindrome and has 1 vovels\'}', function () {
            expect(app.generateMessage('zez')).to.eql(
                {
                    vowel: 1,
                    palindrome: true,
                    message: 'zez is palindrome and has 1 vovels'
                }
            )
        })

        it('should return: {vowel: 0, palindrome: true, message: \'zwz is palindrome and has no vovels\'}', function () {
            expect(app.generateMessage('zwz')).to.eql(
                {
                    vowel: 0,
                    palindrome: true,
                    message: 'zwz is palindrome and has no vovels'
                }
            )
        })
    })

    describe('is not palindrom', function () {
        it('should return: {vowel: 0, palindrome: true, message: \'zzwz is not palindrome and has no vovels\'};  when bbbbwbbb given', function () {
            expect(app.generateMessage('zzwz')).to.eql(
                {
                    vowel: 0,
                    palindrome: false,
                    message: 'zzwz is not palindrome and has no vovels'
                }
            )
        })

        it('should return: {vowel: 0, palindrome: true, message: \'awe is not palindrome and has vovels\'};  when aaawbbb given', function () {
            expect(app.generateMessage('awe')).to.eql(
                {
                    vowel: 2,
                    palindrome: false,
                    message: 'awe is not palindrome and has 2 vovels'
                }
            )
        })
    })

    describe('incorect data', function () {
        it('should throw exception when empty string', function () {
            expect(app.generateMessage).to.throw('Argument is undefined, not a string or empty string!');
        })
    })
});

var chai = require('chai');

var sinon = require('sinon');

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var params = ['zez', 'zww', 'zwz', 'eeee'];

var vovelsSpy, palindromSpy;

describe('generateMessage with sinon.spy adn sinon.stub', function () {

    describe('sinon.spy', function () {
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
            it('should call isPalindrome 4 times', function () {
                expect(palindromSpy).callCount(4);
            })
            it('should call vovelCount 4 times', function () {
                expect(palindromSpy).callCount(4);
            })
        });

        describe('calledWith', function () {

            params.forEach(function myFunction(item, index) {
                it("should call vovelCount for " + item, function () {
                    expect(vovelsSpy.getCall(index)).calledWith(item);
                })
            })

            params.forEach(function myFunction(item, index) {
                it("should call isPalindrome for " + item, function () {
                    expect(vovelsSpy.getCall(index)).calledWith(item);
                })
            })
        });
    });

    describe('sinon.stub', function () {

        describe('returns', function () {
            var palindromReturns, vovelsReturns;
            before(function () {
                palindromReturns = sinon.stub(app, 'isPalindrome').returns(false);
                vovelsReturns = sinon.stub(app, 'vowelCount').returns(6346);
            })

            after(function () {
                palindromReturns.restore();
                vovelsReturns.restore();
            })

            it('should return is not palindrome and has 6346 vowels', function () {
                expect(app.generateMessage('dfgdfg')).to.eql({
                    vowel: 6346,
                    palindrome: false,
                    message: 'dfgdfg is not palindrome and has 6346 vovels' })
            })
        });

        describe('withArgs', function () {
            var palindromWithArgs, vovelsWithArgs;
            before(function () {
                palindromWithArgs = sinon.stub(app, 'isPalindrome');
                vovelsWithArgs = sinon.stub(app, 'vowelCount');
                palindromWithArgs.withArgs('eezzee').returns(false); palindromWithArgs.withArgs('zzzd').returns(true);
                vovelsWithArgs.withArgs('eezzee').returns(123321); vovelsWithArgs.withArgs('zzzd').returns(5346);
            })

            after(function () {
                palindromWithArgs.restore();
                vovelsWithArgs.restore();
            })

            it('should return is not palindrome and has 123321 vovels', function () {
                expect(app.generateMessage('eezzee')).to.eql(
                    {
                        vowel: 123321,
                        palindrome: false,
                        message: 'eezzee is not palindrome and has 123321 vovels'
                    }
                )
            })
            it('should return is palindrome and has 5346 vovels', function () {
                expect(app.generateMessage('zzzd')).to.eql(
                    {
                        vowel: 5346,
                        palindrome: true,
                        message: 'zzzd is palindrome and has 5346 vovels'
                    }
                )
            })
        });
        describe('callsFake', function () {
            var fakeVovelsValue, fakeIsPalindromeValue;

            before(function () {
                fakeVovelsValue = sinon.stub(app, 'vowelCount').callsFake(function (str) { return 466; });
                fakeIsPalindromeValue = sinon.stub(app, 'isPalindrome').callsFake(function (str) { return false; });
            })

            after(function () {
                fakeVovelsValue.restore();
                fakeIsPalindromeValue.restore();
            })

            it('should return fake values', function () {
                expect(app.generateMessage('zwz')).to.eql(
                    {
                        vowel: 466,
                        palindrome: false,
                        message: "zwz is not palindrome and has 466 vovels"
                    }
                );
            })
        });
    });
});