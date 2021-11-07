import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const apikey = '22318307-8fc961fa8d00a621cd6d86864';

const fetchImg = async ({ query, perPage = 9, currentPage = 1 }) => {
    const res = await axios.get(
        `/?image_type=photo&orientation=horizontal&q=${query}&per_page=${perPage}&key=${apikey}&page=${currentPage}`,
    );
    return res.data.hits;
};

export default fetchImg;
