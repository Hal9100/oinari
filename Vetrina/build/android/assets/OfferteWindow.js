
var win = Titanium.UI.currentWindow;		
	win.backgroundColor = '#fff';

//variabili globali

win.addEventListener('android:back',function(){
	//	Ti.Gesture.removeEventListener('orientationchange',changed);
		
			var activity = Titanium.Android.currentActivity;
			activity.finish();	
								
});

win.addEventListener('focus',function(e) {
    // do something here to refresh whatever you want
//data=updateui2();
//tableview.appendRow(data);
});

var searchbar = Titanium.UI.createSearchBar({
	barColor:'#000',
	showCancel:false,
	hintText:'Cerca...',
	height:'50dip',
	top:0
});

win.add(searchbar);
var urlfeed ="http://www.acpsystems.eu/sito_vetrina/rss_mobile.php";
	
var data = [];
//var datatot = [];

var	tableview = Titanium.UI.createTableView({data:data, top: searchbar.height});
win.add(tableview);

searchbar.blur();
var numoff=0;
var x;
var limite;
//var items;

//win.tableview = null;

data=updateui2();

tableview.appendRow(data);

tableview.addEventListener('longclick', function(e){
    
    
    var alertDialog=Titanium.UI.createAlertDialog ({
			title:'Aggiungi ai preferiti', 
	  		message:'Vuoi aggiungere la promozione ai tuoi preferiti?',
	  		buttonNames: ['Si','No']
			});
	
			alertDialog.show();
			
			alertDialog.addEventListener('click', function(e2) {
			
			 if(e2.index == 0) { //aggiungi la promo ai preferiti
           	
           	var titolo=e.row.titolo;
    		var descrizione=e.row.descrizione;
    		var filtro=e.row.filtro;
    		var media=e.row.media;
    		var link=e.row.url;
    		
    		
           	var db = Titanium.Database.open('vetrina');
           	db.execute('INSERT INTO offerte (titolo,descrizione,filtro,media,link) VALUES(?,?,?,?,?)',titolo, descrizione, filtro, media,link);
           	db.close();
           	var n = Ti.UI.createNotification({message:"Promozione aggiunta ai preferiti"}); n.duration = Ti.UI.NOTIFICATION_DURATION_LONG; // Also valid is NOTIFICATION_DURATION_SHORT // Optionally, set the X & Y Offsets, by default n.offsetX = 100; n.offsetY = 75; // display the toast message n.show();
          	n.show();
          } else {
        		
        	}
    });
  
});


	tableview.addEventListener('click',function(e)		{
			searchbar.blur();
			if (e.row.titolo==='ancora') {
			
			var data1 = [];
			//data = [];	
			tableview.deleteRow(e.index); //elimino la riga "mostra ancora"
			data.splice(e.index,1);
			
				if (numoff>limite+5){
					var limite1 = limite;
					limite = limite+5;
				} else {
					
					
					
				var limite1=limite;	
				limite = numoff;
				}
				
				x=limite;
				for (var c=limite1;c<limite;c++)	{
				var item = items.item(c);
				var thumbnails = item.getElementsByTagName("media:thumbnail");
			
				if (thumbnails && thumbnails.length > 0) {
				
				
					var media = thumbnails.item(0).getAttribute("url");
					var title = item.getElementsByTagName("title").item(0).text;
					var filtro2 = item.getElementsByTagName("filtro").item(0).text;
					var descrizione = item.getElementsByTagName("description").item(0).text;
					var row = Ti.UI.createTableViewRow({height:'125dip', hasChild:false});
				
					var labeltitolo = Ti.UI.createLabel({
						text:title,
					//selectedBackgroundColor : '#13386c',
					color:'black',
					touchEnabled:false,
					font:{fontSize:'15dip',fontWeight:'bold',fontFamily:'Helvetica Neue'},
					left:'110dip',
					//zIndex:2,
					top:'2dip'
					//bottom:'7dip',
				//	right:'7dip'			
				});
				
				var labeldescrizione = Ti.UI.createLabel({
					text:descrizione,
					color:'black',
					font:{fontSize:'14dip',fontFamily:'Helvetica Neue'},
					//selectedBackgroundColor : '#13386c',
					touchEnabled:false,
					left:'110dip',
					//zIndex:2,
					top:'36dip'
					//bottom:'7dip',
					//right:'7dip'			
				});
				
				row.add(labeltitolo);
				row.add(labeldescrizione);
				var img;
				if (Titanium.Platform.name == 'android') 
				{
					// iphone moved to a single image property - android needs to do the same
					img = Ti.UI.createImageView({
						image:media,
						left:'2dip',
						height:'70dip',
						width:'100dip'
					});

				}
				else
				{
					img = Ti.UI.createImageView({
						image:media,
						left:5,
						height:60,
						width:60
					});
					
				}
				row.add(img);
				row.url = item.getElementsByTagName("link").item(0).text;
				row.descrizione=descrizione;
				row.media=media;
				row.titolo = title;
				row.filtro = filtro2;
				data.push(row);
				data1.push(row);
				//data[x++] = row;
				
				//tableview.appendRow(row);
				}
				
			}
			
			//datatot.concat(data);
			
			if (limite < numoff){
			var row = Ti.UI.createTableViewRow({height:'100dip', hasChild:false});
			
			var labelancora= Ti.UI.createLabel({
					text:'Mostra Ancora',
					//selectedBackgroundColor : '#13386c',
					color:'black',
					touchEnabled:false,
					font:{fontSize:'20dip',fontWeight:'bold',fontFamily:'Helvetica Neue'}
					//left:'10dip',
					//zIndex:2,
					//top:'5dip'
					//bottom:'7dip',
				//	right:'7dip'			
				});
				
			row.add(labelancora);
			row.descrizione= '';
			row.media='';
			row.url='';
			row.titolo ='ancora';
			data.push(row);
			data1.push(row);
			//data[x++] = row;
			
			//tableview.appendRow(row);
		}
		//	win.remove(tableview);
		tableview.appendRow(data1);
		//tableview = Titanium.UI.createTableView({data:data});
		//win.add(tableview);
			
			//win.remove(tableview);			
		//	tableview = Titanium.UI.createTableView({data:data});
		//	win.add(tableview);
		//	win.tableview = tableview;	
			} else 	{
			var w = Ti.UI.createWindow({title:e.row.titolo});
			var wb = Ti.UI.createWebView({url:e.row.url,scalesPageToFit:false});
			w.add(wb);
			
			w.open({modal:true});
			}
});
	
		
		// aggiornamento del feed dal menù
	activity = Ti.Android.currentActivity;
	 	 
	activity.onCreateOptionsMenu = function(e) {
			var menu = e.menu;
			var menuaggiorna = menu.add({ title : 'Aggiorna' });
			
			menuaggiorna.setIcon("/images/refresh.png");
			
			menuaggiorna.addEventListener('click', function(e) {
			
			
	
			
			if (!Titanium.Network.online){
		//	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
     			var alertDialog = Titanium.UI.createAlertDialog({
              title: 'Attenzione!',
              message: 'Connessione assente',
              buttonNames: ['OK']
            	});
            	
            alertDialog.show();
            
			} else if (Titanium.Network.online) {
				
				data=updateui2(); 
				
				//data=[];
				
			}	
}); //chiude event listener

}; //chiude l'activity menu

// All'avvio controllo se c'è la connessione e in caso affermativo carico il feed


function updateui2() {
if (!Titanium.Network.online) {
//if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
	
     var alertDialog = Titanium.UI.createAlertDialog({
              title: 'Attenzione!',
              message: 'Connessione assente',
              buttonNames: ['OK']
            });
            alertDialog.show();
            
} else if (Titanium.Network.online) {

// create table view data object
	numoff=0;
	data = [];
	tableview.setData( data );

	var xhr = Ti.Network.createHTTPClient();
	xhr.open("GET",urlfeed);
	
	
	
	
	xhr.onload = function()	{
	//try	{
		
		
            
		//win.tableview = tableview;
				            
		var doc = xhr.responseXML.documentElement;
		items = doc.getElementsByTagName("item");
		x = 0;
		//var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
		
		//var numoff =0;
		for (var c=0;c<items.length;c++) {
		numoff++; }	 
		
		
            
		if (numoff>=11){
			limite = 10;
			
		} else {
			limite =numoff; }
			
		var x = 0;
		
		//var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
		for (var c=0; c<limite ;c++)
		{
			var item = items.item(c);
			var thumbnails = item.getElementsByTagName("media:thumbnail");
			if (thumbnails && thumbnails.length > 0) {
				
				var media = thumbnails.item(0).getAttribute("url");
				var title = item.getElementsByTagName("title").item(0).text;
				var filtro2 = item.getElementsByTagName("filtro").item(0).text;
				var descrizione = item.getElementsByTagName("description").item(0).text;
				var row = Ti.UI.createTableViewRow({height:'125dip', hasChild:false});
				
				var labeltitolo = Ti.UI.createLabel({
					text:title,
					//selectedBackgroundColor : '#13386c',
					color:'black',
					touchEnabled:false,
					font:{fontSize:'15dip',fontWeight:'bold',fontFamily:'Helvetica Neue'},
					left:'110dip',
					//zIndex:2,
					top:'2dip'
					//bottom:'7dip',
				//	right:'7dip'			
				});
				
				var labeldescrizione = Ti.UI.createLabel({
					text:descrizione,
					color:'black',
					font:{fontSize:'14dip',fontFamily:'Helvetica Neue'},
					//selectedBackgroundColor : '#13386c',
					touchEnabled:false,
					left:'110dip',
					//zIndex:2,
					top:'36dip'
					//bottom:'7dip',
					//right:'7dip'			
				});
				
				row.add(labeltitolo);
				row.add(labeldescrizione);
				var img;
				if (Titanium.Platform.name == 'android') 
				{
					// iphone moved to a single image property - android needs to do the same
					img = Ti.UI.createImageView({
						image:media,
						left:'2dip',
						height:'70dip',
						width:'100dip'
					});

				}
				else
				{
					img = Ti.UI.createImageView({
						image:media,
						left:5,
						height:60,
						width:60
					});
					
				}
				row.add(img);
				//data.push(row);
				row.descrizione= descrizione;
				row.media=media;
				row.url = item.getElementsByTagName("link").item(0).text;
				row.titolo = title;
				row.filtro = filtro2;
				data[x++] = row;
				
			}
			
		}
		
				
		if (limite < numoff) {
			var row= Ti.UI.createTableViewRow({height:'80dip', hasChild:false});
			
			var labelancora= Ti.UI.createLabel({
					text:'Mostra Ancora',
					//selectedBackgroundColor : '#13386c',
					color:'black',
					touchEnabled:false,
					font:{fontSize:'20dip',fontWeight:'bold',fontFamily:'Helvetica Neue'}
					//left:'10dip',
					//zIndex:2,
					//top:'5dip'
					//bottom:'7dip',
				//	right:'7dip'			
				});
				
			row.add(labelancora);
			// data.push(row);
			row.descrizione= '';
			row.media='';
			row.url='';
			row.filtro = '';
			row.titolo ='ancora';
			data[x++] = row;
			
		 	//tableview.appendRow(row2);
		}
		
		//win.remove(tableview);
		
		tableview.appendRow(data);
		//tableview = Titanium.UI.createTableView({data:data});
		//win.add(tableview);
	//	win.tableview = tableview;
		
		
	
	//}
	//catch(E)
	//{
	//	alert('Recuperare i dati');
	//}
	
	};
	

	xhr.send();

	}
return(data);
}
// SEARCH BAR

searchbar.addEventListener('change', function(e) {
	//data=tableview.data;
	tableview.setData([]);
	
	var searchResults = mysearch((e.value).toString() , data);

	if (searchResults.length == 0 && searchbar.value!='') {// "No Result"
		tableview.setData([
			{title: 'Nessun risultato',color:'black'}
		]);	
	} else if (searchResults.length == 0 && searchbar.value===''){
		tableview.setData( data );
	} else {
	tableview.setData( searchResults );
	}
});

searchbar.addEventListener('return', function(e){
	searchbar.blur();	
});

function mysearch(value, data) {
	
	var valore = value.toLowerCase();
	
	var searchResults = [];
	for(var i = 0, len = data.length; i < len; i ++) {
		if (data[i].filtro.indexOf(valore) != -1) {
			searchResults.push(data[i]);	
		}
	}
	return searchResults;
}
