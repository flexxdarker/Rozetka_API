function formatPrice  (price: number): string  {
    // Перевіряємо, чи є дробова частина
    if (price % 1 !== 0) {
        return (Math.round(price * 100) / 100).toFixed(2); // Округлюємо до 2 знаків після коми
    }
    return price.toString(); // Якщо немає дробової частини, повертаємо ціле число
};

export default formatPrice;