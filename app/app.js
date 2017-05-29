function isPalindrome(str)
{
    var strTemp = str.toLowerCase(),
            strLength = strTemp.length;
    if (str === '') {
        return false;
    }
    var halfLength = (strLength % 2 === 0) ? (strLength / 2) : ((strLength - 1) / 2);
    for (var i = 0; i < halfLength; i++) {
        if (strTemp[i] !== strTemp.slice(-1 - i)[0]) {
            return false;
        }
    }
    return true;
}

function vowelCount(str)
{
    var vowelList = 'aeiouyAEIOUY';
    var vovCount = 0;
    for (var i = 0, strLength = str.length; i < strLength; i++) {
        if (vowelList.indexOf(str[i]) !== -1) {
            vovCount++;
        }
    }
    return vovCount;
}

function generateMessage(text)
{
    if (!!text && text.length > 0) {
        var palindrome = this.isPalindrome(text);
        var vowel = this.vowelCount(text);
        var message = '';

        if (palindrome) {
            if (vowel > 0) {
                message = text + ' is palindrome and has ' + vowel + ' vowels';
            }
            else {
                message = text + ' is palindrome and has no vowels';
            }
        }
        else {
            if (vowel > 0) {
                message = text + ' is not palindrome and has ' + vowel + ' vowels';
            }
            else {
                message = text + ' is not palindrome and has no vowels';
            }
        }
        return {vowel: vowel, palindrome: palindrome, message: message};
    } else {
        throw new Error('Argument is undefined, not a string or empty string!');
    }
}

module.exports = {
    generateMessage: generateMessage,
    isPalindrome: isPalindrome,
    vowelCount: vowelCount
};
