/*src/html.js*/
var g_openHAR;

(function(w, d, $) {
	'use strict';
	w.module = {};
	$.create = function(e) {return $(d.createElement(e));};
	var
	appendScript = function(path) {
		return $.create('script').attr({
			src: path,
			id: path.split('/')[1].split('.')[0]
		}).appendTo(d.body);
	},
	translateTemplate = function(html) {
		var translations = w.translations,
			lng = w.navigator.language,
			replacer;
		if(translations && translations[lng]) {
			translations = translations[lng];
			replacer = function() {
				var match = arguments[1];
				return (translations[match]) || match;
			};
		}
		else if(translations === false || !translations[lng]) {
			replacer = '$1';
		}
		
		return html.replace(/\[([^\]]+)\]/g, replacer);
		
	},
	replaceAll = function(_s, _f, _r, _c) {

		var o = _s.toString(),
			r = '',
			s = o,
			b = 0,
			e = -1;
		
		if(_c) {
			_f = _f.toLowerCase();
			s = o.toLowerCase();
		}

		while((e=s.indexOf(_f)) > -1) {
			r += o.substring(b, b+e) + _r;
			s = s.substring(e+_f.length, s.length);
			b += e+_f.length;
		}

		// Add Leftover
		if(s.length>0)
			r += o.substring(o.length-s.length, o.length);

		// Return New String
		return r;
	},
	localAccessWarning = function() {
		$.create('p')
		.addClass('sh-localaccesswarning')
		.append(
			$.create('span')
			.text('Local Ajax is not supported :(')
		).appendTo(d.body);
		$('body').html($('body').html().replace('{content}', ''));
	},
	runHar = function(newHar, $tableTemplate) {
		for(var i=0, ilen=newHar.length, status;i<ilen;i++) {
			newHar[i].order = i + 1;
			newHar[i].rId = Math.floor((Math.random()*(new Date()).getTime())+1);
			status = newHar[i].status;
			if(!status || status < 300)
				newHar[i].bgstatus = '';
			else if(status >= 500)
				newHar[i].bgstatus = 'danger';
			else if(status >= 400)
				newHar[i].bgstatus = 'warning';
			else if(status >= 300)
				newHar[i].bgstatus = 'redirect';
		}
		
		
		$.get('src/requestTemplate.html', function(template) {
			var html =  '',
				i = 0,
				ilen = newHar.length,
				$table = $tableTemplate,
				prop, nHar = newHar[0], _html,
				$parseable, $parent, parseContent;
			
			for(;i<ilen;i++) {
				nHar = newHar[i];
				_html = template;
				for(prop in nHar) {
					_html = replaceAll(_html, '{' + prop + '}', nHar[prop]);
				}
				html += _html;
			}
			$table.find('tbody').html(translateTemplate(html));
			$table.find('tfoot tr').html(translateTemplate(newHar.info));
			$table.find('caption').html(newHar.title);
			$table.appendTo($('.sh-container'));
			$('.sh-loader').hide();
			
			
			$parseable = $table.find('tr.top').find('td.type:contains(css)').add(
				$table.find('tr.top').find('td.type:contains(javascript)')
			);
			$parent = $parseable.parent();
			
			parseContent = function(id, type) {
				return function() {
					var $inside = $('#inside-' + id),
						tabs = translateTemplate('<li><a href="#parsedcontent">' +
												 '[Parsed Content]</a></li>'),
						result = '<div class="parsedcontent hidden" style="' +
									$inside.find('div').eq(0).attr('style') + '">';
					
					
					result += '<pre class="pre-scrollable">';
					if(type.indexOf('css') !== -1)
						result += unminify.css($inside.find('.content pre').html() || '');
					else if(type.indexOf('javascript') !== -1)
						result += unminify.js($inside.find('.content pre').html() || '');
					result += '</pre>';
					result += '</div>';
					$inside.find('.nav')[0].innerHTML += tabs;
					$inside.find('td').append($(result));
				};
			};
			
			ilen = $parent.length;
			
			while(ilen--)
				setTimeout(
					parseContent($parent.eq(ilen).attr('id').substr(4), $parseable.eq(ilen).text()),
				100);
			
			$('.sh-container .popover, .sh-container .tooltip').remove();
			
			addInteraction($, $table);
			
		});
		
	},
	//edit
	openHAR = function(data){
				var har, $table = $('.sh-table'), $newTable;
				try {
					har = JSON.parse(data);
				}
				catch(e) {
					w.alert(translateTemplate('[Invalid JSON]'));
					$('.sh-loader').hide();
					return;
				}
				$table.find('tbody, tfoot tr, caption').html('');
				$table.find('.tooltip, .popover').remove();
				
				$newTable = $table.first().clone();
				
				$table.remove();			
				
				har = harParser(har, function(content) {
					var elm = d.createElement('span');
					elm.appendChild(d.createTextNode(content));
					return elm.innerHTML;
				});
				
				w.har = har;
				for(var i=0,ilen=har.length;i<ilen;i++)
					runHar(har[i], $newTable.clone());

	},
	drop = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		
		w.scrollTo(0,0);
		
		var files = evt.originalEvent.dataTransfer.files,
			$drop = $('#drop'),
			$loader = $('.sh-loader'),
			file, reader;
		
		$drop
			.css('display', 'none')
			.data('hide', 'true');
		
		if(files.length) {
			
			if($loader.length)
				$loader.show();
			else
				$loader = $.create('div').addClass('sh-loader').appendTo(d.body);
		
		
			file = files[0];
			
			reader = new FileReader();
			
			reader.onload = function (evt) {
				openHAR(evt.target.result);
				/*var har, $table = $('.sh-table'), $newTable;
				try {
					har = JSON.parse(evt.target.result);
				}
				catch(e) {
					w.alert(translateTemplate('[Invalid JSON]'));
					$('.sh-loader').hide();
					return;
				}
				$table.find('tbody, tfoot tr, caption').html('');
				$table.find('.tooltip, .popover').remove();
				
				$newTable = $table.first().clone();
				
				$table.remove();			
				
				har = harParser(har, function(content) {
					var elm = d.createElement('span');
					elm.appendChild(d.createTextNode(content));
					return elm.innerHTML;
				});
				
				w.har = har;
				for(var i=0,ilen=har.length;i<ilen;i++)
					runHar(har[i], $newTable.clone());*/				
			};
			reader.readAsText(file);
		}
		
		return false;
	},
	dragover = function() {
		var $drop = $('#drop');
		if($drop.length) {
			$drop.css('display', 'table');
		}
		else {
			$.create('div')
			.attr('id', 'drop')
			.addClass('sh-dropfile')
			.append($.create('span').text(translateTemplate('[Drop Here! :)]')))
			.on('drop', function(evt) {
				var $loader = $('.sh-loader');
				if($loader.length && $loader.is(':visible'))
					return;
				
				return drop(evt);
				
			})
			.appendTo(d.body);
		}
		
		$drop.data('hide','false');
		return false;
	},
	dragleave = function() {
		var $drop = $('#drop');
		$drop.data('hide','true');
		
		setTimeout(function() {
			if($drop.data('hide') === 'true')
				$drop.css('display', 'none');
		}, 50);
		
		return false;
	};
	//appendScript('src/harParser.js');
	//appendScript('lib/unminify.js');

	$.getJSON('src/translate.json', function(data) {
		w.translations = data || false;		
		$.get('src/template.html', function() {
			$('.container').load('src/template.html table', function() {
				var $table = $('table.sh-table');
				$table.find('caption').html('');
				$table.html(translateTemplate($table.html()));
			});
					
			
			$('body')
				.on('dragover', dragover)
				.on('dragend', function() {return false;})
				.on('dragleave', dragleave)
				.on('drop', drop);

			g_openHAR=openHAR; //edit
		})
		.fail(localAccessWarning);
	});
	
	
	
})(window, document, jQuery);

/*src/stupidtable.js*/
(function(c){c.fn.stupidtable=function(b){return this.each(function(){var a=c(this);b=b||{};b=c.extend({},c.fn.stupidtable.default_sort_fns,b);a.on("click.stupidtable","th",function(){var d=c(this),f=0,g=c.fn.stupidtable.dir;a.find("th").slice(0,d.index()).each(function(){var a=c(this).attr("colspan")||1;f+=parseInt(a,10)});var e=d.data("sort-default")||g.ASC;d.data("sort-dir")&&(e=d.data("sort-dir")===g.ASC?g.DESC:g.ASC);var l=d.data("sort")||null;null!==l&&(a.trigger("beforetablesort",{column:f, direction:e}),a.css("display"),setTimeout(function(){var h=[],m=b[l],k=a.children("tbody").children("tr.top");k.each(function(a,b){var d=c(b).children().eq(f),e=d.data("sort-value"),d="undefined"!==typeof e?e:d.text();h.push([d,b])});h.sort(function(a,b){return m(a[0],b[0])});e!=g.ASC&&h.reverse();k=c.map(h,function(a){return a[1]});a.children("tbody").append(k);a.find("th").data("sort-dir",null).removeClass("sorting-desc sorting-asc");d.data("sort-dir",e).addClass("sorting-"+e);a.trigger("aftertablesort", {column:f,direction:e});a.css("display")},10))})})};c.fn.stupidtable.dir={ASC:"asc",DESC:"desc"};c.fn.stupidtable.default_sort_fns={"int":function(b,a){return parseInt(b,10)-parseInt(a,10)},"float":function(b,a){return parseFloat(b)-parseFloat(a)},string:function(b,a){return b<a?-1:b>a?1:0},"string-ins":function(b,a){b=b.toLowerCase();a=a.toLowerCase();return b<a?-1:b>a?1:0}}})(jQuery);

/*src/script.js*/
(function(w, d) {
	'use strict';
	var addInteraction = function($, $table) {
		
		if(typeof $ === 'undefined' || !$table.find('.inside').length)
			return waiting();
		
		var $tableParent = $table.parent(),
			$inside = $table.find('.inside'),
			$nav = $inside.find('.nav'),
			$top = $table.find('.top'),
			$timeline = $top.find('.timeline'),
			$div = $inside.find('div'),
			$dt = $inside.find('dt'),
			tableWidth;
		
		tableWidth = getTableWidth($table, $div);
		
		addTitles($dt);
		
		
		$inside.addClass('hidden');
		
		//Hiding content from tabs, but first
		$div.css('width', tableWidth - 10).addClass('hidden').end()
			.find('div:first').removeClass('hidden');
		
		$nav.find('li:first-child').addClass('active');
		
		//Tabs clicks listener
		$nav.on('click', 'a', tabsListener);
		
		//Middle click to open url
		$top.find('td.url').find('div > a').click(middleClickListener);
		
		
		//Toggle request click
		$top.click(requestClickListener);
		
		totalStartTime($top);
		
		applyTooltip($top, $timeline, $tableParent);
		
		applyPopover($timeline, $tableParent, $('.sh-table').length > 1);
		
		
		
		stupidtable($table);
		
		
		
		$('.sh-loader').hide();
		
	},
	waiting = function() {
		if(typeof jQuery === 'undefined' || !jQuery('.inside').length)
			return setTimeout(waiting, 500);

		jQuery(function() {
			jQuery('.sh-table').each(function() {
				addInteraction(jQuery, jQuery(this));
			});
		});
	},
	getTableWidth = function($table, $div) {
		$div.hide();
		var width = $table.width();
		$div.show();
		
		return width;
	},
	//Adding title attribute to large descriptions
	addTitles = function($dt) {
		var i = 0,
			ilen = $dt.length,
			_$dt, text;
		
		for(;i<ilen;i++) {
			_$dt = $dt.eq(i);
			text = _$dt.text();
			if(text.length > 18)
				_$dt.attr('title', text);
		}
	},
	applyTooltip = function($top, $timeline, $container) {
		var tooltipOpt = {
			placement:'right',
			trigger: 'hover',
			html:true,
			container:$container
		};
		
		$top.find('td.size')
			.add($timeline.find('span.domloaded, span.renderstarted'))
			.tooltip(tooltipOpt);
		
		tooltipOpt.placement = 'left';
		$top.find('td.status, td.type')
			.add($timeline.find('span.windowloaded'))
			.tooltip(tooltipOpt);
	},
	applyPopover = function($timeline, $container, topBottom) {
		var i = 0,
			ilen = $timeline.length;
		
		if(ilen > 15 || topBottom) {
			for(ilen=Math.floor($timeline.length/2);i<ilen;i++)
				$timeline.eq(i).data('placement', 'bottom');
			
			for(ilen=$timeline.length;i<ilen;i++)
				$timeline.eq(i).data('placement', 'top');
		}
		else {
			for(;i<ilen;i++)
				$timeline.eq(i).data('placement', 'bottom');
		}
		
		$timeline.popover({
			html:true,
			trigger:'hover',
			container:$container
		});
	},
	tabsListener = function() {
		var $this = jQuery(this),
			$inside = $this.parents('tr.inside'),
			$div = $inside.find('div');
		
		$inside.find('.active').removeClass('active');
		$this.parent().addClass('active');
		
		
		$div
			.addClass('hidden')
			.filter('.' + $this.attr('href').substr(1))
			.removeClass('hidden');
		
		
		return false;
	},
	middleClickListener = function(evt) {
		if(evt.which === 2)
			evt.stopPropagation();
		else {
			jQuery(this).parents('tr.top').click();
			return false;
		}
	},
	requestClickListener = function() {
		var $this = jQuery(this),
			$i = $this.find('i'),
			classname = $i.get(0).className,
			toggleClass = $i.data('toggle-sign'),
			$next = jQuery('#inside-' + $this.attr('id').substr(4));
		
		
		
		
		if($this.hasClass('opened')) {
			$this.removeClass('opened');
			$next.addClass('hidden');
		}
		else {
			
			if($this.next() !== $next)
				$this.after($next);
			
			$this.addClass('opened');
			$next.removeClass('hidden');
		}
		$i.get(0).className = toggleClass;
		$i.data('toggle-sign', classname);
		return false;
	},
	totalStartTime = function($row) {
		var i = 0,
			ilen = $row.length,
			spacePct, widthPct,
			$top, $bars, $startTime, $space,
			getWidth = function() {
				return parseFloat(jQuery(this).attr('style').replace('width:', ''));
			},
			sum = function(v1, v2) {
				return v1 + v2;
			};
		
		for(;i<ilen;i++) {
			$top = $row.eq(i);
			$bars = $top.find('div.progress-bar');
			$startTime = $top.find('span.totalTime');
			
			$space = $top.find('div.progress-bar-space');
			spacePct = parseFloat($space.attr('style').replace('width:', ''));
			
			widthPct = $bars.map(getWidth).toArray().reduce(sum);
			
			
			if(spacePct > 80 || (widthPct > 80 && spacePct > 20))
				$startTime.css('right', (100.5 - spacePct) + '%');
			else if(widthPct > 80)
				$startTime.css({left:'5px', fontWeight:'bold'});
			else
				$startTime.css('left', (widthPct + 0.5) + '%');
			
		}
		
	},
	stupidtable = function($table) {
		if($table.stupidtable) {
			$table.stupidtable({
				url:function(a, b) {
					a = a.split('\n')[5].replace(/^\s*/g, '').split('?')[0].split('#')[0];
					b = b.split('\n')[5].replace(/^\s*/g, '').split('?')[0].split('#')[0];
						
					if(a < b)
						return -1;
					else if(a > b)
						return 1;
					else
						return 0;
				},
				timeline:function(a, b) {
					
					a = parseInt(a.split('\n')[3].replace(/^\s*/g, ''),10);
					b = parseInt(b.split('\n')[3].replace(/^\s*/g, ''),10);
					
					return b - a;
				}
			});
			$table.bind('beforetablesort', function() {
				jQuery('tr.top.opened').click();
				jQuery('.sh-loader').show();
			});
			$table.bind('aftertablesort', function() {
				jQuery('.sh-loader').hide();
			});
		}
	};
	if(!d.getElementById('harParser')) {
		var div = d.createElement('div');
		div.className = 'sh-loader';
		d.body.appendChild(div);
		waiting();
	}
	w.addInteraction = addInteraction;
})(window, document);

/*src/harParser.js*/
var harParser = module.exports = function(har, htmlEncode) {
	'use strict';
	
	har = har.log;
	
	// if(!htmlEncode)
	// 	console.error('htmlEncode not found. The content tab will not be displayed');
	
	var
	
	verticalRowMarker = function(cname, title, value, left) {
		var result = '<span class="' + cname + '" data-toggle="tooltip" ';
		
		result += 'title="[' + title + '] (' + harParser.timeFormatter(value) +')" ';
		result += 'style="left:' + (parseFloat(left)>100?'100%':left) + '"></span>';
		
		return result;
	},
	
	sortEntries = function(a, b) {
		a = a.startedDateTime;
		b = b.startedDateTime;
		
		if(a)
			a = (new Date(a)).getTime();
		else
			a = 0;
		
		if(b)
			b = (new Date(b)).getTime();
		else
			b = 0;
		
		
		return a - b;
		
	},
	
	filterEntryByPage = function(entries, id) {
		var newEntries, i, ilen, entry;
		if(id && id !== '') {
			newEntries = [];
			for(i=0, ilen=entries.length;i<ilen;i++) {
				entry = entries[i];
				if(entry.pageref && entry.pageref === id)
					newEntries.push(entry);
			}
			return newEntries;
		}
		return entries;
	},
	
	verticalMarkers = function(entries, params) {
		var i = 0,
			j = 0,
			ilen = entries.length,
			args = [
				{
					cname:'windowloaded',
					title:'Page Loaded',
					value:'onLoad',
					param1:'onLoad',
					param2:'lastTime',
					left:false,
					verify:true
				},
				{
					cname:'domloaded',
					title:'DOMContentLoaded',
					value:'load',
					left:'loadText',
					verify:params.load
				},
				{
					cname:'renderstarted',
					title:'Start Render',
					value:'start',
					param1:'start',
					param2:'lastTime',
					left:false,
					verify:params.start
				}
			],
			jlen = args.length;
		
		for(;i<ilen;i++) {
			for(j=0;j<jlen;j++) {
				if(args[j].verify)
					entries[i][args[j].cname] = verticalRowMarker(
						args[j].cname,
						args[j].title,
						params[args[j].value],
						params[args[j].left] ||
							harParser.pct(params[args[j].param1],params[args[j].param2])
					);
				else
					entries[i][args[j].cname] = '';
			}
		}
		
		return entries;
	},
	prepareInfo = function(requests, size, load) {
		var info = '<th>' + requests + ' [requests]</th>';
		info+= '<th colspan="3" class="text-right">';
		info+= size.total + ' (' + size.compressed + ' [compressed])</th>';
		info+= '<th class="text-center">';
		if(load.content)
			info+= '<span title="DOMContentLoaded" class="text-success">('+load.content+')</span> ';
		info+= '<span title="Page Loaded" class="text-danger">' + load.on + '</span></th>';
		
		return info;
	},
	parsePages = function(har) {
		var hars = har.pages.filter(function(page) {return !!page.id;});
		
		if(!hars.length)
			hars = [har.pages[0]];
		
		hars = hars.map(function(page) {
			var entries = filterEntryByPage(har.entries, page.id),
				pageTimings = page.pageTimings,
				onContentLoad = pageTimings.onContentLoad || false,
				onLoad = pageTimings.onLoad,
				totalSize = 0,
				totalCompressedSize = 0,
				lastTimeArray = [onLoad],
				i = 0,
				ilen = entries.length,
				progress = [],
				prop, lastTime, hResponse, hProgress, hEntry;
			
			entries.sort(sortEntries);
			
			for(;i<ilen;i++) {
				hEntry = entries[i];
				hResponse = hEntry.response;
				
				
				totalSize += hResponse.content.size;
				totalCompressedSize += hResponse.bodySize;
				
				hProgress = harParser.parseProgress(hEntry);
				progress.push(hProgress);
				
				
				hEntry = entries[i] = harParser.convertHar(hEntry, i, htmlEncode);
				
				lastTimeArray.push(
					(hProgress.total + hProgress.startedDateTime) - progress[0].startedDateTime
				);
			}

			
			lastTime = Math.max.apply(null, lastTimeArray);
			
			progress = harParser.convertProgress(progress, lastTime);
			
			for(i=0;i<ilen;i++) {
				hProgress = progress[i];
				for(prop in hProgress) {
					entries[i][prop] = hProgress[prop];
				}
			}
			
			entries = verticalMarkers(entries, {
				onLoad:onLoad,
				lastTime:lastTime,
				load:onContentLoad,
				loadText:onContentLoad?harParser.pct(onContentLoad, lastTime):'',
				start:pageTimings._startRender || false
			});
			
			
			
			
			
			
			entries.title = page.title;
			entries.pRef = page.id;
			
			if(onContentLoad !== false)
				onContentLoad = harParser.timeFormatter(onContentLoad);
			
			entries.info = prepareInfo(
				entries.length,
				{
					total:harParser.dataSizeFormatter(totalSize),
					compressed:harParser.dataSizeFormatter(totalCompressedSize)
				},
				{
					content:onContentLoad,
					on:harParser.timeFormatter(onLoad)
				}
			);
			
			return entries;
		});
		
		return hars;
		
	};
	
	return parsePages(har);
	
	
};
//Decode url texts
harParser.decode = function(str) {
	'use strict';
	var _str;
	try {
		_str = decodeURIComponent(str);
	}
	catch(e) {
		try {
			_str = decodeURI(str);
		}
		catch(ee) {
			try {
				_str = unescape(str);
			}
			catch(eee) {
				_str = str;
			}
		}
	}
	return _str;
};
//Return request method with strong tag, or empty if GET
harParser.parseMethod = function(method) {
	'use strict';
	if(method.toLowerCase() === 'get')
		return '';
	
	return method && harParser.strong(method + ' ') || '';
};

harParser.urlRe = /([^:]+:\/+)([^\/]*)(\/?(?:\/?([^\/\?\#]*))*)(.*)/i;
harParser.urlDataRe = /^data:(\w+\/\w+);(?:base64,)?(charset=[^,]+,)?(.+)$/i;

//Parse url and return an object with necessary attributes
harParser.parseUrl = function(url, complete) {
	'use strict';
	var urlMatch = url.match(harParser.urlRe),
		urlFile;
	
	if(!urlMatch) {
		if(!url.indexOf('data:')) {
			urlFile = harParser.strong('Data:');
		}
		else {
			urlFile = url;
		}
	}
	else {
		if(!urlMatch[4]) {
			urlFile = urlMatch[3];
			
			if(complete)
				urlFile = urlMatch[1] + urlMatch[2] + urlFile;
			else if(!urlFile)
				urlFile = '/';
		}
		else
			urlFile = urlMatch[4];
	}
	
	urlFile = urlFile.replace(/^\s*/g,'').replace(/\s*$/g,'');
	
	if(!url.indexOf('https'))
		urlFile = harParser.strong(urlFile, 'text-success');
	
	return {
		params: harParser.decode(urlMatch && urlMatch[5] || ''),
		file: urlFile,
		complete:url
	};
};
//Parse status + statusText and return an object with necessary attributes
harParser.parseStatus = function(code, statusText) {
	'use strict';
	var status = code;
	
	statusText = statusText || '';
	
	if(code >= 500)
		status = harParser.strong(code, 'text-danger');
	else if(code >= 400)
		status = harParser.strong(code, 'text-warning');
	else if(code < 100)
		status = harParser.em(code, 'text-muted');
	
	
	return {
		code: code,
		status: status,
		complete: code + (statusText?(' ' + statusText):'')
	};
	
};
//Return object with original and compressed size formatted and without format
harParser.parseSize = function(size, compressed, status) {
	'use strict';
	var mainSize = compressed;
	
	if(compressed < 0)
		mainSize = 0;
	else if(compressed === 0)
		mainSize = size;
	
	mainSize = harParser.dataSizeFormatter(mainSize);

	if(status === 304)
		mainSize = harParser.em(mainSize);
	else if((status === 200 || !status) && (!compressed || compressed < 0)) {
		if(status === 200 && compressed <= 0)
			mainSize = harParser.strong(mainSize, 'text-danger');
		else
			mainSize = harParser.strong(mainSize);
	}
	
	
	return {
		originalSize: size + ' Bytes',
		originalCompressed: compressed + ' Bytes',
		size: mainSize,
		complete: size,
		compressed: compressed
	};
};
//Return object with separated mime type informations
harParser.parseMime = function(mimeType, url) {
	'use strict';
	var inline = false,
		mime;
	
	if(!mimeType && url && !url.indexOf('data:')) {
		mimeType = url.match(harParser.urlDataRe);
		
		if(mimeType && mimeType[1]) {
			mimeType = mimeType[1] + '; ';
			mimeType += (mimeType[2] && mimeType[2].substr(0,mimeType[2].length-1) || '');
		}
		else
			mimeType = false;
		
		inline = true;
	}
	
	
	if(mimeType) {
		mime = mimeType.split(';')[0].split('/');
		
		return {
			complete: mimeType.replace('; ', ''),
			type: mime[1],
			base: mime[0],
			inline: inline
		};
	}
	else {
		return {
			complete: '',
			type: '',
			base: '',
			inline: inline
		};
	}
};
//Parse and return content (html, css, images...)
harParser.parseContent = function(content, url, mime, htmlEncode) {
	'use strict';
	var tabs = '',
		result = '',
		_result = '';
	
	if(mime.base === 'image' || htmlEncode) {
		if(content || !url.indexOf('data:')) {
			tabs += '<li><a href="#content">[Content]</a></li>';
			result += '<div class="content">';
			
			
			if(mime.base === 'image') {
				if(content) {
					result += '<img src="data:' + mime.base + '/' + mime.type;
					result += ';base64,' + content + '" />';
				}
				else
					result += '<img src="' + url + '" />';
			}
			else {
				if(content) {
					_result = htmlEncode(content);
					result += '<pre class="pre-scrollable">' + _result + '</pre>';
				}
				else {
					_result = htmlEncode(url);
					result += '<pre class="pre-scrollable">' + _result + '</pre>';
				}
			}
			
			result += '</div>';
			
		}
		else {
			tabs += '<li><a href="#content">[Content]</a></li>';
			result += '<div class="content">';
			if(mime.base === 'image') {
				if(content) {
					result += '<img src="data:' + mime.base + '/' + mime.type;
					result += ';base64,' + content + '" />';
				}
				else
					result += '<img src="' + url + '" />';
			}
			result += '</div>';
		}
	}
	return {
		tabs: tabs,
		result: result,
		_result: _result
	};
};
//Return object with progress informations
harParser.parseProgress = function(entry) {
	'use strict';
	var timings = entry.timings,
		blocked = timings.blocked,
		dns = timings.dns,
		connect = timings.connect,
		send = timings.send,
		wait = timings.wait,
		receive = timings.receive,
		ssl = timings.ssl,
		_blocked = blocked >= 0?blocked:0,
		_dns = dns >= 0?dns:0,
		_connect = connect >= 0?connect:0,
		_send = send >= 0?send:0,
		_wait = wait >= 0?wait:0,
		_receive = receive >= 0?receive:0,
		_ssl = ssl >= 0?ssl:0;
	
	
	
	return {
		startedDateTime:(new Date(entry.startedDateTime)).getTime(),
		time: entry.time,
		blocked: blocked,
		dns: dns,
		connect: connect,
		send: send,
		wait: wait,
		receive: receive,
		ssl: ssl,
		total:	_blocked +
				_dns +
				_connect +
				_send +
				_wait +
				_receive +
				_ssl
	};
};
//Add tag strong and classname
harParser.strong = function(str,cname) {
	'use strict';
	if(cname)
		cname = ' class="' + cname + '"';
	else
		cname = '';
	return '<strong' + cname + '>' + str + '</strong>';
};
//Add tag em and classname
harParser.em = function(str, cname) {
	'use strict';
	if(cname)
		cname = ' class="' + cname + '"';
	else
		cname = '';
	return '<em' + cname + '>' + str + '</em>';
};
//Format size to show
harParser.dataSizeFormatter = function(value, precision) {
	'use strict';
	var ext = [' Bytes', ' KB', ' MB', ' GB', ' TB'],
		i = 0;
	
	value = value >= 0 ? value : 0;
	
	while(value > 1024 && i < (ext.length - 1)) {
		value /= 1024;
		i++;
	}
	
	return harParser.precisionFormatter(value, precision || 2) + ext[i];
};
//Format float point precision
harParser.precisionFormatter = function(number, precision) {
	'use strict';
	var matcher, fPoint;
	precision = precision || 2;
	
	
	number = number.toFixed(precision);
	
	if(precision === '0')
		return number;
	
	fPoint = number.split('.')[1];
	
	matcher = fPoint.match(/0+/);
	
	if(matcher && matcher[0].length === fPoint.length) {
		return number.split('.')[0];
	}
	else {
		//Need to think on how to make this 'translatable'
		//Not everyone use dot (.) as separator
		return number;//.replace('.', ',');
	}
};
//Calculate pct value
harParser.pct = function(value, pct, symbol) {
	'use strict';
	if(!value)
		return 0;
	symbol = symbol || '%';
	return ((value * 100) / pct) + symbol;
};
//Format time based on miliseconds
harParser.timeFormatter = function(time, precision) {
	'use strict';
	var ext = ['ms', 's', 'min', 'h'],
		div = [1000, 60, 60, 60],
		i = 0;
	
	time = time >= 0 ? time : 0;
	
	while(time >= div[i] && i < (ext.length - 1)) {
		time /= div[i];
		i++;
	}
	
	return harParser.precisionFormatter(time, precision || 2) + ext[i];
};
//Decode multiple encoded text
harParser.decoder = function(text) {
	'use strict';
	
	var oldtext;
	
	do {
		oldtext = text;
		text = harParser.decode(text);
	}while(text !== oldtext);
	
	return text;
};
//Decode a list of objects
harParser.decodeObj = function(objList) {
	'use strict';
	var newObjList = [],
		i = 0,
		ilen, obj;
	
	if(!objList || !objList.length)
		return objList;
	
	for(ilen=objList.length;i<ilen;i++) {
		obj = objList[i];
		newObjList.push({
			name:obj.name,
			value:harParser.decoder(obj.value)
		});
	}
	
	return newObjList;
	
};
//Filter an attribute value in an object list
harParser.filterObjList = function(objList, attr, filter) {
	'use strict';
	
	var newObjList = [],
		i = 0,
		ilen,
		obj;
	
	if(!filter)
		return objList;
	
	filter = filter.toLowerCase();
	
	for(ilen=objList.length;i<ilen;i++) {
		obj = objList[i];
		if(!obj.hasOwnProperty(attr) || obj[attr].toLowerCase().indexOf(filter) === -1)
			newObjList.push(obj);
	}
	
	return newObjList;
};

//Generate a DL list based in an object list
harParser.objToDl = function(objList) {
	'use strict';
	var dl = '<dl class="dl-horizontal">',
		i = 0,
		ilen = objList && objList.length,
		obj;
	
	if(!ilen)
		return '';
	
	for(;i<ilen;i++) {
		obj = objList[i];
		dl += '<dt>' + obj.name + '</dt>';
		dl += '<dd>' + obj.value.replace(/;/g, ';<br>') + '</dd>';
	}
	
	return (dl + '</dl>');
	
};
//Generate an object with the tabs/titles and the content based in
//the request and response objects
harParser.tabContainer = function(header, request, response) {
	'use strict';
	var tab = header.tab,
		decode = header.decode,
		filter = header.filter,
		rq = {},
		rp = {},
		rqTab = request[tab],
		rpTab = response[tab],
		result = {
			tabs:'',
			containers:''
		},
		tabCapitalized,
		headersTitle = function(title, content) {
			return '<h3 class="headers-title"><small>['+ title +']</small></h3>' + content;
		},
		liTab = function(tabId, title) {
			return '<li><a href="#' + tabId + '">[' + title + ']</a></li>';
		};
	
	
	if(filter) {
		rqTab = harParser.filterObjList(rqTab, 'name', filter);
		rpTab = harParser.filterObjList(rpTab, 'name', filter);
	}
	
	rq[tab] = harParser.objToDl(rqTab);
	rp[tab] = harParser.objToDl(rpTab);
	
	
	if(rq[tab] || rp[tab]) {
		if(decode) {
			rqTab = harParser.decodeObj(rqTab);
			rpTab = harParser.decodeObj(rpTab);
			rq['d' + tab] = harParser.objToDl(rqTab);
			rp['d' + tab] = harParser.objToDl(rpTab);
		}
		
		
		tabCapitalized = tab.charAt(0).toUpperCase() + tab.substr(1);
		
		result.tabs += liTab(tab, tabCapitalized);
		
		result.containers += '<div class="' + tab + '">';
		
		if(rq[tab])
			result.containers += headersTitle('Request ' + tabCapitalized, rq[tab]);
		
		if(rp[tab])
			result.containers += headersTitle('Response ' + tabCapitalized, rp[tab]);
		
		result.containers += '</div>';
		
		
		if(decode) {
			
			result.tabs += liTab('parsed' + tab, 'Parsed ' + tabCapitalized);
		
			result.containers += '<div class="parsed' + tab + '">';
			
			if(rq['d' + tab])
				result.containers += headersTitle('Request ' + tabCapitalized, rq['d' + tab]);
			
			if(rp['d' + tab])
				result.containers += headersTitle('Response ' + tabCapitalized, rp['d' + tab]);
			
			
			result.containers += '</div>';
			
			
		}
		
		
		
	}
	
	return result;
};
// Convert progress data to an object with converted data and HTML to tooltip
harParser.convertProgress = function(progress, lastTime) {
	'use strict';
	
	var firstTime = progress[0].startedDateTime,
		i = 0,
		ilen = progress.length,
		result = [],
		progressContent, startedTime, r,
		steps = [
			{classname:'warning',title:'Blocking',step:'blocked'},
			{classname:'last',title:'DNS',step:'dns'},
			{classname:'info',title:'Connect',step:'connect'},
			{classname:'secondary',title:'SSL',step:'ssl'},
			{classname:'primary',title:'Send',step:'send'},
			{classname:'danger',title:'Wait',step:'wait'},
			{classname:'success',title:'Receive',step:'receive'}
		],
		step, j, jlen = steps.length, p,
		progressRow = function(bg, title, value) {
			if(value > 0) {
				var result = '<p class=\'clearfix bg-' + bg + '\'>';
				
				result += tinyRow(title, value);
				
				result += '</p>';
				
				return result;
			}
			return '';
		},
		tinyRow = function(title, value) {
			var result = '<strong>[' + title + ']: </strong> ',
				time = harParser.timeFormatter(value, 3);
			
			if(parseFloat(time) === 0 && value > 0)
				time = '< ' + harParser.timeFormatter(1, 3);
			
			result += '<em> ' + time + '</em>';
			return result;
		};
	
	
	for(;i<ilen;i++) {
		
		r = {};
		
		p = progress[i];
		
		startedTime = p.startedDateTime - firstTime;
		
		progressContent = '';
		
		for(j=0;j<jlen;j++) {
			step = steps[j];
			
			if(p[step.step] >= 0) {
				progressContent += progressRow(step.classname, step.title, p[step.step]);
				r[step.step + 'Width'] = harParser.pct(p[step.step], lastTime);
			}
			else
				r[step.step + 'Width'] = '0';
			
		}
		
		
		if(startedTime >= 0)
			r.progressStart = tinyRow('Start Time', startedTime);
		else
			r.progressStart = '';
		
		r.progressContent = progressContent;
		
		
		r.startPosition = harParser.pct(startedTime, lastTime);
		
		
		r.totalTime = harParser.timeFormatter(p.total);
		
		result.push(r);
	}
	
	return result;
	
};
// Convert a request into another object
harParser.convertHar = function(entry, i, htmlEncode) {
	'use strict';
	
	var __request = entry.request,
		__response = entry.response,
		
		method = harParser.parseMethod(__request.method),
		url = harParser.parseUrl(__request.url, i > 1),
		status = harParser.parseStatus(__response.status, __response.statusText),
		size = harParser.parseSize(__response.content.size, __response.bodySize, status.code),
		mime = harParser.parseMime(__response.content.mimeType || '', url.complete),
		responseContent = harParser.parseContent(
			__response.content.text,
			url.complete,
			mime,
			htmlEncode
		),
		infos = [
			{tab:'headers', decode:false, filter:'cookie'},
			{tab:'cookies', decode:true, filter:false},
			{tab:'queryString', decode:true, filter:false}
		],
		tabs = '',
		containers = '',
		j = 0,
		jlen = infos.length,
		info;
	
	// TABS INFO
	for(;j<jlen;j++) {
		info = infos[j];
		info = harParser.tabContainer(info, __request, __response);
		tabs += info.tabs;
		containers += info.containers;
	}
	tabs += responseContent.tabs;
	containers += responseContent.result;
	
	
	
	return {
		method: method,
		fullUrl: url.complete,
		fileName: url.file,
		params: url.params,
		status: status.status,
		fullStatus: status.complete,
		mime: (mime.type === 'plain' || !mime.type) && mime.base?mime.base:mime.type,
		fullMimeType: mime.complete,
		size: size.originalCompressed,
		fullSize: size.originalSize,
		sizeToShow: size.size,
		tabs: tabs,
		tabContainers: containers,
		fileContent: responseContent._result
	};
	
};

/*lib/unminify.js*/
var unminify = module.exports = {
	css: function(code, tab) {
		var defaultTab = 4,
			space = '';

		if (typeof tab == 'string')
			tab = /^\d+$/.test(tab) ? parseInt(tab, 10) : defaultTab;

		if (typeof tab == 'undefined')
			tab = defaultTab;

		if (tab < 0)
			tab = defaultTab;

		code = code
			.split('\t').join('    ')
			.replace(/\s*{\s*/g, ' {\n    ')
			.replace(/;\s*/g, ';\n    ')
			.replace(/,\s*/g, ', ')
			.replace(/[ ]*}\s*/g, '}\n')
			.replace(/\}\s*(.+)/g, '}\n$1')
			.replace(/\n    ([^:]+):\s*/g, '\n    $1: ')
			.replace(/([A-z0-9\)])}/g, '$1;\n}');

		if (tab != 4) {
			for (;tab !== 0;tab--) {
				space += ' ';
			}
			code = code.replace(/\n    /g, '\n'+space);
		}

		return code;
	},
	js: function(js_source_text, options) {
		var beautifier = new unminify.Beautifier(js_source_text, options);
		return beautifier.beautify();
	},
	Beautifier: function(js_source_text, options) {
		var input, output_lines;
		var token_text, token_type, last_type, last_last_text, indent_string;
		var flags, previous_flags, flag_store;
		var whitespace, wordchar, punct, parser_pos, line_starters, digits;
		var prefix;
		var input_wanted_newline;
		var output_wrapped, output_space_before_token;
		var input_length, n_newlines, whitespace_before_token;
		var handlers, MODE, opt;
		var preindent_string = '';

		whitespace = "\n\r\t ".split('');
		wordchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'.split('');
		digits = '0123456789'.split('');

		punct = '+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::';
		punct += ' <%= <% %> <?= <? ?>'; // try to be a good boy and try not to break the markup language identifiers
		punct = punct.split(' ');

		// words which should always start on new line.
		line_starters = 'continue,try,throw,return,var,if,switch,case,default,for,while,break,function'.split(',');

		MODE = {
			BlockStatement: 'BlockStatement', // 'BLOCK'
			Statement: 'Statement', // 'STATEMENT'
			ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
			ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
			ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
			Conditional: 'Conditional', //'(COND-EXPRESSION)',
			Expression: 'Expression' //'(EXPRESSION)'
		};

		handlers = {
			'TK_START_EXPR': handle_start_expr,
			'TK_END_EXPR': handle_end_expr,
			'TK_START_BLOCK': handle_start_block,
			'TK_END_BLOCK': handle_end_block,
			'TK_WORD': handle_word,
			'TK_SEMICOLON': handle_semicolon,
			'TK_STRING': handle_string,
			'TK_EQUALS': handle_equals,
			'TK_OPERATOR': handle_operator,
			'TK_COMMA': handle_comma,
			'TK_BLOCK_COMMENT': handle_block_comment,
			'TK_INLINE_COMMENT': handle_inline_comment,
			'TK_COMMENT': handle_comment,
			'TK_DOT': handle_dot,
			'TK_UNKNOWN': handle_unknown
		};

		function create_flags(flags_base, mode) {
			var next_indent_level = 0;
			if (flags_base) {
				next_indent_level = flags_base.indentation_level;
				next_indent_level += (flags_base.var_line && flags_base.var_line_reindented) ? 1 : 0;
				if (!just_added_newline() &&
					flags_base.line_indent_level > next_indent_level) {
					next_indent_level = flags_base.line_indent_level;
				}
			}

			var next_flags = {
				mode: mode,
				parent: flags_base,
				last_text: flags_base ? flags_base.last_text : '', // last token text
				last_word: flags_base ? flags_base.last_word : '', // last 'TK_WORD' passed
				var_line: false,
				var_line_tainted: false,
				var_line_reindented: false,
				in_html_comment: false,
				multiline_frame: false,
				if_block: false,
				do_block: false,
				do_while: false,
				in_case_statement: false, // switch(..){ INSIDE HERE }
				in_case: false, // we're on the exact line with "case 0:"
				case_body: false, // the indented case-action block
				indentation_level: next_indent_level,
				line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
				start_line_index: output_lines.length,
				had_comment: false,
				ternary_depth: 0
			};
			return next_flags;
		}

		// Using object instead of string to allow for later expansion of info about each line

		function create_output_line() {
			return {
				text: []
			};
		}

		// Some interpreters have unexpected results with foo = baz || bar;
		options = options ? options : {};
		opt = {};

		// compatibility
		if (options.space_after_anon_function !== undefined && options.jslint_happy === undefined) {
			options.jslint_happy = options.space_after_anon_function;
		}
		if (options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
			opt.brace_style = options.braces_on_own_line ? "expand" : "collapse";
		}
		opt.brace_style = options.brace_style ? options.brace_style : (opt.brace_style ? opt.brace_style : "collapse");

		// graceful handling of deprecated option
		if (opt.brace_style === "expand-strict") {
			opt.brace_style = "expand";
		}


		opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
		opt.indent_char = options.indent_char ? options.indent_char : ' ';
		opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
		opt.break_chained_methods = (options.break_chained_methods === undefined) ? false : options.break_chained_methods;
		opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
		opt.space_in_paren = (options.space_in_paren === undefined) ? false : options.space_in_paren;
		opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
		opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;
		opt.space_before_conditional = (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
		opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
		opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);
		opt.e4x = (options.e4x === undefined) ? false : options.e4x;

		if(options.indent_with_tabs){
			opt.indent_char = '\t';
			opt.indent_size = 1;
		}

		//----------------------------------
		indent_string = '';
		while (opt.indent_size > 0) {
			indent_string += opt.indent_char;
			opt.indent_size -= 1;
		}

		while (js_source_text && (js_source_text.charAt(0) === ' ' || js_source_text.charAt(0) === '\t')) {
			preindent_string += js_source_text.charAt(0);
			js_source_text = js_source_text.substring(1);
		}
		input = js_source_text;
		// cache the source's length.
		input_length = js_source_text.length;

		last_type = 'TK_START_BLOCK'; // last token type
		last_last_text = ''; // pre-last token text
		output_lines = [create_output_line()];
		output_wrapped = false;
		output_space_before_token = false;
		whitespace_before_token = [];

		// Stack of parsing/formatting states, including MODE.
		// We tokenize, parse, and output in an almost purely a forward-only stream of token input
		// and formatted output.  This makes the beautifier less accurate than full parsers
		// but also far more tolerant of syntax errors.
		//
		// For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
		// MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
		// encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
		// most full parsers would die, but the beautifier gracefully falls back to
		// MODE.BlockStatement and continues on.
		flag_store = [];
		set_mode(MODE.BlockStatement);

		parser_pos = 0;

		this.beautify = function() {
			/*jshint onevar:true */
			var t, i, keep_whitespace, sweet_code, line_index;

			while (true) {
				t = get_next_token();
				token_text = t[0];
				token_type = t[1];

				if (token_type === 'TK_EOF') {
					break;
				}

				keep_whitespace = opt.keep_array_indentation && is_array(flags.mode);
				input_wanted_newline = n_newlines > 0;

				if (keep_whitespace) {
					for (i = 0; i < n_newlines; i += 1) {
						print_newline(i > 0);
					}
				} else {
					if (opt.max_preserve_newlines && n_newlines > opt.max_preserve_newlines) {
						n_newlines = opt.max_preserve_newlines;
					}

					if (opt.preserve_newlines) {
						if (n_newlines > 1) {
							print_newline();
							for (i = 1; i < n_newlines; i += 1) {
								print_newline(true);
							}
						}
					}
				}

				handlers[token_type]();

				// The cleanest handling of inline comments is to treat them as though they aren't there.
				// Just continue formatting and the behavior should be logical.
				// Also ignore unknown tokens.  Again, this should result in better behavior.
				if (token_type !== 'TK_INLINE_COMMENT' && token_type !== 'TK_COMMENT' &&
					token_type !== 'TK_BLOCK_COMMENT' && token_type !== 'TK_UNKNOWN') {
					last_last_text = flags.last_text;
					last_type = token_type;
					flags.last_text = token_text;
				}
				flags.had_comment = (token_type === 'TK_INLINE_COMMENT' || token_type === 'TK_COMMENT' || token_type === 'TK_BLOCK_COMMENT');
			}


			sweet_code = output_lines[0].text.join('');
			for (line_index = 1; line_index < output_lines.length; line_index++) {
				sweet_code += '\n' + output_lines[line_index].text.join('');
			}
			sweet_code = sweet_code.replace(/[\r\n ]+$/, '');
			return sweet_code;
		};

		function trim_output(eat_newlines) {
			eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

			if (output_lines.length) {
				trim_output_line(output_lines[output_lines.length - 1], eat_newlines);

				while (eat_newlines && output_lines.length > 1 &&
					output_lines[output_lines.length - 1].text.length === 0) {
					output_lines.pop();
					trim_output_line(output_lines[output_lines.length - 1], eat_newlines);
				}
			}
		}

		function trim_output_line(line) {
			while (line.text.length &&
				(line.text[line.text.length - 1] === ' ' ||
					line.text[line.text.length - 1] === indent_string ||
					line.text[line.text.length - 1] === preindent_string)) {
				line.text.pop();
			}
		}

		function trim(s) {
			return s.replace(/^\s+|\s+$/g, '');
		}

		// we could use just string.split, but
		// IE doesn't like returning empty strings

		function split_newlines(s) {
			//return s.split(/\x0d\x0a|\x0a/);

			s = s.replace(/\x0d/g, '');
			var out = [],
				idx = s.indexOf("\n");
			while (idx !== -1) {
				out.push(s.substring(0, idx));
				s = s.substring(idx + 1);
				idx = s.indexOf("\n");
			}
			if (s.length) {
				out.push(s);
			}
			return out;
		}

		function just_added_newline() {
			var line = output_lines[output_lines.length - 1];
			return line.text.length === 0;
		}

		function just_added_blankline() {
			if (just_added_newline()) {
				if (output_lines.length === 1) {
					return true; // start of the file and newline = blank
				}

				var line = output_lines[output_lines.length - 2];
				return line.text.length === 0;
			}
			return false;
		}

		function allow_wrap_or_preserved_newline(force_linewrap) {
			force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;
			if (opt.wrap_line_length && !force_linewrap) {
				var line = output_lines[output_lines.length - 1];
				var proposed_line_length = 0;
				// never wrap the first token of a line.
				if (line.text.length > 0) {
					proposed_line_length = line.text.join('').length + token_text.length +
						(output_space_before_token ? 1 : 0);
					if (proposed_line_length >= opt.wrap_line_length) {
						force_linewrap = true;
					}
				}
			}
			if (((opt.preserve_newlines && input_wanted_newline) || force_linewrap) && !just_added_newline()) {
				print_newline(false, true);

				// Expressions and array literals already indent their contents.
				if (!(is_array(flags.mode) || is_expression(flags.mode))) {
					output_wrapped = true;
				}
			}
		}

		function print_newline(force_newline, preserve_statement_flags) {
			output_wrapped = false;
			output_space_before_token = false;

			if (!preserve_statement_flags) {
				if (flags.last_text !== ';') {
					while (flags.mode === MODE.Statement && !flags.if_block && !flags.do_block) {
						restore_mode();
					}
				}
			}

			if (output_lines.length === 1 && just_added_newline()) {
				return; // no newline on start of file
			}

			if (force_newline || !just_added_newline()) {
				flags.multiline_frame = true;
				output_lines.push(create_output_line());
			}
		}

		function print_token_line_indentation() {
			if (just_added_newline()) {
				var line = output_lines[output_lines.length - 1];
				if (opt.keep_array_indentation && is_array(flags.mode) && input_wanted_newline) {
					// prevent removing of this whitespace as redundant
					line.text.push('');
					for (var i = 0; i < whitespace_before_token.length; i += 1) {
						line.text.push(whitespace_before_token[i]);
					}
				} else {
					if (preindent_string) {
						line.text.push(preindent_string);
					}

					print_indent_string(flags.indentation_level +
						(flags.var_line && flags.var_line_reindented ? 1 : 0) +
						(output_wrapped ? 1 : 0));
				}
			}
		}

		function print_indent_string(level) {
			// Never indent your first output indent at the start of the file
			if (output_lines.length > 1) {
				var line = output_lines[output_lines.length - 1];

				flags.line_indent_level = level;
				for (var i = 0; i < level; i += 1) {
					line.text.push(indent_string);
				}
			}
		}

		function print_token_space_before() {
			var line = output_lines[output_lines.length - 1];
			if (output_space_before_token && line.text.length) {
				var last_output = line.text[line.text.length - 1];
				if (last_output !== ' ' && last_output !== indent_string) { // prevent occassional duplicate space
					line.text.push(' ');
				}
			}
		}

		function print_token(printable_token) {
			printable_token = printable_token || token_text;
			print_token_line_indentation();
			output_wrapped = false;
			print_token_space_before();
			output_space_before_token = false;
			output_lines[output_lines.length - 1].text.push(printable_token);
		}

		function indent() {
			flags.indentation_level += 1;
		}

		function deindent() {
			if (flags.indentation_level > 0 &&
				((!flags.parent) || flags.indentation_level > flags.parent.indentation_level))
				flags.indentation_level -= 1;
		}

		function remove_redundant_indentation(frame) {
			// This implementation is effective but has some issues:
			//     - less than great performance due to array splicing
			//     - can cause line wrap to happen too soon due to indent removal
			//           after wrap points are calculated
			// These issues are minor compared to ugly indentation.

			if (frame.multiline_frame) return;

			// remove one indent from each line inside this section
			var index = frame.start_line_index;
			var splice_index = 0;
			var line;

			while (index < output_lines.length) {
				line = output_lines[index];
				index++;

				// skip empty lines
				if (line.text.length === 0) {
					continue;
				}

				// skip the preindent string if present
				if (preindent_string && line.text[0] === preindent_string) {
					splice_index = 1;
				} else {
					splice_index = 0;
				}

				// remove one indent, if present
				if (line.text[splice_index] === indent_string) {
					line.text.splice(splice_index, 1);
				}
			}
		}

		function set_mode(mode) {
			if (flags) {
				flag_store.push(flags);
				previous_flags = flags;
			} else {
				previous_flags = create_flags(null, mode);
			}

			flags = create_flags(previous_flags, mode);
		}

		function is_array(mode) {
			return mode === MODE.ArrayLiteral;
		}

		function is_expression(mode) {
			return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
		}

		function restore_mode() {
			if (flag_store.length > 0) {
				previous_flags = flags;
				flags = flag_store.pop();
			}
		}

		function start_of_object_property() {
			return flags.mode === MODE.ObjectLiteral && flags.last_text === ':' &&
				flags.ternary_depth === 0;
		}

		function start_of_statement() {
			if (
				(flags.last_text === 'do' ||
					(flags.last_text === 'else' && token_text !== 'if') ||
					(last_type === 'TK_END_EXPR' && (previous_flags.mode === MODE.ForInitializer || previous_flags.mode === MODE.Conditional)))) {
				// Issue #276:
				// If starting a new statement with [if, for, while, do], push to a new line.
				// if (a) if (b) if(c) d(); else e(); else f();
				allow_wrap_or_preserved_newline(
					in_array(token_text, ['do', 'for', 'if', 'while']));

				set_mode(MODE.Statement);
				// Issue #275:
				// If starting on a newline, all of a statement should be indented.
				// if not, use line wrapping logic for indent.
				if (just_added_newline()) {
					indent();
					output_wrapped = false;
				}
				return true;
			}
			return false;
		}

		function all_lines_start_with(lines, c) {
			for (var i = 0; i < lines.length; i++) {
				var line = trim(lines[i]);
				if (line.charAt(0) !== c) {
					return false;
				}
			}
			return true;
		}

		function is_special_word(word) {
			return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else']);
		}

		function in_array(what, arr) {
			for (var i = 0; i < arr.length; i += 1) {
				if (arr[i] === what) {
					return true;
				}
			}
			return false;
		}

		function unescape_string(s) {
			var esc = false,
				out = '',
				pos = 0,
				s_hex = '',
				escaped = 0,
				c;

			while (esc || pos < s.length) {

				c = s.charAt(pos);
				pos++;

				if (esc) {
					esc = false;
					if (c === 'x') {
						// simple hex-escape \x24
						s_hex = s.substr(pos, 2);
						pos += 2;
					} else if (c === 'u') {
						// unicode-escape, \u2134
						s_hex = s.substr(pos, 4);
						pos += 4;
					} else {
						// some common escape, e.g \n
						out += '\\' + c;
						continue;
					}
					if (!s_hex.match(/^[0123456789abcdefABCDEF]+$/)) {
						// some weird escaping, bail out,
						// leaving whole string intact
						return s;
					}

					escaped = parseInt(s_hex, 16);

					if (escaped >= 0x00 && escaped < 0x20) {
						// leave 0x00...0x1f escaped
						if (c === 'x') {
							out += '\\x' + s_hex;
						} else {
							out += '\\u' + s_hex;
						}
						continue;
					} else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
						// single-quote, apostrophe, backslash - escape these
						out += '\\' + String.fromCharCode(escaped);
					} else if (c === 'x' && escaped > 0x7e && escaped <= 0xff) {
						// we bail out on \x7f..\xff,
						// leaving whole string escaped,
						// as it's probably completely binary
						return s;
					} else {
						out += String.fromCharCode(escaped);
					}
				} else if (c === '\\') {
					esc = true;
				} else {
					out += c;
				}
			}
			return out;
		}

		function is_next(find) {
			var local_pos = parser_pos;
			var c = input.charAt(local_pos);
			while (in_array(c, whitespace) && c !== find) {
				local_pos++;
				if (local_pos >= input_length) {
					return false;
				}
				c = input.charAt(local_pos);
			}
			return c === find;
		}

		function get_next_token() {
			var i, resulting_string;

			n_newlines = 0;

			if (parser_pos >= input_length) {
				return ['', 'TK_EOF'];
			}

			input_wanted_newline = false;
			whitespace_before_token = [];

			var c = input.charAt(parser_pos);
			parser_pos += 1;

			while (in_array(c, whitespace)) {

				if (c === '\n') {
					n_newlines += 1;
					whitespace_before_token = [];
				} else if (n_newlines) {
					if (c === indent_string) {
						whitespace_before_token.push(indent_string);
					} else if (c !== '\r') {
						whitespace_before_token.push(' ');
					}
				}

				if (parser_pos >= input_length) {
					return ['', 'TK_EOF'];
				}

				c = input.charAt(parser_pos);
				parser_pos += 1;
			}

			if (in_array(c, wordchar)) {
				if (parser_pos < input_length) {
					while (in_array(input.charAt(parser_pos), wordchar)) {
						c += input.charAt(parser_pos);
						parser_pos += 1;
						if (parser_pos === input_length) {
							break;
						}
					}
				}

				// small and surprisingly unugly hack for 1E-10 representation
				if (parser_pos !== input_length && c.match(/^[0-9]+[Ee]$/) && (input.charAt(parser_pos) === '-' || input.charAt(parser_pos) === '+')) {

					var sign = input.charAt(parser_pos);
					parser_pos += 1;

					var t = get_next_token();
					c += sign + t[0];
					return [c, 'TK_WORD'];
				}

				if (c === 'in') { // hack for 'in' operator
					return [c, 'TK_OPERATOR'];
				}
				return [c, 'TK_WORD'];
			}

			if (c === '(' || c === '[') {
				return [c, 'TK_START_EXPR'];
			}

			if (c === ')' || c === ']') {
				return [c, 'TK_END_EXPR'];
			}

			if (c === '{') {
				return [c, 'TK_START_BLOCK'];
			}

			if (c === '}') {
				return [c, 'TK_END_BLOCK'];
			}

			if (c === ';') {
				return [c, 'TK_SEMICOLON'];
			}

			if (c === '/') {
				var comment = '';
				// peek for comment /* ... */
				var inline_comment = true;
				if (input.charAt(parser_pos) === '*') {
					parser_pos += 1;
					if (parser_pos < input_length) {
						while (parser_pos < input_length && !(input.charAt(parser_pos) === '*' && input.charAt(parser_pos + 1) && input.charAt(parser_pos + 1) === '/')) {
							c = input.charAt(parser_pos);
							comment += c;
							if (c === "\n" || c === "\r") {
								inline_comment = false;
							}
							parser_pos += 1;
							if (parser_pos >= input_length) {
								break;
							}
						}
					}
					parser_pos += 2;
					if (inline_comment && n_newlines === 0) {
						return ['/*' + comment + '*/', 'TK_INLINE_COMMENT'];
					} else {
						return ['/*' + comment + '*/', 'TK_BLOCK_COMMENT'];
					}
				}
				// peek for comment // ...
				if (input.charAt(parser_pos) === '/') {
					comment = c;
					while (input.charAt(parser_pos) !== '\r' && input.charAt(parser_pos) !== '\n') {
						comment += input.charAt(parser_pos);
						parser_pos += 1;
						if (parser_pos >= input_length) {
							break;
						}
					}
					return [comment, 'TK_COMMENT'];
				}

			}


			if (c === "'" || c === '"' || // string
				(
					(c === '/') || // regexp
					(opt.e4x && c === "<" && input.slice(parser_pos - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])\s*([-a-zA-Z:0-9_.]+=('[^']*'|"[^"]*"|{[^{}]*})\s*)*\/?\s*>/)) // xml
				) && ( // regex and xml can only appear in specific locations during parsing
					(last_type === 'TK_WORD' && is_special_word(flags.last_text)) ||
					(last_type === 'TK_END_EXPR' && in_array(previous_flags.mode, [MODE.Conditional, MODE.ForInitializer])) ||
					(in_array(last_type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK',
						'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA'
					]))
				)) {

				var sep = c,
					esc = false,
					has_char_escapes = false;

				resulting_string = c;

				if (parser_pos < input_length) {
					if (sep === '/') {
						//
						// handle regexp
						//
						var in_char_class = false;
						while (esc || in_char_class || input.charAt(parser_pos) !== sep) {
							resulting_string += input.charAt(parser_pos);
							if (!esc) {
								esc = input.charAt(parser_pos) === '\\';
								if (input.charAt(parser_pos) === '[') {
									in_char_class = true;
								} else if (input.charAt(parser_pos) === ']') {
									in_char_class = false;
								}
							} else {
								esc = false;
							}
							parser_pos += 1;
							if (parser_pos >= input_length) {
								// incomplete string/rexp when end-of-file reached.
								// bail out with what had been received so far.
								return [resulting_string, 'TK_STRING'];
							}
						}
					} else if (opt.e4x && sep === '<') {
						//
						// handle e4x xml literals
						//
						var xmlRegExp = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])\s*([-a-zA-Z:0-9_.]+=('[^']*'|"[^"]*"|{[^{}]*})\s*)*(\/?)\s*>/g;
						var xmlStr = input.slice(parser_pos - 1);
						var match = xmlRegExp.exec(xmlStr);
						if (match && match.index === 0) {
							var rootTag = match[2];
							var depth = 0;
							while (match) {
								var isEndTag = !! match[1];
								var tagName = match[2];
								var isSingletonTag = ( !! match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
								if (tagName === rootTag && !isSingletonTag) {
									if (isEndTag) {
										--depth;
									} else {
										++depth;
									}
								}
								if (depth <= 0) {
									break;
								}
								match = xmlRegExp.exec(xmlStr);
							}
							var xmlLength = match ? match.index + match[0].length : xmlStr.length;
							parser_pos += xmlLength - 1;
							return [xmlStr.slice(0, xmlLength), "TK_STRING"];
						}
					} else {
						//
						// handle string
						//
						while (esc || input.charAt(parser_pos) !== sep) {
							resulting_string += input.charAt(parser_pos);
							if (esc) {
								if (input.charAt(parser_pos) === 'x' || input.charAt(parser_pos) === 'u') {
									has_char_escapes = true;
								}
								esc = false;
							} else {
								esc = input.charAt(parser_pos) === '\\';
							}
							parser_pos += 1;
							if (parser_pos >= input_length) {
								// incomplete string/rexp when end-of-file reached.
								// bail out with what had been received so far.
								return [resulting_string, 'TK_STRING'];
							}
						}

					}
				}

				parser_pos += 1;
				resulting_string += sep;

				if (has_char_escapes && opt.unescape_strings) {
					resulting_string = unescape_string(resulting_string);
				}

				if (sep === '/') {
					// regexps may have modifiers /regexp/MOD , so fetch those, too
					while (parser_pos < input_length && in_array(input.charAt(parser_pos), wordchar)) {
						resulting_string += input.charAt(parser_pos);
						parser_pos += 1;
					}
				}
				return [resulting_string, 'TK_STRING'];
			}

			if (c === '#') {


				if (output_lines.length === 1 && output_lines[0].text.length === 0 &&
					input.charAt(parser_pos) === '!') {
					// shebang
					resulting_string = c;
					while (parser_pos < input_length && c !== '\n') {
						c = input.charAt(parser_pos);
						resulting_string += c;
						parser_pos += 1;
					}
					return [trim(resulting_string) + '\n', 'TK_UNKNOWN'];
				}



				// Spidermonkey-specific sharp variables for circular references
				// https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
				// http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
				var sharp = '#';
				if (parser_pos < input_length && in_array(input.charAt(parser_pos), digits)) {
					do {
						c = input.charAt(parser_pos);
						sharp += c;
						parser_pos += 1;
					} while (parser_pos < input_length && c !== '#' && c !== '=');
					if (c === '#') {
						//
					} else if (input.charAt(parser_pos) === '[' && input.charAt(parser_pos + 1) === ']') {
						sharp += '[]';
						parser_pos += 2;
					} else if (input.charAt(parser_pos) === '{' && input.charAt(parser_pos + 1) === '}') {
						sharp += '{}';
						parser_pos += 2;
					}
					return [sharp, 'TK_WORD'];
				}
			}

			if (c === '<' && input.substring(parser_pos - 1, parser_pos + 3) === '<!--') {
				parser_pos += 3;
				c = '<!--';
				while (input.charAt(parser_pos) !== '\n' && parser_pos < input_length) {
					c += input.charAt(parser_pos);
					parser_pos++;
				}
				flags.in_html_comment = true;
				return [c, 'TK_COMMENT'];
			}

			if (c === '-' && flags.in_html_comment && input.substring(parser_pos - 1, parser_pos + 2) === '-->') {
				flags.in_html_comment = false;
				parser_pos += 2;
				return ['-->', 'TK_COMMENT'];
			}

			if (c === '.') {
				return [c, 'TK_DOT'];
			}

			if (in_array(c, punct)) {
				while (parser_pos < input_length && in_array(c + input.charAt(parser_pos), punct)) {
					c += input.charAt(parser_pos);
					parser_pos += 1;
					if (parser_pos >= input_length) {
						break;
					}
				}

				if (c === ',') {
					return [c, 'TK_COMMA'];
				} else if (c === '=') {
					return [c, 'TK_EQUALS'];
				} else {
					return [c, 'TK_OPERATOR'];
				}
			}

			return [c, 'TK_UNKNOWN'];
		}

		function handle_start_expr() {
			if (start_of_statement()) {
				// The conditional starts the statement if appropriate.
			}

			var next_mode = MODE.Expression;
			if (token_text === '[') {

				if (last_type === 'TK_WORD' || flags.last_text === ')') {
					// this is array index specifier, break immediately
					// a[x], fn()[x]
					if (in_array(flags.last_text, line_starters)) {
						output_space_before_token = true;
					}
					set_mode(next_mode);
					print_token();
					indent();
					if (opt.space_in_paren) {
						output_space_before_token = true;
					}
					return;
				}

				next_mode = MODE.ArrayLiteral;
				if (is_array(flags.mode)) {
					if (flags.last_text === '[' ||
						(flags.last_text === ',' && (last_last_text === ']' || last_last_text === '}'))) {
						// ], [ goes to new line
						// }, [ goes to new line
						if (!opt.keep_array_indentation) {
							print_newline();
						}
					}
				}

			} else {
				if (flags.last_text === 'for') {
					next_mode = MODE.ForInitializer;
				} else if (in_array(flags.last_text, ['if', 'while'])) {
					next_mode = MODE.Conditional;
				} else {
					// next_mode = MODE.Expression;
				}
			}

			if (flags.last_text === ';' || last_type === 'TK_START_BLOCK') {
				print_newline();
			} else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || flags.last_text === '.') {
				// TODO: Consider whether forcing this is required.  Review failing tests when removed.
				allow_wrap_or_preserved_newline(input_wanted_newline);
				output_wrapped = false;
				// do nothing on (( and )( and ][ and ]( and .(
			} else if (last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
				output_space_before_token = true;
			} else if (flags.last_word === 'function' || flags.last_word === 'typeof') {
				// function() vs function ()
				if (opt.jslint_happy) {
					output_space_before_token = true;
				}
			} else if (in_array(flags.last_text, line_starters) || flags.last_text === 'catch') {
				if (opt.space_before_conditional) {
					output_space_before_token = true;
				}
			}

			// Support of this kind of newline preservation.
			// a = (b &&
			//     (c || d));
			if (token_text === '(') {
				if (last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
					if (!start_of_object_property()) {
						allow_wrap_or_preserved_newline();
					}
				}
			}

			set_mode(next_mode);
			print_token();
			if (opt.space_in_paren) {
				output_space_before_token = true;
			}

			// In all cases, if we newline while inside an expression it should be indented.
			indent();
		}

		function handle_end_expr() {
			// statements inside expressions are not valid syntax, but...
			// statements must all be closed when their container closes
			while (flags.mode === MODE.Statement) {
				restore_mode();
			}

			if (token_text === ']' && is_array(flags.mode) && flags.multiline_frame && !opt.keep_array_indentation) {
				print_newline();
			}

			if (flags.multiline_frame) {
				allow_wrap_or_preserved_newline();
			}
			if (opt.space_in_paren) {
				if (last_type === 'TK_START_EXPR') {
					// () [] no inner space in empty parens like these, ever, ref #320
					trim_output();
					output_space_before_token = false;
				} else {
					output_space_before_token = true;
				}
			}
			if (token_text === ']' && opt.keep_array_indentation) {
				print_token();
				restore_mode();
			} else {
				restore_mode();
				print_token();
			}
			remove_redundant_indentation(previous_flags);

			// do {} while () // no statement required after
			if (flags.do_while && previous_flags.mode === MODE.Conditional) {
				previous_flags.mode = MODE.Expression;
				flags.do_block = false;
				flags.do_while = false;

			}
		}

		function handle_start_block() {
			set_mode(MODE.BlockStatement);

			var empty_braces = is_next('}');
			var empty_anonymous_function = empty_braces && flags.last_word === 'function' &&
				last_type === 'TK_END_EXPR';

			if (opt.brace_style === "expand") {
				if (last_type !== 'TK_OPERATOR' &&
					(empty_anonymous_function ||
						last_type === 'TK_EQUALS' ||
						(is_special_word(flags.last_text) && flags.last_text !== 'else'))) {
					output_space_before_token = true;
				} else {
					print_newline();
				}
			} else { // collapse
				if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
					if (last_type === 'TK_START_BLOCK') {
						print_newline();
					} else {
						output_space_before_token = true;
					}
				} else {
					// if TK_OPERATOR or TK_START_EXPR
					if (is_array(previous_flags.mode) && flags.last_text === ',') {
						if (last_last_text === '}') {
							// }, { in array context
							output_space_before_token = true;
						} else {
							print_newline(); // [a, b, c, {
						}
					}
				}
			}
			print_token();
			indent();
		}

		function handle_end_block() {
			// statements must all be closed when their container closes
			while (flags.mode === MODE.Statement) {
				restore_mode();
			}
			var empty_braces = last_type === 'TK_START_BLOCK';

			if (opt.brace_style === "expand") {
				if (!empty_braces) {
					print_newline();
				}
			} else {
				// skip {}
				if (!empty_braces) {
					if (is_array(flags.mode) && opt.keep_array_indentation) {
						// we REALLY need a newline here, but newliner would skip that
						opt.keep_array_indentation = false;
						print_newline();
						opt.keep_array_indentation = true;

					} else {
						print_newline();
					}
				}
			}
			restore_mode();
			print_token();
		}

		function handle_word() {
			if (start_of_statement()) {
				// The conditional starts the statement if appropriate.
			} else if (input_wanted_newline && !is_expression(flags.mode) &&
				(last_type !== 'TK_OPERATOR' || (flags.last_text === '--' || flags.last_text === '++')) &&
				last_type !== 'TK_EQUALS' &&
				(opt.preserve_newlines || flags.last_text !== 'var')) {

				print_newline();
			}

			if (flags.do_block && !flags.do_while) {
				if (token_text === 'while') {
					// do {} ## while ()
					output_space_before_token = true;
					print_token();
					output_space_before_token = true;
					flags.do_while = true;
					return;
				} else {
					// do {} should always have while as the next word.
					// if we don't see the expected while, recover
					print_newline();
					flags.do_block = false;
				}
			}

			// if may be followed by else, or not
			// Bare/inline ifs are tricky
			// Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
			if (flags.if_block) {
				if (token_text !== 'else') {
					while (flags.mode === MODE.Statement) {
						restore_mode();
					}
					flags.if_block = false;
				}
			}

			if (token_text === 'case' || (token_text === 'default' && flags.in_case_statement)) {
				print_newline();
				if (flags.case_body || opt.jslint_happy) {
					// switch cases following one another
					deindent();
					flags.case_body = false;
				}
				print_token();
				flags.in_case = true;
				flags.in_case_statement = true;
				return;
			}

			if (token_text === 'function') {
				if (flags.var_line && last_type !== 'TK_EQUALS') {
					flags.var_line_reindented = true;
				}
				if (in_array(flags.last_text, ['}', ';']) || (just_added_newline() && ! in_array(flags.last_text, ['{', ':', '=', ',']))) {
					// make sure there is a nice clean space of at least one blank line
					// before a new function definition
					if ( ! just_added_blankline() && ! flags.had_comment) {
						print_newline();
						print_newline(true);
					}
				}
				if (last_type === 'TK_WORD') {
					if (flags.last_text === 'get' || flags.last_text === 'set' || flags.last_text === 'new' || flags.last_text === 'return') {
						output_space_before_token = true;
					} else {
						print_newline();
					}
				} else if (last_type === 'TK_OPERATOR' || flags.last_text === '=') {
					// foo = function
					output_space_before_token = true;
				} else if (is_expression(flags.mode)) {
					// (function
				} else {
					print_newline();
				}
			}

			if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
				if (!start_of_object_property()) {
					allow_wrap_or_preserved_newline();
				}
			}

			if (token_text === 'function') {
				print_token();
				flags.last_word = token_text;
				return;
			}

			prefix = 'NONE';

			if (last_type === 'TK_END_BLOCK') {
				if (!in_array(token_text, ['else', 'catch', 'finally'])) {
					prefix = 'NEWLINE';
				} else {
					if (opt.brace_style === "expand" || opt.brace_style === "end-expand") {
						prefix = 'NEWLINE';
					} else {
						prefix = 'SPACE';
						output_space_before_token = true;
					}
				}
			} else if (last_type === 'TK_SEMICOLON' && flags.mode === MODE.BlockStatement) {
				// TODO: Should this be for STATEMENT as well?
				prefix = 'NEWLINE';
			} else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
				prefix = 'SPACE';
			} else if (last_type === 'TK_STRING') {
				prefix = 'NEWLINE';
			} else if (last_type === 'TK_WORD') {
				prefix = 'SPACE';
			} else if (last_type === 'TK_START_BLOCK') {
				prefix = 'NEWLINE';
			} else if (last_type === 'TK_END_EXPR') {
				output_space_before_token = true;
				prefix = 'NEWLINE';
			}

			if (in_array(token_text, line_starters) && flags.last_text !== ')') {
				if (flags.last_text === 'else') {
					prefix = 'SPACE';
				} else {
					prefix = 'NEWLINE';
				}

			}

			if (in_array(token_text, ['else', 'catch', 'finally'])) {
				if (last_type !== 'TK_END_BLOCK' || opt.brace_style === "expand" || opt.brace_style === "end-expand") {
					print_newline();
				} else {
					trim_output(true);
					var line = output_lines[output_lines.length - 1];
					// If we trimmed and there's something other than a close block before us
					// put a newline back in.  Handles '} // comment' scenario.
					if (line.text[line.text.length - 1] !== '}') {
						print_newline();
					}
					output_space_before_token = true;
				}
			} else if (prefix === 'NEWLINE') {
				if (is_special_word(flags.last_text)) {
					// no newline between 'return nnn'
					output_space_before_token = true;
				} else if (last_type !== 'TK_END_EXPR') {
					if ((last_type !== 'TK_START_EXPR' || token_text !== 'var') && flags.last_text !== ':') {
						// no need to force newline on 'var': for (var x = 0...)
						if (token_text === 'if' && flags.last_word === 'else' && flags.last_text !== '{') {
							// no newline for } else if {
							output_space_before_token = true;
						} else {
							flags.var_line = false;
							flags.var_line_reindented = false;
							print_newline();
						}
					}
				} else if (in_array(token_text, line_starters) && flags.last_text !== ')') {
					flags.var_line = false;
					flags.var_line_reindented = false;
					print_newline();
				}
			} else if (is_array(flags.mode) && flags.last_text === ',' && last_last_text === '}') {
				print_newline(); // }, in lists get a newline treatment
			} else if (prefix === 'SPACE') {
				output_space_before_token = true;
			}
			print_token();
			flags.last_word = token_text;

			if (token_text === 'var') {
				flags.var_line = true;
				flags.var_line_reindented = false;
				flags.var_line_tainted = false;
			}

			if (token_text === 'do') {
				flags.do_block = true;
			}

			if (token_text === 'if') {
				flags.if_block = true;
			}
		}

		function handle_semicolon() {
			if (start_of_statement()) {
				// The conditional starts the statement if appropriate.
				// Semicolon can be the start (and end) of a statement
				output_space_before_token = false;
			}
			while (flags.mode === MODE.Statement && !flags.if_block && !flags.do_block) {
				restore_mode();
			}
			print_token();
			flags.var_line = false;
			flags.var_line_reindented = false;
			if (flags.mode === MODE.ObjectLiteral) {
				// if we're in OBJECT mode and see a semicolon, its invalid syntax
				// recover back to treating this as a BLOCK
				flags.mode = MODE.BlockStatement;
			}
		}

		function handle_string() {
			if (start_of_statement()) {
				// The conditional starts the statement if appropriate.
				// One difference - strings want at least a space before
				output_space_before_token = true;
			} else if (last_type === 'TK_WORD') {
				output_space_before_token = true;
			} else if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
				if (!start_of_object_property()) {
					allow_wrap_or_preserved_newline();
				}
			} else {
				print_newline();
			}
			print_token();
		}

		function handle_equals() {
			if (flags.var_line) {
				// just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
				flags.var_line_tainted = true;
			}
			output_space_before_token = true;
			print_token();
			output_space_before_token = true;
		}

		function handle_comma() {
			if (flags.var_line) {
				if (is_expression(flags.mode) || last_type === 'TK_END_BLOCK') {
					// do not break on comma, for(var a = 1, b = 2)
					flags.var_line_tainted = false;
				}

				if (flags.var_line) {
					flags.var_line_reindented = true;
				}

				print_token();

				if (flags.var_line_tainted) {
					flags.var_line_tainted = false;
					print_newline();
				} else {
					output_space_before_token = true;
				}
				return;
			}

			if (last_type === 'TK_END_BLOCK' && flags.mode !== MODE.Expression) {
				print_token();
				if (flags.mode === MODE.ObjectLiteral && flags.last_text === '}') {
					print_newline();
				} else {
					output_space_before_token = true;
				}
			} else {
				if (flags.mode === MODE.ObjectLiteral) {
					print_token();
					print_newline();
				} else {
					// EXPR or DO_BLOCK
					print_token();
					output_space_before_token = true;
				}
			}
		}

		function handle_operator() {
			var space_before = true;
			var space_after = true;
			if (is_special_word(flags.last_text)) {
				// "return" had a special handling in TK_WORD. Now we need to return the favor
				output_space_before_token = true;
				print_token();
				return;
			}

			// hack for actionscript's import .*;
			if (token_text === '*' && last_type === 'TK_DOT' && !last_last_text.match(/^\d+$/)) {
				print_token();
				return;
			}

			if (token_text === ':' && flags.in_case) {
				flags.case_body = true;
				indent();
				print_token();
				print_newline();
				flags.in_case = false;
				return;
			}

			if (token_text === '::') {
				// no spaces around exotic namespacing syntax operator
				print_token();
				return;
			}

			// http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
			// if there is a newline between -- or ++ and anything else we should preserve it.
			if (input_wanted_newline && (token_text === '--' || token_text === '++')) {
				print_newline();
			}

			if (in_array(token_text, ['--', '++', '!']) || (in_array(token_text, ['-', '+']) && (in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) || in_array(flags.last_text, line_starters) || flags.last_text === ','))) {
				// unary operators (and binary +/- pretending to be unary) special cases

				space_before = false;
				space_after = false;

				if (flags.last_text === ';' && is_expression(flags.mode)) {
					// for (;; ++i)
					//        ^^^
					space_before = true;
				}

				if (last_type === 'TK_WORD' && in_array(flags.last_text, line_starters)) {
					space_before = true;
				}

				if ((flags.mode === MODE.BlockStatement || flags.mode === MODE.Statement) && (flags.last_text === '{' || flags.last_text === ';')) {
					// { foo; --i }
					// foo(); --bar;
					print_newline();
				}
			} else if (token_text === ':') {
				if (flags.ternary_depth === 0) {
					if (flags.mode === MODE.BlockStatement) {
						flags.mode = MODE.ObjectLiteral;
					}
					space_before = false;
				} else {
					flags.ternary_depth -= 1;
				}
			} else if (token_text === '?') {
				flags.ternary_depth += 1;
			}
			output_space_before_token = output_space_before_token || space_before;
			print_token();
			output_space_before_token = space_after;
		}

		function handle_block_comment() {
			var lines = split_newlines(token_text);
			var j; // iterator for this case
			var javadoc = false;

			// block comment starts with a new line
			print_newline(false, true);
			if (lines.length > 1) {
				if (all_lines_start_with(lines.slice(1), '*')) {
					javadoc = true;
				}
			}

			// first line always indented
			print_token(lines[0]);
			for (j = 1; j < lines.length; j++) {
				print_newline(false, true);
				if (javadoc) {
					// javadoc: reformat and re-indent
					print_token(' ' + trim(lines[j]));
				} else {
					// normal comments output raw
					output_lines[output_lines.length - 1].text.push(lines[j]);
				}
			}

			// for comments of more than one line, make sure there's a new line after
			print_newline(false, true);
		}

		function handle_inline_comment() {
			output_space_before_token = true;
			print_token();
			output_space_before_token = true;
		}

		function handle_comment() {
			if (input_wanted_newline) {
				print_newline(false, true);
			} else {
				trim_output(true);
			}

			output_space_before_token = true;
			print_token();
			print_newline(false, true);
		}

		function handle_dot() {
			if (is_special_word(flags.last_text)) {
				output_space_before_token = true;
			} else {
				// allow preserved newlines before dots in general
				// force newlines on dots after close paren when break_chained - for bar().baz()
				allow_wrap_or_preserved_newline(flags.last_text === ')' && opt.break_chained_methods);
			}

			print_token();
		}

		function handle_unknown() {
			print_token();

			if (token_text[token_text.length - 1] === '\n') {
				print_newline();
			}
		}
	}
};