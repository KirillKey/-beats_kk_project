(function(){


  let myMap;
   
  const init = () => {
   myMap = new ymaps.Map("map", {
    //  center: [55.755821, 37.617635],
     center: [55.751144, 37.590002],
     zoom: 12,
     controls: []
   });
  
  var coords = [
    [55.754971, 37.573151],
    // [55.751427, 37.618877],
    [55.741235, 37.593947],
    [55.763843, 37.622179],
    [55.781615, 37.632637]
  ];
  var myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './images/order-sect/marker-map.svg',
    iconImageSize: [50, 62],
    iconImageOffset: [-3, -42]
  
  });
  
  for (var i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }
  
  myMap.geoObjects.add(myCollection);
  
  myMap.behaviors.disable('scrollZoom');
  };
   
  ymaps.ready(init);
  

})();