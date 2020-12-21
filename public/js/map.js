const arr = [];
let distance = '';
const createClearMap = async () => {
  ymaps.ready(roads);
  async function roads() {
    const myMap = await new ymaps.Map('mapClear', {
      center: [59.93604456375412, 30.31515482861329],
      zoom: 10,
    }, {
      searchControlProvider: 'yandex#search',
    });
    myMap.events.add('click', (e) => {
      const coords = e.get('coords');
      myMap.geoObjects.add(new ymaps.Placemark(coords, {
        balloonContent: 'цвет <strong>воды пляжа бонди</strong>',
      }, {
        preset: 'islands#icon',
        iconColor: '#0095b6',
      }));
      arr.push(coords);
    });
    const firstButton = new ymaps.control.Button('Add route');
    firstButton.events.add('click', (e) => {
      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: arr,
      }, {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        boundsAutoApply: true,
      });
      myMap.geoObjects.add(multiRoute);
      multiRoute.model.events.add('requestsuccess', () => {
        // Получение ссылки на активный маршрут.
        const activeRoute = multiRoute.getActiveRoute();
        distance = activeRoute.properties.get('distance');
        // time = activeRoute.properties.get('duration');
      });
    });
    myMap.controls.add(firstButton, { float: 'right' });
  }
};

const preResult = () => fetch('/coordinates')
  .then((response) => response.json())
  .then((result) => result.forEach((el) => {
    ymaps.ready(init);
    const arr = new Array();
    const center = el.routeMap[0];
    function init() {
      const myMap = new ymaps.Map(el._id, {
        center,
        zoom: 11,
      }, {
        searchControlProvider: 'yandex#search',
      });
      myMap.controls.remove('trafficControl');
      myMap.controls.remove('searchControl');
      myMap.controls.remove('typeSelector');
      myMap.controls.remove('fullscreenControl');
      myMap.controls.remove('rulerControl');
      myMap.controls.remove('zoomControl');
      el.routeMap.forEach((el) => {
        arr.push(el);
      });
      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: arr,
      }, {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        boundsAutoApply: true,
      });
      myMap.geoObjects.add(multiRoute);
    }
  }));

document.addEventListener('DOMContentLoaded', (event) => {
  const routContainer = document.querySelector('#routsContainer');
  if (routContainer) {
    preResult();
  }
});

document.addEventListener('DOMContentLoaded', (event) => {
  const { routeCreator } = document.forms;
  if (routeCreator) {
    createClearMap();
    routeCreator.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (arr.length >= 2) {
        distance = +distance.text.split(' ')[0];
        const { routeName: { value: routeName }, routeText: { value: routeText }, location: { value: location } } = event.target;
        const newMap = await fetch('/cycling-routes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            arr, routeName, distance, routeText, location,
          }),
        });
        if (newMap.ok) {
          window.location.href = '/';
        }
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', (event) => {
  const routTitleLg = document.getElementById('routTitleLg');
  if (routTitleLg) {
    preResult();
  }
});
