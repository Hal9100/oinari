


var win = Titanium.UI.currentWindow;
win.backgroundColor = 'white';
win.name = "window";

win.addEventListener('android:back',function(){
	//	Ti.Gesture.removeEventListener('orientationchange',changed);
		
			var activity = Titanium.Android.currentActivity;
			activity.finish();	
								
});

//var a = Ti.UI.createView({borderColor:'#133899',borderWidth:6,borderRadius:2,backgroundColor:'orange',width:220,height:80,top:10,name:"view a"});
//var webview = Titanium.UI.createWebView({innerHTML:'<html><body>Hello from inline HTML.</body></html>'}); 
//a.add(webview);
//a.add(Ti.UI.createLabel({name:"label a",color:'white',text:'Oinari',height:'auto',width:'auto',font:{fontSize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'}}));

var image = Titanium.UI.createImageView({url:'/images/logo.jpg',borderColor:'black',borderWidth:2,borderRadius:2, top: '7dip', height: '120dip', width: '180dip'}); 

var b = Ti.UI.createView({borderColor:'red',borderWidth:4,borderRadius:2 , backgroundGradient: {type: 'linear',startPoint: { x: '0%', y: '0%' },endPoint: { x: '0%', y: '100%' },colors: [ { color: '#BDBDBD', offset: 0.0}, { color: '#6E6E6E', offset: 1.0 } ]}, width:'240dip',height:'200dip',top:'130dip',name:"view b"});

//a.add(webview);
b.add(Ti.UI.createLabel({name:"label b",color:'blue',text:'N° di telefono: 555-1234 \nemail: info@oinari.com \nIndirizzo: Via Orti, xx \n                 91100 Trapani',height:'auto',width:'auto',font:{fontSize:'20dip',fontFamily:'Helvetica Neue'}}));
win.add(b);

win.add(image);
