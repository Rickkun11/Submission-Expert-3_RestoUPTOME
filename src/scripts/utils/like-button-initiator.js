import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/template/template-creator';

const LikeButtonInit = {
    async init({ likeButtonContainer, favoriteResto, resto }) {
        this._likeButtonContainer = likeButtonContainer;
        this._favoriteResto = favoriteResto;
        this._resto = resto;
        await this._renderButton();
    },
    async _renderButton() {
        const { id } = this._resto;

        if (await this._isRestoItemExist(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },
    async _isRestoItemExist(id) {
        const resto = await this._favoriteResto.getResto(id);
        return !!resto;
    },
    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeButtonTemplate();
        const likeButton = document.getElementById("likeButton");
        likeButton.addEventListener("click", async () => {
            await this._favoriteResto.putResto(this._resto);
            this._renderButton();
        });
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML = createLikedButtonTemplate();
        const likeButton = document.getElementById("likeButton");
        likeButton.addEventListener("click", async () => {
            await this._favoriteResto.deleteResto(this._resto.id);
            this._renderButton();
        });
    },
};

export default LikeButtonInit;