

var dpallete = function(settings){
	this.palette = settings.palette || ['#f8696b','#ffeb84','#63be7b'];
}

dpallete.prototype._hex2rgb = function(hexc){
	var c = parseInt('0x'+hexc.substr(1));
	return [(c>>16)&0xff,(c>>8)&0xff,(c>>0)&0xff];	
}

dpallete.prototype._cB = function(ca,cb,p){
	return parseInt(p*ca+(1-p)*cb);
}

dpallete.prototype._cBlend = function(col_b,col_a,perc){
	if(col_a.length<7 || col_b.length<7 || (typeof(perc)!="number")){
		return "#000";
	}
	if(perc>1){
		perc = 1;
	}
	if(perc<0){
		perc = 0;
	}
	var ca = this._hex2rgb(col_a);
	var cb = this._hex2rgb(col_b);
	
	return "#" + (
		(1 << 24) 
		+ (this._cB(ca[0],cb[0],perc) << 16) 
		+ (this._cB(ca[1],cb[1],perc) << 8) 
		+ this._cB(ca[2],cb[2],perc)
	).toString(16).slice(1);
}

dpallete.prototype._getColor = function(val){
	if(val==this.maxv){
		return this.palette[this.palette.length-1];
	}
	var i_perc = val / this.maxv;
	var col_edge = 1 / (this.palette.length-1);
	var col_start = Math.floor(i_perc / col_edge);
	var col_stop = col_start+1;
	var col_perc = (i_perc/col_edge)-col_start;
	return this._cBlend(this.palette[col_start],this.palette[col_stop],col_perc);
}

dpallete.prototype._normalize = function(src_key,dst_key){
	var values = [];
	for(k in this.data){
		values.push(this.data[k][src_key]);
	}
	var minv = Math.min.apply(null, values);
	var maxv = Math.max.apply(null, values);
	if(minv<0){
		minv = -minv;
		maxv += minv;
		for(k in this.data){
			this.data[k][dst_key] = this.data[k][src_key]+minv;
		}
	}
	this.maxv = maxv;
}

dpallete.prototype.proc = function(op){
	this.data = op.data;
	this._normalize(op.value_src,op.value_dst);
	for(k in this.data){
		this.data[k][op.color_prp] = this._getColor(this.data[k][op.value_dst])
	}
}




var items=[
	{label: 'Label  1', value:  -10},
	{label: 'Label  2', value:  -20},
	{label: 'Label  3', value:  -30},
	{label: 'Label  4', value:  -40},
	{label: 'Label  5', value:  -50},
	{label: 'Label  6', value:  -60},
	{label: 'Label  7', value:  -70},
	{label: 'Label  8', value:  -80},
	{label: 'Label  9', value:  -90},
	{label: 'Label 10', value: -100}
];

var instancia = new dpallete({
	//palette: ['#63be7b','#ffeb84','#f8696b']
});



instancia.proc({
	data: items,
	palette: ['#63be7b','#ffeb84','#f8696b'],
	value_src: 'value',
	value_dst: 'norm',
	color_prp: 'color'
});




items.forEach(function(v, index){
	$('body').append('<div class="bx" id="b_'+index+'"></div>');
	$('#b_'+index).css('background',v.color);
});