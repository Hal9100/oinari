/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */
//set the default background color
Titanium.UI.setBackgroundColor('#fff');

//var db=Titanium.Database.install('dbdemo','vetrina');
var db = Titanium.Database.open('vetrina');
	
	// CREO LA PRIMA SERIE DI COLONNE PER LA PRIMA MANO mano1(numero di mano)a/b/c(coppia o giocatore)o/c(punti onori o carte)
	db.execute('CREATE TABLE IF NOT EXISTS offerte (id INTEGER PRIMARY KEY AUTOINCREMENT, titolo TEXT, descrizione TEXT, filtro TEXT, media TEXT,link TEXT)');
	
	db.close();
	//create object instance
	
	
	
	var win = Ti.UI.createWindow({
		//backgroundImage:"/images/bg.jpg",
		title:'Demo Oinari',
		exitOnClose:false,
		navBarHidden:true,
		backgroundColor:'#fff'
	});
			
	win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
	
	win.addEventListener('android:back',function(){
	//	Ti.Gesture.removeEventListener('orientationchange',changed);
		
			var activity = Titanium.Android.currentActivity;
			activity.finish();	
								
});
	
	var pWidth = Ti.Platform.displayCaps.platformWidth;
	var pHeight = Ti.Platform.displayCaps.platformHeight;
	
	//var densit = Titanium.Platform.displayCaps.density;
	var densitdpi = Titanium.Platform.displayCaps.dpi;
	
	//pHeight2=pHeight;
	pWidth=parseInt((pWidth*160)/densitdpi);
	pHeight=parseInt((pHeight*160)/densitdpi);
	
	var pHeight2=pHeight;
	
	if (pWidth >= pHeight) {
	pHeight2=pWidth;
    pWidth=pHeight;
    pHeight=pHeight2;
    }
	
	var scrollView = Titanium.UI.createScrollView({
	backgroundColor:'#fff',
	contentWidth:'100%',
	height:'80%',
	contentHeight:'auto',
	top:'0dip',
	showVerticalScrollIndicator:false,
	showHorizontalScrollIndicator:false
});

var widthimg2 =(parseInt((pWidth/5)*2));
var heightimg2 = parseInt(widthimg2*1.136);

var widthimg =widthimg2.toString()+'dip';

var hde = pHeight2*0.72;

var padleft1 = (parseInt((pWidth/4)*1)-widthimg2).toString()+'dip';
var padleft2 = (parseInt((pWidth/3)*4)-widthimg2).toString()+'dip';

var padtop1 = (parseInt((hde/4)*1)-heightimg2/2).toString()+'dip';
var padtop2 = (parseInt((hde/4)*3)-heightimg2/2).toString()+'dip';

//var padtop1 = (parseInt((himg/4)*1)-heightimg2/2);
//var padtop2 = (parseInt((himg/2)*1)-heightimg2/2);

if (parseInt((pWidth/4)*1)-widthimg2 <0) {
padleft1 ='15dip';
padleft2 = ((pWidth/2)+15).toString()+'dip';
}


var b1 = Titanium.UI.createButton({
						
	color:'#fff',
	backgroundImage:'/images/preferiti2.png',
	backgroundSelectedImage:'/images/preferiti2sel.png',
	top:padtop1,
	//top:'25%',
	left:padleft1,
	width:widthimg,
	height:heightimg2.toString() +'dip',
	//font:{fontSize:'25%',fontWeight:'bold',fontFamily:'Helvetica Neue'},
	//font:{fontSize:'24dip',fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:''
});

var b2 = Titanium.UI.createButton({
	color:'#fff',
	backgroundImage:'/images/promo2.png',
	backgroundSelectedImage:'/images/promo2sel.png',
	left:padleft2,
	top:padtop1,
	//top:'25%',
	width:widthimg,
	height:heightimg2.toString() +'dip',
	//font:{fontSize:'25%',fontWeight:'bold',fontFamily:'Helvetica Neue'},
	//font:{fontSize:'24dip',fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:''
});

var padtop = (parseInt(widthimg2+45)).toString()+'dip';
		
var b3 = Titanium.UI.createButton({
	color:'#fff',
	backgroundImage:'/images/contatti2.png',
	backgroundSelectedImage:'/images/contatti2sel.png',
	left:padleft1,
	width:widthimg,
	height:heightimg2.toString() +'dip',
	//top:parseInt(pWidth2/2),
	top:padtop2,
	
	//font:{fontSize:'25%',fontWeight:'bold',fontFamily:'Helvetica Neue'},
	//font:{fontSize:'24dip',fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:''
});

var b4 = Titanium.UI.createButton({
	color:'#fff',
	backgroundImage:'/images/mappa2.png',
	backgroundSelectedImage:'/images/mappa2sel.png',
	left:padleft2,
	//top:parseInt(pWidth2/2),
	top:padtop2,
	width:widthimg,
	height:heightimg2.toString() +'dip',
	//font:{fontSize:'25%',fontWeight:'bold',fontFamily:'Helvetica Neue'},
	//font:{fontSize:'24dip',fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:''
});	
	
	var entryView = Ti.UI.createView({
  	backgroundColor:'#fff',
 	 width:'100%',
 	 height:'94%',
  	//height:'100%',
  	top:'0dip'
	});
	
	img = Ti.UI.createImageView({
						image:'/images/logo2.png',
						borderColor:'black',
						borderWidth:1,
						borderRadius:1,
						bottom:0,
						//left:5,
						height:'80dip',
						width:'320dip'
					});
	
	entryView.add(b1);
	entryView.add(b2);
	entryView.add(b3);
	entryView.add(b4);
	
	scrollView.add(entryView);

	win.add(img);
	win.add(scrollView);
	
	win.open();

	b1.addEventListener("click", function(e) {

	var tabGroup = Titanium.UI.createTabGroup();
 
 
//create our registration window
var offerteWindow = Titanium.UI.createWindow({
  title: 'Offerte',
  backgroundColor: 'white',
  url: "OfferteWindow.js"
});
 
var prefWindow = Titanium.UI.createWindow({
  title: 'Preferiti',
  backgroundColor: 'white',
  url: "PreferitiWindow.js"
});
 
 var mappaWindow = Titanium.UI.createWindow({
  title: 'Dove siamo',
  backgroundColor: 'white',
  url: "MappaWindow.js"
});
 

var contattiWindow = Titanium.UI.createWindow({
  title: 'Contatti',
  backgroundColor: 'white',
  url: "ContattiWindow.js"
});
 

var offerteTab = Titanium.UI.createTab({
  icon: '/images/offerte.png',
  //title: 'Offerte',
  window: offerteWindow
});
 
var prefTab = Titanium.UI.createTab({
  icon: '/images/preftab.png',
 // title: 'Dove siamo',
  window: prefWindow
}); 

var contattiTab = Titanium.UI.createTab({
   icon: '/images/contatti.png',
 // title: 'Contatti',
  window: contattiWindow
});
 

var mappaTab = Titanium.UI.createTab({
  icon: '/images/mappa.png',
 // title: 'Dove siamo',
  window: mappaWindow
});
 


//add our tabs to the tabgroup
tabGroup.addTab(prefTab);
tabGroup.addTab(offerteTab);

tabGroup.addTab(contattiTab);
tabGroup.addTab(mappaTab);

tabGroup.setActiveTab(prefTab);
 
//display the tabgroup

tabGroup.open();
	});
	
	b2.addEventListener("click", function(e) {

var tabGroup = Titanium.UI.createTabGroup();
 
 
//create our registration window
var offerteWindow = Titanium.UI.createWindow({
  title: 'Offerte',
  backgroundColor: 'white',
  url: "OfferteWindow.js"
});
 
var prefWindow = Titanium.UI.createWindow({
  title: 'Preferiti',
  backgroundColor: 'white',
  url: "PreferitiWindow.js"
});
 
 var mappaWindow = Titanium.UI.createWindow({
  title: 'Dove siamo',
  backgroundColor: 'white',
  url: "MappaWindow.js"
});
 

var contattiWindow = Titanium.UI.createWindow({
  title: 'Contatti',
  backgroundColor: 'white',
  url: "ContattiWindow.js"
});
 

var offerteTab = Titanium.UI.createTab({
  icon: '/images/offerte.png',
  //title: 'Offerte',
  window: offerteWindow
});
 
var prefTab = Titanium.UI.createTab({
  icon: '/images/preftab.png',
 // title: 'Dove siamo',
  window: prefWindow
}); 

var contattiTab = Titanium.UI.createTab({
   icon: '/images/contatti.png',
 // title: 'Contatti',
  window: contattiWindow
});
 

var mappaTab = Titanium.UI.createTab({
  icon: '/images/mappa.png',
 // title: 'Dove siamo',
  window: mappaWindow
});
 


//add our tabs to the tabgroup


tabGroup.addTab(prefTab);
tabGroup.addTab(offerteTab);
tabGroup.addTab(contattiTab);
tabGroup.addTab(mappaTab);

tabGroup.setActiveTab(offerteTab);
 
//display the tabgroup
tabGroup.open();
	});
	
	b3.addEventListener("click", function(e) {

var tabGroup = Titanium.UI.createTabGroup();
 
 
//create our registration window
var offerteWindow = Titanium.UI.createWindow({
  title: 'Offerte',
  backgroundColor: 'white',
  url: "OfferteWindow.js"
});
 
var prefWindow = Titanium.UI.createWindow({
  title: 'Preferiti',
  backgroundColor: 'white',
  url: "PreferitiWindow.js"
});
 
 var mappaWindow = Titanium.UI.createWindow({
  title: 'Dove siamo',
  backgroundColor: 'white',
  url: "MappaWindow.js"
});
 

var contattiWindow = Titanium.UI.createWindow({
  title: 'Contatti',
  backgroundColor: 'white',
  url: "ContattiWindow.js"
});
 

var offerteTab = Titanium.UI.createTab({
  icon: '/images/offerte.png',
  //title: 'Offerte',
  window: offerteWindow
});
 
var prefTab = Titanium.UI.createTab({
  icon: '/images/preftab.png',
 // title: 'Dove siamo',
  window: prefWindow
}); 

var contattiTab = Titanium.UI.createTab({
   icon: '/images/contatti.png',
 // title: 'Contatti',
  window: contattiWindow
});
 

var mappaTab = Titanium.UI.createTab({
  icon: '/images/mappa.png',
 // title: 'Dove siamo',
  window: mappaWindow
});
 


//add our tabs to the tabgroup

tabGroup.addTab(prefTab);
tabGroup.addTab(offerteTab);

tabGroup.addTab(contattiTab);
tabGroup.addTab(mappaTab);

tabGroup.setActiveTab(contattiTab);
 
//display the tabgroup
tabGroup.open();
	});
	
	b4.addEventListener("click", function(e) {

var tabGroup = Titanium.UI.createTabGroup();
 
 
//create our registration window
var offerteWindow = Titanium.UI.createWindow({
  title: 'Offerte',
  backgroundColor: 'white',
  url: "OfferteWindow.js"
});
 
var prefWindow = Titanium.UI.createWindow({
  title: 'Preferiti',
  backgroundColor: 'white',
  url: "PreferitiWindow.js"
});
 
 var mappaWindow = Titanium.UI.createWindow({
  title: 'Dove siamo',
  backgroundColor: 'white',
  url: "MappaWindow.js"
});
 

var contattiWindow = Titanium.UI.createWindow({
  title: 'Contatti',
  backgroundColor: 'white',
  url: "ContattiWindow.js"
});
 

var offerteTab = Titanium.UI.createTab({
  icon: '/images/offerte.png',
  //title: 'Offerte',
  window: offerteWindow
});
 
var prefTab = Titanium.UI.createTab({
  icon: '/images/preftab.png',
 // title: 'Dove siamo',
  window: prefWindow
}); 

var contattiTab = Titanium.UI.createTab({
   icon: '/images/contatti.png',
 // title: 'Contatti',
  window: contattiWindow
});
 

var mappaTab = Titanium.UI.createTab({
  icon: '/images/mappa.png',
 // title: 'Dove siamo',
  window: mappaWindow
});
 


//add our tabs to the tabgroup
tabGroup.addTab(prefTab);
tabGroup.addTab(offerteTab);

tabGroup.addTab(contattiTab);
tabGroup.addTab(mappaTab);

tabGroup.setActiveTab(mappaTab);
//display the tabgroup
tabGroup.open();
	});