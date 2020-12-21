const sortForm = document.querySelector('#sort-form');
const container = document.querySelector('#routsContainer');
sortForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { sortSelect: { value: sortSelect }, action, method } = e.target;

  const response = await fetch(action, {
    method,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ sortSelect }),
  });

  const { cyclRoutes } = await response.json();

  container.innerHTML = '';
  cyclRoutes.forEach((route) => {
    container.innerHTML += `
    <article class="routeItem">
        <div class="routeItemLeft">
            <ul id="routUl">
                <li id="routKm">${route.routeLength} km</li>
                <li id="routLocation">${route.location}</li>
            </ul>
            <p id="likesCount">${route.countLike} <i class="far fa-heart"></i></p>
        </div>

        <div id=${route._id} class="map"></div>

        <div class="routContent">
            <h4 class="routTitle"><a href="/route/${route._id}">${route.routeName}</a></h4>
            <p class="routAuthor">author: ${route.routeAuthor.username}</p>
            <div class="routText">${route.routeText}</div>
        </div>
    </article>
    <hr>
    `;
  });
  preResult();
});

