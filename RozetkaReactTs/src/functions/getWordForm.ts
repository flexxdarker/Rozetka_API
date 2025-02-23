// Функція для вибору правильної форми слова
 function getWordForm(number: number, words: string[]): string {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        // Якщо число в діапазоні 11-19, то завжди використовується родовий відмінок множини
        return words[2];
    }

    switch (lastDigit) {
        case 1:
            return words[0]; // однина
        case 2:
        case 3:
        case 4:
            return words[1]; // множина (використовуємо середнє слово для 2, 3, 4)
        default:
            return words[2]; // множина для всіх інших випадків
    }
}

export default  getWordForm;