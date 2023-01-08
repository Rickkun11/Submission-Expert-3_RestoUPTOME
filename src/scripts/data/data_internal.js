//resto 2
import('../../DATA2.json').then(({
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
                                <span class="city-label-text">${data_resto.difficulty}
                                </span>
                            </div>
                            <img src="${data_resto.images}" alt="Gambar Resep Makanan ${data_resto.title}">
                        </div>
                        <div class="card-body">
                            <div class="rating">
                                <span>${data_resto.time}</span>
                            </div>
                            <h3 class="card-title">
                                <a href="./restaurant/${data_resto.id}" title="Link detail resep">${data_resto.title}</a>
                            </h3>
                        </div>
                    </div>
                </div>
                `;
    });
    document.querySelector('#resep-list').innerHTML = restoList;
});