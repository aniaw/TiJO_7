'use strict';
var expect = require('chai').expect;
var app = require('../app/app');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('generateMessage without sinon.spy and sinon.stub', function ()
{
    describe('if text is palindrome and has vovels',function()
    {
        it('should return  \'kajak\' is  palindrome and has 2 vovels',function(){
            expect(app.generateMessage('kajak')).to.eql({vowel: 2, palindrome: true,
                message: 'kajak is palindrome and has 2 vovels'})
        });
    });

    describe('if text is palindrome and has no vovels',function()
    {
        it('should return  \'lwmwl\' is  palindrome and has no vovels',function(){
            expect(app.generateMessage('lwmwl')).to.eql({vowel:0, palindrome: true,
                message: 'lwmwl is palindrome and has no vovels'})
        })
    });
    describe('if text is a not palindrome and has vovels',function()
    {
        it('should return \'siema\' is not palindrome and has 3 vovels', function(){
            expect(app.generateMessage('siema')).to.eql({vowel: 3, palindrome: false,
                message: 'siema is not palindrome and has 3 vovels'})
        });
    });
    describe('if text is not palindrome and has no vovels',function()
    {
        it('should return \'rps\' is not palindrome and has 3 vovels', function(){
            expect(app.generateMessage('rps')).to.eql({vowel: 0, palindrome: false,
                message: 'rps is not palindrome and has no vovels'})
        });
    });
});

describe('generateMessage with sinon.spy adn sinon.stub', function () {

    describe('spy', function () {
        var callCountSpy;

        before(function () {
            callCountSpy = sinon.spy(app, 'vowelCount');
            app.generateMessage('lel');
        });
        after(function () {
            callCountSpy.restore();
        });

        describe('callCount', function () {
            it('should call vovelCount function once', function () {
                expect(callCountSpy).callCount(1);
            });
        });

        describe('calledWith', function () {
            it('should call  vovelCount with \'lel\' first time', function () {
                expect(callCountSpy.getCall(0)).calledWith('lel');
            });
        });
    });

    describe('stub', function () {
        var callCountStub;

        beforeEach(function () {
            callCountStub = sinon.stub(app, 'vowelCount').returns(3);
            callCountStub.withArgs('eeelllooo').returns(4);
        });

        afterEach(function () {
            callCountStub.restore();
        });
        describe('returns', function () {
            it('should return value 3', function () {
                expect(app.generateMessage('kajak')).to.eql({
                    vowel: 3, palindrome: true,
                    message: 'kajak is palindrome and has 3 vovels'
                })
            });
        });
        describe('withArgs', function () {

            it('should return 4', function () {
                expect(app.vowelCount('eeelllooo')).to.eql(4)
            });

        });
        describe('callsFake', function () {
            var fakeCallCount;

            before(function () {
                console.log('before fake');
                callCountStub.restore();

                fakeCallCount = sinon.stub(app, 'vowelCount').callsFake(function (str) {
                    var fake = app.vowelCount(str) + 10;
                    return fake;
                });
            });

            describe('if we use fake function', function () {
                it('should return fake value', function () {
                    expect(app.vowelCount('jupi')).to.eql(12)
                });
            });
        });
    });
});
