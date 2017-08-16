const ccap = require('ccap')({
	
	width:256,//set width,default is 256

	height:60,//set height,default is 60

	offset:40,//set text spacing,default is 40

	quality:100,//set pic quality,default is 50

	fontsize:57,//set font size,default is 57

	generate:function(){//Custom the function to generate captcha text
	
	     //generate captcha text here
		 const vcode = Math.floor(Math.random()*100000).toString()

		 return vcode;//return the captcha text

	}

});
export default ccap;



