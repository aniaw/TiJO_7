'use strict';
var expect = require('chai').expect;
var app = require('../app/app');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('generateMessage without sinon.spy and sinon.stub', function () {
    describe('if text is palindrome and has vowels', function () {
        it('should return \'kajak\' is palindrome has 2 vovels', function () {expect(app.generateMessage('kajak')).to.eql({vowel:2, palindrome:true,
                message: 'kajak is palindrome and has 2 vovels'})
        });
    });
    describe('if text is palindrome and has no vowels', function () {
        it('should return \'bcb\' is palindrome has no vovels', function () {expect(app.generateMessage('bcb')).to.eql({vowel:0, palindrome:true,
            message: 'bcb is palindrome and has no vovels'})
        });
    });
    describe('if text is not palindrome and has 1 vowels', function () {
        it('should return \'acb\' is not palindrome has 1 vovels', function () {expect(app.generateMessage('acb')).to.eql({vowel:1, palindrome:false,
            message: 'acb is not palindrome and has 1 vovels'})
        });
    });
    describe('if text is not palindrome and has not vowels', function () {
        it('should return \'ccb\' is not palindrome has not vovels', function () {expect(app.generateMessage('ccb')).to.eql({vowel:0, palindrome:false,
            message: 'ccb is not palindrome and has no vovels'})
        });
    });
});

describe('generateMessage with sinon.spy adn sinon.stub', function () {
    describe('spy', function () {
        var vowelCountSpy;

        before(function () {
            vowelCountSpy = sinon.spy(app, 'vowelCount');
            app.generateMessage('las');
            app.generateMessage('asd');
        });
        after(function () {
            vowelCountSpy.restore();
        });

        describe('callCount', function () {
            it('should call vovelCount function twice', function () {
                expect(vowelCountSpy).callCount(2);
            });
        });

        describe('calledWith', function () {
            it('should call  vovelCount with \'las\' first time', function () {
                expect(vowelCountSpy.getCall(0)).calledWith('las');
            });
            describe('calledWith', function () {
                it('should call  vovelCount with \'asd\' second time', function () {
                    expect(vowelCountSpy.getCall(1)).calledWith('asd');
                });
            });
        });
    });
    describe('stub', function () {
        var vowelCountStub;

        describe('returns', function () {
            beforeEach(function () {
                vowelCountStub = sinon.stub(app, 'vowelCount').returns(3);

            });
            afterEach(function () {
                vowelCountStub.restore();
            });
            it('should always return is palindrome and has 3 vowels', function () {
                expect(app.generateMessage('kajak')).to.eql({
                    vowel: 3,
                    palindrome: true,
                    message: 'kajak is palindrome and has 3 vovels'
                });
            });
        });
        describe('withArgs', function () {
            beforeEach(function () {
                vowelCountStub = sinon.stub(app, 'vowelCount');
                vowelCountStub.withArgs('kajak').returns(3);

            });
            afterEach(function () {
                vowelCountStub.restore();
            });
            it('should always return is not palindrome and has 3 vowels', function () {
                expect(app.generateMessage('kajak')).to.eql({ vowel: 3, palindrome: true, message: 'kajak is palindrome and has 3 vovels' })
            });
            });

        describe('callsFake',function () {
            var callsFakevowel;

            beforeEach(function () {
                callsFakevowel = sinon.stub(app, 'vowelCount').callsFake(function (str) {
                    return 15;
                });
            });
            afterEach(function () {
                callsFakevowel.restore();
            });
            it('should use fake function', function () {
                expect(app.generateMessage('aertff')).to.eql({
                    vowel: 15,
                    palindrome: false,
                    message: "aertff is not palindrome and has 15 vovels"
                });
            });
        })

    });
});