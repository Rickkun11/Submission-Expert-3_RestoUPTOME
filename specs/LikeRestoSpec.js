// Butuh DB sama Helper
import FavoriteResto from "../src/scripts/data/favoriteresto-idb";
import * as likeInit from "./helper/LikeInitiatorPresenter";

describe("Liking a restaurant", () => {
    const addLikeBtnContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(() => {
        addLikeBtnContainer();
    });

    it("should show like button when restaurant has not been liked before", async () => {
        await likeInit.likeButtonRestoPresenter({ id: 1 });

        expect(
            document.querySelector('[aria-label="like this restaurant"]')
        ).toBeTruthy();
    });

    it("should not show unlike button when restaurant has not been liked before", async () => {
        await likeInit.likeButtonRestoPresenter({ id: 1 });

        expect(
            document.querySelector('[aria-label="unlike this restaurant')
        ).toBeFalsy();
    });

    it("should be able to like a restaurant when button clicked", async () => {
        await likeInit.likeButtonRestoPresenter({ id: 1 });

        document.querySelector("#likeButton").dispatchEvent(new Event("click"));
        const dish = await FavoriteResto.getResto(1);

        expect(dish).toEqual({ id: 1 });

        FavoriteResto.deleteResto(1);
    });

    it("should not add a restaurant again when its already liked", async () => {
        await likeInit.likeButtonRestoPresenter({ id: 1 });

        await FavoriteResto.putResto({ id: 1 });
        document.querySelector("#likeButton").dispatchEvent(new Event("click"));

        expect(await FavoriteResto.getAllResto()).toEqual([{ id: 1 }]);

        FavoriteResto.deleteResto(1);
    });

    it("should not add a restaurant when it has no id", async () => {
        await likeInit.likeButtonRestoPresenter({});

        document.querySelector("#likeButton").dispatchEvent(new Event("click"));

        expect(await FavoriteResto.getAllResto()).toEqual([]);
    });
});