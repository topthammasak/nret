/*******************************************************************
* GMap - Component
* Created by: TheBusTeD (kwang@kingsfield.asia, tksumeth@gmail.com)
* Date time: January 16, 2015
*******************************************************************/

// Set global
var GMap;
define(['async!https://maps.googleapis.com/maps/api/js?v=3.exp&language='+ $lang +'&libraries=places'],function(){
	GMap = new GMap();
	return GMap;
});

function GMap() {
	this.name = 'gmap';
	this.main_lat = 0;
	this.main_lng = 0;
}

GMap.prototype = {
	init: function(target){
		// Set target
		GMap.target = $(target);
		
		// Set main latitude and longtitude
		GMap.main_lat = GMap.target.data('lat');
		GMap.main_lng = GMap.target.data('lng');
		GMap.center_lat = GMap.target.data('center-lat');
		GMap.center_lng = GMap.target.data('center-lng');
		
		// Set phudahla position and map center
		GMap.phudahla = new google.maps.LatLng(GMap.main_lat, GMap.main_lng);
		GMap.center = new google.maps.LatLng(GMap.center_lat, GMap.center_lng);

		// Map Option
		GMap.options = {
			zoom: 15,
			center: GMap.center,
			//mapTypeId: google.maps.MapTypeId.SATELLITE,
			styles: [{
				featureType: 'poi',
				stylers: [{ visibility: 'off' }]   
			}]
		};
		
		// GMap
		GMap.map = new google.maps.Map(GMap.target.get(0), GMap.options);
		
		// GMap marker list
		var markers = [
			{
				name: 'Police Station',
				point: new google.maps.LatLng(8.050330, 98.815249),
				icon: 'police'
			},{
				name: 'Tourism Police',
				point: new google.maps.LatLng(8.038581, 98.817545),
				icon: 'police'
			},{
				name: 'Noppharat Resort',
				point: new google.maps.LatLng(8.044849, 98.812695),
				icon: 'hotel-resort'
			},{
				name: 'Holiday Inn Resort',
				point: new google.maps.LatLng(8.039771, 98.815206),
				icon: 'hotel-resort'
			},{
				name: 'Pakasai Resort',
				point: new google.maps.LatLng(8.037391, 98.819283),
				icon: 'hotel-resort'
			},{
				name: 'Murcure Hotel',
				point: new google.maps.LatLng(8.041938, 98.818274),
				icon: 'hotel-resort'
			},{
				name: 'Ayodhaya Suites Resort & Spa',
				point: new google.maps.LatLng(8.045155, 98.808328),
				icon: 'hotel-resort'
			},{
				name: 'Aonang Phu Petra Resort',
				point: new google.maps.LatLng(8.033595, 98.836966),
				icon: 'phupetra'
			},{
				name: 'Tesco Lotus',
				point: new google.maps.LatLng(8.039750, 98.834840),
				icon: 'lotus'
			},{
				name: 'Mc Donald',
				point: new google.maps.LatLng(8.032951, 98.825566),
				icon: 'mc'
			},{
				name: 'Cuckoo\'s Nest bar & restaurant',
				point: new google.maps.LatLng(8.042735, 98.810659),
				icon: 'food'
			},{
				name: 'Center Point',
				point: new google.maps.LatLng(8.032919, 98.820871),
				icon: 'facility'
			},{
				name: 'Kasikorn Bank',
				point: new google.maps.LatLng(8.034279, 98.818360),
				icon: 'kbank'
			},{
				name: 'Krung Thai Bank',
				point: new google.maps.LatLng(8.031771, 98.822179),
				icon: 'ktb'
			},{
				name: 'Kasikorn Bank',
				point: new google.maps.LatLng(8.055959, 98.810795),
				icon: 'kbank'
			},{
				name: 'Pavillion Queen Bay',
				point: new google.maps.LatLng(8.040578, 98.819347),
				icon: 'hotel-resort'
			},{
				name: 'Aonang Bay',
				point: new google.maps.LatLng(8.041832, 98.811612),
				icon: 'bay'
			},{
				name: 'Aonang Bay',
				point: new google.maps.LatLng(8.030124, 98.822737),
				icon: 'bay'
			},{
				name: 'Phu Dahla',
				point: GMap.phudahla,
				icon: 'main'
			},{
				name: '7-11',
				point: new google.maps.LatLng(8.032814, 98.820308),
				icon: '7-11'
			},{
				name: '7-11',
				point: new google.maps.LatLng(8.035492, 98.818685),
				icon: '7-11'
			},{
				name: '7-11',
				point: new google.maps.LatLng(8.040831, 98.817398),
				icon: '7-11'
			},{
				name: '7-11',
				point: new google.maps.LatLng(8.055055, 98.815928),
				icon: '7-11'
			},{
				name: '7-11',
				point: new google.maps.LatLng(8.032185, 98.823636),
				icon: '7-11'
			},{
				name: '7-11',
				point: new google.maps.LatLng(8.032949, 98.825465),
				icon: '7-11'
			},{
				name: '7-11',
				point: new google.maps.LatLng(8.035696, 98.832777),
				icon: '7-11'
			},{
				name: '7-11',
				point: new google.maps.LatLng(8.036482, 98.833463),
				icon: '7-11'
			},{
				name: '7-11',
				point: new google.maps.LatLng(8.039170, 98.834043),
				icon: '7-11'
			},{
				name: '7-11',
				point: new google.maps.LatLng(8.040742, 98.836285),
				icon: '7-11'
			},{
				name: 'Burger King',
				point: new google.maps.LatLng(8.033548, 98.819502),
				icon: 'burgerking'
			}
		];
		GMap.createMarker(markers);
		
		// Get other place from service library
		GMap.service_place = new google.maps.places.PlacesService(GMap.map);
		
		// Bank
//		GMap.service_place.nearbySearch({
//			location: GMap.phudahla,
//			radius: 2000,
//			types: ['bank']
//		}, function(results, status){
//			if(status === google.maps.places.PlacesServiceStatus.OK) {
//				var markers = [];
//				$.each(results, function(i,d){
//					markers.push({
//						name: d.name,
//						point: d.geometry.location,
//						icon: 'bank'
//					});
//				});
//				GMap.createMarker(markers);
//			}
//		});
//		
//		// Food
//		GMap.service_place.nearbySearch({
//			location: GMap.phudahla,
//			radius: 2000,
//			types: ['food']
//		}, function(results, status){
//			if(status === google.maps.places.PlacesServiceStatus.OK) {
//				var markers = [];
//				$.each(results, function(i,d){
//					markers.push({
//						name: d.name,
//						point: d.geometry.location,
//						icon: 'facility'
//					});
//				});
//				GMap.createMarker(markers);
//			}
//		});
//		
//		// Store
//		GMap.service_place.nearbySearch({
//			location: GMap.phudahla,
//			radius: 2000,
//			types: ['store']
//		}, function(results, status){
//			if(status === google.maps.places.PlacesServiceStatus.OK) {
//				var markers = [];
//				$.each(results, function(i,d){
//					markers.push({
//						name: d.name,
//						point: d.geometry.location,
//						icon: 'facility'
//					});
//				});
//				GMap.createMarker(markers);
//			}
//		});

		// Create infowindow
		GMap.infowindow = new google.maps.InfoWindow();

		// Distance service
//		GMap.service_distance = new google.maps.DirectionsService();

		// Add event on resize
		google.maps.event.addDomListener(window, "resize", function () {
			google.maps.event.trigger(GMap.map, "resize");
			GMap.map.setCenter(GMap.center);
		});
	},
	createMarker: function(place){
		// Pin other marker
		GMap.marker = [];
		$.each(place, function(i,e){
			GMap.marker[e.name] = new google.maps.Marker({
				position: e.point,
				map: GMap.map,
				icon: $base + 'public/img/icons/gmap/pin.'+ e.icon +'.png',
				title: e.name
			});
			
			if(e.icon !== 'main') {
//				// Calculate distance
//				GMap.service_distance.route({
//					origin: GMap.phudahla,
//					destination: e.point,
//					travelMode: google.maps.TravelMode.DRIVING
//				}, function(response, status){
//					if(status === google.maps.DistanceMatrixStatus.OK) {
//						google.maps.event.addListener(GMap.marker[e.name], 'click', function () {
//							GMap.infowindow.setContent('<div class="gmapinfo"><h6>' + e.name + '</h6><a href="javascript: void()"><i class="pdl-atv-riding"></i> Drive</a><a href="javascript: void()"><i class="pdl-hopping"></i> Walk</a>');
//							GMap.infowindow.open(GMap.map, this);
//						});
//					}
//				});
//				
//				
				// Marker infowindow
				google.maps.event.addListener(GMap.marker[e.name], 'click', function () {
					var url = 'http://maps.google.com/?saddr='+ GMap.phudahla.lat() +','+ GMap.phudahla.lng() +'&daddr='+ e.point.lat() +','+ e.point.lng();
					var zoom = '&z=14';
					GMap.infowindow.setContent('<div class="gmapinfo"><h6>' + e.name + '</h6><a href="'+ url +'&directionsmode=driving'+ zoom +'" target="_blank"><i class="pdl-atv-riding"></i> Drive</a><a href="'+ url +'&directionsmode=walking'+ zoom +'" target="_blank"><i class="pdl-hopping"></i> Walk</a>');
					GMap.infowindow.open(GMap.map, this);
				});
			}
		});
	}
};