'use strict';

var app = require("../app/app");
var chai = require('chai');
var expect = chai.expect;

var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);


describe('generateMessage without sinon.spy and sinon.stub', function ()
{
    describe('when parametrs palindrome ist true',function()
       {
           it('should check is palindrome and have 2 vovels',function(){
               expect(app.generateMessage('zaraz')).to.eql({vowel: 2, palindrome: true,
               message: 'zaraz is palindrome and has 2 vovels'});
               });
        });

     describe('is palindrome and has no vovels', function (){
           it('should check is palindrome and has no vovels', function(){
               expect(app.generateMessage('qqqq')).to.eql({vowel : 0, palindrome : true,
               message: 'qqqq is palindrome and has no vovels'});
           });
         });
      describe('when parametrs is not palindrome and has 1 vowels', function(){
      {
        it('should check is not palindrome and has 1 vovels', function(){
            expect(app.generateMessage('abc')).to.eql({vowel : 1, palindrome : false,
            message: 'abc is not palindrome and has 1 vovels'});
            });
       }});
       describe('when parametrs is not palindrome and has no vovels', function(){
            it('should check is not palindrome and has no vovels', function(){
            expect(app.generateMessage('ccb')).to.eql({vowel : 0, palindrome : false,
            message: 'ccb is not palindrome and has no vovels'});
            });
       });

});
describe('generateMessage with sinon.spy adn sinon.stub', function ()
{
    describe('spy', function ()
    {
        var vowelCountSpy;

        before(function () {
            vowelCountSpy = sinon.spy(app, 'vowelCount');
            app.generateMessage('kli');
        });

        after(function () {
            vowelCountSpy.restore();
        });

        describe('callCount', function (){
            it('should call vowelCount() function once', function () {
                expect(vowelCountSpy).callCount(1);
                });
        });

        describe('calledWith', function (){
            it('should call vowelCount() function with \'kli\' first time', function () {
                expect(vowelCountSpy.getCall(0)).calledWith('kli');
            });

        });
    });

    describe('stub', function ()
    {
     var vowelCountStub;

        describe('returns', function (){
            before(function () {
                vowelCountStub = sinon.stub(app, 'vowelCount').returns(3);
            });

            after(function () {
                vowelCountStub.restore();
            });

            it('should always return values count = 3', function () {
                 expect(app.generateMessage('zaraz')).to.eql({vowel: 3, palindrome: true, message: "zaraz is palindrome and has 3 vovels"});
            });
        });

        describe('withArgs', function (){
           before(function () {
              vowelCountStub = sinon.stub(app, 'vowelCount');
              vowelCountStub.withArgs('wrto').returns(4);
           });

           after(function () {
               vowelCountStub.restore();
           });

           it('should return 4', function () {
                 expect(app.vowelCount('wrto')).to.eql(4)
           });
        });

        describe('callsFake', function (){
             var fakeVowelCount;

             before(function () {
                fakeVowelCount = sinon.stub(app, 'vowelCount').callsFake(function (str) {
                return  str.length;
                });
             });

             after(function () {
                fakeVowelCount.restore();
             });
             it('should use fake function', function () {
                expect(app.generateMessage('zaraz')).to.eql({vowel: 5, palindrome: true, message: "zaraz is palindrome and has 5 vovels"});
              });

        });
    });
});