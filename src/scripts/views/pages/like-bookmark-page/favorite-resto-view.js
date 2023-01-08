import { createRestoItemTemplate } from "../../template/template-creator";

class FavoriteRestoView {
    getTemplate() {
        return ` 
		 <section class="resto" id="main-content">
		        <div id="container">
		        </div>
   		 </section>
		 `;
    }

    showFavoriteResto(resto = []) {
        let html;
        if (resto.length) {
            html = resto.reduce((carry, resto) => carry.concat(createRestoItemTemplate(resto)), "");
        } else {
            document.getElementById('container').style.display = "block";
            html = this._getEmptyItemResult();
        }
        
        document.getElementById("container").innerHTML = html;
        document.getElementById("container").dispatchEvent(new Event("container:updated"));
    }

    _getEmptyItemResult() {
    	return `<h1 class="no-result" style="text-align:center;">Empty Result</h1>`;
    }
}

export default FavoriteRestoView;