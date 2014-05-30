
var win = Titanium.UI.currentWindow;		
	win.backgroundColor = 'white';

//variabili globali
win.addEventListener('android:back',function(){
	//	Ti.Gesture.removeEventListener('orientationchange',changed);
		
			var activity = Titanium.Android.currentActivity;
			activity.finish();	
								
});

win.addEventListener('focus',function(e) {
    // do something here to refresh whatever you want
data=updateui();
tableview.setData(data);
});

var searchbar = Titanium.UI.createSearchBar({
	barColor:'#000',
	showCancel:false,
	hintText:'Cerca...',
	height:'50dip',
	top:0
});

win.add(searchbar);
	
var data = [];
//var datatot = [];

var	tableview = Titanium.UI.createTableView({data:data, top: searchbar.height});
win.add(tableview);

searchbar.blur();
var numoff=0;
var x;
var limite;

data=updateui();

tableview.setData( data );

tableview.addEventListener('longclick', function(e){
    /*
    var index = e.index;
    var section = e.section;
    var row = e.row;
    var rowdata = e.rowData;
    */
    
    var id = e.row.id2;
    
    var alertDialog=Titanium.UI.createAlertDialog ({
			title:'Rimuovi dai preferiti', 
	  		message:'Vuoi rimuovere la promozione dai tuoi preferiti?',
	  		buttonNames: ['Si','No']
			});
	
			alertDialog.show();
			
			
			alertDialog.addEventListener('click', function(e2) {
			
			if(e2.index == 0) { //aggiungi la promo ai preferiti
           	           	
           	var db = Titanium.Database.open('vetrina');
			
			db.execute('DELETE FROM offerte WHERE id =?',id);
				
			db.close();
			
			
			var n = Ti.UI.createNotification({message:"Promozione rimossa con successo"}); n.duration = Ti.UI.NOTIFICATION_DURATION_LONG; // Also valid is NOTIFICATION_DURATION_SHORT // Optionally, set the X & Y Offsets, by default n.offsetX = 100; n.offsetY = 75; // display the toast message n.show();
			n.show();
			data=updateui(tableview, data);

			tableview.setData( data );

						
          } else {
        		
        	}
    });
    
  
});


tableview.addEventListener('click',function(e)		{
			searchbar.blur();
			
			// check for network
			
			if (!Titanium.Network.online) {
		//	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
     			var alertDialog = Titanium.UI.createAlertDialog({
              title: 'Attenzione!',
              message: 'Connessione assente',
              buttonNames: ['OK']
            	});
            alertDialog.show();
            
			} else if (Titanium.Network.online) {
				var w = Ti.UI.createWindow({title:e.row.titolo});
			var wb = Ti.UI.createWebView({url:e.row.url,scalesPageToFit:false});
			w.add(wb);
			
			w.open({modal:true});
				}
			
			
});
	
	

// SEARCH BAR

searchbar.addEventListener('change', function(e) {
	//data=tableview.data;
	tableview.setData([]);
	
	var searchResults = mysearch2((e.value).toString() , data);

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

function mysearch2(value, data) {
	
	var valore = value.toLowerCase();
	
	var searchResults = [];
	for(var i = 0, len = data.length; i < len; i ++) {
		if (data[i].filtro.indexOf(valore) != -1) {
			searchResults.push(data[i]);	
		}
	}
	return searchResults;
}

function updateui() {
	numoff=0;
	data = [];
	//tableview.setData( data );
	var db = Titanium.Database.open('vetrina');
	var rows = db.execute('SELECT * FROM offerte ORDER BY id DESC');
	x = 0;
	//win.tableview = tableview;

	while (rows.isValidRow()) {
	
				var media = rows.fieldByName('media');
				var title = rows.fieldByName('titolo');
				var filtro2 = rows.fieldByName('filtro');
				var descrizione = rows.fieldByName('descrizione');
				var row = Ti.UI.createTableViewRow({height:'125dip', hasChild:false});
				var idrow=rows.fieldByName('id');
					row.url = rows.fieldByName('link');
				
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
				row.id2=idrow;
				row.descrizione=descrizione;
				row.media=media;
				row.titolo = title;
				row.filtro = filtro2;
				data[x++] = row;
			 rows.next();
			}
			
		rows.close();
		db.close();
		
		//tableview.appendRow(data);
		//tableview = Titanium.UI.createTableView({data:data});
		//win.add(tableview);
		return(data);
}