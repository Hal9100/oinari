
// create table view data object
var curWindow = Titanium.UI.currentWindow;
curWindow.backgroundColor = 'white';

curWindow.addEventListener('android:back',function(){
	//	Ti.Gesture.removeEventListener('orientationchange',changed);
		
			var activity = Titanium.Android.currentActivity;
			activity.finish();	
								
});

var isAndroid = false;
if (Titanium.Platform.name == 'android') {
	isAndroid = true;
}

var oinari = Titanium.Map.createAnnotation({
	latitude:38.022208,
	longitude:12.533396,
	title:"Sede Oinari",
	subtitle:'Via Orti, TP',
	pincolor: isAndroid ? "orange" : Titanium.Map.ANNOTATION_RED,
	animate:true,
	leftButton: '../images/appcelerator_small.png',
	myid:1 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
});
var presetAnnotations = [oinari];

var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:{latitude:38.022208, longitude:12.533396, latitudeDelta:0.05, longitudeDelta:0.05},
	animate:true,
	regionFit:true,
	userLocation:true,
	annotations:presetAnnotations
});

curWindow.add(mapview);

var regoinari = {latitude:38.022208,longitude:12.533396,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};

var atl = null;

var sat = null;
var std = null;
var hyb = null;
var zoomin = null;
var zoomout = null;
		
var wireClickHandlers = function() {
	
	atl.addEventListener('click', function() {
		// set location to oinari
		mapview.setLocation(regoinari);
	
		// activate annotation
		mapview.selectAnnotation(presetAnnotations[0].title,true);
		Ti.API.error("CLICKED ATL");
	});
	
	
	
	sat.addEventListener('click',function() {
		// set map type to satellite
		mapview.setMapType(Titanium.Map.SATELLITE_TYPE);
	});
	
	std.addEventListener('click',function() {
		// set map type to standard
		mapview.setMapType(Titanium.Map.STANDARD_TYPE);
	});
	/*
	hyb.addEventListener('click',function() {
		// set map type to hybrid
		mapview.setMapType(Titanium.Map.HYBRID_TYPE);
	});
	
	zoomin.addEventListener('click',function() {
		mapview.zoom(1);
	});
	
	zoomout.addEventListener('click',function() {
		mapview.zoom(-1);
	});
	*/
};

var activity = Ti.Android.currentActivity;
	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		
		atl = menu.add({title : 'Oinari'});
		sat = menu.add({title : 'Sat'});
		std = menu.add({title : 'Std'});
	//	hyb = menu.add({title : 'Hyb'});
	//	zoomin = menu.add({title : "Zoom In"});
	//	zoomout = menu.add({title : 'Zoom Out'});
		
		wireClickHandlers();
	};
