'use strict';

var app = require('../app/app');
var chai = require('chai');
var expect = require('chai').expect;
var sinon  = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('generateMessage without sinon.spy and sinon.stub', function ()
{
    it('should generate a message when the word is a palindrome',function(){
        expect(app.generateMessage('ada')).to.eql({vowel:2, palindrome: true, message: 'ada is palindrome and has 2 vovels'})
        expect(app.generateMessage('zzz')).to.eql({vowel:0, palindrome: true, message: 'zzz is palindrome and has no vovels'})
    })
    it('should generate a message when the word is not a palindrome',function(){
        expect(app.generateMessage('lot')).to.eql({vowel:1, palindrome: false, message: 'lot is not palindrome and has 1 vovels'})
        expect(app.generateMessage('fcb')).to.eql({vowel:0, palindrome: false, message: 'fcb is not palindrome and has no vovels'})
    })

    it('should throw an exception when arguments are wrong', function(){
        expect(function(){app.generateMessage('')}).to.throw('Argument is undefined, not a string or empty string!');
        expect(function () {app.generateMessage('787').to.throw('Argument is undefined, not a string or empty string!');
        })
    })
});

describe('generateMessage with sinon.spy adn sinon.stub', function ()
{
    describe('spy', function ()
    {
        var callCountSpy;
        var isPalindromeSpy;
        before(function(){
            callCountSpy = sinon.spy(app, 'vowelCount');
            isPalindromeSpy = sinon.spy(app, 'isPalindrome');
            app.isPalindrome('qazx');
            app.generateMessage('ada');

            app.generateMessage('my message');
        });

        after(function () {
            isPalindromeSpy.restore();
            callCountSpy.restore();
        });

        describe('callCount', function ()
        {
            it('should call callCount function twice',function() {
                expect(callCountSpy).callCount(2);
            })
        });
        describe('calledWith', function ()
        {
            it('should call isPalindrome function with \'qazx\' first time', function () {
                expect(isPalindromeSpy.getCall(0)).calledWith('qazx');
            })

            it('should call isPalindrome function with \'ada\' second time',function(){
                expect(isPalindromeSpy.getCall(1)).calledWith('ada');
            })
        });
    });

    describe('stub', function ()
    {
        var isPalindromeStub;
        var generateMessageStub;
        var vovelCountStub;
        describe('returns', function () {

            before(function () {
                isPalindromeStub = sinon.stub(app, 'isPalindrome').returns(true);
                generateMessageStub = sinon.stub(app, 'generateMessage').returns({vowel: 7, palindrome: true, message: 'abc is palindrome and has 7 vovels'});
            });
            after(function () {
                isPalindromeStub.restore();
                generateMessageStub.restore();
            });

            it('should always return an object with vowel count = 7, palindrome = true and message: abc is palindrome and has 7 vovels', function(){
                expect(app.generateMessage('qazxy')).to.eql({vowel:7, palindrome: true, message:'abc is palindrome and has 7 vovels'});
            })
        });
        describe('withArgs', function ()
        {
            before(function () {
                isPalindromeStub = sinon.stub(app, 'isPalindrome');
                isPalindromeStub.withArgs('ada').returns(false);
                isPalindromeStub.withArgs('qazxy').returns(true);

                vovelCountStub = sinon.stub(app, 'vowelCount');
                vovelCountStub.withArgs('ada').returns(0);
                vovelCountStub.withArgs('qazxy').returns(7);

            });
            after(function () {
                isPalindromeStub.restore();
                vovelCountStub.restore();
            });

            it('should return false, vovel count 0 and message',function(){
                expect(app.generateMessage('ada')).to.eql({vowel:0, palindrome: false, message: 'ada is not palindrome and has no vovels' })
            })

            it('should return true, vowel count 7 and message', function(){
                expect(app.generateMessage('qazxy')).to.eql({vowel:7, palindrome: true, message:'qazxy is palindrome and has 7 vovels'})
            })

        });
        describe('callsFake', function ()
        {
            var fakeMessageStub

            before(function () {
                fakeMessageStub = sinon.stub(app, 'generateMessage').callsFake(function (text) {
                    return({vowel:6, palindrome:false, message: "No message!"});
                });

            });
            after(function () {
                fakeMessageStub.restore();
            });

            it('should return false, vowel count 6 and message : No message!',function(){
                expect(app.generateMessage('ala')).to.eql({vowel:6, palindrome: false, message: "No message!"});
                expect(app.generateMessage('qazxy')).to.eql({vowel:6, palindrome: false, message: "No message!"});
            })
        });
    });
});