console.log('script.js loaded - NO hello world here!');

function caesarDecrypt(text, shift = 3) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const isUpperCase = code >= 65 && code <= 90;
            const base = isUpperCase ? 65 : 97;
            const shifted = (code - base - shift + 26) % 26;
            return String.fromCharCode(shifted + base);
        }
        return char;
    }).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - script.js running');
    const inputBox = document.querySelector('.input-box');
    const submitBtn = document.querySelector('.submit-btn');
    const resultDiv = document.getElementById('result');

    function handleDecryption() {
        const inputText = inputBox.value.trim();
        if (inputText) {
            const preprocessedText = inputText.replace(/%/g, '@');
            const decryptedText = caesarDecrypt(preprocessedText);
            resultDiv.textContent = `The decrypted email is: ${decryptedText}`;
        } else {
            resultDiv.textContent = '';
        }
    }

    submitBtn.addEventListener('click', handleDecryption);
    inputBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleDecryption();
        }
    });
});
