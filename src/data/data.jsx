const categories = ['Рейтингу', 'Популярности'];
const DEFAULT_FILTR = {CATEGORY: 'Популярные по возрастанию', YEAR: 2023, GENRE: 'боевик'};

const years = getYears();
const imagesAdress ={
    onePic: '../media/one_pic.png'
}

function getYears() {
    const years = {
        arrYear: [],
        start: 2023,
        end: 1960,
    };
    
    for (let i = years.start; i > years.end - 1; i--) {
        years.arrYear.push(i);
    }
    return years.arrYear;
}

// жанры далее мы берем с сервера
const genre = [
    { name: "боевик", id: 1 },
    { name: "комедия", id: 2 },
    { name: "документальный", id: 3 },
    { name: "триллер", id: 4 },
    { name: "ужасы", id: 5 },
    { name: "мультфильм", id: 6 },
];

export {categories, years, genre, DEFAULT_FILTR, imagesAdress}