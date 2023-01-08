import { createRestoItemTemplate } from '../template/template-creator';
import DataSource from '../../data/restaurant-data';
import { async } from 'regenerator-runtime';
import heroImage from '../../../public/images/heros/hero-image.jpg?sizes[]=425,sizes[]=768,sizes[]=1024,sizes[]=1350';


const Home = {
	async render() {
		return ` 
		<div class="hero">
        <img
            src="${heroImage.src}"        
            width="${heroImage.width}"
            height="${heroImage.height}"
            loading="lazy"
            alt="Gambar Hero"
        />
            <div class="inner">
                <h1 class="title">UPTOME</h1>
                <p class="subtitle">
                    RESTO - <span style="color: #FB2576;">UPTOME</span> Top Rating indonesian restaurant
                    food originating from various regions with its peculiarities which are composed of main/staple foods.
                </p>
            </div>
        </div>
		    <!-- item -->
		    <div id="content">
            <h2><span class="title-content">Explore Restaurant</span></h2>

            <!--data JSON-->
            <div id="resto-list"></div>
            <h2 class="title-content"><span style="font-size: 2rem">Explore Resep</span></h2>

            <!--data JSON 2-->
            <div class="column" id="resep-list"></div>

        </div>`;
	},
	async afterRender() {
		const resto = await DataSource.List();
		const restoContainer = document.getElementById('resto-list');
		console.log(resto)
		if (resto && resto.length > 0) {
			resto.forEach((item) => {
				restoContainer.innerHTML += createRestoItemTemplate(item);
                //resto 2
                import('../../../DATA2.json').then(({
                    default: jsonData,
                }) => {
                    const restaurants = jsonData.restaurants;
                    let restoList = '';
                    restaurants.forEach((data_resto) => {
                        restoList +=
                            `
                                <div class="col">
                                    <div class="card">
                                        <div class="card-img">
                                            <div class="city-label">
                                                <span class="city-label-text">${data_resto.title}
                                                </span>
                                            </div>
                                            <img src="${data_resto.images}" alt="Gambar Resep Makanan ${data_resto.title}">
                                        </div>
                                        <div class="card-body">
                                            <div class="rating">
                                                <span>Total waktu Penyajian : ${data_resto.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;
                    });
                    document.querySelector('#resep-list').innerHTML = restoList;
                });
			});
		}
	}  
};

export default Home;