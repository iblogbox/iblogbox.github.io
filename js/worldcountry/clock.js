var ischrome=false;
var isgecko=false;
var isopera=false;
var ismsie=false;
var iswebkit=false;

if (navigator.appName=="Netscape"){
	if (navigator.userAgent.indexOf("Chrome")>=0) ischrome=true;
	if (navigator.userAgent.indexOf("WebKit")>=0) iswebkit=true;
	if (navigator.userAgent.indexOf("Gecko")>=0) isgecko=true;
} else {
	if (navigator.userAgent.indexOf("Opera")>=0) isopera=true;
	if (navigator.userAgent.indexOf("MSIE")>=0) ismsie=true;
}

var g_city={"2":{"city":"Abu Dhabi","state":"Abu Dhabi","tz":"+4","country":"United Arab Emirates"},"3":{"city":"Acapulco","state":"Guerrero","tz":"-6","DST":["04/03/02/00","10/30/02/00"],"country":"Mexico"},"4":{"city":"Accra","tz":"+0","country":"Ghana"},"5":{"city":"Adelaide","state":"South Australia","tz":"+9.5","DST":["10/02/02/00","04/03/03/00"],"country":"Australia"},"6":{"city":"Aden","tz":"+3","country":"Yemen"},"7":{"city":"Addis Ababa","tz":"+3","country":"Ethiopia"},"8":{"city":"Doha","tz":"+3","country":"Qatar"},"9":{"city":"Aguascalientes","state":"Aguascalientes","tz":"-6","DST":["04/03/02/00","10/30/02/00"],"country":"Mexico"},"11":{"city":"Amman","DST":["04/01/00/00","10/28/01/00"],"tz":"+2","country":"Jordan"},"12":{"city":"Albany","state":"NY","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"13":{"city":"Adak","state":"AK","tz":"-10","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"14":{"city":"Algiers","tz":"+1","country":"Algeria"},"15":{"city":"Manama","tz":"+3","country":"Bahrain"},"16":{"city":"Amsterdam","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Netherlands"},"17":{"city":"Anadyr","DST":[-1,-1],"tz":"+11","country":"Russian Federation"},"18":{"city":"Anchorage","state":"AK","tz":"-9","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"19":{"city":"Ankara","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Turkey"},"20":{"city":"Antananarivo","tz":"+3","country":"Madagascar"},"21":{"city":"Asuncion","DST":["10/02/00/00","03/27/00/00"],"tz":"-4","country":"Paraguay"},"22":{"city":"Auckland","DST":["09/25/02/00","04/03/03/00"],"tz":"+12","country":"New Zealand"},"23":{"city":"Augusta","state":"ME","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"24":{"city":"Austin","state":"TX","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"25":{"city":"Atlanta","state":"GA","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"26":{"city":"Athens","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Greece"},"27":{"city":"Baghdad","tz":"+3","country":"Iraq"},"28":{"city":"Bangkok","tz":"+7","country":"Thailand"},"29":{"city":"Bamako","tz":"+0","country":"Mali"},"30":{"city":"Banjul","tz":"+0","country":"Gambia"},"31":{"city":"Barcelona","state":"Barcelona","tz":"+1","DST":["03/27/02/00","10/30/03/00"],"country":"Spain"},"32":{"city":"Baton Rouge","state":"LA","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"33":{"city":"Beijing","tz":"+8","country":"China"},"34":{"city":"Beirut","DST":["03/27/00/00","10/30/00/00"],"tz":"+2","country":"Lebanon"},"35":{"city":"Belgrade","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Serbia"},"36":{"city":"Belmopan","tz":"-6","country":"Belize"},"37":{"city":"Berlin","state":"Berlin","tz":"+1","DST":["03/27/02/00","10/30/03/00"],"country":"Germany"},"38":{"city":"Hamilton","DST":["03/13/02/00","11/06/02/00"],"tz":"-4","country":"Bermuda Islands"},"39":{"city":"Bismarck","state":"ND","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"40":{"city":"Bissau","tz":"+0","country":"Guinea Bissau"},"41":{"city":"Bogota","tz":"-5","country":"Colombia"},"42":{"city":"Boise","state":"ID","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"43":{"city":"Boston","state":"MA","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"44":{"city":"Mumbai","state":"Maharashtra","tz":"+5.5","country":"India"},"45":{"city":"Brasilia","state":"Distrito Federal","tz":"-3","DST":["10/16/00/00","02/21/00/00"],"country":"Brazil"},"46":{"city":"Bridgetown","tz":"-4","country":"Barbados"},"47":{"city":"Brisbane","state":"Queensland","tz":"+10","country":"Australia"},"48":{"city":"Brussels","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Belgium"},"49":{"city":"Bucharest","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Romania"},"50":{"city":"Budapest","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Hungary"},"51":{"city":"Buenos Aires","tz":"-3","country":"Argentina"},"52":{"city":"Bujumbura","tz":"+2","country":"Burundi"},"53":{"city":"Cairo","DST":[-1,-1],"tz":"+2","country":"Egypt"},"54":{"city":"Kolkata","state":"West Bengal","tz":"+5.5","country":"India"},"55":{"city":"Calgary","state":"Alberta","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"56":{"city":"Cape Town","tz":"+2","country":"South Africa"},"57":{"city":"Canberra","state":"Australian Capital Territory","tz":"+10","DST":["10/02/02/00","04/03/03/00"],"country":"Australia"},"58":{"city":"Caracas","tz":"-4.5","country":"Venezuela"},"59":{"city":"Carson City","state":"NV","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"60":{"city":"Casablanca","tz":"+0","country":"Morocco"},"61":{"city":"Cayenne","tz":"-3","country":"French Guiana"},"62":{"city":"Charleston","state":"WV","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"63":{"city":"Chatham Islands","DST":["09/25/02/45","04/03/03/45"],"tz":"+12.75","country":"New Zealand"},"64":{"city":"Chicago","state":"IL","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"65":{"city":"Chihuahua","state":"Chihuahua","tz":"-7","DST":["04/03/02/00","10/30/02/00"],"country":"Mexico"},"66":{"city":"Columbia","state":"SC","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"67":{"city":"Conakry","tz":"+0","country":"Guinea"},"68":{"city":"Concord","state":"NH","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"69":{"city":"Copenhagen","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Denmark"},"70":{"city":"Dallas","state":"TX","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"71":{"city":"Dar es Salaam","tz":"+3","country":"Tanzania"},"72":{"city":"Darwin","state":"Northern Territory","tz":"+9.5","country":"Australia"},"73":{"city":"Dhaka","tz":"+6","country":"Bangladesh"},"74":{"city":"Dakar","tz":"+0","country":"Senegal"},"75":{"city":"Denver","state":"CO","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"76":{"city":"Des Moines","state":"IA","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"77":{"city":"Detroit","state":"MI","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"78":{"city":"Dublin","DST":["03/27/01/00","10/30/02/00"],"tz":"+0","country":"Ireland"},"79":{"city":"Düsseldorf","state":"North Rhine-Westphalia","tz":"+1","DST":["03/27/02/00","10/30/03/00"],"country":"Germany"},"80":{"city":"Edmonton","state":"Alberta","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"81":{"city":"Fairbanks","state":"AK","tz":"-9","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"82":{"city":"Suva","DST":["11/06/02/00","01/17/03/00"],"tz":"+12","country":"Fiji"},"83":{"city":"Frankfurt","state":"Hesse","tz":"+1","DST":["03/27/02/00","10/30/03/00"],"country":"Germany"},"84":{"city":"Frankfort","state":"KY","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"85":{"city":"Freetown","tz":"+0","country":"Sierra Leone"},"86":{"city":"Gaborone","tz":"+2","country":"Botswana"},"87":{"city":"Geneva","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Switzerland"},"88":{"city":"Georgetown","tz":"-4","country":"Guyana"},"89":{"city":"Gibraltar","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Gibraltar"},"90":{"city":"Glasgow","state":"Scotland","tz":"+0","DST":["03/27/01/00","10/30/02/00"],"country":"United Kingdom"},"91":{"city":"Guam","tz":"+10","country":"Guam"},"92":{"city":"Guadalajara","state":"Jalisco","tz":"-6","DST":["04/03/02/00","10/30/02/00"],"country":"Mexico"},"93":{"city":"Guayaquil","tz":"-5","country":"Ecuador"},"94":{"city":"Guatemala","tz":"-6","country":"Guatemala"},"95":{"city":"Hanoi","tz":"+7","country":"Vietnam"},"96":{"city":"Harare","tz":"+2","country":"Zimbabwe"},"97":{"city":"Harrisburg","state":"PA","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"98":{"city":"Hartford","state":"CT","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"99":{"city":"Havana","DST":["03/13/00/00","11/06/01/00"],"tz":"-5","country":"Cuba"},"100":{"city":"Helena","state":"MT","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"101":{"city":"Helsinki","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Finland"},"102":{"city":"Hong Kong","tz":"+8","country":"Hong Kong"},"103":{"city":"Honolulu","state":"HI","tz":"-10","country":"United States"},"104":{"city":"Houston","state":"TX","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"105":{"city":"Indianapolis","state":"IN","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"106":{"city":"Islamabad","tz":"+5","country":"Pakistan"},"107":{"city":"Istanbul","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Turkey"},"108":{"city":"Jakarta","state":"Java","tz":"+7","country":"Indonesia"},"109":{"city":"Jefferson City","state":"MO","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"110":{"city":"Jerusalem","DST":["03/25/02/00","10/30/02/00"],"tz":"+2","country":"Israel"},"111":{"city":"Johannesburg","tz":"+2","country":"South Africa"},"112":{"city":"Juneau","state":"AK","tz":"-9","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"113":{"city":"Kabul","tz":"+4.5","country":"Afghanistan"},"114":{"city":"Petropavlovsk-Kamchatsky","DST":[-1,-1],"tz":"+12","country":"Russian Federation"},"115":{"city":"Kampala","tz":"+3","country":"Uganda"},"116":{"city":"Kano Nigeria","tz":"+1","country":"Nigeria"},"117":{"city":"Kathmandu","tz":"+5.75","country":"Nepal"},"118":{"city":"Khartoum","tz":"+3","country":"Sudan"},"119":{"city":"Kigali","tz":"+2","country":"Rwanda"},"120":{"city":"Kingston","tz":"-5","country":"Jamaica"},"121":{"city":"Kinshasa","tz":"+1","country":"Democratic Republic of the Congo"},"122":{"city":"Kuala Lumpur","tz":"+8","country":"Malaysia"},"123":{"city":"Kuwait City","tz":"+3","country":"Kuwait"},"124":{"city":"La Paz","tz":"-4","country":"Bolivia"},"125":{"city":"Lagos","tz":"+1","country":"Nigeria"},"127":{"city":"Las Vegas","state":"NV","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"128":{"city":"Leon","state":"Guanajuato","tz":"-6","DST":["04/03/02/00","10/30/02/00"],"country":"Mexico"},"129":{"city":"Libreville","tz":"+1","country":"Gabon"},"130":{"city":"Lilongwe","tz":"+2","country":"Malawi"},"131":{"city":"Lima","state":"Lima","tz":"-5","country":"Peru"},"132":{"city":"Lincoln","state":"NE","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"133":{"city":"Lisbon","DST":["03/27/01/00","10/30/02/00"],"tz":"+0","country":"Portugal"},"134":{"city":"Little Rock","state":"AR","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"135":{"city":"Lome","tz":"+0","country":"Togo"},"136":{"city":"London","state":"England","tz":"+0","DST":["03/27/01/00","10/30/02/00"],"country":"United Kingdom"},"137":{"city":"Los Angeles","state":"CA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"138":{"city":"Luanda","tz":"+1","country":"Angola"},"139":{"city":"Lubumbashi","tz":"+2","country":"Democratic Republic of the Congo"},"140":{"city":"Lusaka","tz":"+2","country":"Zambia"},"141":{"city":"Madrid","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Spain"},"142":{"city":"Madison","state":"WI","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"143":{"city":"Managua","tz":"-6","country":"Nicaragua"},"144":{"city":"Manaus","state":"Amazonas","tz":"-4","country":"Brazil"},"145":{"city":"Manila","tz":"+8","country":"Philippines"},"146":{"city":"Maputo","tz":"+2","country":"Mozambique"},"147":{"city":"Maseru","tz":"+2","country":"Lesotho"},"148":{"city":"Mazatlan","state":"Sinaloa","tz":"-7","DST":["04/03/02/00","10/30/02/00"],"country":"Mexico"},"149":{"city":"Mbabane","tz":"+2","country":"Swaziland"},"150":{"city":"Medellin","tz":"-5","country":"Colombia"},"151":{"city":"Makkah","tz":"+3","country":"Saudi Arabia"},"152":{"city":"Melbourne","state":"Victoria","tz":"+10","DST":["10/02/02/00","04/03/03/00"],"country":"Australia"},"153":{"city":"Merida","state":"Yucatán","tz":"-6","DST":["04/03/02/00","10/30/02/00"],"country":"Mexico"},"154":{"city":"Mexicali","state":"Baja California","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"Mexico"},"155":{"city":"Mexico City","state":"Federal District","tz":"-6","DST":["04/03/02/00","10/30/02/00"],"country":"Mexico"},"156":{"city":"Miami","state":"FL","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"157":{"city":"Milan","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Italy"},"158":{"city":"Milwaukee","state":"WI","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"159":{"city":"Minneapolis","state":"MN","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"160":{"city":"Mogadishu","tz":"+3","country":"Somalia"},"161":{"city":"Monrovia","tz":"+0","country":"Liberia"},"162":{"city":"Monterrey","state":"Nuevo León","tz":"-6","DST":["04/03/02/00","10/30/02/00"],"country":"Mexico"},"163":{"city":"Montevideo","DST":[-1,-1],"tz":"-3","country":"Uruguay"},"164":{"city":"Montpelier","state":"VT","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"165":{"city":"Montreal","state":"Quebec","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"166":{"city":"Moscow","DST":[-1,-1],"tz":"+3","country":"Russian Federation"},"167":{"city":"Murmansk","DST":[-1,-1],"tz":"+3","country":"Russian Federation"},"168":{"city":"Munich","state":"Bavaria","tz":"+1","DST":["03/27/02/00","10/30/03/00"],"country":"Germany"},"169":{"city":"Muscat","tz":"+4","country":"Oman"},"170":{"city":"Nairobi","tz":"+3","country":"Kenya"},"171":{"city":"Nashville","state":"TN","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"172":{"city":"Naples","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Italy"},"173":{"city":"Nassau","DST":["03/13/02/00","11/06/02/00"],"tz":"-5","country":"Bahamas"},"174":{"city":"Ndjamena","tz":"+1","country":"Chad"},"175":{"city":"St. John's","state":"Newfoundland and Labrador","tz":"-3.5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"176":{"city":"New Delhi","state":"Delhi","tz":"+5.5","country":"India"},"177":{"city":"Chisinau","DST":["03/27/02/00","10/30/03/00"],"tz":"+2","country":"Moldova"},"178":{"city":"New Orleans","state":"LA","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"179":{"city":"New York","state":"NY","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"180":{"city":"Niamey","tz":"+1","country":"Niger"},"181":{"city":"Nice","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"France"},"182":{"city":"Nome","state":"AK","tz":"-9","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"183":{"city":"Nouakchott","tz":"+0","country":"Mauritania"},"184":{"city":"Oklahoma City","state":"OK","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"186":{"city":"Ouagadougou","tz":"+0","country":"Burkina Faso"},"187":{"city":"Oslo","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Norway"},"188":{"city":"Ottawa","state":"Ontario","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"189":{"city":"Québec","state":"Quebec","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"190":{"city":"Quito","tz":"-5","country":"Ecuador"},"191":{"city":"Palma","state":"Majorca","tz":"+1","DST":["03/27/02/00","10/30/03/00"],"country":"Spain"},"192":{"city":"Panama","tz":"-5","country":"Panama"},"193":{"city":"Port Moresby","tz":"+10","country":"Papua New Guinea"},"194":{"city":"Paramaribo","tz":"-3","country":"Suriname"},"195":{"city":"Paris","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"France"},"196":{"city":"Perth","state":"Western Australia","tz":"+8","country":"Australia"},"197":{"city":"Phoenix","state":"AZ","tz":"-7","country":"United States"},"198":{"city":"Philadelphia","state":"PA","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"199":{"city":"Phnom Penh","tz":"+7","country":"Cambodia"},"200":{"city":"Pierre","state":"SD","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"201":{"city":"Port Louis","tz":"+4","country":"Mauritius"},"202":{"city":"Portland","state":"OR","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"203":{"city":"Porto Novo","tz":"+1","country":"Benin"},"204":{"city":"Prague","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Czech Republic"},"205":{"city":"Pyongyang","tz":"+8.5","country":"North Korea"},"206":{"city":"Rabat","tz":"+0","country":"Morocco"},"207":{"city":"Raleigh","state":"NC","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"208":{"city":"Yangon","tz":"+6.5","country":"Myanmar"},"209":{"city":"Recife","state":"Pernambuco","tz":"-3","country":"Brazil"},"210":{"city":"Regina","state":"Saskatchewan","tz":"-6","country":"Canada"},"211":{"city":"Reykjavik","tz":"+0","country":"Iceland"},"212":{"city":"Richmond","state":"VA","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"213":{"city":"Rio de Janeiro","state":"Rio de Janeiro","tz":"-3","DST":["10/16/00/00","02/21/00/00"],"country":"Brazil"},"214":{"city":"Riyadh","tz":"+3","country":"Saudi Arabia"},"215":{"city":"Rome","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Italy"},"217":{"city":"Sacramento","state":"CA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"218":{"city":"Ho Chi Minh","tz":"+7","country":"Vietnam"},"219":{"city":"St. Paul","state":"MN","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"220":{"city":"Salt Lake City","state":"UT","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"221":{"city":"Salem","state":"OR","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"222":{"city":"Salvador","state":"Bahia","tz":"-3","country":"Brazil"},"223":{"city":"Salzburg","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Austria"},"224":{"city":"San Francisco","state":"CA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"225":{"city":"San Jose","tz":"-6","country":"Costa Rica"},"226":{"city":"San Juan","tz":"-4","country":"Puerto Rico"},"227":{"city":"San Luis Potosi","state":"San Luis Potosí","tz":"-6","DST":["04/03/02/00","10/30/02/00"],"country":"Mexico"},"228":{"city":"San Salvador","tz":"-6","country":"El Salvador"},"229":{"city":"Santa Ana","tz":"-6","country":"El Salvador"},"230":{"city":"Santo Domingo","tz":"-4","country":"Dominican Republic"},"231":{"city":"Santa Fe","state":"NM","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"232":{"city":"Santiago","DST":[-1,-1],"tz":"-3","country":"Chile"},"233":{"city":"São Paulo","state":"São Paulo","tz":"-3","DST":["10/16/00/00","02/21/00/00"],"country":"Brazil"},"234":{"city":"Seattle","state":"WA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"235":{"city":"Seoul","tz":"+9","country":"South Korea"},"236":{"city":"Singapore","tz":"+8","country":"Singapore"},"237":{"city":"Shanghai","tz":"+8","country":"China"},"238":{"city":"Sofia","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Bulgaria"},"239":{"city":"Stockholm","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Sweden"},"240":{"city":"Sydney","state":"New South Wales","tz":"+10","DST":["10/02/02/00","04/03/03/00"],"country":"Australia"},"241":{"city":"Taipei","tz":"+8","country":"Taiwan"},"242":{"city":"Tallinn","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Estonia"},"243":{"city":"Tangier","tz":"+0","country":"Morocco"},"244":{"city":"Tashkent","tz":"+5","country":"Uzbekistan"},"245":{"city":"Tegucigalpa","tz":"-6","country":"Honduras"},"246":{"city":"Tehran","DST":["03/21/00/00","09/21/00/00"],"tz":"+3.5","country":"Iran"},"247":{"city":"Tijuana","state":"Baja California","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"Mexico"},"248":{"city":"Tokyo","tz":"+9","country":"Japan"},"249":{"city":"Topeka","state":"KS","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"250":{"city":"Toronto","state":"Ontario","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"251":{"city":"Trenton","state":"NJ","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"252":{"city":"Tripoli","tz":"+2","country":"Libya"},"253":{"city":"Tunis","tz":"+1","country":"Tunisia"},"254":{"city":"Turin","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Italy"},"255":{"city":"Valletta","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Malta"},"256":{"city":"Vancouver","state":"British Columbia","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"257":{"city":"Venice","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Italy"},"258":{"city":"Veracruz","state":"Veracruz","tz":"-6","DST":["04/03/02/00","10/30/02/00"],"country":"Mexico"},"259":{"city":"Vienna","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Austria"},"260":{"city":"Vientiane","tz":"+7","country":"Laos"},"261":{"city":"Vladivostok","DST":[-1,-1],"tz":"+10","country":"Russian Federation"},"262":{"city":"Warsaw","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Poland"},"263":{"city":"Washington","state":"D.C.","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"264":{"city":"Wellington","DST":["09/25/02/00","04/03/03/00"],"tz":"+12","country":"New Zealand"},"265":{"city":"Winnipeg","state":"Manitoba","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"266":{"city":"Windhoek","DST":["09/04/02/00","04/03/02/00"],"tz":"+1","country":"Namibia"},"267":{"city":"Yaoundé","tz":"+1","country":"Cameroon"},"268":{"city":"Zürich","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Switzerland"},"269":{"city":"Pretoria","tz":"+2","country":"South Africa"},"270":{"city":"Bern","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Switzerland"},"271":{"city":"Angra do Heroísmo","DST":["03/27/00/00","10/30/01/00"],"tz":"-1","country":"Portugal"},"272":{"city":"Funafuti","tz":"+12","country":"Tuvalu"},"273":{"city":"Honiara","tz":"+11","country":"Solomon Islands"},"274":{"city":"Kiritimati","state":"Christmas Island","tz":"+14","country":"Kiribati"},"276":{"city":"Yaren","tz":"+12","country":"Nauru"},"277":{"city":"Nukualofa","tz":"+13","country":"Tonga"},"278":{"city":"Papeete","state":"Tahiti","tz":"-10","country":"France"},"279":{"city":"Rarotonga","tz":"-10","country":"Cook Islands"},"280":{"city":"Port Vila","tz":"+11","country":"Vanuatu"},"281":{"city":"Zagreb","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Croatia"},"282":{"city":"Apia","DST":["09/25/03/00","04/03/04/00"],"tz":"-11","country":"Samoa"},"283":{"city":"San Jose","state":"CA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"284":{"city":"Tirana","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Albania"},"285":{"city":"Minsk","DST":[-1,-1],"tz":"+3","country":"Belarus"},"286":{"city":"Halifax","state":"Nova Scotia","tz":"-4","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"297":{"city":"Birmingham","state":"England","tz":"+0","DST":["03/27/01/00","10/30/02/00"],"country":"United Kingdom"},"298":{"city":"Cardiff","state":"Wales","tz":"+0","DST":["03/27/01/00","10/30/02/00"],"country":"United Kingdom"},"301":{"city":"Liverpool","state":"England","tz":"+0","DST":["03/27/01/00","10/30/02/00"],"country":"United Kingdom"},"304":{"city":"Edinburgh","state":"Scotland","tz":"+0","DST":["03/27/01/00","10/30/02/00"],"country":"United Kingdom"},"307":{"city":"Hamburg","state":"Hamburg","tz":"+1","DST":["03/27/02/00","10/30/03/00"],"country":"Germany"},"320":{"city":"Porto","DST":["03/27/01/00","10/30/02/00"],"tz":"+0","country":"Portugal"},"322":{"city":"Córdoba","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Spain"},"338":{"city":"Rotterdam","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Netherlands"},"352":{"city":"Saint-Petersburg","DST":[-1,-1],"tz":"+3","country":"Russian Federation"},"353":{"city":"Novgorod","DST":[-1,-1],"tz":"+3","country":"Russian Federation"},"354":{"city":"Kazan","DST":[-1,-1],"tz":"+3","country":"Russian Federation"},"355":{"city":"Samara","DST":[-1,-1],"tz":"+3","country":"Russian Federation"},"356":{"city":"Ufa","DST":[-1,-1],"tz":"+5","country":"Russian Federation"},"357":{"city":"Perm","DST":[-1,-1],"tz":"+5","country":"Russian Federation"},"358":{"city":"Yekaterinburg","DST":[-1,-1],"tz":"+5","country":"Russian Federation"},"366":{"city":"Odesa","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Ukraine"},"367":{"city":"Kyiv","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Ukraine"},"369":{"city":"Baku","DST":["03/27/04/00","10/30/05/00"],"tz":"+4","country":"Azerbaijan"},"370":{"city":"Yerevan","DST":[-1,-1],"tz":"+4","country":"Armenia"},"371":{"city":"Tbilisi","tz":"+4","country":"Georgia"},"372":{"city":"Krasnoyarsk","DST":[-1,-1],"tz":"+7","country":"Russian Federation"},"373":{"city":"Chelyabinsk","DST":[-1,-1],"tz":"+5","country":"Russian Federation"},"374":{"city":"Omsk","DST":[-1,-1],"tz":"+6","country":"Russian Federation"},"375":{"city":"Novosibirsk","DST":[-1,-1],"tz":"+6","country":"Russian Federation"},"377":{"city":"George Town","tz":"-5","country":"Cayman Islands"},"382":{"city":"Almaty","tz":"+6","country":"Kazakhstan"},"384":{"city":"Bishkek","tz":"+6","country":"Kyrgyzstan"},"385":{"city":"Dushanbe","tz":"+5","country":"Tajikistan"},"387":{"city":"Ashgabat","tz":"+5","country":"Turkmenistan"},"388":{"city":"Oakland","state":"CA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"389":{"city":"Colombo","tz":"+5.5","country":"Sri Lanka"},"390":{"city":"Fresno","state":"CA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"393":{"city":"Tucson","state":"AZ","tz":"-7","country":"United States"},"394":{"city":"Albuquerque","state":"NM","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"395":{"city":"El Paso","state":"TX","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"396":{"city":"Hobart","state":"Tasmania","tz":"+10","DST":["10/02/02/00","04/03/03/00"],"country":"Australia"},"397":{"city":"Port-aux-Francais","tz":"+5","country":"Kerguelen Islands"},"400":{"city":"San Antonio","state":"TX","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"401":{"city":"Fort Worth","state":"TX","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"403":{"city":"Wichita","state":"KS","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"405":{"city":"Kansas City","state":"MO","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"406":{"city":"Mobile","state":"AL","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"407":{"city":"Montgomery","state":"AL","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"408":{"city":"Birmingham","state":"AL","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"409":{"city":"Memphis","state":"TN","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"410":{"city":"Tampa","state":"FL","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"411":{"city":"Jacksonville","state":"FL","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"412":{"city":"Charlotte","state":"NC","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"413":{"city":"Louisville","state":"KY","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"414":{"city":"Cincinnati","state":"OH","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"415":{"city":"Akron","state":"OH","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"416":{"city":"Toledo","state":"OH","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"417":{"city":"Cleveland","state":"OH","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"418":{"city":"Pittsburgh","state":"PA","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"419":{"city":"Baltimore","state":"MD","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"420":{"city":"Norfolk","state":"VA","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"421":{"city":"Rochester","state":"NY","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"422":{"city":"Buffalo","state":"NY","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"423":{"city":"Ahmedabad","state":"Gujarat","tz":"+5.5","country":"India"},"424":{"city":"Al Jizah","DST":[-1,-1],"tz":"+2","country":"Egypt"},"426":{"city":"Alexandria","DST":[-1,-1],"tz":"+2","country":"Egypt"},"427":{"city":"Anshan","tz":"+8","country":"China"},"434":{"city":"Balikpapan","state":"Kalimantan","tz":"+8","country":"Indonesia"},"437":{"city":"Bandung","state":"Java","tz":"+7","country":"Indonesia"},"438":{"city":"Bangalore","state":"Karnataka","tz":"+5.5","country":"India"},"440":{"city":"Baotou","tz":"+8","country":"China"},"448":{"city":"Billings","state":"MT","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"453":{"city":"Cali","tz":"-5","country":"Colombia"},"459":{"city":"Guangzhou","tz":"+8","country":"China"},"464":{"city":"Changchun","tz":"+8","country":"China"},"465":{"city":"Changsha","tz":"+8","country":"China"},"466":{"city":"Chengdu","tz":"+8","country":"China"},"469":{"city":"Chittagong","tz":"+6","country":"Bangladesh"},"470":{"city":"Chongqing","tz":"+8","country":"China"},"487":{"city":"Damascus","DST":["03/25/00/00","10/28/00/00"],"tz":"+2","country":"Syria"},"490":{"city":"Foochow","tz":"+8","country":"China"},"492":{"city":"Fukuoka","tz":"+9","country":"Japan"},"493":{"city":"Fushun","tz":"+8","country":"China"},"496":{"city":"Gdańsk","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Poland"},"499":{"city":"Guiyang","tz":"+8","country":"China"},"501":{"city":"Hangzhou","tz":"+8","country":"China"},"502":{"city":"Harbin","tz":"+8","country":"China"},"505":{"city":"Hyderãbãd","state":"Andhra Pradesh","tz":"+5.5","country":"India"},"509":{"city":"Incheon","tz":"+9","country":"South Korea"},"514":{"city":"Izmir","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Turkey"},"515":{"city":"Jackson","state":"MS","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"516":{"city":"Jaipur","state":"Rajasthan","tz":"+5.5","country":"India"},"519":{"city":"Jilin","tz":"+8","country":"China"},"520":{"city":"Jinan","tz":"+8","country":"China"},"521":{"city":"Jinzhou","tz":"+8","country":"China"},"528":{"city":"Kaliningrad","DST":[-1,-1],"tz":"+2","country":"Russian Federation"},"529":{"city":"Kaunas","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Lithuania"},"530":{"city":"Kawasaki","tz":"+9","country":"Japan"},"532":{"city":"Kitakyushu","tz":"+9","country":"Japan"},"533":{"city":"Kowloon","tz":"+8","country":"Hong Kong"},"534":{"city":"Luxembourg","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Luxembourg"},"535":{"city":"Kraków","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Poland"},"537":{"city":"Kunming","tz":"+8","country":"China"},"538":{"city":"Kyoto","tz":"+9","country":"Japan"},"539":{"city":"Kãnpur","state":"Uttar Pradesh","tz":"+5.5","country":"India"},"540":{"city":"Kobe","tz":"+9","country":"Japan"},"541":{"city":"La Plata","state":"Buenos Aires","tz":"-3","country":"Argentina"},"542":{"city":"Lanchow","tz":"+8","country":"China"},"545":{"city":"Lucknow","state":"Uttar Pradesh","tz":"+5.5","country":"India"},"546":{"city":"Luoyang","tz":"+8","country":"China"},"548":{"city":"Lódz","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Poland"},"549":{"city":"Dalian","tz":"+8","country":"China"},"553":{"city":"Chennai","state":"Tamil Nadu","tz":"+5.5","country":"India"},"554":{"city":"Malang","state":"Java","tz":"+7","country":"Indonesia"},"555":{"city":"Manado","state":"Sulawesi","tz":"+8","country":"Indonesia"},"558":{"city":"Mar del Plata","state":"Buenos Aires","tz":"-3","country":"Argentina"},"561":{"city":"Medan","state":"Sumatera","tz":"+7","country":"Indonesia"},"562":{"city":"Mendoza","state":"Mendoza","tz":"-3","country":"Argentina"},"565":{"city":"Nagoya","tz":"+9","country":"Japan"},"566":{"city":"Nanchang","tz":"+8","country":"China"},"571":{"city":"Nãgpur","state":"Maharashtra","tz":"+5.5","country":"India"},"576":{"city":"Palembang","state":"Sumatera","tz":"+7","country":"Indonesia"},"588":{"city":"Port of Spain","tz":"-4","country":"Trinidad and Tobago"},"591":{"city":"Poznan","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Poland"},"594":{"city":"Busan","tz":"+9","country":"South Korea"},"595":{"city":"Porto Alegre","state":"Rio Grande do Sul","tz":"-3","DST":["10/16/00/00","02/21/00/00"],"country":"Brazil"},"597":{"city":"Qiqihar","tz":"+8","country":"China"},"602":{"city":"Riga","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Latvia"},"605":{"city":"St. Louis","state":"MO","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"606":{"city":"Salta","state":"Salta","tz":"-3","country":"Argentina"},"611":{"city":"San Bernardino","state":"CA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"622":{"city":"Sapporo","tz":"+9","country":"Japan"},"624":{"city":"Semarang","state":"Java","tz":"+7","country":"Indonesia"},"625":{"city":"Shijiazhuang","tz":"+8","country":"China"},"626":{"city":"Sian","tz":"+8","country":"China"},"627":{"city":"Sioux Falls","state":"SD","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"630":{"city":"Stanley","DST":[-1,-1],"tz":"-3","country":"Falkland Islands"},"631":{"city":"Surabaya","state":"Java","tz":"+7","country":"Indonesia"},"632":{"city":"Surakarta","state":"Java","tz":"+7","country":"Indonesia"},"633":{"city":"Szczecin","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Poland"},"636":{"city":"Daegu","tz":"+9","country":"South Korea"},"637":{"city":"Taiyuan","tz":"+8","country":"China"},"640":{"city":"Tangshan","tz":"+8","country":"China"},"646":{"city":"Tianjin","tz":"+8","country":"China"},"649":{"city":"Tsingtao","tz":"+8","country":"China"},"650":{"city":"Tucumán","state":"Tucumán","tz":"-3","country":"Argentina"},"660":{"city":"Vilnius","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Lithuania"},"664":{"city":"Wroclaw","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Poland"},"665":{"city":"Wuhan","tz":"+8","country":"China"},"667":{"city":"Yokohama","tz":"+9","country":"Japan"},"668":{"city":"Zhengzhou","tz":"+8","country":"China"},"669":{"city":"Zibo","tz":"+8","country":"China"},"671":{"city":"Osaka","tz":"+9","country":"Japan"},"672":{"city":"Sana","tz":"+3","country":"Yemen"},"673":{"city":"Skopje","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Macedonia"},"674":{"city":"Monaco","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Monaco"},"675":{"city":"Tarawa","tz":"+12","country":"Kiribati"},"676":{"city":"Tel Aviv","DST":["03/25/02/00","10/30/02/00"],"tz":"+2","country":"Israel"},"677":{"city":"Iqaluit","state":"Nunavut Territory","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"678":{"city":"Yellowknife","state":"Northwest Territories","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"679":{"city":"Whitehorse","state":"Yukon Territory","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"680":{"city":"Nicosia","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Cyprus"},"681":{"city":"A Coruña","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Spain"},"682":{"city":"Funchal","state":"Madeira","tz":"+0","DST":["03/27/01/00","10/30/02/00"],"country":"Portugal"},"684":{"city":"Las Palmas","state":"Canary Islands","tz":"+0","DST":["03/27/01/00","10/30/02/00"],"country":"Spain"},"685":{"city":"Praia","tz":"-1","country":"Cape Verde"},"686":{"city":"Andorra La Vella","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Andorra"},"687":{"city":"The Valley","tz":"-4","country":"Anguilla"},"688":{"city":"Saint John's","tz":"-4","country":"Antigua and Barbuda"},"689":{"city":"Oranjestad","tz":"-4","country":"Aruba"},"690":{"city":"Thimphu","tz":"+6","country":"Bhutan"},"691":{"city":"Sarajevo","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Bosnia-Herzegovina"},"692":{"city":"Road Town","state":"Tortola","tz":"-4","country":"British Virgin Islands"},"693":{"city":"Bandar Seri Begawan","tz":"+8","country":"Brunei Darussalam"},"694":{"city":"Bangui","tz":"+1","country":"Central African Republic"},"695":{"city":"The Settlement","state":"Christmas Island","tz":"+7","country":"Australia"},"696":{"city":"Moroni","tz":"+3","country":"Comoros"},"697":{"city":"Djibouti","tz":"+3","country":"Djibouti"},"698":{"city":"Roseau","tz":"-4","country":"Dominica"},"699":{"city":"Malabo","tz":"+1","country":"Equatorial Guinea"},"700":{"city":"Asmara","tz":"+3","country":"Eritrea"},"701":{"city":"Tórshavn","state":"Faroe Islands","tz":"+0","DST":["03/27/01/00","10/30/02/00"],"country":"Faroe Islands"},"702":{"city":"Gaza","DST":["03/26/00/00","10/21/00/00"],"tz":"+2","country":"Gaza Strip"},"703":{"city":"Nuuk","DST":["03/26/22/00","10/29/23/00"],"tz":"-3","country":"Greenland"},"706":{"city":"Saint George's","tz":"-4","country":"Grenada"},"707":{"city":"Basse-Terre","tz":"-4","country":"Guadeloupe"},"709":{"city":"Port-au-Prince","tz":"-5","country":"Haiti"},"710":{"city":"Vatican City","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Vatican City State"},"712":{"city":"Saint Helier","state":"Jersey","tz":"+0","DST":["03/27/01/00","10/30/02/00"],"country":"United Kingdom"},"713":{"city":"Rawaki","state":"Phoenix Islands","tz":"+13","country":"Kiribati"},"714":{"city":"Vaduz","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Liechtenstein"},"715":{"city":"Male","tz":"+5","country":"Maldives"},"717":{"city":"Majuro","tz":"+12","country":"Marshall Islands"},"718":{"city":"Fort-de-France","tz":"-4","country":"Martinique"},"719":{"city":"Mamoutzou","tz":"+3","country":"Mayotte"},"720":{"city":"Ulaanbaatar","tz":"+8","country":"Mongolia"},"721":{"city":"Brades","tz":"-4","country":"Montserrat"},"722":{"city":"Willemstad","tz":"-4","country":"Netherlands Antilles"},"723":{"city":"Noumea","state":"New Caledonia","tz":"+11","country":"France"},"724":{"city":"Alofi","tz":"-11","country":"Niue"},"725":{"city":"Kingston","tz":"+11.5","country":"Norfolk Island"},"726":{"city":"Koror","tz":"+9","country":"Palau"},"728":{"city":"Basseterre","tz":"-4","country":"Saint Kitts and Nevis"},"729":{"city":"Castries","tz":"-4","country":"Saint Lucia"},"730":{"city":"Saint-Pierre","DST":["03/13/02/00","11/06/02/00"],"tz":"-3","country":"Saint Pierre and Miquelon"},"731":{"city":"Kingstown","tz":"-4","country":"Saint Vincent and Grenadines"},"732":{"city":"San Marino","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"San Marino"},"733":{"city":"São Tomé","tz":"+0","country":"Sao Tome and Principe"},"734":{"city":"Victoria","tz":"+4","country":"Seychelles"},"735":{"city":"Bratislava","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Slovak Republic"},"736":{"city":"Ljubljana","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Slovenia"},"741":{"city":"El Aaiún","tz":"+0","country":"Western Sahara"},"742":{"city":"Abuja","tz":"+1","country":"Nigeria"},"743":{"city":"Pristina","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Kosovo"},"744":{"city":"Podgorica","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Montenegro"},"748":{"city":"Jeddah","tz":"+3","country":"Saudi Arabia"},"749":{"city":"Saint John","state":"New Brunswick","tz":"-4","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"750":{"city":"Lord Howe Island","state":"Lord Howe Island","tz":"+10.5","DST":["10/02/02/00","04/03/02/00"],"country":"Australia"},"751":{"city":"Fernando de Noronha","state":"Pernambuco","tz":"-2","country":"Brazil"},"752":{"city":"Rio Branco","state":"Acre","tz":"-4","country":"Brazil"},"753":{"city":"Charlottetown","state":"Pr.Edward I","tz":"-4","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"754":{"city":"Macau","tz":"+8","country":"Macau"},"755":{"city":"Adamstown","state":"Pitcairn","tz":"-8","country":"Henderson"},"756":{"city":"Lahore","tz":"+5","country":"Pakistan"},"757":{"city":"Karachi","tz":"+5","country":"Pakistan"},"758":{"city":"Faisalabad","tz":"+5","country":"Pakistan"},"759":{"city":"Jayapura","state":"Papua","tz":"+9","country":"Indonesia"},"760":{"city":"Singaraja","state":"Bali","tz":"+8","country":"Indonesia"},"761":{"city":"Denpasar","state":"Bali","tz":"+8","country":"Indonesia"},"762":{"city":"Kupang","state":"West Timor","tz":"+8","country":"Indonesia"},"763":{"city":"Raba","state":"Sumbawa","tz":"+8","country":"Indonesia"},"764":{"city":"Endeh","state":"Flores","tz":"+8","country":"Indonesia"},"765":{"city":"Mataram","state":"Lombok","tz":"+8","country":"Indonesia"},"766":{"city":"Ambon","state":"Seram","tz":"+9","country":"Indonesia"},"767":{"city":"Ternate","state":"Halmahera","tz":"+9","country":"Indonesia"},"768":{"city":"Dili","tz":"+9","country":"Timor-Leste"},"770":{"city":"San Diego","state":"CA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"771":{"city":"Delhi","state":"Delhi","tz":"+5.5","country":"India"},"776":{"city":"Dubai","state":"Dubai","tz":"+4","country":"United Arab Emirates"},"778":{"city":"Cheyenne","state":"WY","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"783":{"city":"Anaheim","state":"CA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"786":{"city":"Arlington","state":"TX","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"787":{"city":"Aurora","state":"CO","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"805":{"city":"Columbus","state":"OH","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"842":{"city":"Jersey City","state":"NJ","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"843":{"city":"Knoxville","state":"TN","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"848":{"city":"Lexington-Fayette","state":"KY","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"850":{"city":"Long Beach","state":"CA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"853":{"city":"Mesa","state":"AZ","tz":"-7","country":"United States"},"861":{"city":"Newark","state":"NJ","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"867":{"city":"Orlando","state":"FL","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"878":{"city":"Providence","state":"RI","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"880":{"city":"Riverside","state":"CA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"896":{"city":"St. Petersburg","state":"FL","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"899":{"city":"Stockton","state":"CA","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"904":{"city":"Virginia Beach","state":"VA","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"914":{"city":"Easter Island","DST":[-1,-1],"tz":"-5","country":"Chile"},"915":{"city":"Galapagos Islands","tz":"-6","country":"Ecuador"},"916":{"city":"Aqtobe","tz":"+5","country":"Kazakhstan"},"917":{"city":"Aqtau","tz":"+5","country":"Kazakhstan"},"918":{"city":"Lhasa","tz":"+8","country":"China"},"919":{"city":"Belfast","state":"Northern Ireland","tz":"+0","DST":["03/27/01/00","10/30/02/00"],"country":"United Kingdom"},"921":{"city":"Astana","tz":"+6","country":"Kazakhstan"},"923":{"city":"Cancún","state":"Quintana Roo","tz":"-5","DST":[-1,-1],"country":"Mexico"},"925":{"city":"Vadodara","state":"Gujarat","tz":"+5.5","country":"India"},"926":{"city":"Brazzaville","tz":"+1","country":"Congo"},"931":{"city":"Unalaska","state":"AK","tz":"-9","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"934":{"city":"Saipan","tz":"+10","country":"Northern Mariana Islands"},"943":{"city":"Khulna","tz":"+6","country":"Bangladesh"},"944":{"city":"Pensacola","state":"FL","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"945":{"city":"Lausanne","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Switzerland"},"950":{"city":"Hovd","tz":"+7","country":"Mongolia"},"951":{"city":"Christchurch","DST":["09/25/02/00","04/03/03/00"],"tz":"+12","country":"New Zealand"},"1024":{"city":"Bastia","state":"Corsica","tz":"+1","DST":["03/27/02/00","10/30/03/00"],"country":"France"},"1026":{"city":"Choibalsan","tz":"+8","country":"Mongolia"},"1027":{"city":"Taiohae","state":"Marquesas Islands","tz":"-9.5","country":"France"},"1028":{"city":"Gambier Islands","tz":"-9","country":"French Polynesia"},"1029":{"city":"Dover","state":"DE","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"1030":{"city":"Dodoma","tz":"+3","country":"Tanzania"},"1033":{"city":"Pago Pago","tz":"-11","country":"American Samoa"},"1038":{"city":"Pune","state":"Maharashtra","tz":"+5.5","country":"India"},"1039":{"city":"Surat","state":"Gujarat","tz":"+5.5","country":"India"},"1040":{"city":"Patna","state":"Bihar","tz":"+5.5","country":"India"},"1041":{"city":"Indore","state":"Madhya Pradesh","tz":"+5.5","country":"India"},"1042":{"city":"Bhubaneshwar","state":"Orissa","tz":"+5.5","country":"India"},"1043":{"city":"Ludhiana","state":"Punjab","tz":"+5.5","country":"India"},"1044":{"city":"Visakhapatnam","state":"Andhra Pradesh","tz":"+5.5","country":"India"},"1045":{"city":"Varanasi","state":"Uttar Pradesh","tz":"+5.5","country":"India"},"1046":{"city":"Agra","state":"Uttar Pradesh","tz":"+5.5","country":"India"},"1047":{"city":"Madurai","state":"Tamil Nadu","tz":"+5.5","country":"India"},"1048":{"city":"Bethlehem","DST":["03/26/00/00","10/21/00/00"],"tz":"+2","country":"West Bank"},"1049":{"city":"Khon Kaen","tz":"+7","country":"Thailand"},"1051":{"city":"Basra","tz":"+3","country":"Iraq"},"1061":{"city":"Esfahãn","DST":["03/21/00/00","09/21/00/00"],"tz":"+3.5","country":"Iran"},"1064":{"city":"Hiroshima","tz":"+9","country":"Japan"},"1065":{"city":"Sendai","tz":"+9","country":"Japan"},"1066":{"city":"Okayama","tz":"+9","country":"Japan"},"1067":{"city":"Kaohsiung","tz":"+8","country":"Taiwan"},"1072":{"city":"Palikir","state":"Ponape","tz":"+11","country":"Micronesia"},"1079":{"city":"Rosario","state":"Santa Fe","tz":"-3","country":"Argentina"},"1085":{"city":"Surrey","state":"British Columbia","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"1091":{"city":"Victoria","state":"British Columbia","tz":"-8","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"1169":{"city":"Brampton","state":"Ontario","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"1181":{"city":"Hamilton","state":"Ontario","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"1185":{"city":"London","state":"Ontario","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"1186":{"city":"Markham","state":"Ontario","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"1187":{"city":"Mississauga","state":"Ontario","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"1206":{"city":"Windsor","state":"Ontario","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"1209":{"city":"Gatineau","state":"Quebec","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"1211":{"city":"Laval","state":"Quebec","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"1213":{"city":"Longueuil","state":"Quebec","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"Canada"},"1227":{"city":"Saskatoon","state":"Saskatchewan","tz":"-6","country":"Canada"},"1229":{"city":"Basel","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Switzerland"},"1232":{"city":"Shenzhen","tz":"+8","country":"China"},"1236":{"city":"Peshawar","tz":"+5","country":"Pakistan"},"1237":{"city":"Sialkot","tz":"+5","country":"Pakistan"},"1238":{"city":"Cebu City","tz":"+8","country":"Philippines"},"1245":{"city":"Yuzhno-Sakhalinsk","DST":[-1,-1],"tz":"+10","country":"Russian Federation"},"1485":{"city":"Port Elizabeth","tz":"+2","country":"South Africa"},"1487":{"city":"Durban","tz":"+2","country":"South Africa"},"1888":{"city":"Sucre","tz":"-4","country":"Bolivia"},"1890":{"city":"Midway Islands","tz":"-11","country":"United States"},"1892":{"city":"Thiruvananthapuram","state":"Kerala","tz":"+5.5","country":"India"},"1907":{"city":"Yakutsk","DST":[-1,-1],"tz":"+9","country":"Russian Federation"},"1908":{"city":"Nizhny Novgorod","DST":[-1,-1],"tz":"+3","country":"Russian Federation"},"1909":{"city":"Barnaul","DST":[-1,-1],"tz":"+6","country":"Russian Federation"},"1910":{"city":"Ryazan","DST":[-1,-1],"tz":"+3","country":"Russian Federation"},"1911":{"city":"Tyumen","DST":[-1,-1],"tz":"+5","country":"Russian Federation"},"1919":{"city":"Neuquén","state":"Neuquén","tz":"-3","country":"Argentina"},"1920":{"city":"Rapid City","state":"SD","tz":"-7","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"1921":{"city":"Midland","state":"TX","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"1922":{"city":"Blanc-Sablon","state":"Quebec","tz":"-4","country":"Canada"},"1925":{"city":"Kotte","tz":"+5.5","country":"Sri Lanka"},"1927":{"city":"Cheboksary","DST":[-1,-1],"tz":"+3","country":"Russian Federation"},"1928":{"city":"Annapolis","state":"MD","tz":"-5","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"1930":{"city":"Hefei","tz":"+8","country":"China"},"1931":{"city":"Lanzhou","tz":"+8","country":"China"},"1933":{"city":"Nanning","tz":"+8","country":"China"},"1934":{"city":"Nanjing","tz":"+8","country":"China"},"1935":{"city":"Shenyang","tz":"+8","country":"China"},"1936":{"city":"Hohhot","tz":"+8","country":"China"},"1939":{"city":"Lubango","tz":"+1","country":"Angola"},"1942":{"city":"Medina","tz":"+3","country":"Saudi Arabia"},"1943":{"city":"Rasht","DST":["03/21/00/00","09/21/00/00"],"tz":"+3.5","country":"Iran"},"1946":{"city":"Hai Phong","tz":"+7","country":"Vietnam"},"1949":{"city":"Bursa","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Turkey"},"1950":{"city":"Aleppo","DST":["03/25/00/00","10/28/00/00"],"tz":"+2","country":"Syria"},"1951":{"city":"Arkhangelsk","DST":[-1,-1],"tz":"+3","country":"Russian Federation"},"1952":{"city":"Davao","tz":"+8","country":"Philippines"},"1953":{"city":"Kryvyi Rih","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Ukraine"},"1954":{"city":"Atyrau","tz":"+5","country":"Kazakhstan"},"1955":{"city":"Chiang Mai","tz":"+7","country":"Thailand"},"1957":{"city":"Anantapur","state":"Andhra Pradesh","tz":"+5.5","country":"India"},"1958":{"city":"Makati","tz":"+8","country":"Philippines"},"1960":{"city":"Brno","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Czech Republic"},"1964":{"city":"Limerick","DST":["03/27/01/00","10/30/02/00"],"tz":"+0","country":"Ireland"},"1969":{"city":"Mombasa","tz":"+3","country":"Kenya"},"1971":{"city":"Agadir","tz":"+0","country":"Morocco"},"1972":{"city":"Kaduna","tz":"+1","country":"Nigeria"},"1973":{"city":"Rawalpindi","tz":"+5","country":"Pakistan"},"1974":{"city":"Bacolod","tz":"+8","country":"Philippines"},"1975":{"city":"Dammam","tz":"+3","country":"Saudi Arabia"},"1976":{"city":"Alicante","DST":["03/27/02/00","10/30/03/00"],"tz":"+1","country":"Spain"},"1978":{"city":"Cotonou","tz":"+1","country":"Benin"},"1980":{"city":"Eucla","state":"Western Australia","tz":"+8.75","country":"Australia"},"1982":{"city":"Quezon","tz":"+8","country":"Philippines"},"1984":{"city":"Sochi","DST":[-1,-1],"tz":"+3","country":"Russian Federation"},"1986":{"city":"Fargo","state":"ND","tz":"-6","DST":["03/13/02/00","11/06/02/00"],"country":"United States"},"1987":{"city":"Oaxaca","state":"Oaxaca","tz":"-6","DST":["04/03/02/00","10/30/02/00"],"country":"Mexico"},"1988":{"city":"Magnitogorsk","DST":[-1,-1],"tz":"+5","country":"Russian Federation"},"1990":{"city":"Zanzibar City","tz":"+3","country":"Tanzania"},"1992":{"city":"Rustenburg","tz":"+2","country":"South Africa"},"1993":{"city":"Durgapur","state":"West Bengal","tz":"+5.5","country":"India"},"1996":{"city":"Marrakech","tz":"+0","country":"Morocco"},"1998":{"city":"Fes","tz":"+0","country":"Morocco"},"2001":{"city":"Vladimir","DST":[-1,-1],"tz":"+3","country":"Russian Federation"},"2004":{"city":"Xiamen","tz":"+8","country":"China"},"2008":{"city":"Kharkiv","DST":["03/27/03/00","10/30/04/00"],"tz":"+2","country":"Ukraine"},"A2":{"city":"ADT","country":"Atlantic Daylight Time","tz":"-3"},"A4":{"city":"AFT","country":"Afghanistan Time","tz":"+4.5"},"A5":{"city":"AKDT","country":"Alaska Daylight Time","tz":"-8"},"A6":{"city":"AKST","country":"Alaska Standard Time","tz":"-9"},"A7":{"city":"AMST","country":"Armenia Summer Time","tz":"+5"},"A9":{"city":"AMT","country":"Armenia Time","tz":"+4"},"A10":{"city":"AMT","country":"Amazon Time","tz":"-4"},"A14":{"city":"ART","country":"Argentina Time","tz":"-3"},"A15":{"city":"AST","country":"Arabia Standard Time","tz":"+3"},"A16":{"city":"AST","country":"Atlantic Standard Time","tz":"-4"},"A21":{"city":"AZST","country":"Azerbaijan Summer Time","tz":"+5"},"A22":{"city":"AZT","country":"Azerbaijan Time","tz":"+4"},"A25":{"city":"BOT","country":"Bolivia Time","tz":"-4"},"A26":{"city":"BRT","country":"Brasilia Time","tz":"-3"},"A27":{"city":"BST","country":"Bangladesh Standard Time","tz":"+6"},"A28":{"city":"BST","country":"British Summer Time","tz":"+1"},"A29":{"city":"BTT","country":"Bhutan Time","tz":"+6"},"A32":{"city":"CAT","country":"Central Africa Time","tz":"+2"},"A33":{"city":"CCT","country":"Cocos Islands Time","tz":"+6.5"},"A36":{"city":"CDT","country":"Central Daylight Time","tz":"-5"},"A37":{"city":"CEST","country":"Central European Summer Time","tz":"+2"},"A39":{"city":"CET","country":"Central European Time","tz":"+1"},"A41":{"city":"CHAST","country":"Chatham Island Standard Time","tz":"+12.75"},"A42":{"city":"CKT","country":"Cook Island Time","tz":"-10"},"A43":{"city":"CLST","country":"Chile Summer Time","tz":"-3"},"A44":{"city":"CLT","country":"Chile Standard Time","tz":"-4"},"A45":{"city":"COT","country":"Colombia Time","tz":"-5"},"A46":{"city":"CST","country":"China Standard Time","tz":"+8"},"A50":{"city":"CST","country":"Central Standard Time","tz":"-6"},"A51":{"city":"CVT","country":"Cape Verde Time","tz":"-1"},"A52":{"city":"CXT","country":"Christmas Island Time","tz":"+7"},"A53":{"city":"ChST","country":"Chamorro Standard Time","tz":"+10"},"A58":{"city":"EAST","country":"Easter Island Standard Time","tz":"-6"},"A59":{"city":"EAT","country":"Eastern Africa Time","tz":"+3"},"A61":{"city":"ECT","country":"Ecuador Time","tz":"-5"},"A64":{"city":"EDT","country":"Eastern Daylight Time","tz":"-4"},"A68":{"city":"EEST","country":"Eastern European Summer Time","tz":"+3"},"A71":{"city":"EET","country":"Eastern European Time","tz":"+2"},"A72":{"city":"EGST","country":"Eastern Greenland Summer Time","tz":"+0"},"A73":{"city":"EGT","country":"East Greenland Time","tz":"-1"},"A77":{"city":"EST","country":"Eastern Standard Time","tz":"-5"},"A82":{"city":"FJST","country":"Fiji Summer Time","tz":"+13"},"A83":{"city":"FJT","country":"Fiji Time","tz":"+12"},"A84":{"city":"FKST","country":"Falkland Islands Summer Time","tz":"-3"},"A85":{"city":"FKT","country":"Falkland Island Time","tz":"-4"},"A88":{"city":"GALT","country":"Galapagos Time","tz":"-6"},"A89":{"city":"GAMT","country":"Gambier Time","tz":"-9"},"A90":{"city":"GET","country":"Georgia Standard Time","tz":"+4"},"A91":{"city":"GFT","country":"French Guiana Time","tz":"-3"},"A92":{"city":"GILT","country":"Gilbert Island Time","tz":"+12"},"A94":{"city":"GMT","country":"Greenwich Mean Time","tz":"+0"},"A95":{"city":"GST","country":"Gulf Standard Time","tz":"+4"},"A96":{"city":"GYT","country":"Guyana Time","tz":"-4"},"A98":{"city":"HKT","country":"Hong Kong Time","tz":"+8"},"A112":{"city":"IRKT","country":"Irkutsk Time","tz":"+8"},"A113":{"city":"IRST","country":"Iran Standard Time","tz":"+3.5"},"A114":{"city":"IST","country":"Israel Standard Time","tz":"+2"},"A115":{"city":"IST","country":"India Standard Time","tz":"+5.5"},"A116":{"city":"IST","country":"Irish Standard Time","tz":"+1"},"A117":{"city":"JST","country":"Japan Standard Time","tz":"+9"},"A120":{"city":"KRAST","country":"Krasnoyarsk Summer Time","tz":"+8"},"A121":{"city":"KRAT","country":"Krasnoyarsk Time","tz":"+7"},"A122":{"city":"KST","country":"Korea Standard Time","tz":"+9"},"A125":{"city":"LHDT","country":"Lord Howe Daylight Time","tz":"+11"},"A126":{"city":"LHST","country":"Lord Howe Standard Time","tz":"+10.5"},"A127":{"city":"LINT","country":"Line Islands Time","tz":"+14"},"A131":{"city":"MART","country":"Marquesas Time","tz":"-9.5"},"A133":{"city":"MDT","country":"Mountain Daylight Time","tz":"-6"},"A136":{"city":"Moscow (MSD)","country":"Moscow Daylight Time","tz":"+4"},"A137":{"city":"Moscow (MSK)","country":"Moscow Standard Time","tz":"+3"},"A138":{"city":"MST","country":"Mountain Standard Time","tz":"-7"},"A139":{"city":"MUT","country":"Mauritius Time","tz":"+4"},"A144":{"city":"NDT","country":"Newfoundland Daylight Time","tz":"-2.5"},"A145":{"city":"NFT","country":"Norfolk Time","tz":"+11.5"},"A148":{"city":"NPT","country":"Nepal Time ","tz":"+5.75"},"A149":{"city":"NST","country":"Newfoundland Standard Time","tz":"-3.5"},"A152":{"city":"NZDT","country":"New Zealand Daylight Time","tz":"+13"},"A154":{"city":"NZST","country":"New Zealand Standard Time","tz":"+12"},"A156":{"city":"MSST","country":"Omsk Summer Time","tz":"+7"},"A157":{"city":"OMST","country":"Omsk Standard Time","tz":"+6"},"A159":{"city":"PDT","country":"Pacific Daylight Time","tz":"-7"},"A160":{"city":"PET","country":"Peru Time","tz":"-5"},"A162":{"city":"PETT","country":"Kamchatka Time","tz":"+12"},"A164":{"city":"PHOT","country":"Phoenix Island Time","tz":"+13"},"A165":{"city":"PHT","country":"Philippine Time","tz":"+8"},"A166":{"city":"PKT","country":"Pakistan Standard Time","tz":"+5"},"A168":{"city":"PST","country":"Pacific Standard Time","tz":"-8"},"A171":{"city":"PYST","country":"Paraguay Summer Time","tz":"-3"},"A172":{"city":"PYT","country":"Paraguay Time","tz":"-4"},"A175":{"city":"RET","country":"Reunion Time","tz":"+4"},"A177":{"city":"SAMT","country":"Samara Time","tz":"+4"},"A178":{"city":"SAST","country":"South Africa Standard Time","tz":"+2"},"A179":{"city":"SBT","country":"Solomon Islands Time","tz":"+11"},"A181":{"city":"SGT","country":"Singapore Time","tz":"+8"},"A183":{"city":"SST","country":"Samoa Standard Time","tz":"-11"},"A185":{"city":"TAHT","country":"Tahiti Time","tz":"-10"},"A186":{"city":"THA","country":"Thailand Standard Time","tz":"+7"},"A194":{"city":"UYST","country":"Uruguay Summer Time","tz":"-2"},"A195":{"city":"UYT","country":"Uruguay Time","tz":"-3"},"A198":{"city":"VET","country":"Venezuelan Standard Time","tz":"-4.5"},"A199":{"city":"VLAST","country":"Vladivostok Summer Time","tz":"+11"},"A200":{"city":"VLAT","country":"Vladivostok Time","tz":"+10"},"A204":{"city":"WAT","country":"West Africa Time","tz":"+1"},"A207":{"city":"WEST","country":"Western European Summer Time","tz":"+1"},"A209":{"city":"WEDT","country":"Western European Time","tz":"+0"},"A222":{"city":"YAKT","country":"Yakutsk Time","tz":"+9"},"A225":{"city":"YEKT","country":" Yekaterinburg Time","tz":"+5"}};

var g_i18n;
function proc_get_i18n(name,mdefault){
	var s="";
	if (g_i18n && g_i18n[name]){
		s=g_i18n[name].message;
	}
	if (!s){
		if (mdefault) s=mdefault;
		else s="";
	}
	return s;
}

function proc_setlang(){
	var re = /\[([^\[\]]+?)\]/g;	
	var s,s1,p2;
	
	function convert(s){
		s=s.replace(re, function(str,p1) {  
				if (!p1) return '';
				p2=p1.split('|');
				if (p2.length==2){
					s1=proc_get_i18n(p2[0]);
					if (!s1) s1=p2[1];
				} else {
					s1=proc_get_i18n(p1);
				}
  				return s1;
			});		
		return s;
	}
	
	function find(tag){
		var a=document.getElementsByTagName(tag);
		for(var i = 0; i < a.length; i++){    
			if (a[i].id=='i18n'){
				s=convert(a[i].getAttribute('data'));		
				if (s) a[i].innerHTML=s;				
				//a[i].title='';
	  		} else if (a[i].getAttribute('data')) {
  				a[i].title=convert(a[i].getAttribute('data'));					
	  		}
		}
	}
	try{
		find('title');
	}catch(err){}
	find('span');
	find('option');
	find('button');
	find('a');
}

function proc_call_setlang(i18n){
	g_i18n=i18n;
	proc_setlang();
}

function setstorage(name,value){
	if (window.localStorage){
		localStorage[name]=value+'';
	}else{
		setCookie(name, value, 1000*60*60*24*365*10); 
	}
}

function getstorage(name){
	var s;
	if (window.localStorage){
		s=localStorage[name];
	}else{
		s=getCookie(name);
	}
	return s;
}

function _getid(id){
	return document.getElementById(id);
}

function fillnumber(s){
	s=String(s);
	if ( s.length==1 ) { 
		return '0'+s;  
	}
	return s;
}	

function trim(str) {
  	return str.replace(/^\s*|\s*$/g,"");
}

function _getinnertext(f){
	var s=f.innerText;
	if (!s){
		s=f.innerHTML;
		s=s.replace(/(<br>)/ig,' '); 
		s=s.replace(/(<[^>]+>)/g,''); 
	}
	return trim(s);
}

function regex_decode(str){
  str = str.replace(/\\/gi, "\\\\");
  str = str.replace(/\^/gi, "\\^");
  str = str.replace(/\$/gi, "\\$");
  str = str.replace(/\*/gi, "\\*");
  str = str.replace(/\+/gi, "\\+");
  str = str.replace(/\?/gi, "\\?");
  str = str.replace(/\./gi, "\\.");
  str = str.replace(/\(/gi, "\\(");
  str = str.replace(/\)/gi, "\\)");
  str = str.replace(/\|/gi, "\\|");
  str = str.replace(/\{/gi, "\\{");
  str = str.replace(/\}/gi, "\\}");
  str = str.replace(/\[/gi, "\\[");		
  str = str.replace(/\]/gi, "\\]");
  return str;
}

function proc_remove(f){
	var a=f.parentNode.parentNode;
	if (a){
		a.parentNode.removeChild(a);
	}
	proc_saveall();
	proc_change();
	return false;
}        		

function proc_saveall(){
	if (window.localStorage && window.JSON){
		var a=_getid("clocks");
		if (!a) return;

		a=a.getElementsByTagName('DIV');
		var b=[];
		var label,cityid;
		for(var i = 0; i < a.length; i++){    
			cityid=a[i].getAttribute("_cityid");
			if (cityid!=null){
				var c={};
				c.cityid=cityid;
				b.push(c);
			}
		}
		setstorage("c_worldclock_data",JSON.stringify(b));
	}
}

function proc_change(){
	var a=_getid("home");
	if (a && a.offsetHeight>0 && parent && parent.proc_change){
		parent.proc_change(a.offsetHeight);
	}
}

function proc_change_weather(f){
	if (parent.proc_change_weather){
		var cityid=f.getAttribute("cityid");
		var info=g_city[cityid];
		if(!info) return;
		var s=info.city;//_getinnertext(f);
		var p1=s.indexOf("(");
		if(p1>=0) s=trim(s.substr(0,p1));
		s=s+" "+(info.country || "").replace(" Time","").replace(" Daylight","").replace(" Summer","").replace(" Standard","");
		parent.proc_change_weather(s);
	}
	return false;
}

function proc_add_click(){
	var a=_getid("home");
	$(a).removeClass('current');
	var a=_getid("add");
	$(a).addClass('current');

	//_getid('timezone').value="";
	setTimeout(function(){
		var a=_getid('findzone');
		a.select();
		a.focus();
	},25);
}

function get_uniq_id(s){
	var s1=s;
	var obj;
	var k=0;
	while (true) {		
		obj=_getid(s1);
		if (!obj) return s1;
		k++;
		s1=s+k+'_';
	}
}

var g_drag_id;
var g_dragover_obj;
function clock_ondragstart(ev){
	if(!ev || !ev.target || !ev.target.id) return false;
	ev.dataTransfer.setData("Text",ev.target.id);
	g_drag_id=ev.target.id;
}

function clock_ondragover(ev){	
	if(!ev) return;
	ev.preventDefault();
	g_dragover_obj=ev.target;
}

function clock_ondrop(ev){
	if(!ev) return;
	ev.preventDefault();
	var id=ev.dataTransfer.getData("Text");
	var src=_getid(id);
	
	var dest;
	var b=ev.target;
	while (b){
		if (b.getAttribute("_cityid")!=null){
			dest=b;
			break;
		}else{
			b=b.parentNode;
		}
	}
	if (!src || !dest) return;
	
	var source=src.cloneNode(true);
	source.id=get_uniq_id((new Date()).getTime());
	source.setAttribute("_cityid",src.getAttribute("_cityid"));		
	$(source).data('tz_offset', src.getAttribute("_tz_offset"));
	source.draggable=true;
	source.ondragstart=clock_ondragstart;
	source.ondragover=clock_ondragover;
	source.ondrop=clock_ondrop;

	dest.parentNode.insertBefore(source,dest);
	src.parentNode.removeChild(src);

	proc_saveall();
}

function clock_ondragend(ev){
	if (!g_drag_id || !g_dragover_obj) return;
	ev.preventDefault();
	var src=_getid(g_drag_id);
	g_drag_id=null;
	
	var dest;
	var b=g_dragover_obj;
	while (b){
		if (b.getAttribute("_cityid")!=null){
			dest=b;
			break;
		}else{
			b=b.parentNode;
		}
	}
	if (!src || !dest) return;

	var source=src.cloneNode(true);
	source.id=get_uniq_id((new Date()).getTime());
	source.setAttribute("_cityid",src.getAttribute("_cityid"));		
	$(source).data('tz_offset', src.getAttribute("_tz_offset"));
	source.draggable=true;
	source.ondragstart=clock_ondragstart;
	source.ondragover=clock_ondragover;
	source.ondrop=clock_ondrop;
	if (iswebkit && !ischrome) source.ondragend=clock_ondragend;

	dest.parentNode.insertBefore(source,dest);
	src.parentNode.removeChild(src);

	proc_saveall();
}

function getOffset(b) {
		var a = 0;
		var c = 0;
		while (b && !isNaN(b.offsetLeft) && !isNaN(b.offsetTop)) {
	        a += b.offsetLeft;
		    c += b.offsetTop;
			b = b.offsetParent;
		}      
	    return {
		    left: a,
			top: c
		}
}

function findcity_onmousedown(f){
	_getid('timezone').value=f.getAttribute("cityid");
	_getid('findzone').value=_getinnertext(f);
	g_last_query=_getid('findzone').value;
	//$('#btn_addclock').click();
} 

function findcity_onmouseover(f){
	var a=_getid("div_findcity");
	a=a.getElementsByTagName('TR');
	for(var i = 0; i < a.length; i++){    
		if (a[i].bgColor=='#316ac5'){
			a[i].bgColor='';
			a[i].style.color='black';																						
		}
	}
	f.bgColor="#316ac5";
	f.style.color='white';
} 

function findcity_onmouseout(f){
	f.bgColor='';
	f.style.color='black';
} 

var find_timer,g_last_query;
function init(){
	if (!g_i18n && parent) g_i18n=parent.g_i18n;
	if (g_i18n) proc_setlang();
	
	var s=getstorage("c_12hour"); 
	if(s=="1") _getid("c_12hour").checked=true;
	else _getid("c_12hour").checked=false;

	var a=_getid('findzone');
	a.onblur=function(){
		_getid("div_findcity").style.display="none";
	}
	a.onkeydown=function(e){
		function stopevent(){
			if (e.preventDefault) {e.preventDefault(); e.stopPropagation();}
			else {e.returnValue = false; e.cancelBubble = true;}		
		}	
		if(!e) e=window.event;
		var press_ctrl=typeof e.modifiers=='undefined'?e.ctrlKey:e.modifiers&Event.CONTROL_MASK;
		var press_alt=typeof e.modifiers=='undefined'?e.altKey:e.modifiers&Event.ALT_MASK;
		var press_shift=typeof e.modifiers=='undefined'?e.shiftKey:e.modifiers&Event.SHIFT_MASK;		

		if (e.keyCode==13){
			stopevent();
			$('#btn_addclock').click();
		}else if (e.keyCode==27){
			_getid("div_findcity").style.display="none";
		}else if (e.keyCode==38 || e.keyCode==40){
			stopevent();					
			var a=_getid("div_findcity");
			if (a.style.display!="") return;
			a=a.getElementsByTagName('TR');

			function setclear(){
				for(var i = 0; i < a.length; i++){    
					if (a[i].bgColor=='#316ac5'){
						a[i].bgColor='';
						a[i].style.color='black';																						
					}
				}
			}
			function setactivate(b){
				b.bgColor="#316ac5";
				b.style.color='white';	
				_getid('timezone').value=b.getAttribute("cityid");
				_getid('findzone').value=_getinnertext(b);
				g_last_query=_getid('findzone').value;
			}
			
			for(var i = 0; i < a.length; i++){    
				if (a[i].bgColor=='#316ac5'){
					var idx=parseInt(a[i].id.replace(/findcity_/g,""));
					if (e.keyCode==38) idx=idx-1;
					else idx=idx+1;
					var b=_getid("findcity_"+idx);
					if (b){
						setclear();
						setactivate(b);
					}else{
						setactivate(a[i]);
					}
					return;
				}
			}

			var b=_getid("findcity_0");
			if (b) setactivate(b);
		}else if (e.keyCode==37 || e.keyCode==39 || e.keyCode==35 || e.keyCode==36){
		//}else if (!press_ctrl && !press_alt && !press_shift){
		}else{	
			clearTimeout(find_timer);
			find_timer=setTimeout(function(){
				var obj=_getid('findzone');
				var a=_getid("div_findcity");

				var query=obj.value;
				if(g_last_query==query) return;
				_getid('timezone').value="";
				g_last_query=query;
				if (!query){
					a.style.display="none";
					return;
				}

				var qarr=[];
				var s1=query.split(" ");
				for (var  j= 0; j < s1.length; j++) {
					s1[j]=trim(s1[j]);
					if (!s1[j]) continue;
					var aa={};
					aa.word=s1[j].toLowerCase();
					aa.re=new RegExp("("+regex_decode(s1[j])+")", "i" );
					qarr.push(aa);
				}
				
				var s="<table width=100%>";
				var k=0;
				var info,city,country,flag,s3;
				for (var id in g_city){
					info=g_city[id];					
					city=info.city.toLowerCase();
					country=info.country.toLowerCase();
					flag=true;
					for(var i = 0; i <= qarr.length-1; i++){
						if (city.indexOf(qarr[i].word)<0 && country.indexOf(qarr[i].word)<0){
							flag=false;
						}
					}
					if (!flag) continue;
					
					s3=info.city;
					if (info.state) s3+=", "+info.state;
					if (info.country) s3+=", "+info.country;
					for (var  j= 0; j < qarr.length; j++) {
						s3=s3.replace(qarr[j].re, function(str,p1){
							return '<b>'+p1+'</b>';
						});					
					}
					if(info.tz){
						var tz_offset=parseFloat(info.tz);
						s3+=" (GMT "+((tz_offset>=0) ? "+" : "") + Math.floor(tz_offset) + ":" + fillnumber((tz_offset - Math.floor(tz_offset))*60) + ")";
					}
					s+="<tr id='findcity_"+k+"' cityid='"+id+"' style='cursor:pointer;' onmousedown='findcity_onmousedown(this)' onmouseover='findcity_onmouseover(this)' onmouseout='findcity_onmouseout(this)'><td>"+s3;
					k++;
					if (k>=12) break;
				}
				s+="</table>";
				if (k==0){
					a.style.display="none";
					return;
				}

				a.innerHTML=s;
				a.style.display="";			
				var c=getOffset(obj);
				var x=c.left;
				var y=c.top+obj.offsetHeight+1;
				a.style.left=x+"px";
				a.style.top=y+"px";
				a.style.width=(obj.offsetWidth-50)+"px";
			},100);
		}
	}
}
	        
            $.jQTouch({
                icon: 'icon.png',
                startupScreen: 'img/startup.png'
            });
            $(function(){
                function addClock(cityid, issave){
					var info=g_city[cityid];
					if (!info) return;

					var tz_offset=0;
					var label=info.city;
					if(label && label.length>16) label=label.substr(0,16)+"..";
					if (info){
						tz_offset=parseFloat(info.tz);
						var localTime = new Date();
						var ms = localTime.getTime() + (tz_offset*60+localTime.getTimezoneOffset()) * 60000;					
						/*if(info.DST[0]==-1 || info.DST[1]==-1){
							console.log(info);
						}*/
						if (info.DST && info.DST[0]!=-1 && info.DST[1]!=-1) {
						    var dstBegin = info.DST[0];
							var dstEnd = info.DST[1];

							var beginTime = new Date();
							var year = beginTime.getFullYear();
							var dstBeginArr = dstBegin.split('/');
							beginTime.setFullYear(year, dstBeginArr[0]-1, dstBeginArr[1]);
							beginTime.setHours(dstBeginArr[2], dstBeginArr[3], 0, 0);
							var dstEndArr = dstEnd.split('/');
							var endTime = new Date();
							endTime.setFullYear(year, dstEndArr[0]-1, dstEndArr[1]);
							endTime.setHours(dstEndArr[2], dstEndArr[3], 0, 0);

							if ((endTime > beginTime) ? (ms>=beginTime && ms<endTime) : (ms>=beginTime || ms<endTime)) {
								tz_offset=tz_offset+1;
							}							
						}
					}

                    var html = '';
                    html += '<div>'
                    html +=     '<div class="clock">'
                    html +=         '<div class="hour"></div>'
                    html +=         '<div class="min"></div>'
                    html +=         '<div class="sec"></div>'
                    html +=     '</div>'
                    html +=     '<div class="city">GMT</div>'
                    html +=     '<div class="time">Time</div>'
                    html += '</div>'
                    var insert = $(html);
					
					var a=insert.data('tz_offset', tz_offset).find('.city').html("<a href='#' onclick='return proc_remove(this);' class='button2' title=\""+proc_get_i18n("msg_deletelist","Delete from list")+"\" data='[msg_deletelist]'>Del</a>&nbsp;"+"<a href='#' onclick='return proc_change_weather(this);' title=\""+proc_get_i18n("msg_weather","Weather")+", "+proc_get_i18n("msg_map","Map")+"\" data='[msg_weather], [msg_map]' style='color:black;text-decoration:none' cityid='"+cityid+"'>"+label+"</a>").end();	
                    $('#clocks').append(a);			
					var b=a.get(0);				
					
					b.id=get_uniq_id((new Date()).getTime());
					b.setAttribute("_cityid",cityid);
					b.setAttribute("_tz_offset",tz_offset);
					b.draggable=true;
					b.ondragstart=clock_ondragstart;
					b.ondragover=clock_ondragover;
					b.ondrop=clock_ondrop;
					if (iswebkit && !ischrome) b.ondragend=clock_ondragend;

					if (issave) proc_saveall();
                }                
                function updateClocks(){
                    var localTime = new Date();
                    $('#clocks > div').each(function(){
						var tz_offset = $(this).data('tz_offset');
						if (!tz_offset) tz_offset=0;
						var ms = localTime.getTime() + (tz_offset*60+localTime.getTimezoneOffset()) * 60000;
						                        
                        var time = new Date(ms);
                        var hour = time.getHours();
                        var minute = time.getMinutes();
                        var second = time.getSeconds();
                        var $el = $(this);
                        var ampm = 'AM';
                        var nicehour = hour;
						var flag=_getid("c_12hour").checked;
                        if (hour > 12 ) {
                            if(flag) nicehour = hour - 12;
                            ampm = 'PM';
                        } else if ( hour == 0 ) {
                            if(flag) nicehour = 12;
                        }
						
						if (ischrome || iswebkit){
	                        $('.hour', $el).css('-webkit-transform', 'rotate(' + ( hour * 30 + (minute/2) ) + 'deg)');
		                    $('.min', $el).css('-webkit-transform', 'rotate(' + ( minute * 6 ) + 'deg)');
			                $('.sec', $el).css('-webkit-transform', 'rotate(' + ( second * 6 ) + 'deg)');
						}else if(ismsie){
							$('.hour', $el).css('-ms-transform', 'rotate(' + ( hour * 30 + (minute/2) ) + 'deg)');
	                        $('.min', $el).css('-ms-transform', 'rotate(' + ( minute * 6 ) + 'deg)');
		                    $('.sec', $el).css('-ms-transform', 'rotate(' + ( second * 6 ) + 'deg)');
							$('.hour', $el).css('transform', 'rotate(' + ( hour * 30 + (minute/2) ) + 'deg)');
	                        $('.min', $el).css('transform', 'rotate(' + ( minute * 6 ) + 'deg)');
		                    $('.sec', $el).css('transform', 'rotate(' + ( second * 6 ) + 'deg)');
							$('.hour', $el).css('-sand-transform', 'rotate(' + ( hour * 30 + (minute/2) ) + 'deg)');
	                        $('.min', $el).css('-sand-transform', 'rotate(' + ( minute * 6 ) + 'deg)');
		                    $('.sec', $el).css('-sand-transform', 'rotate(' + ( second * 6 ) + 'deg)');
						}else{
							$('.hour', $el).css('-moz-transform', 'rotate(' + ( hour * 30 + (minute/2) ) + 'deg)');
	                        $('.min', $el).css('-moz-transform', 'rotate(' + ( minute * 6 ) + 'deg)');
		                    $('.sec', $el).css('-moz-transform', 'rotate(' + ( second * 6 ) + 'deg)');
							$('.hour', $el).css('transform', 'rotate(' + ( hour * 30 + (minute/2) ) + 'deg)');
	                        $('.min', $el).css('transform', 'rotate(' + ( minute * 6 ) + 'deg)');
		                    $('.sec', $el).css('transform', 'rotate(' + ( second * 6 ) + 'deg)');
						}

						var s=fillnumber(nicehour)+ ':' +fillnumber(minute)+ ':' +fillnumber(second)+ ' ' +ampm+', '+time.getFullYear()+'-'+fillnumber(time.getMonth()+1)+'-'+fillnumber(time.getDate());	
						s=s+"<br><font style='font-size:12px'>(GMT "+((tz_offset>=0) ? "+" : "") + Math.floor(tz_offset) + ":" + fillnumber((tz_offset - Math.floor(tz_offset))*60) + ")</font>";

                        $('.time', this).html(s);
                    });
                }
                /*$('#time').submit(function(){
                	var a=_getid("timezone");
                	var s1=a.value;
					if (s1==""){
						alert("Please select city name.");
						return;
					}
                	addClock(s1,true);					                	
                    
                    $('input').blur();
                    $('#add .cancel').click();
                    //this.reset();
					
					proc_change();
                    return false;
                });*/
				
				_getid("time").onsubmit=function(){
                	var a=_getid("timezone");
                	var s1=a.value;
					if (s1==""){
						alert("Please select city name.");
						return false;
					}
                	addClock(s1,true);					                	

					proc_cancel_click();

					proc_change();
					return false;
				}
				
				var flag=false;
				if (window.localStorage && window.JSON){
					var s=getstorage("c_worldclock_data"); 
					if (s){
						var a=[];
						try{
							a=JSON.parse(s);
						}catch(err){
							a=[];
						}
						for(var i = 0; i <= a.length-1; i++){						
							if (a[i].cityid!=null){
								flag=true;
								addClock(a[i].cityid);
							}
						}
					}
				}

				if (!flag){
	                addClock(179);
		            addClock(137);                
	                addClock(136);
		            addClock(53);                					
					addClock(37);                
					///addClock(166);                
					addClock(776);              
					addClock(237);                
					addClock(248);
				}
                updateClocks();
                setInterval(updateClocks, 1000);
				proc_change();
            });

function proc_cancel_click(){
	var a=_getid("home");
	$(a).addClass('current');
	var a=_getid("add");
	$(a).removeClass('current');
}

function proc_addclock_click(){
	if (_getid("time").onsubmit)
		_getid("time").onsubmit();
}
function c_12hour_onclick(){
	if(_getid("c_12hour").checked) 
		setstorage("c_12hour","1"); 
	else 
		setstorage("c_12hour",""); 
}