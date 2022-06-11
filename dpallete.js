(function(){
	var dpallete = function(settings){

		this._hex2rgb = function(hexc){
			var c = parseInt('0x'+hexc.substr(1));
			return [(c>>16)&0xff,(c>>8)&0xff,(c>>0)&0xff];	
		}

		this._cB = function(ca,cb,p){
			return parseInt(p*ca+(1-p)*cb);
		}

		this._cBlend = function(col_b,col_a,perc){
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

		this._getColor = function(val){
			if(val==this.maxv){
				return settings.palette[settings.palette.length-1];
			}
			var i_perc = val / this.maxv;
			var col_edge = 1 / (settings.palette.length-1);
			var col_start = Math.floor(i_perc / col_edge);
			var col_stop = col_start+1;
			var col_perc = (i_perc/col_edge)-col_start;
			return this._cBlend(settings.palette[col_start],settings.palette[col_stop],col_perc);
		}

		this._normalize = function(src_key,dst_key){
			var values = [];
			for(k in this.data){
				values.push(this.data[k][src_key]);
			}
			var minv = Math.min.apply(null, values);
			var maxv = Math.max.apply(null, values);

			for(k in this.data){
				this.data[k][dst_key] = (this.data[k][src_key] - minv) / (maxv - minv);
			}
			
			this.maxv = 1;
		}

		this.proc = function(op){
			this.data = op.data;
			this._normalize(op.value_src,op.value_dst);
			for(k in this.data){
				this.data[k][op.color_prp] = this._getColor(this.data[k][op.value_dst])
			}
		}
		this.proc(settings);
	}
	window.dpallete = dpallete;
})();
