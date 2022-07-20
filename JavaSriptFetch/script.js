// SELECTORS
const buttonSelector = document.querySelector('#button');
const inputSelector = document.querySelector('#input');
const answerSelector = document.querySelector('#answer');
const errorSelector = document.querySelector('#error');

// API
const API_ENDPOINT = 'https://yesno.wtf/api';

// FLAGS
let isRequestInProgress = false;

const setIsRequestInProgress = value => {
    isRequestInProgress = value;
};

const setDisableButtonState = isDisabling => {
    if (isDisabling) {
        buttonSelector.setAttribute('disabled', 'disabled');
    } else {
        buttonSelector.removeAttribute('disabled');
    }
};

const cleanupResponse = () => {
    setTimeout(() => {
        answerSelector.innerHTML = '';
        inputSelector.value = '';
        setIsRequestInProgress(false);
        setDisableButtonState(false);
    }, 3000);
};

const showAnswer = answer => {
    setTimeout(() => {
        answerSelector.innerHTML = `<img src=\"${answer}\" width=\"600px\" height=\"400px\">`;
        cleanupResponse();
    }, 3000);
};

const fetchAnswer = () => {
    setIsRequestInProgress(true);

    setDisableButtonState(true);

    fetch(API_ENDPOINT)
        .then(data => data.json())
        .then(data => showAnswer(data.image));
};

const showError = () => {
    errorSelector.innerHTML = 'Write Something First...';

    setTimeout(() => {
        errorSelector.innerHTML = '';
    }, 3000);
};

const getAnswer = () => {
    if (isRequestInProgress) return;
    if (!inputSelector.value) return showError();

    fetchAnswer();
};

const handleKeyEnter = e => {
    if (e.keyCode === 13) {
        getAnswer();
    }
};

buttonSelector.addEventListener('click', getAnswer);