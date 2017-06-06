'use strict';

var app = require('../app/app');

describe('generateMessage without sinon.spy and sinon.stub', function ()
{
    describe('it is palindrome', function (){

        it('palindrom have a vovels', function() { expect(app.generateMessage('lal')).to.eql(
            {vowel: 1, palindrome: true, message:'lal is palindrome and has 1 vovels'});
        })

        it('palindrom havent a vovels', function() { expect(app.generateMessage('wwwwwwww')).to.eql(
            {vowel: 0, palindrome: true, message:'wwwwwwww is palindrome and has no vovels'});
        })

    });

    describe('it isnt palindrome', function (){

        it('palindrom have a vovels', function() { expect(app.generateMessage('qweqwe')).to.eql(
            {vowel: 2, palindrome: false, message:'qweqwe is not palindrome and has 2 vovels'});
        })

        it('palindrom havent a vovels', function() { expect(app.generateMessage('mmmmmm')).to.eql(
            {vowel: 0, palindrome: false, message:'mmmmm is not palindrome and has no vovels'});
        })

    });


});
var isPalindromeSpy;

describe('generateMessage with sinon.spy adn sinon.stub', function ()
{


    before(function () {
        isPalindromeSpy = sinon.spy(app, 'isPalindrome' );
        app.generateMessage('lal');

    });

    describe('spy', function ()
    {

        afterEach(function () {
            isPalindromeSpy.restore();
        });

        describe('callCount', function ()
        {
            it('should call isPalindrome function once', function() {
                expect(isPalindromeSpy).callCount(1);
            });
        });

        describe('calledWith', function ()
        {
            it('should call isPalindrome with \'kokok\' first time', function() {
                expect(isPalindromeSpy.getCall(0)).calledWith('lal');
            });

        });
    });
});