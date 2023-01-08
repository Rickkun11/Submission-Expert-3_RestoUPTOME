import FavoriteResto from "../src/scripts/data/favoriteresto-idb";
import * as likeInit from "./helper/LikeInitiatorPresenter";

describe("Unliking a restaurant", () => {
    const addLikeBtnContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(async () => {
        addLikeBtnContainer();
        await FavoriteResto.putResto({ id: 1 });
    });

    afterEach(async () => {
        await FavoriteResto.deleteResto(1);
    });

    it("should display unlike widget when the restaurant has been liked", async () => {
        await likeInit.likeButtonRestoPresenter({ id: 1 });

        expect(
            document.querySelector('[aria-label="unlike this restaurant"]')
        ).toBeTruthy();
    });

    it("should not display like widget when the restaurant has been liked", async () => {
        await likeInit.likeButtonRestoPresenter({ id: 1 });

        expect(
            document.querySelector('[aria-label="like this restaurant"]')
        ).toBeFalsy();
    });

    it("should be able to remove liked restaurant from the list", async () => {
        await likeInit.likeButtonRestoPresenter({ id: 1 });

        document
            .querySelector('[aria-label="unlike this restaurant"]')
            .dispatchEvent(new Event("click"));

        expect(await FavoriteResto.getAllResto()).toEqual([]);
    });

    it("should not throw error if the unliked restaurant is not in the list", async () => {
        await likeInit.likeButtonRestoPresenter({ id: 1 });

        await FavoriteResto.deleteResto(1);

        document
            .querySelector('[aria-label="unlike this restaurant"]')
            .dispatchEvent(new Event("click"));

        expect(await FavoriteResto.getAllResto()).toEqual([]);
    });

})