// butuh DB sama Like Button
import LikeButtonInit from "../../src/scripts/utils/like-button-initiator";
import FavoriteResto from "../../src/scripts/data/favoriteresto-idb";

const likeButtonRestoPresenter = async (resto) => {
    await LikeButtonInit.init({
        likeButtonContainer: document.querySelector("#likeButtonContainer"),
        favoriteResto: FavoriteResto,
        resto,
    })
};

export { likeButtonRestoPresenter };