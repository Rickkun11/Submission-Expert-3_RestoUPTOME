import UrlParser from '../../routes/url-parser';
import DataSource from '../../data/restaurant-data';
import { createRestoDetailTemplate } from '../template/template-creator';
import LikeButtonInit from '../../utils/like-button-initiator';
import FavoriteResto from '../../data/favoriteresto-idb';

const Details = {
    async render() {
        return ` 
        <div id="container-menu" class="container-menu"></div>
        <div id="likeButtonContainer"></div>
          `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const items = await DataSource.Details(url.id);
        const { restaurant } = items;
        const detailContainer = document.getElementById("container-menu");
        detailContainer.innerHTML = createRestoDetailTemplate(restaurant);

        LikeButtonInit.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            favoriteResto: FavoriteResto,
            resto: {
                id: restaurant.id,
                name: restaurant.name,
                city: restaurant.city,
                rating: restaurant.rating,
                description: restaurant.description,
                pictureId: restaurant.pictureId,
            }
        });
    }
};

export default Details;