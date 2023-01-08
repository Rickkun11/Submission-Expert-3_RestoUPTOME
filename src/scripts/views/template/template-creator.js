import ENDPOINT from '../../globals/api-endpoint';
import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (data) => `
    <div class="bg-frame">    
    <div class="detail-resto" tabindex="0" id="resto-detail">
      
      <div class="image-info">  
        <h2 style="color:#fb2576;">${data.name}</h2>
        <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL}${data.pictureId}" alt="${data.name.replace(/\s+/g, '-').toLowerCase()}-big-img-header"/>
      </div>

      <div class="resto-info">
        <h3>Information</h3>
        <h4>City</h4><p>${data.city}</p>
        <h4>Address</h4><p>${data.address}</p>
        <h4>Rating</h4><p>${data.rating}</p>
      </div>

      <h3>Description</h3>
      <p>${data.description}</p>

    
    <div class="menu">
      <h2 class="menu-group-heading" style="color:#fb2576;">Food</h2>
      <div class="menu-group"> 
             ${data.menus.foods
           .map(
                 (food, i) => `
                 <div class="menu-item">
                   <div class="menu-item-text">
                   <p> - ${food.name}</p>
                      </div>
                  </div>     
                        `,
                 )
      .join('')
      }  
      </div>
      <h2 class="menu-group-heading" style="color:#fb2576">Drink</h2>
      <div class="menu-group"> 
             ${data.menus.drinks
           .map(
                 (drink, i) => `
                 <div class="menu-item">
                   <div class="menu-item-text">
                   <p> - ${drink.name}</p>
                      </div> 
                  </div>    
                        `,
                        )
           .join('')
         }
      </div>
      <h2 class="menu-group-heading" style="color:#fb2576">Review</h2>
      <div class="menu-group">
        <p>Oleh ${data.customerReviews[0].name} : </p>
        <p>${data.customerReviews[0].review}</p>
        <p>Pada ${data.customerReviews[0].date}</p>
      </div>
    </div>`;

    const createRestoItemTemplate = (data) => ` 
    <div class="col">
               <div class="card" id=${data.id} class="card" tabindex="0" alt=" ${data.city} ${data.rating}">
                   <div class="card-img">
                       <div class="city-label">
                           <span class="city-label-text">
                               Kota ${data.city}
                           </span>
                       </div>
                       <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL}${data.pictureId}" alt="${data.name.replace(/\s+/g, '-').toLowerCase()}-big-img-header"/>
                   </div>
                   <div class="card-body">
                       <div class="rating">
                           <span>⭐ ${data.rating}</span>
                       </div>
                       <h3 class="card-title">
                           <a href="#/restaurant/${data.id}" title="Link ke halaman detail makanan">${data.name}</a>
                       </h3>
                       <p class="card-text">${data.description}</p>
                   </div>
               </div>
               </div>
 `;

const createLikeButtonTemplate = () => ` 
      <button aria-label="like this restaurant" id="likeButton" class="like">
         <i class="fa fa-heart-o" aria-hidden="true"></i>
      </button>
 `;

const createLikedButtonTemplate = () => ` 
      <button aria-label="unlike this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
      </button>
`;
  
export {
 createRestoItemTemplate, createRestoDetailTemplate, createLikeButtonTemplate, createLikedButtonTemplate 
};