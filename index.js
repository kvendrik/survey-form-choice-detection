var im = require('imagemagick'),
	fs = require('fs');

var files = fs.readdirSync('../');

var questionDetails = {

	1: {
		lines: 1
	},
	2: {
		lines: 1
	},
	3: {
		lines: 2
	},
	4: {
		lines: 2
	},
	5: {
		lines: 1
	},
	6: {
		lines: 1
	},
	7: {
		lines: 2
	},
	8: {
		lines: 1
	},
	9: {
		lines: 2
	},
	10: {
		lines: 2
	},
	11: {
		lines: 2
	},
	12: {
		lines: 2
	},
	13: {
		lines: 1
	},
	14: {
		lines: 2
	},
	15: {
		lines: 1
	},
	16: {
		lines: 2
	}

},
lineHeights  = {
	1: 63,
	2: 97
},
columnWidths = {
	1: 135,
	2: 90,
	3: 140
},
headerHeight = 488,
sideWidth = 1122;

//loop forms
files.forEach(function(filename){

	//check if JPG img
	if(filename.split('.')[1] !== 'jpg') return;

	//loop questions
	var currOffsetY = 0;
	for(var idx in questionDetails){

		var details = questionDetails[idx],
			currOffsetX = 0;

		//create files from rows
		//src, -action, WxH+X+Y, dest
		for(var currCol = 1; currCol <= 3; currCol++){

			var colWidth = columnWidths[currCol];

			im.convert(['../'+filename, '-crop', colWidth+'x'+lineHeights[details.lines]+'+'+(sideWidth+currOffsetX)+'+'+(headerHeight+currOffsetY), 'output/~temp/'+idx+'-'+currCol+'.jpg'],
			function(err, stdout){
				if(err){
					console.error(err);
					return;
				}
			});

			//update offsetX with column with + 2px for border
			currOffsetX += colWidth+2;

			console.log('Cropped question '+idx+' column '+currCol);

		}

		//update current offset with row height + 2px for border
		currOffsetY += lineHeights[details.lines]+2;

	}

	console.log('---> Done cropping '+filename);

});