import FavorieRestoInit from "./like-bookmark-page/favorite-resto-initiator";
import FavoriteResto from "../../data/favoriteresto-idb";
import FavoriteRestoView from "./like-bookmark-page/favorite-resto-view";

	const view = new FavoriteRestoView();

const Favorite = {
	async render() {
		return view.getTemplate();
	},
	async afterRender() {
		new FavorieRestoInit({ view, favoriteResto: FavoriteResto });
	}
};

export default Favorite;