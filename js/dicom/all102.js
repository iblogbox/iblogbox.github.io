/* Javascript plotting library for jQuery, version 0.8.3.*/
(function($){$.color={};$.color.make=function(r,g,b,a){var o={};o.r=r||0;o.g=g||0;o.b=b||0;o.a=a!=null?a:1;o.add=function(c,d){for(var i=0;i<c.length;++i)o[c.charAt(i)]+=d;return o.normalize()};o.scale=function(c,f){for(var i=0;i<c.length;++i)o[c.charAt(i)]*=f;return o.normalize()};o.toString=function(){if(o.a>=1){return"rgb("+[o.r,o.g,o.b].join(",")+")"}else{return"rgba("+[o.r,o.g,o.b,o.a].join(",")+")"}};o.normalize=function(){function clamp(min,value,max){return value<min?min:value>max?max:value}o.r=clamp(0,parseInt(o.r),255);o.g=clamp(0,parseInt(o.g),255);o.b=clamp(0,parseInt(o.b),255);o.a=clamp(0,o.a,1);return o};o.clone=function(){return $.color.make(o.r,o.b,o.g,o.a)};return o.normalize()};$.color.extract=function(elem,css){var c;do{c=elem.css(css).toLowerCase();if(c!=""&&c!="transparent")break;elem=elem.parent()}while(elem.length&&!$.nodeName(elem.get(0),"body"));if(c=="rgba(0, 0, 0, 0)")c="transparent";return $.color.parse(c)};$.color.parse=function(str){var res,m=$.color.make;if(res=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(str))return m(parseInt(res[1],10),parseInt(res[2],10),parseInt(res[3],10));if(res=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))return m(parseInt(res[1],10),parseInt(res[2],10),parseInt(res[3],10),parseFloat(res[4]));if(res=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(str))return m(parseFloat(res[1])*2.55,parseFloat(res[2])*2.55,parseFloat(res[3])*2.55);if(res=/rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))return m(parseFloat(res[1])*2.55,parseFloat(res[2])*2.55,parseFloat(res[3])*2.55,parseFloat(res[4]));if(res=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(str))return m(parseInt(res[1],16),parseInt(res[2],16),parseInt(res[3],16));if(res=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(str))return m(parseInt(res[1]+res[1],16),parseInt(res[2]+res[2],16),parseInt(res[3]+res[3],16));var name=$.trim(str).toLowerCase();if(name=="transparent")return m(255,255,255,0);else{res=lookupColors[name]||[0,0,0];return m(res[0],res[1],res[2])}};var lookupColors={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]}})(jQuery);(function($){var hasOwnProperty=Object.prototype.hasOwnProperty;if(!$.fn.detach){$.fn.detach=function(){return this.each(function(){if(this.parentNode){this.parentNode.removeChild(this)}})}}function Canvas(cls,container){var element=container.children("."+cls)[0];if(element==null){element=document.createElement("canvas");element.className=cls;$(element).css({direction:"ltr",position:"absolute",left:0,top:0}).appendTo(container);if(!element.getContext){if(window.G_vmlCanvasManager){element=window.G_vmlCanvasManager.initElement(element)}else{throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.")}}}this.element=element;var context=this.context=element.getContext("2d");var devicePixelRatio=window.devicePixelRatio||1,backingStoreRatio=context.webkitBackingStorePixelRatio||context.mozBackingStorePixelRatio||context.msBackingStorePixelRatio||context.oBackingStorePixelRatio||context.backingStorePixelRatio||1;this.pixelRatio=devicePixelRatio/backingStoreRatio;this.resize(container.width(),container.height());this.textContainer=null;this.text={};this._textCache={}}Canvas.prototype.resize=function(width,height){if(width<=0||height<=0){throw new Error("Invalid dimensions for plot, width = "+width+", height = "+height)}var element=this.element,context=this.context,pixelRatio=this.pixelRatio;if(this.width!=width){element.width=width*pixelRatio;element.style.width=width+"px";this.width=width}if(this.height!=height){element.height=height*pixelRatio;element.style.height=height+"px";this.height=height}context.restore();context.save();context.scale(pixelRatio,pixelRatio)};Canvas.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)};Canvas.prototype.render=function(){var cache=this._textCache;for(var layerKey in cache){if(hasOwnProperty.call(cache,layerKey)){var layer=this.getTextLayer(layerKey),layerCache=cache[layerKey];layer.hide();for(var styleKey in layerCache){if(hasOwnProperty.call(layerCache,styleKey)){var styleCache=layerCache[styleKey];for(var key in styleCache){if(hasOwnProperty.call(styleCache,key)){var positions=styleCache[key].positions;for(var i=0,position;position=positions[i];i++){if(position.active){if(!position.rendered){layer.append(position.element);position.rendered=true}}else{positions.splice(i--,1);if(position.rendered){position.element.detach()}}}if(positions.length==0){delete styleCache[key]}}}}}layer.show()}}};Canvas.prototype.getTextLayer=function(classes){var layer=this.text[classes];if(layer==null){if(this.textContainer==null){this.textContainer=$("<div class='flot-text'></div>").css({position:"absolute",top:0,left:0,bottom:0,right:0,"font-size":"smaller",color:"#545454"}).insertAfter(this.element)}layer=this.text[classes]=$("<div></div>").addClass(classes).css({position:"absolute",top:0,left:0,bottom:0,right:0}).appendTo(this.textContainer)}return layer};Canvas.prototype.getTextInfo=function(layer,text,font,angle,width){var textStyle,layerCache,styleCache,info;text=""+text;if(typeof font==="object"){textStyle=font.style+" "+font.variant+" "+font.weight+" "+font.size+"px/"+font.lineHeight+"px "+font.family}else{textStyle=font}layerCache=this._textCache[layer];if(layerCache==null){layerCache=this._textCache[layer]={}}styleCache=layerCache[textStyle];if(styleCache==null){styleCache=layerCache[textStyle]={}}info=styleCache[text];if(info==null){var element=$("<div></div>").html(text).css({position:"absolute","max-width":width,top:-9999}).appendTo(this.getTextLayer(layer));if(typeof font==="object"){element.css({font:textStyle,color:font.color})}else if(typeof font==="string"){element.addClass(font)}info=styleCache[text]={width:element.outerWidth(true),height:element.outerHeight(true),element:element,positions:[]};element.detach()}return info};Canvas.prototype.addText=function(layer,x,y,text,font,angle,width,halign,valign){var info=this.getTextInfo(layer,text,font,angle,width),positions=info.positions;if(halign=="center"){x-=info.width/2}else if(halign=="right"){x-=info.width}if(valign=="middle"){y-=info.height/2}else if(valign=="bottom"){y-=info.height}for(var i=0,position;position=positions[i];i++){if(position.x==x&&position.y==y){position.active=true;return}}position={active:true,rendered:false,element:positions.length?info.element.clone():info.element,x:x,y:y};positions.push(position);position.element.css({top:Math.round(y),left:Math.round(x),"text-align":halign})};Canvas.prototype.removeText=function(layer,x,y,text,font,angle){if(text==null){var layerCache=this._textCache[layer];if(layerCache!=null){for(var styleKey in layerCache){if(hasOwnProperty.call(layerCache,styleKey)){var styleCache=layerCache[styleKey];for(var key in styleCache){if(hasOwnProperty.call(styleCache,key)){var positions=styleCache[key].positions;for(var i=0,position;position=positions[i];i++){position.active=false}}}}}}}else{var positions=this.getTextInfo(layer,text,font,angle).positions;for(var i=0,position;position=positions[i];i++){if(position.x==x&&position.y==y){position.active=false}}}};function Plot(placeholder,data_,options_,plugins){var series=[],options={colors:["#edc240","#afd8f8","#cb4b4b","#4da74d","#9440ed"],legend:{show:true,noColumns:1,labelFormatter:null,labelBoxBorderColor:"#ccc",container:null,position:"ne",margin:5,backgroundColor:null,backgroundOpacity:.85,sorted:null},xaxis:{show:null,position:"bottom",mode:null,font:null,color:null,tickColor:null,transform:null,inverseTransform:null,min:null,max:null,autoscaleMargin:null,ticks:null,tickFormatter:null,labelWidth:null,labelHeight:null,reserveSpace:null,tickLength:null,alignTicksWithAxis:null,tickDecimals:null,tickSize:null,minTickSize:null},yaxis:{autoscaleMargin:.02,position:"left"},xaxes:[],yaxes:[],series:{points:{show:false,radius:3,lineWidth:2,fill:true,fillColor:"#ffffff",symbol:"circle"},lines:{lineWidth:2,fill:false,fillColor:null,steps:false},bars:{show:false,lineWidth:2,barWidth:1,fill:true,fillColor:null,align:"left",horizontal:false,zero:true},shadowSize:3,highlightColor:null},grid:{show:true,aboveData:false,color:"#545454",backgroundColor:null,borderColor:null,tickColor:null,margin:0,labelMargin:5,axisMargin:8,borderWidth:2,minBorderMargin:null,markings:null,markingsColor:"#f4f4f4",markingsLineWidth:2,clickable:false,hoverable:false,autoHighlight:true,mouseActiveRadius:10},interaction:{redrawOverlayInterval:1e3/60},hooks:{}},surface=null,overlay=null,eventHolder=null,ctx=null,octx=null,xaxes=[],yaxes=[],plotOffset={left:0,right:0,top:0,bottom:0},plotWidth=0,plotHeight=0,hooks={processOptions:[],processRawData:[],processDatapoints:[],processOffset:[],drawBackground:[],drawSeries:[],draw:[],bindEvents:[],drawOverlay:[],shutdown:[]},plot=this;plot.setData=setData;plot.setupGrid=setupGrid;plot.draw=draw;plot.getPlaceholder=function(){return placeholder};plot.getCanvas=function(){return surface.element};plot.getPlotOffset=function(){return plotOffset};plot.width=function(){return plotWidth};plot.height=function(){return plotHeight};plot.offset=function(){var o=eventHolder.offset();o.left+=plotOffset.left;o.top+=plotOffset.top;return o};plot.getData=function(){return series};plot.getAxes=function(){var res={},i;$.each(xaxes.concat(yaxes),function(_,axis){if(axis)res[axis.direction+(axis.n!=1?axis.n:"")+"axis"]=axis});return res};plot.getXAxes=function(){return xaxes};plot.getYAxes=function(){return yaxes};plot.c2p=canvasToAxisCoords;plot.p2c=axisToCanvasCoords;plot.getOptions=function(){return options};plot.highlight=highlight;plot.unhighlight=unhighlight;plot.triggerRedrawOverlay=triggerRedrawOverlay;plot.pointOffset=function(point){return{left:parseInt(xaxes[axisNumber(point,"x")-1].p2c(+point.x)+plotOffset.left,10),top:parseInt(yaxes[axisNumber(point,"y")-1].p2c(+point.y)+plotOffset.top,10)}};plot.shutdown=shutdown;plot.destroy=function(){shutdown();placeholder.removeData("plot").empty();series=[];options=null;surface=null;overlay=null;eventHolder=null;ctx=null;octx=null;xaxes=[];yaxes=[];hooks=null;highlights=[];plot=null};plot.resize=function(){var width=placeholder.width(),height=placeholder.height();surface.resize(width,height);overlay.resize(width,height)};plot.hooks=hooks;initPlugins(plot);parseOptions(options_);setupCanvases();setData(data_);setupGrid();draw();bindEvents();function executeHooks(hook,args){args=[plot].concat(args);for(var i=0;i<hook.length;++i)hook[i].apply(this,args)}function initPlugins(){var classes={Canvas:Canvas};for(var i=0;i<plugins.length;++i){var p=plugins[i];p.init(plot,classes);if(p.options)$.extend(true,options,p.options)}}function parseOptions(opts){$.extend(true,options,opts);if(opts&&opts.colors){options.colors=opts.colors}if(options.xaxis.color==null)options.xaxis.color=$.color.parse(options.grid.color).scale("a",.22).toString();if(options.yaxis.color==null)options.yaxis.color=$.color.parse(options.grid.color).scale("a",.22).toString();if(options.xaxis.tickColor==null)options.xaxis.tickColor=options.grid.tickColor||options.xaxis.color;if(options.yaxis.tickColor==null)options.yaxis.tickColor=options.grid.tickColor||options.yaxis.color;if(options.grid.borderColor==null)options.grid.borderColor=options.grid.color;if(options.grid.tickColor==null)options.grid.tickColor=$.color.parse(options.grid.color).scale("a",.22).toString();var i,axisOptions,axisCount,fontSize=placeholder.css("font-size"),fontSizeDefault=fontSize?+fontSize.replace("px",""):13,fontDefaults={style:placeholder.css("font-style"),size:Math.round(.8*fontSizeDefault),variant:placeholder.css("font-variant"),weight:placeholder.css("font-weight"),family:placeholder.css("font-family")};axisCount=options.xaxes.length||1;for(i=0;i<axisCount;++i){axisOptions=options.xaxes[i];if(axisOptions&&!axisOptions.tickColor){axisOptions.tickColor=axisOptions.color}axisOptions=$.extend(true,{},options.xaxis,axisOptions);options.xaxes[i]=axisOptions;if(axisOptions.font){axisOptions.font=$.extend({},fontDefaults,axisOptions.font);if(!axisOptions.font.color){axisOptions.font.color=axisOptions.color}if(!axisOptions.font.lineHeight){axisOptions.font.lineHeight=Math.round(axisOptions.font.size*1.15)}}}axisCount=options.yaxes.length||1;for(i=0;i<axisCount;++i){axisOptions=options.yaxes[i];if(axisOptions&&!axisOptions.tickColor){axisOptions.tickColor=axisOptions.color}axisOptions=$.extend(true,{},options.yaxis,axisOptions);options.yaxes[i]=axisOptions;if(axisOptions.font){axisOptions.font=$.extend({},fontDefaults,axisOptions.font);if(!axisOptions.font.color){axisOptions.font.color=axisOptions.color}if(!axisOptions.font.lineHeight){axisOptions.font.lineHeight=Math.round(axisOptions.font.size*1.15)}}}if(options.xaxis.noTicks&&options.xaxis.ticks==null)options.xaxis.ticks=options.xaxis.noTicks;if(options.yaxis.noTicks&&options.yaxis.ticks==null)options.yaxis.ticks=options.yaxis.noTicks;if(options.x2axis){options.xaxes[1]=$.extend(true,{},options.xaxis,options.x2axis);options.xaxes[1].position="top";if(options.x2axis.min==null){options.xaxes[1].min=null}if(options.x2axis.max==null){options.xaxes[1].max=null}}if(options.y2axis){options.yaxes[1]=$.extend(true,{},options.yaxis,options.y2axis);options.yaxes[1].position="right";if(options.y2axis.min==null){options.yaxes[1].min=null}if(options.y2axis.max==null){options.yaxes[1].max=null}}if(options.grid.coloredAreas)options.grid.markings=options.grid.coloredAreas;if(options.grid.coloredAreasColor)options.grid.markingsColor=options.grid.coloredAreasColor;if(options.lines)$.extend(true,options.series.lines,options.lines);if(options.points)$.extend(true,options.series.points,options.points);if(options.bars)$.extend(true,options.series.bars,options.bars);if(options.shadowSize!=null)options.series.shadowSize=options.shadowSize;if(options.highlightColor!=null)options.series.highlightColor=options.highlightColor;for(i=0;i<options.xaxes.length;++i)getOrCreateAxis(xaxes,i+1).options=options.xaxes[i];for(i=0;i<options.yaxes.length;++i)getOrCreateAxis(yaxes,i+1).options=options.yaxes[i];for(var n in hooks)if(options.hooks[n]&&options.hooks[n].length)hooks[n]=hooks[n].concat(options.hooks[n]);executeHooks(hooks.processOptions,[options])}function setData(d){series=parseData(d);fillInSeriesOptions();processData()}function parseData(d){var res=[];for(var i=0;i<d.length;++i){var s=$.extend(true,{},options.series);if(d[i].data!=null){s.data=d[i].data;delete d[i].data;$.extend(true,s,d[i]);d[i].data=s.data}else s.data=d[i];res.push(s)}return res}function axisNumber(obj,coord){var a=obj[coord+"axis"];if(typeof a=="object")a=a.n;if(typeof a!="number")a=1;return a}function allAxes(){return $.grep(xaxes.concat(yaxes),function(a){return a})}function canvasToAxisCoords(pos){var res={},i,axis;for(i=0;i<xaxes.length;++i){axis=xaxes[i];if(axis&&axis.used)res["x"+axis.n]=axis.c2p(pos.left)}for(i=0;i<yaxes.length;++i){axis=yaxes[i];if(axis&&axis.used)res["y"+axis.n]=axis.c2p(pos.top)}if(res.x1!==undefined)res.x=res.x1;if(res.y1!==undefined)res.y=res.y1;return res}function axisToCanvasCoords(pos){var res={},i,axis,key;for(i=0;i<xaxes.length;++i){axis=xaxes[i];if(axis&&axis.used){key="x"+axis.n;if(pos[key]==null&&axis.n==1)key="x";if(pos[key]!=null){res.left=axis.p2c(pos[key]);break}}}for(i=0;i<yaxes.length;++i){axis=yaxes[i];if(axis&&axis.used){key="y"+axis.n;if(pos[key]==null&&axis.n==1)key="y";if(pos[key]!=null){res.top=axis.p2c(pos[key]);break}}}return res}function getOrCreateAxis(axes,number){if(!axes[number-1])axes[number-1]={n:number,direction:axes==xaxes?"x":"y",options:$.extend(true,{},axes==xaxes?options.xaxis:options.yaxis)};return axes[number-1]}function fillInSeriesOptions(){var neededColors=series.length,maxIndex=-1,i;for(i=0;i<series.length;++i){var sc=series[i].color;if(sc!=null){neededColors--;if(typeof sc=="number"&&sc>maxIndex){maxIndex=sc}}}if(neededColors<=maxIndex){neededColors=maxIndex+1}var c,colors=[],colorPool=options.colors,colorPoolSize=colorPool.length,variation=0;for(i=0;i<neededColors;i++){c=$.color.parse(colorPool[i%colorPoolSize]||"#666");if(i%colorPoolSize==0&&i){if(variation>=0){if(variation<.5){variation=-variation-.2}else variation=0}else variation=-variation}colors[i]=c.scale("rgb",1+variation)}var colori=0,s;for(i=0;i<series.length;++i){s=series[i];if(s.color==null){s.color=colors[colori].toString();++colori}else if(typeof s.color=="number")s.color=colors[s.color].toString();if(s.lines.show==null){var v,show=true;for(v in s)if(s[v]&&s[v].show){show=false;break}if(show)s.lines.show=true}if(s.lines.zero==null){s.lines.zero=!!s.lines.fill}s.xaxis=getOrCreateAxis(xaxes,axisNumber(s,"x"));s.yaxis=getOrCreateAxis(yaxes,axisNumber(s,"y"))}}function processData(){var topSentry=Number.POSITIVE_INFINITY,bottomSentry=Number.NEGATIVE_INFINITY,fakeInfinity=Number.MAX_VALUE,i,j,k,m,length,s,points,ps,x,y,axis,val,f,p,data,format;function updateAxis(axis,min,max){if(min<axis.datamin&&min!=-fakeInfinity)axis.datamin=min;if(max>axis.datamax&&max!=fakeInfinity)axis.datamax=max}$.each(allAxes(),function(_,axis){axis.datamin=topSentry;axis.datamax=bottomSentry;axis.used=false});for(i=0;i<series.length;++i){s=series[i];s.datapoints={points:[]};executeHooks(hooks.processRawData,[s,s.data,s.datapoints])}for(i=0;i<series.length;++i){s=series[i];data=s.data;format=s.datapoints.format;if(!format){format=[];format.push({x:true,number:true,required:true});format.push({y:true,number:true,required:true});if(s.bars.show||s.lines.show&&s.lines.fill){var autoscale=!!(s.bars.show&&s.bars.zero||s.lines.show&&s.lines.zero);format.push({y:true,number:true,required:false,defaultValue:0,autoscale:autoscale});if(s.bars.horizontal){delete format[format.length-1].y;format[format.length-1].x=true}}s.datapoints.format=format}if(s.datapoints.pointsize!=null)continue;s.datapoints.pointsize=format.length;ps=s.datapoints.pointsize;points=s.datapoints.points;var insertSteps=s.lines.show&&s.lines.steps;s.xaxis.used=s.yaxis.used=true;for(j=k=0;j<data.length;++j,k+=ps){p=data[j];var nullify=p==null;if(!nullify){for(m=0;m<ps;++m){val=p[m];f=format[m];if(f){if(f.number&&val!=null){val=+val;if(isNaN(val))val=null;else if(val==Infinity)val=fakeInfinity;else if(val==-Infinity)val=-fakeInfinity}if(val==null){if(f.required)nullify=true;if(f.defaultValue!=null)val=f.defaultValue}}points[k+m]=val}}if(nullify){for(m=0;m<ps;++m){val=points[k+m];if(val!=null){f=format[m];if(f.autoscale!==false){if(f.x){updateAxis(s.xaxis,val,val)}if(f.y){updateAxis(s.yaxis,val,val)}}}points[k+m]=null}}else{if(insertSteps&&k>0&&points[k-ps]!=null&&points[k-ps]!=points[k]&&points[k-ps+1]!=points[k+1]){for(m=0;m<ps;++m)points[k+ps+m]=points[k+m];points[k+1]=points[k-ps+1];k+=ps}}}}for(i=0;i<series.length;++i){s=series[i];executeHooks(hooks.processDatapoints,[s,s.datapoints])}for(i=0;i<series.length;++i){s=series[i];points=s.datapoints.points;ps=s.datapoints.pointsize;format=s.datapoints.format;var xmin=topSentry,ymin=topSentry,xmax=bottomSentry,ymax=bottomSentry;for(j=0;j<points.length;j+=ps){if(points[j]==null)continue;for(m=0;m<ps;++m){val=points[j+m];f=format[m];if(!f||f.autoscale===false||val==fakeInfinity||val==-fakeInfinity)continue;if(f.x){if(val<xmin)xmin=val;if(val>xmax)xmax=val}if(f.y){if(val<ymin)ymin=val;if(val>ymax)ymax=val}}}if(s.bars.show){var delta;switch(s.bars.align){case"left":delta=0;break;case"right":delta=-s.bars.barWidth;break;default:delta=-s.bars.barWidth/2}if(s.bars.horizontal){ymin+=delta;ymax+=delta+s.bars.barWidth}else{xmin+=delta;xmax+=delta+s.bars.barWidth}}updateAxis(s.xaxis,xmin,xmax);updateAxis(s.yaxis,ymin,ymax)}$.each(allAxes(),function(_,axis){if(axis.datamin==topSentry)axis.datamin=null;if(axis.datamax==bottomSentry)axis.datamax=null})}function setupCanvases(){placeholder.css("padding",0).children().filter(function(){return!$(this).hasClass("flot-overlay")&&!$(this).hasClass("flot-base")}).remove();if(placeholder.css("position")=="static")placeholder.css("position","relative");surface=new Canvas("flot-base",placeholder);overlay=new Canvas("flot-overlay",placeholder);ctx=surface.context;octx=overlay.context;eventHolder=$(overlay.element).unbind();var existing=placeholder.data("plot");if(existing){existing.shutdown();overlay.clear()}placeholder.data("plot",plot)}function bindEvents(){if(options.grid.hoverable){eventHolder.mousemove(onMouseMove);eventHolder.bind("mouseleave",onMouseLeave)}if(options.grid.clickable)eventHolder.click(onClick);executeHooks(hooks.bindEvents,[eventHolder])}function shutdown(){if(redrawTimeout)clearTimeout(redrawTimeout);eventHolder.unbind("mousemove",onMouseMove);eventHolder.unbind("mouseleave",onMouseLeave);eventHolder.unbind("click",onClick);executeHooks(hooks.shutdown,[eventHolder])}function setTransformationHelpers(axis){function identity(x){return x}var s,m,t=axis.options.transform||identity,it=axis.options.inverseTransform;if(axis.direction=="x"){s=axis.scale=plotWidth/Math.abs(t(axis.max)-t(axis.min));m=Math.min(t(axis.max),t(axis.min))}else{s=axis.scale=plotHeight/Math.abs(t(axis.max)-t(axis.min));s=-s;m=Math.max(t(axis.max),t(axis.min))}if(t==identity)axis.p2c=function(p){return(p-m)*s};else axis.p2c=function(p){return(t(p)-m)*s};if(!it)axis.c2p=function(c){return m+c/s};else axis.c2p=function(c){return it(m+c/s)}}function measureTickLabels(axis){var opts=axis.options,ticks=axis.ticks||[],labelWidth=opts.labelWidth||0,labelHeight=opts.labelHeight||0,maxWidth=labelWidth||(axis.direction=="x"?Math.floor(surface.width/(ticks.length||1)):null),legacyStyles=axis.direction+"Axis "+axis.direction+axis.n+"Axis",layer="flot-"+axis.direction+"-axis flot-"+axis.direction+axis.n+"-axis "+legacyStyles,font=opts.font||"flot-tick-label tickLabel";for(var i=0;i<ticks.length;++i){var t=ticks[i];if(!t.label)continue;var info=surface.getTextInfo(layer,t.label,font,null,maxWidth);labelWidth=Math.max(labelWidth,info.width);labelHeight=Math.max(labelHeight,info.height)}axis.labelWidth=opts.labelWidth||labelWidth;axis.labelHeight=opts.labelHeight||labelHeight}function allocateAxisBoxFirstPhase(axis){var lw=axis.labelWidth,lh=axis.labelHeight,pos=axis.options.position,isXAxis=axis.direction==="x",tickLength=axis.options.tickLength,axisMargin=options.grid.axisMargin,padding=options.grid.labelMargin,innermost=true,outermost=true,first=true,found=false;$.each(isXAxis?xaxes:yaxes,function(i,a){if(a&&(a.show||a.reserveSpace)){if(a===axis){found=true}else if(a.options.position===pos){if(found){outermost=false}else{innermost=false}}if(!found){first=false}}});if(outermost){axisMargin=0}if(tickLength==null){tickLength=first?"full":5}if(!isNaN(+tickLength))padding+=+tickLength;if(isXAxis){lh+=padding;if(pos=="bottom"){plotOffset.bottom+=lh+axisMargin;axis.box={top:surface.height-plotOffset.bottom,height:lh}}else{axis.box={top:plotOffset.top+axisMargin,height:lh};plotOffset.top+=lh+axisMargin}}else{lw+=padding;if(pos=="left"){axis.box={left:plotOffset.left+axisMargin,width:lw};plotOffset.left+=lw+axisMargin}else{plotOffset.right+=lw+axisMargin;axis.box={left:surface.width-plotOffset.right,width:lw}}}axis.position=pos;axis.tickLength=tickLength;axis.box.padding=padding;axis.innermost=innermost}function allocateAxisBoxSecondPhase(axis){if(axis.direction=="x"){axis.box.left=plotOffset.left-axis.labelWidth/2;axis.box.width=surface.width-plotOffset.left-plotOffset.right+axis.labelWidth}else{axis.box.top=plotOffset.top-axis.labelHeight/2;axis.box.height=surface.height-plotOffset.bottom-plotOffset.top+axis.labelHeight}}function adjustLayoutForThingsStickingOut(){var minMargin=options.grid.minBorderMargin,axis,i;if(minMargin==null){minMargin=0;for(i=0;i<series.length;++i)minMargin=Math.max(minMargin,2*(series[i].points.radius+series[i].points.lineWidth/2))}var margins={left:minMargin,right:minMargin,top:minMargin,bottom:minMargin};$.each(allAxes(),function(_,axis){if(axis.reserveSpace&&axis.ticks&&axis.ticks.length){if(axis.direction==="x"){margins.left=Math.max(margins.left,axis.labelWidth/2);margins.right=Math.max(margins.right,axis.labelWidth/2)}else{margins.bottom=Math.max(margins.bottom,axis.labelHeight/2);margins.top=Math.max(margins.top,axis.labelHeight/2)}}});plotOffset.left=Math.ceil(Math.max(margins.left,plotOffset.left));plotOffset.right=Math.ceil(Math.max(margins.right,plotOffset.right));plotOffset.top=Math.ceil(Math.max(margins.top,plotOffset.top));plotOffset.bottom=Math.ceil(Math.max(margins.bottom,plotOffset.bottom))}function setupGrid(){var i,axes=allAxes(),showGrid=options.grid.show;for(var a in plotOffset){var margin=options.grid.margin||0;plotOffset[a]=typeof margin=="number"?margin:margin[a]||0}executeHooks(hooks.processOffset,[plotOffset]);for(var a in plotOffset){if(typeof options.grid.borderWidth=="object"){plotOffset[a]+=showGrid?options.grid.borderWidth[a]:0}else{plotOffset[a]+=showGrid?options.grid.borderWidth:0}}$.each(axes,function(_,axis){var axisOpts=axis.options;axis.show=axisOpts.show==null?axis.used:axisOpts.show;axis.reserveSpace=axisOpts.reserveSpace==null?axis.show:axisOpts.reserveSpace;setRange(axis)});if(showGrid){var allocatedAxes=$.grep(axes,function(axis){return axis.show||axis.reserveSpace});$.each(allocatedAxes,function(_,axis){setupTickGeneration(axis);setTicks(axis);snapRangeToTicks(axis,axis.ticks);measureTickLabels(axis)});for(i=allocatedAxes.length-1;i>=0;--i)allocateAxisBoxFirstPhase(allocatedAxes[i]);adjustLayoutForThingsStickingOut();$.each(allocatedAxes,function(_,axis){allocateAxisBoxSecondPhase(axis)})}plotWidth=surface.width-plotOffset.left-plotOffset.right;plotHeight=surface.height-plotOffset.bottom-plotOffset.top;$.each(axes,function(_,axis){setTransformationHelpers(axis)});if(showGrid){drawAxisLabels()}insertLegend()}function setRange(axis){var opts=axis.options,min=+(opts.min!=null?opts.min:axis.datamin),max=+(opts.max!=null?opts.max:axis.datamax),delta=max-min;if(delta==0){var widen=max==0?1:.01;if(opts.min==null)min-=widen;if(opts.max==null||opts.min!=null)max+=widen}else{var margin=opts.autoscaleMargin;if(margin!=null){if(opts.min==null){min-=delta*margin;if(min<0&&axis.datamin!=null&&axis.datamin>=0)min=0}if(opts.max==null){max+=delta*margin;if(max>0&&axis.datamax!=null&&axis.datamax<=0)max=0}}}axis.min=min;axis.max=max}function setupTickGeneration(axis){var opts=axis.options;var noTicks;if(typeof opts.ticks=="number"&&opts.ticks>0)noTicks=opts.ticks;else noTicks=.3*Math.sqrt(axis.direction=="x"?surface.width:surface.height);var delta=(axis.max-axis.min)/noTicks,dec=-Math.floor(Math.log(delta)/Math.LN10),maxDec=opts.tickDecimals;if(maxDec!=null&&dec>maxDec){dec=maxDec}var magn=Math.pow(10,-dec),norm=delta/magn,size;if(norm<1.5){size=1}else if(norm<3){size=2;if(norm>2.25&&(maxDec==null||dec+1<=maxDec)){size=2.5;++dec}}else if(norm<7.5){size=5}else{size=10}size*=magn;if(opts.minTickSize!=null&&size<opts.minTickSize){size=opts.minTickSize}axis.delta=delta;axis.tickDecimals=Math.max(0,maxDec!=null?maxDec:dec);axis.tickSize=opts.tickSize||size;if(opts.mode=="time"&&!axis.tickGenerator){throw new Error("Time mode requires the flot.time plugin.")}if(!axis.tickGenerator){axis.tickGenerator=function(axis){var ticks=[],start=floorInBase(axis.min,axis.tickSize),i=0,v=Number.NaN,prev;do{prev=v;v=start+i*axis.tickSize;ticks.push(v);++i}while(v<axis.max&&v!=prev);return ticks};axis.tickFormatter=function(value,axis){var factor=axis.tickDecimals?Math.pow(10,axis.tickDecimals):1;var formatted=""+Math.round(value*factor)/factor;if(axis.tickDecimals!=null){var decimal=formatted.indexOf(".");var precision=decimal==-1?0:formatted.length-decimal-1;if(precision<axis.tickDecimals){return(precision?formatted:formatted+".")+(""+factor).substr(1,axis.tickDecimals-precision)}}return formatted}}if($.isFunction(opts.tickFormatter))axis.tickFormatter=function(v,axis){return""+opts.tickFormatter(v,axis)};if(opts.alignTicksWithAxis!=null){var otherAxis=(axis.direction=="x"?xaxes:yaxes)[opts.alignTicksWithAxis-1];if(otherAxis&&otherAxis.used&&otherAxis!=axis){var niceTicks=axis.tickGenerator(axis);if(niceTicks.length>0){if(opts.min==null)axis.min=Math.min(axis.min,niceTicks[0]);if(opts.max==null&&niceTicks.length>1)axis.max=Math.max(axis.max,niceTicks[niceTicks.length-1])}axis.tickGenerator=function(axis){var ticks=[],v,i;for(i=0;i<otherAxis.ticks.length;++i){v=(otherAxis.ticks[i].v-otherAxis.min)/(otherAxis.max-otherAxis.min);v=axis.min+v*(axis.max-axis.min);ticks.push(v)}return ticks};if(!axis.mode&&opts.tickDecimals==null){var extraDec=Math.max(0,-Math.floor(Math.log(axis.delta)/Math.LN10)+1),ts=axis.tickGenerator(axis);if(!(ts.length>1&&/\..*0$/.test((ts[1]-ts[0]).toFixed(extraDec))))axis.tickDecimals=extraDec}}}}function setTicks(axis){var oticks=axis.options.ticks,ticks=[];if(oticks==null||typeof oticks=="number"&&oticks>0)ticks=axis.tickGenerator(axis);else if(oticks){if($.isFunction(oticks))ticks=oticks(axis);else ticks=oticks}var i,v;axis.ticks=[];for(i=0;i<ticks.length;++i){var label=null;var t=ticks[i];if(typeof t=="object"){v=+t[0];if(t.length>1)label=t[1]}else v=+t;if(label==null)label=axis.tickFormatter(v,axis);if(!isNaN(v))axis.ticks.push({v:v,label:label})}}function snapRangeToTicks(axis,ticks){if(axis.options.autoscaleMargin&&ticks.length>0){if(axis.options.min==null)axis.min=Math.min(axis.min,ticks[0].v);if(axis.options.max==null&&ticks.length>1)axis.max=Math.max(axis.max,ticks[ticks.length-1].v)}}function draw(){surface.clear();executeHooks(hooks.drawBackground,[ctx]);var grid=options.grid;if(grid.show&&grid.backgroundColor)drawBackground();if(grid.show&&!grid.aboveData){drawGrid()}for(var i=0;i<series.length;++i){executeHooks(hooks.drawSeries,[ctx,series[i]]);drawSeries(series[i])}executeHooks(hooks.draw,[ctx]);if(grid.show&&grid.aboveData){drawGrid()}surface.render();triggerRedrawOverlay()}function extractRange(ranges,coord){var axis,from,to,key,axes=allAxes();for(var i=0;i<axes.length;++i){axis=axes[i];if(axis.direction==coord){key=coord+axis.n+"axis";if(!ranges[key]&&axis.n==1)key=coord+"axis";if(ranges[key]){from=ranges[key].from;to=ranges[key].to;break}}}if(!ranges[key]){axis=coord=="x"?xaxes[0]:yaxes[0];from=ranges[coord+"1"];to=ranges[coord+"2"]}if(from!=null&&to!=null&&from>to){var tmp=from;from=to;to=tmp}return{from:from,to:to,axis:axis}}function drawBackground(){ctx.save();ctx.translate(plotOffset.left,plotOffset.top);ctx.fillStyle=getColorOrGradient(options.grid.backgroundColor,plotHeight,0,"rgba(255, 255, 255, 0)");ctx.fillRect(0,0,plotWidth,plotHeight);ctx.restore()}function drawGrid(){var i,axes,bw,bc;ctx.save();ctx.translate(plotOffset.left,plotOffset.top);var markings=options.grid.markings;if(markings){if($.isFunction(markings)){axes=plot.getAxes();axes.xmin=axes.xaxis.min;axes.xmax=axes.xaxis.max;axes.ymin=axes.yaxis.min;axes.ymax=axes.yaxis.max;markings=markings(axes)}for(i=0;i<markings.length;++i){var m=markings[i],xrange=extractRange(m,"x"),yrange=extractRange(m,"y");if(xrange.from==null)xrange.from=xrange.axis.min;if(xrange.to==null)xrange.to=xrange.axis.max;
if(yrange.from==null)yrange.from=yrange.axis.min;if(yrange.to==null)yrange.to=yrange.axis.max;if(xrange.to<xrange.axis.min||xrange.from>xrange.axis.max||yrange.to<yrange.axis.min||yrange.from>yrange.axis.max)continue;xrange.from=Math.max(xrange.from,xrange.axis.min);xrange.to=Math.min(xrange.to,xrange.axis.max);yrange.from=Math.max(yrange.from,yrange.axis.min);yrange.to=Math.min(yrange.to,yrange.axis.max);var xequal=xrange.from===xrange.to,yequal=yrange.from===yrange.to;if(xequal&&yequal){continue}xrange.from=Math.floor(xrange.axis.p2c(xrange.from));xrange.to=Math.floor(xrange.axis.p2c(xrange.to));yrange.from=Math.floor(yrange.axis.p2c(yrange.from));yrange.to=Math.floor(yrange.axis.p2c(yrange.to));if(xequal||yequal){var lineWidth=m.lineWidth||options.grid.markingsLineWidth,subPixel=lineWidth%2?.5:0;ctx.beginPath();ctx.strokeStyle=m.color||options.grid.markingsColor;ctx.lineWidth=lineWidth;if(xequal){ctx.moveTo(xrange.to+subPixel,yrange.from);ctx.lineTo(xrange.to+subPixel,yrange.to)}else{ctx.moveTo(xrange.from,yrange.to+subPixel);ctx.lineTo(xrange.to,yrange.to+subPixel)}ctx.stroke()}else{ctx.fillStyle=m.color||options.grid.markingsColor;ctx.fillRect(xrange.from,yrange.to,xrange.to-xrange.from,yrange.from-yrange.to)}}}axes=allAxes();bw=options.grid.borderWidth;for(var j=0;j<axes.length;++j){var axis=axes[j],box=axis.box,t=axis.tickLength,x,y,xoff,yoff;if(!axis.show||axis.ticks.length==0)continue;ctx.lineWidth=1;if(axis.direction=="x"){x=0;if(t=="full")y=axis.position=="top"?0:plotHeight;else y=box.top-plotOffset.top+(axis.position=="top"?box.height:0)}else{y=0;if(t=="full")x=axis.position=="left"?0:plotWidth;else x=box.left-plotOffset.left+(axis.position=="left"?box.width:0)}if(!axis.innermost){ctx.strokeStyle=axis.options.color;ctx.beginPath();xoff=yoff=0;if(axis.direction=="x")xoff=plotWidth+1;else yoff=plotHeight+1;if(ctx.lineWidth==1){if(axis.direction=="x"){y=Math.floor(y)+.5}else{x=Math.floor(x)+.5}}ctx.moveTo(x,y);ctx.lineTo(x+xoff,y+yoff);ctx.stroke()}ctx.strokeStyle=axis.options.tickColor;ctx.beginPath();for(i=0;i<axis.ticks.length;++i){var v=axis.ticks[i].v;xoff=yoff=0;if(isNaN(v)||v<axis.min||v>axis.max||t=="full"&&(typeof bw=="object"&&bw[axis.position]>0||bw>0)&&(v==axis.min||v==axis.max))continue;if(axis.direction=="x"){x=axis.p2c(v);yoff=t=="full"?-plotHeight:t;if(axis.position=="top")yoff=-yoff}else{y=axis.p2c(v);xoff=t=="full"?-plotWidth:t;if(axis.position=="left")xoff=-xoff}if(ctx.lineWidth==1){if(axis.direction=="x")x=Math.floor(x)+.5;else y=Math.floor(y)+.5}ctx.moveTo(x,y);ctx.lineTo(x+xoff,y+yoff)}ctx.stroke()}if(bw){bc=options.grid.borderColor;if(typeof bw=="object"||typeof bc=="object"){if(typeof bw!=="object"){bw={top:bw,right:bw,bottom:bw,left:bw}}if(typeof bc!=="object"){bc={top:bc,right:bc,bottom:bc,left:bc}}if(bw.top>0){ctx.strokeStyle=bc.top;ctx.lineWidth=bw.top;ctx.beginPath();ctx.moveTo(0-bw.left,0-bw.top/2);ctx.lineTo(plotWidth,0-bw.top/2);ctx.stroke()}if(bw.right>0){ctx.strokeStyle=bc.right;ctx.lineWidth=bw.right;ctx.beginPath();ctx.moveTo(plotWidth+bw.right/2,0-bw.top);ctx.lineTo(plotWidth+bw.right/2,plotHeight);ctx.stroke()}if(bw.bottom>0){ctx.strokeStyle=bc.bottom;ctx.lineWidth=bw.bottom;ctx.beginPath();ctx.moveTo(plotWidth+bw.right,plotHeight+bw.bottom/2);ctx.lineTo(0,plotHeight+bw.bottom/2);ctx.stroke()}if(bw.left>0){ctx.strokeStyle=bc.left;ctx.lineWidth=bw.left;ctx.beginPath();ctx.moveTo(0-bw.left/2,plotHeight+bw.bottom);ctx.lineTo(0-bw.left/2,0);ctx.stroke()}}else{ctx.lineWidth=bw;ctx.strokeStyle=options.grid.borderColor;ctx.strokeRect(-bw/2,-bw/2,plotWidth+bw,plotHeight+bw)}}ctx.restore()}function drawAxisLabels(){$.each(allAxes(),function(_,axis){var box=axis.box,legacyStyles=axis.direction+"Axis "+axis.direction+axis.n+"Axis",layer="flot-"+axis.direction+"-axis flot-"+axis.direction+axis.n+"-axis "+legacyStyles,font=axis.options.font||"flot-tick-label tickLabel",tick,x,y,halign,valign;surface.removeText(layer);if(!axis.show||axis.ticks.length==0)return;for(var i=0;i<axis.ticks.length;++i){tick=axis.ticks[i];if(!tick.label||tick.v<axis.min||tick.v>axis.max)continue;if(axis.direction=="x"){halign="center";x=plotOffset.left+axis.p2c(tick.v);if(axis.position=="bottom"){y=box.top+box.padding}else{y=box.top+box.height-box.padding;valign="bottom"}}else{valign="middle";y=plotOffset.top+axis.p2c(tick.v);if(axis.position=="left"){x=box.left+box.width-box.padding;halign="right"}else{x=box.left+box.padding}}surface.addText(layer,x,y,tick.label,font,null,null,halign,valign)}})}function drawSeries(series){if(series.lines.show)drawSeriesLines(series);if(series.bars.show)drawSeriesBars(series);if(series.points.show)drawSeriesPoints(series)}function drawSeriesLines(series){function plotLine(datapoints,xoffset,yoffset,axisx,axisy){var points=datapoints.points,ps=datapoints.pointsize,prevx=null,prevy=null;ctx.beginPath();for(var i=ps;i<points.length;i+=ps){var x1=points[i-ps],y1=points[i-ps+1],x2=points[i],y2=points[i+1];if(x1==null||x2==null)continue;if(y1<=y2&&y1<axisy.min){if(y2<axisy.min)continue;x1=(axisy.min-y1)/(y2-y1)*(x2-x1)+x1;y1=axisy.min}else if(y2<=y1&&y2<axisy.min){if(y1<axisy.min)continue;x2=(axisy.min-y1)/(y2-y1)*(x2-x1)+x1;y2=axisy.min}if(y1>=y2&&y1>axisy.max){if(y2>axisy.max)continue;x1=(axisy.max-y1)/(y2-y1)*(x2-x1)+x1;y1=axisy.max}else if(y2>=y1&&y2>axisy.max){if(y1>axisy.max)continue;x2=(axisy.max-y1)/(y2-y1)*(x2-x1)+x1;y2=axisy.max}if(x1<=x2&&x1<axisx.min){if(x2<axisx.min)continue;y1=(axisx.min-x1)/(x2-x1)*(y2-y1)+y1;x1=axisx.min}else if(x2<=x1&&x2<axisx.min){if(x1<axisx.min)continue;y2=(axisx.min-x1)/(x2-x1)*(y2-y1)+y1;x2=axisx.min}if(x1>=x2&&x1>axisx.max){if(x2>axisx.max)continue;y1=(axisx.max-x1)/(x2-x1)*(y2-y1)+y1;x1=axisx.max}else if(x2>=x1&&x2>axisx.max){if(x1>axisx.max)continue;y2=(axisx.max-x1)/(x2-x1)*(y2-y1)+y1;x2=axisx.max}if(x1!=prevx||y1!=prevy)ctx.moveTo(axisx.p2c(x1)+xoffset,axisy.p2c(y1)+yoffset);prevx=x2;prevy=y2;ctx.lineTo(axisx.p2c(x2)+xoffset,axisy.p2c(y2)+yoffset)}ctx.stroke()}function plotLineArea(datapoints,axisx,axisy){var points=datapoints.points,ps=datapoints.pointsize,bottom=Math.min(Math.max(0,axisy.min),axisy.max),i=0,top,areaOpen=false,ypos=1,segmentStart=0,segmentEnd=0;while(true){if(ps>0&&i>points.length+ps)break;i+=ps;var x1=points[i-ps],y1=points[i-ps+ypos],x2=points[i],y2=points[i+ypos];if(areaOpen){if(ps>0&&x1!=null&&x2==null){segmentEnd=i;ps=-ps;ypos=2;continue}if(ps<0&&i==segmentStart+ps){ctx.fill();areaOpen=false;ps=-ps;ypos=1;i=segmentStart=segmentEnd+ps;continue}}if(x1==null||x2==null)continue;if(x1<=x2&&x1<axisx.min){if(x2<axisx.min)continue;y1=(axisx.min-x1)/(x2-x1)*(y2-y1)+y1;x1=axisx.min}else if(x2<=x1&&x2<axisx.min){if(x1<axisx.min)continue;y2=(axisx.min-x1)/(x2-x1)*(y2-y1)+y1;x2=axisx.min}if(x1>=x2&&x1>axisx.max){if(x2>axisx.max)continue;y1=(axisx.max-x1)/(x2-x1)*(y2-y1)+y1;x1=axisx.max}else if(x2>=x1&&x2>axisx.max){if(x1>axisx.max)continue;y2=(axisx.max-x1)/(x2-x1)*(y2-y1)+y1;x2=axisx.max}if(!areaOpen){ctx.beginPath();ctx.moveTo(axisx.p2c(x1),axisy.p2c(bottom));areaOpen=true}if(y1>=axisy.max&&y2>=axisy.max){ctx.lineTo(axisx.p2c(x1),axisy.p2c(axisy.max));ctx.lineTo(axisx.p2c(x2),axisy.p2c(axisy.max));continue}else if(y1<=axisy.min&&y2<=axisy.min){ctx.lineTo(axisx.p2c(x1),axisy.p2c(axisy.min));ctx.lineTo(axisx.p2c(x2),axisy.p2c(axisy.min));continue}var x1old=x1,x2old=x2;if(y1<=y2&&y1<axisy.min&&y2>=axisy.min){x1=(axisy.min-y1)/(y2-y1)*(x2-x1)+x1;y1=axisy.min}else if(y2<=y1&&y2<axisy.min&&y1>=axisy.min){x2=(axisy.min-y1)/(y2-y1)*(x2-x1)+x1;y2=axisy.min}if(y1>=y2&&y1>axisy.max&&y2<=axisy.max){x1=(axisy.max-y1)/(y2-y1)*(x2-x1)+x1;y1=axisy.max}else if(y2>=y1&&y2>axisy.max&&y1<=axisy.max){x2=(axisy.max-y1)/(y2-y1)*(x2-x1)+x1;y2=axisy.max}if(x1!=x1old){ctx.lineTo(axisx.p2c(x1old),axisy.p2c(y1))}ctx.lineTo(axisx.p2c(x1),axisy.p2c(y1));ctx.lineTo(axisx.p2c(x2),axisy.p2c(y2));if(x2!=x2old){ctx.lineTo(axisx.p2c(x2),axisy.p2c(y2));ctx.lineTo(axisx.p2c(x2old),axisy.p2c(y2))}}}ctx.save();ctx.translate(plotOffset.left,plotOffset.top);ctx.lineJoin="round";var lw=series.lines.lineWidth,sw=series.shadowSize;if(lw>0&&sw>0){ctx.lineWidth=sw;ctx.strokeStyle="rgba(0,0,0,0.1)";var angle=Math.PI/18;plotLine(series.datapoints,Math.sin(angle)*(lw/2+sw/2),Math.cos(angle)*(lw/2+sw/2),series.xaxis,series.yaxis);ctx.lineWidth=sw/2;plotLine(series.datapoints,Math.sin(angle)*(lw/2+sw/4),Math.cos(angle)*(lw/2+sw/4),series.xaxis,series.yaxis)}ctx.lineWidth=lw;ctx.strokeStyle=series.color;var fillStyle=getFillStyle(series.lines,series.color,0,plotHeight);if(fillStyle){ctx.fillStyle=fillStyle;plotLineArea(series.datapoints,series.xaxis,series.yaxis)}if(lw>0)plotLine(series.datapoints,0,0,series.xaxis,series.yaxis);ctx.restore()}function drawSeriesPoints(series){function plotPoints(datapoints,radius,fillStyle,offset,shadow,axisx,axisy,symbol){var points=datapoints.points,ps=datapoints.pointsize;for(var i=0;i<points.length;i+=ps){var x=points[i],y=points[i+1];if(x==null||x<axisx.min||x>axisx.max||y<axisy.min||y>axisy.max)continue;ctx.beginPath();x=axisx.p2c(x);y=axisy.p2c(y)+offset;if(symbol=="circle")ctx.arc(x,y,radius,0,shadow?Math.PI:Math.PI*2,false);else symbol(ctx,x,y,radius,shadow);ctx.closePath();if(fillStyle){ctx.fillStyle=fillStyle;ctx.fill()}ctx.stroke()}}ctx.save();ctx.translate(plotOffset.left,plotOffset.top);var lw=series.points.lineWidth,sw=series.shadowSize,radius=series.points.radius,symbol=series.points.symbol;if(lw==0)lw=1e-4;if(lw>0&&sw>0){var w=sw/2;ctx.lineWidth=w;ctx.strokeStyle="rgba(0,0,0,0.1)";plotPoints(series.datapoints,radius,null,w+w/2,true,series.xaxis,series.yaxis,symbol);ctx.strokeStyle="rgba(0,0,0,0.2)";plotPoints(series.datapoints,radius,null,w/2,true,series.xaxis,series.yaxis,symbol)}ctx.lineWidth=lw;ctx.strokeStyle=series.color;plotPoints(series.datapoints,radius,getFillStyle(series.points,series.color),0,false,series.xaxis,series.yaxis,symbol);ctx.restore()}function drawBar(x,y,b,barLeft,barRight,fillStyleCallback,axisx,axisy,c,horizontal,lineWidth){var left,right,bottom,top,drawLeft,drawRight,drawTop,drawBottom,tmp;if(horizontal){drawBottom=drawRight=drawTop=true;drawLeft=false;left=b;right=x;top=y+barLeft;bottom=y+barRight;if(right<left){tmp=right;right=left;left=tmp;drawLeft=true;drawRight=false}}else{drawLeft=drawRight=drawTop=true;drawBottom=false;left=x+barLeft;right=x+barRight;bottom=b;top=y;if(top<bottom){tmp=top;top=bottom;bottom=tmp;drawBottom=true;drawTop=false}}if(right<axisx.min||left>axisx.max||top<axisy.min||bottom>axisy.max)return;if(left<axisx.min){left=axisx.min;drawLeft=false}if(right>axisx.max){right=axisx.max;drawRight=false}if(bottom<axisy.min){bottom=axisy.min;drawBottom=false}if(top>axisy.max){top=axisy.max;drawTop=false}left=axisx.p2c(left);bottom=axisy.p2c(bottom);right=axisx.p2c(right);top=axisy.p2c(top);if(fillStyleCallback){c.fillStyle=fillStyleCallback(bottom,top);c.fillRect(left,top,right-left,bottom-top)}if(lineWidth>0&&(drawLeft||drawRight||drawTop||drawBottom)){c.beginPath();c.moveTo(left,bottom);if(drawLeft)c.lineTo(left,top);else c.moveTo(left,top);if(drawTop)c.lineTo(right,top);else c.moveTo(right,top);if(drawRight)c.lineTo(right,bottom);else c.moveTo(right,bottom);if(drawBottom)c.lineTo(left,bottom);else c.moveTo(left,bottom);c.stroke()}}function drawSeriesBars(series){function plotBars(datapoints,barLeft,barRight,fillStyleCallback,axisx,axisy){var points=datapoints.points,ps=datapoints.pointsize;for(var i=0;i<points.length;i+=ps){if(points[i]==null)continue;drawBar(points[i],points[i+1],points[i+2],barLeft,barRight,fillStyleCallback,axisx,axisy,ctx,series.bars.horizontal,series.bars.lineWidth)}}ctx.save();ctx.translate(plotOffset.left,plotOffset.top);ctx.lineWidth=series.bars.lineWidth;ctx.strokeStyle=series.color;var barLeft;switch(series.bars.align){case"left":barLeft=0;break;case"right":barLeft=-series.bars.barWidth;break;default:barLeft=-series.bars.barWidth/2}var fillStyleCallback=series.bars.fill?function(bottom,top){return getFillStyle(series.bars,series.color,bottom,top)}:null;plotBars(series.datapoints,barLeft,barLeft+series.bars.barWidth,fillStyleCallback,series.xaxis,series.yaxis);ctx.restore()}function getFillStyle(filloptions,seriesColor,bottom,top){var fill=filloptions.fill;if(!fill)return null;if(filloptions.fillColor)return getColorOrGradient(filloptions.fillColor,bottom,top,seriesColor);var c=$.color.parse(seriesColor);c.a=typeof fill=="number"?fill:.4;c.normalize();return c.toString()}function insertLegend(){if(options.legend.container!=null){$(options.legend.container).html("")}else{placeholder.find(".legend").remove()}if(!options.legend.show){return}var fragments=[],entries=[],rowStarted=false,lf=options.legend.labelFormatter,s,label;for(var i=0;i<series.length;++i){s=series[i];if(s.label){label=lf?lf(s.label,s):s.label;if(label){entries.push({label:label,color:s.color})}}}if(options.legend.sorted){if($.isFunction(options.legend.sorted)){entries.sort(options.legend.sorted)}else if(options.legend.sorted=="reverse"){entries.reverse()}else{var ascending=options.legend.sorted!="descending";entries.sort(function(a,b){return a.label==b.label?0:a.label<b.label!=ascending?1:-1})}}for(var i=0;i<entries.length;++i){var entry=entries[i];if(i%options.legend.noColumns==0){if(rowStarted)fragments.push("</tr>");fragments.push("<tr>");rowStarted=true}fragments.push('<td class="legendColorBox"><div style="border:1px solid '+options.legend.labelBoxBorderColor+';padding:1px"><div style="width:4px;height:0;border:5px solid '+entry.color+';overflow:hidden"></div></div></td>'+'<td class="legendLabel">'+entry.label+"</td>")}if(rowStarted)fragments.push("</tr>");if(fragments.length==0)return;var table='<table style="font-size:smaller;color:'+options.grid.color+'">'+fragments.join("")+"</table>";if(options.legend.container!=null)$(options.legend.container).html(table);else{var pos="",p=options.legend.position,m=options.legend.margin;if(m[0]==null)m=[m,m];if(p.charAt(0)=="n")pos+="top:"+(m[1]+plotOffset.top)+"px;";else if(p.charAt(0)=="s")pos+="bottom:"+(m[1]+plotOffset.bottom)+"px;";if(p.charAt(1)=="e")pos+="right:"+(m[0]+plotOffset.right)+"px;";else if(p.charAt(1)=="w")pos+="left:"+(m[0]+plotOffset.left)+"px;";var legend=$('<div class="legend">'+table.replace('style="','style="position:absolute;'+pos+";")+"</div>").appendTo(placeholder);if(options.legend.backgroundOpacity!=0){var c=options.legend.backgroundColor;if(c==null){c=options.grid.backgroundColor;if(c&&typeof c=="string")c=$.color.parse(c);else c=$.color.extract(legend,"background-color");c.a=1;c=c.toString()}var div=legend.children();$('<div style="position:absolute;width:'+div.width()+"px;height:"+div.height()+"px;"+pos+"background-color:"+c+';"> </div>').prependTo(legend).css("opacity",options.legend.backgroundOpacity)}}}var highlights=[],redrawTimeout=null;function findNearbyItem(mouseX,mouseY,seriesFilter){var maxDistance=options.grid.mouseActiveRadius,smallestDistance=maxDistance*maxDistance+1,item=null,foundPoint=false,i,j,ps;for(i=series.length-1;i>=0;--i){if(!seriesFilter(series[i]))continue;var s=series[i],axisx=s.xaxis,axisy=s.yaxis,points=s.datapoints.points,mx=axisx.c2p(mouseX),my=axisy.c2p(mouseY),maxx=maxDistance/axisx.scale,maxy=maxDistance/axisy.scale;ps=s.datapoints.pointsize;if(axisx.options.inverseTransform)maxx=Number.MAX_VALUE;if(axisy.options.inverseTransform)maxy=Number.MAX_VALUE;if(s.lines.show||s.points.show){for(j=0;j<points.length;j+=ps){var x=points[j],y=points[j+1];if(x==null)continue;if(x-mx>maxx||x-mx<-maxx||y-my>maxy||y-my<-maxy)continue;var dx=Math.abs(axisx.p2c(x)-mouseX),dy=Math.abs(axisy.p2c(y)-mouseY),dist=dx*dx+dy*dy;if(dist<smallestDistance){smallestDistance=dist;item=[i,j/ps]}}}if(s.bars.show&&!item){var barLeft,barRight;switch(s.bars.align){case"left":barLeft=0;break;case"right":barLeft=-s.bars.barWidth;break;default:barLeft=-s.bars.barWidth/2}barRight=barLeft+s.bars.barWidth;for(j=0;j<points.length;j+=ps){var x=points[j],y=points[j+1],b=points[j+2];if(x==null)continue;if(series[i].bars.horizontal?mx<=Math.max(b,x)&&mx>=Math.min(b,x)&&my>=y+barLeft&&my<=y+barRight:mx>=x+barLeft&&mx<=x+barRight&&my>=Math.min(b,y)&&my<=Math.max(b,y))item=[i,j/ps]}}}if(item){i=item[0];j=item[1];ps=series[i].datapoints.pointsize;return{datapoint:series[i].datapoints.points.slice(j*ps,(j+1)*ps),dataIndex:j,series:series[i],seriesIndex:i}}return null}function onMouseMove(e){if(options.grid.hoverable)triggerClickHoverEvent("plothover",e,function(s){return s["hoverable"]!=false})}function onMouseLeave(e){if(options.grid.hoverable)triggerClickHoverEvent("plothover",e,function(s){return false})}function onClick(e){triggerClickHoverEvent("plotclick",e,function(s){return s["clickable"]!=false})}function triggerClickHoverEvent(eventname,event,seriesFilter){var offset=eventHolder.offset(),canvasX=event.pageX-offset.left-plotOffset.left,canvasY=event.pageY-offset.top-plotOffset.top,pos=canvasToAxisCoords({left:canvasX,top:canvasY});pos.pageX=event.pageX;pos.pageY=event.pageY;var item=findNearbyItem(canvasX,canvasY,seriesFilter);if(item){item.pageX=parseInt(item.series.xaxis.p2c(item.datapoint[0])+offset.left+plotOffset.left,10);item.pageY=parseInt(item.series.yaxis.p2c(item.datapoint[1])+offset.top+plotOffset.top,10)}if(options.grid.autoHighlight){for(var i=0;i<highlights.length;++i){var h=highlights[i];if(h.auto==eventname&&!(item&&h.series==item.series&&h.point[0]==item.datapoint[0]&&h.point[1]==item.datapoint[1]))unhighlight(h.series,h.point)}if(item)highlight(item.series,item.datapoint,eventname)}placeholder.trigger(eventname,[pos,item])}function triggerRedrawOverlay(){var t=options.interaction.redrawOverlayInterval;if(t==-1){drawOverlay();return}if(!redrawTimeout)redrawTimeout=setTimeout(drawOverlay,t)}function drawOverlay(){redrawTimeout=null;octx.save();overlay.clear();octx.translate(plotOffset.left,plotOffset.top);var i,hi;for(i=0;i<highlights.length;++i){hi=highlights[i];if(hi.series.bars.show)drawBarHighlight(hi.series,hi.point);else drawPointHighlight(hi.series,hi.point)}octx.restore();executeHooks(hooks.drawOverlay,[octx])}function highlight(s,point,auto){if(typeof s=="number")s=series[s];if(typeof point=="number"){var ps=s.datapoints.pointsize;point=s.datapoints.points.slice(ps*point,ps*(point+1))}var i=indexOfHighlight(s,point);if(i==-1){highlights.push({series:s,point:point,auto:auto});triggerRedrawOverlay()}else if(!auto)highlights[i].auto=false}function unhighlight(s,point){if(s==null&&point==null){highlights=[];triggerRedrawOverlay();return}if(typeof s=="number")s=series[s];if(typeof point=="number"){var ps=s.datapoints.pointsize;point=s.datapoints.points.slice(ps*point,ps*(point+1))}var i=indexOfHighlight(s,point);if(i!=-1){highlights.splice(i,1);triggerRedrawOverlay()}}function indexOfHighlight(s,p){for(var i=0;i<highlights.length;++i){var h=highlights[i];if(h.series==s&&h.point[0]==p[0]&&h.point[1]==p[1])return i}return-1}function drawPointHighlight(series,point){var x=point[0],y=point[1],axisx=series.xaxis,axisy=series.yaxis,highlightColor=typeof series.highlightColor==="string"?series.highlightColor:$.color.parse(series.color).scale("a",.5).toString();if(x<axisx.min||x>axisx.max||y<axisy.min||y>axisy.max)return;var pointRadius=series.points.radius+series.points.lineWidth/2;octx.lineWidth=pointRadius;octx.strokeStyle=highlightColor;var radius=1.5*pointRadius;x=axisx.p2c(x);y=axisy.p2c(y);octx.beginPath();if(series.points.symbol=="circle")octx.arc(x,y,radius,0,2*Math.PI,false);else series.points.symbol(octx,x,y,radius,false);octx.closePath();octx.stroke()}function drawBarHighlight(series,point){var highlightColor=typeof series.highlightColor==="string"?series.highlightColor:$.color.parse(series.color).scale("a",.5).toString(),fillStyle=highlightColor,barLeft;switch(series.bars.align){case"left":barLeft=0;break;case"right":barLeft=-series.bars.barWidth;break;default:barLeft=-series.bars.barWidth/2}octx.lineWidth=series.bars.lineWidth;octx.strokeStyle=highlightColor;drawBar(point[0],point[1],point[2]||0,barLeft,barLeft+series.bars.barWidth,function(){return fillStyle},series.xaxis,series.yaxis,octx,series.bars.horizontal,series.bars.lineWidth)}function getColorOrGradient(spec,bottom,top,defaultColor){if(typeof spec=="string")return spec;else{var gradient=ctx.createLinearGradient(0,top,0,bottom);for(var i=0,l=spec.colors.length;i<l;++i){var c=spec.colors[i];if(typeof c!="string"){var co=$.color.parse(defaultColor);if(c.brightness!=null)co=co.scale("rgb",c.brightness);if(c.opacity!=null)co.a*=c.opacity;c=co.toString()}gradient.addColorStop(i/(l-1),c)}return gradient}}}$.plot=function(placeholder,data,options){var plot=new Plot($(placeholder),data,options,$.plot.plugins);return plot};$.plot.version="0.8.3";$.plot.plugins=[];$.fn.plot=function(data,options){return this.each(function(){$.plot(this,data,options)})};function floorInBase(n,base){return base*Math.floor(n/base)}})(jQuery);

var jpeg = jpeg || {};
jpeg.lossless = jpeg.lossless || {};
"use strict";jpeg.lossless.ComponentSpec=jpeg.lossless.ComponentSpec||function(){this.hSamp=0;this.quantTableSel=0;this.vSamp=0};"use strict";jpeg.lossless.DataStream=jpeg.lossless.DataStream||function(a){this.buffer=new DataView(a);this.index=0};jpeg.lossless.DataStream.prototype.get16=function(){var a=this.buffer.getUint16(this.index,false);this.index+=2;return a};jpeg.lossless.DataStream.prototype.get8=function(){var a=this.buffer.getUint8(this.index);this.index+=1;return a};"use strict";jpeg.lossless.Decoder=jpeg.lossless.Decoder||function(a,b){this.stream=new jpeg.lossless.DataStream(a);this.frame=new jpeg.lossless.FrameHeader();this.huffTable=new jpeg.lossless.HuffmanTable();this.quantTable=new jpeg.lossless.QuantizationTable();this.scan=new jpeg.lossless.ScanHeader();this.DU=jpeg.lossless.Utils.createArray(10,4,64);this.HuffTab=jpeg.lossless.Utils.createArray(4,2,50*256);this.IDCT_Source=[];this.nBlock=[];this.acTab=jpeg.lossless.Utils.createArray(10,1);this.dcTab=jpeg.lossless.Utils.createArray(10,1);this.qTab=jpeg.lossless.Utils.createArray(10,1);this.marker=0;this.markerIndex=0;this.numComp=0;this.restartInterval=0;this.selection=0;this.xDim=0;this.yDim=0;this.xLoc=0;this.yLoc=0;this.outputData=null;if(typeof b==="undefined"){this.numBytes=2}else{this.numBytes=b}if(this.numBytes===2){this.getter=this.getValue16;this.setter=this.setValue16}else{if(this.numBytes===1){this.getter=this.getValue8;this.setter=this.setValue8}}};jpeg.lossless.Decoder.IDCT_P=[0,5,40,16,45,2,7,42,21,56,8,61,18,47,1,4,41,23,58,13,32,24,37,10,63,17,44,3,6,43,20,57,15,34,29,48,53,26,39,9,60,19,46,22,59,12,33,31,50,55,25,36,11,62,14,35,28,49,52,27,38,30,51,54];jpeg.lossless.Decoder.TABLE=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63];jpeg.lossless.Decoder.MAX_HUFFMAN_SUBTREE=50;jpeg.lossless.Decoder.MSB=2147483648;jpeg.lossless.Decoder.prototype.decode=function(){var h,g=0,b=[],f,e,a=[],d=[],c;this.xLoc=0;this.yLoc=0;h=this.stream.get16();if(h!==65496){throw new Error("Not a JPEG file")}h=this.stream.get16();while((((h>>4)!==4092)||(h===65476))){switch(h){case 65476:this.huffTable.read(this.stream,this.HuffTab);break;case 65484:throw new Error("Program doesn't support arithmetic coding. (format throw new IOException)");case 65499:this.quantTable.read(this.stream,jpeg.lossless.Decoder.TABLE);break;case 65501:this.restartInterval=this.readNumber();break;case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:this.readApp();break;case 65534:this.readComment();break;default:if((h>>8)!==255){throw new Error("ERROR: format throw new IOException! (decode)")}}h=this.stream.get16()}if((h<65472)||(h>65479)){throw new Error("ERROR: could not handle arithmetic code!")}this.frame.read(this.stream);h=this.stream.get16();do{while(h!==65498){switch(h){case 65476:this.huffTable.read(this.stream,this.HuffTab);break;case 65484:throw new Error("Program doesn't support arithmetic coding. (format throw new IOException)");case 65499:this.quantTable.read(this.stream,jpeg.lossless.Decoder.TABLE);break;case 65501:this.restartInterval=this.readNumber();break;case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:this.readApp();break;case 65534:this.readComment();break;default:if((h>>8)!==255){throw new Error("ERROR: format throw new IOException! (Parser.decode)")}}h=this.stream.get16()}this.precision=this.frame.precision;this.components=this.frame.components;this.scan.read(this.stream);this.numComp=this.scan.numComp;this.selection=this.scan.selection;this.scanComps=this.scan.components;this.quantTables=this.quantTable.quantTables;for(f=0;f<this.numComp;f+=1){e=this.scanComps[f].scanCompSel;this.qTab[f]=this.quantTables[this.components[e].quantTableSel];this.nBlock[f]=this.components[e].vSamp*this.components[e].hSamp;this.dcTab[f]=this.HuffTab[this.scanComps[f].dcTabSel][0];this.acTab[f]=this.HuffTab[this.scanComps[f].acTabSel][1]}this.xDim=this.frame.dimX;this.yDim=this.frame.dimY;this.outputData=new DataView(new ArrayBuffer(this.xDim*this.yDim*this.numBytes));g+=1;while(true){a[0]=0;d[0]=0;for(f=0;f<10;f+=1){b[f]=(1<<(this.precision-1))}if(this.restartInterval===0){h=this.decodeUnit(b,a,d);while((h===0)&&((this.xLoc<this.xDim)&&(this.yLoc<this.yDim))){this.output(b);h=this.decodeUnit(b,a,d)}break}for(c=0;c<this.restartInterval;c+=1){h=this.decodeUnit(b,a,d);this.output(b);if(h!==0){break}}if(h===0){if(this.markerIndex!==0){h=(65280|this.marker);this.markerIndex=0}else{h=this.stream.get16()}}if(!((h>=65488)&&(h<=65495))){break}}if((h===65500)&&(g===1)){this.readNumber();h=this.stream.get16()}}while((h!==65497)&&((this.xLoc<this.xDim)&&(this.yLoc<this.yDim))&&(g===0));return this.outputData};jpeg.lossless.Decoder.prototype.decodeUnit=function(a,m,e){var h,n,f,g,l,d,b,c;switch(this.selection){case 2:a[0]=this.getPreviousY();break;case 3:a[0]=this.getPreviousXY();break;case 4:a[0]=(this.getPreviousX()+this.getPreviousY())-this.getPreviousXY();break;case 5:a[0]=this.getPreviousX()+((this.getPreviousY()-this.getPreviousXY())>>1);break;case 6:a[0]=this.getPreviousY()+((this.getPreviousX()-this.getPreviousXY())>>1);break;case 7:a[0]=((this.getPreviousX()+this.getPreviousY())/2);break;default:a[0]=this.getPreviousX();break}if(this.numComp>1){for(l=0;l<this.numComp;l+=1){g=this.qTab[l];n=this.acTab[l];f=this.dcTab[l];for(d=0;d<this.nBlock[l];d+=1){for(b=0;b<this.IDCT_Source.length;b+=1){this.IDCT_Source[b]=0}h=this.getHuffmanValue(f,m,e);if(h>=65280){return h}a[l]=this.IDCT_Source[0]=a[l]+this.getn(e,h,m,e);this.IDCT_Source[0]*=g[0];for(c=1;c<64;c+=1){h=this.getHuffmanValue(n,m,e);if(h>=65280){return h}c+=(h>>4);if((h&15)===0){if((h>>4)===0){break}}else{this.IDCT_Source[jpeg.lossless.Decoder.IDCT_P[c]]=this.getn(e,h&15,m,e)*g[c]}}this.scaleIDCT(this.DU[l][d])}}return 0}else{for(d=0;d<this.nBlock[0];d+=1){h=this.getHuffmanValue(this.dcTab[0],m,e);if(h>=65280){return h}a[0]+=this.getn(a,h,m,e)}return 0}};jpeg.lossless.Decoder.prototype.getHuffmanValue=function(f,c,d){var e,b,a;a=65535;if(d[0]<8){c[0]<<=8;b=this.stream.get8();if(b===255){this.marker=this.stream.get8();if(this.marker!==0){this.markerIndex=9}}c[0]|=b}else{d[0]-=8}e=f[c[0]>>d[0]];if((e&jpeg.lossless.Decoder.MSB)!==0){if(this.markerIndex!==0){this.markerIndex=0;return 65280|this.marker}c[0]&=(a>>(16-d[0]));c[0]<<=8;b=this.stream.get8();if(b===255){this.marker=this.stream.get8();if(this.marker!==0){this.markerIndex=9}}c[0]|=b;e=f[((e&255)*256)+(c[0]>>d[0])];d[0]+=8}d[0]+=8-(e>>8);if(d[0]<0){throw new Error("index="+d[0]+" temp="+c[0]+" code="+e+" in HuffmanValue()")}if(d[0]<this.markerIndex){this.markerIndex=0;return 65280|this.marker}c[0]&=(a>>(16-d[0]));return e&255};jpeg.lossless.Decoder.prototype.getn=function(g,b,f,d){var i,c,a,h,e;c=1;a=-1;h=65535;if(b===0){return 0}if(b===16){if(g[0]>=0){return -32768}else{return 32768}}d[0]-=b;if(d[0]>=0){if((d[0]<this.markerIndex)&&!this.isLastPixel()){this.markerIndex=0;return(65280|this.marker)<<8}i=f[0]>>d[0];f[0]&=(h>>(16-d[0]))}else{f[0]<<=8;e=this.stream.get8();if(e===255){this.marker=this.stream.get8();if(this.marker!==0){this.markerIndex=9}}f[0]|=e;d[0]+=8;if(d[0]<0){if(this.markerIndex!==0){this.markerIndex=0;return(65280|this.marker)<<8}f[0]<<=8;e=this.stream.get8();if(e===255){this.marker=this.stream.get8();if(this.marker!==0){this.markerIndex=9}}f[0]|=e;d[0]+=8}if(d[0]<0){throw new Error("index="+d[0]+" in getn()")}if(d[0]<this.markerIndex){this.markerIndex=0;return(65280|this.marker)<<8}i=f[0]>>d[0];f[0]&=(h>>(16-d[0]))}if(i<(c<<(b-1))){i+=(a<<b)+1}return i};jpeg.lossless.Decoder.prototype.getPreviousX=function(){if(this.xLoc>0){return this.getter((((this.yLoc*this.xDim)+this.xLoc)-1))}else{if(this.yLoc>0){return this.getPreviousY()}else{return(1<<(this.frame.precision-1))}}};jpeg.lossless.Decoder.prototype.getPreviousXY=function(){if((this.xLoc>0)&&(this.yLoc>0)){return this.getter(((((this.yLoc-1)*this.xDim)+this.xLoc)-1))}else{return this.getPreviousY()}};jpeg.lossless.Decoder.prototype.getPreviousY=function(){if(this.yLoc>0){return this.getter((((this.yLoc-1)*this.xDim)+this.xLoc))}else{return this.getPreviousX()}};jpeg.lossless.Decoder.prototype.isLastPixel=function(){return(this.xLoc===(this.xDim-1))&&(this.yLoc===(this.yDim-1))};jpeg.lossless.Decoder.prototype.output=function(a){if((this.xLoc<this.xDim)&&(this.yLoc<this.yDim)){this.setter((((this.yLoc*this.xDim)+this.xLoc)),a[0]);this.xLoc+=1;if(this.xLoc>=this.xDim){this.yLoc+=1;this.xLoc=0}}};jpeg.lossless.Decoder.prototype.setValue16=function(a,b){this.outputData.setInt16(a*2,b,true)};jpeg.lossless.Decoder.prototype.getValue16=function(a){return this.outputData.getInt16(a*2,true)};jpeg.lossless.Decoder.prototype.setValue8=function(a,b){this.outputData.setInt8(a,b)};jpeg.lossless.Decoder.prototype.getValue8=function(a){return this.outputData.getInt8(a)};jpeg.lossless.Decoder.prototype.readApp=function(){var b=0,a=this.stream.get16();b+=2;while(b<a){this.stream.get8();b+=1}return a};jpeg.lossless.Decoder.prototype.readComment=function(){var c="",b=0,a;a=this.stream.get16();b+=2;while(b<a){c+=this.stream.get8();b+=1}return c};jpeg.lossless.Decoder.prototype.readNumber=function(){var a=this.stream.get16();if(a!==4){throw new Error("ERROR: Define number format throw new IOException [Ld!=4]")}return this.stream.get16()};jpeg.lossless.Decoder.prototype.scaleIDCT=function(s){var n=jpeg.lossless.Utils.createArray(8,8),m,l,k,j,t,z,y,x,w,v,u,r,q,h,g,f,e,d,c,b,a,o=0;for(t=0;t<8;t+=1){z=this.IDCT_Source[(0)+t];y=this.IDCT_Source[(8)+t];x=this.IDCT_Source[(16)+t]-this.IDCT_Source[(24)+t];w=this.IDCT_Source[(24)+t]+this.IDCT_Source[(16)+t];v=this.IDCT_Source[(32)+t]-this.IDCT_Source[(56)+t];r=this.IDCT_Source[(40)+t]-this.IDCT_Source[(48)+t];m=this.IDCT_Source[(40)+t]+this.IDCT_Source[(48)+t];l=this.IDCT_Source[(32)+t]+this.IDCT_Source[(56)+t];u=m-l;q=m+l;d=(-v*480)-(r*192);c=u*384;b=(r*480)-(v*192);a=q*256;m=z*256;l=y*256;k=x*384;j=w*256;e=j;h=m+l;g=m-l;f=k-j;z=h+e;y=g+f;x=g-f;w=h-e;v=b-d-c-a;u=(c-b)+a;r=b-a;q=a;n[0][t]=(z+q+(1<<12))>>13;n[1][t]=(y+r+(1<<12))>>13;n[2][t]=(x+u+(1<<12))>>13;n[3][t]=(w+v+(1<<12))>>13;n[4][t]=((w-v)+(1<<12))>>13;n[5][t]=((x-u)+(1<<12))>>13;n[6][t]=((y-r)+(1<<12))>>13;n[7][t]=((z-q)+(1<<12))>>13}for(t=0;t<8;t+=1){z=n[t][0];y=n[t][1];x=n[t][2]-n[t][3];w=n[t][3]+n[t][2];v=n[t][4]-n[t][7];r=n[t][5]-n[t][6];m=n[t][5]+n[t][6];l=n[t][4]+n[t][7];u=m-l;q=m+l;d=(-v*480)-(r*192);c=u*384;b=(r*480)-(v*192);a=q*256;m=z*256;l=y*256;k=x*384;j=w*256;e=j;h=m+l;g=m-l;f=k-j;z=h+e;y=g+f;x=g-f;w=h-e;v=b-d-c-a;u=(c-b)+a;r=b-a;q=a;s[o+=1]=(z+q+(1<<12))>>13;s[o+=1]=(y+r+(1<<12))>>13;s[o+=1]=(x+u+(1<<12))>>13;s[o+=1]=(w+v+(1<<12))>>13;s[o+=1]=((w-v)+(1<<12))>>13;s[o+=1]=((x-u)+(1<<12))>>13;s[o+=1]=((y-r)+(1<<12))>>13;s[o+=1]=((z-q)+(1<<12))>>13}};"use strict";jpeg.lossless.FrameHeader=jpeg.lossless.FrameHeader||function(){this.components=[];this.dimX=0;this.dimY=0;this.numComp=0;this.precision=0};jpeg.lossless.FrameHeader.prototype.read=function(f){var e=0,d,b,g,a;d=f.get16();e+=2;this.precision=f.get8();e+=1;this.dimY=f.get16();e+=2;this.dimX=f.get16();e+=2;this.numComp=f.get8();e+=1;for(b=1;b<=this.numComp;b+=1){if(e>d){throw new Error("ERROR: frame format error")}g=f.get8();e+=1;if(e>=d){throw new Error("ERROR: frame format error [c>=Lf]")}a=f.get8();e+=1;if(!this.components[g]){this.components[g]=new jpeg.lossless.ComponentSpec()}this.components[g].hSamp=a>>4;this.components[g].vSamp=a&15;this.components[g].quantTableSel=f.get8();e+=1}if(e!==d){throw new Error("ERROR: frame format error [Lf!=count]")}return 1};"use strict";jpeg.lossless.HuffmanTable=jpeg.lossless.HuffmanTable||function(){this.l=jpeg.lossless.Utils.createArray(4,2,16);this.th=[];this.v=jpeg.lossless.Utils.createArray(4,2,16,200);this.tc=jpeg.lossless.Utils.createArray(4,2);this.tc[0][0]=0;this.tc[1][0]=0;this.tc[2][0]=0;this.tc[3][0]=0;this.tc[0][1]=0;this.tc[1][1]=0;this.tc[2][1]=0;this.tc[3][1]=0;this.th[0]=0;this.th[1]=0;this.th[2]=0;this.th[3]=0};jpeg.lossless.HuffmanTable.MSB=2147483648;jpeg.lossless.HuffmanTable.prototype.read=function(d,h){var f=0,a,k,l,g,e,b;a=d.get16();f+=2;while(f<a){k=d.get8();f+=1;l=k&15;if(l>3){throw new Error("ERROR: Huffman table ID > 3")}g=k>>4;if(g>2){throw new Error("ERROR: Huffman table [Table class > 2 ]")}this.th[l]=1;this.tc[l][g]=1;for(e=0;e<16;e+=1){this.l[l][g][e]=d.get8();f+=1}for(e=0;e<16;e+=1){for(b=0;b<this.l[l][g][e];b+=1){if(f>a){throw new Error("ERROR: Huffman table format error [count>Lh]")}this.v[l][g][e][b]=d.get8();f+=1}}}if(f!==a){throw new Error("ERROR: Huffman table format error [count!=Lf]")}for(e=0;e<4;e+=1){for(b=0;b<2;b+=1){if(this.tc[e][b]!==0){this.buildHuffTable(h[e][b],this.l[e][b],this.v[e][b])}}}return 1};jpeg.lossless.HuffmanTable.prototype.buildHuffTable=function(b,g,c){var l,h,d,f,e,a;h=256;d=0;for(f=0;f<8;f+=1){for(e=0;e<g[f];e+=1){for(a=0;a<(h>>(f+1));a+=1){b[d]=c[f][e]|((f+1)<<8);d+=1}}}for(f=1;d<256;f+=1,d+=1){b[d]=f|jpeg.lossless.HuffmanTable.MSB}l=1;d=0;for(f=8;f<16;f+=1){for(e=0;e<g[f];e+=1){for(a=0;a<(h>>(f-7));a+=1){b[(l*256)+d]=c[f][e]|((f+1)<<8);d+=1}if(d>=256){if(d>256){this.error="ERROR: Huffman table error(1)!"}d=0;l+=1}}}};"use strict";jpeg.lossless.QuantizationTable=jpeg.lossless.QuantizationTable||function(){this.precision=[];this.tq=[];this.quantTables=jpeg.lossless.Utils.createArray(4,64);this.tq[0]=0;this.tq[1]=0;this.tq[2]=0;this.tq[3]=0};jpeg.lossless.QuantizationTable.enhanceQuantizationTable=function(c,b){var a;for(a=0;a<8;a+=1){c[b[(0*8)+a]]*=90;c[b[(4*8)+a]]*=90;c[b[(2*8)+a]]*=118;c[b[(6*8)+a]]*=49;c[b[(5*8)+a]]*=71;c[b[(1*8)+a]]*=126;c[b[(7*8)+a]]*=25;c[b[(3*8)+a]]*=106}for(a=0;a<8;a+=1){c[b[0+(8*a)]]*=90;c[b[4+(8*a)]]*=90;c[b[2+(8*a)]]*=118;c[b[6+(8*a)]]*=49;c[b[5+(8*a)]]*=71;c[b[1+(8*a)]]*=126;c[b[7+(8*a)]]*=25;c[b[3+(8*a)]]*=106}for(a=0;a<64;a+=1){c[a]>>=6}};jpeg.lossless.QuantizationTable.prototype.read=function(g,f){var e=0,d,a,c,b;d=g.get16();e+=2;while(e<d){a=g.get8();e+=1;c=a&15;if(c>3){throw new Error("ERROR: Quantization table ID > 3")}this.precision[c]=a>>4;if(this.precision[c]===0){this.precision[c]=8}else{if(this.precision[c]===1){this.precision[c]=16}else{throw new Error("ERROR: Quantization table precision error")}}this.tq[c]=1;if(this.precision[c]===8){for(b=0;b<64;b+=1){if(e>d){throw new Error("ERROR: Quantization table format error")}this.quantTables[c][b]=g.get8();e+=1}jpeg.lossless.QuantizationTable.enhanceQuantizationTable(this.quantTables[c],f)}else{for(b=0;b<64;b+=1){if(e>d){throw new Error("ERROR: Quantization table format error")}this.quantTables[c][b]=g.get16();e+=2}jpeg.lossless.QuantizationTable.enhanceQuantizationTable(this.quantTables[c],f)}}if(e!==d){throw new Error("ERROR: Quantization table error [count!=Lq]")}return 1};"use strict";jpeg.lossless.ScanComponent=jpeg.lossless.ScanComponent||function(){this.acTabSel=0;this.dcTabSel=0;this.scanCompSel=0};"use strict";jpeg.lossless.ScanHeader=jpeg.lossless.ScanHeader||function(){this.ah=0;this.al=0;this.numComp=0;this.selection=0;this.spectralEnd=0;this.components=[]};jpeg.lossless.ScanHeader.prototype.read=function(e){var d=0,c,b,a;c=e.get16();d+=2;this.numComp=e.get8();d+=1;for(b=0;b<this.numComp;b+=1){this.components[b]=new jpeg.lossless.ScanComponent();if(d>c){throw new Error("ERROR: scan header format error")}this.components[b].scanCompSel=e.get8();d+=1;a=e.get8();d+=1;this.components[b].dcTabSel=(a>>4);this.components[b].acTabSel=(a&15)}this.selection=e.get8();d+=1;this.spectralEnd=e.get8();d+=1;a=e.get8();this.ah=(a>>4);this.al=(a&15);d+=1;if(d!==c){throw new Error("ERROR: scan header format error [count!=Ns]")}return 1};"use strict";jpeg.lossless.Utils=jpeg.lossless.Utils||{};jpeg.lossless.Utils.createArray=function(d){var a=new Array(d||0),c=d;if(arguments.length>1){var b=Array.prototype.slice.call(arguments,1);while(c--){a[d-1-c]=jpeg.lossless.Utils.createArray.apply(this,b)}}return a};var moduleType = typeof module;
if ((moduleType !== 'undefined') && module.exports) {
   module.exports = jpeg;
}
var JpegImage=function(){function H(){}function N(f,m){for(var p=0,r=[],b,x,y=16;0<y&&!f[y-1];)y--;r.push({children:[],index:0});var e=r[0],k;for(b=0;b<y;b++){for(x=0;x<f[b];x++){e=r.pop();for(e.children[e.index]=m[p];0<e.index;)e=r.pop();e.index++;for(r.push(e);r.length<=b;)r.push(k={children:[],index:0}),e.children[e.index]=k.children,e=k;p++}b+1<y&&(r.push(k={children:[],index:0}),e.children[e.index]=k.children,e=k)}return r[0].children}function O(f,m,p,r,b,x,y,e,k){function c(){if(0<D)return D--,
l>>D&1;l=f[m++];if(255==l){var c=f[m++];if(c)throw"unexpected marker: "+(l<<8|c).toString(16);}D=7;return l>>>7}function d(d){for(var a;null!==(a=c());){d=d[a];if("number"===typeof d)return d;if("object"!==typeof d)throw"invalid huffman sequence";}return null}function v(d){for(var a=0;0<d;){var b=c();if(null===b)return;a=a<<1|b;d--}return a}function h(c){var d=v(c);return d>=1<<c-1?d:d+(-1<<c)+1}function a(c,a){var b=d(c.huffmanTableDC),b=0===b?0:h(b);c.blockData[a]=c.pred+=b;for(b=1;64>b;){var e=
d(c.huffmanTableAC),f=e&15,e=e>>4;if(0===f){if(15>e)break;b+=16}else b+=e,c.blockData[a+I[b]]=h(f),b++}}function t(c,b){var a=d(c.huffmanTableDC),a=0===a?0:h(a)<<k;c.blockData[b]=c.pred+=a}function q(d,b){d.blockData[b]|=c()<<k}function n(c,b){if(0<E)E--;else for(var a=x;a<=y;){var e=d(c.huffmanTableAC),f=e&15,e=e>>4;if(0===f){if(15>e){E=v(e)+(1<<e)-1;break}a+=16}else a+=e,c.blockData[b+I[a]]=h(f)*(1<<k),a++}}function u(a,b){for(var e=x,f=0;e<=y;){var g=I[e];switch(B){case 0:f=d(a.huffmanTableAC);
g=f&15;f>>=4;if(0===g)15>f?(E=v(f)+(1<<f),B=4):(f=16,B=1);else{if(1!==g)throw"invalid ACn encoding";A=h(g);B=f?2:3}continue;case 1:case 2:a.blockData[b+g]?a.blockData[b+g]+=c()<<k:(f--,0===f&&(B=2==B?3:0));break;case 3:a.blockData[b+g]?a.blockData[b+g]+=c()<<k:(a.blockData[b+g]=A<<k,B=0);break;case 4:a.blockData[b+g]&&(a.blockData[b+g]+=c()<<k)}e++}4===B&&(E--,0===E&&(B=0))}var w=p.mcusPerLine,g=m,l=0,D=0,E=0,B=0,A,J=r.length,z,C,K,L,G;e=p.progressive?0===x?0===e?t:q:0===e?n:u:a;var F=0;p=1==J?r[0].blocksPerLine*
r[0].blocksPerColumn:w*p.mcusPerColumn;b||(b=p);for(var H,M;F<p;){for(C=0;C<J;C++)r[C].pred=0;E=0;if(1==J)for(z=r[0],G=0;G<b;G++)e(z,64*((z.blocksPerLine+1)*(F/z.blocksPerLine|0)+F%z.blocksPerLine)),F++;else for(G=0;G<b;G++){for(C=0;C<J;C++)for(z=r[C],H=z.h,M=z.v,K=0;K<M;K++)for(L=0;L<H;L++)e(z,64*((z.blocksPerLine+1)*((F/w|0)*z.v+K)+(F%w*z.h+L)));F++}D=0;z=f[m]<<8|f[m+1];if(65280>=z)throw"marker was not found";if(65488<=z&&65495>=z)m+=2;else break}return m-g}function P(f,m){for(var p=m.blocksPerLine,
r=m.blocksPerColumn,b=new Int32Array(64),x=0;x<r;x++)for(var y=0;y<p;y++){for(var e=m,k=64*((m.blocksPerLine+1)*x+y),c=b,d=e.quantizationTable,v=void 0,h=void 0,a=void 0,t=void 0,q=void 0,n=void 0,u=void 0,w=void 0,g=void 0,l=void 0,l=0;64>l;l++)c[l]=e.blockData[k+l]*d[l];for(l=0;8>l;++l)d=8*l,0==c[1+d]&&0==c[2+d]&&0==c[3+d]&&0==c[4+d]&&0==c[5+d]&&0==c[6+d]&&0==c[7+d]?(g=5793*c[0+d]+512>>10,c[0+d]=g,c[1+d]=g,c[2+d]=g,c[3+d]=g,c[4+d]=g,c[5+d]=g,c[6+d]=g,c[7+d]=g):(v=5793*c[0+d]+128>>8,h=5793*c[4+d]+
128>>8,a=c[2+d],t=c[6+d],q=2896*(c[1+d]-c[7+d])+128>>8,w=2896*(c[1+d]+c[7+d])+128>>8,n=c[3+d]<<4,u=c[5+d]<<4,g=v-h+1>>1,v=v+h+1>>1,h=g,g=3784*a+1567*t+128>>8,a=1567*a-3784*t+128>>8,t=g,g=q-u+1>>1,q=q+u+1>>1,u=g,g=w+n+1>>1,n=w-n+1>>1,w=g,g=v-t+1>>1,v=v+t+1>>1,t=g,g=h-a+1>>1,h=h+a+1>>1,a=g,g=2276*q+3406*w+2048>>12,q=3406*q-2276*w+2048>>12,w=g,g=799*n+4017*u+2048>>12,n=4017*n-799*u+2048>>12,u=g,c[0+d]=v+w,c[7+d]=v-w,c[1+d]=h+u,c[6+d]=h-u,c[2+d]=a+n,c[5+d]=a-n,c[3+d]=t+q,c[4+d]=t-q);for(l=0;8>l;++l)d=
l,0==c[8+d]&&0==c[16+d]&&0==c[24+d]&&0==c[32+d]&&0==c[40+d]&&0==c[48+d]&&0==c[56+d]?(g=5793*c[l+0]+8192>>14,c[0+d]=g,c[8+d]=g,c[16+d]=g,c[24+d]=g,c[32+d]=g,c[40+d]=g,c[48+d]=g,c[56+d]=g):(v=5793*c[0+d]+2048>>12,h=5793*c[32+d]+2048>>12,a=c[16+d],t=c[48+d],q=2896*(c[8+d]-c[56+d])+2048>>12,w=2896*(c[8+d]+c[56+d])+2048>>12,n=c[24+d],u=c[40+d],g=v-h+1>>1,v=v+h+1>>1,h=g,g=3784*a+1567*t+2048>>12,a=1567*a-3784*t+2048>>12,t=g,g=q-u+1>>1,q=q+u+1>>1,u=g,g=w+n+1>>1,n=w-n+1>>1,w=g,g=v-t+1>>1,v=v+t+1>>1,t=g,g=
h-a+1>>1,h=h+a+1>>1,a=g,g=2276*q+3406*w+2048>>12,q=3406*q-2276*w+2048>>12,w=g,g=799*n+4017*u+2048>>12,n=4017*n-799*u+2048>>12,u=g,c[0+d]=v+w,c[56+d]=v-w,c[8+d]=h+u,c[48+d]=h-u,c[16+d]=a+n,c[40+d]=a-n,c[24+d]=t+q,c[32+d]=t-q);for(l=0;64>l;++l)v=k+l,h=c[l],h=h<=-2056/e.bitConversion?0:h>=2024/e.bitConversion?255/e.bitConversion:h+2056/e.bitConversion>>4,e.blockData[v]=h}return m.blockData}function A(f){return 0>=f?0:255<=f?255:f|0}var I=new Int32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,
26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]);H.prototype={load:function(f){var m=function(b){this.parse(b);if(this.onload)this.onload()}.bind(this);if(-1<f.indexOf("data:")){var p=f.indexOf("base64,")+7;f=atob(f.substring(p));for(var p=new Uint8Array(f.length),r=f.length-1;0<=r;r--)p[r]=f.charCodeAt(r);m(f)}else{var b=new XMLHttpRequest;b.open("GET",f,!0);b.responseType="arraybuffer";b.onload=function(){var f=
new Uint8Array(b.response);m(f)}.bind(this);b.send(null)}},parse:function(f){function m(){var a=f[b]<<8|f[b+1];b+=2;return a}function p(){var a=m(),a=f.subarray(b,b+a-2);b+=a.length;return a}function r(a){for(var b=Math.ceil(a.samplesPerLine/8/a.maxH),c=Math.ceil(a.scanLines/8/a.maxV),d=0;d<a.components.length;d++){l=a.components[d];var e=Math.ceil(Math.ceil(a.samplesPerLine/8)*l.h/a.maxH),f=Math.ceil(Math.ceil(a.scanLines/8)*l.v/a.maxV);l.blockData=new Int16Array(64*c*l.v*(b*l.h+1));l.blocksPerLine=
e;l.blocksPerColumn=f}a.mcusPerLine=b;a.mcusPerColumn=c}var b=0,x=null,y=null,e,k,c=[],d=[],v=[],h=m();if(65496!=h)throw"SOI not found";for(h=m();65497!=h;){var a,t;switch(h){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:a=p();65504===h&&74===a[0]&&70===a[1]&&73===a[2]&&70===a[3]&&0===a[4]&&(x={version:{major:a[5],minor:a[6]},densityUnits:a[7],xDensity:a[8]<<
8|a[9],yDensity:a[10]<<8|a[11],thumbWidth:a[12],thumbHeight:a[13],thumbData:a.subarray(14,14+3*a[12]*a[13])});65518===h&&65===a[0]&&100===a[1]&&111===a[2]&&98===a[3]&&101===a[4]&&0===a[5]&&(y={version:a[6],flags0:a[7]<<8|a[8],flags1:a[9]<<8|a[10],transformCode:a[11]});break;case 65499:for(h=m()+b-2;b<h;){var q=f[b++],n=new Int32Array(64);if(0===q>>4)for(a=0;64>a;a++){var u=I[a];n[u]=f[b++]}else if(1===q>>4)for(a=0;64>a;a++)u=I[a],n[u]=m();else throw"DQT: invalid table spec";c[q&15]=n}break;case 65472:case 65473:case 65474:if(e)throw"Only single frame JPEGs supported";
m();e={};e.extended=65473===h;e.progressive=65474===h;e.precision=f[b++];e.scanLines=m();e.samplesPerLine=m();e.components=[];e.componentIds={};a=f[b++];for(h=u=n=0;h<a;h++){q=f[b];t=f[b+1]>>4;var w=f[b+1]&15;n<t&&(n=t);u<w&&(u=w);var g=f[b+2];t=e.components.push({h:t,v:w,quantizationTable:c[g],quantizationTableId:g,bitConversion:255/((1<<e.precision)-1)});e.componentIds[q]=t-1;b+=3}e.maxH=n;e.maxV=u;r(e);break;case 65476:q=m();for(h=2;h<q;){n=f[b++];u=new Uint8Array(16);for(a=t=0;16>a;a++,b++)t+=
u[a]=f[b];w=new Uint8Array(t);for(a=0;a<t;a++,b++)w[a]=f[b];h+=17+t;(0===n>>4?v:d)[n&15]=N(u,w)}break;case 65501:m();k=m();break;case 65498:m();q=f[b++];a=[];for(var l,h=0;h<q;h++)n=e.componentIds[f[b++]],l=e.components[n],n=f[b++],l.huffmanTableDC=v[n>>4],l.huffmanTableAC=d[n&15],a.push(l);h=f[b++];q=f[b++];n=f[b++];h=O(f,b,e,a,k,h,q,n>>4,n&15);b+=h;break;default:if(255==f[b-3]&&192<=f[b-2]&&254>=f[b-2])b-=3;else throw"unknown JPEG marker "+h.toString(16);}h=m()}this.width=e.samplesPerLine;this.height=
e.scanLines;this.jfif=x;this.adobe=y;this.components=[];for(h=0;h<e.components.length;h++)l=e.components[h],l.quantizationTable||null==l.quantizationTableId||(l.quantizationTable=c[l.quantizationTableId]),this.components.push({output:P(e,l),scaleX:l.h/e.maxH,scaleY:l.v/e.maxV,blocksPerLine:l.blocksPerLine,blocksPerColumn:l.blocksPerColumn})},getData:function(f,m){var p=this.width/f,r=this.height/m,b,x,y,e,k,c=0,d,v=this.components.length,h=f*m*v,a=new Uint16Array(h);d=new Uint16Array((this.components[0].blocksPerLine<<
3)*this.components[0].blocksPerColumn*8);for(k=0;k<v;k++){b=this.components[k];x=b.blocksPerLine;y=b.blocksPerColumn;for(var t=x<<3,q,n=0,u=0;u<y;u++)for(var w=u<<3,g=0;g<x;g++){var l=64*((b.blocksPerLine+1)*u+g),c=0,D=g<<3;for(e=0;8>e;e++)for(n=(w+e)*t,q=0;8>q;q++)d[n+D+q]=b.output[l+c++]}x=b.scaleX*p;b=b.scaleY*r;c=k;for(e=0;e<m;e++)for(y=0;y<f;y++)n=0|e*b,q=0|y*x,q=n*t+q,a[c]=d[q],c+=v}switch(v){case 1:case 2:break;case 3:k=!0;this.adobe&&this.adobe.transformCode?k=!0:"undefined"!==typeof this.colorTransform&&
(k=!!this.colorTransform);if(k)for(k=0;k<h;k+=v)p=a[k],r=a[k+1],d=a[k+2],c=A(p-179.456+1.402*d),d=A(p+135.459-.344*r-.714*d),p=A(p-226.816+1.772*r),a[k]=c,a[k+1]=d,a[k+2]=p;break;case 4:if(!this.adobe)throw"Unsupported color mode (4 components)";k=!1;this.adobe&&this.adobe.transformCode?k=!0:"undefined"!==typeof this.colorTransform&&(k=!!this.colorTransform);if(k)for(k=0;k<h;k+=v)p=a[k],r=a[k+1],d=a[k+2],c=A(434.456-p-1.402*d),d=A(119.541-p+.344*r+.714*d),p=A(481.816-p-1.772*r),a[k]=c,a[k+1]=d,a[k+
2]=p;break;default:throw"Unsupported color mode";}return a},copyToImageData:function(f){var m=f.width,p=f.height,r=m*p*4;f=f.data;var m=this.getData(m,p),b=p=0,x,y,e,k,c;switch(this.components.length){case 1:for(;b<r;)e=m[p++],f[b++]=e,f[b++]=e,f[b++]=e,f[b++]=255;break;case 3:for(;b<r;)k=m[p++],c=m[p++],e=m[p++],f[b++]=k,f[b++]=c,f[b++]=e,f[b++]=255;break;case 4:for(;b<r;)k=m[p++],c=m[p++],e=m[p++],x=m[p++],x=255-x,y=x/255,k=A(x-k*y),c=A(x-c*y),e=A(x-e*y),f[b++]=k,f[b++]=c,f[b++]=e,f[b++]=255;break;
default:throw"Unsupported color mode";}}};return H}();

var daikon=daikon||{};daikon.RLE=daikon.RLE||function(){this.rawData=null;this.numSegments=this.segElemPut=this.bytesPut=this.bytesRead=0;this.segmentOffsets=[];this.littleEndian=!0;this.size=this.numElements=this.segmentIndex=0;this.output=null};daikon.RLE.HEADER_SIZE=64;
daikon.RLE.prototype.decode=function(a,b,d){this.rawData=new DataView(a);this.littleEndian=b;this.numElements=d;this.readHeader();this.output=new DataView(new ArrayBuffer(this.size));for(a=0;a<this.numSegments;a+=1)this.readNextSegment();return this.processData()};
daikon.RLE.prototype.processData=function(){var a,b,d,c;if(1===this.numSegments)return this.output;if(2===this.numSegments){c=new DataView(new ArrayBuffer(this.size));for(a=0;a<this.numElements;a+=1)b=this.output.getInt8(a),d=this.output.getInt8(a+this.numElements),b=(b&255)<<8|d&255,c.setInt16(2*a,b,this.littleEndian);return c}if(3===this.numSegments){c=new DataView(new ArrayBuffer(this.size));b=2*this.numElements;for(a=0;a<this.numElements;a+=1)c.setInt8(3*a,this.output.getInt8(a)),c.setInt8(3*
a+1,this.output.getInt8(a+this.numElements)),c.setInt8(3*a+2,this.output.getInt8(a+b));return c}throw Error("RLE data with "+this.numSegments+" segments is not supported!");};daikon.RLE.prototype.readHeader=function(){var a;this.numSegments=this.getInt32();this.size=this.numElements*this.numSegments;for(a=0;a<this.numSegments;a+=1)this.segmentOffsets[a]=this.getInt32();this.bytesRead=daikon.RLE.HEADER_SIZE};
daikon.RLE.prototype.hasValidInput=function(){return this.bytesRead<this.rawData.buffer.byteLength&&this.bytesPut<this.size&&this.segElemPut<this.numElements};daikon.RLE.prototype.readNextSegment=function(){var a;this.bytesRead=this.segmentOffsets[this.segmentIndex];for(this.segElemPut=0;this.hasValidInput();)a=this.get(),0<=a&&128>a?this.readLiteral(a):-1>=a&&-128<a?this.readEncoded(a):-128===a&&console.warn("RLE: unsupported code!");this.segmentIndex+=1};
daikon.RLE.prototype.readLiteral=function(a){var b=a+1;if(this.hasValidInput())for(a=0;a<b;a+=1)this.put(this.get());else console.warn("RLE: insufficient data!")};daikon.RLE.prototype.readEncoded=function(a){var b=1-a,d=this.get();for(a=0;a<b;a+=1)this.put(d)};daikon.RLE.prototype.getInt32=function(){var a=this.rawData.getInt32(this.bytesRead,this.littleEndian);this.bytesRead+=4;return a};
daikon.RLE.prototype.getInt16=function(){var a=this.rawData.getInt16(this.bytesRead,this.littleEndian);this.bytesRead+=2;return a};daikon.RLE.prototype.get=function(){var a=this.rawData.getInt8(this.bytesRead);this.bytesRead+=1;return a};daikon.RLE.prototype.put=function(a){this.output.setInt8(this.bytesPut,a);this.bytesPut+=1;this.segElemPut+=1};

/*pako*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.pako=e()}}(function(){return function e(t,i,n){function a(o,s){if(!i[o]){if(!t[o]){var f="function"==typeof require&&require;if(!s&&f)return f(o,!0);if(r)return r(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var d=i[o]={exports:{}};t[o][0].call(d.exports,function(e){var i=t[o][1][e];return a(i?i:e)},d,d.exports,e,t,i,n)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<n.length;o++)a(n[o]);return a}({1:[function(e,t,i){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;i.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var i=t.shift();if(i){if("object"!=typeof i)throw new TypeError(i+"must be non-object");for(var n in i)i.hasOwnProperty(n)&&(e[n]=i[n])}}return e},i.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var a={arraySet:function(e,t,i,n,a){if(t.subarray&&e.subarray)return void e.set(t.subarray(i,i+n),a);for(var r=0;n>r;r++)e[a+r]=t[i+r]},flattenChunks:function(e){var t,i,n,a,r,o;for(n=0,t=0,i=e.length;i>t;t++)n+=e[t].length;for(o=new Uint8Array(n),a=0,t=0,i=e.length;i>t;t++)r=e[t],o.set(r,a),a+=r.length;return o}},r={arraySet:function(e,t,i,n,a){for(var r=0;n>r;r++)e[a+r]=t[i+r]},flattenChunks:function(e){return[].concat.apply([],e)}};i.setTyped=function(e){e?(i.Buf8=Uint8Array,i.Buf16=Uint16Array,i.Buf32=Int32Array,i.assign(i,a)):(i.Buf8=Array,i.Buf16=Array,i.Buf32=Array,i.assign(i,r))},i.setTyped(n)},{}],2:[function(e,t,i){"use strict";function n(e,t){if(65537>t&&(e.subarray&&o||!e.subarray&&r))return String.fromCharCode.apply(null,a.shrinkBuf(e,t));for(var i="",n=0;t>n;n++)i+=String.fromCharCode(e[n]);return i}var a=e("./common"),r=!0,o=!0;try{String.fromCharCode.apply(null,[0])}catch(s){r=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(s){o=!1}for(var f=new a.Buf8(256),l=0;256>l;l++)f[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1;f[254]=f[254]=1,i.string2buf=function(e){var t,i,n,r,o,s=e.length,f=0;for(r=0;s>r;r++)i=e.charCodeAt(r),55296===(64512&i)&&s>r+1&&(n=e.charCodeAt(r+1),56320===(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),r++)),f+=128>i?1:2048>i?2:65536>i?3:4;for(t=new a.Buf8(f),o=0,r=0;f>o;r++)i=e.charCodeAt(r),55296===(64512&i)&&s>r+1&&(n=e.charCodeAt(r+1),56320===(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),r++)),128>i?t[o++]=i:2048>i?(t[o++]=192|i>>>6,t[o++]=128|63&i):65536>i?(t[o++]=224|i>>>12,t[o++]=128|i>>>6&63,t[o++]=128|63&i):(t[o++]=240|i>>>18,t[o++]=128|i>>>12&63,t[o++]=128|i>>>6&63,t[o++]=128|63&i);return t},i.buf2binstring=function(e){return n(e,e.length)},i.binstring2buf=function(e){for(var t=new a.Buf8(e.length),i=0,n=t.length;n>i;i++)t[i]=e.charCodeAt(i);return t},i.buf2string=function(e,t){var i,a,r,o,s=t||e.length,l=new Array(2*s);for(a=0,i=0;s>i;)if(r=e[i++],128>r)l[a++]=r;else if(o=f[r],o>4)l[a++]=65533,i+=o-1;else{for(r&=2===o?31:3===o?15:7;o>1&&s>i;)r=r<<6|63&e[i++],o--;o>1?l[a++]=65533:65536>r?l[a++]=r:(r-=65536,l[a++]=55296|r>>10&1023,l[a++]=56320|1023&r)}return n(l,a)},i.utf8border=function(e,t){var i;for(t=t||e.length,t>e.length&&(t=e.length),i=t-1;i>=0&&128===(192&e[i]);)i--;return 0>i?t:0===i?t:i+f[e[i]]>t?i:t}},{"./common":1}],3:[function(e,t,i){"use strict";function n(e,t,i,n){for(var a=65535&e|0,r=e>>>16&65535|0,o=0;0!==i;){o=i>2e3?2e3:i,i-=o;do a=a+t[n++]|0,r=r+a|0;while(--o);a%=65521,r%=65521}return a|r<<16|0}t.exports=n},{}],4:[function(e,t,i){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],5:[function(e,t,i){"use strict";function n(){for(var e,t=[],i=0;256>i;i++){e=i;for(var n=0;8>n;n++)e=1&e?3988292384^e>>>1:e>>>1;t[i]=e}return t}function a(e,t,i,n){var a=r,o=n+i;e^=-1;for(var s=n;o>s;s++)e=e>>>8^a[255&(e^t[s])];return-1^e}var r=n();t.exports=a},{}],6:[function(e,t,i){"use strict";function n(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}t.exports=n},{}],7:[function(e,t,i){"use strict";var n=30,a=12;t.exports=function(e,t){var i,r,o,s,f,l,d,u,c,h,b,w,m,k,_,g,v,p,x,y,S,E,B,Z,A;i=e.state,r=e.next_in,Z=e.input,o=r+(e.avail_in-5),s=e.next_out,A=e.output,f=s-(t-e.avail_out),l=s+(e.avail_out-257),d=i.dmax,u=i.wsize,c=i.whave,h=i.wnext,b=i.window,w=i.hold,m=i.bits,k=i.lencode,_=i.distcode,g=(1<<i.lenbits)-1,v=(1<<i.distbits)-1;e:do{15>m&&(w+=Z[r++]<<m,m+=8,w+=Z[r++]<<m,m+=8),p=k[w&g];t:for(;;){if(x=p>>>24,w>>>=x,m-=x,x=p>>>16&255,0===x)A[s++]=65535&p;else{if(!(16&x)){if(0===(64&x)){p=k[(65535&p)+(w&(1<<x)-1)];continue t}if(32&x){i.mode=a;break e}e.msg="invalid literal/length code",i.mode=n;break e}y=65535&p,x&=15,x&&(x>m&&(w+=Z[r++]<<m,m+=8),y+=w&(1<<x)-1,w>>>=x,m-=x),15>m&&(w+=Z[r++]<<m,m+=8,w+=Z[r++]<<m,m+=8),p=_[w&v];i:for(;;){if(x=p>>>24,w>>>=x,m-=x,x=p>>>16&255,!(16&x)){if(0===(64&x)){p=_[(65535&p)+(w&(1<<x)-1)];continue i}e.msg="invalid distance code",i.mode=n;break e}if(S=65535&p,x&=15,x>m&&(w+=Z[r++]<<m,m+=8,x>m&&(w+=Z[r++]<<m,m+=8)),S+=w&(1<<x)-1,S>d){e.msg="invalid distance too far back",i.mode=n;break e}if(w>>>=x,m-=x,x=s-f,S>x){if(x=S-x,x>c&&i.sane){e.msg="invalid distance too far back",i.mode=n;break e}if(E=0,B=b,0===h){if(E+=u-x,y>x){y-=x;do A[s++]=b[E++];while(--x);E=s-S,B=A}}else if(x>h){if(E+=u+h-x,x-=h,y>x){y-=x;do A[s++]=b[E++];while(--x);if(E=0,y>h){x=h,y-=x;do A[s++]=b[E++];while(--x);E=s-S,B=A}}}else if(E+=h-x,y>x){y-=x;do A[s++]=b[E++];while(--x);E=s-S,B=A}for(;y>2;)A[s++]=B[E++],A[s++]=B[E++],A[s++]=B[E++],y-=3;y&&(A[s++]=B[E++],y>1&&(A[s++]=B[E++]))}else{E=s-S;do A[s++]=A[E++],A[s++]=A[E++],A[s++]=A[E++],y-=3;while(y>2);y&&(A[s++]=A[E++],y>1&&(A[s++]=A[E++]))}break}}break}}while(o>r&&l>s);y=m>>3,r-=y,m-=y<<3,w&=(1<<m)-1,e.next_in=r,e.next_out=s,e.avail_in=o>r?5+(o-r):5-(r-o),e.avail_out=l>s?257+(l-s):257-(s-l),i.hold=w,i.bits=m}},{}],8:[function(e,t,i){"use strict";function n(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function a(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new _.Buf16(320),this.work=new _.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function r(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=D,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new _.Buf32(we),t.distcode=t.distdyn=new _.Buf32(me),t.sane=1,t.back=-1,z):C}function o(e){var t;return e&&e.state?(t=e.state,t.wsize=0,t.whave=0,t.wnext=0,r(e)):C}function s(e,t){var i,n;return e&&e.state?(n=e.state,0>t?(i=0,t=-t):(i=(t>>4)+1,48>t&&(t&=15)),t&&(8>t||t>15)?C:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=i,n.wbits=t,o(e))):C}function f(e,t){var i,n;return e?(n=new a,e.state=n,n.window=null,i=s(e,t),i!==z&&(e.state=null),i):C}function l(e){return f(e,_e)}function d(e){if(ge){var t;for(m=new _.Buf32(512),k=new _.Buf32(32),t=0;144>t;)e.lens[t++]=8;for(;256>t;)e.lens[t++]=9;for(;280>t;)e.lens[t++]=7;for(;288>t;)e.lens[t++]=8;for(x(S,e.lens,0,288,m,0,e.work,{bits:9}),t=0;32>t;)e.lens[t++]=5;x(E,e.lens,0,32,k,0,e.work,{bits:5}),ge=!1}e.lencode=m,e.lenbits=9,e.distcode=k,e.distbits=5}function u(e,t,i,n){var a,r=e.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new _.Buf8(r.wsize)),n>=r.wsize?(_.arraySet(r.window,t,i-r.wsize,r.wsize,0),r.wnext=0,r.whave=r.wsize):(a=r.wsize-r.wnext,a>n&&(a=n),_.arraySet(r.window,t,i-n,a,r.wnext),n-=a,n?(_.arraySet(r.window,t,i-n,n,0),r.wnext=n,r.whave=r.wsize):(r.wnext+=a,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=a))),0}function c(e,t){var i,a,r,o,s,f,l,c,h,b,w,m,k,we,me,ke,_e,ge,ve,pe,xe,ye,Se,Ee,Be=0,Ze=new _.Buf8(4),Ae=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return C;i=e.state,i.mode===X&&(i.mode=W),s=e.next_out,r=e.output,l=e.avail_out,o=e.next_in,a=e.input,f=e.avail_in,c=i.hold,h=i.bits,b=f,w=l,ye=z;e:for(;;)switch(i.mode){case D:if(0===i.wrap){i.mode=W;break}for(;16>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(2&i.wrap&&35615===c){i.check=0,Ze[0]=255&c,Ze[1]=c>>>8&255,i.check=v(i.check,Ze,2,0),c=0,h=0,i.mode=F;break}if(i.flags=0,i.head&&(i.head.done=!1),!(1&i.wrap)||(((255&c)<<8)+(c>>8))%31){e.msg="incorrect header check",i.mode=ce;break}if((15&c)!==U){e.msg="unknown compression method",i.mode=ce;break}if(c>>>=4,h-=4,xe=(15&c)+8,0===i.wbits)i.wbits=xe;else if(xe>i.wbits){e.msg="invalid window size",i.mode=ce;break}i.dmax=1<<xe,e.adler=i.check=1,i.mode=512&c?q:X,c=0,h=0;break;case F:for(;16>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(i.flags=c,(255&i.flags)!==U){e.msg="unknown compression method",i.mode=ce;break}if(57344&i.flags){e.msg="unknown header flags set",i.mode=ce;break}i.head&&(i.head.text=c>>8&1),512&i.flags&&(Ze[0]=255&c,Ze[1]=c>>>8&255,i.check=v(i.check,Ze,2,0)),c=0,h=0,i.mode=L;case L:for(;32>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.head&&(i.head.time=c),512&i.flags&&(Ze[0]=255&c,Ze[1]=c>>>8&255,Ze[2]=c>>>16&255,Ze[3]=c>>>24&255,i.check=v(i.check,Ze,4,0)),c=0,h=0,i.mode=H;case H:for(;16>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.head&&(i.head.xflags=255&c,i.head.os=c>>8),512&i.flags&&(Ze[0]=255&c,Ze[1]=c>>>8&255,i.check=v(i.check,Ze,2,0)),c=0,h=0,i.mode=M;case M:if(1024&i.flags){for(;16>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.length=c,i.head&&(i.head.extra_len=c),512&i.flags&&(Ze[0]=255&c,Ze[1]=c>>>8&255,i.check=v(i.check,Ze,2,0)),c=0,h=0}else i.head&&(i.head.extra=null);i.mode=j;case j:if(1024&i.flags&&(m=i.length,m>f&&(m=f),m&&(i.head&&(xe=i.head.extra_len-i.length,i.head.extra||(i.head.extra=new Array(i.head.extra_len)),_.arraySet(i.head.extra,a,o,m,xe)),512&i.flags&&(i.check=v(i.check,a,m,o)),f-=m,o+=m,i.length-=m),i.length))break e;i.length=0,i.mode=K;case K:if(2048&i.flags){if(0===f)break e;m=0;do xe=a[o+m++],i.head&&xe&&i.length<65536&&(i.head.name+=String.fromCharCode(xe));while(xe&&f>m);if(512&i.flags&&(i.check=v(i.check,a,m,o)),f-=m,o+=m,xe)break e}else i.head&&(i.head.name=null);i.length=0,i.mode=P;case P:if(4096&i.flags){if(0===f)break e;m=0;do xe=a[o+m++],i.head&&xe&&i.length<65536&&(i.head.comment+=String.fromCharCode(xe));while(xe&&f>m);if(512&i.flags&&(i.check=v(i.check,a,m,o)),f-=m,o+=m,xe)break e}else i.head&&(i.head.comment=null);i.mode=Y;case Y:if(512&i.flags){for(;16>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(c!==(65535&i.check)){e.msg="header crc mismatch",i.mode=ce;break}c=0,h=0}i.head&&(i.head.hcrc=i.flags>>9&1,i.head.done=!0),e.adler=i.check=0,i.mode=X;break;case q:for(;32>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}e.adler=i.check=n(c),c=0,h=0,i.mode=G;case G:if(0===i.havedict)return e.next_out=s,e.avail_out=l,e.next_in=o,e.avail_in=f,i.hold=c,i.bits=h,N;e.adler=i.check=1,i.mode=X;case X:if(t===Z||t===A)break e;case W:if(i.last){c>>>=7&h,h-=7&h,i.mode=le;break}for(;3>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}switch(i.last=1&c,c>>>=1,h-=1,3&c){case 0:i.mode=J;break;case 1:if(d(i),i.mode=ie,t===A){c>>>=2,h-=2;break e}break;case 2:i.mode=$;break;case 3:e.msg="invalid block type",i.mode=ce}c>>>=2,h-=2;break;case J:for(c>>>=7&h,h-=7&h;32>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if((65535&c)!==(c>>>16^65535)){e.msg="invalid stored block lengths",i.mode=ce;break}if(i.length=65535&c,c=0,h=0,i.mode=Q,t===A)break e;case Q:i.mode=V;case V:if(m=i.length){if(m>f&&(m=f),m>l&&(m=l),0===m)break e;_.arraySet(r,a,o,m,s),f-=m,o+=m,l-=m,s+=m,i.length-=m;break}i.mode=X;break;case $:for(;14>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(i.nlen=(31&c)+257,c>>>=5,h-=5,i.ndist=(31&c)+1,c>>>=5,h-=5,i.ncode=(15&c)+4,c>>>=4,h-=4,i.nlen>286||i.ndist>30){e.msg="too many length or distance symbols",i.mode=ce;break}i.have=0,i.mode=ee;case ee:for(;i.have<i.ncode;){for(;3>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.lens[Ae[i.have++]]=7&c,c>>>=3,h-=3}for(;i.have<19;)i.lens[Ae[i.have++]]=0;if(i.lencode=i.lendyn,i.lenbits=7,Se={bits:i.lenbits},ye=x(y,i.lens,0,19,i.lencode,0,i.work,Se),i.lenbits=Se.bits,ye){e.msg="invalid code lengths set",i.mode=ce;break}i.have=0,i.mode=te;case te:for(;i.have<i.nlen+i.ndist;){for(;Be=i.lencode[c&(1<<i.lenbits)-1],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(h>=me);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(16>_e)c>>>=me,h-=me,i.lens[i.have++]=_e;else{if(16===_e){for(Ee=me+2;Ee>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(c>>>=me,h-=me,0===i.have){e.msg="invalid bit length repeat",i.mode=ce;break}xe=i.lens[i.have-1],m=3+(3&c),c>>>=2,h-=2}else if(17===_e){for(Ee=me+3;Ee>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}c>>>=me,h-=me,xe=0,m=3+(7&c),c>>>=3,h-=3}else{for(Ee=me+7;Ee>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}c>>>=me,h-=me,xe=0,m=11+(127&c),c>>>=7,h-=7}if(i.have+m>i.nlen+i.ndist){e.msg="invalid bit length repeat",i.mode=ce;break}for(;m--;)i.lens[i.have++]=xe}}if(i.mode===ce)break;if(0===i.lens[256]){e.msg="invalid code -- missing end-of-block",i.mode=ce;break}if(i.lenbits=9,Se={bits:i.lenbits},ye=x(S,i.lens,0,i.nlen,i.lencode,0,i.work,Se),i.lenbits=Se.bits,ye){e.msg="invalid literal/lengths set",i.mode=ce;break}if(i.distbits=6,i.distcode=i.distdyn,Se={bits:i.distbits},ye=x(E,i.lens,i.nlen,i.ndist,i.distcode,0,i.work,Se),i.distbits=Se.bits,ye){e.msg="invalid distances set",i.mode=ce;break}if(i.mode=ie,t===A)break e;case ie:i.mode=ne;case ne:if(f>=6&&l>=258){e.next_out=s,e.avail_out=l,e.next_in=o,e.avail_in=f,i.hold=c,i.bits=h,p(e,w),s=e.next_out,r=e.output,l=e.avail_out,o=e.next_in,a=e.input,f=e.avail_in,c=i.hold,h=i.bits,i.mode===X&&(i.back=-1);break}for(i.back=0;Be=i.lencode[c&(1<<i.lenbits)-1],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(h>=me);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(ke&&0===(240&ke)){for(ge=me,ve=ke,pe=_e;Be=i.lencode[pe+((c&(1<<ge+ve)-1)>>ge)],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(h>=ge+me);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}c>>>=ge,h-=ge,i.back+=ge}if(c>>>=me,h-=me,i.back+=me,i.length=_e,0===ke){i.mode=fe;break}if(32&ke){i.back=-1,i.mode=X;break}if(64&ke){e.msg="invalid literal/length code",i.mode=ce;break}i.extra=15&ke,i.mode=ae;case ae:if(i.extra){for(Ee=i.extra;Ee>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.length+=c&(1<<i.extra)-1,c>>>=i.extra,h-=i.extra,i.back+=i.extra}i.was=i.length,i.mode=re;case re:for(;Be=i.distcode[c&(1<<i.distbits)-1],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(h>=me);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(0===(240&ke)){for(ge=me,ve=ke,pe=_e;Be=i.distcode[pe+((c&(1<<ge+ve)-1)>>ge)],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(h>=ge+me);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}c>>>=ge,h-=ge,i.back+=ge}if(c>>>=me,h-=me,i.back+=me,64&ke){e.msg="invalid distance code",i.mode=ce;break}i.offset=_e,i.extra=15&ke,i.mode=oe;case oe:if(i.extra){for(Ee=i.extra;Ee>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.offset+=c&(1<<i.extra)-1,c>>>=i.extra,h-=i.extra,i.back+=i.extra}if(i.offset>i.dmax){e.msg="invalid distance too far back",i.mode=ce;break}i.mode=se;case se:if(0===l)break e;if(m=w-l,i.offset>m){if(m=i.offset-m,m>i.whave&&i.sane){e.msg="invalid distance too far back",i.mode=ce;break}m>i.wnext?(m-=i.wnext,k=i.wsize-m):k=i.wnext-m,m>i.length&&(m=i.length),we=i.window}else we=r,k=s-i.offset,m=i.length;m>l&&(m=l),l-=m,i.length-=m;do r[s++]=we[k++];while(--m);0===i.length&&(i.mode=ne);break;case fe:if(0===l)break e;r[s++]=i.length,l--,i.mode=ne;break;case le:if(i.wrap){for(;32>h;){if(0===f)break e;f--,c|=a[o++]<<h,h+=8}if(w-=l,e.total_out+=w,i.total+=w,w&&(e.adler=i.check=i.flags?v(i.check,r,w,s-w):g(i.check,r,w,s-w)),w=l,(i.flags?c:n(c))!==i.check){e.msg="incorrect data check",i.mode=ce;break}c=0,h=0}i.mode=de;case de:if(i.wrap&&i.flags){for(;32>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(c!==(4294967295&i.total)){e.msg="incorrect length check",i.mode=ce;break}c=0,h=0}i.mode=ue;case ue:ye=R;break e;case ce:ye=O;break e;case he:return I;case be:default:return C}return e.next_out=s,e.avail_out=l,e.next_in=o,e.avail_in=f,i.hold=c,i.bits=h,(i.wsize||w!==e.avail_out&&i.mode<ce&&(i.mode<le||t!==B))&&u(e,e.output,e.next_out,w-e.avail_out)?(i.mode=he,I):(b-=e.avail_in,w-=e.avail_out,e.total_in+=b,e.total_out+=w,i.total+=w,i.wrap&&w&&(e.adler=i.check=i.flags?v(i.check,r,w,e.next_out-w):g(i.check,r,w,e.next_out-w)),e.data_type=i.bits+(i.last?64:0)+(i.mode===X?128:0)+(i.mode===ie||i.mode===Q?256:0),(0===b&&0===w||t===B)&&ye===z&&(ye=T),ye)}function h(e){if(!e||!e.state)return C;var t=e.state;return t.window&&(t.window=null),e.state=null,z}function b(e,t){var i;return e&&e.state?(i=e.state,0===(2&i.wrap)?C:(i.head=t,t.done=!1,z)):C}function w(e,t){var i,n,a,r=t.length;return e&&e.state?(i=e.state,0!==i.wrap&&i.mode!==G?C:i.mode===G&&(n=1,n=g(n,t,r,0),n!==i.check)?O:(a=u(e,t,r,r))?(i.mode=he,I):(i.havedict=1,z)):C}var m,k,_=e("../utils/common"),g=e("./adler32"),v=e("./crc32"),p=e("./inffast"),x=e("./inftrees"),y=0,S=1,E=2,B=4,Z=5,A=6,z=0,R=1,N=2,C=-2,O=-3,I=-4,T=-5,U=8,D=1,F=2,L=3,H=4,M=5,j=6,K=7,P=8,Y=9,q=10,G=11,X=12,W=13,J=14,Q=15,V=16,$=17,ee=18,te=19,ie=20,ne=21,ae=22,re=23,oe=24,se=25,fe=26,le=27,de=28,ue=29,ce=30,he=31,be=32,we=852,me=592,ke=15,_e=ke,ge=!0;i.inflateReset=o,i.inflateReset2=s,i.inflateResetKeep=r,i.inflateInit=l,i.inflateInit2=f,i.inflate=c,i.inflateEnd=h,i.inflateGetHeader=b,i.inflateSetDictionary=w,i.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":1,"./adler32":3,"./crc32":5,"./inffast":7,"./inftrees":9}],9:[function(e,t,i){"use strict";var n=e("../utils/common"),a=15,r=852,o=592,s=0,f=1,l=2,d=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],u=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],c=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,i,b,w,m,k,_){var g,v,p,x,y,S,E,B,Z,A=_.bits,z=0,R=0,N=0,C=0,O=0,I=0,T=0,U=0,D=0,F=0,L=null,H=0,M=new n.Buf16(a+1),j=new n.Buf16(a+1),K=null,P=0;for(z=0;a>=z;z++)M[z]=0;for(R=0;b>R;R++)M[t[i+R]]++;for(O=A,C=a;C>=1&&0===M[C];C--);if(O>C&&(O=C),0===C)return w[m++]=20971520,w[m++]=20971520,_.bits=1,0;for(N=1;C>N&&0===M[N];N++);for(N>O&&(O=N),U=1,z=1;a>=z;z++)if(U<<=1,U-=M[z],0>U)return-1;if(U>0&&(e===s||1!==C))return-1;for(j[1]=0,z=1;a>z;z++)j[z+1]=j[z]+M[z];for(R=0;b>R;R++)0!==t[i+R]&&(k[j[t[i+R]]++]=R);if(e===s?(L=K=k,S=19):e===f?(L=d,H-=257,K=u,P-=257,S=256):(L=c,K=h,S=-1),F=0,R=0,z=N,y=m,I=O,T=0,p=-1,D=1<<O,x=D-1,e===f&&D>r||e===l&&D>o)return 1;for(var Y=0;;){Y++,E=z-T,k[R]<S?(B=0,Z=k[R]):k[R]>S?(B=K[P+k[R]],Z=L[H+k[R]]):(B=96,Z=0),g=1<<z-T,v=1<<I,N=v;do v-=g,w[y+(F>>T)+v]=E<<24|B<<16|Z|0;while(0!==v);for(g=1<<z-1;F&g;)g>>=1;if(0!==g?(F&=g-1,F+=g):F=0,R++,0===--M[z]){if(z===C)break;z=t[i+k[R]]}if(z>O&&(F&x)!==p){for(0===T&&(T=O),y+=N,I=z-T,U=1<<I;C>I+T&&(U-=M[I+T],!(0>=U));)I++,U<<=1;if(D+=1<<I,e===f&&D>r||e===l&&D>o)return 1;p=F&x,w[p]=O<<24|I<<16|y-m|0}}return 0!==F&&(w[y+F]=z-T<<24|64<<16|0),_.bits=O,0}},{"../utils/common":1}],10:[function(e,t,i){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],11:[function(e,t,i){"use strict";function n(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}t.exports=n},{}],"/lib/inflate.js":[function(e,t,i){"use strict";function n(e){if(!(this instanceof n))return new n(e);this.options=s.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0===(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new u,this.strm.avail_out=0;var i=o.inflateInit2(this.strm,t.windowBits);if(i!==l.Z_OK)throw new Error(d[i]);this.header=new c,o.inflateGetHeader(this.strm,this.header)}function a(e,t){var i=new n(t);if(i.push(e,!0),i.err)throw i.msg;return i.result}function r(e,t){return t=t||{},t.raw=!0,a(e,t)}var o=e("./zlib/inflate"),s=e("./utils/common"),f=e("./utils/strings"),l=e("./zlib/constants"),d=e("./zlib/messages"),u=e("./zlib/zstream"),c=e("./zlib/gzheader"),h=Object.prototype.toString;n.prototype.push=function(e,t){var i,n,a,r,d,u,c=this.strm,b=this.options.chunkSize,w=this.options.dictionary,m=!1;if(this.ended)return!1;n=t===~~t?t:t===!0?l.Z_FINISH:l.Z_NO_FLUSH,"string"==typeof e?c.input=f.binstring2buf(e):"[object ArrayBuffer]"===h.call(e)?c.input=new Uint8Array(e):c.input=e,c.next_in=0,c.avail_in=c.input.length;do{if(0===c.avail_out&&(c.output=new s.Buf8(b),c.next_out=0,c.avail_out=b),i=o.inflate(c,l.Z_NO_FLUSH),i===l.Z_NEED_DICT&&w&&(u="string"==typeof w?f.string2buf(w):"[object ArrayBuffer]"===h.call(w)?new Uint8Array(w):w,i=o.inflateSetDictionary(this.strm,u)),i===l.Z_BUF_ERROR&&m===!0&&(i=l.Z_OK,m=!1),i!==l.Z_STREAM_END&&i!==l.Z_OK)return this.onEnd(i),this.ended=!0,!1;c.next_out&&(0!==c.avail_out&&i!==l.Z_STREAM_END&&(0!==c.avail_in||n!==l.Z_FINISH&&n!==l.Z_SYNC_FLUSH)||("string"===this.options.to?(a=f.utf8border(c.output,c.next_out),r=c.next_out-a,d=f.buf2string(c.output,a),c.next_out=r,c.avail_out=b-r,r&&s.arraySet(c.output,c.output,a,r,0),this.onData(d)):this.onData(s.shrinkBuf(c.output,c.next_out)))),0===c.avail_in&&0===c.avail_out&&(m=!0)}while((c.avail_in>0||0===c.avail_out)&&i!==l.Z_STREAM_END);return i===l.Z_STREAM_END&&(n=l.Z_FINISH),n===l.Z_FINISH?(i=o.inflateEnd(this.strm),this.onEnd(i),this.ended=!0,i===l.Z_OK):n===l.Z_SYNC_FLUSH?(this.onEnd(l.Z_OK),c.avail_out=0,!0):!0},n.prototype.onData=function(e){this.chunks.push(e)},n.prototype.onEnd=function(e){e===l.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},i.Inflate=n,i.inflate=a,i.inflateRaw=r,i.ungzip=a},{"./utils/common":1,"./utils/strings":2,"./zlib/constants":4,"./zlib/gzheader":6,"./zlib/inflate":8,"./zlib/messages":10,"./zlib/zstream":11}]},{},[])("/lib/inflate.js")});

/*viewer/ext/openjpeg/openjpeg.js*/

var H=void 0,I=!0,W=null,Y=!1;
this.openjpeg=function(ei,xb){function Na(){}var Tb,Ub,ka,fa,bb,Fa,cb,Vb,db,eb,Wb,Qc,Rc,Sc;function fi(a){eval.call(W,a)}function yb(a){Na(a+":\n"+Error().stack);throw"Assertion: "+a;}function D(a,d){a||yb("Assertion failed: "+d)}function Tc(c,d,e){e=e||"i8";e[e.length-1]==="*"&&(e="i32");switch(e){case "i1":p[c]=d;break;case "i8":p[c]=d;break;case "i16":q[c>>1]=d;break;case "i32":a[c>>2]=d;break;case "i64":a[c>>2]=d[0];a[c+4>>2]=d[1];break;case "float":u[c>>2]=d;break;case "double":ha[0]=d;a[c>>
2]=P[0];a[c+4>>2]=P[1];break;default:yb("invalid type for setValue: "+e)}}function Xb(c,d){d=d||"i8";d[d.length-1]==="*"&&(d="i32");switch(d){case "i1":return p[c];case "i8":return p[c];case "i16":return q[c>>1];case "i32":return a[c>>2];case "i64":return[T[c>>2],T[c+4>>2]];case "float":return u[c>>2];case "double":return P[0]=a[c>>2],P[1]=a[c+4>>2],ha[0];default:yb("invalid type for setValue: "+d)}return W}function h(a,d,e){var b,f;typeof a==="number"?(b=I,f=a):(b=Y,f=a.length);for(var e=[z,K.va,
K.J][e===H?k:e](Math.max(f,1)),g=typeof d==="string"?d:W,j=0,l;j<f;){var v=b?0:a[j];typeof v==="function"&&(v=K.Ga(v));l=g||d[j];l===0?j++:(D(l,"Must know what type to store in allocate!"),l=="i64"&&(l="i32"),Tc(e+j,v,l),j+=K.H(l))}return e}function Ga(a){for(var d="",e=0,b,f=String.fromCharCode(0);;){b=String.fromCharCode(U[a+e]);if(b==f)break;d+=b;e+=1}return d}function Uc(a,d){return Array.prototype.slice.call(p.subarray(a,a+d))}function xa(a){for(var d=0;p[a+d];)d++;return d}function Vc(a,d){var e=
xa(a);d&&e++;var b=Uc(a,e);d&&(b[e-1]=0);return b}function qa(a,d){for(var e=[],b=0;b<a.length;){var f=a.charCodeAt(b);f>255&&(D(Y,"Character code "+f+" ("+a[b]+")  at offset "+b+" not in 0x00-0xFF."),f&=255);e.push(f);b+=1}d||e.push(0);return e}function zb(a,d){return a>=0?a:d<=32?2*Math.abs(1<<d-1)+a:Math.pow(2,d)+a}function Wc(a,d){if(a<=0)return a;var e=d<=32?Math.abs(1<<d-1):Math.pow(2,d-1);if(a>=e&&(d<=32||a>e))a=-2*e+a;return a}function Yb(c,d,e){a[c>>2]=d;a[c+4>>2]=d+e;a[c+8>>2]=d;a[c+12>>
2]=0;a[c+16>>2]=0}function Xc(c){var d,e;a[c+12>>2]=a[c+12>>2]<<8&65535;a[c+16>>2]=(a[c+12>>2]|0)==65280?7:8;d=T[c+8>>2]>>>0>=T[c+4>>2]>>>0?1:2;d==1?e=1:d==2&&(d=a[c+8>>2],a[c+8>>2]=d+1,a[c+12>>2]|=U[d]&255,e=0);return e}function R(c){return a[c+24>>2]-a[c+16>>2]}function ya(c,d){a[c+24>>2]=a[c+16>>2]+d}function Ha(c){return a[c+20>>2]-a[c+24>>2]}function ra(c,d){a[c+24>>2]+=d}function ma(c,d){var e,b;b=0;e=d-1;a:for(;;){if(!((e|0)>=0))break a;var f=c;((a[f+16>>2]|0)==0?1:2)==1&&Xc(f);a[f+16>>2]-=
1;b+=(T[f+12>>2]>>>(T[f+16>>2]>>>0)&1)<<e;e-=1}return b}function Yc(c){var d,e;a[c+16>>2]=0;d=(a[c+12>>2]&255|0)==255?1:4;a:do if(d==1){d=(Xc(c)|0)!=0?2:3;do if(d==2){e=1;d=5;break a}else if(d==3){a[c+16>>2]=0;d=4;break a}while(0)}while(0);d==4&&(e=0);return e}function Ab(c,d,e){var b,f,g,j;g=0;j=z(28);b=(j|0)!=0?2:1;a:do if(b==2){a[j>>2]=c;b=(d|0)!=0?3:5;b:do if(b==3){if((e|0)==0){b=5;break b}a[j+4>>2]=1;a[j+8>>2]=d;a[j+12>>2]=e;b=17;break b}while(0);b:do if(b==5){b=(d|0)!=0?15:6;c:do if(b==6){if((e|
0)!=0)break c;if((c|0)==0)break c;a[j+4>>2]=2;b=a[c+12>>2];b=b==0?9:b==2?10:11;do if(b==11){f=0;break a}else b==9?g=a[a[c+16>>2]+64>>2]:b==10&&(g=a[a[a[c+20>>2]+4>>2]+64>>2]);while(0);a[j+12>>2]=Math.floor((a[g+8>>2]|0)*0.1625+2E3);b=z(a[j+12>>2]);a[j+8>>2]=b;b=(a[j+8>>2]|0)!=0?14:13;do if(b==14){b=17;break b}else if(b==13){F(a[j>>2],1,Zc,h(1,"i32",n));f=0;break a}while(0)}while(0);f=0;break a}while(0);a[j+16>>2]=a[j+8>>2];a[j+20>>2]=a[j+8>>2]+a[j+12>>2];a[j+24>>2]=a[j+8>>2];f=j}else b==1&&(f=0);
while(0);return f}function r(c,d){var e,b;b=0;e=d-1;a:for(;;){if(!((e|0)>=0))break a;var f=c,g=H,j=H,g=T[f+24>>2]>>>0>=T[f+20>>2]>>>0?1:2;g==1?(F(a[f>>2],1,$c,h([a[f+16>>2],0,0,0,a[f+24>>2],0,0,0,a[f+20>>2],0,0,0],["i8*",0,0,0,"i8*",0,0,0,"i8*",0,0,0],n)),j=0):g==2&&(g=a[f+24>>2],a[f+24>>2]=g+1,j=p[g]);b+=(j&255)<<(e<<3);e-=1}return b}function ad(c,d,e){var b=t;t+=32;D(t<X);var f=b+16,g,j,l,v,h,E,m;g=a[c+20>>2];j=a[g+8>>2]-a[g>>2];l=a[g+12>>2]-a[g+4>>2];v=a[c+8>>2]-a[c>>2];h=fb(bd(g,d)<<2);a[b>>2]=
h;a[f>>2]=a[b>>2];a:for(;;){d=h=d-1;if((h|0)==0)break a;h=a[c+24>>2];g+=124;a[b+8>>2]=j;a[f+8>>2]=l;j=a[g+8>>2]-a[g>>2];l=a[g+12>>2]-a[g+4>>2];a[b+4>>2]=j-a[b+8>>2];a[b+12>>2]=(a[g>>2]|0)%2;E=0;b:for(;;){if(!((E|0)<(l|0)))break b;cd(b,h+(E*v<<2));za[e](b);var i=h+(E*v<<2),k=a[b>>2];m=j<<2;D(m%1===0,"memcpy given "+m+" bytes to copy. Problem with quantum=1 corrections perhaps?");var n;n=k+m;if(i%4==k%4&&m>8){for(;k%4!==0&&k<n;)p[i++]=p[k++];k>>=2;i>>=2;for(m=n>>2;k<m;)a[i++]=a[k++];k<<=2;i<<=2}for(;k<
n;)p[i++]=p[k++];E+=1}a[f+4>>2]=l-a[f+8>>2];a[f+12>>2]=(a[g+4>>2]|0)%2;E=0;b:for(;;){if(!((E|0)<(j|0)))break b;dd(f,h+(E<<2),v);za[e](f);m=0;c:for(;;){if(!((m|0)<(l|0)))break c;a[h+(m*v+E<<2)>>2]=a[a[f>>2]+(m<<2)>>2];m+=1}E+=1}}t=b}function bd(c,d){var e,b,f,g,j;b=c;f=d;g=1;a:for(;;){f=e=f-1;if((e|0)==0)break a;b+=124;j=a[b+8>>2]-a[b>>2];e=(g|0)<(a[b+8>>2]-a[b>>2]|0)?3:4;e==3&&(g=j);j=a[b+12>>2]-a[b+4>>2];e=(g|0)<(a[b+12>>2]-a[b+4>>2]|0)?5:6;e==5&&(g=j)}return g}function ed(c,d){var e=t;t+=32;D(t<
X);var b,f,g=e+16,j,l,v,h,E,m,i,k;f=d;j=a[c+20>>2];l=a[j+8>>2]-a[j>>2];v=a[j+12>>2]-a[j+4>>2];h=a[c+8>>2]-a[c>>2];E=fb(bd(j,f)+5<<4);a[e>>2]=E;a[g>>2]=a[e>>2];a:for(;;){f=E=f-1;if((E|0)==0)break a;E=a[c+24>>2];m=(a[c+8>>2]-a[c>>2])*(a[c+12>>2]-a[c+4>>2]);a[e+8>>2]=l;a[g+8>>2]=v;j+=124;l=a[j+8>>2]-a[j>>2];v=a[j+12>>2]-a[j+4>>2];a[e+4>>2]=l-a[e+8>>2];a[e+12>>2]=(a[j>>2]|0)%2;i=v;b:for(;;){if(!((i|0)>3))break b;Zb(e,E,h,m);hb(e);b=l;c:for(;;){b=k=b-1;if(!((k|0)>=0))break c;u[E+(b<<2)>>2]=u[a[e>>2]+(b<<
4)>>2];u[E+(b+h<<2)>>2]=u[a[e>>2]+(b<<4)+4>>2];u[E+(b+(h<<1)<<2)>>2]=u[a[e>>2]+(b<<4)+8>>2];u[E+(b+h*3<<2)>>2]=u[a[e>>2]+(b<<4)+12>>2]}E+=h<<2<<2;m-=h<<2;i-=4}b=(v&3|0)!=0?10:18;do if(b==10){i=v&3;Zb(e,E,h,m);hb(e);k=l;c:for(;;){k=b=k-1;if(!((b|0)>=0)){b=17;break c}b=i==3?13:i==2?14:i==1?15:16;d:do if(b==13){u[E+(k+(h<<1)<<2)>>2]=u[a[e>>2]+(k<<4)+8>>2];b=14;break d}while(0);d:do if(b==14){u[E+(k+h<<2)>>2]=u[a[e>>2]+(k<<4)+4>>2];b=15;break d}while(0);b==15&&(u[E+(k<<2)>>2]=u[a[e>>2]+(k<<4)>>2])}}while(0);
a[g+4>>2]=v-a[g+8>>2];a[g+12>>2]=(a[j+4>>2]|0)%2;E=a[c+24>>2];i=l;b:for(;;){if(!((i|0)>3))break b;$b(g,E,h);hb(g);b=0;c:for(;;){if(!((b|0)<(v|0)))break c;k=E+(b*h<<2);m=a[g>>2]+(b<<4);D(I,"memcpy given 16 bytes to copy. Problem with quantum=1 corrections perhaps?");var n,o,y;n=k;o=m+16;if(n%4==m%4){for(;m%4!==0&&m<o;)p[n++]=p[m++];m>>=2;n>>=2;for(y=o>>2;m<y;)a[n++]=a[m++];m<<=2;n<<=2}for(;m<o;)p[n++]=p[m++];b+=1}E+=16;i-=4}b=(l&3|0)!=0?27:32;do if(b==27){i=l&3;$b(g,E,h);hb(g);k=0;c:for(;;){if(!((k|
0)<(v|0))){b=31;break c}n=E+(k*h<<2);m=a[g>>2]+(k<<4);y=i<<2;D(y%1===0,"memcpy given "+y+" bytes to copy. Problem with quantum=1 corrections perhaps?");o=m+y;if(n%4==m%4&&y>8){for(;m%4!==0&&m<o;)p[n++]=p[m++];m>>=2;n>>=2;for(y=o>>2;m<y;)a[n++]=a[m++];m<<=2;n<<=2}for(;m<o;)p[n++]=p[m++];k+=1}}while(0)}t=e}function Bb(a,d){var e;e=(a|0)<(d|0)?1:2;if(e==1)var b=a;else e==2&&(b=d);return b}function Zb(c,d,e,b){var f,g,j,l,v,h;g=a[c>>2]+(a[c+12>>2]<<4);j=a[c+8>>2];v=0;a:for(;;){if(!((v|0)<2))break a;f=
(j+e*3|0)<(b|0)?3:11;b:do if(f==3){if((d&15|0)!=0){f=11;break b}if((g&15|0)!=0){f=11;break b}if((e&15|0)!=0){f=11;break b}l=0;c:for(;;){if(!((l|0)<(j|0)))break c;f=l;u[g+(l<<3<<2)>>2]=u[d+(f<<2)>>2];f+=e;u[g+((l<<3)+1<<2)>>2]=u[d+(f<<2)>>2];f+=e;u[g+((l<<3)+2<<2)>>2]=u[d+(f<<2)>>2];f+=e;u[g+((l<<3)+3<<2)>>2]=u[d+(f<<2)>>2];l+=1}f=22;break b}while(0);do if(f==11){l=0;c:for(;;){if(!((l|0)<(j|0))){f=21;break c}h=l;u[g+(l<<3<<2)>>2]=u[d+(h<<2)>>2];h+=e;f=(h|0)>(b|0)?14:15;f!=14&&f==15&&(u[g+((l<<3)+1<<
2)>>2]=u[d+(h<<2)>>2],h+=e,f=(h|0)>(b|0)?16:17,f!=16&&f==17&&(u[g+((l<<3)+2<<2)>>2]=u[d+(h<<2)>>2],h+=e,f=(h|0)>(b|0)?18:19,f!=18&&f==19&&(u[g+((l<<3)+3<<2)>>2]=u[d+(h<<2)>>2])));l+=1}}while(0);g=a[c>>2]+16+(-a[c+12>>2]<<4);d+=a[c+8>>2]<<2;b-=a[c+8>>2];j=a[c+4>>2];v+=1}}function $b(c,d,e){var b,f;b=a[c>>2]+(a[c+12>>2]<<4);f=0;a:for(;;){if(!((f|0)<(a[c+8>>2]|0)))break a;var g=b+(f<<1<<4),j=d+(f*e<<2);D(I,"memcpy given 16 bytes to copy. Problem with quantum=1 corrections perhaps?");var l,v;l=j+16;if(g%
4==j%4){for(;j%4!==0&&j<l;)p[g++]=p[j++];j>>=2;g>>=2;for(v=l>>2;j<v;)a[g++]=a[j++];j<<=2;g<<=2}for(;j<l;)p[g++]=p[j++];f+=1}d+=a[c+8>>2]*e<<2;b=a[c>>2]+16+(-a[c+12>>2]<<4);f=0;a:for(;;){if(!((f|0)<(a[c+4>>2]|0)))break a;g=b+(f<<1<<4);j=d+(f*e<<2);D(I,"memcpy given 16 bytes to copy. Problem with quantum=1 corrections perhaps?");l=j+16;if(g%4==j%4){for(;j%4!==0&&j<l;)p[g++]=p[j++];j>>=2;g>>=2;for(v=l>>2;j<v;)a[g++]=a[j++];j<<=2;g<<=2}for(;j<l;)p[g++]=p[j++];f+=1}}function ac(a,d,e){var b,f,g,j,l;b=
0;a:for(;;){if(!((b|0)<(d|0)))break a;f=u[a+(b<<3<<2)>>2];g=u[a+((b<<3)+1<<2)>>2];j=u[a+((b<<3)+2<<2)>>2];l=u[a+((b<<3)+3<<2)>>2];u[a+(b<<3<<2)>>2]=f*e;u[a+((b<<3)+1<<2)>>2]=g*e;u[a+((b<<3)+2<<2)>>2]=j*e;u[a+((b<<3)+3<<2)>>2]=l*e;b+=1}}function ib(a,d,e,b,f){var g,j,l,v,h,E,m,i,k,n,p,o;g=0;a:for(;;){if(!((g|0)<(b|0)))break a;j=u[a>>2];l=u[a+4>>2];v=u[a+8>>2];a=u[a+12>>2];h=u[d-16>>2];E=u[d-12>>2];m=u[d-8>>2];i=u[d-4>>2];k=u[d>>2];n=u[d+4>>2];p=u[d+8>>2];o=u[d+12>>2];u[d-16>>2]=h+(j+k)*f;u[d-12>>2]=
E+(l+n)*f;u[d-8>>2]=m+(v+p)*f;u[d-4>>2]=i+(a+o)*f;a=d;d+=32;g+=1}g=(b|0)<(e|0)?5:10;do if(g==5){f+=f;j=u[a>>2]*f;l=u[a+4>>2]*f;v=u[a+8>>2]*f;h=u[a+12>>2]*f;b:for(;;){if(!((b|0)<(e|0))){g=9;break b}E=u[d-16>>2];m=u[d-12>>2];i=u[d-8>>2];k=u[d-4>>2];u[d-16>>2]=E+j;u[d-12>>2]=m+l;u[d-8>>2]=i+v;u[d-4>>2]=k+h;d+=32;b+=1}}while(0)}function hb(c){var d,e,b;d=(a[c+12>>2]|0)==0?1:5;a:do if(d==1){d=(a[c+4>>2]|0)>0?4:2;b:do if(d==2){if((a[c+8>>2]|0)>1)break b;d=10;break a}while(0);e=0;b=1;d=9;break a}else if(d==
5){d=(a[c+8>>2]|0)>0?8:6;b:do if(d==6){if((a[c+4>>2]|0)>1)break b;d=10;break a}while(0);e=1;b=0;d=9;break a}while(0);d==9&&(ac(a[c>>2]+(e<<4),a[c+8>>2],1.2301740646362305),ac(a[c>>2]+(b<<4),a[c+4>>2],1.625732421875),ib(a[c>>2]+(b<<4),a[c>>2]+(e<<4)+16,a[c+8>>2],Bb(a[c+8>>2],a[c+4>>2]-e),-0.4435068666934967),ib(a[c>>2]+(e<<4),a[c>>2]+(b<<4)+16,a[c+4>>2],Bb(a[c+4>>2],a[c+8>>2]-b),-0.8829110860824585),ib(a[c>>2]+(b<<4),a[c>>2]+(e<<4)+16,a[c+8>>2],Bb(a[c+8>>2],a[c+4>>2]-e),0.05298011749982834),ib(a[c>>
2]+(e<<4),a[c>>2]+(b<<4)+16,a[c+4>>2],Bb(a[c+4>>2],a[c+8>>2]-b),1.5861343145370483))}function cd(c,d){var e,b,f;e=d;b=a[c>>2]+(a[c+12>>2]<<2);f=a[c+8>>2];a:for(;;){var g=f;f=g-1;if((g|0)==0)break a;g=e;e=g+4;a[b>>2]=a[g>>2];b+=8}e=d+(a[c+8>>2]<<2);b=a[c>>2]+4+(-a[c+12>>2]<<2);f=a[c+4>>2];a:for(;;){g=f;f=g-1;if((g|0)==0)break a;g=e;e=g+4;a[b>>2]=a[g>>2];b+=8}}function dd(c,d,e){var b,f,g;b=d;f=a[c>>2]+(a[c+12>>2]<<2);g=a[c+8>>2];a:for(;;){var j=g;g=j-1;if((j|0)==0)break a;a[f>>2]=a[b>>2];f+=8;b+=e<<
2}b=d+(a[c+8>>2]*e<<2);f=a[c>>2]+4+(-a[c+12>>2]<<2);g=a[c+4>>2];a:for(;;){c=g;g=c-1;if((c|0)==0)break a;a[f>>2]=a[b>>2];f+=8;b+=e<<2}}function fd(c,d,e,b){var f,b=(b|0)!=0?37:1;do if(b==37){b=(e|0)!=0?40:38;b:do if(b==38){if((d|0)!=1){b=40;break b}a[c>>2]=(a[c>>2]|0)/2|0;b=73;break b}while(0);do if(b==40){f=0;c:for(;;){if(!((f|0)<(e|0))){b=56;break c}b=(f|0)<0?43:44;if(b==43)var g=a[c>>2];else if(b==44){b=(f|0)>=(d|0)?45:46;if(b==45)var j=a[c+(d-1<<1<<2)>>2];else b==46&&(j=a[c+(f<<1<<2)>>2]);g=j}b=
(f+1|0)<0?49:50;if(b==49)var l=a[c>>2];else if(b==50){b=(f+1|0)>=(d|0)?51:52;if(b==51)var v=a[c+(d-1<<1<<2)>>2];else b==52&&(v=a[c+(f+1<<1<<2)>>2]);l=v}a[c+((f<<1)+1<<2)>>2]-=l+(g+2)>>2;f+=1}f=0;c:for(;;){if(!((f|0)<(d|0))){b=72;break c}b=(f|0)<0?59:60;if(b==59)var h=a[c+4>>2];else if(b==60){b=(f|0)>=(e|0)?61:62;if(b==61)var E=a[c+((e-1<<1)+1<<2)>>2];else b==62&&(E=a[c+((f<<1)+1<<2)>>2]);h=E}b=(f-1|0)<0?65:66;if(b==65)var m=a[c+4>>2];else if(b==66){b=(f-1|0)>=(e|0)?67:68;if(b==67)var i=a[c+((e-1<<
1)+1<<2)>>2];else b==68&&(i=a[c+((f-1<<1)+1<<2)>>2]);m=i}a[c+(f<<1<<2)>>2]+=h+m>>1;f+=1}}while(0)}else if(b==1){b=(d|0)>0?3:2;b:do if(b==2){b=(e|0)>1?3:36;break b}while(0);do if(b==3){f=0;c:for(;;){if(!((f|0)<(e|0))){b=19;break c}b=(f-1|0)<0?6:7;if(b==6)var k=a[c+4>>2];else if(b==7){b=(f-1|0)>=(d|0)?8:9;if(b==8)var n=a[c+((d-1<<1)+1<<2)>>2];else b==9&&(n=a[c+((f-1<<1)+1<<2)>>2]);k=n}b=(f|0)<0?12:13;if(b==12)var p=a[c+4>>2];else if(b==13){b=(f|0)>=(d|0)?14:15;if(b==14)var o=a[c+((d-1<<1)+1<<2)>>2];
else b==15&&(o=a[c+((f<<1)+1<<2)>>2]);p=o}a[c+(f<<1<<2)>>2]-=p+(k+2)>>2;f+=1}f=0;c:for(;;){if(!((f|0)<(d|0))){b=35;break c}b=(f|0)<0?22:23;if(b==22)var L=a[c>>2];else if(b==23){b=(f|0)>=(e|0)?24:25;if(b==24)var w=a[c+(e-1<<1<<2)>>2];else b==25&&(w=a[c+(f<<1<<2)>>2]);L=w}b=(f+1|0)<0?28:29;if(b==28)var r=a[c>>2];else if(b==29){b=(f+1|0)>=(e|0)?30:31;if(b==30)var x=a[c+(e-1<<1<<2)>>2];else b==31&&(x=a[c+(f+1<<1<<2)>>2]);r=x}a[c+((f<<1)+1<<2)>>2]+=L+r>>1;f+=1}}while(0)}while(0)}function bc(c,d,e){if(((c|
0)!=0?1:2)==1)a[c>>2]=d,a[c+4>>2]=e}function F(c,d,e){var b=t;t+=516;D(t<X);var f,g,j,l,v=b+4;j=0;l=a[c>>2];f=(l|0)!=0?1:9;do if(f==1){f=d==1?2:d==2?3:d==4?4:5;f!=5&&(f==2?j=a[l>>2]:f==3?j=a[l+4>>2]:f==4&&(j=a[l+8>>2]));f=(j|0)==0?7:8;do if(f==7)g=0;else if(f==8){f=(e|0)!=0?11:16;c:do if(f==11){if((l|0)==0){f=16;break c}var h,i;f=v;g=f+512;i=0;i<0&&(i+=256);for(i=i+(i<<8)+(i<<16)+i*16777216;f%4!==0&&f<g;)p[f++]=0;f>>=2;for(h=g>>2;f<h;)a[f++]=i;for(f<<=2;f<g;)p[f++]=0;a[b>>2]=arguments[F.length];f=
xa(e)>>>0>512?13:14;gi(v,e,a[b>>2]);za[j](v,a[c+4>>2])}while(0);g=1}while(0)}else f==9&&(g=0);while(0);t=b;return g}function gd(c){var d,e,b,f,g,j,l,v;j=0;l=a[c+64>>2];v=a[c+72>>2];r(v,2);e=r(v,2);d=(a[l+80>>2]|0)==0?1:2;do if(d==1)a[a[l+76>>2]+(a[l+80>>2]<<2)>>2]=e,a[l+80>>2]+=1;else if(d==2){b=0;b:for(;;){(b|0)<(a[l+80>>2]|0)?d=4:(f=0,d=5);d==4&&(f=(j<<24>>24|0)==0);if(!f)break b;j=((a[a[l+76>>2]+(b<<2)>>2]|0)==(e|0)?1:0)&255;b+=1}d=(j<<24>>24|0)==0?8:9;d==8&&(a[a[l+76>>2]+(a[l+80>>2]<<2)>>2]=e,
a[l+80>>2]+=1)}while(0);b=r(v,4);((b|0)!=0?12:11)==11&&(b=Ha(v)+8);f=r(v,1);g=r(v,1);a[c+8>>2]=e;a[c+16>>2]=f;a[c+32>>2]=a[v+24>>2]-12+b;a[c+4>>2]=16;j=a[l+108>>2]+a[c+8>>2]*5588;d=(a[c+68>>2]|0)!=0?13:22;d==13&&(d=(a[j>>2]|0)!=0?14:20,d==14?(((e|0)==0?15:16)==15&&(a[a[c+68>>2]+80>>2]=R(v)-13),a[a[a[c+68>>2]+88>>2]+e*572+4>>2]=e,a[a[a[c+68>>2]+88>>2]+e*572+8>>2]=R(v)-12,a[a[a[c+68>>2]+88>>2]+e*572+16>>2]=a[a[a[c+68>>2]+88>>2]+e*572+8>>2]+b-1,a[a[a[c+68>>2]+88>>2]+e*572+564>>2]=g,d=(g|0)!=0?17:18,
d==17?(d=z(g*20),a[a[a[c+68>>2]+88>>2]+e*572+568>>2]=d):d==18&&(d=z(200),a[a[a[c+68>>2]+88>>2]+e*572+568>>2]=d)):d==20&&(a[a[a[c+68>>2]+88>>2]+e*572+16>>2]+=b),a[a[a[a[c+68>>2]+88>>2]+e*572+568>>2]+f*20>>2]=R(v)-12,a[a[a[a[c+68>>2]+88>>2]+e*572+568>>2]+f*20+8>>2]=a[a[a[a[c+68>>2]+88>>2]+e*572+568>>2]+f*20>>2]+b-1);d=(a[j>>2]|0)==1?23:28;do if(d==23){b=a[j+5584>>2];v=j;e=a[c+56>>2];D(I,"memcpy given 5588 bytes to copy. Problem with quantum=1 corrections perhaps?");f=e+5588;if(v%4==e%4){for(;e%4!==
0&&e<f;)p[v++]=p[e++];e>>=2;v>>=2;for(g=f>>2;e<g;)a[v++]=a[e++];e<<=2;v<<=2}for(;e<f;)p[v++]=p[e++];a[j+5172>>2]=0;a[j+5164>>2]=0;a[j+5168>>2]=0;a[j+5584>>2]=b;b=0;b:for(;;){if(!((b|0)<(a[a[c+60>>2]+16>>2]|0))){d=27;break b}v=a[j+5584>>2]+b*1076;e=a[a[c+56>>2]+5584>>2]+b*1076;D(I,"memcpy given 1076 bytes to copy. Problem with quantum=1 corrections perhaps?");f=e+1076;if(v%4==e%4){for(;e%4!==0&&e<f;)p[v++]=p[e++];e>>=2;v>>=2;for(g=f>>2;e<g;)a[v++]=a[e++];e<<=2;v<<=2}for(;e<f;)p[v++]=p[e++];b+=1}a[a[l+
108>>2]+a[c+8>>2]*5588>>2]=0}while(0)}function hd(c){var d,e,b,f,g,j,l;b=0;j=a[c+72>>2];l=a[c+8>>2];d=(a[c+68>>2]|0)!=0?1:4;d==1&&(a[a[a[a[c+68>>2]+88>>2]+a[c+8>>2]*572+568>>2]+a[c+16>>2]*20+4>>2]=R(j)+a[c+44>>2]-1,d=(a[c+16>>2]|0)==0?2:3,d==2&&(a[a[a[c+68>>2]+88>>2]+a[c+8>>2]*572+12>>2]=R(j)+a[c+44>>2]-1),a[a[c+68>>2]+8>>2]=0);e=id(a[c+32>>2]-a[j+24>>2],Ha(j)+1);d=(e|0)==(Ha(j)+1|0)?5:6;d==5&&(b=1);f=a[a[c+48>>2]+(l<<2)>>2];f=jb(f,a[a[c+52>>2]+(l<<2)>>2]+e);g=f+a[a[c+52>>2]+(l<<2)>>2];d=0;a:for(;;){if(!((d|
0)<(e|0)))break a;var v=r(j,1);p[g+d]=v&255;d+=1}a[a[c+52>>2]+(l<<2)>>2]+=e;a[a[c+48>>2]+(l<<2)>>2]=f;d=(b|0)!=0?12:11;d==12?a[c+4>>2]=64:d==11&&(a[c+4>>2]=8);a[c+16>>2]+=1}function kb(c){var d,e,b,f,g;d=(a[a[c+64>>2]+44>>2]|0)!=2?1:8;do if(d==1){f=a[c>>2];b=e=g=H;b=z(56);g=(b|0)!=0?2:1;g==2?(a[b+20>>2]=f,f=z(12),a[b+24>>2]=f,g=(a[b+24>>2]|0)!=0?4:3,g==4?e=b:g==3&&(e=0)):g==1&&(e=0);g=e;jd(g,a[c+60>>2],a[c+64>>2]);e=0;b:for(;;){if(!((e|0)<(a[a[c+64>>2]+80>>2]|0))){d=7;break b}kd(g,a[c+60>>2],a[c+
64>>2],e);b=a[a[a[c+64>>2]+76>>2]+(e<<2)>>2];f=ld(g,a[a[c+48>>2]+(b<<2)>>2],a[a[c+52>>2]+(b<<2)>>2],b,a[c+68>>2]);a[a[c+48>>2]+(b<<2)>>2]=0;if((f|0)==0){d=4;break b}e+=1}d==4&&(a[c+4>>2]|=128)}else if(d==8){e=0;b:for(;;){if(!((e|0)<(a[a[c+64>>2]+80>>2]|0))){d=12;break b}b=a[a[a[c+64>>2]+76>>2]+(e<<2)>>2];a[a[c+48>>2]+(b<<2)>>2]=0;e+=1}}while(0);d=(a[c+4>>2]&128|0)!=0?14:15;d==14?a[c+4>>2]=160:d==15&&(a[c+4>>2]=32)}function md(c){var d,e,b,f,g;e=a[c+72>>2];b=a[c+60>>2];f=a[c+64>>2];r(e,2);r(e,2);d=
r(e,4);a[b+8>>2]=d;d=r(e,4);a[b+12>>2]=d;d=r(e,4);a[b>>2]=d;d=r(e,4);a[b+4>>2]=d;d=r(e,4);a[f+56>>2]=d;d=r(e,4);a[f+60>>2]=d;d=r(e,4);a[f+48>>2]=d;d=r(e,4);a[f+52>>2]=d;d=(a[b>>2]|0)<0?4:1;a:do if(d==1){if((a[b+8>>2]|0)<0){d=4;break a}if((a[b+4>>2]|0)<0){d=4;break a}if((a[b+12>>2]|0)<0){d=4;break a}d=r(e,2);a[b+16>>2]=d;d=ba(a[b+16>>2],48);a[b+24>>2]=d;d=0;b:for(;;){if(!((d|0)<(a[b+16>>2]|0)))break b;g=r(e,1);a[a[b+24>>2]+d*48+24>>2]=(g&127)+1;a[a[b+24>>2]+d*48+32>>2]=g>>7;g=r(e,1);a[a[b+24>>2]+d*
48>>2]=g;g=r(e,1);a[a[b+24>>2]+d*48+4>>2]=g;a[a[b+24>>2]+d*48+36>>2]=0;a[a[b+24>>2]+d*48+40>>2]=a[f+36>>2];d+=1}a[f+68>>2]=(a[b+8>>2]-a[f+48>>2]+a[f+56>>2]-1|0)/(a[f+56>>2]|0)|0;a[f+72>>2]=(a[b+12>>2]-a[f+52>>2]+a[f+60>>2]-1|0)/(a[f+60>>2]|0)|0;e=ba(a[f+68>>2]*a[f+72>>2],5588);a[f+108>>2]=e;e=z(a[f+68>>2]*a[f+72>>2]<<2);a[f+76>>2]=e;d=a[f+80>>2]=0;b:for(;;){if(!((d|0)<(a[f+68>>2]*a[f+72>>2]|0)))break b;a[a[f+108>>2]+d*5588+424>>2]=0;a[a[f+108>>2]+d*5588+420>>2]=0;a[a[f+108>>2]+d*5588>>2]=1;d+=1}a[f+
92>>2]=0;a[f+84>>2]=0;a[f+88>>2]=0;a[f+100>>2]=0;a[f+96>>2]=0;e=ba(a[b+16>>2],1076);a[a[c+56>>2]+5584>>2]=e;d=0;b:for(;;){if(!((d|0)<(a[f+68>>2]*a[f+72>>2]|0)))break b;e=z(a[b+16>>2]*1076);a[a[f+108>>2]+d*5588+5584>>2]=e;d+=1}e=ba(a[f+68>>2]*a[f+72>>2],4);a[c+48>>2]=e;e=ba(a[f+68>>2]*a[f+72>>2],4);a[c+52>>2]=e;a[c+4>>2]=4;if((a[c+68>>2]|0)==0){d=19;break a}e=a[c+68>>2];a[e+16>>2]=a[b+8>>2]-a[b>>2];a[e+20>>2]=a[b+12>>2]-a[b+4>>2];a[e+52>>2]=a[b+16>>2];a[e+44>>2]=a[f+68>>2];a[e+48>>2]=a[f+72>>2];a[e+
28>>2]=a[f+56>>2];a[e+32>>2]=a[f+60>>2];a[e+36>>2]=a[f+48>>2];a[e+40>>2]=a[f+52>>2];f=ba(a[f+68>>2]*a[f+72>>2],572);a[e+88>>2]=f;d=19;break a}while(0);d==4&&F(a[c>>2],1,nd,h([a[b>>2],0,0,0,a[b+8>>2],0,0,0,a[b+4>>2],0,0,0,a[b+12>>2],0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n))}function od(c){var d,e,b,f,g;b=a[c+72>>2];f=a[c+64>>2];d=(a[c+4>>2]|0)==16?1:2;d==1?g=a[f+108>>2]+a[c+8>>2]*5588:d==2&&(g=a[c+56>>2]);f=g;g=a[c+60>>2];r(b,2);d=r(b,1);a[f+4>>2]=d;d=r(b,1);a[f+8>>2]=d;d=r(b,2);
a[f+12>>2]=d;d=r(b,1);a[f+16>>2]=d;d=R(b);e=0;a:for(;;){if(!((e|0)<(a[g+16>>2]|0)))break a;a[a[f+5584>>2]+e*1076>>2]=a[f+4>>2]&1;ya(b,d);cc(c,e);e+=1}d=(a[c+68>>2]|0)!=0?8:13;do if(d==8){b=a[c+68>>2];a[b+24>>2]=a[f+8>>2];a[b+56>>2]=a[f+12>>2];e=z(a[g+16>>2]<<2);a[b+60>>2]=e;e=0;b:for(;;){if(!((e|0)<(a[g+16>>2]|0))){d=12;break b}a[a[b+60>>2]+(e<<2)>>2]=a[a[f+5584>>2]+e*1076+4>>2]-1;e+=1}}while(0)}function pd(c){var d,e,b;e=a[c+64>>2];d=(a[c+4>>2]|0)==16?1:2;d==1?b=a[e+108>>2]+a[c+8>>2]*5588:d==2&&
(b=a[c+56>>2]);d=b;e=a[c+60>>2];b=a[c+72>>2];r(b,2);e=r(b,(a[e+16>>2]|0)<=256?1:2);b=r(b,1);a[a[d+5584>>2]+e*1076>>2]=b;cc(c,e)}function qd(c){var d,e;e=a[c+64>>2];d=(a[c+4>>2]|0)==16?1:2;if(d==1)var b=a[e+108>>2]+a[c+8>>2]*5588;else d==2&&(b=a[c+56>>2]);d=b;e=a[c+72>>2];c=a[a[c+60>>2]+16>>2];r(e,2);c=r(e,(c|0)<=256?1:2);r(e,1);e=r(e,1);a[a[d+5584>>2]+c*1076+808>>2]=e}function rd(c){var d,e,b,f,g,j;f=a[a[c+60>>2]+16>>2];g=a[c+64>>2];d=(a[c+4>>2]|0)==16?1:2;d==1?b=a[g+108>>2]+a[c+8>>2]*5588:d==2&&
(b=a[c+56>>2]);g=b;c=a[c+72>>2];d=(a[g+424>>2]|0)!=0?4:5;d==4?e=a[g+420>>2]+1:d==5&&(e=0);b=e;a[g+424>>2]=1;d=(r(c,2)-2|0)/((((f|0)<=256?1:2)<<1)+5|0)|0;e=b;a:for(;;){if(!((e|0)<(d+b|0)))break a;j=g+428+e*148;var l=r(c,1);a[j>>2]=l;l=r(c,(f|0)<=256?1:2);a[j+4>>2]=l;l=r(c,2);a[j+8>>2]=l;l=r(c,1);a[j+12>>2]=l;l=r(c,(f|0)<=256?1:2);a[j+16>>2]=id(l,f);l=r(c,1);a[j+36>>2]=l;e+=1}a[g+420>>2]=d+b-1}function sd(c){var d,e,b,f;f=a[c+72>>2];d=r(f,2);r(f,1);e=r(f,1);c=(e>>4&1)+(e>>4&2);e=e>>6&1;d=(d-4|0)/((e+
1<<1)+c|0)|0;b=0;a:for(;;){if(!((b|0)<(d|0)))break a;r(f,c);r(f,(e|0)!=0?4:2);b+=1}}function td(c){var d,e;e=a[c+72>>2];c=r(e,2);r(e,1);c-=3;a:for(;;){if(!((c|0)>0))break a;d=r(e,4);c-=4;b:for(;;){if(!((d|0)>0))break b;r(e,1);c-=1;if((c|0)<=0)break b;d-=1}}}function ud(c){var d,e,b,f,g,j;g=a[c+64>>2];j=a[c+72>>2];c=r(j,2);a[g+92>>2]=1;e=r(j,1);c-=3;a:for(;;){if(!((c|0)>0))break a;d=(a[g+100>>2]|0)==0?3:4;d==3?(f=r(j,4),c-=4):d==4&&(f=a[g+100>>2]);b=a[g+96>>2];d=(e|0)==0?6:7;d==6?(d=z(f),a[g+84>>2]=
d,a[g+88>>2]=a[g+84>>2],a[g+104>>2]=f):d==7&&(d=jb(a[g+84>>2],f+a[g+96>>2]),a[g+84>>2]=d,a[g+88>>2]=a[g+84>>2],a[g+104>>2]=f+a[g+96>>2]);d=f;b:for(;;){if(!((d|0)>0))break b;var l=r(j,1);p[a[g+84>>2]+b]=l&255;b+=1;c-=1;if((c|0)==0)break b;d-=1}a[g+100>>2]=d-1;a[g+96>>2]=b}}function vd(c){var d,e,b;b=a[a[c+64>>2]+108>>2]+a[c+8>>2]*5588;c=a[c+72>>2];e=r(c,2);d=r(c,1);a[b+5172>>2]=1;d=(d|0)==0?1:2;d==1?(d=z(e-3),a[b+5164>>2]=d,a[b+5168>>2]=a[b+5164>>2],a[b+5176>>2]=0,a[b+5180>>2]=e-3):d==2&&(d=jb(a[b+
5164>>2],e-3+a[b+5176>>2]),a[b+5164>>2]=d,a[b+5168>>2]=a[b+5164>>2],a[b+5180>>2]=e-3+a[b+5176>>2]);d=a[b+5176>>2];e-=3;a:for(;;){if(!((e|0)>0))break a;var f=r(c,1);p[a[b+5164>>2]+d]=f&255;d+=1;e-=1}a[b+5176>>2]=d}function wd(c){var d,e,b;b=ba(1,76);d=(b|0)!=0?2:1;d==2?(d=ba(1,5588),a[b+56>>2]=d,d=(a[b+56>>2]|0)!=0?4:3,d==4?(a[b>>2]=c,a[b+48>>2]=0,e=b):d==3&&(e=0)):d==1&&(e=0);return e}function xd(c){var d;d=yd;a:for(;;){if((a[d>>2]|0)==0)break a;if((a[d>>2]|0)==(c|0))break a;d+=12}return d}function zd(c,
d){var e,b;e=(c|0)!=0?1:3;a:do if(e==1){if((d|0)==0)break a;b=ba(1,116);a[b+36>>2]=a[d>>2];a[b+40>>2]=a[d+4>>2];a[b+44>>2]=a[d+8220>>2];a[c+64>>2]=b}while(0)}function dc(c,d,e){var b,f,g,j,l;g=a[c>>2];a[c+72>>2]=d;a[c+68>>2]=e;b=(e|0)!=0?1:2;if(b==1){var v,Z;j=e+92;Z=0;Z<0&&(Z+=256);for(Z=Z+(Z<<8)+(Z<<16)+Z*16777216;e%4!==0&&e<j;)p[e++]=0;e>>=2;for(v=j>>2;e<v;)a[e++]=Z;for(e<<=2;e<j;)p[e++]=0}e=ba(1,36);a[c+60>>2]=e;a[c+4>>2]=1;a:for(;;){l=r(d,2);if((l>>8|0)!=255){b=4;break a}j=xd(l);if((a[c+4>>2]&
a[j+4>>2]|0)==0){b=6;break a}b=(a[j>>2]|0)==65424?8:10;do if(b==8&&(a[a[c+64>>2]+44>>2]|0)==1){b=9;break a}while(0);b=(a[j+8>>2]|0)!=0?11:12;if(b==11)za[a[j+8>>2]](c);if((a[c+4>>2]&128|0)!=0){b=13;break a}if((a[c+4>>2]|0)==32){b=15;break a}if((a[c+4>>2]|0)==64){b=17;break a}}a:do if(b==4){F(g,1,ec,h([R(d)-2,0,0,0,l,0,0,0],["i32",0,0,0,"i32",0,0,0],n));f=0;b=24;break a}else if(b==6){F(g,1,fc,h([R(d)-2,0,0,0,l,0,0,0],["i32",0,0,0,"i32",0,0,0],n));f=0;b=24;break a}else if(b==9){F(g,4,Ad,h(1,"i32",n));
f=e;b=24;break a}else if(b==13){f=0;b=24;break a}else if(b==15){b=19;break a}else if(b==17){b=19;break a}while(0);b==19&&(b=(a[c+4>>2]|0)==64?20:21,b==20&&kb(c),b=(a[c+4>>2]|0)!=32?22:23,b==22&&F(g,2,gc,h(1,"i32",n)),f=e);return f}function Bd(c,d){var e=t;t+=28;D(t<X);var b,f,g,j,l,v;l=a[c>>2];a[c+72>>2]=d;g=ba(1,36);a[c+60>>2]=g;a[c+4>>2]=1;a[e>>2]=0;a[e+4>>2]=0;a[e+8>>2]=0;a[e+12>>2]=0;a[e+16>>2]=0;a[e+20>>2]=0;a[e+24>>2]=0;hc(l,d,e);j=R(d);b=(a[e+8>>2]|0)!=6?1:2;a:do if(b==1)F(l,1,Cd,h([a[e+8>>
2],0,0,0],["i32",0,0,0],n)),f=0;else if(b==2){b:for(;;){if((Ha(d)|0)==0){b=4;break b}b=(R(d)-j|0)==(a[e+20>>2]|0)?6:9;do if(b==6&&(hc(l,d,e),j=R(d),(a[e+8>>2]|0)!=4)){b=7;break b}while(0);v=r(d,2);if((v>>8|0)!=255){b=10;break b}f=xd(v);if((a[c+4>>2]&a[f+4>>2]|0)==0){b=12;break b}b=(a[f+8>>2]|0)!=0?14:15;if(b==14)za[a[f+8>>2]](c);if((a[c+4>>2]|0)==32){b=16;break b}if((a[c+4>>2]|0)==64){b=18;break b}}do if(b==4){kb(c);f=g;break a}else if(b==7){F(l,1,Dd,h(1,"i32",n));f=0;break a}else if(b==10){F(l,1,
ec,h([R(d)-2,0,0,0,v,0,0,0],["i32",0,0,0,"i32",0,0,0],n));f=0;break a}else if(b==12){F(l,1,fc,h([R(d)-2,0,0,0,v,0,0,0],["i32",0,0,0,"i32",0,0,0],n));f=0;break a}while(0);b=(a[c+4>>2]|0)==64?21:22;b==21&&kb(c);b=(a[c+4>>2]|0)!=32?23:24;b==23&&F(l,2,gc,h(1,"i32",n));f=g}while(0);t=e;return f}function id(a,d){var e;e=(a|0)<(d|0)?1:2;if(e==1)var b=a;else e==2&&(b=d);return b}function ic(c,d,e){var b,f,g,j,l;g=a[c+64>>2];b=(a[c+4>>2]|0)==16?1:2;if(b==1)var v=a[g+108>>2]+a[c+8>>2]*5588;else b==2&&(v=a[c+
56>>2]);d=a[v+5584>>2]+d*1076;c=a[c+72>>2];b=r(c,1);a[d+24>>2]=b&31;a[d+804>>2]=b>>5;b=(a[d+24>>2]|0)==1?4:5;if(b==4)f=1;else if(b==5){b=(a[d+24>>2]|0)==0?6:7;if(b==6)var h=e-1;else b==7&&(h=(e-1|0)/2|0);f=h}e=0;a:for(;;){if(!((e|0)<(f|0)))break a;b=(a[d+24>>2]|0)==0?12:13;b==12?(j=r(c,1)>>>3,l=0):b==13&&(b=r(c,2),j=b>>11,l=b&2047);a[d+28+(e<<3)>>2]=j;a[d+28+(e<<3)+4>>2]=l;e+=1}b=(a[d+24>>2]|0)==1?17:25;do if(b==17){e=1;b:for(;;){if(!((e|0)<97)){b=24;break b}b=(a[d+28>>2]-((e-1|0)/3|0)|0)>0?20:21;
if(b==20)var i=a[d+28>>2]-((e-1|0)/3|0);else b==21&&(i=0);a[d+28+(e<<3)>>2]=i;a[d+28+(e<<3)+4>>2]=a[d+32>>2];e+=1}}while(0)}function cc(c,d){var e,b,f,g,j;b=a[c+64>>2];e=(a[c+4>>2]|0)==16?1:2;e==1?f=a[b+108>>2]+a[c+8>>2]*5588:e==2&&(f=a[c+56>>2]);f=a[f+5584>>2]+d*1076;g=a[c+72>>2];e=r(g,1);a[f+4>>2]=e+1;e=(a[b+36>>2]|0)>=(a[f+4>>2]|0)?4:5;e==4&&(F(a[c>>2],1,Ed,h([d,0,0,0],["i32",0,0,0],n)),a[c+4>>2]|=128);e=r(g,1);a[f+8>>2]=e+2;e=r(g,1);a[f+12>>2]=e+2;e=r(g,1);a[f+16>>2]=e;e=r(g,1);a[f+20>>2]=e;e=
(a[f>>2]&1|0)!=0?6:11;do if(e==6){b=0;b:for(;;){if(!((b|0)<(a[f+4>>2]|0))){e=10;break b}j=r(g,1);a[f+812+(b<<2)>>2]=j&15;a[f+944+(b<<2)>>2]=j>>4;b+=1}}while(0);e=(a[c+68>>2]|0)!=0?12:21;a:do if(e==12){if((d|0)!=0)break a;b=0;b:for(;;){if(!((b|0)<(a[f+4>>2]|0))){e=20;break b}e=(a[f>>2]&1|0)!=0?16:17;e==16?(a[a[a[c+68>>2]+88>>2]+a[c+8>>2]*572+284+(b<<2)>>2]=a[f+812+(b<<2)>>2],a[a[a[c+68>>2]+88>>2]+a[c+8>>2]*572+416+(b<<2)>>2]=a[f+944+(b<<2)>>2]):e==17&&(a[a[a[c+68>>2]+88>>2]+a[c+8>>2]*572+284+(b<<2)>>
2]=15,a[a[a[c+68>>2]+88>>2]+a[c+8>>2]*572+284+(b<<2)>>2]=15);b+=1}}while(0)}function Oa(){var c=t;t+=20;D(t<X);var d=K.L({z:["i32","i32"]});a[c+Tb+d[0]>>2]=1;a[c+Tb+d[1]>>2]=2;a[c+Ub+d[0]>>2]=3;a[c+Ub+d[1]>>2]=4;d=(a[c>>2]+a[c+8>>2]|0)+(a[c+4>>2]+a[c+12>>2]|0)*1.0E-6;t=c;return d}function Fd(c,d,e){var b=t;t+=12;D(t<X);var f,g,j;j=a[c>>2];da(j,d,b);a:for(;;){f=1785737832!=(a[b+4>>2]|0)?2:7;do if(f==2){if((a[b+4>>2]|0)==1785737827){f=3;break a}ra(d,a[b>>2]-8);if(T[d+24>>2]>>>0>=T[d+20>>2]>>>0){f=5;
break a}da(j,d,b)}while(0);if(1785737832==(a[b+4>>2]|0)){f=9;break a}}a:do if(f==3)F(j,1,Gd,h(1,"i32",n)),g=0;else if(f==5)g=0;else if(f==9){f=(Hd(c,d)|0)!=0?11:10;do if(f==11){g=a[b+8>>2]+a[b>>2];f=(a[c+20>>2]|0)==255?12:15;do if(f==12){f=(Id(c,d)|0)!=0?14:13;do if(f!=14&&f==13){g=0;break a}while(0)}while(0);da(j,d,b);c:for(;;){if(!(R(d)>>>0<g>>>0)){f=34;break c}f=(a[b+4>>2]|0)==1668246642?18:21;f==18?(f=(Jd(c,d,b,e)|0)!=0?20:19,f==19&&(ya(d,a[b+8>>2]+8),ra(d,a[b>>2]-8)),da(j,d,b)):f==21&&(f=(a[b+
4>>2]|0)==1667523942?22:25,f==22?(f=(Kd(0,d,0,e)|0)!=0?24:23,f==23&&(ya(d,a[b+8>>2]+8),ra(d,a[b>>2]-8)),da(j,d,b)):f==25&&(f=(a[b+4>>2]|0)==1885564018?26:29,f==26?(f=(Ld(0,d,0,e)|0)!=0?28:27,f==27&&(ya(d,a[b+8>>2]+8),ra(d,a[b>>2]-8)),da(j,d,b)):f==29&&(f=(a[b+4>>2]|0)==1668112752?30:33,f==30?(f=(Md(0,d,0,e)|0)!=0?32:31,f==31&&(ya(d,a[b+8>>2]+8),ra(d,a[b>>2]-8)),da(j,d,b)):f==33&&(ya(d,a[b+8>>2]+8),ra(d,a[b>>2]-8),da(j,d,b)))))}ya(d,g);g=(U[e+16]&255|0)==1&1}else f==10&&(g=0);while(0)}while(0);t=b;
return g}function da(c,d,e){var b,f;a[e+8>>2]=R(d);b=r(d,4);a[e>>2]=b;b=r(d,4);a[e+4>>2]=b;b=(a[e>>2]|0)==1?1:6;a:do if(b==1){b=(r(d,4)|0)!=0?2:3;do if(b==2){F(c,1,Nd,h(1,"i32",n));f=0;b=10;break a}else if(b==3){c=r(d,4);a[e>>2]=c;b=(a[e>>2]|0)==0?4:5;b==4&&(a[e>>2]=Ha(d)+12);b=9;break a}while(0)}else if(b==6){b=(a[e>>2]|0)==0?7:8;b==7&&(a[e>>2]=Ha(d)+8);b=9;break a}while(0);b==9&&(f=1);return f}function Hd(c,d){var e=t;t+=12;D(t<X);var b,f,g;g=a[c>>2];da(g,d,e);b=1768449138!=(a[e+4>>2]|0)?1:2;b==
1?(F(g,1,Od,h(1,"i32",n)),f=0):b==2&&(b=r(d,4),a[c+12>>2]=b,b=r(d,4),a[c+8>>2]=b,b=r(d,2),a[c+16>>2]=b,b=z(a[c+16>>2]*12),a[c+68>>2]=b,b=r(d,1),a[c+20>>2]=b,b=r(d,1),a[c+24>>2]=b,b=r(d,1),a[c+28>>2]=b,b=r(d,1),a[c+32>>2]=b,b=(R(d)-a[e+8>>2]|0)!=(a[e>>2]|0)?3:4,b==3?(F(g,1,Pd,h(1,"i32",n)),f=0):b==4&&(f=1));t=e;return f}function Id(c,d){var e=t;t+=12;D(t<X);var b,f,g;g=a[c>>2];da(g,d,e);b=1651532643!=(a[e+4>>2]|0)?1:2;do if(b==1)F(g,1,Qd,h(1,"i32",n)),f=0;else if(b==2){b=0;b:for(;;){if(!(b>>>0<T[c+
16>>2]>>>0))break b;var j=r(d,1);a[a[c+68>>2]+b*12+8>>2]=j;b+=1}b=(R(d)-a[e+8>>2]|0)!=(a[e>>2]|0)?7:8;b==7?(F(g,1,Rd,h(1,"i32",n)),f=0):b==8&&(f=1)}while(0);t=e;return f}function Sd(c){var d;d=(a[c+12>>2]|0)!=0?1:2;d==1&&jc(c);d=(a[c+8>>2]|0)!=0?3:6}function Jd(c,d,e,b){var f,g,j,l,v;f=p[b+16]<<24>>24!=0?1:2;a:do if(f==1)g=0;else if(f==2){l=a[c>>2];f=r(d,1);a[c+36>>2]=f;f=r(d,1);a[c+48>>2]=f;f=r(d,1);a[c+40>>2]=f;f=(a[c+36>>2]|0)==1?3:4;do if(f==3)j=r(d,4),a[c+44>>2]=j;else if(f==4){j=a[e+8>>2]+a[e>>
2]-R(d);f=(j|0)<0?5:6;do if(f==5){F(l,1,Td,h(1,"i32",n));g=0;break a}else if(f==6&&(f=(j|0)>0?7:8,f==7)){v=a[d+24>>2];var Z=z(j);a[b>>2]=Z;a[b+4>>2]=j;ra(d,a[e+8>>2]+a[e>>2]-R(d));var i=a[b>>2],Z=v;v=j;D(v%1===0,"memcpy given "+v+" bytes to copy. Problem with quantum=1 corrections perhaps?");var m;m=Z+v;if(i%4==Z%4&&v>8){for(;Z%4!==0&&Z<m;)p[i++]=p[Z++];Z>>=2;i>>=2;for(v=m>>2;Z<v;)a[i++]=a[Z++];Z<<=2;i<<=2}for(;Z<m;)p[i++]=p[Z++]}while(0)}while(0);f=(R(d)-a[e+8>>2]|0)!=(a[e>>2]|0)?10:11;f==10?(F(l,
1,Ud,h(1,"i32",n)),g=0):f==11&&(g=p[b+16]=1)}while(0);return g}function Kd(c,d,e,b){var f,g,e=(a[b+8>>2]|0)!=0?1:2;do if(e==1)f=0;else if(e==2){e=r(d,2);c=e&65535;e=(e&65535|0)==0?3:4;do if(e==3)f=0;else if(e==4){f=z((c&65535)*6);g=z(8);a[b+8>>2]=g;a[a[b+8>>2]>>2]=f;q[a[b+8>>2]+4>>1]=c;g=0;c:for(;;){if(!((g&65535|0)<(c&65535|0))){e=8;break c}var j=r(d,2);q[f+(g&65535)*6>>1]=j&65535;j=r(d,2);q[f+(g&65535)*6+2>>1]=j&65535;j=r(d,2);q[f+(g&65535)*6+4>>1]=j&65535;g+=1}f=1}while(0)}while(0);return f}function Ld(c,
d,e,b){var f,g,j,l,v,h,c=(a[b+12>>2]|0)!=0?1:2;do if(c==1)f=0;else if(c==2){l=r(d,2)&65535;v=r(d,1)&65535;e=z((v&65535)*(l&65535)<<2);f=z(v&65535);j=z(v&65535);g=z(20);a[g+4>>2]=j;a[g+8>>2]=f;a[g>>2]=e;q[g+16>>1]=l;q[g+18>>1]=v;a[g+12>>2]=0;a[b+12>>2]=g;g=0;b:for(;;){if(!((g&65535|0)<(v&65535|0))){c=6;break b}h=r(d,1)&255;p[f+(g&65535)]=(h&127)+1&255;p[j+(g&65535)]=((h&128|0)!=0?1:0)&255;g+=1}j=0;b:for(;;){if(!((j&65535|0)<(l&65535|0))){c=14;break b}g=0;c:for(;;){if(!((g&65535|0)<(v&65535|0))){c=
12;break c}h=r(d,(U[f+(g&65535)]&255)>>3);var i=e,e=i+4;a[i>>2]=h;g+=1}j+=1}f=1}while(0);return f}function Md(c,d,e,b){var f,g,c=(a[b+12>>2]|0)==0?1:2;do if(c==1)f=0;else if(c==2){c=(a[a[b+12>>2]+12>>2]|0)!=0?3:4;do if(c==3)f=0;else if(c==4){g=q[a[b+12>>2]+18>>1];f=z((g&65535)<<2);e=0;c:for(;;){if(!((e&65535|0)<(g&65535|0))){c=8;break c}var j=r(d,2);q[f+((e&65535)<<2)>>1]=j&65535;j=r(d,1);p[f+((e&65535)<<2)+2]=j&255;j=r(d,1);p[f+((e&65535)<<2)+3]=j&255;e+=1}a[a[b+12>>2]+12>>2]=f;f=1}while(0)}while(0);
return f}function Vd(c,d,e){var b=t;t+=20;D(t<X);var f,g,j,l;f=(c|0)!=0?1:2;a:do if(f==1){if((d|0)==0){f=2;break a}var v;j=b;f=j+20;v=0;v<0&&(v+=256);for(v=v+(v<<8)+(v<<16)+v*16777216;j%4!==0&&j<f;)p[j++]=0;j>>=2;for(l=f>>2;j<l;)a[j++]=v;for(j<<=2;j<f;)p[j++]=0;j=a[c>>2];l=c;v=d;var Z=b,i=H;f=H;var m=l,k=v,i=t;t+=12;D(t<X);var O=H,o=H,A=H,A=a[m>>2];da(A,k,i);O=1783636E3!=(a[i+4>>2]|0)?1:2;O==1?(F(A,1,Wd,h(1,"i32",n)),o=0):O==2&&(O=218793738!=(r(k,4)|0)?3:4,O==3?(F(A,1,Xd,h(1,"i32",n)),o=0):O==4&&
(O=(R(k)-a[i+8>>2]|0)!=(a[i>>2]|0)?5:6,O==5?(F(A,1,Yd,h(1,"i32",n)),o=0):O==6&&(o=1)));m=o;t=i;i=(m|0)!=0?2:1;if(i==2)if(i=(Zd(l,v)|0)!=0?4:3,i==4)if(i=(Fd(l,v,Z)|0)!=0?6:5,i==6){Z=l;i=l+76;l+=72;m=t;t+=12;D(t<X);O=k=H;O=a[Z>>2];da(O,v,m);e:for(;;)if(k=1785737827!=(a[m+4>>2]|0)?2:3,k==2&&(ra(v,a[m>>2]-8),da(O,v,m)),1785737827==(a[m+4>>2]|0))break e;a[l>>2]=R(v);a[i>>2]=a[m>>2]-8;t=m;i=8;i==8?f=1:i==7&&(f=0)}else i==5&&(f=0);else i==3&&(f=0);else i==1&&(f=0);f=(f|0)!=0?5:4;do if(f==5){l=dc(a[c+4>>
2],d,e);f=(l|0)!=0?7:6;do if(f==7){f=(a[c+44>>2]|0)==16?8:9;f==8?a[l+20>>2]=1:f==9&&(f=(a[c+44>>2]|0)==17?10:11,f==10?a[l+20>>2]=2:f==11&&(f=(a[c+44>>2]|0)==18?12:13,f==12?a[l+20>>2]=3:f==13&&(a[l+20>>2]=-1)));f=(a[b+8>>2]|0)!=0?17:18;f==17&&$d(l,b);f=(a[b+12>>2]|0)!=0?19:23;f==19&&(f=(a[a[b+12>>2]+12>>2]|0)!=0?21:20,f==21?ae(b,l):f==20&&jc(b));f=(a[b>>2]|0)!=0?24:25;f==24&&(a[l+28>>2]=a[b>>2],a[b>>2]=0,a[l+32>>2]=a[b+4>>2]);g=l;f=26;break a}else if(f==6){Sd(b);F(j,1,be,h(1,"i32",n));g=0;f=26;break a}while(0)}else if(f==
4){Sd(b);F(j,1,ce,h(1,"i32",n));g=0;f=26;break a}while(0)}while(0);f==2&&(g=0);t=b;return g}function $d(c,d){var e=t;t+=48;D(t<X);var b,f,g,j,l,v;f=a[a[d+8>>2]>>2];j=q[a[d+8>>2]+4>>1];g=0;a:for(;;){if(!((g&65535|0)<(j&65535|0)))break a;v=Aa[f+(g&65535)*6+4>>1];b=(Aa[f+(g&65535)*6+4>>1]&65535|0)==0?3:4;if(b!=3&&b==4&&(l=q[f+(g&65535)*6>>1],v=(v&65535)-1&65535,b=(l&65535|0)!=(v&65535|0)?5:6,b==5)){var h=e;b=a[c+24>>2]+(l&65535)*48;D(I,"memcpy given 48 bytes to copy. Problem with quantum=1 corrections perhaps?");
var i,m;i=b+48;if(h%4==b%4){for(;b%4!==0&&b<i;)p[h++]=p[b++];b>>=2;h>>=2;for(m=i>>2;b<m;)a[h++]=a[b++];b<<=2;h<<=2}for(;b<i;)p[h++]=p[b++];h=a[c+24>>2]+(l&65535)*48;b=a[c+24>>2]+(v&65535)*48;D(I,"memcpy given 48 bytes to copy. Problem with quantum=1 corrections perhaps?");i=b+48;if(h%4==b%4){for(;b%4!==0&&b<i;)p[h++]=p[b++];b>>=2;h>>=2;for(m=i>>2;b<m;)a[h++]=a[b++];b<<=2;h<<=2}for(;b<i;)p[h++]=p[b++];h=a[c+24>>2]+(v&65535)*48;b=e;D(I,"memcpy given 48 bytes to copy. Problem with quantum=1 corrections perhaps?");
i=b+48;if(h%4==b%4){for(;b%4!==0&&b<i;)p[h++]=p[b++];b>>=2;h>>=2;for(m=i>>2;b<m;)a[h++]=a[b++];b<<=2;h<<=2}for(;b<i;)p[h++]=p[b++];q[f+(g&65535)*6+4>>1]=(l&65535)+1&65535;q[f+(v&65535)*6+4>>1]=(Aa[f+(v&65535)*6>>1]&65535)+1&65535}g+=1}a[d+8>>2]=0;t=e}function jc(c){a[c+12>>2]=0}function ae(c,d){var e,b,f,g,j,l,v,h,i,m,k,n,o,A;g=a[a[c+12>>2]+8>>2];j=a[a[c+12>>2]+4>>2];l=a[a[c+12>>2]>>2];v=a[a[c+12>>2]+12>>2];n=q[a[c+12>>2]+18>>1];b=a[d+24>>2];f=z((n&65535)*48);k=0;a:for(;;){if(!((k&65535|0)<(n&65535|
0)))break a;o=U[v+((k&65535)<<2)+3]&255;h=q[v+((k&65535)<<2)>>1];i=f+(o&65535)*48;e=b+(h&65535)*48;D(I,"memcpy given 48 bytes to copy. Problem with quantum=1 corrections perhaps?");m=e+48;if(i%4==e%4){for(;e%4!==0&&e<m;)p[i++]=p[e++];e>>=2;i>>=2;for(A=m>>2;e<A;)a[i++]=a[e++];e<<=2;i<<=2}for(;e<m;)p[i++]=p[e++];e=(U[v+((k&65535)<<2)+2]&255|0)==0?3:4;e==3?a[b+(h&65535)*48+44>>2]=0:e==4&&(h=z(a[b+(h&65535)*48+8>>2]*a[b+(h&65535)*48+12>>2]<<2),a[f+(o&65535)*48+44>>2]=h,a[f+(o&65535)*48+24>>2]=U[g+(k&
65535)]&255,a[f+(o&65535)*48+32>>2]=U[j+(k&65535)]&255);k+=1}g=(Aa[a[c+12>>2]+16>>1]&65535)-1;k=0;a:for(;;){if(!((k&65535|0)<(n&65535|0)))break a;e=(U[v+((k&65535)<<2)+2]&255|0)==0?9:10;do if(e!=9&&e==10){h=q[v+((k&65535)<<2)>>1];o=U[v+((k&65535)<<2)+3]&255;j=a[b+(h&65535)*48+44>>2];h=a[f+(o&65535)*48+44>>2];m=a[f+(o&65535)*48+8>>2]*a[f+(o&65535)*48+12>>2];i=0;c:for(;;){if(!(i>>>0<m>>>0)){e=19;break c}A=a[j+(i<<2)>>2];e=(a[j+(i<<2)>>2]|0)<0?13:14;e==13?A=0:e==14&&(e=(A|0)>(g|0)?15:16,e==15&&(A=g));
a[h+(i<<2)>>2]=a[l+(A*(n&65535)+(o&65535)<<2)>>2];i+=1}}while(0);k+=1}m=a[d+16>>2];k=0;a:for(;;){if(!((k&65535)>>>0<m>>>0))break a;k+=1}a[d+24>>2]=f;a[d+16>>2]=n&65535;jc(c)}function Zd(c,d){var e=t;t+=12;D(t<X);var b,f,g;g=a[c>>2];da(g,d,e);b=1718909296!=(a[e+4>>2]|0)?1:2;do if(b==1)F(g,1,de,h(1,"i32",n)),f=0;else if(b==2){b=r(d,4);a[c+52>>2]=b;b=r(d,4);a[c+56>>2]=b;a[c+60>>2]=(a[e>>2]-16|0)/4|0;b=z(a[c+60>>2]<<2);a[c+64>>2]=b;b=0;b:for(;;){if(!((b|0)<(a[c+60>>2]|0)))break b;var j=r(d,4);a[a[c+64>>
2]+(b<<2)>>2]=j;b+=1}b=(R(d)-a[e+8>>2]|0)!=(a[e>>2]|0)?7:8;b==7?(F(g,1,ee,h(1,"i32",n)),f=0):b==8&&(f=1)}while(0);t=e;return f}function fe(c,d,e,b){var f,g,j,l;f=0;a:for(;;){if(!((f|0)<(b|0)))break a;g=a[c+(f<<2)>>2];j=a[d+(f<<2)>>2];l=a[e+(f<<2)>>2];g-=j+l>>2;l+=g;j+=g;a[c+(f<<2)>>2]=l;a[d+(f<<2)>>2]=g;a[e+(f<<2)>>2]=j;f+=1}}function ge(a,d,e,b){var f,g,j,l,v;f=0;a:for(;;){if(!((f|0)<(b|0)))break a;g=u[a+(f<<2)>>2];j=u[d+(f<<2)>>2];l=u[e+(f<<2)>>2];v=g+l*1.4019999504089355;l=g-j*0.3441300094127655-
l*0.714139997959137;g+=j*1.7719999551773071;u[a+(f<<2)>>2]=v;u[d+(f<<2)>>2]=l;u[e+(f<<2)>>2]=g;f+=1}}function Pa(a,d){var e,b;e=d;b=r(a,1)&255;a:for(;;){if(((b&255)>>7|0)!=1)break a;e<<=7;e|=b&127;b=r(a,1)&255}e<<=7;e|=b&127;return e}function hc(c,d,e){var b,f,g,j;j=g=0;a[e>>2]=0;a[e+4>>2]=0;a[e+16>>2]=0;a[e+20>>2]=0;f=r(d,1)&255;b=(f&255)>>5&3;b=b==0?1:b==1?2:b==2?3:b==3?4:5;b!=5&&(b==1?F(c,1,he,h(1,"i32",n)):b==2?j=g=0:b==3?(g=1,j=0):b==4&&(j=g=1));(((f&255)>>4&1|0)==1?7:8)==7&&(a[e+4>>2]=1);a[e>>
2]|=f&15;if((((f&255)>>7|0)==1?9:10)==9)c=Pa(d,a[e>>2]),a[e>>2]=c;if(((g&255|0)==1?11:12)==11)a[e+8>>2]=0,g=Pa(d,a[e+8>>2]),a[e+8>>2]=g;if(((j&255|0)==1?13:14)==13)a[e+12>>2]=0,j=Pa(d,a[e+12>>2]),a[e+12>>2]=j;j=Pa(d,a[e+16>>2]);a[e+16>>2]=j;j=Pa(d,a[e+20>>2]);a[e+20>>2]=j;b=(a[e+8>>2]&1|0)==1?15:16;b==15&&(a[e+24>>2]=0,d=Pa(d,a[e+24>>2]),a[e+24>>2]=d)}function ie(c){var d;d=0;a:for(;;){if(!((d|0)<19))break a;a[c+24+(d<<2)>>2]=i;d+=1}}function Qa(c,d,e){a[c+24+(d<<2)>>2]=i+(0+(e<<1)<<4)}function je(c,
d,e){a[c+100>>2]=c+24;a[c+16>>2]=d;a[c+20>>2]=d+e;a[c+12>>2]=d;d=(e|0)==0?1:2;d==1?a[c>>2]=16711680:d==2&&(a[c>>2]=(U[a[c+12>>2]]&255)<<16);kc(c);a[c>>2]<<=7;a[c+8>>2]-=7;a[c+4>>2]=32768}function kc(c){var d,e;d=(a[c+12>>2]|0)!=(a[c+20>>2]|0)?1:11;d==1?(d=(a[c+12>>2]+1|0)!=(a[c+20>>2]|0)?2:3,d==2?e=U[a[c+12>>2]+1]&255:d==3&&(e=255),d=(U[a[c+12>>2]]&255|0)==255?5:9,d==5?(d=e>>>0>143?6:7,d==6?(a[c>>2]+=65280,a[c+8>>2]=8):d==7&&(a[c+12>>2]+=1,a[c>>2]+=e<<9,a[c+8>>2]=7)):d==9&&(a[c+12>>2]+=1,a[c>>2]+=
e<<8,a[c+8>>2]=8)):d==11&&(a[c>>2]+=65280,a[c+8>>2]=8)}function ke(c){var d,e;d=T[c+4>>2]>>>0<T[a[a[c+100>>2]>>2]>>2]>>>0?1:2;d==1?(a[c+4>>2]=a[a[a[c+100>>2]>>2]>>2],e=a[a[a[c+100>>2]>>2]+4>>2],a[a[c+100>>2]>>2]=a[a[a[c+100>>2]>>2]+8>>2]):d==2&&(a[c+4>>2]=a[a[a[c+100>>2]>>2]>>2],e=1-a[a[a[c+100>>2]>>2]+4>>2],a[a[c+100>>2]>>2]=a[a[a[c+100>>2]>>2]+12>>2]);return e}function le(c){var d;a:for(;;)if(d=(a[c+8>>2]|0)==0?2:3,d==2&&kc(c),a[c+4>>2]<<=1,a[c>>2]<<=1,a[c+8>>2]-=1,!(T[c+4>>2]>>>0<32768))break a}
function me(c){var d,e;d=T[c+4>>2]>>>0<T[a[a[c+100>>2]>>2]>>2]>>>0?1:2;d==1?(e=1-a[a[a[c+100>>2]>>2]+4>>2],a[a[c+100>>2]>>2]=a[a[a[c+100>>2]>>2]+12>>2]):d==2&&(e=a[a[a[c+100>>2]>>2]+4>>2],a[a[c+100>>2]>>2]=a[a[a[c+100>>2]>>2]+8>>2]);return e}function lc(c,d){var e;e=(c|0)!=0?1:8;a:do if(e==1){if((d|0)==0)break a;e=a[c+12>>2];e=e==0?3:e==1?3:e==2?4:e==-1?5:6;b:do if(e==3){zd(a[c+16>>2],d);e=7;break b}else if(e==4){zd(a[a[c+20>>2]+4>>2],d);e=7;break b}else if(e==5){e=6;break b}while(0)}while(0)}function V(c){var d,
e;a[c+4>>2]-=a[a[a[c+100>>2]>>2]>>2];d=T[c>>2]>>>16>>>0<T[a[a[c+100>>2]>>2]>>2]>>>0?1:2;d==1?(e=ke(c),le(c)):d==2&&(a[c>>2]-=a[a[a[c+100>>2]>>2]>>2]<<16,d=(a[c+4>>2]&32768|0)==0?3:4,d==3?(e=me(c),le(c)):d==4&&(e=a[a[a[c+100>>2]>>2]+4>>2]));return e}function Cb(c){var d,e,b;b=ba(1,28);d=(b|0)!=0?2:1;a:do if(d==2){a[b+8>>2]=1;d=c;d=d==0?3:d==1?3:d==2?6:d==-1?9:10;b:do if(d==3){d=wd(b);a[b+16>>2]=d;d=(a[b+16>>2]|0)!=0?5:4;do if(d==5){d=11;break b}else if(d==4){e=0;break a}while(0)}else if(d==6){d=b;
var f=H,g=H,j=H,j=ba(1,80),f=(j|0)!=0?1:4;c:do if(f==1){a[j>>2]=d;f=wd(d);a[j+4>>2]=f;f=(a[j+4>>2]|0)==0?2:3;do if(f==2){g=0;f=5;break c}else if(f==3){f=4;break c}while(0)}while(0);f==4&&(g=j);a[b+20>>2]=g;d=(a[b+20>>2]|0)!=0?8:7;do if(d==8){d=11;break b}else if(d==7){e=0;break a}while(0)}else if(d==9){d=10;break b}while(0);d==10?e=0:d==11&&(a[b+12>>2]=c,e=b)}else d==1&&(e=0);while(0);return e}function Ia(c,d,e){var b,f;b=(c|0)!=0?1:9;a:do if(b==1){if((d|0)==0){b=9;break a}b=a[c+12>>2];b=b==0?3:b==
1?4:b==2?5:b==-1?6:7;do if(b==3){f=dc(a[c+16>>2],d,e);b=10;break a}else if(b==4){f=Bd(a[c+16>>2],d);b=10;break a}else if(b==5){f=Vd(a[c+20>>2],d,e);b=10;break a}while(0);b=9;break a}while(0);b==9&&(f=0);return f}function ne(a,d){var e;e=(a|0)>(d|0)?1:2;if(e==1)var b=a;else e==2&&(b=d);return b}function na(a,d){var e;e=(a|0)<(d|0)?1:2;if(e==1)var b=a;else e==2&&(b=d);return b}function oe(c,d,e){var b,f,g,j,l,v,h,i,m,k,n,p,o,y,L,w,r,x,t,q,s,u,z;i=a[d+108>>2]+e*5588;h=ba(a[i+420>>2]+1,232);b=(h|0)!=
0?2:1;do if(b==2){v=0;b:for(;;){if(!((v|0)<(a[i+420>>2]+1|0))){b=39;break b}k=m=0;g=(e|0)%(a[d+68>>2]|0);j=(e|0)/(a[d+68>>2]|0)|0;a[h+v*232+200>>2]=ne(a[d+48>>2]+g*a[d+56>>2],a[c>>2]);a[h+v*232+204>>2]=ne(a[d+52>>2]+j*a[d+60>>2],a[c+4>>2]);a[h+v*232+208>>2]=na(a[d+48>>2]+(g+1)*a[d+56>>2],a[c+8>>2]);a[h+v*232+212>>2]=na(a[d+52>>2]+(j+1)*a[d+60>>2],a[c+12>>2]);a[h+v*232+192>>2]=a[c+16>>2];g=ba(a[c+16>>2],16);a[h+v*232+196>>2]=g;if((a[h+v*232+196>>2]|0)==0){b=5;break b}g=0;c:for(;;){if(!((g|0)<(a[h+
192>>2]|0)))break c;L=a[h+v*232+196>>2]+(g<<4);j=a[i+5584>>2]+g*1076;a[L>>2]=a[a[c+24>>2]+g*48>>2];a[L+4>>2]=a[a[c+24>>2]+g*48+4>>2];a[L+8>>2]=a[j+4>>2];l=ba(a[L+8>>2],16);a[L+12>>2]=l;if((a[L+12>>2]|0)==0){b=9;break b}n=S(a[h+200>>2],a[L>>2]);p=S(a[h+204>>2],a[L+4>>2]);o=S(a[h+208>>2],a[L>>2]);y=S(a[h+212>>2],a[L+4>>2]);b=(a[L+8>>2]|0)>(m|0)?11:12;b==11&&(m=a[L+8>>2]);l=0;d:for(;;){if(!((l|0)<(a[L+8>>2]|0)))break d;z=a[L+12>>2]+(l<<4);b=(a[j>>2]&1|0)!=0?15:16;b==15?(a[z>>2]=a[j+812+(l<<2)>>2],a[z+
4>>2]=a[j+944+(l<<2)>>2]):b==16&&(a[z>>2]=15,a[z+4>>2]=15);w=a[L+8>>2]-1-l;b=Ra(n,w);r=Ra(p,w);x=Ra(o,w);w=Ra(y,w);t=b>>(a[z>>2]|0)<<a[z>>2];q=r>>(a[z+4>>2]|0)<<a[z+4>>2];s=Ra(x,a[z>>2])<<a[z>>2];u=Ra(w,a[z+4>>2])<<a[z+4>>2];b=(b|0)==(x|0)?18:19;if(b==18)var C=0;else b==19&&(C=s-t>>(a[z>>2]|0));a[z+8>>2]=C;b=(r|0)==(w|0)?21:22;if(b==21)var D=0;else b==22&&(D=u-q>>(a[z+4>>2]|0));a[z+12>>2]=D;b=(a[z+8>>2]*a[z+12>>2]|0)>(k|0)?24:25;b==24&&(k=a[z+8>>2]*a[z+12>>2]);l+=1}g+=1}a[h+v*232+20>>2]=1;a[h+v*232+
16>>2]=k*a[h+v*232+20>>2];a[h+v*232+12>>2]=a[c+16>>2]*a[h+v*232+16>>2];a[h+v*232+8>>2]=m*a[h+v*232+12>>2];b=(v|0)==0?30:33;do if(b==30){if(g=ba(a[c+16>>2]*m*a[i+12>>2]*k,2),a[h+v*232+4>>2]=g,(a[h+v*232+4>>2]|0)==0){b=31;break b}}else b==33&&(a[h+v*232+4>>2]=a[h+(v-1)*232+4>>2]);while(0);b=(a[i+424>>2]|0)==0?35:36;b==35?(a[h+v*232+40>>2]=1,a[h+v*232+44>>2]=0,a[h+v*232+44+4>>2]=0,a[h+v*232+44+8>>2]=a[i+12>>2],a[h+v*232+44+12>>2]=m,a[h+v*232+44+16>>2]=a[c+16>>2],a[h+v*232+44+36>>2]=a[i+8>>2]):b==36&&
(a[h+v*232+40>>2]=1,a[h+v*232+44>>2]=a[i+428+v*148>>2],a[h+v*232+44+4>>2]=a[i+428+v*148+4>>2],a[h+v*232+44+8>>2]=a[i+428+v*148+8>>2],a[h+v*232+44+12>>2]=a[i+428+v*148+12>>2],a[h+v*232+44+16>>2]=a[i+428+v*148+16>>2],a[h+v*232+44+36>>2]=a[i+428+v*148+36>>2]);a[h+v*232+44+20>>2]=0;a[h+v*232+44+24>>2]=0;a[h+v*232+44+28>>2]=k;v+=1}b==39?f=h:b==5?f=0:b==9?f=0:b==31&&(f=0)}else b==1&&(f=0);while(0);return f}function S(a,d){return(a+d-1|0)/(d|0)|0}function Ra(a,d){return a+(1<<d)-1>>(d|0)}function pe(c){var d,
e,b,f,g;g=b=0;d=(a[c+40>>2]|0)!=0?2:1;a:do if(d==2){a[c+40>>2]=0;a[c+36>>2]=a[c+64>>2];d=4;break a}else if(d==1){b=a[c+196>>2]+(a[c+24>>2]<<4);d=18;break a}while(0);a:for(;;){b:do if(d==4){if(!((a[c+36>>2]|0)<(a[c+52>>2]|0))){d=26;break a}a[c+28>>2]=a[c+44>>2];d=6;break b}else if(d==18){a[c+32>>2]+=1;d=14;break b}while(0);b:for(;;){c:do if(d==6){if(!((a[c+28>>2]|0)<(a[c+56>>2]|0))){d=24;break b}a[c+24>>2]=a[c+48>>2];d=8;break c}else if(d==14){if((a[c+32>>2]|0)<(a[c+72>>2]|0)){d=15;break b}d=21;break c}while(0);
c:for(;;){do if(d==8){if(!((a[c+24>>2]|0)<(a[c+60>>2]|0))){d=22;break c}b=a[c+196>>2]+(a[c+24>>2]<<4);if(!((a[c+28>>2]|0)>=(a[b+8>>2]|0))){d=11;break c}d=21;continue c}else if(d==21){a[c+24>>2]+=1;d=8;continue c}while(0)}do if(d==22){a[c+28>>2]+=1;d=6;continue b}else if(d==11){f=a[b+12>>2]+(a[c+28>>2]<<4);d=p[c]<<24>>24!=0?13:12;d==12&&(a[c+72>>2]=a[f+8>>2]*a[f+12>>2]);a[c+32>>2]=a[c+68>>2];d=14;continue b}while(0)}do if(d==24){a[c+36>>2]+=1;d=4;continue a}else if(d==15){g=a[c+36>>2]*a[c+8>>2]+a[c+
28>>2]*a[c+12>>2]+a[c+24>>2]*a[c+16>>2]+a[c+32>>2]*a[c+20>>2];if(q[a[c+4>>2]+(g<<1)>>1]<<16>>16==0){d=16;break a}d=18;continue a}while(0)}d==26?e=0:d==16&&(e=q[a[c+4>>2]+(g<<1)>>1]=1);return e}function qe(c){var d,e,b,f,g;g=b=0;d=(a[c+40>>2]|0)!=0?2:1;a:do if(d==2){a[c+40>>2]=0;a[c+28>>2]=a[c+44>>2];d=4;break a}else if(d==1){b=a[c+196>>2]+(a[c+24>>2]<<4);d=18;break a}while(0);a:for(;;){b:do if(d==4){if(!((a[c+28>>2]|0)<(a[c+56>>2]|0))){d=26;break a}a[c+36>>2]=a[c+64>>2];d=6;break b}else if(d==18){a[c+
32>>2]+=1;d=14;break b}while(0);b:for(;;){c:do if(d==6){if(!((a[c+36>>2]|0)<(a[c+52>>2]|0))){d=24;break b}a[c+24>>2]=a[c+48>>2];d=8;break c}else if(d==14){if((a[c+32>>2]|0)<(a[c+72>>2]|0)){d=15;break b}d=21;break c}while(0);c:for(;;){do if(d==8){if(!((a[c+24>>2]|0)<(a[c+60>>2]|0))){d=22;break c}b=a[c+196>>2]+(a[c+24>>2]<<4);if(!((a[c+28>>2]|0)>=(a[b+8>>2]|0))){d=11;break c}d=21;continue c}else if(d==21){a[c+24>>2]+=1;d=8;continue c}while(0)}do if(d==22){a[c+36>>2]+=1;d=6;continue b}else if(d==11){f=
a[b+12>>2]+(a[c+28>>2]<<4);d=p[c]<<24>>24!=0?13:12;d==12&&(a[c+72>>2]=a[f+8>>2]*a[f+12>>2]);a[c+32>>2]=a[c+68>>2];d=14;continue b}while(0)}do if(d==24){a[c+28>>2]+=1;d=4;continue a}else if(d==15){g=a[c+36>>2]*a[c+8>>2]+a[c+28>>2]*a[c+12>>2]+a[c+24>>2]*a[c+16>>2]+a[c+32>>2]*a[c+20>>2];if(q[a[c+4>>2]+(g<<1)>>1]<<16>>16==0){d=16;break a}d=18;continue a}while(0)}d==26?e=0:d==16&&(e=q[a[c+4>>2]+(g<<1)>>1]=1);return e}function re(c){var d,e,b,f,g,j,l,h,i,k,m,n;g=f=b=0;d=(a[c+40>>2]|0)!=0?2:1;a:do if(d==
2){a[c+40>>2]=0;a[c+224>>2]=0;j=a[c+228>>2]=0;b:for(;;){if(!((j|0)<(a[c+192>>2]|0)))break b;b=a[c+196>>2]+(j<<4);l=0;c:for(;;){if(!((l|0)<(a[b+8>>2]|0)))break c;f=a[b+12>>2]+(l<<4);h=a[b>>2]*(1<<a[f>>2]+a[b+8>>2]-1-l);i=a[b+4>>2]*(1<<a[f+4>>2]+a[b+8>>2]-1-l);d=(a[c+224>>2]|0)!=0?8:7;if(d==8)var o=na(a[c+224>>2],h);else d==7&&(o=h);a[c+224>>2]=o;d=(a[c+228>>2]|0)!=0?11:10;if(d==11)var ia=na(a[c+228>>2],i);else d==10&&(ia=i);a[c+228>>2]=ia;l+=1}j+=1}d=p[c]<<24>>24!=0?19:18;d==18&&(a[c+104>>2]=a[c+204>>
2],a[c+96>>2]=a[c+200>>2],a[c+108>>2]=a[c+212>>2],a[c+100>>2]=a[c+208>>2]);a[c+28>>2]=a[c+44>>2];d=20;break a}else if(d==1){d=48;break a}while(0);a:for(;;){b:do if(d==20){if(!((a[c+28>>2]|0)<(a[c+56>>2]|0))){d=58;break a}a[c+220>>2]=a[c+104>>2];d=22;break b}else if(d==48){a[c+36>>2]+=1;d=44;break b}while(0);b:for(;;){c:do if(d==22){if(!((a[c+220>>2]|0)<(a[c+108>>2]|0))){d=56;break b}a[c+216>>2]=a[c+96>>2];d=24;break c}else if(d==44){if((a[c+36>>2]|0)<(a[c+52>>2]|0)){d=45;break b}d=51;break c}while(0);
c:for(;;){do if(d==24){if(!((a[c+216>>2]|0)<(a[c+100>>2]|0))){d=54;break c}a[c+24>>2]=a[c+48>>2]}else d==51&&(a[c+24>>2]+=1);while(0);d=(a[c+24>>2]|0)<(a[c+60>>2]|0)?27:52;do if(d==27){b=a[c+196>>2]+(a[c+24>>2]<<4);d=(a[c+28>>2]|0)>=(a[b+8>>2]|0)?28:29;do if(d==28){d=51;continue c}else if(d==29){f=a[b+12>>2]+(a[c+28>>2]<<4);k=a[b+8>>2]-1-a[c+28>>2];m=S(a[c+200>>2],a[b>>2]<<k);n=S(a[c+204>>2],a[b+4>>2]<<k);j=S(a[c+208>>2],a[b>>2]<<k);l=S(a[c+212>>2],a[b+4>>2]<<k);h=a[f>>2]+k;i=a[f+4>>2]+k;d=((a[c+
220>>2]|0)%(a[b+4>>2]<<i|0)|0)==0?33:30;f:do if(d==30){d=(a[c+220>>2]|0)==(a[c+204>>2]|0)?31:32;do if(d==31&&((n<<k|0)%(1<<i|0)|0)!=0)break f;while(0);d=51;continue c}while(0);d=((a[c+216>>2]|0)%(a[b>>2]<<h|0)|0)==0?37:34;f:do if(d==34){d=(a[c+216>>2]|0)==(a[c+200>>2]|0)?35:36;do if(d==35&&((m<<k|0)%(1<<h|0)|0)!=0)break f;while(0);d=51;continue c}while(0);d=(a[f+8>>2]|0)==0?39:38;f:do if(d==38){if((a[f+12>>2]|0)==0)break f;d=(m|0)==(j|0)?42:41;do if(d==41&&(n|0)!=(l|0)){d=43;break c}while(0);d=51;
continue c}while(0);d=51;continue c}while(0)}else if(d==52){a[c+216>>2]+=a[c+224>>2]-(a[c+216>>2]|0)%(a[c+224>>2]|0);d=24;continue c}while(0)}do if(d==54){a[c+220>>2]+=a[c+228>>2]-(a[c+220>>2]|0)%(a[c+228>>2]|0);d=22;continue b}else if(d==43){d=(S(a[c+216>>2],a[b>>2]<<k)>>(a[f>>2]|0))-(m>>(a[f>>2]|0));j=(S(a[c+220>>2],a[b+4>>2]<<k)>>(a[f+4>>2]|0))-(n>>(a[f+4>>2]|0));a[c+32>>2]=d+j*a[f+8>>2];a[c+36>>2]=a[c+64>>2];d=44;continue b}while(0)}do if(d==56){a[c+28>>2]+=1;d=20;continue a}else if(d==45){g=
a[c+36>>2]*a[c+8>>2]+a[c+28>>2]*a[c+12>>2]+a[c+24>>2]*a[c+16>>2]+a[c+32>>2]*a[c+20>>2];if(q[a[c+4>>2]+(g<<1)>>1]<<16>>16==0){d=46;break a}d=48;continue a}while(0)}d==58?e=0:d==46&&(e=q[a[c+4>>2]+(g<<1)>>1]=1);return e}function se(c){var d,e,b,f,g,j,l,h,i,k,m,n;g=f=b=0;d=(a[c+40>>2]|0)!=0?2:1;a:do if(d==2){a[c+40>>2]=0;a[c+224>>2]=0;j=a[c+228>>2]=0;b:for(;;){if(!((j|0)<(a[c+192>>2]|0)))break b;b=a[c+196>>2]+(j<<4);l=0;c:for(;;){if(!((l|0)<(a[b+8>>2]|0)))break c;f=a[b+12>>2]+(l<<4);h=a[b>>2]*(1<<a[f>>
2]+a[b+8>>2]-1-l);i=a[b+4>>2]*(1<<a[f+4>>2]+a[b+8>>2]-1-l);d=(a[c+224>>2]|0)!=0?8:7;if(d==8)var o=na(a[c+224>>2],h);else d==7&&(o=h);a[c+224>>2]=o;d=(a[c+228>>2]|0)!=0?11:10;if(d==11)var ia=na(a[c+228>>2],i);else d==10&&(ia=i);a[c+228>>2]=ia;l+=1}j+=1}d=p[c]<<24>>24!=0?19:18;d==18&&(a[c+104>>2]=a[c+204>>2],a[c+96>>2]=a[c+200>>2],a[c+108>>2]=a[c+212>>2],a[c+100>>2]=a[c+208>>2]);a[c+220>>2]=a[c+104>>2];d=20;break a}else if(d==1){b=a[c+196>>2]+(a[c+24>>2]<<4);d=46;break a}while(0);a:for(;;){b:do if(d==
20){if(!((a[c+220>>2]|0)<(a[c+108>>2]|0))){d=56;break a}a[c+216>>2]=a[c+96>>2];d=22;break b}else if(d==46){a[c+36>>2]+=1;d=42;break b}while(0);b:for(;;){c:do if(d==22){if(!((a[c+216>>2]|0)<(a[c+100>>2]|0))){d=54;break b}a[c+24>>2]=a[c+48>>2];d=24;break c}else if(d==42){if((a[c+36>>2]|0)<(a[c+52>>2]|0)){d=43;break b}d=49;break c}while(0);c:for(;;){do if(d==24){if(!((a[c+24>>2]|0)<(a[c+60>>2]|0))){d=52;break c}b=a[c+196>>2]+(a[c+24>>2]<<4);a[c+28>>2]=a[c+44>>2]}else d==49&&(a[c+28>>2]+=1);while(0);
d=(a[c+28>>2]|0)<(na(a[c+56>>2],a[b+8>>2])|0)?27:50;do if(d==27){f=a[b+12>>2]+(a[c+28>>2]<<4);k=a[b+8>>2]-1-a[c+28>>2];m=S(a[c+200>>2],a[b>>2]<<k);n=S(a[c+204>>2],a[b+4>>2]<<k);j=S(a[c+208>>2],a[b>>2]<<k);l=S(a[c+212>>2],a[b+4>>2]<<k);h=a[f>>2]+k;i=a[f+4>>2]+k;d=((a[c+220>>2]|0)%(a[b+4>>2]<<i|0)|0)==0?31:28;e:do if(d==28){d=(a[c+220>>2]|0)==(a[c+204>>2]|0)?29:30;do if(d==29&&((n<<k|0)%(1<<i|0)|0)!=0)break e;while(0);d=49;continue c}while(0);d=((a[c+216>>2]|0)%(a[b>>2]<<h|0)|0)==0?35:32;e:do if(d==
32){d=(a[c+216>>2]|0)==(a[c+200>>2]|0)?33:34;do if(d==33&&((m<<k|0)%(1<<h|0)|0)!=0)break e;while(0);d=49;continue c}while(0);d=(a[f+8>>2]|0)==0?37:36;e:do if(d==36){if((a[f+12>>2]|0)==0)break e;d=(m|0)==(j|0)?40:39;do if(d==39&&(n|0)!=(l|0)){d=41;break c}while(0);d=49;continue c}while(0);d=49;continue c}else if(d==50){a[c+24>>2]+=1;d=24;continue c}while(0)}do if(d==52){a[c+216>>2]+=a[c+224>>2]-(a[c+216>>2]|0)%(a[c+224>>2]|0);d=22;continue b}else if(d==41){d=(S(a[c+216>>2],a[b>>2]<<k)>>(a[f>>2]|0))-
(m>>(a[f>>2]|0));j=(S(a[c+220>>2],a[b+4>>2]<<k)>>(a[f+4>>2]|0))-(n>>(a[f+4>>2]|0));a[c+32>>2]=d+j*a[f+8>>2];a[c+36>>2]=a[c+64>>2];d=42;continue b}while(0)}do if(d==54){a[c+220>>2]+=a[c+228>>2]-(a[c+220>>2]|0)%(a[c+228>>2]|0);d=20;continue a}else if(d==43){g=a[c+36>>2]*a[c+8>>2]+a[c+28>>2]*a[c+12>>2]+a[c+24>>2]*a[c+16>>2]+a[c+32>>2]*a[c+20>>2];if(q[a[c+4>>2]+(g<<1)>>1]<<16>>16==0){d=44;break a}d=46;continue a}while(0)}d==56?e=0:d==44&&(e=q[a[c+4>>2]+(g<<1)>>1]=1);return e}function te(c){var d,e,b,
f,g,j,l,h,i,k,m,n;g=f=b=0;d=(a[c+40>>2]|0)!=0?2:1;a:do if(d==2){a[c+40>>2]=0;a[c+24>>2]=a[c+48>>2];d=4;break a}else if(d==1){b=a[c+196>>2]+(a[c+24>>2]<<4);d=42;break a}while(0);a:for(;;){b:do if(d==4){if(!((a[c+24>>2]|0)<(a[c+60>>2]|0))){d=52;break a}b=a[c+196>>2]+(a[c+24>>2]<<4);a[c+224>>2]=0;j=a[c+228>>2]=0;c:for(;;){if(!((j|0)<(a[b+8>>2]|0)))break c;f=a[b+12>>2]+(j<<4);l=a[b>>2]*(1<<a[f>>2]+a[b+8>>2]-1-j);h=a[b+4>>2]*(1<<a[f+4>>2]+a[b+8>>2]-1-j);d=(a[c+224>>2]|0)!=0?9:8;if(d==9)var o=na(a[c+224>>
2],l);else d==8&&(o=l);a[c+224>>2]=o;d=(a[c+228>>2]|0)!=0?12:11;if(d==12)var ia=na(a[c+228>>2],h);else d==11&&(ia=h);a[c+228>>2]=ia;j+=1}d=p[c]<<24>>24!=0?17:16;d==16&&(a[c+104>>2]=a[c+204>>2],a[c+96>>2]=a[c+200>>2],a[c+108>>2]=a[c+212>>2],a[c+100>>2]=a[c+208>>2]);a[c+220>>2]=a[c+104>>2];d=18;break b}else if(d==42){a[c+36>>2]+=1;d=38;break b}while(0);b:for(;;){c:do if(d==18){if(!((a[c+220>>2]|0)<(a[c+108>>2]|0))){d=50;break b}a[c+216>>2]=a[c+96>>2];d=20;break c}else if(d==38){if((a[c+36>>2]|0)<(a[c+
52>>2]|0)){d=39;break b}d=45;break c}while(0);c:for(;;){do if(d==20){if(!((a[c+216>>2]|0)<(a[c+100>>2]|0))){d=48;break c}a[c+28>>2]=a[c+44>>2]}else d==45&&(a[c+28>>2]+=1);while(0);d=(a[c+28>>2]|0)<(na(a[c+56>>2],a[b+8>>2])|0)?23:46;do if(d==23){f=a[b+12>>2]+(a[c+28>>2]<<4);i=a[b+8>>2]-1-a[c+28>>2];k=S(a[c+200>>2],a[b>>2]<<i);m=S(a[c+204>>2],a[b+4>>2]<<i);j=S(a[c+208>>2],a[b>>2]<<i);l=S(a[c+212>>2],a[b+4>>2]<<i);h=a[f>>2]+i;n=a[f+4>>2]+i;d=((a[c+220>>2]|0)%(a[b+4>>2]<<n|0)|0)==0?27:24;e:do if(d==24){d=
(a[c+220>>2]|0)==(a[c+204>>2]|0)?25:26;do if(d==25&&((m<<i|0)%(1<<n|0)|0)!=0)break e;while(0);d=45;continue c}while(0);d=((a[c+216>>2]|0)%(a[b>>2]<<h|0)|0)==0?31:28;e:do if(d==28){d=(a[c+216>>2]|0)==(a[c+200>>2]|0)?29:30;do if(d==29&&((k<<i|0)%(1<<h|0)|0)!=0)break e;while(0);d=45;continue c}while(0);d=(a[f+8>>2]|0)==0?33:32;e:do if(d==32){if((a[f+12>>2]|0)==0)break e;d=(k|0)==(j|0)?36:35;do if(d==35&&(m|0)!=(l|0)){d=37;break c}while(0);d=45;continue c}while(0);d=45;continue c}else if(d==46){a[c+216>>
2]+=a[c+224>>2]-(a[c+216>>2]|0)%(a[c+224>>2]|0);d=20;continue c}while(0)}do if(d==48){a[c+220>>2]+=a[c+228>>2]-(a[c+220>>2]|0)%(a[c+228>>2]|0);d=18;continue b}else if(d==37){d=(S(a[c+216>>2],a[b>>2]<<i)>>(a[f>>2]|0))-(k>>(a[f>>2]|0));j=(S(a[c+220>>2],a[b+4>>2]<<i)>>(a[f+4>>2]|0))-(m>>(a[f+4>>2]|0));a[c+32>>2]=d+j*a[f+8>>2];a[c+36>>2]=a[c+64>>2];d=38;continue b}while(0)}do if(d==50){a[c+24>>2]+=1;d=4;continue a}else if(d==39){g=a[c+36>>2]*a[c+8>>2]+a[c+28>>2]*a[c+12>>2]+a[c+24>>2]*a[c+16>>2]+a[c+32>>
2]*a[c+20>>2];if(q[a[c+4>>2]+(g<<1)>>1]<<16>>16==0){d=40;break a}d=42;continue a}while(0)}d==52?e=0:d==40&&(e=q[a[c+4>>2]+(g<<1)>>1]=1);return e}function Db(c){var d;d=(a[c+4>>2]|0)==0?1:7;d==1&&(a[c+4>>2]=8,d=(a[c+12>>2]|0)==(a[c+8>>2]|0)?2:3,d==2?p[c]=-1:d==3&&(d=(U[c]&255|0)==255?4:5,d==4&&(a[c+4>>2]=7),p[c]=p[a[c+20>>2]+a[c+12>>2]],a[c+12>>2]+=1));a[c+4>>2]-=1;return(U[c]&255)>>(a[c+4>>2]|0)&1}function ue(c,d,e){var b,f,g,j;g=d*e;b=(g|0)>(a[c+28>>2]|0)?1:4;a:do if(b==1){b=fb(g<<2);a[c+12>>2]=
b;b=(a[c+12>>2]|0)!=0?3:2;do if(b==3){a[c+28>>2]=g;b=4;break a}else if(b==2){f=0;b=9;break a}while(0)}while(0);a:do if(b==4){var l,h;f=a[c+12>>2];j=f+(g<<2);h=0;h<0&&(h+=256);for(h=h+(h<<8)+(h<<16)+h*16777216;f%4!==0&&f<j;)p[f++]=0;f>>=2;for(l=j>>2;f<l;)a[f++]=h;for(f<<=2;f<j;)p[f++]=0;a[c+36>>2]=d+2;j=a[c+36>>2]*(e+2);b=(j|0)>(a[c+32>>2]|0)?5:8;do if(b==5){b=fb(j<<1);a[c+16>>2]=b;b=(a[c+16>>2]|0)!=0?7:6;do if(b==7)a[c+32>>2]=j;else if(b==6){f=0;break a}while(0)}while(0);f=a[c+16>>2];j=f+(j<<1);h=
0;h<0&&(h+=256);for(h=h+(h<<8)+(h<<16)+h*16777216;f%4!==0&&f<j;)p[f++]=0;f>>=2;for(l=j>>2;f<l;)a[f++]=h;for(f<<=2;f<j;)p[f++]=0;a[c+20>>2]=d;a[c+24>>2]=e;f=1}while(0);return f}function ve(c,d,e){var b,f,g,j,l,h,i,k,m,n,p,o,A,y,L,w,r,x,t;h=a[d+8>>2]-a[d>>2];f=0;a:for(;;){if(!((f|0)<(a[d+16>>2]|0)))break a;i=a[d+20>>2]+f*124;g=0;b:for(;;){if(!((g|0)<(a[i+24>>2]|0)))break b;k=i+28+(g<<5);j=0;c:for(;;){if(!((j|0)<(a[i+16>>2]*a[i+20>>2]|0)))break c;m=a[k+20>>2]+j*36;l=0;d:for(;;){if(!((l|0)<(a[m+16>>2]*
a[m+20>>2]|0)))break d;n=a[m+24>>2]+l*44;we(c,n,a[k+16>>2],a[e+808>>2],a[e+16>>2]);y=a[n+8>>2]-a[k>>2];n=a[n+12>>2]-a[k+4>>2];b=(a[k+16>>2]&1|0)!=0?9:10;b==9&&(b=a[d+20>>2]+(f-1)*124,y+=a[b+8>>2]-a[b>>2]);b=(a[k+16>>2]&2|0)!=0?11:12;b==11&&(b=a[d+20>>2]+(f-1)*124,n+=a[b+12>>2]-a[b+4>>2]);p=a[c+12>>2];o=a[c+20>>2];A=a[c+24>>2];b=(a[e+808>>2]|0)!=0?13:27;do if(b==13){r=1<<a[e+808>>2];w=0;f:for(;;){if(!((w|0)<(A|0))){b=26;break f}L=0;g:for(;;){if(!((L|0)<(o|0))){b=24;break g}x=a[p+(w*o+L<<2)>>2];t=hi(x);
b=(t|0)>=(r|0)?18:22;if(b==18){t>>=a[e+808>>2]|0;b=(x|0)<0?19:20;if(b==19)var q=-t;else b==20&&(q=t);a[p+(w*o+L<<2)>>2]=q}L+=1}w+=1}}while(0);b=(a[e+20>>2]|0)==1?28:37;do if(b==28){r=a[d+24>>2]+(n*h+y<<2);w=0;f:for(;;){if(!((w|0)<(A|0))){b=36;break f}L=0;g:for(;;){if(!((L|0)<(o|0))){b=34;break g}x=a[p+(w*o+L<<2)>>2];a[r+(w*h+L<<2)>>2]=(x|0)/2|0;L+=1}w+=1}}else if(b==37){r=a[d+24>>2]+(n*h+y<<2);w=0;f:for(;;){if(!((w|0)<(A|0))){b=45;break f}x=r;L=0;g:for(;;){if(!((L|0)<(o|0))){b=43;break g}t=(a[p>>
2]|0)*u[k+28>>2];u[x>>2]=t;p+=4;x+=4;L+=1}r+=h<<2;w+=1}}while(0);l+=1}j+=1}g+=1}f+=1}}function we(c,d,e,b,f){var g,j,l,h,i,k,m,n,o;j=a[c+8>>2];l=a[c+4>>2];g=(ue(c,a[d+16>>2]-a[d+8>>2],a[d+20>>2]-a[d+12>>2])|0)!=0?2:1;a:do if(g==2){h=b+a[d+24>>2]-1;i=2;ie(l);Qa(l,18,46);Qa(l,17,3);Qa(l,0,4);k=0;for(;;){if(!((k|0)<(a[d+40>>2]|0)))break a;o=a[d+4>>2]+k*28;if((h|0)<=(a[d+24>>2]-1-4|0))g=5;else{var ia=0;g=7}c:do if(g==5){if(!((i|0)<2)){ia=0;break c}ia=(f&1|0)!=0}while(0);n=(ia?1:0)&255;g=(a[o>>2]|0)==
0?8:9;do if(g!=8&&g==9){g=(n<<24>>24|0)==1?10:11;if(g==10){m=j;var A=a[o+12>>2];a[m+20>>2]=a[a[o>>2]>>2]+a[o+4>>2];a[m+8>>2]=A;a[m+12>>2]=0;p[m]=0;a[m+4>>2]=0}else g==11&&je(l,a[a[o>>2]>>2]+a[o+4>>2],a[o+12>>2]);m=0;d:for(;;){if(!((m|0)<(a[o+8>>2]|0))){g=37;break d}g=i==0?15:i==1?22:i==2?29:30;g==15?(g=(n<<24>>24|0)==1?16:17,g==16?xe(c,h+1,0,f):g==17&&(g=(f&8|0)!=0?18:19,g==18?ye(c,h+1,e):g==19&&ze(c,h+1,e))):g==22?(g=(n<<24>>24|0)==1?23:24,g==23?Ae(c,h+1,f):g==24&&(g=(f&8|0)!=0?25:26,g==25?Be(c,
h+1):g==26&&Ce(c,h+1))):g==29&&De(c,h+1,e,f);g=(f&2|0)!=0?31:33;e:do if(g==31){if((n<<24>>24|0)!=0)break e;ie(l);Qa(l,18,46);Qa(l,17,3);Qa(l,0,4)}while(0);i=g=i+1;g=(g|0)==3?34:35;g==34&&(i=0,h-=1);m+=1}}while(0);k+=1}}while(0)}function xe(c,d,e,b){var f,g,j,d=1<<d;j=d|d>>1;g=0;a:for(;;){if(!((g|0)<(a[c+24>>2]|0)))break a;d=0;b:for(;;){if(!((d|0)<(a[c+20>>2]|0)))break b;e=g;c:for(;;){if((e|0)<(g+4|0))f=6;else{var l=0;f=7}f==6&&(l=(e|0)<(a[c+24>>2]|0));if(!l)break c;if((b&8|0)!=0)f=9;else{var h=0;
f=12}if(f==9){if((e|0)==(g+3|0)){var i=1;f=11}else f=10;f==10&&(i=(e|0)==(a[c+24>>2]-1|0));h=i}f=h?1:0;Ee(c,a[c+16>>2]+((e+1)*a[c+36>>2]+d+1<<1),a[c+12>>2]+(e*a[c+20>>2]+d<<2),0,j,f);e+=1}d+=1}g+=4}}function ye(c,d,e){var b,f,g,j,d=1<<d;j=d|d>>1;g=0;a:for(;;){if(!((g|0)<(a[c+24>>2]|0)))break a;d=0;b:for(;;){if(!((d|0)<(a[c+20>>2]|0)))break b;f=g;c:for(;;){if((f|0)<(g+4|0))b=6;else{var l=0;b=7}b==6&&(l=(f|0)<(a[c+24>>2]|0));if(!l)break c;if((f|0)==(g+3|0)){var h=1;b=10}else b=9;b==9&&(h=(f|0)==(a[c+
24>>2]-1|0));b=h?1:0;Fe(c,a[c+16>>2]+((f+1)*a[c+36>>2]+d+1<<1),a[c+12>>2]+(f*a[c+20>>2]+d<<2),e,j,b);f+=1}d+=1}g+=4}}function ze(c,d,e){var b,f,g,j,l,h,i;j=a[c+12>>2];l=a[c+16>>2]+2;d=1<<d;g=d|d>>1;f=0;a:for(;;){if(!((f|0)<(a[c+24>>2]&-4|0)))break a;d=0;b:for(;;){if(!((d|0)<(a[c+20>>2]|0)))break b;b=j+(d<<2);h=l+(d<<1);h+=a[c+36>>2]<<1;Sa(c,h,b,e,g);b+=a[c+20>>2]<<2;h+=a[c+36>>2]<<1;Sa(c,h,b,e,g);b+=a[c+20>>2]<<2;h+=a[c+36>>2]<<1;Sa(c,h,b,e,g);b+=a[c+20>>2]<<2;h+=a[c+36>>2]<<1;Sa(c,h,b,e,g);d+=1}j+=
a[c+20>>2]<<2<<2;l+=a[c+36>>2]<<2<<1;f+=4}d=0;a:for(;;){if(!((d|0)<(a[c+20>>2]|0)))break a;h=j+(d<<2);i=l+(d<<1);b=f;b:for(;;){if(!((b|0)<(a[c+24>>2]|0)))break b;i+=a[c+36>>2]<<1;Sa(c,i,h,e,g);h+=a[c+20>>2]<<2;b+=1}d+=1}}function Ae(c,d,e){var b,f,g,j,l;j=1<<d>>1;d=(d|0)>0?1:2;d==1?b=-j:d==2&&(b=-1);l=b;g=0;a:for(;;){if(!((g|0)<(a[c+24>>2]|0)))break a;b=0;b:for(;;){if(!((b|0)<(a[c+20>>2]|0)))break b;f=g;c:for(;;){if((f|0)<(g+4|0))d=9;else var h=0,d=10;d==9&&(h=(f|0)<(a[c+24>>2]|0));if(!h)break c;
if((e&8|0)!=0)d=12;else var i=0,d=15;if(d==12){if((f|0)==(g+3|0))var k=1,d=14;else d=13;d==13&&(k=(f|0)==(a[c+24>>2]-1|0));i=k}d=i?1:0;Ge(c,a[c+16>>2]+((f+1)*a[c+36>>2]+b+1<<1),a[c+12>>2]+(f*a[c+20>>2]+b<<2),j,l,d);f+=1}b+=1}g+=4}}function Be(c,d){var e,b,f,g,j,l;j=1<<d>>1;e=(d|0)>0?1:2;e==1?b=-j:e==2&&(b=-1);l=b;g=0;a:for(;;){if(!((g|0)<(a[c+24>>2]|0)))break a;b=0;b:for(;;){if(!((b|0)<(a[c+20>>2]|0)))break b;f=g;c:for(;;){if((f|0)<(g+4|0))e=9;else{var h=0;e=10}e==9&&(h=(f|0)<(a[c+24>>2]|0));if(!h)break c;
if((f|0)==(g+3|0)){var i=1;e=13}else e=12;e==12&&(i=(f|0)==(a[c+24>>2]-1|0));e=i?1:0;He(c,a[c+16>>2]+((f+1)*a[c+36>>2]+b+1<<1),a[c+12>>2]+(f*a[c+20>>2]+b<<2),j,l,e);f+=1}b+=1}g+=4}}function Ce(c,d){var e,b,f,g,j,l,h,i,k;l=a[c+12>>2];h=a[c+16>>2]+2;g=1<<d>>1;e=(d|0)>0?1:2;e==1?f=-g:e==2&&(f=-1);j=f;f=0;a:for(;;){if(!((f|0)<(a[c+24>>2]&-4|0)))break a;e=0;b:for(;;){if(!((e|0)<(a[c+20>>2]|0)))break b;b=l+(e<<2);i=h+(e<<1);i+=a[c+36>>2]<<1;Ta(c,i,b,g,j);b+=a[c+20>>2]<<2;i+=a[c+36>>2]<<1;Ta(c,i,b,g,j);
b+=a[c+20>>2]<<2;i+=a[c+36>>2]<<1;Ta(c,i,b,g,j);b+=a[c+20>>2]<<2;i+=a[c+36>>2]<<1;Ta(c,i,b,g,j);e+=1}l+=a[c+20>>2]<<2<<2;h+=a[c+36>>2]<<2<<1;f+=4}e=0;a:for(;;){if(!((e|0)<(a[c+20>>2]|0)))break a;i=l+(e<<2);k=h+(e<<1);b=f;b:for(;;){if(!((b|0)<(a[c+24>>2]|0)))break b;k+=a[c+36>>2]<<1;Ta(c,k,i,g,j);i+=a[c+20>>2]<<2;b+=1}e+=1}}function De(c,d,e,b){var f,g,j,l,h,i,k,m,n,o,p;k=b&32;m=a[c+4>>2];d=1<<d;d|=d>>1;f=(b&8|0)!=0?1:32;do if(f==1){j=0;b:for(;;){if(!((j|0)<(a[c+24>>2]|0))){f=31;break b}b=0;c:for(;;){if(!((b|
0)<(a[c+20>>2]|0))){f=29;break c}f=(j+3|0)<(a[c+24>>2]|0)?6:11;do if(f==6){if((q[a[c+16>>2]+((j+1)*a[c+36>>2]+(b+1)<<1)>>1]<<16>>16&20735|0)!=0){var A=1;f=10}else f=7;e:do if(f==7){if((q[a[c+16>>2]+((j+2)*a[c+36>>2]+(b+1)<<1)>>1]<<16>>16&20735|0)!=0){A=1;f=10;break e}if((q[a[c+16>>2]+((j+3)*a[c+36>>2]+(b+1)<<1)>>1]<<16>>16&20735|0)!=0){A=1;f=10;break e}A=(q[a[c+16>>2]+((j+4)*a[c+36>>2]+(b+1)<<1)>>1]<<16>>16&20665|0)!=0}while(0);l=(A^1)&1}else f==11&&(l=0);while(0);f=(l|0)!=0?13:16;d:do if(f==13){a[m+
100>>2]=m+92;f=(V(m)|0)!=0?15:14;do if(f==15){a[m+100>>2]=m+96;h=V(m);h<<=1;f=V(m);h|=f;f=17;break d}else if(f==14){f=28;break d}while(0)}else if(f==16){h=0;f=17;break d}while(0);do if(f==17){g=j+h;e:for(;;){if((g|0)<(j+4|0))f=19;else{var y=0;f=20}f==19&&(y=(g|0)<(a[c+24>>2]|0));if(!y){f=27;break e}if((g|0)==(j+3|0)){var r=1;f=23}else f=22;f==22&&(r=(g|0)==(a[c+24>>2]-1|0));i=r?1:0;n=c;o=a[c+16>>2]+((g+1)*a[c+36>>2]+b+1<<1);p=a[c+12>>2]+(g*a[c+20>>2]+b<<2);var w=e,x=d;if((l|0)!=0)f=24;else{var t=
0;f=25}f==24&&(t=(g|0)==(j+h|0));Ie(n,o,p,w,x,t&1,i);g+=1}}while(0);b+=1}j+=4}}else if(f==32){i=a[c+12>>2];n=a[c+16>>2]+2;j=0;b:for(;;){if(!((j|0)<(a[c+24>>2]&-4|0))){f=59;break b}b=0;c:for(;;){if(!((b|0)<(a[c+20>>2]|0))){f=57;break c}o=i+(b<<2);p=n+(b<<1);if((q[a[c+16>>2]+((j+1)*a[c+36>>2]+(b+1)<<1)>>1]<<16>>16&20735|0)!=0){var s=1;f=40}else f=37;d:do if(f==37){if((q[a[c+16>>2]+((j+2)*a[c+36>>2]+(b+1)<<1)>>1]<<16>>16&20735|0)!=0){s=1;break d}if((q[a[c+16>>2]+((j+3)*a[c+36>>2]+(b+1)<<1)>>1]<<16>>
16&20735|0)!=0){s=1;break d}s=(q[a[c+16>>2]+((j+4)*a[c+36>>2]+(b+1)<<1)>>1]<<16>>16&20735|0)!=0}while(0);l=(s^1)&1;f=(l|0)!=0?41:54;d:do if(f==41){a[m+100>>2]=m+92;f=(V(m)|0)!=0?43:42;do if(f==43){a[m+100>>2]=m+96;h=V(m);h<<=1;f=V(m);h|=f;p+=h*a[c+36>>2]<<1;o+=h*a[c+20>>2]<<2;g=j+h;f:for(;;){if((g|0)<(j+4|0))f=45;else{var B=0;f=46}f==45&&(B=(g|0)<(a[c+24>>2]|0));if(!B)break f;p+=a[c+36>>2]<<1;f=(l|0)!=0?48:50;g:do if(f==48){if((g|0)!=(j+h|0)){f=50;break g}Je(c,p,o,0,d);f=51;break g}while(0);f==50&&
Ja(c,p,o,e,d);o+=a[c+20>>2]<<2;g+=1}f=55;break d}else if(f==42){f=56;break d}while(0)}else if(f==54){p+=a[c+36>>2]<<1;Ja(c,p,o,e,d);o+=a[c+20>>2]<<2;p+=a[c+36>>2]<<1;Ja(c,p,o,e,d);o+=a[c+20>>2]<<2;p+=a[c+36>>2]<<1;Ja(c,p,o,e,d);o+=a[c+20>>2]<<2;p+=a[c+36>>2]<<1;Ja(c,p,o,e,d);f=55;break d}while(0);b+=1}i+=a[c+20>>2]<<2<<2;n+=a[c+36>>2]<<2<<1;j+=4}b=0;b:for(;;){if(!((b|0)<(a[c+20>>2]|0))){f=67;break b}o=i+(b<<2);p=n+(b<<1);g=j;c:for(;;){if(!((g|0)<(a[c+24>>2]|0))){f=65;break c}p+=a[c+36>>2]<<1;Ja(c,
p,o,e,d);o+=a[c+20>>2]<<2;g+=1}b+=1}}while(0);if(((k|0)!=0?69:70)==69)a[m+100>>2]=m+96,V(m),V(m),V(m),V(m)}function Ie(c,d,e,b,f,g,j){var h,i;i=a[c+4>>2];j=(j|0)!=0?1:2;j==1?h=q[d>>1]<<16>>16&-1095:j==2&&(h=q[d>>1]<<16>>16);j=(g|0)!=0?4:5;a:do if(j==4){j=8;break a}else if(j==5){if((h&20480|0)!=0){j=13;break a}a[i+100>>2]=i+24+(p[lb+(b<<8|h&255)]<<24>>24<<2);if((V(i)|0)==0){j=12;break a}j=8;break a}while(0);a:do if(j==8){a[i+100>>2]=i+24+(mb(h)<<24>>24<<2);b=V(i)^nb(h)<<24>>24;j=(b|0)!=0?9:10;if(j==
9)var k=-f;else j==10&&(k=f);a[e>>2]=k;Ka(d,b,a[c+36>>2]);break a}while(0);q[d>>1]=q[d>>1]<<16>>16&49151}function Ke(a){var d;d=(a&8192|0)!=0?1:2;if(d==1)var e=16;else d==2&&(e=(a&255|0)!=0?15:14);return e}function mb(a){return p[Le+((a&4080)>>4)]}function nb(a){return p[Me+((a&4080)>>4)]}function Ka(a,d,e){var b;b=a+(-e<<1);e=a+(e<<1);q[b-2>>1]=(q[b-2>>1]<<16>>16|2)&65535;q[b>>1]=(q[b>>1]<<16>>16|q[ob+(d<<1)>>1]<<16>>16)&65535;q[b+2>>1]=(q[b+2>>1]<<16>>16|4)&65535;q[a-2>>1]=(q[a-2>>1]<<16>>16|q[ob+
(d+2<<1)>>1]<<16>>16)&65535;q[a>>1]=(q[a>>1]<<16>>16|4096)&65535;q[a+2>>1]=(q[a+2>>1]<<16>>16|q[ob+(d+4<<1)>>1]<<16>>16)&65535;q[e-2>>1]=(q[e-2>>1]<<16>>16|1)&65535;q[e>>1]=(q[e>>1]<<16>>16|q[ob+(d+6<<1)>>1]<<16>>16)&65535;q[e+2>>1]=(q[e+2>>1]<<16>>16|8)&65535}function Je(c,d,e,b,f){var g;g=a[c+4>>2];b=q[d>>1]<<16>>16;a[g+100>>2]=g+24+(mb(b)<<24>>24<<2);g=V(g)^nb(b)<<24>>24;b=(g|0)!=0?1:2;if(b==1)var j=-f;else b==2&&(j=f);a[e>>2]=j;Ka(d,g,a[c+36>>2]);q[d>>1]=q[d>>1]<<16>>16&49151}function Ja(c,d,
e,b,f){var g,j;j=a[c+4>>2];g=q[d>>1]<<16>>16;if(((g&20480|0)!=0?7:1)==1)if(a[j+100>>2]=j+24+(p[lb+(b<<8|g&255)]<<24>>24<<2),b=(V(j)|0)!=0?2:6,b==2){a[j+100>>2]=j+24+(mb(g)<<24>>24<<2);g=V(j)^nb(g)<<24>>24;b=(g|0)!=0?3:4;if(b==3)var h=-f;else b==4&&(h=f);a[e>>2]=h;Ka(d,g,a[c+36>>2])}q[d>>1]=q[d>>1]<<16>>16&49151}function Ta(c,d,e,b,f){var g;g=a[c+4>>2];c=q[d>>1]<<16>>16;if(((c&20480|0)==4096?1:8)==1){a[g+100>>2]=g+24+(Ke(c)<<2);c=V(g);c=(c|0)!=0?2:3;if(c==2)var j=b;else c==3&&(j=f);b=j;c=(a[e>>2]|
0)<0?5:6;if(c==5)var h=-b;else c==6&&(h=b);a[e>>2]+=h;q[d>>1]=(q[d>>1]<<16>>16|8192)&65535}}function He(c,d,e,b,f,g){var j,c=a[c+4>>2],g=(g|0)!=0?1:2;g==1?j=q[d>>1]<<16>>16&-1095:g==2&&(j=q[d>>1]<<16>>16);if(((j&20480|0)==4096?4:11)==4){a[c+100>>2]=c+24+(Ke(j)<<2);c=V(c);g=(c|0)!=0?5:6;if(g==5)var h=b;else g==6&&(h=f);b=h;g=(a[e>>2]|0)<0?8:9;if(g==8)var i=-b;else g==9&&(i=b);a[e>>2]+=i;q[d>>1]=(q[d>>1]<<16>>16|8192)&65535}}function Ge(c,d,e,b,f,g){var j,c=a[c+8>>2],g=(g|0)!=0?1:2;g==1?j=q[d>>1]<<
16>>16&-1095:g==2&&(j=q[d>>1]<<16>>16);if(((j&20480|0)==4096?4:11)==4){j=Db(c);g=(j|0)!=0?5:6;if(g==5)var h=b;else g==6&&(h=f);b=h;g=(a[e>>2]|0)<0?8:9;if(g==8)var i=-b;else g==9&&(i=b);a[e>>2]+=i;q[d>>1]=(q[d>>1]<<16>>16|8192)&65535}}function Sa(c,d,e,b,f){var g,j,h,i;i=a[c+4>>2];h=q[d>>1]<<16>>16;g=(h&255|0)!=0?1:8;a:do if(g==1){if((h&20480|0)!=0)break a;a[i+100>>2]=i+24+(p[lb+(b<<8|h&255)]<<24>>24<<2);g=(V(i)|0)!=0?3:7;if(g==3){a[i+100>>2]=i+24+(mb(h)<<24>>24<<2);j=V(i)^nb(h)<<24>>24;g=(j|0)!=0?
4:5;if(g==4)var k=-f;else g==5&&(k=f);a[e>>2]=k;Ka(d,j,a[c+36>>2])}q[d>>1]=(q[d>>1]<<16>>16|16384)&65535}while(0)}function Fe(c,d,e,b,f,g){var j,h,i;i=a[c+4>>2];g=(g|0)!=0?1:2;g==1?j=q[d>>1]<<16>>16&-1095:g==2&&(j=q[d>>1]<<16>>16);h=j;g=(h&255|0)!=0?4:11;a:do if(g==4){if((h&20480|0)!=0)break a;a[i+100>>2]=i+24+(p[lb+(b<<8|h&255)]<<24>>24<<2);g=(V(i)|0)!=0?6:10;if(g==6){a[i+100>>2]=i+24+(mb(h)<<24>>24<<2);j=V(i)^nb(h)<<24>>24;g=(j|0)!=0?7:8;if(g==7)var k=-f;else g==8&&(k=f);a[e>>2]=k;Ka(d,j,a[c+36>>
2])}q[d>>1]=(q[d>>1]<<16>>16|16384)&65535}while(0)}function Ee(c,d,e,b,f,g){var j,h,b=a[c+8>>2],g=(g|0)!=0?1:2;g==1?j=q[d>>1]<<16>>16&-1095:g==2&&(j=q[d>>1]<<16>>16);h=j;g=(h&255|0)!=0?4:11;a:do if(g==4){if((h&20480|0)!=0)break a;g=(Db(b)|0)!=0?6:10;if(g==6){j=Db(b);g=(j|0)!=0?7:8;if(g==7)var i=-f;else g==8&&(i=f);a[e>>2]=i;Ka(d,j,a[c+36>>2])}q[d>>1]=(q[d>>1]<<16>>16|16384)&65535}while(0)}function Ne(c,d,e,b,f,g){var j,h,i,k,n,m,o,O,r,A,y,x,w,t;i=d;O=o=m=0;A=a[c+4>>2];y=a[c+8>>2];k=oe(A,y,b);j=(k|
0)!=0?2:1;do if(j==2){n=r=0;b:for(;;){if(!((n|0)<=(a[a[y+108>>2]+b*5588+420>>2]|0))){j=36;break b}c:for(;;){j=k+n*232;w=t=H;t=a[j+80>>2];t=t==0?1:t==1?2:t==2?3:t==3?4:t==4?5:t==-1?6:7;t==7?w=0:t==1?w=pe(j):t==2?w=qe(j):t==3?w=re(j):t==4?w=se(j):t==5?w=te(j):t==6&&(w=0);if((w|0)==0){j=34;break c}j=(a[y+40>>2]|0)==0?8:7;d:do if(j==7){if((a[y+40>>2]|0)>=(a[k+n*232+36>>2]+1|0)){j=8;break d}m=0;j=13;break d}while(0);j==8&&(j=(g|0)!=0?9:10,j==9?x=a[a[g+88>>2]+b*572+548>>2]+a[g+8>>2]*20:j==10&&(x=0),m=Oe(c,
i,d+e-i,f,a[y+108>>2]+b*5588,k+n*232,x));if((m|0)==-999){j=14;break b}j=(m|0)>0?16:17;if(j==16){var q;q=a[k+n*232+28>>2];j=a[a[A+24>>2]+a[k+n*232+24>>2]*48+36>>2];w=H;w=(q|0)>(j|0)?1:2;if(w==1)var s=q;else w==2&&(s=j);q=s}else j==17&&(q=a[a[A+24>>2]+a[k+n*232+24>>2]*48+36>>2]);a[a[A+24>>2]+a[k+n*232+24>>2]*48+36>>2]=q;o+=1;j=(g|0)!=0?19:30;do if(j==19){w=a[g+88>>2]+b*572;t=a[w+548>>2]+a[g+8>>2]*20;j=(a[g+8>>2]|0)!=0?21:20;do if(j==21){j=(a[a[w+548>>2]+(a[g+8>>2]-1)*20+8>>2]|0)>=(a[a[a[g+88>>2]+b*
572+568>>2]+O*20+8>>2]|0)?22:23;do if(j==22)a[a[w+568>>2]+O*20+16>>2]=a[g+8>>2]-r,r=a[g+8>>2],O+=1,a[t>>2]=a[a[a[g+88>>2]+b*572+568>>2]+O*20+4>>2]+1;else if(j==23){j=(p[y+16]<<24>>24|0)!=0?24:26;g:do if(j==24){if((a[t>>2]|0)==0){j=26;break g}var B=a[t>>2];j=27;break g}while(0);j==26&&(B=a[a[w+548>>2]+(a[g+8>>2]-1)*20+8>>2]+1);a[t>>2]=B}while(0)}else j==20&&(a[t>>2]=a[w+12>>2]+1);while(0);a[t+8>>2]=a[t>>2]+m-1;a[t+4>>2]+=a[t>>2]-1;a[g+8>>2]+=1}while(0);if((m|0)==-999){j=31;break c}i+=m}n+=1}j==36?
(j=(g|0)!=0?37:38,j==37&&(a[a[a[g+88>>2]+b*572+568>>2]+O*20+16>>2]=a[g+8>>2]-r),j=(m|0)==-999?39:40,j==39?h=m:j==40&&(h=i-d)):j==14&&(h=-999)}else j==1&&(h=-999);while(0);return h}function Oe(c,d,e,b,f,g,j){var l,i,k,o,m,gb,O,t,A,y,r,w,x,q,s,B;o=d;m=a[c+8>>2];gb=a[g+24>>2];O=a[g+28>>2];t=a[g+32>>2];g=a[g+36>>2];O=a[a[b+20>>2]+(gb<<5)+20>>2]+O*124;A=0;l=(g|0)==0?1:13;do if(l==1){b=0;b:for(;;){if(!((b|0)<(a[O+24>>2]|0))){l=12;break b}k=O+28+(b<<5);y=a[k+20>>2]+t*36;l=(a[k+8>>2]-a[k>>2]|0)==0?5:4;c:do if(l==
4){if((a[k+12>>2]-a[k+4>>2]|0)==0){l=5;break c}mc(a[y+28>>2]);mc(a[y+32>>2]);k=0;d:for(;;){if(!((k|0)<(a[y+16>>2]*a[y+20>>2]|0)))break d;r=a[y+24>>2]+k*44;a[r+40>>2]=0;k+=1}l=11;break c}while(0);b+=1}}while(0);l=(a[f+4>>2]&2|0)!=0?14:19;do if(l==14){l=(U[o]&255|0)!=255?16:15;b:do if(l==15){if((U[o+1]&255|0)!=145){l=16;break b}o+=6;l=18;break b}while(0);l==16&&F(a[c>>2],2,Pe,h(1,"i32",n))}while(0);y=z(20);l=(a[m+92>>2]|0)==1?20:21;l==20?(A=a[m+84>>2],Yb(y,A,a[m+104>>2])):l==21&&(l=(a[f+5172>>2]|0)==
1?22:23,l==22?(A=a[f+5164>>2],Yb(y,A,a[f+5180>>2])):l==23&&(A=o,Yb(y,A,d+e-A)));l=(ma(y,1)|0)!=0?39:26;a:do if(l==39){b=0;b:for(;;){if(!((b|0)<(a[O+24>>2]|0)))break b;r=O+28+(b<<5);w=a[r+20>>2]+t*36;l=(a[r+8>>2]-a[r>>2]|0)==0?43:42;c:do if(l==42){if((a[r+12>>2]-a[r+4>>2]|0)==0)break c;k=0;d:for(;;){if(!((k|0)<(a[w+16>>2]*a[w+20>>2]|0)))break d;B=a[w+24>>2]+k*44;l=(a[B+40>>2]|0)!=0?48:47;l==48?x=ma(y,1):l==47&&(x=nc(y,a[w+28>>2],k,g+1));l=(x|0)!=0?51:50;do if(l==51){l=(a[B+40>>2]|0)!=0?57:52;do if(l==
52){q=0;g:for(;;){if(!((nc(y,a[w+32>>2],k,q)|0)!=0^1)){l=56;break g}q+=1}q-=1;a[B+24>>2]=a[r+24>>2]-q;a[B+28>>2]=3}while(0);l=y;var u=H;s=q=H;u=(ma(l,1)|0)!=0?2:1;u==2?(u=(ma(l,1)|0)!=0?4:3,u==4?(s=u=ma(l,2),u=(u|0)!=3?5:6,u==5?q=s+3:u==6&&(s=u=ma(l,5),u=(u|0)!=31?7:8,u==7?q=s+6:u==8&&(q=ma(l,7)+37))):u==3&&(q=2)):u==1&&(q=1);a[B+36>>2]=q;l=y;q=H;q=0;f:for(;;){if((ma(l,1)|0)==0)break f;q+=1}l=q;a[B+28>>2]+=l;s=0;l=(a[B+40>>2]|0)!=0?59:58;l==59?(s=a[B+40>>2]-1,l=(a[a[B+4>>2]+s*28+8>>2]|0)==(a[a[B+
4>>2]+s*28+16>>2]|0)?60:61,l==60&&(s+=1,Eb(B,s,a[a[f+5584>>2]+gb*1076+16>>2],0))):l==58&&Eb(B,s,a[a[f+5584>>2]+gb*1076+16>>2],1);q=a[B+36>>2];f:for(;;){l=a[a[B+4>>2]+s*28+16>>2]-a[a[B+4>>2]+s*28+8>>2];u=H;u=(l|0)<(q|0)?1:2;if(u==1)var C=l;else u==2&&(C=q);a[a[B+4>>2]+s*28+20>>2]=C;u=l=H;l=a[a[B+4>>2]+s*28+20>>2];u=0;g:for(;;){if(!((l|0)>1))break g;l>>=1;u+=1}l=ma(y,a[B+28>>2]+u);a[a[B+4>>2]+s*28+24>>2]=l;q-=a[a[B+4>>2]+s*28+20>>2];l=(q|0)>0?64:65;l==64&&(s+=1,Eb(B,s,a[a[f+5584>>2]+gb*1076+16>>2],
0));if(!((q|0)>0)){l=67;break f}}}else l==50&&(a[B+36>>2]=0);while(0);k+=1}break c}while(0);b+=1}l=(Yc(y)|0)!=0?72:73;do if(l==72)i=-999;else if(l==73){A+=a[y+8>>2]-a[y>>2];l=(a[f+4>>2]&4|0)!=0?74:79;c:do if(l==74){l=(U[A]&255|0)!=255?76:75;d:do if(l==75){if((U[A+1]&255|0)!=146)break d;A+=2;break c}while(0);F(a[c>>2],1,Qe,h(1,"i32",n));i=-999;break a}while(0);l=(j|0)!=0?80:81;l==80&&(a[j+4>>2]=A-d);l=(a[m+92>>2]|0)==1?82:83;l==82?(a[m+104>>2]+=a[m+84>>2]-A,a[m+84>>2]=A):l==83&&(l=(a[f+5172>>2]|0)==
1?84:85,l==84?(a[f+5180>>2]+=a[f+5164>>2]-A,a[f+5164>>2]=A):l==85&&(o=A));b=0;c:for(;;){if(!((b|0)<(a[O+24>>2]|0))){l=114;break c}k=O+28+(b<<5);r=a[k+20>>2]+t*36;l=(a[k+8>>2]-a[k>>2]|0)==0?91:90;d:do if(l==90){if((a[k+12>>2]-a[k+4>>2]|0)==0){l=91;break d}k=0;e:for(;;){if(!((k|0)<(a[r+16>>2]*a[r+20>>2]|0)))break e;w=a[r+24>>2]+k*44;B=0;l=(a[w+36>>2]|0)!=0?96:95;do if(l==96){l=(a[w+40>>2]|0)!=0?98:97;l==98?(B=a[w+4>>2]+(a[w+40>>2]-1)*28,l=(a[B+8>>2]|0)==(a[B+16>>2]|0)?99:100,l==99&&(B+=28,a[w+40>>2]+=
1)):l==97&&(B=a[w+4>>2],a[w+40>>2]+=1,a[w+32>>2]=0);g:for(;;){if(o+a[B+24>>2]>>>0>d+e>>>0){l=103;break c}l=jb(a[w>>2],a[w+32>>2]+a[B+24>>2]<<2);a[w>>2]=l;s=a[w>>2]+a[w+32>>2];q=o;l=a[B+24>>2];D(l%1===0,"memcpy given "+l+" bytes to copy. Problem with quantum=1 corrections perhaps?");u=q+l;if(s%4==q%4&&l>8){for(;q%4!==0&&q<u;)p[s++]=p[q++];q>>=2;s>>=2;for(l=u>>2;q<l;)a[s++]=a[q++];q<<=2;s<<=2}for(;q<u;)p[s++]=p[q++];l=(a[B+8>>2]|0)==0?105:106;l==105&&(a[B>>2]=w,a[B+4>>2]=a[w+32>>2]);o+=a[B+24>>2];a[w+
32>>2]+=a[B+24>>2];a[B+12>>2]+=a[B+24>>2];a[B+8>>2]+=a[B+20>>2];a[w+36>>2]-=a[B+20>>2];l=(a[w+36>>2]|0)>0?107:108;l==107&&(B+=28,a[w+40>>2]+=1);if(!((a[w+36>>2]|0)>0)){l=110;break g}}}while(0);k+=1}l=113;break d}while(0);b+=1}l==114?i=o-d:l==103&&(i=-999)}while(0)}else if(l==26){Yc(y);A+=a[y+8>>2]-a[y>>2];l=(a[f+4>>2]&4|0)!=0?27:32;do if(l==27){l=(U[A]&255|0)!=255?29:28;c:do if(l==28){if((U[A+1]&255|0)!=146){l=29;break c}A+=2;l=31;break c}while(0);l==29&&sa(Re,h(1,"i32",n))}while(0);l=(j|0)!=0?33:
34;l==33&&(a[j+4>>2]=o-d);l=(a[m+92>>2]|0)==1?35:36;l==35?(a[m+104>>2]+=a[m+84>>2]-A,a[m+84>>2]=A,i=o-d):l==36&&(l=(a[f+5172>>2]|0)==1?37:38,l==37?(a[f+5180>>2]+=a[f+5164>>2]-A,a[f+5164>>2]=A,i=o-d):l==38&&(i=A-d))}while(0);return i}function Eb(c,d,e,b){var f=jb(a[c+4>>2],(d+1)*28);a[c+4>>2]=f;d=a[c+4>>2]+d*28;a[d>>2]=0;a[d+4>>2]=0;a[d+8>>2]=0;a[d+12>>2]=0;c=(e&4|0)!=0?1:2;if(c==1)a[d+16>>2]=1;else if(c==2)if(c=(e&1|0)!=0?3:9,c==3)if(c=(b|0)!=0?4:5,c==4)a[d+16>>2]=10;else{if(c==5){if((a[d-28+16>>
2]|0)==1)var g=1,c=7;else c=6;c==6&&(g=(a[d-28+16>>2]|0)==10);a[d+16>>2]=g?2:1}}else c==9&&(a[d+16>>2]=109)}function Ba(a,d){var e;e=(a|0)>(d|0)?1:2;if(e==1)var b=a;else e==2&&(b=d);return b}function oa(a,d){var e;e=(a|0)<(d|0)?1:2;if(e==1)var b=a;else e==2&&(b=d);return b}function Ca(a,d){return(a+d-1|0)/(d|0)|0}function N(a,d){return a+(1<<d)-1>>(d|0)}function jd(c,d,e){var b,f,g,j,h,i,k,n,m,o;n=k=i=h=0;a[c+28>>2]=d;a[a[c+24>>2]>>2]=a[e+68>>2];a[a[c+24>>2]+4>>2]=a[e+72>>2];f=z(a[e+68>>2]*a[e+72>>
2]*840);a[a[c+24>>2]+8>>2]=f;g=0;a:for(;;){if(!((g|0)<(a[e+80>>2]|0)))break a;j=a[a[e+76>>2]+(g<<2)>>2];f=a[a[c+24>>2]+8>>2]+a[a[e+76>>2]+(j<<2)>>2]*840;a[f+16>>2]=a[d+16>>2];m=ba(a[d+16>>2],32);a[f+20>>2]=m;g+=1}f=0;a:for(;;){if(!((f|0)<(a[d+16>>2]|0)))break a;g=0;b:for(;;){if(!((g|0)<(a[e+80>>2]|0)))break b;j=a[a[e+76>>2]+(g<<2)>>2];o=a[a[c+24>>2]+8>>2]+a[a[e+76>>2]+(j<<2)>>2]*840;m=a[o+20>>2]+(f<<5);b=(j|0)%(a[e+68>>2]|0);j=(j|0)/(a[e+68>>2]|0)|0;a[o>>2]=Ba(a[e+48>>2]+b*a[e+56>>2],a[d>>2]);a[o+
4>>2]=Ba(a[e+52>>2]+j*a[e+60>>2],a[d+4>>2]);a[o+8>>2]=oa(a[e+48>>2]+(b+1)*a[e+56>>2],a[d+8>>2]);a[o+12>>2]=oa(a[e+52>>2]+(j+1)*a[e+60>>2],a[d+12>>2]);a[m>>2]=Ca(a[o>>2],a[a[d+24>>2]+f*48>>2]);a[m+4>>2]=Ca(a[o+4>>2],a[a[d+24>>2]+f*48+4>>2]);a[m+8>>2]=Ca(a[o+8>>2],a[a[d+24>>2]+f*48>>2]);a[m+12>>2]=Ca(a[o+12>>2],a[a[d+24>>2]+f*48+4>>2]);b=(g|0)==0?9:10;if(b==9)var p=a[m>>2];else b==10&&(p=oa(h,a[m>>2]));h=p;b=(g|0)==0?12:13;if(b==12)var t=a[m+4>>2];else b==13&&(t=oa(i,a[m>>2]));i=t;b=(g|0)==0?15:16;
if(b==15)var A=a[m+8>>2];else b==16&&(A=Ba(k,a[m+8>>2]));k=A;b=(g|0)==0?18:19;if(b==18)var y=a[m+12>>2];else b==19&&(y=Ba(n,a[m+12>>2]));n=y;g+=1}g=N(k-h,a[a[d+24>>2]+f*48+40>>2]);m=N(n-i,a[a[d+24>>2]+f*48+40>>2]);a[a[d+24>>2]+f*48+8>>2]=g;a[a[d+24>>2]+f*48+12>>2]=m;a[a[d+24>>2]+f*48+16>>2]=h;a[a[d+24>>2]+f*48+20>>2]=i;f+=1}}function kd(c,d,e,b){var f,g,j,h,i,k,n,m,o,p,t,A,y,r,w,q,x,s,B,C,D,F,G,J,K;a[c+32>>2]=e;k=a[e+108>>2]+a[a[e+76>>2]+(b<<2)>>2]*5588;e=a[a[c+24>>2]+8>>2]+a[a[e+76>>2]+(b<<2)>>2]*
840;c=0;a:for(;;){if(!((c|0)<(a[e+16>>2]|0)))break a;b=a[k+5584>>2]+c*1076;n=a[e+20>>2]+(c<<5);a[n>>2]=Ca(a[e>>2],a[a[d+24>>2]+c*48>>2]);a[n+4>>2]=Ca(a[e+4>>2],a[a[d+24>>2]+c*48+4>>2]);a[n+8>>2]=Ca(a[e+8>>2],a[a[d+24>>2]+c*48>>2]);a[n+12>>2]=Ca(a[e+12>>2],a[a[d+24>>2]+c*48+4>>2]);a[n+16>>2]=a[b+4>>2];g=z(a[n+16>>2]*124);a[n+20>>2]=g;g=0;b:for(;;){if(!((g|0)<(a[n+16>>2]|0)))break b;p=a[n+16>>2]-1-g;s=a[n+20>>2]+g*124;a[s>>2]=N(a[n>>2],p);a[s+4>>2]=N(a[n+4>>2],p);a[s+8>>2]=N(a[n+8>>2],p);a[s+12>>2]=
N(a[n+12>>2],p);a[s+24>>2]=(g|0)==0?1:3;f=(a[b>>2]&1|0)!=0?5:6;f==5?(m=a[b+812+(g<<2)>>2],o=a[b+944+(g<<2)>>2]):f==6&&(o=m=15);j=a[s>>2]>>(m|0)<<m;t=a[s+4>>2]>>(o|0)<<o;A=N(a[s+8>>2],m)<<m;y=N(a[s+12>>2],o)<<o;f=(a[s>>2]|0)==(a[s+8>>2]|0)?8:9;if(f==8)var U=0;else f==9&&(U=A-j>>(m|0));a[s+16>>2]=U;f=(a[s+4>>2]|0)==(a[s+12>>2]|0)?11:12;if(f==11)var X=0;else f==12&&(X=y-t>>(o|0));a[s+20>>2]=X;f=(g|0)==0?14:15;f==14?(r=j,w=t,q=m,x=o):f==15&&(r=N(j,1),w=N(t,1),q=m-1,x=o-1);t=oa(a[b+8>>2],q);A=oa(a[b+12>>
2],x);j=0;c:for(;;){if(!((j|0)<(a[s+24>>2]|0)))break c;y=s+28+(j<<5);f=(g|0)==0?19:20;if(f==19)var Q=0;else f==20&&(Q=j+1);a[y+16>>2]=Q;if((a[y+16>>2]|0)==1){var M=1;f=23}else f=22;f==22&&(M=(a[y+16>>2]|0)==3);h=M?1:0;if((a[y+16>>2]|0)==2){var R=1;f=25}else f=24;f==24&&(R=(a[y+16>>2]|0)==3);B=R?1:0;f=(a[y+16>>2]|0)==0?26:27;f==26?(a[y>>2]=N(a[n>>2],p),a[y+4>>2]=N(a[n+4>>2],p),a[y+8>>2]=N(a[n+8>>2],p),a[y+12>>2]=N(a[n+12>>2],p)):f==27&&(a[y>>2]=N(a[n>>2]-(1<<p)*h,p+1),a[y+4>>2]=N(a[n+4>>2]-(1<<p)*
B,p+1),a[y+8>>2]=N(a[n+8>>2]-(1<<p)*h,p+1),a[y+12>>2]=N(a[n+12>>2]-(1<<p)*B,p+1));f=(g|0)==0?29:30;if(f==29)var P=0;else f==30&&(P=(g-1)*3+j+1);h=b+28+(P<<3);f=(a[b+20>>2]|0)==0?32:33;if(f==32)var T=0;else if(f==33){T=a[y+16>>2];B=f=H;f=(T|0)==0?1:2;e:do if(f==1)B=0;else if(f==2){f=(T|0)==1?4:3;f:do if(f==3){if((T|0)==2){f=4;break f}B=2;break e}while(0);B=1}while(0);T=B}f=T;B=a[a[d+24>>2]+c*48+24>>2]+f;f=(a[h+4>>2]|0)/2048+1;B=La(2,B-a[h>>2]|0);u[y+28>>2]=f*B*0.5;a[y+24>>2]=a[h>>2]+a[b+804>>2]-1;
h=z(a[s+16>>2]*a[s+20>>2]*36);a[y+20>>2]=h;h=0;d:for(;;){if(!((h|0)<(a[s+16>>2]*a[s+20>>2]|0)))break d;B=r+(h|0)%(a[s+16>>2]|0)*(1<<q);C=w+((h|0)/(a[s+16>>2]|0)|0)*(1<<x);i=B+(1<<q);D=C+(1<<x);f=a[y+20>>2]+h*36;a[f>>2]=Ba(B,a[y>>2]);a[f+4>>2]=Ba(C,a[y+4>>2]);a[f+8>>2]=oa(i,a[y+8>>2]);a[f+12>>2]=oa(D,a[y+12>>2]);B=a[f>>2]>>(t|0)<<t;C=a[f+4>>2]>>(A|0)<<A;i=N(a[f+8>>2],t)<<t;D=N(a[f+12>>2],A)<<A;a[f+16>>2]=i-B>>(t|0);a[f+20>>2]=D-C>>(A|0);i=z(a[f+16>>2]*a[f+20>>2]*44);a[f+24>>2]=i;i=oc(a[f+16>>2],a[f+
20>>2]);a[f+28>>2]=i;i=oc(a[f+16>>2],a[f+20>>2]);a[f+32>>2]=i;i=0;e:for(;;){if(!((i|0)<(a[f+16>>2]*a[f+20>>2]|0)))break e;D=B+(i|0)%(a[f+16>>2]|0)*(1<<t);F=C+((i|0)/(a[f+16>>2]|0)|0)*(1<<A);G=D+(1<<t);J=F+(1<<A);K=a[f+24>>2]+i*44;a[K>>2]=0;a[K+4>>2]=0;a[K+8>>2]=Ba(D,a[f>>2]);a[K+12>>2]=Ba(F,a[f+4>>2]);a[K+16>>2]=oa(G,a[f+8>>2]);a[K+20>>2]=oa(J,a[f+12>>2]);a[K+40>>2]=0;i+=1}h+=1}j+=1}g+=1}c+=1}}function ld(c,d,e,b,f){var g,j,l,i,k,o,m,p,t,s,A,y,r,w,q,x;i=0;a[c+44>>2]=b;a[c+36>>2]=a[a[c+24>>2]+8>>2]+
b*840;a[c+40>>2]=a[a[c+32>>2]+108>>2]+b*5588;o=a[c+36>>2];k=Oa();F(a[c+20>>2],4,Se,h([b+1,0,0,0,a[a[c+32>>2]+68>>2]*a[a[c+32>>2]+72>>2],0,0,0],["i32",0,0,0,"i32",0,0,0],n));g=(f|0)!=0?1:13;do if(g==1){p=t=0;b:for(;;){if(!((p|0)<(a[f+52>>2]|0))){g=12;break b}m=a[a[c+32>>2]+108>>2];s=a[m+5584>>2]+p*1076;A=a[o+20>>2]+(p<<5);m=0;c:for(;;){if(!((m|0)<(a[A+16>>2]|0))){g=10;break c}g=a[A+20>>2]+m*124;a[a[f+88>>2]+b*572+20+(m<<2)>>2]=a[g+16>>2];a[a[f+88>>2]+b*572+152+(m<<2)>>2]=a[g+20>>2];t+=a[g+16>>2]*a[g+
20>>2];g=(a[s>>2]&1|0)!=0?6:7;g==6?(a[a[f+88>>2]+b*572+284+(m<<2)>>2]=a[s+812+(m<<2)>>2],a[a[f+88>>2]+b*572+416+(m<<2)>>2]=a[s+944+(m<<2)>>2]):g==7&&(a[a[f+88>>2]+b*572+284+(m<<2)>>2]=15,a[a[f+88>>2]+b*572+284+(m<<2)>>2]=15);m+=1}p+=1}p=z(a[f+56>>2]*t*20);a[a[f+88>>2]+b*572+548>>2]=p;a[f+8>>2]=0}while(0);g=a[c+20>>2];p=a[c+28>>2];t=a[c+32>>2];s=z(12);m=(s|0)!=0?2:1;m==2?(a[s>>2]=g,a[s+4>>2]=p,a[s+8>>2]=t,y=s):m==1&&(y=0);g=(Ne(y,d,e,b,o,f)|0)==-999?14:15;g==14&&(i=1,F(a[c+20>>2],1,Te,h(1,"i32",n)));
d=Oa();b=a[c+20>>2];e=z(40);f=(e|0)!=0?2:1;f==2?(a[e>>2]=b,l=z(104),a[e+4>>2]=l,l=z(28),a[e+8>>2]=l,a[e+12>>2]=0,a[e+16>>2]=0,a[e+28>>2]=0,a[e+32>>2]=0,l=e):f==1&&(l=0);e=l;l=0;a:for(;;){if(!((l|0)<(a[o+16>>2]|0))){g=19;break a}b=a[o+20>>2]+(l<<5);f=fb((a[b+8>>2]-a[b>>2])*(a[b+12>>2]-a[b+4>>2])+3<<2);a[b+24>>2]=f;ve(e,b,a[a[c+40>>2]+5584>>2]+l*1076);l+=1}d=Oa()-d;F(a[c+20>>2],4,Ue,h([d,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0],n));d=Oa();l=0;a:for(;;){if(!((l|0)<(a[o+16>>2]|0))){g=32;break a}e=a[o+
20>>2]+(l<<5);g=(a[a[c+32>>2]+36>>2]|0)!=0?22:25;do if(g==22&&(a[a[a[c+28>>2]+24>>2]+l*48+36>>2]=a[a[o+20>>2]+(l<<5)+16>>2]-a[a[c+32>>2]+36>>2]-1,(a[a[a[c+28>>2]+24>>2]+l*48+36>>2]|0)<0)){g=23;break a}while(0);b=a[a[a[c+28>>2]+24>>2]+l*48+36>>2]+1;g=(b|0)>0?26:30;g==26&&(g=(a[a[a[c+40>>2]+5584>>2]+l*1076+20>>2]|0)==1?27:28,g==27?ad(e,b,2):g==28&&ed(e,b));l+=1}do if(g==32){d=Oa()-d;F(a[c+20>>2],4,Ve,h([d,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0],n));g=(a[a[c+40>>2]+16>>2]|0)!=0?33:37;g==33&&(l=(a[a[o+
20>>2]+8>>2]-a[a[o+20>>2]>>2])*(a[a[o+20>>2]+12>>2]-a[a[o+20>>2]+4>>2]),g=(a[a[a[c+40>>2]+5584>>2]+20>>2]|0)==1?34:35,g==34?fe(a[a[o+20>>2]+24>>2],a[a[o+20>>2]+32+24>>2],a[a[o+20>>2]+64+24>>2],l):g==35&&ge(a[a[o+20>>2]+24>>2],a[a[o+20>>2]+32+24>>2],a[a[o+20>>2]+64+24>>2],l));l=0;b:for(;;){if(!((l|0)<(a[o+16>>2]|0)))break b;e=a[o+20>>2]+(l<<5);b=a[a[c+28>>2]+24>>2]+l*48;f=a[e+20>>2]+a[b+36>>2]*124;g=(a[b+32>>2]|0)!=0?40:41;if(g==40)var C=0;else g==41&&(C=1<<a[b+24>>2]-1);y=C;g=(a[b+32>>2]|0)!=0?43:
44;if(g==43)var B=-(1<<a[b+24>>2]-1);else g==44&&(B=0);p=B;g=(a[b+32>>2]|0)!=0?46:47;if(g==46)var D=(1<<a[b+24>>2]-1)-1;else g==47&&(D=(1<<a[b+24>>2])-1);t=D;m=a[e+8>>2]-a[e>>2];s=a[b+8>>2];A=N(a[b+16>>2],a[b+40>>2]);r=N(a[b+20>>2],a[b+40>>2]);g=(a[b+44>>2]|0)!=0?50:49;g==49&&(g=z(a[b+8>>2]*a[b+12>>2]<<2),a[b+44>>2]=g);g=(a[a[a[c+40>>2]+5584>>2]+l*1076+20>>2]|0)==1?51:60;do if(g==51){q=a[f+4>>2];d:for(;;){if(!((q|0)<(a[f+12>>2]|0))){g=59;break d}w=a[f>>2];e:for(;;){if(!((w|0)<(a[f+8>>2]|0))){g=57;
break e}x=a[a[e+24>>2]+(w-a[f>>2]+(q-a[f+4>>2])*m<<2)>>2];x+=y;a[a[b+44>>2]+(w-A+(q-r)*s<<2)>>2]=We(x,p,t);w+=1}q+=1}}else if(g==60){q=a[f+4>>2];d:for(;;){if(!((q|0)<(a[f+12>>2]|0))){g=68;break d}w=a[f>>2];e:for(;;){if(!((w|0)<(a[f+8>>2]|0))){g=66;break e}x=u[a[e+24>>2]+(w-a[f>>2]+(q-a[f+4>>2])*m<<2)>>2];x=x>0?-Math.round(-x):Math.round(x);x+=y;a[a[b+44>>2]+(w-A+(q-r)*s<<2)>>2]=We(x,p,t);w+=1}q+=1}}while(0);l+=1}k=Oa()-k;F(a[c+20>>2],4,Xe,h([k,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0],n));g=(i|0)!=
0?72:73;g==72?j=0:g==73&&(j=1)}else g==23&&(F(a[c+20>>2],1,Ye,h([a[a[c+32>>2]+36>>2],0,0,0,a[a[o+20>>2]+(l<<5)+16>>2],0,0,0],["i32",0,0,0,"i32",0,0,0],n)),j=0);while(0);return j}function We(a,d,e){var b,f;b=(a|0)<(d|0)?1:2;b==1?f=d:b==2&&(b=(a|0)>(e|0)?3:4,b==3?f=e:b==4&&(f=a));return f}function mc(c){var d,e;d=0==(c|0)?1:2;a:do if(d!=1&&d==2){e=0;for(;;){if(!((e|0)<(a[c+8>>2]|0)))break a;a[a[c+12>>2]+(e<<4)+4>>2]=999;a[a[c+12>>2]+(e<<4)+8>>2]=0;a[a[c+12>>2]+(e<<4)+12>>2]=0;e+=1}}while(0)}function oc(c,
d){var e=t;t+=256;D(t<X);var b,f,g=e+128,j,h,i,k,n,m,o;i=z(16);b=(i|0)!=0?2:1;do if(b==2){a[i>>2]=c;a[i+4>>2]=d;o=0;a[e>>2]=c;a[g>>2]=d;a[i+8>>2]=0;b:for(;;)if(j=a[e+(o<<2)>>2]*a[g+(o<<2)>>2],a[e+(o+1<<2)>>2]=(a[e+(o<<2)>>2]+1|0)/2|0,a[g+(o+1<<2)>>2]=(a[g+(o<<2)>>2]+1|0)/2|0,a[i+8>>2]+=j,o+=1,!((j|0)>1))break b;b=(a[i+8>>2]|0)==0?6:7;do if(b==6)f=0;else if(b==7){j=ba(a[i+8>>2],16);a[i+12>>2]=j;b=(a[i+12>>2]|0)!=0?9:8;do if(b==9){f=a[i+12>>2];h=j=a[i+12>>2]+(a[i>>2]*a[i+4>>2]<<4);k=0;d:for(;;){if(!((k|
0)<(o-1|0))){b=26;break d}n=0;e:for(;;){if(!((n|0)<(a[g+(k<<2)>>2]|0))){b=24;break e}m=a[e+(k<<2)>>2];f:for(;;){m=b=m-1;if(!((b|0)>=0))break f;a[f>>2]=j;f+=16;m=b=m-1;b=(b|0)>=0?16:17;b==16&&(a[f>>2]=j,f+=16);j+=16}b=(n&1|0)!=0?20:19;f:do if(b==19){if((n|0)==(a[g+(k<<2)>>2]-1|0)){b=20;break f}j=h;h+=a[e+(k<<2)>>2]<<4;b=22;break f}while(0);b==20&&(h=j);n+=1}k+=1}a[f>>2]=0;mc(i);f=i}else b==8&&(f=0);while(0)}while(0)}else b==1&&(f=0);while(0);t=e;return f}function nc(c,d,e,b){var f=t;t+=124;D(t<X);
var g,j;j=f;d=a[d+12>>2]+(e<<4);a:for(;;){if((a[d>>2]|0)==0)break a;e=j;j=e+4;a[e>>2]=d;d=a[d>>2]}e=0;a:for(;;){g=(e|0)>(a[d+8>>2]|0)?5:6;g==5?a[d+8>>2]=e:g==6&&(e=a[d+8>>2]);b:for(;;){if((e|0)<(b|0))g=9;else{var h=0;g=10}g==9&&(h=(e|0)<(a[d+4>>2]|0));if(!h)break b;g=(ma(c,1)|0)!=0?12:13;g==12?a[d+4>>2]=e:g==13&&(e+=1)}a[d+8>>2]=e;if((j|0)==(f|0))break a;j=d=j-4;d=a[d>>2]}c=(a[d+4>>2]|0)<(b|0)?1:0;t=f;return c}function Ze(){o(a[a[x>>2]+8>>2],$e,h(1,"i32",n));o(a[a[x>>2]+8>>2],af,h(1,"i32",n));o(a[a[x>>
2]+8>>2],bf,h(1,"i32",n));o(a[a[x>>2]+8>>2],Ua,h(1,"i32",n));o(a[a[x>>2]+8>>2],Ua,h(1,"i32",n));o(a[a[x>>2]+8>>2],cf,h(1,"i32",n));o(a[a[x>>2]+8>>2],df,h(1,"i32",n));o(a[a[x>>2]+8>>2],ef,h(1,"i32",n));o(a[a[x>>2]+8>>2],ff,h(1,"i32",n));o(a[a[x>>2]+8>>2],gf,h(1,"i32",n));o(a[a[x>>2]+8>>2],hf,h(1,"i32",n));o(a[a[x>>2]+8>>2],jf,h(1,"i32",n));o(a[a[x>>2]+8>>2],kf,h(1,"i32",n));o(a[a[x>>2]+8>>2],lf,h(1,"i32",n));o(a[a[x>>2]+8>>2],mf,h(1,"i32",n));o(a[a[x>>2]+8>>2],nf,h(1,"i32",n));o(a[a[x>>2]+8>>2],of,
h(1,"i32",n));o(a[a[x>>2]+8>>2],pf,h(1,"i32",n));o(a[a[x>>2]+8>>2],qf,h(1,"i32",n));o(a[a[x>>2]+8>>2],rf,h(1,"i32",n));o(a[a[x>>2]+8>>2],sf,h(1,"i32",n));o(a[a[x>>2]+8>>2],tf,h(1,"i32",n));o(a[a[x>>2]+8>>2],uf,h(1,"i32",n));o(a[a[x>>2]+8>>2],vf,h(1,"i32",n));o(a[a[x>>2]+8>>2],wf,h(1,"i32",n));o(a[a[x>>2]+8>>2],xf,h(1,"i32",n));o(a[a[x>>2]+8>>2],yf,h(1,"i32",n));o(a[a[x>>2]+8>>2],zf,h(1,"i32",n));o(a[a[x>>2]+8>>2],Af,h(1,"i32",n));o(a[a[x>>2]+8>>2],Bf,h(1,"i32",n));o(a[a[x>>2]+8>>2],Cf,h(1,"i32",n));
o(a[a[x>>2]+8>>2],Df,h(1,"i32",n));o(a[a[x>>2]+8>>2],Ef,h(1,"i32",n));o(a[a[x>>2]+8>>2],Ff,h(1,"i32",n));o(a[a[x>>2]+8>>2],Gf,h(1,"i32",n));o(a[a[x>>2]+8>>2],Ua,h(1,"i32",n));o(a[a[x>>2]+8>>2],Ua,h(1,"i32",n))}function Hf(c,d){var e,b,f,g;g=0;f=If(d);e=(f|0)!=0?2:1;do if(e==2){o(a[a[x>>2]+12>>2],Jf,h(1,"i32",n));b:for(;;){b=e=Va(f);if((e|0)==0){e=9;break b}e=(pb(qb,b+4)|0)==0?7:6;c:do if(e==6){if((pb(pc,b+4)|0)==0){e=7;break c}rb(a[a[c+4>>2]+(g<<2)>>2],b+4);g+=1;e=4;continue b}while(0)}b=0}else e==
1&&(o(a[a[x>>2]+12>>2],qc,h([d,0,0,0],["i8*",0,0,0],n)),b=1);while(0);return b}function Fb(c){var d,e;a:{e=c+xa(c);do{if(p[e]==46)break a;e--}while(e>=c);e=0}c=(e|0)==0?1:2;a:do if(c==1)d=-1;else if(c==2){e+=1;c=(e|0)!=0?3:10;do if(c==3){d=0;c:for(;;){if(!(d>>>0<14)){c=9;break c}if((ii(e,a[ca+(d<<2)>>2])|0)==0){c=6;break c}d+=1}do if(c!=9&&c==6){d=a[Kf+(d<<2)>>2];break a}while(0)}while(0);d=-1}while(0);return d}function Lf(c,d,e,b){var f=t;t+=20480;D(t<X);var g,j=f+4096,l=f+8192,i=f+12288,k=f+16384,
E,m,s,q;E=k;m=E+4096;q=0;q<0&&(q+=256);for(q=q+(q<<8)+(q<<16)+q*16777216;E%4!==0&&E<m;)p[E++]=0;E>>=2;for(s=m>>2;E<s;)a[E++]=q;for(E<<=2;E<m;)p[E++]=0;rb(f,a[a[d+4>>2]+(c<<2)>>2]);o(a[a[x>>2]+12>>2],Mf,h([c,0,0,0,f,0,0,0],["i32",0,0,0,"i8*",0,0,0],n));a[b+8200>>2]=Fb(f);c=(a[b+8200>>2]|0)==-1?1:2;do if(c==1)g=1;else if(c==2){Da(j,Nf,h([a[e>>2],0,0,0,f,0,0,0],["i8*",0,0,0,"i8*",0,0,0],n));Wa(b+8,j,4096);g=i;c=Of(f,qb);rb(g,c);b:for(;;){g=c=Of(0,qb);if((c|0)==0)break b;c=i;d=k;E=xa(c);m=0;do{var r;
s=d+m;q=c+E+m;for(r=s+1;s<r;)p[q++]=p[s++];m++}while(p[d+m-1]!=0);Da(k,rc,h([g,0,0,0],["i8*",0,0,0],n))}c=(p[e+9]<<24>>24|0)==1?6:7;c==6&&(Da(l,Pf,h([a[e>>2],0,0,0,i,0,0,0,a[e+4>>2],0,0,0],["i8*",0,0,0,"i8*",0,0,0,"i8*",0,0,0],n)),Wa(b+4104,l,4096));g=0}while(0);t=f;return g}function Qf(c,d,e,b,f){var g=t;t+=84;D(t<X);var j,l,i,k,E,m=g+32,s;D(I,"memcpy given 32 bytes to copy. Problem with quantum=1 corrections perhaps?");var q,r;i=Gb;s=g;q=i+32;if(s%4==i%4){for(;i%4!==0&&i<q;)p[s++]=p[i++];i>>=2;
s>>=2;for(r=q>>2;i<r;)a[s++]=a[i++];i<<=2;s<<=2}for(;i<q;)p[s++]=p[i++];p[b+9]=0;a:for(;;){i=Rf(c,d,Sf,g,32);if((i|0)==-1){j=2;break a}j=i;if(j==105)j=4;else if(j==111)j=8;else if(j==79)j=12;else if(j==114)j=22;else if(j==108)j=23;else if(j==104){j=24;break a}else j=j==121?25:j==120?26:27;do if(j==27)o(a[a[x>>2]+12>>2],Tf,h([i,0,0,0,a[aa>>2],0,0,0],["i32",0,0,0,"i8*",0,0,0],n));else if(j==4){k=a[aa>>2];a[e+8200>>2]=Fb(k);if(a[e+8200>>2]!=0&&a[e+8200>>2]!=1&&a[e+8200>>2]!=2){j=6;break a}Wa(e+8,k,4095)}else if(j==
8){E=a[aa>>2];a[e+8204>>2]=Fb(E);s=a[e+8204>>2];if(s!=11&&s!=10&&s!=12&&s!=14&&s!=15&&s!=16&&s!=17){j=10;break a}Wa(e+4104,E,4095)}else if(j==12){j=a[aa>>2];Da(m,rc,h([j,0,0,0],["i8*",0,0,0],n));p[b+9]=1;a[e+8204>>2]=Fb(m);j=a[e+8204>>2];if(j==11)j=13;else if(j==10)j=14;else if(j==12)j=15;else if(j==14)j=16;else if(j==15)j=17;else if(j==16)j=18;else if(j==17)j=19;else{j=20;break a}j==13?a[b+4>>2]=sc:j==14?a[b+4>>2]=tc:j==15?a[b+4>>2]=uc:j==16?a[b+4>>2]=vc:j==17?a[b+4>>2]=Hb:j==18?a[b+4>>2]=Hb:j==
19&&(a[b+4>>2]=wc)}else j==22?Uf(a[aa>>2],xc,h([e,0,0,0],["i32*",0,0,0],n)):j==23?Uf(a[aa>>2],xc,h([e+4,0,0,0],["i32*",0,0,0],n)):j==25?(s=z(xa(a[aa>>2])+1),a[b>>2]=s,rb(a[b>>2],a[aa>>2]),p[b+8]=1):j==26&&(s=a[aa>>2],Wa(f,s,4096));while(0)}a:do if(j==2){j=(p[b+8]<<24>>24|0)==1?30:37;b:do if(j==30){j=(p[e+8]<<24>>24|0)==0?32:31;do if(j==32){j=(p[b+9]<<24>>24|0)==0?33:34;do if(j==33){o(a[a[x>>2]+12>>2],Vf,h(1,"i32",n));o(a[a[x>>2]+12>>2],Wf,h(1,"i32",n));l=1;break a}else if(j==34){j=(p[e+4104]<<24>>
24|0)==0?36:35;do if(j!=36&&j==35){o(a[a[x>>2]+12>>2],Xf,h(1,"i32",n));l=1;break a}while(0)}while(0)}else if(j==31){o(a[a[x>>2]+12>>2],Yf,h(1,"i32",n));l=1;break a}while(0)}else if(j==37){j=(p[e+8]<<24>>24|0)==0?39:38;c:do if(j==38){if((p[e+4104]<<24>>24|0)==0)break c;j=41;break b}while(0);o(a[a[x>>2]+12>>2],Zf,h([a[d>>2],0,0,0],["i8*",0,0,0],n));o(a[a[x>>2]+12>>2],$f,h([a[d>>2],0,0,0],["i8*",0,0,0],n));l=1;break a}while(0);l=0}else j==24?(Ze(),l=1):j==6?(o(a[a[x>>2]+12>>2],ag,h([k,0,0,0],["i8*",
0,0,0],n)),l=1):j==10?(o(a[a[x>>2]+12>>2],yc,h([E,0,0,0],["i8*",0,0,0],n)),l=1):j==20&&(o(a[a[x>>2]+12>>2],yc,h([m,0,0,0],["i8*",0,0,0],n)),l=1);while(0);t=g;return l}function zc(c,d){var e=t;t+=12436;D(t<X);var b,f,g=e+8224,j=e+8236,l,i,k,E,m,q,r,u,A=e+8248,y=e+8340;f=0;l=j;m=l+12;k=0;k<0&&(k+=256);for(k=k+(k<<8)+(k<<16)+k*16777216;l%4!==0&&l<m;)p[l++]=0;l>>=2;for(i=m>>2;l<i;)a[l++]=k;for(l<<=2;l<m;)p[l++]=0;a[j>>2]=4;a[j+4>>2]=6;a[j+8>>2]=8;if(((e|0)!=0?1:2)==1){l=e;m=l+8224;k=0;k<0&&(k+=256);for(k=
k+(k<<8)+(k<<16)+k*16777216;l%4!==0&&l<m;)p[l++]=0;l>>=2;for(i=m>>2;l<i;)a[l++]=k;for(l<<=2;l<m;)p[l++]=0;a[e+4>>2]=0;a[e>>2]=0;a[e+8220>>2]=0;a[e+8200>>2]=-1;a[e+8204>>2]=-1}p[y]=0;l=g;m=l+12;k=0;k<0&&(k+=256);for(k=k+(k<<8)+(k<<16)+k*16777216;l%4!==0&&l<m;)p[l++]=0;l>>=2;for(i=m>>2;l<i;)a[l++]=k;for(l<<=2;l<m;)p[l++]=0;b=(Qf(c,d,e,g,y)|0)==1?1:2;a:do if(b==1)f=1;else if(b==2){b=(p[g+8]<<24>>24|0)==1?3:16;do if(b==3){E=a[g>>2];m=l=q=k=i=H;m=0;q=If(E);i=(q|0)!=0?2:1;do if(i==2){d:for(;;){l=i=Va(q);
if((i|0)==0){i=8;break d}i=(pb(qb,l+4)|0)==0?6:5;e:do if(i==5){if((pb(pc,l+4)|0)==0){i=6;break e}m+=1;i=3;continue d}while(0)}k=m}else i==1&&(o(a[a[x>>2]+12>>2],qc,h([E,0,0,0],["i8*",0,0,0],n)),k=0);while(0);E=k;q=z(8);b=(q|0)!=0?4:11;do if(b==4){l=z(E<<12);a[q>>2]=l;l=z(E<<2);a[q+4>>2]=l;b=(a[q>>2]|0)!=0?6:5;do if(b==6){l=0;e:for(;;){if(!((l|0)<(E|0))){b=10;break e}a[a[q+4>>2]+(l<<2)>>2]=a[q>>2]+(l<<12);l+=1}}else if(b==5){f=1;break a}while(0)}while(0);b=(Hf(q,a[g>>2])|0)==1?12:13;do if(b==12){f=
1;break a}else if(b==13){b=(E|0)==0?14:15;do if(b==14){o(a[a[x>>2]+8>>2],bg,h(1,"i32",n));f=1;break a}while(0)}while(0)}else b==16&&(E=1);while(0);m=0;b:for(;;){if(!((m|0)<(E|0))){b=93;break b}l=0;o(a[a[x>>2]+12>>2],Ua,h(1,"i32",n));b=(p[g+8]<<24>>24|0)==1?20:23;c:do if(b==20){b=Lf(m,q,g,e)<<24>>24!=0?21:22;do if(b==21){o(a[a[x>>2]+12>>2],cg,h(1,"i32",n));b=92;break c}else if(b==22){b=23;break c}while(0)}while(0);c:do if(b==23){b=pa(e+8,dg);if((b|0)==0){b=24;break b}eg(b,2);k=ji(b);eg(b,0);i=z(k);
var L=b;r=k*1;if(r!=0)if(u=fg(L,i,r),L=s.a[L],u==-1){if(L)L.error=I}else if(u<r)L.f=I;ta(b);b=a[e+8200>>2];b=b==0?26:b==1?36:b==2?46:56;do if(b==56){o(a[a[x>>2]+12>>2],gg,h(1,"i32",n));b=92;break c}else if(b==26){r=Cb(0);bc(r,j,a[a[x>>2]+12>>2]);lc(r,e);u=Ab(r,i,k);b=p[y]<<24>>24!=0?27:28;b==27?l=Ia(r,u,A):b==28&&(l=Ia(r,u,0));if((l|0)==0){b=30;break b}b=p[y]<<24>>24!=0?32:35;b==32&&(b=Ib(A,y)&255,b=b<<24>>24!=0?33:34,b==33&&o(a[a[x>>2]+12>>2],Jb,h(1,"i32",n)))}else if(b==36){r=Cb(2);bc(r,j,a[a[x>>
2]+12>>2]);lc(r,e);u=Ab(r,i,k);b=p[y]<<24>>24!=0?37:38;b==37?l=Ia(r,u,A):b==38&&(l=Ia(r,u,0));if((l|0)==0){b=40;break b}b=p[y]<<24>>24!=0?42:45;b==42&&(b=Ib(A,y)&255,b=b<<24>>24!=0?43:44,b==43&&o(a[a[x>>2]+12>>2],Jb,h(1,"i32",n)))}else if(b==46){r=Cb(1);bc(r,j,a[a[x>>2]+12>>2]);lc(r,e);u=Ab(r,i,k);b=p[y]<<24>>24!=0?47:48;b==47?l=Ia(r,u,A):b==48&&(l=Ia(r,u,0));if((l|0)==0){b=50;break b}b=p[y]<<24>>24!=0?52:55;b==52&&(b=Ib(A,y)&255,b=b<<24>>24!=0?53:54,b==53&&o(a[a[x>>2]+12>>2],Jb,h(1,"i32",n)))}while(0);
b=(a[l+20>>2]|0)==3?58:59;b==58&&hg(l);b=(a[l+28>>2]|0)!=0?60:61;b==60&&(a[l+28>>2]=0,a[l+32>>2]=0);i=a[e+8204>>2];b=i==10?62:i==11?66:i==12?70:i==15?74:i==16?78:i==17?82:86;b==86?o(a[a[x>>2]+12>>2],sb,h([e+4104,0,0,0],["i8*",0,0,0],n)):b==62?(b=(ig(l,e+4104)|0)!=0?63:64,b==63?o(a[a[x>>2]+8>>2],sb,h([e+4104,0,0,0],["i8*",0,0,0],n)):b==64&&o(a[a[x>>2]+8>>2],Kb,h([e+4104,0,0,0],["i8*",0,0,0],n))):b==66?(b=(jg(l,e+4104)|0)!=0?67:68,b==67?o(a[a[x>>2]+8>>2],sb,h([e+4104,0,0,0],["i8*",0,0,0],n)):b==68&&
o(a[a[x>>2]+8>>2],Kb,h([e+4104,0,0,0],["i8*",0,0,0],n))):b==70?(b=(kg(l,e+4104)|0)!=0?71:72,b==71?o(a[a[x>>2]+8>>2],sb,h([e+4104,0,0,0],["i8*",0,0,0],n)):b==72&&o(a[a[x>>2]+8>>2],Kb,h([e+4104,0,0,0],["i8*",0,0,0],n))):b==74?(a[Ac>>2]=a[l+8>>2]-a[l>>2],a[Bc>>2]=a[l+12>>2]-a[l+4>>2],b=(lg(l,e+4104)|0)!=0?75:76,b==75?o(a[a[x>>2]+8>>2],mg,h([e+4104,0,0,0],["i8*",0,0,0],n)):b==76&&o(a[a[x>>2]+8>>2],Lb,h([e+4104,0,0,0],["i8*",0,0,0],n))):b==78?(b=(ng(l,e+4104)|0)!=0?79:80,b==79?o(a[a[x>>2]+8>>2],og,h([e+
4104,0,0,0],["i8*",0,0,0],n)):b==80&&o(a[a[x>>2]+8>>2],Lb,h([e+4104,0,0,0],["i8*",0,0,0],n))):b==82&&(b=(pg(l,e+4104)|0)!=0?83:84,b==83?o(a[a[x>>2]+8>>2],qg,h([e+4104,0,0,0],["i8*",0,0,0],n)):b==84&&o(a[a[x>>2]+8>>2],Lb,h([e+4104,0,0,0],["i8*",0,0,0],n)));b=p[y]<<24>>24!=0?90:91}while(0);m+=1}b==93?f=0:b==24?(o(a[a[x>>2]+12>>2],rg,h([e+8,0,0,0],["i8*",0,0,0],n)),f=1):b==30?(o(a[a[x>>2]+12>>2],Mb,h(1,"i32",n)),f=1):b==40?(o(a[a[x>>2]+12>>2],Mb,h(1,"i32",n)),f=1):b==50&&(o(a[a[x>>2]+12>>2],Mb,h(1,"i32",
n)),f=1)}while(0);t=e;return f}function sg(c,d,e,b,f){var g=t;t+=20;D(t<X);var j,h;j=(d|0)!=0?1:3;a:do if(j==1){if((e|0)==0){j=3;break a}if((b|0)==0){j=3;break a}var i,k;j=g;h=j+18;k=0;k<0&&(k+=256);for(k=k+(k<<8)+(k<<16)+k*16777216;j%4!==0&&j<h;)p[j++]=0;j>>=2;for(i=h>>2;j<i;)a[j++]=k;for(j<<=2;j<h;)p[j++]=0;p[g+16]=d&255;q[g+12>>1]=e&65535;q[g+14>>1]=b&65535;p[g+2]=2;p[g+17]=8;j=(f|0)!=0?5:6;j==5&&(p[g+17]=(U[g+17]&255|32)&255);ga(g,18,1,c);h=1;j=7;break a}while(0);j==3&&(h=0);t=g;return h}function ng(c,
d){var e=t;t+=4;D(t<X);var b,f,g,j,i,k,s,q,m,r,u,z,A;z=pa(d,ua);b=(z|0)!=0?2:1;do if(b==2){g=0;b:for(;;){if(!((g|0)<(a[c+16>>2]-1|0))){b=10;break b}if((a[a[c+24>>2]>>2]|0)!=(a[a[c+24>>2]+(g+1)*48>>2]|0)){b=7;break b}if((a[a[c+24>>2]+4>>2]|0)!=(a[a[c+24>>2]+(g+1)*48+4>>2]|0)){b=7;break b}if((a[a[c+24>>2]+24>>2]|0)!=(a[a[c+24>>2]+(g+1)*48+24>>2]|0)){b=7;break b}g+=1}do if(b==10){g=a[a[c+24>>2]+8>>2];j=a[a[c+24>>2]+12>>2];if((a[c+16>>2]|0)==2){var y=1;b=12}else b=11;b==11&&(y=(a[c+16>>2]|0)==4);k=y&
1;b=(k|0)!=0?32:24;b=(sg(z,b,g,j,1)|0)!=0?14:13;do if(b==14){s=a[c+16>>2]-1;u=255/((1<<a[a[c+24>>2]+24>>2])-1|0);i=0;d:for(;;){if(!((i|0)<(j|0))){b=27;break d}A=i*g;f=0;e:for(;;){if(!((f|0)<(g|0))){b=25;break e}q=a[a[a[c+24>>2]+44>>2]+(A<<2)>>2]|0;b=(a[c+16>>2]|0)>2?19:20;b==19?(m=a[a[a[c+24>>2]+48+44>>2]+(A<<2)>>2]|0,r=a[a[a[c+24>>2]+96+44>>2]+(A<<2)>>2]|0):b==20&&(r=m=q);p[e]=Math.floor(r*u);ga(e,1,1,z);p[e]=Math.floor(m*u);ga(e,1,1,z);p[e]=Math.floor(q*u);ga(e,1,1,z);b=(k|0)!=0?22:23;b==22&&(q=
a[a[a[c+24>>2]+s*48+44>>2]+(A<<2)>>2]|0,p[e]=Math.floor(q*u),ga(e,1,1,z));f+=1;A+=1}i+=1}f=0}else b==13&&(f=1);while(0)}else b==7&&(o(a[a[x>>2]+12>>2],tg,h(1,"i32",n)),f=1);while(0)}else b==1&&(o(a[a[x>>2]+12>>2],Xa,h([d,0,0,0],["i8*",0,0,0],n)),f=1);while(0);t=e;return f}function kg(c,d){var e,b,f,g,j,i,k,p,s,m,q,r;e=(a[c+16>>2]|0)==3?1:41;a:do if(e==1){if((a[a[c+24>>2]>>2]|0)!=(a[a[c+24>>2]+48>>2]|0)){e=41;break a}if((a[a[c+24>>2]+48>>2]|0)!=(a[a[c+24>>2]+96>>2]|0)){e=41;break a}if((a[a[c+24>>2]+
4>>2]|0)!=(a[a[c+24>>2]+48+4>>2]|0)){e=41;break a}if((a[a[c+24>>2]+48+4>>2]|0)!=(a[a[c+24>>2]+96+4>>2]|0)){e=41;break a}if((a[a[c+24>>2]+24>>2]|0)!=(a[a[c+24>>2]+48+24>>2]|0)){e=41;break a}if((a[a[c+24>>2]+48+24>>2]|0)!=(a[a[c+24>>2]+96+24>>2]|0)){e=41;break a}k=pa(d,ua);e=(k|0)!=0?9:8;do if(e==9){f=a[a[c+24>>2]+8>>2];g=a[a[c+24>>2]+12>>2];o(k,Cc,h(1,"i32",n));o(k,M,h([g*f*3+g*3*((f|0)%2)+54&255,0,0,0,g*f*3+g*3*((f|0)%2)+54>>8&255,0,0,0,g*f*3+g*3*((f|0)%2)+54>>16&255,0,0,0,g*f*3+g*3*((f|0)%2)+54>>
24&255,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h(16,"i32",n));o(k,M,h([54,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h([40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h([f&255,0,0,0,f>>8&255,0,0,0,f>>16&255,0,0,0,f>>24&255,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h([g&255,0,0,0,g>>8&255,0,0,0,g>>16&255,0,0,0,g>>24&255,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",
0,0,0,"i32",0,0,0],n));o(k,tb,h([1,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0],n));o(k,tb,h([24,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0],n));o(k,M,h(16,"i32",n));o(k,M,h([g*3*f+g*3*((f|0)%2)&255,0,0,0,g*f*3+g*3*((f|0)%2)>>8&255,0,0,0,g*f*3+g*3*((f|0)%2)>>16&255,0,0,0,g*f*3+g*3*((f|0)%2)>>24&255,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h([154,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h([154,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0],["i32",
0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h(16,"i32",n));o(k,M,h(16,"i32",n));e=(a[a[c+24>>2]+24>>2]|0)>8?10:11;e==10?(p=a[a[c+24>>2]+24>>2]-8,sa(Dc,h([a[a[c+24>>2]+24>>2],0,0,0],["i32",0,0,0],n))):e==11&&(p=0);e=(a[a[c+24>>2]+48+24>>2]|0)>8?13:14;e==13?(s=a[a[c+24>>2]+48+24>>2]-8,sa(ug,h([a[a[c+24>>2]+48+24>>2],0,0,0],["i32",0,0,0],n))):e==14&&(s=0);e=(a[a[c+24>>2]+96+24>>2]|0)>8?16:17;e==16?(m=a[a[c+24>>2]+96+24>>2]-8,sa(vg,h([a[a[c+24>>2]+96+24>>2],0,0,0],["i32",0,0,0],n))):e==17&&(m=
0);j=0;c:for(;;){if(!((j|0)<(f*g|0)))break c;i=a[a[a[c+24>>2]+44>>2]+(f*g-(((j|0)/(f|0)|0)+1)*f+(j|0)%(f|0)<<2)>>2];e=(a[a[c+24>>2]+32>>2]|0)!=0?21:22;if(e==21)var t=1<<a[a[c+24>>2]+24>>2]-1;else e==22&&(t=0);i+=t;i=(i>>(p|0))+(i>>(p-1|0)|0)%2&255;q=a[a[a[c+24>>2]+48+44>>2]+(f*g-(((j|0)/(f|0)|0)+1)*f+(j|0)%(f|0)<<2)>>2];e=(a[a[c+24>>2]+48+32>>2]|0)!=0?24:25;if(e==24)var A=1<<a[a[c+24>>2]+48+24>>2]-1;else e==25&&(A=0);q+=A;q=(q>>(s|0))+(q>>(s-1|0)|0)%2&255;r=a[a[a[c+24>>2]+96+44>>2]+(f*g-(((j|0)/(f|
0)|0)+1)*f+(j|0)%(f|0)<<2)>>2];e=(a[a[c+24>>2]+96+32>>2]|0)!=0?27:28;if(e==27)var y=1<<a[a[c+24>>2]+96+24>>2]-1;else e==28&&(y=0);r+=y;e=(r>>(m|0))+(r>>(m-1|0)|0)%2&255;o(k,Ec,h([e&255,0,0,0,q&255,0,0,0,i&255,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));e=((j+1|0)%(f|0)|0)==0?30:38;do if(e==30){e=((f*3|0)%4|0)!=0?31:32;if(e==31)var u=4-(f*3|0)%4;else e==32&&(u=0);i=u;e:for(;;){if(!((i|0)>0)){e=37;break e}o(k,ub,h(4,"i32",n));i-=1}}while(0);j+=1}ta(k);e=65;break a}else if(e==8){o(a[a[x>>2]+12>>
2],Xa,h([d,0,0,0],["i8*",0,0,0],n));b=1;e=66;break a}while(0)}while(0);a:do if(e==41){k=pa(d,ua);f=a[a[c+24>>2]+8>>2];g=a[a[c+24>>2]+12>>2];o(k,Cc,h(1,"i32",n));o(k,M,h([g*f+1078+g*((f|0)%2)&255,0,0,0,g*f+1078+g*((f|0)%2)>>8&255,0,0,0,g*f+1078+g*((f|0)%2)>>16&255,0,0,0,g*f+1078+f*((f|0)%2)>>24&255,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h(16,"i32",n));o(k,M,h([54,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h([40,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h([f&255,0,0,0,f>>8&255,0,0,0,f>>16&255,0,0,0,f>>24&255,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h([g&255,0,0,0,g>>8&255,0,0,0,g>>16&255,0,0,0,g>>24&255,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,tb,h([1,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0],n));o(k,tb,h([8,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0],n));o(k,M,h(16,"i32",n));o(k,M,h([g*f+g*((f|0)%2)&255,0,0,0,g*f+g*((f|0)%
2)>>8&255,0,0,0,g*f+g*((f|0)%2)>>16&255,0,0,0,g*f+g*((f|0)%2)>>24&255,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h([154,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h([154,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h([0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));o(k,M,h([0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,
0,"i32",0,0,0],n));e=(a[a[c+24>>2]+24>>2]|0)>8?42:43;e==42?(p=a[a[c+24>>2]+24>>2]-8,sa(Dc,h([a[a[c+24>>2]+24>>2],0,0,0],["i32",0,0,0],n))):e==43&&(p=0);j=0;b:for(;;){if(!((j|0)<256))break b;o(k,M,h([j,0,0,0,j,0,0,0,j,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));j+=1}j=0;b:for(;;){if(!((j|0)<(f*g|0)))break b;s=a[a[a[c+24>>2]+44>>2]+(f*g-(((j|0)/(f|0)|0)+1)*f+(j|0)%(f|0)<<2)>>2];e=(a[a[c+24>>2]+32>>2]|0)!=0?51:52;if(e==51)var w=1<<a[a[c+24>>2]+24>>2]-1;else e==52&&(w=0);s+=w;
e=(s>>(p|0))+(s>>(p-1|0)|0)%2&255;o(k,ub,h([e&255,0,0,0],["i32",0,0,0],n));e=((j+1|0)%(f|0)|0)==0?54:62;do if(e==54){e=((f|0)%4|0)!=0?55:56;if(e==55)var z=4-(f|0)%4;else e==56&&(z=0);i=z;d:for(;;){if(!((i|0)>0)){e=61;break d}o(k,ub,h(4,"i32",n));i-=1}}while(0);j+=1}ta(k);e=65;break a}while(0);e==65&&(b=0);return b}function jg(c,d){var e=t;t+=260;D(t<X);var b,f,g,j,i,k,s,q,m,r,u,C=e+256;s=0;a:for(;;){if(!((s|0)<(a[c+16>>2]|0))){b=29;break a}i=a[c+24>>2]+s*48;m=e;r=0;b=xa(d);g=b-4;j=g+6;if((p[d+g]<<
24>>24|0)!=46){b=3;break a}b=j>>>0>256?5:6;b==5&&(m=z(j+1));Wa(m,d,g);b=(a[c+16>>2]|0)>1?7:8;b==7?Da(m+g,wg,h([s,0,0,0],["i32",0,0,0],n)):b==8&&rb(m+g,xg);q=pa(m,ua);if((q|0)==0){b=10;break a}g=a[a[c+24>>2]+s*48+8>>2];j=a[a[c+24>>2]+s*48+12>>2];o(q,yg,h([(a[i+32>>2]|0)!=0?45:43,0,0,0,a[i+24>>2],0,0,0,g,0,0,0,j,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));b=(a[i+24>>2]|0)<=8?14:15;b==14?r=1:b==15&&(b=(a[i+24>>2]|0)<=16?16:17,b==16?r=2:b==17&&(r=4));i=0;b:for(;;){if(!((i|0)<(g*j|0))){b=
27;break b}u=a[a[a[c+24>>2]+s*48+44>>2]+(i<<2)>>2];k=r-1;c:for(;;){if(!((k|0)>=0)){b=25;break c}p[C]=u>>(k<<3|0)&255;ga(C,1,1,q);k-=1}i+=1}ta(q);s+=1}b==29?f=0:b==3?(o(a[a[x>>2]+12>>2],zg,h(1,"i32",n)),f=1):b==10&&(o(a[a[x>>2]+12>>2],Xa,h([m,0,0,0],["i8*",0,0,0],n)),f=1);t=e;return f}function ig(c,d){var e=t;t+=256;D(t<X);var b,f,g,j,i,k,s,q,m,r,u,z,A,y;g=d;a:for(;;){if(p[g]<<24>>24==0)break a;g+=1}g-=1;g-=1;u=p[g];b=(a[c+16>>2]|0)==3?4:40;a:do if(b==4){if((a[a[c+24>>2]>>2]|0)!=(a[a[c+24>>2]+48>>
2]|0)){b=40;break a}if((a[a[c+24>>2]+48>>2]|0)!=(a[a[c+24>>2]+96>>2]|0)){b=40;break a}if((a[a[c+24>>2]+4>>2]|0)!=(a[a[c+24>>2]+48+4>>2]|0)){b=40;break a}if((a[a[c+24>>2]+48+4>>2]|0)!=(a[a[c+24>>2]+96+4>>2]|0)){b=40;break a}if((a[a[c+24>>2]+24>>2]|0)!=(a[a[c+24>>2]+48+24>>2]|0)){b=40;break a}if((a[a[c+24>>2]+48+24>>2]|0)!=(a[a[c+24>>2]+96+24>>2]|0)){b=40;break a}if((u<<24>>24|0)==103){b=40;break a}if((u<<24>>24|0)==71){b=40;break a}r=pa(d,ua);b=(r|0)!=0?14:13;do if(b==14){g=a[a[c+24>>2]+8>>2];j=a[a[c+
24>>2]+12>>2];b=(a[a[c+24>>2]+24>>2]|0)>8?15:16;b==15?i=255:b==16&&(i=(1<<a[a[c+24>>2]+24>>2])-1);b=i;a[a[c+24>>2]+16>>2]=a[a[c+24>>2]+16>>2]-((a[c>>2]+a[a[c+24>>2]>>2]-1|0)/(a[a[c+24>>2]>>2]|0)|0)+(1<<a[a[c+24>>2]+40>>2])-1>>(a[a[c+24>>2]+40>>2]|0);a[a[c+24>>2]+20>>2]=a[a[c+24>>2]+20>>2]-((a[c+4>>2]+a[a[c+24>>2]+4>>2]-1|0)/(a[a[c+24>>2]+4>>2]|0)|0)+(1<<a[a[c+24>>2]+40>>2])-1>>(a[a[c+24>>2]+40>>2]|0);o(r,Ag,h([g,0,0,0,j,0,0,0,b,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));b=(a[a[c+24>>2]+24>>
2]|0)>8?18:19;b==18?(k=a[a[c+24>>2]+24>>2]-8,sa(Bg,h([a[a[c+24>>2]+24>>2],0,0,0],["i32",0,0,0],n))):b==19&&(k=0);b=(a[a[c+24>>2]+48+24>>2]|0)>8?21:22;b==21?(s=a[a[c+24>>2]+48+24>>2]-8,sa(Cg,h([a[a[c+24>>2]+48+24>>2],0,0,0],["i32",0,0,0],n))):b==22&&(s=0);b=(a[a[c+24>>2]+96+24>>2]|0)>8?24:25;b==24?(q=a[a[c+24>>2]+96+24>>2]-8,sa(Dg,h([a[a[c+24>>2]+96+24>>2],0,0,0],["i32",0,0,0],n))):b==25&&(q=0);i=0;c:for(;;){if(!((i|0)<(g*j|0)))break c;z=a[a[a[c+24>>2]+44>>2]+(i<<2)>>2];b=(a[a[c+24>>2]+32>>2]|0)!=
0?29:30;if(b==29)var L=1<<a[a[c+24>>2]+24>>2]-1;else b==30&&(L=0);z+=L;z=(z>>(k|0))+(z>>(k-1|0)|0)%2&255;A=a[a[a[c+24>>2]+48+44>>2]+(i<<2)>>2];b=(a[a[c+24>>2]+48+32>>2]|0)!=0?32:33;if(b==32)var w=1<<a[a[c+24>>2]+48+24>>2]-1;else b==33&&(w=0);A+=w;A=(A>>(s|0))+(A>>(s-1|0)|0)%2&255;y=a[a[a[c+24>>2]+96+44>>2]+(i<<2)>>2];b=(a[a[c+24>>2]+96+32>>2]|0)!=0?35:36;if(b==35)var C=1<<a[a[c+24>>2]+96+24>>2]-1;else b==36&&(C=0);y+=C;b=(y>>(q|0))+(y>>(q-1|0)|0)%2&255;o(r,Ec,h([z&255,0,0,0,A&255,0,0,0,b&255,0,0,
0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));i+=1}ta(r);b=69;break a}else if(b==13){o(a[a[x>>2]+12>>2],Xa,h([d,0,0,0],["i8*",0,0,0],n));f=1;b=70;break a}while(0)}while(0);a:do if(b==40){b=(u<<24>>24|0)==103?42:41;b:do if(b==41){if((u<<24>>24|0)==71){b=42;break b}var F=a[c+16>>2];b=44;break b}while(0);b==42&&(F=1);s=F;b=(a[c+16>>2]|0)>(s|0)?45:46;b==45&&(o(a[a[x>>2]+12>>2],Eg,h(1,"i32",n)),o(a[a[x>>2]+12>>2],Fg,h(1,"i32",n)));k=0;b:for(;;){if(!((k|0)<(s|0))){b=68;break b}b=(s|0)>1?49:50;b==49?Da(e,
Gg,h([k,0,0,0,d,0,0,0],["i32",0,0,0,"i8*",0,0,0],n)):b==50&&Da(e,Hg,h([d,0,0,0],["i8*",0,0,0],n));r=pa(e,ua);if((r|0)==0){b=52;break b}g=a[a[c+24>>2]+k*48+8>>2];j=a[a[c+24>>2]+k*48+12>>2];b=(a[a[c+24>>2]+k*48+24>>2]|0)>8?54:55;if(b==54)var K=255;else b==55&&(K=(1<<a[a[c+24>>2]+k*48+24>>2])-1);b=K;a[a[c+24>>2]+k*48+16>>2]=a[a[c+24>>2]+k*48+16>>2]-((a[c>>2]+a[a[c+24>>2]+k*48>>2]-1|0)/(a[a[c+24>>2]+k*48>>2]|0)|0)+(1<<a[a[c+24>>2]+k*48+40>>2])-1>>(a[a[c+24>>2]+k*48+40>>2]|0);a[a[c+24>>2]+k*48+20>>2]=
a[a[c+24>>2]+k*48+20>>2]-((a[c+4>>2]+a[a[c+24>>2]+k*48+4>>2]-1|0)/(a[a[c+24>>2]+k*48+4>>2]|0)|0)+(1<<a[a[c+24>>2]+k*48+40>>2])-1>>(a[a[c+24>>2]+k*48+40>>2]|0);o(r,Ig,h([g,0,0,0,j,0,0,0,b,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));b=(a[a[c+24>>2]+k*48+24>>2]|0)>8?57:58;b==57?(m=a[a[c+24>>2]+24>>2]-8,sa(Jg,h([k,0,0,0,a[a[c+24>>2]+k*48+24>>2],0,0,0],["i32",0,0,0,"i32",0,0,0],n))):b==58&&(m=0);i=0;c:for(;;){if(!((i|0)<(g*j|0))){b=66;break c}q=a[a[a[c+24>>2]+k*48+44>>2]+(i<<2)>>2];b=(a[a[c+24>>2]+
k*48+32>>2]|0)!=0?62:63;if(b==62)var B=1<<a[a[c+24>>2]+k*48+24>>2]-1;else b==63&&(B=0);q+=B;q=(q>>(m|0))+(q>>(m-1|0)|0)%2&255;o(r,ub,h([q&255,0,0,0],["i32",0,0,0],n));i+=1}ta(r);k+=1}do if(b==68){b=69;break a}else if(b==52){o(a[a[x>>2]+12>>2],Xa,h([e,0,0,0],["i8*",0,0,0],n));f=1;b=70;break a}while(0)}while(0);b==69&&(f=0);t=e;return f}function lg(c,d){var e=t;t+=16;D(t<X);var b,f,g,j,i,k,s,q,m,r,u=e+4,z,A=e+8,y=e+12;b=(a[c+16>>2]*a[c+8>>2]*a[c+12>>2]|0)==0?1:2;do if(b==1)o(a[a[x>>2]+12>>2],Kg,h(1,
"i32",n)),f=1;else if(b==2){g=pa(d,ua);b=(g|0)!=0?4:3;do if(b==4){o(a[a[x>>2]+8>>2],Lg,h([a[c+16>>2],0,0,0],["i32",0,0,0],n));j=0;c:for(;;){if(!((j|0)<(a[c+16>>2]|0))){b=58;break c}o(a[a[x>>2]+8>>2],Mg,h([j,0,0,0,a[a[c+24>>2]+j*48+8>>2],0,0,0,a[a[c+24>>2]+j*48+12>>2],0,0,0,a[a[c+24>>2]+j*48+24>>2],0,0,0,(a[a[c+24>>2]+j*48+32>>2]|0)==1?Ng:Og,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i8*",0,0,0],n));i=a[a[c+24>>2]+j*48+8>>2];k=a[a[c+24>>2]+j*48+12>>2];b=(a[a[c+24>>2]+j*48+24>>2]|0)<=
8?7:29;do if(b==7){b=(a[a[c+24>>2]+j*48+32>>2]|0)==1?8:17;do if(b==8){r=(1<<a[a[c+24>>2]+j*48+24>>2])-1;m=a[a[c+24>>2]+j*48+44>>2];s=0;f:for(;;){if(!((s|0)<(k|0))){b=16;break f}q=0;g:for(;;){if(!((q|0)<(i|0))){b=14;break g}p[e]=a[m>>2]&r&255;ga(e,1,1,g);m+=4;q+=1}s+=1}}else if(b==17){b=(a[a[c+24>>2]+j*48+32>>2]|0)==0?18:27;do if(b==18){r=(1<<a[a[c+24>>2]+j*48+24>>2])-1;m=a[a[c+24>>2]+j*48+44>>2];s=0;g:for(;;){if(!((s|0)<(k|0))){b=26;break g}q=0;h:for(;;){if(!((q|0)<(i|0))){b=24;break h}p[u]=a[m>>
2]&r&255;ga(u,1,1,g);m+=4;q+=1}s+=1}}while(0)}while(0)}else if(b==29){if(!((a[a[c+24>>2]+j*48+24>>2]|0)<=16)){b=52;break c}b=(a[a[c+24>>2]+j*48+32>>2]|0)==1?31:40;do if(b==31){z=(1<<a[a[c+24>>2]+j*48+24>>2])-1;m=a[a[c+24>>2]+j*48+44>>2];s=0;f:for(;;){if(!((s|0)<(k|0))){b=39;break f}q=0;g:for(;;){if(!((q|0)<(i|0))){b=37;break g}r=a[m>>2]&z&65535;p[A]=r<<16>>16>>8&255;ga(A,1,1,g);p[A]=r&255;ga(A,1,1,g);m+=4;q+=1}s+=1}}else if(b==40){b=(a[a[c+24>>2]+j*48+32>>2]|0)==0?41:50;do if(b==41){z=(1<<a[a[c+24>>
2]+j*48+24>>2])-1;m=a[a[c+24>>2]+j*48+44>>2];s=0;g:for(;;){if(!((s|0)<(k|0))){b=49;break g}q=0;h:for(;;){if(!((q|0)<(i|0))){b=47;break h}r=a[m>>2]&z&65535;p[y]=(r&65535)>>8&255;ga(y,1,1,g);p[y]=r&255;ga(y,1,1,g);m+=4;q+=1}s+=1}}while(0)}while(0)}while(0);j+=1}b==58?(ta(g),f=0):b==52&&(b=(a[a[c+24>>2]+j*48+24>>2]|0)<=32?53:54,b==53?(o(a[a[x>>2]+12>>2],Pg,h(1,"i32",n)),f=1):b==54&&(o(a[a[x>>2]+12>>2],Qg,h([a[a[c+24>>2]+j*48+24>>2],0,0,0],["i32",0,0,0],n)),f=1))}else b==3&&(o(a[a[x>>2]+12>>2],Rg,h([d,
0,0,0],["i8*",0,0,0],n)),f=1);while(0)}while(0);t=e;return f}function pg(c,d){var e=t;t+=16;D(t<X);var b,f,g,j=e+4,i,k,q,r,m,u,O,F,A,y,L,w,K,G,J,B,T,M,R,$,P,V,S,N=e+8,Q;S=-1;M=P=V=0;B=1;R=a[a[c+24>>2]+24>>2];$=a[a[c+24>>2]+24>>2];b=($|0)>8?1:3;a:do if(b==1){if(!(($|0)<16))break a;$=16;M=1}while(0);b=($|0)!=1?4:9;a:do if(b==4){if(($|0)==2){b=9;break a}if(($|0)==4){b=9;break a}if(($|0)==8){b=9;break a}if(($|0)==16){b=9;break a}o(a[a[x>>2]+12>>2],Sg,h([d,0,0,0,$,0,0,0],["i8*",0,0,0,"i32",0,0,0],n));
f=B;b=127;break a}while(0);do if(b==9){g=pa(d,ua);b=(g|0)==0?10:11;do if(b==10)f=B;else if(b==11){f=a[j>>2]=0;i=ki(Tg,0,0,0);a[e>>2]=i;b=(a[e>>2]|0)==0?12:13;c:do if(b!=12&&b==13){i=li(a[e>>2]);a[j>>2]=i;b=(a[j>>2]|0)==0?14:15;do if(b!=14&&b==15){b=17;do if(b!=16&&b==17){mi(a[e>>2],g);ni(a[e>>2],9);b=($|0)==16?18:19;b==18?S=-1:b==19&&(b=($|0)==8?20:21,b==20?S=255:b==21&&(b=($|0)==4?22:23,b==22?S=15:b==23&&(b=($|0)==2?24:25,b==24?S=3:b==25&&(b=($|0)==1?26:27,b==26&&(S=1)))));A=a[c+16>>2];b=(A|0)>=
3?32:77;f:do if(b==32){if((a[a[c+24>>2]>>2]|0)!=(a[a[c+24>>2]+48>>2]|0)){b=77;break f}if((a[a[c+24>>2]+48>>2]|0)!=(a[a[c+24>>2]+96>>2]|0)){b=77;break f}if((a[a[c+24>>2]+4>>2]|0)!=(a[a[c+24>>2]+48+4>>2]|0)){b=77;break f}if((a[a[c+24>>2]+48+4>>2]|0)!=(a[a[c+24>>2]+96+4>>2]|0)){b=77;break f}if((a[a[c+24>>2]+24>>2]|0)!=(a[a[c+24>>2]+48+24>>2]|0)){b=77;break f}if((a[a[c+24>>2]+48+24>>2]|0)!=(a[a[c+24>>2]+96+24>>2]|0)){b=77;break f}f=(A|0)>3&1;T=($|0)==16&1;O=a[a[c+24>>2]+8>>2];F=a[a[c+24>>2]+12>>2];i=
a[a[c+24>>2]+44>>2];k=a[a[c+24>>2]+48+44>>2];q=a[a[c+24>>2]+96+44>>2];p[N+2]=$&255;p[N+1]=$&255;p[N]=$&255;b=(f|0)!=0?39:40;b==39?(p[N+4]=$&255,r=a[a[c+24>>2]+144+44>>2],y=6):b==40&&(r=p[N+4]=0,y=2);Ug(a[e>>2],a[j>>2],N);Vg(a[e>>2],a[j>>2],O,F,$,y,0,0,0);Wg(a[e>>2],a[j>>2]);b=(R|0)<8?42:43;b==42&&Xg(a[e>>2]);b=(M|0)!=0?44:45;b==44&&(P=16-R,V=R-P);b=(a[a[c+24>>2]+32>>2]|0)!=0?46:47;if(b==46)var aa=1<<a[a[c+24>>2]+24>>2]-1;else b==47&&(aa=0);L=aa;b=(a[a[c+24>>2]+48+32>>2]|0)!=0?49:50;if(b==49)var ca=
1<<a[a[c+24>>2]+48+24>>2]-1;else b==50&&(ca=0);w=ca;b=(a[a[c+24>>2]+96+32>>2]|0)!=0?52:53;if(b==52)var da=1<<a[a[c+24>>2]+96+24>>2]-1;else b==53&&(da=0);K=da;m=z(O*A<<1);J=0;g:for(;;){if(!((J|0)<(F|0)))break g;u=m;G=0;h:for(;;){if(!((G|0)<(O|0)))break h;b=(T|0)!=0?59:70;b==59?(Q=a[i>>2]+L,i+=4,b=(M|0)!=0?60:61,b==60&&(Q=(Q<<P)+(Q>>(V|0))),b=u,u=b+1,p[b]=Q>>8&255,b=u,u=b+1,p[b]=Q&255,Q=a[k>>2]+w,k+=4,b=(M|0)!=0?62:63,b==62&&(Q=(Q<<P)+(Q>>(V|0))),b=u,u=b+1,p[b]=Q>>8&255,b=u,u=b+1,p[b]=Q&255,Q=a[q>>
2]+K,q+=4,b=(M|0)!=0?64:65,b==64&&(Q=(Q<<P)+(Q>>(V|0))),b=u,u=b+1,p[b]=Q>>8&255,b=u,u=b+1,p[b]=Q&255,b=(f|0)!=0?66:69,b==66&&(b=r,r=b+4,Q=a[b>>2],b=(M|0)!=0?67:68,b==67&&(Q=(Q<<P)+(Q>>(V|0))),b=u,u=b+1,p[b]=Q>>8&255,b=u,u=b+1,p[b]=Q&255)):b==70&&(b=a[i>>2]+L&S&65535&255,Q=u,u=Q+1,p[Q]=b,i+=4,b=a[k>>2]+w&S&65535&255,Q=u,u=Q+1,p[Q]=b,k+=4,b=a[q>>2]+K&S&65535&255,Q=u,u=Q+1,p[Q]=b,q+=4,b=(f|0)!=0?71:72,b==71&&(b=a[r>>2]&S&65535&255,Q=u,u=Q+1,p[Q]=b,r+=4));G+=1}Fc(a[e>>2],m);J+=1}b=121;break f}while(0);
do if(b==77){b=(A|0)==1?82:78;g:do if(b==78){b=(A|0)==2?79:119;h:do if(b==79){if((a[a[c+24>>2]>>2]|0)!=(a[a[c+24>>2]+48>>2]|0))break h;if((a[a[c+24>>2]+4>>2]|0)!=(a[a[c+24>>2]+48+4>>2]|0))break h;if((a[a[c+24>>2]+24>>2]|0)==(a[a[c+24>>2]+48+24>>2]|0))break g}while(0);o(a[a[x>>2]+12>>2],Yg,h([d,0,0,0],["i8*",0,0,0],n));break c}while(0);i=a[a[c+24>>2]+44>>2];b=(M|0)!=0?83:84;b==83&&(P=16-R,V=R-P);p[N+3]=$&255;p[N+4]=0;p[N+2]=0;p[N+1]=0;y=r=p[N]=0;b=(A|0)==2?85:86;b==85&&(f=1,p[N+4]=$&255,r=a[a[c+24>>
2]+48+44>>2],y=4);O=a[a[c+24>>2]+8>>2];F=a[a[c+24>>2]+12>>2];Vg(a[e>>2],a[j>>2],O,F,U[N+3]&255,y,0,0,0);Ug(a[e>>2],a[j>>2],N);Wg(a[e>>2],a[j>>2]);b=(a[a[c+24>>2]+32>>2]|0)!=0?87:88;if(b==87)var ea=1<<a[a[c+24>>2]+24>>2]-1;else b==88&&(ea=0);L=ea;b=(R|0)<8?90:91;b==90&&Xg(a[e>>2]);b=($|0)>8?92:107;do if(b==92){m=z(O*A<<1);J=0;h:for(;;){if(!((J|0)<(F|0))){b=106;break h}u=m;G=0;i:for(;;){if(!((G|0)<(O|0))){b=104;break i}k=a[i>>2]+L;i+=4;b=(M|0)!=0?97:98;b==97&&(k=(k<<P)+(k>>(V|0)));q=u;u=q+1;p[q]=k>>
8&255;q=u;u=q+1;p[q]=k&255;b=(f|0)!=0?99:102;b==99&&(k=r,r=k+4,k=a[k>>2],b=(M|0)!=0?100:101,b==100&&(k=(k<<P)+(k>>(V|0))),q=u,u=q+1,p[q]=k>>8&255,q=u,u=q+1,p[q]=k&255);G+=1}Fc(a[e>>2],m);J+=1}}else if(b==107){m=ba(O,A<<1);J=0;h:for(;;){if(!((J|0)<(F|0))){b=117;break h}u=m;G=0;i:for(;;){if(!((G|0)<(O|0))){b=115;break i}k=a[i>>2]+L&S&65535&255;q=u;u=q+1;p[q]=k;i+=4;b=(f|0)!=0?112:113;b==112&&(k=a[r>>2]&S&65535&255,q=u,u=q+1,p[q]=k,r+=4);G+=1}Fc(a[e>>2],m);J+=1}}while(0)}while(0);oi(a[e>>2],a[j>>2]);
B=0}while(0)}while(0)}while(0);b=(a[e>>2]|0)!=0?123:124;b==123&&pi(e,j);ta(g);b=(B|0)!=0?125:126;if(b==125&&(f=d,qi(f)==-1))d:if(f=s.m(Ga(f)),!f.q||!f.n)C(f.error);else if(!f.object.write||f.Z)C(fa);else if(f.object.c){i=H;for(i in f.object.b){C(Rc);break d}f.path==s.P?C(Sc):delete f.k.b[f.name]}else C(eb);f=B}while(0)}while(0);t=e;return f}function Ib(c,d){var e,b,f,g,j,i,k,p,q,m,s,r,u,t,y,z,w,C,D,F,B,G,J,K,M,N;s=0;e=(c|0)!=0?2:1;do if(e==2){m=pa(d,Zg);e=(m|0)!=0?4:3;do if(e==4){e=(P[0]=T[a[c+88>>
2]+556>>2],P[1]=T[a[c+88>>2]+556+4>>2],ha[0])!=0?5:6;e==5?r=1:e==6&&(r=0);e=(a[a[c+88>>2]+552>>2]|0)!=0?8:9;e==8?u=1:e==9&&(u=0);o(m,Nb,h([a[c+16>>2],0,0,0,a[c+20>>2],0,0,0],["i32",0,0,0,"i32",0,0,0],n));o(m,va,h([a[c+24>>2],0,0,0],["i32",0,0,0],n));o(m,Nb,h([a[c+28>>2],0,0,0,a[c+32>>2],0,0,0],["i32",0,0,0,"i32",0,0,0],n));o(m,Nb,h([a[c+44>>2],0,0,0,a[c+48>>2],0,0,0],["i32",0,0,0,"i32",0,0,0],n));o(m,va,h([a[c+52>>2],0,0,0],["i32",0,0,0],n));o(m,va,h([a[c+56>>2],0,0,0],["i32",0,0,0],n));o(m,va,h([a[a[c+
60>>2]>>2],0,0,0],["i32",0,0,0],n));j=a[a[c+60>>2]>>2];c:for(;;){if(!((j|0)>=0))break c;o(m,$g,h([1<<a[a[c+88>>2]+284+(j<<2)>>2],0,0,0,1<<a[a[c+88>>2]+284+(j<<2)>>2],0,0,0],["i32",0,0,0,"i32",0,0,0],n));j-=1}o(m,ea,h(1,"i32",n));o(m,va,h([a[c+76>>2],0,0,0],["i32",0,0,0],n));o(m,va,h([a[c+80>>2],0,0,0],["i32",0,0,0],n));o(m,va,h([a[c+84>>2],0,0,0],["i32",0,0,0],n));o(m,ah,h(1,"i32",n));o(m,bh,h(1,"i32",n));e=r<<24>>24!=0?15:16;e==15&&o(m,ch,h(1,"i32",n));e=u<<24>>24!=0?17:18;e==17&&o(m,dh,h(1,"i32",
n));e=(r<<24>>24|0)!=0?19:21;c:do if(e==19){if((u<<24>>24|0)==0)break c;o(m,eh,h(1,"i32",n))}while(0);o(m,ea,h(1,"i32",n));b=0;c:for(;;){if(!((b|0)<(a[c+44>>2]*a[c+48>>2]|0)))break c;o(m,fh,h([a[a[c+88>>2]+b*572+4>>2],0,0,0,a[a[c+88>>2]+b*572+8>>2],0,0,0,a[a[c+88>>2]+b*572+12>>2],0,0,0,a[a[c+88>>2]+b*572+16>>2],0,0,0,a[a[c+88>>2]+b*572+564>>2],0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));e=r<<24>>24!=0?24:25;e==24&&(k=(P[0]=a[a[c+88>>2]+b*572+556>>2],P[1]=a[a[c+88>>2]+
b*572+556+4>>2],ha[0]),o(m,Gc,h([k,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0],n)));e=u<<24>>24!=0?26:27;e==26&&o(m,gh,h([a[a[c+88>>2]+b*572+552>>2],0,0,0],["i32",0,0,0],n));e=(r<<24>>24|0)!=0?28:30;d:do if(e==28){if((u<<24>>24|0)==0)break d;k=(P[0]=a[a[c+88>>2]+b*572+556>>2],P[1]=a[a[c+88>>2]+b*572+556+4>>2],ha[0])/(a[a[c+88>>2]+b*572+552>>2]|0);o(m,Gc,h([k,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0],n))}while(0);o(m,ea,h(1,"i32",n));b+=1}b=0;c:for(;;){if(!((b|0)<(a[c+44>>2]*a[c+48>>2]|0)))break c;f=k=w=
0;d:for(;;){if(!((f|0)<(a[c+52>>2]|0)))break d;e=(w|0)<(a[a[c+60>>2]+(f<<2)>>2]|0)?37:38;e==37&&(w=a[a[c+60>>2]+(f<<2)>>2]);f+=1}o(m,hh,h([b,0,0,0],["i32",0,0,0],n));o(m,ih,h(1,"i32",n));j=0;d:for(;;){if(!((j|0)<(a[a[c+88>>2]+b*572+564>>2]|0)))break d;o(m,jh,h([j,0,0,0,b,0,0,0,a[a[a[c+88>>2]+b*572+568>>2]+j*20+12>>2],0,0,0,a[a[a[c+88>>2]+b*572+568>>2]+j*20+16>>2],0,0,0,a[a[a[c+88>>2]+b*572+568>>2]+j*20>>2],0,0,0,a[a[a[c+88>>2]+b*572+568>>2]+j*20+4>>2],0,0,0,a[a[a[c+88>>2]+b*572+568>>2]+j*20+8>>2],
0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));j+=1}e=(a[c+24>>2]|0)==0?45:68;do if(e==45){o(m,kh,h(1,"i32",n));e=r<<24>>24!=0?46:47;e==46&&o(m,Ya,h(1,"i32",n));o(m,ea,h(1,"i32",n));g=0;e:for(;;){if(!((g|0)<(a[c+56>>2]|0))){e=67;break e}j=0;f:for(;;){if(!((j|0)<(w+1|0))){e=65;break f}f=0;g:for(;;){if(!((f|0)<(a[c+52>>2]|0))){e=63;break g}if((j|0)>(a[a[c+60>>2]+(f<<2)>>2]|0)){e=54;break g}p=a[a[c+88>>2]+b*572+20+(j<<2)>>2]*a[a[c+88>>2]+b*572+152+(j<<
2)>>2];i=0;h:for(;;){if(!((i|0)<(p|0))){e=61;break h}e=a[a[a[c+88>>2]+b*572+548>>2]+k*20>>2];t=a[a[a[c+88>>2]+b*572+548>>2]+k*20+4>>2];y=a[a[a[c+88>>2]+b*572+548>>2]+k*20+8>>2];z=(P[0]=a[a[a[c+88>>2]+b*572+548>>2]+k*20+12>>2],P[1]=a[a[a[c+88>>2]+b*572+548>>2]+k*20+12+4>>2],ha[0]);o(m,lh,h([k,0,0,0,b,0,0,0,g,0,0,0,j,0,0,0,f,0,0,0,i,0,0,0,e,0,0,0,t,0,0,0,y,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));e=r<<24>>24!=0?58:59;e==
58&&o(m,Za,h([z,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0],n));o(m,ea,h(1,"i32",n));s+=z;k+=1;i+=1}f+=1}j+=1}g+=1}}else if(e==68){e=(a[c+24>>2]|0)==1?69:92;do if(e==69){o(m,mh,h(1,"i32",n));e=r<<24>>24!=0?70:71;e==70&&o(m,Ya,h(1,"i32",n));o(m,ea,h(1,"i32",n));j=0;f:for(;;){if(!((j|0)<(w+1|0))){e=91;break f}g=0;g:for(;;){if(!((g|0)<(a[c+56>>2]|0))){e=89;break g}f=0;h:for(;;){if(!((f|0)<(a[c+52>>2]|0))){e=87;break h}if((j|0)>(a[a[c+60>>2]+(f<<2)>>2]|0)){e=78;break h}p=a[a[c+88>>2]+b*572+20+(j<<2)>>2]*
a[a[c+88>>2]+b*572+152+(j<<2)>>2];i=0;i:for(;;){if(!((i|0)<(p|0))){e=85;break i}e=a[a[a[c+88>>2]+b*572+548>>2]+k*20>>2];t=a[a[a[c+88>>2]+b*572+548>>2]+k*20+4>>2];y=a[a[a[c+88>>2]+b*572+548>>2]+k*20+8>>2];z=(P[0]=a[a[a[c+88>>2]+b*572+548>>2]+k*20+12>>2],P[1]=a[a[a[c+88>>2]+b*572+548>>2]+k*20+12+4>>2],ha[0]);o(m,nh,h([k,0,0,0,b,0,0,0,j,0,0,0,g,0,0,0,f,0,0,0,i,0,0,0,e,0,0,0,t,0,0,0,y,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],
n));e=r<<24>>24!=0?82:83;e==82&&o(m,Za,h([z,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0],n));o(m,ea,h(1,"i32",n));s+=z;k+=1;i+=1}f+=1}g+=1}j+=1}}else if(e==92){e=(a[c+24>>2]|0)==2?93:128;do if(e==93){o(m,oh,h(1,"i32",n));e=r<<24>>24!=0?94:95;e==94&&o(m,Ya,h(1,"i32",n));o(m,ea,h(1,"i32",n));j=0;g:for(;;){if(!((j|0)<(w+1|0))){e=127;break g}C=a[a[c+88>>2]+b*572+20+(j<<2)>>2]*a[a[c+88>>2]+b*572+152+(j<<2)>>2];i=0;h:for(;;){if(!((i|0)<(C|0))){e=125;break h}f=a[c+36>>2]+b;g=ja((b|0)/(a[c+44>>2]|0));D=f-(g|0)*
a[c+44>>2]*a[c+28>>2];f=a[c+36>>2];g=ja((b|0)/(a[c+44>>2]|0));F=f+(g|0)*a[c+32>>2];B=D+a[c+28>>2];G=F+a[c+32>>2];f=0;i:for(;;){if(!((f|0)<(a[c+52>>2]|0))){e=123;break i}g=a[a[c+88>>2]+b*572+20+(j<<2)>>2];J=La(2,a[a[c+88>>2]+b*572+284+(j<<2)>>2]+a[a[c+60>>2]+(f<<2)>>2]-j|0)|0;K=La(2,a[a[c+88>>2]+b*572+416+(j<<2)>>2]+a[a[c+60>>2]+(f<<2)>>2]-j|0)|0;z=i;t=ja((i|0)/(g|0));M=z-(t|0)*g;N=ja((i|0)/(g|0))|0;if((j|0)>(a[a[c+60>>2]+(f<<2)>>2]|0)){e=102;break i}q=F;j:for(;;){if(!((q|0)<(G|0))){e=121;break j}e=
(N*K|0)==(q|0)?106:119;do if(e==106){p=D;l:for(;;){if(!((p|0)<(B|0))){e=118;break l}e=(M*J|0)==(p|0)?109:116;do if(e==109){g=0;n:for(;;){if(!((g|0)<(a[c+56>>2]|0))){e=115;break n}e=a[a[a[c+88>>2]+b*572+548>>2]+k*20>>2];t=a[a[a[c+88>>2]+b*572+548>>2]+k*20+4>>2];y=a[a[a[c+88>>2]+b*572+548>>2]+k*20+8>>2];z=(P[0]=a[a[a[c+88>>2]+b*572+548>>2]+k*20+12>>2],P[1]=a[a[a[c+88>>2]+b*572+548>>2]+k*20+12+4>>2],ha[0]);o(m,ph,h([k,0,0,0,b,0,0,0,j,0,0,0,i,0,0,0,f,0,0,0,g,0,0,0,e,0,0,0,t,0,0,0,y,0,0,0],["i32",0,0,
0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));e=r<<24>>24!=0?112:113;e==112&&o(m,Za,h([z,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0],n));o(m,ea,h(1,"i32",n));s+=z;k+=1;g+=1}}while(0);p+=1}}while(0);q+=1}f+=1}i+=1}j+=1}}else if(e==128){e=(a[c+24>>2]|0)==3?129:170;do if(e==129){j=a[c+36>>2]+b;f=ja((b|0)/(a[c+44>>2]|0));C=j-(f|0)*a[c+44>>2]*a[c+28>>2];j=a[c+36>>2];f=ja((b|0)/(a[c+44>>2]|0));D=j+(f|0)*a[c+32>>2];F=C+a[c+28>>2];B=D+a[c+32>>2];j=G=0;
h:for(;;){if(!((j|0)<(w+1|0)))break h;f=a[a[c+88>>2]+b*572+20+(j<<2)>>2]*a[a[c+88>>2]+b*572+152+(j<<2)>>2];e=(f|0)>(G|0)?132:133;e==132&&(G=f);j+=1}o(m,qh,h(1,"i32",n));e=r<<24>>24!=0?136:137;e==136&&o(m,Ya,h(1,"i32",n));o(m,ea,h(1,"i32",n));i=0;h:for(;;){if(!((i|0)<(G|0))){e=169;break h}f=0;i:for(;;){if(!((f|0)<(a[c+52>>2]|0))){e=167;break i}j=0;j:for(;;){if(!((j|0)<(a[a[c+60>>2]+(f<<2)>>2]+1|0))){e=165;break j}e=a[a[c+88>>2]+b*572+20+(j<<2)>>2]*a[a[c+88>>2]+b*572+152+(j<<2)>>2];g=a[a[c+88>>2]+b*
572+20+(j<<2)>>2];J=La(2,a[a[c+88>>2]+b*572+284+(j<<2)>>2]+a[a[c+60>>2]+(f<<2)>>2]-j|0)|0;K=La(2,a[a[c+88>>2]+b*572+416+(j<<2)>>2]+a[a[c+60>>2]+(f<<2)>>2]-j|0)|0;z=i;t=ja((i|0)/(g|0));M=z-(t|0)*g;N=ja((i|0)/(g|0))|0;e=(i|0)>=(e|0)?144:145;do if(e!=144&&e==145){q=D;l:for(;;){if(!((q|0)<(B|0))){e=163;break l}e=(N*K|0)==(q|0)?148:161;do if(e==148){p=C;n:for(;;){if(!((p|0)<(F|0))){e=160;break n}e=(M*J|0)==(p|0)?151:158;do if(e==151){g=0;p:for(;;){if(!((g|0)<(a[c+56>>2]|0))){e=157;break p}e=a[a[a[c+88>>
2]+b*572+548>>2]+k*20>>2];t=a[a[a[c+88>>2]+b*572+548>>2]+k*20+4>>2];y=a[a[a[c+88>>2]+b*572+548>>2]+k*20+8>>2];z=(P[0]=a[a[a[c+88>>2]+b*572+548>>2]+k*20+12>>2],P[1]=a[a[a[c+88>>2]+b*572+548>>2]+k*20+12+4>>2],ha[0]);o(m,Hc,h([k,0,0,0,b,0,0,0,i,0,0,0,f,0,0,0,j,0,0,0,g,0,0,0,e,0,0,0,t,0,0,0,y,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));e=r<<24>>24!=0?154:155;e==154&&o(m,Za,h([z,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0],n));o(m,
ea,h(1,"i32",n));s+=z;k+=1;g+=1}}while(0);p+=1}}while(0);q+=1}}while(0);j+=1}f+=1}i+=1}}else if(e==170){j=C=0;h:for(;;){if(!((j|0)<(w+1|0)))break h;f=a[a[c+88>>2]+b*572+20+(j<<2)>>2]*a[a[c+88>>2]+b*572+152+(j<<2)>>2];e=(f|0)>(C|0)?173:174;e==173&&(C=f);j+=1}o(m,rh,h(1,"i32",n));e=r<<24>>24!=0?177:178;e==177&&o(m,Ya,h(1,"i32",n));o(m,ea,h(1,"i32",n));f=0;h:for(;;){if(!((f|0)<(a[c+52>>2]|0))){e=210;break h}j=a[c+36>>2]+b;i=ja((b|0)/(a[c+44>>2]|0));D=j-(i|0)*a[c+44>>2]*a[c+28>>2];j=a[c+36>>2];i=ja((b|
0)/(a[c+44>>2]|0));F=j+(i|0)*a[c+32>>2];B=D+a[c+28>>2];G=F+a[c+32>>2];i=0;i:for(;;){if(!((i|0)<(C|0))){e=208;break i}j=0;j:for(;;){if(!((j|0)<(a[a[c+60>>2]+(f<<2)>>2]+1|0))){e=206;break j}e=a[a[c+88>>2]+b*572+20+(j<<2)>>2]*a[a[c+88>>2]+b*572+152+(j<<2)>>2];g=a[a[c+88>>2]+b*572+20+(j<<2)>>2];J=La(2,a[a[c+88>>2]+b*572+284+(j<<2)>>2]+a[a[c+60>>2]+(f<<2)>>2]-j|0)|0;K=La(2,a[a[c+88>>2]+b*572+416+(j<<2)>>2]+a[a[c+60>>2]+(f<<2)>>2]-j|0)|0;z=i;t=ja((i|0)/(g|0));M=z-(t|0)*g;N=ja((i|0)/(g|0))|0;e=(i|0)>=(e|
0)?185:186;do if(e!=185&&e==186){q=F;l:for(;;){if(!((q|0)<(G|0))){e=204;break l}e=(N*K|0)==(q|0)?189:202;do if(e==189){p=D;n:for(;;){if(!((p|0)<(B|0))){e=201;break n}e=(M*J|0)==(p|0)?192:199;do if(e==192){g=0;p:for(;;){if(!((g|0)<(a[c+56>>2]|0))){e=198;break p}e=a[a[a[c+88>>2]+b*572+548>>2]+k*20>>2];t=a[a[a[c+88>>2]+b*572+548>>2]+k*20+4>>2];y=a[a[a[c+88>>2]+b*572+548>>2]+k*20+8>>2];z=(P[0]=a[a[a[c+88>>2]+b*572+548>>2]+k*20+12>>2],P[1]=a[a[a[c+88>>2]+b*572+548>>2]+k*20+12+4>>2],ha[0]);o(m,Hc,h([k,
0,0,0,b,0,0,0,f,0,0,0,i,0,0,0,j,0,0,0,g,0,0,0,e,0,0,0,t,0,0,0,y,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));e=r<<24>>24!=0?195:196;e==195&&o(m,Za,h([z,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0],n));o(m,ea,h(1,"i32",n));s+=z;k+=1;g+=1}}while(0);p+=1}}while(0);q+=1}}while(0);j+=1}i+=1}f+=1}}while(0)}while(0)}while(0)}while(0);b+=1}e=r<<24>>24!=0?217:218;e==217&&(b=(P[0]=a[c>>2],P[1]=a[c+4>>2],ha[0]),o(m,sh,h([b,0,0,0,0,0,0,0],
["double",0,0,0,0,0,0,0],n)),o(m,th,h([s,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0],n)));e=(a[c+64>>2]|0)!=0?219:224;do if(e==219){o(m,uh,h(1,"i32",n));o(m,va,h([a[c+64>>2],0,0,0],["i32",0,0,0],n));o(m,vh,h(1,"i32",n));p=0;d:for(;;){if(!((p|0)<(a[c+64>>2]|0))){e=223;break d}o(m,wh,h([Aa[a[c+68>>2]+p*12>>1]&65535,0,0,0,a[a[c+68>>2]+p*12+4>>2],0,0,0,a[a[c+68>>2]+p*12+8>>2],0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0],n));p+=1}}while(0);ta(m);o(a[a[x>>2]+12>>2],xh,h([d,0,0,0],["i8*",0,0,0],n));b=0}else e==
3&&(o(a[a[x>>2]+12>>2],yh,h([d,0,0,0],["i8*",0,0,0],n)),b=1);while(0)}else e==1&&(b=1);while(0);return b}function hg(c){var d;d=(a[c+16>>2]|0)<3?1:2;a:do if(d==1)a[c+20>>2]=2;else if(d==2){d=(a[a[c+24>>2]>>2]|0)==1?3:9;b:do if(d==3){if((a[a[c+24>>2]+48>>2]|0)!=2){d=9;break b}if((a[a[c+24>>2]+96>>2]|0)!=2){d=9;break b}if((a[a[c+24>>2]+4>>2]|0)!=1){d=9;break b}if((a[a[c+24>>2]+48+4>>2]|0)!=2){d=9;break b}if((a[a[c+24>>2]+96+4>>2]|0)!=2){d=9;break b}zh(c);d=26;break b}while(0);do if(d==9){d=(a[a[c+24>>
2]>>2]|0)==1?10:16;c:do if(d==10){if((a[a[c+24>>2]+48>>2]|0)!=2){d=16;break c}if((a[a[c+24>>2]+96>>2]|0)!=2){d=16;break c}if((a[a[c+24>>2]+4>>2]|0)!=1){d=16;break c}if((a[a[c+24>>2]+48+4>>2]|0)!=1){d=16;break c}if((a[a[c+24>>2]+96+4>>2]|0)!=1){d=16;break c}Ah(c);d=25;break c}while(0);c:do if(d==16){d=(a[a[c+24>>2]>>2]|0)==1?17:23;d:do if(d==17){if((a[a[c+24>>2]+48>>2]|0)!=1)break d;if((a[a[c+24>>2]+96>>2]|0)!=1)break d;if((a[a[c+24>>2]+4>>2]|0)!=1)break d;if((a[a[c+24>>2]+48+4>>2]|0)!=1)break d;if((a[a[c+
24>>2]+96+4>>2]|0)!=1)break d;Bh(c);d=25;break c}while(0);o(a[a[x>>2]+12>>2],Ch,h([Dh,0,0,0,256,0,0,0],["i8*",0,0,0,"i32",0,0,0],n));break a}while(0)}while(0);a[c+20>>2]=1}while(0)}function zh(c){var d,e,b,f,g,j,h,i,k,n,m,o,p,q,r,s;r=a[a[c+24>>2]+24>>2];p=1<<r-1;q=(1<<r)-1;m=a[a[c+24>>2]+8>>2];o=a[a[c+24>>2]+12>>2];b=m*o;h=a[a[c+24>>2]+44>>2];i=a[a[c+24>>2]+48+44>>2];k=a[a[c+24>>2]+96+44>>2];var t=z(b<<2);d=t;var u=z(b<<2);e=u;var x=z(b<<2);b=x;r=0;a:for(;;){if(!((r|0)<(o|0)))break a;n=h+(m<<2);f=
d+(m<<2);g=e+(m<<2);j=b+(m<<2);s=0;b:for(;;){if(!((s|0)<(m|0)))break b;Ea(p,q,a[h>>2],a[i>>2],a[k>>2],d,e,b);h+=4;d+=4;e+=4;b+=4;Ea(p,q,a[h>>2],a[i>>2],a[k>>2],d,e,b);h+=4;d+=4;e+=4;b+=4;Ea(p,q,a[n>>2],a[i>>2],a[k>>2],f,g,j);n+=4;f+=4;g+=4;j+=4;Ea(p,q,a[n>>2],a[i>>2],a[k>>2],f,g,j);n+=4;f+=4;g+=4;j+=4;i+=4;k+=4;s+=2}h+=m<<2;d+=m<<2;e+=m<<2;b+=m<<2;r+=2}a[a[c+24>>2]+44>>2]=t;a[a[c+24>>2]+48+44>>2]=u;a[a[c+24>>2]+96+44>>2]=x;a[a[c+24>>2]+48+8>>2]=m;a[a[c+24>>2]+48+12>>2]=o;a[a[c+24>>2]+96+8>>2]=m;a[a[c+
24>>2]+96+12>>2]=o;a[a[c+24>>2]+48>>2]=a[a[c+24>>2]>>2];a[a[c+24>>2]+96>>2]=a[a[c+24>>2]>>2];a[a[c+24>>2]+48+4>>2]=a[a[c+24>>2]+4>>2];a[a[c+24>>2]+96+4>>2]=a[a[c+24>>2]+4>>2]}function Ah(c){var d,e,b,f,g,j,h,i,k,n,m,o;m=a[a[c+24>>2]+24>>2];k=1<<m-1;n=(1<<m)-1;h=a[a[c+24>>2]+8>>2];i=a[a[c+24>>2]+12>>2];b=h*i;f=a[a[c+24>>2]+44>>2];g=a[a[c+24>>2]+48+44>>2];j=a[a[c+24>>2]+96+44>>2];var p=z(b<<2);d=p;var q=z(b<<2);e=q;var r=z(b<<2);b=r;m=0;a:for(;;){if(!((m|0)<(i|0)))break a;o=0;b:for(;;){if(!((o|0)<(h|
0)))break b;Ea(k,n,a[f>>2],a[g>>2],a[j>>2],d,e,b);f+=4;d+=4;e+=4;b+=4;Ea(k,n,a[f>>2],a[g>>2],a[j>>2],d,e,b);f+=4;d+=4;e+=4;b+=4;g+=4;j+=4;o+=2}m+=1}a[a[c+24>>2]+44>>2]=p;a[a[c+24>>2]+48+44>>2]=q;a[a[c+24>>2]+96+44>>2]=r;a[a[c+24>>2]+48+8>>2]=h;a[a[c+24>>2]+48+12>>2]=i;a[a[c+24>>2]+96+8>>2]=h;a[a[c+24>>2]+96+12>>2]=i;a[a[c+24>>2]+48>>2]=a[a[c+24>>2]>>2];a[a[c+24>>2]+96>>2]=a[a[c+24>>2]>>2];a[a[c+24>>2]+48+4>>2]=a[a[c+24>>2]+4>>2];a[a[c+24>>2]+96+4>>2]=a[a[c+24>>2]+4>>2]}function Ea(c,d,e,b,f,g,j,h){var i;
b-=c;f-=c;i=e+((f|0)*1.402|0);c=(i|0)<0?1:2;c==1?i=0:c==2&&((i|0)>(d|0)?3:4)==3&&(i=d);a[g>>2]=i;g=e-((b|0)*0.344+(f|0)*0.714|0);c=(g|0)<0?6:7;c==6?g=0:c==7&&((g|0)>(d|0)?8:9)==8&&(g=d);a[j>>2]=g;e+=(b|0)*1.772|0;c=(e|0)<0?11:12;c==11?e=0:c==12&&((e|0)>(d|0)?13:14)==13&&(e=d);a[h>>2]=e}function Bh(c){var d,e,b,f,g,j,h,i,k,n;i=a[a[c+24>>2]+24>>2];k=1<<i-1;n=(1<<i)-1;h=a[a[c+24>>2]+8>>2]*a[a[c+24>>2]+12>>2];f=a[a[c+24>>2]+44>>2];g=a[a[c+24>>2]+48+44>>2];j=a[a[c+24>>2]+96+44>>2];var m=z(h<<2);d=m;var o=
z(h<<2);e=o;var p=z(h<<2);b=p;i=0;a:for(;;){if(!((i|0)<(h|0)))break a;Ea(k,n,a[f>>2],a[g>>2],a[j>>2],d,e,b);f+=4;g+=4;j+=4;d+=4;e+=4;b+=4;i+=1}a[a[c+24>>2]+44>>2]=m;a[a[c+24>>2]+48+44>>2]=o;a[a[c+24>>2]+96+44>>2]=p}function Rf(c,d,e,b,f){var g,j,i,k,q,r,m;q=1;a:for(;;){if((a[J>>2]|0)>=(c|0)){g=4;break a}if((a[d+(a[J>>2]<<2)>>2]|0)==0){g=4;break a}if((p[a[d+(a[J>>2]<<2)>>2]]<<24>>24|0)!=45){g=4;break a}g=(p[a[d+(a[J>>2]<<2)>>2]]<<24>>24|0)==45?6:14;b:do if(g==6){if((p[a[d+(a[J>>2]<<2)>>2]+1]<<24>>
24|0)!=0)break b;g=(a[J>>2]|0)>=(c-1|0)?8:9;g==8?q=0:g==9&&(g=(p[a[d+(a[J>>2]+1<<2)>>2]]<<24>>24|0)==45?10:11,g==10?q=0:g==11&&(q=2))}while(0);if((q<<24>>24|0)==0){g=15;break a}if((p[a[d+(a[J>>2]<<2)>>2]]<<24>>24|0)!=45){g=76;break a}r=a[d+(a[J>>2]<<2)>>2]+1;m=b;k=16;g=(q<<24>>24|0)>1?18:19;g==18?(r=a[d+(a[J>>2]+1<<2)>>2],a[J>>2]+=1):g==19&&(r=a[d+(a[J>>2]<<2)>>2]+1);if(xa(r)>>>0>1){g=21;break a}if((p[e]<<24>>24|0)==58){g=49;break a}g=(a[Ic>>2]|0)!=(a[J>>2]|0)?51:52;g==51&&(a[Ic>>2]=a[J>>2],a[$a>>
2]=0);a[vb>>2]=p[a[d+(a[J>>2]<<2)>>2]+(a[$a>>2]+1)]<<24>>24;var s;b:{i=e;i--;do if(i++,s=p[i],s==a[vb>>2]){s=i;break b}while(s);s=0}i=s;if((s|0)==0){g=75;break a}if((p[i]<<24>>24|0)!=0){g=55;break a}a[J>>2]+=1}a:do if(g==4)j=-1;else if(g==15)a[J>>2]+=1,j=63;else if(g==76)o(a[a[x>>2]+12>>2],Eh,h(1,"i32",n)),a[J>>2]+=1,j=63;else if(g==21){c=0;b:for(;;){if(!((c|0)<(f|0))){g=47;break b}if((pb(a[m>>2],r)|0)==0){g=24;break b}c+=k;m+=16}do if(g==47)o(a[a[x>>2]+12>>2],Jc,h([r,0,0,0],["i8*",0,0,0],n)),a[J>>
2]+=1,j=63;else if(g==24){g=(a[m+4>>2]|0)==0?25:29;do if(g==25){g=(a[d+(a[J>>2]+1<<2)>>2]|0)!=0?26:28;d:do if(g==26){if((p[a[d+(a[J>>2]+1<<2)>>2]]<<24>>24|0)==45){g=28;break d}o(a[a[x>>2]+12>>2],Fh,h([r,0,0,0,a[d+(a[J>>2]+1<<2)>>2],0,0,0],["i8*",0,0,0,"i8*",0,0,0],n));a[J>>2]+=1}while(0)}else if(g==29){a[aa>>2]=a[d+(a[J>>2]+1<<2)>>2];g=(a[aa>>2]|0)!=0?30:35;do if(g==30){g=(p[a[aa>>2]]<<24>>24|0)==45?31:34;do if(g==31){g=(a[wb>>2]|0)!=0?32:33;do if(g==32){o(a[a[x>>2]+12>>2],Ob,h([r,0,0,0],["i8*",0,
0,0],n));j=63;break a}while(0)}while(0)}while(0);g=(a[aa>>2]|0)!=0?40:36;d:do if(g==36){if((a[m+4>>2]|0)!=1){g=40;break d}g=(a[wb>>2]|0)!=0?38:39;do if(g==38){o(a[a[x>>2]+12>>2],Gh,h([r,0,0,0],["i8*",0,0,0],n));j=63;break a}while(0)}while(0);a[J>>2]+=1}while(0);a[J>>2]+=1;g=(a[m+8>>2]|0)!=0?42:43;g==42?(a[a[m+8>>2]>>2]=a[m+12>>2],j=0):g==43&&(j=a[m+12>>2])}while(0)}else if(g==49)j=58;else if(g==75)o(a[a[x>>2]+12>>2],Jc,h([r,0,0,0],["i8*",0,0,0],n)),a[J>>2]+=1,j=63;else if(g==55){g=(p[i+1]<<24>>24|
0)==58?56:72;do if(g==56){g=(p[i+2]<<24>>24|0)==58?58:57;c:do if(g==57){if((p[a[d+(a[J>>2]<<2)>>2]+(a[$a>>2]+2)]<<24>>24|0)!=0){g=58;break c}a[aa>>2]=a[d+(a[J>>2]+1<<2)>>2];g=(a[aa>>2]|0)!=0?62:67;do if(g==62){g=(p[a[aa>>2]]<<24>>24|0)==45?63:66;do if(g==63){g=(a[wb>>2]|0)!=0?64:65;do if(g==64){o(a[a[x>>2]+12>>2],Ob,h([r,0,0,0],["i8*",0,0,0],n));j=63;break a}while(0)}while(0)}while(0);g=(a[aa>>2]|0)!=0?71:68;do if(g==68){g=(a[wb>>2]|0)!=0?69:70;do if(g==69){o(a[a[x>>2]+12>>2],Ob,h([r,0,0,0],["i8*",
0,0,0],n));j=63;break a}while(0)}while(0);a[J>>2]+=1;g=74;break c}while(0);g==58&&(g=a[d+(a[J>>2]<<2)>>2]+a[$a>>2]+2,a[aa>>2]=g,g=p[g]<<24>>24!=0?60:59,g==59&&(a[aa>>2]=0));a[J>>2]+=1;j=a[vb>>2]}else g==72&&(a[$a>>2]+=1,j=a[vb>>2]);while(0)}while(0);return j}function z(a){return K.J(a||1)}function fb(a){a=K.J(a+16);return a+16-a%16}function Hh(c,d){function e(c){var b;c==="float"||c==="double"?b=(P[0]=a[d+f>>2],P[1]=a[d+f+4>>2],ha[0]):c=="i64"?(b=[a[d+f>>2],a[d+f+4>>2]],b=zb(b[0],32)+zb(b[1],32)*
Math.pow(2,32)):b=a[d+f>>2];f+=K.U(c);return Number(b)}for(var b=c,f=0,g=[],j,h;;){var i=b;j=p[b];if(j===0)break;h=p[b+1];if(j==37){var k=Y,n=Y,m=Y,o=Y;a:for(;;){switch(h){case 43:k=I;break;case 45:n=I;break;case 35:m=I;break;case 48:if(o)break a;else{o=I;break}default:break a}b++;h=p[b+1]}var q=0;if(h==42)q=e("i32"),b++,h=p[b+1];else for(;h>=48&&h<=57;)q=q*10+(h-48),b++,h=p[b+1];var r=Y;if(h==46){var s=0,r=I;b++;h=p[b+1];if(h==42)s=e("i32"),b++;else for(;;){h=p[b+1];if(h<48||h>57)break;s=s*10+(h-
48);b++}h=p[b+1]}else s=6;var t;switch(String.fromCharCode(h)){case "h":h=p[b+2];h==104?(b++,t=1):t=2;break;case "l":h=p[b+2];h==108?(b++,t=8):t=4;break;case "L":case "q":case "j":t=8;break;case "z":case "t":case "I":t=4;break;default:t=W}t&&b++;h=p[b+1];if("d,i,u,o,x,X,p".split(",").indexOf(String.fromCharCode(h))!=-1){i=h==100||h==105;t=t||4;j=e("i"+t*8);t<=4&&(j=(i?Wc:zb)(j&Math.pow(256,t)-1,t*8));var u=Math.abs(j),w,i="";if(h==100||h==105)w=Wc(j,8*t).toString(10);else if(h==117)w=zb(j,8*t).toString(10),
j=Math.abs(j);else if(h==111)w=(m?"0":"")+u.toString(8);else if(h==120||h==88){i=m?"0x":"";if(j<0){j=-j;w=(u-1).toString(16);m=[];for(u=0;u<w.length;u++)m.push((15-parseInt(w[u],16)).toString(16));for(w=m.join("");w.length<t*2;)w="f"+w}else w=u.toString(16);h==88&&(i=i.toUpperCase(),w=w.toUpperCase())}else h==112&&(u===0?w="(nil)":(i="0x",w=u.toString(16)));if(r)for(;w.length<s;)w="0"+w;for(k&&(i=j<0?"-"+i:"+"+i);i.length+w.length<q;)n?w+=" ":o?w="0"+w:i=" "+i;w=i+w;w.split("").forEach(function(a){g.push(a.charCodeAt(0))})}else if("f,F,e,E,g,G".split(",").indexOf(String.fromCharCode(h))!=
-1){j=e(t===4?"float":"double");if(isNaN(j))w="nan",o=Y;else if(isFinite(j)){r=Y;t=Math.min(s,20);if(h==103||h==71)r=I,s=s||1,t=parseInt(j.toExponential(t).split("e")[1],10),s>t&&t>=-4?(h=(h==103?"f":"F").charCodeAt(0),s-=t+1):(h=(h==103?"e":"E").charCodeAt(0),s--),t=Math.min(s,20);if(h==101||h==69)w=j.toExponential(t),/[eE][-+]\d$/.test(w)&&(w=w.slice(0,-1)+"0"+w.slice(-1));else if(h==102||h==70)w=j.toFixed(t);i=w.split("e");if(r&&!m)for(;i[0].length>1&&i[0].indexOf(".")!=-1&&(i[0].slice(-1)=="0"||
i[0].slice(-1)==".");)i[0]=i[0].slice(0,-1);else for(m&&w.indexOf(".")==-1&&(i[0]+=".");s>t++;)i[0]+="0";w=i[0]+(i.length>1?"e"+i[1]:"");h==69&&(w=w.toUpperCase());k&&j>=0&&(w="+"+w)}else w=(j<0?"-":"")+"inf",o=Y;for(;w.length<q;)n?w+=" ":w=o&&(w[0]=="-"||w[0]=="+")?w[0]+"0"+w.slice(1):(o?"0":" ")+w;h<97&&(w=w.toUpperCase());w.split("").forEach(function(a){g.push(a.charCodeAt(0))})}else if(h==115){(k=e("i8*"))?(k=Vc(k),r&&k.length>s&&(k=k.slice(0,s))):k=qa("(null)",I);if(!n)for(;k.length<q--;)g.push(32);
g=g.concat(k);if(n)for(;k.length<q--;)g.push(32)}else if(h==99){for(n&&g.push(e("i8"));--q>0;)g.push(32);n||g.push(e("i8"))}else if(h==110)n=e("i32*"),a[n>>2]=g.length;else if(h==37)g.push(j);else for(u=i;u<b+2;u++)g.push(p[u]);b+=2}else g.push(j),b+=1}return g}function Da(a,d,e){for(var d=Hh(d,e),e=d.length,b=0;b<e;b++)p[a+b]=d[b];p[a+b]=0;return d.length}function ba(c,d){var e=z(c*d),b=0,f,g,h;f=e;g=f+c*d;b<0&&(b+=256);for(b=b+(b<<8)+(b<<16)+b*16777216;f%4!==0&&f<g;)p[f++]=b;f>>=2;for(h=g>>2;f<
h;)a[f++]=b;for(f<<=2;f<g;)p[f++]=b;return e}function C(c){if(!C.r)C.r=h([0],"i32",k);return a[C.r>>2]=c}function ri(a,d,e){var b=s.a[a];if(b){if(b.i){if(e<0)return C(Fa),-1;if(b.object.d){if(b.object.j){for(var f=0;f<e;f++)try{b.object.j(p[d+f])}catch(g){return C(cb),-1}b.object.timestamp=Date.now();return f}C(Vb);return-1}f=b.position;a=s.a[a];if(!a||a.object.d)C(ka),d=-1;else if(a.i)if(a.object.c)C(bb),d=-1;else if(e<0||f<0)C(Fa),d=-1;else{for(var h=a.object.b;h.length<f;)h.push(0);for(var i=0;i<
e;i++)h[f+i]=U[d+i];a.object.timestamp=Date.now();d=i}else C(fa),d=-1;d!=-1&&(b.position+=d);return d}C(fa);return-1}C(ka);return-1}function ga(a,d,e,b){d*=e;if(d!=0&&ri(b,a,d)==-1&&s.a[b])s.a[b].error=I}function o(a,d,e){d=Hh(d,e);e=K.xa();ga(h(d,"i8",n),1,d.length,a);K.wa(e)}function rb(a,d){var e=0;do{var b,f,g;b=d+e;f=a+e;for(g=b+1;b<g;)p[f++]=p[b++];e++}while(p[d+e-1]!=0)}function jb(c,d){if(!d)return 0;var e=z(d);if(c){var b=e,f=c;D(d%1===0,"memcpy given "+d+" bytes to copy. Problem with quantum=1 corrections perhaps?");
var g,h;g=f+d;if(b%4==f%4&&d>8){for(;f%4!==0&&f<g;)p[b++]=p[f++];f>>=2;b>>=2;for(h=g>>2;f<h;)a[b++]=a[f++];f<<=2;b<<=2}for(;f<g;)p[b++]=p[f++]}return e}function Wa(a,d,e){for(var b=Y,f,g=0;g<e;g++)f=b?0:p[d+g],p[a+g]=f,b=b||p[d+g]==0}function sa(c,d){o(a[Pb>>2],c,d)}function If(a){a=s.B(Ga(a));if(a===W)return C(db),0;var d=s.G(a);if(d===W)return 0;if(d.c){if(!d.A)return C(fa),0}else return C(eb),0;var e=s.a.length,b=[],f;for(f in d.b)b.push(f);s.a[e]={path:a,object:d,position:-2,h:I,i:Y,p:Y,error:Y,
f:Y,e:[],b:b,F:z(Qb.l)};return e}function Va(c){if(!s.a[c]||!s.a[c].object.c)return C(ka),0;if(!Va.result)Va.result=z(4);var d=s.a[c].F,e=Va.result;if(!s.a[c]||!s.a[c].object.c)C(ka);else{var b=s.a[c],f=b.position,g=0,h;for(h in b.b)g++;if(f<-2||f>=g)a[e>>2]=0;else{f===-2?(f=".",h=1):f===-1?(f="..",h=1):(f=b.b[f],h=b.object.b[f].Y);b.position++;g=Qb;a[d+g.fa>>2]=h;a[d+g.ga>>2]=b.position;a[d+g.ha>>2]=f.length+1;for(h=0;h<f.length;h++)p[d+g.Q+h]=f.charCodeAt(h);p[d+g.Q+h]=0;p[d+g.ia]=b.object.d?2:
b.object.c?4:b.object.link!==H?10:8;a[e>>2]=d}}return a[Va.result>>2]===0?0:s.a[c].F}function pb(a,d){var e;a:{for(e=0;e<la;){var b=p[a+e],f=p[d+e];if(b==f&&b==0)break;if(b==0){e=-1;break a}if(f==0){e=1;break a}if(b==f)e++;else{e=b>f?1:-1;break a}}e=0}return e}function ii(a,d){for(var e=0;e<3;){var b=p[a+e]>=65&&p[a+e]<=90?p[a+e]-65+97:p[a+e],f=p[d+e]>=65&&p[d+e]<=90?p[d+e]-65+97:p[d+e];if(b==f&&b==0)break;if(b==0)return-1;if(f==0)return 1;if(b==f)e++;else return b>f?1:-1}return 0}function si(c,d,
e,b){for(var c=Ga(c),f=0,g=0,h=0,f=0;f<c.length;f++){if(i<=0)break;var i=d();if(i<=0)break;if(c[f]==="%"){f++;for(var k=f;c[f].charCodeAt(0)>=48&&c[f].charCodeAt(0)<=57;)f++;var n;f!=k&&(n=parseInt(c.slice(k,f),10));k=c[f];f++;for(var o=0,m=[];(o<n||isNaN(n))&&i>0;)if(k==="d"&&i>=48&&i<=57||k==="x"&&(i>=48&&i<=57||i>=97&&i<=102||i>=65&&i<=70)||k==="s"&&(f>=c.length||i!==c[f].charCodeAt(0)))m.push(String.fromCharCode(i)),i=d(),o++;else break;if(m.length===0)break;m=m.join("");o=a[b+h>>2];h+=K.U("void*");
switch(k){case "d":a[o>>2]=parseInt(m,10);break;case "x":a[o>>2]=parseInt(m,16);break;case "s":k=qa(m);for(m=0;m<k.length;m++)p[o+m]=k[m]}g++}else if(c[f].charCodeAt(0)!==i){e(i);break}}}function Uf(a,d,e){var b=0;si(d,function(){return p[a+b++]},function(){b--},e)}function ti(c,d,e){var b=a[e>>2],f=d&3,e=f!=0,f=f!=1,g=Boolean(d&512),h=Boolean(d&2048),i=Boolean(d&1024),k=Boolean(d&8),c=s.m(Ga(c));if(!c.q)return C(c.error),-1;if(d=c.object||W){if(g&&h)return C(Wb),-1;if((e||g||i)&&d.c)return C(bb),
-1;if(f&&!d.A||e&&!d.write)return C(fa),-1;if(i&&!d.d)d.b=[];else if(!s.la(d))return C(cb),-1;c=c.path}else{if(!g)return C(db),-1;if(!c.k.write)return C(fa),-1;d=s.N(c.k,c.name,[],b&256,b&128);c=c.I+"/"+c.name}b=s.a.length;if(d.c){e=0;Qb&&(e=z(Qb.l));var f=[],n;for(n in d.b)f.push(n);s.a[b]={path:c,object:d,position:-2,h:I,i:Y,p:Y,error:Y,f:Y,e:[],b:f,F:e}}else s.a[b]={path:c,object:d,position:0,h:f,i:e,p:k,error:Y,f:Y,e:[]};return b}function pa(a,d){var e,d=Ga(d);if(d[0]=="r")e=d.indexOf("+")!=-1?
2:0;else if(d[0]=="w")e=d.indexOf("+")!=-1?2:1,e|=512,e|=1024;else if(d[0]=="a")e=d.indexOf("+")!=-1?2:1,e|=512,e|=8;else return C(Fa),0;e=ti(a,e,h([511,0,0,0],"i32",n));return e==-1?0:e}function eg(a,d){var e;if(s.a[a]&&!s.a[a].d){e=s.a[a];var b=0;d===1?b+=e.position:d===2&&(b+=e.object.b.length);b<0?(C(Fa),e=-1):(e.e=[],e=e.position=b)}else C(ka),e=-1;if(e!=-1)s.a[a].f=Y}function ji(a){if(a in s.a){a=s.a[a];return a.object.d?(C(Qc),-1):a.position}C(ka);return-1}function ui(a,d,e,b){var f=s.a[a];
if(!f||f.object.d)return C(ka),-1;if(f.h){if(f.object.c)return C(bb),-1;if(e<0||b<0)return C(Fa),-1;for(a=0;f.e.length&&e>0;)p[d++]=f.e.pop(),e--,a++;for(var f=f.object.b,e=Math.min(f.length-b,e),g=0;g<e;g++)p[d+g]=f[b+g],a++;return a}C(fa);return-1}function fg(a,d,e){var b=s.a[a];if(b){if(b.h){if(e<0)return C(Fa),-1;if(b.object.d){if(b.object.input){for(a=0;b.e.length&&e>0;)p[d++]=b.e.pop(),e--,a++;for(var f=0;f<e;f++){try{var g=b.object.input()}catch(h){return C(cb),-1}if(g===W||g===H)break;a++;
p[d+f]=g}return a}C(Vb);return-1}g=b.e.length;a=ui(a,d,e,b.position);a!=-1&&(b.position+=b.e.length-g+a);return a}C(fa);return-1}C(ka);return-1}function ta(a){s.a[a]||C(ka);s.a[a]?delete s.a[a]:C(ka)}function Kc(a){if(!(a in s.a))return-1;var d=s.a[a];if(d.f||d.error)return-1;a=fg(a,Kc.r,1);if(a==0)return d.f=I,-1;return a==-1?(d.error=I,-1):p[Kc.r]}function qi(a){a=s.m(Ga(a));if(!a.q||!a.n)return C(a.error),-1;if(a.object.c)return C(bb),-1;if(a.object.write)return delete a.k.b[a.name],0;C(fa);return-1}
function Lc(a){var a=a||G.arguments,d=W;if(G._main){for(d=G.ea(a);Mc.length>0;){var a=Mc.pop(),e=a.ma;typeof e==="number"&&(e=za[e]);e(a.da===H?W:a.da)}vi.print()}return d}var G={arguments:[]},Rb=[],Ih=typeof process==="object",Jh=typeof window==="object",Kh=typeof importScripts==="function",wi=!Jh&&!Ih&&!Kh;if(Ih){Na=function(a){process.stdout.write(a+"\n")};printErr=function(a){process.stderr.write(a+"\n")};var Lh=require("fs");read=function(a){var d=Lh.readFileSync(a).toString();!d&&a[0]!="/"&&
(a=__dirname.split("/").slice(0,-1).join("/")+"/src/"+a,d=Lh.readFileSync(a).toString());return d};Rb=process.argv.slice(2)}else if(wi)this.read||(read=function(a){snarf(a)}),Rb=this.arguments?arguments:scriptArgs;else if(Jh)printErr=function(a){console.log(a)},read=function(a){var d=new XMLHttpRequest;d.open("GET",a,Y);d.send(W);return d.responseText},this.arguments&&(Rb=arguments);else if(Kh)load=importScripts;else throw"Unknown runtime environment. Where are we?";typeof load=="undefined"&&typeof read!=
"undefined"&&(load=function(a){fi(read(a))});typeof printErr==="undefined"&&(printErr=function(){});typeof Na==="undefined"&&(Na=printErr);try{this.Module=G}catch(yi){this.Module=G={}}if(!G.arguments)G.arguments=Rb;var K={xa:function(){return t},wa:function(a){t=a},Fa:function(a,d){d=d||4;return isNumber(a)&&isNumber(d)?Math.ceil(a/d)*d:"Math.ceil(("+a+")/"+d+")*"+d},oa:function(a){return a in K.ba||a in K.aa},pa:function(a){return a[a.length-1]=="*"},qa:function(a){return isPointerType(a)?Y:/^\[\d+\ x\ (.*)\]/.test(a)?
I:/<?{ [^}]* }>?/.test(a)?I:a[0]=="%"},ba:{i1:0,i8:0,i16:0,i32:0,i64:0},aa:{"float":0,"double":0},Ja:function(a,d){return(a|0|d|0)+(Math.round(a/4294967296)|Math.round(d/4294967296))*4294967296},Ba:function(a,d){return((a|0)&(d|0))+(Math.round(a/4294967296)&Math.round(d/4294967296))*4294967296},Oa:function(a,d){return((a|0)^(d|0))+(Math.round(a/4294967296)^Math.round(d/4294967296))*4294967296},H:function(a){if(K.t==1)return 1;var d={"%i1":1,"%i8":1,"%i16":2,"%i32":4,"%i64":8,"%float":4,"%double":8}["%"+
a];if(!d&&a[a.length-1]=="*")d=K.t;return d},U:function(a){return Math.max(K.H(a),K.t)},ja:function(a,d){var e={};return d?a.filter(function(a){return e[a[d]]?Y:e[a[d]]=I}):a.filter(function(a){return e[a]?Y:e[a]=I})},set:function(){for(var a=typeof arguments[0]==="object"?arguments[0]:arguments,d={},e=0;e<a.length;e++)d[a[e]]=0;return d},L:function(a){a.g=0;a.u=0;var d=[],e=-1;a.T=a.z.map(function(b){var f;if(K.oa(b)||K.pa(b))b=f=K.H(b);else if(K.qa(b))f=Types.types[b].g,b=Types.types[b].u;else throw"Unclear type in struct: "+
b+", in "+a.ra+" :: "+dump(Types.types[a.ra]);b=a.Ka?1:Math.min(b,K.t);a.u=Math.max(a.u,b);b=K.K(a.g,b);a.g=b+f;e>=0&&d.push(b-e);return e=b});a.g=K.K(a.g,a.u);if(d.length==0)a.S=a.g;else if(K.ja(d).length==1)a.S=d[0];a.Ha=a.S!=1;return a.T},na:function(a,d,e){var b,f;if(d){e=e||0;b=(typeof Types==="undefined"?K.Na:Types.types)[d];if(!b)return W;a||(a=(typeof Types==="undefined"?K:Types).La[d.replace(/.*\./,"")]);if(!a)return W;D(b.z.length===a.length,"Number of named fields must match the type for "+
d+". Perhaps due to inheritance, which is not supported yet?");f=b.T}else b={z:a.map(function(a){return a[0]})},f=K.L(b);var g={l:b.g};d?a.forEach(function(a,c){if(typeof a==="string")g[a]=f[c]+e;else{var d,h;for(h in a)d=h;g[d]=K.na(a[d],b.z[c],f[c])}}):a.forEach(function(a,b){g[a[1]]=f[b]});return g},va:function(a){var d=t;D(a>0,"Trying to allocate 0");t+=a;t=Math.ceil(t/4)*4;D(t<Nc+X,"Ran out of stack");return d},J:function(c){var d=Mh=wa;D(c>0,"Trying to allocate 0");wa+=c;wa=Math.ceil(wa/4)*
4;if(wa>=la){printErr("Warning: Enlarging memory arrays, this is not fast! "+[wa,la]);D(wa>=la&&Mh<la);for(D(la>4);la<=wa;)la=Math.ceil(la*1.25/ab)*ab;var c=p,e=new ArrayBuffer(la);p=new Int8Array(e);q=new Int16Array(e);a=new Int32Array(e);U=new Uint8Array(e);Aa=new Uint16Array(e);T=new Uint32Array(e);u=new Float32Array(e);p.set(c)}return d},K:function(a,d){return Math.ceil(a/(d?d:4))*(d?d:4)},t:4,Aa:0},vi={ca:0,M:0,s:{},Ia:function(a,d){d||(this.M++,this.M>=this.ca&&yb("\n\nToo many corrections!"))},
print:function(){var a=[],d;for(d in this.s)a.push({ua:d,ka:this.s[d][0],Ma:this.s[d][1],total:this.s[d][0]+this.s[d][1]});a.sort(function(a,c){return c.total-a.total});for(d=0;d<a.length;d++){var e=a[d];Na(e.ua+" : "+e.total+" hits, %"+Math.ceil(100*e.ka/e.total)+" failures")}}},Mc=[],Nh=new ArrayBuffer(8),P=new Int32Array(Nh),ha=new Float64Array(Nh);G.setValue=Tc;G.getValue=Xb;var n=1,k=2;G.ALLOC_NORMAL=0;G.ALLOC_STACK=n;G.ALLOC_STATIC=k;G.allocate=h;G.Pointer_stringify=Ga;G.Array_stringify=function(a){for(var d=
"",e=0;e<a.length;e++)d+=String.fromCharCode(a[e]);return d};var za,ab=4096,p,U,q,Aa,a,T,u,Nc,t,X,wa,Mh,la=G.TOTAL_MEMORY||10485760;D(!!Int32Array&&!!Float64Array&&!!(new Int32Array(1)).subarray&&!!(new Int32Array(1)).set,"Cannot fallback to non-typed array case: Code is too specialized");var Ma=new ArrayBuffer(la);p=new Int8Array(Ma);q=new Int16Array(Ma);a=new Int32Array(Ma);U=new Uint8Array(Ma);Aa=new Uint16Array(Ma);T=new Uint32Array(Ma);u=new Float32Array(Ma);a[0]=255;D(U[0]===255&&U[3]===0,"Typed arrays 2 must be run on a little-endian system");
for(var Oh=qa("(null)"),Sb=0;Sb<Oh.length;Sb++)p[Sb]=Oh[Sb];G.HEAP=H;G.HEAP8=p;G.HEAP16=q;G.HEAP32=a;G.HEAPU8=U;G.HEAPU16=Aa;G.HEAPU32=T;G.HEAPF32=u;Nc=t=Math.ceil(10/ab)*ab;X=Nc+1048576;wa=Math.ceil(X/ab)*ab;G.Array_copy=Uc;G.String_len=xa;G.String_copy=Vc;G.intArrayFromString=qa;G.intArrayToString=function(a){for(var d=[],e=0;e<a.length;e++){var b=a[e];b>255&&(D(Y,"Character code "+b+" ("+String.fromCharCode(b)+")  at offset "+e+" not in 0x00-0xFF."),b&=255);d.push(String.fromCharCode(b))}return d.join("")};
Ab.X=1;ad.X=1;ed.X=1;Zb.X=1;$b.X=1;ac.X=1;ib.X=1;hb.X=1;cd.X=1;dd.X=1;fd.X=1;F.X=1;gd.X=1;hd.X=1;kb.X=1;md.X=1;od.X=1;pd.X=1;qd.X=1;rd.X=1;sd.X=1;td.X=1;ud.X=1;vd.X=1;dc.X=1;Bd.X=1;ic.X=1;cc.X=1;Fd.X=1;da.X=1;Hd.X=1;Id.X=1;Jd.X=1;Kd.X=1;Ld.X=1;Md.X=1;Vd.X=1;$d.X=1;ae.X=1;Zd.X=1;fe.X=1;ge.X=1;hc.X=1;je.X=1;kc.X=1;ke.X=1;me.X=1;V.X=1;Cb.X=1;Ia.X=1;oe.X=1;pe.X=1;qe.X=1;re.X=1;se.X=1;te.X=1;Db.X=1;ue.X=1;ve.X=1;we.X=1;xe.X=1;ye.X=1;ze.X=1;Ae.X=1;Be.X=1;Ce.X=1;De.X=1;Ie.X=1;Ka.X=1;Je.X=1;Ja.X=1;Ta.X=1;
He.X=1;Ge.X=1;Sa.X=1;Fe.X=1;Ee.X=1;Ne.X=1;Oe.X=1;Eb.X=1;jd.X=1;kd.X=1;ld.X=1;oc.X=1;nc.X=1;Ze.X=1;Hf.X=1;Lf.X=1;Qf.X=1;G._main=zc;zc.X=1;sg.X=1;ng.X=1;kg.X=1;jg.X=1;ig.X=1;lg.X=1;pg.X=1;Ib.X=1;hg.X=1;zh.X=1;Ah.X=1;Ea.X=1;Bh.X=1;Rf.X=1;var ja=Math.floor,gi=Da;fa=13;ka=9;Sc=16;Wb=17;Fa=22;cb=5;bb=21;db=2;eb=20;Rc=39;Vb=6;Qc=29;var Oc=0,Pb=0,Pc=0,x=0,s={P:"/",sa:2,a:[W],V:I,B:function(a,d){if(typeof a!=="string")return W;if(d===H)d=s.P;a&&a[0]=="/"&&(d="");for(var e=(d+"/"+a).split("/").reverse(),b=
[""];e.length;){var f=e.pop();f==""||f=="."||(f==".."?b.length>1&&b.pop():b.push(f))}return b.length==1?"/":b.join("/")},m:function(a,d,e){var b={Z:Y,n:Y,error:0,name:W,path:W,object:W,q:Y,I:W,k:W},a=s.B(a);if(a=="/")b.Z=I,b.n=b.q=I,b.name="/",b.path=b.I="/",b.object=b.k=s.root;else if(a!==W)for(var e=e||0,a=a.slice(1).split("/"),f=s.root,g=[""];a.length;){if(a.length==1&&f.c)b.q=I,b.I=g.length==1?"/":g.join("/"),b.k=f,b.name=a[0];var h=a.shift();if(f.c)if(f.A){if(!f.b.hasOwnProperty(h)){b.error=
db;break}}else{b.error=fa;break}else{b.error=eb;break}f=f.b[h];if(f.link&&!(d&&a.length==0)){if(e>40){b.error=40;break}b=s.B(f.link,g.join("/"));return s.m([b].concat(a).join("/"),d,e+1)}g.push(h);if(a.length==0)b.n=I,b.path=g.join("/"),b.object=f}return b},G:function(a,d){s.R();var e=s.m(a,d);if(e.n)return e.object;C(e.error);return W},O:function(a,d,e,b,f){a||(a="/");typeof a==="string"&&(a=s.G(a));if(!a)throw C(fa),Error("Parent path must exist.");if(!a.c)throw C(eb),Error("Parent must be a folder.");
if(!a.write&&!s.V)throw C(fa),Error("Parent folder must be writeable.");if(!d||d=="."||d=="..")throw C(db),Error("Name must not be empty.");if(a.b.hasOwnProperty(d))throw C(Wb),Error("Can't overwrite object.");a.b[d]={A:b===H?I:b,write:f===H?Y:f,timestamp:Date.now(),Y:s.sa++};for(var g in e)e.hasOwnProperty(g)&&(a.b[d][g]=e[g]);return a.b[d]},D:function(a,d,e,b){return s.O(a,d,{c:I,d:Y,b:{}},e,b)},Ea:function(a,d,e,b){a=s.G(a);if(a===W)throw Error("Invalid parent.");for(d=d.split("/").reverse();d.length;){var f=
d.pop();f&&(a.b.hasOwnProperty(f)||s.D(a,f,e,b),a=a.b[f])}return a},w:function(a,d,e,b,f){e.c=Y;return s.O(a,d,e,b,f)},N:function(a,d,e,b,f){if(typeof e==="string"){for(var g=[],h=0;h<e.length;h++)g.push(e.charCodeAt(h));e=g}return s.w(a,d,{d:Y,b:e},b,f)},Ca:function(a,d,e,b,f){return s.w(a,d,{d:Y,url:e},b,f)},Da:function(a,d,e,b,f){return s.w(a,d,{d:Y,link:e},b,f)},v:function(a,d,e,b){if(!e&&!b)throw Error("A device must have at least one callback defined.");return s.w(a,d,{d:I,input:e,j:b},Boolean(e),
Boolean(b))},la:function(a){if(a.d||a.c||a.link||a.b)return I;var d=I;if(typeof XMLHttpRequest!=="undefined"){var e=new XMLHttpRequest;e.open("GET",a.url,Y);if(typeof Uint8Array!="undefined")e.responseType="arraybuffer";e.overrideMimeType&&e.overrideMimeType("text/plain; charset=x-user-defined");e.send(W);e.status!=200&&e.status!=0&&(d=Y);a.b=e.response!==H?new Uint8Array(e.response||[]):qa(e.responseText||"",I)}else if(typeof read!=="undefined")try{a.b=qa(read(a.url),I)}catch(b){d=Y}else throw Error("Cannot load without read() or XMLHttpRequest.");
d||C(cb);return d},R:function(){if(!s.root)s.root={A:I,write:Y,c:I,d:Y,timestamp:Date.now(),Y:1,b:{}}},o:function(a,d,e){if(!s.o.W){s.o.W=I;s.R();a||(a=function(){if(!a.C||!a.C.length){var b;typeof window!="undefined"&&typeof window.prompt=="function"?b=window.prompt("Input: "):typeof readline=="function"&&(b=readline());b||(b="");a.C=qa(b+"\n",I)}return a.C.shift()});d||(d=function(a){a===W||a===10?(d.$(d.buffer.join("")),d.buffer=[]):d.buffer.push(String.fromCharCode(a))});if(!d.$)d.$=Na;if(!d.buffer)d.buffer=
[];e||(e=d);s.D("/","tmp",I,I);var b=s.D("/","dev",I,Y),f=s.v(b,"stdin",a),g=s.v(b,"stdout",W,d),e=s.v(b,"stderr",W,e);s.v(b,"tty",a,d);s.a[1]={path:"/dev/stdin",object:f,position:0,h:I,i:Y,p:Y,error:Y,f:Y,e:[]};s.a[2]={path:"/dev/stdout",object:g,position:0,h:Y,i:I,p:Y,error:Y,f:Y,e:[]};s.a[3]={path:"/dev/stderr",object:e,position:0,h:Y,i:I,p:Y,error:Y,f:Y,e:[]};Oc=h([1],"void*",k);Pb=h([2],"void*",k);Pc=h([3],"void*",k);s.a[Oc]=s.a[1];s.a[Pb]=s.a[2];s.a[Pc]=s.a[3];x=h([h([0,0,0,0,Oc,0,0,0,Pb,0,
0,0,Pc,0,0,0],"void*",k)],"void*",k)}},ta:function(){s.o.W&&(s.a[2].object.j.buffer.length>0&&s.a[2].object.j(10),s.a[3].object.j.buffer.length>0&&s.a[3].object.j(10))}};Tb={l:8,ya:0,za:4};Ub={l:8,ya:8,za:12};var hi=Math.abs,La=Math.pow,Qb={l:1040,fa:0,Q:4,ga:1028,ha:1032,ia:1036},Of,li,mi,ki,ni,Ug,Vg,Wg,Xg,Fc,oi,pi;s.o();Mc.push({ma:function(){s.ta()}});C(0);Kc.r=h([0],"i8",k);G.ea=function(a){function d(){for(var a=0;a<3;a++)b.push(0)}var e=a.length+1,b=[h(qa("/bin/this.program"),"i8",k)];d();for(var f=
0;f<e-1;f+=1)b.push(h(qa(a[f]),"i8",k)),d();b.push(0);b=h(b,"i32",k);return zc(e,b)};var Zc,$c,yd,ec,fc,Ad,gc,Cd,Dd,Ph,Ed,nd,Gd,ce,be,de,ee,Wd,Xd,Yd,Td,Ud,Qd,Rd,Od,Pd,Nd,he,i,ob,Me,Le,lb,Pe,Re,Qe,Se,Te,Ue,Ye,Ve,Xe,$e,af,bf,Ua,cf,df,ef,ff,gf,hf,jf,kf,lf,mf,nf,of,pf,qf,rf,sf,tf,uf,vf,wf,xf,yf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,qc,qb,pc,Jf,ca,sc,Qh,Rh,tc,uc,vc,Hb,Sh,wc,Th,Uh,Vh,Wh,Xh,Kf,Mf,Nf,rc,Pf,Yh,Zh,Gb,Sf,ag,yc,xc,Tf,Yf,Vf,Wf,Xf,Zf,$f,$h,ai,bi,bg,cg,dg,rg,Mb,Jb,gg,sb,Kb,Ac,Bc,mg,Lb,og,qg,ua,Xa,tg,Cc,M,tb,
Dc,ug,vg,Ec,ub,zg,wg,xg,yg,Ag,Bg,Cg,Dg,Eg,Fg,Gg,Hg,Ig,Jg,Kg,Rg,Lg,Mg,Ng,Og,Pg,Qg,Tg,Sg,Yg,Zg,yh,Nb,va,$g,ea,ah,bh,ch,dh,eh,fh,Gc,gh,hh,ih,jh,kh,Ya,lh,Za,mh,nh,oh,ph,qh,Hc,rh,sh,th,uh,vh,wh,xh,Ch,Dh,wb,J,ci,di,vb,aa,Ic,$a,Fh,Ob,Gh,Jc,Eh;Zc=h([69,114,114,111,114,32,97,108,108,111,99,97,116,105,110,103,32,109,101,109,111,114,121,32,102,111,114,32,99,111,109,112,114,101,115,115,101,100,32,98,105,116,115,116,114,101,97,109,10,0],"i8",k);h([119,114,105,116,101,32,101,114,114,111,114,10,0],"i8",k);$c=h([114,
101,97,100,32,101,114,114,111,114,58,32,112,97,115,115,101,100,32,116,104,101,32,101,110,100,32,111,102,32,116,104,101,32,99,111,100,101,115,116,114,101,97,109,32,40,115,116,97,114,116,32,61,32,37,100,44,32,99,117,114,114,101,110,116,32,61,32,37,100,44,32,101,110,100,32,61,32,37,100,10,0],"i8",k);h([1,0,0,0,0,0,0,0,1.5,0,0,0,0,0,0,0,2.75,0,0,0,0,0,0,0,5.375,0,0,0,0,0,0,0,10.68,0,0,0,0,0,0,0,21.34,0,0,0,0,0,0,0,42.67,0,0,0,0,0,0,0,85.33,0,0,0,0,0,0,0,170.7,0,0,0,0,0,0,0,341.3,0,0,0,0,0,0,0,1.038,0,
0,0,0,0,0,0,1.592,0,0,0,0,0,0,0,2.919,0,0,0,0,0,0,0,5.703,0,0,0,0,0,0,0,11.33,0,0,0,0,0,0,0,22.64,0,0,0,0,0,0,0,45.25,0,0,0,0,0,0,0,90.48,0,0,0,0,0,0,0,180.9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1.038,0,0,0,0,0,0,0,1.592,0,0,0,0,0,0,0,2.919,0,0,0,0,0,0,0,5.703,0,0,0,0,0,0,0,11.33,0,0,0,0,0,0,0,22.64,0,0,0,0,0,0,0,45.25,0,0,0,0,0,0,0,90.48,0,0,0,0,0,0,0,180.9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.7186,0,0,0,0,0,0,0,0.9218,0,0,0,0,0,0,0,1.586,0,0,0,0,0,0,0,3.043,0,0,0,0,0,0,0,6.019,0,0,0,0,0,0,0,12.01,0,0,0,0,0,
0,0,24,0,0,0,0,0,0,0,47.97,0,0,0,0,0,0,0,95.93,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",
0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0],k);
h([1,0,0,0,0,0,0,0,1.965,0,0,0,0,0,0,0,4.177,0,0,0,0,0,0,0,8.403,0,0,0,0,0,0,0,16.9,0,0,0,0,0,0,0,33.84,0,0,0,0,0,0,0,67.69,0,0,0,0,0,0,0,135.3,0,0,0,0,0,0,0,270.6,0,0,0,0,0,0,0,540.9,0,0,0,0,0,0,0,2.022,0,0,0,0,0,0,0,3.989,0,0,0,0,0,0,0,8.355,0,0,0,0,0,0,0,17.04,0,0,0,0,0,0,0,34.27,0,0,0,0,0,0,0,68.63,0,0,0,0,0,0,0,137.3,0,0,0,0,0,0,0,274.6,0,0,0,0,0,0,0,549,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2.022,0,0,0,0,0,0,0,3.989,0,0,0,0,0,0,0,8.355,0,0,0,0,0,0,0,17.04,0,0,0,0,0,0,0,34.27,0,0,0,0,0,0,0,68.63,0,0,
0,0,0,0,0,137.3,0,0,0,0,0,0,0,274.6,0,0,0,0,0,0,0,549,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2.08,0,0,0,0,0,0,0,3.865,0,0,0,0,0,0,0,8.307,0,0,0,0,0,0,0,17.18,0,0,0,0,0,0,0,34.71,0,0,0,0,0,0,0,69.59,0,0,0,0,0,0,0,139.3,0,0,0,0,0,0,0,278.6,0,0,0,0,0,0,0,557.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,
0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",
0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0],k);h([85,110,97,98,108,101,32,116,111,32,97,108,108,111,99,97,116,101,32,109,101,109,111,114,121,32,102,111,114,32,105,109,97,103,101,46,10,0],"i8",k);h([4,0,0,0,67,80,82,76,0,0,0,0,76,82,67,80,3,0,0,0,80,67,82,76,1,0,0,0,82,76,67,80,2,0,0,0,82,80,67,76,-1,0,0,0,0,0,0,0],["i32",0,0,0,"i8","i8","i8","i8",
"i32",0,0,0,"i8","i8","i8","i8","i32",0,0,0,"i8","i8","i8","i8","i32",0,0,0,"i8","i8","i8","i8","i32",0,0,0,"i8","i8","i8","i8","i32",0,0,0,"i8","i8","i8","i8"],k);yd=h([65359,0,0,0,1,0,0,0,10,0,0,0,65424,0,0,0,12,0,0,0,12,0,0,0,65427,0,0,0,16,0,0,0,14,0,0,0,65497,0,0,0,8,0,0,0,16,0,0,0,65361,0,0,0,2,0,0,0,18,0,0,0,65362,0,0,0,20,0,0,0,20,0,0,0,65363,0,0,0,20,0,0,0,22,0,0,0,65374,0,0,0,20,0,0,0,24,0,0,0,65372,0,0,0,20,0,0,0,26,0,0,0,65373,0,0,0,20,0,0,0,28,0,0,0,65375,0,0,0,20,0,0,0,30,0,0,0,65365,
0,0,0,4,0,0,0,32,0,0,0,65367,0,0,0,4,0,0,0,34,0,0,0,65368,0,0,0,16,0,0,0,36,0,0,0,65376,0,0,0,4,0,0,0,38,0,0,0,65377,0,0,0,16,0,0,0,40,0,0,0,65425,0,0,0,0,0,0,0,0,0,0,0,65379,0,0,0,4,0,0,0,42,0,0,0,65380,0,0,0,20,0,0,0,44,0,0,0,0,0,0,0,20,0,0,0,46,0,0,0],["i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",
0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",
0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0,"i32",0,0,0,"i32",0,0,0,"void (%struct.opj_j2k.22*)*",0,0,0],k);ec=h([37,46,56,120,58,32,101,120,112,101,99,116,101,100,32,97,32,109,97,
114,107,101,114,32,105,110,115,116,101,97,100,32,111,102,32,37,120,10,0],"i8",k);fc=h([37,46,56,120,58,32,117,110,101,120,112,101,99,116,101,100,32,109,97,114,107,101,114,32,37,120,10,0],"i8",k);Ad=h([77,97,105,110,32,72,101,97,100,101,114,32,100,101,99,111,100,101,100,46,10,0],"i8",k);gc=h([73,110,99,111,109,112,108,101,116,101,32,98,105,116,115,116,114,101,97,109,10,0],"i8",k);Cd=h([91,74,80,84,45,115,116,114,101,97,109,93,32,58,32,69,120,112,101,99,116,105,110,103,32,77,97,105,110,32,104,101,97,
100,101,114,32,102,105,114,115,116,32,91,99,108,97,115,115,95,73,100,32,37,100,93,32,33,10,0],"i8",k);Dd=h([91,74,80,84,45,115,116,114,101,97,109,93,32,58,32,69,120,112,101,99,116,105,110,103,32,84,105,108,101,32,105,110,102,111,32,33,10,0],"i8",k);h([116,105,108,101,32,110,117,109,98,101,114,32,37,100,32,47,32,37,100,10,0],"i8",k);Ph=h([85,110,107,110,111,119,110,32,109,97,114,107,101,114,10,0],"i8",k);Ed=h([69,114,114,111,114,32,100,101,99,111,100,105,110,103,32,99,111,109,112,111,110,101,110,116,
32,37,100,46,10,84,104,101,32,110,117,109,98,101,114,32,111,102,32,114,101,115,111,108,117,116,105,111,110,115,32,116,111,32,114,101,109,111,118,101,32,105,115,32,104,105,103,104,101,114,32,116,104,97,110,32,116,104,101,32,110,117,109,98,101,114,32,111,102,32,114,101,115,111,108,117,116,105,111,110,115,32,111,102,32,116,104,105,115,32,99,111,109,112,111,110,101,110,116,10,77,111,100,105,102,121,32,116,104,101,32,99,112,95,114,101,100,117,99,101,32,112,97,114,97,109,101,116,101,114,46,10,10,0],"i8",
k);nd=h([37,115,58,32,105,110,118,97,108,105,100,32,105,109,97,103,101,32,115,105,122,101,32,40,120,48,58,37,100,44,32,120,49,58,37,100,44,32,121,48,58,37,100,44,32,121,49,58,37,100,41,10,0],"i8",k);Gd=h([69,120,112,101,99,116,101,100,32,74,80,50,72,32,77,97,114,107,101,114,10,0],"i8",k);ce=h([70,97,105,108,101,100,32,116,111,32,100,101,99,111,100,101,32,106,112,50,32,115,116,114,117,99,116,117,114,101,10,0],"i8",k);be=h([70,97,105,108,101,100,32,116,111,32,100,101,99,111,100,101,32,74,50,75,32,105,
109,97,103,101,10,0],"i8",k);h([73,110,118,97,108,105,100,32,110,117,109,98,101,114,32,111,102,32,99,111,109,112,111,110,101,110,116,115,32,115,112,101,99,105,102,105,101,100,32,119,104,105,108,101,32,115,101,116,116,105,110,103,32,117,112,32,74,80,50,32,101,110,99,111,100,101,114,10,0],"i8",k);h([70,97,105,108,101,100,32,116,111,32,101,110,99,111,100,101,32,105,109,97,103,101,10,0],"i8",k);de=h([69,120,112,101,99,116,101,100,32,70,84,89,80,32,77,97,114,107,101,114,10,0],"i8",k);ee=h([69,114,114,
111,114,32,119,105,116,104,32,70,84,89,80,32,66,111,120,10,0],"i8",k);Wd=h([69,120,112,101,99,116,101,100,32,74,80,32,77,97,114,107,101,114,10,0],"i8",k);Xd=h([69,114,114,111,114,32,119,105,116,104,32,74,80,32,77,97,114,107,101,114,10,0],"i8",k);Yd=h([69,114,114,111,114,32,119,105,116,104,32,74,80,32,66,111,120,32,115,105,122,101,10,0],"i8",k);Td=h([69,114,114,111,114,32,119,105,116,104,32,67,79,76,82,32,98,111,120,32,115,105,122,101,10,0],"i8",k);Ud=h([69,114,114,111,114,32,119,105,116,104,32,67,
79,76,82,32,66,111,120,10,0],"i8",k);Qd=h([69,120,112,101,99,116,101,100,32,66,80,67,67,32,77,97,114,107,101,114,10,0],"i8",k);Rd=h([69,114,114,111,114,32,119,105,116,104,32,66,80,67,67,32,66,111,120,10,0],"i8",k);Od=h([69,120,112,101,99,116,101,100,32,73,72,68,82,32,77,97,114,107,101,114,10,0],"i8",k);Pd=h([69,114,114,111,114,32,119,105,116,104,32,73,72,68,82,32,66,111,120,10,0],"i8",k);Nd=h([67,97,110,110,111,116,32,104,97,110,100,108,101,32,98,111,120,32,115,105,122,101,115,32,104,105,103,104,
101,114,32,116,104,97,110,32,50,94,51,50,10,0],"i8",k);he=h([70,111,114,98,105,100,100,101,110,32,118,97,108,117,101,32,101,110,99,111,117,110,116,101,114,32,105,110,32,109,101,115,115,97,103,101,32,104,101,97,100,101,114,32,33,33,10,0],"i8",k);h([1.732,0,0,0,0,0,0,0,0.8292,0,0,0,0,0,0,0,0.8292,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0],k);h([1.732,0,0,0,0,0,0,0,1.805,0,0,0,0,0,0,0,1.573,0,0,0,0,0,0,0],["double",0,0,0,0,0,0,0,"double",0,0,0,0,0,0,0,"double",
0,0,0,0,0,0,0],k);i=h([22017,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22017,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,13313,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13313,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,6145,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6145,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2753,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2753,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1313,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1313,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,545,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,545,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,22017,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22017,0,0,0,1,0,0,0,
0,0,0,0,0,0,0,0,21505,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21505,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,18433,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18433,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,14337,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14337,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,12289,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12289,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,9217,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9217,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,7169,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7169,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,5633,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5633,0,0,0,1,0,0,0,0,0,
0,0,0,0,0,0,22017,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22017,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,21505,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21505,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,20737,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20737,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,18433,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18433,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,14337,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14337,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,13313,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13313,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,12289,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12289,0,0,0,1,0,0,0,0,
0,0,0,0,0,0,0,10241,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10241,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,9217,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9217,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,8705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8705,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,7169,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7169,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,6145,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6145,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,5633,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5633,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,5121,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5121,0,0,0,1,0,0,0,0,0,0,0,0,0,
0,0,4609,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4609,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,4353,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4353,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2753,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2753,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2497,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2497,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2209,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2209,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1313,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1313,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1089,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1089,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,673,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,673,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,545,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,545,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,321,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,321,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,273,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,273,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,133,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,133,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,73,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,73,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,0,
0,0,1,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,22017,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22017,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",
0,0,0,"%struct.opj_mqc_state*",0,0,0,"i32",0,0,0,"i32",0,0,0,"%struct.opj_mqc_state*",0,0,0,"%struct.opj_mqc_state*",0,0,0],k);h([49,46,52,46,48,0],"i8",k);h([83,101,116,32,105,110,100,101,120,32,116,111,32,78,85,76,76,32,119,104,101,110,32,99,97,108,108,105,110,103,32,116,104,101,32,111,112,106,95,101,110,99,111,100,101,32,102,117,110,99,116,105,111,110,46,10,84,111,32,101,120,116,114,97,99,116,32,116,104,101,32,105,110,100,101,120,44,32,117,115,101,32,116,104,101,32,111,112,106,95,101,110,99,111,
100,101,95,119,105,116,104,95,105,110,102,111,40,41,32,102,117,110,99,116,105,111,110,46,10,78,111,32,105,110,100,101,120,32,119,105,108,108,32,98,101,32,103,101,110,101,114,97,116,101,100,32,100,117,114,105,110,103,32,116,104,105,115,32,101,110,99,111,100,105,110,103,10,0],"i8",k);h([67,80,82,76,0],"i8",k);h([76,82,67,80,0],"i8",k);h([80,67,82,76,0],"i8",k);h([82,76,67,80,0],"i8",k);h([82,80,67,76,0],"i8",k);ob=h([64,0,1088,0,32,0,544,0,128,0,2176,0,16,0,272,0],["i16",0,"i16",0,"i16",0,"i16",0,"i16",
0,"i16",0,"i16",0,"i16",0],k);Me=h([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,1,0,0,0,0,0,0,1,1,0,1,1,1,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,1,1,0,0,1,1,1,0,0,1,0,0,1,1,0,0,1,1,0,1,1,1,1,1,0,0,1,1,1,0,1,1,1,
1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"i8",k);Le=h([9,10,12,13,10,10,13,13,12,13,12,13,13,13,13,13,9,10,12,11,10,9,13,12,12,11,12,11,13,12,13,12,9,10,12,11,10,10,11,11,12,13,9,10,13,13,10,10,9,10,12,13,10,9,11,12,12,11,9,10,13,12,10,9,9,10,12,13,10,9,11,12,12,13,12,13,11,12,11,12,9,10,12,11,10,10,11,11,12,11,12,11,11,11,11,11,9,10,12,11,10,9,13,12,12,13,9,10,11,12,10,9,9,10,12,13,10,10,13,13,12,11,9,10,11,11,10,10,9,10,12,13,10,10,13,13,12,11,9,10,11,11,10,10,9,10,12,11,10,9,13,12,12,13,
9,10,11,12,10,9,9,10,12,11,10,10,11,11,12,11,12,11,11,11,11,11,9,10,12,13,10,9,11,12,12,13,12,13,11,12,11,12,9,10,12,13,10,9,11,12,12,11,9,10,13,12,10,9,9,10,12,11,10,10,11,11,12,13,9,10,13,13,10,10,9,10,12,11,10,9,13,12,12,11,12,11,13,12,13,12,9,10,12,13,10,10,13,13,12,13,12,13,13,13,13,13],"i8",k);lb=h([0,1,1,2,1,2,2,2,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,7,
7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,1,1,2,1,2,2,2,1,2,2,2,2,2,2,2,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,8,8,8,8,8,8,8,8,8,8,8,8,
8,8,8,8,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,1,1,2,1,2,2,2,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,
4,4,4,4,4,4,4,4,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,3,3,6,3,6,6,8,3,6,6,8,6,8,8,8,1,4,4,7,4,7,7,8,4,7,7,8,7,8,8,8,1,4,4,7,4,7,7,8,4,7,7,8,7,8,8,8,2,5,5,7,5,7,7,8,5,7,7,8,7,8,8,8,1,4,4,7,4,7,7,8,4,7,7,8,7,8,8,8,2,5,
5,7,5,7,7,8,5,7,7,8,7,8,8,8,2,5,5,7,5,7,7,8,5,7,7,8,7,8,8,8,2,5,5,7,5,7,7,8,5,7,7,8,7,8,8,8,1,4,4,7,4,7,7,8,4,7,7,8,7,8,8,8,2,5,5,7,5,7,7,8,5,7,7,8,7,8,8,8,2,5,5,7,5,7,7,8,5,7,7,8,7,8,8,8,2,5,5,7,5,7,7,8,5,7,7,8,7,8,8,8,2,5,5,7,5,7,7,8,5,7,7,8,7,8,8,8,2,5,5,7,5,7,7,8,5,7,7,8,7,8,8,8,2,5,5,7,5,7,7,8,5,7,7,8,7,8,8,8,2,5,5,7,5,7,7,8,5,7,7,8,7,8,8,8],"i8",k);h([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,384,0,768,0,1152,0,1536,0,1920,0,2304,0,2688,0,3072,0,3456,0,3840,0,4224,0,4608,0,4992,0,5376,0,5760,0,6144,0,6528,0,6912,0,7296,0,7680,0,8064,0,8448,0,8832,0,9216,0,9600,0,9984,0,10368,0,10752,0,11136,0,11520,0,11904,0,12288,0,12672,0,13056,0,13440,0,13824,0,14208,0,14592,0,14976,0,15360,0,15744,0,16128,0,16512,0,16896,0,17280,0,17664,0,18048,0,18432,0,18816,0,19200,0,19584,0,19968,0,20352,0,20736,0,21120,0,21504,0,21888,0,22272,0,22656,0,23040,
0,23424,0,23808,0,24192,0,24576,0,24960,0,25344,0,25728,0,26112,0,26496,0,26880,0,27264,0,27648,0,28032,0,28416,0,28800,0,29184,0,29568,0,29952,0,30336,0],["i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",
0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",
0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0],k);h([0,0,0,0,0,0,0,0,0,0,0,0,128,0,128,0,128,0,128,0,256,0,256,0,256,0,384,0,384,0,512,0,512,0,640,0,640,0,768,0,768,0,896,0,1024,0,1024,0,1152,0,1280,0,1408,0,1408,0,1536,0,1664,0,1792,0,1920,0,2048,0,2176,0,2304,0,2432,0,2560,0,2688,0,2944,0,3072,0,3200,0,3328,0,3584,0,3712,0,3840,0,4096,0,4224,0,4480,0,4608,0,4864,0,4992,0,5248,
0,5376,0,5632,0,5888,0,6016,0,6272,0,6528,0,6784,0,6912,0,7168,0,7424,0,7680,0,7936,0,8192,0,8448,0,8704,0,8960,0,9216,0,9472,0,9856,0,10112,0,10368,0,10624,0,11008,0,11264,0,11520,0,11904,0,12160,0,12544,0,12800,0,13184,0,13440,0,13824,0,14080,0,14464,0,14848,0,15104,0,15488,0,15872,0,16256,0,16512,0,16896,0,17280,0,17664,0,18048,0,18432,0,18816,0,19200,0,19584,0,19968,0,20352,0,20864,0,21248,0,21632,0,22016,0,22528,0,22912,0,23296,0,23808,0,24192,0,24704,0,25088,0,25600,0,25984,0,26496,0,26880,
0,27392,0,27904,0,28288,0,28800,0,29312,0,29824,0,30208,0,30720,0,31232,0,31744,0,32256,0],["i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",
0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",
0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0],k);h([6144,0,6016,0,5888,0,5760,0,5632,0,5504,0,5376,0,5248,0,5120,0,4992,0,4864,0,4736,0,4608,0,4480,0,4352,0,4224,0,4096,0,3968,0,3840,0,3712,0,3584,0,3456,0,3328,0,3200,0,3072,0,2944,0,2816,0,2688,0,2560,0,2432,0,2304,0,2176,0,2048,0,1920,0,1792,0,1664,0,1536,0,1408,0,1280,0,1152,0,1024,0,896,0,768,0,640,0,512,0,384,0,256,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,0,256,0,384,0,512,0,640,0,768,0,896,0,1024,0,1152,0,1280,0,1408,0,1536,0,1664,0,1792,0,1920,0,2048,0,2176,0,2304,0,2432,0,2560,0,2688,0,2816,0,2944,0,3072,0,3200,0,3328,0,3456,0,3584,0,3712,0,3840,0,3968,0,4096,0,4224,0,4352,0,4480,0,4608,0,4736,0,4864,0,4992,0,5120,0,5248,0,5376,0,5504,0,5632,0,5760,0,5888,0,6016,0],["i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",
0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",
0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0],k);h([8192,0,7936,0,7680,0,7424,0,7168,0,6912,0,6784,0,6528,0,6272,0,6016,0,5888,0,5632,0,
5376,0,5248,0,4992,0,4864,0,4608,0,4480,0,4224,0,4096,0,3840,0,3712,0,3584,0,3328,0,3200,0,3072,0,2944,0,2688,0,2560,0,2432,0,2304,0,2176,0,2048,0,1920,0,1792,0,1664,0,1536,0,1408,0,1408,0,1280,0,1152,0,1024,0,1024,0,896,0,768,0,768,0,640,0,640,0,512,0,512,0,384,0,384,0,256,0,256,0,256,0,128,0,128,0,128,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,0,128,0,128,0,128,0,256,0,256,0,256,0,384,0,384,0,512,0,512,0,640,0,640,0,768,0,768,0,896,0,1024,0,1024,0,1152,0,1280,0,1408,0,1408,0,1536,0,
1664,0,1792,0,1920,0,2048,0,2176,0,2304,0,2432,0,2560,0,2688,0,2944,0,3072,0,3200,0,3328,0,3584,0,3712,0,3840,0,4096,0,4224,0,4480,0,4608,0,4864,0,4992,0,5248,0,5376,0,5632,0,5888,0,6016,0,6272,0,6528,0,6784,0,6912,0,7168,0,7424,0,7680,0,7936,0],["i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",
0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",
0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0,"i16",0],k);h([69,114,114,111,114,32,105,110,105,116,105,97,108,105,122,105,110,103,32,80,97,99,107,101,116,32,73,116,101,114,97,116,111,114,10,0],"i8",k);Pe=h([69,120,112,101,99,116,101,100,32,83,79,80,32,109,97,114,107,101,114,10,0],"i8",k);
Re=h([69,114,114,111,114,32,58,32,101,120,112,101,99,116,101,100,32,69,80,72,32,109,97,114,107,101,114,10,0],"i8",k);Qe=h([69,120,112,101,99,116,101,100,32,69,80,72,32,109,97,114,107,101,114,10,0],"i8",k);h([105,109,97,103,101,32,123,10,0],"i8",k);h([32,32,116,119,61,37,100,44,32,116,104,61,37,100,32,120,48,61,37,100,32,120,49,61,37,100,32,121,48,61,37,100,32,121,49,61,37,100,10,0],"i8",k);h([32,32,116,105,108,101,32,123,10,0],"i8",k);h([32,32,32,32,120,48,61,37,100,44,32,121,48,61,37,100,44,32,120,
49,61,37,100,44,32,121,49,61,37,100,44,32,110,117,109,99,111,109,112,115,61,37,100,10,0],"i8",k);h([32,32,32,32,116,105,108,101,99,32,123,10,0],"i8",k);h([32,32,32,32,32,32,120,48,61,37,100,44,32,121,48,61,37,100,44,32,120,49,61,37,100,44,32,121,49,61,37,100,44,32,110,117,109,114,101,115,111,108,117,116,105,111,110,115,61,37,100,10,0],"i8",k);h([10,32,32,32,114,101,115,32,123,10,0],"i8",k);h([32,32,32,32,32,32,32,32,32,32,120,48,61,37,100,44,32,121,48,61,37,100,44,32,120,49,61,37,100,44,32,121,49,
61,37,100,44,32,112,119,61,37,100,44,32,112,104,61,37,100,44,32,110,117,109,98,97,110,100,115,61,37,100,10,0],"i8",k);h([32,32,32,32,32,32,32,32,98,97,110,100,32,123,10,0],"i8",k);h([32,32,32,32,32,32,32,32,32,32,120,48,61,37,100,44,32,121,48,61,37,100,44,32,120,49,61,37,100,44,32,121,49,61,37,100,44,32,115,116,101,112,115,105,122,101,61,37,102,44,32,110,117,109,98,112,115,61,37,100,10,0],"i8",k);h([32,32,32,32,32,32,32,32,32,32,112,114,101,99,32,123,10,0],"i8",k);h([32,32,32,32,32,32,32,32,32,32,
32,32,120,48,61,37,100,44,32,121,48,61,37,100,44,32,120,49,61,37,100,44,32,121,49,61,37,100,44,32,99,119,61,37,100,44,32,99,104,61,37,100,10,0],"i8",k);h([32,32,32,32,32,32,32,32,32,32,125,10,0],"i8",k);h([32,32,32,32,32,32,32,32,125,10,0],"i8",k);h([32,32,32,32,32,32,125,10,0],"i8",k);h([32,32,32,32,125,10,0],"i8",k);h([32,32,125,10,0],"i8",k);h([125,10,0],"i8",k);h([45,32,116,105,108,101,32,101,110,99,111,100,101,100,32,105,110,32,37,102,32,115,10,0],"i8",k);Se=h([116,105,108,101,32,37,100,32,111,
102,32,37,100,10,0],"i8",k);Te=h([116,99,100,95,100,101,99,111,100,101,58,32,105,110,99,111,109,112,108,101,116,101,32,98,105,115,116,114,101,97,109,10,0],"i8",k);Ue=h([45,32,116,105,101,114,115,45,49,32,116,111,111,107,32,37,102,32,115,10,0],"i8",k);Ye=h([69,114,114,111,114,32,100,101,99,111,100,105,110,103,32,116,105,108,101,46,32,84,104,101,32,110,117,109,98,101,114,32,111,102,32,114,101,115,111,108,117,116,105,111,110,115,32,116,111,32,114,101,109,111,118,101,32,91,37,100,43,49,93,32,105,115,
32,104,105,103,104,101,114,32,116,104,97,110,32,116,104,101,32,110,117,109,98,101,114,32,32,111,102,32,114,101,115,111,108,117,116,105,111,110,115,32,105,110,32,116,104,101,32,111,114,105,103,105,110,97,108,32,99,111,100,101,115,116,114,101,97,109,32,91,37,100,93,10,77,111,100,105,102,121,32,116,104,101,32,99,112,95,114,101,100,117,99,101,32,112,97,114,97,109,101,116,101,114,46,10,0],"i8",k);Ve=h([45,32,100,119,116,32,116,111,111,107,32,37,102,32,115,10,0],"i8",k);Xe=h([45,32,116,105,108,101,32,100,
101,99,111,100,101,100,32,105,110,32,37,102,32,115,10,0],"i8",k);$e=h([72,69,76,80,32,102,111,114,32,106,50,107,95,116,111,95,105,109,97,103,101,10,45,45,45,45,10,10,0],"i8",k);af=h([45,32,116,104,101,32,45,104,32,111,112,116,105,111,110,32,100,105,115,112,108,97,121,115,32,116,104,105,115,32,104,101,108,112,32,105,110,102,111,114,109,97,116,105,111,110,32,111,110,32,115,99,114,101,101,110,10,10,0],"i8",k);bf=h([76,105,115,116,32,111,102,32,112,97,114,97,109,101,116,101,114,115,32,102,111,114,32,
116,104,101,32,74,80,69,71,32,50,48,48,48,32,100,101,99,111,100,101,114,58,10,0],"i8",k);Ua=h([10,0],"i8",k);cf=h([32,32,45,73,109,103,68,105,114,32,10,0],"i8",k);df=h([9,73,109,97,103,101,32,102,105,108,101,32,68,105,114,101,99,116,111,114,121,32,112,97,116,104,32,10,0],"i8",k);ef=h([32,32,45,79,117,116,70,111,114,32,10,0],"i8",k);ff=h([32,32,32,32,82,69,81,85,73,82,69,68,32,111,110,108,121,32,105,102,32,45,73,109,103,68,105,114,32,105,115,32,117,115,101,100,10,0],"i8",k);gf=h([9,32,32,78,101,101,
100,32,116,111,32,115,112,101,99,105,102,121,32,111,110,108,121,32,102,111,114,109,97,116,32,119,105,116,104,111,117,116,32,102,105,108,101,110,97,109,101,32,60,66,77,80,62,32,32,10,0],"i8",k);hf=h([32,32,32,32,67,117,114,114,101,110,116,108,121,32,97,99,99,101,112,116,115,32,80,71,77,44,32,80,80,77,44,32,80,78,77,44,32,80,71,88,44,32,80,78,71,44,32,66,77,80,44,32,84,73,70,44,32,82,65,87,32,97,110,100,32,84,71,65,32,102,111,114,109,97,116,115,10,0],"i8",k);jf=h([32,32,45,105,32,60,99,111,109,112,
114,101,115,115,101,100,32,102,105,108,101,62,10,0],"i8",k);kf=h([32,32,32,32,82,69,81,85,73,82,69,68,32,111,110,108,121,32,105,102,32,97,110,32,73,110,112,117,116,32,105,109,97,103,101,32,100,105,114,101,99,116,111,114,121,32,110,111,116,32,115,112,101,99,105,102,105,101,100,10,0],"i8",k);lf=h([32,32,32,32,67,117,114,114,101,110,116,108,121,32,97,99,99,101,112,116,115,32,74,50,75,45,102,105,108,101,115,44,32,74,80,50,45,102,105,108,101,115,32,97,110,100,32,74,80,84,45,102,105,108,101,115,46,32,84,
104,101,32,102,105,108,101,32,116,121,112,101,10,0],"i8",k);mf=h([32,32,32,32,105,115,32,105,100,101,110,116,105,102,105,101,100,32,98,97,115,101,100,32,111,110,32,105,116,115,32,115,117,102,102,105,120,46,10,0],"i8",k);nf=h([32,32,45,111,32,60,100,101,99,111,109,112,114,101,115,115,101,100,32,102,105,108,101,62,10,0],"i8",k);of=h([32,32,32,32,82,69,81,85,73,82,69,68,10,0],"i8",k);pf=h([32,32,32,32,67,117,114,114,101,110,116,108,121,32,97,99,99,101,112,116,115,32,80,71,77,44,32,80,80,77,44,32,80,
78,77,44,32,80,71,88,44,32,80,78,71,44,32,66,77,80,44,32,84,73,70,44,32,82,65,87,32,97,110,100,32,84,71,65,32,102,105,108,101,115,10,0],"i8",k);qf=h([32,32,32,32,66,105,110,97,114,121,32,100,97,116,97,32,105,115,32,119,114,105,116,116,101,110,32,116,111,32,116,104,101,32,102,105,108,101,32,40,110,111,116,32,97,115,99,105,105,41,46,32,73,102,32,97,32,80,71,88,10,0],"i8",k);rf=h([32,32,32,32,102,105,108,101,110,97,109,101,32,105,115,32,103,105,118,101,110,44,32,116,104,101,114,101,32,119,105,108,108,
32,98,101,32,97,115,32,109,97,110,121,32,111,117,116,112,117,116,32,102,105,108,101,115,32,97,115,32,116,104,101,114,101,32,97,114,101,10,0],"i8",k);sf=h([32,32,32,32,99,111,109,112,111,110,101,110,116,115,58,32,97,110,32,105,110,100,105,99,101,32,115,116,97,114,116,105,110,103,32,102,114,111,109,32,48,32,119,105,108,108,32,116,104,101,110,32,98,101,32,97,112,112,101,110,100,101,100,32,116,111,32,116,104,101,10,0],"i8",k);tf=h([32,32,32,32,111,117,116,112,117,116,32,102,105,108,101,110,97,109,101,
44,32,106,117,115,116,32,98,101,102,111,114,101,32,116,104,101,32,34,112,103,120,34,32,101,120,116,101,110,115,105,111,110,46,32,73,102,32,97,32,80,71,77,32,102,105,108,101,110,97,109,101,10,0],"i8",k);uf=h([32,32,32,32,105,115,32,103,105,118,101,110,32,97,110,100,32,116,104,101,114,101,32,97,114,101,32,109,111,114,101,32,116,104,97,110,32,111,110,101,32,99,111,109,112,111,110,101,110,116,44,32,111,110,108,121,32,116,104,101,32,102,105,114,115,116,32,99,111,109,112,111,110,101,110,116,10,0],"i8",
k);vf=h([32,32,32,32,119,105,108,108,32,98,101,32,119,114,105,116,116,101,110,32,116,111,32,116,104,101,32,102,105,108,101,46,10,0],"i8",k);wf=h([32,32,45,114,32,60,114,101,100,117,99,101,32,102,97,99,116,111,114,62,10,0],"i8",k);xf=h([32,32,32,32,83,101,116,32,116,104,101,32,110,117,109,98,101,114,32,111,102,32,104,105,103,104,101,115,116,32,114,101,115,111,108,117,116,105,111,110,32,108,101,118,101,108,115,32,116,111,32,98,101,32,100,105,115,99,97,114,100,101,100,46,32,84,104,101,10,0],"i8",k);
yf=h([32,32,32,32,105,109,97,103,101,32,114,101,115,111,108,117,116,105,111,110,32,105,115,32,101,102,102,101,99,116,105,118,101,108,121,32,100,105,118,105,100,101,100,32,98,121,32,50,32,116,111,32,116,104,101,32,112,111,119,101,114,32,111,102,32,116,104,101,10,0],"i8",k);zf=h([32,32,32,32,110,117,109,98,101,114,32,111,102,32,100,105,115,99,97,114,100,101,100,32,108,101,118,101,108,115,46,32,84,104,101,32,114,101,100,117,99,101,32,102,97,99,116,111,114,32,105,115,32,108,105,109,105,116,101,100,32,
98,121,32,116,104,101,10,0],"i8",k);Af=h([32,32,32,32,115,109,97,108,108,101,115,116,32,116,111,116,97,108,32,110,117,109,98,101,114,32,111,102,32,100,101,99,111,109,112,111,115,105,116,105,111,110,32,108,101,118,101,108,115,32,97,109,111,110,103,32,116,105,108,101,115,46,10,0],"i8",k);Bf=h([32,32,45,108,32,60,110,117,109,98,101,114,32,111,102,32,113,117,97,108,105,116,121,32,108,97,121,101,114,115,32,116,111,32,100,101,99,111,100,101,62,10,0],"i8",k);Cf=h([32,32,32,32,83,101,116,32,116,104,101,32,
109,97,120,105,109,117,109,32,110,117,109,98,101,114,32,111,102,32,113,117,97,108,105,116,121,32,108,97,121,101,114,115,32,116,111,32,100,101,99,111,100,101,46,32,73,102,32,116,104,101,114,101,32,97,114,101,10,0],"i8",k);Df=h([32,32,32,32,108,101,115,115,32,113,117,97,108,105,116,121,32,108,97,121,101,114,115,32,116,104,97,110,32,116,104,101,32,115,112,101,99,105,102,105,101,100,32,110,117,109,98,101,114,44,32,97,108,108,32,116,104,101,32,113,117,97,108,105,116,121,32,108,97,121,101,114,115,10,0],
"i8",k);Ef=h([32,32,32,32,97,114,101,32,100,101,99,111,100,101,100,46,10,0],"i8",k);Ff=h([32,32,45,120,32,32,10,0],"i8",k);Gf=h([32,32,32,32,67,114,101,97,116,101,32,97,110,32,105,110,100,101,120,32,102,105,108,101,32,42,46,73,100,120,32,40,45,120,32,105,110,100,101,120,95,110,97,109,101,46,73,100,120,41,32,10,0],"i8",k);qc=h([67,111,117,108,100,32,110,111,116,32,111,112,101,110,32,70,111,108,100,101,114,32,37,115,10,0],"i8",k);qb=h([46,0],"i8",k);pc=h([46,46,0],"i8",k);Jf=h([70,111,108,100,101,114,
32,111,112,101,110,101,100,32,115,117,99,99,101,115,115,102,117,108,108,121,10,0],"i8",k);ca=h(56,"i8*",k);sc=h([112,103,120,0],"i8",k);Qh=h([112,110,109,0],"i8",k);Rh=h([112,103,109,0],"i8",k);tc=h([112,112,109,0],"i8",k);uc=h([98,109,112,0],"i8",k);vc=h([116,105,102,0],"i8",k);Hb=h([114,97,119,0],"i8",k);Sh=h([116,103,97,0],"i8",k);wc=h([112,110,103,0],"i8",k);Th=h([106,50,107,0],"i8",k);Uh=h([106,112,50,0],"i8",k);Vh=h([106,112,116,0],"i8",k);Wh=h([106,50,99,0],"i8",k);Xh=h([106,112,99,0],"i8",
k);Kf=h([11,0,0,0,10,0,0,0,10,0,0,0,10,0,0,0,12,0,0,0,14,0,0,0,15,0,0,0,16,0,0,0,17,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],["i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0,"i32",0,0,0],k);Mf=h([70,105,108,101,32,78,117,109,98,101,114,32,37,100,32,34,37,115,34,10,0],"i8",k);Nf=h([37,115,47,37,115,0],"i8",k);rc=h([46,37,115,0],"i8",k);Pf=h([37,115,47,37,115,46,37,115,0],"i8",k);Yh=h([73,
109,103,68,105,114,0],"i8",k);Zh=h([79,117,116,70,111,114,0],"i8",k);Gb=h([0,0,0,0,1,0,0,0,0,0,0,0,121,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,79,0,0,0],["i8*",0,0,0,"i32",0,0,0,"i32*",0,0,0,"i32",0,0,0,"i8*",0,0,0,"i32",0,0,0,"i32*",0,0,0,"i32",0,0,0],k);Sf=h([105,58,111,58,114,58,108,58,120,58,104,0],"i8",k);ag=h([33,33,32,85,110,114,101,99,111,103,110,105,122,101,100,32,102,111,114,109,97,116,32,102,111,114,32,105,110,102,105,108,101,32,58,32,37,115,32,91,97,99,99,101,112,116,32,111,110,108,121,32,42,46,
106,50,107,44,32,42,46,106,112,50,44,32,42,46,106,112,99,32,111,114,32,42,46,106,112,116,93,32,33,33,10,10,0],"i8",k);yc=h([85,110,107,110,111,119,110,32,111,117,116,112,117,116,32,102,111,114,109,97,116,32,105,109,97,103,101,32,37,115,32,91,111,110,108,121,32,42,46,112,110,109,44,32,42,46,112,103,109,44,32,42,46,112,112,109,44,32,42,46,112,103,120,44,32,42,46,98,109,112,44,32,42,46,116,105,102,44,32,42,46,114,97,119,32,111,114,32,42,46,116,103,97,93,33,33,32,10,0],"i8",k);xc=h([37,100,0],"i8",k);
Tf=h([87,65,82,78,73,78,71,32,45,62,32,116,104,105,115,32,111,112,116,105,111,110,32,105,115,32,110,111,116,32,118,97,108,105,100,32,34,45,37,99,32,37,115,34,10,0],"i8",k);Yf=h([69,114,114,111,114,58,32,111,112,116,105,111,110,115,32,45,73,109,103,68,105,114,32,97,110,100,32,45,105,32,99,97,110,110,111,116,32,98,101,32,117,115,101,100,32,116,111,103,101,116,104,101,114,32,33,33,10,0],"i8",k);Vf=h([69,114,114,111,114,58,32,87,104,101,110,32,45,73,109,103,68,105,114,32,105,115,32,117,115,101,100,44,
32,45,79,117,116,70,111,114,32,60,70,79,82,77,65,84,62,32,109,117,115,116,32,98,101,32,117,115,101,100,32,33,33,10,0],"i8",k);Wf=h([79,110,108,121,32,111,110,101,32,102,111,114,109,97,116,32,97,108,108,111,119,101,100,33,32,86,97,108,105,100,32,102,111,114,109,97,116,32,80,71,77,44,32,80,80,77,44,32,80,78,77,44,32,80,71,88,44,32,66,77,80,44,32,84,73,70,44,32,82,65,87,32,97,110,100,32,84,71,65,33,33,10,0],"i8",k);Xf=h([69,114,114,111,114,58,32,111,112,116,105,111,110,115,32,45,73,109,103,68,105,114,
32,97,110,100,32,45,111,32,99,97,110,110,111,116,32,98,101,32,117,115,101,100,32,116,111,103,101,116,104,101,114,32,33,33,10,0],"i8",k);Zf=h([69,120,97,109,112,108,101,58,32,37,115,32,45,105,32,105,109,97,103,101,46,106,50,107,32,45,111,32,105,109,97,103,101,46,112,103,109,10,0],"i8",k);$f=h([32,32,32,32,84,114,121,58,32,37,115,32,45,104,10,0],"i8",k);$h=h([91,69,82,82,79,82,93,32,37,115,0],"i8",k);ai=h([91,87,65,82,78,73,78,71,93,32,37,115,0],"i8",k);bi=h([91,73,78,70,79,93,32,37,115,0],"i8",k);
bg=h([70,111,108,100,101,114,32,105,115,32,101,109,112,116,121,10,0],"i8",k);cg=h([115,107,105,112,112,105,110,103,32,102,105,108,101,46,46,46,10,0],"i8",k);dg=h([114,98,0],"i8",k);rg=h([69,82,82,79,82,32,45,62,32,102,97,105,108,101,100,32,116,111,32,111,112,101,110,32,37,115,32,102,111,114,32,114,101,97,100,105,110,103,10,0],"i8",k);Mb=h([69,82,82,79,82,32,45,62,32,106,50,107,95,116,111,95,105,109,97,103,101,58,32,102,97,105,108,101,100,32,116,111,32,100,101,99,111,100,101,32,105,109,97,103,101,
33,10,0],"i8",k);Jb=h([70,97,105,108,101,100,32,116,111,32,111,117,116,112,117,116,32,105,110,100,101,120,32,102,105,108,101,10,0],"i8",k);gg=h([115,107,105,112,112,105,110,103,32,102,105,108,101,46,46,10,0],"i8",k);sb=h([79,117,116,102,105,108,101,32,37,115,32,110,111,116,32,103,101,110,101,114,97,116,101,100,10,0],"i8",k);Kb=h([71,101,110,101,114,97,116,101,100,32,79,117,116,102,105,108,101,32,37,115,10,0],"i8",k);Ac=h(1,"i32",k);Bc=h(1,"i32",k);mg=h([69,114,114,111,114,32,103,101,110,101,114,97,
116,105,110,103,32,114,97,119,32,102,105,108,101,46,32,79,117,116,102,105,108,101,32,37,115,32,110,111,116,32,103,101,110,101,114,97,116,101,100,10,0],"i8",k);Lb=h([83,117,99,99,101,115,115,102,117,108,108,121,32,103,101,110,101,114,97,116,101,100,32,79,117,116,102,105,108,101,32,37,115,10,0],"i8",k);og=h([69,114,114,111,114,32,103,101,110,101,114,97,116,105,110,103,32,116,103,97,32,102,105,108,101,46,32,79,117,116,102,105,108,101,32,37,115,32,110,111,116,32,103,101,110,101,114,97,116,101,100,10,
0],"i8",k);qg=h([69,114,114,111,114,32,103,101,110,101,114,97,116,105,110,103,32,112,110,103,32,102,105,108,101,46,32,79,117,116,102,105,108,101,32,37,115,32,110,111,116,32,103,101,110,101,114,97,116,101,100,10,0],"i8",k);h([83,111,114,114,121,44,32,99,111,109,112,114,101,115,115,101,100,32,116,103,97,32,102,105,108,101,115,32,97,114,101,32,110,111,116,32,99,117,114,114,101,110,116,108,121,32,115,117,112,112,111,114,116,101,100,46,10,0],"i8",k);h([70,105,108,101,32,99,111,110,116,97,105,110,115,32,
97,32,112,97,108,101,116,116,101,32,45,32,110,111,116,32,121,101,116,32,115,117,112,112,111,114,116,101,100,46,0],"i8",k);h([114,98,0],"i8",k);h([70,97,105,108,101,100,32,116,111,32,111,112,101,110,32,37,115,32,102,111,114,32,114,101,97,100,105,110,103,32,33,33,10,0],"i8",k);h([67,117,114,114,101,110,116,108,121,32,117,110,115,117,112,112,111,114,116,101,100,32,98,105,116,32,100,101,112,116,104,32,58,32,37,115,10,0],"i8",k);ua=h([119,98,0],"i8",k);Xa=h([69,82,82,79,82,32,45,62,32,102,97,105,108,101,
100,32,116,111,32,111,112,101,110,32,37,115,32,102,111,114,32,119,114,105,116,105,110,103,10,0],"i8",k);tg=h([85,110,97,98,108,101,32,116,111,32,99,114,101,97,116,101,32,97,32,116,103,97,32,102,105,108,101,32,119,105,116,104,32,115,117,99,104,32,74,50,75,32,105,109,97,103,101,32,99,104,97,114,97,116,101,114,105,115,116,105,99,115,46,0],"i8",k);h([69,114,114,111,114,44,32,110,111,116,32,97,32,66,77,80,32,102,105,108,101,33,10,0],"i8",k);h([78,111,32,68,101,108,116,97,32,115,117,112,112,111,114,116,
101,100,10,0],"i8",k);h([79,116,104,101,114,32,115,121,115,116,101,109,32,116,104,97,110,32,50,52,32,98,105,116,115,47,112,105,120,101,108,115,32,111,114,32,56,32,98,105,116,115,32,40,110,111,32,82,76,69,32,99,111,100,105,110,103,41,32,105,115,32,110,111,116,32,121,101,116,32,105,109,112,108,101,109,101,110,116,101,100,32,91,37,100,93,10,0],"i8",k);Cc=h([66,77,0],"i8",k);M=h([37,99,37,99,37,99,37,99,0],"i8",k);tb=h([37,99,37,99,0],"i8",k);Dc=h([66,77,80,32,67,79,78,86,69,82,83,73,79,78,58,32,84,114,
117,110,99,97,116,105,110,103,32,99,111,109,112,111,110,101,110,116,32,48,32,102,114,111,109,32,37,100,32,98,105,116,115,32,116,111,32,56,32,98,105,116,115,10,0],"i8",k);ug=h([66,77,80,32,67,79,78,86,69,82,83,73,79,78,58,32,84,114,117,110,99,97,116,105,110,103,32,99,111,109,112,111,110,101,110,116,32,49,32,102,114,111,109,32,37,100,32,98,105,116,115,32,116,111,32,56,32,98,105,116,115,10,0],"i8",k);vg=h([66,77,80,32,67,79,78,86,69,82,83,73,79,78,58,32,84,114,117,110,99,97,116,105,110,103,32,99,111,
109,112,111,110,101,110,116,32,50,32,102,114,111,109,32,37,100,32,98,105,116,115,32,116,111,32,56,32,98,105,116,115,10,0],"i8",k);Ec=h([37,99,37,99,37,99,0],"i8",k);ub=h([37,99,0],"i8",k);h([70,97,105,108,101,100,32,116,111,32,111,112,101,110,32,37,115,32,102,111,114,32,114,101,97,100,105,110,103,32,33,10,0],"i8",k);h([80,71,37,91,32,9,93,37,99,37,99,37,91,32,9,43,45,93,37,100,37,91,32,9,93,37,100,37,91,32,9,93,37,100,0],"i8",k);h([66,97,100,32,112,103,120,32,104,101,97,100,101,114,44,32,112,108,
101,97,115,101,32,99,104,101,99,107,32,105,110,112,117,116,32,102,105,108,101,10,0],"i8",k);zg=h([69,82,82,79,82,32,45,62,32,73,109,112,111,115,115,105,98,108,101,32,104,97,112,112,101,110,46,0],"i8",k);wg=h([45,37,100,46,112,103,120,0],"i8",k);xg=h([46,112,103,120,0],"i8",k);yg=h([80,71,32,77,76,32,37,99,32,37,100,32,37,100,32,37,100,10,0],"i8",k);h([37,100,32,37,100,10,50,53,53,0],"i8",k);h([37,117,0],"i8",k);Ag=h([80,54,10,37,100,32,37,100,10,37,100,10,0],"i8",k);Bg=h([80,78,77,32,67,79,78,86,
69,82,83,73,79,78,58,32,84,114,117,110,99,97,116,105,110,103,32,99,111,109,112,111,110,101,110,116,32,48,32,102,114,111,109,32,37,100,32,98,105,116,115,32,116,111,32,56,32,98,105,116,115,10,0],"i8",k);Cg=h([80,78,77,32,67,79,78,86,69,82,83,73,79,78,58,32,84,114,117,110,99,97,116,105,110,103,32,99,111,109,112,111,110,101,110,116,32,49,32,102,114,111,109,32,37,100,32,98,105,116,115,32,116,111,32,56,32,98,105,116,115,10,0],"i8",k);Dg=h([80,78,77,32,67,79,78,86,69,82,83,73,79,78,58,32,84,114,117,110,
99,97,116,105,110,103,32,99,111,109,112,111,110,101,110,116,32,50,32,102,114,111,109,32,37,100,32,98,105,116,115,32,116,111,32,56,32,98,105,116,115,10,0],"i8",k);Eg=h([87,65,82,78,73,78,71,32,45,62,32,91,80,71,77,32,102,105,108,101,115,93,32,79,110,108,121,32,116,104,101,32,102,105,114,115,116,32,99,111,109,112,111,110,101,110,116,10,0],"i8",k);Fg=h([32,32,32,32,32,32,32,32,32,32,32,105,115,32,119,114,105,116,116,101,110,32,116,111,32,116,104,101,32,102,105,108,101,10,0],"i8",k);Gg=h([37,100,46,37,
115,0],"i8",k);Hg=h([37,115,0],"i8",k);Ig=h([80,53,10,37,100,32,37,100,10,37,100,10,0],"i8",k);Jg=h([80,78,77,32,67,79,78,86,69,82,83,73,79,78,58,32,84,114,117,110,99,97,116,105,110,103,32,99,111,109,112,111,110,101,110,116,32,37,100,32,102,114,111,109,32,37,100,32,98,105,116,115,32,116,111,32,56,32,98,105,116,115,10,0],"i8",k);Kg=h([10,69,114,114,111,114,58,32,105,110,118,97,108,105,100,32,114,97,119,32,105,109,97,103,101,32,112,97,114,97,109,101,116,101,114,115,10,0],"i8",k);h([80,108,101,97,115,
101,32,117,115,101,32,116,104,101,32,70,111,114,109,97,116,32,111,112,116,105,111,110,32,45,70,58,10,0],"i8",k);h([45,70,32,114,97,119,87,105,100,116,104,44,114,97,119,72,101,105,103,104,116,44,114,97,119,67,111,109,112,44,114,97,119,66,105,116,68,101,112,116,104,44,115,47,117,32,40,83,105,103,110,101,100,47,85,110,115,105,103,110,101,100,41,10,0],"i8",k);h([69,120,97,109,112,108,101,58,32,45,105,32,108,101,110,97,46,114,97,119,32,45,111,32,108,101,110,97,46,106,50,107,32,45,70,32,53,49,50,44,53,
49,50,44,51,44,56,44,117,10,0],"i8",k);h([65,98,111,114,116,105,110,103,10,0],"i8",k);h([69,114,114,111,114,32,114,101,97,100,105,110,103,32,114,97,119,32,102,105,108,101,46,32,69,110,100,32,111,102,32,102,105,108,101,32,112,114,111,98,97,98,108,121,32,114,101,97,99,104,101,100,46,10,0],"i8",k);h([79,112,101,110,74,80,69,71,32,99,97,110,110,111,116,32,101,110,99,111,100,101,32,114,97,119,32,99,111,109,112,111,110,101,110,116,115,32,119,105,116,104,32,98,105,116,32,100,101,112,116,104,32,104,105,103,
104,101,114,32,116,104,97,110,32,49,54,32,98,105,116,115,46,10,0],"i8",k);h([87,97,114,110,105,110,103,46,32,69,110,100,32,111,102,32,114,97,119,32,102,105,108,101,32,110,111,116,32,114,101,97,99,104,101,100,46,46,46,32,112,114,111,99,101,115,115,105,110,103,32,97,110,121,119,97,121,10,0],"i8",k);Rg=h([70,97,105,108,101,100,32,116,111,32,111,112,101,110,32,37,115,32,102,111,114,32,119,114,105,116,105,110,103,32,33,33,10,0],"i8",k);Lg=h([82,97,119,32,105,109,97,103,101,32,99,104,97,114,97,99,116,101,
114,105,115,116,105,99,115,58,32,37,100,32,99,111,109,112,111,110,101,110,116,115,10,0],"i8",k);Mg=h([67,111,109,112,111,110,101,110,116,32,37,100,32,99,104,97,114,97,99,116,101,114,105,115,116,105,99,115,58,32,37,100,120,37,100,120,37,100,32,37,115,10,0],"i8",k);Ng=h([115,105,103,110,101,100,0],"i8",k);Og=h([117,110,115,105,103,110,101,100,0],"i8",k);Pg=h([77,111,114,101,32,116,104,97,110,32,49,54,32,98,105,116,115,32,112,101,114,32,99,111,109,112,111,110,101,110,116,32,110,111,32,104,97,110,100,
108,101,100,32,121,101,116,10,0],"i8",k);Qg=h([69,114,114,111,114,58,32,105,110,118,97,108,105,100,32,112,114,101,99,105,115,105,111,110,58,32,37,100,10,0],"i8",k);h([112,110,103,116,111,105,109,97,103,101,58,32,99,97,110,32,110,111,116,32,111,112,101,110,32,37,115,10,0],"i8",k);h([137,80,78,71,13,10,26,10,0],"i8",k);h([112,110,103,116,111,105,109,97,103,101,58,32,37,115,32,105,115,32,110,111,32,118,97,108,105,100,32,80,78,71,32,102,105,108,101,10,0],"i8",k);Tg=h([49,46,50,46,52,54,0],"i8",k);Sg=
h([105,109,97,103,101,116,111,112,110,103,58,32,99,97,110,32,110,111,116,32,99,114,101,97,116,101,32,37,115,10,9,119,114,111,110,103,32,98,105,116,95,100,101,112,116,104,32,37,100,10,0],"i8",k);Yg=h([105,109,97,103,101,116,111,112,110,103,58,32,99,97,110,32,110,111,116,32,99,114,101,97,116,101,32,37,115,10,0],"i8",k);Zg=h([119,0],"i8",k);yh=h([102,97,105,108,101,100,32,116,111,32,111,112,101,110,32,105,110,100,101,120,32,102,105,108,101,32,91,37,115,93,32,102,111,114,32,119,114,105,116,105,110,103,
10,0],"i8",k);Nb=h([37,100,32,37,100,10,0],"i8",k);va=h([37,100,10,0],"i8",k);$g=h([91,37,100,44,37,100,93,32,0],"i8",k);ea=h([10,0],"i8",k);ah=h([10,73,78,70,79,32,79,78,32,84,73,76,69,83,10,0],"i8",k);bh=h([116,105,108,101,110,111,32,115,116,97,114,116,95,112,111,115,32,32,101,110,100,95,104,100,32,32,101,110,100,95,116,105,108,101,32,32,32,110,98,112,97,114,116,115,0],"i8",k);ch=h([32,32,32,32,32,32,32,32,32,100,105,115,116,111,0],"i8",k);dh=h([32,32,32,32,32,110,98,112,105,120,0],"i8",k);eh=h([32,
32,100,105,115,116,111,47,110,98,112,105,120,0],"i8",k);fh=h([37,52,100,32,37,57,100,32,37,57,100,32,37,57,100,32,37,57,100,0],"i8",k);Gc=h([32,37,57,101,0],"i8",k);gh=h([32,37,57,100,0],"i8",k);hh=h([10,84,73,76,69,32,37,100,32,68,69,84,65,73,76,83,10,0],"i8",k);ih=h([112,97,114,116,95,110,98,32,116,105,108,101,110,111,32,32,115,116,97,114,116,95,112,97,99,107,32,110,117,109,95,112,97,99,107,115,32,32,115,116,97,114,116,95,112,111,115,32,101,110,100,95,116,112,104,95,112,111,115,32,32,32,101,110,
100,95,112,111,115,10,0],"i8",k);jh=h([37,52,100,32,37,57,100,32,32,32,37,57,100,32,37,57,100,32,32,37,57,100,32,37,49,49,100,32,37,57,100,10,0],"i8",k);kh=h([76,82,67,80,10,112,97,99,107,95,110,98,32,116,105,108,101,110,111,32,108,97,121,110,111,32,114,101,115,110,111,32,99,111,109,112,110,111,32,112,114,101,99,110,111,32,115,116,97,114,116,95,112,111,115,32,101,110,100,95,112,104,95,112,111,115,32,101,110,100,95,112,111,115,0],"i8",k);Ya=h([32,100,105,115,116,111,0],"i8",k);lh=h([37,52,100,32,37,
54,100,32,37,55,100,32,37,53,100,32,37,54,100,32,32,37,54,100,32,32,32,32,37,54,100,32,32,32,32,32,37,54,100,32,37,55,100,0],"i8",k);Za=h([32,37,56,101,0],"i8",k);mh=h([82,76,67,80,10,112,97,99,107,95,110,98,32,116,105,108,101,110,111,32,114,101,115,110,111,32,108,97,121,110,111,32,99,111,109,112,110,111,32,112,114,101,99,110,111,32,115,116,97,114,116,95,112,111,115,32,101,110,100,95,112,104,95,112,111,115,32,101,110,100,95,112,111,115,10,0],"i8",k);nh=h([37,52,100,32,37,54,100,32,37,53,100,32,37,
55,100,32,37,54,100,32,37,54,100,32,37,57,100,32,32,32,37,57,100,32,37,55,100,0],"i8",k);oh=h([82,80,67,76,10,112,97,99,107,95,110,98,32,116,105,108,101,110,111,32,114,101,115,110,111,32,112,114,101,99,110,111,32,99,111,109,112,110,111,32,108,97,121,110,111,32,115,116,97,114,116,95,112,111,115,32,101,110,100,95,112,104,95,112,111,115,32,101,110,100,95,112,111,115,0],"i8",k);ph=h([37,52,100,32,37,54,100,32,37,53,100,32,37,54,100,32,37,54,100,32,37,55,100,32,37,57,100,32,32,32,37,57,100,32,37,55,100,
0],"i8",k);qh=h([80,67,82,76,10,112,97,99,107,95,110,98,32,116,105,108,101,110,111,32,112,114,101,99,110,111,32,99,111,109,112,110,111,32,114,101,115,110,111,32,108,97,121,110,111,32,115,116,97,114,116,95,112,111,115,32,101,110,100,95,112,104,95,112,111,115,32,101,110,100,95,112,111,115,0],"i8",k);Hc=h([37,52,100,32,37,54,100,32,37,54,100,32,37,54,100,32,37,53,100,32,37,55,100,32,37,57,100,32,32,32,37,57,100,32,37,55,100,0],"i8",k);rh=h([67,80,82,76,10,112,97,99,107,95,110,98,32,116,105,108,101,110,
111,32,99,111,109,112,110,111,32,112,114,101,99,110,111,32,114,101,115,110,111,32,108,97,121,110,111,32,115,116,97,114,116,95,112,111,115,32,101,110,100,95,112,104,95,112,111,115,32,101,110,100,95,112,111,115,0],"i8",k);sh=h([37,56,101,10,0],"i8",k);th=h([37,46,56,101,10,0],"i8",k);uh=h([10,77,65,82,75,69,82,32,76,73,83,84,10,0],"i8",k);vh=h([116,121,112,101,9,115,116,97,114,116,95,112,111,115,32,32,32,32,108,101,110,103,116,104,10,0],"i8",k);wh=h([37,88,9,37,57,100,32,37,57,100,10,0],"i8",k);xh=
h([71,101,110,101,114,97,116,101,100,32,105,110,100,101,120,32,102,105,108,101,32,37,115,10,0],"i8",k);Ch=h([37,115,58,37,100,58,99,111,108,111,114,95,115,121,99,99,95,116,111,95,114,103,98,10,9,67,65,78,32,78,79,84,32,67,79,78,86,69,82,84,10,0],"i8",k);Dh=h([47,104,111,109,101,47,97,108,111,110,47,68,101,118,47,106,50,107,46,106,115,47,99,111,109,109,111,110,47,99,111,108,111,114,46,99,0],"i8",k);wb=h([1],["i32",0,0,0,0],k);J=h([1],["i32",0,0,0,0],k);ci=h(1,"i8*",k);di=h(1,"i8",k);h(1,"i32",k);vb=
h(1,"i32",k);h([37,115,58,32,105,108,108,101,103,97,108,32,111,112,116,105,111,110,32,45,45,32,37,99,10,0],"i8",k);aa=h(1,"i8*",k);h([37,115,58,32,111,112,116,105,111,110,32,114,101,113,117,105,114,101,115,32,97,110,32,97,114,103,117,109,101,110,116,32,45,45,32,37,99,10,0],"i8",k);Ic=h(1,"i32",k);$a=h(1,"i32",k);Fh=h([37,115,58,32,111,112,116,105,111,110,32,100,111,101,115,32,110,111,116,32,114,101,113,117,105,114,101,32,97,110,32,97,114,103,117,109,101,110,116,46,32,73,103,110,111,114,105,110,103,
32,37,115,10,0],"i8",k);Ob=h([37,115,58,32,111,112,116,105,111,110,32,114,101,113,117,105,114,101,115,32,97,110,32,97,114,103,117,109,101,110,116,10,0],"i8",k);Gh=h([37,115,58,32,111,112,116,105,111,110,32,114,101,113,117,105,114,101,115,32,97,110,32,97,114,103,117,109,101,110,116,32,10,0],"i8",k);Jc=h([73,110,118,97,108,105,100,32,111,112,116,105,111,110,32,37,115,10,0],"i8",k);Eh=h([73,110,118,97,108,105,100,32,111,112,116,105,111,110,10,0],"i8",k);a[i+8>>2]=i+32;a[i+12>>2]=i+48;a[i+24>>2]=i+48;
a[i+28>>2]=i+32;a[i+40>>2]=i+64;a[i+44>>2]=i+192;a[i+56>>2]=i+80;a[i+60>>2]=i+208;a[i+72>>2]=i+96;a[i+76>>2]=i+288;a[i+88>>2]=i+112;a[i+92>>2]=i+304;a[i+104>>2]=i+128;a[i+108>>2]=i+384;a[i+120>>2]=i+144;a[i+124>>2]=i+400;a[i+136>>2]=i+160;a[i+140>>2]=i+928;a[i+152>>2]=i+176;a[i+156>>2]=i+944;a[i+168>>2]=i+1216;a[i+172>>2]=i+1056;a[i+184>>2]=i+1232;a[i+188>>2]=i+1072;a[i+200>>2]=i+224;a[i+204>>2]=i+208;a[i+216>>2]=i+240;a[i+220>>2]=i+192;a[i+232>>2]=i+256;a[i+236>>2]=i+448;a[i+248>>2]=i+272;a[i+252>>
2]=i+464;a[i+264>>2]=i+288;a[i+268>>2]=i+448;a[i+280>>2]=i+304;a[i+284>>2]=i+464;a[i+296>>2]=i+320;a[i+300>>2]=i+448;a[i+312>>2]=i+336;a[i+316>>2]=i+464;a[i+328>>2]=i+352;a[i+332>>2]=i+544;a[i+344>>2]=i+368;a[i+348>>2]=i+560;a[i+360>>2]=i+384;a[i+364>>2]=i+576;a[i+376>>2]=i+400;a[i+380>>2]=i+592;a[i+392>>2]=i+416;a[i+396>>2]=i+640;a[i+408>>2]=i+432;a[i+412>>2]=i+656;a[i+424>>2]=i+928;a[i+428>>2]=i+672;a[i+440>>2]=i+944;a[i+444>>2]=i+688;a[i+456>>2]=i+480;a[i+460>>2]=i+464;a[i+472>>2]=i+496;a[i+476>>
2]=i+448;a[i+488>>2]=i+512;a[i+492>>2]=i+448;a[i+504>>2]=i+528;a[i+508>>2]=i+464;a[i+520>>2]=i+544;a[i+524>>2]=i+480;a[i+536>>2]=i+560;a[i+540>>2]=i+496;a[i+552>>2]=i+576;a[i+556>>2]=i+512;a[i+568>>2]=i+592;a[i+572>>2]=i+528;a[i+584>>2]=i+608;a[i+588>>2]=i+544;a[i+600>>2]=i+624;a[i+604>>2]=i+560;a[i+616>>2]=i+640;a[i+620>>2]=i+576;a[i+632>>2]=i+656;a[i+636>>2]=i+592;a[i+648>>2]=i+672;a[i+652>>2]=i+608;a[i+664>>2]=i+688;a[i+668>>2]=i+624;a[i+680>>2]=i+704;a[i+684>>2]=i+608;a[i+696>>2]=i+720;a[i+700>>
2]=i+624;a[i+712>>2]=i+736;a[i+716>>2]=i+640;a[i+728>>2]=i+752;a[i+732>>2]=i+656;a[i+744>>2]=i+768;a[i+748>>2]=i+672;a[i+760>>2]=i+784;a[i+764>>2]=i+688;a[i+776>>2]=i+800;a[i+780>>2]=i+704;a[i+792>>2]=i+816;a[i+796>>2]=i+720;a[i+808>>2]=i+832;a[i+812>>2]=i+736;a[i+824>>2]=i+848;a[i+828>>2]=i+752;a[i+840>>2]=i+864;a[i+844>>2]=i+768;a[i+856>>2]=i+880;a[i+860>>2]=i+784;a[i+872>>2]=i+896;a[i+876>>2]=i+800;a[i+888>>2]=i+912;a[i+892>>2]=i+816;a[i+904>>2]=i+928;a[i+908>>2]=i+832;a[i+920>>2]=i+944;a[i+924>>
2]=i+848;a[i+936>>2]=i+960;a[i+940>>2]=i+864;a[i+952>>2]=i+976;a[i+956>>2]=i+880;a[i+968>>2]=i+992;a[i+972>>2]=i+896;a[i+984>>2]=i+1008;a[i+988>>2]=i+912;a[i+1E3>>2]=i+1024;a[i+1004>>2]=i+928;a[i+1016>>2]=i+1040;a[i+1020>>2]=i+944;a[i+1032>>2]=i+1056;a[i+1036>>2]=i+960;a[i+1048>>2]=i+1072;a[i+1052>>2]=i+976;a[i+1064>>2]=i+1088;a[i+1068>>2]=i+992;a[i+1080>>2]=i+1104;a[i+1084>>2]=i+1008;a[i+1096>>2]=i+1120;a[i+1100>>2]=i+1024;a[i+1112>>2]=i+1136;a[i+1116>>2]=i+1040;a[i+1128>>2]=i+1152;a[i+1132>>2]=
i+1056;a[i+1144>>2]=i+1168;a[i+1148>>2]=i+1072;a[i+1160>>2]=i+1184;a[i+1164>>2]=i+1088;a[i+1176>>2]=i+1200;a[i+1180>>2]=i+1104;a[i+1192>>2]=i+1216;a[i+1196>>2]=i+1120;a[i+1208>>2]=i+1232;a[i+1212>>2]=i+1136;a[i+1224>>2]=i+1248;a[i+1228>>2]=i+1152;a[i+1240>>2]=i+1264;a[i+1244>>2]=i+1168;a[i+1256>>2]=i+1280;a[i+1260>>2]=i+1184;a[i+1272>>2]=i+1296;a[i+1276>>2]=i+1200;a[i+1288>>2]=i+1312;a[i+1292>>2]=i+1216;a[i+1304>>2]=i+1328;a[i+1308>>2]=i+1232;a[i+1320>>2]=i+1344;a[i+1324>>2]=i+1248;a[i+1336>>2]=i+
1360;a[i+1340>>2]=i+1264;a[i+1352>>2]=i+1376;a[i+1356>>2]=i+1280;a[i+1368>>2]=i+1392;a[i+1372>>2]=i+1296;a[i+1384>>2]=i+1408;a[i+1388>>2]=i+1312;a[i+1400>>2]=i+1424;a[i+1404>>2]=i+1328;a[i+1416>>2]=i+1440;a[i+1420>>2]=i+1344;a[i+1432>>2]=i+1456;a[i+1436>>2]=i+1360;a[i+1448>>2]=i+1440;a[i+1452>>2]=i+1376;a[i+1464>>2]=i+1456;a[i+1468>>2]=i+1392;a[i+1480>>2]=i+1472;a[i+1484>>2]=i+1472;a[i+1496>>2]=i+1488;a[i+1500>>2]=i+1488;a[ca>>2]=sc;a[ca+4>>2]=Qh;a[ca+8>>2]=Rh;a[ca+12>>2]=tc;a[ca+16>>2]=uc;a[ca+20>>
2]=vc;a[ca+24>>2]=Hb;a[ca+28>>2]=Sh;a[ca+32>>2]=wc;a[ca+36>>2]=Th;a[ca+40>>2]=Uh;a[ca+44>>2]=Vh;a[ca+48>>2]=Wh;a[ca+52>>2]=Xh;a[Gb>>2]=Yh;a[Gb+16>>2]=Zh;a[ci>>2]=di;za=[0,0,function(c){fd(a[c>>2],a[c+4>>2],a[c+8>>2],a[c+12>>2])},0,function(a,d){o(d,$h,h([a,0,0,0],["i8*",0,0,0],n))},0,function(a,d){o(d,ai,h([a,0,0,0],["i8*",0,0,0],n))},0,function(c){o(a[a[x>>2]+8>>2],bi,h([c,0,0,0],["i8*",0,0,0],n))},0,function(c){a[c+4>>2]=2;if(((a[c+68>>2]|0)!=0?1:2)==1)a[a[c+68>>2]+76>>2]=R(a[c+72>>2])-2,a[a[c+
68>>2]+84>>2]=Ha(a[c+72>>2])+2-a[a[c+68>>2]+76>>2]},0,gd,0,hd,0,kb,0,md,0,od,0,pd,0,qd,0,function(c){var d,e,b,f,g;f=a[c+72>>2];g=a[c+60>>2];d=r(f,2);b=R(f);e=0;a:for(;;){if(!((e|0)<(a[g+16>>2]|0)))break a;ya(f,b);ic(c,e,d-2);e+=1}},0,function(c){var d,e,b;e=a[a[c+60>>2]+16>>2];b=a[c+72>>2];d=r(b,2);b=r(b,(e|0)<=256?1:2);ic(c,b,d-2-((e|0)<=256?1:2))},0,rd,0,sd,0,td,0,function(c){var d,c=a[c+72>>2];d=r(c,2);r(c,1);d-=3;a:for(;;){if(!((d|0)>0))break a;r(c,1);d-=1}},0,ud,0,vd,0,function(c){var d,e;d=
a[c+72>>2];e=a[a[c+60>>2]+16>>2];r(d,2);c=0;a:for(;;){if(!((c|0)<(e|0)))break a;r(d,2);r(d,2);c+=1}},0,function(c){var c=a[c+72>>2],d=r(c,2);ra(c,d-2)},0,function(c){F(a[c>>2],2,Ph,h(1,"i32",n))},0];G.FUNCTION_TABLE=za;G.run=Lc;try{s.V=Y}catch(zi){}G.noInitialRun=I;if(!G.noInitialRun)var xi=Lc();D(xb=="jp2"||xb=="j2k","You must specify the suffix as a second parameter. Is this a .j2k or a .jp2 file?");s.o();s.root.write=I;s.N("/","image."+xb,ei,I,Y);Lc(["-i","image."+xb,"-o","image.raw"]);return xi=
{width:Xb(Ac,"i32"),height:Xb(Bc,"i32"),data:s.root.b["image.raw"].b}};


/*viewer/ext/kinetic/kinetic-v5.1.1-06.10.min.js*/

/*! KineticJS v5.1.1 2014-06-10 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
var Kinetic={};!function(a){var b=Math.PI/180;Kinetic={version:"5.1.1",stages:[],idCounter:0,ids:{},names:{},shapes:{},listenClickTap:!1,inDblClickWindow:!1,enableTrace:!1,traceArrMax:100,dblClickWindow:400,pixelRatio:void 0,dragDistance:0,angleDeg:!0,showWarnings:!0,Filters:{},Node:function(a){this._init(a)},Shape:function(a){this.__init(a)},Container:function(a){this.__init(a)},Stage:function(a){this.___init(a)},BaseLayer:function(a){this.___init(a)},Layer:function(a){this.____init(a)},FastLayer:function(a){this.____init(a)},Group:function(a){this.___init(a)},isDragging:function(){var a=Kinetic.DD;return a?a.isDragging:!1},isDragReady:function(){var a=Kinetic.DD;return a?!!a.node:!1},_addId:function(a,b){void 0!==b&&(this.ids[b]=a)},_removeId:function(a){void 0!==a&&delete this.ids[a]},_addName:function(a,b){void 0!==b&&(void 0===this.names[b]&&(this.names[b]=[]),this.names[b].push(a))},_removeName:function(a,b){if(void 0!==a){var c=this.names[a];if(void 0!==c){for(var d=0;d<c.length;d++){var e=c[d];e._id===b&&c.splice(d,1)}0===c.length&&delete this.names[a]}}},getAngle:function(a){return this.angleDeg?a*b:a},_parseUA:function(a){var b=a.toLowerCase(),c=/(chrome)[ \/]([\w.]+)/.exec(b)||/(webkit)[ \/]([\w.]+)/.exec(b)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b)||/(msie) ([\w.]+)/.exec(b)||b.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b)||[],d=!!a.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i),e=!!a.match(/IEMobile/i);return{browser:c[1]||"",version:c[2]||"0",mobile:d,ieMobile:e}},UA:void 0},Kinetic.UA=Kinetic._parseUA(a.navigator&&a.navigator.userAgent||"")}(this),function(a,b){if("object"==typeof exports){var c=b();if(global.window===global)Kinetic.document=global.document,Kinetic.window=global;else{var d=require("canvas"),e=require("jsdom").jsdom,f=e("<!DOCTYPE html><html><head></head><body></body></html>");Kinetic.document=f,Kinetic.window=Kinetic.document.createWindow(),Kinetic.window.Image=d.Image,Kinetic._nodeCanvas=d}return Kinetic.root=a,void(module.exports=c)}"function"==typeof define&&define.amd&&define(b),Kinetic.document=document,Kinetic.window=window,Kinetic.root=a}(this,function(){return Kinetic}),function(){Kinetic.Collection=function(){var a=[].slice.call(arguments),b=a.length,c=0;for(this.length=b;b>c;c++)this[c]=a[c];return this},Kinetic.Collection.prototype=[],Kinetic.Collection.prototype.each=function(a){for(var b=0;b<this.length;b++)a(this[b],b)},Kinetic.Collection.prototype.toArray=function(){var a,b=[],c=this.length;for(a=0;c>a;a++)b.push(this[a]);return b},Kinetic.Collection.toCollection=function(a){var b,c=new Kinetic.Collection,d=a.length;for(b=0;d>b;b++)c.push(a[b]);return c},Kinetic.Collection._mapMethod=function(a){Kinetic.Collection.prototype[a]=function(){var b,c=this.length,d=[].slice.call(arguments);for(b=0;c>b;b++)this[b][a].apply(this[b],d);return this}},Kinetic.Collection.mapMethods=function(a){var b=a.prototype;for(var c in b)Kinetic.Collection._mapMethod(c)},Kinetic.Transform=function(a){this.m=a&&a.slice()||[1,0,0,1,0,0]},Kinetic.Transform.prototype={copy:function(){return new Kinetic.Transform(this.m)},point:function(a){var b=this.m;return{x:b[0]*a.x+b[2]*a.y+b[4],y:b[1]*a.x+b[3]*a.y+b[5]}},translate:function(a,b){return this.m[4]+=this.m[0]*a+this.m[2]*b,this.m[5]+=this.m[1]*a+this.m[3]*b,this},scale:function(a,b){return this.m[0]*=a,this.m[1]*=a,this.m[2]*=b,this.m[3]*=b,this},rotate:function(a){var b=Math.cos(a),c=Math.sin(a),d=this.m[0]*b+this.m[2]*c,e=this.m[1]*b+this.m[3]*c,f=this.m[0]*-c+this.m[2]*b,g=this.m[1]*-c+this.m[3]*b;return this.m[0]=d,this.m[1]=e,this.m[2]=f,this.m[3]=g,this},getTranslation:function(){return{x:this.m[4],y:this.m[5]}},skew:function(a,b){var c=this.m[0]+this.m[2]*b,d=this.m[1]+this.m[3]*b,e=this.m[2]+this.m[0]*a,f=this.m[3]+this.m[1]*a;return this.m[0]=c,this.m[1]=d,this.m[2]=e,this.m[3]=f,this},multiply:function(a){var b=this.m[0]*a.m[0]+this.m[2]*a.m[1],c=this.m[1]*a.m[0]+this.m[3]*a.m[1],d=this.m[0]*a.m[2]+this.m[2]*a.m[3],e=this.m[1]*a.m[2]+this.m[3]*a.m[3],f=this.m[0]*a.m[4]+this.m[2]*a.m[5]+this.m[4],g=this.m[1]*a.m[4]+this.m[3]*a.m[5]+this.m[5];return this.m[0]=b,this.m[1]=c,this.m[2]=d,this.m[3]=e,this.m[4]=f,this.m[5]=g,this},invert:function(){var a=1/(this.m[0]*this.m[3]-this.m[1]*this.m[2]),b=this.m[3]*a,c=-this.m[1]*a,d=-this.m[2]*a,e=this.m[0]*a,f=a*(this.m[2]*this.m[5]-this.m[3]*this.m[4]),g=a*(this.m[1]*this.m[4]-this.m[0]*this.m[5]);return this.m[0]=b,this.m[1]=c,this.m[2]=d,this.m[3]=e,this.m[4]=f,this.m[5]=g,this},getMatrix:function(){return this.m},setAbsolutePosition:function(a,b){var c=this.m[0],d=this.m[1],e=this.m[2],f=this.m[3],g=this.m[4],h=this.m[5],i=(c*(b-h)-d*(a-g))/(c*f-d*e),j=(a-g-e*i)/c;return this.translate(j,i)}};var a="2d",b="[object Array]",c="[object Number]",d="[object String]",e=Math.PI/180,f=180/Math.PI,g="#",h="",i="0",j="Kinetic warning: ",k="Kinetic error: ",l="rgb(",m={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},n=/rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;Kinetic.Util={_isElement:function(a){return!(!a||1!=a.nodeType)},_isFunction:function(a){return!!(a&&a.constructor&&a.call&&a.apply)},_isObject:function(a){return!!a&&a.constructor==Object},_isArray:function(a){return Object.prototype.toString.call(a)==b},_isNumber:function(a){return Object.prototype.toString.call(a)==c},_isString:function(a){return Object.prototype.toString.call(a)==d},_throttle:function(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:(new Date).getTime(),g=null,f=a.apply(d,e),d=e=null};return function(){var j=(new Date).getTime();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,0>=k?(clearTimeout(g),g=null,h=j,f=a.apply(d,e),d=e=null):g||c.trailing===!1||(g=setTimeout(i,k)),f}},_hasMethods:function(a){var b,c=[];for(b in a)this._isFunction(a[b])&&c.push(b);return c.length>0},createCanvasElement:function(){var a=Kinetic.document.createElement("canvas");return a.style=a.style||{},a},isBrowser:function(){return"object"!=typeof exports},_isInDocument:function(a){for(;a=a.parentNode;)if(a==Kinetic.document)return!0;return!1},_simplifyArray:function(a){var b,c,d=[],e=a.length,f=Kinetic.Util;for(b=0;e>b;b++)c=a[b],f._isNumber(c)?c=Math.round(1e3*c)/1e3:f._isString(c)||(c=c.toString()),d.push(c);return d},_getImage:function(b,c){var d,e;if(b)if(this._isElement(b))c(b);else if(this._isString(b))d=new Kinetic.window.Image,d.onload=function(){c(d)},d.src=b;else if(b.data){e=Kinetic.Util.createCanvasElement(),e.width=b.width,e.height=b.height;var f=e.getContext(a);f.putImageData(b,0,0),this._getImage(e.toDataURL(),c)}else c(null);else c(null)},_getRGBAString:function(a){var b=a.red||0,c=a.green||0,d=a.blue||0,e=a.alpha||1;return["rgba(",b,",",c,",",d,",",e,")"].join(h)},_rgbToHex:function(a,b,c){return((1<<24)+(a<<16)+(b<<8)+c).toString(16).slice(1)},_hexToRgb:function(a){a=a.replace(g,h);var b=parseInt(a,16);return{r:b>>16&255,g:b>>8&255,b:255&b}},getRandomColor:function(){for(var a=(16777215*Math.random()<<0).toString(16);a.length<6;)a=i+a;return g+a},get:function(a,b){return void 0===a?b:a},getRGB:function(a){var b;return a in m?(b=m[a],{r:b[0],g:b[1],b:b[2]}):a[0]===g?this._hexToRgb(a.substring(1)):a.substr(0,4)===l?(b=n.exec(a.replace(/ /g,"")),{r:parseInt(b[1],10),g:parseInt(b[2],10),b:parseInt(b[3],10)}):{r:0,g:0,b:0}},_merge:function(a,b){var c=this._clone(b);for(var d in a)c[d]=this._isObject(a[d])?this._merge(a[d],c[d]):a[d];return c},cloneObject:function(a){var b={};for(var c in a)b[c]=this._isObject(a[c])?this.cloneObject(a[c]):this._isArray(a[c])?this.cloneArray(a[c]):a[c];return b},cloneArray:function(a){return a.slice(0)},_degToRad:function(a){return a*e},_radToDeg:function(a){return a*f},_capitalize:function(a){return a.charAt(0).toUpperCase()+a.slice(1)},error:function(a){throw new Error(k+a)},warn:function(a){Kinetic.root.console&&console.warn&&Kinetic.showWarnings&&console.warn(j+a)},extend:function(a,b){for(var c in b.prototype)c in a.prototype||(a.prototype[c]=b.prototype[c])},addMethods:function(a,b){var c;for(c in b)a.prototype[c]=b[c]},_getControlPoints:function(a,b,c,d,e,f,g){var h=Math.sqrt(Math.pow(c-a,2)+Math.pow(d-b,2)),i=Math.sqrt(Math.pow(e-c,2)+Math.pow(f-d,2)),j=g*h/(h+i),k=g*i/(h+i),l=c-j*(e-a),m=d-j*(f-b),n=c+k*(e-a),o=d+k*(f-b);return[l,m,n,o]},_expandPoints:function(a,b){var c,d,e=a.length,f=[];for(c=2;e-2>c;c+=2)d=Kinetic.Util._getControlPoints(a[c-2],a[c-1],a[c],a[c+1],a[c+2],a[c+3],b),f.push(d[0]),f.push(d[1]),f.push(a[c]),f.push(a[c+1]),f.push(d[2]),f.push(d[3]);return f},_removeLastLetter:function(a){return a.substring(0,a.length-1)}}}(),function(){var a=Kinetic.Util.createCanvasElement(),b=a.getContext("2d"),c=Kinetic.UA.mobile?function(){var a=window.devicePixelRatio||1,c=b.webkitBackingStorePixelRatio||b.mozBackingStorePixelRatio||b.msBackingStorePixelRatio||b.oBackingStorePixelRatio||b.backingStorePixelRatio||1;return a/c}():1;Kinetic.Canvas=function(a){this.init(a)},Kinetic.Canvas.prototype={init:function(a){a=a||{};var b=a.pixelRatio||Kinetic.pixelRatio||c;this.pixelRatio=b,this._canvas=Kinetic.Util.createCanvasElement(),this._canvas.style.padding=0,this._canvas.style.margin=0,this._canvas.style.border=0,this._canvas.style.background="transparent",this._canvas.style.position="absolute",this._canvas.style.top=0,this._canvas.style.left=0},getContext:function(){return this.context},getPixelRatio:function(){return this.pixelRatio},setPixelRatio:function(a){this.pixelRatio=a,this.setSize(this.getWidth(),this.getHeight())},setWidth:function(a){this.width=this._canvas.width=a*this.pixelRatio,this._canvas.style.width=a+"px"},setHeight:function(a){this.height=this._canvas.height=a*this.pixelRatio,this._canvas.style.height=a+"px"},getWidth:function(){return this.width},getHeight:function(){return this.height},setSize:function(a,b){this.setWidth(a),this.setHeight(b)},toDataURL:function(a,b){try{return this._canvas.toDataURL(a,b)}catch(c){try{return this._canvas.toDataURL()}catch(d){return Kinetic.Util.warn("Unable to get data URL. "+d.message),""}}}},Kinetic.SceneCanvas=function(a){a=a||{};var b=a.width||0,c=a.height||0;Kinetic.Canvas.call(this,a),this.context=new Kinetic.SceneContext(this),this.setSize(b,c)},Kinetic.SceneCanvas.prototype={setWidth:function(a){var b=this.pixelRatio,c=this.getContext()._context;Kinetic.Canvas.prototype.setWidth.call(this,a),c.scale(b,b)},setHeight:function(a){var b=this.pixelRatio,c=this.getContext()._context;Kinetic.Canvas.prototype.setHeight.call(this,a),c.scale(b,b)}},Kinetic.Util.extend(Kinetic.SceneCanvas,Kinetic.Canvas),Kinetic.HitCanvas=function(a){a=a||{};var b=a.width||0,c=a.height||0;Kinetic.Canvas.call(this,a),this.context=new Kinetic.HitContext(this),this.setSize(b,c)},Kinetic.Util.extend(Kinetic.HitCanvas,Kinetic.Canvas)}(),function(){var a=",",b="(",c=")",d="([",e="])",f=";",g="()",h="=",i=["arc","arcTo","beginPath","bezierCurveTo","clearRect","clip","closePath","createLinearGradient","createPattern","createRadialGradient","drawImage","fill","fillText","getImageData","createImageData","lineTo","moveTo","putImageData","quadraticCurveTo","rect","restore","rotate","save","scale","setLineDash","setTransform","stroke","strokeText","transform","translate"];Kinetic.Context=function(a){this.init(a)},Kinetic.Context.prototype={init:function(a){this.canvas=a,this._context=a._canvas.getContext("2d"),Kinetic.enableTrace&&(this.traceArr=[],this._enableTrace())},fillShape:function(a){a.getFillEnabled()&&this._fill(a)},strokeShape:function(a){a.getStrokeEnabled()&&this._stroke(a)},fillStrokeShape:function(a){var b=a.getFillEnabled();b&&this._fill(a),a.getStrokeEnabled()&&this._stroke(a)},getTrace:function(i){var j,k,l,m,n=this.traceArr,o=n.length,p="";for(j=0;o>j;j++)k=n[j],l=k.method,l?(m=k.args,p+=l,p+=i?g:Kinetic.Util._isArray(m[0])?d+m.join(a)+e:b+m.join(a)+c):(p+=k.property,i||(p+=h+k.val)),p+=f;return p},clearTrace:function(){this.traceArr=[]},_trace:function(a){var b,c=this.traceArr;c.push(a),b=c.length,b>=Kinetic.traceArrMax&&c.shift()},reset:function(){var a=this.getCanvas().getPixelRatio();this.setTransform(1*a,0,0,1*a,0,0)},getCanvas:function(){return this.canvas},clear:function(a){var b=this.getCanvas();a?this.clearRect(a.x||0,a.y||0,a.width||0,a.height||0):this.clearRect(0,0,b.getWidth(),b.getHeight())},_applyLineCap:function(a){var b=a.getLineCap();b&&this.setAttr("lineCap",b)},_applyOpacity:function(a){var b=a.getAbsoluteOpacity();1!==b&&this.setAttr("globalAlpha",b)},_applyLineJoin:function(a){var b=a.getLineJoin();b&&this.setAttr("lineJoin",b)},setAttr:function(a,b){this._context[a]=b},arc:function(){var a=arguments;this._context.arc(a[0],a[1],a[2],a[3],a[4],a[5])},beginPath:function(){this._context.beginPath()},bezierCurveTo:function(){var a=arguments;this._context.bezierCurveTo(a[0],a[1],a[2],a[3],a[4],a[5])},clearRect:function(){var a=arguments;this._context.clearRect(a[0],a[1],a[2],a[3])},clip:function(){this._context.clip()},closePath:function(){this._context.closePath()},createImageData:function(){var a=arguments;return 2===a.length?this._context.createImageData(a[0],a[1]):1===a.length?this._context.createImageData(a[0]):void 0},createLinearGradient:function(){var a=arguments;return this._context.createLinearGradient(a[0],a[1],a[2],a[3])},createPattern:function(){var a=arguments;return this._context.createPattern(a[0],a[1])},createRadialGradient:function(){var a=arguments;return this._context.createRadialGradient(a[0],a[1],a[2],a[3],a[4],a[5])},drawImage:function(){var a=arguments,b=this._context;3===a.length?b.drawImage(a[0],a[1],a[2]):5===a.length?b.drawImage(a[0],a[1],a[2],a[3],a[4]):9===a.length&&b.drawImage(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8])},fill:function(){this._context.fill()},fillText:function(){var a=arguments;this._context.fillText(a[0],a[1],a[2])},getImageData:function(){var a=arguments;return this._context.getImageData(a[0],a[1],a[2],a[3])},lineTo:function(){var a=arguments;this._context.lineTo(a[0],a[1])},moveTo:function(){var a=arguments;this._context.moveTo(a[0],a[1])},rect:function(){var a=arguments;this._context.rect(a[0],a[1],a[2],a[3])},putImageData:function(){var a=arguments;this._context.putImageData(a[0],a[1],a[2])},quadraticCurveTo:function(){var a=arguments;this._context.quadraticCurveTo(a[0],a[1],a[2],a[3])},restore:function(){this._context.restore()},rotate:function(){var a=arguments;this._context.rotate(a[0])},save:function(){this._context.save()},scale:function(){var a=arguments;this._context.scale(a[0],a[1])},setLineDash:function(){var a=arguments,b=this._context;this._context.setLineDash?b.setLineDash(a[0]):"mozDash"in b?b.mozDash=a[0]:"webkitLineDash"in b&&(b.webkitLineDash=a[0])},setTransform:function(){var a=arguments;this._context.setTransform(a[0],a[1],a[2],a[3],a[4],a[5])},stroke:function(){this._context.stroke()},strokeText:function(){var a=arguments;this._context.strokeText(a[0],a[1],a[2])},transform:function(){var a=arguments;this._context.transform(a[0],a[1],a[2],a[3],a[4],a[5])},translate:function(){var a=arguments;this._context.translate(a[0],a[1])},_enableTrace:function(){var a,b,c=this,d=i.length,e=Kinetic.Util._simplifyArray,f=this.setAttr,g=function(a){var d,f=c[a];c[a]=function(){return b=e(Array.prototype.slice.call(arguments,0)),d=f.apply(c,arguments),c._trace({method:a,args:b}),d}};for(a=0;d>a;a++)g(i[a]);c.setAttr=function(){f.apply(c,arguments),c._trace({property:arguments[0],val:arguments[1]})}}},Kinetic.SceneContext=function(a){Kinetic.Context.call(this,a)},Kinetic.SceneContext.prototype={_fillColor:function(a){var b=a.fill()||Kinetic.Util._getRGBAString({red:a.fillRed(),green:a.fillGreen(),blue:a.fillBlue(),alpha:a.fillAlpha()});this.setAttr("fillStyle",b),a._fillFunc(this)},_fillPattern:function(a){var b=a.getFillPatternImage(),c=a.getFillPatternX(),d=a.getFillPatternY(),e=a.getFillPatternScale(),f=Kinetic.getAngle(a.getFillPatternRotation()),g=a.getFillPatternOffset(),h=a.getFillPatternRepeat();(c||d)&&this.translate(c||0,d||0),f&&this.rotate(f),e&&this.scale(e.x,e.y),g&&this.translate(-1*g.x,-1*g.y),this.setAttr("fillStyle",this.createPattern(b,h||"repeat")),this.fill()},_fillLinearGradient:function(a){var b=a.getFillLinearGradientStartPoint(),c=a.getFillLinearGradientEndPoint(),d=a.getFillLinearGradientColorStops(),e=this.createLinearGradient(b.x,b.y,c.x,c.y);if(d){for(var f=0;f<d.length;f+=2)e.addColorStop(d[f],d[f+1]);this.setAttr("fillStyle",e),this.fill()}},_fillRadialGradient:function(a){for(var b=a.getFillRadialGradientStartPoint(),c=a.getFillRadialGradientEndPoint(),d=a.getFillRadialGradientStartRadius(),e=a.getFillRadialGradientEndRadius(),f=a.getFillRadialGradientColorStops(),g=this.createRadialGradient(b.x,b.y,d,c.x,c.y,e),h=0;h<f.length;h+=2)g.addColorStop(f[h],f[h+1]);this.setAttr("fillStyle",g),this.fill()},_fill:function(a){var b=a.fill()||a.fillRed()||a.fillGreen()||a.fillBlue(),c=a.getFillPatternImage(),d=a.getFillLinearGradientColorStops(),e=a.getFillRadialGradientColorStops(),f=a.getFillPriority();b&&"color"===f?this._fillColor(a):c&&"pattern"===f?this._fillPattern(a):d&&"linear-gradient"===f?this._fillLinearGradient(a):e&&"radial-gradient"===f?this._fillRadialGradient(a):b?this._fillColor(a):c?this._fillPattern(a):d?this._fillLinearGradient(a):e&&this._fillRadialGradient(a)},_stroke:function(a){var b=a.dash(),c=a.getStrokeScaleEnabled();a.hasStroke()&&(c||(this.save(),this.setTransform(1,0,0,1,0,0)),this._applyLineCap(a),b&&a.dashEnabled()&&this.setLineDash(b),this.setAttr("lineWidth",a.strokeWidth()),this.setAttr("strokeStyle",a.stroke()||Kinetic.Util._getRGBAString({red:a.strokeRed(),green:a.strokeGreen(),blue:a.strokeBlue(),alpha:a.strokeAlpha()})),a._strokeFunc(this),c||this.restore())},_applyShadow:function(a){var b=Kinetic.Util,c=a.getAbsoluteOpacity(),d=b.get(a.getShadowColor(),"black"),e=b.get(a.getShadowBlur(),5),f=b.get(a.getShadowOpacity(),1),g=b.get(a.getShadowOffset(),{x:0,y:0});f&&this.setAttr("globalAlpha",f*c),this.setAttr("shadowColor",d),this.setAttr("shadowBlur",e),this.setAttr("shadowOffsetX",g.x),this.setAttr("shadowOffsetY",g.y)}},Kinetic.Util.extend(Kinetic.SceneContext,Kinetic.Context),Kinetic.HitContext=function(a){Kinetic.Context.call(this,a)},Kinetic.HitContext.prototype={_fill:function(a){this.save(),this.setAttr("fillStyle",a.colorKey),a._fillFuncHit(this),this.restore()},_stroke:function(a){a.hasStroke()&&(this._applyLineCap(a),this.setAttr("lineWidth",a.strokeWidth()),this.setAttr("strokeStyle",a.colorKey),a._strokeFuncHit(this))}},Kinetic.Util.extend(Kinetic.HitContext,Kinetic.Context)}(),function(){var a="get",b="set";Kinetic.Factory={addGetterSetter:function(a,b,c,d,e){this.addGetter(a,b,c),this.addSetter(a,b,d,e),this.addOverloadedGetterSetter(a,b)},addGetter:function(b,c,d){var e=a+Kinetic.Util._capitalize(c);b.prototype[e]=function(){var a=this.attrs[c];return void 0===a?d:a}},addSetter:function(a,c,d,e){var f=b+Kinetic.Util._capitalize(c);a.prototype[f]=function(a){return d&&(a=d.call(this,a)),this._setAttr(c,a),e&&e.call(this),this}},addComponentsGetterSetter:function(c,d,e,f,g){var h,i,j=e.length,k=Kinetic.Util._capitalize,l=a+k(d),m=b+k(d);c.prototype[l]=function(){var a={};for(h=0;j>h;h++)i=e[h],a[i]=this.getAttr(d+k(i));return a},c.prototype[m]=function(a){var b,c=this.attrs[d];f&&(a=f.call(this,a));for(b in a)this._setAttr(d+k(b),a[b]);return this._fireChangeEvent(d,c,a),g&&g.call(this),this},this.addOverloadedGetterSetter(c,d)},addOverloadedGetterSetter:function(c,d){var e=Kinetic.Util._capitalize(d),f=b+e,g=a+e;c.prototype[d]=function(){return arguments.length?(this[f](arguments[0]),this):this[g]()}},backCompat:function(a,b){var c;for(c in b)a.prototype[c]=a.prototype[b[c]]},afterSetFilter:function(){this._filterUpToDate=!1}},Kinetic.Validators={RGBComponent:function(a){return a>255?255:0>a?0:Math.round(a)},alphaComponent:function(a){return a>1?1:1e-4>a?1e-4:a}}}(),function(){var a="absoluteOpacity",b="absoluteTransform",c="Change",d="children",e=".",f="",g="get",h="id",i="kinetic",j="listening",k="mouseenter",l="mouseleave",m="name",n="set",o="Shape",p=" ",q="stage",r="transform",s="Stage",t="visible",u=["id"],v=["xChange.kinetic","yChange.kinetic","scaleXChange.kinetic","scaleYChange.kinetic","skewXChange.kinetic","skewYChange.kinetic","rotationChange.kinetic","offsetXChange.kinetic","offsetYChange.kinetic","transformsEnabledChange.kinetic"].join(p);Kinetic.Util.addMethods(Kinetic.Node,{_init:function(c){var d=this;this._id=Kinetic.idCounter++,this.eventListeners={},this.attrs={},this._cache={},this._filterUpToDate=!1,this.setAttrs(c),this.on(v,function(){this._clearCache(r),d._clearSelfAndDescendantCache(b)}),this.on("visibleChange.kinetic",function(){d._clearSelfAndDescendantCache(t)}),this.on("listeningChange.kinetic",function(){d._clearSelfAndDescendantCache(j)}),this.on("opacityChange.kinetic",function(){d._clearSelfAndDescendantCache(a)})},_clearCache:function(a){a?delete this._cache[a]:this._cache={}},_getCache:function(a,b){var c=this._cache[a];return void 0===c&&(this._cache[a]=b.call(this)),this._cache[a]},_clearSelfAndDescendantCache:function(a){this._clearCache(a),this.children&&this.getChildren().each(function(b){b._clearSelfAndDescendantCache(a)})},clearCache:function(){return delete this._cache.canvas,this._filterUpToDate=!1,this},cache:function(a){{var b=a||{},c=b.x||0,d=b.y||0,e=b.width||this.width(),f=b.height||this.height(),g=b.drawBorder||!1;this.getLayer()}if(0===e||0===f)return void Kinetic.Util.warn("Width or height of caching configuration equals 0. Cache is ignored.");var h=new Kinetic.SceneCanvas({pixelRatio:1,width:e,height:f}),i=new Kinetic.SceneCanvas({pixelRatio:1,width:e,height:f}),j=new Kinetic.HitCanvas({width:e,height:f}),k=(this.transformsEnabled(),this.x(),this.y(),h.getContext()),l=j.getContext();return j.isCache=!0,this.clearCache(),k.save(),l.save(),g&&(k.save(),k.beginPath(),k.rect(0,0,e,f),k.closePath(),k.setAttr("strokeStyle","red"),k.setAttr("lineWidth",5),k.stroke(),k.restore()),k.translate(-1*c,-1*d),l.translate(-1*c,-1*d),"Shape"===this.nodeType&&(k.translate(-1*this.x(),-1*this.y()),l.translate(-1*this.x(),-1*this.y())),this.drawScene(h,this),this.drawHit(j,this),k.restore(),l.restore(),this._cache.canvas={scene:h,filter:i,hit:j},this},_drawCachedSceneCanvas:function(a){a.save(),this.getLayer()._applyTransform(this,a),a._applyOpacity(this),a.drawImage(this._getCachedSceneCanvas()._canvas,0,0),a.restore()},_getCachedSceneCanvas:function(){var a,b,c,d,e=this.filters(),f=this._cache.canvas,g=f.scene,h=f.filter,i=h.getContext();if(e){if(!this._filterUpToDate){try{for(a=e.length,i.clear(),i.drawImage(g._canvas,0,0),b=i.getImageData(0,0,h.getWidth(),h.getHeight()),c=0;a>c;c++)d=e[c],d.call(this,b),i.putImageData(b,0,0)}catch(j){Kinetic.Util.warn("Unable to apply filter. "+j.message)}this._filterUpToDate=!0}return h}return g},_drawCachedHitCanvas:function(a){var b=this._cache.canvas,c=b.hit;a.save(),this.getLayer()._applyTransform(this,a),a.drawImage(c._canvas,0,0),a.restore()},on:function(a,b){var c,d,g,h,i,j=a.split(p),k=j.length;for(c=0;k>c;c++)d=j[c],g=d.split(e),h=g[0],i=g[1]||f,this.eventListeners[h]||(this.eventListeners[h]=[]),this.eventListeners[h].push({name:i,handler:b});return this},off:function(a){var b,c,d,f,g,h,i=(a||"").split(p),j=i.length;if(!a)for(c in this.eventListeners)this._off(c);for(b=0;j>b;b++)if(d=i[b],f=d.split(e),g=f[0],h=f[1],g)this.eventListeners[g]&&this._off(g,h);else for(c in this.eventListeners)this._off(c,h);return this},dispatchEvent:function(a){var b={target:this,type:a.type,evt:a};this.fire(a.type,b)},addEventListener:function(a,b){this.on(a,function(a){b.call(this,a.evt)})},removeEventListener:function(a){this.off(a)},remove:function(){var c=this.getParent();return c&&c.children&&(c.children.splice(this.index,1),c._setChildrenIndices(),delete this.parent),this._clearSelfAndDescendantCache(q),this._clearSelfAndDescendantCache(b),this._clearSelfAndDescendantCache(t),this._clearSelfAndDescendantCache(j),this._clearSelfAndDescendantCache(a),this},destroy:function(){Kinetic._removeId(this.getId()),Kinetic._removeName(this.getName(),this._id),this.remove()},getAttr:function(a){var b=g+Kinetic.Util._capitalize(a);return Kinetic.Util._isFunction(this[b])?this[b]():this.attrs[a]},getAncestors:function(){for(var a=this.getParent(),b=new Kinetic.Collection;a;)b.push(a),a=a.getParent();return b},getAttrs:function(){return this.attrs||{}},setAttrs:function(a){var b,c;if(a)for(b in a)b===d||(c=n+Kinetic.Util._capitalize(b),Kinetic.Util._isFunction(this[c])?this[c](a[b]):this._setAttr(b,a[b]));return this},isListening:function(){return this._getCache(j,this._isListening)},_isListening:function(){var a=this.getListening(),b=this.getParent();return"inherit"===a?b?b.isListening():!0:a},isVisible:function(){return this._getCache(t,this._isVisible)},_isVisible:function(){var a=this.getVisible(),b=this.getParent();return"inherit"===a?b?b.isVisible():!0:a},shouldDrawHit:function(a){var b=this.getLayer();return a&&a.isCache||b&&b.hitGraphEnabled()&&this.isListening()&&this.isVisible()&&!Kinetic.isDragging()},show:function(){return this.setVisible(!0),this},hide:function(){return this.setVisible(!1),this},getZIndex:function(){return this.index||0},getAbsoluteZIndex:function(){function a(i){for(b=[],c=i.length,d=0;c>d;d++)e=i[d],h++,e.nodeType!==o&&(b=b.concat(e.getChildren().toArray())),e._id===g._id&&(d=c);b.length>0&&b[0].getDepth()<=f&&a(b)}var b,c,d,e,f=this.getDepth(),g=this,h=0;return g.nodeType!==s&&a(g.getStage().getChildren()),h},getDepth:function(){for(var a=0,b=this.parent;b;)a++,b=b.parent;return a},setPosition:function(a){return this.setX(a.x),this.setY(a.y),this},getPosition:function(){return{x:this.getX(),y:this.getY()}},getAbsolutePosition:function(){var a=this.getAbsoluteTransform().getMatrix(),b=new Kinetic.Transform,c=this.offset();return b.m=a.slice(),b.translate(c.x,c.y),b.getTranslation()},setAbsolutePosition:function(a){var b,c=this._clearTransform();return this.attrs.x=c.x,this.attrs.y=c.y,delete c.x,delete c.y,b=this.getAbsoluteTransform(),b.invert(),b.translate(a.x,a.y),a={x:this.attrs.x+b.getTranslation().x,y:this.attrs.y+b.getTranslation().y},this.setPosition({x:a.x,y:a.y}),this._setTransform(c),this},_setTransform:function(a){var c;for(c in a)this.attrs[c]=a[c];this._clearCache(r),this._clearSelfAndDescendantCache(b)},_clearTransform:function(){var a={x:this.getX(),y:this.getY(),rotation:this.getRotation(),scaleX:this.getScaleX(),scaleY:this.getScaleY(),offsetX:this.getOffsetX(),offsetY:this.getOffsetY(),skewX:this.getSkewX(),skewY:this.getSkewY()};return this.attrs.x=0,this.attrs.y=0,this.attrs.rotation=0,this.attrs.scaleX=1,this.attrs.scaleY=1,this.attrs.offsetX=0,this.attrs.offsetY=0,this.attrs.skewX=0,this.attrs.skewY=0,this._clearCache(r),this._clearSelfAndDescendantCache(b),a},move:function(a){var b=a.x,c=a.y,d=this.getX(),e=this.getY();return void 0!==b&&(d+=b),void 0!==c&&(e+=c),this.setPosition({x:d,y:e}),this},_eachAncestorReverse:function(a,b){var c,d,e=[],f=this.getParent();if(b&&b._id===this._id)return a(this),!0;for(e.unshift(this);f&&(!b||f._id!==b._id);)e.unshift(f),f=f.parent;for(c=e.length,d=0;c>d;d++)a(e[d])},rotate:function(a){return this.setRotation(this.getRotation()+a),this},moveToTop:function(){if(!this.parent)return void Kinetic.Util.warn("Node has no parent. moveToTop function is ignored.");var a=this.index;return this.parent.children.splice(a,1),this.parent.children.push(this),this.parent._setChildrenIndices(),!0},moveUp:function(){if(!this.parent)return void Kinetic.Util.warn("Node has no parent. moveUp function is ignored.");var a=this.index,b=this.parent.getChildren().length;return b-1>a?(this.parent.children.splice(a,1),this.parent.children.splice(a+1,0,this),this.parent._setChildrenIndices(),!0):!1},moveDown:function(){if(!this.parent)return void Kinetic.Util.warn("Node has no parent. moveDown function is ignored.");var a=this.index;return a>0?(this.parent.children.splice(a,1),this.parent.children.splice(a-1,0,this),this.parent._setChildrenIndices(),!0):!1},moveToBottom:function(){if(!this.parent)return void Kinetic.Util.warn("Node has no parent. moveToBottom function is ignored.");var a=this.index;return a>0?(this.parent.children.splice(a,1),this.parent.children.unshift(this),this.parent._setChildrenIndices(),!0):!1},setZIndex:function(a){if(!this.parent)return void Kinetic.Util.warn("Node has no parent. zIndex parameter is ignored.");var b=this.index;return this.parent.children.splice(b,1),this.parent.children.splice(a,0,this),this.parent._setChildrenIndices(),this},getAbsoluteOpacity:function(){return this._getCache(a,this._getAbsoluteOpacity)},_getAbsoluteOpacity:function(){var a=this.getOpacity();return this.getParent()&&(a*=this.getParent().getAbsoluteOpacity()),a},moveTo:function(a){return Kinetic.Node.prototype.remove.call(this),a.add(this),this},toObject:function(){var a,b,c,d,e=Kinetic.Util,f={},g=this.getAttrs();f.attrs={};for(a in g)b=g[a],e._isFunction(b)||e._isElement(b)||e._isObject(b)&&e._hasMethods(b)||(c=this[a],delete g[a],d=c?c.call(this):null,g[a]=b,d!==b&&(f.attrs[a]=b));return f.className=this.getClassName(),f},toJSON:function(){return JSON.stringify(this.toObject())},getParent:function(){return this.parent},getLayer:function(){var a=this.getParent();return a?a.getLayer():null},getStage:function(){return this._getCache(q,this._getStage)},_getStage:function(){var a=this.getParent();return a?a.getStage():void 0},fire:function(a,b,c){return c?this._fireAndBubble(a,b||{}):this._fire(a,b||{}),this},getAbsoluteTransform:function(a){return a?this._getAbsoluteTransform(a):this._getCache(b,this._getAbsoluteTransform)},_getAbsoluteTransform:function(a){var b,c,d=new Kinetic.Transform;return this._eachAncestorReverse(function(a){b=a.transformsEnabled(),c=a.getTransform(),"all"===b?d.multiply(c):"position"===b&&d.translate(a.x(),a.y())},a),d},getTransform:function(){return this._getCache(r,this._getTransform)},_getTransform:function(){var a=new Kinetic.Transform,b=this.getX(),c=this.getY(),d=Kinetic.getAngle(this.getRotation()),e=this.getScaleX(),f=this.getScaleY(),g=this.getSkewX(),h=this.getSkewY(),i=this.getOffsetX(),j=this.getOffsetY();return(0!==b||0!==c)&&a.translate(b,c),0!==d&&a.rotate(d),(0!==g||0!==h)&&a.skew(g,h),(1!==e||1!==f)&&a.scale(e,f),(0!==i||0!==j)&&a.translate(-1*i,-1*j),a},clone:function(a){var b,c,d,e,f,g=this.getClassName(),h=Kinetic.Util.cloneObject(this.attrs);for(var j in u){var k=u[j];delete h[k]}for(b in a)h[b]=a[b];var l=new Kinetic[g](h);for(b in this.eventListeners)for(c=this.eventListeners[b],d=c.length,e=0;d>e;e++)f=c[e],f.name.indexOf(i)<0&&(l.eventListeners[b]||(l.eventListeners[b]=[]),l.eventListeners[b].push(f));return l},toDataURL:function(a){a=a||{};var b=a.mimeType||null,c=a.quality||null,d=this.getStage(),e=a.x||0,f=a.y||0,g=new Kinetic.SceneCanvas({width:a.width||this.getWidth()||(d?d.getWidth():0),height:a.height||this.getHeight()||(d?d.getHeight():0),pixelRatio:1}),h=g.getContext();return h.save(),(e||f)&&h.translate(-1*e,-1*f),this.drawScene(g),h.restore(),g.toDataURL(b,c)},toImage:function(a){Kinetic.Util._getImage(this.toDataURL(a),function(b){a.callback(b)})},setSize:function(a){return this.setWidth(a.width),this.setHeight(a.height),this},getSize:function(){return{width:this.getWidth(),height:this.getHeight()}},getWidth:function(){return this.attrs.width||0},getHeight:function(){return this.attrs.height||0},getClassName:function(){return this.className||this.nodeType},getType:function(){return this.nodeType},getDragDistance:function(){return void 0!==this.attrs.dragDistance?this.attrs.dragDistance:this.parent?this.parent.getDragDistance():Kinetic.dragDistance},_get:function(a){return this.className===a||this.nodeType===a?[this]:[]
},_off:function(a,b){var c,d,e=this.eventListeners[a];for(c=0;c<e.length;c++)if(d=e[c].name,!("kinetic"===d&&"kinetic"!==b||b&&d!==b)){if(e.splice(c,1),0===e.length){delete this.eventListeners[a];break}c--}},_fireChangeEvent:function(a,b,d){this._fire(a+c,{oldVal:b,newVal:d})},setId:function(a){var b=this.getId();return Kinetic._removeId(b),Kinetic._addId(this,a),this._setAttr(h,a),this},setName:function(a){var b=this.getName();return Kinetic._removeName(b,this._id),Kinetic._addName(this,a),this._setAttr(m,a),this},setAttr:function(){var a=Array.prototype.slice.call(arguments),b=a[0],c=a[1],d=n+Kinetic.Util._capitalize(b),e=this[d];return Kinetic.Util._isFunction(e)?e.call(this,c):this._setAttr(b,c),this},_setAttr:function(a,b){var c;void 0!==b&&(c=this.attrs[a],this.attrs[a]=b,this._fireChangeEvent(a,c,b))},_setComponentAttr:function(a,b,c){var d;void 0!==c&&(d=this.attrs[a],d||(this.attrs[a]=this.getAttr(a)),this.attrs[a][b]=c,this._fireChangeEvent(a,d,c))},_fireAndBubble:function(a,b,c){var d=!0;if(b&&this.nodeType===o&&(b.target=this),a===k&&c&&(this._id===c._id||this.isAncestorOf&&this.isAncestorOf(c))?d=!1:a===l&&c&&(this._id===c._id||this.isAncestorOf&&this.isAncestorOf(c))&&(d=!1),d){this._fire(a,b);var e=(a===k||a===l)&&(c&&c.isAncestorOf&&c.isAncestorOf(this)||!(!c||!c.isAncestorOf));b&&!b.cancelBubble&&this.parent&&this.parent.isListening()&&!e&&(c&&c.parent?this._fireAndBubble.call(this.parent,a,b,c.parent):this._fireAndBubble.call(this.parent,a,b))}},_fire:function(a,b){var c,d=this.eventListeners[a];if(b.type=a,d)for(c=0;c<d.length;c++)d[c].handler.call(this,b)},draw:function(){return this.drawScene(),this.drawHit(),this}}),Kinetic.Node.create=function(a,b){return this._createNode(JSON.parse(a),b)},Kinetic.Node._createNode=function(a,b){var c,d,e,f=Kinetic.Node.prototype.getClassName.call(a),g=a.children;if(b&&(a.attrs.container=b),c=new Kinetic[f](a.attrs),g)for(d=g.length,e=0;d>e;e++)c.add(this._createNode(g[e]));return c},Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node,"position"),Kinetic.Factory.addGetterSetter(Kinetic.Node,"x",0),Kinetic.Factory.addGetterSetter(Kinetic.Node,"y",0),Kinetic.Factory.addGetterSetter(Kinetic.Node,"opacity",1),Kinetic.Factory.addGetter(Kinetic.Node,"name"),Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node,"name"),Kinetic.Factory.addGetter(Kinetic.Node,"id"),Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node,"id"),Kinetic.Factory.addGetterSetter(Kinetic.Node,"rotation",0),Kinetic.Factory.addComponentsGetterSetter(Kinetic.Node,"scale",["x","y"]),Kinetic.Factory.addGetterSetter(Kinetic.Node,"scaleX",1),Kinetic.Factory.addGetterSetter(Kinetic.Node,"scaleY",1),Kinetic.Factory.addComponentsGetterSetter(Kinetic.Node,"skew",["x","y"]),Kinetic.Factory.addGetterSetter(Kinetic.Node,"skewX",0),Kinetic.Factory.addGetterSetter(Kinetic.Node,"skewY",0),Kinetic.Factory.addComponentsGetterSetter(Kinetic.Node,"offset",["x","y"]),Kinetic.Factory.addGetterSetter(Kinetic.Node,"offsetX",0),Kinetic.Factory.addGetterSetter(Kinetic.Node,"offsetY",0),Kinetic.Factory.addSetter(Kinetic.Node,"dragDistance"),Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node,"dragDistance"),Kinetic.Factory.addSetter(Kinetic.Node,"width",0),Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node,"width"),Kinetic.Factory.addSetter(Kinetic.Node,"height",0),Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node,"height"),Kinetic.Factory.addGetterSetter(Kinetic.Node,"listening","inherit"),Kinetic.Factory.addGetterSetter(Kinetic.Node,"filters",void 0,function(a){return this._filterUpToDate=!1,a}),Kinetic.Factory.addGetterSetter(Kinetic.Node,"visible","inherit"),Kinetic.Factory.addGetterSetter(Kinetic.Node,"transformsEnabled","all"),Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node,"size"),Kinetic.Factory.backCompat(Kinetic.Node,{rotateDeg:"rotate",setRotationDeg:"setRotation",getRotationDeg:"getRotation"}),Kinetic.Collection.mapMethods(Kinetic.Node)}(),function(){Kinetic.Filters.Grayscale=function(a){var b,c,d=a.data,e=d.length;for(b=0;e>b;b+=4)c=.34*d[b]+.5*d[b+1]+.16*d[b+2],d[b]=c,d[b+1]=c,d[b+2]=c}}(),function(){Kinetic.Filters.Brighten=function(a){var b,c=255*this.brightness(),d=a.data,e=d.length;for(b=0;e>b;b+=4)d[b]+=c,d[b+1]+=c,d[b+2]+=c},Kinetic.Factory.addGetterSetter(Kinetic.Node,"brightness",0,null,Kinetic.Factory.afterSetFilter)}(),function(){Kinetic.Filters.Invert=function(a){var b,c=a.data,d=c.length;for(b=0;d>b;b+=4)c[b]=255-c[b],c[b+1]=255-c[b+1],c[b+2]=255-c[b+2]}}(),function(){function a(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null}function b(b,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D=b.data,E=b.width,F=b.height,G=e+e+1,H=E-1,I=F-1,J=e+1,K=J*(J+1)/2,L=new a,M=null,N=L,O=null,P=null,Q=c[e],R=d[e];for(h=1;G>h;h++)N=N.next=new a,h==J&&(M=N);for(N.next=L,l=k=0,g=0;F>g;g++){for(u=v=w=x=m=n=o=p=0,q=J*(y=D[k]),r=J*(z=D[k+1]),s=J*(A=D[k+2]),t=J*(B=D[k+3]),m+=K*y,n+=K*z,o+=K*A,p+=K*B,N=L,h=0;J>h;h++)N.r=y,N.g=z,N.b=A,N.a=B,N=N.next;for(h=1;J>h;h++)i=k+((h>H?H:h)<<2),m+=(N.r=y=D[i])*(C=J-h),n+=(N.g=z=D[i+1])*C,o+=(N.b=A=D[i+2])*C,p+=(N.a=B=D[i+3])*C,u+=y,v+=z,w+=A,x+=B,N=N.next;for(O=L,P=M,f=0;E>f;f++)D[k+3]=B=p*Q>>R,0!==B?(B=255/B,D[k]=(m*Q>>R)*B,D[k+1]=(n*Q>>R)*B,D[k+2]=(o*Q>>R)*B):D[k]=D[k+1]=D[k+2]=0,m-=q,n-=r,o-=s,p-=t,q-=O.r,r-=O.g,s-=O.b,t-=O.a,i=l+((i=f+e+1)<H?i:H)<<2,u+=O.r=D[i],v+=O.g=D[i+1],w+=O.b=D[i+2],x+=O.a=D[i+3],m+=u,n+=v,o+=w,p+=x,O=O.next,q+=y=P.r,r+=z=P.g,s+=A=P.b,t+=B=P.a,u-=y,v-=z,w-=A,x-=B,P=P.next,k+=4;l+=E}for(f=0;E>f;f++){for(v=w=x=u=n=o=p=m=0,k=f<<2,q=J*(y=D[k]),r=J*(z=D[k+1]),s=J*(A=D[k+2]),t=J*(B=D[k+3]),m+=K*y,n+=K*z,o+=K*A,p+=K*B,N=L,h=0;J>h;h++)N.r=y,N.g=z,N.b=A,N.a=B,N=N.next;for(j=E,h=1;e>=h;h++)k=j+f<<2,m+=(N.r=y=D[k])*(C=J-h),n+=(N.g=z=D[k+1])*C,o+=(N.b=A=D[k+2])*C,p+=(N.a=B=D[k+3])*C,u+=y,v+=z,w+=A,x+=B,N=N.next,I>h&&(j+=E);for(k=f,O=L,P=M,g=0;F>g;g++)i=k<<2,D[i+3]=B=p*Q>>R,B>0?(B=255/B,D[i]=(m*Q>>R)*B,D[i+1]=(n*Q>>R)*B,D[i+2]=(o*Q>>R)*B):D[i]=D[i+1]=D[i+2]=0,m-=q,n-=r,o-=s,p-=t,q-=O.r,r-=O.g,s-=O.b,t-=O.a,i=f+((i=g+J)<I?i:I)*E<<2,m+=u+=O.r=D[i],n+=v+=O.g=D[i+1],o+=w+=O.b=D[i+2],p+=x+=O.a=D[i+3],O=O.next,q+=y=P.r,r+=z=P.g,s+=A=P.b,t+=B=P.a,u-=y,v-=z,w-=A,x-=B,P=P.next,k+=E}}var c=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],d=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];Kinetic.Filters.Blur=function(a){var c=Math.round(this.blurRadius());c>0&&b(a,c)},Kinetic.Factory.addGetterSetter(Kinetic.Node,"blurRadius",0,null,Kinetic.Factory.afterSetFilter)}(),function(){function a(a,b,c){var d=4*(c*a.width+b),e=[];return e.push(a.data[d++],a.data[d++],a.data[d++],a.data[d++]),e}function b(a,b){return Math.sqrt(Math.pow(a[0]-b[0],2)+Math.pow(a[1]-b[1],2)+Math.pow(a[2]-b[2],2))}function c(a){for(var b=[0,0,0],c=0;c<a.length;c++)b[0]+=a[c][0],b[1]+=a[c][1],b[2]+=a[c][2];return b[0]/=a.length,b[1]/=a.length,b[2]/=a.length,b}function d(d,e){var f=a(d,0,0),g=a(d,d.width-1,0),h=a(d,0,d.height-1),i=a(d,d.width-1,d.height-1),j=e||10;if(b(f,g)<j&&b(g,i)<j&&b(i,h)<j&&b(h,f)<j){for(var k=c([g,f,i,h]),l=[],m=0;m<d.width*d.height;m++){var n=b(k,[d.data[4*m],d.data[4*m+1],d.data[4*m+2]]);l[m]=j>n?0:255}return l}}function e(a,b){for(var c=0;c<a.width*a.height;c++)a.data[4*c+3]=b[c]}function f(a,b,c){for(var d=[1,1,1,1,0,1,1,1,1],e=Math.round(Math.sqrt(d.length)),f=Math.floor(e/2),g=[],h=0;c>h;h++)for(var i=0;b>i;i++){for(var j=h*b+i,k=0,l=0;e>l;l++)for(var m=0;e>m;m++){var n=h+l-f,o=i+m-f;if(n>=0&&c>n&&o>=0&&b>o){var p=n*b+o,q=d[l*e+m];k+=a[p]*q}}g[j]=2040===k?255:0}return g}function g(a,b,c){for(var d=[1,1,1,1,1,1,1,1,1],e=Math.round(Math.sqrt(d.length)),f=Math.floor(e/2),g=[],h=0;c>h;h++)for(var i=0;b>i;i++){for(var j=h*b+i,k=0,l=0;e>l;l++)for(var m=0;e>m;m++){var n=h+l-f,o=i+m-f;if(n>=0&&c>n&&o>=0&&b>o){var p=n*b+o,q=d[l*e+m];k+=a[p]*q}}g[j]=k>=1020?255:0}return g}function h(a,b,c){for(var d=[1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9],e=Math.round(Math.sqrt(d.length)),f=Math.floor(e/2),g=[],h=0;c>h;h++)for(var i=0;b>i;i++){for(var j=h*b+i,k=0,l=0;e>l;l++)for(var m=0;e>m;m++){var n=h+l-f,o=i+m-f;if(n>=0&&c>n&&o>=0&&b>o){var p=n*b+o,q=d[l*e+m];k+=a[p]*q}}g[j]=k}return g}Kinetic.Filters.Mask=function(a){var b=this.threshold(),c=d(a,b);return c&&(c=f(c,a.width,a.height),c=g(c,a.width,a.height),c=h(c,a.width,a.height),e(a,c)),a},Kinetic.Factory.addGetterSetter(Kinetic.Node,"threshold",0,null,Kinetic.Factory.afterSetFilter)}(),function(){Kinetic.Filters.RGB=function(a){var b,c,d=a.data,e=d.length,f=this.red(),g=this.green(),h=this.blue();for(b=0;e>b;b+=4)c=(.34*d[b]+.5*d[b+1]+.16*d[b+2])/255,d[b]=c*f,d[b+1]=c*g,d[b+2]=c*h,d[b+3]=d[b+3]},Kinetic.Factory.addGetterSetter(Kinetic.Node,"red",0,function(a){return this._filterUpToDate=!1,a>255?255:0>a?0:Math.round(a)}),Kinetic.Factory.addGetterSetter(Kinetic.Node,"green",0,function(a){return this._filterUpToDate=!1,a>255?255:0>a?0:Math.round(a)}),Kinetic.Factory.addGetterSetter(Kinetic.Node,"blue",0,Kinetic.Validators.RGBComponent,Kinetic.Factory.afterSetFilter)}(),function(){Kinetic.Filters.HSV=function(a){var b,c,d,e,f,g=a.data,h=g.length,i=Math.pow(2,this.value()),j=Math.pow(2,this.saturation()),k=Math.abs(this.hue()+360)%360,l=i*j*Math.cos(k*Math.PI/180),m=i*j*Math.sin(k*Math.PI/180),n=.299*i+.701*l+.167*m,o=.587*i-.587*l+.33*m,p=.114*i-.114*l-.497*m,q=.299*i-.299*l-.328*m,r=.587*i+.413*l+.035*m,s=.114*i-.114*l+.293*m,t=.299*i-.3*l+1.25*m,u=.587*i-.586*l-1.05*m,v=.114*i+.886*l-.2*m;for(b=0;h>b;b+=4)c=g[b+0],d=g[b+1],e=g[b+2],f=g[b+3],g[b+0]=n*c+o*d+p*e,g[b+1]=q*c+r*d+s*e,g[b+2]=t*c+u*d+v*e,g[b+3]=f},Kinetic.Factory.addGetterSetter(Kinetic.Node,"hue",0,null,Kinetic.Factory.afterSetFilter),Kinetic.Factory.addGetterSetter(Kinetic.Node,"saturation",0,null,Kinetic.Factory.afterSetFilter),Kinetic.Factory.addGetterSetter(Kinetic.Node,"value",0,null,Kinetic.Factory.afterSetFilter)}(),function(){Kinetic.Factory.addGetterSetter(Kinetic.Node,"hue",0,null,Kinetic.Factory.afterSetFilter),Kinetic.Factory.addGetterSetter(Kinetic.Node,"saturation",0,null,Kinetic.Factory.afterSetFilter),Kinetic.Factory.addGetterSetter(Kinetic.Node,"luminance",0,null,Kinetic.Factory.afterSetFilter),Kinetic.Filters.HSL=function(a){var b,c,d,e,f,g=a.data,h=g.length,i=1,j=Math.pow(2,this.saturation()),k=Math.abs(this.hue()+360)%360,l=127*this.luminance(),m=i*j*Math.cos(k*Math.PI/180),n=i*j*Math.sin(k*Math.PI/180),o=.299*i+.701*m+.167*n,p=.587*i-.587*m+.33*n,q=.114*i-.114*m-.497*n,r=.299*i-.299*m-.328*n,s=.587*i+.413*m+.035*n,t=.114*i-.114*m+.293*n,u=.299*i-.3*m+1.25*n,v=.587*i-.586*m-1.05*n,w=.114*i+.886*m-.2*n;for(b=0;h>b;b+=4)c=g[b+0],d=g[b+1],e=g[b+2],f=g[b+3],g[b+0]=o*c+p*d+q*e+l,g[b+1]=r*c+s*d+t*e+l,g[b+2]=u*c+v*d+w*e+l,g[b+3]=f}}(),function(){Kinetic.Filters.Emboss=function(a){var b=10*this.embossStrength(),c=255*this.embossWhiteLevel(),d=this.embossDirection(),e=this.embossBlend(),f=0,g=0,h=a.data,i=a.width,j=a.height,k=4*i,l=j;switch(d){case"top-left":f=-1,g=-1;break;case"top":f=-1,g=0;break;case"top-right":f=-1,g=1;break;case"right":f=0,g=1;break;case"bottom-right":f=1,g=1;break;case"bottom":f=1,g=0;break;case"bottom-left":f=1,g=-1;break;case"left":f=0,g=-1}do{var m=(l-1)*k,n=f;1>l+n&&(n=0),l+n>j&&(n=0);var o=(l-1+n)*i*4,p=i;do{var q=m+4*(p-1),r=g;1>p+r&&(r=0),p+r>i&&(r=0);var s=o+4*(p-1+r),t=h[q]-h[s],u=h[q+1]-h[s+1],v=h[q+2]-h[s+2],w=t,x=w>0?w:-w,y=u>0?u:-u,z=v>0?v:-v;if(y>x&&(w=u),z>x&&(w=v),w*=b,e){var A=h[q]+w,B=h[q+1]+w,C=h[q+2]+w;h[q]=A>255?255:0>A?0:A,h[q+1]=B>255?255:0>B?0:B,h[q+2]=C>255?255:0>C?0:C}else{var D=c-w;0>D?D=0:D>255&&(D=255),h[q]=h[q+1]=h[q+2]=D}}while(--p)}while(--l)},Kinetic.Factory.addGetterSetter(Kinetic.Node,"embossStrength",.5,null,Kinetic.Factory.afterSetFilter),Kinetic.Factory.addGetterSetter(Kinetic.Node,"embossWhiteLevel",.5,null,Kinetic.Factory.afterSetFilter),Kinetic.Factory.addGetterSetter(Kinetic.Node,"embossDirection","top-left",null,Kinetic.Factory.afterSetFilter),Kinetic.Factory.addGetterSetter(Kinetic.Node,"embossBlend",!1,null,Kinetic.Factory.afterSetFilter)}(),function(){function a(a,b,c,d,e){var f,g=c-b,h=e-d;return 0===g?d+h/2:0===h?d:(f=(a-b)/g,f=h*f+d)}Kinetic.Filters.Enhance=function(b){var c,d,e,f,g=b.data,h=g.length,i=g[0],j=i,k=g[1],l=k,m=g[2],n=m,o=g[3],p=o,q=this.enhance();if(0!==q){for(f=0;h>f;f+=4)c=g[f+0],i>c?i=c:c>j&&(j=c),d=g[f+1],k>d?k=d:d>l&&(l=d),e=g[f+2],m>e?m=e:e>n&&(n=e);j===i&&(j=255,i=0),l===k&&(l=255,k=0),n===m&&(n=255,m=0),p===o&&(p=255,o=0);var r,s,t,u,v,w,x,y,z,A,B,C;for(q>0?(s=j+q*(255-j),t=i-q*(i-0),v=l+q*(255-l),w=k-q*(k-0),y=n+q*(255-n),C=m-q*(m-0),B=p+q*(255-p),z=o-q*(o-0)):(r=.5*(j+i),s=j+q*(j-r),t=i+q*(i-r),u=.5*(l+k),v=l+q*(l-u),w=k+q*(k-u),x=.5*(n+m),y=n+q*(n-x),C=m+q*(m-x),A=.5*(p+o),B=p+q*(p-A),z=o+q*(o-A)),f=0;h>f;f+=4)g[f+0]=a(g[f+0],i,j,t,s),g[f+1]=a(g[f+1],k,l,w,v),g[f+2]=a(g[f+2],m,n,C,y)}},Kinetic.Factory.addGetterSetter(Kinetic.Node,"enhance",0,null,Kinetic.Factory.afterSetFilter)}(),function(){Kinetic.Filters.Posterize=function(a){var b,c=Math.round(254*this.levels())+1,d=a.data,e=d.length,f=255/c;for(b=0;e>b;b+=1)d[b]=Math.floor(d[b]/f)*f},Kinetic.Factory.addGetterSetter(Kinetic.Node,"levels",.5,null,Kinetic.Factory.afterSetFilter)}(),function(){Kinetic.Filters.Noise=function(a){var b,c=255*this.noise(),d=a.data,e=d.length,f=c/2;for(b=0;e>b;b+=4)d[b+0]+=f-2*f*Math.random(),d[b+1]+=f-2*f*Math.random(),d[b+2]+=f-2*f*Math.random()},Kinetic.Factory.addGetterSetter(Kinetic.Node,"noise",.2,null,Kinetic.Factory.afterSetFilter)}(),function(){Kinetic.Filters.Pixelate=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p=Math.ceil(this.pixelSize()),q=a.width,r=a.height,s=Math.ceil(q/p),t=Math.ceil(r/p);for(a=a.data,m=0;s>m;m+=1)for(n=0;t>n;n+=1){for(e=0,f=0,g=0,h=0,i=m*p,j=i+p,k=n*p,l=k+p,o=0,b=i;j>b;b+=1)if(!(b>=q))for(c=k;l>c;c+=1)c>=r||(d=4*(q*c+b),e+=a[d+0],f+=a[d+1],g+=a[d+2],h+=a[d+3],o+=1);for(e/=o,f/=o,g/=o,b=i;j>b;b+=1)if(!(b>=q))for(c=k;l>c;c+=1)c>=r||(d=4*(q*c+b),a[d+0]=e,a[d+1]=f,a[d+2]=g,a[d+3]=h)}},Kinetic.Factory.addGetterSetter(Kinetic.Node,"pixelSize",8,null,Kinetic.Factory.afterSetFilter)}(),function(){Kinetic.Filters.Threshold=function(a){var b,c=255*this.threshold(),d=a.data,e=d.length;for(b=0;e>b;b+=1)d[b]=d[b]<c?0:255},Kinetic.Factory.addGetterSetter(Kinetic.Node,"threshold",.5,null,Kinetic.Factory.afterSetFilter)}(),function(){Kinetic.Filters.Sepia=function(a){var b,c,d,e,f,g,h,i,j,k=a.data,l=a.width,m=a.height,n=4*l;do{b=(m-1)*n,c=l;do d=b+4*(c-1),e=k[d],f=k[d+1],g=k[d+2],h=.393*e+.769*f+.189*g,i=.349*e+.686*f+.168*g,j=.272*e+.534*f+.131*g,k[d]=h>255?255:h,k[d+1]=i>255?255:i,k[d+2]=j>255?255:j,k[d+3]=k[d+3];while(--c)}while(--m)}}(),function(){Kinetic.Filters.Solarize=function(a){var b=a.data,c=a.width,d=a.height,e=4*c,f=d;do{var g=(f-1)*e,h=c;do{var i=g+4*(h-1),j=b[i],k=b[i+1],l=b[i+2];j>127&&(j=255-j),k>127&&(k=255-k),l>127&&(l=255-l),b[i]=j,b[i+1]=k,b[i+2]=l}while(--h)}while(--f)}}(),function(){var a=function(a,b,c){var d,e,f,g,h=a.data,i=b.data,j=a.width,k=a.height,l=c.polarCenterX||j/2,m=c.polarCenterY||k/2,n=0,o=0,p=0,q=0,r=Math.sqrt(l*l+m*m);e=j-l,f=k-m,g=Math.sqrt(e*e+f*f),r=g>r?g:r;var s,t,u,v,w=k,x=j,y=360/x*Math.PI/180;for(t=0;x>t;t+=1)for(u=Math.sin(t*y),v=Math.cos(t*y),s=0;w>s;s+=1)e=Math.floor(l+r*s/w*v),f=Math.floor(m+r*s/w*u),d=4*(f*j+e),n=h[d+0],o=h[d+1],p=h[d+2],q=h[d+3],d=4*(t+s*j),i[d+0]=n,i[d+1]=o,i[d+2]=p,i[d+3]=q},b=function(a,b,c){var d,e,f,g,h,i,j=a.data,k=b.data,l=a.width,m=a.height,n=c.polarCenterX||l/2,o=c.polarCenterY||m/2,p=0,q=0,r=0,s=0,t=Math.sqrt(n*n+o*o);e=l-n,f=m-o,i=Math.sqrt(e*e+f*f),t=i>t?i:t;var u,v,w,x,y=m,z=l,A=c.polarRotation||0;for(e=0;l>e;e+=1)for(f=0;m>f;f+=1)g=e-n,h=f-o,u=Math.sqrt(g*g+h*h)*y/t,v=(180*Math.atan2(h,g)/Math.PI+360+A)%360,v=v*z/360,w=Math.floor(v),x=Math.floor(u),d=4*(x*l+w),p=j[d+0],q=j[d+1],r=j[d+2],s=j[d+3],d=4*(f*l+e),k[d+0]=p,k[d+1]=q,k[d+2]=r,k[d+3]=s},c=Kinetic.Util.createCanvasElement();Kinetic.Filters.Kaleidoscope=function(d){var e,f,g,h,i,j,k,l,m,n,o=d.width,p=d.height,q=Math.round(this.kaleidoscopePower()),r=Math.round(this.kaleidoscopeAngle()),s=Math.floor(o*(r%360)/360);if(!(1>q)){c.width=o,c.height=p;var t=c.getContext("2d").getImageData(0,0,o,p);a(d,t,{polarCenterX:o/2,polarCenterY:p/2});for(var u=o/Math.pow(2,q);8>=u;)u=2*u,q-=1;u=Math.ceil(u);var v=u,w=0,x=v,y=1;for(s+u>o&&(w=v,x=0,y=-1),f=0;p>f;f+=1)for(e=w;e!==x;e+=y)g=Math.round(e+s)%o,m=4*(o*f+g),i=t.data[m+0],j=t.data[m+1],k=t.data[m+2],l=t.data[m+3],n=4*(o*f+e),t.data[n+0]=i,t.data[n+1]=j,t.data[n+2]=k,t.data[n+3]=l;for(f=0;p>f;f+=1)for(v=Math.floor(u),h=0;q>h;h+=1){for(e=0;v+1>e;e+=1)m=4*(o*f+e),i=t.data[m+0],j=t.data[m+1],k=t.data[m+2],l=t.data[m+3],n=4*(o*f+2*v-e-1),t.data[n+0]=i,t.data[n+1]=j,t.data[n+2]=k,t.data[n+3]=l;v*=2}b(t,d,{polarRotation:0})}},Kinetic.Factory.addGetterSetter(Kinetic.Node,"kaleidoscopePower",2,null,Kinetic.Factory.afterSetFilter),Kinetic.Factory.addGetterSetter(Kinetic.Node,"kaleidoscopeAngle",0,null,Kinetic.Factory.afterSetFilter)}(),function(){function a(a){setTimeout(a,1e3/60)}function b(){return e.apply(Kinetic.root,arguments)}var c=500,d=function(){return Kinetic.root.performance&&Kinetic.root.performance.now?function(){return Kinetic.root.performance.now()}:function(){return(new Date).getTime()}}(),e=function(){return Kinetic.root.requestAnimationFrame||Kinetic.root.webkitRequestAnimationFrame||Kinetic.root.mozRequestAnimationFrame||Kinetic.root.oRequestAnimationFrame||Kinetic.root.msRequestAnimationFrame||a}();Kinetic.Animation=function(a,b){var c=Kinetic.Animation;this.func=a,this.setLayers(b),this.id=c.animIdCounter++,this.frame={time:0,timeDiff:0,lastTime:d()}},Kinetic.Animation.prototype={setLayers:function(a){var b=[];b=a?a.length>0?a:[a]:[],this.layers=b},getLayers:function(){return this.layers},addLayer:function(a){var b,c,d=this.layers;if(d){for(b=d.length,c=0;b>c;c++)if(d[c]._id===a._id)return!1}else this.layers=[];return this.layers.push(a),!0},isRunning:function(){var a,b=Kinetic.Animation,c=b.animations,d=c.length;for(a=0;d>a;a++)if(c[a].id===this.id)return!0;return!1},start:function(){var a=Kinetic.Animation;this.stop(),this.frame.timeDiff=0,this.frame.lastTime=d(),a._addAnimation(this)},stop:function(){Kinetic.Animation._removeAnimation(this)},_updateFrameObject:function(a){this.frame.timeDiff=a-this.frame.lastTime,this.frame.lastTime=a,this.frame.time+=this.frame.timeDiff,this.frame.frameRate=1e3/this.frame.timeDiff}},Kinetic.Animation.animations=[],Kinetic.Animation.animIdCounter=0,Kinetic.Animation.animRunning=!1,Kinetic.Animation._addAnimation=function(a){this.animations.push(a),this._handleAnimation()},Kinetic.Animation._removeAnimation=function(a){var b,c=a.id,d=this.animations,e=d.length;for(b=0;e>b;b++)if(d[b].id===c){this.animations.splice(b,1);break}},Kinetic.Animation._runFrames=function(){var a,b,c,e,f,g,h,i,j={},k=this.animations,l=!1;for(e=0;e<k.length;e++){for(a=k[e],b=a.layers,c=a.func,a._updateFrameObject(d()),g=b.length,f=0;g>f;f++)h=b[f],void 0!==h._id&&(j[h._id]=h);c&&(l=c.call(a,a.frame)!==!1||l)}if(l)for(i in j)j[i].draw()},Kinetic.Animation._animationLoop=function(){var a=Kinetic.Animation;a.animations.length?(b(a._animationLoop),a._runFrames()):a.animRunning=!1},Kinetic.Animation._handleAnimation=function(){var a=this;this.animRunning||(this.animRunning=!0,a._animationLoop())};var f=Kinetic.Node.prototype.moveTo;Kinetic.Node.prototype.moveTo=function(a){f.call(this,a)},Kinetic.BaseLayer.prototype.batchDraw=function(){var a=this,b=Kinetic.Animation;this.batchAnim||(this.batchAnim=new b(function(){a.lastBatchDrawTime&&d()-a.lastBatchDrawTime>c&&a.batchAnim.stop()},this)),this.lastBatchDrawTime=d(),this.batchAnim.isRunning()||(this.draw(),this.batchAnim.start())},Kinetic.Stage.prototype.batchDraw=function(){this.getChildren().each(function(a){a.batchDraw()})}}(this),function(){var a={node:1,duration:1,easing:1,onFinish:1,yoyo:1},b=1,c=2,d=3,e=0;Kinetic.Tween=function(b){var c,d=this,g=b.node,h=g._id,i=b.duration||1,j=b.easing||Kinetic.Easings.Linear,k=!!b.yoyo;this.node=g,this._id=e++,this.anim=new Kinetic.Animation(function(){d.tween.onEnterFrame()},g.getLayer()),this.tween=new f(c,function(a){d._tweenFunc(a)},j,0,1,1e3*i,k),this._addListeners(),Kinetic.Tween.attrs[h]||(Kinetic.Tween.attrs[h]={}),Kinetic.Tween.attrs[h][this._id]||(Kinetic.Tween.attrs[h][this._id]={}),Kinetic.Tween.tweens[h]||(Kinetic.Tween.tweens[h]={});for(c in b)void 0===a[c]&&this._addAttr(c,b[c]);this.reset(),this.onFinish=b.onFinish,this.onReset=b.onReset},Kinetic.Tween.attrs={},Kinetic.Tween.tweens={},Kinetic.Tween.prototype={_addAttr:function(a,b){var c,d,e,f,g,h=this.node,i=h._id;if(e=Kinetic.Tween.tweens[i][a],e&&delete Kinetic.Tween.attrs[i][e][a],c=h.getAttr(a),Kinetic.Util._isArray(b))for(d=[],g=b.length,f=0;g>f;f++)d.push(b[f]-c[f]);else d=b-c;Kinetic.Tween.attrs[i][this._id][a]={start:c,diff:d},Kinetic.Tween.tweens[i][a]=this._id},_tweenFunc:function(a){var b,c,d,e,f,g,h,i=this.node,j=Kinetic.Tween.attrs[i._id][this._id];for(b in j){if(c=j[b],d=c.start,e=c.diff,Kinetic.Util._isArray(d))for(f=[],h=d.length,g=0;h>g;g++)f.push(d[g]+e[g]*a);else f=d+e*a;i.setAttr(b,f)}},_addListeners:function(){var a=this;this.tween.onPlay=function(){a.anim.start()},this.tween.onReverse=function(){a.anim.start()},this.tween.onPause=function(){a.anim.stop()},this.tween.onFinish=function(){a.onFinish&&a.onFinish()},this.tween.onReset=function(){a.onReset&&a.onReset()}},play:function(){return this.tween.play(),this},reverse:function(){return this.tween.reverse(),this},reset:function(){this.node;return this.tween.reset(),this},seek:function(a){this.node;return this.tween.seek(1e3*a),this},pause:function(){return this.tween.pause(),this},finish:function(){this.node;return this.tween.finish(),this},destroy:function(){var a,b=this.node._id,c=this._id,d=Kinetic.Tween.tweens[b];this.pause();for(a in d)delete Kinetic.Tween.tweens[b][a];delete Kinetic.Tween.attrs[b][c]}};var f=function(a,b,c,d,e,f,g){this.prop=a,this.propFunc=b,this.begin=d,this._pos=d,this.duration=f,this._change=0,this.prevPos=0,this.yoyo=g,this._time=0,this._position=0,this._startTime=0,this._finish=0,this.func=c,this._change=e-this.begin,this.pause()};f.prototype={fire:function(a){var b=this[a];b&&b()},setTime:function(a){a>this.duration?this.yoyo?(this._time=this.duration,this.reverse()):this.finish():0>a?this.yoyo?(this._time=0,this.play()):this.reset():(this._time=a,this.update())},getTime:function(){return this._time},setPosition:function(a){this.prevPos=this._pos,this.propFunc(a),this._pos=a},getPosition:function(a){return void 0===a&&(a=this._time),this.func(a,this.begin,this._change,this.duration)},play:function(){this.state=c,this._startTime=this.getTimer()-this._time,this.onEnterFrame(),this.fire("onPlay")},reverse:function(){this.state=d,this._time=this.duration-this._time,this._startTime=this.getTimer()-this._time,this.onEnterFrame(),this.fire("onReverse")},seek:function(a){this.pause(),this._time=a,this.update(),this.fire("onSeek")},reset:function(){this.pause(),this._time=0,this.update(),this.fire("onReset")},finish:function(){this.pause(),this._time=this.duration,this.update(),this.fire("onFinish")},update:function(){this.setPosition(this.getPosition(this._time))},onEnterFrame:function(){var a=this.getTimer()-this._startTime;this.state===c?this.setTime(a):this.state===d&&this.setTime(this.duration-a)},pause:function(){this.state=b,this.fire("onPause")},getTimer:function(){return(new Date).getTime()}},Kinetic.Easings={BackEaseIn:function(a,b,c,d){var e=1.70158;return c*(a/=d)*a*((e+1)*a-e)+b},BackEaseOut:function(a,b,c,d){var e=1.70158;return c*((a=a/d-1)*a*((e+1)*a+e)+1)+b},BackEaseInOut:function(a,b,c,d){var e=1.70158;return(a/=d/2)<1?c/2*a*a*(((e*=1.525)+1)*a-e)+b:c/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+b},ElasticEaseIn:function(a,b,c,d,e,f){var g=0;return 0===a?b:1==(a/=d)?b+c:(f||(f=.3*d),!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e),-(e*Math.pow(2,10*(a-=1))*Math.sin(2*(a*d-g)*Math.PI/f))+b)},ElasticEaseOut:function(a,b,c,d,e,f){var g=0;return 0===a?b:1==(a/=d)?b+c:(f||(f=.3*d),!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e),e*Math.pow(2,-10*a)*Math.sin(2*(a*d-g)*Math.PI/f)+c+b)},ElasticEaseInOut:function(a,b,c,d,e,f){var g=0;return 0===a?b:2==(a/=d/2)?b+c:(f||(f=.3*d*1.5),!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e),1>a?-.5*e*Math.pow(2,10*(a-=1))*Math.sin(2*(a*d-g)*Math.PI/f)+b:e*Math.pow(2,-10*(a-=1))*Math.sin(2*(a*d-g)*Math.PI/f)*.5+c+b)},BounceEaseOut:function(a,b,c,d){return(a/=d)<1/2.75?7.5625*c*a*a+b:2/2.75>a?c*(7.5625*(a-=1.5/2.75)*a+.75)+b:2.5/2.75>a?c*(7.5625*(a-=2.25/2.75)*a+.9375)+b:c*(7.5625*(a-=2.625/2.75)*a+.984375)+b},BounceEaseIn:function(a,b,c,d){return c-Kinetic.Easings.BounceEaseOut(d-a,0,c,d)+b},BounceEaseInOut:function(a,b,c,d){return d/2>a?.5*Kinetic.Easings.BounceEaseIn(2*a,0,c,d)+b:.5*Kinetic.Easings.BounceEaseOut(2*a-d,0,c,d)+.5*c+b},EaseIn:function(a,b,c,d){return c*(a/=d)*a+b},EaseOut:function(a,b,c,d){return-c*(a/=d)*(a-2)+b},EaseInOut:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b},StrongEaseIn:function(a,b,c,d){return c*(a/=d)*a*a*a*a+b},StrongEaseOut:function(a,b,c,d){return c*((a=a/d-1)*a*a*a*a+1)+b},StrongEaseInOut:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a*a+b:c/2*((a-=2)*a*a*a*a+2)+b},Linear:function(a,b,c,d){return c*a/d+b}}}(),function(){Kinetic.DD={anim:new Kinetic.Animation(function(){var a=this.dirty;return this.dirty=!1,a}),isDragging:!1,justDragged:!1,offset:{x:0,y:0},node:null,_drag:function(a){var b=Kinetic.DD,c=b.node;if(c){if(!b.isDragging){var d=c.getStage().getPointerPosition(),e=c.dragDistance(),f=Math.max(Math.abs(d.x-b.startPointerPos.x),Math.abs(d.y-b.startPointerPos.y));if(e>f)return}c._setDragPosition(a),b.isDragging||(b.isDragging=!0,c.fire("dragstart",{type:"dragstart",target:c,evt:a},!0)),c.fire("dragmove",{type:"dragmove",target:c,evt:a},!0)}},_endDragBefore:function(a){var b,c,d=Kinetic.DD,e=d.node;e&&(b=e.nodeType,c=e.getLayer(),d.anim.stop(),d.isDragging&&(d.isDragging=!1,d.justDragged=!0,Kinetic.listenClickTap=!1,a&&(a.dragEndNode=e)),delete d.node,(c||e).draw())},_endDragAfter:function(a){a=a||{};var b=a.dragEndNode;a&&b&&b.fire("dragend",{type:"dragend",target:b,evt:a},!0)}},Kinetic.Node.prototype.startDrag=function(){var a=Kinetic.DD,b=this.getStage(),c=this.getLayer(),d=b.getPointerPosition(),e=this.getAbsolutePosition();d&&(a.node&&a.node.stopDrag(),a.node=this,a.startPointerPos=d,a.offset.x=d.x-e.x,a.offset.y=d.y-e.y,a.anim.setLayers(c||this.getLayers()),a.anim.start(),this._setDragPosition())},Kinetic.Node.prototype._setDragPosition=function(a){var b=Kinetic.DD,c=this.getStage().getPointerPosition(),d=this.getDragBoundFunc();if(c){var e={x:c.x-b.offset.x,y:c.y-b.offset.y};void 0!==d&&(e=d.call(this,e,a)),this.setAbsolutePosition(e),this._lastPos&&this._lastPos.x===e.x&&this._lastPos.y===e.y||(b.anim.dirty=!0),this._lastPos=e}},Kinetic.Node.prototype.stopDrag=function(){var a=Kinetic.DD,b={};a._endDragBefore(b),a._endDragAfter(b)},Kinetic.Node.prototype.setDraggable=function(a){this._setAttr("draggable",a),this._dragChange()};var a=Kinetic.Node.prototype.destroy;Kinetic.Node.prototype.destroy=function(){var b=Kinetic.DD;b.node&&b.node._id===this._id&&this.stopDrag(),a.call(this)},Kinetic.Node.prototype.isDragging=function(){var a=Kinetic.DD;return!(!a.node||a.node._id!==this._id||!a.isDragging)},Kinetic.Node.prototype._listenDrag=function(){var a=this;this._dragCleanup(),"Stage"===this.getClassName()?this.on("contentMousedown.kinetic contentTouchstart.kinetic",function(b){Kinetic.DD.node||a.startDrag(b)}):this.on("mousedown.kinetic touchstart.kinetic",function(b){1!==b.evt.button&&2!==b.evt.button&&(Kinetic.DD.node||a.startDrag(b))})},Kinetic.Node.prototype._dragChange=function(){if(this.attrs.draggable)this._listenDrag();else{this._dragCleanup();var a=this.getStage(),b=Kinetic.DD;a&&b.node&&b.node._id===this._id&&b.node.stopDrag()}},Kinetic.Node.prototype._dragCleanup=function(){"Stage"===this.getClassName()?(this.off("contentMousedown.kinetic"),this.off("contentTouchstart.kinetic")):(this.off("mousedown.kinetic"),this.off("touchstart.kinetic"))},Kinetic.Factory.addGetterSetter(Kinetic.Node,"dragBoundFunc"),Kinetic.Factory.addGetter(Kinetic.Node,"draggable",!1),Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node,"draggable");var b=Kinetic.document.documentElement;b.addEventListener("mouseup",Kinetic.DD._endDragBefore,!0),b.addEventListener("touchend",Kinetic.DD._endDragBefore,!0),b.addEventListener("mouseup",Kinetic.DD._endDragAfter,!1),b.addEventListener("touchend",Kinetic.DD._endDragAfter,!1)}(),function(){Kinetic.Util.addMethods(Kinetic.Container,{__init:function(a){this.children=new Kinetic.Collection,Kinetic.Node.call(this,a)},getChildren:function(a){if(a){var b=new Kinetic.Collection;return this.children.each(function(c){a(c)&&b.push(c)}),b}return this.children},hasChildren:function(){return this.getChildren().length>0},removeChildren:function(){for(var a,b=Kinetic.Collection.toCollection(this.children),c=0;c<b.length;c++)a=b[c],delete a.parent,a.index=0,a.hasChildren()&&a.removeChildren(),a.remove();return b=null,this.children=new Kinetic.Collection,this},destroyChildren:function(){for(var a,b=Kinetic.Collection.toCollection(this.children),c=0;c<b.length;c++)a=b[c],delete a.parent,a.index=0,a.destroy();return b=null,this.children=new Kinetic.Collection,this},add:function(a){if(!(arguments.length>1)){if(a.getParent())return void a.moveTo(this);var b=this.children;return this._validateAdd(a),a.index=b.length,a.parent=this,b.push(a),this._fire("add",{child:a}),this}for(var c=0;c<arguments.length;c++)this.add(arguments[c])},destroy:function(){this.hasChildren()&&this.destroyChildren(),Kinetic.Node.prototype.destroy.call(this)},find:function(a){var b,c,d,e,f,g,h,i=[],j=a.replace(/ /g,"").split(","),k=j.length;for(b=0;k>b;b++)if(d=j[b],"#"===d.charAt(0))f=this._getNodeById(d.slice(1)),f&&i.push(f);else if("."===d.charAt(0))e=this._getNodesByName(d.slice(1)),i=i.concat(e);else for(g=this.getChildren(),h=g.length,c=0;h>c;c++)i=i.concat(g[c]._get(d));return Kinetic.Collection.toCollection(i)},_getNodeById:function(a){var b=Kinetic.ids[a];return void 0!==b&&this.isAncestorOf(b)?b:null},_getNodesByName:function(a){var b=Kinetic.names[a]||[];return this._getDescendants(b)},_get:function(a){for(var b=Kinetic.Node.prototype._get.call(this,a),c=this.getChildren(),d=c.length,e=0;d>e;e++)b=b.concat(c[e]._get(a));return b},toObject:function(){var a=Kinetic.Node.prototype.toObject.call(this);
a.children=[];for(var b=this.getChildren(),c=b.length,d=0;c>d;d++){var e=b[d];a.children.push(e.toObject())}return a},_getDescendants:function(a){for(var b=[],c=a.length,d=0;c>d;d++){var e=a[d];this.isAncestorOf(e)&&b.push(e)}return b},isAncestorOf:function(a){for(var b=a.getParent();b;){if(b._id===this._id)return!0;b=b.getParent()}return!1},clone:function(a){var b=Kinetic.Node.prototype.clone.call(this,a);return this.getChildren().each(function(a){b.add(a.clone())}),b},getAllIntersections:function(a){var b=[];return this.find("Shape").each(function(c){c.isVisible()&&c.intersects(a)&&b.push(c)}),b},_setChildrenIndices:function(){this.children.each(function(a,b){a.index=b})},drawScene:function(a,b){var c=this.getLayer(),d=a||c&&c.getCanvas(),e=d&&d.getContext(),f=this._cache.canvas,g=f&&f.scene;return this.isVisible()&&(g?this._drawCachedSceneCanvas(e):this._drawChildren(d,"drawScene",b)),this},drawHit:function(a,b){var c=this.getLayer(),d=a||c&&c.hitCanvas,e=d&&d.getContext(),f=this._cache.canvas,g=f&&f.hit;return this.shouldDrawHit(d)&&(c&&c.clearHitCache(),g?this._drawCachedHitCanvas(e):this._drawChildren(d,"drawHit",b)),this},_drawChildren:function(a,b,c){var d,e,f=this.getLayer(),g=a&&a.getContext(),h=this.getClipWidth(),i=this.getClipHeight(),j=h&&i;j&&f&&(d=this.getClipX(),e=this.getClipY(),g.save(),f._applyTransform(this,g),g.beginPath(),g.rect(d,e,h,i),g.clip(),g.reset()),this.children.each(function(d){d[b](a,c)}),j&&g.restore()},shouldDrawHit:function(a){var b=this.getLayer();return a&&a.isCache||b&&b.hitGraphEnabled()&&this.isVisible()&&!Kinetic.isDragging()}}),Kinetic.Util.extend(Kinetic.Container,Kinetic.Node),Kinetic.Container.prototype.get=Kinetic.Container.prototype.find,Kinetic.Factory.addComponentsGetterSetter(Kinetic.Container,"clip",["x","y","width","height"]),Kinetic.Factory.addGetterSetter(Kinetic.Container,"clipX"),Kinetic.Factory.addGetterSetter(Kinetic.Container,"clipY"),Kinetic.Factory.addGetterSetter(Kinetic.Container,"clipWidth"),Kinetic.Factory.addGetterSetter(Kinetic.Container,"clipHeight"),Kinetic.Collection.mapMethods(Kinetic.Container)}(),function(){function a(a){a.fill()}function b(a){a.stroke()}function c(a){a.fill()}function d(a){a.stroke()}function e(){this._clearCache(f)}var f="hasShadow";Kinetic.Util.addMethods(Kinetic.Shape,{__init:function(f){this.nodeType="Shape",this._fillFunc=a,this._strokeFunc=b,this._fillFuncHit=c,this._strokeFuncHit=d;for(var g,h=Kinetic.shapes;;)if(g=Kinetic.Util.getRandomColor(),g&&!(g in h))break;this.colorKey=g,h[g]=this,Kinetic.Node.call(this,f),this.on("shadowColorChange.kinetic shadowBlurChange.kinetic shadowOffsetChange.kinetic shadowOpacityChange.kinetic shadowEnabledChange.kinetic",e)},hasChildren:function(){return!1},getChildren:function(){return[]},getContext:function(){return this.getLayer().getContext()},getCanvas:function(){return this.getLayer().getCanvas()},hasShadow:function(){return this._getCache(f,this._hasShadow)},_hasShadow:function(){return this.getShadowEnabled()&&0!==this.getShadowOpacity()&&!!(this.getShadowColor()||this.getShadowBlur()||this.getShadowOffsetX()||this.getShadowOffsetY())},hasFill:function(){return!!(this.getFill()||this.getFillPatternImage()||this.getFillLinearGradientColorStops()||this.getFillRadialGradientColorStops())},hasStroke:function(){return!!(this.stroke()||this.strokeRed()||this.strokeGreen()||this.strokeBlue())},intersects:function(a){var b,c=this.getStage(),d=c.bufferHitCanvas;return d.getContext().clear(),this.drawScene(d),b=d.context.getImageData(Math.round(a.x),Math.round(a.y),1,1).data,b[3]>0},destroy:function(){Kinetic.Node.prototype.destroy.call(this),delete Kinetic.shapes[this.colorKey]},_useBufferCanvas:function(){return(this.hasShadow()||1!==this.getAbsoluteOpacity())&&this.hasFill()&&this.hasStroke()&&this.getStage()},drawScene:function(a,b){var c,d,e,f=this.getLayer(),g=a||f.getCanvas(),h=g.getContext(),i=this._cache.canvas,j=this.sceneFunc(),k=this.hasShadow();if(this.isVisible())if(i)this._drawCachedSceneCanvas(h);else if(j){if(h.save(),this._useBufferCanvas()){if(c=this.getStage(),d=c.bufferCanvas,e=d.getContext(),e.clear(),e.save(),e._applyLineJoin(this),f)f._applyTransform(this,e,b);else{var l=this.getAbsoluteTransform(b).getMatrix();h.transform(l[0],l[1],l[2],l[3],l[4],l[5])}j.call(this,e),e.restore(),k&&(h.save(),h._applyShadow(this),h.drawImage(d._canvas,0,0),h.restore()),h._applyOpacity(this),h.drawImage(d._canvas,0,0)}else{if(h._applyLineJoin(this),f)f._applyTransform(this,h,b);else{var l=this.getAbsoluteTransform(b).getMatrix();h.transform(l[0],l[1],l[2],l[3],l[4],l[5])}k&&(h.save(),h._applyShadow(this),j.call(this,h),h.restore()),h._applyOpacity(this),j.call(this,h)}h.restore()}return this},drawHit:function(a,b){var c=this.getLayer(),d=a||c.hitCanvas,e=d.getContext(),f=this.hitFunc()||this.sceneFunc(),g=this._cache.canvas,h=g&&g.hit;if(this.shouldDrawHit(d))if(c&&c.clearHitCache(),h)this._drawCachedHitCanvas(e);else if(f){if(e.save(),e._applyLineJoin(this),c)c._applyTransform(this,e,b);else{var i=this.getAbsoluteTransform(b).getMatrix();e.transform(i[0],i[1],i[2],i[3],i[4],i[5])}f.call(this,e),e.restore()}return this},drawHitFromCache:function(a){var b,c,d,e,f,g,h,i,j=a||0,k=this._cache.canvas,l=this._getCachedSceneCanvas(),m=l.getContext(),n=k.hit,o=n.getContext(),p=l.getWidth(),q=l.getHeight();o.clear();try{for(b=m.getImageData(0,0,p,q),c=b.data,d=o.getImageData(0,0,p,q),e=d.data,f=c.length,g=Kinetic.Util._hexToRgb(this.colorKey),h=0;f>h;h+=4)i=c[h+3],i>j&&(e[h]=g.r,e[h+1]=g.g,e[h+2]=g.b,e[h+3]=255);o.putImageData(d,0,0)}catch(r){Kinetic.Util.warn("Unable to draw hit graph from cached scene canvas. "+r.message)}return this}}),Kinetic.Util.extend(Kinetic.Shape,Kinetic.Node),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"stroke"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeRed",0,Kinetic.Validators.RGBComponent),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeGreen",0,Kinetic.Validators.RGBComponent),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeBlue",0,Kinetic.Validators.RGBComponent),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeAlpha",1,Kinetic.Validators.alphaComponent),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeWidth",2),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"lineJoin"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"lineCap"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"sceneFunc"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"hitFunc"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"dash"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowColor"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowRed",0,Kinetic.Validators.RGBComponent),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowGreen",0,Kinetic.Validators.RGBComponent),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowBlue",0,Kinetic.Validators.RGBComponent),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowAlpha",1,Kinetic.Validators.alphaComponent),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowBlur"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowOpacity"),Kinetic.Factory.addComponentsGetterSetter(Kinetic.Shape,"shadowOffset",["x","y"]),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowOffsetX",0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowOffsetY",0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternImage"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fill"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRed",0,Kinetic.Validators.RGBComponent),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillGreen",0,Kinetic.Validators.RGBComponent),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillBlue",0,Kinetic.Validators.RGBComponent),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillAlpha",1,Kinetic.Validators.alphaComponent),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternX",0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternY",0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillLinearGradientColorStops"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientStartRadius",0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientEndRadius",0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientColorStops"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternRepeat","repeat"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"dashEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeScaleEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPriority","color"),Kinetic.Factory.addComponentsGetterSetter(Kinetic.Shape,"fillPatternOffset",["x","y"]),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternOffsetX",0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternOffsetY",0),Kinetic.Factory.addComponentsGetterSetter(Kinetic.Shape,"fillPatternScale",["x","y"]),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternScaleX",1),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternScaleY",1),Kinetic.Factory.addComponentsGetterSetter(Kinetic.Shape,"fillLinearGradientStartPoint",["x","y"]),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillLinearGradientStartPointX",0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillLinearGradientStartPointY",0),Kinetic.Factory.addComponentsGetterSetter(Kinetic.Shape,"fillLinearGradientEndPoint",["x","y"]),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillLinearGradientEndPointX",0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillLinearGradientEndPointY",0),Kinetic.Factory.addComponentsGetterSetter(Kinetic.Shape,"fillRadialGradientStartPoint",["x","y"]),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientStartPointX",0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientStartPointY",0),Kinetic.Factory.addComponentsGetterSetter(Kinetic.Shape,"fillRadialGradientEndPoint",["x","y"]),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientEndPointX",0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientEndPointY",0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternRotation",0),Kinetic.Factory.backCompat(Kinetic.Shape,{dashArray:"dash",getDashArray:"getDash",setDashArray:"getDash",drawFunc:"sceneFunc",getDrawFunc:"getSceneFunc",setDrawFunc:"setSceneFunc",drawHitFunc:"hitFunc",getDrawHitFunc:"getHitFunc",setDrawHitFunc:"setHitFunc"}),Kinetic.Collection.mapMethods(Kinetic.Shape)}(),function(){function a(a,b){a.content.addEventListener(b,function(c){a[I+b](c)},!1)}var b="Stage",c="string",d="px",e="mouseout",f="mouseleave",g="mouseover",h="mouseenter",i="mousemove",j="mousedown",k="mouseup",l="click",m="dblclick",n="touchstart",o="touchend",p="tap",q="dbltap",r="touchmove",s="contentMouseout",t="contentMouseover",u="contentMousemove",v="contentMousedown",w="contentMouseup",x="contentClick",y="contentDblclick",z="contentTouchstart",A="contentTouchend",B="contentDbltap",C="contentTouchmove",D="div",E="relative",F="inline-block",G="kineticjs-content",H=" ",I="_",J="container",K="",L=[j,i,k,e,n,r,o,g],M=L.length;Kinetic.Util.addMethods(Kinetic.Stage,{___init:function(a){this.nodeType=b,Kinetic.Container.call(this,a),this._id=Kinetic.idCounter++,this._buildDOM(),this._bindContentEvents(),this._enableNestedTransforms=!1,Kinetic.stages.push(this)},_validateAdd:function(a){"Layer"!==a.getType()&&Kinetic.Util.error("You may only add layers to the stage.")},setContainer:function(a){if(typeof a===c){var b=a;if(a=Kinetic.document.getElementById(a),!a)throw"Can not find container in document with id "+b}return this._setAttr(J,a),this},shouldDrawHit:function(){return!0},draw:function(){return Kinetic.Node.prototype.draw.call(this),this},setHeight:function(a){return Kinetic.Node.prototype.setHeight.call(this,a),this._resizeDOM(),this},setWidth:function(a){return Kinetic.Node.prototype.setWidth.call(this,a),this._resizeDOM(),this},clear:function(){var a,b=this.children,c=b.length;for(a=0;c>a;a++)b[a].clear();return this},clone:function(a){return a||(a={}),a.container=Kinetic.document.createElement(D),Kinetic.Container.prototype.clone.call(this,a)},destroy:function(){var a=this.content;Kinetic.Container.prototype.destroy.call(this),a&&Kinetic.Util._isInDocument(a)&&this.getContainer().removeChild(a);var b=Kinetic.stages.indexOf(this);b>-1&&Kinetic.stages.splice(b,1)},getPointerPosition:function(){return this.pointerPos},getStage:function(){return this},getContent:function(){return this.content},toDataURL:function(a){function b(e){var f=i[e],j=f.toDataURL(),k=new Kinetic.window.Image;k.onload=function(){h.drawImage(k,0,0),e<i.length-1?b(e+1):a.callback(g.toDataURL(c,d))},k.src=j}a=a||{};var c=a.mimeType||null,d=a.quality||null,e=a.x||0,f=a.y||0,g=new Kinetic.SceneCanvas({width:a.width||this.getWidth(),height:a.height||this.getHeight(),pixelRatio:1}),h=g.getContext()._context,i=this.children;(e||f)&&h.translate(-1*e,-1*f),b(0)},toImage:function(a){var b=a.callback;a.callback=function(a){Kinetic.Util._getImage(a,function(a){b(a)})},this.toDataURL(a)},getIntersection:function(a){var b,c,d=this.getChildren(),e=d.length,f=e-1;for(b=f;b>=0;b--)if(c=d[b].getIntersection(a))return c;return null},_resizeDOM:function(){if(this.content){var a,b,c=this.getWidth(),e=this.getHeight(),f=this.getChildren(),g=f.length;for(this.content.style.width=c+d,this.content.style.height=e+d,this.bufferCanvas.setSize(c,e),this.bufferHitCanvas.setSize(c,e),a=0;g>a;a++)b=f[a],b.setSize(c,e),b.draw()}},add:function(a){if(!(arguments.length>1))return Kinetic.Container.prototype.add.call(this,a),a._setCanvasSize(this.width(),this.height()),a.draw(),this.content.appendChild(a.canvas._canvas),this;for(var b=0;b<arguments.length;b++)this.add(arguments[b])},getParent:function(){return null},getLayer:function(){return null},getLayers:function(){return this.getChildren()},_bindContentEvents:function(){for(var b=0;M>b;b++)a(this,L[b])},_mouseover:function(a){Kinetic.UA.mobile||(this._setPointerPosition(a),this._fire(t,{evt:a}))},_mouseout:function(a){if(!Kinetic.UA.mobile){this._setPointerPosition(a);var b=this.targetShape;b&&!Kinetic.isDragging()&&(b._fireAndBubble(e,{evt:a}),b._fireAndBubble(f,{evt:a}),this.targetShape=null),this.pointerPos=void 0,this._fire(s,{evt:a})}},_mousemove:function(a){if(Kinetic.UA.ieMobile)return this._touchmove(a);if(("undefined"==typeof a.webkitMovementX&&"undefined"==typeof a.webkitMovementY||0!==a.webkitMovementY||0!==a.webkitMovementX)&&!Kinetic.UA.mobile){this._setPointerPosition(a);var b,c=Kinetic.DD;Kinetic.isDragging()||(b=this.getIntersection(this.getPointerPosition()),b&&b.isListening()?Kinetic.isDragging()||this.targetShape&&this.targetShape._id===b._id?b._fireAndBubble(i,{evt:a}):(this.targetShape&&(this.targetShape._fireAndBubble(e,{evt:a},b),this.targetShape._fireAndBubble(f,{evt:a},b)),b._fireAndBubble(g,{evt:a},this.targetShape),b._fireAndBubble(h,{evt:a},this.targetShape),this.targetShape=b):this.targetShape&&!Kinetic.isDragging()&&(this.targetShape._fireAndBubble(e,{evt:a}),this.targetShape._fireAndBubble(f,{evt:a}),this.targetShape=null),this._fire(u,{evt:a})),c&&c._drag(a),a.preventDefault&&a.preventDefault()}},_mousedown:function(a){if(Kinetic.UA.ieMobile)return this._touchstart(a);if(!Kinetic.UA.mobile){this._setPointerPosition(a);var b=this.getIntersection(this.getPointerPosition());Kinetic.listenClickTap=!0,b&&b.isListening()&&(this.clickStartShape=b,b._fireAndBubble(j,{evt:a})),this._fire(v,{evt:a})}a.preventDefault&&a.preventDefault()},_mouseup:function(a){if(Kinetic.UA.ieMobile)return this._touchend(a);if(!Kinetic.UA.mobile){this._setPointerPosition(a);var b=this.getIntersection(this.getPointerPosition()),c=this.clickStartShape,d=!1,e=Kinetic.DD;Kinetic.inDblClickWindow?(d=!0,Kinetic.inDblClickWindow=!1):e&&e.justDragged?e&&(e.justDragged=!1):Kinetic.inDblClickWindow=!0,setTimeout(function(){Kinetic.inDblClickWindow=!1},Kinetic.dblClickWindow),b&&b.isListening()&&(b._fireAndBubble(k,{evt:a}),Kinetic.listenClickTap&&c&&c._id===b._id&&(b._fireAndBubble(l,{evt:a}),d&&b._fireAndBubble(m,{evt:a}))),this._fire(w,{evt:a}),Kinetic.listenClickTap&&(this._fire(x,{evt:a}),d&&this._fire(y,{evt:a})),Kinetic.listenClickTap=!1}a.preventDefault&&a.preventDefault()},_touchstart:function(a){this._setPointerPosition(a);var b=this.getIntersection(this.getPointerPosition());Kinetic.listenClickTap=!0,b&&b.isListening()&&(this.tapStartShape=b,b._fireAndBubble(n,{evt:a}),b.isListening()&&a.preventDefault&&a.preventDefault()),this._fire(z,{evt:a})},_touchend:function(a){this._setPointerPosition(a);var b=this.getIntersection(this.getPointerPosition()),c=!1;Kinetic.inDblClickWindow?(c=!0,Kinetic.inDblClickWindow=!1):Kinetic.inDblClickWindow=!0,setTimeout(function(){Kinetic.inDblClickWindow=!1},Kinetic.dblClickWindow),b&&b.isListening()&&(b._fireAndBubble(o,{evt:a}),Kinetic.listenClickTap&&b._id===this.tapStartShape._id&&(b._fireAndBubble(p,{evt:a}),c&&b._fireAndBubble(q,{evt:a})),b.isListening()&&a.preventDefault&&a.preventDefault()),Kinetic.listenClickTap&&(this._fire(A,{evt:a}),c&&this._fire(B,{evt:a})),Kinetic.listenClickTap=!1},_touchmove:function(a){this._setPointerPosition(a);var b,c=Kinetic.DD;Kinetic.isDragging()||(b=this.getIntersection(this.getPointerPosition()),b&&b.isListening()&&(b._fireAndBubble(r,{evt:a}),b.isListening()&&a.preventDefault&&a.preventDefault()),this._fire(C,{evt:a})),c&&(c._drag(a),Kinetic.isDragging()&&a.preventDefault())},_setPointerPosition:function(a){var b,c=this._getContentPosition(),d=a.offsetX,e=a.clientX,f=null,g=null;a=a?a:window.event,void 0!==a.touches?a.touches.length>0&&(b=a.touches[0],f=b.clientX-c.left,g=b.clientY-c.top):void 0!==d?(f=d,g=a.offsetY):"mozilla"===Kinetic.UA.browser?(f=a.layerX,g=a.layerY):void 0!==e&&c&&(f=e-c.left,g=a.clientY-c.top),null!==f&&null!==g&&(this.pointerPos={x:f,y:g})},_getContentPosition:function(){var a=this.content.getBoundingClientRect?this.content.getBoundingClientRect():{top:0,left:0};return{top:a.top,left:a.left}},_buildDOM:function(){var a=this.getContainer();if(!a){if(Kinetic.Util.isBrowser())throw"Stage has not container. But container is required";a=Kinetic.document.createElement(D)}a.innerHTML=K,this.content=Kinetic.document.createElement(D),this.content.style.position=E,this.content.style.display=F,this.content.className=G,this.content.setAttribute("role","presentation"),a.appendChild(this.content),this.bufferCanvas=new Kinetic.SceneCanvas({pixelRatio:1}),this.bufferHitCanvas=new Kinetic.HitCanvas,this._resizeDOM()},_onContent:function(a,b){var c,d,e=a.split(H),f=e.length;for(c=0;f>c;c++)d=e[c],this.content.addEventListener(d,b,!1)},cache:function(){Kinetic.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.")},clearCache:function(){}}),Kinetic.Util.extend(Kinetic.Stage,Kinetic.Container),Kinetic.Factory.addGetter(Kinetic.Stage,"container"),Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Stage,"container")}(),function(){Kinetic.Util.addMethods(Kinetic.BaseLayer,{___init:function(a){this.nodeType="Layer",Kinetic.Container.call(this,a)},createPNGStream:function(){return this.canvas._canvas.createPNGStream()},getCanvas:function(){return this.canvas},getHitCanvas:function(){return this.hitCanvas},getContext:function(){return this.getCanvas().getContext()},clear:function(a){return this.getContext().clear(a),this.getHitCanvas().getContext().clear(a),this},clearHitCache:function(){this._hitImageData=void 0},setZIndex:function(a){Kinetic.Node.prototype.setZIndex.call(this,a);var b=this.getStage();return b&&(b.content.removeChild(this.getCanvas()._canvas),a<b.getChildren().length-1?b.content.insertBefore(this.getCanvas()._canvas,b.getChildren()[a+1].getCanvas()._canvas):b.content.appendChild(this.getCanvas()._canvas)),this},moveToTop:function(){Kinetic.Node.prototype.moveToTop.call(this);var a=this.getStage();a&&(a.content.removeChild(this.getCanvas()._canvas),a.content.appendChild(this.getCanvas()._canvas))},moveUp:function(){if(Kinetic.Node.prototype.moveUp.call(this)){var a=this.getStage();a&&(a.content.removeChild(this.getCanvas()._canvas),this.index<a.getChildren().length-1?a.content.insertBefore(this.getCanvas()._canvas,a.getChildren()[this.index+1].getCanvas()._canvas):a.content.appendChild(this.getCanvas()._canvas))}},moveDown:function(){if(Kinetic.Node.prototype.moveDown.call(this)){var a=this.getStage();if(a){var b=a.getChildren();a.content.removeChild(this.getCanvas()._canvas),a.content.insertBefore(this.getCanvas()._canvas,b[this.index+1].getCanvas()._canvas)}}},moveToBottom:function(){if(Kinetic.Node.prototype.moveToBottom.call(this)){var a=this.getStage();if(a){var b=a.getChildren();a.content.removeChild(this.getCanvas()._canvas),a.content.insertBefore(this.getCanvas()._canvas,b[1].getCanvas()._canvas)}}},getLayer:function(){return this},remove:function(){var a=this.getCanvas()._canvas;return Kinetic.Node.prototype.remove.call(this),a&&a.parentNode&&Kinetic.Util._isInDocument(a)&&a.parentNode.removeChild(a),this},getStage:function(){return this.parent},setSize:function(a,b){this.canvas.setSize(a,b)},getWidth:function(){return this.parent?this.parent.getWidth():void 0},setWidth:function(){Kinetic.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.')},getHeight:function(){return this.parent?this.parent.getHeight():void 0},setHeight:function(){Kinetic.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.')}}),Kinetic.Util.extend(Kinetic.BaseLayer,Kinetic.Container),Kinetic.Factory.addGetterSetter(Kinetic.BaseLayer,"clearBeforeDraw",!0),Kinetic.Collection.mapMethods(Kinetic.BaseLayer)}(),function(){var a="#",b="beforeDraw",c="draw",d=[{x:0,y:0},{x:-1,y:0},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:-1,y:1}],e=d.length;Kinetic.Util.addMethods(Kinetic.Layer,{____init:function(a){this.nodeType="Layer",this.canvas=new Kinetic.SceneCanvas,this.hitCanvas=new Kinetic.HitCanvas,Kinetic.BaseLayer.call(this,a)},_setCanvasSize:function(a,b){this.canvas.setSize(a,b),this.hitCanvas.setSize(a,b)},_validateAdd:function(a){var b=a.getType();"Group"!==b&&"Shape"!==b&&Kinetic.Util.error("You may only add groups and shapes to a layer.")},getIntersection:function(a){var b,c,f,g;if(!this.hitGraphEnabled()||!this.isVisible())return null;for(var h=1,i=!1;;){for(c=0;e>c;c++){if(f=d[c],b=this._getIntersection({x:a.x+f.x*h,y:a.y+f.y*h}),g=b.shape)return g;b.antialiased&&(i=!0)}if(!i)return;h+=1}},_getImageData:function(a,b){var c=this.hitCanvas.width||1,d=this.hitCanvas.height||1,e=Math.round(b)*c+Math.round(a);return this._hitImageData||(this._hitImageData=this.hitCanvas.context.getImageData(0,0,c,d)),[this._hitImageData.data[4*e+0],this._hitImageData.data[4*e+1],this._hitImageData.data[4*e+2],this._hitImageData.data[4*e+3]]},_getIntersection:function(b){var c,d,e=this.hitCanvas.context.getImageData(b.x,b.y,1,1).data,f=e[3];return 255===f?(c=Kinetic.Util._rgbToHex(e[0],e[1],e[2]),d=Kinetic.shapes[a+c],{shape:d}):f>0?{antialiased:!0}:{}},drawScene:function(a,d){var e=this.getLayer(),f=a||e&&e.getCanvas();return this._fire(b,{node:this}),this.getClearBeforeDraw()&&f.getContext().clear(),Kinetic.Container.prototype.drawScene.call(this,f,d),this._fire(c,{node:this}),this},_applyTransform:function(a,b,c){var d=a.getAbsoluteTransform(c).getMatrix();b.transform(d[0],d[1],d[2],d[3],d[4],d[5])},drawHit:function(a,b){var c=this.getLayer(),d=a||c&&c.hitCanvas;return c&&c.getClearBeforeDraw()&&c.getHitCanvas().getContext().clear(),Kinetic.Container.prototype.drawHit.call(this,d,b),this},clear:function(a){return this.getContext().clear(a),this.getHitCanvas().getContext().clear(a),this.imageData=null,this},setVisible:function(a){return Kinetic.Node.prototype.setVisible.call(this,a),a?(this.getCanvas()._canvas.style.display="block",this.hitCanvas._canvas.style.display="block"):(this.getCanvas()._canvas.style.display="none",this.hitCanvas._canvas.style.display="none"),this},enableHitGraph:function(){return this.setHitGraphEnabled(!0),this},disableHitGraph:function(){return this.setHitGraphEnabled(!1),this},setSize:function(a,b){Kinetic.BaseLayer.prototype.setSize.call(this,a,b),this.hitCanvas.setSize(a,b)}}),Kinetic.Util.extend(Kinetic.Layer,Kinetic.BaseLayer),Kinetic.Factory.addGetterSetter(Kinetic.Layer,"hitGraphEnabled",!0),Kinetic.Collection.mapMethods(Kinetic.Layer)}(),function(){Kinetic.Util.addMethods(Kinetic.FastLayer,{____init:function(a){this.nodeType="Layer",this.canvas=new Kinetic.SceneCanvas,Kinetic.BaseLayer.call(this,a)},_validateAdd:function(a){var b=a.getType();"Shape"!==b&&Kinetic.Util.error("You may only add shapes to a fast layer.")},_setCanvasSize:function(a,b){this.canvas.setSize(a,b)},hitGraphEnabled:function(){return!1},getIntersection:function(){return null},drawScene:function(a){var b=this.getLayer(),c=a||b&&b.getCanvas();return this.getClearBeforeDraw()&&c.getContext().clear(),Kinetic.Container.prototype.drawScene.call(this,c),this},_applyTransform:function(a,b,c){if(!c||c._id!==this._id){var d=a.getTransform().getMatrix();b.transform(d[0],d[1],d[2],d[3],d[4],d[5])}},draw:function(){return this.drawScene(),this},clear:function(a){return this.getContext().clear(a),this},setVisible:function(a){return Kinetic.Node.prototype.setVisible.call(this,a),this.getCanvas()._canvas.style.display=a?"block":"none",this}}),Kinetic.Util.extend(Kinetic.FastLayer,Kinetic.BaseLayer),Kinetic.Collection.mapMethods(Kinetic.FastLayer)}(),function(){Kinetic.Util.addMethods(Kinetic.Group,{___init:function(a){this.nodeType="Group",Kinetic.Container.call(this,a)},_validateAdd:function(a){var b=a.getType();"Group"!==b&&"Shape"!==b&&Kinetic.Util.error("You may only add groups and shapes to groups.")}}),Kinetic.Util.extend(Kinetic.Group,Kinetic.Container),Kinetic.Collection.mapMethods(Kinetic.Group)}(),function(){Kinetic.Rect=function(a){this.___init(a)},Kinetic.Rect.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Rect",this.sceneFunc(this._sceneFunc)},_sceneFunc:function(a){var b=this.getCornerRadius(),c=this.getWidth(),d=this.getHeight();a.beginPath(),b?(a.moveTo(b,0),a.lineTo(c-b,0),a.arc(c-b,b,b,3*Math.PI/2,0,!1),a.lineTo(c,d-b),a.arc(c-b,d-b,b,0,Math.PI/2,!1),a.lineTo(b,d),a.arc(b,d-b,b,Math.PI/2,Math.PI,!1),a.lineTo(0,b),a.arc(b,b,b,Math.PI,3*Math.PI/2,!1)):a.rect(0,0,c,d),a.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.Rect,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Rect,"cornerRadius",0),Kinetic.Collection.mapMethods(Kinetic.Rect)}(),function(){var a=2*Math.PI-1e-4,b="Circle";Kinetic.Circle=function(a){this.___init(a)},Kinetic.Circle.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className=b,this.sceneFunc(this._sceneFunc)},_sceneFunc:function(b){b.beginPath(),b.arc(0,0,this.getRadius(),0,a,!1),b.closePath(),b.fillStrokeShape(this)},getWidth:function(){return 2*this.getRadius()},getHeight:function(){return 2*this.getRadius()},setWidth:function(a){Kinetic.Node.prototype.setWidth.call(this,a),this.setRadius(a/2)},setHeight:function(a){Kinetic.Node.prototype.setHeight.call(this,a),this.setRadius(a/2)}},Kinetic.Util.extend(Kinetic.Circle,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Circle,"radius",0),Kinetic.Collection.mapMethods(Kinetic.Circle)}(),function(){var a=2*Math.PI-1e-4,b="Ellipse";Kinetic.Ellipse=function(a){this.___init(a)},Kinetic.Ellipse.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className=b,this.sceneFunc(this._sceneFunc)},_sceneFunc:function(b){var c=this.getRadiusX(),d=this.getRadiusY();b.beginPath(),b.save(),c!==d&&b.scale(1,d/c),b.arc(0,0,c,0,a,!1),b.restore(),b.closePath(),b.fillStrokeShape(this)},getWidth:function(){return 2*this.getRadiusX()},getHeight:function(){return 2*this.getRadiusY()},setWidth:function(a){Kinetic.Node.prototype.setWidth.call(this,a),this.setRadius({x:a/2})},setHeight:function(a){Kinetic.Node.prototype.setHeight.call(this,a),this.setRadius({y:a/2})}},Kinetic.Util.extend(Kinetic.Ellipse,Kinetic.Shape),Kinetic.Factory.addComponentsGetterSetter(Kinetic.Ellipse,"radius",["x","y"]),Kinetic.Factory.addGetterSetter(Kinetic.Ellipse,"radiusX",0),Kinetic.Factory.addGetterSetter(Kinetic.Ellipse,"radiusY",0),Kinetic.Collection.mapMethods(Kinetic.Ellipse)}(),function(){var a=2*Math.PI-1e-4;Kinetic.Ring=function(a){this.___init(a)},Kinetic.Ring.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Ring",this.sceneFunc(this._sceneFunc)},_sceneFunc:function(b){b.beginPath(),b.arc(0,0,this.getInnerRadius(),0,a,!1),b.moveTo(this.getOuterRadius(),0),b.arc(0,0,this.getOuterRadius(),a,0,!0),b.closePath(),b.fillStrokeShape(this)},getWidth:function(){return 2*this.getOuterRadius()},getHeight:function(){return 2*this.getOuterRadius()},setWidth:function(a){Kinetic.Node.prototype.setWidth.call(this,a),this.setOuterRadius(a/2)},setHeight:function(a){Kinetic.Node.prototype.setHeight.call(this,a),this.setOuterRadius(a/2)}},Kinetic.Util.extend(Kinetic.Ring,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Ring,"innerRadius",0),Kinetic.Factory.addGetterSetter(Kinetic.Ring,"outerRadius",0),Kinetic.Collection.mapMethods(Kinetic.Ring)}(),function(){Kinetic.Wedge=function(a){this.___init(a)},Kinetic.Wedge.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Wedge",this.sceneFunc(this._sceneFunc)},_sceneFunc:function(a){a.beginPath(),a.arc(0,0,this.getRadius(),0,Kinetic.getAngle(this.getAngle()),this.getClockwise()),a.lineTo(0,0),a.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.Wedge,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Wedge,"radius",0),Kinetic.Factory.addGetterSetter(Kinetic.Wedge,"angle",0),Kinetic.Factory.addGetterSetter(Kinetic.Wedge,"clockwise",!1),Kinetic.Factory.backCompat(Kinetic.Wedge,{angleDeg:"angle",getAngleDeg:"getAngle",setAngleDeg:"setAngle"}),Kinetic.Collection.mapMethods(Kinetic.Wedge)}(),function(){Math.PI/180;Kinetic.Arc=function(a){this.___init(a)},Kinetic.Arc.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Arc",this.sceneFunc(this._sceneFunc)},_sceneFunc:function(a){var b=Kinetic.getAngle(this.angle()),c=this.clockwise();a.beginPath(),a.arc(0,0,this.getOuterRadius(),0,b,c),a.arc(0,0,this.getInnerRadius(),b,0,!c),a.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.Arc,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Arc,"innerRadius",0),Kinetic.Factory.addGetterSetter(Kinetic.Arc,"outerRadius",0),Kinetic.Factory.addGetterSetter(Kinetic.Arc,"angle",0),Kinetic.Factory.addGetterSetter(Kinetic.Arc,"clockwise",!1),Kinetic.Collection.mapMethods(Kinetic.Arc)}(),function(){var a="Image";Kinetic.Image=function(a){this.___init(a)},Kinetic.Image.prototype={___init:function(b){Kinetic.Shape.call(this,b),this.className=a,this.sceneFunc(this._sceneFunc),this.hitFunc(this._hitFunc)},_useBufferCanvas:function(){return(this.hasShadow()||1!==this.getAbsoluteOpacity())&&this.hasStroke()&&this.getStage()},_sceneFunc:function(a){var b,c,d,e=this.getWidth(),f=this.getHeight(),g=this.getImage();g&&(b=this.getCropWidth(),c=this.getCropHeight(),d=b&&c?[g,this.getCropX(),this.getCropY(),b,c,0,0,e,f]:[g,0,0,e,f]),(this.hasFill()||this.hasStroke()||this.hasShadow())&&(a.beginPath(),a.rect(0,0,e,f),a.closePath(),a.fillStrokeShape(this)),g&&a.drawImage.apply(a,d)},_hitFunc:function(a){var b=this.getWidth(),c=this.getHeight();a.beginPath(),a.rect(0,0,b,c),a.closePath(),a.fillStrokeShape(this)},getWidth:function(){var a=this.getImage();return this.attrs.width||(a?a.width:0)},getHeight:function(){var a=this.getImage();return this.attrs.height||(a?a.height:0)}},Kinetic.Util.extend(Kinetic.Image,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Image,"image"),Kinetic.Factory.addComponentsGetterSetter(Kinetic.Image,"crop",["x","y","width","height"]),Kinetic.Factory.addGetterSetter(Kinetic.Image,"cropX",0),Kinetic.Factory.addGetterSetter(Kinetic.Image,"cropY",0),Kinetic.Factory.addGetterSetter(Kinetic.Image,"cropWidth",0),Kinetic.Factory.addGetterSetter(Kinetic.Image,"cropHeight",0),Kinetic.Collection.mapMethods(Kinetic.Image)
}(),function(){function a(a){a.fillText(this.partialText,0,0)}function b(a){a.strokeText(this.partialText,0,0)}var c="auto",d="center",e="Change.kinetic",f="2d",g="-",h="",i="left",j="text",k="Text",l="middle",m="normal",n="px ",o=" ",p="right",q="word",r="char",s="none",t=["fontFamily","fontSize","fontStyle","fontVariant","padding","align","lineHeight","text","width","height","wrap"],u=t.length,v=Kinetic.Util.createCanvasElement().getContext(f);Kinetic.Text=function(a){this.___init(a)},Kinetic.Text.prototype={___init:function(d){var f=this;void 0===d.width&&(d.width=c),void 0===d.height&&(d.height=c),Kinetic.Shape.call(this,d),this._fillFunc=a,this._strokeFunc=b,this.className=k;for(var g=0;u>g;g++)this.on(t[g]+e,f._setTextData);this._setTextData(),this.sceneFunc(this._sceneFunc),this.hitFunc(this._hitFunc)},_sceneFunc:function(a){var b,c=this.getPadding(),e=this.getTextHeight(),f=this.getLineHeight()*e,g=this.textArr,h=g.length,j=this.getWidth();for(a.setAttr("font",this._getContextFont()),a.setAttr("textBaseline",l),a.setAttr("textAlign",i),a.save(),a.translate(c,0),a.translate(0,c+e/2),b=0;h>b;b++){var k=g[b],m=k.text,n=k.width;a.save(),this.getAlign()===p?a.translate(j-n-2*c,0):this.getAlign()===d&&a.translate((j-n-2*c)/2,0),this.partialText=m,a.fillStrokeShape(this),a.restore(),a.translate(0,f)}a.restore()},_hitFunc:function(a){var b=this.getWidth(),c=this.getHeight();a.beginPath(),a.rect(0,0,b,c),a.closePath(),a.fillStrokeShape(this)},setText:function(a){var b=Kinetic.Util._isString(a)?a:a.toString();return this._setAttr(j,b),this},getWidth:function(){return this.attrs.width===c?this.getTextWidth()+2*this.getPadding():this.attrs.width},getHeight:function(){return this.attrs.height===c?this.getTextHeight()*this.textArr.length*this.getLineHeight()+2*this.getPadding():this.attrs.height},getTextWidth:function(){return this.textWidth},getTextHeight:function(){return this.textHeight},_getTextSize:function(a){var b,c=v,d=this.getFontSize();return c.save(),c.font=this._getContextFont(),b=c.measureText(a),c.restore(),{width:b.width,height:parseInt(d,10)}},_getContextFont:function(){return this.getFontStyle()+o+this.getFontVariant()+o+this.getFontSize()+n+this.getFontFamily()},_addTextLine:function(a,b){return this.textArr.push({text:a,width:b})},_getTextWidth:function(a){return v.measureText(a).width},_setTextData:function(){var a=this.getText().split("\n"),b=+this.getFontSize(),d=0,e=this.getLineHeight()*b,f=this.attrs.width,h=this.attrs.height,i=f!==c,j=h!==c,k=this.getPadding(),l=f-2*k,m=h-2*k,n=0,p=this.getWrap(),q=p!==s,t=p!==r&&q;this.textArr=[],v.save(),v.font=this._getContextFont();for(var u=0,w=a.length;w>u;++u){var x=a[u],y=this._getTextWidth(x);if(i&&y>l)for(;x.length>0;){for(var z=0,A=x.length,B="",C=0;A>z;){var D=z+A>>>1,E=x.slice(0,D+1),F=this._getTextWidth(E);l>=F?(z=D+1,B=E,C=F):A=D}if(!B)break;if(t){var G=Math.max(B.lastIndexOf(o),B.lastIndexOf(g))+1;G>0&&(z=G,B=B.slice(0,z),C=this._getTextWidth(B))}if(this._addTextLine(B,C),d=Math.max(d,C),n+=e,!q||j&&n+e>m)break;if(x=x.slice(z),x.length>0&&(y=this._getTextWidth(x),l>=y)){this._addTextLine(x,y),n+=e,d=Math.max(d,y);break}}else this._addTextLine(x,y),n+=e,d=Math.max(d,y);if(j&&n+e>m)break}v.restore(),this.textHeight=b,this.textWidth=d}},Kinetic.Util.extend(Kinetic.Text,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Text,"fontFamily","Arial"),Kinetic.Factory.addGetterSetter(Kinetic.Text,"fontSize",12),Kinetic.Factory.addGetterSetter(Kinetic.Text,"fontStyle",m),Kinetic.Factory.addGetterSetter(Kinetic.Text,"fontVariant",m),Kinetic.Factory.addGetterSetter(Kinetic.Text,"padding",0),Kinetic.Factory.addGetterSetter(Kinetic.Text,"align",i),Kinetic.Factory.addGetterSetter(Kinetic.Text,"lineHeight",1),Kinetic.Factory.addGetterSetter(Kinetic.Text,"wrap",q),Kinetic.Factory.addGetter(Kinetic.Text,"text",h),Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Text,"text"),Kinetic.Collection.mapMethods(Kinetic.Text)}(),function(){Kinetic.Line=function(a){this.___init(a)},Kinetic.Line.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Line",this.on("pointsChange.kinetic tensionChange.kinetic closedChange.kinetic",function(){this._clearCache("tensionPoints")}),this.sceneFunc(this._sceneFunc)},_sceneFunc:function(a){var b,c,d,e=this.getPoints(),f=e.length,g=this.getTension(),h=this.getClosed();if(a.beginPath(),a.moveTo(e[0],e[1]),0!==g&&f>4){for(b=this.getTensionPoints(),c=b.length,d=h?0:4,h||a.quadraticCurveTo(b[0],b[1],b[2],b[3]);c-2>d;)a.bezierCurveTo(b[d++],b[d++],b[d++],b[d++],b[d++],b[d++]);h||a.quadraticCurveTo(b[c-2],b[c-1],e[f-2],e[f-1])}else for(d=2;f>d;d+=2)a.lineTo(e[d],e[d+1]);h?(a.closePath(),a.fillStrokeShape(this)):a.strokeShape(this)},getTensionPoints:function(){return this._getCache("tensionPoints",this._getTensionPoints)},_getTensionPoints:function(){return this.getClosed()?this._getTensionPointsClosed():Kinetic.Util._expandPoints(this.getPoints(),this.getTension())},_getTensionPointsClosed:function(){var a=this.getPoints(),b=a.length,c=this.getTension(),d=Kinetic.Util,e=d._getControlPoints(a[b-2],a[b-1],a[0],a[1],a[2],a[3],c),f=d._getControlPoints(a[b-4],a[b-3],a[b-2],a[b-1],a[0],a[1],c),g=Kinetic.Util._expandPoints(a,c),h=[e[2],e[3]].concat(g).concat([f[0],f[1],a[b-2],a[b-1],f[2],f[3],e[0],e[1],a[0],a[1]]);return h}},Kinetic.Util.extend(Kinetic.Line,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Line,"closed",!1),Kinetic.Factory.addGetterSetter(Kinetic.Line,"tension",0),Kinetic.Factory.addGetterSetter(Kinetic.Line,"points"),Kinetic.Collection.mapMethods(Kinetic.Line)}(),function(){Kinetic.Sprite=function(a){this.___init(a)},Kinetic.Sprite.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Sprite",this.anim=new Kinetic.Animation,this.on("animationChange.kinetic",function(){this.frameIndex(0)}),this.on("frameRateChange.kinetic",function(){this.anim.isRunning()&&(clearInterval(this.interval),this._setInterval())}),this.sceneFunc(this._sceneFunc),this.hitFunc(this._hitFunc)},_sceneFunc:function(a){var b=this.getAnimation(),c=this.frameIndex(),d=4*c,e=this.getAnimations()[b],f=e[d+0],g=e[d+1],h=e[d+2],i=e[d+3],j=this.getImage();j&&a.drawImage(j,f,g,h,i,0,0,h,i)},_hitFunc:function(a){var b=this.getAnimation(),c=this.frameIndex(),d=4*c,e=this.getAnimations()[b],f=e[d+2],g=e[d+3];a.beginPath(),a.rect(0,0,f,g),a.closePath(),a.fillShape(this)},_useBufferCanvas:function(){return(this.hasShadow()||1!==this.getAbsoluteOpacity())&&this.hasStroke()},_setInterval:function(){var a=this;this.interval=setInterval(function(){a._updateIndex()},1e3/this.getFrameRate())},start:function(){var a=this.getLayer();this.anim.setLayers(a),this._setInterval(),this.anim.start()},stop:function(){this.anim.stop(),clearInterval(this.interval)},isRunning:function(){return this.anim.isRunning()},_updateIndex:function(){var a=this.frameIndex(),b=this.getAnimation(),c=this.getAnimations(),d=c[b],e=d.length/4;this.frameIndex(e-1>a?a+1:0)}},Kinetic.Util.extend(Kinetic.Sprite,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Sprite,"animation"),Kinetic.Factory.addGetterSetter(Kinetic.Sprite,"animations"),Kinetic.Factory.addGetterSetter(Kinetic.Sprite,"image"),Kinetic.Factory.addGetterSetter(Kinetic.Sprite,"frameIndex",0),Kinetic.Factory.addGetterSetter(Kinetic.Sprite,"frameRate",17),Kinetic.Factory.backCompat(Kinetic.Sprite,{index:"frameIndex",getIndex:"getFrameIndex",setIndex:"setFrameIndex"}),Kinetic.Collection.mapMethods(Kinetic.Sprite)}(),function(){Kinetic.Path=function(a){this.___init(a)},Kinetic.Path.prototype={___init:function(a){this.dataArray=[];var b=this;Kinetic.Shape.call(this,a),this.className="Path",this.dataArray=Kinetic.Path.parsePathData(this.getData()),this.on("dataChange.kinetic",function(){b.dataArray=Kinetic.Path.parsePathData(this.getData())}),this.sceneFunc(this._sceneFunc)},_sceneFunc:function(a){var b=this.dataArray,c=!1;a.beginPath();for(var d=0;d<b.length;d++){var e=b[d].command,f=b[d].points;switch(e){case"L":a.lineTo(f[0],f[1]);break;case"M":a.moveTo(f[0],f[1]);break;case"C":a.bezierCurveTo(f[0],f[1],f[2],f[3],f[4],f[5]);break;case"Q":a.quadraticCurveTo(f[0],f[1],f[2],f[3]);break;case"A":var g=f[0],h=f[1],i=f[2],j=f[3],k=f[4],l=f[5],m=f[6],n=f[7],o=i>j?i:j,p=i>j?1:i/j,q=i>j?j/i:1;a.translate(g,h),a.rotate(m),a.scale(p,q),a.arc(0,0,o,k,k+l,1-n),a.scale(1/p,1/q),a.rotate(-m),a.translate(-g,-h);break;case"z":a.closePath(),c=!0}}c?a.fillStrokeShape(this):a.strokeShape(this)}},Kinetic.Util.extend(Kinetic.Path,Kinetic.Shape),Kinetic.Path.getLineLength=function(a,b,c,d){return Math.sqrt((c-a)*(c-a)+(d-b)*(d-b))},Kinetic.Path.getPointOnLine=function(a,b,c,d,e,f,g){void 0===f&&(f=b),void 0===g&&(g=c);var h=(e-c)/(d-b+1e-8),i=Math.sqrt(a*a/(1+h*h));b>d&&(i*=-1);var j,k=h*i;if(d===b)j={x:f,y:g+k};else if((g-c)/(f-b+1e-8)===h)j={x:f+i,y:g+k};else{var l,m,n=this.getLineLength(b,c,d,e);if(1e-8>n)return void 0;var o=(f-b)*(d-b)+(g-c)*(e-c);o/=n*n,l=b+o*(d-b),m=c+o*(e-c);var p=this.getLineLength(f,g,l,m),q=Math.sqrt(a*a-p*p);i=Math.sqrt(q*q/(1+h*h)),b>d&&(i*=-1),k=h*i,j={x:l+i,y:m+k}}return j},Kinetic.Path.getPointOnCubicBezier=function(a,b,c,d,e,f,g,h,i){function j(a){return a*a*a}function k(a){return 3*a*a*(1-a)}function l(a){return 3*a*(1-a)*(1-a)}function m(a){return(1-a)*(1-a)*(1-a)}var n=h*j(a)+f*k(a)+d*l(a)+b*m(a),o=i*j(a)+g*k(a)+e*l(a)+c*m(a);return{x:n,y:o}},Kinetic.Path.getPointOnQuadraticBezier=function(a,b,c,d,e,f,g){function h(a){return a*a}function i(a){return 2*a*(1-a)}function j(a){return(1-a)*(1-a)}var k=f*h(a)+d*i(a)+b*j(a),l=g*h(a)+e*i(a)+c*j(a);return{x:k,y:l}},Kinetic.Path.getPointOnEllipticalArc=function(a,b,c,d,e,f){var g=Math.cos(f),h=Math.sin(f),i={x:c*Math.cos(e),y:d*Math.sin(e)};return{x:a+(i.x*g-i.y*h),y:b+(i.x*h+i.y*g)}},Kinetic.Path.parsePathData=function(a){if(!a)return[];var b=a,c=["m","M","l","L","v","V","h","H","z","Z","c","C","q","Q","t","T","s","S","a","A"];b=b.replace(new RegExp(" ","g"),",");for(var d=0;d<c.length;d++)b=b.replace(new RegExp(c[d],"g"),"|"+c[d]);var e=b.split("|"),f=[],g=0,h=0;for(d=1;d<e.length;d++){var i=e[d],j=i.charAt(0);i=i.slice(1),i=i.replace(new RegExp(",-","g"),"-"),i=i.replace(new RegExp("-","g"),",-"),i=i.replace(new RegExp("e,-","g"),"e-");var k=i.split(",");k.length>0&&""===k[0]&&k.shift();for(var l=0;l<k.length;l++)k[l]=parseFloat(k[l]);for(;k.length>0&&!isNaN(k[0]);){var m,n,o,p,q,r,s,t,u,v,w=null,x=[],y=g,z=h;switch(j){case"l":g+=k.shift(),h+=k.shift(),w="L",x.push(g,h);break;case"L":g=k.shift(),h=k.shift(),x.push(g,h);break;case"m":var A=k.shift(),B=k.shift();if(g+=A,h+=B,w="M",f.length>2&&"z"===f[f.length-1].command)for(var C=f.length-2;C>=0;C--)if("M"===f[C].command){g=f[C].points[0]+A,h=f[C].points[1]+B;break}x.push(g,h),j="l";break;case"M":g=k.shift(),h=k.shift(),w="M",x.push(g,h),j="L";break;case"h":g+=k.shift(),w="L",x.push(g,h);break;case"H":g=k.shift(),w="L",x.push(g,h);break;case"v":h+=k.shift(),w="L",x.push(g,h);break;case"V":h=k.shift(),w="L",x.push(g,h);break;case"C":x.push(k.shift(),k.shift(),k.shift(),k.shift()),g=k.shift(),h=k.shift(),x.push(g,h);break;case"c":x.push(g+k.shift(),h+k.shift(),g+k.shift(),h+k.shift()),g+=k.shift(),h+=k.shift(),w="C",x.push(g,h);break;case"S":n=g,o=h,m=f[f.length-1],"C"===m.command&&(n=g+(g-m.points[2]),o=h+(h-m.points[3])),x.push(n,o,k.shift(),k.shift()),g=k.shift(),h=k.shift(),w="C",x.push(g,h);break;case"s":n=g,o=h,m=f[f.length-1],"C"===m.command&&(n=g+(g-m.points[2]),o=h+(h-m.points[3])),x.push(n,o,g+k.shift(),h+k.shift()),g+=k.shift(),h+=k.shift(),w="C",x.push(g,h);break;case"Q":x.push(k.shift(),k.shift()),g=k.shift(),h=k.shift(),x.push(g,h);break;case"q":x.push(g+k.shift(),h+k.shift()),g+=k.shift(),h+=k.shift(),w="Q",x.push(g,h);break;case"T":n=g,o=h,m=f[f.length-1],"Q"===m.command&&(n=g+(g-m.points[0]),o=h+(h-m.points[1])),g=k.shift(),h=k.shift(),w="Q",x.push(n,o,g,h);break;case"t":n=g,o=h,m=f[f.length-1],"Q"===m.command&&(n=g+(g-m.points[0]),o=h+(h-m.points[1])),g+=k.shift(),h+=k.shift(),w="Q",x.push(n,o,g,h);break;case"A":p=k.shift(),q=k.shift(),r=k.shift(),s=k.shift(),t=k.shift(),u=g,v=h,g=k.shift(),h=k.shift(),w="A",x=this.convertEndpointToCenterParameterization(u,v,g,h,s,t,p,q,r);break;case"a":p=k.shift(),q=k.shift(),r=k.shift(),s=k.shift(),t=k.shift(),u=g,v=h,g+=k.shift(),h+=k.shift(),w="A",x=this.convertEndpointToCenterParameterization(u,v,g,h,s,t,p,q,r)}f.push({command:w||j,points:x,start:{x:y,y:z},pathLength:this.calcLength(y,z,w||j,x)})}("z"===j||"Z"===j)&&f.push({command:"z",points:[],start:void 0,pathLength:0})}return f},Kinetic.Path.calcLength=function(a,b,c,d){var e,f,g,h,i=Kinetic.Path;switch(c){case"L":return i.getLineLength(a,b,d[0],d[1]);case"C":for(e=0,f=i.getPointOnCubicBezier(0,a,b,d[0],d[1],d[2],d[3],d[4],d[5]),h=.01;1>=h;h+=.01)g=i.getPointOnCubicBezier(h,a,b,d[0],d[1],d[2],d[3],d[4],d[5]),e+=i.getLineLength(f.x,f.y,g.x,g.y),f=g;return e;case"Q":for(e=0,f=i.getPointOnQuadraticBezier(0,a,b,d[0],d[1],d[2],d[3]),h=.01;1>=h;h+=.01)g=i.getPointOnQuadraticBezier(h,a,b,d[0],d[1],d[2],d[3]),e+=i.getLineLength(f.x,f.y,g.x,g.y),f=g;return e;case"A":e=0;var j=d[4],k=d[5],l=d[4]+k,m=Math.PI/180;if(Math.abs(j-l)<m&&(m=Math.abs(j-l)),f=i.getPointOnEllipticalArc(d[0],d[1],d[2],d[3],j,0),0>k)for(h=j-m;h>l;h-=m)g=i.getPointOnEllipticalArc(d[0],d[1],d[2],d[3],h,0),e+=i.getLineLength(f.x,f.y,g.x,g.y),f=g;else for(h=j+m;l>h;h+=m)g=i.getPointOnEllipticalArc(d[0],d[1],d[2],d[3],h,0),e+=i.getLineLength(f.x,f.y,g.x,g.y),f=g;return g=i.getPointOnEllipticalArc(d[0],d[1],d[2],d[3],l,0),e+=i.getLineLength(f.x,f.y,g.x,g.y)}return 0},Kinetic.Path.convertEndpointToCenterParameterization=function(a,b,c,d,e,f,g,h,i){var j=i*(Math.PI/180),k=Math.cos(j)*(a-c)/2+Math.sin(j)*(b-d)/2,l=-1*Math.sin(j)*(a-c)/2+Math.cos(j)*(b-d)/2,m=k*k/(g*g)+l*l/(h*h);m>1&&(g*=Math.sqrt(m),h*=Math.sqrt(m));var n=Math.sqrt((g*g*h*h-g*g*l*l-h*h*k*k)/(g*g*l*l+h*h*k*k));e===f&&(n*=-1),isNaN(n)&&(n=0);var o=n*g*l/h,p=n*-h*k/g,q=(a+c)/2+Math.cos(j)*o-Math.sin(j)*p,r=(b+d)/2+Math.sin(j)*o+Math.cos(j)*p,s=function(a){return Math.sqrt(a[0]*a[0]+a[1]*a[1])},t=function(a,b){return(a[0]*b[0]+a[1]*b[1])/(s(a)*s(b))},u=function(a,b){return(a[0]*b[1]<a[1]*b[0]?-1:1)*Math.acos(t(a,b))},v=u([1,0],[(k-o)/g,(l-p)/h]),w=[(k-o)/g,(l-p)/h],x=[(-1*k-o)/g,(-1*l-p)/h],y=u(w,x);return t(w,x)<=-1&&(y=Math.PI),t(w,x)>=1&&(y=0),0===f&&y>0&&(y-=2*Math.PI),1===f&&0>y&&(y+=2*Math.PI),[q,r,g,h,v,y,j,f]},Kinetic.Factory.addGetterSetter(Kinetic.Path,"data"),Kinetic.Collection.mapMethods(Kinetic.Path)}(),function(){function a(a){a.fillText(this.partialText,0,0)}function b(a){a.strokeText(this.partialText,0,0)}var c="",d="normal";Kinetic.TextPath=function(a){this.___init(a)},Kinetic.TextPath.prototype={___init:function(c){var d=this;this.dummyCanvas=Kinetic.Util.createCanvasElement(),this.dataArray=[],Kinetic.Shape.call(this,c),this._fillFunc=a,this._strokeFunc=b,this._fillFuncHit=a,this._strokeFuncHit=b,this.className="TextPath",this.dataArray=Kinetic.Path.parsePathData(this.attrs.data),this.on("dataChange.kinetic",function(){d.dataArray=Kinetic.Path.parsePathData(this.attrs.data)}),this.on("textChange.kinetic textStroke.kinetic textStrokeWidth.kinetic",d._setTextData),d._setTextData(),this.sceneFunc(this._sceneFunc)},_sceneFunc:function(a){a.setAttr("font",this._getContextFont()),a.setAttr("textBaseline","middle"),a.setAttr("textAlign","left"),a.save();for(var b=this.glyphInfo,c=0;c<b.length;c++){a.save();var d=b[c].p0;a.translate(d.x,d.y),a.rotate(b[c].rotation),this.partialText=b[c].text,a.fillStrokeShape(this),a.restore()}a.restore()},getTextWidth:function(){return this.textWidth},getTextHeight:function(){return this.textHeight},setText:function(a){Kinetic.Text.prototype.setText.call(this,a)},_getTextSize:function(a){var b=this.dummyCanvas,c=b.getContext("2d");c.save(),c.font=this._getContextFont();var d=c.measureText(a);return c.restore(),{width:d.width,height:parseInt(this.attrs.fontSize,10)}},_setTextData:function(){var a=this,b=this._getTextSize(this.attrs.text);this.textWidth=b.width,this.textHeight=b.height,this.glyphInfo=[];for(var c,d,e,f=this.attrs.text.split(""),g=-1,h=0,i=function(){h=0;for(var b=a.dataArray,d=g+1;d<b.length;d++){if(b[d].pathLength>0)return g=d,b[d];"M"==b[d].command&&(c={x:b[d].points[0],y:b[d].points[1]})}return{}},j=function(b){var f=a._getTextSize(b).width,g=0,j=0;for(d=void 0;Math.abs(f-g)/f>.01&&25>j;){j++;for(var k=g;void 0===e;)e=i(),e&&k+e.pathLength<f&&(k+=e.pathLength,e=void 0);if(e==={}||void 0===c)return void 0;var l=!1;switch(e.command){case"L":Kinetic.Path.getLineLength(c.x,c.y,e.points[0],e.points[1])>f?d=Kinetic.Path.getPointOnLine(f,c.x,c.y,e.points[0],e.points[1],c.x,c.y):e=void 0;break;case"A":var m=e.points[4],n=e.points[5],o=e.points[4]+n;0===h?h=m+1e-8:f>g?h+=Math.PI/180*n/Math.abs(n):h-=Math.PI/360*n/Math.abs(n),(0>n&&o>h||n>=0&&h>o)&&(h=o,l=!0),d=Kinetic.Path.getPointOnEllipticalArc(e.points[0],e.points[1],e.points[2],e.points[3],h,e.points[6]);break;case"C":0===h?h=f>e.pathLength?1e-8:f/e.pathLength:f>g?h+=(f-g)/e.pathLength:h-=(g-f)/e.pathLength,h>1&&(h=1,l=!0),d=Kinetic.Path.getPointOnCubicBezier(h,e.start.x,e.start.y,e.points[0],e.points[1],e.points[2],e.points[3],e.points[4],e.points[5]);break;case"Q":0===h?h=f/e.pathLength:f>g?h+=(f-g)/e.pathLength:h-=(g-f)/e.pathLength,h>1&&(h=1,l=!0),d=Kinetic.Path.getPointOnQuadraticBezier(h,e.start.x,e.start.y,e.points[0],e.points[1],e.points[2],e.points[3])}void 0!==d&&(g=Kinetic.Path.getLineLength(c.x,c.y,d.x,d.y)),l&&(l=!1,e=void 0)}},k=0;k<f.length&&(j(f[k]),void 0!==c&&void 0!==d);k++){var l=Kinetic.Path.getLineLength(c.x,c.y,d.x,d.y),m=0,n=Kinetic.Path.getPointOnLine(m+l/2,c.x,c.y,d.x,d.y),o=Math.atan2(d.y-c.y,d.x-c.x);this.glyphInfo.push({transposeX:n.x,transposeY:n.y,text:f[k],rotation:o,p0:c,p1:d}),c=d}}},Kinetic.TextPath.prototype._getContextFont=Kinetic.Text.prototype._getContextFont,Kinetic.Util.extend(Kinetic.TextPath,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.TextPath,"fontFamily","Arial"),Kinetic.Factory.addGetterSetter(Kinetic.TextPath,"fontSize",12),Kinetic.Factory.addGetterSetter(Kinetic.TextPath,"fontStyle",d),Kinetic.Factory.addGetterSetter(Kinetic.TextPath,"fontVariant",d),Kinetic.Factory.addGetter(Kinetic.TextPath,"text",c),Kinetic.Collection.mapMethods(Kinetic.TextPath)}(),function(){Kinetic.RegularPolygon=function(a){this.___init(a)},Kinetic.RegularPolygon.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="RegularPolygon",this.sceneFunc(this._sceneFunc)},_sceneFunc:function(a){var b,c,d,e=this.attrs.sides,f=this.attrs.radius;for(a.beginPath(),a.moveTo(0,0-f),b=1;e>b;b++)c=f*Math.sin(2*b*Math.PI/e),d=-1*f*Math.cos(2*b*Math.PI/e),a.lineTo(c,d);a.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.RegularPolygon,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.RegularPolygon,"radius",0),Kinetic.Factory.addGetterSetter(Kinetic.RegularPolygon,"sides",0),Kinetic.Collection.mapMethods(Kinetic.RegularPolygon)}(),function(){Kinetic.Star=function(a){this.___init(a)},Kinetic.Star.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Star",this.sceneFunc(this._sceneFunc)},_sceneFunc:function(a){var b=this.innerRadius(),c=this.outerRadius(),d=this.numPoints();a.beginPath(),a.moveTo(0,0-c);for(var e=1;2*d>e;e++){var f=e%2===0?c:b,g=f*Math.sin(e*Math.PI/d),h=-1*f*Math.cos(e*Math.PI/d);a.lineTo(g,h)}a.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.Star,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Star,"numPoints",5),Kinetic.Factory.addGetterSetter(Kinetic.Star,"innerRadius",0),Kinetic.Factory.addGetterSetter(Kinetic.Star,"outerRadius",0),Kinetic.Collection.mapMethods(Kinetic.Star)}(),function(){var a=["fontFamily","fontSize","fontStyle","padding","lineHeight","text"],b="Change.kinetic",c="none",d="up",e="right",f="down",g="left",h="Label",i=a.length;Kinetic.Label=function(a){this.____init(a)},Kinetic.Label.prototype={____init:function(a){var b=this;Kinetic.Group.call(this,a),this.className=h,this.on("add.kinetic",function(a){b._addListeners(a.child),b._sync()})},getText:function(){return this.find("Text")[0]},getTag:function(){return this.find("Tag")[0]},_addListeners:function(c){var d,e=this,f=function(){e._sync()};for(d=0;i>d;d++)c.on(a[d]+b,f)},getWidth:function(){return this.getText().getWidth()},getHeight:function(){return this.getText().getHeight()},_sync:function(){var a,b,c,h,i,j,k,l=this.getText(),m=this.getTag();if(l&&m){switch(a=l.getWidth(),b=l.getHeight(),c=m.getPointerDirection(),h=m.getPointerWidth(),k=m.getPointerHeight(),i=0,j=0,c){case d:i=a/2,j=-1*k;break;case e:i=a+h,j=b/2;break;case f:i=a/2,j=b+k;break;case g:i=-1*h,j=b/2}m.setAttrs({x:-1*i,y:-1*j,width:a,height:b}),l.setAttrs({x:-1*i,y:-1*j})}}},Kinetic.Util.extend(Kinetic.Label,Kinetic.Group),Kinetic.Collection.mapMethods(Kinetic.Label),Kinetic.Tag=function(a){this.___init(a)},Kinetic.Tag.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Tag",this.sceneFunc(this._sceneFunc)},_sceneFunc:function(a){var b=this.getWidth(),c=this.getHeight(),h=this.getPointerDirection(),i=this.getPointerWidth(),j=this.getPointerHeight();a.beginPath(),a.moveTo(0,0),h===d&&(a.lineTo((b-i)/2,0),a.lineTo(b/2,-1*j),a.lineTo((b+i)/2,0)),a.lineTo(b,0),h===e&&(a.lineTo(b,(c-j)/2),a.lineTo(b+i,c/2),a.lineTo(b,(c+j)/2)),a.lineTo(b,c),h===f&&(a.lineTo((b+i)/2,c),a.lineTo(b/2,c+j),a.lineTo((b-i)/2,c)),a.lineTo(0,c),h===g&&(a.lineTo(0,(c+j)/2),a.lineTo(-1*i,c/2),a.lineTo(0,(c-j)/2)),a.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.Tag,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Tag,"pointerDirection",c),Kinetic.Factory.addGetterSetter(Kinetic.Tag,"pointerWidth",0),Kinetic.Factory.addGetterSetter(Kinetic.Tag,"pointerHeight",0),Kinetic.Factory.addGetterSetter(Kinetic.Tag,"cornerRadius",0),Kinetic.Collection.mapMethods(Kinetic.Tag)}();

/*viewer/src/application.js*/

// Main DWV namespace.
var ismsie=false;
if(navigator.appName!="Netscape"){
	if(navigator.userAgent.indexOf("MSIE")>=0) ismsie=true;
}
var g_arr=[];
var g_arr_added, g_arr_load_start, g_arr_load_end, g_arr_load_cancel, g_arr_load_progress, g_arr_filesize, g_arr_urlselect;
var g_arr_charsets={"ISO_IR 144":"ISO-8859-5","ISO_IR 127":"ISO-8859-6","ISO_IR 126":"ISO-8859-7","ISO_IR 138":"ISO-8859-8","ISO_IR 148":"ISO-8859-9","ISO_IR 13":"JIS_X0201","ISO_IR 166":"TIS-620","ISO 2022 IR 6":"US-ASCII","ISO 2022 IR 100":"ISO-8859-1","ISO 2022 IR 101":"ISO-8859-2","ISO 2022 IR 109":"ISO-8859-3","ISO 2022 IR 110":"ISO-8859-4","ISO 2022 IR 144":"ISO-8859-5","ISO 2022 IR 127":"ISO-8859-6","ISO 2022 IR 126":"ISO-8859-7","ISO 2022 IR 138":"ISO-8859-8","ISO 2022 IR 148":"ISO-8859-9","ISO 2022 IR 13":"ISO-2022-JP","ISO 2022 IR 166":"TIS-620","ISO 2022 IR 87":"ISO-2022-JP","ISO 2022 IR 159":"JIS0212","ISO 2022 IR 149":"EUC-KR","ISO_IR 192":"UTF-8","GB18030":"GB18030"};
//"":"US-ASCII","ISO_IR 100":"ISO-8859-1","ISO_IR 101":"ISO-8859-2","ISO_IR 109":"ISO-8859-3","ISO_IR 110":"ISO-8859-4",

var dwv = dwv || {};
var Kinetic = Kinetic || {};

/**
 * Main application class.
 * @class App
 * @namespace dwv
 * @constructor
 */
dwv.App = function()
{
    // Local object
    var self = this;
    // Image
    var image = null;
    // View
    var view = null;
    // Original image
    var originalImage = null;
    // Image data array
    var imageData = null;
    // Image data width
    var dataWidth = 0;
    // Image data height
    var dataHeight = 0;

    // display window scale
    var windowScale = 1;
     
    // Image layer
    var imageLayer = null;
    // Draw layers
    var drawLayers = [];
    // Draw stage
    var drawStage = null;
    
    // flag to know if the info layer is listening on the image.
    var isInfoLayerListening = false;
    
    // Tool box
    var toolBox = new dwv.tool.ToolBox(this);
    // UndoStack
    var undoStack = new dwv.tool.UndoStack();
    
    /** 
     * Get the version of the application.
     * @method getVersion
     * @return {String} The version of the application.
     */
    this.getVersion = function() { return "v0.8.0beta"; };
    
    /** 
     * Get the image.
     * @method getImage
     * @return {Image} The associated image.
     */
    this.getImage = function() { return image; };
    /** 
     * Get the view.
     * @method getView
     * @return {Image} The associated view.
     */
    this.getView = function() { return view; };
    
    /** 
     * Set the view.
     * @method setImage
     * @param {Image} img The associated image.
     */
    this.setImage = function(img)
    { 
        image = img; 
        view.setImage(img);
    };
    
    /** 
     * Restore the original image.
     * @method restoreOriginalImage
     */
    this.restoreOriginalImage = function() 
    { 
        image = originalImage; 
        view.setImage(originalImage); 
    }; 
    
    /** 
     * Get the image data array.
     * @method getImageData
     * @return {Array} The image data array.
     */
    this.getImageData = function() { return imageData; };

    /** 
     * Get the tool box.
     * @method getToolBox
     * @return {Object} The associated toolbox.
     */
    this.getToolBox = function() { return toolBox; };

    /** 
     * Get the image layer.
     * @method getImageLayer
     * @return {Object} The image layer.
     */
    this.getImageLayer = function() { return imageLayer; };
    /** 
     * Get the draw layer.
     * @method getDrawLayer
     * @return {Object} The draw layer.
     */
    this.getDrawLayer = function() { 
        return drawLayers[view.getCurrentPosition().k];
    };
    /** 
     * Get the draw stage.
     * @method getDrawStage
     * @return {Object} The draw layer.
     */
    this.getDrawStage = function() { return drawStage; };

    /** 
     * Get the undo stack.
     * @method getUndoStack
     * @return {Object} The undo stack.
     */
    this.getUndoStack = function() { return undoStack; };

    /**
     * Initialise the HTML for the application.
     * @method init
     */
    this.init = function(){
        // align layers when the window is resized
        window.onresize = this.resize;
        // listen to drag&drop
        var box = document.getElementById("dropBox");
        if ( box ) {
            box.addEventListener("dragover", onDragOver);
            box.addEventListener("dragleave", onDragLeave);
            box.addEventListener("drop", onDrop);
            // initial size
            var size = dwv.gui.getWindowSize();
            var dropBoxSize = 2 * size.height / 3;
            $("#dropBox").height( dropBoxSize );
            $("#dropBox").width( dropBoxSize );
        }
        // possible load from URL
        if( typeof skipLoadUrl === "undefined" ) {
            var inputUrls = dwv.html.getUriParam(); 
            if( inputUrls && inputUrls.length > 0 ) {
                this.loadURL(inputUrls);
            }
        }
        else{
            console.log("Not loading url from adress since skipLoadUrl is defined.");
        }
    };
    
    /**
     * Reset the application.
     * @method reset
     */
    this.reset = function()
    {
        // clear tools
        toolBox.reset();

        // clear draw
        if ( drawStage ) {
            drawLayers = [];
        }
        // clear objects
        image = null;
        view = null;

/*		console.log(imageData);
		if(imageData){
			imageData.data=null;
			//console.log(imageData.data);
		}
		console.log(imageLayer);
		if(originalImage){
			//console.log(originalImage.getBuffer());
		}
		originalImage=null;
		imageData=null;
		imageLayer=null;*/
		
        // clear undo/redo
        undoStack = new dwv.tool.UndoStack();
        dwv.gui.cleanUndoHtml();
    };
    
    /**
     * Reset the layout of the application.
     * @method resetLayout
     */
    this.resetLayout = function () {
        if ( imageLayer ) {
            imageLayer.resetLayout(windowScale);
            imageLayer.draw();
        }
        if ( drawStage ) {
            drawStage.offset( {'x': 0, 'y': 0} );
            drawStage.scale( {'x': windowScale, 'y': windowScale} );
            drawStage.draw();
        }
    };
    
    /**
     * Handle key down event.
     * - CRTL-Z: undo
     * - CRTL-Y: redo
     * Default behavior. Usually used in tools. 
     * @method onKeydown
     * @param {Object} event The key down event.
     */
    this.onKeydown = function(event)
    {
        if( event.keyCode === 90 && event.ctrlKey ) // ctrl-z
        {
            undoStack.undo();
        }
        else if( event.keyCode === 89 && event.ctrlKey ) // ctrl-y
        {
            undoStack.redo();
        }
    };
    
    /**
     * Handle change files event.
     * @method onChangeFiles
     * @param {Object} event The event fired when changing the file field.
     */
    this.onChangeFiles = function(event)
    {
        this.loadFiles(event.target.files);
    };

    /**
     * Load a list of files.
     * @method loadFiles
     * @param {Array} files The list of files to load.
     */
	 //edit
	this.load_arr = function(idx){
		var data=g_arr[idx];
		if(!data)return;

		this.reset();
            var isFirst = true;
            if( image ) {
                image.appendSlice( data.view.getImage() );
                isFirst = false;
            }
            postLoadInit(data);
            if( drawStage ) {
                // create slice draw layer
                var drawLayer = new Kinetic.Layer({
                    listening: false,
                    hitGraphEnabled: false,
                    visible: isFirst
                });
                // add to layers array
                drawLayers.push(drawLayer);
                // add the layer to the stage
                drawStage.add(drawLayer);
            }
	};
	

	var guniqcount=0;
    this.loadFiles = function(files) 
    {
		if(window.g_load_before){
			if(window.g_load_before())return;
		}
		//console.log(files);
        // clear variables
        this.reset();
        // create IO
        var fileIO = new dwv.io.File();
        fileIO.onload = function (data) {
			//edit
			//console.log(data);

			//if(g_arr.length>0) data=g_arr[0];
			//else g_arr.push(data);
			if(files.length>0){
				var s=files[0].name;
				if(files.length>1) s+=' (+'+files.length+')';
				data.info.filename=s;				
			}
			guniqcount++;
			data.id=guniqcount;
			g_arr.push(data);
			if(g_arr_added) g_arr_added(data);

            var isFirst = true;
            if( image ) {
                image.appendSlice( data.view.getImage() );
                isFirst = false;
            }
            postLoadInit(data);
            if( drawStage ) {
                // create slice draw layer
                var drawLayer = new Kinetic.Layer({
                    listening: false,
                    hitGraphEnabled: false,
                    visible: isFirst
                });
                // add to layers array
                drawLayers.push(drawLayer);
                // add the layer to the stage
                drawStage.add(drawLayer);
            }
        };
        fileIO.onerror = function(error){ handleError(error); };
        // main load (asynchronous)
        fileIO.load(files);
    };
    
    /**
     * Handle change url event.
     * @method onChangeURL
     * @param {Object} event The event fired when changing the url field.
     */
    this.onChangeURL = function(event)
    {
		this.loadURL([event.target.value]);
    };

    /**
     * Load a list of URLs.
     * @method loadURL
     * @param {Array} urls The list of urls to load.
     */
    this.loadURL = function(urls, filename, filesize) 
    {
		if(window.g_load_before){
			if(window.g_load_before())return;
		}
        // clear variables
        //this.reset();
		var self=this;
        // create IO
		g_arr_filesize=filesize;
		if(g_arr_load_start) g_arr_load_start();		

        var urlIO = new dwv.io.Url();
        urlIO.onload = function (data) {
			self.reset(); //edit
			//console.log(data);
			if(g_arr_load_end) g_arr_load_end();

			if(filename){
				data.info.filename=filename;
			}
			guniqcount++;
			data.id=guniqcount;
			g_arr.push(data);
			if(g_arr_added) g_arr_added(data);

            var isFirst = true;
            if( image ) {
                image.appendSlice( data.view.getImage() );
                isFirst = false;
            }
            postLoadInit(data);
            if( drawStage ) {
                // create slice draw layer
                var drawLayer = new Kinetic.Layer({
                    listening: false,
                    hitGraphEnabled: false,
                    visible: isFirst
                });
                // add to layers array
                drawLayers.push(drawLayer);
                // add the layer to the stage
                drawStage.add(drawLayer);
            }
        };
        urlIO.onerror = function(error){ 
			if(g_arr_load_end) g_arr_load_end();
			handleError(error); 
		};
        // main load (asynchronous)
        urlIO.load(urls, filename);
    };
    
    /**
     * Handle window/level change.
     * @method onWLChange
     * @param {Object} event The event fired when changing the window/level.
     */
    this.onWLChange = function (/*event*/)
    {         
        generateAndDrawImage();
    };

    /**
     * Handle color map change.
     * @method onColorChange
     * @param {Object} event The event fired when changing the color map.
     */
    this.onColorChange = function (/*event*/)
    {  
        generateAndDrawImage();
    };

    /**
     * Handle slice change.
     * @method onSliceChange
     * @param {Object} event The event fired when changing the slice.
     */
    this.onSliceChange = function (/*event*/)
    {   
        generateAndDrawImage();
        if ( drawStage ) {
            // hide all draw layers
            for ( var i = 0; i < drawLayers.length; ++i ) {
                drawLayers[i].visible( false );
            }
            // show current draw layer
            var currentLayer = drawLayers[view.getCurrentPosition().k];
            currentLayer.visible( true );
            currentLayer.draw();
        }
    };

    /**
     * Resize the display window. To be called once the image is loaded.
     * @method resize
     */
    this.resize = function()
    {
        var size = dwv.gui.getWindowSize();
		$("#main").width(size.width-162);

        // previous width
        var oldWidth = parseInt(windowScale*dataWidth, 10);
		if(oldWidth==0)return;

        // find new best fit
        windowScale = Math.min( (size.width / dataWidth), (size.height / dataHeight) );
        // new sizes
        var newWidth = parseInt(windowScale*dataWidth, 10);
        var newHeight = parseInt(windowScale*dataHeight, 10);
        // ratio previous/new to add to zoom
        var mul = newWidth / oldWidth;

        // resize container
        $("#layerContainer").width(newWidth);
        $("#layerContainer").height(newHeight + 1); // +1 to be sure...
		
		//$("#layerContainer2").height(newHeight + 1);
		$("#dchistory").height(newHeight - 100);		
		//$("#pageMain").height(newHeight + 1);
		//console.log(newHeight);
	
        // resize image layer
        if( imageLayer ) {
            var iZoomX = imageLayer.getZoom().x * mul;
            var iZoomY = imageLayer.getZoom().y * mul;
            imageLayer.setWidth(newWidth);
            imageLayer.setHeight(newHeight);
            imageLayer.zoom(iZoomX, iZoomY, 0, 0);
            imageLayer.draw();
        }
        // resize draw stage
        if( drawStage ) {
            // resize div
            $("#drawDiv").width(newWidth);
            $("#drawDiv").height(newHeight);
            // resize stage
            var stageZomX = drawStage.scale().x * mul;
            var stageZoomY = drawStage.scale().y * mul;
            drawStage.setWidth(newWidth);
            drawStage.setHeight(newHeight);
            drawStage.scale( {x: stageZomX, y: stageZoomY} );
            drawStage.draw();
        }
    };
    
    /**
     * Toggle the display of the info layer.
     * @method toggleInfoLayerDisplay
     */
    this.toggleInfoLayerDisplay = function()
    {
        // toggle html
        dwv.html.toggleDisplay('infoLayer');
        // toggle listeners
        if( isInfoLayerListening ) {
            removeImageInfoListeners();
        }
        else {
            addImageInfoListeners();
        }
    };
    
    /**
     * Init the Window/Level display
     */
    this.initWLDisplay = function()
    {
        // set window/level
        var keys = Object.keys(dwv.tool.presets);
        dwv.tool.updateWindowingData(
            dwv.tool.presets[keys[0]].center, 
            dwv.tool.presets[keys[0]].width );
        // default position
        dwv.tool.updatePostionValue(0,0);
    };

    /**
     * Add layer mouse and touch listeners.
     * @method addLayerListeners
     */
    this.addLayerListeners = function(layer)
    {
        // allow pointer events
		
        layer.setAttribute("style", "pointer-events: auto;");
		if(ismsie && layer.tagName=='CANVAS') layer=layer.parentNode;
		//alert(layer.tagName);
        // mouse listeners
		//console.log(layer);		
        layer.addEventListener("mousedown", eventHandler);
        layer.addEventListener("mousemove", eventHandler);
        layer.addEventListener("mouseup", eventHandler);
        layer.addEventListener("mouseout", eventHandler);
        layer.addEventListener("mousewheel", eventHandler);
        layer.addEventListener("DOMMouseScroll", eventHandler);
        layer.addEventListener("dblclick", eventHandler);
        // touch listeners
        layer.addEventListener("touchstart", eventHandler);
        layer.addEventListener("touchmove", eventHandler);
        layer.addEventListener("touchend", eventHandler);
    };
    
    /**
     * Remove layer mouse and touch listeners.
     * @method removeLayerListeners
     */
    this.removeLayerListeners = function(layer)
    {
        // disable pointer events
        layer.setAttribute("style", "pointer-events: none;");
		if(ismsie && layer.tagName=='CANVAS') layer=layer.parentNode;
        // mouse listeners
        layer.removeEventListener("mousedown", eventHandler);
        layer.removeEventListener("mousemove", eventHandler);
        layer.removeEventListener("mouseup", eventHandler);
        layer.removeEventListener("mouseout", eventHandler);
        layer.removeEventListener("mousewheel", eventHandler);
        layer.removeEventListener("DOMMouseScroll", eventHandler);
        layer.removeEventListener("dblclick", eventHandler);
        // touch listeners
        layer.removeEventListener("touchstart", eventHandler);
        layer.removeEventListener("touchmove", eventHandler);
        layer.removeEventListener("touchend", eventHandler);
    };
    
    /**
     * Render the current image.
     * @method render
     */
    this.render = function ()
    {
        generateAndDrawImage();
    };

    // Private Methods -------------------------------------------

    /**
     * Generate the image data and draw it.
     * @method generateAndDrawImage
     */
    function generateAndDrawImage()
    {         
        // generate image data from DICOM
        view.generateImageData(imageData);         
        // set the image data of the layer
        imageLayer.setImageData(imageData);
        // draw the image
        imageLayer.draw();
    }
    
    /**
     * Add image listeners.
     * @method addImageInfoListeners
     * @private
     */
    function addImageInfoListeners()
    {
        view.addEventListener("wlchange", dwv.info.updateWindowingDiv);
        view.addEventListener("wlchange", dwv.info.updateMiniColorMap);
        view.addEventListener("wlchange", dwv.info.updatePlotMarkings);
        view.addEventListener("colorchange", dwv.info.updateMiniColorMap);
        view.addEventListener("positionchange", dwv.info.updatePositionDiv);
        isInfoLayerListening = true;
    }
    
    /**
     * Remove image listeners.
     * @method removeImageInfoListeners
     * @private
     */
    function removeImageInfoListeners()
    {
        view.removeEventListener("wlchange", dwv.info.updateWindowingDiv);
        view.removeEventListener("wlchange", dwv.info.updateMiniColorMap);
        view.removeEventListener("wlchange", dwv.info.updatePlotMarkings);
        view.removeEventListener("colorchange", dwv.info.updateMiniColorMap);
        view.removeEventListener("positionchange", dwv.info.updatePositionDiv);
        isInfoLayerListening = false;
    }
    
    /**
     * General-purpose event handler. This function just determines the mouse 
     * position relative to the canvas element. It then passes it to the current tool.
     * @method eventHandler
     * @private
     * @param {Object} event The event to handle.
     */
    function eventHandler(event)
    {
        // flag not to get confused between touch and mouse
        var handled = false;
        // Store the event position relative to the image canvas
        // in an extra member of the event:
        // event._x and event._y.
        var offsets = null;
        var position = null;
        if( event.type === "touchstart" ||
            event.type === "touchmove")
        {
            event.preventDefault();
            // event offset(s)
            offsets = dwv.html.getEventOffset(event);
            // should have at least one offset
            event._xs = offsets[0].x;
            event._ys = offsets[0].y;
            position = self.getImageLayer().displayToIndex( offsets[0] );
            event._x = parseInt( position.x, 10 );
            event._y = parseInt( position.y, 10 );
            // possible second
            if ( offsets.length === 2 ) {
                event._x1s = offsets[1].x;
                event._y1s = offsets[1].y;
                position = self.getImageLayer().displayToIndex( offsets[1] );
                event._x1 = parseInt( position.x, 10 );
                event._y1 = parseInt( position.y, 10 );
            }
            // set handle event flag
            handled = true;
        }
        else if( event.type === "mousemove" ||
            event.type === "mousedown" ||
            event.type === "mouseup" ||
            event.type === "mouseout" ||
            event.type === "mousewheel" ||
            event.type === "dblclick" ||
            event.type === "DOMMouseScroll" )
        {
            offsets = dwv.html.getEventOffset(event);
            event._xs = offsets[0].x;
            event._ys = offsets[0].y;
            position = self.getImageLayer().displayToIndex( offsets[0] );
            event._x = parseInt( position.x, 10 );
            event._y = parseInt( position.y, 10 );
            // set handle event flag
            handled = true;
        }
        else if( event.type === "keydown" || 
                event.type === "touchend")
        {
            handled = true;
        }
            
        // Call the event handler of the tool.
        if( handled )
        {
            var func = self.getToolBox().getSelectedTool()[event.type];
            if( func )
            {
                func(event);
            }
        }
    }
    
    /**
     * Handle a drag over.
     * @method onDragOver
     * @private
     * @param {Object} event The event to handle.
     */
    function onDragOver(event)
    {
        // prevent default handling
        event.stopPropagation();
        event.preventDefault();
        // update box 
        var box = document.getElementById("dropBox");
        if ( box ) {
            box.className = 'hover';
        }
    }
    
    /**
     * Handle a drag leave.
     * @method onDragLeave
     * @private
     * @param {Object} event The event to handle.
     */
    function onDragLeave(event)
    {
        // prevent default handling
        event.stopPropagation();
        event.preventDefault();
        // update box 
        var box = document.getElementById("dropBox");
        if ( box ) {
            box.className = '';
        }
    }

    /**
     * Handle a drop event.
     * @method onDrop
     * @private
     * @param {Object} event The event to handle.
     */
    function onDrop(event)
    {
        // prevent default handling
        event.stopPropagation();
        event.preventDefault();
        // load files
        self.loadFiles(event.dataTransfer.files);
    }

    /**
     * Handle an error: display it to the user.
     * @method handleError
     * @private
     * @param {Object} error The error to handle.
     */
    function handleError(error)
    {
        // alert window
        if( error.name && error.message) {
            alert(error.name+": "+error.message+".");
        }
        else {
            alert("Error: "+error+".");
        }
        // log
        if( error.stack ) {
            console.error(error.stack);
        }
    }
    
    /**
     * Create the application layers.
     * @method createLayers
     * @private
     * @param {Number} dataWidth The width of the input data.
     * @param {Number} dataHeight The height of the input data.
     */
    function createLayers(dataWidth, dataHeight)
    {
        // image layer
		/*if(imageLayer){
			imageLayer.clear2();
			//console.log(imageLayer);
		}*/
	    /*var a=document.getElementById("imageLayer");
		if(a){
			var b=a.parentNode;
			b.removeChild(a);
		    var canvas = document.createElement("canvas");
			canvas.id = "imageLayer";
			b.appendChild(canvas);
		}*/

        imageLayer = new dwv.html.Layer("imageLayer");
        imageLayer.initialise(dataWidth, dataHeight);
        imageLayer.fillContext();
        imageLayer.setStyleDisplay(true);
        // draw layer
        if( document.getElementById("drawDiv") !== null) {
            // create stage
			//console.log(drawStage);
			//edit
			if(drawStage){
				drawStage.destroy();
				Kinetic.shapes = [];
			    Kinetic.names = [];
				Kinetic.stages = [];
			}
            drawStage = new Kinetic.Stage({
                container: 'drawDiv',
                width: dataWidth,
                height: dataHeight,
                listening: false
            });
        }
        // resize app
        self.resetLayout();
        self.resize();
    }
    
    /**
     * Post load application initialisation. To be called once the DICOM has been parsed.
     * @method postLoadInit
     * @private
     * @param {Object} data The data to display.
     */
    function postLoadInit(data)
    {
        // only initialise the first time
        if( view ) {
            return;
        }
        
        // get the view from the loaded data
        view = data.view;
        // append the DICOM tags table
        dwv.gui.appendTagsTable(data.info);
        // store image
        originalImage = view.getImage();
        image = originalImage;
        
        // layout
        dataWidth = image.getSize().getNumberOfColumns();
        dataHeight = image.getSize().getNumberOfRows();
        createLayers(dataWidth, dataHeight);

        // get the image data from the image layer
        imageData = imageLayer.getContext().createImageData( dataWidth, dataHeight);
		
        // mouse and touch listeners
		//self.removeLayerListeners( imageLayer.getCanvas() );
        self.addLayerListeners( imageLayer.getCanvas() );
		
		//edit
		window.removeEventListener("keydown", eventHandler, true);
        view.removeEventListener("wlchange", self.onWLChange);
        view.removeEventListener("colorchange", self.onColorChange);
        view.removeEventListener("slicechange", self.onSliceChange);
		
		// keydown listener
		window.addEventListener("keydown", eventHandler, true);
        // image listeners
		view.addEventListener("wlchange", self.onWLChange);
        view.addEventListener("colorchange", self.onColorChange);
        view.addEventListener("slicechange", self.onSliceChange);
        
        // stop box listening to drag (after first drag)
        var box = document.getElementById("dropBox");
        if ( box ) {
            box.removeEventListener("dragover", onDragOver);
            box.removeEventListener("dragleave", onDragLeave);
            box.removeEventListener("drop", onDrop);
            dwv.html.removeNode("dropBox");
            // switch listening to layerContainer
            var div = document.getElementById("layerContainer");
            div.addEventListener("dragover", onDragOver);
            div.addEventListener("dragleave", onDragLeave);
            div.addEventListener("drop", onDrop);
        }

        // info layer
        if(document.getElementById("infoLayer")){
            dwv.info.createWindowingDiv();
            dwv.info.createPositionDiv();
            dwv.info.createMiniColorMap();
            dwv.info.createPlot();
			
			//edit
			removeImageInfoListeners();

            addImageInfoListeners();
        }
        
        // initialise the toolbox
        toolBox.init();
        toolBox.display(true);
        
        // init W/L display
        self.initWLDisplay();        
    }
    
};


/*viewer/src/dicom/dicomParser.js v0.10.1*/
/** 
 * DICOM module.
 * @module dicom
 */
var dwv = dwv || {};
dwv.dicom = dwv.dicom || {};
/**
 * Data reader.
 * @class DataReader
 * @namespace dwv.dicom
 * @constructor
 * @param {Array} buffer The input array buffer.
 * @param {Boolean} isLittleEndian Flag to tell if the data is little or big endian.
 */
dwv.dicom.DataReader = function(buffer, isLittleEndian)
{
    // Set endian flag if not defined.
    if(typeof(isLittleEndian)==='undefined') {
        isLittleEndian = true;
    }
    
    /**
     * Native endianness.
     * @property isNativeLittleEndian
     * @private
     * @type Boolean
     */
    var isNativeLittleEndian = new Int8Array(new Int16Array([1]).buffer)[0] > 0;

    /**
     * Flag to know if the TypedArray data needs flipping.
     * @property needFlip
     * @private
     * @type Boolean
     */
    var needFlip = (isLittleEndian !== isNativeLittleEndian);
    
    /**
     * The main data view.
     * @property view
     * @private
     * @type DataView
     */
    var view = new DataView(buffer);
    
    /**
     * Flip an array's endianness.
     * Inspired from https://github.com/kig/DataStream.js.
     * @method flipArrayEndianness
     * @param {Object} array The array to flip (modified).
     */
    this.flipArrayEndianness = function (array) {
       var blen = array.byteLength;
       var u8 = new Uint8Array(array.buffer, array.byteOffset, blen);
       var bpel = array.BYTES_PER_ELEMENT;
       var tmp;
       for ( var i = 0; i < blen; i += bpel ) {
         for ( var j = i + bpel - 1, k = i; j > k; j--, k++ ) {
           tmp = u8[k];
           u8[k] = u8[j];
           u8[j] = tmp;
         }
       }
    };
      
    /**
     * Read Uint8 (1 byte) data.
     * @method readUint8
     * @param {Number} byteOffset The offset to start reading from.
     * @return {Number} The read data.
     */
    this.readUint8 = function(byteOffset) {
        return view.getUint8(byteOffset, isLittleEndian);
    };
    /**
     * Read Uint16 (2 bytes) data.
     * @method readUint16
     * @param {Number} byteOffset The offset to start reading from.
     * @return {Number} The read data.
     */
    this.readUint16 = function(byteOffset) {
        return view.getUint16(byteOffset, isLittleEndian);
    };
    /**
     * Read Uint32 (4 bytes) data.
     * @method readUint32
     * @param {Number} byteOffset The offset to start reading from.
     * @return {Number} The read data.
     */
    this.readUint32 = function(byteOffset) {
        return view.getUint32(byteOffset, isLittleEndian);
    };
    /**
     * Read Float32 (8 bytes) data.
     * @method readFloat32
     * @param {Number} byteOffset The offset to start reading from.
     * @return {Number} The read data.
     */
    this.readFloat32 = function(byteOffset) {
        return view.getFloat32(byteOffset, isLittleEndian);
    };
    /**
     * Read Uint8 array.
     * @method readUint8Array
     * @param {Number} byteOffset The offset to start reading from.
     * @param {Number} size The size of the array.
     * @return {Array} The read data.
     */
    this.readUint8Array = function(byteOffset, size) {
		/*if(byteOffset+size>buffer.byteLength){
			size=buffer.byteLength-byteOffset;
		}*/
        return new Uint8Array(buffer, byteOffset, size);
    };
    /**
     * Read Uint16 array.
     * @method readUint16Array
     * @param {Number} byteOffset The offset to start reading from.
     * @param {Number} size The size of the array.
     * @return {Array} The read data.
     */
    this.readUint16Array = function(byteOffset, size) {
        var data = new Uint16Array(buffer, byteOffset, (size / 2));
        if ( needFlip ) {
            this.flipArrayEndianness(data);
        }
        return data;
    };
    /**
     * Read Uint32 array.
     * @method readUint32Array
     * @param {Number} byteOffset The offset to start reading from.
     * @param {Number} size The size of the array.
     * @return {Array} The read data.
     */
    this.readUint32Array = function(byteOffset, size) {
        var arraySize = Math.floor(size / 4);
        var data = null;
        if ( (byteOffset % 4) === 0 ) {
            data = new Uint32Array(buffer, byteOffset, arraySize);
            if ( needFlip ) {
                this.flipArrayEndianness(data);
            }
        }
        else {
            data = new Uint32Array(arraySize);
            for ( var i = 0; i < arraySize; ++i ) {
                data[i] = this.readUint32( byteOffset + 4*i );
            }
        }
        return data;
    };
    /**
     * Read data as an hexadecimal string.
     * @method readHex
     * @param {Number} byteOffset The offset to start reading from.
     * @return {Array} The read data.
     */
    this.readHex = function(byteOffset) {
        // read and convert to hex string
        var str = this.readUint16(byteOffset).toString(16);
        // return padded
        return "0x0000".substr(0, 6 - str.length) + str.toUpperCase();
    };
    /**
     * Read data as a string.
     * @method readString
     * @param {Number} byteOffset The offset to start reading from.
     * @param {Number} nChars The number of characters to read.
     * @return {String} The read data.
     */
    this.readString = function(byteOffset, nChars) {
        var result = "";
        var data = this.readUint8Array(byteOffset, nChars);
        for ( var i = 0; i < nChars; ++i ) {
            result += String.fromCharCode( data[ i ] );
        }
        return result;
    };
};

/**
 * Tell if a given syntax is a JPEG one.
 * @method isJpegTransferSyntax
 * @param {String} The transfer syntax to test.
 * @returns {Boolean} True if a jpeg syntax.
 */
dwv.dicom.isJpegTransferSyntax = function(syntax)
{
    return syntax.match(/1.2.840.10008.1.2.4.5/) !== null ||
        syntax.match(/1.2.840.10008.1.2.4.6/) !== null||
        syntax.match(/1.2.840.10008.1.2.4.7/) !== null;
};
dwv.dicom.isJpegBaselineTransferSyntax = function(syntax)
{
    return syntax === "1.2.840.10008.1.2.4.50" ||
        syntax === "1.2.840.10008.1.2.4.51";
};
dwv.dicom.isJpegLosslessTransferSyntax = function(syntax)
{
    return syntax === "1.2.840.10008.1.2.4.57" ||
        syntax === "1.2.840.10008.1.2.4.70";
};

/**
 * Tell if a given syntax is a JPEG-LS one.
 * @method isJpeglsTransferSyntax
 * @param {String} The transfer syntax to test.
 * @returns {Boolean} True if a jpeg-ls syntax.
 */
dwv.dicom.isJpeglsTransferSyntax = function(syntax)
{
    return syntax.match(/1.2.840.10008.1.2.4.8/) !== null;
};

/**
 * Tell if a given syntax is a JPEG 2000 one.
 * @method isJpeg2000TransferSyntax
 * @param {String} The transfer syntax to test.
 * @returns {Boolean} True if a jpeg 2000 syntax.
 */
dwv.dicom.isJpeg2000TransferSyntax = function(syntax)
{
    return syntax.match(/1.2.840.10008.1.2.4.9/) !== null;
};

/**
 * DicomParser class.
 * @class DicomParser
 * @namespace dwv.dicom
 * @constructor
 */
dwv.dicom.DicomParser = function()
{
    /**
     * The list of DICOM elements.
     * @property dicomElements
     * @type Array
     */
    this.dicomElements = {};
    /**
     * The pixel buffer.
     * @property pixelBuffer
     * @type Array
     */
    this.pixelBuffer = [];
    
    /**
     * Unknown tags count.
     * @property unknownCount
     * @type Number
     */
    var unknownCount = 0;
    /**
     * Get the next unknown tags count.
     * @method getNextUnknownCount
     * @returns {Number} The next count.
     */
    this.getNextUnknownCount = function () {
        unknownCount++;    
        return unknownCount;
    }; 
};

/**
 * Get the DICOM data elements.
 * @method getDicomElements
 * @returns {Object} The DICOM elements.
 */
dwv.dicom.DicomParser.prototype.getDicomElements = function()
{
    return this.dicomElements;
};

/**
 * Get the DICOM data pixel buffer.
 * @method getPixelBuffer
 * @returns {Array} The pixel buffer.
 */
dwv.dicom.DicomParser.prototype.getPixelBuffer = function()
{
    return this.pixelBuffer;
};

/**
 * Append a DICOM element to the dicomElements member object.
 * Allows for easy retrieval of DICOM tag values from the tag name.
 * If tags have same name (for the 'unknown' private tags cases), a number is appended
 * making the name unique.
 * @method appendDicomElement
 * @param {Object} element The element to add.
 * @param {Object} sequences The sequence the element belongs to (optional).
 */
dwv.dicom.DicomParser.prototype.appendDicomElement = function( element, sequences )
{
    // simple case: not a sequence
    if ( typeof sequences === "undefined" || sequences.length === 0) {
        this.dicomElements[element.name] = { 
            "group": element.group, 
            "element": element.element,
            "vr": element.vr,
            "vl": element.vl,
            "value": element.value 
        };
    }
    else {
        // nothing to do for items and delimitations
        if ( element.name === "Item" || 
                element.name === "ItemDelimitationItem" ||
                element.name === "SequenceDelimitationItem" ) {
            return;
        }
        // create root for nested sequences
        var sequenceName = sequences[0].name;
        var itemNumber = sequences[0].itemNumber;
        var root = this.dicomElements;
        for ( var i = 1; i < sequences.length; ++i ) {
            // update root with previous name and number
            if ( typeof root[sequenceName].value[itemNumber] !== "undefined" ) {
                root = root[sequenceName].value[itemNumber];
            }
            // update name and number
            sequenceName = sequences[i].name;
            itemNumber = sequences[i].itemNumber;
        }
        // append
        this.appendElementToSequence(root, sequenceName, itemNumber, element);

    }
};

/**
 * Append an element to a sequence.
 * @method appendElementToSequence
 * @param {Object} root The DICOM element root where to append the element.
 * @param {String} sequenceName The tail sequence name.
 * @param {Number} itemNumber The tail item number.
 * @param {Object} element The element to append.
 */
dwv.dicom.DicomParser.prototype.appendElementToSequence = function (root, sequenceName, itemNumber, element)
{
    // start the sequence
    if ( typeof root[sequenceName] === "undefined" ) {
        root[sequenceName] = { 
            "group": element.group, 
            "element": element.element,
            "vr": element.vr,
            "vl": element.vl,
            "value": [] 
        };
    }
    // continue the sequence
    else {
        // add item array if needed
        if ( typeof root[sequenceName].value[itemNumber] === "undefined" ) {
            root[sequenceName].value[itemNumber] = {};
        }
        // append element
        root[sequenceName].value[itemNumber][element.name] = { 
            "group": element.group, 
            "element": element.element,
            "vr": element.vr,
            "vl": element.vl,
            "value": element.value 
        };
    }
};

/**
 * Read a DICOM tag.
 * @method readTag
 * @param reader The raw data reader.
 * @param offset The offset where to start to read.
 * @returns An object containing the tags 'group', 'element' and 'name'.
 */
dwv.dicom.DicomParser.prototype.readTag = function(reader, offset)
{
    // group
    var group = reader.readHex(offset);
    // element
    var element = reader.readHex(offset+2);
    // vr and name
    var vr = "UN";
    var name = null;
    var dict = dwv.dicom.dictionary;
    if( typeof dict[group] !== "undefined" &&
            typeof dict[group][element] !== "undefined" ) {
        vr = dict[group][element][0];
        name = dict[group][element][2];
    }
    else {
        name = "dwv::unknown" + this.getNextUnknownCount().toString();
    }

    // return
    return {'group': group, 'element': element, 'name': name, 'vr': vr};
};

/**
 * Read a DICOM data element.
 * @method readDataElement
 * @param reader The raw data reader.
 * @param offset The offset where to start to read.
 * @param implicit Is the DICOM VR implicit?
 * @returns {Object} An object containing the element 'tag', 'vl', 'vr', 'data' and 'offset'.
 */
dwv.dicom.DicomParser.prototype.readDataElement = function(reader, offset, implicit)
{
    // tag: group, element
    var tag = this.readTag(reader, offset);
    var tagOffset = 4;
    
    var vr = ""; // Value Representation (VR)
    var vl = 0; // Value Length (VL)
    var vrOffset = 0; // byte size of VR
    var vlOffset = 0; // byte size of VL
    
    var isOtherVR = false; // OX, OW, OB and OF
    
    // (private) Item group case
    if( tag.group === "0xFFFE" ) {
        vr = "N/A";
        vrOffset = 0;
        vl = reader.readUint32( offset+tagOffset );
        vlOffset = 4;
    }
    // non Item case
    else {
        // implicit VR?
        if(implicit) {
			//edit
			vr = "UN";
            var dict = dwv.dicom.dictionary;
            if ( typeof dict[tag.group] !== "undefined" &&
                    typeof dict[tag.group][tag.element] !== "undefined" ) {
                vr = dwv.dicom.dictionary[tag.group][tag.element][0];
            }
			isOtherVR = (vr[0].toUpperCase() === 'O');
            //vr = tag.vr;
            //isOtherVR = (vr[0] === 'O');

            vrOffset = 0;
            vl = reader.readUint32( offset+tagOffset+vrOffset );
            vlOffset = 4;
        }
        else {
            vr = reader.readString( offset+tagOffset, 2 );
			//edit
            isOtherVR = (vr[0].toUpperCase() === 'O');

            vrOffset = 2;
            // long representations
            if ( isOtherVR || vr === "SQ" || vr === "UN" || vr==="UT") {
                vl = reader.readUint32( offset+tagOffset+vrOffset+2 );
                vlOffset = 6;
            }
            // short representation
            else {
                vl = reader.readUint16( offset+tagOffset+vrOffset );				
                vlOffset = 2;
            }
        }
		//console.log(vr);
    }
    
    var isUnsignedVR = ( vr === "US" || vr === "UL" || vr==="UT");
    
    // check the value of VL
    var vlString = vl;
    if( vl === 0xffffffff ) {
        vlString = "u/l";
        vl = 0;
    }
    
    // data
    var data = null;
    var dataOffset = offset+tagOffset+vrOffset+vlOffset;
    if( vr === "N/A")
    {
        data = reader.readUint8Array( dataOffset, vl );
    }
    else if ( isUnsignedVR ) 
    {
        if( vr === "US")
        {
            data = reader.readUint16Array( dataOffset, vl );
        }
        else // UL, UT
        {
			if(vr==="UT"){
				console.log(vr);
				//console.log(dataOffset+", "+vl);
			}
            data = reader.readUint32Array( dataOffset, vl );
        }
    }
    else if( isOtherVR )
    {
        if ( vr === "OX" ) {
            console.warn("OX value representation for tag: "+tag.name+".");
        }
        if ( ( vr === "OB" ) || 
                ( typeof this.dicomElements.BitsAllocated !== 'undefined' &&
                this.dicomElements.BitsAllocated.value[0] === 8 ) ) {
            data = reader.readUint8Array( dataOffset, vl );
        }
        else {
            data = reader.readUint16Array( dataOffset, vl );
        }
    }
    else
    {
        data = reader.readString( dataOffset, vl);
        data = data.split("\\");     
		//console.log(tag);
		//console.log(data);
    }    

    // total element offset
    var elementOffset = tagOffset + vrOffset + vlOffset + vl;
    
    // return
    return { 
        'tag': tag, 
        'vr': vr, 
        'vl': vlString, 
        'data': data,
        'offset': elementOffset
    };    
};

/**
 * Parse the complete DICOM file (given as input to the class).
 * Fills in the member object 'dicomElements'.
 * @method parse
 * @param buffer The input array buffer.
 */
dwv.dicom.DicomParser.prototype.parse = function(buffer,filename,callback)
{
    var offset = 0;
    var implicit = false;
    var jpegnone = false;
    var jpeg2000 = false;
	var jpeglossless=false;
	var jpegbaseline=false;
	var jpegRLE=false;
	var jpegls=false;
    // default readers
    var metaReader = new dwv.dicom.DataReader(buffer);
    var dataReader = new dwv.dicom.DataReader(buffer);

    // 128 -> 132: magic word
    offset = 128;
    var magicword = metaReader.readString( offset, 4 );
	var magicfound;
    if(magicword !== "DICM"){
		//magicword=metaReader.readUint16(0);
		//console.log(magicword);
		//console.log(metaReader.readUint16(4));
		if(metaReader.readUint32(0)==8 && metaReader.readUint32(4)==4){
			magicfound=true;
		}else{
			var s="Not a valid DICOM file (no magic DICM word found)";
			if(metaReader.readString( 20, 8 )=='ACR-NEMA') s='Not a valid DICOM file. This semms to be a ACR-NEMA file.';
			throw new Error(s);
		}
    }
    
	if(magicfound){
		var i=0;
		implicit=true;
	}else{
		offset += 4;
		// 0x0002, 0x0000: FileMetaInformationGroupLength
	    var dataElement = this.readDataElement(metaReader, offset);
		var metaLength = parseInt(dataElement.data[0], 10);
	    offset += dataElement.offset;
    
		// meta elements
	    var metaStart = offset;
		var metaEnd = metaStart + metaLength;
	    var i = metaStart;
		while( i < metaEnd ){
	        // get the data element
		    dataElement = this.readDataElement(metaReader, i, false);
			// store the data element
	        this.appendDicomElement( { 
		        'name': dataElement.tag.name,
			    'group': dataElement.tag.group, 
				'vr' : dataElement.vr, 
	            'vl' : dataElement.vl, 
		        'element': dataElement.tag.element,
			    'value': dataElement.data 
	        });
		    // increment index
			i += dataElement.offset;
	    }
	}

    // check the transfer syntax
	var syntax;
	if(this.dicomElements.TransferSyntaxUID) syntax = dwv.utils.cleanString(this.dicomElements.TransferSyntaxUID.value[0]);
	if(!syntax)syntax='';
    //console.log(syntax);

    // Implicit VR - Little Endian
    if( syntax === "1.2.840.10008.1.2" ) {
        implicit = true;
    }
    // Explicit VR - Little Endian (default): 1.2.840.10008.1.2.1 
    // Deflated Explicit VR - Little Endian
    else if( syntax === "1.2.840.10008.1.2.1.99" ) {
		try{
			var deflated = buffer.slice(i);
			var inflated = pako.inflateRaw(deflated);

			var fullByteArray = new Uint8Array(inflated.length + i);
			fullByteArray.set(buffer.slice(0, i), 0);
			fullByteArray.set(inflated, i);		
	
			buffer=fullByteArray.buffer;
			dataReader = new dwv.dicom.DataReader(buffer);
        } catch(error) {
            throw new Error("Cannot decode Deflated Explicit VR ([" +error.name + "] " + error.message + ")");
        }
        //throw new Error("Unsupported DICOM transfer syntax (Deflated Explicit VR): "+syntax);
    }
    // Explicit VR - Big Endian
    else if( syntax === "1.2.840.10008.1.2.2" ) {
        dataReader = new dwv.dicom.DataReader(buffer,false);
    }
    // JPEG
	else if( dwv.dicom.isJpegLosslessTransferSyntax(syntax) ) {		
		jpeglossless=true;
	}
	else if( dwv.dicom.isJpegBaselineTransferSyntax(syntax) ) {			
		jpegbaseline=true;
	}			
    else if( dwv.dicom.isJpegTransferSyntax(syntax) ) {
        jpegnone = true;
        //console.log("JPEG compressed DICOM data: " + syntax);
        throw new Error("Unsupported DICOM transfer syntax (JPEG): "+syntax);
    }
    // JPEG-LS
    else if( dwv.dicom.isJpeglsTransferSyntax(syntax) ) {//1.2.840.10008.1.2.4.8
        //console.log("JPEG-LS compressed DICOM data: " + syntax);
		jpegls=true;
        //throw new Error("Unsupported DICOM transfer syntax (JPEG-LS): "+syntax);
    }
    // JPEG 2000
    else if( dwv.dicom.isJpeg2000TransferSyntax(syntax) ) {
        console.log("JPEG 2000 compressed DICOM data: " + syntax);
        jpeg2000 = true;
    }
    // MPEG2 Image Compression
    else if( syntax === "1.2.840.10008.1.2.4.100" ) {
        throw new Error("Unsupported DICOM transfer syntax (MPEG2): "+syntax);
    }
    // RLE (lossless)
    else if( syntax === "1.2.840.10008.1.2.5" ) {
		jpegRLE=true;
        //throw new Error("Unsupported DICOM transfer syntax (RLE): "+syntax);
    }

    var startedPixelItems = false;
    var tagName = "";
    var tagOffset = 0;
    var sequences = [];
	var skipped, skipbuffer;
    // DICOM data elements
    while( i < buffer.byteLength ) 
    {
        // get the data element
        dataElement = this.readDataElement(dataReader, i, implicit);
        
        // locals
        tagName = dataElement.tag.name;
        tagOffset = dataElement.offset;
        var vlNumber = (dataElement.vl === "u/l") ? 0 : dataElement.vl;

        // new sequence
        if ( dataElement.vr === "SQ" && dataElement.vl !== 0 ) {
            sequences.push( {
                'name': tagName, 'itemNumber': -1,
                'vl': dataElement.vl, 'vlCount': 0
            });
            tagOffset -= vlNumber;
        }
        // new item
        if ( sequences.length !== 0 && tagName === "Item" ) {
            sequences[sequences.length-1].itemNumber += 1;
            if ( !startedPixelItems ) {
                tagOffset -= vlNumber;
            }
        }
        // end of sequence with implicit length
        else if ( tagName === "SequenceDelimitationItem" ) {
            sequences = sequences.slice(0, -1);
        }
        // store pixel data from multiple items
        if( startedPixelItems ) {
            if( tagName === "Item" ) {
				//console.log(dataElement.data);
                if( dataElement.data.length === 4 ) {
                    console.log("Skipping Basic Offset Table 1");
                }
                else if( dataElement.data.length !== 0 ) {
					skipped=false;
					if((jpegbaseline || jpegRLE || jpeglossless) && dataElement.data.length>4){
						if(this.pixelBuffer.length==0 && dataElement.data[0]==0 && dataElement.data[1]==0 && dataElement.data[2]==0 && dataElement.data[3]==0){
							console.log("Skipping Basic Offset Table 2");
							skipped=true;
							skipbuffer=new Uint16Array(dataElement.data.length);
							skipbuffer.set(dataElement.data, 0);							
						}
					}
					if(!skipped){
	                    console.log("Concatenating multiple pixel data items, length: "+dataElement.data.length);
		                // concat does not work on typed arrays
			            //this.pixelBuffer = this.pixelBuffer.concat( dataElement.data );
				        // manual concat...
					    var size = dataElement.data.length + this.pixelBuffer.length;
						var newBuffer = new Uint16Array(size);
	                    newBuffer.set( this.pixelBuffer, 0 );
		                newBuffer.set( dataElement.data, this.pixelBuffer.length );
			            this.pixelBuffer = newBuffer;
					}
                }
            }
            else if( tagName === "SequenceDelimitationItem" ) {
                startedPixelItems = false;
            }
            else {
                throw new Error("Unexpected tag in encapsulated pixel data: "+dataElement.tag.name);
            }
        }
        // check the pixel data tag
        if( tagName === "PixelData") {
            if( dataElement.data.length !== 0 ) {
                this.pixelBuffer = dataElement.data;
            }
            else {
                startedPixelItems = true;
            }
        }
               
        // store the data element
        this.appendDicomElement( {
            'name': tagName,
            'group' : dataElement.tag.group, 
            'vr' : dataElement.vr, 
            'vl' : dataElement.vl, 
            'element': dataElement.tag.element,
            'value': dataElement.data 
            }, sequences );
        
        // end of sequence with explicit length
        if ( dataElement.vr !== "SQ" && sequences.length !== 0 ) {
            var last = sequences.length - 1;
            sequences[last].vlCount += tagOffset;
			
			//edit
			while ( sequences.length > 0 && sequences[last].vlCount === sequences[last].vl ) {
                // last count + size of a sequence
                var lastVlCount = sequences[last].vlCount + 8;
                // add VR size for explicit encoding
                if ( !implicit ) {
                    lastVlCount += 4;
                }
                // remove last sequence
                sequences = sequences.slice(0, -1);
                // add nested sequence vl
                if ( sequences.length !== 0 ) {
                    last = sequences.length - 1;
                    sequences[last].vlCount += lastVlCount;
                }
            }
            /*if ( sequences[last].vlCount === sequences[last].vl ) {
                sequences = sequences.slice(0, -1);
            }*/
        }
        
        // increment index
        i += tagOffset;
    }
    
    // uncompress data
	var uncomfunc,errmsg;
	var self=this;
	if(jpeglossless){
		uncomfunc=function(){
			try {
				var buf = new Uint8Array( self.pixelBuffer );
				var decoder = new jpeg.lossless.Decoder(buf.buffer);
				var decoded = decoder.decode();
				self.pixelBuffer = new Uint16Array(decoded.buffer);
				return true;
		    } catch(error) {
				errmsg="Cannot decode JPEG Lossless ([" +error.name + "] " + error.message + ")";
				return false;
			}
		}
	}else if(jpegbaseline){
		uncomfunc=function(){
			try {
				var decoder = new JpegImage();
				decoder.parse( self.pixelBuffer );
				self.pixelBuffer = decoder.getData(decoder.width,decoder.height);	
				return true;
	        } catch(error) {
				errmsg="Cannot decode JPEG Baseline ([" +error.name + "] " + error.message + ")";
				return false;
			}
		}
	}else if(jpegRLE){
		uncomfunc=function(){
		    if( !self.dicomElements.Columns ) {
			    throw new Error("Missing DICOM image number of columns");
			}
		    if( !self.dicomElements.Rows ) {
			    throw new Error("Missing DICOM image number of rows");
			}
			try {
				var decoder = new daikon.RLE();
				var buf = new Uint8Array( self.pixelBuffer );
	            var temp = decoder.decode(buf.buffer, true, self.dicomElements.Columns.value[0]*self.dicomElements.Rows.value[0]);
				self.pixelBuffer=new Uint16Array(temp.buffer);
				return true;
			} catch(error) {
				errmsg="Cannot decode JPEG RLE ([" +error.name + "] " + error.message + ")";
				return false;
			}
		}
	}
	function _go(){
		if(!uncomfunc()){
			if(!skipbuffer){
				throw new Error(errmsg);
			}else{
				var newBuffer = new Uint16Array(skipbuffer.length+self.pixelBuffer.length);
	            newBuffer.set(skipbuffer, 0);
		        newBuffer.set(self.pixelBuffer, skipbuffer.length);
				self.pixelBuffer = newBuffer;
				if(!uncomfunc()) throw new Error(errmsg);
			}
		}		
	}

    if(jpegnone) {		
        // using jpgjs from https://github.com/notmasteryet/jpgjs
        // -> error with ffc3 and ffc1 jpeg jfif marker
        /*var j = new JpegImage();
        j.parse(this.pixelBuffer);
        var d = 0;
        j.copyToImageData(d);
        this.pixelBuffer = d.data;*/
    }
	else if(jpeglossless){
		//console.log("Decode JPEG Lossless.");
		_go();
	}
	else if(jpegbaseline){
		//console.log("Decode JPEG Baseline.");
		_go();
	}
	else if(jpegRLE){
		//console.log("Decode JPEG RLE.");
		_go();
	}
	else if(jpegls){
		if(window.g_decode){
			g_decode('jpegls', self, filename, callback);
		}else{
			throw new Error("Unsupported DICOM transfer syntax (JPEG-LS): "+syntax);
		}
		return;
    }
	else if(jpeg2000){
		//console.log("Decode JPEG 2000.");
        var uint8Image = null;
        try {
            uint8Image = openjpeg(this.pixelBuffer, "j2k");
        } catch(error) {
            throw new Error("Cannot decode JPEG 2000 ([" +error.name + "] " + error.message + ")");
        }
        this.pixelBuffer = uint8Image.data;
    }
	if(callback) callback();
};


/**
 * Get an Image object from the read DICOM file.
 * @method createImage
 * @returns {View} A new Image.
 */
dwv.dicom.DicomParser.prototype.createImage = function()
{
    // size
    if( !this.dicomElements.Columns ) {
        throw new Error("Missing DICOM image number of columns");
    }
    if( !this.dicomElements.Rows ) {
        throw new Error("Missing DICOM image number of rows");
    }
    var size = new dwv.image.Size(
        this.dicomElements.Columns.value[0], 
        this.dicomElements.Rows.value[0] );
    // spacing
    var rowSpacing = 1;
    var columnSpacing = 1;
    if( this.dicomElements.PixelSpacing ) {
        rowSpacing = parseFloat(this.dicomElements.PixelSpacing.value[0]);
        columnSpacing = parseFloat(this.dicomElements.PixelSpacing.value[1]);
    }
    else if( this.dicomElements.ImagerPixelSpacing ) {
        rowSpacing = parseFloat(this.dicomElements.ImagerPixelSpacing.value[0]);
        columnSpacing = parseFloat(this.dicomElements.ImagerPixelSpacing.value[1]);
    }
    var spacing = new dwv.image.Spacing( columnSpacing, rowSpacing);

    // special jpeg 2000 case: openjpeg returns a Uint8 planar MONO or RGB image
	var syntax;
	if(this.dicomElements.TransferSyntaxUID) syntax = dwv.utils.cleanString(this.dicomElements.TransferSyntaxUID.value[0]);
	if(!syntax)syntax='';
    
	var jpeg2000 = dwv.dicom.isJpeg2000TransferSyntax( syntax );
    
    // buffer data
    var buffer = null;
    // convert to 16bit if needed
    if( jpeg2000 && this.dicomElements.BitsAllocated.value[0] === 16 )
    {
        var sliceSize = size.getSliceSize();
        buffer = new Int16Array( sliceSize );
        var k = 0;
        for( var p = 0; p < sliceSize; ++p ) {
            buffer[p] = 256 * this.pixelBuffer[k] + this.pixelBuffer[k+1];
            k += 2;
        }
    }
    else
    {
        buffer = new Int16Array(this.pixelBuffer.length);
        // unsigned to signed data if needed
        var shift = false;
        if( this.dicomElements.PixelRepresentation &&
                this.dicomElements.PixelRepresentation.value[0] == 1) {
            shift = true;
        }
        // copy
        for( var i=0; i<this.pixelBuffer.length; ++i ) {
            buffer[i] = this.pixelBuffer[i];
            if( shift && buffer[i] >= Math.pow(2, 15) ) {
                buffer[i] -= Math.pow(2, 16);
            }
        }
    }
    
    // slice position
    var slicePosition = new Array(0,0,0);
    if( this.dicomElements.ImagePositionPatient ) {
        slicePosition = [ parseFloat(this.dicomElements.ImagePositionPatient.value[0]),
            parseFloat(this.dicomElements.ImagePositionPatient.value[1]),
            parseFloat(this.dicomElements.ImagePositionPatient.value[2]) ];
    }
    
    // image
    var image = new dwv.image.Image( size, spacing, buffer, [slicePosition] );
    // photometricInterpretation
    if( this.dicomElements.PhotometricInterpretation ) {
        var photo = dwv.utils.cleanString(
            this.dicomElements.PhotometricInterpretation.value[0]).toUpperCase();
        if( jpeg2000 && photo.match(/YBR/) ) {
            photo = "RGB";
        }
        image.setPhotometricInterpretation( photo );
    }        
    // planarConfiguration
    if( this.dicomElements.PlanarConfiguration ) {
        var planar = this.dicomElements.PlanarConfiguration.value[0];
        if( jpeg2000 ) {
            planar = 1;
        }
        image.setPlanarConfiguration( planar );
    }        
    // rescale slope
    if( this.dicomElements.RescaleSlope ) {
        image.setRescaleSlope( parseFloat(this.dicomElements.RescaleSlope.value[0]) );
    }
    // rescale intercept
    if( this.dicomElements.RescaleIntercept ) {
        image.setRescaleIntercept( parseFloat(this.dicomElements.RescaleIntercept.value[0]) );
    }
    // meta information
    var meta = {};
    if( this.dicomElements.Modality ) {
        meta.Modality = this.dicomElements.Modality.value[0];
    }
    if( this.dicomElements.StudyInstanceUID ) {
        meta.StudyInstanceUID = this.dicomElements.StudyInstanceUID.value[0];
    }
    if( this.dicomElements.SeriesInstanceUID ) {
        meta.SeriesInstanceUID = this.dicomElements.SeriesInstanceUID.value[0];
    }
    if( this.dicomElements.BitsStored ) {
        meta.BitsStored = parseInt(this.dicomElements.BitsStored.value[0], 10);
    }
    meta.RedPaletteColorLookupTableData = this.dicomElements.RedPaletteColorLookupTableData || '';
	meta.GreenPaletteColorLookupTableData = this.dicomElements.GreenPaletteColorLookupTableData || '';
	meta.BluePaletteColorLookupTableData = this.dicomElements.BluePaletteColorLookupTableData || '';
	//console.log(meta);
    image.setMeta(meta);
    
    // pixel representation
    var isSigned = 0;
    if( this.dicomElements.PixelRepresentation ) {
        isSigned = this.dicomElements.PixelRepresentation.value[0];
    }
    // view
    var view = new dwv.image.View(image, isSigned);
    // window center and width
    var windowPresets = [];
    if( this.dicomElements.WindowCenter && this.dicomElements.WindowWidth ) {
        var name;
        for( var j = 0; j < this.dicomElements.WindowCenter.value.length; ++j) {
            var width = parseFloat( this.dicomElements.WindowWidth.value[j], 10 );
            if( width !== 0 ) {
                if( this.dicomElements.WindowCenterWidthExplanation ) {
                    name = this.dicomElements.WindowCenterWidthExplanation.value[j];
                }
                else {
                    name = "Default"+j;
                }
                windowPresets.push({
                    "center": parseFloat( this.dicomElements.WindowCenter.value[j], 10 ),
                    "width": width, 
                    "name": name
                });
            }
        }
    }
    if( windowPresets.length !== 0 ) {
        view.setWindowPresets( windowPresets );
    }
    else {
        view.setWindowLevelMinMax();
    }

    return view;
};


/*viewer/src/dicom/dictionary.js v0.10.1*/

/** 
 * DICOM module.
 * @module dicom
 */
var dwv = dwv || {};
dwv.dicom = dwv.dicom || {};

/**
 * DICOM tag dictionary.
 * @namespace dwv.dicom
 */
dwv.dicom.dictionary = {
    '0x0000': {
        '0x0000': ['UL', '1', 'GroupLength'],
        '0x0001': ['UL', '1', 'CommandLengthToEnd'],
        '0x0002': ['UI', '1', 'AffectedSOPClassUID'],
        '0x0003': ['UI', '1', 'RequestedSOPClassUID'],
        '0x0010': ['CS', '1', 'CommandRecognitionCode'],
        '0x0100': ['US', '1', 'CommandField'],
        '0x0110': ['US', '1', 'MessageID'],
        '0x0120': ['US', '1', 'MessageIDBeingRespondedTo'],
        '0x0200': ['AE', '1', 'Initiator'], 
        '0x0300': ['AE', '1', 'Receiver'],
        '0x0400': ['AE', '1', 'FindLocation'],
        '0x0600': ['AE', '1', 'MoveDestination'],
        '0x0700': ['US', '1', 'Priority'],
        '0x0800': ['US', '1', 'DataSetType'],
        '0x0850': ['US', '1', 'NumberOfMatches'],
        '0x0860': ['US', '1', 'ResponseSequenceNumber'],
        '0x0900': ['US', '1', 'Status'],
        '0x0901': ['AT', '1-n', 'OffendingElement'],
        '0x0902': ['LO', '1', 'ErrorComment'],
        '0x0903': ['US', '1', 'ErrorID'],
        '0x0904': ['OT', '1-n', 'ErrorInformation'],
        '0x1000': ['UI', '1', 'AffectedSOPInstanceUID'],
        '0x1001': ['UI', '1', 'RequestedSOPInstanceUID'],
        '0x1002': ['US', '1', 'EventTypeID'],
        '0x1003': ['OT', '1-n', 'EventInformation'],
        '0x1005': ['AT', '1-n', 'AttributeIdentifierList'],
        '0x1007': ['AT', '1-n', 'ModificationList'],
        '0x1008': ['US', '1', 'ActionTypeID'],
        '0x1009': ['OT', '1-n', 'ActionInformation'],
        '0x1013': ['UI', '1-n', 'SuccessfulSOPInstanceUIDList'],
        '0x1014': ['UI', '1-n', 'FailedSOPInstanceUIDList'],
        '0x1015': ['UI', '1-n', 'WarningSOPInstanceUIDList'],
        '0x1020': ['US', '1', 'NumberOfRemainingSuboperations'],
        '0x1021': ['US', '1', 'NumberOfCompletedSuboperations'],
        '0x1022': ['US', '1', 'NumberOfFailedSuboperations'],
        '0x1023': ['US', '1', 'NumberOfWarningSuboperations'],
        '0x1030': ['AE', '1', 'MoveOriginatorApplicationEntityTitle'],
        '0x1031': ['US', '1', 'MoveOriginatorMessageID'],
        '0x4000': ['AT', '1', 'DialogReceiver'],
        '0x4010': ['AT', '1', 'TerminalType'],
        '0x5010': ['SH', '1', 'MessageSetID'],
        '0x5020': ['SH', '1', 'EndMessageSet'],
        '0x5110': ['AT', '1', 'DisplayFormat'],
        '0x5120': ['AT', '1', 'PagePositionID'],
        '0x5130': ['CS', '1', 'TextFormatID'],
        '0x5140': ['CS', '1', 'NormalReverse'],
        '0x5150': ['CS', '1', 'AddGrayScale'],
        '0x5160': ['CS', '1', 'Borders'],
        '0x5170': ['IS', '1', 'Copies'],
        '0x5180': ['CS', '1', 'OldMagnificationType'],
        '0x5190': ['CS', '1', 'Erase'],
        '0x51A0': ['CS', '1', 'Print'],
        '0x51B0': ['US', '1-n', 'Overlays'],
    },
    '0x0002': {
        '0x0000': ['UL', '1', 'FileMetaInformationGroupLength'],
        '0x0001': ['OB', '1', 'FileMetaInformationVersion'],
        '0x0002': ['UI', '1', 'MediaStorageSOPClassUID'],
        '0x0003': ['UI', '1', 'MediaStorageSOPInstanceUID'],
        '0x0010': ['UI', '1', 'TransferSyntaxUID'],
        '0x0012': ['UI', '1', 'ImplementationClassUID'],
        '0x0013': ['SH', '1', 'ImplementationVersionName'],
        '0x0016': ['AE', '1', 'SourceApplicationEntityTitle'],
        '0x0100': ['UI', '1', 'PrivateInformationCreatorUID'],
        '0x0102': ['OB', '1', 'PrivateInformation'],
    },
    '0x0004': {
        '0x0000': ['UL', '1', 'FileSetGroupLength'],
        '0x1130': ['CS', '1', 'FileSetID'],
        '0x1141': ['CS', '8', 'FileSetDescriptorFileID'],
        '0x1142': ['CS', '1', 'FileSetCharacterSet'],
        '0x1200': ['UL', '1', 'RootDirectoryFirstRecord'],
        '0x1202': ['UL', '1', 'RootDirectoryLastRecord'],
        '0x1212': ['US', '1', 'FileSetConsistencyFlag'],
        '0x1220': ['SQ', '1', 'DirectoryRecordSequence'],
        '0x1400': ['UL', '1', 'NextDirectoryRecordOffset'],
        '0x1410': ['US', '1', 'RecordInUseFlag'],
        '0x1420': ['UL', '1', 'LowerLevelDirectoryOffset'],
        '0x1430': ['CS', '1', 'DirectoryRecordType'],
        '0x1432': ['UI', '1', 'PrivateRecordUID'],
        '0x1500': ['CS', '8', 'ReferencedFileID'],
        '0x1504': ['UL', '1', 'DirectoryRecordOffset'],
        '0x1510': ['UI', '1', 'ReferencedSOPClassUIDInFile'],
        '0x1511': ['UI', '1', 'ReferencedSOPInstanceUIDInFile'],
        '0x1512': ['UI', '1', 'ReferencedTransferSyntaxUIDInFile'],
        '0x1600': ['UL', '1', 'NumberOfReferences'],
    },
    '0x0008': {
        '0x0000': ['UL', '1', 'IdentifyingGroupLength'],
        '0x0001': ['UL', '1', 'LengthToEnd'],
        '0x0005': ['CS', '1', 'SpecificCharacterSet'],
        '0x0008': ['CS', '1-n', 'ImageType'],
        '0x000A': ['US', '1', 'SequenceItemNumber'],
        '0x0010': ['CS', '1', 'RecognitionCode'],
        '0x0012': ['DA', '1', 'InstanceCreationDate'],
        '0x0013': ['TM', '1', 'InstanceCreationTime'],
        '0x0014': ['UI', '1', 'InstanceCreatorUID'],
        '0x0016': ['UI', '1', 'SOPClassUID'],
        '0x0018': ['UI', '1', 'SOPInstanceUID'],
        '0x0020': ['DA', '1', 'StudyDate'],
        '0x0021': ['DA', '1', 'SeriesDate'],
        '0x0022': ['DA', '1', 'AcquisitionDate'],
        '0x0023': ['DA', '1', 'ImageDate'],
        /* '0x0023': ['DA','1','ContentDate'], */
        '0x0024': ['DA', '1', 'OverlayDate'],
        '0x0025': ['DA', '1', 'CurveDate'],
        '0x002A': ['DT', '1', 'AcquisitionDatetime'],
        '0x0030': ['TM', '1', 'StudyTime'],
        '0x0031': ['TM', '1', 'SeriesTime'],
        '0x0032': ['TM', '1', 'AcquisitionTime'],
        '0x0033': ['TM', '1', 'ImageTime'],
        '0x0034': ['TM', '1', 'OverlayTime'],
        '0x0035': ['TM', '1', 'CurveTime'],
        '0x0040': ['US', '1', 'OldDataSetType'],
        '0x0041': ['LT', '1', 'OldDataSetSubtype'],
        '0x0042': ['CS', '1', 'NuclearMedicineSeriesType'],
        '0x0050': ['SH', '1', 'AccessionNumber'],
        '0x0052': ['CS', '1', 'QueryRetrieveLevel'],
        '0x0054': ['AE', '1-n', 'RetrieveAETitle'],
        '0x0058': ['UI', '1-n', 'DataSetFailedSOPInstanceUIDList'],
        '0x0060': ['CS', '1', 'Modality'],
        '0x0061': ['CS', '1-n', 'ModalitiesInStudy'],
        '0x0064': ['CS', '1', 'ConversionType'],
        '0x0068': ['CS', '1', 'PresentationIntentType'],
        '0x0070': ['LO', '1', 'Manufacturer'],
        '0x0080': ['LO', '1', 'InstitutionName'],
        '0x0081': ['ST', '1', 'InstitutionAddress'],
        '0x0082': ['SQ', '1', 'InstitutionCodeSequence'],
        '0x0090': ['PN', '1', 'ReferringPhysicianName'],
        '0x0092': ['ST', '1', 'ReferringPhysicianAddress'],
        '0x0094': ['SH', '1-n', 'ReferringPhysicianTelephoneNumber'],
        '0x0100': ['SH', '1', 'CodeValue'],
        '0x0102': ['SH', '1', 'CodingSchemeDesignator'],
        '0x0103': ['SH', '1', 'CodingSchemeVersion'],
        '0x0104': ['LO', '1', 'CodeMeaning'],
        '0x0105': ['CS', '1', 'MappingResource'],
        '0x0106': ['DT', '1', 'ContextGroupVersion'],
        '0x0107': ['DT', '1', 'ContextGroupLocalVersion'],
        '0x010B': ['CS', '1', 'CodeSetExtensionFlag'],
        '0x010C': ['UI', '1', 'PrivateCodingSchemeCreatorUID'],
        '0x010D': ['UI', '1', 'CodeSetExtensionCreatorUID'],
        '0x010F': ['CS', '1', 'ContextIdentifier'],
        '0x0201': ['SH', '1', 'TimezoneOffsetFromUTC'],
        '0x1000': ['AE', '1', 'NetworkID'],
        '0x1010': ['SH', '1', 'StationName'],
        '0x1030': ['LO', '1', 'StudyDescription'],
        '0x1032': ['SQ', '1', 'ProcedureCodeSequence'],
        '0x103E': ['LO', '1', 'SeriesDescription'],
        '0x1040': ['LO', '1', 'InstitutionalDepartmentName'],
        '0x1048': ['PN', '1-n', 'PhysicianOfRecord'],
        '0x1050': ['PN', '1-n', 'PerformingPhysicianName'],
        '0x1060': ['PN', '1-n', 'PhysicianReadingStudy'],
        '0x1070': ['PN', '1-n', 'OperatorName'],
        '0x1080': ['LO', '1-n', 'AdmittingDiagnosisDescription'],
        '0x1084': ['SQ', '1', 'AdmittingDiagnosisCodeSequence'],
        '0x1090': ['LO', '1', 'ManufacturerModelName'],
        '0x1100': ['SQ', '1', 'ReferencedResultsSequence'],
        '0x1110': ['SQ', '1', 'ReferencedStudySequence'],
        '0x1111': ['SQ', '1', 'ReferencedStudyComponentSequence'],
        '0x1115': ['SQ', '1', 'ReferencedSeriesSequence'],
        '0x1120': ['SQ', '1', 'ReferencedPatientSequence'],
        '0x1125': ['SQ', '1', 'ReferencedVisitSequence'],
        '0x1130': ['SQ', '1', 'ReferencedOverlaySequence'],
        '0x1140': ['SQ', '1', 'ReferencedImageSequence'],
        '0x1145': ['SQ', '1', 'ReferencedCurveSequence'],
        '0x114A': ['SQ', '1', 'ReferencedInstanceSequence'],
        '0x114B': ['LO', '1', 'ReferenceDescription'],
        '0x1150': ['UI', '1', 'ReferencedSOPClassUID'],
        '0x1155': ['UI', '1', 'ReferencedSOPInstanceUID'],
        '0x115A': ['UI', '1-n', 'SOPClassesSupported'],
        '0x1160': ['IS', '1', 'ReferencedFrameNumber'],
        '0x1195': ['UI', '1', 'TransactionUID'],
        '0x1197': ['US', '1', 'FailureReason'],
        '0x1198': ['SQ', '1', 'FailedSOPSequence'],
        '0x1199': ['SQ', '1', 'ReferencedSOPSequence'],
        '0x2110': ['CS', '1', 'LossyImageCompression'],
        '0x2111': ['ST', '1', 'DerivationDescription'],
        '0x2112': ['SQ', '1', 'SourceImageSequence'],
        '0x2120': ['SH', '1', 'StageName'],
        '0x2122': ['IS', '1', 'StageNumber'],
        '0x2124': ['IS', '1', 'NumberOfStages'],
        '0x2128': ['IS', '1', 'ViewNumber'],
        '0x2129': ['IS', '1', 'NumberOfEventTimers'],
        '0x212A': ['IS', '1', 'NumberOfViewsInStage'],
        '0x2130': ['DS', '1-n', 'EventElapsedTime'],
        '0x2132': ['LO', '1-n', 'EventTimerName'],
        '0x2142': ['IS', '1', 'StartTrim'],
        '0x2143': ['IS', '1', 'StopTrim'],
        '0x2144': ['IS', '1', 'RecommendedDisplayFrameRate'],
        '0x2200': ['CS', '1', 'TransducerPosition'],
        '0x2204': ['CS', '1', 'TransducerOrientation'],
        '0x2208': ['CS', '1', 'AnatomicStructure'],
        '0x2218': ['SQ', '1', 'AnatomicRegionSequence'],
        '0x2220': ['SQ', '1', 'AnatomicRegionModifierSequence'],
        '0x2228': ['SQ', '1', 'PrimaryAnatomicStructureSequence'],
        '0x2229': ['SQ', '1', 'AnatomicStructureSpaceOrRegionSequence'],
        '0x2230': ['SQ', '1', 'PrimaryAnatomicStructureModifierSequence'],
        '0x2240': ['SQ', '1', 'TransducerPositionSequence'],
        '0x2242': ['SQ', '1', 'TransducerPositionModifierSequence'],
        '0x2244': ['SQ', '1', 'TransducerOrientationSequence'],
        '0x2246': ['SQ', '1', 'TransducerOrientationModifierSequence'],
        '0x4000': ['LT', '1-n', 'IdentifyingComments'],
    },
    '0x0010': {
        '0x0000': ['UL', '1', 'PatientGroupLength'],
        '0x0010': ['PN', '1', 'PatientName'],
        '0x0020': ['LO', '1', 'PatientID'],
        '0x0021': ['LO', '1', 'IssuerOfPatientID'],
        '0x0030': ['DA', '1', 'PatientBirthDate'],
        '0x0032': ['TM', '1', 'PatientBirthTime'],
        '0x0040': ['CS', '1', 'PatientSex'],
        '0x0050': ['SQ', '1', 'PatientInsurancePlanCodeSequence'],
        '0x1000': ['LO', '1-n', 'OtherPatientID'],
        '0x1001': ['PN', '1-n', 'OtherPatientName'],
        '0x1005': ['PN', '1', 'PatientBirthName'],
        '0x1010': ['AS', '1', 'PatientAge'],
        '0x1020': ['DS', '1', 'PatientSize'],
        '0x1030': ['DS', '1', 'PatientWeight'],
        '0x1040': ['LO', '1', 'PatientAddress'],
        '0x1050': ['LT', '1-n', 'InsurancePlanIdentification'],
        '0x1060': ['PN', '1', 'PatientMotherBirthName'],
        '0x1080': ['LO', '1', 'MilitaryRank'],
        '0x1081': ['LO', '1', 'BranchOfService'],
        '0x1090': ['LO', '1', 'MedicalRecordLocator'],
        '0x2000': ['LO', '1-n', 'MedicalAlerts'],
        '0x2110': ['LO', '1-n', 'ContrastAllergies'],
        '0x2150': ['LO', '1', 'CountryOfResidence'],
        '0x2152': ['LO', '1', 'RegionOfResidence'],
        '0x2154': ['SH', '1-n', 'PatientTelephoneNumber'],
        '0x2160': ['SH', '1', 'EthnicGroup'],
        '0x2180': ['SH', '1', 'Occupation'],
        '0x21A0': ['CS', '1', 'SmokingStatus'],
        '0x21B0': ['LT', '1', 'AdditionalPatientHistory'],
        '0x21C0': ['US', '1', 'PregnancyStatus'],
        '0x21D0': ['DA', '1', 'LastMenstrualDate'],
        '0x21F0': ['LO', '1', 'PatientReligiousPreference'],
        '0x4000': ['LT', '1', 'PatientComments'],
    },
    '0x0018': {
        '0x0000': ['UL', '1', 'AcquisitionGroupLength'],
        '0x0010': ['LO', '1', 'ContrastBolusAgent'],
        '0x0012': ['SQ', '1', 'ContrastBolusAgentSequence'],
        '0x0014': ['SQ', '1', 'ContrastBolusAdministrationRouteSequence'],
        '0x0015': ['CS', '1', 'BodyPartExamined'],
        '0x0020': ['CS', '1-n', 'ScanningSequence'],
        '0x0021': ['CS', '1-n', 'SequenceVariant'],
        '0x0022': ['CS', '1-n', 'ScanOptions'],
        '0x0023': ['CS', '1', 'MRAcquisitionType'],
        '0x0024': ['SH', '1', 'SequenceName'],
        '0x0025': ['CS', '1', 'AngioFlag'],
        '0x0026': ['SQ', '1', 'InterventionDrugInformationSequence'],
        '0x0027': ['TM', '1', 'InterventionDrugStopTime'],
        '0x0028': ['DS', '1', 'InterventionDrugDose'],
        '0x0029': ['SQ', '1', 'InterventionalDrugSequence'],
        '0x002A': ['SQ', '1', 'AdditionalDrugSequence'],
        '0x0030': ['LO', '1-n', 'Radionuclide'],
        '0x0031': ['LO', '1-n', 'Radiopharmaceutical'],
        '0x0032': ['DS', '1', 'EnergyWindowCenterline'],
        '0x0033': ['DS', '1-n', 'EnergyWindowTotalWidth'],
        '0x0034': ['LO', '1', 'InterventionalDrugName'],
        '0x0035': ['TM', '1', 'InterventionalDrugStartTime'],
        '0x0036': ['SQ', '1', 'InterventionalTherapySequence'],
        '0x0037': ['CS', '1', 'TherapyType'],
        '0x0038': ['CS', '1', 'InterventionalStatus'],
        '0x0039': ['CS', '1', 'TherapyDescription'],
        '0x0040': ['IS', '1', 'CineRate'],
        '0x0050': ['DS', '1', 'SliceThickness'],
        '0x0060': ['DS', '1', 'KVP'],
        '0x0070': ['IS', '1', 'CountsAccumulated'],
        '0x0071': ['CS', '1', 'AcquisitionTerminationCondition'],
        '0x0072': ['DS', '1', 'EffectiveSeriesDuration'],
        '0x0073': ['CS', '1', 'AcquisitionStartCondition'],
        '0x0074': ['IS', '1', 'AcquisitionStartConditionData'],
        '0x0075': ['IS', '1', 'AcquisitionTerminationConditionData'],
        '0x0080': ['DS', '1', 'RepetitionTime'],
        '0x0081': ['DS', '1', 'EchoTime'],
        '0x0082': ['DS', '1', 'InversionTime'],
        '0x0083': ['DS', '1', 'NumberOfAverages'],
        '0x0084': ['DS', '1', 'ImagingFrequency'],
        '0x0085': ['SH', '1', 'ImagedNucleus'],
        '0x0086': ['IS', '1-n', 'EchoNumber'],
        '0x0087': ['DS', '1', 'MagneticFieldStrength'],
        '0x0088': ['DS', '1', 'SpacingBetweenSlices'],
        '0x0089': ['IS', '1', 'NumberOfPhaseEncodingSteps'],
        '0x0090': ['DS', '1', 'DataCollectionDiameter'],
        '0x0091': ['IS', '1', 'EchoTrainLength'],
        '0x0093': ['DS', '1', 'PercentSampling'],
        '0x0094': ['DS', '1', 'PercentPhaseFieldOfView'],
        '0x0095': ['DS', '1', 'PixelBandwidth'],
        '0x1000': ['LO', '1', 'DeviceSerialNumber'],
        '0x1002': ['UI', '1', 'DeviceUID'],
        '0x1003': ['LO', '1', 'DeviceID'],
        '0x1004': ['LO', '1', 'PlateID'],
        '0x1005': ['LO', '1', 'GeneratorID'],
        '0x1006': ['LO', '1', 'GridID'],
        '0x1007': ['LO', '1', 'CassetteID'],
        '0x1008': ['LO', '1', 'GantryID'],
        '0x1010': ['LO', '1', 'SecondaryCaptureDeviceID'],
        '0x1011': ['LO', '1', 'HardcopyCreationDeviceID'],
        '0x1012': ['DA', '1', 'DateOfSecondaryCapture'],
        '0x1014': ['TM', '1', 'TimeOfSecondaryCapture'],
        '0x1016': ['LO', '1', 'SecondaryCaptureDeviceManufacturer'],
        '0x1017': ['LO', '1', 'HardcopyDeviceManufacturer'],
        '0x1018': ['LO', '1', 'SecondaryCaptureDeviceManufacturerModelName'],
        '0x1019': ['LO', '1-n', 'SecondaryCaptureDeviceSoftwareVersion'],
        '0x101A': ['LO', '1-n', 'HardcopyDeviceSoftwareVersion'],
        '0x101B': ['LO', '1', 'HardcopyDeviceManfuacturersModelName'],
        '0x1020': ['LO', '1-n', 'SoftwareVersion'],
        '0x1022': ['SH', '1', 'VideoImageFormatAcquired'],
        '0x1023': ['LO', '1', 'DigitalImageFormatAcquired'],
        '0x1030': ['LO', '1', 'ProtocolName'],
        '0x1040': ['LO', '1', 'ContrastBolusRoute'],
        '0x1041': ['DS', '1', 'ContrastBolusVolume'],
        '0x1042': ['TM', '1', 'ContrastBolusStartTime'],
        '0x1043': ['TM', '1', 'ContrastBolusStopTime'],
        '0x1044': ['DS', '1', 'ContrastBolusTotalDose'],
        '0x1045': ['IS', '1-n', 'SyringeCounts'],
        '0x1046': ['DS', '1-n', 'ContrastFlowRate'],
        '0x1047': ['DS', '1-n', 'ContrastFlowDuration'],
        '0x1048': ['CS', '1', 'ContrastBolusIngredient'],
        '0x1049': ['DS', '1', 'ContrastBolusIngredientConcentration'],
        '0x1050': ['DS', '1', 'SpatialResolution'],
        '0x1060': ['DS', '1', 'TriggerTime'],
        '0x1061': ['LO', '1', 'TriggerSourceOrType'],
        '0x1062': ['IS', '1', 'NominalInterval'],
        '0x1063': ['DS', '1', 'FrameTime'],
        '0x1064': ['LO', '1', 'FramingType'],
        '0x1065': ['DS', '1-n', 'FrameTimeVector'],
        '0x1066': ['DS', '1', 'FrameDelay'],
        '0x1067': ['DS', '1', 'ImageTriggerDelay'],
        '0x1068': ['DS', '1', 'MultiplexGroupTimeOffset'],
        '0x1069': ['DS', '1', 'TriggerTimeOffset'],
        '0x106A': ['CS', '1', 'SynchronizationTrigger'],
        '0x106C': ['US', '2', 'SynchronizationChannel'],
        '0x106E': ['UL', '1', 'TriggerSamplePosition'],
        '0x1070': ['LO', '1-n', 'RadionuclideRoute'],
        '0x1071': ['DS', '1-n', 'RadionuclideVolume'],
        '0x1072': ['TM', '1-n', 'RadionuclideStartTime'],
        '0x1073': ['TM', '1-n', 'RadionuclideStopTime'],
        '0x1074': ['DS', '1-n', 'RadionuclideTotalDose'],
        '0x1075': ['DS', '1', 'RadionuclideHalfLife'],
        '0x1076': ['DS', '1', 'RadionuclidePositronFraction'],
        '0x1077': ['DS', '1', 'RadiopharmaceuticalSpecificActivity'],
        '0x1080': ['CS', '1', 'BeatRejectionFlag'],
        '0x1081': ['IS', '1', 'LowRRValue'],
        '0x1082': ['IS', '1', 'HighRRValue'],
        '0x1083': ['IS', '1', 'IntervalsAcquired'],
        '0x1084': ['IS', '1', 'IntervalsRejected'],
        '0x1085': ['LO', '1', 'PVCRejection'],
        '0x1086': ['IS', '1', 'SkipBeats'],
        '0x1088': ['IS', '1', 'HeartRate'],
        '0x1090': ['IS', '1', 'CardiacNumberOfImages'],
        '0x1094': ['IS', '1', 'TriggerWindow'],
        '0x1100': ['DS', '1', 'ReconstructionDiameter'],
        '0x1110': ['DS', '1', 'DistanceSourceToDetector'],
        '0x1111': ['DS', '1', 'DistanceSourceToPatient'],
        '0x1114': ['DS', '1', 'EstimatedRadiographicMagnificationFactor'],
        '0x1120': ['DS', '1', 'GantryDetectorTilt'],
        '0x1121': ['DS', '1', 'GantryDetectorSlew'],
        '0x1130': ['DS', '1', 'TableHeight'],
        '0x1131': ['DS', '1', 'TableTraverse'],
        '0x1134': ['DS', '1', 'TableMotion'],
        '0x1135': ['DS', '1-n', 'TableVerticalIncrement'],
        '0x1136': ['DS', '1-n', 'TableLateralIncrement'],
        '0x1137': ['DS', '1-n', 'TableLongitudinalIncrement'],
        '0x1138': ['DS', '1', 'TableAngle'],
        '0x113A': ['CS', '1', 'TableType'],
        '0x1140': ['CS', '1', 'RotationDirection'],
        '0x1141': ['DS', '1', 'AngularPosition'],
        '0x1142': ['DS', '1-n', 'RadialPosition'],
        '0x1143': ['DS', '1', 'ScanArc'],
        '0x1144': ['DS', '1', 'AngularStep'],
        '0x1145': ['DS', '1', 'CenterOfRotationOffset'],
        '0x1146': ['DS', '1-n', 'RotationOffset'],
        '0x1147': ['CS', '1', 'FieldOfViewShape'],
        '0x1149': ['IS', '2', 'FieldOfViewDimension'],
        '0x1150': ['IS', '1', 'ExposureTime'],
        '0x1151': ['IS', '1', 'XrayTubeCurrent'],
        '0x1152': ['IS', '1', 'Exposure'],
        '0x1153': ['IS', '1', 'ExposureinuAs'],
        '0x1154': ['DS', '1', 'AveragePulseWidth'],
        '0x1155': ['CS', '1', 'RadiationSetting'],
        '0x1156': ['CS', '1', 'RectificationType'],
        '0x115A': ['CS', '1', 'RadiationMode'],
        '0x115E': ['DS', '1', 'ImageAreaDoseProduct'],
        '0x1160': ['SH', '1', 'FilterType'],
        '0x1161': ['LO', '1-n', 'TypeOfFilters'],
        '0x1162': ['DS', '1', 'IntensifierSize'],
        '0x1164': ['DS', '2', 'ImagerPixelSpacing'],
        '0x1166': ['CS', '1', 'Grid'],
        '0x1170': ['IS', '1', 'GeneratorPower'],
        '0x1180': ['SH', '1', 'CollimatorGridName'],
        '0x1181': ['CS', '1', 'CollimatorType'],
        '0x1182': ['IS', '1', 'FocalDistance'],
        '0x1183': ['DS', '1', 'XFocusCenter'],
        '0x1184': ['DS', '1', 'YFocusCenter'],
        '0x1190': ['DS', '1-n', 'FocalSpot'],
        '0x1191': ['CS', '1', 'AnodeTargetMaterial'],
        '0x11A0': ['DS', '1', 'BodyPartThickness'],
        '0x11A2': ['DS', '1', 'CompressionForce'],
        '0x1200': ['DA', '1-n', 'DateOfLastCalibration'],
        '0x1201': ['TM', '1-n', 'TimeOfLastCalibration'],
        '0x1210': ['SH', '1-n', 'ConvolutionKernel'],
        '0x1240': ['IS', '1-n', 'UpperLowerPixelValues'],
        '0x1242': ['IS', '1', 'ActualFrameDuration'],
        '0x1243': ['IS', '1', 'CountRate'],
        '0x1244': ['US', '1', 'PreferredPlaybackSequencing'],
        '0x1250': ['SH', '1', 'ReceivingCoil'],
        '0x1251': ['SH', '1', 'TransmittingCoil'],
        '0x1260': ['SH', '1', 'PlateType'],
        '0x1261': ['LO', '1', 'PhosphorType'],
        '0x1300': ['IS', '1', 'ScanVelocity'],
        '0x1301': ['CS', '1-n', 'WholeBodyTechnique'],
        '0x1302': ['IS', '1', 'ScanLength'],
        '0x1310': ['US', '4', 'AcquisitionMatrix'],
        '0x1312': ['CS', '1', 'PhaseEncodingDirection'],
        '0x1314': ['DS', '1', 'FlipAngle'],
        '0x1315': ['CS', '1', 'VariableFlipAngleFlag'],
        '0x1316': ['DS', '1', 'SAR'],
        '0x1318': ['DS', '1', 'dBdt'],
        '0x1400': ['LO', '1', 'AcquisitionDeviceProcessingDescription'],
        '0x1401': ['LO', '1', 'AcquisitionDeviceProcessingCode'],
        '0x1402': ['CS', '1', 'CassetteOrientation'],
        '0x1403': ['CS', '1', 'CassetteSize'],
        '0x1404': ['US', '1', 'ExposuresOnPlate'],
        '0x1405': ['IS', '1', 'RelativeXrayExposure'],
        '0x1450': ['DS', '1', 'ColumnAngulation'],
        '0x1460': ['DS', '1', 'TomoLayerHeight'],
        '0x1470': ['DS', '1', 'TomoAngle'],
        '0x1480': ['DS', '1', 'TomoTime'],
        '0x1490': ['CS', '1', 'TomoType'],
        '0x1491': ['CS', '1', 'TomoClass'],
        '0x1495': ['IS', '1', 'NumberofTomosynthesisSourceImages'],
        '0x1500': ['CS', '1', 'PositionerMotion'],
        '0x1508': ['CS', '1', 'PositionerType'],
        '0x1510': ['DS', '1', 'PositionerPrimaryAngle'],
        '0x1511': ['DS', '1', 'PositionerSecondaryAngle'],
        '0x1520': ['DS', '1-n', 'PositionerPrimaryAngleIncrement'],
        '0x1521': ['DS', '1-n', 'PositionerSecondaryAngleIncrement'],
        '0x1530': ['DS', '1', 'DetectorPrimaryAngle'],
        '0x1531': ['DS', '1', 'DetectorSecondaryAngle'],
        '0x1600': ['CS', '3', 'ShutterShape'],
        '0x1602': ['IS', '1', 'ShutterLeftVerticalEdge'],
        '0x1604': ['IS', '1', 'ShutterRightVerticalEdge'],
        '0x1606': ['IS', '1', 'ShutterUpperHorizontalEdge'],
        '0x1608': ['IS', '1', 'ShutterLowerHorizontalEdge'],
        '0x1610': ['IS', '1', 'CenterOfCircularShutter'],
        '0x1612': ['IS', '1', 'RadiusOfCircularShutter'],
        '0x1620': ['IS', '1-n', 'VerticesOfPolygonalShutter'],
        '0x1622': ['US', '1', 'ShutterPresentationValue'],
        '0x1623': ['US', '1', 'ShutterOverlayGroup'],
        '0x1700': ['CS', '3', 'CollimatorShape'],
        '0x1702': ['IS', '1', 'CollimatorLeftVerticalEdge'],
        '0x1704': ['IS', '1', 'CollimatorRightVerticalEdge'],
        '0x1706': ['IS', '1', 'CollimatorUpperHorizontalEdge'],
        '0x1708': ['IS', '1', 'CollimatorLowerHorizontalEdge'],
        '0x1710': ['IS', '1', 'CenterOfCircularCollimator'],
        '0x1712': ['IS', '1', 'RadiusOfCircularCollimator'],
        '0x1720': ['IS', '1-n', 'VerticesOfPolygonalCollimator'],
        '0x1800': ['CS', '1', 'AcquisitionTimeSynchronized'],
        '0x1801': ['SH', '1', 'TimeSource'],
        '0x1802': ['CS', '1', 'TimeDistributionProtocol'],
        '0x1810': ['DT', '1', 'AcquisitionTimestamp'],
        '0x4000': ['LT', '1-n', 'AcquisitionComments'],
        '0x5000': ['SH', '1-n', 'OutputPower'],
        '0x5010': ['LO', '3', 'TransducerData'],
        '0x5012': ['DS', '1', 'FocusDepth'],
        '0x5020': ['LO', '1', 'PreprocessingFunction'],
        '0x5021': ['LO', '1', 'PostprocessingFunction'],
        '0x5022': ['DS', '1', 'MechanicalIndex'],
        '0x5024': ['DS', '1', 'ThermalIndex'],
        '0x5026': ['DS', '1', 'CranialThermalIndex'],
        '0x5027': ['DS', '1', 'SoftTissueThermalIndex'],
        '0x5028': ['DS', '1', 'SoftTissueFocusThermalIndex'],
        '0x5029': ['DS', '1', 'SoftTissueSurfaceThermalIndex'],
        '0x5030': ['DS', '1', 'DynamicRange'],
        '0x5040': ['DS', '1', 'TotalGain'],
        '0x5050': ['IS', '1', 'DepthOfScanField'],
        '0x5100': ['CS', '1', 'PatientPosition'],
        '0x5101': ['CS', '1', 'ViewPosition'],
        '0x5104': ['SQ', '1', 'ProjectionEponymousNameCodeSequence'],
        '0x5210': ['DS', '6', 'ImageTransformationMatrix'],
        '0x5212': ['DS', '3', 'ImageTranslationVector'],
        '0x6000': ['DS', '1', 'Sensitivity'],
        '0x6011': ['SQ', '1', 'SequenceOfUltrasoundRegions'],
        '0x6012': ['US', '1', 'RegionSpatialFormat'],
        '0x6014': ['US', '1', 'RegionDataType'],
        '0x6016': ['UL', '1', 'RegionFlags'],
        '0x6018': ['UL', '1', 'RegionLocationMinX0'],
        '0x601A': ['UL', '1', 'RegionLocationMinY0'],
        '0x601C': ['UL', '1', 'RegionLocationMaxX1'],
        '0x601E': ['UL', '1', 'RegionLocationMaxY1'],
        '0x6020': ['SL', '1', 'ReferencePixelX0'],
        '0x6022': ['SL', '1', 'ReferencePixelY0'],
        '0x6024': ['US', '1', 'PhysicalUnitsXDirection'],
        '0x6026': ['US', '1', 'PhysicalUnitsYDirection'],
        '0x6028': ['FD', '1', 'ReferencePixelPhysicalValueX'],
        '0x602A': ['FD', '1', 'ReferencePixelPhysicalValueY'],
        '0x602C': ['FD', '1', 'PhysicalDeltaX'],
        '0x602E': ['FD', '1', 'PhysicalDeltaY'],
        '0x6030': ['UL', '1', 'TransducerFrequency'],
        '0x6031': ['CS', '1', 'TransducerType'],
        '0x6032': ['UL', '1', 'PulseRepetitionFrequency'],
        '0x6034': ['FD', '1', 'DopplerCorrectionAngle'],
        '0x6036': ['FD', '1', 'SteeringAngle'],
        '0x6038': ['UL', '1', 'DopplerSampleVolumeXPosition'],
        '0x603A': ['UL', '1', 'DopplerSampleVolumeYPosition'],
        '0x603C': ['UL', '1', 'TMLinePositionX0'],
        '0x603E': ['UL', '1', 'TMLinePositionY0'],
        '0x6040': ['UL', '1', 'TMLinePositionX1'],
        '0x6042': ['UL', '1', 'TMLinePositionY1'],
        '0x6044': ['US', '1', 'PixelComponentOrganization'],
        '0x6046': ['UL', '1', 'PixelComponentMask'],
        '0x6048': ['UL', '1', 'PixelComponentRangeStart'],
        '0x604A': ['UL', '1', 'PixelComponentRangeStop'],
        '0x604C': ['US', '1', 'PixelComponentPhysicalUnits'],
        '0x604E': ['US', '1', 'PixelComponentDataType'],
        '0x6050': ['UL', '1', 'NumberOfTableBreakPoints'],
        '0x6052': ['UL', '1-n', 'TableOfXBreakPoints'],
        '0x6054': ['FD', '1-n', 'TableOfYBreakPoints'],
        '0x6056': ['UL', '1', 'NumberOfTableEntries'],
        '0x6058': ['UL', '1-n', 'TableOfPixelValues'],
        '0x605A': ['FL', '1-n', 'TableOfParameterValues'],
        '0x7000': ['CS', '1', 'DetectorConditionsNominalFlag'],
        '0x7001': ['DS', '1', 'DetectorTemperature'],
        '0x7004': ['CS', '1', 'DetectorType'],
        '0x7005': ['CS', '1', 'DetectorConfiguration'],
        '0x7006': ['LT', '1', 'DetectorDescription'],
        '0x7008': ['LT', '1', 'DetectorMode'],
        '0x700A': ['SH', '1', 'DetectorID'],
        '0x700C': ['DA', '1', 'DateofLastDetectorCalibration'],
        '0x700E': ['TM', '1', 'TimeofLastDetectorCalibration'],
        '0x7010': ['IS', '1', 'ExposuresOnDetectorSinceLastCalibration'],
        '0x7011': ['IS', '1', 'ExposuresOnDetectorSinceManufactured'],
        '0x7012': ['DS', '1', 'DetectorTimeSinceLastExposure'],
        '0x7014': ['DS', '1', 'DetectorActiveTime'],
        '0x7016': ['DS', '1', 'DetectorActivationOffsetFromExposure'],
        '0x701A': ['DS', '2', 'DetectorBinning'],
        '0x7020': ['DS', '2', 'DetectorElementPhysicalSize'],
        '0x7022': ['DS', '2', 'DetectorElementSpacing'],
        '0x7024': ['CS', '1', 'DetectorActiveShape'],
        '0x7026': ['DS', '1-2', 'DetectorActiveDimensions'],
        '0x7028': ['DS', '2', 'DetectorActiveOrigin'],
        '0x7030': ['DS', '2', 'FieldofViewOrigin'],
        '0x7032': ['DS', '1', 'FieldofViewRotation'],
        '0x7034': ['CS', '1', 'FieldofViewHorizontalFlip'],
        '0x7040': ['LT', '1', 'GridAbsorbingMaterial'],
        '0x7041': ['LT', '1', 'GridSpacingMaterial'],
        '0x7042': ['DS', '1', 'GridThickness'],
        '0x7044': ['DS', '1', 'GridPitch'],
        '0x7046': ['IS', '2', 'GridAspectRatio'],
        '0x7048': ['DS', '1', 'GridPeriod'],
        '0x704C': ['DS', '1', 'GridFocalDistance'],
        '0x7050': ['LT', '1-n', 'FilterMaterial'],
        '0x7052': ['DS', '1-n', 'FilterThicknessMinimum'],
        '0x7054': ['DS', '1-n', 'FilterThicknessMaximum'],
        '0x7060': ['CS', '1', 'ExposureControlMode'],
        '0x7062': ['LT', '1', 'ExposureControlModeDescription'],
        '0x7064': ['CS', '1', 'ExposureStatus'],
        '0x7065': ['DS', '1', 'PhototimerSetting'],
    },
    '0x0020': {
        '0x0000': ['UL', '1', 'ImageGroupLength'],
        '0x000D': ['UI', '1', 'StudyInstanceUID'],
        '0x000E': ['UI', '1', 'SeriesInstanceUID'],
        '0x0010': ['SH', '1', 'StudyID'],
        '0x0011': ['IS', '1', 'SeriesNumber'],
        '0x0012': ['IS', '1', 'AcquisitionNumber'],
        '0x0013': ['IS', '1', 'ImageNumber'],
        '0x0014': ['IS', '1', 'IsotopeNumber'],
        '0x0015': ['IS', '1', 'PhaseNumber'],
        '0x0016': ['IS', '1', 'IntervalNumber'],
        '0x0017': ['IS', '1', 'TimeSlotNumber'],
        '0x0018': ['IS', '1', 'AngleNumber'],
        '0x0019': ['IS', '1', 'ItemNumber'],
        '0x0020': ['CS', '2', 'PatientOrientation'],
        '0x0022': ['IS', '1', 'OverlayNumber'],
        '0x0024': ['IS', '1', 'CurveNumber'],
        '0x0026': ['IS', '1', 'LUTNumber'],
        '0x0030': ['DS', '3', 'ImagePosition'],
        '0x0032': ['DS', '3', 'ImagePositionPatient'],
        '0x0035': ['DS', '6', 'ImageOrientation'],
        '0x0037': ['DS', '6', 'ImageOrientationPatient'],
        '0x0050': ['DS', '1', 'Location'],
        '0x0052': ['UI', '1', 'FrameOfReferenceUID'],
        '0x0060': ['CS', '1', 'Laterality'],
        '0x0062': ['CS', '1', 'ImageLaterality'],
        '0x0070': ['LT', '1', 'ImageGeometryType'],
        '0x0080': ['CS', '1-n', 'MaskingImage'],
        '0x0100': ['IS', '1', 'TemporalPositionIdentifier'],
        '0x0105': ['IS', '1', 'NumberOfTemporalPositions'],
        '0x0110': ['DS', '1', 'TemporalResolution'],
        '0x0200': ['UI', '1', 'SynchronizationFrameofReferenceUID'],
        '0x1000': ['IS', '1', 'SeriesInStudy'],
        '0x1001': ['IS', '1', 'AcquisitionsInSeries'],
        '0x1002': ['IS', '1', 'ImagesInAcquisition'],
        '0x1003': ['IS', '1', 'ImagesInSeries'],
        '0x1004': ['IS', '1', 'AcquisitionsInStudy'],
        '0x1005': ['IS', '1', 'ImagesInStudy'],
        '0x1020': ['CS', '1-n', 'Reference'],
        '0x1040': ['LO', '1', 'PositionReferenceIndicator'],
        '0x1041': ['DS', '1', 'SliceLocation'],
        '0x1070': ['IS', '1-n', 'OtherStudyNumbers'],
        '0x1200': ['IS', '1', 'NumberOfPatientRelatedStudies'],
        '0x1202': ['IS', '1', 'NumberOfPatientRelatedSeries'],
        '0x1204': ['IS', '1', 'NumberOfPatientRelatedImages'],
        '0x1206': ['IS', '1', 'NumberOfStudyRelatedSeries'],
        '0x1208': ['IS', '1', 'NumberOfStudyRelatedImages'],
        '0x1209': ['IS', '1', 'NumberOfSeriesRelatedInstances'],
        '0x3100': ['CS', '1-n', 'SourceImageID'],
        '0x3401': ['CS', '1', 'ModifyingDeviceID'],
        '0x3402': ['CS', '1', 'ModifiedImageID'],
        '0x3403': ['DA', '1', 'ModifiedImageDate'],
        '0x3404': ['LO', '1', 'ModifyingDeviceManufacturer'],
        '0x3405': ['TM', '1', 'ModifiedImageTime'],
        '0x3406': ['LT', '1', 'ModifiedImageDescription'],
        '0x4000': ['LT', '1', 'ImageComments'],
        '0x5000': ['AT', '1-n', 'OriginalImageIdentification'],
        '0x5002': ['CS', '1-n', 'OriginalImageIdentificationNomenclature'],
    },
    '0x0028': {
        '0x0000': ['UL', '1', 'ImagePresentationGroupLength'],
        '0x0002': ['US', '1', 'SamplesPerPixel'],
        '0x0004': ['CS', '1', 'PhotometricInterpretation'],
        '0x0005': ['US', '1', 'ImageDimensions'],
        '0x0006': ['US', '1', 'PlanarConfiguration'],
        '0x0008': ['IS', '1', 'NumberOfFrames'],
        '0x0009': ['AT', '1', 'FrameIncrementPointer'],
        '0x0010': ['US', '1', 'Rows'],
        '0x0011': ['US', '1', 'Columns'],
        '0x0012': ['US', '1', 'Planes'],
        '0x0014': ['US', '1', 'UltrasoundColorDataPresent'],
        '0x0030': ['DS', '2', 'PixelSpacing'],
        '0x0031': ['DS', '2', 'ZoomFactor'],
        '0x0032': ['DS', '2', 'ZoomCenter'],
        '0x0034': ['IS', '2', 'PixelAspectRatio'],
        '0x0040': ['CS', '1', 'ImageFormat'],
        '0x0050': ['LT', '1-n', 'ManipulatedImage'],
        '0x0051': ['CS', '1', 'CorrectedImage'],
        '0x005F': ['CS', '1', 'CompressionRecognitionCode'],
        '0x0060': ['CS', '1', 'CompressionCode'],
        '0x0061': ['SH', '1', 'CompressionOriginator'],
        '0x0062': ['SH', '1', 'CompressionLabel'],
        '0x0063': ['SH', '1', 'CompressionDescription'],
        '0x0065': ['CS', '1-n', 'CompressionSequence'],
        '0x0066': ['AT', '1-n', 'CompressionStepPointers'],
        '0x0068': ['US', '1', 'RepeatInterval'],
        '0x0069': ['US', '1', 'BitsGrouped'],
        '0x0070': ['US', '1-n', 'PerimeterTable'],
        '0x0071': ['XS', '1', 'PerimeterValue'],
        '0x0080': ['US', '1', 'PredictorRows'],
        '0x0081': ['US', '1', 'PredictorColumns'],
        '0x0082': ['US', '1-n', 'PredictorConstants'],
        '0x0090': ['CS', '1', 'BlockedPixels'],
        '0x0091': ['US', '1', 'BlockRows'],
        '0x0092': ['US', '1', 'BlockColumns'],
        '0x0093': ['US', '1', 'RowOverlap'],
        '0x0094': ['US', '1', 'ColumnOverlap'],
        '0x0100': ['US', '1', 'BitsAllocated'],
        '0x0101': ['US', '1', 'BitsStored'],
        '0x0102': ['US', '1', 'HighBit'],
        '0x0103': ['US', '1', 'PixelRepresentation'],
        '0x0104': ['XS', '1', 'SmallestValidPixelValue'],
        '0x0105': ['XS', '1', 'LargestValidPixelValue'],
        '0x0106': ['XS', '1', 'SmallestImagePixelValue'],
        '0x0107': ['XS', '1', 'LargestImagePixelValue'],
        '0x0108': ['XS', '1', 'SmallestPixelValueInSeries'],
        '0x0109': ['XS', '1', 'LargestPixelValueInSeries'],
        '0x0110': ['XS', '1', 'SmallestPixelValueInPlane'],
        '0x0111': ['XS', '1', 'LargestPixelValueInPlane'],
        '0x0120': ['XS', '1', 'PixelPaddingValue'],
        '0x0200': ['US', '1', 'ImageLocation'],
        '0x0300': ['CS', '1', 'QualityControlImage'],
        '0x0301': ['CS', '1', 'BurnedInAnnotation'],
        '0x0400': ['CS', '1', 'TransformLabel'],
        '0x0401': ['CS', '1', 'TransformVersionNumber'],
        '0x0402': ['US', '1', 'NumberOfTransformSteps'],
        '0x0403': ['CS', '1-n', 'SequenceOfCompressedData'],
        '0x0404': ['AT', '1-n', 'DetailsOfCoefficients'],
        '0x0410': ['US', '1', 'RowsForNthOrderCoefficients'],
        '0x0411': ['US', '1', 'ColumnsForNthOrderCoefficients'],
        '0x0412': ['CS', '1-n', 'CoefficientCoding'],
        '0x0413': ['AT', '1-n', 'CoefficientCodingPointers'],
        '0x0700': ['CS', '1', 'DCTLabel'],
        '0x0701': ['CS', '1-n', 'DataBlockDescription'],
        '0x0702': ['AT', '1-n', 'DataBlock'],
        '0x0710': ['US', '1', 'NormalizationFactorFormat'],
        '0x0720': ['US', '1', 'ZonalMapNumberFormat'],
        '0x0721': ['AT', '1-n', 'ZonalMapLocation'],
        '0x0722': ['US', '1', 'ZonalMapFormat'],
        '0x0730': ['US', '1', 'AdaptiveMapFormat'],
        '0x0740': ['US', '1', 'CodeNumberFormat'],
        '0x0800': ['CS', '1-n', 'CodeLabel'],
        '0x0802': ['US', '1', 'NumberOfTables'],
        '0x0803': ['AT', '1-n', 'CodeTableLocation'],
        '0x0804': ['US', '1', 'BitsForCodeWord'],
        '0x0808': ['AT', '1-n', 'ImageDataLocation'],
        '0x1040': ['CS', '1', 'PixelIntensityRelationship'],
        '0x1041': ['SS', '1', 'PixelIntensityRelationshipSign'],
        '0x1050': ['DS', '1-n', 'WindowCenter'],
        '0x1051': ['DS', '1-n', 'WindowWidth'],
        '0x1052': ['DS', '1', 'RescaleIntercept'],
        '0x1053': ['DS', '1', 'RescaleSlope'],
        '0x1054': ['LO', '1', 'RescaleType'],
        '0x1055': ['LO', '1-n', 'WindowCenterWidthExplanation'],
        '0x1080': ['CS', '1', 'GrayScale'],
        '0x1090': ['CS', '1', 'RecommendedViewingMode'],
        '0x1100': ['XS', '3', 'GrayLookupTableDescriptor'],
        '0x1101': ['XS', '3', 'RedPaletteColorLookupTableDescriptor'],
        '0x1102': ['XS', '3', 'GreenPaletteColorLookupTableDescriptor'],
        '0x1103': ['XS', '3', 'BluePaletteColorLookupTableDescriptor'],
        '0x1111': ['US', '4', 'LargeRedPaletteColorLookupTableDescriptor'],
        '0x1112': ['US', '4', 'LargeGreenPaletteColorLookupTabe'],
        '0x1113': ['US', '4', 'LargeBluePaletteColorLookupTabl'],
        '0x1199': ['UI', '1', 'PaletteColorLookupTableUID'],
        '0x1200': ['XS', '1-n', 'GrayLookupTableData'],
        '0x1201': ['XS', '1-n', 'RedPaletteColorLookupTableData'],
        '0x1202': ['XS', '1-n', 'GreenPaletteColorLookupTableData'],
        '0x1203': ['XS', '1-n', 'BluePaletteColorLookupTableData'],
        '0x1211': ['OW', '1', 'LargeRedPaletteColorLookupTableData'],
        '0x1212': ['OW', '1', 'LargeGreenPaletteColorLookupTableData'],
        '0x1213': ['OW', '1', 'LargeBluePaletteColorLookupTableData'],
        '0x1214': ['UI', '1', 'LargePaletteColorLookupTableUID'],
        '0x1221': ['OW', '1', 'SegmentedRedPaletteColorLookupTableData'],
        '0x1222': ['OW', '1', 'SegmentedGreenPaletteColorLookupTableData'],
        '0x1223': ['OW', '1', 'SegmentedBluePaletteColorLookupTableData'],
        '0x1300': ['CS', '1', 'ImplantPresent'],
        '0x2110': ['CS', '1', 'LossyImageCompression'],
        '0x2112': ['DS', '1-n', 'LossyImageCompressionRatio'],
        '0x3000': ['SQ', '1', 'ModalityLUTSequence'],
        '0x3002': ['XS', '3', 'LUTDescriptor'],
        '0x3003': ['LO', '1', 'LUTExplanation'],
        '0x3004': ['LO', '1', 'ModalityLUTType'],
        '0x3006': ['XS', '1-n', 'LUTData'],
        '0x3010': ['SQ', '1', 'VOILUTSequence'],
        '0x3110': ['SQ', '1', 'SoftcopyVOILUTSequence'],
        '0x4000': ['LT', '1-n', 'ImagePresentationComments'],
        '0x5000': ['SQ', '1', 'BiPlaneAcquisitionSequence'],
        '0x6010': ['US', '1', 'RepresentativeFrameNumber'],
        '0x6020': ['US', '1-n', 'FrameNumbersOfInterest'],
        '0x6022': ['LO', '1-n', 'FrameOfInterestDescription'],
        '0x6030': ['US', '1-n', 'MaskPointer'],
        '0x6040': ['US', '1-n', 'RWavePointer'],
        '0x6100': ['SQ', '1', 'MaskSubtractionSequence'],
        '0x6101': ['CS', '1', 'MaskOperation'],
        '0x6102': ['US', '1-n', 'ApplicableFrameRange'],
        '0x6110': ['US', '1-n', 'MaskFrameNumbers'],
        '0x6112': ['US', '1', 'ContrastFrameAveraging'],
        '0x6114': ['FL', '2', 'MaskSubPixelShift'],
        '0x6120': ['SS', '1', 'TIDOffset'],
        '0x6190': ['ST', '1', 'MaskOperationExplanation'],
    },
    '0x0032': {
        '0x0000': ['UL', '1', 'StudyGroupLength'],
        '0x000A': ['CS', '1', 'StudyStatusID'],
        '0x000C': ['CS', '1', 'StudyPriorityID'],
        '0x0012': ['LO', '1', 'StudyIDIssuer'],
        '0x0032': ['DA', '1', 'StudyVerifiedDate'],
        '0x0033': ['TM', '1', 'StudyVerifiedTime'],
        '0x0034': ['DA', '1', 'StudyReadDate'],
        '0x0035': ['TM', '1', 'StudyReadTime'],
        '0x1000': ['DA', '1', 'ScheduledStudyStartDate'],
        '0x1001': ['TM', '1', 'ScheduledStudyStartTime'],
        '0x1010': ['DA', '1', 'ScheduledStudyStopDate'],
        '0x1011': ['TM', '1', 'ScheduledStudyStopTime'],
        '0x1020': ['LO', '1', 'ScheduledStudyLocation'],
        '0x1021': ['AE', '1-n', 'ScheduledStudyLocationAETitle'],
        '0x1030': ['LO', '1', 'ReasonForStudy'],
        '0x1032': ['PN', '1', 'RequestingPhysician'],
        '0x1033': ['LO', '1', 'RequestingService'],
        '0x1040': ['DA', '1', 'StudyArrivalDate'],
        '0x1041': ['TM', '1', 'StudyArrivalTime'],
        '0x1050': ['DA', '1', 'StudyCompletionDate'],
        '0x1051': ['TM', '1', 'StudyCompletionTime'],
        '0x1055': ['CS', '1', 'StudyComponentStatusID'],
        '0x1060': ['LO', '1', 'RequestedProcedureDescription'],
        '0x1064': ['SQ', '1', 'RequestedProcedureCodeSequence'],
        '0x1070': ['LO', '1', 'RequestedContrastAgent'],
        '0x4000': ['LT', '1', 'StudyComments'],
    },
    '0x0038': {
        '0x0000': ['UL', '1', 'VisitGroupLength'],
        '0x0004': ['SQ', '1', 'ReferencedPatientAliasSequence'],
        '0x0008': ['CS', '1', 'VisitStatusID'],
        '0x0010': ['LO', '1', 'AdmissionID'],
        '0x0011': ['LO', '1', 'IssuerOfAdmissionID'],
        '0x0016': ['LO', '1', 'RouteOfAdmissions'],
        '0x001A': ['DA', '1', 'ScheduledAdmissionDate'],
        '0x001B': ['TM', '1', 'ScheduledAdmissionTime'],
        '0x001C': ['DA', '1', 'ScheduledDischargeDate'],
        '0x001D': ['TM', '1', 'ScheduledDischargeTime'],
        '0x001E': ['LO', '1', 'ScheduledPatientInstitutionResidence'],
        '0x0020': ['DA', '1', 'AdmittingDate'],
        '0x0021': ['TM', '1', 'AdmittingTime'],
        '0x0030': ['DA', '1', 'DischargeDate'],
        '0x0032': ['TM', '1', 'DischargeTime'],
        '0x0040': ['LO', '1', 'DischargeDiagnosisDescription'],
        '0x0044': ['SQ', '1', 'DischargeDiagnosisCodeSequence'],
        '0x0050': ['LO', '1', 'SpecialNeeds'],
        '0x0300': ['LO', '1', 'CurrentPatientLocation'],
        '0x0400': ['LO', '1', 'PatientInstitutionResidence'],
        '0x0500': ['LO', '1', 'PatientState'],
        '0x4000': ['LT', '1', 'VisitComments'],
    },
    '0x003A': {
        '0x0004': ['CS', '1', 'WaveformOriginality'],
        '0x0005': ['US', '1', 'NumberofChannels'],
        '0x0010': ['UL', '1', 'NumberofSamples'],
        '0x001A': ['DS', '1', 'SamplingFrequency'],
        '0x0020': ['SH', '1', 'MultiplexGroupLabel'],
        '0x0200': ['SQ', '1', 'ChannelDefinitionSequence'],
        '0x0202': ['IS', '1', 'WVChannelNumber'],
        '0x0203': ['SH', '1', 'ChannelLabel'],
        '0x0205': ['CS', '1-n', 'ChannelStatus'],
        '0x0208': ['SQ', '1', 'ChannelSourceSequence'],
        '0x0209': ['SQ', '1', 'ChannelSourceModifiersSequence'],
        '0x020A': ['SQ', '1', 'SourceWaveformSequence'],
        '0x020C': ['LO', '1', 'ChannelDerivationDescription'],
        '0x0210': ['DS', '1', 'ChannelSensitivity'],
        '0x0211': ['SQ', '1', 'ChannelSensitivityUnits'],
        '0x0212': ['DS', '1', 'ChannelSensitivityCorrectionFactor'],
        '0x0213': ['DS', '1', 'ChannelBaseline'],
        '0x0214': ['DS', '1', 'ChannelTimeSkew'],
        '0x0215': ['DS', '1', 'ChannelSampleSkew'],
        '0x0218': ['DS', '1', 'ChannelOffset'],
        '0x021A': ['US', '1', 'WaveformBitsStored'],
        '0x0220': ['DS', '1', 'FilterLowFrequency'],
        '0x0221': ['DS', '1', 'FilterHighFrequency'],
        '0x0222': ['DS', '1', 'NotchFilterFrequency'],
        '0x0223': ['DS', '1', 'NotchFilterBandwidth'],
    },
    '0x0040': {
        '0x0000': ['UL', '1', 'ModalityWorklistGroupLength'],
        '0x0001': ['AE', '1', 'ScheduledStationAETitle'],
        '0x0002': ['DA', '1', 'ScheduledProcedureStepStartDate'],
        '0x0003': ['TM', '1', 'ScheduledProcedureStepStartTime'],
        '0x0004': ['DA', '1', 'ScheduledProcedureStepEndDate'],
        '0x0005': ['TM', '1', 'ScheduledProcedureStepEndTime'],
        '0x0006': ['PN', '1', 'ScheduledPerformingPhysicianName'],
        '0x0007': ['LO', '1', 'ScheduledProcedureStepDescription'],
        '0x0008': ['SQ', '1', 'ScheduledProcedureStepCodeSequence'],
        '0x0009': ['SH', '1', 'ScheduledProcedureStepID'],
        '0x0010': ['SH', '1', 'ScheduledStationName'],
        '0x0011': ['SH', '1', 'ScheduledProcedureStepLocation'],
        '0x0012': ['LO', '1', 'ScheduledPreOrderOfMedication'],
        '0x0020': ['CS', '1', 'ScheduledProcedureStepStatus'],
        '0x0100': ['SQ', '1-n', 'ScheduledProcedureStepSequence'],
        '0x0220': ['SQ', '1', 'ReferencedStandaloneSOPInstanceSequence'],
        '0x0241': ['AE', '1', 'PerformedStationAETitle'],
        '0x0242': ['SH', '1', 'PerformedStationName'],
        '0x0243': ['SH', '1', 'PerformedLocation'],
        '0x0244': ['DA', '1', 'PerformedProcedureStepStartDate'],
        '0x0245': ['TM', '1', 'PerformedProcedureStepStartTime'],
        '0x0250': ['DA', '1', 'PerformedProcedureStepEndDate'],
        '0x0251': ['TM', '1', 'PerformedProcedureStepEndTime'],
        '0x0252': ['CS', '1', 'PerformedProcedureStepStatus'],
        '0x0253': ['CS', '1', 'PerformedProcedureStepID'],
        '0x0254': ['LO', '1', 'PerformedProcedureStepDescription'],
        '0x0255': ['LO', '1', 'PerformedProcedureTypeDescription'],
        '0x0260': ['SQ', '1', 'PerformedActionItemSequence'],
        '0x0270': ['SQ', '1', 'ScheduledStepAttributesSequence'],
        '0x0275': ['SQ', '1', 'RequestAttributesSequence'],
        '0x0280': ['ST', '1', 'CommentsOnThePerformedProcedureSteps'],
        '0x0293': ['SQ', '1', 'QuantitySequence'],
        '0x0294': ['DS', '1', 'Quantity'],
        '0x0295': ['SQ', '1', 'MeasuringUnitsSequence'],
        '0x0296': ['SQ', '1', 'BillingItemSequence'],
        '0x0300': ['US', '1', 'TotalTimeOfFluoroscopy'],
        '0x0301': ['US', '1', 'TotalNumberOfExposures'],
        '0x0302': ['US', '1', 'EntranceDose'],
        '0x0303': ['US', '1-2', 'ExposedArea'],
        '0x0306': ['DS', '1', 'DistanceSourceToEntrance'],
        '0x0307': ['DS', '1', 'DistanceSourceToSupport'],
        '0x0310': ['ST', '1', 'CommentsOnRadiationDose'],
        '0x0312': ['DS', '1', 'XRayOutput'],
        '0x0314': ['DS', '1', 'HalfValueLayer'],
        '0x0316': ['DS', '1', 'OrganDose'],
        '0x0318': ['CS', '1', 'OrganExposed'],
        '0x0320': ['SQ', '1', 'BillingProcedureStepSequence'],
        '0x0321': ['SQ', '1', 'FilmConsumptionSequence'],
        '0x0324': ['SQ', '1', 'BillingSuppliesAndDevicesSequence'],
        '0x0330': ['SQ', '1', 'ReferencedProcedureStepSequence'],
        '0x0340': ['SQ', '1', 'PerformedSeriesSequence'],
        '0x0400': ['LT', '1', 'CommentsOnScheduledProcedureStep'],
        '0x050A': ['LO', '1', 'SpecimenAccessionNumber'],
        '0x0550': ['SQ', '1', 'SpecimenSequence'],
        '0x0551': ['LO', '1', 'SpecimenIdentifier'],
        '0x0555': ['SQ', '1', 'AcquisitionContextSequence'],
        '0x0556': ['ST', '1', 'AcquisitionContextDescription'],
        '0x059A': ['SQ', '1', 'SpecimenTypeCodeSequence'],
        '0x06FA': ['LO', '1', 'SlideIdentifier'],
        '0x071A': ['SQ', '1', 'ImageCenterPointCoordinatesSequence'],
        '0x072A': ['DS', '1', 'XOffsetInSlideCoordinateSystem'],
        '0x073A': ['DS', '1', 'YOffsetInSlideCoordinateSystem'],
        '0x074A': ['DS', '1', 'ZOffsetInSlideCoordinateSystem'],
        '0x08D8': ['SQ', '1', 'PixelSpacingSequence'],
        '0x08DA': ['SQ', '1', 'CoordinateSystemAxisCodeSequence'],
        '0x08EA': ['SQ', '1', 'MeasurementUnitsCodeSequence'],
        '0x1001': ['SH', '1', 'RequestedProcedureID'],
        '0x1002': ['LO', '1', 'ReasonForRequestedProcedure'],
        '0x1003': ['SH', '1', 'RequestedProcedurePriority'],
        '0x1004': ['LO', '1', 'PatientTransportArrangements'],
        '0x1005': ['LO', '1', 'RequestedProcedureLocation'],
        '0x1006': ['SH', '1', 'PlacerOrderNumberOfProcedure'],
        '0x1007': ['SH', '1', 'FillerOrderNumberOfProcedure'],
        '0x1008': ['LO', '1', 'ConfidentialityCode'],
        '0x1009': ['SH', '1', 'ReportingPriority'],
        '0x1010': ['PN', '1-n', 'NamesOfIntendedRecipientsOfResults'],
        '0x1400': ['LT', '1', 'RequestedProcedureComments'],
        '0x2001': ['LO', '1', 'ReasonForTheImagingServiceRequest'],
        '0x2002': ['LO', '1', 'ImagingServiceRequestDescription'],
        '0x2004': ['DA', '1', 'IssueDateOfImagingServiceRequest'],
        '0x2005': ['TM', '1', 'IssueTimeOfImagingServiceRequest'],
        '0x2006': ['SH', '1', 'PlacerOrderNumberOfImagingServiceRequest'],
        '0x2007': ['SH', '0', 'FillerOrderNumberOfImagingServiceRequest'],
        '0x2008': ['PN', '1', 'OrderEnteredBy'],
        '0x2009': ['SH', '1', 'OrderEntererLocation'],
        '0x2010': ['SH', '1', 'OrderCallbackPhoneNumber'],
        '0x2016': ['LO', '1', 'PlacerOrderNumberImagingServiceRequest'],
        '0x2017': ['LO', '1', 'FillerOrderNumberImagingServiceRequest'],
        '0x2400': ['LT', '1', 'ImagingServiceRequestComments'],
        '0x3001': ['LT', '1', 'ConfidentialityConstraint'],
        '0xA010': ['CS', '1', 'RelationshipType'],
        '0xA027': ['LO', '1', 'VerifyingOrganization'],
        '0xA030': ['DT', '1', 'VerificationDateTime'],
        '0xA032': ['DT', '1', 'ObservationDateTime'],
        '0xA040': ['CS', '1', 'ValueType'],
        '0xA043': ['SQ', '1', 'ConceptNameCodeSequence'],
        '0xA050': ['CS', '1', 'ContinuityOfContent'],
        '0xA073': ['SQ', '1', 'VerifyingObserverSequence'],
        '0xA075': ['PN', '1', 'VerifyingObserverName'],
        '0xA088': ['SQ', '1', 'VerifyingObserverIdentificationCodeSeque'],
        '0xA0B0': ['US', '2-2n', 'ReferencedWaveformChannels'],
        '0xA120': ['DT', '1', 'DateTime'],
        '0xA121': ['DA', '1', 'Date'],
        '0xA122': ['TM', '1', 'Time'],
        '0xA123': ['PN', '1', 'PersonName'],
        '0xA124': ['UI', '1', 'UID'],
        '0xA130': ['CS', '1', 'TemporalRangeType'],
        '0xA132': ['UL', '1-n', 'ReferencedSamplePositionsU'],
        '0xA136': ['US', '1-n', 'ReferencedFrameNumbers'],
        '0xA138': ['DS', '1-n', 'ReferencedTimeOffsets'],
        '0xA13A': ['DT', '1-n', 'ReferencedDatetime'],
        '0xA160': ['UT', '1', 'TextValue'],
        '0xA168': ['SQ', '1', 'ConceptCodeSequence'],
        '0xA180': ['US', '1', 'AnnotationGroupNumber'],
        '0xA195': ['SQ', '1', 'ConceptNameCodeSequenceModifier'],
        '0xA300': ['SQ', '1', 'MeasuredValueSequence'],
        '0xA30A': ['DS', '1-n', 'NumericValue'],
        '0xA360': ['SQ', '1', 'PredecessorDocumentsSequence'],
        '0xA370': ['SQ', '1', 'ReferencedRequestSequence'],
        '0xA372': ['SQ', '1', 'PerformedProcedureCodeSequence'],
        '0xA375': ['SQ', '1', 'CurrentRequestedProcedureEvidenceSequenSequence'],
        '0xA385': ['SQ', '1', 'PertinentOtherEvidenceSequence'],
        '0xA491': ['CS', '1', 'CompletionFlag'],
        '0xA492': ['LO', '1', 'CompletionFlagDescription'],
        '0xA493': ['CS', '1', 'VerificationFlag'],
        '0xA504': ['SQ', '1', 'ContentTemplateSequence'],
        '0xA525': ['SQ', '1', 'IdenticalDocumentsSequence'],
        '0xA730': ['SQ', '1', 'ContentSequence'],
        '0xB020': ['SQ', '1', 'AnnotationSequence'],
        '0xDB00': ['CS', '1', 'TemplateIdentifier'],
        '0xDB06': ['DT', '1', 'TemplateVersion'],
        '0xDB07': ['DT', '1', 'TemplateLocalVersion'],
        '0xDB0B': ['CS', '1', 'TemplateExtensionFlag'],
        '0xDB0C': ['UI', '1', 'TemplateExtensionOrganizationUID'],
        '0xDB0D': ['UI', '1', 'TemplateExtensionCreatorUID'],
        '0xDB73': ['UL', '1-n', 'ReferencedContentItemIdentifier'],
    },
    '0x0050': {
        '0x0000': ['UL', '1', 'XRayAngioDeviceGroupLength'],
        '0x0004': ['CS', '1', 'CalibrationObject'],
        '0x0010': ['SQ', '1', 'DeviceSequence'],
        '0x0012': ['CS', '1', 'DeviceType'],
        '0x0014': ['DS', '1', 'DeviceLength'],
        '0x0016': ['DS', '1', 'DeviceDiameter'],
        '0x0017': ['CS', '1', 'DeviceDiameterUnits'],
        '0x0018': ['DS', '1', 'DeviceVolume'],
        '0x0019': ['DS', '1', 'InterMarkerDistance'],
        '0x0020': ['LO', '1', 'DeviceDescription'],
        '0x0030': ['SQ', '1', 'CodedInterventionalDeviceSequence'],
    },
    '0x0054': {
        '0x0000': ['UL', '1', 'NuclearMedicineGroupLength'],
        '0x0010': ['US', '1-n', 'EnergyWindowVector'],
        '0x0011': ['US', '1', 'NumberOfEnergyWindows'],
        '0x0012': ['SQ', '1', 'EnergyWindowInformationSequence'],
        '0x0013': ['SQ', '1', 'EnergyWindowRangeSequence'],
        '0x0014': ['DS', '1', 'EnergyWindowLowerLimit'],
        '0x0015': ['DS', '1', 'EnergyWindowUpperLimit'],
        '0x0016': ['SQ', '1', 'RadiopharmaceuticalInformationSequence'],
        '0x0017': ['IS', '1', 'ResidualSyringeCounts'],
        '0x0018': ['SH', '1', 'EnergyWindowName'],
        '0x0020': ['US', '1-n', 'DetectorVector'],
        '0x0021': ['US', '1', 'NumberOfDetectors'],
        '0x0022': ['SQ', '1', 'DetectorInformationSequence'],
        '0x0030': ['US', '1-n', 'PhaseVector'],
        '0x0031': ['US', '1', 'NumberOfPhases'],
        '0x0032': ['SQ', '1', 'PhaseInformationSequence'],
        '0x0033': ['US', '1', 'NumberOfFramesInPhase'],
        '0x0036': ['IS', '1', 'PhaseDelay'],
        '0x0038': ['IS', '1', 'PauseBetweenFrames'],
        '0x0050': ['US', '1-n', 'RotationVector'],
        '0x0051': ['US', '1', 'NumberOfRotations'],
        '0x0052': ['SQ', '1', 'RotationInformationSequence'],
        '0x0053': ['US', '1', 'NumberOfFramesInRotation'],
        '0x0060': ['US', '1-n', 'RRIntervalVector'],
        '0x0061': ['US', '1', 'NumberOfRRIntervals'],
        '0x0062': ['SQ', '1', 'GatedInformationSequence'],
        '0x0063': ['SQ', '1', 'DataInformationSequence'],
        '0x0070': ['US', '1-n', 'TimeSlotVector'],
        '0x0071': ['US', '1', 'NumberOfTimeSlots'],
        '0x0072': ['SQ', '1', 'TimeSlotInformationSequence'],
        '0x0073': ['DS', '1', 'TimeSlotTime'],
        '0x0080': ['US', '1-n', 'SliceVector'],
        '0x0081': ['US', '1', 'NumberOfSlices'],
        '0x0090': ['US', '1-n', 'AngularViewVector'],
        '0x0100': ['US', '1-n', 'TimeSliceVector'],
        '0x0101': ['US', '1', 'NumberOfTimeSlices'],
        '0x0200': ['DS', '1', 'StartAngle'],
        '0x0202': ['CS', '1', 'TypeOfDetectorMotion'],
        '0x0210': ['IS', '1-n', 'TriggerVector'],
        '0x0211': ['US', '1', 'NumberOfTriggersInPhase'],
        '0x0220': ['SQ', '1', 'ViewCodeSequence'],
        '0x0222': ['SQ', '1', 'ViewAngulationModifierCodeSequence'],
        '0x0300': ['SQ', '1', 'RadionuclideCodeSequence'],
        '0x0302': ['SQ', '1', 'AdministrationRouteCodeSequence'],
        '0x0304': ['SQ', '1', 'RadiopharmaceuticalCodeSequence'],
        '0x0306': ['SQ', '1', 'CalibrationDataSequence'],
        '0x0308': ['US', '1', 'EnergyWindowNumber'],
        '0x0400': ['SH', '1', 'ImageID'],
        '0x0410': ['SQ', '1', 'PatientOrientationCodeSequence'],
        '0x0412': ['SQ', '1', 'PatientOrientationModifierCodeSequence'],
        '0x0414': ['SQ', '1', 'PatientGantryRelationshipCodeSequence'],
        '0x1000': ['CS', '2', 'SeriesType'],
        '0x1001': ['CS', '1', 'Units'],
        '0x1002': ['CS', '1', 'CountsSource'],
        '0x1004': ['CS', '1', 'ReprojectionMethod'],
        '0x1100': ['CS', '1', 'RandomsCorrectionMethod'],
        '0x1101': ['LO', '1', 'AttenuationCorrectionMethod'],
        '0x1102': ['CS', '1', 'DecayCorrection'],
        '0x1103': ['LO', '1', 'ReconstructionMethod'],
        '0x1104': ['LO', '1', 'DetectorLinesOfResponseUsed'],
        '0x1105': ['LO', '1', 'ScatterCorrectionMethod'],
        '0x1200': ['DS', '1', 'AxialAcceptance'],
        '0x1201': ['IS', '2', 'AxialMash'],
        '0x1202': ['IS', '1', 'TransverseMash'],
        '0x1203': ['DS', '2', 'DetectorElementSize'],
        '0x1210': ['DS', '1', 'CoincidenceWindowWidth'],
        '0x1220': ['CS', '1-n', 'SecondaryCountsType'],
        '0x1300': ['DS', '1', 'FrameReferenceTime'],
        '0x1310': ['IS', '1', 'PrimaryPromptsCountsAccumulated'],
        '0x1311': ['IS', '1-n', 'SecondaryCountsAccumulated'],
        '0x1320': ['DS', '1', 'SliceSensitivityFactor'],
        '0x1321': ['DS', '1', 'DecayFactor'],
        '0x1322': ['DS', '1', 'DoseCalibrationFactor'],
        '0x1323': ['DS', '1', 'ScatterFractionFactor'],
        '0x1324': ['DS', '1', 'DeadTimeFactor'],
        '0x1330': ['US', '1', 'ImageIndex'],
        '0x1400': ['CS', '1-n', 'CountsIncluded'],
        '0x1401': ['CS', '1', 'DeadTimeCorrectionFlag'],
    },
    '0x0060': {
        '0x0000': ['UL', '1', 'HistogramGroupLength'],
        '0x3000': ['SQ', '1', 'HistogramSequence'],
        '0x3002': ['US', '1', 'HistogramNumberofBins'],
        '0x3004': ['US/SS', '1', 'HistogramFirstBinValue'],
        '0x3006': ['US/SS', '1', 'HistogramLastBinValue'],
        '0x3008': ['US', '1', 'HistogramBinWidth'],
        '0x3010': ['LO', '1', 'HistogramExplanation'],
        '0x3020': ['UL', '1-n', 'HistogramData'],
    },
    '0x0070': {
        '0x0001': ['SQ', '1', 'GraphicAnnotationSequence'],
        '0x0002': ['CS', '1', 'GraphicLayer'],
        '0x0003': ['CS', '1', 'BoundingBoxAnnotationUnits'],
        '0x0004': ['CS', '1', 'AnchorPointAnnotationUnits'],
        '0x0005': ['CS', '1', 'GraphicAnnotationUnits'],
        '0x0006': ['ST', '1', 'UnformattedTextValue'],
        '0x0008': ['SQ', '1', 'TextObjectSequence'],
        '0x0009': ['SQ', '1', 'GraphicObjectSequence'],
        '0x0010': ['FL', '2', 'BoundingBoxTopLeftHandCorner'],
        '0x0011': ['FL', '2', 'BoundingBoxBottomRightHandCorner'],
        '0x0012': ['CS', '1', 'BoundingBoxTextHorizontalJustification'],
        '0x0014': ['FL', '2', 'AnchorPoint'],
        '0x0015': ['CS', '1', 'AnchorPointVisibility'],
        '0x0020': ['US', '1', 'GraphicDimensions'],
        '0x0021': ['US', '1', 'NumberOfGraphicPoints'],
        '0x0022': ['FL', '2-n', 'GraphicData'],
        '0x0023': ['CS', '1', 'GraphicType'],
        '0x0024': ['CS', '1', 'GraphicFilled'],
        '0x0040': ['IS', '1', 'ImageRotationFrozenDraftRetired'],
        '0x0041': ['CS', '1', 'ImageHorizontalFlip'],
        '0x0042': ['US', '1', 'ImageRotation'],
        '0x0050': ['US', '2', 'DisplayedAreaTLHCFrozenDraftRetired'],
        '0x0051': ['US', '2', 'DisplayedAreaBRHCFrozenDraftRetired'],
        '0x0052': ['SL', '2', 'DisplayedAreaTopLeftHandCorner'],
        '0x0053': ['SL', '2', 'DisplayedAreaBottomRightHandCorner'],
        '0x005A': ['SQ', '1', 'DisplayedAreaSelectionSequence'],
        '0x0060': ['SQ', '1', 'GraphicLayerSequence'],
        '0x0062': ['IS', '1', 'GraphicLayerOrder'],
        '0x0066': ['US', '1', 'GraphicLayerRecommendedDisplayGrayscaleValue'],
        '0x0067': ['US', '3', 'GraphicLayerRecommendedDisplayRGBValue'],
        '0x0068': ['LO', '1', 'GraphicLayerDescription'],
        '0x0080': ['CS', '1', 'PresentationLabel'],
        '0x0081': ['LO', '1', 'PresentationDescription'],
        '0x0082': ['DA', '1', 'PresentationCreationDate'],
        '0x0083': ['TM', '1', 'PresentationCreationTime'],
        '0x0084': ['PN', '1', 'PresentationCreatorsName'],
        '0x0100': ['CS', '1', 'PresentationSizeMode'],
        '0x0101': ['DS', '2', 'PresentationPixelSpacing'],
        '0x0102': ['IS', '2', 'PresentationPixelAspectRatio'],
        '0x0103': ['FL', '1', 'PresentationPixelMagnificationRatio'],
    },
    '0x0088': {
        '0x0000': ['UL', '1', 'StorageGroupLength'],
        '0x0130': ['SH', '1', 'StorageMediaFilesetID'],
        '0x0140': ['UI', '1', 'StorageMediaFilesetUID'],
        '0x0200': ['SQ', '1', 'IconImage'],
        '0x0904': ['LO', '1', 'TopicTitle'],
        '0x0906': ['ST', '1', 'TopicSubject'],
        '0x0910': ['LO', '1', 'TopicAuthor'],
        '0x0912': ['LO', '3', 'TopicKeyWords'],
    },
    '0x1000': {
        '0x0000': ['UL', '1', 'CodeTableGroupLength'],
        '0x0010': ['US', '3', 'EscapeTriplet'],
        '0x0011': ['US', '3', 'RunLengthTriplet'],
        '0x0012': ['US', '1', 'HuffmanTableSize'],
        '0x0013': ['US', '3', 'HuffmanTableTriplet'],
        '0x0014': ['US', '1', 'ShiftTableSize'],
        '0x0015': ['US', '3', 'ShiftTableTriplet'],
    },
    '0x1010': {
        '0x0000': ['UL', '1', 'ZonalMapGroupLength'],
        '0x0004': ['US', '1-n', 'ZonalMap'],
    },
    '0x2000': {
        '0x0000': ['UL', '1', 'FilmSessionGroupLength'],
        '0x0010': ['IS', '1', 'NumberOfCopies'],
        '0x001E': ['SQ', '1', 'PrinterConfigurationSequence'],
        '0x0020': ['CS', '1', 'PrintPriority'],
        '0x0030': ['CS', '1', 'MediumType'],
        '0x0040': ['CS', '1', 'FilmDestination'],
        '0x0050': ['LO', '1', 'FilmSessionLabel'],
        '0x0060': ['IS', '1', 'MemoryAllocation'],
        '0x0061': ['IS', '1', 'MaximumMemoryAllocation'],
        '0x0062': ['CS', '1', 'ColorImagePrintingFlag'],
        '0x0063': ['CS', '1', 'CollationFlag'],
        '0x0065': ['CS', '1', 'AnnotationFlag'],
        '0x0067': ['CS', '1', 'ImageOverlayFlag'],
        '0x0069': ['CS', '1', 'PresentationLUTFlag'],
        '0x006A': ['CS', '1', 'ImageBoxPresentationLUTFlag'],
        '0x00A0': ['US', '1', 'MemoryBitDepth'],
        '0x00A1': ['US', '1', 'PrintingBitDepth'],
        '0x00A2': ['SQ', '1', 'MediaInstalledSequence'],
        '0x00A4': ['SQ', '1', 'OtherMediaAvailableSequence'],
        '0x00A8': ['SQ', '1', 'SupportedImageDisplayFormatsSequence'],
        '0x0500': ['SQ', '1', 'ReferencedFilmBoxSequence'],
        '0x0510': ['SQ', '1', 'ReferencedStoredPrintSequence'],
    },
    '0x2010': {
        '0x0000': ['UL', '1', 'FilmBoxGroupLength'],
        '0x0010': ['ST', '1', 'ImageDisplayFormat'],
        '0x0030': ['CS', '1', 'AnnotationDisplayFormatID'],
        '0x0040': ['CS', '1', 'FilmOrientation'],
        '0x0050': ['CS', '1', 'FilmSizeID'],
        '0x0052': ['CS', '1', 'PrinterResolutionID'],
        '0x0054': ['CS', '1', 'DefaultPrinterResolutionID'],
        '0x0060': ['CS', '1', 'MagnificationType'],
        '0x0080': ['CS', '1', 'SmoothingType'],
        '0x00A6': ['CS', '1', 'DefaultMagnificationType'],
        '0x00A7': ['CS', '1-n', 'OtherMagnificationTypesAvailable'],
        '0x00A8': ['CS', '1', 'DefaultSmoothingType'],
        '0x00A9': ['CS', '1-n', 'OtherSmoothingTypesAvailable'],
        '0x0100': ['CS', '1', 'BorderDensity'],
        '0x0110': ['CS', '1', 'EmptyImageDensity'],
        '0x0120': ['US', '1', 'MinDensity'],
        '0x0130': ['US', '1', 'MaxDensity'],
        '0x0140': ['CS', '1', 'Trim'],
        '0x0150': ['ST', '1', 'ConfigurationInformation'],
        '0x0152': ['LT', '1', 'ConfigurationInformationDescription'],
        '0x0154': ['IS', '1', 'MaximumCollatedFilms'],
        '0x015E': ['US', '1', 'Illumination'],
        '0x0160': ['US', '1', 'ReflectedAmbientLight'],
        '0x0376': ['DS', '2', 'PrinterPixelSpacing'],
        '0x0500': ['SQ', '1', 'ReferencedFilmSessionSequence'],
        '0x0510': ['SQ', '1', 'ReferencedImageBoxSequence'],
        '0x0520': ['SQ', '1', 'ReferencedBasicAnnotationBoxSequence'],
    },
    '0x2020': {
        '0x0000': ['UL', '1', 'ImageBoxGroupLength'],
        '0x0010': ['US', '1', 'ImageBoxPosition'],
        '0x0020': ['CS', '1', 'Polarity'],
        '0x0030': ['DS', '1', 'RequestedImageSize'],
        '0x0040': ['CS', '1', 'RequestedDecimateCropBehavior'],
        '0x0050': ['CS', '1', 'RequestedResolutionID'],
        '0x00A0': ['CS', '1', 'RequestedImageSizeFlag'],
        '0x00A2': ['CS', '1', 'DecimateCropResult'],
        '0x0110': ['SQ', '1', 'PreformattedGrayscaleImageSequence'],
        '0x0111': ['SQ', '1', 'PreformattedColorImageSequence'],
        '0x0130': ['SQ', '1', 'ReferencedImageOverlayBoxSequence'],
        '0x0140': ['SQ', '1', 'ReferencedVOILUTBoxSequence'],
    },
    '0x2030': {
        '0x0000': ['UL', '1', 'AnnotationGroupLength'],
        '0x0010': ['US', '1', 'AnnotationPosition'],
        '0x0020': ['LO', '1', 'TextString'],
    },
    '0x2040': {
        '0x0000': ['UL', '1', 'OverlayBoxGroupLength'],
        '0x0010': ['SQ', '1', 'ReferencedOverlayPlaneSequence'],
        '0x0011': ['US', '9', 'ReferencedOverlayPlaneGroups'],
        '0x0020': ['SQ', '1', 'OverlayPixelDataSequence'],
        '0x0060': ['CS', '1', 'OverlayMagnificationType'],
        '0x0070': ['CS', '1', 'OverlaySmoothingType'],
        '0x0072': ['CS', '1', 'OverlayOrImageMagnification'],
        '0x0074': ['US', '1', 'MagnifyToNumberOfColumns'],
        '0x0080': ['CS', '1', 'OverlayForegroundDensity'],
        '0x0082': ['CS', '1', 'OverlayBackgroundDensity'],
        '0x0090': ['CS', '1', 'OverlayMode'],
        '0x0100': ['CS', '1', 'ThresholdDensity'],
        '0x0500': ['SQ', '1', 'ReferencedOverlayImageBoxSequence'],
    },
    '0x2050': {
        '0x0000': ['UL', '1', 'PresentationLUTGroupLength'],
        '0x0010': ['SQ', '1', 'PresentationLUTSequence'],
        '0x0020': ['CS', '1', 'PresentationLUTShape'],
        '0x0500': ['SQ', '1', 'ReferencedPresentationLUTSequence'],
    },
    '0x2100': {
        '0x0000': ['UL', '1', 'PrintJobGroupLength'],
        '0x0010': ['SH', '1', 'PrintJobID'],
        '0x0020': ['CS', '1', 'ExecutionStatus'],
        '0x0030': ['CS', '1', 'ExecutionStatusInfo'],
        '0x0040': ['DA', '1', 'CreationDate'],
        '0x0050': ['TM', '1', 'CreationTime'],
        '0x0070': ['AE', '1', 'Originator'],
        '0x0140': ['AE', '1', 'DestinationAE'],
        '0x0160': ['SH', '1', 'OwnerID'],
        '0x0170': ['IS', '1', 'NumberOfFilms'],
        '0x0500': ['SQ', '1', 'ReferencedPrintJobSequence'],
    },
    '0x2110': {
        '0x0000': ['UL', '1', 'PrinterGroupLength'],
        '0x0010': ['CS', '1', 'PrinterStatus'],
        '0x0020': ['CS', '1', 'PrinterStatusInfo'],
        '0x0030': ['LO', '1', 'PrinterName'],
        '0x0099': ['SH', '1', 'PrintQueueID'],
    },
    '0x2120': {
        '0x0000': ['UL', '1', 'QueueGroupLength'],
        '0x0010': ['CS', '1', 'QueueStatus'],
        '0x0050': ['SQ', '1', 'PrintJobDescriptionSequence'],
        '0x0070': ['SQ', '1', 'QueueReferencedPrintJobSequence'],
    },
    '0x2130': {
        '0x0000': ['UL', '1', 'PrintContentGroupLength'],
        '0x0010': ['SQ', '1', 'PrintManagementCapabilitiesSequence'],
        '0x0015': ['SQ', '1', 'PrinterCharacteristicsSequence'],
        '0x0030': ['SQ', '1', 'FilmBoxContentSequence'],
        '0x0040': ['SQ', '1', 'ImageBoxContentSequence'],
        '0x0050': ['SQ', '1', 'AnnotationContentSequence'],
        '0x0060': ['SQ', '1', 'ImageOverlayBoxContentSequence'],
        '0x0080': ['SQ', '1', 'PresentationLUTContentSequence'],
        '0x00A0': ['SQ', '1', 'ProposedStudySequence'],
        '0x00C0': ['SQ', '1', 'OriginalImageSequence'],
    },
    '0x3002': {
        '0x0000': ['UL', '1', 'RTImageGroupLength'],
        '0x0002': ['SH', '1', 'RTImageLabel'],
        '0x0003': ['LO', '1', 'RTImageName'],
        '0x0004': ['ST', '1', 'RTImageDescription'],
        '0x000A': ['CS', '1', 'ReportedValuesOrigin'],
        '0x000C': ['CS', '1', 'RTImagePlane'],
        '0x000D': ['DS', '3', 'XRayImageReceptorTranslation'],
        '0x000E': ['DS', '1', 'XRayImageReceptorAngle'],
        '0x0010': ['DS', '6', 'RTImageOrientation'],
        '0x0011': ['DS', '2', 'ImagePlanePixelSpacing'],
        '0x0012': ['DS', '2', 'RTImagePosition'],
        '0x0020': ['SH', '1', 'RadiationMachineName'],
        '0x0022': ['DS', '1', 'RadiationMachineSAD'],
        '0x0024': ['DS', '1', 'RadiationMachineSSD'],
        '0x0026': ['DS', '1', 'RTImageSID'],
        '0x0028': ['DS', '1', 'SourceToReferenceObjectDistance'],
        '0x0029': ['IS', '1', 'FractionNumber'],
        '0x0030': ['SQ', '1', 'ExposureSequence'],
        '0x0032': ['DS', '1', 'MetersetExposure'],
        '0x0034': ['DS', '4', 'DiaphragmPosition'],
    },
    '0x3004': {
        '0x0000': ['UL', '1', 'RTDoseGroupLength'],
        '0x0001': ['CS', '1', 'DVHType'],
        '0x0002': ['CS', '1', 'DoseUnits'],
        '0x0004': ['CS', '1', 'DoseType'],
        '0x0006': ['LO', '1', 'DoseComment'],
        '0x0008': ['DS', '3', 'NormalizationPoint'],
        '0x000A': ['CS', '1', 'DoseSummationType'],
        '0x000C': ['DS', '2-n', 'GridFrameOffsetVector'],
        '0x000E': ['DS', '1', 'DoseGridScaling'],
        '0x0010': ['SQ', '1', 'RTDoseROISequence'],
        '0x0012': ['DS', '1', 'DoseValue'],
        '0x0040': ['DS', '3', 'DVHNormalizationPoint'],
        '0x0042': ['DS', '1', 'DVHNormalizationDoseValue'],
        '0x0050': ['SQ', '1', 'DVHSequence'],
        '0x0052': ['DS', '1', 'DVHDoseScaling'],
        '0x0054': ['CS', '1', 'DVHVolumeUnits'],
        '0x0056': ['IS', '1', 'DVHNumberOfBins'],
        '0x0058': ['DS', '2-2n', 'DVHData'],
        '0x0060': ['SQ', '1', 'DVHReferencedROISequence'],
        '0x0062': ['CS', '1', 'DVHROIContributionType'],
        '0x0070': ['DS', '1', 'DVHMinimumDose'],
        '0x0072': ['DS', '1', 'DVHMaximumDose'],
        '0x0074': ['DS', '1', 'DVHMeanDose'],
    },
    '0x3006': {
        '0x0000': ['UL', '1', 'RTStructureSetGroupLength'],
        '0x0002': ['SH', '1', 'StructureSetLabel'],
        '0x0004': ['LO', '1', 'StructureSetName'],
        '0x0006': ['ST', '1', 'StructureSetDescription'],
        '0x0008': ['DA', '1', 'StructureSetDate'],
        '0x0009': ['TM', '1', 'StructureSetTime'],
        '0x0010': ['SQ', '1', 'ReferencedFrameOfReferenceSequence'],
        '0x0012': ['SQ', '1', 'RTReferencedStudySequence'],
        '0x0014': ['SQ', '1', 'RTReferencedSeriesSequence'],
        '0x0016': ['SQ', '1', 'ContourImageSequence'],
        '0x0020': ['SQ', '1', 'StructureSetROISequence'],
        '0x0022': ['IS', '1', 'ROINumber'],
        '0x0024': ['UI', '1', 'ReferencedFrameOfReferenceUID'],
        '0x0026': ['LO', '1', 'ROIName'],
        '0x0028': ['ST', '1', 'ROIDescription'],
        '0x002A': ['IS', '3', 'ROIDisplayColor'],
        '0x002C': ['DS', '1', 'ROIVolume'],
        '0x0030': ['SQ', '1', 'RTRelatedROISequence'],
        '0x0033': ['CS', '1', 'RTROIRelationship'],
        '0x0036': ['CS', '1', 'ROIGenerationAlgorithm'],
        '0x0038': ['LO', '1', 'ROIGenerationDescription'],
        '0x0039': ['SQ', '1', 'ROIContourSequence'],
        '0x0040': ['SQ', '1', 'ContourSequence'],
        '0x0042': ['CS', '1', 'ContourGeometricType'],
        '0x0044': ['DS', '1', 'ContourSlabThickness'],
        '0x0045': ['DS', '3', 'ContourOffsetVector'],
        '0x0046': ['IS', '1', 'NumberOfContourPoints'],
        '0x0048': ['IS', '1', 'ContourNumber'],
        '0x0049': ['IS', '1-n', 'AttachedContours'],
        '0x0050': ['DS', '3-3n', 'ContourData'],
        '0x0080': ['SQ', '1', 'RTROIObservationsSequence'],
        '0x0082': ['IS', '1', 'ObservationNumber'],
        '0x0084': ['IS', '1', 'ReferencedROINumber'],
        '0x0085': ['SH', '1', 'ROIObservationLabel'],
        '0x0086': ['SQ', '1', 'RTROIIdentificationCodeSequence'],
        '0x0088': ['ST', '1', 'ROIObservationDescription'],
        '0x00A0': ['SQ', '1', 'RelatedRTROIObservationsSequence'],
        '0x00A4': ['CS', '1', 'RTROIInterpretedType'],
        '0x00A6': ['PN', '1', 'ROIInterpreter'],
        '0x00B0': ['SQ', '1', 'ROIPhysicalPropertiesSequence'],
        '0x00B2': ['CS', '1', 'ROIPhysicalProperty'],
        '0x00B4': ['DS', '1', 'ROIPhysicalPropertyValue'],
        '0x00C0': ['SQ', '1', 'FrameOfReferenceRelationshipSequence'],
        '0x00C2': ['UI', '1', 'RelatedFrameOfReferenceUID'],
        '0x00C4': ['CS', '1', 'FrameOfReferenceTransformationType'],
        '0x00C6': ['DS', '16', 'FrameOfReferenceTransformationMatrix'],
        '0x00C8': ['LO', '1', 'FrameOfReferenceTransformationComment'],
    },
    '0x3008': {
        '0x0010': ['SQ', '1', 'MeasuredDoseReferenceSequence'],
        '0x0012': ['ST', '1', 'MeasuredDoseDescription'],
        '0x0014': ['CS', '1', 'MeasuredDoseType'],
        '0x0016': ['DS', '1', 'MeasuredDoseValue'],
        '0x0020': ['SQ', '1', 'TreatmentSessionBeamSequence'],
        '0x0022': ['IS', '1', 'CurrentFractionNumber'],
        '0x0024': ['DA', '1', 'TreatmentControlPointDate'],
        '0x0025': ['TM', '1', 'TreatmentControlPointTime'],
        '0x002A': ['CS', '1', 'TreatmentTerminationStatus'],
        '0x002B': ['SH', '1', 'TreatmentTerminationCode'],
        '0x002C': ['CS', '1', 'TreatmentVerificationStatus'],
        '0x0030': ['SQ', '1', 'ReferencedTreatmentRecordSequence'],
        '0x0032': ['DS', '1', 'SpecifiedPrimaryMeterset'],
        '0x0033': ['DS', '1', 'SpecifiedSecondaryMeterset'],
        '0x0036': ['DS', '1', 'DeliveredPrimaryMeterset'],
        '0x0037': ['DS', '1', 'DeliveredSecondaryMeterset'],
        '0x003A': ['DS', '1', 'SpecifiedTreatmentTime'],
        '0x003B': ['DS', '1', 'DeliveredTreatmentTime'],
        '0x0040': ['SQ', '1', 'ControlPointDeliverySequence'],
        '0x0042': ['DS', '1', 'SpecifiedMeterset'],
        '0x0044': ['DS', '1', 'DeliveredMeterset'],
        '0x0048': ['DS', '1', 'DoseRateDelivered'],
        '0x0050': ['SQ', '1', 'TreatmentSummaryCalculatedDoseReferenceSequence'],
        '0x0052': ['DS', '1', 'CumulativeDosetoDoseReference'],
        '0x0054': ['DA', '1', 'FirstTreatmentDate'],
        '0x0056': ['DA', '1', 'MostRecentTreatmentDate'],
        '0x005A': ['IS', '1', 'NumberofFractionsDelivered'],
        '0x0060': ['SQ', '1', 'OverrideSequence'],
        '0x0062': ['AT', '1', 'OverrideParameterPointer'],
        '0x0064': ['IS', '1', 'MeasuredDoseReferenceNumber'],
        '0x0066': ['ST', '1', 'OverrideReason'],
        '0x0070': ['SQ', '1', 'CalculatedDoseReferenceSequence'],
        '0x0072': ['IS', '1', 'CalculatedDoseReferenceNumber'],
        '0x0074': ['ST', '1', 'CalculatedDoseReferenceDescription'],
        '0x0076': ['DS', '1', 'CalculatedDoseReferenceDoseValue'],
        '0x0078': ['DS', '1', 'StartMeterset'],
        '0x007A': ['DS', '1', 'EndMeterset'],
        '0x0080': ['SQ', '1', 'ReferencedMeasuredDoseReferenceSequence'],
        '0x0082': ['IS', '1', 'ReferencedMeasuredDoseReferenceNumber'],
        '0x0090': ['SQ', '1', 'ReferencedCalculatedDoseReferenceSequence'],
        '0x0092': ['IS', '1', 'ReferencedCalculatedDoseReferenceNumber'],
        '0x00A0': ['SQ', '1', 'BeamLimitingDeviceLeafPairsSequence'],
        '0x00B0': ['SQ', '1', 'RecordedWedgeSequence'],
        '0x00C0': ['SQ', '1', 'RecordedCompensatorSequence'],
        '0x00D0': ['SQ', '1', 'RecordedBlockSequence'],
        '0x00E0': ['SQ', '1', 'TreatmentSummaryMeasuredDoseReferenceSequence'],
        '0x0100': ['SQ', '1', 'RecordedSourceSequence'],
        '0x0105': ['LO', '1', 'SourceSerialNumber'],
        '0x0110': ['SQ', '1', 'TreatmentSessionApplicationSetupSequence'],
        '0x0116': ['CS', '1', 'ApplicationSetupCheck'],
        '0x0120': ['SQ', '1', 'RecordedBrachyAccessoryDeviceSequence'],
        '0x0122': ['IS', '1', 'ReferencedBrachyAccessoryDeviceNumber'],
        '0x0130': ['SQ', '1', 'RecordedChannelSequence'],
        '0x0132': ['DS', '1', 'SpecifiedChannelTotalTime'],
        '0x0134': ['DS', '1', 'DeliveredChannelTotalTime'],
        '0x0136': ['IS', '1', 'SpecifiedNumberofPulses'],
        '0x0138': ['IS', '1', 'DeliveredNumberofPulses'],
        '0x013A': ['DS', '1', 'SpecifiedPulseRepetitionInterval'],
        '0x013C': ['DS', '1', 'DeliveredPulseRepetitionInterval'],
        '0x0140': ['SQ', '1', 'RecordedSourceApplicatorSequence'],
        '0x0142': ['IS', '1', 'ReferencedSourceApplicatorNumber'],
        '0x0150': ['SQ', '1', 'RecordedChannelShieldSequence'],
        '0x0152': ['IS', '1', 'ReferencedChannelShieldNumber'],
        '0x0160': ['SQ', '1', 'BrachyControlPointDeliveredSequence'],
        '0x0162': ['DA', '1', 'SafePositionExitDate'],
        '0x0164': ['TM', '1', 'SafePositionExitTime'],
        '0x0166': ['DA', '1', 'SafePositionReturnDate'],
        '0x0168': ['TM', '1', 'SafePositionReturnTime'],
        '0x0200': ['CS', '1', 'CurrentTreatmentStatus'],
        '0x0202': ['ST', '1', 'TreatmentStatusComment'],
        '0x0220': ['SQ', '1', 'FractionGroupSummarySequence'],
        '0x0223': ['IS', '1', 'ReferencedFractionNumber'],
        '0x0224': ['CS', '1', 'FractionGroupType'],
        '0x0230': ['CS', '1', 'BeamStopperPosition'],
        '0x0240': ['SQ', '1', 'FractionStatusSummarySequence'],
        '0x0250': ['DA', '1', 'TreatmentDate'],
        '0x0251': ['TM', '1', 'TreatmentTime'],
    },
    '0x300A': {
        '0x0000': ['UL', '1', 'RTPlanGroupLength'],
        '0x0002': ['SH', '1', 'RTPlanLabel'],
        '0x0003': ['LO', '1', 'RTPlanName'],
        '0x0004': ['ST', '1', 'RTPlanDescription'],
        '0x0006': ['DA', '1', 'RTPlanDate'],
        '0x0007': ['TM', '1', 'RTPlanTime'],
        '0x0009': ['LO', '1-n', 'TreatmentProtocols'],
        '0x000A': ['CS', '1', 'TreatmentIntent'],
        '0x000B': ['LO', '1-n', 'TreatmentSites'],
        '0x000C': ['CS', '1', 'RTPlanGeometry'],
        '0x000E': ['ST', '1', 'PrescriptionDescription'],
        '0x0010': ['SQ', '1', 'DoseReferenceSequence'],
        '0x0012': ['IS', '1', 'DoseReferenceNumber'],
        '0x0014': ['CS', '1', 'DoseReferenceStructureType'],
        '0x0015': ['CS', '1', 'NominalBeamEnergyUnit'],
        '0x0016': ['LO', '1', 'DoseReferenceDescription'],
        '0x0018': ['DS', '3', 'DoseReferencePointCoordinates'],
        '0x001A': ['DS', '1', 'NominalPriorDose'],
        '0x0020': ['CS', '1', 'DoseReferenceType'],
        '0x0021': ['DS', '1', 'ConstraintWeight'],
        '0x0022': ['DS', '1', 'DeliveryWarningDose'],
        '0x0023': ['DS', '1', 'DeliveryMaximumDose'],
        '0x0025': ['DS', '1', 'TargetMinimumDose'],
        '0x0026': ['DS', '1', 'TargetPrescriptionDose'],
        '0x0027': ['DS', '1', 'TargetMaximumDose'],
        '0x0028': ['DS', '1', 'TargetUnderdoseVolumeFraction'],
        '0x002A': ['DS', '1', 'OrganAtRiskFullVolumeDose'],
        '0x002B': ['DS', '1', 'OrganAtRiskLimitDose'],
        '0x002C': ['DS', '1', 'OrganAtRiskMaximumDose'],
        '0x002D': ['DS', '1', 'OrganAtRiskOverdoseVolumeFraction'],
        '0x0040': ['SQ', '1', 'ToleranceTableSequence'],
        '0x0042': ['IS', '1', 'ToleranceTableNumber'],
        '0x0043': ['SH', '1', 'ToleranceTableLabel'],
        '0x0044': ['DS', '1', 'GantryAngleTolerance'],
        '0x0046': ['DS', '1', 'BeamLimitingDeviceAngleTolerance'],
        '0x0048': ['SQ', '1', 'BeamLimitingDeviceToleranceSequence'],
        '0x004A': ['DS', '1', 'BeamLimitingDevicePositionTolerance'],
        '0x004C': ['DS', '1', 'PatientSupportAngleTolerance'],
        '0x004E': ['DS', '1', 'TableTopEccentricAngleTolerance'],
        '0x0051': ['DS', '1', 'TableTopVerticalPositionTolerance'],
        '0x0052': ['DS', '1', 'TableTopLongitudinalPositionTolerance'],
        '0x0053': ['DS', '1', 'TableTopLateralPositionTolerance'],
        '0x0055': ['CS', '1', 'RTPlanRelationship'],
        '0x0070': ['SQ', '1', 'FractionGroupSequence'],
        '0x0071': ['IS', '1', 'FractionGroupNumber'],
        '0x0078': ['IS', '1', 'NumberOfFractionsPlanned'],
        // '0x0079': ['IS','1','NumberOfFractionsPerDay'], /// Changed
        '0x0079': ['IS', '1', 'NumberOfFractionsPatternDigistsPerDay'],
        '0x007A': ['IS', '1', 'RepeatFractionCycleLength'],
        '0x007B': ['LT', '1', 'FractionPattern'],
        '0x0080': ['IS', '1', 'NumberOfBeams'],
        '0x0082': ['DS', '3', 'BeamDoseSpecificationPoint'],
        '0x0084': ['DS', '1', 'BeamDose'],
        '0x0086': ['DS', '1', 'BeamMeterset'],
        '0x00A0': ['IS', '1', 'NumberOfBrachyApplicationSetups'],
        '0x00A2': ['DS', '3', 'BrachyApplicationSetupDoseSpecificationPoint'],
        '0x00A4': ['DS', '1', 'BrachyApplicationSetupDose'],
        '0x00B0': ['SQ', '1', 'BeamSequence'],
        '0x00B2': ['SH', '1', 'TreatmentMachineName'],
        '0x00B3': ['CS', '1', 'PrimaryDosimeterUnit'],
        '0x00B4': ['DS', '1', 'SourceAxisDistance'],
        '0x00B6': ['SQ', '1', 'BeamLimitingDeviceSequence'],
        '0x00B8': ['CS', '1', 'RTBeamLimitingDeviceType'],
        '0x00BA': ['DS', '1', 'SourceToBeamLimitingDeviceDistance'],
        '0x00BC': ['IS', '1', 'NumberOfLeafJawPairs'],
        '0x00BE': ['DS', '3-n', 'LeafPositionBoundaries'],
        '0x00C0': ['IS', '1', 'BeamNumber'],
        '0x00C2': ['LO', '1', 'BeamName'],
        '0x00C3': ['ST', '1', 'BeamDescription'],
        '0x00C4': ['CS', '1', 'BeamType'],
        '0x00C6': ['CS', '1', 'RadiationType'],
        '0x00C8': ['IS', '1', 'ReferenceImageNumber'],
        '0x00CA': ['SQ', '1', 'PlannedVerificationImageSequence'],
        '0x00CC': ['LO', '1-n', 'ImagingDeviceSpecificAcquisitionParameters'],
        '0x00CE': ['CS', '1', 'TreatmentDeliveryType'],
        '0x00D0': ['IS', '1', 'NumberOfWedges'],
        '0x00D1': ['SQ', '1', 'WedgeSequence'],
        '0x00D2': ['IS', '1', 'WedgeNumber'],
        '0x00D3': ['CS', '1', 'WedgeType'],
        '0x00D4': ['SH', '1', 'WedgeID'],
        '0x00D5': ['IS', '1', 'WedgeAngle'],
        '0x00D6': ['DS', '1', 'WedgeFactor'],
        '0x00D8': ['DS', '1', 'WedgeOrientation'],
        '0x00DA': ['DS', '1', 'SourceToWedgeTrayDistance'],
        '0x00E0': ['IS', '1', 'NumberOfCompensators'],
        '0x00E1': ['SH', '1', 'MaterialID'],
        '0x00E2': ['DS', '1', 'TotalCompensatorTrayFactor'],
        '0x00E3': ['SQ', '1', 'CompensatorSequence'],
        '0x00E4': ['IS', '1', 'CompensatorNumber'],
        '0x00E5': ['SH', '1', 'CompensatorID'],
        '0x00E6': ['DS', '1', 'SourceToCompensatorTrayDistance'],
        '0x00E7': ['IS', '1', 'CompensatorRows'],
        '0x00E8': ['IS', '1', 'CompensatorColumns'],
        '0x00E9': ['DS', '2', 'CompensatorPixelSpacing'],
        '0x00EA': ['DS', '2', 'CompensatorPosition'],
        '0x00EB': ['DS', '1-n', 'CompensatorTransmissionData'],
        '0x00EC': ['DS', '1-n', 'CompensatorThicknessData'],
        '0x00ED': ['IS', '1', 'NumberOfBoli'],
        '0x00EE': ['CS', '1', 'CompensatorType'],
        '0x00F0': ['IS', '1', 'NumberOfBlocks'],
        '0x00F2': ['DS', '1', 'TotalBlockTrayFactor'],
        '0x00F4': ['SQ', '1', 'BlockSequence'],
        '0x00F5': ['SH', '1', 'BlockTrayID'],
        '0x00F6': ['DS', '1', 'SourceToBlockTrayDistance'],
        '0x00F8': ['CS', '1', 'BlockType'],
        '0x00FA': ['CS', '1', 'BlockDivergence'],
        '0x00FC': ['IS', '1', 'BlockNumber'],
        '0x00FE': ['LO', '1', 'BlockName'],
        '0x0100': ['DS', '1', 'BlockThickness'],
        '0x0102': ['DS', '1', 'BlockTransmission'],
        '0x0104': ['IS', '1', 'BlockNumberOfPoints'],
        '0x0106': ['DS', '2-2n', 'BlockData'],
        '0x0107': ['SQ', '1', 'ApplicatorSequence'],
        '0x0108': ['SH', '1', 'ApplicatorID'],
        '0x0109': ['CS', '1', 'ApplicatorType'],
        '0x010A': ['LO', '1', 'ApplicatorDescription'],
        '0x010C': ['DS', '1', 'CumulativeDoseReferenceCoefficient'],
        '0x010E': ['DS', '1', 'FinalCumulativeMetersetWeight'],
        '0x0110': ['IS', '1', 'NumberOfControlPoints'],
        '0x0111': ['SQ', '1', 'ControlPointSequence'],
        '0x0112': ['IS', '1', 'ControlPointIndex'],
        '0x0114': ['DS', '1', 'NominalBeamEnergy'],
        '0x0115': ['DS', '1', 'DoseRateSet'],
        '0x0116': ['SQ', '1', 'WedgePositionSequence'],
        '0x0118': ['CS', '1', 'WedgePosition'],
        '0x011A': ['SQ', '1', 'BeamLimitingDevicePositionSequence'],
        '0x011C': ['DS', '2-2n', 'LeafJawPositions'],
        '0x011E': ['DS', '1', 'GantryAngle'],
        '0x011F': ['CS', '1', 'GantryRotationDirection'],
        '0x0120': ['DS', '1', 'BeamLimitingDeviceAngle'],
        '0x0121': ['CS', '1', 'BeamLimitingDeviceRotationDirection'],
        '0x0122': ['DS', '1', 'PatientSupportAngle'],
        '0x0123': ['CS', '1', 'PatientSupportRotationDirection'],
        '0x0124': ['DS', '1', 'TableTopEccentricAxisDistance'],
        '0x0125': ['DS', '1', 'TableTopEccentricAngle'],
        '0x0126': ['CS', '1', 'TableTopEccentricRotationDirection'],
        '0x0128': ['DS', '1', 'TableTopVerticalPosition'],
        '0x0129': ['DS', '1', 'TableTopLongitudinalPosition'],
        '0x012A': ['DS', '1', 'TableTopLateralPosition'],
        '0x012C': ['DS', '3', 'IsocenterPosition'],
        '0x012E': ['DS', '3', 'SurfaceEntryPoint'],
        '0x0130': ['DS', '1', 'SourceToSurfaceDistance'],
        '0x0134': ['DS', '1', 'CumulativeMetersetWeight'],
        '0x0140': ['FL', '1', 'TableTopPitchAngle'],
        '0x0142': ['CS', '1', 'TableTopPitchRotationDirection'],
        '0x0144': ['FL', '1', 'TableTopRollAngle'],
        '0x0146': ['CS', '1', 'TableTopRollRotationDirection'],
        '0x0148': ['FL', '1', 'HeadFixationAngle'],
        '0x014A': ['FL', '1', 'GantryPitchAngle'],
        '0x014C': ['CS', '1', 'GantryPitchRotationDirection'],
        '0x014E': ['FL', '1', 'GantryPitchAngleTolerance'],
        '0x0180': ['SQ', '1', 'PatientSetupSequence'],
        '0x0182': ['IS', '1', 'PatientSetupNumber'],
        '0x0184': ['LO', '1', 'PatientAdditionalPosition'],
        '0x0190': ['SQ', '1', 'FixationDeviceSequence'],
        '0x0192': ['CS', '1', 'FixationDeviceType'],
        '0x0194': ['SH', '1', 'FixationDeviceLabel'],
        '0x0196': ['ST', '1', 'FixationDeviceDescription'],
        '0x0198': ['SH', '1', 'FixationDevicePosition'],
        '0x01A0': ['SQ', '1', 'ShieldingDeviceSequence'],
        '0x01A2': ['CS', '1', 'ShieldingDeviceType'],
        '0x01A4': ['SH', '1', 'ShieldingDeviceLabel'],
        '0x01A6': ['ST', '1', 'ShieldingDeviceDescription'],
        '0x01A8': ['SH', '1', 'ShieldingDevicePosition'],
        '0x01B0': ['CS', '1', 'SetupTechnique'],
        '0x01B2': ['ST', '1', 'SetupTechniqueDescription'],
        '0x01B4': ['SQ', '1', 'SetupDeviceSequence'],
        '0x01B6': ['CS', '1', 'SetupDeviceType'],
        '0x01B8': ['SH', '1', 'SetupDeviceLabel'],
        '0x01BA': ['ST', '1', 'SetupDeviceDescription'],
        '0x01BC': ['DS', '1', 'SetupDeviceParameter'],
        '0x01D0': ['ST', '1', 'SetupReferenceDescription'],
        '0x01D2': ['DS', '1', 'TableTopVerticalSetupDisplacement'],
        '0x01D4': ['DS', '1', 'TableTopLongitudinalSetupDisplacement'],
        '0x01D6': ['DS', '1', 'TableTopLateralSetupDisplacement'],
        '0x0200': ['CS', '1', 'BrachyTreatmentTechnique'],
        '0x0202': ['CS', '1', 'BrachyTreatmentType'],
        '0x0206': ['SQ', '1', 'TreatmentMachineSequence'],
        '0x0210': ['SQ', '1', 'SourceSequence'],
        '0x0212': ['IS', '1', 'SourceNumber'],
        '0x0214': ['CS', '1', 'SourceType'],
        '0x0216': ['LO', '1', 'SourceManufacturer'],
        '0x0218': ['DS', '1', 'ActiveSourceDiameter'],
        '0x021A': ['DS', '1', 'ActiveSourceLength'],
        '0x0222': ['DS', '1', 'SourceEncapsulationNominalThickness'],
        '0x0224': ['DS', '1', 'SourceEncapsulationNominalTransmission'],
        '0x0226': ['LO', '1', 'SourceIsotopeName'],
        '0x0228': ['DS', '1', 'SourceIsotopeHalfLife'],
        '0x022A': ['DS', '1', 'ReferenceAirKermaRate'],
        '0x022C': ['DA', '1', 'AirKermaRateReferenceDate'],
        '0x022E': ['TM', '1', 'AirKermaRateReferenceTime'],
        '0x0230': ['SQ', '1', 'ApplicationSetupSequence'],
        '0x0232': ['CS', '1', 'ApplicationSetupType'],
        '0x0234': ['IS', '1', 'ApplicationSetupNumber'],
        '0x0236': ['LO', '1', 'ApplicationSetupName'],
        '0x0238': ['LO', '1', 'ApplicationSetupManufacturer'],
        '0x0240': ['IS', '1', 'TemplateNumber'],
        '0x0242': ['SH', '1', 'TemplateType'],
        '0x0244': ['LO', '1', 'TemplateName'],
        '0x0250': ['DS', '1', 'TotalReferenceAirKerma'],
        '0x0260': ['SQ', '1', 'BrachyAccessoryDeviceSequence'],
        '0x0262': ['IS', '1', 'BrachyAccessoryDeviceNumber'],
        '0x0263': ['SH', '1', 'BrachyAccessoryDeviceID'],
        '0x0264': ['CS', '1', 'BrachyAccessoryDeviceType'],
        '0x0266': ['LO', '1', 'BrachyAccessoryDeviceName'],
        '0x026A': ['DS', '1', 'BrachyAccessoryDeviceNominalThickness'],
        '0x026C': ['DS', '1', 'BrachyAccessoryDeviceNominalTransmission'],
        '0x0280': ['SQ', '1', 'ChannelSequence'],
        '0x0282': ['IS', '1', 'ChannelNumber'],
        '0x0284': ['DS', '1', 'ChannelLength'],
        '0x0286': ['DS', '1', 'ChannelTotalTime'],
        '0x0288': ['CS', '1', 'SourceMovementType'],
        '0x028A': ['IS', '1', 'NumberOfPulses'],
        '0x028C': ['DS', '1', 'PulseRepetitionInterval'],
        '0x0290': ['IS', '1', 'SourceApplicatorNumber'],
        '0x0291': ['SH', '1', 'SourceApplicatorID'],
        '0x0292': ['CS', '1', 'SourceApplicatorType'],
        '0x0294': ['LO', '1', 'SourceApplicatorName'],
        '0x0296': ['DS', '1', 'SourceApplicatorLength'],
        '0x0298': ['LO', '1', 'SourceApplicatorManufacturer'],
        '0x029C': ['DS', '1', 'SourceApplicatorWallNominalThickness'],
        '0x029E': ['DS', '1', 'SourceApplicatorWallNominalTransmission'],
        '0x02A0': ['DS', '1', 'SourceApplicatorStepSize'],
        '0x02A2': ['IS', '1', 'TransferTubeNumber'],
        '0x02A4': ['DS', '1', 'TransferTubeLength'],
        '0x02B0': ['SQ', '1', 'ChannelShieldSequence'],
        '0x02B2': ['IS', '1', 'ChannelShieldNumber'],
        '0x02B3': ['SH', '1', 'ChannelShieldID'],
        '0x02B4': ['LO', '1', 'ChannelShieldName'],
        '0x02B8': ['DS', '1', 'ChannelShieldNominalThickness'],
        '0x02BA': ['DS', '1', 'ChannelShieldNominalTransmission'],
        '0x02C8': ['DS', '1', 'FinalCumulativeTimeWeight'],
        '0x02D0': ['SQ', '1', 'BrachyControlPointSequence'],
        '0x02D2': ['DS', '1', 'ControlPointRelativePosition'],
        '0x02D4': ['DS', '3', 'ControlPointDPosition'],
        '0x02D6': ['DS', '1', 'CumulativeTimeWeight'],
    },
    '0x300C': {
        '0x0000': ['UL', '1', 'RTRelationshipGroupLength'],
        '0x0002': ['SQ', '1', 'ReferencedRTPlanSequence'],
        '0x0004': ['SQ', '1', 'ReferencedBeamSequence'],
        '0x0006': ['IS', '1', 'ReferencedBeamNumber'],
        '0x0007': ['IS', '1', 'ReferencedReferenceImageNumber'],
        '0x0008': ['DS', '1', 'StartCumulativeMetersetWeight'],
        '0x0009': ['DS', '1', 'EndCumulativeMetersetWeight'],
        '0x000A': ['SQ', '1', 'ReferencedBrachyApplicationSetupSequence'],
        '0x000C': ['IS', '1', 'ReferencedBrachyApplicationSetupNumber'],
        '0x000E': ['IS', '1', 'ReferencedSourceNumber'],
        '0x0020': ['SQ', '1', 'ReferencedFractionGroupSequence'],
        '0x0022': ['IS', '1', 'ReferencedFractionGroupNumber'],
        '0x0040': ['SQ', '1', 'ReferencedVerificationImageSequence'],
        '0x0042': ['SQ', '1', 'ReferencedReferenceImageSequence'],
        '0x0050': ['SQ', '1', 'ReferencedDoseReferenceSequence'],
        '0x0051': ['IS', '1', 'ReferencedDoseReferenceNumber'],
        '0x0055': ['SQ', '1', 'BrachyReferencedDoseReferenceSequence'],
        '0x0060': ['SQ', '1', 'ReferencedStructureSetSequence'],
        '0x006A': ['IS', '1', 'ReferencedPatientSetupNumber'],
        '0x0080': ['SQ', '1', 'ReferencedDoseSequence'],
        '0x00A0': ['IS', '1', 'ReferencedToleranceTableNumber'],
        '0x00B0': ['SQ', '1', 'ReferencedBolusSequence'],
        '0x00C0': ['IS', '1', 'ReferencedWedgeNumber'],
        '0x00D0': ['IS', '1', 'ReferencedCompensatorNumber'],
        '0x00E0': ['IS', '1', 'ReferencedBlockNumber'],
        '0x00F0': ['IS', '1', 'ReferencedControlPointIndex'],
    },
    '0x300E': {
        '0x0000': ['UL', '1', 'RTApprovalGroupLength'],
        '0x0002': ['CS', '1', 'ApprovalStatus'],
        '0x0004': ['DA', '1', 'ReviewDate'],
        '0x0005': ['TM', '1', 'ReviewTime'],
        '0x0008': ['PN', '1', 'ReviewerName'],
    },
    '0x4000': {
        '0x0000': ['UL', '1', 'TextGroupLength'],
        '0x0010': ['LT', '1-n', 'TextArbitrary'],
        '0x4000': ['LT', '1-n', 'TextComments'],
    },
    '0x4008': {
        '0x0000': ['UL', '1', 'ResultsGroupLength'],
        '0x0040': ['SH', '1', 'ResultsID'],
        '0x0042': ['LO', '1', 'ResultsIDIssuer'],
        '0x0050': ['SQ', '1', 'ReferencedInterpretationSequence'],
        '0x0100': ['DA', '1', 'InterpretationRecordedDate'],
        '0x0101': ['TM', '1', 'InterpretationRecordedTime'],
        '0x0102': ['PN', '1', 'InterpretationRecorder'],
        '0x0103': ['LO', '1', 'ReferenceToRecordedSound'],
        '0x0108': ['DA', '1', 'InterpretationTranscriptionDate'],
        '0x0109': ['TM', '1', 'InterpretationTranscriptionTime'],
        '0x010A': ['PN', '1', 'InterpretationTranscriber'],
        '0x010B': ['ST', '1', 'InterpretationText'],
        '0x010C': ['PN', '1', 'InterpretationAuthor'],
        '0x0111': ['SQ', '1', 'InterpretationApproverSequence'],
        '0x0112': ['DA', '1', 'InterpretationApprovalDate'],
        '0x0113': ['TM', '1', 'InterpretationApprovalTime'],
        '0x0114': ['PN', '1', 'PhysicianApprovingInterpretation'],
        '0x0115': ['LT', '1', 'InterpretationDiagnosisDescription'],
        '0x0117': ['SQ', '1', 'DiagnosisCodeSequence'],
        '0x0118': ['SQ', '1', 'ResultsDistributionListSequence'],
        '0x0119': ['PN', '1', 'DistributionName'],
        '0x011A': ['LO', '1', 'DistributionAddress'],
        '0x0200': ['SH', '1', 'InterpretationID'],
        '0x0202': ['LO', '1', 'InterpretationIDIssuer'],
        '0x0210': ['CS', '1', 'InterpretationTypeID'],
        '0x0212': ['CS', '1', 'InterpretationStatusID'],
        '0x0300': ['ST', '1', 'Impressions'],
        '0x4000': ['ST', '1', 'ResultsComments'],
    },
    '0x5000': {
        '0x0000': ['UL', '1', 'CurveGroupLength'],
        '0x0005': ['US', '1', 'CurveDimensions'],
        '0x0010': ['US', '1', 'NumberOfPoints'],
        '0x0020': ['CS', '1', 'TypeOfData'],
        '0x0022': ['LO', '1', 'CurveDescription'],
        '0x0030': ['SH', '1-n', 'AxisUnits'],
        '0x0040': ['SH', '1-n', 'AxisLabels'],
        '0x0103': ['US', '1', 'DataValueRepresentation'],
        '0x0104': ['US', '1-n', 'MinimumCoordinateValue'],
        '0x0105': ['US', '1-n', 'MaximumCoordinateValue'],
        '0x0106': ['SH', '1-n', 'CurveRange'],
        '0x0110': ['US', '1', 'CurveDataDescriptor'],
        '0x0112': ['US', '1', 'CoordinateStartValue'],
        '0x0114': ['US', '1', 'CoordinateStepValue'],
        '0x2000': ['US', '1', 'AudioType'],
        '0x2002': ['US', '1', 'AudioSampleFormat'],
        '0x2004': ['US', '1', 'NumberOfChannels'],
        '0x2006': ['UL', '1', 'NumberOfSamples'],
        '0x2008': ['UL', '1', 'SampleRate'],
        '0x200A': ['UL', '1', 'TotalTime'],
        '0x200C': ['OX', '1', 'AudioSampleData'],
        '0x200E': ['LT', '1', 'AudioComments'],
        '0x3000': ['OX', '1', 'CurveData'],
    },
    '0x5400': {
        '0x0100': ['SQ', '1', 'WaveformSequence'],
        '0x0110': ['OW/OB', '1', 'ChannelMinimumValue'],
        '0x0112': ['OW/OB', '1', 'ChannelMaximumValue'],
        '0x1004': ['US', '1', 'WaveformBitsAllocated'],
        '0x1006': ['CS', '1', 'WaveformSampleInterpretation'],
        '0x100A': ['OW/OB', '1', 'WaveformPaddingValue'],
        '0x1010': ['OW/OB', '1', 'WaveformData'],
    },
    '0x6000': {
        '0x0000': ['UL', '1', 'OverlayGroupLength'],
        '0x0010': ['US', '1', 'OverlayRows'],
        '0x0011': ['US', '1', 'OverlayColumns'],
        '0x0012': ['US', '1', 'OverlayPlanes'],
        '0x0015': ['IS', '1', 'OverlayNumberOfFrames'],
        '0x0040': ['CS', '1', 'OverlayType'],
        '0x0050': ['SS', '2', 'OverlayOrigin'],
        '0x0051': ['US', '1', 'OverlayImageFrameOrigin'],
        '0x0052': ['US', '1', 'OverlayPlaneOrigin'],
        '0x0060': ['CS', '1', 'OverlayCompressionCode'],
        '0x0061': ['SH', '1', 'OverlayCompressionOriginator'],
        '0x0062': ['SH', '1', 'OverlayCompressionLabel'],
        '0x0063': ['SH', '1', 'OverlayCompressionDescription'],
        '0x0066': ['AT', '1-n', 'OverlayCompressionStepPointers'],
        '0x0068': ['US', '1', 'OverlayRepeatInterval'],
        '0x0069': ['US', '1', 'OverlayBitsGrouped'],
        '0x0100': ['US', '1', 'OverlayBitsAllocated'],
        '0x0102': ['US', '1', 'OverlayBitPosition'],
        '0x0110': ['CS', '1', 'OverlayFormat'],
        '0x0200': ['US', '1', 'OverlayLocation'],
        '0x0800': ['CS', '1-n', 'OverlayCodeLabel'],
        '0x0802': ['US', '1', 'OverlayNumberOfTables'],
        '0x0803': ['AT', '1-n', 'OverlayCodeTableLocation'],
        '0x0804': ['US', '1', 'OverlayBitsForCodeWord'],
        '0x1100': ['US', '1', 'OverlayDescriptorGray'],
        '0x1101': ['US', '1', 'OverlayDescriptorRed'],
        '0x1102': ['US', '1', 'OverlayDescriptorGreen'],
        '0x1103': ['US', '1', 'OverlayDescriptorBlue'],
        '0x1200': ['US', '1-n', 'OverlayGray'],
        '0x1201': ['US', '1-n', 'OverlayRed'],
        '0x1202': ['US', '1-n', 'OverlayGreen'],
        '0x1203': ['US', '1-n', 'OverlayBlue'],
        '0x1301': ['IS', '1', 'ROIArea'],
        '0x1302': ['DS', '1', 'ROIMean'],
        '0x1303': ['DS', '1', 'ROIStandardDeviation'],
        '0x3000': ['OW', '1', 'OverlayData'],
        '0x4000': ['LT', '1-n', 'OverlayComments'],
    },
    '0x7F00': {
        '0x0000': ['UL', '1', 'VariablePixelDataGroupLength'],
        '0x0010': ['OX', '1', 'VariablePixelData'],
        '0x0011': ['AT', '1', 'VariableNextDataGroup'],
        '0x0020': ['OW', '1-n', 'VariableCoefficientsSDVN'],
        '0x0030': ['OW', '1-n', 'VariableCoefficientsSDHN'],
        '0x0040': ['OW', '1-n', 'VariableCoefficientsSDDN'],
    },
    '0x7FE0': {
        '0x0000': ['UL', '1', 'PixelDataGroupLength'],
        '0x0010': ['OX', '1', 'PixelData'],
        '0x0020': ['OW', '1-n', 'CoefficientsSDVN'],
        '0x0030': ['OW', '1-n', 'CoefficientsSDHN'],
        '0x0040': ['OW', '1-n', 'CoefficientsSDDN'],
    },
    '0xFFFC': {
        '0xFFFC': ['OB', '1', 'DataSetTrailingPadding'],
    },
    '0xFFFE': {
        '0xE000': ['NONE', '1', 'Item'],
        '0xE00D': ['NONE', '1', 'ItemDelimitationItem'],
        '0xE0DD': ['NONE', '1', 'SequenceDelimitationItem'],
    },
}; // dwv.dicom.Dictionnary


/*viewer/src/gui/browser.js*/

/** 
 * Browser module.
 * @module browser
 */
var dwv = dwv || {};
/**
 * Namespace for browser related functions.
 * @class browser
 * @namespace dwv
 * @static
 */
dwv.browser = dwv.browser || {};

/**
 * Browser check for the FileAPI.
 * @method hasFileApi
 * @static
 */ 
dwv.browser.hasFileApi = function()
{
    // regular test does not work on Safari 5
    var isSafari5 = (navigator.appVersion.indexOf("Safari") !== -1) &&
        (navigator.appVersion.indexOf("Chrome") === -1) &&
        ( (navigator.appVersion.indexOf("5.0.") !== -1) ||
          (navigator.appVersion.indexOf("5.1.") !== -1) );
    if( isSafari5 ) 
    {
        console.warn("Assuming FileAPI support for Safari5...");
        return true;
    }
    // regular test
    return "FileReader" in window;
};

/**
 * Browser check for the XMLHttpRequest.
 * @method hasXmlHttpRequest
 * @static
 */ 
dwv.browser.hasXmlHttpRequest = function()
{
    return "XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest();
};

/**
 * Browser check for typed array.
 * @method hasTypedArray
 * @static
 */ 
dwv.browser.hasTypedArray = function()
{
    return "Uint8Array" in window && "Uint16Array" in window;
};

/**
 * Browser check for clamped array.
 * @method hasClampedArray
 * @static
 */ 
dwv.browser.hasClampedArray = function()
{
    return "Uint8ClampedArray" in window;
};

/**
 * Browser checks to see if it can run dwv. Throws an error if not.
 * TODO Maybe use http://modernizr.com/.
 * @method check
 * @static
 */ 
dwv.browser.check = function()
{
    var appnorun = "The application cannot be run.";
    var message = "";
    // Check for the File API support
    if( !dwv.browser.hasFileApi() ) {
        message = "The File APIs are not supported in this browser. ";
        alert(message+appnorun);
        throw new Error(message);
    }
    // Check for XMLHttpRequest
    if( !dwv.browser.hasXmlHttpRequest() ) {
        message = "The XMLHttpRequest is not supported in this browser. ";
        alert(message+appnorun);
        throw new Error(message);
    }
    // Check typed array
    if( !dwv.browser.hasTypedArray() ) {
        message = "The Typed arrays are not supported in this browser. ";
        alert(message+appnorun);
        throw new Error(message);
    }
    // check clamped array
    if( !dwv.browser.hasClampedArray() ) {
        // silent fail since IE does not support it...
        console.warn("The Uint8ClampedArray is not supported in this browser. This may impair performance. ");
    }
};


/*viewer/src/gui/filter.js*/

/** 
 * GUI module.
 * @module gui
 */
var dwv = dwv || {};
/**
 * Namespace for GUI functions.
 * @class gui
 * @namespace dwv
 * @static
 */
dwv.gui = dwv.gui || {};
dwv.gui.base = dwv.gui.base || {};
dwv.gui.filter = dwv.gui.filter || {};
dwv.gui.filter.base = dwv.gui.filter.base || {};

/**
 * Append the filter HTML to the page.
 * @method appendFilterHtml
 * @static
 */
dwv.gui.base.appendFilterHtml = function ()
{
    // filter select
    var filterSelector = dwv.html.createHtmlSelect("filterSelect",dwv.tool.filters);
    filterSelector.onchange = dwv.gui.onChangeFilter;

    // filter list element
    var filterLi = dwv.html.createHiddenElement("li", "filterLi");
    filterLi.setAttribute("class","ui-block-b");
    filterLi.appendChild(filterSelector);
    
    // append element
    dwv.html.appendElement("toolList", filterLi);
};

/**
 * Display the filter HTML.
 * @method displayFilterHtml
 * @static
 * @param {Boolean} flag True to display, false to hide.
 */
dwv.gui.base.displayFilterHtml = function (flag)
{
    dwv.html.displayElement("filterLi", flag);
};

/**
 * Initialise the filter HTML.
 * @method displayFilterHtml
 * @static
 */
dwv.gui.base.initFilterHtml = function ()
{
    // filter select: reset selected options
    var filterSelector = document.getElementById("filterSelect");
    filterSelector.selectedIndex = 0;
    dwv.gui.refreshSelect("#filterSelect");
};

/**
 * Append the threshold filter HTML to the page.
 * @method appendThresholdHtml
 * @static
 */
dwv.gui.filter.base.appendThresholdHtml = function ()
{
    // threshold list element
    var thresholdLi = dwv.html.createHiddenElement("li", "thresholdLi");
    thresholdLi.setAttribute("class","ui-block-c");
    
    // node
    var node = document.getElementById("toolList");
    // append threshold
    node.appendChild(thresholdLi);
    // threshold slider
    dwv.gui.appendSliderHtml();
    // trigger create event (mobile)
    $("#toolList").trigger("create");
};

/**
 * Clear the treshold filter HTML.
 * @method displayThresholdHtml
 * @static
 * @param {Boolean} flag True to display, false to hide.
 */
dwv.gui.filter.base.displayThresholdHtml = function (flag)
{
    dwv.html.displayElement("thresholdLi", flag);
};

/**
 * Initialise the treshold filter HTML.
 * @method initThresholdHtml
 * @static
 */
dwv.gui.filter.base.initThresholdHtml = function ()
{
    // threshold slider
    dwv.gui.initSliderHtml();
};

/**
 * Append the sharpen filter HTML to the page.
 * @method appendSharpenHtml
 * @static
 */
dwv.gui.filter.base.createFilterApplyButton = function ()
{
    var button = document.createElement("button");
    button.id = "runFilterButton";
    button.onclick = dwv.gui.onRunFilter;
    button.setAttribute("style","width:100%; margin-top:0.1em;");
    button.setAttribute("class","ui-btn ui-btn-b");
    button.appendChild(document.createTextNode("Apply"));
    return button;
};

/**
 * Append the sharpen filter HTML to the page.
 * @method appendSharpenHtml
 * @static
 */
dwv.gui.filter.base.appendSharpenHtml = function ()
{
    // sharpen list element
    var sharpenLi = dwv.html.createHiddenElement("li", "sharpenLi");
    sharpenLi.setAttribute("class","ui-block-c");
    sharpenLi.appendChild( dwv.gui.filter.base.createFilterApplyButton() );
    
    // append element
    dwv.html.appendElement("toolList", sharpenLi);
};

/**
 * Display the sharpen filter HTML.
 * @method displaySharpenHtml
 * @static
 * @param {Boolean} flag True to display, false to hide.
 */
dwv.gui.filter.base.displaySharpenHtml = function (flag)
{
    dwv.html.displayElement("sharpenLi", flag);
};

/**
 * Append the sobel filter HTML to the page.
 * @method appendSobelHtml
 * @static
 */
dwv.gui.filter.base.appendSobelHtml = function ()
{
    // sobel list element
    var sobelLi = dwv.html.createHiddenElement("li", "sobelLi");
    sobelLi.setAttribute("class","ui-block-c");
    sobelLi.appendChild( dwv.gui.filter.base.createFilterApplyButton() );
    
    // append element
    dwv.html.appendElement("toolList", sobelLi);
};

/**
 * Display the sobel filter HTML.
 * @method displaySobelHtml
 * @static
 * @param {Boolean} flag True to display, false to hide.
 */
dwv.gui.filter.base.displaySobelHtml = function (flag)
{
    dwv.html.displayElement("sobelLi", flag);
};



/*viewer/src/gui/generic.js*/

/** 
 * GUI module.
 * @module gui
 */
var dwv = dwv || {};
/**
 * Namespace for GUI functions.
 * @class gui
 * @namespace dwv
 * @static
 */
dwv.gui = dwv.gui || {};
dwv.gui.base = dwv.gui.base || {};

/**
 * Get the size of the image display window.
 * @method getWindowSize
 * @static
 */
dwv.gui.base.getWindowSize = function()
{
	//edit
    return { 'width': ($(window).width()), 'height': ($(window).height() - 100) }; //147
};

/**
 * Update the progress bar.
 * @method updateProgress
 * @static
 * @param {Object} event A ProgressEvent.
 */
dwv.gui.updateProgress = function(event)
{
    // event is an ProgressEvent.
	if(g_arr_load_progress){
		g_arr_load_progress(event);
	}else{
		if( event.lengthComputable ){
			var percent = Math.round((event.loaded / event.total) * 100);
			dwv.gui.displayProgress(percent);
		}
	}
};

/**
 * Display a progress value.
 * @method displayProgress
 * @static
 * @param {Number} percent The progress percentage.
 */
dwv.gui.base.displayProgress = function(percent)
{
    // jquery-mobile specific
    if( percent < 100 ) {
        $.mobile.loading("show", {text: percent+"%", textVisible: true, theme: "b"} );
    }
    else if( percent === 100 ) {
        $.mobile.loading("hide");
    }
};

/**
 * Refresh a HTML select. Mainly for jquery-mobile.
 * @method refreshSelect
 * @static
 * @param {String} selectName The name of the HTML select to refresh.
 */
dwv.gui.base.refreshSelect = function(selectName)
{
    // jquery-mobile
    if( $(selectName).selectmenu ) {
        $(selectName).selectmenu('refresh');
    }
};

/**
 * Set the selected item of a HTML select.
 * @method refreshSelect
 * @static
 * @param {String} selectName The name of the HTML select.
 * @param {String} itemName The name of the itme to mark as selected.
 */
dwv.gui.setSelected = function(selectName, itemName)
{
    var select = document.getElementById(selectName);
    var index = 0;
    for( index in select.options){ 
        if( select.options[index].text === itemName ) {
            break;
        }
    }
    select.selectedIndex = index;
    dwv.gui.refreshSelect("#" + selectName);
};

/**
 * Append the slider HTML.
 * @method appendSliderHtml
 * @static
 */
dwv.gui.base.appendSliderHtml = function()
{
    // default values
    var min = 0;
    var max = 1;
    
    // jquery-mobile range slider
    // minimum input
    var inputMin = document.createElement("input");
    inputMin.id = "threshold-min";
    inputMin.type = "range";
    inputMin.max = max;
    inputMin.min = min;
    inputMin.value = min;
    // maximum input
    var inputMax = document.createElement("input");
    inputMax.id = "threshold-max";
    inputMax.type = "range";
    inputMax.max = max;
    inputMax.min = min;
    inputMax.value = max;
    // slicer div
    var div = document.createElement("div");
    div.id = "threshold-div";
    div.setAttribute("data-role", "rangeslider");
    div.appendChild(inputMin);
    div.appendChild(inputMax);
    div.setAttribute("data-mini", "true");
    // append to document
    document.getElementById("thresholdLi").appendChild(div);
    // bind change
    $("#threshold-div").on("change",
            function(/*event*/) {
                dwv.gui.onChangeMinMax(
                    { "min":$("#threshold-min").val(),
                      "max":$("#threshold-max").val() } );
            }
        );
    // trigger creation
    $("#toolList").trigger("create");
};

/**
 * Initialise the slider HTML.
 * @method initSliderHtml
 * @static
 */
dwv.gui.base.initSliderHtml = function()
{
    var min = app.getImage().getDataRange().min;
    var max = app.getImage().getDataRange().max;
    
    // minimum input
    var inputMin = document.getElementById("threshold-min");
    inputMin.max = max;
    inputMin.min = min;
    inputMin.value = min;
    // maximum input
    var inputMax = document.getElementById("threshold-max");
    inputMax.max = max;
    inputMax.min = min;
    inputMax.value = max;
    // trigger creation
    $("#toolList").trigger("create");
};

/**
 * Create the DICOM tags table. To be called once the DICOM has been parsed.
 * @method createTagsTable
 * @private
 * @param {Object} dataInfo The data information.
 */
dwv.gui.base.appendTagsTable = function (dataInfo)
{
    // HTML node
    var node = document.getElementById("tags");
    if( node === null ) {
        return;
    }
    // remove possible previous
    while (node.hasChildNodes()) { 
        node.removeChild(node.firstChild);
    }
    // tag list table (without the pixel data)
    if(dataInfo.PixelData) {
        dataInfo.PixelData.value = "...";
    }
    // tags HTML table
    var table = dwv.html.toTable(dataInfo);
    table.id = "tagsTable";
    table.className = "tagsList table-stripe";
    table.setAttribute("data-role", "table");
    table.setAttribute("data-mode", "columntoggle");
    // search form
    node.appendChild(dwv.html.getHtmlSearchForm(table));
    // tags table
    node.appendChild(table);
    // trigger create event (mobile)
    $("#tags").trigger("create");
};


/*viewer/src/gui/handlers.js*/

/** 
 * GUI module.
 * @module gui
 */
var dwv = dwv || {};
/**
 * Namespace for GUI functions.
 * @class gui
 * @namespace dwv
 * @static
 */
dwv.gui = dwv.gui || {};

/**
 * Handle window/level change.
 * @method onChangeWindowLevelPreset
 * @namespace dwv.gui
 * @static
 * @param {Object} event The change event.
 */
dwv.gui.onChangeWindowLevelPreset = function(/*event*/)
{
    dwv.tool.updateWindowingDataFromName(this.value);
};

/**
 * Handle colour map change.
 * @method onChangeColourMap
 * @static
 * @param {Object} event The change event.
 */
dwv.gui.onChangeColourMap = function(/*event*/)
{
    dwv.tool.updateColourMapFromName(this.value);
};

/**
 * Handle loader change.
 * @method onChangeLoader
 * @static
 * @param {Object} event The change event.
 */
dwv.gui.onChangeLoader = function(/*event*/)
{
    if( this.value === "file") {
        dwv.gui.displayUrlLoadHtml(false);
        dwv.gui.displayFileLoadHtml(true);
    }
    else if( this.value === "url") {
        dwv.gui.displayFileLoadHtml(false);
        dwv.gui.displayUrlLoadHtml(true);
    }
};

/**
 * Handle files change.
 * @method onChangeFiles
 * @static
 * @param {Object} event The change event.
 */
dwv.gui.onChangeFiles = function(event)
{
    app.onChangeFiles(event);
};

/**
 * Handle URL change.
 * @method onChangeURL
 * @static
 * @param {Object} event The change event.
 */
dwv.gui.onChangeURL = function(event)
{
    app.onChangeURL(event);
};

/**
 * Handle tool change.
 * @method onChangeTool
 * @static
 * @param {Object} event The change event.
 */
dwv.gui.onChangeTool = function(/*event*/)
{
    app.getToolBox().setSelectedTool(this.value);
};

/**
 * Handle filter change.
 * @method onChangeFilter
 * @static
 * @param {Object} event The change event.
 */
dwv.gui.onChangeFilter = function(/*event*/)
{
    app.getToolBox().getSelectedTool().setSelectedFilter(this.value);
};

/**
 * Handle filter run.
 * @method onRunFilter
 * @static
 * @param {Object} event The run event.
 */
dwv.gui.onRunFilter = function(/*event*/)
{
    app.getToolBox().getSelectedTool().getSelectedFilter().run();
};

/**
 * Handle min/max slider change.
 * @method onChangeMinMax
 * @static
 * @param {Object} range The new range of the data.
 */
dwv.gui.onChangeMinMax = function(range)
{
    // seems like jquery is checking if the method exists before it 
    // is used...
    if( app.getToolBox().getSelectedTool().getSelectedFilter ) {
        app.getToolBox().getSelectedTool().getSelectedFilter().run(range);
    }
};

/**
 * Handle shape change.
 * @method onChangeShape
 * @static
 * @param {Object} event The change event.
 */
dwv.gui.onChangeShape = function(/*event*/)
{
    app.getToolBox().getSelectedTool().setShapeName(this.value);
};

/**
 * Handle line color change.
 * @method onChangeLineColour
 * @static
 * @param {Object} event The change event.
 */
dwv.gui.onChangeLineColour = function(/*event*/)
{
    app.getToolBox().getSelectedTool().setLineColour(this.value);
};

/**
 * Handle zoom reset.
 * @method onZoomReset
 * @static
 * @param {Object} event The change event.
 */
dwv.gui.onZoomReset = function(/*event*/)
{
    app.resetLayout();
};

/**
 * Handle display reset.
 * @method onDisplayReset
 * @static
 * @param {Object} event The change event.
 */
dwv.gui.onDisplayReset = function(event)
{
    dwv.gui.onZoomReset(event);
    app.initWLDisplay();
    // update preset select
    var select = document.getElementById("presetSelect");
    select.selectedIndex = 0;
    dwv.gui.refreshSelect("#presetSelect");
};

/**
 * Handle undo.
 * @method onUndo
 * @static
 * @param {Object} event The associated event.
 */
dwv.gui.onUndo = function(/*event*/)
{
    app.getUndoStack().undo();
};

/**
 * Handle redo.
 * @method onRedo
 * @static
 * @param {Object} event The associated event.
 */
dwv.gui.onRedo = function(/*event*/)
{
    app.getUndoStack().redo();
};

/**
 * Handle toggle of info layer.
 * @method onToggleInfoLayer
 * @static
 * @param {Object} event The associated event.
 */
dwv.gui.onToggleInfoLayer = function(/*event*/)
{
    app.toggleInfoLayerDisplay();
};


/*viewer/src/gui/help.js*/

/** 
 * GUI module.
 * @module gui
 */
var dwv = dwv || {};
/**
 * Namespace for GUI functions.
 * @class gui
 * @namespace dwv
 * @static
 */
dwv.gui = dwv.gui || {};
dwv.gui.base = dwv.gui.base || {};

/**
 * Append the version HTML.
 * @method appendVersionHtml
 */
dwv.gui.base.appendVersionHtml = function()
{
    var nodes = document.getElementsByClassName("dwv-version");
    for( var i = 0; i < nodes.length; ++i ){
        nodes[i].appendChild(document.createTextNode(app.getVersion()));
    }
};

/**
 * Build the help HTML.
 * @method appendHelpHtml
 * @param {Boolean} mobile Flag for mobile or not environement.
 */
dwv.gui.base.appendHelpHtml = function(mobile)
{
    var actionType = "mouse";
    if( mobile ) {
        actionType = "touch";
    }
    
    var toolHelpDiv = document.createElement("div");
    
    // current location
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));

    for ( var t in dwv.tool.tools )
    {
        var tool = dwv.tool.tools[t];
        // title
        var title = document.createElement("h3");
        title.appendChild(document.createTextNode(tool.getHelp().title));
        // doc div
        var docDiv = document.createElement("div");
        // brief
        var brief = document.createElement("p");
        brief.appendChild(document.createTextNode(tool.getHelp().brief));
        docDiv.appendChild(brief);
        // details
        if( tool.getHelp()[actionType] ) {
            var keys = Object.keys(tool.getHelp()[actionType]);
            for( var i=0; i<keys.length; ++i )
            {
                var action = tool.getHelp()[actionType][keys[i]];
                
                var img = document.createElement("img");
                img.src = dir + "/viewer/resources/"+keys[i]+".png";
                img.style.float = "left";
                img.style.margin = "0px 15px 15px 0px";
                
                var br = document.createElement("br");
                br.style.clear = "both";
                
                var para = document.createElement("p");
                para.appendChild(img);
                para.appendChild(document.createTextNode(action));
                para.appendChild(br);
                docDiv.appendChild(para);
            }
        }
        
        // different div structure for mobile or static
        if( mobile )
        {
            var toolDiv = document.createElement("div");
            toolDiv.setAttribute("data-role", "collapsible");
            toolDiv.appendChild(title);
            toolDiv.appendChild(docDiv);
            toolHelpDiv.appendChild(toolDiv);
        }
        else
        {
            toolHelpDiv.id = "accordion";
            toolHelpDiv.appendChild(title);
            toolHelpDiv.appendChild(docDiv);
        }
    }
    
    var helpNode = document.getElementById("help");

    /*var dwvLink = document.createElement("a");
    dwvLink.href = "https://github.com/ivmartel/dwv/wiki";
    dwvLink.title = "DWV wiki on github.";
    dwvLink.appendChild(document.createTextNode("DWV"));*/
    
    /*var dwvExampleLink = document.createElement("a");
    var inputIdx = document.URL.indexOf("?input=");
    dwvExampleLink.href = document.URL.substr(0, inputIdx+7) + 
        "http%3A%2F%2Fx.babymri.org%2F%3F53320924%26.dcm";
    dwvExampleLink.title = "Brain MRI in DWV.";
    dwvExampleLink.target = "_top";
    dwvExampleLink.appendChild(document.createTextNode("MRI"));

    var bbmriLink = document.createElement("a");
    bbmriLink.href = "http://www.babymri.org";
    bbmriLink.title = "babymri.org";
    bbmriLink.appendChild(document.createTextNode("babymri.org"));*/

    var headPara = document.createElement("p");
    //headPara.appendChild(dwvLink);
    headPara.appendChild(document.createTextNode("DICOM Viewer can load DICOM data " +
        "either from a local file or from an URL. All DICOM tags are available " +
        "in a searchable table, press the 'tags' or grid button. " + 
        "You can choose to display the image information overlay by pressing the " + 
        "'info' or i button.")); //For some example data, check this 
    /*headPara.appendChild(dwvExampleLink);
    headPara.appendChild(document.createTextNode(" from the " ));
    headPara.appendChild(bbmriLink);
    headPara.appendChild(document.createTextNode(" database." ));*/
    helpNode.appendChild(headPara);
    
    var toolPara = document.createElement("p");
    toolPara.appendChild(document.createTextNode("Each tool defines the possible " + 
        "user interactions. The default tool is the window/level one. " + 
        "Here are the available tools:"));
    helpNode.appendChild(toolPara);
    helpNode.appendChild(toolHelpDiv);
};


/*viewer/src/gui/html.js*/

/** 
 * HTML module.
 * @module html
 */
var dwv = dwv || {};
/**
 * Namespace for HTML related functions.
 * @class html
 * @namespace dwv
 * @static
 */
dwv.html = dwv.html || {};

/**
 * Append a cell to a given row.
 * @method appendCell
 * @static
 * @param {Object} row The row to append the cell to.
 * @param {String} text The text of the cell.
 */
dwv.html.appendCell = function(row, content)
{
	//edit
    var cell = row.insertCell(-1);
    var str = content;
    // special care for arrays
    if ( content instanceof Array || 
            content instanceof Uint8Array ||
            content instanceof Uint16Array ||
            content instanceof Uint32Array ) {
        if ( content.length > 10 ) {
            content = Array.prototype.slice.call( content, 0, 10 );
            content[10] = "...";
        }
        str = Array.prototype.join.call( content, ', ' );
    }
    // append
    cell.appendChild(document.createTextNode(str));

    /*var cell = row.insertCell(-1);
    var str = text;
    // special case for Uint8Array (no default toString)
	console.log('1');
    if ( text instanceof Uint8Array ) {
        str = "";
        for ( var i = 0; i < text.length; ++i ) {
            if ( i > 0 ) { 
                str += ",";
            }
            str += text[i];
        }
    }
    cell.appendChild(document.createTextNode(str));*/
};

/**
 * Append a header cell to a given row.
 * @method appendHCell
 * @static
 * @param {Object} row The row to append the header cell to.
 * @param {String} text The text of the header cell.
 */
dwv.html.appendHCell = function(row, text)
{
    var cell = document.createElement("th");
    // TODO jquery-mobile specific...
    if( text !== "Value" && text !== "Name" ) {
        cell.setAttribute("data-priority", "1");
    }
    cell.appendChild(document.createTextNode(text));
    row.appendChild(cell);
};

/**
 * Append a row to an array.
 * @method appendRowForArray
 * @static
 * @param {} table
 * @param {} input
 * @param {} level
 * @param {} maxLevel
 * @param {} rowHeader
 */
dwv.html.appendRowForArray = function(table, input, level, maxLevel, rowHeader)
{
    var row = null;
    // loop through
    for(var i=0; i<input.length; ++i) {
        // more to come
        if( typeof input[i] === 'number' ||
            typeof input[i] === 'string' ||
            input[i] === null ||
            input[i] === undefined ||
            level >= maxLevel ) {
            if( !row ) {
                row = table.insertRow(-1);
            }
            dwv.html.appendCell(row, input[i]);
        }
        // last level
        else {
            dwv.html.appendRow(table, input[i], level+i, maxLevel, rowHeader);
        }
    }
};

/**
 * Append a row to an object.
 * @method appendRowForObject
 * @static
 * @param {} table
 * @param {} input
 * @param {} level
 * @param {} maxLevel
 * @param {} rowHeader
 */
dwv.html.appendRowForObject = function(table, input, level, maxLevel, rowHeader)
{
    var keys = Object.keys(input);
    var row = null;
    for( var o=0; o<keys.length; ++o ) {
        // more to come
        if( typeof input[keys[o]] === 'number' ||
            typeof input[keys[o]] === 'string' ||
            input[keys[o]] === null ||
            input[keys[o]] === undefined ||
            level >= maxLevel ) {
            if( !row ) {
                row = table.insertRow(-1);
            }
            if( o === 0 && rowHeader) {
                dwv.html.appendCell(row, rowHeader);
            }
            dwv.html.appendCell(row, input[keys[o]]);
        }
        // last level
        else {
            dwv.html.appendRow(table, input[keys[o]], level+o, maxLevel, keys[o]);
        }
    }
    // header row
    // warn: need to create the header after the rest
    // otherwise the data will inserted in the thead...
    if( level === 2 ) {
        var header = table.createTHead();
        var th = header.insertRow(-1);
        if( rowHeader ) {
            dwv.html.appendHCell(th, "Name");
        }
        for( var k=0; k<keys.length; ++k ) {
            dwv.html.appendHCell(th, dwv.utils.capitaliseFirstLetter(keys[k]));
        }
    }
};

/**
 * Append a row to an object or an array.
 * @method appendRow
 * @static
 * @param {} table
 * @param {} input
 * @param {} level
 * @param {} maxLevel
 * @param {} rowHeader
 */
dwv.html.appendRow = function(table, input, level, maxLevel, rowHeader)
{
    // array
    if( input instanceof Array ) {
        dwv.html.appendRowForArray(table, input, level+1, maxLevel, rowHeader);
    }
    // object
    else if( typeof input === 'object') {
        dwv.html.appendRowForObject(table, input, level+1, maxLevel, rowHeader);
    }
    else {
        throw new Error("Unsupported input data type.");
    }
};

/**
 * Converts the input to an HTML table.
 * @method toTable
 * @static
 * @input {Mixed} input Allowed types are: array, array of object, object.
 * @return {Object} The created HTML table.
 * @warning Null is interpreted differently in browsers, firefox will not display it.
 */
dwv.html.toTable = function(input)
{
    var table = document.createElement('table');
    dwv.html.appendRow(table, input, 0, 2);
    return table;
};

/**
 * Get an HTML search form.
 * @method getHtmlSearchForm
 * @static
 * @param {Object} htmlTableToSearch The table to do the search on.
 * @return {Object} The HTML search form.
 */
dwv.html.getHtmlSearchForm = function(htmlTableToSearch)
{
    var form = document.createElement("form");
    form.setAttribute("class", "filter");
    var input = document.createElement("input");
    input.onkeyup = function() {
        dwv.html.filterTable(input, htmlTableToSearch);
    };
    form.appendChild(input);
    
    return form;
};

/**
 * Filter a table with a given parameter: sets the display css of rows to
 * true or false if it contains the term.
 * @method filterTable
 * @static
 * @param {String} term The term to filter the table with.
 * @param {Object} table The table to filter.
 */
dwv.html.filterTable = function(term, table) {
    // de-highlight
    dwv.html.dehighlight(table);
    // split search terms
    var terms = term.value.toLowerCase().split(" ");

    // search
    var text = 0;
    var display = 0;
    for (var r = 1; r < table.rows.length; ++r) {
        display = '';
        for (var i = 0; i < terms.length; ++i) {
            text = table.rows[r].innerHTML.replace(/<[^>]+>/g, "").toLowerCase();
            if (text.indexOf(terms[i]) < 0) {
                display = 'none';
            } else {
                if (terms[i].length) {
                    dwv.html.highlight(terms[i], table.rows[r]);
                }
            }
            table.rows[r].style.display = display;
        }
    }
};

/**
 * Transform back each
 * 'preText <span class="highlighted">term</span> postText'
 * into its original 'preText term postText'.
 * @method dehighlight
 * @static
 * @param {Object} container The container to de-highlight.
 */
dwv.html.dehighlight = function(container) {
    for (var i = 0; i < container.childNodes.length; i++) {
        var node = container.childNodes[i];

        if (node.attributes &&
                node.attributes['class'] &&
                node.attributes['class'].value === 'highlighted') {
            node.parentNode.parentNode.replaceChild(
                    document.createTextNode(
                        node.parentNode.innerHTML.replace(/<[^>]+>/g, "")),
                    node.parentNode);
            // Stop here and process next parent
            return;
        } else if (node.nodeType !== 3) {
            // Keep going onto other elements
            dwv.html.dehighlight(node);
        }
    }
};

/**
 * Create a
 * 'preText <span class="highlighted">term</span> postText'
 * around each search term.
 * @method highlight
 * @static
 * @param {String} term The term to highlight.
 * @param {Object} container The container where to highlight the term.
 */
dwv.html.highlight = function(term, container) {
    for (var i = 0; i < container.childNodes.length; i++) {
        var node = container.childNodes[i];

        if (node.nodeType === 3) {
            // Text node
            var data = node.data;
            var data_low = data.toLowerCase();
            if (data_low.indexOf(term) >= 0) {
                //term found!
                var new_node = document.createElement('span');
                node.parentNode.replaceChild(new_node, node);

                var result;
                while ((result = data_low.indexOf(term)) !== -1) {
                    // before term
                    new_node.appendChild(document.createTextNode(
                                data.substr(0, result)));
                    // term
                    new_node.appendChild(dwv.html.createHighlightNode(
                                document.createTextNode(data.substr(
                                        result, term.length))));
                    // reduce search string
                    data = data.substr(result + term.length);
                    data_low = data_low.substr(result + term.length);
                }
                new_node.appendChild(document.createTextNode(data));
            }
        } else {
            // Keep going onto other elements
            dwv.html.highlight(term, node);
        }
    }
};

/**
 * Highlight a HTML node.
 * @method createHighlightNode
 * @static
 * @param {Object} child The child to highlight.
 * @return {Object} The created HTML node.
 */
dwv.html.createHighlightNode = function(child) {
    var node = document.createElement('span');
    node.setAttribute('class', 'highlighted');
    node.attributes['class'].value = 'highlighted';
    node.appendChild(child);
    return node;
};

/**
 * Remove all children of a HTML node.
 * @method cleanNode
 * @static
 * @param {Object} node The node to remove kids.
 */
dwv.html.cleanNode = function(node) {
    // remove its children
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
};

/**
 * Remove a HTML node and all its children.
 * @method removeNode
 * @static
 * @param {String} nodeId The string id of the node to delete.
 */
dwv.html.removeNode = function(nodeId) {
    // find the node
    var node = document.getElementById(nodeId);
    // check node
    if( !node ) {
        return;
    }
    // remove its children
    dwv.html.cleanNode(node);
    // remove it from its parent
    var top = node.parentNode;
    top.removeChild(node);
};

/**
 * Create a HTML select from an input array of options.
 * The values of the options are the name of the option made lower case.
 * It is left to the user to set the 'onchange' method of the select.
 * @method createHtmlSelect
 * @static
 * @param {String} name The name of the HTML select.
 * @param {Mixed} list The list of options of the HTML select.
 * @return {Object} The created HTML select.
 */
dwv.html.createHtmlSelect = function(name, list) {
    // select
    var select = document.createElement("select");
    select.id = name;
    select.name = name;
    // options
    var option;
    if( list instanceof Array )
    {
        for ( var i in list )
        {
            option = document.createElement("option");
            option.value = list[i];
            option.appendChild(document.createTextNode(dwv.utils.capitaliseFirstLetter(list[i])));
            select.appendChild(option);
        }
    }
    else if( typeof list === 'object')
    {
        for ( var item in list )
        {
            option = document.createElement("option");
            option.value = item;
            option.appendChild(document.createTextNode(dwv.utils.capitaliseFirstLetter(item)));
            select.appendChild(option);
        }
    }
    else
    {
        throw new Error("Unsupported input list type.");
    }
    return select;
};

/**
 * Get a list of parameters from an input URI that looks like:
 *  [dwv root]?input=encodeURI([root]?key0=value0&key1=value1)
 * or
 *  [dwv root]?input=encodeURI([manifest link])&type=manifest
 *  
 * @method getUriParam
 * @static
 * @param {String } uri The URI to decode.
 * @return {Array} The array of parameters.
 */
dwv.html.getUriParam = function(uri)
{
    var inputUri = uri || window.location.href;
    // split key/value pairs
    var mainQueryPairs = dwv.utils.splitQueryString(inputUri);
    // check pairs
    if( Object.keys(mainQueryPairs).length === 0 ) {
        return null;
    }
    // has to have an input key
    var query = mainQueryPairs.query;
    if( !query || !query.input ) { 
        throw new Error("No input parameter in query URI.");
    }
    
    var result = [];
    // if manifest
    if( query.type && query.type === "manifest" ) {
        result = dwv.html.decodeManifestUri( query.input, query.nslices );
    }
    // if key/value uri
    else {
        result = dwv.html.decodeKeyValueUri( query.input, query.dwvReplaceMode );
    }
   
    return result;
};

/**
 * Decode a Key/Value pair uri. If a key is repeated, the result 
 * be an array of base + each key. 
 * @method decodeKeyValueUri
 * @static
 * @param {String} uri The uri to decode.
 * @param {String} replaceMode The key replace more.
 */
dwv.html.decodeKeyValueUri = function(uri, replaceMode)
{
    var result = [];

    // repeat key replace mode (default to keep key)
    var repeatKeyReplaceMode = "key";
    if( replaceMode ) {
        repeatKeyReplaceMode = replaceMode;
    }

    // decode input URI
    var queryUri = decodeURIComponent(uri);
    // get key/value pairs from input URI
    var inputQueryPairs = dwv.utils.splitQueryString(queryUri);
    if ( Object.keys(inputQueryPairs).length === 0 ) 
    {
        result.push(queryUri);
    }
    else
    {
        var keys = Object.keys(inputQueryPairs.query);
        // find repeat key
        var repeatKey = null;
        for( var i = 0; i < keys.length; ++i )
        {
            if( inputQueryPairs.query[keys[i]] instanceof Array )
            {
                repeatKey = keys[i];
                break;
            }
        }
    
        if( !repeatKey ) 
        {
            result.push(queryUri);
        }
        else
        {
            var repeatList = inputQueryPairs.query[repeatKey];
            // build base uri
            var baseUrl = inputQueryPairs.base;
            // do not add '?' when the repeatKey is 'file'
            // root/path/to/?file=0.jpg&file=1.jpg
            if( repeatKey !== "file" ) { 
                baseUrl += "?";
            }
            var gotOneArg = false;
            for( var j = 0; j < keys.length; ++j )
            {
                if( keys[j] !== repeatKey ) {
                    if( gotOneArg ) {
                        baseUrl += "&";
                    }
                    baseUrl += keys[j] + "=" + inputQueryPairs.query[keys[j]];
                    gotOneArg = true;
                }
            }
            // append built urls to result
            var url;
            for( var k = 0; k < repeatList.length; ++k )
            {
                url = baseUrl;
                if( gotOneArg ) {
                    url += "&";
                }
                if( repeatKeyReplaceMode === "key" ) {
                    url += repeatKey + "=";
                }
                // other than 'key' mode: do nothing
                url += repeatList[k];
                result.push(url);
            }
        }
    }
    // return
    return result;
};

/**
 * Decode a manifest uri. 
 * @method decodeManifestUri
 * @static
 * @param {String} uri The uri to decode.
 * @param {number} nslices The number of slices to load.
 */
dwv.html.decodeManifestUri = function(uri, nslices)
{
    var result = [];
    
    // Request error
    var onErrorRequest = function(/*event*/)
    {
        console.warn( "RequestError while receiving manifest: "+this.status );
    };

    // Request handler
    var onLoadRequest = function(/*event*/)
    {
        result = dwv.html.decodeManifest(this.responseXML, nslices);
    };
    
    var request = new XMLHttpRequest();
    // synchronous request (third parameter)
    request.open('GET', decodeURIComponent(uri), false);
    request.responseType = "xml"; 
    request.onload = onLoadRequest;
    request.onerror = onErrorRequest;
    //request.onprogress = dwv.gui.updateProgress;
    request.send(null);

    // return
    return result;
};

/**
 * Decode an XML manifest. 
 * @method decodeManifest
 * @static
 * @param {Object} manifest The manifest to decode.
 * @param {Number} nslices The number of slices to load.
 */
dwv.html.decodeManifest = function(manifest, nslices)
{
    var result = [];
    // wado url
    var wadoElement = manifest.getElementsByTagName("wado_query");
    var wadoURL = wadoElement[0].getAttribute("wadoURL");
    var rootURL = wadoURL + "?requestType=WADO&contentType=application/dicom&";
    // patient list
    var patientList = manifest.getElementsByTagName("Patient");
    if( patientList.length > 1 ) {
        console.warn("More than one patient, loading first one.");
    }
    // study list
    var studyList = patientList[0].getElementsByTagName("Study");
    if( studyList.length > 1 ) {
        console.warn("More than one study, loading first one.");
    }
    var studyUID = studyList[0].getAttribute("StudyInstanceUID");
    // series list
    var seriesList = studyList[0].getElementsByTagName("Series");
    if( seriesList.length > 1 ) {
        console.warn("More than one series, loading first one.");
    }
    var seriesUID = seriesList[0].getAttribute("SeriesInstanceUID");
    // instance list
    var instanceList = seriesList[0].getElementsByTagName("Instance");
    // loop on instances and push links
    var max = instanceList.length;
    if( nslices < max ) {
        max = nslices;
    }
    for( var i = 0; i < max; ++i ) {
        var sopInstanceUID = instanceList[i].getAttribute("SOPInstanceUID");
        var link = rootURL + 
        "&studyUID=" + studyUID +
        "&seriesUID=" + seriesUID +
        "&objectUID=" + sopInstanceUID;
        result.push( link );
    }
    // return
    return result;
};

/**
 * Display or not an element.
 * @method displayElement
 * @static
 * @param {Number} id The id of the element to toggle its display.
 * @param {Boolean} flag True to display the element.
 */
dwv.html.displayElement = function (id, flag)
{
    var element = document.getElementById(id);
    if ( element ) {
        element.style.display = flag ? "" : "none";
    }
};

/**
 * Toggle the display of an element.
 * @method toggleDisplay
 * @static
 * @param {Number} id The id of the element to toggle its display.
 */
dwv.html.toggleDisplay = function (id)
{
    var element = document.getElementById(id);
    if ( element ) {
        if ( element.style.display === "none" ) {
            element.style.display = '';
        }
        else {
            element.style.display = "none";
        }
    }
};

/**
 * Append an element.
 * @method appendElement
 * @static
 * @param {Number} parentId The id of the element to append to.
 * @param {Object} element The element to append.
 */
dwv.html.appendElement = function (parentId, element)
{
    var node = document.getElementById(parentId);
    if ( element ) {
        // append
        node.appendChild(element);
        // trigger create event (mobile)
        $('#'+parentId).trigger("create");
    }
};

/**
 * Create an element.
 * @method createElement
 * @static
 * @param {String} type The type of the elemnt.
 * @param {Number} id The id of the element
 */
dwv.html.createHiddenElement = function (type, id)
{
    var element = document.createElement(type);
    element.id = id;
    // hide by default
    element.style.display = "none";
    // return
    return element;
};


/*viewer/src/gui/layer.js*/

/** 
 * HTML module.
 * @module html
 */
var dwv = dwv || {};
dwv.html = dwv.html || {};

/**
 * Window layer.
 * @class Layer
 * @namespace dwv.html
 * @constructor
 * @param {String} name The name of the layer.
 */
dwv.html.Layer = function(name)
{
    /**
     * The associated HTMLCanvasElement.
     * @property canvas
     * @private
     * @type Object
     */
    var canvas = null;
    /**
     * A cache of the initial canvas.
     * @property cacheCanvas
     * @private
     * @type Object
     */
    var cacheCanvas = null;
    /**
     * The associated CanvasRenderingContext2D.
     * @property context
     * @private
     * @type Object
     */
    var context = null;
    
    /**
     * Get the layer name.
     * @method getName
     * @return {String} The layer name.
     */
    this.getName = function() { return name; };
    /**
     * Get the layer canvas.
     * @method getCanvas
     * @return {Object} The layer canvas.
     */
    this.getCanvas = function() { return canvas; };
    /**
     * Get the layer context.
     * @method getContext
     * @return {Object} The layer context.
     */
    this.getContext = function() { return context; };
    /**
     * Get the layer offset on page.
     * @method getOffset
     * @return {Number} The layer offset on page.
     */
    this.getOffset = function() { return $('#'+name).offset(); };

    /**
     * The image data array.
     * @property imageData
     * @private
     * @type Array
     */
    var imageData = null;
    
    /**
     * The layer origin.
     * @property origin
     * @private
     * @type {Object}
     */
    var origin = {'x': 0, 'y': 0};
    /**
     * Get the layer origin.
     * @method getOrigin
     * @returns {Object} The layer origin as {'x','y'}.
     */
    this.getOrigin = function () {
        return origin;
    };
    /**
     * The image zoom.
     * @property zoom
     * @private
     * @type {Object}
     */
    var zoom = {'x': 1, 'y': 1};
    /**
     * Get the layer zoom.
     * @method getZoom
     * @returns {Object} The layer zoom as {'x','y'}.
     */
    this.getZoom = function () {
        return zoom;
    };
    
    /**
     * Set the canvas width.
     * @method setWidth
     * @param {Number} width The new width.
     */
    this.setWidth = function ( width ) {
        canvas.width = width;
    };
    /**
     * Set the canvas height.
     * @method setHeight
     * @param {Number} height The new height.
     */
    this.setHeight = function ( height ) {
        canvas.height = height;
    };
    
    /**
     * Set the layer zoom.
     * @method setZoom
     * @param {Number} newZoomX The zoom in the X direction.
     * @param {Number} newZoomY The zoom in the Y direction.
     * @param {Number} centerX The zoom center in the X direction.
     * @param {Number} centerY The zoom center in the Y direction.
     */
    this.zoom = function(newZoomX,newZoomY,centerX,centerY)
    {
        // The zoom is the ratio between the differences from the center
        // to the origins:
        // centerX - originX = ( centerX - originX0 ) * zoomX
        // (center in ~world coordinate system)  
        //originX = (centerX / zoomX) + originX - (centerX / newZoomX);
        //originY = (centerY / zoomY) + originY - (centerY / newZoomY);
        
        // center in image coordinate system        
        origin.x = centerX - (centerX - origin.x) * (newZoomX / zoom.x);
        origin.y = centerY - (centerY - origin.y) * (newZoomY / zoom.y);

        // save zoom
        zoom.x = newZoomX;
        zoom.y = newZoomY;
    };
    
    /**
     * Set the layer translation.
     * Translation is according to the last one.
     * @method setTranslate
     * @param {Number} tx The translation in the X direction.
     * @param {Number} ty The translation in the Y direction.
     */
    this.translate = function(tx,ty)
    {
        // new origin
        origin.x += tx * zoom.x;
        origin.y += ty * zoom.y;
    };
    
    /**
     * Set the image data array.
     * @method setImageData
     * @param {Array} data The data array.
     */
    this.setImageData = function(data)
    {
        imageData = data;
        // update the cached canvas
        cacheCanvas.getContext("2d").putImageData(imageData, 0, 0);
    };
    
    /**
     * Reset the layout.
     * @method resetLayout
     */ 
    this.resetLayout = function(izoom)
    {
        origin.x = 0;
        origin.y = 0;
        zoom.x = izoom;
        zoom.y = izoom;
    };
    
    /**
     * Transform a display position to an index.
     * @method displayToIndex
     */ 
    this.displayToIndex = function ( point2D ) {
        return {'x': (point2D.x - origin.x) / zoom.x,
            'y': (point2D.y - origin.y) / zoom.y };
    };
    
    /**
     * Draw the content (imageData) of the layer.
     * The imageData variable needs to be set
     * @method draw
     */
    this.draw = function ()
    {
        // clear the context: reset the transform first
        // store the current transformation matrix
        context.save();
        // use the identity matrix while clearing the canvas
        context.setTransform( 1, 0, 0, 1, 0, 0 );
        context.clearRect( 0, 0, canvas.width, canvas.height );
        // restore the transform
        context.restore();
        
        // draw the cached canvas on the context
        // transform takes as input a, b, c, d, e, f to create
        // the transform matrix (column-major order):
        // [ a c e ]
        // [ b d f ]
        // [ 0 0 1 ]
        context.setTransform( zoom.x, 0, 0, zoom.y, origin.x, origin.y );
        context.drawImage( cacheCanvas, 0, 0 );
    };
    
    /**
     * Initialise the layer: set the canvas and context
     * @method initialise
     * @input {Number} inputWidth The width of the canvas.
     * @input {Number} inputHeight The height of the canvas.
     */
    this.initialise = function(inputWidth, inputHeight)
    {
        // find the canvas element
        canvas = document.getElementById(name);
        if (!canvas)
        {
            alert("Error: cannot find the canvas element for '" + name + "'.");
            return;
        }
        // check that the getContext method exists
        if (!canvas.getContext)
        {
            alert("Error: no canvas.getContext method for '" + name + "'.");
            return;
        }
        // get the 2D context
        context = canvas.getContext('2d');
        if (!context)
        {
            alert("Error: failed to get the 2D context for '" + name + "'.");
            return;
        }
        // canvas sizes
        canvas.width = inputWidth;
        canvas.height = inputHeight;
        // original empty image data array
        context.clearRect (0, 0, canvas.width, canvas.height);
        imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        // cached canvas
        cacheCanvas = document.createElement("canvas");
        cacheCanvas.width = inputWidth;
        cacheCanvas.height = inputHeight;
    };
    
    /**
     * Fill the full context with the current style.
     * @method fillContext
     */
    this.fillContext = function()
    {
        context.fillRect( 0, 0, canvas.width, canvas.height );
    };
    
    /**
     * Clear the context and reset the image data.
     * @method clear
     */
    this.clear = function()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
        imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        this.resetLayout();
    };
    /**
     * Merge two layers.
     * @method merge
     * @input {Layer} layerToMerge The layer to merge. It will also be emptied.
     */
    this.merge = function(layerToMerge)
    {
        // basic resampling of the merge data to put it at zoom 1:1
        var mergeImageData = layerToMerge.getContext().getImageData(
            0, 0, canvas.width, canvas.height);
        var offMerge = 0;
        var offMergeJ = 0;
        var offThis = 0;
        var offThisJ = 0;
        var alpha = 0;
        for( var j=0; j < canvas.height; ++j ) {
            offMergeJ = parseInt( (origin.y + j * zoom.y), 10 ) * canvas.width;
            offThisJ = j * canvas.width;
            for( var i=0; i < canvas.width; ++i ) {
                // 4 component data: RGB + alpha
                offMerge = 4 * ( parseInt( (origin.x + i * zoom.x), 10 ) + offMergeJ );
                offThis = 4 * ( i + offThisJ );
                // merge non transparent 
                alpha = mergeImageData.data[offMerge+3];
                if( alpha !== 0 ) {
                    imageData.data[offThis] = mergeImageData.data[offMerge];
                    imageData.data[offThis+1] = mergeImageData.data[offMerge+1];
                    imageData.data[offThis+2] = mergeImageData.data[offMerge+2];
                    imageData.data[offThis+3] = alpha;
                }
            }
        }
        // empty and reset merged layer
        layerToMerge.clear();
        // draw the layer
        this.draw();
    };
    
    /**
     * Set the line color for the layer.
     * @method setLineColor
     * @input {String} color The line color.
     */
    this.setLineColor = function(color)
    {
        context.fillStyle = color;
        context.strokeStyle = color;
    };
    
    /**
     * Display the layer.
     * @method setStyleDisplay
     * @input {Boolean} val Whether to display the layer or not.
     */
    this.setStyleDisplay = function(val)
    {
        if( val === true )
        {
            canvas.style.display = '';
        }
        else
        {
            canvas.style.display = "none";
        }
    };
    
    /**
     * Check if the layer is visible.
     * @method isVisible
     * @return {Boolean} True if the layer is visible.
     */
    this.isVisible = function()
    {
        if( canvas.style.display === "none" ) {
            return false;
        }
        else {
            return true;
        }
    };
    
    /**
     * Align on another layer.
     * @method align
     * @param {Layer} rhs The layer to align on.
     */
    this.align = function(rhs)
    {
        canvas.style.top = rhs.getCanvas().offsetTop;
        canvas.style.left = rhs.getCanvas().offsetLeft;
    };
}; // Layer class

/**
 * Get the offset of an input event.
 * @method getEventOffset
 * @static
 * @param {Object} event The event to get the offset from.
 * @return {Array} The array of offsets.
 */
dwv.html.getEventOffset = function (event) {
    var positions = [];
    var ex = 0;
    var ey = 0;
    if ( event.targetTouches ) {
        var touch = null;
        for ( var i = 0 ; i < event.targetTouches.length; ++i ) {
            touch = event.targetTouches[i];
            ex = touch.pageX - app.getImageLayer().getOffset().left;
            ey = touch.pageY - app.getImageLayer().getOffset().top;
            positions.push({'x': ex, 'y': ey});
        }
    }
    else {
        // layerX is used by Firefox
        ex = event.offsetX === undefined ? event.layerX : event.offsetX;
        ey = event.offsetY === undefined ? event.layerY : event.offsetY;
        positions.push({'x': ex, 'y': ey});
    }
    return positions;
};


/*viewer/src/gui/loader.js*/

/** 
 * GUI module.
 * @module gui
 */
var dwv = dwv || {};
/**
 * Namespace for GUI functions.
 * @class gui
 * @namespace dwv
 * @static
 */
dwv.gui = dwv.gui || {};
dwv.gui.base = dwv.gui.base || {};

/**
 * Append the loadbox HTML to the page.
 * @method appendLoadboxHtml
 * @static
 */
dwv.gui.base.appendLoadboxHtml = function()
{
    // loader select
    var loaderSelector = dwv.html.createHtmlSelect("loaderSelect",dwv.io.loaders);
    loaderSelector.onchange = dwv.gui.onChangeLoader;
    
    // node
    var node = document.getElementById("loaderlist");
    // clear it
    while(node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
    // append
    node.appendChild(loaderSelector);
    // trigger create event (mobile)
    $("#loaderlist").trigger("create");
};

/**
 * Append the file load HTML to the page.
 * @method appendFileLoadHtml
 * @static
 */
dwv.gui.base.appendFileLoadHtml = function()
{
    // input
    var fileLoadInput = document.createElement("input");
    fileLoadInput.onchange = dwv.gui.onChangeFiles;
    fileLoadInput.type = "file";
    fileLoadInput.multiple = true;
    fileLoadInput.id = "imagefiles";
    fileLoadInput.setAttribute("data-clear-btn","true");
    fileLoadInput.setAttribute("data-mini","true");
	fileLoadInput.style.width="350px";

    // associated div
    var fileLoadDiv = document.createElement("div");
    fileLoadDiv.id = "imagefilesdiv";
    fileLoadDiv.style.display = "none";
    fileLoadDiv.appendChild(fileLoadInput);
    
    // node
    var node = document.getElementById("loaderlist");
    // append
    node.appendChild(fileLoadDiv);
    // trigger create event (mobile)
    $("#loaderlist").trigger("create");
};

/**
 * Display the file load HTML.
 * @method clearUrlLoadHtml
 * @static
 * @param {Boolean} bool True to display, false to hide.
 */
dwv.gui.base.displayFileLoadHtml = function(bool)
{
    // file div element
    var filediv = document.getElementById("imagefilesdiv");
    filediv.style.display = bool ? "" : "none";
};

/**
 * Append the url load HTML to the page.
 * @method appendUrlLoadHtml
 * @static
 */
dwv.gui.base.appendUrlLoadHtml = function()
{
    // input
    var urlLoadInput = document.createElement("input");
    //urlLoadInput.onchange = dwv.gui.onChangeURL;
	if(g_arr_urlselect){
		g_arr_urlselect(false,urlLoadInput);
		urlLoadInput.onkeydown=g_arr_urlselect;
	}
    urlLoadInput.type = "url";
    urlLoadInput.id = "imageurl";
	urlLoadInput.style.width="350px";
    urlLoadInput.setAttribute("data-clear-btn","true");
    urlLoadInput.setAttribute("data-mini","true");	

    // associated div
    var urlLoadDiv = document.createElement("div");
    urlLoadDiv.id = "imageurldiv";
    urlLoadDiv.style.display = "none";
    urlLoadDiv.appendChild(urlLoadInput);

    // node
    var node = document.getElementById("loaderlist");
    // append
    node.appendChild(urlLoadDiv);
    // trigger create event (mobile)
    $("#loaderlist").trigger("create");
};

/**
 * Display the url load HTML.
 * @method clearUrlLoadHtml
 * @static
 * @param {Boolean} bool True to display, false to hide.
 */
dwv.gui.base.displayUrlLoadHtml = function(bool)
{
    // url div element
    var urldiv = document.getElementById("imageurldiv");
    urldiv.style.display = bool ? "" : "none";
};


/*viewer/src/gui/style.js*/

/** 
 * HTML module.
 * @module html
 */
var dwv = dwv || {};
dwv.html = dwv.html || {};

/**
 * Style class.
 * @class Style
 * @namespace dwv.html
 * @constructor
 */
dwv.html.Style = function()
{
    /**
     * Font size.
     * @property fontSize
     * @private
     * @type Number
     */
    var fontSize = 12;
    /**
     * Font definition string.
     * @property fontStr
     * @private
     * @type String
     */
    var fontStr = "normal "+this.fontSize+"px sans-serif";
    /**
     * Line height.
     * @property lineHeight
     * @private
     * @type Number
     */
    var lineHeight = this.fontSize + this.fontSize/5;
    /**
     * Text color.
     * @property textColor
     * @private
     * @type String
     */
    var textColor = "#fff";
    /**
     * Line color.
     * @property lineColor
     * @private
     * @type String
     */
    var lineColor = 0;
    
    /**
     * Get the font size.
     * @method getFontSize
     * @return {Number} The font size.
     */
    dwv.html.Style.prototype.getFontSize = function() { return fontSize; };

    /**
     * Get the font definition string.
     * @method getFontStr
     * @return {String} The font definition string.
     */
    dwv.html.Style.prototype.getFontStr = function() { return fontStr; };

    /**
     * Get the line height.
     * @method getLineHeight
     * @return {Number} The line height.
     */
    dwv.html.Style.prototype.getLineHeight = function() { return lineHeight; };

    /**
     * Get the text color.
     * @method getTextColor
     * @return {String} The text color.
     */
    dwv.html.Style.prototype.getTextColor = function() { return textColor; };

    /**
     * Get the line color.
     * @method getLineColor
     * @return {String} The line color.
     */
    dwv.html.Style.prototype.getLineColor = function() { return lineColor; };

    /**
     * Set the line color.
     * @method setLineColor
     * @param {String} color The line color.
     */
    dwv.html.Style.prototype.setLineColor = function(color) { lineColor = color; };
};


/*viewer/src/gui/tools.js*/

/** 
 * GUI module.
 * @module gui
 */
var dwv = dwv || {};
/**
 * Namespace for GUI functions.
 * @class gui
 * @namespace dwv
 * @static
 */
dwv.gui = dwv.gui || {};
dwv.gui.base = dwv.gui.base || {};

/**
 * Append the toolbox HTML to the page.
 * @method appendToolboxHtml
 * @static
 */
dwv.gui.base.appendToolboxHtml = function()
{
    // tool select
    var toolSelector = dwv.html.createHtmlSelect("toolSelect",dwv.tool.tools);
    toolSelector.onchange = dwv.gui.onChangeTool;
    
    // tool list element
    var toolLi = document.createElement("li");
    toolLi.id = "toolLi";
    toolLi.style.display = "none";
    toolLi.appendChild(toolSelector);
    toolLi.setAttribute("class","ui-block-a");

    // node
    var node = document.getElementById("toolList");
    // clear it
    while(node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
    // append
    node.appendChild(toolLi);
    // trigger create event (mobile)
    $("#toolList").trigger("create");
};

/**
 * Display the toolbox HTML.
 * @method displayToolboxHtml
 * @static
 * @param {Boolean} bool True to display, false to hide.
 */
dwv.gui.base.displayToolboxHtml = function(bool)
{
    // tool list element
    dwv.html.displayElement("toolLi", bool);
};

/**
 * Initialise the toolbox HTML.
 * @method initToolboxHtml
 * @static
 */
dwv.gui.base.initToolboxHtml = function()
{
    // tool select: reset selected option
    var toolSelector = document.getElementById("toolSelect");
    toolSelector.selectedIndex = 0;
    dwv.gui.refreshSelect("#toolSelect");
};

/**
 * Append the window/level HTML to the page.
 * @method appendWindowLevelHtml
 * @static
 */
dwv.gui.base.appendWindowLevelHtml = function()
{
    // preset select
    var wlSelector = dwv.html.createHtmlSelect("presetSelect",dwv.tool.presets);
    wlSelector.onchange = dwv.gui.onChangeWindowLevelPreset;
    // colour map select
    var cmSelector = dwv.html.createHtmlSelect("colourMapSelect",dwv.tool.colourMaps);
    cmSelector.onchange = dwv.gui.onChangeColourMap;

    // preset list element
    var wlLi = document.createElement("li");
    wlLi.id = "wlLi";
    wlLi.style.display = "none";
    wlLi.appendChild(wlSelector);
    wlLi.setAttribute("class","ui-block-b");
    // color map list element
    var cmLi = document.createElement("li");
    cmLi.id = "cmLi";
    cmLi.style.display = "none";
    cmLi.appendChild(cmSelector);
    cmLi.setAttribute("class","ui-block-c");

    // node
    var node = document.getElementById("toolList");
    // append preset
    node.appendChild(wlLi);
    // append color map
    node.appendChild(cmLi);
    // trigger create event (mobile)
    $("#toolList").trigger("create");
};

/**
 * Display the window/level HTML.
 * @method displayWindowLevelHtml
 * @static
 * @param {Boolean} bool True to display, false to hide.
 */
dwv.gui.base.displayWindowLevelHtml = function(bool)
{
    // presets list element
    dwv.html.displayElement("wlLi", bool);
    // color map list element
    dwv.html.displayElement("cmLi", bool);
};

/**
 * Initialise the window/level HTML.
 * @method initWindowLevelHtml
 * @static
 */
dwv.gui.base.initWindowLevelHtml = function()
{
    // create new preset select
    var wlSelector = dwv.html.createHtmlSelect("presetSelect",dwv.tool.presets);
    wlSelector.onchange = dwv.gui.onChangeWindowLevelPreset;
    wlSelector.title = "Select w/l preset.";
    
    // copy html list
    var wlLi = document.getElementById("wlLi");
    // clear node
    dwv.html.cleanNode(wlLi);
    // add children
    wlLi.appendChild(wlSelector);
    $("#toolList").trigger("create");
    
    // colour map select
    var cmSelector = document.getElementById("colourMapSelect");
    cmSelector.selectedIndex = 0;
    // special monochrome1 case
    if( app.getImage().getPhotometricInterpretation() === "MONOCHROME1" )
    {
        cmSelector.selectedIndex = 1;
    }
    dwv.gui.refreshSelect("#colourMapSelect");
};

/**
 * Append the draw HTML to the page.
 * @method appendDrawHtml
 * @static
 */
dwv.gui.base.appendDrawHtml = function()
{
    // shape select
    var shapeSelector = dwv.html.createHtmlSelect("shapeSelect",dwv.tool.shapes);
    shapeSelector.onchange = dwv.gui.onChangeShape;
    // colour select
    var colourSelector = dwv.html.createHtmlSelect("colourSelect",dwv.tool.colors);
    colourSelector.onchange = dwv.gui.onChangeLineColour;

    // shape list element
    var shapeLi = document.createElement("li");
    shapeLi.id = "shapeLi";
    shapeLi.style.display = "none";
    shapeLi.appendChild(shapeSelector);
    shapeLi.setAttribute("class","ui-block-c");
    // colour list element
    var colourLi = document.createElement("li");
    colourLi.id = "colourLi";
    colourLi.style.display = "none";
    colourLi.appendChild(colourSelector);
    colourLi.setAttribute("class","ui-block-b");
    
    // node
    var node = document.getElementById("toolList");
    // apend shape
    node.appendChild(shapeLi);
    // append color
    node.appendChild(colourLi);
    // trigger create event (mobile)
    $("#toolList").trigger("create");
};

/**
 * Display the draw HTML.
 * @method displayDrawHtml
 * @static
 * @param {Boolean} bool True to display, false to hide.
 */
dwv.gui.base.displayDrawHtml = function(bool)
{
    // color list element
    dwv.html.displayElement("colourLi", bool);
    // shape list element
    dwv.html.displayElement("shapeLi", bool);
};

/**
 * Initialise the draw HTML.
 * @method displayDrawHtml
 * @static
 * */
dwv.gui.base.initDrawHtml = function()
{
    // shape select: reset selected option
    var shapeSelector = document.getElementById("shapeSelect");
    shapeSelector.selectedIndex = 0;
    dwv.gui.refreshSelect("#shapeSelect");
    // color select: reset selected option
    var colourSelector = document.getElementById("colourSelect");
    colourSelector.selectedIndex = 0;
    dwv.gui.refreshSelect("#colourSelect");
};

/**
 * Append the color chooser HTML to the page.
 * @method appendLivewireHtml
 * @static
 */
dwv.gui.base.appendLivewireHtml = function()
{
    // colour select
    var colourSelector = dwv.html.createHtmlSelect("lwColourSelect",dwv.tool.colors);
    colourSelector.onchange = dwv.gui.onChangeLineColour;
    
    // colour list element
    var colourLi = document.createElement("li");
    colourLi.id = "lwColourLi";
    colourLi.style.display = "none";
    colourLi.setAttribute("class","ui-block-b");
    colourLi.appendChild(colourSelector);
    
    // node
    var node = document.getElementById("toolList");
    // apend colour
    node.appendChild(colourLi);
    // trigger create event (mobile)
    $("#toolList").trigger("create");
};

/**
 * Display the livewire HTML.
 * @method displayLivewireHtml
 * @static
 * @param {Boolean} bool True to display, false to hide.
 */
dwv.gui.base.displayLivewireHtml = function(bool)
{
    // colour list
    dwv.html.displayElement("lwColourLi", bool);
};

/**
 * Initialise the livewire HTML.
 * @method initLivewireHtml
 * @static
 */
dwv.gui.base.initLivewireHtml = function()
{
    var colourSelector = document.getElementById("lwColourSelect");
    colourSelector.selectedIndex = 0;
    dwv.gui.refreshSelect("#lwColourSelect");
};

/**
 * Append the ZoomAndPan HTML to the page.
 * @method appendZoomAndPanHtml
 * @static
 */
dwv.gui.base.appendZoomAndPanHtml = function()
{
    // reset button
    var button = document.createElement("button");
    button.id = "zoomResetButton";
    button.name = "zoomResetButton";
    button.onclick = dwv.gui.onZoomReset;
    button.setAttribute("style","width:100%; margin-top:0.1em;");
    button.setAttribute("class","ui-btn ui-btn-b");
    var text = document.createTextNode("Reset");
    button.appendChild(text);
    
    // list element
    var liElement = document.createElement("li");
    liElement.id = "zoomLi";
    liElement.style.display = "none";
    liElement.setAttribute("class","ui-block-c");
    liElement.appendChild(button);
    
    // node
    var node = document.getElementById("toolList");
    // append element
    node.appendChild(liElement);
    // trigger create event (mobile)
    $("#toolList").trigger("create");
};

/**
 * Display the ZoomAndPan HTML.
 * @method displayZoomAndPanHtml
 * @static
 * @param {Boolean} bool True to display, false to hide.
 */
dwv.gui.base.displayZoomAndPanHtml = function(bool)
{
    // display list element
    dwv.html.displayElement("zoomLi", bool);
};

/**
 * Append the Scroll HTML to the page.
 * @method appendScrollHtml
 * @static
 */
dwv.gui.base.appendScrollHtml = function()
{
    // list element
    var liElement = document.createElement("li");
    liElement.id = "scrollLi";
    liElement.style.display = "none";
    liElement.setAttribute("class","ui-block-c");
    
    // node
    var node = document.getElementById("toolList");
    // append element
    node.appendChild(liElement);
    // trigger create event (mobile)
    $("#toolList").trigger("create");
};

/**
 * Display the Scroll HTML.
 * @method displayScrollHtml
 * @static
 * @param {Boolean} bool True to display, false to hide.
 */
dwv.gui.base.displayScrollHtml = function(bool)
{
    // display list element
    dwv.html.displayElement("scrollLi", bool);
};


/*viewer/src/gui/undo.js*/

/** 
 * GUI module.
 * @module gui
 */
var dwv = dwv || {};
/**
 * Namespace for GUI functions.
 * @class gui
 * @namespace dwv
 * @static
 */
dwv.gui = dwv.gui || {};
dwv.gui.base = dwv.gui.base || {};

/**
 * Append the undo HTML to the page.
 * @method appendUndoHtml
 * @static
 */
dwv.gui.base.appendUndoHtml = function()
{
    var paragraph = document.createElement("p");  
    paragraph.appendChild(document.createTextNode("History:"));
    paragraph.appendChild(document.createElement("br"));
    
    var select = document.createElement("select");
    select.id = "history_list";
    select.name = "history_list";
    select.multiple = "multiple";
    paragraph.appendChild(select);

    // node
    var node = document.getElementById("history");
    // clear it
    while(node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
    // append
    node.appendChild(paragraph);
};

/**
 * Clear the command list of the undo HTML.
 * @method cleanUndoHtml
 * @static
 */
dwv.gui.cleanUndoHtml = function ()
{
    var select = document.getElementById("history_list");
    if ( select && select.length !== 0 ) {
        for( var i = select.length - 1; i >= 0; --i)
        {
            select.remove(i);
        }
    }
};

/**
 * Add a command to the undo HTML.
 * @method addCommandToUndoHtml
 * @static
 * @param {String} commandName The name of the command to add.
 */
dwv.gui.addCommandToUndoHtml = function(commandName)
{
    var select = document.getElementById("history_list");
    // remove undone commands
    var count = select.length - (select.selectedIndex+1);
    if( count > 0 )
    {
        for( var i = 0; i < count; ++i)
        {
            select.remove(select.length-1);
        }
    }
    // add new option
    var option = document.createElement("option");
    option.text = commandName;
    option.value = commandName;
    select.add(option);
    // increment selected index
    select.selectedIndex++;
};

/**
 * Enable the last command of the undo HTML.
 * @method enableInUndoHtml
 * @static
 * @param {Boolean} enable Flag to enable or disable the command.
 */
dwv.gui.enableInUndoHtml = function(enable)
{
    var select = document.getElementById("history_list");
    // enable or not (order is important)
    var option;
    if( enable ) 
    {
        // increment selected index
        select.selectedIndex++;
        // enable option
        option = select.options[select.selectedIndex];
        option.disabled = false;
    }
    else 
    {
        // disable option
        option = select.options[select.selectedIndex];
        option.disabled = true;
        // decrement selected index
        select.selectedIndex--;
    }
};


/*viewer/src/image/filter.js*/

/** 
 * Image module.
 * @module image
 */
var dwv = dwv || {};
dwv.image = dwv.image || {};
dwv.image.filter = dwv.image.filter || {};

/**
 * Threshold an image between an input minimum and maximum.
 * @class Threshold
 * @namespace dwv.image.filter
 * @constructor
 */
dwv.image.filter.Threshold = function()
{
    /**
     * Threshold minimum.
     * @property min
     * @private
     * @type Number
     */
    var min = 0;
    /**
     * Threshold maximum.
     * @property max
     * @private
     * @type Number
     */
    var max = 0;

    /**
     * Get the threshold minimum.
     * @method getMin
     * @return {Number} The threshold minimum.
     */
    this.getMin = function() { return min; };
    /**
     * Set the threshold minimum.
     * @method setMin
     * @param {Number} val The threshold minimum.
     */
    this.setMin = function(val) { min = val; };
    /**
     * Get the threshold maximum.
     * @method getMax
     * @return {Number} The threshold maximum.
     */
    this.getMax = function() { return max; };
    /**
     * Set the threshold maximum.
     * @method setMax
     * @param {Number} val The threshold maximum.
     */
    this.setMax = function(val) { max = val; };
    /**
     * Get the name of the filter.
     * @method getName
     * @return {String} The name of the filter.
     */
    this.getName = function() { return "Threshold"; };
    
    /**
     * Original image.
     * @property originalImage
     * @private
     * @type Object
     */
    var originalImage = null;
    /**
     * Set the original image.
     * @method setOriginalImage
     * @param {Object} image The original image.
     */
    this.setOriginalImage = function (image) { originalImage = image; };
    /**
     * Get the original image.
     * @method setOriginalImage
     * @return {Object} image The original image.
     */
    this.getOriginalImage = function () { return originalImage; };
};

/**
 * Transform the main image using this filter.
 * @method update
 * @return {Object} The transformed image.
 */ 
dwv.image.filter.Threshold.prototype.update = function()
{
    var self = this;
    var imageMin = app.getImage().getDataRange().min;
    self.setOriginalImage( app.getImage() );
    var threshFunction = function(value){
        if(value<self.getMin()||value>self.getMax()) {
            return imageMin;
        }
        else {
            return value;
        }
    };
    return app.getImage().transform( threshFunction );
};

/**
 * Sharpen an image using a sharpen convolution matrix.
 * @class Sharpen
 * @namespace dwv.image.filter
 * @constructor
 */
dwv.image.filter.Sharpen = function()
{
    /**
     * Get the name of the filter.
     * @method getName
     * @return {String} The name of the filter.
     */
    this.getName = function() { return "Sharpen"; };
    /**
     * Original image.
     * @property originalImage
     * @private
     * @type Object
     */
    var originalImage = null;
    /**
     * Set the original image.
     * @method setOriginalImage
     * @param {Object} image The original image.
     */
    this.setOriginalImage = function (image) { originalImage = image; };
    /**
     * Get the original image.
     * @method setOriginalImage
     * @return {Object} image The original image.
     */
    this.getOriginalImage = function () { return originalImage; };
};

/**
 * Transform the main image using this filter.
 * @method update
 * @return {Object} The transformed image.
 */ 
dwv.image.filter.Sharpen.prototype.update = function()
{
    this.setOriginalImage( app.getImage() );
    
    return app.getImage().convolute2D(
        [  0, -1,  0,
          -1,  5, -1,
           0, -1,  0 ] );
};

/**
 * Apply a Sobel filter to an image.
 * @class Sobel
 * @namespace dwv.image.filter
 * @constructor
 */
dwv.image.filter.Sobel = function()
{
    /**
     * Get the name of the filter.
     * @method getName
     * @return {String} The name of the filter.
     */
    this.getName = function() { return "Sobel"; };
    /**
     * Original image.
     * @property originalImage
     * @private
     * @type Object
     */
    var originalImage = null;
    /**
     * Set the original image.
     * @method setOriginalImage
     * @param {Object} image The original image.
     */
    this.setOriginalImage = function (image) { originalImage = image; };
    /**
     * Get the original image.
     * @method setOriginalImage
     * @return {Object} image The original image.
     */
    this.getOriginalImage = function () { return originalImage; };
};

/**
 * Transform the main image using this filter.
 * @method update
 * @return {Object} The transformed image.
 */ 
dwv.image.filter.Sobel.prototype.update = function()
{
    this.setOriginalImage( app.getImage() );
    
    var gradX = app.getImage().convolute2D(
        [ 1,  0,  -1,
          2,  0,  -2,
          1,  0,  -1 ] );

    var gradY = app.getImage().convolute2D(
        [  1,  2,  1,
           0,  0,  0,
          -1, -2, -1 ] );
    
    return gradX.compose( gradY, function(x,y){return Math.sqrt(x*x+y*y);} );
};



/*viewer/src/image/image.js*/

/** 
 * Image module.
 * @module image
 */
var dwv = dwv || {};
dwv.image = dwv.image || {};

/**
 * Image Size class.
 * Supports 2D and 3D images.
 * @class Size
 * @namespace dwv.image
 * @constructor
 * @param {Number} numberOfColumns The number of columns.
 * @param {Number} numberOfRows The number of rows.
 * @param {Number} numberOfSlices The number of slices.
*/
dwv.image.Size = function( numberOfColumns, numberOfRows, numberOfSlices )
{
    /**
     * Get the number of columns.
     * @method getNumberOfColumns
     * @return {Number} The number of columns.
     */ 
    this.getNumberOfColumns = function() { return numberOfColumns; };
    /**
     * Get the number of rows.
     * @method getNumberOfRows
     * @return {Number} The number of rows.
     */ 
    this.getNumberOfRows = function() { return numberOfRows; };
    /**
     * Get the number of slices.
     * @method getNumberOfSlices
     * @return {Number} The number of slices.
     */ 
    this.getNumberOfSlices = function() { return (numberOfSlices || 1.0); };
};

/**
 * Get the size of a slice.
 * @method getSliceSize
 * @return {Number} The size of a slice.
 */ 
dwv.image.Size.prototype.getSliceSize = function() {
    return this.getNumberOfColumns()*this.getNumberOfRows();
};

/**
 * Get the total size.
 * @method getTotalSize
 * @return {Number} The total size.
 */ 
dwv.image.Size.prototype.getTotalSize = function() {
    return this.getSliceSize()*this.getNumberOfSlices();
};

/**
 * Check for equality.
 * @method equals
 * @param {Size} rhs The object to compare to.
 * @return {Boolean} True if both objects are equal.
 */ 
dwv.image.Size.prototype.equals = function(rhs) {
    return rhs !== null &&
        this.getNumberOfColumns() === rhs.getNumberOfColumns() &&
        this.getNumberOfRows() === rhs.getNumberOfRows() &&
        this.getNumberOfSlices() === rhs.getNumberOfSlices();
};

/**
 * Check that coordinates are within bounds.
 * @method isInBounds
 * @param {Number} i The column coordinate.
 * @param {Number} j The row coordinate.
 * @param {Number} k The slice coordinate.
 * @return {Boolean} True if the given coordinates are within bounds.
 */ 
dwv.image.Size.prototype.isInBounds = function( i, j, k ) {
    if( i < 0 || i > this.getNumberOfColumns() - 1 ||
        j < 0 || j > this.getNumberOfRows() - 1 ||
        k < 0 || k > this.getNumberOfSlices() - 1 ) {
        return false;
    }
    return true;
};

/**
 * Image Spacing class. 
 * Supports 2D and 3D images.
 * @class Spacing
 * @namespace dwv.image
 * @constructor
 * @param {Number} columnSpacing The column spacing.
 * @param {Number} rowSpacing The row spacing.
 * @param {Number} sliceSpacing The slice spacing.
 */
dwv.image.Spacing = function( columnSpacing, rowSpacing, sliceSpacing )
{
    /**
     * Get the column spacing.
     * @method getColumnSpacing
     * @return {Number} The column spacing.
     */ 
    this.getColumnSpacing = function() { return columnSpacing; };
    /**
     * Get the row spacing.
     * @method getRowSpacing
     * @return {Number} The row spacing.
     */ 
    this.getRowSpacing = function() { return rowSpacing; };
    /**
     * Get the slice spacing.
     * @method getSliceSpacing
     * @return {Number} The slice spacing.
     */ 
    this.getSliceSpacing = function() { return (sliceSpacing || 1.0); };
};

/**
 * Check for equality.
 * @method equals
 * @param {Spacing} rhs The object to compare to.
 * @return {Boolean} True if both objects are equal.
 */ 
dwv.image.Spacing.prototype.equals = function(rhs) {
    return rhs !== null &&
        this.getColumnSpacing() === rhs.getColumnSpacing() &&
        this.getRowSpacing() === rhs.getRowSpacing() &&
        this.getSliceSpacing() === rhs.getSliceSpacing();
};

/**
 * Image class.
 * Usable once created, optional are:
 * - rescale slope and intercept (default 1:0), 
 * - photometric interpretation (default MONOCHROME2),
 * - planar configuration (default RGBRGB...).
 * @class Image
 * @namespace dwv.image
 * @constructor
 * @param {Size} size The size of the image.
 * @param {Spacing} spacing The spacing of the image.
 * @param {Array} buffer The image data.
 * @param {Array} slicePositions The slice positions.
 */
dwv.image.Image = function(size, spacing, buffer, slicePositions)
{
    /**
     * Rescale slope.
     * @property rescaleSlope
     * @private
     * @type Number
     */
    var rescaleSlope = 1;
    /**
     * Rescale intercept.
     * @property rescaleIntercept
     * @private
     * @type Number
     */
    var rescaleIntercept = 0;
    /**
     * Photometric interpretation (MONOCHROME, RGB...).
     * @property photometricInterpretation
     * @private
     * @type String
     */
    var photometricInterpretation = "MONOCHROME2";
    /**
     * Planar configuration for RGB data (0:RGBRGBRGBRGB... or 1:RRR...GGG...BBB...).
     * @property planarConfiguration
     * @private
     * @type Number
     */
    var planarConfiguration = 0;
    /**
     * Number of components.
     * @property planarConfiguration
     * @private
     * @type Number
     */
    var numberOfComponents = buffer.length / size.getTotalSize();
    /**
     * Meta information.
     * @property meta
     * @private
     * @type Object
     */
    var meta = {};
    
    /**
     * Original buffer.
     * @property originalBuffer
     * @private
     * @type Array
     */
    var originalBuffer = new Int16Array(buffer);
    
    // check slice positions.
    if( typeof(slicePositions) === 'undefined' ) {
        slicePositions = [[0,0,0]];
    }
    
    /**
     * Data range.
     * @property dataRange
     * @private
     * @type Object
     */
    var dataRange = null;
    /**
     * Histogram.
     * @property histogram
     * @private
     * @type Array
     */
    var histogram = null;
     
    /**
     * Get the size of the image.
     * @method getSize
     * @return {Size} The size of the image.
     */ 
    this.getSize = function() { return size; };
    /**
     * Get the spacing of the image.
     * @method getSpacing
     * @return {Spacing} The spacing of the image.
     */ 
    this.getSpacing = function() { return spacing; };
    /**
     * Get the data buffer of the image. TODO dangerous...
     * @method getBuffer
     * @return {Array} The data buffer of the image.
     */ 
    this.getBuffer = function() { return buffer; };
    /**
     * Get the slice positions.
     * @method getSlicePositions
     * @return {Array} The slice positions.
     */ 
    this.getSlicePositions = function() { return slicePositions; };
    
    /**
     * Get the rescale slope.
     * @method getRescaleSlope
     * @return {Number} The rescale slope.
     */ 
    this.getRescaleSlope = function() { return rescaleSlope; };
    /**
     * Set the rescale slope.
     * @method setRescaleSlope
     * @param {Number} rs The rescale slope.
     */ 
    this.setRescaleSlope = function(rs) { rescaleSlope = rs; };
    /**
     * Get the rescale intercept.
     * @method getRescaleIntercept
     * @return {Number} The rescale intercept.
     */ 
    this.getRescaleIntercept = function() { return rescaleIntercept; };
    /**
     * Set the rescale intercept.
     * @method setRescaleIntercept
     * @param {Number} ri The rescale intercept.
     */ 
    this.setRescaleIntercept = function(ri) { rescaleIntercept = ri; };
    /**
     * Get the photometricInterpretation of the image.
     * @method getPhotometricInterpretation
     * @return {String} The photometricInterpretation of the image.
     */ 
    this.getPhotometricInterpretation = function() { return photometricInterpretation; };
    /**
     * Set the photometricInterpretation of the image.
     * @method setPhotometricInterpretation
     * @pqrqm {String} interp The photometricInterpretation of the image.
     */ 
    this.setPhotometricInterpretation = function(interp) { photometricInterpretation = interp; };
    /**
     * Get the planarConfiguration of the image.
     * @method getPlanarConfiguration
     * @return {Number} The planarConfiguration of the image.
     */ 
    this.getPlanarConfiguration = function() { return planarConfiguration; };
    /**
     * Set the planarConfiguration of the image.
     * @method setPlanarConfiguration
     * @param {Number} config The planarConfiguration of the image.
     */ 
    this.setPlanarConfiguration = function(config) { planarConfiguration = config; };
    /**
     * Get the numberOfComponents of the image.
     * @method getNumberOfComponents
     * @return {Number} The numberOfComponents of the image.
     */ 
    this.getNumberOfComponents = function() { return numberOfComponents; };

    /**
     * Get the meta information of the image.
     * @method getMeta
     * @return {Object} The meta information of the image.
     */ 
    this.getMeta = function() { return meta; };
    /**
     * Set the meta information of the image.
     * @method setMeta
     * @param {Object} rhs The meta information of the image.
     */ 
    this.setMeta = function(rhs) { meta = rhs; };

    /**
     * Get value at offset. Warning: No size check...
     * @method getValueAtOffset
     * @param {Number} offset The desired offset.
     * @return {Number} The value at offset.
     */ 
    this.getValueAtOffset = function(offset) {
        return buffer[offset];
    };
    
    /**
     * Clone the image.
     * @method clone
     * @return {Image} A clone of this image.
     */ 
    this.clone = function()
    {
        var copy = new dwv.image.Image(this.getSize(), this.getSpacing(), originalBuffer, slicePositions);
        copy.setRescaleSlope(this.getRescaleSlope());
        copy.setRescaleIntercept(this.getRescaleIntercept());
        copy.setPhotometricInterpretation(this.getPhotometricInterpretation());
        copy.setPlanarConfiguration(this.getPlanarConfiguration());
        copy.setMeta(this.getMeta());
        return copy;
    };
    
    /**
     * Append a slice to the image.
     * @method appendSlice
     * @param {Image} The slice to append.
     */ 
    this.appendSlice = function(rhs)
    {
        // check input
        if( rhs === null ) {
            throw new Error("Cannot append null slice");
        }
        if( rhs.getSize().getNumberOfSlices() !== 1 ) {
            throw new Error("Cannot append more than one slice");
        }
        if( size.getNumberOfColumns() !== rhs.getSize().getNumberOfColumns() ) {
            throw new Error("Cannot append a slice with different number of columns");
        }
        if( size.getNumberOfRows() !== rhs.getSize().getNumberOfRows() ) {
            throw new Error("Cannot append a slice with different number of rows");
        }
        if( photometricInterpretation !== rhs.getPhotometricInterpretation() ) {
            throw new Error("Cannot append a slice with different photometric interpretation");
        }
        // all meta should be equal
        for( var key in meta ) {
            if( meta[key] !== rhs.getMeta()[key] ) {
                throw new Error("Cannot append a slice with different "+key);
            }
        }
        
        // find index where to append slice
        var closestSliceIndex = 0;
        var slicePosition = rhs.getSlicePositions()[0];
        var minDiff = Math.abs( slicePositions[0][2] - slicePosition[2] );
        var diff = 0;
        for( var i = 0; i < slicePositions.length; ++i )
        {
            diff = Math.abs( slicePositions[i][2] - slicePosition[2] );
            if( diff < minDiff ) 
            {
                minDiff = diff;
                closestSliceIndex = i;
            }
        }
        diff = slicePositions[closestSliceIndex][2] - slicePosition[2];
        var newSliceNb = ( diff > 0 ) ? closestSliceIndex : closestSliceIndex + 1;
        
        // new size
        var newSize = new dwv.image.Size(size.getNumberOfColumns(),
                size.getNumberOfRows(),
                size.getNumberOfSlices() + 1 );
        
        // calculate slice size
        var mul = 1;
        if( photometricInterpretation === "RGB" ) {
            mul = 3;
        }
        var sliceSize = mul * size.getSliceSize();
        
        // create the new buffer
        var newBuffer = new Int16Array(sliceSize * newSize.getNumberOfSlices());
        
        // append slice at new position
        if( newSliceNb === 0 )
        {
            newBuffer.set(rhs.getBuffer());
            newBuffer.set(buffer, sliceSize);
        }
        else if( newSliceNb === size.getNumberOfSlices() )
        {
            newBuffer.set(buffer);
            newBuffer.set(rhs.getBuffer(), size.getNumberOfSlices() * sliceSize);
        }
        else
        {
            var offset = newSliceNb * sliceSize;
            newBuffer.set(buffer.subarray(0, offset - 1));
            newBuffer.set(rhs.getBuffer(), offset);
            newBuffer.set(buffer.subarray(offset), offset + sliceSize);
        }
        
        // update slice positions
        slicePositions.splice(newSliceNb, 0, slicePosition);
        
        // copy to class variables
        size = newSize;
        buffer = newBuffer;
        originalBuffer = new Int16Array(newBuffer);
    };
    
    /**
     * Get the data range.
     * @method getDataRange
     * @return {Object} The data range.
     */ 
    this.getDataRange = function() { 
        if( !dataRange ) {
            dataRange = this.calculateDataRange();
        }
        return dataRange;
    };

    /**
     * Get the histogram.
     * @method getHistogram
     * @return {Array} The histogram.
     */ 
    this.getHistogram = function() { 
        if( !histogram ) {
            histogram = this.calculateHistogram();
        }
        return histogram;
    };
};

/**
 * Get the value of the image at a specific coordinate.
 * @method getValue
 * @param {Number} i The X index.
 * @param {Number} j The Y index.
 * @param {Number} k The Z index.
 * @return {Number} The value at the desired position.
 * Warning: No size check...
 */
dwv.image.Image.prototype.getValue = function( i, j, k )
{
    return this.getValueAtOffset( i +
        ( j * this.getSize().getNumberOfColumns() ) +
        ( k * this.getSize().getSliceSize()) );
};

/**
 * Get the rescaled value of the image at a specific offset.
 * @method getRescaledValueAtOffset
 * @param {Number} offset The offset in the buffer. 
 * @return {Number} The rescaled value at the desired offset.
 * Warning: No size check...
 */
dwv.image.Image.prototype.getRescaledValueAtOffset = function( offset )
{
    return (this.getValueAtOffset(offset)*this.getRescaleSlope())+this.getRescaleIntercept();
};

/**
 * Get the rescaled value of the image at a specific coordinate.
 * @method getRescaledValue
 * @param {Number} i The X index.
 * @param {Number} j The Y index.
 * @param {Number} k The Z index.
 * @return {Number} The rescaled value at the desired position.
 * Warning: No size check...
 */
dwv.image.Image.prototype.getRescaledValue = function( i, j, k )
{
    return (this.getValue(i,j,k)*this.getRescaleSlope())+this.getRescaleIntercept();
};

/**
 * Calculate the raw image data range.
 * @method calculateDataRange
 * @return {Object} The range {min, max}.
 */
dwv.image.Image.prototype.calculateDataRange = function()
{
    var min = this.getValueAtOffset(0);
    var max = min;
    var value = 0;
    for(var i=0; i < this.getSize().getTotalSize(); ++i)
    {    
        value = this.getValueAtOffset(i);
        if( value > max ) { max = value; }
        if( value < min ) { min = value; }
    }
    return { "min": min, "max": max };
};

/**
 * Calculate the image data range after rescale.
 * @method getRescaledDataRange
 * @return {Object} The rescaled data range {min, max}.
 */
dwv.image.Image.prototype.getRescaledDataRange = function()
{
    var rawRange = this.getDataRange();
    return { "min": rawRange.min*this.getRescaleSlope()+this.getRescaleIntercept(),
        "max": rawRange.max*this.getRescaleSlope()+this.getRescaleIntercept()};
};

/**
 * Calculate the histogram of the image.
 * @method calculateHistogram
 * @return {Array} An array representing the histogram.
 */
dwv.image.Image.prototype.calculateHistogram = function()
{
    var histo = [];
    var histoPlot = [];
    var value = 0;
    var size = this.getSize().getTotalSize();
    for ( var i = 0; i < size; ++i ) {    
        value = this.getRescaledValueAtOffset(i);
        histo[value] = ( histo[value] || 0 ) + 1;
    }
    // generate data for plotting
    var min = this.getRescaledDataRange().min;
    var max = this.getRescaledDataRange().max;
    for ( var j = min; j <= max; ++j ) {    
        histoPlot.push([j, ( histo[j] || 0 ) ]);
    }
    return histoPlot;
};

/**
 * Convolute the image with a given 2D kernel.
 * @method convolute2D
 * @param {Array} weights The weights of the 2D kernel as a 3x3 matrix.
 * @return {Image} The convoluted image.
 * Note: Uses the raw buffer values.
 */
dwv.image.Image.prototype.convolute2D = function(weights)
{
    if(weights.length !== 9) {
        throw new Error("The convolution matrix does not have a length of 9; it has "+weights.length);
    }

    var newImage = this.clone();
    var newBuffer = newImage.getBuffer();

    var ncols = this.getSize().getNumberOfColumns();
    var nrows = this.getSize().getNumberOfRows();
    var nslices = this.getSize().getNumberOfSlices();
    var ncomp = this.getNumberOfComponents();
    
    // adapt to number of component and planar configuration
    var factor = 1;
    var componentOffset = 1;
    if( ncomp === 3 )
    {
        if( this.getPlanarConfiguration() === 0 )
        {
            factor = 3;
        }
        else
        {
            componentOffset = this.getSize().getTotalSize();
        }
    }
    
    // allow special indent for matrices
    /*jshint indent:false */

    // default weight offset matrix
    var wOff = [];
    wOff[0] = (-ncols-1) * factor; wOff[1] = (-ncols) * factor; wOff[2] = (-ncols+1) * factor;
    wOff[3] = -factor; wOff[4] = 0; wOff[5] = 1 * factor;
    wOff[6] = (ncols-1) * factor; wOff[7] = (ncols) * factor; wOff[8] = (ncols+1) * factor;
    
    // border weight offset matrices
    // borders are extended (see http://en.wikipedia.org/wiki/Kernel_%28image_processing%29)
    
    // i=0, j=0
    var wOff00 = [];
    wOff00[0] = wOff[4]; wOff00[1] = wOff[4]; wOff00[2] = wOff[5];
    wOff00[3] = wOff[4]; wOff00[4] = wOff[4]; wOff00[5] = wOff[5];
    wOff00[6] = wOff[7]; wOff00[7] = wOff[7]; wOff00[8] = wOff[8];
    // i=0, j=*
    var wOff0x = [];
    wOff0x[0] = wOff[1]; wOff0x[1] = wOff[1]; wOff0x[2] = wOff[2];
    wOff0x[3] = wOff[4]; wOff0x[4] = wOff[4]; wOff0x[5] = wOff[5];
    wOff0x[6] = wOff[7]; wOff0x[7] = wOff[7]; wOff0x[8] = wOff[8];
    // i=0, j=nrows
    var wOff0n = [];
    wOff0n[0] = wOff[1]; wOff0n[1] = wOff[1]; wOff0n[2] = wOff[2];
    wOff0n[3] = wOff[4]; wOff0n[4] = wOff[4]; wOff0n[5] = wOff[5];
    wOff0n[6] = wOff[4]; wOff0n[7] = wOff[4]; wOff0n[8] = wOff[5];
    
    // i=*, j=0
    var wOffx0 = [];
    wOffx0[0] = wOff[3]; wOffx0[1] = wOff[4]; wOffx0[2] = wOff[5];
    wOffx0[3] = wOff[3]; wOffx0[4] = wOff[4]; wOffx0[5] = wOff[5];
    wOffx0[6] = wOff[6]; wOffx0[7] = wOff[7]; wOffx0[8] = wOff[8];
    // i=*, j=* -> wOff
    // i=*, j=nrows
    var wOffxn = [];
    wOffxn[0] = wOff[0]; wOffxn[1] = wOff[1]; wOffxn[2] = wOff[2];
    wOffxn[3] = wOff[3]; wOffxn[4] = wOff[4]; wOffxn[5] = wOff[5];
    wOffxn[6] = wOff[3]; wOffxn[7] = wOff[4]; wOffxn[8] = wOff[5];
    
    // i=ncols, j=0
    var wOffn0 = [];
    wOffn0[0] = wOff[3]; wOffn0[1] = wOff[4]; wOffn0[2] = wOff[4];
    wOffn0[3] = wOff[3]; wOffn0[4] = wOff[4]; wOffn0[5] = wOff[4];
    wOffn0[6] = wOff[6]; wOffn0[7] = wOff[7]; wOffn0[8] = wOff[7];
    // i=ncols, j=*
    var wOffnx = [];
    wOffnx[0] = wOff[0]; wOffnx[1] = wOff[1]; wOffnx[2] = wOff[1];
    wOffnx[3] = wOff[3]; wOffnx[4] = wOff[4]; wOffnx[5] = wOff[4];
    wOffnx[6] = wOff[6]; wOffnx[7] = wOff[7]; wOffnx[8] = wOff[7];
    // i=ncols, j=nrows
    var wOffnn = [];
    wOffnn[0] = wOff[0]; wOffnn[1] = wOff[1]; wOffnn[2] = wOff[1];
    wOffnn[3] = wOff[3]; wOffnn[4] = wOff[4]; wOffnn[5] = wOff[4];
    wOffnn[6] = wOff[3]; wOffnn[7] = wOff[4]; wOffnn[8] = wOff[4];
    
    // restore indent for rest of method
    /*jshint indent:4 */

    // loop vars
    var pixelOffset = 0;
    var newValue = 0;
    var wOffFinal = [];
    // go through the destination image pixels
    for (var c=0; c<ncomp; c++) {
        // special component offset
        pixelOffset = c * componentOffset;
        for (var k=0; k<nslices; k++) {
            for (var j=0; j<nrows; j++) {
                for (var i=0; i<ncols; i++) {
                    wOffFinal = wOff;
                    // special border cases
                    if( i === 0 && j === 0 ) {
                        wOffFinal = wOff00;
                    }
                    else if( i === 0 && j === (nrows-1)  ) {
                        wOffFinal = wOff0n;
                    }
                    else if( i === (ncols-1) && j === 0 ) {
                        wOffFinal = wOffn0;
                    }
                    else if( i === (ncols-1) && j === (nrows-1) ) {
                        wOffFinal = wOffnn;
                    }
                    else if( i === 0 && j !== (nrows-1) && j !== 0 ) {
                        wOffFinal = wOff0x;
                    }
                    else if( i === (ncols-1) && j !== (nrows-1) && j !== 0 ) {
                        wOffFinal = wOffnx;
                    }
                    else if( i !== 0 && i !== (ncols-1) && j === 0 ) {
                        wOffFinal = wOffx0;
                    }
                    else if( i !== 0 && i !== (ncols-1) && j === (nrows-1) ) {
                        wOffFinal = wOffxn;
                    }
                        
                    // calculate the weighed sum of the source image pixels that
                    // fall under the convolution matrix
                    newValue = 0;
                    for( var wi=0; wi<9; ++wi )
                    {
                        newValue += this.getValueAtOffset(pixelOffset + wOffFinal[wi]) * weights[wi];
                    }
                    newBuffer[pixelOffset] = newValue;
                    // increment pixel offset
                    pixelOffset += factor;
                }
            }
        }
    }
    return newImage;
};

/**
 * Transform an image using a specific operator.
 * @method transform
 * @param {Function} operator The operator to use when transforming.
 * @return {Image} The transformed image.
 * Note: Uses the raw buffer values.
 */
dwv.image.Image.prototype.transform = function(operator)
{
    var newImage = this.clone();
    var newBuffer = newImage.getBuffer();
    for( var i=0; i < newBuffer.length; ++i )
    {   
        newBuffer[i] = operator( newImage.getValueAtOffset(i) );
    }
    return newImage;
};

/**
 * Compose this image with another one and using a specific operator.
 * @method compose
 * @param {Image} rhs The image to compose with.
 * @param {Function} operator The operator to use when composing.
 * @return {Image} The composed image.
 * Note: Uses the raw buffer values.
 */
dwv.image.Image.prototype.compose = function(rhs, operator)
{
    var newImage = this.clone();
    var newBuffer = newImage.getBuffer();
    for( var i=0; i < newBuffer.length; ++i )
    {   
        // using the operator on the local buffer, i.e. the latest (not original) data
        newBuffer[i] = Math.floor( operator( this.getValueAtOffset(i), rhs.getValueAtOffset(i) ) );
    }
    return newImage;
};

/**
 * Quantify a line according to image information.
 * @method quantifyLine
 * @param {Object} line The line to quantify.
 * @return {Object} A quantification object.
 */
dwv.image.Image.prototype.quantifyLine = function(line)
{
    var length = line.getWorldLength( this.getSpacing().getColumnSpacing(), 
            this.getSpacing().getRowSpacing());
    return {"length": length};
};

/**
 * Quantify a rectangle according to image information.
 * @method quantifyRect
 * @param {Object} rect The rectangle to quantify.
 * @return {Object} A quantification object.
 */
dwv.image.Image.prototype.quantifyRect = function(rect)
{
    var surface = rect.getWorldSurface( this.getSpacing().getColumnSpacing(), 
            this.getSpacing().getRowSpacing());
    var subBuffer = [];
    var minJ = parseInt(rect.getBegin().getY(), 10);
    var maxJ = parseInt(rect.getEnd().getY(), 10);
    var minI = parseInt(rect.getBegin().getX(), 10);
    var maxI = parseInt(rect.getEnd().getX(), 10);
    for ( var j = minJ; j < maxJ; ++j ) {
        for ( var i = minI; i < maxI; ++i ) {
            subBuffer.push( this.getValue(i,j,0) );
        }
    }
    var quantif = dwv.math.getStats( subBuffer );
    return {"surface": surface, "min": quantif.min, 'max': quantif.max,
        "mean": quantif.mean, 'stdDev': quantif.stdDev};
};

/**
 * Quantify an ellipse according to image information.
 * @method quantifyEllipse
 * @param {Object} ellipse The ellipse to quantify.
 * @return {Object} A quantification object.
 */
dwv.image.Image.prototype.quantifyEllipse = function(ellipse)
{
    var surface = ellipse.getWorldSurface( this.getSpacing().getColumnSpacing(), 
            this.getSpacing().getRowSpacing());
    return {"surface": surface};
};



/*viewer/src/image/luts.js*/

/** 
 * Image module.
 * @module image
 */
var dwv = dwv || {};
dwv.image = dwv.image || {};
dwv.image.lut = dwv.image.lut || {};

/**
 * Rescale LUT class.
 * @class Rescale
 * @namespace dwv.image.lut
 * @constructor
 * @param {Number} slope_ The rescale slope.
 * @param {Number} intercept_ The rescale intercept.
 */
dwv.image.lut.Rescale = function(slope_,intercept_)
{
    /**
     * The internal array.
     * @property rescaleLut_
     * @private
     * @type Array
     */
    var rescaleLut_ = null;
    
    // Check the rescale slope.
    if(typeof(slope_) === 'undefined') {
        slope_ = 1;
    }
    // Check the rescale intercept.
    if(typeof(intercept_) === 'undefined') {
        intercept_ = 0;
    }
    
    /**
     * Get the rescale slope.
     * @method getSlope
     * @return {Number} The rescale slope.
     */ 
    this.getSlope = function() { return slope_; };
    /**
     * Get the rescale intercept.
     * @method getIntercept
     * @return {Number} The rescale intercept.
     */ 
    this.getIntercept = function() { return intercept_; };
    
    /**
     * Initialise the LUT.
     * @method initialise
     * @param {Number} bitsStored The number of bits used to store the data.
     */ 
    // Initialise the LUT.
    this.initialise = function(bitsStored)
    {
        var size = Math.pow(2, bitsStored);
        rescaleLut_ = new Float32Array(size);
        for(var i=0; i<size; ++i) {
            rescaleLut_[i] = i * slope_ + intercept_;
        }
    };
    
    /**
     * Get the length of the LUT array.
     * @method getLength
     * @return {Number} The length of the LUT array.
     */ 
    this.getLength = function() { return rescaleLut_.length; };
    
    /**
     * Get the value of the LUT at the given offset.
     * @method getValue
     * @return {Number} The value of the LUT at the given offset.
     */ 
    this.getValue = function(offset) { return rescaleLut_[offset]; };
};

/**
 * Window LUT class.
 * @class Window
 * @namespace dwv.image.lut
 * @constructor
 * @param {Number} rescaleLut_ The associated rescale LUT.
 * @param {Boolean} isSigned_ Flag to know if the data is signed.
 */
dwv.image.lut.Window = function(rescaleLut_, isSigned_)
{
    /**
     * The internal array: Uint8ClampedArray clamps between 0 and 255.
     * (not supported on travis yet... using basic array, be sure not to overflow!)
     * @property rescaleLut_
     * @private
     * @type Array
     */
    var windowLut_ = null;
    
    // check Uint8ClampedArray support
    if( !dwv.browser.hasClampedArray() ) {
        windowLut_ = new Uint8Array(rescaleLut_.getLength());
    }
    else {
        windowLut_ = new Uint8ClampedArray(rescaleLut_.getLength());
    }
    
    /**
     * The window center.
     * @property center_
     * @private
     * @type Number
     */
    var center_ = null;
    /**
     * The window width.
     * @property width_
     * @private
     * @type Number
     */
    var width_ = null;
    
    /**
     * Get the window center.
     * @method getCenter
     * @return {Number} The window center.
     */ 
    this.getCenter = function() { return center_; };
    /**
     * Get the window width.
     * @method getWidth
     * @return {Number} The window width.
     */ 
    this.getWidth = function() { return width_; };
    /**
     * Get the signed flag.
     * @method isSigned
     * @return {Boolean} The signed flag.
     */ 
    this.isSigned = function() { return isSigned_; };
    
    /**
     * Set the window center and width.
     * @method setCenterAndWidth
     * @param {Number} center The window center.
     * @param {Number} width The window width.
     */ 
    this.setCenterAndWidth = function(center, width)
    {
        // store the window values
        center_ = center;
        width_ = width;
        // pre calculate loop values
        var size = windowLut_.length;
        var center0 = center - 0.5;
        if ( isSigned_ ) {
            center0 += rescaleLut_.getSlope() * (size / 2);
        }
        var width0 = width - 1;
        var dispval = 0;
        if( !dwv.browser.hasClampedArray() )
        {
            var yMax = 255;
            var yMin = 0;
            for(var j=0; j<size; ++j)
            {
                // from the DICOM specification (https://www.dabsoft.ch/dicom/3/C.11.2.1.2/)
                // y = ((x - (c - 0.5)) / (w-1) + 0.5) * (ymax - ymin )+ ymin
                dispval = ((rescaleLut_.getValue(j) - center0 ) / width0 + 0.5) * 255;
                dispval = parseInt(dispval, 10);
                if ( dispval <= yMin ) {
                    windowLut_[j] = yMin;
                }
                else if ( dispval > yMax ) {
                    windowLut_[j] = yMax;
                }
                else {
                    windowLut_[j] = dispval;
                }
            }
        }
        else
        {
            // when using Uint8ClampedArray, values are clamped between 0 and 255
            // no need to check
            for(var i=0; i<size; ++i)
            {
                // from the DICOM specification (https://www.dabsoft.ch/dicom/3/C.11.2.1.2/)
                // y = ((x - (c - 0.5)) / (w-1) + 0.5) * (ymax - ymin )+ ymin
                dispval = ((rescaleLut_.getValue(i) - center0 ) / width0 + 0.5) * 255;
                windowLut_[i]= parseInt(dispval, 10);
            }
        }
    };
    
    /**
     * Get the length of the LUT array.
     * @method getLength
     * @return {Number} The length of the LUT array.
     */ 
    this.getLength = function() { return windowLut_.length; };

    /**
     * Get the value of the LUT at the given offset.
     * @method getValue
     * @return {Number} The value of the LUT at the given offset.
     */ 
    this.getValue = function(offset)
    {
        var shift = isSigned_ ? windowLut_.length / 2 : 0;
        return windowLut_[offset+shift];
    };
};

/**
* Lookup tables for image color display. 
*/

dwv.image.lut.range_max = 256;

dwv.image.lut.buildLut = function(func)
{
    var lut = [];
    for( var i=0; i<dwv.image.lut.range_max; ++i ) {
        lut.push(func(i));
    }
    return lut;
};

dwv.image.lut.max = function(/*i*/)
{
    return dwv.image.lut.range_max-1;
};

dwv.image.lut.maxFirstThird = function(i)
{
    if( i < dwv.image.lut.range_max/3 ) {
        return dwv.image.lut.range_max-1;
    }
    return 0;
};

dwv.image.lut.maxSecondThird = function(i)
{
    var third = dwv.image.lut.range_max/3;
    if( i >= third && i < 2*third ) {
        return dwv.image.lut.range_max-1;
    }
    return 0;
};

dwv.image.lut.maxThirdThird = function(i)
{
    if( i >= 2*dwv.image.lut.range_max/3 ) {
        return dwv.image.lut.range_max-1;
    }
    return 0;
};

dwv.image.lut.toMaxFirstThird = function(i)
{
    var val = i * 3;
    if( val > dwv.image.lut.range_max-1 ) {
        return dwv.image.lut.range_max-1;
    }
    return val;
};

dwv.image.lut.toMaxSecondThird = function(i)
{
    var third = dwv.image.lut.range_max/3;
    var val = 0;
    if( i >= third ) {
        val = (i-third) * 3;
        if( val > dwv.image.lut.range_max-1 ) {
            return dwv.image.lut.range_max-1;
        }
    }
    return val;
};

dwv.image.lut.toMaxThirdThird = function(i)
{
    var third = dwv.image.lut.range_max/3;
    var val = 0;
    if( i >= 2*third ) {
        val = (i-2*third) * 3;
        if( val > dwv.image.lut.range_max-1 ) {
            return dwv.image.lut.range_max-1;
        }
    }
    return val;
};

dwv.image.lut.zero = function(/*i*/)
{
    return 0;
};

dwv.image.lut.id = function(i)
{
    return i;
};

dwv.image.lut.invId = function(i)
{
    return (dwv.image.lut.range_max-1)-i;
};

// plain
dwv.image.lut.plain = {
    "red":   dwv.image.lut.buildLut(dwv.image.lut.id),
    "green": dwv.image.lut.buildLut(dwv.image.lut.id),
    "blue":  dwv.image.lut.buildLut(dwv.image.lut.id)
};

// inverse plain
dwv.image.lut.invPlain = {
    "red":   dwv.image.lut.buildLut(dwv.image.lut.invId),
    "green": dwv.image.lut.buildLut(dwv.image.lut.invId),
    "blue":  dwv.image.lut.buildLut(dwv.image.lut.invId)
};

//rainbow 
dwv.image.lut.rainbow = {
    "blue":  [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 255, 247, 239, 231, 223, 215, 207, 199, 191, 183, 175, 167, 159, 151, 143, 135, 127, 119, 111, 103, 95, 87, 79, 71, 63, 55, 47, 39, 31, 23, 15, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "green": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 253, 251, 249, 247, 245, 243, 241, 239, 237, 235, 233, 231, 229, 227, 225, 223, 221, 219, 217, 215, 213, 211, 209, 207, 205, 203, 201, 199, 197, 195, 193, 192, 189, 186, 183, 180, 177, 174, 171, 168, 165, 162, 159, 156, 153, 150, 147, 144, 141, 138, 135, 132, 129, 126, 123, 120, 117, 114, 111, 108, 105, 102, 99, 96, 93, 90, 87, 84, 81, 78, 75, 72, 69, 66, 63, 60, 57, 54, 51, 48, 45, 42, 39, 36, 33, 30, 27, 24, 21, 18, 15, 12, 9, 6, 3],
    "red":   [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 62, 60, 58, 56, 54, 52, 50, 48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]
};

// hot
dwv.image.lut.hot = {
    "red":   dwv.image.lut.buildLut(dwv.image.lut.toMaxFirstThird),
    "green": dwv.image.lut.buildLut(dwv.image.lut.toMaxSecondThird),
    "blue":  dwv.image.lut.buildLut(dwv.image.lut.toMaxThirdThird)
};

// test
dwv.image.lut.test = {
    "red":   dwv.image.lut.buildLut(dwv.image.lut.id),
    "green": dwv.image.lut.buildLut(dwv.image.lut.zero),
    "blue":  dwv.image.lut.buildLut(dwv.image.lut.zero)
};

//red
/*dwv.image.lut.red = {
   "red":   dwv.image.lut.buildLut(dwv.image.lut.max),
   "green": dwv.image.lut.buildLut(dwv.image.lut.id),
   "blue":  dwv.image.lut.buildLut(dwv.image.lut.id)
};*/


/*viewer/src/image/view.js*/

/** 
 * Image module.
 * @module image
 */
var dwv = dwv || {};
dwv.image = dwv.image || {};

/**
 * View class.
 * @class View
 * @namespace dwv.image
 * @constructor
 * @param {Image} image The associated image.
 * @param {Boolean} isSigned Is the data signed.
 * Need to set the window lookup table once created
 * (either directly or with helper methods). 
 */
dwv.image.View = function(image, isSigned)
{
    /**
     * Rescale lookup table.
     * @property rescaleLut
     * @private
     * @type Rescale
     */
    var rescaleLut = new dwv.image.lut.Rescale(
        image.getRescaleSlope(), image.getRescaleIntercept() );
    // initialise it
    rescaleLut.initialise(image.getMeta().BitsStored);
    
    /**
     * Window lookup table.
     * @property windowLut
     * @private
     * @type Window
     */
    var windowLut = new dwv.image.lut.Window(rescaleLut, isSigned);
    
    /**
     * Window presets.
     * @property windowPresets
     * @private
     * @type Object
     */
    var windowPresets = null;
    /**
     * Color map
     * @property colorMap
     * @private
     * @type Object
     */
    var colorMap = dwv.image.lut.plain;
    /**
     * Current position
     * @property currentPosition
     * @private
     * @type Object
     */
    var currentPosition = {"i":0,"j":0,"k":0};
    
    /**
     * Get the associated image.
     * @method getImage
     * @return {Image} The associated image.
     */ 
    this.getImage = function() { return image; };
    /**
     * Set the associated image.
     * @method setImage
     * @param {Image} inImage The associated image.
     */ 
    this.setImage = function(inImage) { image = inImage; };
    
    /**
     * Get the rescale LUT of the image.
     * @method getRescaleLut
     * @return {Rescale} The rescale LUT of the image.
     */ 
    this.getRescaleLut = function() { return rescaleLut; };
    /**
     * Set the rescale LUT of the image.
     * @method setRescaleLut
     * @param {Rescale} lut The rescale LUT of the image.
     */ 
    this.setRescaleLut = function(lut) { rescaleLut = lut; };

    /**
     * Get the window LUT of the image.
     * @method getWindowLut
     * @return {Window} The window LUT of the image.
     */ 
    this.getWindowLut = function() { return windowLut; };
    /**
     * Set the window LUT of the image.
     * @method setWindowLut
     * @param {Window} lut The window LUT of the image.
     */ 
    this.setWindowLut = function(lut) { windowLut = lut; };
    
    /**
     * Get the window presets.
     * @method getWindowPresets
     * @return {Object} The window presets.
     */ 
    this.getWindowPresets = function() { return windowPresets; };
    /**
     * Set the window presets.
     * @method setWindowPresets
     * @param {Object} presets The window presets.
     */ 
    this.setWindowPresets = function(presets) { 
        windowPresets = presets;
        this.setWindowLevel(presets[0].center, presets[0].width);
    };
    
    /**
     * Get the color map of the image.
     * @method getColorMap
     * @return {Object} The color map of the image.
     */ 
    this.getColorMap = function() { return colorMap; };
    /**
     * Set the color map of the image.
     * @method setColorMap
     * @param {Object} map The color map of the image.
     */ 
    this.setColorMap = function(map) { 
        colorMap = map;
        // TODO Better handle this...
        if( this.getImage().getPhotometricInterpretation() === "MONOCHROME1") {
            colorMap = dwv.image.lut.invPlain;
        }
        this.fireEvent({"type": "colorchange", 
           "wc": this.getWindowLut().getCenter(),
           "ww": this.getWindowLut().getWidth() });
    };
    
    /**
     * Is the data signed data.
     * @method isSigned
     * @return {Boolean} The signed data flag.
     */ 
    this.isSigned = function() { return isSigned; };
    
    /**
     * Get the current position.
     * @method getCurrentPosition
     * @return {Object} The current position.
     */ 
    this.getCurrentPosition = function() { return currentPosition; };
    /**
     * Set the current position. Returns false if not in bounds.
     * @method setCurrentPosition
     * @param {Object} pos The current position.
     */ 
    this.setCurrentPosition = function(pos) { 
        if( !image.getSize().isInBounds(pos.i,pos.j,pos.k) ) {
            return false;
        }
        var oldPosition = currentPosition;
        currentPosition = pos;
        // only display value for monochrome data
        if( app.getImage().getPhotometricInterpretation().match(/MONOCHROME/) !== null )
        {
            this.fireEvent({"type": "positionchange", 
                "i": pos.i, "j": pos.j, "k": pos.k,
                "value": image.getRescaledValue(pos.i,pos.j,pos.k)});
        }
        else
        {
            this.fireEvent({"type": "positionchange", 
                "i": pos.i, "j": pos.j, "k": pos.k});
        }
        // slice change event (used to trigger redraw)
        if( oldPosition.k !== currentPosition.k ) {
            this.fireEvent({"type": "slicechange"});
        }
        return true;
    };
    
    /**
     * View listeners
     * @property listeners
     * @private
     * @type Object
     */
    var listeners = {};
    /**
     * Get the view listeners.
     * @method getListeners
     * @return {Object} The view listeners.
     */ 
    this.getListeners = function() { return listeners; };
    /**
     * Set the view listeners.
     * @method setListeners
     * @param {Object} list The view listeners.
     */ 
    this.setListeners = function(list) { listeners = list; };
};

/**
 * Set the view window/level.
 * @method setWindowLevel
 * @param {Number} center The window center.
 * @param {Number} width The window width.
 * Warning: uses the latest set rescale LUT or the default linear one.
 */
dwv.image.View.prototype.setWindowLevel = function( center, width )
{
    // window width shall be >= 1 (see https://www.dabsoft.ch/dicom/3/C.11.2.1.2/)
    if ( width >= 1 ) {
        this.getWindowLut().setCenterAndWidth(center, width);
        this.fireEvent({"type": "wlchange", "wc": center, "ww": width });
    }
};

/**
 * Set the image window/level to cover the full data range.
 * @method setWindowLevelMinMax
 * Warning: uses the latest set rescale LUT or the default linear one.
 */
dwv.image.View.prototype.setWindowLevelMinMax = function()
{
    // calculate center and width
    var range = this.getImage().getRescaledDataRange();
    var min = range.min;
    var max = range.max;
    var width = max - min;
    var center = min + width/2;
    // set window level
    this.setWindowLevel(center,width);
};
/**
 * Go to first slice .
 * @method goFirstSlice
 * @return {Boolean} False if not in bounds.
 */
dwv.image.View.prototype.goFirstSlice = function()
{
    return this.setCurrentPosition({
        "i": this.getCurrentPosition().i,
        "j": this.getCurrentPosition().j,
        "k":  0 
    });
};
/**
 * Increment the current slice number.
 * @method incrementSliceNb
 * @return {Boolean} False if not in bounds.
 */
dwv.image.View.prototype.incrementSliceNb = function()
{
    return this.setCurrentPosition({
        "i": this.getCurrentPosition().i,
        "j": this.getCurrentPosition().j,
        "k": this.getCurrentPosition().k + 1 
    });
};

/**
 * Decrement the current slice number.
 * @method decrementSliceNb
 * @return {Boolean} False if not in bounds.
 */
dwv.image.View.prototype.decrementSliceNb = function()
{
    return this.setCurrentPosition({
        "i": this.getCurrentPosition().i,
        "j": this.getCurrentPosition().j,
        "k": this.getCurrentPosition().k - 1 
    });
};

/**
 * Clone the image using all meta data and the original data buffer.
 * @method clone
 * @return {View} A full copy of this {dwv.image.Image}.
 */
dwv.image.View.prototype.clone = function()
{
    var copy = new dwv.image.View(this.getImage());
    copy.setRescaleLut(this.getRescaleLut());
    copy.setWindowLut(this.getWindowLut());
    copy.setListeners(this.getListeners());
    return copy;
};

/**
 * Generate display image data to be given to a canvas.
 * @method generateImageData
 * @param {Array} array The array to fill in.
 * @param {Number} sliceNumber The slice position.
 */
dwv.image.View.prototype.generateImageData = function( array )
{        
    var sliceNumber = this.getCurrentPosition().k;
    var image = this.getImage();
    var pxValue = 0;
    var photoInterpretation = image.getPhotometricInterpretation();
    var planarConfig = image.getPlanarConfiguration();
    var windowLut = this.getWindowLut();
    var colorMap = this.getColorMap();
    var index = 0;
    var sliceSize = 0;
    var sliceOffset = 0;
    switch (photoInterpretation)
    {
    case "MONOCHROME1":
    case "MONOCHROME2":
        sliceSize = image.getSize().getSliceSize();
        sliceOffset = (sliceNumber || 0) * sliceSize;
        var iMax = sliceOffset + sliceSize;
        for(var i=sliceOffset; i < iMax; ++i)
        {        
            pxValue = parseInt( windowLut.getValue( image.getValueAtOffset(i) ), 10 );						
            array.data[index] = colorMap.red[pxValue];
            array.data[index+1] = colorMap.green[pxValue];
            array.data[index+2] = colorMap.blue[pxValue];
            array.data[index+3] = 0xff;
            index += 4;
        }
        break;
    
/*	case "PALETTE COLOR":
		console.log(image);
		var meta=image.getMeta();
		var rPalette=meta.RedPaletteColorLookupTableData;
		var gPalette=meta.GreenPaletteColorLookupTableData;
		var bPalette=meta.BluePaletteColorLookupTableData;
		if(!rPalette || !gPalette){
			throw new Error("Unsupported Palette configuration: "+planarConfig);
		}

      var lut = function(value) {        
        var pixel = {
          "r": rPalette[value],
          "g": gPalette[value],
          "b": bPalette[value],
          "a": 255
        };         
        return pixel;
      }

        sliceSize = image.getSize().getSliceSize();
        sliceOffset = (sliceNumber || 0) * sliceSize;
        var iMax = sliceOffset + sliceSize;
		alert(sliceOffset);
		alert(iMax);
        for(var i=sliceOffset; i < iMax; ++i)
        {        
			console.log(image.getValueAtOffset(i));
            pxValue = parseInt( windowLut.getValue( 
                    image.getValueAtOffset(i) ), 10 );
			console.log(pxValue);
			if(i>100)	break;
            array.data[index] = colorMap.red[pxValue];
            array.data[index+1] = colorMap.green[pxValue];
            array.data[index+2] = colorMap.blue[pxValue];
            array.data[index+3] = 0xff;
            index += 4;
        }
		break;
*/
/*
		var rPalette = this.dicomInstance.getField(0x0028, 0x1201); // 0040,4609
		var gPalette = this.dicomInstance.getField(0x0028, 0x1202); // 0040,4610
		var bPalette = this.dicomInstance.getField(0x0028, 0x1203); // 0040,4611

        sliceSize = image.getSize().getSliceSize();
        sliceOffset = (sliceNumber || 0) * 3 * sliceSize;
        // default: RGBRGBRGBRGB...
        var posR = sliceOffset;
        var posG = sliceOffset + 1;
        var posB = sliceOffset + 2;
        var stepPos = 3;
        // RRRR...GGGG...BBBB...
        if (planarConfig === 1) { 
            posR = sliceOffset;
            posG = sliceOffset + sliceSize;
            posB = sliceOffset + 2 * sliceSize;
            stepPos = 1;
        }
        
        var redValue = 0;
        var greenValue = 0;
        var blueValue = 0;
        for(var j=0; j < image.getSize().getSliceSize(); ++j)
        {        
			console.log(image.getValueAtOffset(posR));
			console.log(image.getValueAtOffset(posG));
			break;
            redValue = parseInt( rPalette[image.getValueAtOffset(posR)], 10 );
            greenValue = parseInt( gPalette[image.getValueAtOffset(posG)], 10 );
            blueValue = parseInt( bPalette[image.getValueAtOffset(posB)], 10 );
            
            array.data[index] = redValue;
            array.data[index+1] = greenValue;
            array.data[index+2] = blueValue;
            array.data[index+3] = 0xff;
            index += 4;
            
            posR += stepPos;
            posG += stepPos;
            posB += stepPos;
        }

/*
        sliceSize = image.getSize().getSliceSize();
        sliceOffset = (sliceNumber || 0) * sliceSize;
        var iMax = sliceOffset + sliceSize;
        for(var i=sliceOffset; i < iMax; ++i)
        {        
            pxValue = parseInt( windowLut.getValue( 
                    image.getValueAtOffset(i) ), 10 );
            array.data[index] = colorMap.red[pxValue];
            array.data[index+1] = colorMap.green[pxValue];
            array.data[index+2] = colorMap.blue[pxValue];
            array.data[index+3] = 0xff;
            index += 4;
        }

var populateImageDataPalette = function (buffer, imageData, lut) {
    var value;
    var i = 0;
    var pos = 0;
	
//    for (var y = 0; y < canvasHeight; y++) {
//      for (var x = 0; x < canvasWidth; x++) {
    for (var y = 0; y < frameRows; y++) {
      for (var x = 0; x < frameCols; x++) {
        // value = buffer[pos];
        value = lut(buffer[pos]);

        imageData.data[i]   = value["r"]; // R
        imageData.data[i+1] = value["g"]; // G
        imageData.data[i+2] = value["b"]; // B
        imageData.data[i+3] = value["a"]; // A

        i += 4;
        pos++;
      }
    }
    return imageData;
  }

      populateFrame = (function(i) {
        var frameImageData = populateImageDataPalette(self.dicomInstance.frameBuf[i], self.fimageData, lut);               
        return frameImageData;
      });
*/
/*
https://github.com/rii-mango/Daikon/blob/01a082a73d1a1ab15dee3278b57934700bcb665b/src/image.js
https://github.com/jap1968/medview/blob/a1679115d292d0e19eff25066886245509d4f367/js/html.js
*/
/*	case "PALETTE COLOR":
        // the planar configuration defines the memory layout
        if( planarConfig !== 0 && planarConfig !== 1 ) {
            throw new Error("Unsupported planar configuration: "+planarConfig);
        }
		var meta=image.getMeta();
		var rPalette=meta.RedPaletteColorLookupTableData;
		var gPalette=meta.GreenPaletteColorLookupTableData;
		var bPalette=meta.BluePaletteColorLookupTableData;
		if(!rPalette || !gPalette){
			throw new Error("Unsupported Palette configuration: "+planarConfig);
		}
		rPalette=rPalette.value;
		gPalette=gPalette.value;
		bPalette=bPalette.value;

var scalePalette = function (pal) {
    var min, max, ctr, slope, intercept;
    max = Math.max.apply(Math, pal);
    min = Math.min.apply(Math, pal);
    if ((max > 255) || (min < 0)) {		
        slope = 255.0 / (max - min);
        intercept = min;

        for (ctr = 0; ctr < pal.length; ctr += 1) {
            pal[ctr] = parseInt(Math.round((pal[ctr] - intercept) * slope));
        }
    }
    return pal;
};
		rPalette=scalePalette(rPalette);
		gPalette=scalePalette(gPalette);
		bPalette=scalePalette(bPalette);
		var rPalette = new Uint8Array(rPalette);
		console.log(rPalette);
		
		console.log(image.getBuffer());
		var buffer2 = new Uint8Array(image.getBuffer());
		console.log(buffer2);

        sliceSize = image.getSize().getSliceSize();
        sliceOffset = (sliceNumber || 0) * sliceSize;
        var iMax = sliceOffset + sliceSize;
        for(var i=sliceOffset; i < iMax; ++i){        
            //pxValue = parseInt( image.getValueAtOffset(i) , 10 );						
			//pxValue = parseInt( windowLut.getValue( image.getValueAtOffset(i) ), 10 );									
			//pxValue = image.getValueAtOffset(i);
			pxValue = buffer2[i];
			//32639 7f7f
            array.data[index] = rPalette[pxValue] & 0xFFFF;
            array.data[index+1] = gPalette[pxValue] & 0xFFFF;
            array.data[index+2] = bPalette[pxValue] & 0xFFFF;
            array.data[index+3] = 0xff;
            index += 4;
        }
		console.log(array);
        break;

*/
    case "RGB":	
        // the planar configuration defines the memory layout
        if( planarConfig !== 0 && planarConfig !== 1 ) {
            throw new Error("Unsupported planar configuration: "+planarConfig);
        }
        sliceSize = image.getSize().getSliceSize();
        sliceOffset = (sliceNumber || 0) * 3 * sliceSize;
        // default: RGBRGBRGBRGB...
        var posR = sliceOffset;
        var posG = sliceOffset + 1;
        var posB = sliceOffset + 2;
        var stepPos = 3;
        // RRRR...GGGG...BBBB...
        if (planarConfig === 1) { 
            posR = sliceOffset;
            posG = sliceOffset + sliceSize;
            posB = sliceOffset + 2 * sliceSize;
            stepPos = 1;
        }
        
        var redValue = 0;
        var greenValue = 0;
        var blueValue = 0;
        for(var j=0; j < image.getSize().getSliceSize(); ++j)
        {        
            redValue = parseInt( windowLut.getValue( image.getValueAtOffset(posR) ), 10 );
            greenValue = parseInt( windowLut.getValue( image.getValueAtOffset(posG) ), 10 );
            blueValue = parseInt( windowLut.getValue( image.getValueAtOffset(posB) ), 10 );

            array.data[index] = redValue;
            array.data[index+1] = greenValue;
            array.data[index+2] = blueValue;
            array.data[index+3] = 0xff;
            index += 4;
            
            posR += stepPos;
            posG += stepPos;
            posB += stepPos;
        }
        break;
    
    default: 
        throw new Error("Unsupported photometric interpretation: "+photoInterpretation);
    }
};

/**
 * Add an event listener on the view.
 * @method addEventListener
 * @param {String} type The event type.
 * @param {Object} listener The method associated with the provided event type.
 */
dwv.image.View.prototype.addEventListener = function(type, listener)
{
    var listeners = this.getListeners();
    if( !listeners[type] ) {
        listeners[type] = [];
    }
    listeners[type].push(listener);
};

/**
 * Remove an event listener on the view.
 * @method removeEventListener
 * @param {String} type The event type.
 * @param {Object} listener The method associated with the provided event type.
 */
dwv.image.View.prototype.removeEventListener = function(type, listener)
{
    var listeners = this.getListeners();
    if( !listeners[type] ) {
        return;
    }
    for(var i=0; i < listeners[type].length; ++i)
    {   
        if( listeners[type][i] === listener ) {
            listeners[type].splice(i,1);
        }
    }
};

/**
 * Fire an event: call all associated listeners.
 * @method fireEvent
 * @param {Object} event The event to fire.
 */
dwv.image.View.prototype.fireEvent = function(event)
{
    var listeners = this.getListeners();
    if( !listeners[event.type] ) {
        return;
    }
    for(var i=0; i < listeners[event.type].length; ++i)
    {   
        listeners[event.type][i](event);
    }
};



/*viewer/src/image/reader.js*/

/** 
 * Image module.
 * @module image
 */
var dwv = dwv || {};
/**
 * Namespace for image related functions.
 * @class image
 * @namespace dwv
 * @static
 */
dwv.image = dwv.image || {};

/**
 * Get data from an input image using a canvas.
 * @method getDataFromImage
 * @static
 * @param {Image} image The image.
 * @return {Mixed} The corresponding view and info.
 */
dwv.image.getDataFromImage = function(image)
{
    // draw the image in the canvas in order to get its data
    var canvas = document.getElementById('imageLayer');
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);
    // get the image data
    var imageData = ctx.getImageData(0, 0, image.width, image.height);
    // remove alpha
    // TODO support passing the full image data
    var buffer = [];
    var j = 0;
    for( var i = 0; i < imageData.data.length; i+=4 ) {
        buffer[j] = imageData.data[i];
        buffer[j+1] = imageData.data[i+1];
        buffer[j+2] = imageData.data[i+2];
        j+=3;
    }
    // create dwv Image
    var imageSize = new dwv.image.Size(image.width, image.height);
    // TODO: wrong info...
    var imageSpacing = new dwv.image.Spacing(1,1);
    var sliceIndex = image.index ? image.index : 0;
    var dwvImage = new dwv.image.Image(imageSize, imageSpacing, buffer, [[0,0,sliceIndex]]);
    dwvImage.setPhotometricInterpretation("RGB");
    // meta information
    var meta = {};
    meta.BitsStored = 8;
    dwvImage.setMeta(meta);
    // view
    var view = new dwv.image.View(dwvImage);
    view.setWindowLevelMinMax();
    // properties
    var info = {};
    if( image.file )
    {
        info.fileName = { "value": image.file.name };
        info.fileType = { "value": image.file.type };
        info.fileLastModifiedDate = { "value": image.file.lastModifiedDate };
    }
    info.imageWidth = { "value": image.width };
    info.imageHeight = { "value": image.height };
    // return
    return {"view": view, "info": info};
};

/**
 * Get data from an input buffer using a DICOM parser.
 * @method getDataFromDicomBuffer
 * @static
 * @param {Array} buffer The input data buffer.
 * @return {Mixed} The corresponding view and info.
 */
dwv.image.getDataFromDicomBuffer = function(buffer,filename,callback)
{
	function getextension(s){
		var arr=(s || '').split('.');
		if(arr.length>1) return arr[arr.length-1].toLowerCase();
		else return '';
	}
	if(filename){
		var ext=getextension(filename);
		if(ext=='gz' || ext=='z' || ext=='gzip'){
			//var deflated=event.target.result;
			//var deflated = new Uint8Array(event.target.result);
			//var deflated = buffer.slice(i);
			//for(var i=-100; i <= 100; i++){
			try{
				var inflated = pako.inflate(buffer);//,{'windowBits':i}
				//console.log('ok:'+i);
				var fullByteArray = new Uint8Array(inflated.length);
				fullByteArray.set(inflated, 0);	
				buffer=fullByteArray.buffer;
			}catch(err){
			}
			//}	
		}
	}

    // DICOM parser
    var dicomParser = new dwv.dicom.DicomParser();
    // parse the buffer
    dicomParser.parse(buffer,filename,function(tmpdata){
	
	var view;
	if(tmpdata) view=tmpdata.view;
	else view = dicomParser.createImage();
    // return
	/*if(!callback){
		return {"view": view, "info": dicomParser.dicomElements};
	}*/
	function _return(){
		//console.log(tmpdata);
		//console.log(dicomParser.dicomElements);
		callback({"view": view, "info": dicomParser.dicomElements});
	}
	if(dicomParser.dicomElements.SpecificCharacterSet){
		/*
		https://www.dabsoft.ch/dicom/3/C.12.1.1.2/
		http://www.dclunie.com/images/charset/
		http://www.aycan.de/sample-dicom-images.html
		*/
		function trim(str) {
  			return (str || '').replace(/^\s*|\s*$/g,"");
		}
		function _enc(data,enc,response){
			if(!data || !data.value || !data.value[0]){
				response();
				return;
			}
			var str=data.value[0];
			var bytes = new Uint8Array(str.length);
			for (var i=0; i<str.length; i++){
				bytes[i] = str.charCodeAt(i);
			}
			var blob = new Blob([bytes], {type: 'text/plain'});
			var reader = new FileReader();
			reader.onload = function(e){
				var s=trim(e.target.result);
				if(s) data.value[0]=s.replace(/\$\)C/g,"");
				response();			
			};
			reader.onerror = function(){
				response();
			};
			if(reader.readAsText) reader.readAsText(blob,enc);
			else response();
		}
		var a=dicomParser.dicomElements.SpecificCharacterSet;
		if(a && a.value && a.value.length>0){
			var s='none';
			var s1;
			for(var i = 0; i < a.value.length; i++ ) {
				s1=trim(a.value[i]);
				if(s1){
					s=s1;
					break;
				}
			}
			if(s && s.indexOf("ISO")>0) s=s.substr(s.indexOf("ISO"),s.length);
			if(g_arr_charsets[s]){
				//console.log(s);
				_enc(dicomParser.dicomElements.PatientName, g_arr_charsets[s], function(){
					_enc(dicomParser.dicomElements.PatientID, g_arr_charsets[s], function(){
						_return();
					});
				});			
			 }else{
				 _return();
			 }
		}else{
			_return();
		}
	}else{
		_return();
	}

	}); //callback
};



/*viewer/src/io/file.js*/

/** 
 * I/O module.
 * @module io
 */
var dwv = dwv || {};
dwv.io = dwv.io || {};

/**
 * File loader.
 * @class File
 * @namespace dwv.io
 * @constructor
 */
dwv.io.File = function()
{
    this.onload = null;
    this.onerror = null;
};

/**
 * Load a list of files.
 * @method load
 * @param {Array} ioArray The list of files to load.
 */
dwv.io.File.prototype.load = function(ioArray) 
{
    // create closure to the onload method
    var onload = this.onload;
    var onerror = this.onerror;

    // Request error
    var onErrorImageReader = function(event)
    {
        onerror( {'name': "RequestError", 
            'message': "An error occurred while reading the image file: "+event.getMessage() } );
		$.mobile.loading("hide");	
    };

    // Request error
    var onErrorDicomReader = function(event)
    {
        onerror( {'name': "RequestError", 
            'message': "An error occurred while reading the DICOM file: "+event.getMessage() } );
		$.mobile.loading("hide");	
    };

    // DICOM reader loader
    var onLoadDicomReader = function(event)
    {
        // parse DICOM file
        try {
			var filename;
			if(event.target.file) filename=event.target.file.name;
            dwv.image.getDataFromDicomBuffer(event.target.result,filename,function(tmpdata){
				onload(tmpdata);
			});
        } catch(error) {
            onerror(error);
        }
        // force 100% progress (sometimes with firefox)
        //var endEvent = {lengthComputable: true, loaded: 1, total: 1};
        //dwv.gui.updateProgress(endEvent);
		$.mobile.loading("hide");	
    };

    // Image loader
    var onLoadImageFile = function(/*event*/)
    {
        // parse image file
        try {
            var tmpdata = dwv.image.getDataFromImage(this);
            // call listener
            onload(tmpdata);
        } catch(error) {
            onerror(error);
        }
		$.mobile.loading("hide");	
    };

    // Image reader loader
    var onLoadImageReader = function(event)
    {
        var theImage = new Image();
        theImage.src = event.target.result;
        // storing values to pass them on
        theImage.file = this.file;
        theImage.index = this.index;
        theImage.onload = onLoadImageFile;
    };

    // loop on I/O elements
    for (var i = 0; i < ioArray.length; ++i)
    {
        var file = ioArray[i];
        var reader = new FileReader();
        if( file.type.match("image.*") )
        {
            // storing values to pass them on
            reader.file = file;
            reader.index = i;
            reader.onload = onLoadImageReader;
            reader.onprogress = dwv.gui.updateProgress;
            reader.onerror = onErrorImageReader;
            reader.readAsDataURL(file);
        }
        else
        {
			reader.file = file;
			reader.onload = onLoadDicomReader;
            reader.onprogress = dwv.gui.updateProgress;
            reader.onerror = onErrorDicomReader;
            reader.readAsArrayBuffer(file);
        }
    }
};


/*viewer/src/io/url.js*/

/** 
 * I/O module.
 * @module io
 */
var dwv = dwv || {};
dwv.io = dwv.io || {};

/**
 * Url loader.
 * @class Url
 * @namespace dwv.io
 * @constructor
 */
dwv.io.Url = function()
{
    this.onload = null;
    this.onerror = null;
};

/**
 * Load a list of URLs.
 * @method load
 * @param {Array} ioArray The list of urls to load.
 */
dwv.io.Url.prototype.load = function(ioArray,filename) 
{
    // create closure to the class data
    var onload = this.onload;
    var onerror = this.onerror;
    
    // Request error
    var onErrorRequest = function(/*event*/)
    {
        onerror( {'name': "RequestError", 
            'message': "An error occurred while retrieving the file: (http) "+this.status } );
    };

    // DICOM request loader
    var onLoadDicomRequest = function(response)
    {
        // parse DICOM file
        try {
            dwv.image.getDataFromDicomBuffer(response,filename,function(tmpdata){
				onload(tmpdata);
			});
        } catch(error) {
            onerror(error);
        }
    };

    // Image request loader
    var onLoadImageRequest = function(/*event*/)
    {
        // parse image data
        try {
            var tmpdata = dwv.image.getDataFromImage(this);
            // call listener
            onload(tmpdata);
        } catch(error) {
            onerror(error);
        }
    };

    // Request handler
    var onLoadRequest = function(/*event*/)
    {
		if(this.status != 200){
			//edit
			var s="Error (status) " + this.status + "("+this.statusText+") occurred while receiving the file.";
	        onerror( {'name': "RequestError", 'message':s } );
			return;
		}
        // find the image type
        var view = new DataView(this.response);
        var isJpeg = view.getUint32(0) === 0xffd8ffe0;
        var isPng = view.getUint32(0) === 0x89504e47;
        var isGif = view.getUint32(0) === 0x47494638;
        
        // non DICOM
        if( isJpeg || isPng || isGif )
        {
            // image data as string
            var bytes = new Uint8Array(this.response);
            var imageDataStr = '';
            for( var i = 0; i < bytes.byteLength; ++i ) {
                imageDataStr += String.fromCharCode(bytes[i]);
            }
            // image type
            var imageType = "unknown";
            if(isJpeg) {
                imageType = "jpeg";
            }
            else if(isPng) {
                imageType = "png";
            }
            else if(isGif) {
                imageType = "gif";
            }
            // temporary image object
            var tmpImage = new Image();
            tmpImage.src = "data:image/" + imageType + ";base64," + window.btoa(imageDataStr);
            tmpImage.onload = onLoadImageRequest;
        }
        else
        {
            onLoadDicomRequest(this.response);
        }
    };

    // loop on I/O elements
    for (var i = 0; i < ioArray.length; ++i)
    {
        var url = ioArray[i];
        var request = new XMLHttpRequest();
        // TODO Verify URL...
        request.open('GET', url, true);
        request.responseType = "arraybuffer"; 
        request.onload = onLoadRequest;
        request.onerror = onErrorRequest;
        request.onprogress = dwv.gui.updateProgress;
		if(ioArray.length==1){
			g_arr_load_cancel=function(){
				request.abort();
				if(g_arr_load_end) g_arr_load_end();
			}
		}
        request.send(null);
    }
};


/*viewer/src/math/bucketQueue.js*/

/** 
 * Math module.
 * @module math
 */
var dwv = dwv || {};
dwv.math = dwv.math || {};

/** 
 * Circular Bucket Queue.
 *
 * Returns input'd points in sorted order. All operations run in roughly O(1)
 * time (for input with small cost values), but it has a strict requirement:
 *
 * If the most recent point had a cost of c, any points added should have a cost
 * c' in the range c <= c' <= c + (capacity - 1).
 * 
 * @class BucketQueue
 * @namespace dwv.math
 * @constructor
 * @input bits
 * @input cost_functor
 */
dwv.math.BucketQueue = function(bits, cost_functor)
{
    this.bucketCount = 1 << bits; // # of buckets = 2^bits
    this.mask = this.bucketCount - 1; // 2^bits - 1 = index mask
    this.size = 0;
    
    this.loc = 0; // Current index in bucket list
    
    // Cost defaults to item value
    this.cost = (typeof(cost_functor) !== 'undefined') ? cost_functor : function(item) {
        return item;
    };
    
    this.buckets = this.buildArray(this.bucketCount);
};

dwv.math.BucketQueue.prototype.push = function(item) {
    // Prepend item to the list in the appropriate bucket
    var bucket = this.getBucket(item);
    item.next = this.buckets[bucket];
    this.buckets[bucket] = item;
    
    this.size++;
};

dwv.math.BucketQueue.prototype.pop = function() {
    if ( this.size === 0 ) {
        throw new Error("Cannot pop, bucketQueue is empty.");
    }
    
    // Find first empty bucket
    while ( this.buckets[this.loc] === null ) {
        this.loc = (this.loc + 1) % this.bucketCount;
    }
    
    // All items in bucket have same cost, return the first one
    var ret = this.buckets[this.loc];
    this.buckets[this.loc] = ret.next;
    ret.next = null;
    
    this.size--;
    return ret;
};

dwv.math.BucketQueue.prototype.remove = function(item) {
    // Tries to remove item from queue. Returns true on success, false otherwise
    if ( !item ) {
        return false;
    }
    
    // To find node, go to bucket and search through unsorted list.
    var bucket = this.getBucket(item);
    var node = this.buckets[bucket];
    
    while ( node !== null && !item.equals(node.next) ) {
        node = node.next;
    }
    
    if ( node === null ) {
        // Item not in list, ergo item not in queue
        return false;
    } 
    else {
        // Found item, do standard list node deletion
        node.next = node.next.next;
        
        this.size--;
        return true;
    }
};

dwv.math.BucketQueue.prototype.isEmpty = function() {
    return this.size === 0;
};

dwv.math.BucketQueue.prototype.getBucket = function(item) {
    // Bucket index is the masked cost
    return this.cost(item) & this.mask;
};

dwv.math.BucketQueue.prototype.buildArray = function(newSize) {
    // Create array and initialze pointers to null
    var buckets = new Array(newSize);
    
    for ( var i = 0; i < buckets.length; i++ ) {
        buckets[i] = null;
    }
    
    return buckets;
};


/*viewer/src/math/scissors.js*/

/** 
 * Math module.
 * @module math
 */
var dwv = dwv || {};
dwv.math = dwv.math || {};

// Pre-created to reduce allocation in inner loops
var __twothirdpi = ( 2 / (3 * Math.PI) );

/**
 * 
 */
dwv.math.computeGreyscale = function(data, width, height) {
    // Returns 2D augmented array containing greyscale data
    // Greyscale values found by averaging color channels
    // Input should be in a flat RGBA array, with values between 0 and 255
    var greyscale = [];

    // Compute actual values
    for (var y = 0; y < height; y++) {
        greyscale[y] = [];

        for (var x = 0; x < width; x++) {
            var p = (y*width + x)*4;
            greyscale[y][x] = (data[p] + data[p+1] + data[p+2]) / (3*255);
        }
    }

    // Augment with convenience functions
    greyscale.dx = function(x,y) {
        if ( x+1 === this[y].length ) {
            // If we're at the end, back up one
            x--;
        }
        return this[y][x+1] - this[y][x];
    };

    greyscale.dy = function(x,y) {
        if ( y+1 === this.length ) {
            // If we're at the end, back up one
            y--;
        }
        return this[y][x] - this[y+1][x];
    };

    greyscale.gradMagnitude = function(x,y) {
        var dx = this.dx(x,y); 
        var dy = this.dy(x,y);
        return Math.sqrt(dx*dx + dy*dy);
    };

    greyscale.laplace = function(x,y) { 
        // Laplacian of Gaussian
        var lap = -16 * this[y][x];
        lap += this[y-2][x];
        lap += this[y-1][x-1] + 2*this[y-1][x] + this[y-1][x+1];
        lap += this[y][x-2]   + 2*this[y][x-1] + 2*this[y][x+1] + this[y][x+2];
        lap += this[y+1][x-1] + 2*this[y+1][x] + this[y+1][x+1];
        lap += this[y+2][x];

        return lap;
    };

    return greyscale;
};

/**
 * 
 */
dwv.math.computeGradient = function(greyscale) {
    // Returns a 2D array of gradient magnitude values for greyscale. The values
    // are scaled between 0 and 1, and then flipped, so that it works as a cost
    // function.
    var gradient = [];

    var max = 0; // Maximum gradient found, for scaling purposes

    var x = 0;
    var y = 0;
    
    for (y = 0; y < greyscale.length-1; y++) {
        gradient[y] = [];

        for (x = 0; x < greyscale[y].length-1; x++) {
            gradient[y][x] = greyscale.gradMagnitude(x,y);
            max = Math.max(gradient[y][x], max);
        }

        gradient[y][greyscale[y].length-1] = gradient[y][greyscale.length-2];
    }

    gradient[greyscale.length-1] = [];
    for (var i = 0; i < gradient[0].length; i++) {
        gradient[greyscale.length-1][i] = gradient[greyscale.length-2][i];
    }

    // Flip and scale.
    for (y = 0; y < gradient.length; y++) {
        for (x = 0; x < gradient[y].length; x++) {
            gradient[y][x] = 1 - (gradient[y][x] / max);
        }
    }

    return gradient;
};

/**
 * 
 */
dwv.math.computeLaplace = function(greyscale) {
    // Returns a 2D array of Laplacian of Gaussian values
    var laplace = [];

    // Make the edges low cost here.

    laplace[0] = [];
    laplace[1] = [];
    for (var i = 1; i < greyscale.length; i++) {
        // Pad top, since we can't compute Laplacian
        laplace[0][i] = 1;
        laplace[1][i] = 1;
    }

    for (var y = 2; y < greyscale.length-2; y++) {
        laplace[y] = [];
        // Pad left, ditto
        laplace[y][0] = 1;
        laplace[y][1] = 1;

        for (var x = 2; x < greyscale[y].length-2; x++) {
            // Threshold needed to get rid of clutter.
            laplace[y][x] = (greyscale.laplace(x,y) > 0.33) ? 0 : 1;
        }

        // Pad right, ditto
        laplace[y][greyscale[y].length-2] = 1;
        laplace[y][greyscale[y].length-1] = 1;
    }
    
    laplace[greyscale.length-2] = [];
    laplace[greyscale.length-1] = [];
    for (var j = 1; j < greyscale.length; j++) {
        // Pad bottom, ditto
        laplace[greyscale.length-2][j] = 1;
        laplace[greyscale.length-1][j] = 1;
    }

    return laplace;
};

dwv.math.computeGradX = function(greyscale) {
    // Returns 2D array of x-gradient values for greyscale
    var gradX = [];

    for ( var y = 0; y < greyscale.length; y++ ) {
        gradX[y] = [];

        for ( var x = 0; x < greyscale[y].length-1; x++ ) {
            gradX[y][x] = greyscale.dx(x,y);
        }

        gradX[y][greyscale[y].length-1] = gradX[y][greyscale[y].length-2];
    }

    return gradX;
};

dwv.math.computeGradY = function(greyscale) {
    // Returns 2D array of y-gradient values for greyscale
    var gradY = [];

    for (var y = 0; y < greyscale.length-1; y++) {
        gradY[y] = [];

        for ( var x = 0; x < greyscale[y].length; x++ ) {
            gradY[y][x] = greyscale.dy(x,y);
        }
    }

    gradY[greyscale.length-1] = [];
    for ( var i = 0; i < greyscale[0].length; i++ ) {
        gradY[greyscale.length-1][i] = gradY[greyscale.length-2][i];
    }

    return gradY;
};

dwv.math.gradUnitVector = function(gradX, gradY, px, py, out) {
    // Returns the gradient vector at (px,py), scaled to a magnitude of 1
    var ox = gradX[py][px]; 
    var oy = gradY[py][px];

    var gvm = Math.sqrt(ox*ox + oy*oy);
    gvm = Math.max(gvm, 1e-100); // To avoid possible divide-by-0 errors

    out.x = ox / gvm;
    out.y = oy / gvm;
};

dwv.math.gradDirection = function(gradX, gradY, px, py, qx, qy) {
    var __dgpuv = new dwv.math.FastPoint2D(-1, -1); 
    var __gdquv = new dwv.math.FastPoint2D(-1, -1);
    // Compute the gradiant direction, in radians, between to points
    dwv.math.gradUnitVector(gradX, gradY, px, py, __dgpuv);
    dwv.math.gradUnitVector(gradX, gradY, qx, qy, __gdquv);

    var dp = __dgpuv.y * (qx - px) - __dgpuv.x * (qy - py);
    var dq = __gdquv.y * (qx - px) - __gdquv.x * (qy - py);

    // Make sure dp is positive, to keep things consistant
    if (dp < 0) {
        dp = -dp; 
        dq = -dq;
    }

    if ( px !== qx && py !== qy ) {
        // We're going diagonally between pixels
        dp *= Math.SQRT1_2;
        dq *= Math.SQRT1_2;
    }

    return __twothirdpi * (Math.acos(dp) + Math.acos(dq));
};

dwv.math.computeSides = function(dist, gradX, gradY, greyscale) {
    // Returns 2 2D arrays, containing inside and outside greyscale values.
    // These greyscale values are the intensity just a little bit along the
    // gradient vector, in either direction, from the supplied point. These
    // values are used when using active-learning Intelligent Scissors
    
    var sides = {};
    sides.inside = [];
    sides.outside = [];

    var guv = new dwv.math.FastPoint2D(-1, -1); // Current gradient unit vector

    for ( var y = 0; y < gradX.length; y++ ) {
        sides.inside[y] = [];
        sides.outside[y] = [];

        for ( var x = 0; x < gradX[y].length; x++ ) {
            dwv.math.gradUnitVector(gradX, gradY, x, y, guv);

            //(x, y) rotated 90 = (y, -x)

            var ix = Math.round(x + dist*guv.y);
            var iy = Math.round(y - dist*guv.x);
            var ox = Math.round(x - dist*guv.y);
            var oy = Math.round(y + dist*guv.x);

            ix = Math.max(Math.min(ix, gradX[y].length-1), 0);
            ox = Math.max(Math.min(ox, gradX[y].length-1), 0);
            iy = Math.max(Math.min(iy, gradX.length-1), 0);
            oy = Math.max(Math.min(oy, gradX.length-1), 0);

            sides.inside[y][x] = greyscale[iy][ix];
            sides.outside[y][x] = greyscale[oy][ox];
        }
    }

    return sides;
};

dwv.math.gaussianBlur = function(buffer, out) {
    // Smooth values over to fill in gaps in the mapping
    out[0] = 0.4*buffer[0] + 0.5*buffer[1] + 0.1*buffer[1];
    out[1] = 0.25*buffer[0] + 0.4*buffer[1] + 0.25*buffer[2] + 0.1*buffer[3];

    for ( var i = 2; i < buffer.length-2; i++ ) {
        out[i] = 0.05*buffer[i-2] + 0.25*buffer[i-1] + 0.4*buffer[i] + 0.25*buffer[i+1] + 0.05*buffer[i+2];
    }

    var len = buffer.length;
    out[len-2] = 0.25*buffer[len-1] + 0.4*buffer[len-2] + 0.25*buffer[len-3] + 0.1*buffer[len-4];
    out[len-1] = 0.4*buffer[len-1] + 0.5*buffer[len-2] + 0.1*buffer[len-3];
};


/**
 * Scissors
 * @class Scissors
 * @namespace dwv.math
 * @constructor
 * 
 * Ref: Eric N. Mortensen, William A. Barrett, Interactive Segmentation with
 *   Intelligent Scissors, Graphical Models and Image Processing, Volume 60,
 *   Issue 5, September 1998, Pages 349-384, ISSN 1077-3169,
 *   DOI: 10.1006/gmip.1998.0480.
 * 
 * (http://www.sciencedirect.com/science/article/B6WG4-45JB8WN-9/2/6fe59d8089fd1892c2bfb82283065579)
 * 
 * Highly inspired from http://code.google.com/p/livewire-javascript/
 */
dwv.math.Scissors = function()
{
    this.width = -1;
    this.height = -1;

    this.curPoint = null; // Corrent point we're searching on.
    this.searchGranBits = 8; // Bits of resolution for BucketQueue.
    this.searchGran = 1 << this.earchGranBits; //bits.
    this.pointsPerPost = 500;

    // Precomputed image data. All in ranges 0 >= x >= 1 and all inverted (1 - x).
    this.greyscale = null; // Greyscale of image
    this.laplace = null; // Laplace zero-crossings (either 0 or 1).
    this.gradient = null; // Gradient magnitudes.
    this.gradX = null; // X-differences.
    this.gradY = null; // Y-differences.

    this.parents = null; // Matrix mapping point => parent along shortest-path to root.

    this.working = false; // Currently computing shortest paths?

    // Begin Training:
    this.trained = false;
    this.trainingPoints = null;

    this.edgeWidth = 2;
    this.trainingLength = 32;

    this.edgeGran = 256;
    this.edgeTraining = null;

    this.gradPointsNeeded = 32;
    this.gradGran = 1024;
    this.gradTraining = null;

    this.insideGran = 256;
    this.insideTraining = null;

    this.outsideGran = 256;
    this.outsideTraining = null;
    // End Training
}; // Scissors class

// Begin training methods //
dwv.math.Scissors.prototype.getTrainingIdx = function(granularity, value) {
    return Math.round((granularity - 1) * value);
};

dwv.math.Scissors.prototype.getTrainedEdge = function(edge) {
    return this.edgeTraining[this.getTrainingIdx(this.edgeGran, edge)];
};

dwv.math.Scissors.prototype.getTrainedGrad = function(grad) {
    return this.gradTraining[this.getTrainingIdx(this.gradGran, grad)];
};

dwv.math.Scissors.prototype.getTrainedInside = function(inside) {
    return this.insideTraining[this.getTrainingIdx(this.insideGran, inside)];
};

dwv.math.Scissors.prototype.getTrainedOutside = function(outside) {
    return this.outsideTraining[this.getTrainingIdx(this.outsideGran, outside)];
};
// End training methods //

dwv.math.Scissors.prototype.setWorking = function(working) {
    // Sets working flag
    this.working = working;
};

dwv.math.Scissors.prototype.setDimensions = function(width, height) {
    this.width = width;
    this.height = height;
};

dwv.math.Scissors.prototype.setData = function(data) {
    if ( this.width === -1 || this.height === -1 ) {
        // The width and height should have already been set
        throw new Error("Dimensions have not been set.");
    }

    this.greyscale = dwv.math.computeGreyscale(data, this.width, this.height);
    this.laplace = dwv.math.computeLaplace(this.greyscale);
    this.gradient = dwv.math.computeGradient(this.greyscale);
    this.gradX = dwv.math.computeGradX(this.greyscale);
    this.gradY = dwv.math.computeGradY(this.greyscale);
    
    var sides = dwv.math.computeSides(this.edgeWidth, this.gradX, this.gradY, this.greyscale);
    this.inside = sides.inside;
    this.outside = sides.outside;
    this.edgeTraining = [];
    this.gradTraining = [];
    this.insideTraining = [];
    this.outsideTraining = [];
};

dwv.math.Scissors.prototype.findTrainingPoints = function(p) {
    // Grab the last handful of points for training
    var points = [];

    if ( this.parents !== null ) {
        for ( var i = 0; i < this.trainingLength && p; i++ ) {
            points.push(p);
            p = this.parents[p.y][p.x];
        }
    }

    return points;
};

dwv.math.Scissors.prototype.resetTraining = function() {
    this.trained = false; // Training is ignored with this flag set
};

dwv.math.Scissors.prototype.doTraining = function(p) {
    // Compute training weights and measures
    this.trainingPoints = this.findTrainingPoints(p);

    if ( this.trainingPoints.length < 8 ) {
        return; // Not enough points, I think. It might crash if length = 0.
    }

    var buffer = [];
    this.calculateTraining(buffer, this.edgeGran, this.greyscale, this.edgeTraining);
    this.calculateTraining(buffer, this.gradGran, this.gradient, this.gradTraining);
    this.calculateTraining(buffer, this.insideGran, this.inside, this.insideTraining);
    this.calculateTraining(buffer, this.outsideGran, this.outside, this.outsideTraining);

    if ( this.trainingPoints.length < this.gradPointsNeeded ) {
        // If we have two few training points, the gradient weight map might not
        // be smooth enough, so average with normal weights.
        this.addInStaticGrad(this.trainingPoints.length, this.gradPointsNeeded);
    }

    this.trained = true;
};

dwv.math.Scissors.prototype.calculateTraining = function(buffer, granularity, input, output) {
    var i = 0;
    // Build a map of raw-weights to trained-weights by favoring input values
    buffer.length = granularity;
    for ( i = 0; i < granularity; i++ ) {
        buffer[i] = 0;
    }

    var maxVal = 1;
    for ( i = 0; i < this.trainingPoints.length; i++ ) {
        var p = this.trainingPoints[i];
        var idx = this.getTrainingIdx(granularity, input[p.y][p.x]);
        buffer[idx] += 1;

        maxVal = Math.max(maxVal, buffer[idx]);
    }

    // Invert and scale.
    for ( i = 0; i < granularity; i++ ) {
        buffer[i] = 1 - buffer[i] / maxVal;
    }

    // Blur it, as suggested. Gets rid of static.
    dwv.math.gaussianBlur(buffer, output);
};

dwv.math.Scissors.prototype.addInStaticGrad = function(have, need) {
    // Average gradient raw-weights to trained-weights map with standard weight
    // map so that we don't end up with something to spiky
    for ( var i = 0; i < this.gradGran; i++ ) {
        this.gradTraining[i] = Math.min(this.gradTraining[i],  1 - i*(need - have)/(need*this.gradGran));
    }
};

dwv.math.Scissors.prototype.gradDirection = function(px, py, qx, qy) {
    return dwv.math.gradDirection(this.gradX, this.gradY, px, py, qx, qy);
};

dwv.math.Scissors.prototype.dist = function(px, py, qx, qy) {
    // The grand culmunation of most of the code: the weighted distance function
    var grad =  this.gradient[qy][qx];

    if ( px === qx || py === qy ) {
        // The distance is Euclidean-ish; non-diagonal edges should be shorter
        grad *= Math.SQRT1_2;
    }

    var lap = this.laplace[qy][qx];
    var dir = this.gradDirection(px, py, qx, qy);

    if ( this.trained ) {
        // Apply training magic
        var gradT = this.getTrainedGrad(grad);
        var edgeT = this.getTrainedEdge(this.greyscale[py][px]);
        var insideT = this.getTrainedInside(this.inside[py][px]);
        var outsideT = this.getTrainedOutside(this.outside[py][px]);

        return 0.3*gradT + 0.3*lap + 0.1*(dir + edgeT + insideT + outsideT);
    } else {
        // Normal weights
        return 0.43*grad + 0.43*lap + 0.11*dir;
    }
};

dwv.math.Scissors.prototype.adj = function(p) {
    var list = [];

    var sx = Math.max(p.x-1, 0);
    var sy = Math.max(p.y-1, 0);
    var ex = Math.min(p.x+1, this.greyscale[0].length-1);
    var ey = Math.min(p.y+1, this.greyscale.length-1);

    var idx = 0;
    for ( var y = sy; y <= ey; y++ ) {
        for ( var x = sx; x <= ex; x++ ) {
            if ( x !== p.x || y !== p.y ) {
                list[idx++] = new dwv.math.FastPoint2D(x,y);
            }
        }
    }

    return list;
};

dwv.math.Scissors.prototype.setPoint = function(sp) {
    this.setWorking(true);

    this.curPoint = sp;
    
    var x = 0;
    var y = 0;

    this.visited = [];
    for ( y = 0; y < this.height; y++ ) {
        this.visited[y] = [];
        for ( x = 0; x < this.width; x++ ) {
            this.visited[y][x] = false;
        }
    }

    this.parents = [];
    for ( y = 0; y < this.height; y++ ) {
        this.parents[y] = [];
    }

    this.cost = [];
    for ( y = 0; y < this.height; y++ ) {
        this.cost[y] = [];
        for ( x = 0; x < this.width; x++ ) {
            this.cost[y][x] = Number.MAX_VALUE;
        }
    }

    this.pq = new dwv.math.BucketQueue(this.searchGranBits, function(p) {
        return Math.round(this.searchGran * this.costArr[p.y][p.x]);
    });
    this.pq.searchGran = this.searchGran;
    this.pq.costArr = this.cost;

    this.pq.push(sp);
    this.cost[sp.y][sp.x] = 0;
};

dwv.math.Scissors.prototype.doWork = function() {
    if ( !this.working ) {
        return;
    }

    this.timeout = null;

    var pointCount = 0;
    var newPoints = [];
    while ( !this.pq.isEmpty() && pointCount < this.pointsPerPost ) {
        var p = this.pq.pop();
        newPoints.push(p);
        newPoints.push(this.parents[p.y][p.x]);

        this.visited[p.y][p.x] = true;

        var adjList = this.adj(p);
        for ( var i = 0; i < adjList.length; i++) {
            var q = adjList[i];

            var pqCost = this.cost[p.y][p.x] + this.dist(p.x, p.y, q.x, q.y);

            if ( pqCost < this.cost[q.y][q.x] ) {
                if ( this.cost[q.y][q.x] !== Number.MAX_VALUE ) {
                    // Already in PQ, must remove it so we can re-add it.
                    this.pq.remove(q);
                }

                this.cost[q.y][q.x] = pqCost;
                this.parents[q.y][q.x] = p;
                this.pq.push(q);
            }
        }

        pointCount++;
    }

    return newPoints;
};


/*viewer/src/math/shapes.js*/

/** 
 * Math module.
 * @module math
 */
var dwv = dwv || {};
dwv.math = dwv.math || {};

/** 
 * 2D point. Immutable.
 * @class Point2D
 * @namespace dwv.math
 * @constructor
 * @param {Number} x The X coordinate for the point.
 * @param {Number} y The Y coordinate for the point.
 */
dwv.math.Point2D = function(x,y)
{
    /** 
     * Get the X position of the point.
     * @method getX
     * @return {Number} The X position of the point.
     */
    this.getX = function() { return x; };
    /** 
     * Get the Y position of the point.
     * @method getY
     * @return {Number} The Y position of the point. 
     */
    this.getY = function() { return y; };
}; // Point2D class

/** 
 * Check for Point2D equality.
 * @method equals
 * @param {Point2D} other The other Point2D to compare to.
 * @return {Boolean} True if both points are equal.
 */ 
dwv.math.Point2D.prototype.equals = function(other) {
    if( !other ) { 
        return false;
    }
    return ( this.getX() === other.getX() && this.getY() === other.getY() );
};

/** 
 * Get a string representation of the Point2D.
 * @method toString
 * @return {String} The Point2D as a string.
 */ 
dwv.math.Point2D.prototype.toString = function() {
    return "(" + this.getX() + ", " + this.getY() + ")";
};

/** 
 * Fast 2D point since it's mutable!
 * @class FastPoint2D
 * @namespace dwv.math
 * @constructor
 * @param {Number} x The X coordinate for the point.
 * @param {Number} y The Y coordinate for the point.
 */
dwv.math.FastPoint2D = function(x,y)
{
    this.x = x;
    this.y = y;
}; // FastPoint2D class

/** 
 * Check for FastPoint2D equality.
 * @method equals
 * @param {FastPoint2D} other The other FastPoint2D to compare to.
 * @return {Boolean} True if both points are equal.
 */ 
dwv.math.FastPoint2D.prototype.equals = function(other) {
    if( !other ) { 
        return false;
    }
    return ( this.x === other.x && this.y === other.y );
};

/** 
 * Get a string representation of the FastPoint2D.
 * @method toString
 * @return {String} The Point2D as a string.
 */ 
dwv.math.FastPoint2D.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")";
};

/** 
 * Circle shape.
 * @class Circle
 * @namespace dwv.math
 * @constructor
 * @param {Object} centre A Point2D representing the centre of the circle.
 * @param {Number} radius The radius of the circle.
 */
dwv.math.Circle = function(centre, radius)
{
    /**
     * Circle surface.
     * @property surface
     * @private
     * @type Number
     */
    var surface = Math.PI*radius*radius;

    /**
     * Get the centre (point) of the circle.
     * @method getCenter
     * @return {Object} The center (point) of the circle.
     */
    this.getCenter = function() { return centre; };
    /**
     * Get the radius of the circle.
     * @method getRadius
     * @return {Number} The radius of the circle.
     */
    this.getRadius = function() { return radius; };
    /**
     * Get the surface of the circle.
     * @method getSurface
     * @return {Number} The surface of the circle.
     */
    this.getSurface = function() { return surface; };
    /**
     * Get the surface of the circle with a spacing.
     * @method getWorldSurface
     * @param {Number} spacingX The X spacing.
     * @param {Number} spacingY The Y spacing.
     * @return {Number} The surface of the circle multiplied by the given spacing.
     */
    this.getWorldSurface = function(spacingX, spacingY)
    {
        return surface * spacingX * spacingY;
    };
}; // Circle class

/** 
 * Ellipse shape.
 * @class Ellipse
 * @namespace dwv.math
 * @constructor
 * @param {Object} centre A Point2D representing the centre of the ellipse.
 * @param {Number} a The radius of the ellipse on the horizontal axe.
 * @param {Number} b The radius of the ellipse on the vertical axe.
 */
dwv.math.Ellipse = function(centre, a, b)
{
    /**
     * Circle surface.
     * @property surface
     * @private
     * @type Number
     */
    var surface = Math.PI*a*b;

    /**
     * Get the centre (point) of the ellipse.
     * @method getCenter
     * @return {Object} The center (point) of the ellipse.
     */
    this.getCenter = function() { return centre; };
    /**
     * Get the radius of the ellipse on the horizontal axe.
     * @method getA
     * @return {Number} The radius of the ellipse on the horizontal axe.
     */
    this.getA = function() { return a; };
    /**
     * Get the radius of the ellipse on the vertical axe.
     * @method getB
     * @return {Number} The radius of the ellipse on the vertical axe.
     */
    this.getB = function() { return b; };
    /**
     * Get the surface of the ellipse.
     * @method getSurface
     * @return {Number} The surface of the ellipse.
     */
    this.getSurface = function() { return surface; };
    /**
     * Get the surface of the ellipse with a spacing.
     * @method getWorldSurface
     * @param {Number} spacingX The X spacing.
     * @param {Number} spacingY The Y spacing.
     * @return {Number} The surface of the ellipse multiplied by the given spacing.
     */
    this.getWorldSurface = function(spacingX, spacingY)
    {
        return surface * spacingX * spacingY;
    };
}; // Circle class

/**
 * Line shape.
 * @class Line
 * @namespace dwv.math
 * @constructor
 * @param {Object} begin A Point2D representing the beginning of the line.
 * @param {Object} end A Point2D representing the end of the line.
 */
dwv.math.Line = function(begin, end)
{
    /**
     * Line length.
     * @property length
     * @private
     * @type Number
     */
    var length = Math.sqrt(
        Math.abs(end.getX() - begin.getX()) * Math.abs(end.getX() - begin.getX()) +
        Math.abs(end.getY() - begin.getY()) * Math.abs(end.getY() - begin.getY() ) );
    
    /**
     * Get the begin point of the line.
     * @method getBegin
     * @return {Object} The beginning point of the line.
     */
    this.getBegin = function() { return begin; };
    /**
     * Get the end point of the line.
     * @method getEnd
     * @return {Object} The ending point of the line.
     */
    this.getEnd = function() { return end; };
    /**
     * Get the length of the line.
     * @method getLength
     * @return {Number} The length of the line.
     */
    this.getLength = function() { return length; };
    /**
     * Get the length of the line with spacing.
     * @method getWorldLength
     * @param {Number} spacingX The X spacing.
     * @param {Number} spacingY The Y spacing.
     * @return {Number} The length of the line with spacing.
     */
    this.getWorldLength = function(spacingX, spacingY)
    {
        var lx = Math.abs(end.getX() - begin.getX()) * spacingX;
        var ly = Math.abs(end.getY() - begin.getY()) * spacingY;
        return Math.sqrt( lx * lx + ly * ly );
    };
    /**
     * Get the mid point of the line.
     * @method getMidpoint
     * @return {Object} The mid point of the line.
     */
    this.getMidpoint = function()
    {
        return new dwv.math.Point2D( 
            parseInt( (begin.getX()+end.getX()) / 2, 10 ), 
            parseInt( (begin.getY()+end.getY()) / 2, 10 ) );
    };
}; // Line class

/**
 * Rectangle shape.
 * @class Rectangle
 * @namespace dwv.math
 * @constructor
 * @param {Object} begin A Point2D representing the beginning of the rectangle.
 * @param {Object} end A Point2D representing the end of the rectangle.
 */
dwv.math.Rectangle = function(begin, end)
{
    if ( end.getX() < begin.getX() ) {
        var tmpX = begin.getX();
        begin = new dwv.math.Point2D( end.getX(), begin.getY() );
        end = new dwv.math.Point2D( tmpX, end.getY() );
    }
    if ( end.getY() < begin.getY() ) {
        var tmpY = begin.getY();
        begin = new dwv.math.Point2D( begin.getX(), end.getY() );
        end = new dwv.math.Point2D( end.getX(), tmpY );
    }
    
    /**
     * Rectangle surface.
     * @property surface
     * @private
     * @type Number
     */
    var surface = Math.abs(end.getX() - begin.getX()) * Math.abs(end.getY() - begin.getY() );

    /**
     * Get the begin point of the rectangle.
     * @method getBegin
     * @return {Object} The begin point of the rectangle
     */
    this.getBegin = function() { return begin; };
    /**
     * Get the end point of the rectangle.
     * @method getEnd
     * @return {Object} The end point of the rectangle
     */
    this.getEnd = function() { return end; };
    /**
     * Get the real width of the rectangle.
     * @method getRealWidth
     * @return {Number} The real width of the rectangle.
     */
    this.getRealWidth = function() { return end.getX() - begin.getX(); };
    /**
     * Get the real height of the rectangle.
     * @method getRealHeight
     * @return {Number} The real height of the rectangle.
     */
    this.getRealHeight = function() { return end.getY() - begin.getY(); };
    /**
     * Get the width of the rectangle.
     * @method getWidth
     * @return {Number} The width of the rectangle.
     */
    this.getWidth = function() { return Math.abs(this.getRealWidth()); };
    /**
     * Get the height of the rectangle.
     * @method getHeight
     * @return {Number} The height of the rectangle.
     */
    this.getHeight = function() { return Math.abs(this.getRealHeight()); };
    /**
     * Get the surface of the rectangle.
     * @method getSurface
     * @return {Number} The surface of the rectangle.
     */
    this.getSurface = function() { return surface; };
    /**
     * Get the surface of the rectangle with a spacing.
     * @method getWorldSurface
     * @return {Number} The surface of the rectangle with a spacing.
     */
    this.getWorldSurface = function(spacingX, spacingY)
    {
        return surface * spacingX * spacingY;
    };
}; // Rectangle class

/**
 * Region Of Interest shape.
 * @class ROI
 * @namespace dwv.math
 * @constructor
 * Note: should be a closed path.
 */
dwv.math.ROI = function()
{
    /**
     * List of points.
     * @property points
     * @private
     * @type Array
     */
    var points = [];
    
    /**
     * Get a point of the list at a given index.
     * @method getPoint
     * @param {Number} index The index of the point to get (beware, no size check).
     * @return {Object} The Point2D at the given index.
     */ 
    this.getPoint = function(index) { return points[index]; };
    /**
     * Get the length of the point list.
     * @method getLength
     * @return {Number} The length of the point list.
     */ 
    this.getLength = function() { return points.length; };
    /**
     * Add a point to the ROI.
     * @method addPoint
     * @param {Object} point The Point2D to add.
     */
    this.addPoint = function(point) { points.push(point); };
    /**
     * Add points to the ROI.
     * @method addPoints
     * @param {Array} rhs The array of POints2D to add.
     */
    this.addPoints = function(rhs) { points=points.concat(rhs);};
}; // ROI class

/**
 * Path shape.
 * @class Path
 * @namespace dwv.math
 * @constructor
 * @param {Array} inputPointArray The list of Point2D that make the path (optional).
 * @param {Array} inputControlPointIndexArray The list of control point of path, 
 *  as indexes (optional).
 * Note: first and last point do not need to be equal.
 */
dwv.math.Path = function(inputPointArray, inputControlPointIndexArray)
{
    /**
     * List of points.
     * @property pointArray
     * @type Array
     */
    this.pointArray = inputPointArray ? inputPointArray.slice() : [];
    /**
     * List of control points.
     * @property controlPointIndexArray
     * @type Array
     */
    this.controlPointIndexArray = inputControlPointIndexArray ?
        inputControlPointIndexArray.slice() : [];
}; // Path class

/**
 * Get a point of the list.
 * @method getPoint
 * @param {Number} index The index of the point to get (beware, no size check).
 * @return {Object} The Point2D at the given index.
 */ 
dwv.math.Path.prototype.getPoint = function(index) {
    return this.pointArray[index];
};

/**
 * Is the given point a control point.
 * @method isControlPoint
 * @param {Object} point The Point2D to check.
 * @return {Boolean} True if a control point.
 */ 
dwv.math.Path.prototype.isControlPoint = function(point) {
    var index = this.pointArray.indexOf(point);
    if( index !== -1 ) {
        return this.controlPointIndexArray.indexOf(index) !== -1;
    }
    else {
        throw new Error("Error: isControlPoint called with not in list point.");
    }
};

/**
 * Get the length of the path.
 * @method getLength
 * @return {Number} The length of the path.
 */ 
dwv.math.Path.prototype.getLength = function() { 
    return this.pointArray.length;
};

/**
 * Add a point to the path.
 * @method addPoint
 * @param {Object} point The Point2D to add.
 */
dwv.math.Path.prototype.addPoint = function(point) {
    this.pointArray.push(point);
};

/**
 * Add a control point to the path.
 * @method addControlPoint
 * @param {Object} point The Point2D to make a control point.
 */
dwv.math.Path.prototype.addControlPoint = function(point) {
    var index = this.pointArray.indexOf(point);
    if( index !== -1 ) {
        this.controlPointIndexArray.push(index);
    }
    else {
        throw new Error("Error: addControlPoint called with no point in list point.");
    }
};

/**
 * Add points to the path.
 * @method addPoints
 * @param {Array} points The list of Point2D to add.
 */
dwv.math.Path.prototype.addPoints = function(newPointArray) { 
    this.pointArray = this.pointArray.concat(newPointArray);
};

/**
 * Append a Path to this one.
 * @method appenPath
 * @param {Path} other The Path to append.
 */
dwv.math.Path.prototype.appenPath = function(other) {
    var oldSize = this.pointArray.length;
    this.pointArray = this.pointArray.concat(other.pointArray);
    var indexArray = [];
    for( var i=0; i < other.controlPointIndexArray.length; ++i ) {
        indexArray[i] = other.controlPointIndexArray[i] + oldSize;
    }
    this.controlPointIndexArray = this.controlPointIndexArray.concat(indexArray);
};


/*viewer/src/math/stats.js*/

/** 
 * Math module.
 * @module math
 */
var dwv = dwv || {};
dwv.math = dwv.math || {};

/**
 * Get the minimum, maximum, mean and standard deviation
 * of an array of values.
 * Note: could use https://github.com/tmcw/simple-statistics
 * @method getStats
 * @static
 */
dwv.math.getStats = function (array)
{
    var min = array[0];
    var max = min;
    var mean = 0;
    var sum = 0;
    var sumSqr = 0;
    var stdDev = 0;
    var variance = 0;
    
    var val = 0;
    for ( var i = 0; i < array.length; ++i ) {
        val = array[i];
        if ( val < min ) {
            min = val;
        }
        else if ( val > max ) {
            max = val;
        }
        sum += val;
        sumSqr += val * val;
    }
    
    mean = sum / array.length;
    // see http://en.wikipedia.org/wiki/Algorithms_for_calculating_variance
    variance = sumSqr / array.length - mean * mean;
    stdDev = Math.sqrt(variance);
    
    return { 'min': min, 'max': max, 'mean': mean, 'stdDev': stdDev };
};


/*viewer/src/tools/draw.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};

/**
 * Draw shape command.
 * @class DrawShapeCommand
 * @namespace dwv.tool
 * @constructor
 */
dwv.tool.DrawShapeCommand = function (shape, name, layer)
{
    /**
     * Get the command name.
     * @method getName
     * @return {String} The command name.
     */
    this.getName = function () { return "Draw-"+name; };
    /**
     * Execute the command.
     * @method execute
     */
    this.execute = function () {
        var group = shape.getParent();
        // add the group to the layer
        layer.add(group);
        // draw
        layer.draw();
    };
    /**
     * Undo the command.
     * @method undo
     */
    this.undo = function () {
        var group = shape.getParent();
        // remove the group from the parent layer
        group.remove();
        // draw
        layer.draw();
    };
}; // DrawShapeCommand class

/**
 * Move shape command.
 * @class MoveShapeCommand
 * @namespace dwv.tool
 * @constructor
 */
dwv.tool.MoveShapeCommand = function (shape, name, translation, layer)
{
    /**
     * Get the command name.
     * @method getName
     * @return {String} The command name.
     */
    this.getName = function () { return "Move-"+name; };

    /**
     * Execute the command.
     * @method execute
     */
    this.execute = function () {
        var group = shape.getParent();
        // translate all children of group
        group.getChildren().each( function (shape) {
            shape.x( shape.x() + translation.x );
            shape.y( shape.y() + translation.y );
        });
        // draw
        layer.draw();
    };
    /**
     * Undo the command.
     * @method undo
     */
    this.undo = function () {
        var group = shape.getParent();
        // invert translate all children of group
        group.getChildren().each( function (shape) {
            shape.x( shape.x() - translation.x );
            shape.y( shape.y() - translation.y );
        });
        // draw
        layer.draw();
    };
}; // MoveShapeCommand class

/**
 * Change shape command.
 * @class ChangeShapeCommand
 * @namespace dwv.tool
 * @constructor
 */
dwv.tool.ChangeShapeCommand = function (shape, name, func, startAnchor, endAnchor, layer, image)
{
    /**
     * Get the command name.
     * @method getName
     * @return {String} The command name.
     */
    this.getName = function () { return "Change-"+name; };

    /**
     * Execute the command.
     * @method execute
     */
    this.execute = function () {
        // change shape
        func( shape, endAnchor, image );
        // draw
        layer.draw();
    };
    /**
     * Undo the command.
     * @method undo
     */
    this.undo = function () {
        // invert change shape
        func( shape, startAnchor, image );
        // draw
        layer.draw();
    };
}; // ChangeShapeCommand class

/**
 * Delete shape command.
 * @class DeleteShapeCommand
 * @namespace dwv.tool
 * @constructor
 */
dwv.tool.DeleteShapeCommand = function (shape, name, layer)
{
    /**
     * Get the command name.
     * @method getName
     * @return {String} The command name.
     */
    this.getName = function () { return "Delete-"+name; };
    /**
     * Execute the command.
     * @method execute
     */
    this.execute = function () {
        var group = shape.getParent();
        // remove the group from the parent layer
        group.remove();
        // draw
        layer.draw();
    };
    /**
     * Undo the command.
     * @method undo
     */
    this.undo = function () {
        var group = shape.getParent();
        // add the group to the layer
        layer.add(group);
        // draw
        layer.draw();
    };
}; // DeleteShapeCommand class

// List of colors
dwv.tool.colors = [
    "Yellow", "Red", "White", "Green", "Blue", "Lime", "Fuchsia", "Black"
];

/**
 * Drawing tool.
 * @class Draw
 * @namespace dwv.tool
 * @constructor
 * @param {Object} app The associated application.
 */
dwv.tool.Draw = function (app)
{
    /**
     * Closure to self: to be used by event handlers.
     * @property self
     * @private
     * @type WindowLevel
     */
    var self = this;
    /**
     * Interaction start flag.
     * @property started
     * @private
     * @type Boolean
     */
    var started = false;
    /**
     * Interaction just started flag.
     * @property justStarted
     * @private
     * @type Boolean
     */
    var justStarted = true;
    
    /**
     * Draw command.
     * @property command
     * @private
     * @type Object
     */
    var command = null;
    /**
     * Current active shape.
     * @property activeShape
     * @private
     * @type Object
     */
    var activeShape = null;
    var activeText = null;
    /**
     * List of created shapes.
     * @property createdShapes
     * @private
     * @type Array
     */
    var createdShapes = [];
    /**
     * Current shape group.
     * @property shapeGroup
     * @private
     * @type Object
     */
    var shapeGroup = null;

    /**
     * Drawing style.
     * @property style
     * @type Style
     */
    this.style = new dwv.html.Style();
    /**
     * Shape name.
     * @property shapeName
     * @type String
     */
    this.shapeName = 0;
    
    /**
     * List of points.
     * @property points
     * @private
     * @type Array
     */
    var points = [];
    
    /**
     * Last selected point.
     * @property lastPoint
     * @private
     * @type Object
     */
    var lastPoint = null;
    
    /**
     * Shape editor.
     * @property shapeEditor
     * @private
     * @type Object
     */
    var shapeEditor = new dwv.tool.ShapeEditor();

    /**
     * Trash draw: a cross.
     * @property trash
     * @private
     * @type Object
     */
    var trash = new Kinetic.Group();

    // first line of the cross
    var trashLine1 = new Kinetic.Line({
        points: [-10, -10, 10, 10 ],
        stroke: 'red',
    });
    // second line of the cross
    var trashLine2 = new Kinetic.Line({
        points: [10, -10, -10, 10 ],
        stroke: 'red'
    });
    trash.add(trashLine1);
    trash.add(trashLine2);

    /**
     * The associated draw layer.
     * @property drawLayer
     * @private
     * @type Object
     */
    var drawLayer = null;
    
    /**
     * Handle mouse down event.
     * @method mousedown
     * @param {Object} event The mouse down event.
     */
    this.mousedown = function(event){
        // determine if the click happened in an existing shape
        var stage = app.getDrawStage();
        var kshape = stage.getIntersection({
            x: event._xs, 
            y: event._ys
        });
        
        if ( kshape ) {
            var group = kshape.getParent();
            var selectedShape = group.find(".shape")[0];
            // reset editor if click on other shape
            // (and avoid anchors mouse down)
            if ( selectedShape && selectedShape !== shapeEditor.getShape() ) { 
                shapeEditor.disable();
                shapeEditor.setShape(selectedShape);
                shapeEditor.setImage(app.getImage());
                shapeEditor.enable();
            }
        }
        else {
            // disable edition
            shapeEditor.disable();
            shapeEditor.setShape(null);
            shapeEditor.setImage(null);
            // start storing points
            started = true;
            shapeGroup = new Kinetic.Group();
            // clear array
            points = [];
            // store point
            lastPoint = new dwv.math.Point2D(event._x, event._y);
            points.push(lastPoint);
        }
    };

    /**
     * Handle mouse move event.
     * @method mousemove
     * @param {Object} event The mouse move event.
     */
    this.mousemove = function(event){
        if (!started)
        {
            return;
        }
        if ( Math.abs( event._x - lastPoint.getX() ) > 0 ||
                Math.abs( event._y - lastPoint.getY() ) > 0 )
        {
            // current point
            lastPoint = new dwv.math.Point2D(event._x, event._y);
            points.push( lastPoint );
            // remove previous draw if not just started
            if ( activeShape && !justStarted ) {
                activeShape.destroy();
                activeText.destroy();
            }
            if ( justStarted ) {
                justStarted = false;
            }
            // create shape
            var tmp = new dwv.tool.shapes[self.shapeName](points, self.style, app.getImage());
            activeShape = tmp.shape;
            activeText = tmp.text;
            // do not listen during creation
            activeShape.listening(false);
            drawLayer.hitGraphEnabled(false);
            // add shape to group
            shapeGroup.add(activeShape);
            shapeGroup.add(activeText);
            // draw shape command
            command = new dwv.tool.DrawShapeCommand(activeShape, self.shapeName, drawLayer);
            // draw
            command.execute();
        }
    };

    /**
     * Handle mouse up event.
     * @method mouseup
     * @param {Object} event The mouse up event.
     */
    this.mouseup = function (/*event*/){
        if (started && points.length > 1 )
        {
            // remove previous draw
            if ( activeShape ) {
                activeShape.destroy();
                activeText.destroy();
            }
            // create final shape
            var tmp = new dwv.tool.shapes[self.shapeName](points, self.style, app.getImage());
            activeShape = tmp.shape;
            activeText = tmp.text;
            // re-activate layer
            drawLayer.hitGraphEnabled(true);
            // add shape to group
            shapeGroup.add(activeShape);
            shapeGroup.add(activeText);
            // draw shape command
            command = new dwv.tool.DrawShapeCommand(activeShape, self.shapeName, drawLayer);
            // execute it
            command.execute();
            // save it in undo stack
            app.getUndoStack().add(command);
            
            // set shape on
            self.setShapeOn(activeShape, activeText);
            createdShapes.push({"shape": activeShape, "text": activeText});
        }
        // reset flag
        started = false;
        justStarted = true;
    };
    
    /**
     * Handle mouse out event.
     * @method mouseout
     * @param {Object} event The mouse out event.
     */
    this.mouseout = function(event){
        self.mouseup(event);
    };

    /**
     * Handle touch start event.
     * @method touchstart
     * @param {Object} event The touch start event.
     */
    this.touchstart = function(event){
        self.mousedown(event);
    };

    /**
     * Handle touch move event.
     * @method touchmove
     * @param {Object} event The touch move event.
     */
    this.touchmove = function(event){
        self.mousemove(event);
    };

    /**
     * Handle touch end event.
     * @method touchend
     * @param {Object} event The touch end event.
     */
    this.touchend = function(event){
        self.mouseup(event);
    };

    /**
     * Handle key down event.
     * @method keydown
     * @param {Object} event The key down event.
     */
    this.keydown = function(event){
        app.onKeydown(event);
    };

    /**
     * Enable the tool.
     * @method enable
     * @param {Boolean} flag The flag to enable or not.
     */
    this.display = function ( flag ){
        dwv.gui.displayDrawHtml( flag );
        // reset shape display properties
        shapeEditor.disable();
        shapeEditor.setShape(null);
        shapeEditor.setImage(null);
        document.body.style.cursor = 'default';
        // make layer listen or not to events
        app.getDrawStage().listening( flag );
        drawLayer = app.getDrawLayer();
        drawLayer.listening( flag );
        drawLayer.hitGraphEnabled( flag );
        // set shape display properties
        if ( flag ) {
            app.addLayerListeners( app.getDrawStage().getContent() );
            createdShapes.forEach( function (elem){ self.setShapeOn( elem.shape, elem.text ); });
        }
        else {
            app.removeLayerListeners( app.getDrawStage().getContent() );
            createdShapes.forEach( function (elem){ setShapeOff( elem.shape ); });
        }
        // draw
        drawLayer.draw();
    };
    
    /**
     * Set shape off properties.
     * @method setShapeOff
     * @param {Object} shape The shape to set off.
     */
    function setShapeOff( shape ) {
        // mouse styling
        shape.off('mouseover');
        shape.off('mouseout');
        // drag
        shape.draggable(false);
        shape.off('dragstart');
        shape.off('dragmove');
        shape.off('dragend');
    }

    /**
     * Get the real position from an event.
     */
    function getRealPosition( index ) {
        var stage = app.getDrawStage();
        return { 'x': stage.offset().x + index.x / stage.scale().x,
            'y': stage.offset().y + index.y / stage.scale().y };
    }
    
    /**
     * Set shape on properties.
     * @method setShapeOn
     * @param {Object} shape The shape to set on.
     */
    this.setShapeOn = function ( shape, text ) {
        // mouse over styling
        shape.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });
        // mouse out styling
        shape.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });

        // make it draggable
        shape.draggable(true);
        var dragStartPos = null;
        var dragLastPos = null;
        
        // command name based on shape type
        var cmdName = "shape";
        if ( shape instanceof Kinetic.Line ) {
            cmdName = "line";
        }
        else if ( shape instanceof Kinetic.Rect ) {
            cmdName = "rectangle";
        }
        else if ( shape instanceof Kinetic.Ellipse ) {
            cmdName = "ellipse";
        }
        
        // shape color
        var color = shape.stroke();
        var textX;
        var textY;
        
        // drag start event handling
        shape.on('dragstart', function (event) {
            // save start position
            var offset = dwv.html.getEventOffset( event.evt )[0];
            dragStartPos = getRealPosition( offset );
            textX = text.x();
            textY = text.y();
            // display trash
            var stage = app.getDrawStage();
            var scale = stage.scale();
            var invscale = {'x': 1/scale.x, 'y': 1/scale.y};
            trash.x( stage.offset().x + ( 256 / scale.x ) );
            trash.y( stage.offset().y + ( 20 / scale.y ) );
            trash.scale( invscale );
            drawLayer.add( trash );
            // deactivate anchors to avoid events on null shape
            shapeEditor.setAnchorsActive(false);
            // draw
            drawLayer.draw();
        });
        // drag move event handling
        shape.on('dragmove', function (event) {
            var offset = dwv.html.getEventOffset( event.evt )[0];
            var pos = getRealPosition( offset );
            dragLastPos = pos;
            // highlight trash when on it
            if ( Math.abs( pos.x - trash.x() ) < 10 &&
                    Math.abs( pos.y - trash.y() ) < 10   ) {
                trash.getChildren().each( function (tshape){ tshape.stroke('orange'); });
                shape.stroke('red');
            }
            else {
                trash.getChildren().each( function (tshape){ tshape.stroke('red'); });
                shape.stroke(color);
            }
            // update text
            var translation = {'x': pos.x - dragStartPos.x, 
                    'y': pos.y - dragStartPos.y};
            var newPos = { 'x': textX + translation.x, 
                    'y': textY + translation.y};
            text.position( newPos );
            // reset anchors
            shapeEditor.resetAnchors();
            // draw
            drawLayer.draw();
        });
        // drag end event handling
        shape.on('dragend', function (/*event*/) {
            var pos = dragLastPos;
            // delete case
            if ( Math.abs( pos.x - trash.x() ) < 10 &&
                    Math.abs( pos.y - trash.y() ) < 10   ) {
                // compensate for the drag translation
                var delTranslation = {'x': pos.x - dragStartPos.x, 
                        'y': pos.y - dragStartPos.y};
                var group = this.getParent();
                group.getChildren().each( function (shape) {
                    shape.x( shape.x() - delTranslation.x );
                    shape.y( shape.y() - delTranslation.y );
                });
                // restore color
                shape.stroke(color);
                // disable editor
                shapeEditor.disable();
                shapeEditor.setShape(null);
                shapeEditor.setImage(null);
                document.body.style.cursor = 'default';
                // delete command
                var delcmd = new dwv.tool.DeleteShapeCommand(this, cmdName, drawLayer);
                delcmd.execute();
                app.getUndoStack().add(delcmd);
            }
            else {
                // save drag move
                var translation = {'x': pos.x - dragStartPos.x, 
                        'y': pos.y - dragStartPos.y};
                if ( translation.x !== 0 || translation.y !== 0 ) {
                    var mvcmd = new dwv.tool.MoveShapeCommand(this, cmdName, translation, drawLayer);
                    app.getUndoStack().add(mvcmd);
                }
                // reset anchors
                shapeEditor.setAnchorsActive(true);
                shapeEditor.resetAnchors();
            }
            // remove trash
            trash.remove();
            // draw
            drawLayer.draw();
        });
    };


}; // Draw class

/**
 * Help for this tool.
 * @method getHelp
 * @returns {Object} The help content.
 */
dwv.tool.Draw.prototype.getHelp = function()
{
    return {
        'title': "Draw",
        'brief': "Allows to draw shapes on the image. " +
            "Choose the shape and its color from the drop down menus. Once created, shapes " +
            "can be edited by selecting them. Anchors will appear and allow specific shape edition. " +
            "Drag the shape on the top red cross to delete it. All actions are undoable. ",
        'mouse': {
            'mouse_drag': "A single mouse drag draws the desired shape.",
        },
        'touch': {
            'touch_drag': "A single touch drag draws the desired shape.",
        }
    };
};

/**
 * Set the line color of the drawing.
 * @method setLineColour
 * @param {String} colour The colour to set.
 */
dwv.tool.Draw.prototype.setLineColour = function(colour)
{
    // set style var
    this.style.setLineColor(colour);
};

/**
 * Set the shape name of the drawing.
 * @method setShapeName
 * @param {String} name The name of the shape.
 */
dwv.tool.Draw.prototype.setShapeName = function(name)
{
    // check if we have it
    if( !this.hasShape(name) )
    {
        throw new Error("Unknown shape: '" + name + "'");
    }
    this.shapeName = name;
};

/**
 * Check if the shape is in the shape list.
 * @method hasShape
 * @param {String} name The name of the shape.
 */
dwv.tool.Draw.prototype.hasShape = function(name) {
    return dwv.tool.shapes[name];
};

/**
 * Initialise the tool.
 * @method init
 */
dwv.tool.Draw.prototype.init = function() {
    // set the default to the first in the list
    var shapeName = 0;
    for( var key in dwv.tool.shapes ){
        shapeName = key;
        break;
    }
    this.setShapeName(shapeName);
    // same for color
    this.setLineColour(dwv.tool.colors[0]);
    // init html
    dwv.gui.initDrawHtml();
};


/*viewer/src/tools/editor.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};

/**
 * Shape editor.
 * @class ShapeEditor
 * @namespace dwv.tool
 * @constructor
 */
dwv.tool.ShapeEditor = function ()
{
    /**
     * Edited shape.
     * @property shape
     * @private
     * @type Object
     */
    var shape = null;
    var image = null;
    /**
     * Active flag.
     * @property isActive
     * @private
     * @type Boolean
     */
    var isActive = false;
    /**
     * Update function used by anchors to update the shape.
     * @property updateFunction
     * @private
     * @type Object
     */
    var updateFunction = null;
    
    /**
     * Set the shape to edit.
     * @method setShape
     * @param {Object} inshape The shape to edit.
     */
    this.setShape = function ( inshape ) {
        shape = inshape;
        // reset anchors
        if ( shape ) {
            removeAnchors();
            addAnchors();
        }
    };
    
    this.setImage = function ( img ) {
        image = img;
    };
    /**
     * Get the edited shape.
     * @method getShape
     * @return {Object} The edited shape.
     */
    this.getShape = function () { 
        return shape;
    };
    
    /**
     * Get the active flag.
     * @method isActive
     * @return {Boolean} The active flag.
     */
    this.isActive = function () {
        return isActive;
    };

    /**
     * Enable the editor. Redraws the layer.
     * @method enable
     */
    this.enable = function () {
        isActive = true;
        if ( shape ) {
            setAnchorsVisible( true );
            if ( shape.getLayer() ) {
                shape.getLayer().draw();
            }
        }
    };
    
    /**
     * Disable the editor. Redraws the layer.
     * @method disable
     */
    this.disable = function () {
        isActive = false;
        if ( shape ) {
            setAnchorsVisible( false );
            if ( shape.getLayer() ) {
                shape.getLayer().draw();
            }
        }
    };
    
    /**
     * Reset the anchors.
     * @method resetAnchors
     */
    this.resetAnchors = function () {
        // remove previous controls
        removeAnchors();
        // add anchors
        addAnchors();
        // set them visible
        setAnchorsVisible( true );
    };
    
    /**
     * Apply a function on all anchors.
     * @param {Object} func A f(shape) function.
     */
    function applyFuncToAnchors( func ) {
        if ( shape && shape.getParent() ) {
            var anchors = shape.getParent().find('.anchor');
            anchors.each( func );
        }
    }
    
    /**
     * Set anchors visibility.
     * @method setAnchorsVisible
     * @param {Boolean} flag The visible flag.
     */
    function setAnchorsVisible( flag ) {
        applyFuncToAnchors( function (anchor) {
            anchor.visible( flag );
        });
    }

    /**
     * Set anchors active.
     * @method setAnchorsActive
     * @param {Boolean} flag The active (on/off) flag.
     */
    this.setAnchorsActive = function ( flag ) {
        var func = null;
        if ( flag ) { 
            func = function (anchor) {
                setAnchorOn( anchor );
            };
        }
        else {
            func = function (anchor) {
                setAnchorOff( anchor );
            };
        }
        applyFuncToAnchors( func );
    };

    /**
     * Remove anchors.
     * @method removeAnchors
     */
    function removeAnchors() {
        applyFuncToAnchors( function (anchor) {
            anchor.remove();
        });
    }
    
    /**
     * Add the shape anchors.
     * @method addAnchors
     */
    function addAnchors() {
        // exit if no shape or no layer
        if ( !shape || !shape.getLayer() ) {
            return;
        }
        // get shape group
        var group = shape.getParent();
        // add shape specific anchors to the shape group
        if ( shape instanceof Kinetic.Line ) {
            var points = shape.points();
            if ( points.length === 4 ) {
                updateFunction = dwv.tool.UpdateLine;
                // add shape offset
                var lineBeginX = points[0] + shape.x();
                var lineBeginY = points[1] + shape.y();
                var lineEndX = points[2] + shape.x();
                var lineEndY = points[3] + shape.y();
                addAnchor(group, lineBeginX, lineBeginY, 'begin');
                addAnchor(group, lineEndX, lineEndY, 'end');
            }
            else {
                updateFunction = dwv.tool.UpdateRoi;
                var px = 0;
                var py = 0;
                for ( var i = 0; i < points.length; i=i+2 ) {
                    px = points[i] + shape.x();
                    py = points[i+1] + shape.y();
                    addAnchor(group, px, py, i);
                }
            }
        }
        else if ( shape instanceof Kinetic.Rect ) {
            updateFunction = dwv.tool.UpdateRect;
            var rectX = shape.x();
            var rectY = shape.y();
            var rectWidth = shape.width();
            var rectHeight = shape.height();
            addAnchor(group, rectX, rectY, 'topLeft');
            addAnchor(group, rectX+rectWidth, rectY, 'topRight');
            addAnchor(group, rectX+rectWidth, rectY+rectHeight, 'bottomRight');
            addAnchor(group, rectX, rectY+rectHeight, 'bottomLeft');
        }
        else if ( shape instanceof Kinetic.Ellipse ) {
            updateFunction = dwv.tool.UpdateEllipse;
            var ellipseX = shape.x();
            var ellipseY = shape.y();
            var radius = shape.radius();
            addAnchor(group, ellipseX-radius.x, ellipseY-radius.y, 'topLeft');
            addAnchor(group, ellipseX+radius.x, ellipseY-radius.y, 'topRight');
            addAnchor(group, ellipseX+radius.x, ellipseY+radius.y, 'bottomRight');
            addAnchor(group, ellipseX-radius.x, ellipseY+radius.y, 'bottomLeft');
        }
        // add group to layer
        shape.getLayer().add( group );
    }
    
    /**
     * Create shape editor controls, i.e. the anchors.
     * @method addAnchor
     * @param {Object} group The group associated with this anchor.
     * @param {Number} x The X position of the anchor.
     * @param {Number} y The Y position of the anchor.
     * @param {Number} id The id of the anchor.
     */
    function addAnchor(group, x, y, id) {
        // anchor shape
        var anchor = new Kinetic.Circle({
            x: x,
            y: y,
            stroke: '#999',
            fillRed: 100,
            fillBlue: 100,
            fillGreen: 100,
            fillAlpha: 0.7,
            strokeWidth: 2,
            radius: 6,
            name: 'anchor',
            id: id,
            dragOnTop: false,
            draggable: true,
            visible: false
        });
        // set anchor on
        setAnchorOn( anchor );
        // add the anchor to the group
        group.add(anchor);
    }
    
    /**
     * Get a simple clone of the input anchor.
     * @param {Object} anchor The anchor to clone.
     */
    function getClone( anchor ) {
        // create closure to properties
        var parent = anchor.getParent();
        var id = anchor.id();
        var x = anchor.x();
        var y = anchor.y();
        // create clone object
        var clone = {};
        clone.getParent = function () {
            return parent;
        };
        clone.id = function () {
            return id;
        };
        clone.x = function () {
            return x;
        };
        clone.y = function () {
            return y;
        };
        return clone;
    }
    
    /**
     * Set the anchor on listeners.
     * @param {Object} anchor The anchor to set on.
     */
    function setAnchorOn( anchor ) {
        var startAnchor = null;
        
        // command name based on shape type
        var cmdName = "shape";
        if ( shape instanceof Kinetic.Line ) {
            cmdName = "line";
        }
        else if ( shape instanceof Kinetic.Rect ) {
            cmdName = "rectangle";
        }
        else if ( shape instanceof Kinetic.Ellipse ) {
            cmdName = "ellipse";
        }

        // drag start listener
        anchor.on('dragstart', function () {
            startAnchor = getClone(this);
        });
        // drag move listener
        anchor.on('dragmove', function () {
            if ( updateFunction ) {
                updateFunction(shape, this, image);
            }
            if ( this.getLayer() ) {
                this.getLayer().draw();
            }
            else {
                console.warn("No layer to draw the anchor!");
            }
        });
        // drag end listener
        anchor.on('dragend', function () {
            var endAnchor = getClone(this);
            // store the change command
            var chgcmd = new dwv.tool.ChangeShapeCommand(
                    shape, cmdName, updateFunction, startAnchor, endAnchor, this.getLayer(), image);
            chgcmd.execute();
            app.getUndoStack().add(chgcmd);
            // reset start anchor
            startAnchor = endAnchor;
        });
        // mouse down listener
        anchor.on('mousedown touchstart', function () {
            this.moveToTop();
        });
        // mouse over styling
        anchor.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
            this.stroke('#ddd');
            if ( this.getLayer() ) {
                this.getLayer().draw();
            }
            else {
                console.warn("No layer to draw the anchor!");
            }
        });
        // mouse out styling
        anchor.on('mouseout', function () {
            document.body.style.cursor = 'default';
            this.stroke('#999');
            if ( this.getLayer() ) {
                this.getLayer().draw();
            }
            else {
                console.warn("No layer to draw the anchor!");
            }
        });
    }
    
    /**
     * Set the anchor off listeners.
     * @param {Object} anchor The anchor to set off.
     */
    function setAnchorOff( anchor ) {
        anchor.off('dragstart');
        anchor.off('dragmove');
        anchor.off('dragend');
        anchor.off('mousedown touchstart');
        anchor.off('mouseover');
        anchor.off('mouseout');
    }
};


/*viewer/src/tools/ellipse.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};

/**
 * Create an ellipse shape to be displayed.
 * @method EllipseCreator
 * @static
 * @param {Array} points The points from which to extract the ellipse.
 * @param {Style} style The drawing style.
 */ 
dwv.tool.EllipseCreator = function (points, style, image)
{
    // calculate radius
    var a = Math.abs(points[0].getX() - points[points.length-1].getX());
    var b = Math.abs(points[0].getY() - points[points.length-1].getY());
    // physical object
    var ellipse = new dwv.math.Ellipse(points[0], a, b);
    // shape
    var kellipse = new Kinetic.Ellipse({
        x: ellipse.getCenter().getX(),
        y: ellipse.getCenter().getY(),
        radius: { x: ellipse.getA(), y: ellipse.getB() },
        stroke: style.getLineColor(),
        strokeWidth: 2,
        name: "shape"
    });
    // quantification
    var quant = image.quantifyEllipse( ellipse );
    var cm2 = quant.surface / 100;
    var str = cm2.toPrecision(4) + " cm2";
    var ktext = new Kinetic.Text({
        x: ellipse.getCenter().getX(),
        y: ellipse.getCenter().getY(),
        text: str,
        fontSize: style.getFontSize(),
        fontFamily: "Verdana",
        fill: style.getLineColor(),
        name: "text"
    });
    // return shape
    return {"shape": kellipse, "text": ktext};
};

/**
 * Update an ellipse shape.
 * @method UpdateEllipse
 * @static
 * @param {Object} kellipse The ellipse shape to update.
 * @param {Object} anchor The active anchor.
 */ 
dwv.tool.UpdateEllipse = function (kellipse, anchor, image)
{
    // parent group
    var group = anchor.getParent();
    // find special points
    var topLeft = group.getChildren(function(node){
        return node.id() === 'topLeft';
    })[0];
    var topRight = group.getChildren(function(node){
        return node.id() === 'topRight';
    })[0];
    var bottomRight = group.getChildren(function(node){
        return node.id() === 'bottomRight';
    })[0];
    var bottomLeft = group.getChildren(function(node){
        return node.id() === 'bottomLeft';
    })[0];
    // update 'self' (undo case) and special points
    switch ( anchor.id() ) {
    case 'topLeft':
        topLeft.x( anchor.x() );
        topLeft.y( anchor.y() );
        topRight.y( anchor.y() );
        bottomLeft.x( anchor.x() );
        break;
    case 'topRight':
        topRight.x( anchor.x() );
        topRight.y( anchor.y() );
        topLeft.y( anchor.y() );
        bottomRight.x( anchor.x() );
        break;
    case 'bottomRight':
        bottomRight.x( anchor.x() );
        bottomRight.y( anchor.y() );
        bottomLeft.y( anchor.y() );
        topRight.x( anchor.x() ); 
        break;
    case 'bottomLeft':
        bottomLeft.x( anchor.x() );
        bottomLeft.y( anchor.y() );
        bottomRight.y( anchor.y() );
        topLeft.x( anchor.x() ); 
        break;
    default :
        console.error('Unhandled anchor id: '+anchor.id());
        break;
    }
    // update shape
    var radiusX = ( topRight.x() - topLeft.x() ) / 2;
    var radiusY = ( bottomRight.y() - topRight.y() ) / 2;
    var center = { 'x': topLeft.x() + radiusX, 'y': topRight.y() + radiusY };
    kellipse.position( center );
    var radiusAbs = { 'x': Math.abs(radiusX), 'y': Math.abs(radiusY) };
    if ( radiusAbs ) {
        kellipse.radius( radiusAbs );
    }
    // update text
    var ktext = group.getChildren(function(node){
        return node.name() === 'text';
    })[0];
    if ( ktext ) {
        var ellipse = new dwv.math.Ellipse(center, radiusX, radiusY);
        var quant = image.quantifyEllipse( ellipse );
        var cm2 = quant.surface / 100;
        var str = cm2.toPrecision(4) + " cm2";
        var textPos = { 'x': center.x, 'y': center.y };
        ktext.position(textPos);
        ktext.text(str);
    }
};


/*viewer/src/tools/filter.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
dwv.tool = dwv.tool || {};

/**
 * Filter tool.
 * @class Filter
 * @namespace dwv.tool
 * @constructor
 * @param {Object} app The associated application.
 */
dwv.tool.Filter = function(/*app*/)
{
    /**
     * Selected filter.
     * @property selectedFilter
     * @type Object
     */
    this.selectedFilter = 0;
    /**
     * Default filter name.
     * @property defaultFilterName
     * @type String
     */
    this.defaultFilterName = 0;
    /**
     * Display Flag.
     * @property displayed
     * @type Boolean
     */
    this.displayed = false;
};

/**
 * Help for this tool.
 * @method getHelp
 * @returns {Object} The help content.
 */
dwv.tool.Filter.prototype.getHelp = function()
{
    return {
        'title': "Filter",
        'brief': "A few simple image filters are available: a Threshold filter to " +
            "limit the image intensities between a chosen minimum and maximum, " +
            "a Sharpen filter to convolute the image with a sharpen matrix, " +
            "a Sobel filter to get the gradient of the image in both directions."
    };
};

/**
 * Enable the filter.
 * @method enable
 * @param {Boolean} bool Flag to enable or not.
 */
dwv.tool.Filter.prototype.display = function(bool)
{
    dwv.gui.displayFilterHtml(bool);
    this.displayed = bool;
    // display the selected filter
    this.selectedFilter.display(bool);
};

/**
 * Get the selected filter.
 * @method getSelectedFilter
 * @return {Object} The selected filter.
 */
dwv.tool.Filter.prototype.getSelectedFilter = function() {
    return this.selectedFilter;
};

/**
 * Set the selected filter.
 * @method setSelectedFilter
 * @return {String} The name of the filter to select.
 */
dwv.tool.Filter.prototype.setSelectedFilter = function(name) {
    // check if we have it
    if( !this.hasFilter(name) )
    {
        throw new Error("Unknown filter: '" + name + "'");
    }
    // hide last selected
    if( this.displayed )
    {
        this.selectedFilter.display(false);
    }
    // enable new one
    this.selectedFilter = dwv.tool.filters[name];
    // display the selected filter
    if( this.displayed )
    {
        this.selectedFilter.display(true);
    }
};

/**
 * Check if a filter is in the filter list.
 * @method hasFilter
 * @param {String} name The name to check.
 * @return {String} The filter list element for the given name.
 */
dwv.tool.Filter.prototype.hasFilter = function(name) {
    return dwv.tool.filters[name];
};

/**
 * Initialise the filter.
 * @method init
 */
dwv.tool.Filter.prototype.init = function()
{
    // set the default to the first in the list
    for( var key in dwv.tool.filters ){
        this.defaultFilterName = key;
        break;
    }
    this.setSelectedFilter(this.defaultFilterName);
    // init all filters
    for( key in dwv.tool.filters ) {
        dwv.tool.filters[key].init();
    }    
    // init html
    dwv.gui.initFilterHtml();
};

/**
 * Handle keydown event.
 * @method keydown
 * @param {Object} event The keydown event.
 */
dwv.tool.Filter.prototype.keydown = function(event){
    app.onKeydown(event);
};

// Filter namespace
dwv.tool.filter = dwv.tool.filter || {};

/**
 * Threshold filter tool.
 * @class Threshold
 * @namespace dwv.tool.filter
 * @constructor
 * @param {Object} app The associated application.
 */
dwv.tool.filter.Threshold = function(/*app*/) {};

/**
 * Enable the filter.
 * @method enable
 * @param {Boolean} bool Flag to enable or not.
 */
dwv.tool.filter.Threshold.prototype.display = function(bool)
{
    dwv.gui.filter.displayThresholdHtml(bool);
};

dwv.tool.filter.Threshold.prototype.init = function()
{
    // init html
    dwv.gui.filter.initThresholdHtml();
};

/**
 * Run the filter.
 * @method run
 * @param {Mixed} args The filter arguments.
 */
dwv.tool.filter.Threshold.prototype.run = function(args)
{
    var filter = new dwv.image.filter.Threshold();
    filter.setMin(args.min);
    filter.setMax(args.max);
    var command = new dwv.tool.RunFilterCommand(filter, app);
    command.execute();
    // save command in undo stack
    app.getUndoStack().add(command);
};

/**
 * Sharpen filter tool.
 * @class Sharpen
 * @namespace dwv.tool.filter
 * @constructor
 * @param {Object} app The associated application.
 */
dwv.tool.filter.Sharpen = function(/*app*/) {};

/**
 * Enable the filter.
 * @method enable
 * @param {Boolean} bool Flag to enable or not.
 */
dwv.tool.filter.Sharpen.prototype.display = function(bool)
{
    dwv.gui.filter.displaySharpenHtml(bool);
};

dwv.tool.filter.Sharpen.prototype.init = function()
{
    // nothing to do...
};

/**
 * Run the filter.
 * @method run
 * @param {Mixed} args The filter arguments.
 */
dwv.tool.filter.Sharpen.prototype.run = function(/*args*/)
{
    var filter = new dwv.image.filter.Sharpen();
    var command = new dwv.tool.RunFilterCommand(filter, app);
    command.execute();
    // save command in undo stack
    app.getUndoStack().add(command);
};

/**
 * Sobel filter tool.
 * @class Sharpen
 * @namespace dwv.tool.filter
 * @constructor
 * @param {Object} app The associated application.
 */
dwv.tool.filter.Sobel = function(/*app*/) {};

/**
 * Enable the filter.
 * @method enable
 * @param {Boolean} bool Flag to enable or not.
 */
dwv.tool.filter.Sobel.prototype.display = function(bool)
{
    dwv.gui.filter.displaySobelHtml(bool);
};

dwv.tool.filter.Sobel.prototype.init = function()
{
    // nothing to do...
};

/**
 * Run the filter.
 * @method run
 * @param {Mixed} args The filter arguments.
 */
dwv.tool.filter.Sobel.prototype.run = function(/*args*/)
{
    var filter = new dwv.image.filter.Sobel();
    var command = new dwv.tool.RunFilterCommand(filter, app);
    command.execute();
    // save command in undo stack
    app.getUndoStack().add(command);
};

/**
 * Run filter command.
 * @class RunFilterCommand
 * @namespace dwv.tool
 * @constructor
 * @param {Object} filter The filter to run.
 * @param {Object} app The associated application.
 */
dwv.tool.RunFilterCommand = function (filter, app)
{
    /**
     * Get the command name.
     * @method getName
     * @return {String} The command name.
     */
    this.getName = function () { return "Filter-" + filter.getName(); };

    /**
     * Execute the command.
     * @method execute
     */
    this.execute = function ()
    {
        app.setImage(filter.update());
        app.render();
    }; 
    /**
     * Undo the command.
     * @method undo
     */
    this.undo = function () {
        app.setImage(filter.getOriginalImage());
        app.render();
    };
}; // RunFilterCommand class


/*viewer/src/tools/info.js*/

/** 
 * Info module.
 * @module info
 */
var dwv = dwv || {};
/**
 * Namespace for info functions.
 * @class info
 * @namespace dwv
 * @static
 */
dwv.info = dwv.info || {};

/**
 * Create the windowing info div.
 * @method createWindowingDiv
 * @static
 */
dwv.info.createWindowingDiv = function()
{
    var div = document.getElementById("infotr");
    dwv.html.removeNode("ulinfotr");
    // windowing list
    var ul = document.createElement("ul");
    ul.id = "ulinfotr";
    // window center list item
    var liwc = document.createElement("li");
    liwc.id = "liwcinfotr";
    ul.appendChild(liwc);
    // window width list item
    var liww = document.createElement("li");
    liww.id = "liwwinfotr";
    ul.appendChild(liww);
    // add list to div
    div.appendChild(ul);
};

/**
 * Update the Top Right info div.
 * @method updateWindowingDiv
 * @static
 * @param {Object} event The windowing change event containing the new values.
 * Warning: expects the windowing info div to exist (use after createWindowingDiv).
 */
dwv.info.updateWindowingDiv = function(event)
{
    // window center list item
    var liwc = document.getElementById("liwcinfotr");
    dwv.html.cleanNode(liwc);
    liwc.appendChild(document.createTextNode("WindowCenter = "+event.wc));
    // window width list item
    var liww = document.getElementById("liwwinfotr");
    dwv.html.cleanNode(liww);
    liww.appendChild(document.createTextNode("WindowWidth = "+event.ww));
};

/**
 * Create the position info div.
 * @method createPositionDiv
 * @static
 */
dwv.info.createPositionDiv = function()
{
    var div = document.getElementById("infotl");
    dwv.html.removeNode("ulinfotl");
    // position list
    var ul = document.createElement("ul");
    ul.id = "ulinfotl";
    // position
    var lipos = document.createElement("li");
    lipos.id = "liposinfotl";
    ul.appendChild(lipos);
    // value
    var livalue = document.createElement("li");
    livalue.id = "livalueinfotl";
    ul.appendChild(livalue);
    // add list to div
    div.appendChild(ul);
};

/**
 * Update the position info div.
 * @method updatePositionDiv
 * @static
 * @param {Object} event The position change event containing the new values.
 * Warning: expects the position info div to exist (use after createPositionDiv).
 */
dwv.info.updatePositionDiv = function(event)
{
    // position list item
    var lipos = document.getElementById("liposinfotl");
    dwv.html.cleanNode(lipos);
    lipos.appendChild(document.createTextNode("Pos = "+event.i+", "+event.j+", "+event.k));
    // value list item
    if( typeof(event.value) != "undefined" )
    {
        var livalue = document.getElementById("livalueinfotl");
        dwv.html.cleanNode(livalue);
        livalue.appendChild(document.createTextNode("Value = "+event.value));
    }
};

/**
 * Create the mini color map info div.
 * @method createMiniColorMap
 * @static
 */
dwv.info.createMiniColorMap = function()
{    
    // color map
    var div = document.getElementById("infobr");
    dwv.html.removeNode("canvasinfobr");
    var canvas = document.createElement("canvas");
    canvas.id = "canvasinfobr";
    canvas.width = 98;
    canvas.height = 10;
    // add canvas to div
    div.appendChild(canvas);
};

/**
 * Update the mini color map info div.
 * @method updateMiniColorMap
 * @static
 * @param {Object} event The windowing change event containing the new values.
 * Warning: expects the mini color map div to exist (use after createMiniColorMap).
 */
dwv.info.updateMiniColorMap = function(event)
{    
    var windowCenter = event.wc;
    var windowWidth = event.ww;
    
    var canvas = document.getElementById("canvasinfobr");
    var context = canvas.getContext('2d');
    
    // fill in the image data
    var colourMap = app.getView().getColorMap();
    var imageData = context.getImageData(0,0,canvas.width, canvas.height);
	//console.log(imageData);
    
    var c = 0;
    var minInt = app.getImage().getRescaledDataRange().min;
    var range = app.getImage().getRescaledDataRange().max - minInt;
    var incrC = range / canvas.width;
    var y = 0;
    
    var yMax = 255;
    var yMin = 0;
    var xMin = windowCenter - 0.5 - (windowWidth-1) / 2;
    var xMax = windowCenter - 0.5 + (windowWidth-1) / 2;    
    
    var index;
    for( var j=0; j<canvas.height; ++j ) {
        c = minInt;
        for( var i=0; i<canvas.width; ++i ) {
            if( c <= xMin ) {
                y = yMin;
            }
            else if( c > xMax ) {
                y = yMax;
            }
            else {
                y = ( (c - (windowCenter-0.5) ) / (windowWidth-1) + 0.5 ) *
                    (yMax-yMin) + yMin;
                y = parseInt(y,10);
            }
            index = (i + j * canvas.width) * 4;
            imageData.data[index] = colourMap.red[y];
            imageData.data[index+1] = colourMap.green[y];
            imageData.data[index+2] = colourMap.blue[y];
            imageData.data[index+3] = 0xff;
            c += incrC;
        }
    }
    // put the image data in the context
    context.putImageData(imageData, 0, 0);
};

/**
 * Create the plot info.
 * @method createPlot
 * @static
 */
dwv.info.createPlot = function()
{
    $.plot($("#plot"), [ app.getImage().getHistogram() ], {
        "bars": { "show": true },
        "grid": { "backgroundColor": null },
        "xaxis": { "show": true },
        "yaxis": { "show": false }
    });
};

/**
 * Update the plot markings.
 * @method updatePlotMarkings
 * @static
 * @param {Object} event The windowing change event containing the new values.
 * Warning: expects the plot to exist (use after createPlot).
 */
dwv.info.updatePlotMarkings = function(event)
{
    var wc = event.wc;
    var ww = event.ww;
    
    var half = parseInt( (ww-1) / 2, 10 );
    var center = parseInt( (wc-0.5), 10 );
    var min = center - half;
    var max = center + half;
    
    var markings = [
        { "color": "#faa", "lineWidth": 1, "xaxis": { "from": min, "to": min } },
        { "color": "#aaf", "lineWidth": 1, "xaxis": { "from": max, "to": max } }
    ];

    $.plot($("#plot"), [ app.getImage().getHistogram() ], {
        "bars": { "show": true },
        "grid": { "markings": markings, "backgroundColor": null },
        "xaxis": { "show": false },
        "yaxis": { "show": false }
    });
};


/*viewer/src/tools/line.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};

/**
 * Create a line shape to be displayed.
 * @method LineCreator
 * @static
 * @param {Array} points The points from which to extract the line.
 * @param {Style} style The drawing style.
 */ 
dwv.tool.LineCreator = function (points, style, image)
{
    // physical object
    var line = new dwv.math.Line(points[0], points[points.length-1]);
    // shape
    var kline = new Kinetic.Line({
        points: [line.getBegin().getX(), line.getBegin().getY(), 
                 line.getEnd().getX(), line.getEnd().getY() ],
        stroke: style.getLineColor(),
        strokeWidth: 2,
        name: "shape"
    });
    // quantification
    var quant = image.quantifyLine( line );
    var str = quant.length.toPrecision(4) + " mm";
    var ktext = new Kinetic.Text({
        x: line.getEnd().getX(),
        y: line.getEnd().getY() - 15,
        text: str,
        fontSize: style.getFontSize(),
        fontFamily: "Verdana",
        fill: style.getLineColor(),
        name: "text"
    });
    // return shape
    return {"shape": kline, "text": ktext};
};

/**
 * Update a line shape.
 * @method UpdateLine
 * @static
 * @param {Object} kline The line shape to update.
 * @param {Object} anchor The active anchor.
 */ 
dwv.tool.UpdateLine = function (kline, anchor, image)
{
    // parent group
    var group = anchor.getParent();
    // find special points
    var begin = group.getChildren(function(node){
        return node.id() === 'begin';
    })[0];
    var end = group.getChildren(function(node){
        return node.id() === 'end';
    })[0];
    // update special points
    switch ( anchor.id() ) {
    case 'begin':
        begin.x( anchor.x() );
        begin.y( anchor.y() );
        break;
    case 'end':
        end.x( anchor.x() );
        end.y( anchor.y() );
        break;
    }
    // update shape and compensate for possible drag
    // note: shape.position() and shape.size() won't work...
    var bx = begin.x() - kline.x();
    var by = begin.y() - kline.y();
    var ex = end.x() - kline.x();
    var ey = end.y() - kline.y();
    kline.points( [bx,by,ex,ey] );
    // update text
    var ktext = group.getChildren(function(node){
        return node.name() === 'text';
    })[0];
    if ( ktext ) {
        // update quantification
        var p2d0 = new dwv.math.Point2D(begin.x(), begin.y());
        var p2d1 = new dwv.math.Point2D(end.x(), end.y());
        var line = new dwv.math.Line(p2d0, p2d1);
        var quant = image.quantifyLine( line );
        var str = quant.length.toPrecision(4) + " mm";
        var textPos = { 'x': line.getEnd().getX(), 'y': line.getEnd().getY() - 15 };
        ktext.position( textPos );
        ktext.text(str);
    }
};


/*viewer/src/tools/livewire.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};

/**
 * Livewire painting tool.
 * @class Livewire
 * @namespace dwv.tool
 * @constructor
 * @param {Object} app The associated application.
 */
dwv.tool.Livewire = function(app)
{
    /**
     * Closure to self: to be used by event handlers.
     * @property self
     * @private
     * @type WindowLevel
     */
    var self = this;
    /**
     * Interaction start flag.
     * @property started
     * @type Boolean
     */
    this.started = false;
    /**
     * Interaction just started flag.
     * @property justStarted
     * @private
     * @type Boolean
     */
    var justStarted = true;
    
    /**
     * Draw command.
     * @property command
     * @private
     * @type Object
     */
    var command = null;
    /**
     * Current active shape.
     * @property activeShape
     * @private
     * @type Object
     */
    var activeShape = null;
    /**
     * Current shape group.
     * @property shapeGroup
     * @private
     * @type Object
     */
    var shapeGroup = null;
    /**
     * Drawing style.
     * @property style
     * @type Style
     */
    this.style = new dwv.html.Style();
    
    /**
     * Path storage. Paths are stored in reverse order.
     * @property path
     * @private
     * @type Path
     */
    var path = new dwv.math.Path();
    /**
     * Current path storage. Paths are stored in reverse order.
     * @property currentPath
     * @private
     * @type Path
     */
    var currentPath = new dwv.math.Path();
    /**
     * List of parent points.
     * @property parentPoints
     * @private
     * @type Array
     */
    var parentPoints = [];
    /**
     * Tolerance.
     * @property tolerance
     * @private
     * @type Number
     */
    var tolerance = 5;
    
    /**
     * Clear the parent points list.
     * @method clearParentPoints
     * @private
     */
    function clearParentPoints() {
        for( var i = 0; i < app.getImage().getSize().getNumberOfRows(); ++i ) {
            parentPoints[i] = [];
        }
    }
    
    /**
     * Clear the stored paths.
     * @method clearPaths
     * @private
     */
    function clearPaths() {
        path = new dwv.math.Path();
        currentPath = new dwv.math.Path();
    }
    
    /**
     * Scissor representation.
     * @property scissors
     * @private
     * @type Scissors
     */
    var scissors = new dwv.math.Scissors();
    
    /**
     * Handle mouse down event.
     * @method mousedown
     * @param {Object} event The mouse down event.
     */
    this.mousedown = function(event){
        // first time
        if( !self.started ) {
            self.started = true;
            shapeGroup = new Kinetic.Group();
            self.x0 = event._x;
            self.y0 = event._y;
            // clear vars
            clearPaths();
            clearParentPoints();
            // do the training from the first point
            var p = new dwv.math.FastPoint2D(event._x, event._y);
            scissors.doTraining(p);
            // add the initial point to the path
            var p0 = new dwv.math.Point2D(event._x, event._y);
            path.addPoint(p0);
            path.addControlPoint(p0);
        }
        else {
            // final point: at 'tolerance' of the initial point
            if( (Math.abs(event._x - self.x0) < tolerance) && (Math.abs(event._y - self.y0) < tolerance) ) {
                // draw
                self.mousemove(event);
                console.log("Done.");
                // save command in undo stack
                app.getUndoStack().add(command);
                // set flag
                self.started = false;
                justStarted = true;
            }
            // anchor point
            else {
                path = currentPath;
                clearParentPoints();
                var pn = new dwv.math.FastPoint2D(event._x, event._y);
                scissors.doTraining(pn);
                path.addControlPoint(currentPath.getPoint(0));
            }
        }
    };

    /**
     * Handle mouse move event.
     * @method mousemove
     * @param {Object} event The mouse move event.
     */
    this.mousemove = function(event){
        if (!self.started)
        {
            return;
        }
        // set the point to find the path to
        var p = new dwv.math.FastPoint2D(event._x, event._y);
        scissors.setPoint(p);
        // do the work
        var results = 0;
        var stop = false;
        while( !parentPoints[p.y][p.x] && !stop)
        {
            console.log("Getting ready...");
            results = scissors.doWork();
            
            if( results.length === 0 ) { 
                stop = true;
            }
            else {
                // fill parents
                for( var i = 0; i < results.length-1; i+=2 ) {
                    var _p = results[i];
                    var _q = results[i+1];
                    parentPoints[_p.y][_p.x] = _q;
                }
            }
        }
        console.log("Ready!");
        
        // get the path
        currentPath = new dwv.math.Path();
        stop = false;
        while (p && !stop) {
            currentPath.addPoint(new dwv.math.Point2D(p.x, p.y));
            if(!parentPoints[p.y]) { 
                stop = true;
            }
            else { 
                if(!parentPoints[p.y][p.x]) { 
                    stop = true;
                }
                else {
                    p = parentPoints[p.y][p.x];
                }
            }
        }
        currentPath.appenPath(path);
        
        // remove previous draw if not just started
        if ( activeShape && !justStarted ) {
            activeShape.destroy();
        }
        if ( justStarted ) {
            justStarted = false;
        }
        // create shape
        activeShape = new dwv.tool.RoiCreator(currentPath.pointArray, self.style);
        // add shape to group
        shapeGroup.add(activeShape);
        // draw shape command
        command = new dwv.tool.DrawShapeCommand(activeShape, "livewire", app);
        // draw
        command.execute();
    };

    /**
     * Handle mouse up event.
     * @method mouseup
     * @param {Object} event The mouse up event.
     */
    this.mouseup = function(/*event*/){
        // nothing to do
    };
    
    /**
     * Handle mouse out event.
     * @method mouseout
     * @param {Object} event The mouse out event.
     */
    this.mouseout = function(event){
        // treat as mouse up
        self.mouseup(event);
    };
    
    /**
     * Handle touch start event.
     * @method touchstart
     * @param {Object} event The touch start event.
     */
    this.touchstart = function(event){
        // treat as mouse down
        self.mousedown(event);
    };

    /**
     * Handle touch move event.
     * @method touchmove
     * @param {Object} event The touch move event.
     */
    this.touchmove = function(event){
        // treat as mouse move
        self.mousemove(event);
    };

    /**
     * Handle touch end event.
     * @method touchend
     * @param {Object} event The touch end event.
     */
    this.touchend = function(event){
        // treat as mouse up
        self.mouseup(event);
    };

    /**
     * Handle key down event.
     * @method keydown
     * @param {Object} event The key down event.
     */
    this.keydown = function(event){
        app.onKeydown(event);
    };

    /**
     * Enable the tool.
     * @method enable
     * @param {Boolean} bool The flag to enable or not.
     */
    this.display = function(bool){
        dwv.gui.displayLivewireHtml(bool);
        // TODO why twice?
        this.init();
    };

    /**
     * Initialise the tool.
     * @method init
     */
    this.init = function()
    {
        // set the default to the first in the list
        this.setLineColour(dwv.tool.colors[0]);
        // init html
        dwv.gui.initLivewireHtml();
        
        //scissors = new dwv.math.Scissors();
        scissors.setDimensions(
                app.getImage().getSize().getNumberOfColumns(),
                app.getImage().getSize().getNumberOfRows() );
        scissors.setData(app.getImageData().data);
    };
    
}; // Livewire class

/**
 * Help for this tool.
 * @method getHelp
 * @returns {Object} The help content.
 */
dwv.tool.Livewire.prototype.getHelp = function()
{
    return {
        'title': "Livewire",
        'brief': "The Livewire tool is a semi-automatic segmentation tool " +
            "that proposes to the user paths that follow intensity edges." + 
            "Click once to initialise and then move the mouse to see " + 
            "the proposed paths. Click again to build your contour. " + 
            "The process stops when you click on the first root point. " +
            "BEWARE: the process can take time!"
    };
};

/**
 * Set the line color of the drawing.
 * @method setLineColour
 * @param {String} colour The colour to set.
 */
dwv.tool.Livewire.prototype.setLineColour = function(colour)
{
    // set style var
    this.style.setLineColor(colour);
};


/*viewer/src/tools/rectangle.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};

/**
 * Create a rectangle shape to be displayed.
 * @method RectangleCreator
 * @static
 * @param {Array} points The points from which to extract the rectangle.
 * @param {Style} style The drawing style.
 */ 
dwv.tool.RectangleCreator = function (points, style, image)
{
    // physical shape
    var rectangle = new dwv.math.Rectangle(points[0], points[points.length-1]);
    // shape
    var krect = new Kinetic.Rect({
        x: rectangle.getBegin().getX(),
        y: rectangle.getBegin().getY(),
        width: rectangle.getWidth(),
        height: rectangle.getHeight(),
        stroke: style.getLineColor(),
        strokeWidth: 2,
        name: "shape"
    });
    // quantification
    var quant = image.quantifyRect( rectangle );
    var cm2 = quant.surface / 100;
    var str = cm2.toPrecision(4) + " cm2";
    var ktext = new Kinetic.Text({
        x: rectangle.getBegin().getX(),
        y: rectangle.getEnd().getY() + 10,
        text: str,
        fontSize: style.getFontSize(),
        fontFamily: "Verdana",
        fill: style.getLineColor(),
        name: "text"
    });
    // return shape
    return {"shape": krect, "text": ktext};
};

/**
 * Update a rectangle shape.
 * @method UpdateRect
 * @static
 * @param {Object} krect The rectangle shape to update.
 * @param {Object} anchor The active anchor.
 */ 
dwv.tool.UpdateRect = function (krect, anchor, image)
{
    // parent group
    var group = anchor.getParent();
    // find special points
    var topLeft = group.getChildren(function(node){
        return node.id() === 'topLeft';
    })[0];
    var topRight = group.getChildren(function(node){
        return node.id() === 'topRight';
    })[0];
    var bottomRight = group.getChildren(function(node){
        return node.id() === 'bottomRight';
    })[0];
    var bottomLeft = group.getChildren(function(node){
        return node.id() === 'bottomLeft';
    })[0];
    // update 'self' (undo case) and special points
    switch ( anchor.id() ) {
    case 'topLeft':
        topLeft.x( anchor.x() );
        topLeft.y( anchor.y() );
        topRight.y( anchor.y() );
        bottomLeft.x( anchor.x() );
        break;
    case 'topRight':
        topRight.x( anchor.x() );
        topRight.y( anchor.y() );
        topLeft.y( anchor.y() );
        bottomRight.x( anchor.x() );
        break;
    case 'bottomRight':
        bottomRight.x( anchor.x() );
        bottomRight.y( anchor.y() );
        bottomLeft.y( anchor.y() );
        topRight.x( anchor.x() ); 
        break;
    case 'bottomLeft':
        bottomLeft.x( anchor.x() );
        bottomLeft.y( anchor.y() );
        bottomRight.y( anchor.y() );
        topLeft.x( anchor.x() ); 
        break;
    default :
        console.error('Unhandled anchor id: '+anchor.id());
        break;
    }
    // update shape
    krect.position(topLeft.position());
    var width = topRight.x() - topLeft.x();
    var height = bottomLeft.y() - topLeft.y();
    if ( width && height ) {
        krect.size({'width': width, 'height': height});
    }
    // update text
    var ktext = group.getChildren(function(node){
        return node.name() === 'text';
    })[0];
    if ( ktext ) {
        var p2d0 = new dwv.math.Point2D(topLeft.x(), topLeft.y());
        var p2d1 = new dwv.math.Point2D(bottomRight.x(), bottomRight.y());
        var rect = new dwv.math.Rectangle(p2d0, p2d1);
        var quant = image.quantifyRect( rect );
        var cm2 = quant.surface / 100;
        var str = cm2.toPrecision(4) + " cm2";
        var textPos = { 'x': rect.getBegin().getX(), 'y': rect.getEnd().getY() + 10 };
        ktext.position(textPos);
        ktext.text(str);
    }
};


/*viewer/src/tools/roi.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};

/**
 * Create a roi shape to be displayed.
 * @method RoiCreator
 * @static
 * @param {Array} points The points from which to extract the line.
 * @param {Style} style The drawing style.
 */ 
dwv.tool.RoiCreator = function (points, style /*, image*/)
{
    // physical shape
    var roi = new dwv.math.ROI();
    // sample points so that they are not too close 
    // to one another
    /*if ( isFinal ) {
        var size = points.length;
        var clean = [];
        if ( size > 0 ) {
            clean.push( points[0] );
            var last = points[0];
            for ( var j = 1; j < size; ++j ) {
                var line = new dwv.math.Line( last, points[j] );
                if( line.getLength() > 2 ) {
                    clean.push( points[j] );
                    last = points[j];
                }
            }
            points = clean;
        }
    }*/
    // add input points to the ROI
    roi.addPoints(points);
    // points stored the kineticjs way
    var arr = [];
    for( var i = 1; i < roi.getLength(); ++i )
    {
        arr = arr.concat( roi.getPoint(i).getX() );
        arr = arr.concat( roi.getPoint(i).getY() );
    }
    // shape
    var kline = new Kinetic.Line({
        points: arr,
        stroke: style.getLineColor(),
        strokeWidth: 2,
        name: "shape",
        closed: true
    });
    // quantification
    var ktext = new Kinetic.Text({
        x: 0,
        y: 0,
        text: "",
        fontSize: style.getFontSize(),
        fontFamily: "Verdana",
        fill: style.getLineColor(),
        name: "text"
    });
    // return shape
    return {"shape": kline, "text": ktext};
}; 

/**
 * Update a roi shape.
 * @method UpdateRoi
 * @static
 * @param {Object} kroi The line shape to update.
 * @param {Object} anchor The active anchor.
 */ 
dwv.tool.UpdateRoi = function (kroi, anchor /*, image*/)
{
    // parent group
    var group = anchor.getParent();
    // update self
    var point = group.getChildren(function(node){
        return node.id() === anchor.id();
    })[0];
    point.x( anchor.x() );
    point.y( anchor.y() );
    // update the roi point and compensate for possible drag
    // (the anchor id is the index of the point in the list)
    var points = kroi.points();
    points[anchor.id()] = anchor.x() - kroi.x();
    points[anchor.id()+1] = anchor.y() - kroi.y();
    kroi.points( points );
};


/*viewer/src/tools/scroll.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
/**
 * Namespace for tool functions.
 * @class tool
 * @namespace dwv
 * @static
 */
dwv.tool = dwv.tool || {};

/**
 * Scroll class.
 * @class Scroll
 * @namespace dwv.tool
 * @constructor
 * @param {Object} app The associated application.
 */
dwv.tool.Scroll = function(app)
{
    /**
     * Closure to self: to be used by event handlers.
     * @property self
     * @private
     * @type WindowLevel
     */
    var self = this;
    /**
     * Interaction start flag.
     * @property started
     * @type Boolean
     */
    this.started = false;

    /**
     * Handle mouse down event.
     * @method mousedown
     * @param {Object} event The mouse down event.
     */
    this.mousedown = function(event){
        self.started = true;
        // first position
        self.x0 = event._x;
        self.y0 = event._y;
    };

    /**
     * Handle mouse move event.
     * @method mousemove
     * @param {Object} event The mouse move event.
     */
    this.mousemove = function(event){
        if (!self.started) {
            return;
        }
        // difference to last position
        var diffY = event._y - self.y0;
        // do not trigger for small moves
        if( Math.abs(diffY) < 15 ) {
            return;
        }
        // update GUI
        if( diffY > 0 ) {
            app.getView().incrementSliceNb();
        }
        else {
            app.getView().decrementSliceNb();
        }
        // reset origin point
        self.x0 = event._x;
        self.y0 = event._y;
    };

    /**
     * Handle mouse up event.
     * @method mouseup
     * @param {Object} event The mouse up event.
     */
    this.mouseup = function(/*event*/){
        if (self.started)
        {
            // stop recording
            self.started = false;
        }
    };
    
    /**
     * Handle mouse out event.
     * @method mouseout
     * @param {Object} event The mouse out event.
     */
    this.mouseout = function(event){
        self.mouseup(event);
    };

    /**
     * Handle touch start event.
     * @method touchstart
     * @param {Object} event The touch start event.
     */
    this.touchstart = function(event){
        self.mousedown(event);
    };

    /**
     * Handle touch move event.
     * @method touchmove
     * @param {Object} event The touch move event.
     */
    this.touchmove = function(event){
        self.mousemove(event);
    };

    /**
     * Handle touch end event.
     * @method touchend
     * @param {Object} event The touch end event.
     */
    this.touchend = function(event){
        self.mouseup(event);
    };

    /**
     * Handle key down event.
     * @method keydown
     * @param {Object} event The key down event.
     */
    this.keydown = function(event){
        app.onKeydown(event);
    };

    /**
     * Enable the tool.
     * @method enable
     * @param {Boolean} bool The flag to enable or not.
     */
    this.display = function(bool){
        dwv.gui.displayScrollHtml(bool);
    };

}; // Scroll class

/**
 * Help for this tool.
 * @method getHelp
 * @returns {Object} The help content.
 */
dwv.tool.Scroll.prototype.getHelp = function()
{
    return {
        'title': "Scroll",
        'brief': "The scroll tool allows to scroll through slices.",
        'mouse': {
            'mouse_drag': "A single vertical mouse drag changes the current slice.",
        },
        'touch': {
            'touch_drag': "A single vertical touch drag changes the current slice.",
        }
    };
};

/**
 * Initialise the tool.
 * @method init
 */
dwv.tool.Scroll.prototype.init = function() {
    // nothing to do.
};


/*viewer/src/tools/toolbox.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
dwv.tool = dwv.tool || {};

/**
 * Tool box.
 * Relies on the static variable dwv.tool.tools. The available tools 
 * of the gui will be those of this list.
 * @class ToolBox
 * @namespace dwv.tool
 * @constructor
 * @param {Object} app The associated application.
 */
dwv.tool.ToolBox = function(/*app*/)
{
    /**
     * Selected tool.
     * @property selectedTool
     * @type Object
     */
    this.selectedTool = 0;
    /**
     * Default tool name.
     * @property defaultToolName
     * @type String
     */
    this.defaultToolName = 0;
};

/**
 * Enable the toolbox.
 * @method enable
 * @param {Boolean} bool Flag to enable or not.
 */
dwv.tool.ToolBox.prototype.display = function(bool)
{
    dwv.gui.displayToolboxHtml(bool);
};

/**
 * Get the selected tool.
 * @method getSelectedTool
 * @return {Object} The selected tool.
 */
dwv.tool.ToolBox.prototype.getSelectedTool = function() {
    return this.selectedTool;
};

/**
 * Set the selected tool.
 * @method setSelectedTool
 * @return {String} The name of the tool to select.
 */
dwv.tool.ToolBox.prototype.setSelectedTool = function(name) {
    // check if we have it
    if( !this.hasTool(name) )
    {
        throw new Error("Unknown tool: '" + name + "'");
    }
    // hide last selected
    if( this.selectedTool )
    {
        this.selectedTool.display(false);
    }
    // enable new one
    this.selectedTool = dwv.tool.tools[name];
    // display it
    this.selectedTool.display(true);
};

/**
 * Check if a tool is in the tool list.
 * @method hasTool
 * @param {String} name The name to check.
 * @return {String} The tool list element for the given name.
 */
dwv.tool.ToolBox.prototype.hasTool = function(name) {
    return dwv.tool.tools[name];
};

/**
 * Initialise the tool box.
 * @method init
 */
dwv.tool.ToolBox.prototype.init = function()
{
    // set the default to the first in the list
    for( var key in dwv.tool.tools ){
        this.defaultToolName = key;
        break;
    }
    this.setSelectedTool(this.defaultToolName);
    // init all tools
    for( key in dwv.tool.tools ) {
        dwv.tool.tools[key].init();
    }    
    // init html
    dwv.gui.initToolboxHtml();
};

/**
 * Reset the tool box.
 * @method init
 */
dwv.tool.ToolBox.prototype.reset = function()
{
    // hide last selected
    if( this.selectedTool )
    {
        this.selectedTool.display(false);
    }
    this.selectedTool = 0;
    this.defaultToolName = 0;
};

/*viewer/src/tools/undo.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
dwv.tool = dwv.tool || {};

/**
 * UndoStack class.
 * @class UndoStack
 * @namespace dwv.tool
 * @constructor
 */
dwv.tool.UndoStack = function()
{ 
    /**
     * Array of commands.
     * @property stack
     * @private
     * @type Array
     */
    var stack = [];
    /**
     * Current command index.
     * @property curCmdIndex
     * @private
     * @type Number
     */
    var curCmdIndex = 0;

    /**
     * Add a command to the stack.
     * @method add
     * @param {Object} cmd The command to add.
     */
    this.add = function(cmd)
    { 
        // clear commands after current index
        stack = stack.slice(0,curCmdIndex);
        // store command
        stack.push(cmd);
        //stack[curCmdIndex] = cmd;
        // increment index
        ++curCmdIndex;
        // add command to display history
        dwv.gui.addCommandToUndoHtml(cmd.getName());
    };

    /**
     * Undo the last command. 
     * @method undo
     */
    this.undo = function()
    { 
        // a bit inefficient...
        if( curCmdIndex > 0 )
        {
            // decrement command index
            --curCmdIndex; 
            // undo last command
            stack[curCmdIndex].undo();
            // disable last in display history
            dwv.gui.enableInUndoHtml(false);
        }
    }; 

    /**
     * Redo the last command.
     * @method redo
     */
    this.redo = function()
    { 
        if( curCmdIndex < stack.length )
        {
            // run last command
            stack[curCmdIndex].execute();
            // increment command index
            ++curCmdIndex;
            // enable next in display history
            dwv.gui.enableInUndoHtml(true);
        }
    };

}; // UndoStack class


/*viewer/src/tools/windowLevel.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
/**
 * Namespace for tool functions.
 * @class tool
 * @namespace dwv
 * @static
 */
dwv.tool = dwv.tool || {};

/**
 * Update the views' current position.
 * @method updatePostionValue
 * @static
 * @param {Number} i The column index.
 * @param {Number} j The row index.
 */
dwv.tool.updatePostionValue = function(i,j)
{
    app.getView().setCurrentPosition({"i": i, "j": j, "k": app.getView().getCurrentPosition().k});
};

/**
 * Update the views' windowing data.
 * @method updateWindowingData
 * @static
 * @param {Number} wc The window center.
 * @param {Number} ww The window width.
 */
dwv.tool.updateWindowingData = function(wc,ww)
{
    app.getView().setWindowLevel(wc,ww);
};

/**
 * Set the active window/level preset.
 * @method updateWindowingData
 * @param {String} name The name of the preset to set.
 */
dwv.tool.updateWindowingDataFromName = function(name)
{
    // check if we have it
    if( !dwv.tool.presets[name] ) {
        throw new Error("Unknown window level preset: '" + name + "'");
    }
    // enable it
    dwv.tool.updateWindowingData( 
        dwv.tool.presets[name].center, 
        dwv.tool.presets[name].width );
};

/**
 * Update the views' colour map.
 * @method updateColourMap
 * @static
 * @param {Object} colourMap The colour map.
 */
dwv.tool.updateColourMap = function(colourMap)
{
    app.getView().setColorMap(colourMap);
};

/**
 * Update the views' colour map.
 * @function updateColourMap
 * @param {String} name The name of the colour map to set.
 */
dwv.tool.updateColourMapFromName = function(name)
{
    // check if we have it
    if( !dwv.tool.colourMaps[name] ) {
        throw new Error("Unknown colour map: '" + name + "'");
    }
    // enable it
    dwv.tool.updateColourMap( dwv.tool.colourMaps[name] );
};

// Default colour maps.
dwv.tool.colourMaps = {
    "plain": dwv.image.lut.plain,
    "invplain": dwv.image.lut.invPlain,
    "rainbow": dwv.image.lut.rainbow,
    "hot": dwv.image.lut.hot,
    "test": dwv.image.lut.test
};
// Default window level presets.
dwv.tool.presets = {};
dwv.tool.defaultpresets = {};
dwv.tool.defaultpresets.CT = {
    "mediastinum": {"center": 40, "width": 400},
    "lung": {"center": -500, "width": 1500},
    "bone": {"center": 500, "width": 2000},
};
dwv.tool.defaultpresets.CTextra = {
    "brain": {"center": 40, "width": 80},
    "head": {"center": 90, "width": 350}
};

/**
 * Update the window/level presets.
 * @function updatePresets
 * @param {Boolean} full If true, shows all presets.
 */
dwv.tool.updatePresets = function(full)
{    
    // store the manual preset
    var manual = dwv.tool.presets.manual;
    // reinitialize the presets
    dwv.tool.presets = {};
    
    // DICOM presets
    var dicomPresets = app.getView().getWindowPresets();
    if( dicomPresets ) {
        if( full ) {
            for( var i = 0; i < dicomPresets.length; ++i ) {
                dwv.tool.presets[dicomPresets[i].name.toLowerCase()] = dicomPresets[i];
            }
        }
        // just the first one
        else {
            dwv.tool.presets["default"] = dicomPresets[0];
        }
    }
    
    // default presets
    var modality = app.getImage().getMeta().Modality;
    for( var key in dwv.tool.defaultpresets[modality] ) {
        dwv.tool.presets[key] = dwv.tool.defaultpresets[modality][key];
    }
    if( full ) {
        for( var key2 in dwv.tool.defaultpresets[modality+"extra"] ) {
            dwv.tool.presets[key2] = dwv.tool.defaultpresets[modality+"extra"][key2];
        }
    }
    // min/max preset
    var range = app.getImage().getRescaledDataRange();
    var width = range.max - range.min;
    var center = range.min + width/2;
    dwv.tool.presets["min/max"] = {"center": center, "width": width};
    // manual preset
    if( manual ){
        dwv.tool.presets.manual = manual;
    }
};

/**
 * WindowLevel tool: handle window/level related events.
 * @class WindowLevel
 * @namespace dwv.tool
 * @constructor
 * @param {Object} app The associated application.
 */
dwv.tool.WindowLevel = function(app)
{
    /**
     * Closure to self: to be used by event handlers.
     * @property self
     * @private
     * @type WindowLevel
     */
    var self = this;
    /**
     * Interaction start flag.
     * @property started
     * @type Boolean
     */
    this.started = false;

    /**
     * Handle mouse down event.
     * @method mousedown
     * @param {Object} event The mouse down event.
     */
    this.mousedown = function(event){
        // set start flag
        self.started = true;
        // store initial position
        self.x0 = event._x;
        self.y0 = event._y;
        // update GUI
        dwv.tool.updatePostionValue(event._x, event._y);
    };
    
    /**
     * Handle mouse move event.
     * @method mousemove
     * @param {Object} event The mouse move event.
     */
    this.mousemove = function(event){
        // check start flag
        if( !self.started ) {
            return;
        }
        // difference to last position
        var diffX = event._x - self.x0;
        var diffY = self.y0 - event._y;
        // calculate new window level
        var windowCenter = parseInt(app.getView().getWindowLut().getCenter(), 10) + diffY;
        var windowWidth = parseInt(app.getView().getWindowLut().getWidth(), 10) + diffX;
        // update GUI
        dwv.tool.updateWindowingData(windowCenter,windowWidth);
        // store position
        self.x0 = event._x;
        self.y0 = event._y;
    };
    
    /**
     * Handle mouse up event.
     * @method mouseup
     * @param {Object} event The mouse up event.
     */
    this.mouseup = function(/*event*/){
        // set start flag
        if( self.started ) {
            self.started = false;
            // store the manual preset
            var windowCenter = parseInt(app.getView().getWindowLut().getCenter(), 10);
            var windowWidth = parseInt(app.getView().getWindowLut().getWidth(), 10);
            dwv.tool.presets.manual = {"center": windowCenter, "width": windowWidth};
            // update gui
            dwv.gui.initWindowLevelHtml();
            // set selected
            dwv.gui.setSelected("presetSelect", "Manual");
        }
    };
    
    /**
     * Handle mouse out event.
     * @method mouseout
     * @param {Object} event The mouse out event.
     */
    this.mouseout = function(event){
        // treat as mouse up
        self.mouseup(event);
    };
    
    /**
     * Handle touch start event.
     * @method touchstart
     * @param {Object} event The touch start event.
     */
    this.touchstart = function(event){
        self.mousedown(event);
    };
    
    /**
     * Handle touch move event.
     * @method touchmove
     * @param {Object} event The touch move event.
     */
    this.touchmove = function(event){
        self.mousemove(event);
    };
    
    /**
     * Handle touch end event.
     * @method touchend
     * @param {Object} event The touch end event.
     */
    this.touchend = function(event){
        self.mouseup(event);
    };
    
    /**
     * Handle double click event.
     * @method dblclick
     * @param {Object} event The double click event.
     */
    this.dblclick = function(event){
        // update GUI
        dwv.tool.updateWindowingData(
            parseInt(app.getImage().getRescaledValue(event._x, event._y, app.getView().getCurrentPosition().k), 10),
            parseInt(app.getView().getWindowLut().getWidth(), 10) );    
    };
    
    /**
     * Handle key down event.
     * @method keydown
     * @param {Object} event The key down event.
     */
    this.keydown = function(event){
        // let the app handle it
        app.onKeydown(event);
    };
    
    /**
     * Enable the tool.
     * @method enable
     * @param {Boolean} bool The flag to enable or not.
     */
    this.display = function(bool){
        if( app.getImage().getPhotometricInterpretation().match(/MONOCHROME/) !== null ) {
            dwv.gui.displayWindowLevelHtml(bool);
        }
        else {
            dwv.gui.displayWindowLevelHtml(false);
        }
    };
    
    /**
     * Initialise the tool.
     * @method init
     */
    this.init = function() {
        dwv.tool.updatePresets(true);
        dwv.gui.initWindowLevelHtml();
    };
}; // WindowLevel class

/**
 * Help for this tool.
 * @method getHelp
 * @returns {Object} The help content.
 */
dwv.tool.WindowLevel.prototype.getHelp = function()
{
    return {
        'title': "Window/Level",
        'brief': "Changes the Window and Level of the image.",
        'mouse': {
            'mouse_drag': "A single mouse drag changes the window in the horizontal direction and the level in the vertical one.",
            'double_click': "A double click will center the window and level on the clicked intensity.",
        },
        'touch': {
            'touch_drag': "A single touch drag changes the window in the horizontal direction and the level in the vertical one.",
        }
    };
};


/*viewer/src/tools/zoomPan.js*/

/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
/**
 * Namespace for tool functions.
 * @class tool
 * @namespace dwv
 * @static
 */
dwv.tool = dwv.tool || {};

/**
 * ZoomAndPan class.
 * @class ZoomAndPan
 * @namespace dwv.tool
 * @constructor
 * @param {Object} app The associated application.
 */
dwv.tool.ZoomAndPan = function(app)
{
    /**
     * Closure to self: to be used by event handlers.
     * @property self
     * @private
     * @type WindowLevel
     */
    var self = this;
    /**
     * Interaction start flag.
     * @property started
     * @type Boolean
     */
    this.started = false;

    /**
     * Handle mouse down event.
     * @method mousedown
     * @param {Object} event The mouse down event.
     */
    this.mousedown = function(event){
        self.started = true;
        // first position
        self.x0 = event._xs;
        self.y0 = event._ys;
    };

    /**
     * Handle two touch down event.
     * @method twotouchdown
     * @param {Object} event The touch down event.
     */
    this.twotouchdown = function(event){
        self.started = true;
        // store first point
        self.x0 = event._x;
        self.y0 = event._y;
        // first line
        var point0 = new dwv.math.Point2D(event._x, event._y);
        var point1 = new dwv.math.Point2D(event._x1, event._y1);
        self.line0 = new dwv.math.Line(point0, point1);
        self.midPoint = self.line0.getMidpoint();         
    };

    /**
     * Handle mouse move event.
     * @method mousemove
     * @param {Object} event The mouse move event.
     */
    this.mousemove = function(event){
        if (!self.started)
        {
            return;
        }
        // calculate translation
        var tx = event._xs - self.x0;
        var ty = event._ys - self.y0;
        // apply translation
        translateLayers(tx, ty);
        // reset origin point
        self.x0 = event._xs;
        self.y0 = event._ys;
    };

    /**
     * Handle two touch move event.
     * @method twotouchmove
     * @param {Object} event The touch move event.
     */
    this.twotouchmove = function(event){
        if (!self.started)
        {
            return;
        }
        var point0 = new dwv.math.Point2D(event._x, event._y);
        var point1 = new dwv.math.Point2D(event._x1, event._y1);
        var newLine = new dwv.math.Line(point0, point1);
        var lineRatio = newLine.getLength() / self.line0.getLength();
        
        if( lineRatio === 1 )
        {
            // scroll mode
            // difference  to last position
            var diffY = event._y - self.y0;
            // do not trigger for small moves
            if( Math.abs(diffY) < 15 ) {
                return;
            }
            // update GUI
            if( diffY > 0 ) {
                app.getView().incrementSliceNb();
            }
            else {
                app.getView().decrementSliceNb();
            }
        }
        else
        {
            // zoom mode
            var zoom = (lineRatio - 1) / 2;
            if( Math.abs(zoom) % 0.1 <= 0.05 ) {
                zoomLayers(zoom, self.midPoint.getX(), self.midPoint.getY(),event._xs, event._ys);
            }
        }
    };
    
    /**
     * Handle mouse up event.
     * @method mouseup
     * @param {Object} event The mouse up event.
     */
    this.mouseup = function(/*event*/){
        if (self.started)
        {
            // stop recording
            self.started = false;
        }
    };
    
    /**
     * Handle mouse out event.
     * @method mouseout
     * @param {Object} event The mouse out event.
     */
    this.mouseout = function(event){
        self.mouseup(event);
    };

    /**
     * Handle touch start event.
     * @method touchstart
     * @param {Object} event The touch start event.
     */
    this.touchstart = function(event){
        var touches = event.targetTouches;
        if( touches.length === 1 ){
            self.mousedown(event);
        }
        else if( touches.length === 2 ){
            self.twotouchdown(event);
        }
    };

    /**
     * Handle touch move event.
     * @method touchmove
     * @param {Object} event The touch move event.
     */
    this.touchmove = function(event){
        var touches = event.targetTouches;
        if( touches.length === 1 ){
            self.mousemove(event);
        }
        else if( touches.length === 2 ){
            self.twotouchmove(event);
        }
    };

    /**
     * Handle touch end event.
     * @method touchend
     * @param {Object} event The touch end event.
     */
    this.touchend = function(event){
        self.mouseup(event);
    };

    /**
     * Handle mouse scroll event (fired by Firefox).
     * @method DOMMouseScroll
     * @param {Object} event The mouse scroll event.
     */
    this.DOMMouseScroll = function(event){
        // ev.detail on firefox is 3
        var step = - event.detail / 30;
        zoomLayers(step, event._x, event._y, event._xs, event._ys);
        event.stopPropagation();
        event.preventDefault();
    };

    /**
     * Handle mouse wheel event.
     * @method mousewheel
     * @param {Object} event The mouse wheel event.
     */
    this.mousewheel = function(event){
        // ev.wheelDelta on chrome is 120
        var step = event.wheelDelta / 1200;
        zoomLayers(step, event._x, event._y, event._xs, event._ys);
        event.stopPropagation();
        event.preventDefault();
    };
    
    /**
     * Handle key down event.
     * @method keydown
     * @param {Object} event The key down event.
     */
    this.keydown = function(event){
        app.onKeydown(event);
    };

    /**
     * Enable the tool.
     * @method enable
     * @param {Boolean} bool The flag to enable or not.
     */
    this.display = function(bool){
        dwv.gui.displayZoomAndPanHtml(bool);
    };

    /**
     * Apply the zoom to the layers.
     * @method zoomLayers
     * @param {Number} step The zoom step increment. A good step is of 0.1.
     * @param {Number} cx The zoom center X coordinate.
     * @param {Number} cy The zoom center Y coordinate.
     */ 
    function zoomLayers(step, cx, cy, cx2, cy2)
    {
        if( app.getImageLayer() ) {
            var oldZoom = app.getImageLayer().getZoom();
            var newZoom = {'x': (oldZoom.x + step), 'y': (oldZoom.y + step)};
            app.getImageLayer().zoom(newZoom.x, newZoom.y, cx2, cy2);
            app.getImageLayer().draw();
        }
        if( app.getDrawStage() ) { 
            
            var stage = app.getDrawStage();
            var oldKZoom = stage.scale();
            var newKZoom = {'x': (oldKZoom.x + step), 'y': (oldKZoom.y + step)};
            
            var oldOffset = stage.offset();
            var newOffsetX = (cx2 / oldKZoom.x) + oldOffset.x - (cx2 / newKZoom.x);
            var newOffsetY = (cy2 / oldKZoom.y) + oldOffset.y - (cy2 / newKZoom.y);
            var newOffset = { 'x': newOffsetX, 'y': newOffsetY };
            
            stage.offset( newOffset );
            stage.scale( newKZoom );
            stage.draw();
        }
    }

    /**
     * Apply a translation to the layers.
     * @method translateLayers
     * @param {Number} tx The translation along X.
     * @param {Number} ty The translation along Y.
     */ 
    function translateLayers(tx, ty)
    {
        if( app.getImageLayer() ) {
            var layer = app.getImageLayer();
            var zoom = layer.getZoom();
            var txx = tx / zoom.x;
            var tyy = ty / zoom.y;
            layer.translate(txx, tyy);
            layer.draw();
        }
        if( app.getDrawStage() ) { 
            var stage = app.getDrawStage();
            var offset = stage.offset();
            var kzoom = stage.scale();
            offset.x -= tx / kzoom.x;
            offset.y -= ty / kzoom.y;
            stage.offset( offset );
            stage.draw();
        }
    }

}; // ZoomAndPan class

/**
 * Help for this tool.
 * @method getHelp
 * @returns {Object} The help content.
 */
dwv.tool.ZoomAndPan.prototype.getHelp = function()
{
    return {
        'title': "Zoom/Pan",
        'brief': "The Zoom/Pan tool allows to zoom and pan the image.",
        'mouse': {
            'mouse_wheel': "The mouse wheel is used to zoom the image.",
            'mouse_drag': "A single mouse drag drags the image in the desired direction."
        },
        'touch': {
            'twotouch_pinch': "A pinch in or out allows to zoom the image.",
            'touch_drag': "A single touch drag drags the image in the desired direction."
        }
    };
};

/**
 * Initialise the tool.
 * @method init
 */
dwv.tool.ZoomAndPan.prototype.init = function() {
    // nothing to do.
};

/*viewer/src/utils/string.js*/

/** 
 * Utility module.
 * @module utils
 */
var dwv = dwv || {};
/**
 * Namespace for utility functions.
 * @class utils
 * @namespace dwv
 * @static
 */
dwv.utils = dwv.utils || {};

/**
 * Capitalise the first letter of a string.
 * @method capitaliseFirstLetter
 * @static
 * @param {String} string The string to capitalise the first letter.
 * @return {String} The new string.
 */
dwv.utils.capitaliseFirstLetter = function (string)
{
    var res = string;
    if ( string ) {
        res = string.charAt(0).toUpperCase() + string.slice(1);
    }
    return res;
};

/**
 * Clean string: trim and remove ending.
 * @method cleanString
 * @static
 * @param {String} string The string to clean.
 * @return {String} The cleaned string.
 */
dwv.utils.cleanString = function (string)
{
    var res = string;
    if ( string ) {
        // trim spaces
        res = string.trim();
        // get rid of ending zero-width space (u200B)
        if ( res[res.length-1] === String.fromCharCode("u200B") ) {
            res = res.substring(0, res.length-1);
        }
    }
    return res;
};

/**
 * Split query string:
 *  'root?key0=val00&key0=val01&key1=val10' returns 
 *  { base : root, query : [ key0 : [val00, val01], key1 : val1 ] }
 * Returns an empty object if the input string is not correct (null, empty...)
 *  or if it is not a query string (no question mark).
 * @method splitQueryString
 * @static
 * @param {String} inputStr The string to split.
 * @return {Object} The split string.
 */
dwv.utils.splitQueryString = function (inputStr)
{
    // result
    var result = {};
    // check if query string
    var sepIndex = null;
    if ( inputStr && (sepIndex = inputStr.indexOf('?')) !== -1 ) {
        // base: before the '?'
        result.base = inputStr.substr(0, sepIndex);
        // query : after the '?'
        var query = inputStr.substr(sepIndex + 1);
        // split key/value pairs of the query
        result.query = dwv.utils.splitKeyValueString(query);
    }
    // return
    return result;
};

/**
 * Split key/value string:
 *  key0=val00&key0=val01&key1=val10 returns 
*   { key0 : [val00, val01], key1 : val1 }
 * @method splitKeyValueString
 * @static
 * @param {String} inputStr The string to split.
 * @return {Object} The split string.
 */
dwv.utils.splitKeyValueString = function (inputStr)
{
    // result
    var result = {};
    // check input string
    if ( inputStr ) {
         // split key/value pairs
        var pairs = inputStr.split('&');
        for ( var i = 0; i < pairs.length; ++i )
        {
            var pair = pairs[i].split('=');
            // if the key does not exist, create it
            if ( !result[pair[0]] ) 
            {
                result[pair[0]] = pair[1];
            }
            else
            {
                // make it an array
                if ( !( result[pair[0]] instanceof Array ) ) {
                    result[pair[0]] = [result[pair[0]]];
                }
                result[pair[0]].push(pair[1]);
            }
        }
    }
    return result;
};


/*appgui.js*/

/** 
 * Application GUI.
 */

// Window
dwv.gui.getWindowSize = function(){
    return dwv.gui.base.getWindowSize();
};
// Progress
dwv.gui.displayProgress = function(percent){
    dwv.gui.base.displayProgress(percent);
};
// Select
dwv.gui.refreshSelect = function(selectName){
    dwv.gui.base.refreshSelect(selectName);
};
// Slider
dwv.gui.appendSliderHtml = function(){
    dwv.gui.base.appendSliderHtml();
};
dwv.gui.initSliderHtml = function(){
    dwv.gui.base.initSliderHtml();
};
// Tags table
dwv.gui.appendTagsTable = function(dataInfo){
    dwv.gui.base.appendTagsTable(dataInfo);
};

// Loaders
dwv.gui.appendLoadboxHtml = function(){
    dwv.gui.base.appendLoadboxHtml();
};

// File loader
dwv.gui.appendFileLoadHtml = function(){
    dwv.gui.base.appendFileLoadHtml();
};
dwv.gui.displayFileLoadHtml = function(bool){
    dwv.gui.base.displayFileLoadHtml(bool);
};

// Url loader
dwv.gui.appendUrlLoadHtml = function(){
    dwv.gui.base.appendUrlLoadHtml();
};
dwv.gui.displayUrlLoadHtml = function(bool){
    dwv.gui.base.displayUrlLoadHtml(bool);
};

// Toolbox 
dwv.gui.appendToolboxHtml = function(){
    dwv.gui.base.appendToolboxHtml();
    
    // toolbar
    var buttonClass = "ui-btn ui-btn-inline ui-btn-icon-notext ui-mini"; 
    
    var open = document.createElement("a");
    open.href = "#popupOpen";
    open.setAttribute("class", buttonClass + " ui-icon-plus");
    open.setAttribute("data-rel", "popup");
    open.setAttribute("data-position-to", "window");

    var undo = document.createElement("a");
    undo.setAttribute("class", buttonClass + " ui-icon-back");
    undo.onclick = dwv.gui.onUndo;

    var redo = document.createElement("a");
    redo.setAttribute("class", buttonClass + " ui-icon-forward");
    redo.onclick = dwv.gui.onRedo;

    var toggleInfo = document.createElement("a");
    toggleInfo.setAttribute("class", buttonClass + " ui-icon-info");
    toggleInfo.onclick = dwv.gui.onToggleInfoLayer;

    var tags = document.createElement("a");
    tags.href = "#tags_page";
    tags.setAttribute("class", buttonClass + " ui-icon-grid");

    var node = document.getElementById("toolbar");
    node.appendChild(open);
    node.appendChild(undo);
    node.appendChild(redo);
    node.appendChild(toggleInfo);
    node.appendChild(tags);
    $("#toolbar").trigger("create");
};
dwv.gui.displayToolboxHtml = function(bool){
    dwv.gui.base.displayToolboxHtml(bool);
};
dwv.gui.initToolboxHtml = function(){
    dwv.gui.base.initToolboxHtml();
};

// Window/level
dwv.gui.appendWindowLevelHtml = function(){
    dwv.gui.base.appendWindowLevelHtml();
};
dwv.gui.displayWindowLevelHtml = function(bool){
    dwv.gui.base.displayWindowLevelHtml(bool);
};
dwv.gui.initWindowLevelHtml = function(){
    dwv.gui.base.initWindowLevelHtml();
};

// Draw
dwv.gui.appendDrawHtml = function(){
    dwv.gui.base.appendDrawHtml();
};
dwv.gui.displayDrawHtml = function(bool){
    dwv.gui.base.displayDrawHtml(bool);  
};
dwv.gui.initDrawHtml = function(){
    dwv.gui.base.initDrawHtml();  
};

// Livewire
dwv.gui.appendLivewireHtml = function(){
    dwv.gui.base.appendLivewireHtml();  
};
dwv.gui.displayLivewireHtml = function(bool){
    dwv.gui.base.displayLivewireHtml(bool);
};
dwv.gui.initLivewireHtml = function(){
    dwv.gui.base.initLivewireHtml();
};

// Navigate
dwv.gui.appendZoomAndPanHtml = function(){
    dwv.gui.base.appendZoomAndPanHtml();
};
dwv.gui.displayZoomAndPanHtml = function(bool){
    dwv.gui.base.displayZoomAndPanHtml(bool);
};

// Scroll
dwv.gui.appendScrollHtml = function(){
    dwv.gui.base.appendScrollHtml();
};
dwv.gui.displayScrollHtml = function(bool){
    dwv.gui.base.displayScrollHtml(bool);
};

// Filter
dwv.gui.appendFilterHtml = function(){
    dwv.gui.base.appendFilterHtml();
};
dwv.gui.displayFilterHtml = function(bool){
    dwv.gui.base.displayFilterHtml(bool);
};
dwv.gui.initFilterHtml = function(){
    dwv.gui.base.initFilterHtml();
};

// Threshold
dwv.gui.filter.appendThresholdHtml = function(){
    dwv.gui.filter.base.appendThresholdHtml();
};
dwv.gui.filter.displayThresholdHtml = function(bool){
    dwv.gui.filter.base.displayThresholdHtml(bool);
};
dwv.gui.filter.initThresholdHtml = function(){
    dwv.gui.filter.base.initThresholdHtml();
};

// Sharpen
dwv.gui.filter.appendSharpenHtml = function(){
    dwv.gui.filter.base.appendSharpenHtml();
};
dwv.gui.filter.displaySharpenHtml = function(bool){
    dwv.gui.filter.base.displaySharpenHtml(bool);
};

// Sobel
dwv.gui.filter.appendSobelHtml = function(){
    dwv.gui.filter.base.appendSobelHtml();
};
dwv.gui.filter.displaySobelHtml = function(bool){
    dwv.gui.filter.base.displaySobelHtml(bool);
};

// Undo/redo
dwv.gui.appendUndoHtml = function(){
    dwv.gui.base.appendUndoHtml();
};

// Help
dwv.gui.appendHelpHtml = function(mobile){
    dwv.gui.base.appendHelpHtml(mobile);
};
dwv.gui.appendVersionHtml = function(){
    dwv.gui.base.appendVersionHtml();
};


/*applauncher.js*/

/** 
 * Application launcher.
 */

// check browser support
dwv.browser.check();
// main application
var app = new dwv.App();

// launch when page is loaded
$(document).ready( function()
{
    // Add required loaders to the loader list
    dwv.io.loaders = {};
    dwv.io.loaders.file = dwv.io.File;
    dwv.io.loaders.url = dwv.io.Url;

    // append load container HTML
    dwv.gui.appendLoadboxHtml();
    // append loaders HTML
    dwv.gui.appendFileLoadHtml();
    dwv.gui.appendUrlLoadHtml();
    dwv.gui.displayFileLoadHtml(true);

    // Add tools to the tool list
    dwv.tool.tools = {};
    dwv.tool.tools["Window/Level"] = new dwv.tool.WindowLevel(app);
    dwv.tool.tools["Zoom/Pan"] = new dwv.tool.ZoomAndPan(app);
    dwv.tool.tools.scroll = new dwv.tool.Scroll(app);
    dwv.tool.tools.draw = new dwv.tool.Draw(app);
    //dwv.tool.tools.livewire = new dwv.tool.Livewire(app);
    dwv.tool.tools.filter = new dwv.tool.Filter(app);

    // Add filters to the filter list for the filter tool
    dwv.tool.filters = {};
    dwv.tool.filters.threshold = new dwv.tool.filter.Threshold(app);
    dwv.tool.filters.sharpen = new dwv.tool.filter.Sharpen(app);
    dwv.tool.filters.sobel = new dwv.tool.filter.Sobel(app);

    // Add shapes to the shape list for the draw tool
    dwv.tool.shapes = {};
    dwv.tool.shapes.line = dwv.tool.LineCreator;
    dwv.tool.shapes.rectangle = dwv.tool.RectangleCreator;
    dwv.tool.shapes.roi = dwv.tool.RoiCreator;
    dwv.tool.shapes.ellipse = dwv.tool.EllipseCreator;

    // append tool container HTML
    dwv.gui.appendToolboxHtml();
    // append tools HTML
    dwv.gui.appendWindowLevelHtml();
    dwv.gui.appendZoomAndPanHtml();
    dwv.gui.appendScrollHtml();
    dwv.gui.appendDrawHtml();
    //dwv.gui.appendLivewireHtml();
    
    // append filter container HTML
    dwv.gui.appendFilterHtml();
    // append filters HTML
    dwv.gui.filter.appendThresholdHtml();
    dwv.gui.filter.appendSharpenHtml();
    dwv.gui.filter.appendSobelHtml();
    
    // append help HTML
    dwv.gui.appendHelpHtml(true);
    dwv.gui.appendVersionHtml();
    dwv.gui.appendUndoHtml();

    // initialise the application
    app.init();
    
    var size = dwv.gui.getWindowSize();
    $("#layerContainer").height(size.height);
	$("#main").width(size.width-162);
});

function guid(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}
function setCookie(name, value, expires) { 
  if (!expires) expires=1000*60*60*24*365*5;
  path="/";
  domain=document.domain;
  secure=false;
  var today = new Date(); 
  today.setTime( today.getTime() ); 
  var expires_date = new Date( today.getTime() + (expires) ); 
  document.cookie = name + "=" +escape( value ) + 
          ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + //expires.toGMTString() 
          ( ( path ) ? ";path=" + path : "" ) + 
          ( ( domain ) ? ";domain=" + domain : "" ) + 
          ( ( secure ) ? ";secure" : "" ); 
}