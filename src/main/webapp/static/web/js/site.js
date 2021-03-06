/*! LAB.js (LABjs::Loading And Blocking JavaScript)
    v2.0.3 (c) Kyle Simpson
    MIT License
*/
(function(r,h) {
	var v=r.$LAB,k="UseLocalXHR",q="AlwaysPreserveOrder",n="AllowDuplicates",m="CacheBust",l="Debug",e="BasePath",s=/^[^?#]*\//.exec(location.href)[0],C=/^\w+\:\/\/\/?[^\/]+/.exec(s)[0],f=document.head||document.getElementsByTagName("head"),i=(r.opera&&Object.prototype.toString.call(r.opera)=="[object Opera]")||("MozAppearance" in document.documentElement.style),c=function() {
	},o=c,A=document.createElement("script"),a=typeof A.preload=="boolean",x=a||(A.readyState&&A.readyState=="uninitialized"),y=!x&&A.async===true,z=!x&&!y&&!i;
	if(r.console&&r.console.log) {
	if(!r.console.error) {
	r.console.error=r.console.log
}
c=function(D) {
	r.console.log(D)
}
;o=function(E,D) {
	r.console.error(E,D)
}
}function u(D) {
	return Object.prototype.toString.call(D)=="[object Function]"
}
function B(D) {
	return Object.prototype.toString.call(D)=="[object Array]"
}
function g(F,E) {
	var D=/^\w+\:\/\//;
	if(/^\/\/\/?/.test(F)) {
	F=location.protocol+F
}
else {
	if(!D.test(F)&&F.charAt(0)!="/") {
	F=(E||"")+F
}
}return D.test(F)?F:((F.charAt(0)=="/"?C:s)+F)}function j(E,F) {
	for(var D in E) {
	if(E.hasOwnProperty(D)) {
	F[D]=E[D]
}
}return F}function b(E) {
	var F=false;
	for(var D=0;
	D<E.scripts.length;
	D++) {
	if(E.scripts[D].ready&&E.scripts[D].exec_trigger) {
	F=true;
	E.scripts[D].exec_trigger();
	E.scripts[D].exec_trigger=null
}
}return F}function d(F,E,D,G) {
	F.onload=F.onreadystatechange=function() {
	if((F.readyState&&F.readyState!="complete"&&F.readyState!="loaded")||E[D]) {
	return
}
F.onload=F.onreadystatechange=null;
	G()}}function w(D) {
	D.ready=D.finished=true;
	for(var E=0;
	E<D.finished_listeners.length;
	E++) {
	D.finished_listeners[E]()
}
D.ready_listeners=[];
	D.finished_listeners=[]}function t(F,G,E,H,D) {
	setTimeout(function() {
	var I,K=G.real_src,J;
	if("item" in f) {
	if(!f[0]) {
	setTimeout(arguments.callee,25);
	return
}
f=f[0]}I=document.createElement("script");
	if(G.type) {
	I.type=G.type
}
if(G.charset) {
	I.charset=G.charset
}
if(D) {
	if(x) {
	if(F[l]) {
	c("start script preload:"+K)
}
E.elem=I;
	if(a) {
	I.preload=true;
	I.onpreload=H
}
else {
	I.onreadystatechange=function() {
	if(I.readyState=="loaded") {
	H()
}
}}I.src=K}else {
	if(D&&K.indexOf(C)==0&&F[k]) {
	J=new XMLHttpRequest();
	if(F[l]) {
	c("start script preload (xhr):"+K)
}
J.onreadystatechange=function() {
	if(J.readyState==4) {
	J.onreadystatechange=function() {
	};
	E.text=J.responseText+"\n//@ sourceURL="+K;
	H()
}
};
	J.open("GET",K);
	J.send()}else {
	if(F[l]) {
	c("start script preload (cache):"+K)
}
I.type="text/cache-script";
	d(I,E,"ready",function() {
	f.removeChild(I);
	H()
}
);
	I.src=K;
	f.insertBefore(I,f.firstChild)}}}else {
	if(y) {
	if(F[l]) {
	c("start script load (ordered async):"+K)
}
I.async=false;
	d(I,E,"finished",H);
	I.src=K;
	f.insertBefore(I,f.firstChild)}else {
	if(F[l]) {
	c("start script load:"+K)
}
d(I,E,"finished",H);
	I.src=K;
	f.insertBefore(I,f.firstChild)}}},0)}function p() {
	var F= {
	},K=x||z,D=[],E= {
	},H;
	F[k]=true;
	F[q]=false;
	F[n]=false;
	F[m]=false;
	F[l]=false;
	F[e]="";
	function J(N,P,M) {
	var L;
	function O() {
	if(L!=null) {
	L=null;
	w(M)
}
}if(E[P.src].finished) {
	return
}
if(!N[n]) {
	E[P.src].finished=true
}
L=M.elem||document.createElement("script");
	if(P.type) {
	L.type=P.type
}
if(P.charset) {
	L.charset=P.charset
}
d(L,M,"finished",O);
	if(M.elem) {
	M.elem=null
}
else {
	if(M.text) {
	L.onload=L.onreadystatechange=null;
	L.text=M.text
}
else {
	L.src=P.real_src
}
}f.insertBefore(L,f.firstChild);
	if(M.text) {
	O()
}
}function G(N,R,Q,L) {
	var M,P,O=function() {
	R.ready_cb(R,function() {
	J(N,R,M)
}
)},S=function() {
	R.finished_cb(R,Q)
}
;R.src=g(R.src,N[e]);
	R.real_src=R.src+(N[m]?((/\?.*$/.test(R.src)?"&_":"?_")+~~(Math.random()*1000000000)+"="):"");
	if(!E[R.src]) {
	E[R.src]= {
	items:[],finished:false
}
}P=E[R.src].items;
	if(N[n]||P.length==0) {
	M=P[P.length]= {
	ready:false,finished:false,ready_listeners:[O],finished_listeners:[S]
}
;t(N,R,M,((L)?function() {
	M.ready=true;
	for(var T=0;
	T<M.ready_listeners.length;
	T++) {
	M.ready_listeners[T]()
}
M.ready_listeners=[]}:function() {
	w(M)
}
),L)}else {
	M=P[0];
	if(M.finished) {
	S()
}
else {
	M.finished_listeners.push(S)
}
}}function I() {
	var O,S=j(F {
	}),L=[],N=0,P=false,R;
	function U(W,V) {
	if(S[l]) {
	c("script preload finished:"+W.real_src)
}
W.ready=true;
	W.exec_trigger=V;
	M()}function T(X,W) {
	if(S[l]) {
	c("script execution finished:"+X.real_src)
}
X.ready=X.finished=true;
	X.exec_trigger=null;
	for(var V=0;
	V<W.scripts.length;
	V++) {
	if(!W.scripts[V].finished) {
	return
}
}W.finished=true;
	M()}function M() {
	while(N<L.length) {
	if(u(L[N])) {
	if(S[l]) {
	c("$LAB.wait() executing:"+L[N])
}
try {
	L[N++]()
}
catch(V) {
	if(S[l]) {
	o("$LAB.wait() error caught:",V)
}
}continue}else {
	if(!L[N].finished) {
	if(b(L[N])) {
	continue
}
break}}N++}if(N==L.length) {
	P=false;
	R=false
}
}function Q() {
	if(!R||!R.scripts) {
	L.push(R= {
	scripts:[],finished:true
}
)}}O= {
	script:function() {
	for(var V=0;
	V<arguments.length;
	V++) {
	(function(Z,X) {
	var Y;
	if(!B(Z)) {
	X=[Z]
}
for(var W=0;
	W<X.length;
	W++) {
	Q();
	Z=X[W];
	if(u(Z)) {
	Z=Z()
}
if(!Z) {
	continue
}
if(B(Z)) {
	Y=[].slice.call(Z);
	Y.unshift(W,1);
	[].splice.apply(X,Y);
	W--;
	continue
}
if(typeof Z=="string") {
	Z= {
	src:Z
}
}Z=j(Z {
	ready:false,ready_cb:U,finished:false,finished_cb:T
}
);
	R.finished=false;
	R.scripts.push(Z);
	G(S,Z,R,(K&&P));
	P=true;
	if(S[q]) {
	O.wait()
}
}})(arguments[V],arguments[V])}return O},wait:function() {
	if(arguments.length>0) {
	for(var V=0;
	V<arguments.length;
	V++) {
	L.push(arguments[V])
}
R=L[L.length-1]}else {
	R=false
}
M();
	return O}};
	return {
	script:O.script,wait:O.wait,setOptions:function(V) {
	j(V,S);
	return O
}
}}H= {
	setGlobalDefaults:function(L) {
	j(L,F);
	return H
}
,setOptions:function() {
	return I().setOptions.apply(null,arguments)
}
,script:function() {
	return I().script.apply(null,arguments)
}
,wait:function() {
	return I().wait.apply(null,arguments)
}
,queueScript:function() {
	D[D.length]= {
	type:"script",args:[].slice.call(arguments)
}
;return H},queueWait:function() {
	D[D.length]= {
	type:"wait",args:[].slice.call(arguments)
}
;return H},runQueue:function() {
	var N=H,L=D.length,M=L,O;
	for(;
	--M>=0;
	) {
	O=D.shift();
	N=N[O.type].apply(null,O.args)
}
return N},noConflict:function() {
	r.$LAB=v;
	return H
}
,sandbox:function() {
	return p()
}
};
	return H}r.$LAB=p();
	(function(F,D,E) {
	if(document.readyState==null&&document[F]) {
	document.readyState="loading";
	document[F](D,E=function() {
	document.removeEventListener(D,E,false);
	document.readyState="complete"
}
,false)}})("addEventListener","DOMContentLoaded")})(this);
	/*!
 * Site.js
 * URL:http://www.faisco.com
 * Only for Guest mode
 * Sort as
 * 		Utils/ModuleFunction/Other Global InitFunction
 * Sort time @2011-10-22
 * Partition time @2012-05-16
 */
if(typeof Site=="undefined") {
	Site= {
	}
}
Site.genAjaxUrl=function(b) {
	var a="";
	if(document.location.pathname.indexOf("/manage/")>=0) {
		a="../ajax/"
	}
	else {
		a="ajax/"
	}
	return a+b
};
Site.showMenu=function(n) {
	var r=n.id;
	if(Fai.isNull(r)) {
	r=""
}
var p=n.host;
	var m=0;
	if(!Fai.isNull(n.mode)) {
	m=n.mode
}
if(Fai.isNull(n.fixpos)) {
	n.fixpos=true
}
var k=n.rulerObj;
	var f=n.navSysClass;
	if(Fai.isNull(f)) {
	f=""
}
var e=0;
	if(!Fai.isNull(n.closeMode)) {
	e=n.closeMode
}
var j=0;
	var q=0;
	if(m==1) {
	j=p.offset().left+p.width();
	q=p.offset().top
}
else {
	j=p.offset().left;
	q=p.offset().top+p.height()
}
var c=$("#g_menu"+r);
	if(c.length!=0) {
	if(e==0) {
	c.attr("_mouseIn",1);
	return c
}
else {
	c.attr("_mouseIn",0);
	Site.hideMenu();
	return null
}
}$(".g_menu").each(function() {
	$(this).remove()
}
);
	var B=n.data;
	if(n.data==null||n.data=="") {
	return null
}
c=$("<div id='g_menu"+r+"' tabindex='0' hidefocus='true' class='g_menu "+n.cls+" "+(n.clsIndex?n.cls+"Index"+n.clsIndex:"")+" "+f+"' style='display:block;
	outline:none;
	'></div>");
	if(typeof n.container==="string") {
	var l=$("#g_menu"+r+"Container");
	if(l.length<1) {
	l=$(n.container);
	l.attr("id","g_menu"+r+"Container")
}
l.appendTo($("body"));
	c.appendTo(l)}else {
	c.appendTo($("body"))
}
var u=$("<div class='content contentLayer1'></div>");
	u.appendTo(c);
	Site.addMenuItem(B,u,n);
	if(n.fixpos) {
	if(q+c.height()+20>$(document).height()) {
	q=p.offset().top-c.height()
}
}c.css("left",j-Fai.getCssInt(u,"border-left-width")+"px");
	c.css("top",q+"px");
	if(e==0) {
	c.mouseleave(function() {
	c.attr("_mouseIn",0);
	setTimeout(function() {
	Site.hideMenu()
}
,100)});
	c.mouseover(function() {
	c.attr("_mouseIn",1)
}
);
	c.click(function() {
	c.attr("_mouseIn",0);
	Site.hideMenu()
}
);
	p.mouseleave(function() {
	c.attr("_mouseIn",0);
	setTimeout(function() {
	Site.hideMenu()
}
,100)});
	p.mouseover(function() {
	c.attr("_mouseIn",1)
}
)}else {
	p.mousedown(function() {
	c.attr("_mouseIn",2)
}
);
	c.bind("blur",function() {
	if(c.attr("_mouseIn")!=2) {
	c.attr("_mouseIn",0);
	setTimeout(function() {
	Site.hideMenu()
}
,100)}});
	c.focus()}if(typeof Site.g_bindMenuMousewheel=="undefined") {
	Site.g_bindMenuMousewheel=1;
	$("body").bind("mousewheel",function() {
	$("#g_menu").remove()
}
)}c.attr("_mouseIn",1);
	c.slideDown(200);
	Site.calcMenuSize(c,n);
	var s=$("#g_menu"+r+">div.content>table>tbody>tr>td.center>table.item");
	var w=$("#g_menu"+r);
	var C=(w.outerWidth()-w.width())+(w.find(".content").outerWidth()-w.find(".content").width())+(w.find(".content .middle").outerWidth()-w.find(".content .middle").width())+(w.find(".content .middle .left").outerWidth()-w.find(".content .middle .right").outerWidth())+(w.find(".content .middle .center").outerWidth()-w.find(".content .middle .center").width());
	var a=s.first().css("clear");
	var b=s.first().outerWidth();
	var i=s.length;
	if(a=="none") {
	if(i>1&&b>0) {
	var y=b*i;
	var v=document.documentElement.clientWidth;
	var t=w.offset().left;
	var h=w.offset().right;
	var A=w.width();
	var d=p.offset().left;
	var g=k.outerWidth();
	var x=k.offset().left;
	var o=x+g;
	if(d>v/2) {
	if(y<v&&y>v/2) {
	var z=o-y;
	w.offset( {
	left:z-C
}
);
	w.find(".content>.middle").width("100%")}if(y<v&&y<v/2&&(o-t)<y) {
	var z=o-y;
	w.offset( {
	left:z-C
}
);
	w.find(".content>.middle").width("100%")}if(y>v) {
	if(v<A) {
	w.offset( {
	left:0
}
);
	w.find(".content>.middle").width("100%")}else {
	w.offset( {
	left:x
}
);
	w.find(".content>.middle").width("100%")}}}else {
	if(y<v&&(v-d)<y) {
	var z=v-y;
	w.offset( {
	left:z-C
}
);
	w.find(".content>.middle").width("100%")}if(y<v&&(o-t)<y) {
	var z=o-y;
	w.offset( {
	left:z-C
}
);
	w.find(".content>.middle").width("100%")}if(y>v) {
	if(v<A) {
	w.offset( {
	left:0
}
);
	w.find(".content>.middle").width("100%")}else {
	w.offset( {
	left:x
}
);
	w.find(".content>.middle").width("100%")}}}}}return c};
	Site.addMenuItem=function(s,b,h) {
	if(s.length<=0) {
	return
}
var d=["<table class='top' cellpadding='0' cellspacing='0'><tr><td class='left'></td><td class='center'></td><td class='right'></td></tr></table>","<table class='middle' cellpadding='0' cellspacing='0'><tr><td class='left'></td><td class='center'></td><td class='right'></td></tr></table>","<table class='bottom' cellpadding='0' cellspacing='0'><tr><td class='left'></td><td class='center'></td><td class='right'></td></tr></table>"];
	var m=$(d.join(""));
	m.appendTo(b);
	m=m.parent().find(".middle .center");
	for(var n=0;
	n<s.length;
	++n) {
	var p=s[n];
	var f=p.sub;
	var o=p.href;
	var t=p.onclick;
	var r=p.target;
	var e=p.disable;
	var c="";
	if(!o&&!t) {
	o="";
	t=""
}
else {
	if(!o) {
	o=" href='javascript:;
	'"
}
else {
	if(e) {
	o=""
}
else {
	o=' href="'+o+'" style="cursor:pointer;
	"'
}
}if(!t) {
	t=""
}
else {
	t=' onclick="'+t+'"'
}
if(!r) {
	r=""
}
}var k=parseInt(Math.random()*100000);
	var g=[];
	var q=n+1;
	g.push("<table class='item itemIndex"+q+"' itemId='");
	g.push(k);
	g.push("' cellpadding='0' cellspacing='0'><tr><td class='itemLeft'></td><td class='itemCenter'><a hidefocus='true' ");
	g.push(o);
	g.push(t);
	g.push(r);
	if(p.title) {
	g.push(" title='"+p.title+"'")
}
g.push(">"+p.html+"</a></td><td class='itemRight'></td></tr></table>");
	var j=$(g.join(""));
	if(f) {
	j.addClass("itemPopup")
}
if(m.find(" > .subMenu").length>=1) {
	j.insertBefore(m.find(" > .subMenu").first())
}
else {
	j.appendTo(m)
}
if(f) {
	if(f.length==0) {
	}var l=$("<div class='subMenu' itemId='"+k+"'><div class='content contentLayer2'></div></div>");
	l.appendTo(m);
	var a=l.find(" > .content");
	Site.addMenuItem(f,a,h);
	l.mouseleave(function() {
	$(this).attr("_mouseIn",0);
	setTimeout(function() {
	Site.hideSubMenu()
}
,100);
	if(h.navBar==true&&Fai.isIE()) {
	var v=$("#g_menu"+h.id);
	var x=v.find(".contentLayer1");
	var i=x.outerHeight(true);
	var w=x.outerWidth(true);
	var u=x.children(".middle").first().outerWidth(true);
	v.css( {
	width:w+"px",height:i+"px"
}
);
	x.css( {
	width:u+"px"
}
)}});
	l.mouseover(function() {
	$(this).attr("_mouseIn",1)
}
);
	l.click(function() {
	$(this).attr("_mouseIn",0);
	Site.hideSubMenu()
}
)}j.hover(function() {
	var z=$(this);
	var J=null;
	$(this).parent().find(" > .subMenu").each(function(L,K) {
	if($(this).attr("itemId")==z.attr("itemId")) {
	J=$(this)
}
});
	if(J!=null&&J.length==1) {
	if(J.css("display")=="none") {
	if(J.attr("_hadShow")!=1) {
	var u=z.position().left+z.width();
	var E=z.position().top;
	if(h.fixpos) {
	var F=z.offset().top+J.height()+20-$(document).height();
	if(F>0) {
	E=E-F
}
}J.css("left",u+"px");
	J.css("top",E+"px");
	J.slideDown(200);
	Site.calcMenuSize(J,h);
	J.attr("_hadShow",1)}else {
	J.slideDown(200)
}
}J.attr("_mouseIn",1);
	if(h.navBar==true&&Fai.isIE()) {
	var i=$("#g_menu"+h.id);
	var x=i.find(".contentLayer1");
	var v=J.find(".contentLayer2");
	var I=x.outerHeight(true);
	var D=x.outerWidth(true);
	var C=x.children(".middle").first().outerWidth(true);
	var H=v.outerHeight(true);
	var w=v.outerWidth(true);
	var G=J.position().top;
	var y=(H+G)-I;
	var B=y>0?(I+y):I;
	var A=D+w;
	i.css( {
	width:A+"px",height:B+"px"
}
);
	x.css( {
	width:C+"px"
}
)}}else {
	if($(this).parents(".subMenu").length<=0) {
	if(h.navBar==true&&Fai.isIE()) {
	var i=$("#g_menu"+h.id);
	var x=i.find(".contentLayer1");
	var C=x.children(".middle").first().outerWidth(true);
	var B=x.outerHeight(true);
	var A=x.outerWidth(true);
	i.css( {
	width:A+"px",height:B+"px"
}
);
	x.css( {
	width:C+"px"
}
)}}}z.addClass("itemHover");
	z.addClass("itemHoverIndex"+(z.index()+1));
	$(".g_menu").attr("_mouseIn",1)},function() {
	var i=$(this);
	var u=null;
	$(this).parent().find(" > .subMenu").each(function() {
	if($(this).attr("itemId")==i.attr("itemId")) {
	u=$(this)
}
});
	if(u!=null&&u.length==1) {
	u.attr("_mouseIn",0);
	setTimeout(function() {
	Site.hideSubMenu()
}
,100)}else {
	i.removeClass("itemHover");
	i.removeClass("itemHoverIndex"+(i.index()+1))
}
}).click(function() {
	$(".g_menu").attr("_mouseIn",0);
	setTimeout(function() {
	Site.hideMenu()
}
,100)});
	if(h.closeMode==1) {
	j.mousedown(function() {
	$(".g_menu").attr("_mouseIn",2)
}
)}}};
	Site.calcMenuSize=function(b,a) {
	b.find(" > .content").each(function() {
	var d=$(" > .middle",this);
	var e=0;
	if(!Fai.isNull(a.minWidth)) {
	e=a.minWidth-Fai.getCssInt(d.find(".left").first(),"width")-Fai.getCssInt(d.find(".right").first(),"width")
}
var f=e;
	var c=d.find(" > tbody > tr > .center > .item");
	c.each(function() {
	if($(this).width()>e) {
	f=$(this).outerWidth();
	e=$(this).width()
}
});
	c.width(f);
	c.find(" > tbody > tr > .itemCenter").each(function() {
	var j=$(this);
	var g=j.parent().find(" > .itemLeft");
	var h=j.parent().find(" > .itemRight");
	j.css("width",(e-g.outerWidth()-h.outerWidth()-j.outerWidth()+j.width())+"px");
	var i=j.find("a");
	i.css("width",(j.width()-i.outerWidth()+i.width())+"px")
}
);
	$(" > .top",this).width(d.width());
	$(" > .bottom",this).width(d.width())})};
	Site.hideMenu=function() {
	$(".g_menu").each(function() {
	var a=$(this);
	if(a.length!=1) {
	return
}
if(a.attr("_mouseIn")==1) {
	return
}
a.remove()})};
	Site.hideSubMenu=function() {
	$(".g_menu .subMenu").each(function() {
	var a=$(this);
	if(a.length!=1) {
	return
}
if(a.attr("_mouseIn")==1) {
	return
}
a.css("display","none");
	a.parent().find(" > .item").each(function() {
	if($(this).attr("itemId")==a.attr("itemId")) {
	$(this).removeClass("itemHover")
}
})})};
	Site.popupWindow=function(a) {
	var b=true;
	if(!Fai.isNull(a.saveBeforePopup)) {
	b=a.saveBeforePopup
}
if(b&&Site.checkSaveBar(a)) {
	return
}
if($.isFunction(Site.removeAllEditLayer)) {
	Site.removeAllEditLayer()
}
Fai.popupWindow(a)};
	Site.total=function(a) {
	var e= {
	colId:-1,pdId:-1,ndId:-1
}
;var b=$.extend( {
	},e,a);
	if(b.colId==null||b.colId==""||b.colId<0) {
	b.colId=-1
}
if(b.pdId==null||b.pdId==""||b.pdId<0) {
	b.pdId=-1
}
if(b.ndId==null||b.ndId==""||b.ndId<0) {
	b.ndId=-1
}
var c="ajax/statistics_h.jsp?cmd=visited";
	var d=[];
	d.push("&colId="+b.colId);
	d.push("&pdId="+b.pdId);
	d.push("&ndId="+b.ndId);
	d.push("&browserType="+Fai.getBrowserType());
	d.push("&screenType="+Fai.getScreenType(Fai.Screen().width,Fai.Screen().height));
	d.push("&sc="+b.sc);
	d.push("&rf="+Fai.encodeUrl(b.rf));
	$.ajax( {
	url:c,type:"post",cache:false,data:d.join(""),success:function(f) {
	}
}
)};
	Site.report=function(a) {
	setTimeout(function() {
	if(window.performance) {
	var d=performance.timing;
	var l=d.fetchStart-d.navigationStart;
	var g=d.redirectEnd-d.redirectStart;
	var i=d.domainLookupStart-d.fetchStart;
	var m=d.unloadEventEnd-d.unloadEventStart;
	var b=d.domainLookupEnd-d.domainLookupStart;
	var e=d.connectEnd-d.connectStart;
	var f=d.responseEnd-d.requestStart;
	var n=d.domInteractive-d.responseEnd;
	var o=d.domComplete-d.domInteractive;
	var k=d.loadEventEnd-d.loadEventStart;
	var h=d.loadEventEnd-d.navigationStart;
	var j=[];
	j.push("&dt="+b);
	j.push("&ct="+e);
	j.push("&rt="+f);
	j.push("&wt="+n);
	j.push("&pt="+o);
	j.push("&bt="+Fai.getBrowserType());
	var c="ajax/statistics_h.jsp?cmd=report";
	$.ajax( {
	url:c,type:"post",cache:false,data:j.join(""),success:function(p) {
	}
}
)}},500)};
	Site.fileUpload2=function(e,c,f) {
	var d= {
	title:"添加文件",crossiframe:"",type:[],maxSize:1,maxUploadList:1,maxChoiceList:1,imgMode:2,imgMaxWidth:4096,imgMaxHeight:4096,netFileMode:false
}
;if(c) {
	$.extend(d,c)
}
if(d.title==="添加图片"&&d.maxSize>5) {
	d.maxSize=5
}
if(Fai.top._siteVer!="undefined"&&Fai.top._siteVer==10) {
	d.maxSize=1
}
var b=d.title;
	if(d.type.length>0) {
	if(Fai.top._siteVer!="undefined"&&Fai.top._siteVer==10) {
	b+="<span style='font-weight:400;
	'> (只能添加"+d.type.join(",")+",免费版大小不超过"+d.maxSize+"MB)</span>"
}
else {
	b+="<span style='font-weight:400;
	'> (只能添加"+d.type.join(",")+",大小不超过"+d.maxSize+"MB)</span>"
}
}else {
	b+="<span style='font-weight:400;
	'> (上传大小不超过"+d.maxSize+"MB)</span>"
}
var a= {
	title:b,frameSrcUrl:(top._siteDomain?top._siteDomain:"")+"/manage/fileUploadV2.jsp?settings="+Fai.encodeUrl($.toJSON(d))+"&ram="+Math.random()+"&crossiframe="+Fai.encodeUrl(d.crossiframe),width:660,height:480,saveBeforePopup:false,callArgs:"add",closeFunc:f
}
;if(e) {
	$(e).unbind("click").bind("click",function() {
	Site.popupWindow(a)
}
)}else {
	Site.popupWindow(a)
}
};
	Site.initIframeLoading=function(b,d,g,f) {
	var h=b+d;
	var c=Fai.top.$("#"+h).parent().width();
	var a=Fai.top.$("#"+h).parent().height();
	var e=1;
	$("#"+h).attr("src",g).load(function() {
	$("#moduleLoading"+d).hide();
	$("#refreshFrame"+d).hide();
	Fai.top.$("#"+h).parent().show();
	e=2
}
);
	if(f) {
	$("#moduleLoading"+d).show();
	Fai.top.$("#"+h).parent().hide();
	$("#refreshFrame"+d).hide()
}
else {
	setTimeout(function() {
	if(e==1) {
	var i="<div id='moduleLoading"+d+"' class='ajaxLoading2' style='width:"+c+"px;
	height:"+a+"px'></div>";
	Fai.top.$("#"+h).parent().before(i);
	Fai.top.$("#"+h).parent().hide()
}
},3000)}setTimeout(function() {
	if(e==1) {
	$("#moduleLoading"+d).hide();
	if(f) {
	$("#refreshFrame"+d).show()
}
else {
	var i="<div id='refreshFrame"+d+"' style='width:"+c+"px;
	height:"+a+"px;
	text-align:center;
	padding-top:5px;
	'><a href=\"javascript:Site.initModuleWeather('"+b+"',"+d+",'"+g+"',true);
	\">"+LS.refresh+"</a></div>";
	Fai.top.$("#"+h).parent().before(i)
}
e=3}},30000)};
	Site.logMsg=function(c) {
	if(!c) {
	return
}
var b="";
	var a=c.indexOf("&");
	if(a>=0) {
	b=c.slice(a,c.length-1)
}
$.ajax( {
	type:"GET",url:"/static/web/ajax/log_h.jsp?cmd=log&msg="+Fai.encodeUrl(c),data:b
}
)};
	Site.logDog=function(b,a) {
	$.ajax( {
	type:"GET",url:"/static/web/ajax/log_h.jsp?cmd=dog&dogId="+Fai.encodeUrl(b)+"&dogSrc="+Fai.encodeUrl(a)
}
)};
	Site.logProf=function(b,a) {
	$.ajax( {
	type:"GET",url:"/static/web/ajax/log_h.jsp?cmd=prof&profId="+Fai.encodeUrl(b)+"&profVal="+Fai.encodeUrl(a)
}
)};
	Site.popupBox=function(p) {
	var f= {
	boxId:0,title:"",htmlContent:"",width:500,height:"",boxName:"",opacity:"0.5",displayBg:true,autoClose:0
}
;f=$.extend(f,p);
	var b=parseInt(f.boxId);
	if(b==0||b==null) {
	b=parseInt(Math.random()*10000)
}
if(f.displayBg) {
	Fai.bg(b,f.opacity)
}
var n="";
	if(f.height!="") {
	n=" min-height:"+(f.height-45)+"px;
	"
}
var e=["<div id='popupBoxContent",b,"' style='width:",f.width,"px;
	",n," padding-bottom:20px;
	","' class='popupCnBg'>",f.htmlContent,"</div>"];
	var i=Fai.top.document.documentElement.clientHeight;
	var d=Fai.top.$("body").scrollTop();
	if(d<=0) {
	d=Fai.top.$("html").scrollTop()
}
if(d<=0) {
	d=$(window).scrollTop()
}
var a="";
	var m="";
	if(f.boxName=="qqLogin") {
	a="style='margin-top:28px;
	'"
}
else {
	if(f.boxName=="addrInfo") {
	a="style='margin-top:21px;
	'";
	m="style='margin-top:20px;
	'"
}
else {
	if(f.boxName=="mallAmountZero") {
	a="style='height:15px;
	'";
	m="style='margin-top:10px;
	'"
}
else {
	if(f.boxName=="confirmReceipt") {
	m="style='margin-top:10px;
	'"
}
else {
	if(f.boxName=="mallBuy") {
	m="style='margin-top:10px'"
}
else {
	if(f.boxName=="memberFdPwd") {
	a="style='margin-top:20px;
	'"
}
}}}}}var l=["<div id='popupBox",b,"' class='formBox' style='width:",f.width,"px;
	",n,"left:",(Fai.top.document.documentElement.clientWidth-f.width)/2,"px;
	'>","<div class='formTLSite'><div ",a,"class='formTCSite ",f.title==""?"formMulLanSite":"","'>",f.title,"</div></div>","<div class='formMSG' style='position:relative;
	'>",e.join(""),"</div>","<a href='javascript:void(0);
	' class='formXSite popupBClose' hidefocus='true' onclick='return false;
	'",m,"></a>","</div>"];
	l=l.join("");
	var k=Fai.top.$(l).appendTo("body");
	var j=(i-f.height)/2;
	if(f.height=="") {
	j=(i-$(".popupCnBg").height())/2
}
$(k).css("top",j+d);
	var h=Fai.top.$("#popupBg"+b).outerHeight(true),g=Fai.top.$("#popupBoxContent"+b).outerHeight(true)+120,o=100-(g-h)>0?100-(g-h):0;
	if(h<g) {
	k.css("top",o+"px")
}
k.hide();
	k.fadeIn();
	function c(q) {
	return Object.prototype.toString.call(q)==="[object Function]"
}
k.ready(function() {
	k.draggable( {
	start:function() {
	Fai.top.$("body").disableSelection()
}
,handle:".formTLSite",stop:function() {
	Fai.top.$("body").enableSelection()
}
});
	k.find(".popupBClose").bind("click",function() {
	if(c(f.closeFunc)) {
	f.closeFunc()
}
Fai.top.$("#popupBg"+b).remove();
	k.remove()})});
	if(f.autoClose!=0) {
	setTimeout(function() {
	k.find(".popupBClose").click()
}
,f.autoClose)}return k};
	Site.checkEnv=function() {
	var h=$(window).width();
	h=h-17;
	var k=[];
	var d=function(n) {
	if($(n).attr("_intab")>0||$(n).attr("_inmulmcol")>0||$(n).attr("_side")==1) {
	return
}
var r=$(n).offset().left;
	var q=$(n).width();
	var u=$(n).prop("id");
	var s=false;
	if(r<0) {
	s=true
}
if(!s&&(r+q)>h) {
	s=true
}
if(s) {
	k.push(u)
}
};
	Fai.top.$(".absForms >.form").each(function(q,n) {
	d(n)
}
);
	Fai.top.$(".floatForms >.form").each(function(q,n) {
	d(n)
}
);
	var o="";
	if(k.length>0) {
	o+="--网站浮动模块位置；\n"
}
$.each(k,function(q,n) {
	$("#"+n).css("border","dashed black 5px")
}
);
	var p=$("#logoImg");
	var g=p.width();
	var m=p.offset().left;
	if(m<0||(m+g)>h) {
	o+="--网站LOGO的宽度或位置；\n"
}
var c=$("#primaryTitle");
	var b=c.width();
	var i=c.offset().left;
	if(i<0||(i+b)>h) {
	o+="--网站标题宽度或位置；\n"
}
var e=$("#nav");
	var j=e.width();
	var a=e.offset().left;
	if((a+j)>h) {
	o+="--导航栏宽度或位置。；\n"
}
else {
	e=$("#nav .navMainContent").first();
	j=e.width();
	a=e.offset().left;
	if((a+j)>h) {
	o+="--导航应用了网站宽度并且存在水平偏移。请自定义导航内容区宽度；\n"
}
}var f=$("#webContainer").width();
	if(f>h) {
	o+="--网站背景宽度；\n"
}
var l=$(".webBanner").width();
	if(l>h) {
	o+="--网站横幅宽度；\n"
}
if($("#webHeader").width()>h) {
	o+="--网站头部宽度；\n"
}
o=$.trim(o);
	if(o.length>0) {
	o="窗口宽度："+h+"；\n导致模块滚动条出现的原因：\n"+o;
	alert(o)
}
else {
	alert("没有检测到横向超出的元素。")
}
};
	Site.foldChange=function(b) {
	var a=$("#module"+b);
	a.find(".fold_h_J").mouseover(function() {
	$(this).addClass("g_hover")
}
).mouseleave(function() {
	$(this).removeClass("g_hover")
}
);
	a.find(".foldChange_J").click(function() {
	var e=$(this),d=e.parents(".fold_J"),f=d.attr("foldId"),c=$("#childrenDiv"+f+"M"+b);
	if(c.is(":visible")) {
	c.slideUp("fast");
	d.find(".fold_btn_J").removeClass("g_unfold").addClass("g_fold")
}
else {
	c.slideDown("fast");
	d.find(".fold_btn_J").removeClass("g_fold").addClass("g_unfold")
}
})};
	Site.floatTip=function(d) {
	var q= {
	moduleId:"",targetId:"",tipText:"",cusClass:"",direction:3
}
;q=$.extend(q,d);
	if(q.moduleId.length==0||q.targetId.length==0||q.tipText.length==0) {
	return
}
$(Fai.top.document).find(".J_floatTip_"+q.moduleId).remove();
	var k=Fai.isIE6()||Fai.isIE7()||Fai.isIE8();
	var t=[];
	var j="floatTip_content";
	var r="floatTip_right";
	var l="floatTip_arrow";
	var p="floatTip_left";
	var o="floatTip_"+q.moduleId+"_"+q.targetId;
	if(k) {
	j+=" floatTip_content_IE ";
	r+=" floatTip_right_IE ";
	l+=" floatTip_arrow_IE ";
	p+=" floatTip_left_IE "
}
t.push("<div id='"+o+"' class='J_floatTip_"+q.moduleId+" floatTip'>\n");
	t.push("<div class='"+l+"'></div>");
	t.push("<div class='"+r+"'></div>");
	t.push("<div class='"+p+"'></div>");
	t.push("<div class='"+j+q.cusClass+"'>"+q.tipText+"</div>");
	t.push("</div>\n");
	$(Fai.top.document).find("#g_main").append(t.join(""));
	var b=$("#"+q.moduleId);
	var s=$(b).find("#"+q.targetId);
	var a=$("#"+o);
	var h=$(".floatLeftTop").offset().top;
	var c=(Fai.top._manageMode)?$("#g_main").scrollTop():$("body").scrollTop();
	if(Fai.isIE6()) {
	c=$("#g_main").scrollTop()
}
if(c==0) {
	c=$("html").scrollTop()
}
var e=a.height();
	var m=a.width()*0.7;
	var g=s.width()*0.8;
	var f=s.height();
	var n=s.offset().left+(g-m);
	var i=s.offset().top+c-h;
	$("#"+o).show().css( {
	top:i+"px",left:n+"px","z-index":9031
}
);
	setTimeout(function() {
	if(k) {
	var u=i-e-10+(f/3);
	$("#"+o).animate( {
	top:u+"px",opacity:1,filter:"alpha(opacity=100)"
}
,300)}else {
	var u=i-e+(f/3);
	$("#"+o).css( {
	top:u+"px",opacity:1
}
)}},50);
	$(s).unbind("click").bind("click",function() {
	if($(this).hasClass("focusBg")) {
	$(this).removeClass("focusBg")
}
$("#floatTip_"+q.moduleId+"_"+q.targetId).remove()})};
	Site.floatTip_clear=function(a) {
	$(Fai.top.document).find(".J_floatTip_"+a).remove()
}
;Site.moduleSubPanel=function(j) {
	var d= {
	that:null,moduleId:null,idStr:"",clsStr:"",contentStr:""
}
;$.extend(d,j);
	if(d.that==null) {
	return
}
var a,c=$("#module"+d.moduleId),i=c.parent().attr("class"),k=c.attr("class");
	var b=["<div id='",d.idStr,"' class='",d.clsStr," g_m_s_J ",i,"' _mouseIn=1 style='display:none;
	'>","<div class='",k,"' style='zoom:0;
	margin:0;
	overflow:visible;
	position:relative;
	'>","<div class='formMiddle' style='zoom:0;
	width:auto;
	border:0;
	'>","<div class='formMiddleCenter' style='zoom:0;
	width:auto;
	margin:0;
	'>","<div class='formMiddleContent' style='",Fai.isIE6()?"_display:inline;
	":"","width:auto;
	margin:0;
	overflow:visible;
	'>",d.contentStr,"</div>","</div>","</div>","</div>","</div>"];
	a=$(b.join(""));
	a.appendTo("body");
	if(c.hasClass("formStyle76")) {
	g()
}
else {
	h()
}
function g() {
	var n=c.find(".pd_mall_G_J"),l=c.find(".p_m_cotainer_J"),m;
	n.off("mouseleave.pr").on("mouseleave.pr",function() {
	m=setTimeout(function() {
	f(d.moduleId)
}
,20)});
	a.off("mouseleave.pr").on("mouseleave.pr",function() {
	f(d.moduleId);
	if(parseInt(c.attr("_side"))===2) {
	Site.startFlutterInterval(c)
}
if(parseInt(c.attr("_side"))===1) {
	var o=c.outerWidth();
	c.animate( {
	left:-o
}
 {
	queue:false,duration:500
}
)}});
	a.off("mouseenter.pr").on("mouseenter.pr",function() {
	if(m) {
	clearTimeout(m);
	if(parseInt(c.attr("_side"))===2) {
	Site.stopFlutterInterval(c)
}
if(parseInt(c.attr("_side"))===1) {
	c.animate( {
	left:0
}
 {
	queue:false,duration:500
}
)}}})}function h() {
	a.mouseleave(function() {
	a.attr("_mouseIn",0);
	setTimeout(e,100)
}
);
	a.mouseover(function() {
	a.attr("_mouseIn",1)
}
);
	d.that.mouseleave(function() {
	a.attr("_mouseIn",0);
	setTimeout(e,100)
}
);
	d.that.mouseover(function() {
	a.attr("_mouseIn",1)
}
);
	if(parseInt(c.attr("_side"))===2) {
	a.mouseleave(function() {
	Site.startFlutterInterval(c)
}
);
	a.mouseenter(function() {
	Site.stopFlutterInterval(c)
}
)}}function f(n) {
	var m=$("#module"+n).find(".p_m_cotainer_J"),l=$(".g_m_s_J");
	l.has(".form"+n).remove();
	m.removeClass("bold p_m_hover g_border");
	m.find(".p_m_value_J").removeClass("g_stress");
	m.each(function() {
	var o=$(this);
	if(o.attr("_chd")==1) {
	o.find(".p_m_cotainerR_J").addClass("p_m_more")
}
})}function e() {
	$(".g_m_s_J").each(function() {
	var l=$(this);
	if(l.length!=1) {
	return
}
if(l.attr("_mouseIn")==1) {
	return
}
l.remove()})}return a};
	Site.mobiPlatform=function(b) {
	if(!Fai.top._siteDemo) {
	return
}
var g=[],h=false,r="mobiPlatform",m=document.domain,o= {
	},d= {
	},l= {
	w:0,h:0
}
,s=Fai.top.$("body"),x=Fai.getScrollWidth(),j=400,n=600,c=$.cookie("mobiPlatformBg" {
	domain:m,path:"/"
}
)||0,y=parseInt($.cookie("mobiPlatformIconFlag" {
	domain:m,path:"/"
}
))||0,v="display:none;
	",q="",p="",f,w,k,a,u,t;
	var z= {
	refresh:false
}
;$.extend(z,b);
	if(Fai.isIE) {
	if(Fai.isIE6()||Fai.isIE7()||Fai.isIE8()) {
	h=true
}
}if(y>0) {
	v="";
	q="display:none;
	";p=y==1?"mobiPlatformIcon_right":"mobiPlatformIcon_left"
}
o.big= {
	};
	o.big.className="mobiPlatform_big";
	o.big.w=265;
	o.big.h=490;
	o.big.cw=295;
	o.big.ch=592;
	o.small= {
	};
	o.small.className="mobiPlatform_small";
	o.small.w=265;
	o.small.h=400;
	o.small.cw=291;
	o.small.ch=483;
	l=Site.mobiPlatform.getWindowSize();
	if(l.h<=800) {
	d=o.small
}
else {
	d=o.big
}
Site.mobiPlatform.nowSize=d;
	if(s.children("#mobiPlatform").length<1) {
	g.push("<div id='mobiPlatform' class='mobiPlatform mobiPlatform-hide "+d.className+"' direction='0' moved='0' style='"+q+"'>");
	g.push("	<div class='J_innerCover mp-innerCover' style='display:none;
	'></div>");
	g.push("	<div class='J_innerIframe mp-innerIframe"+(h?" mp-innerIframe2":"")+"'>");
	if(!h) {
	g.push("		<div class='J_loading mp-loading'>");
	g.push("			<div class='mp-loading-icon mp-loading-iconAction'></div>");
	g.push("		</div>")
}
else {
	g.push("	<div class='mp-updateBtnContainer'>");
	g.push("		<a href='https://www.baidu.com/s?wd=chrome' target='_blank' class='mp-updateBtn'></a>");
	g.push("	</div>")
}
g.push("	</div>");
	g.push("	<a href='javascript:;
	' hidefocus='true' title='隐藏' class='J_closeBtn mp-closeBtn' style='display:none;
	'></a>");
	g.push("	<div class='J_hoverTip mp-hoverTip' style='display:none;
	'></div>");
	g.push("</div>");
	g.push("<div id='mobiPlatformIcon' class='mobiPlatformIcon "+p+"' style='"+v+"'>");
	g.push("	<a href='javascript:;
	' class='mobiPlatformIcon-handle' onclick='Site.mobiPlatform();
	return false;
	' hidefocus='true'></a>");
	g.push("</div>");
	Fai.top.$("body").append(g.join(""));
	f=s.children("#mobiPlatform");
	w=s.children("#mobiPlatformIcon");
	a=f.find(".J_closeBtn");
	u=f.find(".J_hoverTip");
	f.draggable( {
	scroll:false,cursor:"move",distance:10,containment:"parent",cancel:".J_innerCover",start:function(A,B) {
	f.find(".J_innerCover").show()
}
,stop:function(A,G) {
	f.find(".J_innerCover").hide();
	f.attr("moved","1");
	if(!c) {
	c=1;
	$.cookie("mobiPlatformBg",1 {
	expires:365,domain:m,path:"/"
}
)}d=Site.mobiPlatform.nowSize;
	l=Site.mobiPlatform.getWindowSize();
	var F=true,H= {
	x:1,y:1
}
,B=4,E=s.children(".floatLeftTop"),L=E.offset(),D=~~(E.css("top").replace("px","")),K=l.h-d.ch,C=K-(G.offset.top-(L.top-D)),J=l.w-d.cw,I=J-(G.offset.left-L.left);
	if(I<(J/2)) {
	I-=x;
	H.x=1
}
else {
	H.x=0
}
if(C<(K/2)) {
	H.y=1
}
else {
	H.y=0
}
if(!(I<J&&I>B)) {
	F=false
}
if(!(C<K&&C>B)) {
	F=false
}
if(!F) {
	if(H.y==1) {
	if(C<=B) {
	f.attr("direction","4")
}
}else {
	if(C>=K) {
	f.attr("direction","3")
}
}if(H.x==1) {
	if(I<=B) {
	if(f.attr("direction")==3) {
	f.css( {
	bottom:"auto",top:0
}
)}else {
	if(f.attr("direction")==4) {
	f.css( {
	bottom:0,top:"auto"
}
)}}f.attr("direction","2").css( {
	right:0,left:"auto"
}
).animate( {
	right:(-d.cw)+"px"
}
,j,function() {
	w.removeClass("mobiPlatformIcon_left").addClass("mobiPlatformIcon_right").fadeIn();
	f.hide();
	$.cookie("mobiPlatformIconFlag",1 {
	expires:365,domain:m,path:"/"
}
)})}}else {
	if(I>=J) {
	if(f.attr("direction")==3) {
	f.css( {
	bottom:"auto",top:0
}
)}else {
	if(f.attr("direction")==4) {
	f.css( {
	bottom:0,top:"auto"
}
)}}f.attr("direction","1").css( {
	right:"auto",left:0
}
).animate( {
	left:(-d.cw)+"px"
}
,j,function() {
	w.removeClass("mobiPlatformIcon_right").addClass("mobiPlatformIcon_left").fadeIn();
	f.hide();
	$.cookie("mobiPlatformIconFlag",2 {
	expires:365,domain:m,path:"/"
}
)})}}if(f.attr("direction")==3) {
	f.animate( {
	bottom:"auto",top:(-d.ch)+"px"
}
,n,function() {
	w.removeClass("mobiPlatformIcon_left").addClass("mobiPlatformIcon_right").fadeIn();
	f.hide();
	$.cookie("mobiPlatformIconFlag",1 {
	expires:365,domain:m,path:"/"
}
)})}else {
	if(f.attr("direction")==4) {
	f.animate( {
	top:(K+d.ch)+"px",bottom:"auto"
}
,n,function() {
	w.removeClass("mobiPlatformIcon_left").addClass("mobiPlatformIcon_right").fadeIn();
	f.hide();
	$.cookie("mobiPlatformIconFlag",1 {
	expires:365,domain:m,path:"/"
}
)})}}}}});
	if(!h) {
	var e=document.createElement("iframe"),i=f.find(".J_innerIframe");
	e.style.width=d.w+"px";
	e.style.height=d.h+"px";
	e.style.border="none";
	e.src=Fai.top._mobiSiteDomain;
	if(e.attachEvent) {
	e.attachEvent("onload",function() {
	f.find(".J_loading").remove();
	f.removeClass("mobiPlatform-hide")
}
)}else {
	e.onload=function() {
	f.find(".J_loading").remove();
	f.removeClass("mobiPlatform-hide")
}
}i.find("iframe").remove();
	i.append(e);
	k=$(e)}else {
	f.removeClass("mobiPlatform-hide")
}
Fai.top.$(window).off("resize.mobiPlatform");
	Fai.top.$(window).on("resize.mobiPlatform",function() {
	Site.mobiPlatform( {
	refresh:true
}
)});
	a.click(function() {
	d=Site.mobiPlatform.nowSize;
	l=Site.mobiPlatform.getWindowSize();
	rangeHeight=l.h-d.ch;
	rangeWidth=l.w-d.cw;
	nowWidth=rangeWidth-f.offset().left;
	var A=0;
	var B=f.attr("direction");
	if(f.attr("moved")=="0") {
	if(B=="0") {
	A=2
}
else {
	if(B=="1") {
	A=3
}
else {
	if(B=="2") {
	A=2
}
}}}else {
	if(nowWidth<(rangeWidth/2)) {
	A=1
}
else {
	A=3
}
}if(A==1) {
	f.animate( {
	left:(rangeWidth+d.cw)+"px",right:"auto"
}
,n,function() {
	w.removeClass("mobiPlatformIcon_left").addClass("mobiPlatformIcon_right").fadeIn();
	f.attr("direction","5").hide()
}
)}else {
	if(A==2) {
	f.animate( {
	left:"auto",right:(-d.cw)+"px"
}
,n,function() {
	w.removeClass("mobiPlatformIcon_left").addClass("mobiPlatformIcon_right").fadeIn();
	f.attr("direction","5").hide()
}
)}else {
	if(A==3) {
	f.animate( {
	left:(-d.cw)+"px",right:"auto"
}
,n,function() {
	w.removeClass("mobiPlatformIcon_right").addClass("mobiPlatformIcon_left").fadeIn();
	f.attr("direction","1").hide()
}
)}}}});
	f.hover(function() {
	t=Fai.top.$("#mobiPlatformBg");
	if(t.length<1) {
	var A=[];
	A.push("<div id='mobiPlatformBg' class='popupBg' style='z-index:9032;
	opacity:0;
	' >");
	if($.browser.msie&&$.browser.version==6) {
	A.push("<iframe id='fixSelectIframe-mobiPlatform' wmode='transparent' style='filter:alpha(opacity=0);
	opacity:0;
	' class='popupBg' style='z-index:-111' src='javascript:'></iframe>")
}
else {
	A.push("</div>")
}
f.before(A.join(""));
	t=Fai.top.$("#mobiPlatformBg")}t.stop(true).show().animate( {
	opacity:0.6
}
,500);
	if(!c) {
	u.stop(true).show().animate( {
	opacity:1
}
)}else {
	u.hide()
}
},function() {
	t.stop(true).animate( {
	opacity:0
}
,500,function() {
	t.hide()
}
);
	if(!c) {
	u.stop(true).animate( {
	opacity:0
}
,400,function() {
	u.hide()
}
)}else {
	u.hide()
}
})}else {
	f=s.children("#mobiPlatform");
	w=s.children("#mobiPlatformIcon");
	if(!h) {
	k=f.find("iframe")
}
if(z.refresh) {
	f.attr("class","mobiPlatform "+d.className);
	if(!h) {
	k.css( {
	width:d.w+"px",height:d.h+"px"
}
)}}if(!z.refresh) {
	f.show();
	if(f.attr("direction")==2) {
	f.attr("moved","0").animate( {
	right:"10px"
}
,j,function() {
	w.fadeOut()
}
)}else {
	if(f.attr("direction")==1) {
	f.attr("moved","0").animate( {
	left:"10px"
}
,j,function() {
	w.fadeOut()
}
)}else {
	f.attr("direction",0).attr("moved","0").css( {
	top:"auto",left:"auto",right:(-d.cw)+"px",bottom:"10px"
}
).animate( {
	right:"10px"
}
,j,function() {
	w.fadeOut()
}
)}}$.cookie("mobiPlatformIconFlag",0 {
	expires:365,domain:m,path:"/"
}
)}}};
	(function(a) {
	a.getWindowSize=function() {
	var b= {
	w:0,h:0
}
;if(window.innerWidth&&window.innerHeight) {
	b.w=window.innerWidth;
	b.h=window.innerHeight
}
else {
	if(document.documentElement) {
	b.w=document.documentElement.clientWidth;
	b.h=document.documentElement.clientHeight
}
else {
	if(document.body.clientWidth&&document.body.clientHeight) {
	b.w=document.body.clientWidth;
	b.h=document.body.clientHeight
}
}}return b}})(Site.mobiPlatform);
	(function(a,d) {
	var c=[];
	a.functionInterface=function() {
	if(arguments.length<1) {
	throw new Error("Site.functionInterface 参数错误");
	return
}
var e=arguments[0].name,m=arguments[0].callMethod||false,g=arguments[0].prompt||false,j=arguments[0].promptMsg||"功能还在加载中，请稍候",f=arguments[0].base||Fai.top.Site,i=Array.prototype.slice.call(arguments),h=i.slice(1),k= {
	},l;
	l=b(e,f);
	if(l.success) {
	m=false;
	l.func.apply(l.func,h)
}
else {
	if(g) {
	Fai.ing(j,true)
}
}if(m) {
	k.name=e;
	k.base=f;
	k.args=h;
	c.push(k)
}
};
	a.functionInterfaceTrigger=function(h) {
	if(typeof h!=="object") {
	throw new Error("Site.functionInterfaceTrigger 参数错误");
	return
}
var l=h.name||"",k=h.base||Fai.top.Site,g=[],e,j,f,m;
	if(l.length<1) {
	return
}
for(f=0;
	f<c.length;
	f++) {
	m=c[f];
	if(m.name==l) {
	e=b(l,k);
	e.success&&e.func.apply(e.func,m.args)
}
else {
	g.push(m)
}
}c=g};
	function b(l,j) {
	var h=l.split("."),k=j,e= {
	success:true,func:function() {
	}
}
,f,g;
	for(g=0;
	g<h.length;
	g++) {
	f=h[g];
	if(f in k) {
	k=k[f]
}
else {
	e.success=false;
	return e
}
}e.func=k;
	return e}})(Site);
	Site.bindInTabSwitch=function() {
	$(".formStyle29").each(function() {
	var c=$(this).attr("id").replace("module","");
	if(Fai.top["tabModule"+c+"Switch"]) {
	$(this).find(".formTabButton").off("mouseenter.tab")
}
else {
	$(this).find(".formTabButton").off("mouseenter,tab").on("mouseenter.tab",function() {
	$(this).trigger("click")
}
)}});
	var a=new Array();
	var b=Fai.top.location.hash;
	$(".formTabButtonList").each(function() {
	$(this).find(".formTabButton").eq(0).click();
	$.each($(this).find(".formTabButton"),function(c,d) {
	var g=$(d).attr("tabModuleId");
	if(("#module"+g)===b) {
	a.push(parseInt(g));
	return false
}
var f=Fai.getUrlParam(Fai.top.location.href,"m"+g+"pageno");
	if(typeof(f)!="undefined"&&f.length>0) {
	a.push(parseInt(g))
}
})});
	$(".formTabButtonYList").each(function() {
	$(this).find(".formTabButton").eq(0).click();
	$.each($(this).find(".formTabButton"),function(c,d) {
	var g=$(d).attr("tabModuleId");
	if(("#module"+g)===b) {
	a.push(parseInt(g));
	return false
}
var f=Fai.getUrlParam(Fai.top.location.href,"m"+g+"pageno");
	if(typeof(f)!="undefined"&&f.length>0) {
	a.push(parseInt(g))
}
})});
	$.each(a,function(c,d) {
	Site.changeLiCnt(d,false,29)
}
)};
	Site.restartMarquee=function(c,b,a) {
	if(b) {
	new Function("Fai.top.changeMarquee"+c+"()")()
}
if(a==29) {
	$("#formTabCntId"+c).parent().find(".formTabCntId").each(function() {
	if($(this).attr("show")) {
	$(this).show();
	if($(this).attr("styleId")==3||$(this).attr("styleId")==16) {
	var d=$($(this).find(">div")[0]).attr("id").replace("module","");
	new Function("Fai.top.changeMarquee"+d+"()")()
}
}else {
	$(this).hide()
}
})}};
	Site.changeLiCnt=function(f,b,a) {
	var c=$("#formTabButton"+f);
	c.find(".formTabLeft").addClass("formTabLeftHover").end().find(".formTabMiddle").addClass("formTabMiddleHover").end().find(".formTabRight").addClass("formTabRightHover").end().siblings().find(".formTabLeft").removeClass("formTabLeftHover").end().find(".formTabMiddle").removeClass("formTabMiddleHover").end().find(".formTabRight").removeClass("formTabRightHover").end();
	c.addClass("formTabButtonHover").siblings().removeClass("formTabButtonHover");
	$("#formTabCntId"+f).parent().find(".formTabCntId").each(function() {
	if($(this).attr("show")) {
	$(this).removeAttr("show")
}
});
	var e=$("#formTabCntId"+f);
	e.prependTo(e.parent());
	e.attr("show",true);
	Site.restartMarquee(f,b,a);
	Site.triggerGobalEvent("site_moduleTabSwitch",f);
	var d=$("#module"+f);
	if(d.hasClass("formStyle83")&&!!!d.attr("fk_fixEffect")) {
	Site.adjustPhotoCardImgSize(d);
	d.attr("fk_fixEffect",1)
}
};
	Site.initTabYStyle=function(d) {
	var c=Fai.top.$("#module"+d),a=c.find(".titleTable");
	if(Fai.isIE6()) {
	var e=c.find(".formMiddleCenter"+d).width(),b=a.width();
	c.find("#formTabContent"+d).css( {
	width:(e-b-40)+"px","float":"left"
}
)}};
	Site.callMusicUnload=function(a,c) {
	var b=Site.callMusicPosition(a);
	$.cookie(c,b)
}
;Site.callMusicPlayButton=function(e,d,f,c) {
	$("#"+e).bind("click",function() {
	var j=$.cookie(c);
	var i=$(this);
	var h=$("#"+e).attr("bgMusicStatus");
	if(h!=j) {
	$.cookie(c,h)
}
j=$.cookie(c);
	if(j=="true") {
	$("#"+e).attr("bgMusicStatus","false");
	$.cookie(c,false);
	Site.reStartMusic(d);
	i.attr("title","点击暂停播放音乐");
	i.removeClass("bgplayerButtonP")
}
else {
	if(i.hasClass("bgplayerButtonP")) {
	$("#"+e).attr("bgMusicStatus","false");
	Site.reStartMusic(d);
	i.attr("title","点击暂停播放音乐");
	i.removeClass("bgplayerButtonP")
}
else {
	var g=Site.callMusicPosition(d);
	$.cookie(f,g);
	$("#"+e).attr("bgMusicStatus","true");
	$.cookie(c,true);
	Site.stopMusic(d);
	i.attr("title","点击播放音乐");
	i.addClass("bgplayerButtonP")
}
}});
	var b=$.cookie(c);
	var a=Fai.top.$("#"+e);
	if(b=="true") {
	a.attr("title","点击播放音乐");
	a.addClass("bgplayerButtonP");
	a.show()
}
else {
	a.show();
	a.attr("title","点击暂停播放音乐");
	a.removeClass("bgplayerButtonP")
}
};
	Site.SetPositionZero=function() {
	$.cookie("bgplayerTime","0");
	var a=$("#bgplayerButton");
	a.attr("title","点击播放音乐");
	a.addClass("bgplayerButtonP")
}
;Site.callMusicPosition=function(a) {
	var b;
	try {
	b=Site.callMusic(a).getMusicPosition()
}
catch(c) {
	}return b
}
;Site.stopMusic=function(a) {
	var b;
	try {
	b=Site.callMusic(a).stopMusic()
}
catch(c) {
	}return b
}
;Site.reStartMusic=function(b) {
	var a;
	try {
	a=Site.callMusic(b).reStartMusic()
}
catch(c) {
	}return a
}
;Site.getMusicLength=function(a) {
	var b=-1;
	try {
	while(b<0) {
	b=Site.callMusic(a).getSoundLength()
}
}catch(c) {
	}return b
}
;Site.changeVol=function(a,b) {
	try {
	Site.callMusic(a).changeVolume(b)
}
catch(c) {
	console.log(c.stack)
}
};
	Site.callMusic=function(a) {
	var b=document[a]||window[a]||top.document[a];
	return b
}
;Site.bgmFlushContinue=function() {
	var a=$("#bgplayerButton").attr("bgmusicstatus");
	if(a=="false") {
	$.cookie("bgplayerPause","false");
	$.cookie("hasMusicPlaying","false")
}
if(a=="false") {
	Site.callMusicUnload("faiBgMusicPlayer","bgplayerTime")
}
};
	Site.appendQuickTime=function(b) {
	var e=new Array(),d=b.width,c=b.height,a=b.path;
	e.push("<object width='"+d+"' height='"+c+"' classid='clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B' codebase='http://www.apple.com/qtactivex/qtplugin.cab'>");
	e.push("<param name='src' value='"+a+"'>");
	e.push("<param name='controller' value='true'>");
	e.push("<param name='type' value='video/quicktime'>");
	e.push("<param name='autoplay' value='false'>");
	e.push("<param name='target' value='myself'>");
	e.push("<param name='pluginspage' value='http://www.apple.com/quicktime/download/index.html'>");
	e.push("<embed src='"+a+"' width='"+d+"' height='"+c+"' ");
	e.push("controller='true' align='middle' target='myself' type='video/quicktime' autoplay='false' ");
	e.push("pluginspage='http://www.apple.com/quicktime/download/index.html'>");
	e.push("</embed>");
	e.push("</object>");
	$("#"+b.parentId).append(e.join(""))
}
;Site.appendWMP=function(b) {
	var a=new Array(),e=b.width,d=b.height,c=b.path;
	a.push("<embed type='application/x-mplayer2' classid='clsid:6bf52a52-394a-11d3-b153-00c04f79faa6' ");
	a.push("src='"+c+"' wmode='opaque' quality='high' ");
	a.push("enablecontextmenu='false' autostart='false' windowlessVideo='true' ");
	a.push("width='"+e+"' height='"+d+"'>");
	a.push("</embed>");
	$("#"+b.parentId).append(a.join(""))
}
;Site.vote=function(g,d,c,b) {
	if(_siteDemo) {
	Fai.ing("当前为“样板网站”，请先“复制网站”再进行投票。");
	return
}
var f=$("#voteMsg"+g+d),h=parseInt($.cookie("vote"+g)),e=true;
	var a=new Array();
	f.hide();
	$(".voteItems"+g+d).each(function() {
	var j= {
	};
	var i=new Array();
	$(this).find(".voteItemCheck").find("input:checked").each(function() {
	var k=$(this).val();
	if(!isNaN(k)) {
	i.push(parseInt(k))
}
});
	if(i.length==0) {
	f.show();
	f.text(LS.voteNotSelect);
	e=false;
	return
}
j.itemList=i;
	a.push(j)});
	if(!e) {
	return
}
$("#vote"+g+d).attr("disabled",true);
	$("#vote"+g+d).faiButton("disable");
	$.ajax( {
	type:"post",url:"ajax/vote_h.jsp?cmd=voteItem",async:false,data:"vid="+g+"&itemlist="+Fai.encodeUrl($.toJSON(a)),error:function() {
	f.show();
	f.text(LS.voteError);
	setTimeout(function() {
	$("#vote"+g+d).removeAttr("disabled");
	$("#vote"+g+d).faiButton("enable")
}
,3000)},success:function(j) {
	var i=jQuery.parseJSON(j);
	if(i.success) {
	f.show();
	f.text(LS.voteSuccess);
	$(".voteItems"+g+d).find("input:checked").each(function() {
	$(this).attr("checked",false)
}
);
	setTimeout(function() {
	f.hide()
}
,1000);
	if(c>0) {
	if(!$.cookie("vote"+g)) {
	var k=new Date();
	k.setHours(k.getHours()+c);
	$.cookie("vote"+g,c {
	expires:k
}
)}}else {
	if(c==0) {
	$.cookie("vote"+g,null)
}
else {
	$.cookie("vote"+g,-1 {
	expires:30
}
)}}}else {
	if(i.login) {
	f.show();
	voteMsgs.text(LS.voteErrorByNotLogin)
}
else {
	f.show();
	f.text(i.msg)
}
}setTimeout(function() {
	$("#vote"+g+d).removeAttr("disabled");
	$("#vote"+g+d).faiButton("enable")
}
,3000)}})};
	Site.initModuleVote=function(d) {
	var e=d.id,c=d.delay,b=d.mid,a=d.isVoted;
	if(c==0) {
	$.cookie("vote"+e,null)
}
else {
	if(c==-1) {
	if($.cookie("vote"+e)) {
	$.cookie("vote"+e,-1 {
	expires:30
}
)}}else {
	if($.cookie("vote"+e)=="-1") {
	$.cookie("vote"+e,null)
}
}}$("#vote"+e+b).click(function() {
	Site.vote(e,b,c,a)
}
)};
	Site.fixModuleVoteStyle=function(b,a) {
	if($("#module"+a).width()<=400) {
	$("#voteItems"+b+a).find(".voteItemPanel").css( {
	width:"100%","padding-bottom":"10px"
}
);
	$("#voteItems"+b+a).find(".voteItemCheck").css( {
	padding:"10px 0 0px 5px"
}
)}};
	Site.fixVoteResultImgStyle=function(c,a,d,b) {
	if($("#module"+a).width()>400) {
	if(d!=-1&&b=="img") {
	$("#module"+a).find(".voteResult").find(".vi-percent").find(".voteVfmImg").each(function() {
	$(this).css("width",$("#module"+a).find(".voteResult").find(".vi-percent").width()-48)
}
)}}if($("#module"+a).width()<=400) {
	$("#module"+a).find(".voteResult").find(".vi-percent").find(".voteItemImg").find("img").css( {
	width:"30px",height:"30px"
}
);
	if(d!=-1&&b=="img") {
	$("#module"+a).find(".voteResult").find(".vi-name").css( {
	"text-align":"center"
}
);
	$("#module"+a).find(".voteResult").find(".vi-percent").find(".voteItemImg").css( {
	"margin-right":"2px"
}
);
	$("#module"+a).find(".voteResult").find(".vi-percent").find(".voteVfmImg").each(function() {
	$(this).css("width",$("#module"+a).find(".voteResult").find(".vi-percent").width()-30);
	$(this).css("margin-top","4px")
}
)}}};
	Site.fixModuleVoteResultStyle=function(b,a,c) {
	if($("#module"+a).width()<=400) {
	$("#module"+a).find(".voteResult").find(".vi-name").css( {
	width:"30%"
}
);
	$("#module"+a).find(".voteResult").find(".vi-percent").css( {
	width:"50%"
}
);
	$("#module"+a).find(".voteResult").find(".vi-percent").find(".voteVfm").css( {
	height:"22px"
}
);
	$("#module"+a).find(".voteResult").find(".vi-count").css( {
	width:"20%"
}
);
	$("#module"+a).find(".voteResult").find(".vi-count").find(".voteItemCount").css( {
	"padding-left":"0"
}
)}if(c!=-1) {
	$("#module"+a).find(".voteResult").find(".vi-percent").find(".voteVfm").find(".g_block").each(function() {
	$(this).addClass("g_block"+c)
}
)}};
	Site.showNavSubMenu=function(mode) {
	var menuMode=0;
	if(mode==1) {
	menuMode=1
}
$.each(Fai.top.$("#nav .navCenter .item"),function(i,n) {
	$(this).unbind();
	if(mode==100) {
	var item=$(this);
	if(item.find(".navSubMenu").length>=1) {
	return
}
var id=item.attr("id");
	var menuData=[];
	try {
	menuData=Fai.top.eval(id+"SubMenu")
}
catch(e) {
	return false
}
var pageColId=Fai.top._colId;
	var fromColId=Fai.top._fromColId;
	var colId=item.attr("colId");
	if(colId==pageColId||colId==fromColId) {
	item.addClass("itemSelected")
}
item.hover(function() {
	$(this).addClass("itemHover")
}
,function() {
	$(this).removeClass("itemHover")
}
);
	if(!menuData||menuData.length<1) {
	return
}
var level=0;
	if(colId==pageColId||colId==fromColId) {
	level=1
}
else {
	for(var i=0;
	i<menuData.length;
	++i) {
	var colId2=menuData[i].colId;
	if(colId2==pageColId||colId2==fromColId) {
	level=2;
	break
}
if(!Fai.isNull(menuData[i].sub)) {
	var menuDataSub=menuData[i].sub;
	for(var n=0;
	n<menuDataSub.length;
	++n) {
	var colId3=menuDataSub[n].colId;
	if(colId3==pageColId||colId3==fromColId) {
	level=3;
	break
}
}}if(level!=0) {
	break
}
}}if(menuData) {
	Site.removeNavHiddenMenu(menuData)
}
if(colId==pageColId||colId==fromColId) {
	if(menuData&&menuData.length>=1) {
	item.addClass("itemPopupSelected")
}
}if(level==0) {
	return
}
if(!menuData||menuData.length<1) {
	return
}
var menu=$("<div class='navSubMenu'></div>");
	var content=$("<div class='content2'><table class='top' cellpadding='0' cellspacing='0'><tr><td class='left'></td><td class='center'></td><td class='right'></td></tr></table><table class='middle' cellpadding='0' cellspacing='0'><tr><td class='left'></td><td class='center'></td><td class='right'></td></tr></table><table class='bottom' cellpadding='0' cellspacing='0'><tr><td class='left'></td><td class='center'></td><td class='right'></td></tr></table></div>");
	content.appendTo(menu);
	content=content.find(".middle .center");
	for(var i=0;
	i<menuData.length;
	++i) {
	var menuItemClass="";
	if(menuData[i].colId==pageColId||menuData[i].colId==fromColId) {
	menuItemClass=" itemSelected"
}
var menuItem="<table class='item"+menuItemClass+"' cellpadding='0' cellspacing='0'><tr><td class='itemLeft'></td><td class='itemCenter'><a href='"+menuData[i].href+"'>"+menuData[i].html+"</a></td><td class='itemRight'></td></tr></table>";
	$(menuItem).appendTo(content);
	if(level==1) {
	continue
}
if(level==2&&pageColId!=menuData[i].colId&&fromColId!=menuData[i].colId) {
	continue
}
if(Fai.isNull(menuData[i].sub)||menuData[i].sub.length<1) {
	continue
}
var menuDataSub=menuData[i].sub;
	if(level==3) {
	var current=false;
	for(var n=0;
	n<menuDataSub.length;
	++n) {
	if(menuDataSub[n].colId==pageColId||menuDataSub[n].colId==fromColId) {
	current=true;
	break
}
}if(!current) {
	continue
}
}var content3=$("<div class='content3'><table class='top' cellpadding='0' cellspacing='0'><tr><td class='left'></td><td class='center'></td><td class='right'></td></tr></table><table class='middle' cellpadding='0' cellspacing='0'><tr><td class='left'></td><td class='center'></td><td class='right'></td></tr></table><table class='bottom' cellpadding='0' cellspacing='0'><tr><td class='left'></td><td class='center'></td><td class='right'></td></tr></table></div>");
	content3.appendTo(content);
	content3=content3.find(".middle .center");
	for(var n=0;
	n<menuDataSub.length;
	++n) {
	var menuItemClass3="";
	if(menuDataSub[n].colId==pageColId||menuDataSub[n].colId==fromColId) {
	menuItemClass3=" itemSelected"
}
var menuItem3="<table class='item"+menuItemClass3+"' cellpadding='0' cellspacing='0'><tr><td class='itemLeft'></td><td class='itemCenter'><a href='"+menuDataSub[n].href+"'>"+menuDataSub[n].html+"</a></td><td class='itemRight'></td></tr></table>";
	$(menuItem3).appendTo(content3)}}menu.insertAfter($(this));
	menu.find(".item").hover(function() {
	$(this).addClass("itemHover")
}
,function() {
	$(this).removeClass("itemHover")
}
)}else {
	var item=$(this);
	var pageColId=Fai.top._colId;
	var fromColId=Fai.top._fromColId;
	var colId=item.attr("colId");
	var id=item.attr("id");
	var menuData=[];
	try {
	menuData=Fai.top.eval(id+"SubMenu")
}
catch(e) {
	return false
}
var itemIndex=i+1;
	var current=false;
	if(pageColId==colId||fromColId==colId) {
	current=true
}
else {
	if(menuData&&menuData.length>=1) {
	for(var i=0;
	i<menuData.length;
	++i) {
	var colId2=menuData[i].colId;
	if(colId2==pageColId||colId2==fromColId) {
	current=true;
	break
}
if(!Fai.isNull(menuData[i].sub)) {
	var menuDataSub=menuData[i].sub;
	for(var n=0;
	n<menuDataSub.length;
	++n) {
	var colId3=menuDataSub[n].colId;
	if(colId3==pageColId||colId3==fromColId) {
	current=true;
	break
}
}}if(current) {
	break
}
}}}if(menuData) {
	Site.removeNavHiddenMenu(menuData)
}
if(current) {
	item.addClass("itemSelected");
	item.addClass("itemSelectedIndex"+itemIndex);
	if(menuData&&menuData.length>=1) {
	item.addClass("itemPopupSelected")
}
}$(this).hover(function() {
	var item=$(this);
	var id=item.attr("id");
	var menuData=[];
	try {
	menuData=Fai.top.eval(id+"SubMenu")
}
catch(e) {
	return false
}
item.addClass("itemHover");
	item.addClass("itemHoverIndex"+itemIndex);
	if(menuData&&menuData.length>=1) {
	item.addClass("itemPopupHover")
}
var navSys="";
	if($("#nav").hasClass("navStyle")) {
	var navClass=$("#nav").attr("class").split(" ");
	$.each(navClass,function(i,navStyle) {
	if(navStyle.search(/navStyle/)!=-1) {
	navSys+=navStyle+" "
}
})}var menuContainer="<div class='navSubMenu'></div>";
	var menu=Site.showMenu( {
	container:menuContainer,mode:menuMode,id:id+"SubMenu",minWidth:item.width(),host:item,clsIndex:itemIndex,data:menuData,fixpos:false,rulerObj:Fai.top.$("#nav"),navSysClass:navSys,navBar:true
}
);
	if(menu!=null) {
	menu.hover(function() {
	item.addClass("itemHover");
	if(menuData.length>0) {
	item.addClass("itemPopupHover")
}
},function() {
	item.removeClass("itemHover");
	item.removeClass("itemPopupHover")
}
)}},function() {
	$(this).removeClass("itemHover");
	$(this).removeClass("itemHoverIndex"+itemIndex);
	$(this).removeClass("itemPopupHover");
	if($(".navSubMenu").length==0) {
	$(this).removeClass("itemHover")
}
})}})};
	Site.removeNavHiddenMenu=function(c) {
	for(var b=c.length-1;
	b>=0;
	--b) {
	if(c[b].hidden) {
	c.splice(b,1);
	continue
}
if(c[b].sub) {
	var a=c[b].sub;
	for(var d=a.length-1;
	d>=0;
	--d) {
	if(a[d].hidden) {
	a.splice(d,1)
}
}}}};
	Site.showNavItemContainer=function() {
	var e=Fai.top.$("#nav"),a=e.find(".navCenter");
	if(a.length>0) {
	a.removeAttr("style")
}
Site.hideNavItemContainer();
	var b=e.find(".itemContainer"),o=a.width(),f=0;
	var n=e.find(".item"),u=e.find(".itemSep"),t=n.css("float")==="none";
	if(t) {
	return
}
Fai.top.$.each(n,function() {
	f+=$(this).outerWidth(true)
}
);
	if(Fai.isIE()||Fai.isMozilla()) {
	f+=4
}
Fai.top.$.each(u,function() {
	f+=$(this).outerWidth(true)
}
);
	if(f>o) {
	if(!Fai.top._cusResponsive) {
	b.css("width",f+"px")
}
var g=e.find(".itemPrev"),k=e.find(".itemNext");
	k.css("display","block");
	Fai.top._templateOtherStyleData.h=0;
	var r=0,s=0,c=0,l;
	if(u.is(":hidden")) {
	l=0
}
else {
	l=u.width()/2
}
var i=a.offset().left;
	var m=[];
	n.each(function(j) {
	m[j]=$(this).offset().left-i;
	s++
}
);
	k.unbind("mousedown").unbind("mouseleave");
	g.unbind("mousedown").unbind("mouseleave");
	k.mousedown(function() {
	c=m[r+1]-m[r];
	if(r==0) {
	c-=l
}
r++;
	if(r==s) {
	r=s-1
}
$(this).addClass("itemNextHover");
	b.css("left",(b.position().left-c)+"px");
	if(b.position().left<0) {
	g.css("display","block")
}
if((Math.abs(b.position().left)+o)>=f) {
	k.data("width",k.width());
	k.width(0)
}
}).mouseleave(function() {
	$(this).removeClass("itemNextHover")
}
);
	g.mousedown(function() {
	c=m[r]-m[r-1];
	if(r==1) {
	c-=l
}
r--;
	if(r<0) {
	r=0
}
$(this).addClass("itemPrevHover");
	b.css("left",(b.position().left+c)+"px");
	if((Math.abs(Fai.top.$("#nav .itemContainer").position().left)+o)<f) {
	k.width(k.data("width"))
}
if(b.position().left>=0) {
	g.css("display","none")
}
}).mouseleave(function() {
	$(this).removeClass("itemPrevHover")
}
)}else {
	if(Fai.top.$("#nav")[0].className&&Fai.top.$("#nav")[0].className.indexOf("nav2")>-1) {
	var q=b.css("margin-left")?b.css("margin-left").replace("px",""):0;
	var h=f+parseInt(q);
	a.css("width",h+"px");
	if(Fai.isIE11()) {
	a.css("height",b.outerHeight(true)+"px")
}
if(Fai.top._templateOtherStyleData.h!==parseInt(h)&&Fai.top._manageMode) {
	Fai.top._templateOtherStyleData.h=parseInt(h);
	$.ajax( {
	type:"post",url:"ajax/site_h.jsp?cmd=setOtherStyleData&_templateOtherStyle="+Fai.encodeUrl($.toJSON(Fai.top._templateOtherStyleData)),error:function() {
	},success:function(j) {
	}
}
)}}}function d(v,p) {
	var j=document.getElementById(v);
	if(j.currentStyle) {
	var w=j.currentStyle[p]
}
else {
	if(window.getComputedStyle) {
	var w=document.defaultView.getComputedStyle(j,null).getPropertyValue(p)
}
}return w}};
	Site.hideNavItemContainer=function() {
	$("#nav .itemContainer").removeAttr("style");
	$("#nav").find(".itemPrev").hide();
	$("#nav").find(".itemNext").hide()
}
;Site.hideNavSubMenu=function() {
	Fai.top.$.each(Fai.top.$("#nav .navCenter .item"),function(a,b) {
	$(this).unbind()
}
)};
	Site.initModuleNavListGroup=function(c,b) {
	$("#module"+c+" .g_foldValueCenter").mouseover(function() {
	$(this).addClass("g_hover")
}
).mouseleave(function() {
	$(this).removeClass("g_hover")
}
);
	if(b) {
	var a=$("#module"+c).find(".formMiddle"+c).find("table.g_foldContainerContent").find(".g_foldContainerContentCenter");
	var d=a.find(".g_foldContainerName");
	$.each(d,function(e,g) {
	var f=$(g);
	f.css("cursor","pointer");
	f.click(function() {
	var h=$(this).next();
	if(h.is(":visible")) {
	var i=$(f.find(".g_unfold")[0]);
	i.removeClass("g_unfold").addClass("g_fold");
	h.hide()
}
else {
	var i=$(f.find(".g_fold")[0]);
	i.removeClass("g_fold").addClass("g_unfold");
	h.show()
}
})})}};
	Site.initModuleNavListAcrossDisplay=function(c,d,b) {
	var a=$("#module"+c);
	m_formMiddleWidth=a.find(".formMiddle").width(),mSOptions= {
	moduleId:c,clsStr:"navAcrossContainer navAPanel"
}
;a.find(".navA_C_J .navA_J").hover(function() {
	var m=$(this),g=m.attr("_colId"),i=d[g],h=a.attr("_side"),l=a.parent(),k=a.parent().attr("id"),j=true;
	mSOptions.that=m;
	if(Fai.isIE6()||Fai.isIE7()) {
	j=false
}
else {
	if(h==2) {
	j=false
}
else {
	if(h==1) {
	j=false
}
else {
	if(k=="floatLeftTopForms"||k=="floatRightTopForms"||k=="floatLeftBottomForms"||k=="floatRightBottomForms") {
	j=false
}
else {
	if(a.css("position")=="absolute"&&l.hasClass("absForms")) {
	j=false
}
}}}}if(i!=null&&i.length>0) {
	var n=[],e=$("#navAcM"+c+"C"+g+"Panel");
	if(e.length==0) {
	n.push("<div class='s_navList'>");
	$.each(i,function(r,q) {
	var p="";
	if(!!d[q.id]) {
	p=" navA_more"
}
n.push("<table class='navAcrossCotent childNavA_J g_item' cellpadding='0' cellspacing='0' _colId="+q.id+" style='*width:auto;
	'><tr>");
	n.push("<td class='navAcrossCotentLeft'></td>");
	n.push("<td class='navAcrossCotentCenter'>");
	if(b&&!!d[q.id]) {
	n.push("<a href='javascript:void(0);
	' style='cursor:default;
	'>"+q.name+"</a></td>")
}
else {
	n.push("<a href='"+q.url+"'>"+q.name+"</a></td>")
}
n.push("<td class='navAcrossCotentRight"+p+"'></td>");
	n.push("</tr></table>")});
	n.push("</div>");
	mSOptions.idStr="navAcM"+c+"C"+g+"Panel";
	mSOptions.contentStr=n.join("");
	e=Site.moduleSubPanel(mSOptions);
	var o=m.offset().left,f=m.offset().top;
	if(!j) {
	o+=m.outerWidth()
}
e.css( {
	top:f,left:o
}
).show()}if(j) {
	var o=a.offset().left+a.outerWidth();
	a.css("z-index",9030);
	e.stop(true,false).animate( {
	left:o
}
,500)}e.mouseleave(function() {
	m.removeClass("g_hover")
}
);
	e.mouseover(function() {
	m.addClass("g_hover")
}
);
	e.find(".childNavA_J").hover(function() {
	var r=$(this),w=r.attr("_colId"),t=d[w];
	mSOptions.that=r;
	if(t!=null&&t.length>0) {
	var q=[],s=$("#navAcM"+c+"C"+w+"Panel");
	if(s.length==0) {
	q.push("<div class='s_navList'>");
	$.each(t,function(x,y) {
	q.push("<table class='navAcrossCotent grandNavA_J g_item' cellpadding='0' cellspacing='0' style='*width:auto;
	'><tr>");
	q.push("<td class='navAcrossCotentLeft'></td>");
	q.push("<td class='navAcrossCotentCenter'>");
	q.push("<a href='"+y.url+"'>"+y.name+"</a>");
	q.push("<td class='navAcrossCotentRight'></td>");
	q.push("</tr></table>")
}
);
	q.push("</div>");
	mSOptions.idStr="navAcM"+c+"C"+w+"Panel";
	mSOptions.contentStr=q.join("");
	s=Site.moduleSubPanel(mSOptions);
	var v=r.offset().left,u=r.offset().top;
	if(!j) {
	v+=r.outerWidth()
}
s.css( {
	top:u,left:v
}
).show();
	if(j) {
	var p=r.offset().left+r.outerWidth();
	s.css("z-index",1);
	s.stop(true,false).animate( {
	left:p
}
,500)}}s.find(".grandNavA_J").hover(function() {
	$(this).addClass("g_hover")
}
,function() {
	$(this).removeClass("g_hover")
}
);
	s.mouseleave(function() {
	e.attr("_mouseIn",0);
	m.removeClass("g_hover");
	r.removeClass("g_hover")
}
);
	s.mouseover(function() {
	e.attr("_mouseIn",1);
	m.addClass("g_hover");
	r.addClass("g_hover")
}
);
	r.mouseleave(function() {
	e.attr("_mouseIn",0)
}
)}r.addClass("g_hover")},function(p) {
	$(this).removeClass("g_hover")
}
)}m.addClass("g_hover")},function(f) {
	$(this).removeClass("g_hover")
}
)};
	Site.onSiteFixTop=function() {
	if(Fai.top._navHidden) {
	return
}
var d,q=false,c=false,k=false,A=Fai.isIE6(),z=Fai.isIE7(),r=Fai.top.$("#nav"),C=Fai.top.$(window),w=Fai.top.$("#g_main"),i=Fai.top.$("#web"),t=Fai.top.$("body"),a=Fai.top.$(".webNavTable"),j=Fai.top.$(".webHeaderTable"),m=Fai.top.$(".webBannerTable"),p=Fai.top.$(".floatLeftTop"),e=r.parent(),u=Fai.top.$("#sitetips"),o=Fai.top.$("#webBanner"),b=Fai.top.$("#webHeader"),l=Fai.top.$("#webNav"),s,n=parseInt(r.css("top").replace("px","")),D=r.offset().top,y=u.height()||0,h=D-y,g=p.css("top").replace("px","")||0,x=Fai.top.$(window),F=x;
	if(A||z) {
	c=true;
	F=w
}
if(isNaN(n)) {
	n="auto"
}
else {
	n=n+"px"
}
var v;
	if(r.width()==i.width()) {
	k=true;
	v="100%"
}
else {
	v=r.width()+"px"
}
var f=r.offset().left-e.offset().left;
	var B,E;
	F.on("scroll.nav",function() {
	var H=F.scrollTop(),G=parseInt(p.css("top").replace("px",""))-1;
	g=G||0;
	d=Site.getNavInClientPosition(r).left;
	if(!q&&h<H) {
	if(A) {
	B=r.parent();
	E=r.offset().left-B.offset().left;
	t.prepend(r);
	r.css( {
	position:"absolute",left:d+"px",top:g+"px",width:v
}
);
	r.css("width",v)}else {
	r.addClass("navfixtop");
	r.css( {
	width:v,left:d+"px",top:g+"px"
}
);
	if(k&&i.width()>C.width()) {
	r.css("width",i.width()+"px")
}
if(a.find("#nav").length>0) {
	s=a
}
else {
	if(j.find("#nav").length>0) {
	s=j
}
else {
	if(m.find("#nav").length>0) {
	s=m
}
}}s.css( {
	zIndex:"30",position:"relative"
}
);
	o.addClass("fix-zIndex");
	b.addClass("fix-zIndex");
	l.addClass("fix-zIndex")}q=true}if(q&&h>=H) {
	if(A) {
	e.append(r);
	r.css( {
	position:"",width:"",left:"",top:"",zIndex:""
}
)}else {
	r.removeClass("navfixtop");
	r.css( {
	position:"",width:"",left:"",top:""
}
);
	if(s) {
	s.css("zIndex","")
}
o.removeClass("fix-zIndex");
	b.removeClass("fix-zIndex");
	l.removeClass("fix-zIndex")}q=false}});
	Fai.top.$(window).on("resize.nav",function() {
	if(A&&!k&&r.offset().top==0) {
	r.css("left",B.offset().left+E)
}
else {
	if(r.hasClass("navfixtop")&&k) {
	if(i.width()<C.width()) {
	r.css("width","")
}
else {
	if(i.width()>C.width()) {
	setTimeout(function() {
	r.css("width",i.width()+"px")
}
,0)}}}if(r.hasClass("navfixtop")&&!k) {
	setTimeout(function() {
	r.css("left",e.offset().left+f)
}
,0)}}})};
	Site.getNavInClientPosition=function(b) {
	var a=b[0];
	if(typeof a.getBoundingClientRect!=="undefined") {
	return a.getBoundingClientRect()
}
else {
	var c=Fai.top._manageMode?Fai.top.$("#g_main"):Fai.top.$(window),e= {
	left:0,right:0
}
,d=a.offsetParent;
	e.left=a.offsetLeft;
	e.top=a.offsetTop;
	while(d!==null) {
	e.left+=d.offsetLeft;
	e.top+=d.offsetTop;
	d=d.offsetParent
}
if(b.css("position")=="fixed") {
	e.top=b.css("top")
}
return {
	left:e.left-c.scrollLeft(),top:e.top-c.scrollTop()
}
}};
	Site.onNavCntPositionFixTop=function() {
	if(Fai.top._navHidden||!Fai.top._navStyleData.no) {
	return
}
if(Fai.top._manageMode) {
	Site.onManageFixTop()
}
else {
	Site.onSiteFixTop()
}
};
	Site.initModulePhotoSwitch=function(r,v,t) {
	var c=Fai.top.$("#module"+r);
	var d=c.find(".formMiddleContent");
	c.data("photoSwitchData",v);
	c.data("photoSwitchType",t);
	if(t==1) {
	var u=$("#photoSwitch"+r);
	var m=d.width();
	var q= {
	id:r,switchType:"1",width:m,photoSwitch:u
}
;Site.formMiddleContentWidthArray.push(q);
	u.imageSwitch(v);
	if(d.width()<u.width()) {
	u.css("width",d.width())
}
var j=u.find(".imageSwitchShowName").eq(0);
	var k=u.find(".imageSwitchBtnArea").eq(0);
	if(k.width()/u.width()>=0.4) {
	u.find(".spanHiddenName").each(function() {
	$(this).css("width",((1-(k.width()+20)/u.width())*100)+"%")
}
)}k.css("bottom","5px");
	var l=k[0].getBoundingClientRect().left;
	var g=u[0].getBoundingClientRect().left;
	k.width((k.width()+5)+"px");
	k.css("top","auto");
	if(j.find(".spanHiddenName")&&j.css("display")=="block") {
	if(v.switchWrapName==true) {
	j.css("height","auto")
}
else {
	j.css("height","16px")
}
j.css( {
	top:"auto",bottom:"0","padding-bottom":"15px",width:"100%"
}
)}if(j.find(".spanHiddenName").length==1) {
	j.css( {
	"padding-bottom":"0"
}
)}var b=u.find(".spanHiddenName").length;
	for(var o=0;
	o<b;
	o++) {
	var p=u.find(".spanHiddenName").eq(o);
	p.css("max-width","98%");
	if(v.switchWrapName==true) {
	j.css("padding-bottom","0px");
	p.css( {
	"word-wrap":"break-word",width:"auto"
}
);
	if(Fai.isIE6()||Fai.isIE7()) {
	if(b>1) {
	p.css("padding-bottom","15px")
}
}else {
	var f=false;
	if(p.css("display")=="none") {
	p.addClass("spanShowName");
	f=true
}
var w=g+p[0].clientWidth+10;
	if(f) {
	p.removeClass("spanShowName")
}
if(l-w>=5) {
	p.css( {
	"padding-top":"2px","padding-bottom":"0px",bottom:"0px"
}
)}else {
	if(b>1) {
	p.css("padding-bottom","15px")
}
}}}else {
	if(b==1) {
	j.css("padding-bottom","15px");
	p.css( {
	"white-space":"nowrap",width:"99%","padding-top":"2px"
}
)}else {
	if((k.width()+20)/u.width()<0.4) {
	p.css( {
	"white-space":"nowrap",width:"60%","padding-top":"2px"
}
)}else {
	p.css( {
	"white-space":"nowrap","padding-top":"2px"
}
)}}}if(Fai.isIE6()) {
	for(var s=0;
	s<Site.formMiddleContentWidthArray.length;
	s++) {
	if(Site.formMiddleContentWidthArray[s].switchType==1) {
	$("#photoSwitch"+Site.formMiddleContentWidthArray[s].id).css("width",Site.formMiddleContentWidthArray[s].width+"px")
}
}}}}else {
	if(t==2) {
	var e=$("#photoDotSwitch"+r);
	var m=d.width();
	var q= {
	id:r,switchType:"2",width:m,photoDotSwitch:e
}
;Site.formMiddleContentWidthArray.push(q);
	e.imageSwitch(v);
	var j=e.find(".imageSwitchShowName").eq(0);
	var h=e.find(".imageSwitchBtnArea").eq(0);
	var n=0;
	h.css("left","");
	if(h.width()>e.width()) {
	h.find(".imageSwitchBtn_dot").each(function() {
	$(this).css("marginRight",2+"px")
}
);
	if(h.width()>e.width()) {
	n=1;
	h.css("marginLeft","-"+h.width()/2+"px")
}
}if(n==0) {
	h.css("marginLeft","-"+h.width()/2+"px");
	h.css("left","50%")
}
if(d.width()<e.width()) {
	e.css("width",d.width())
}
if(j.css("display")=="block"&&j.find(".spanHiddenName")) {
	j.css( {
	height:"auto",top:"auto",bottom:"0","padding-bottom":"15px"
}
);
	j.width("100%");
	j.find(".spanHiddenName").each(function() {
	$(this).css("marginLeft","0px")
}
)}if(j.find(".spanHiddenName").length==1) {
	j.css("padding-bottom","0")
}
var b=e.find(".spanHiddenName").length;
	for(var o=0;
	o<b;
	o++) {
	var p=e.find(".spanHiddenName").eq(o);
	if(v.switchWrapName==true) {
	p.css("word-wrap","break-word")
}
else {
	p.css("white-space","nowrap")
}
}if(Fai.isIE6()) {
	for(var s=0;
	s<Site.formMiddleContentWidthArray.length;
	s++) {
	if(Site.formMiddleContentWidthArray[s].switchType==2) {
	$("#photoDotSwitch"+Site.formMiddleContentWidthArray[s].id).css("width",Site.formMiddleContentWidthArray[s].width+"px");
	if(Site.formMiddleContentWidthArray[s].width<300) {
	h.css("align","center");
	h.css("width",Site.formMiddleContentWidthArray[s].width+"px")
}
}}}}}};
	Site.refreshModulePhotoSwitch=function(b) {
	var c=Fai.top.$("#module"+b);
	if(c.length>0) {
	var a=c.data("photoSwitchData");
	var d=c.data("photoSwitchType");
	if(d==1) {
	c.find("#photoSwitch"+b).empty()
}
else {
	if(d==2) {
	c.find("#photoDotSwitch"+b).empty()
}
}if(typeof a!="undefined") {
	Site.initModulePhotoSwitch(b,a,d)
}
}};
	Site.loadPhotoMarquee=function(t,D,A,m) {
	var e=Fai.top["Photo"+t].ieOpt,h=Fai.top["Photo"+t].tgOpt,n=Fai.top["Photo"+t].callbackArgs;
	var b=$("#module"+t);
	if(Fai.isNull(b)) {
	return
}
b.find(".demo0>div").each(function() {
	if($(this).attr("cloneDiv")) {
	$(this).remove()
}
});
	var v=0;
	var s=b.find(".photoMarqueeForm");
	if(!A) {
	s.each(function() {
	var F=$(this).attr("faiWidth");
	var E=$(this).attr("faiHeight");
	if(Fai.isNull(E)) {
	return
}
var J=$(this).find(".imgDiv");
	var I=J.width();
	var G=J.height();
	var H=Fai.Img.calcSize(F,E,I,G,Fai.Img.MODE_SCALE_FILL);
	if(H.height>v) {
	v=H.height
}
})}if(e.effType>=4&&e.effType<6) {
	Site.clearImageEffectContent_photo("module"+t,"propDiv")
}
var d=0;
	var B=0;
	var g=0;
	var z=0;
	var o=0;
	var C=Site.getFormMiddleContentHeight(b,t);
	s.each(function() {
	var F=$(this);
	var K=F.attr("faiHeight");
	if(Fai.isNull(K)) {
	return
}
var J=F.attr("faiWidth");
	var O=F.find(".imgDiv");
	var L=O.width();
	if(A) {
	v=O.height()
}
var I= {
	width:L,height:v
}
;if(D) {
	if(A) {
	I=Fai.Img.calcSize(J,K,L,v,Fai.Img.MODE_SCALE_FILL)
}
else {
	I=Fai.Img.calcSize(J,K,L,v,Fai.Img.MODE_SCALE_DEFLATE_HEIGHT)
}
}var H=O.find("img");
	H.css("width",I.width+"px");
	H.css("height",I.height+"px");
	var G=O.width();
	if(G<I.width) {
	G=I.width
}
var N=F.find(".propDiv");
	if(N.width()!=G) {
	N.css("width",G+"px")
}
if(O.width()!=G) {
	O.css("width",G+"px")
}
if(O.height()!=v) {
	O.css("height",v+"px");
	if($.browser.msie&&$.browser.version==6) {
	O.addClass("wocaie6").removeClass("wocaie6")
}
}if(F.height()>g&&(m==0||m==1)) {
	g=$(this).height()
}
if(C>g&&(m==2||m==3)) {
	g=C
}
var E=F.outerWidth(true);
	var M=F.outerHeight(true);
	if(E>z) {
	z=E
}
d+=E});
	if($(".photoMarqueeForm").length>0) {
	Site.unifiedAttrVal(b,".photoMarqueeForm","height")
}
var l=b.find(".demo");
	var y=b.find(".demo0");
	B=y.height();
	if(g>0) {
	l.css("height",g+"px")
}
if(m==0||m==1) {
	y.css("width",d+"px");
	var a=l.width(),x=y.width();
	if(x<=a) {
	Site.functionInterface( {
	name:"ImageEffect.FUNC.BASIC.Init",callMethod:true
}
 {
	moduleId:t,imgEffOption:e,tagetOption:h,callback:Site.createImageEffectContent_photo,callbackArgs:n
}
);
	return}}if(m==2||m==3) {
	var g=l.height(),i=y.height();
	if(i<=g) {
	Site.functionInterface( {
	name:"ImageEffect.FUNC.BASIC.Init",callMethod:true
}
 {
	moduleId:t,imgEffOption:e,tagetOption:h,callback:Site.createImageEffectContent_photo,callbackArgs:n
}
);
	return}}if(s.length==0) {
	return
}
var j=s.first().outerWidth(true);
	if(j==0) {
	return
}
var r=0,c=s.length-1;
	s.each(function(F,G) {
	if(r>a) {
	return false
}
var E=$(G).clone().attr("cloneDiv","true");
	tmpId=E.children("div.imgDiv").attr("id");
	E.children("div.imgDiv").attr("id",tmpId+"_clone");
	if(0===F&&(m==2||m==3)) {
	$(G).css("clear","both");
	E.css("clear","both")
}
if(Fai.isIE6()||Fai.isIE7()) {
	if(F===c) {
	$(s[F]).after('<div style="clear:both;
	"></div>');
	E.after('<div style="clear:both;
	"></div>')
}
}y.append(E);
	r+=E.outerWidth(true)});
	var q=d+r;
	if(m==0||m==1) {
	y.css("width",q+"px")
}
function w() {
	var E=l.scrollLeft();
	E--;
	l.scrollLeft(E);
	if(E==0) {
	l.scrollLeft(d)
}
}function f() {
	var E=l.scrollLeft();
	E++;
	l.scrollLeft(E);
	if(E==d) {
	l.scrollLeft(0)
}
}function u() {
	var E=l.scrollTop();
	E--;
	l.scrollTop(E);
	if(E==0) {
	l.scrollTop(B)
}
}function k() {
	var E=l.scrollTop();
	E++;
	l.scrollTop(E);
	if(E==B) {
	l.scrollTop(0)
}
}if(m==0) {
	l.scrollLeft(2*d);
	Fai.addInterval("marquee"+t,w,35)
}
else {
	if(m==1) {
	Fai.addInterval("marquee"+t,f,35)
}
else {
	if(m==2) {
	l.scrollTop(2*B);
	Fai.addInterval("marquee"+t,u,35)
}
else {
	if(m==3) {
	Fai.addInterval("marquee"+t,k,35)
}
}}}l.mouseover(function() {
	Fai.stopInterval("marquee"+t)
}
).mouseleave(function() {
	Fai.startInterval("marquee"+t)
}
);
	Fai.startInterval("marquee"+t);
	if(!b.data("first1")) {
	b.data("first1",true);
	b.data("options" {
	id:t,scale:D,fixHeight:A,phoMarqueeDirection:m
}
)}if(b.data("first2")&&Fai.top._manageMode) {
	var p=b.data("photoOptions");
	Site.initModulePhotoListItemManage(p)
}
Site.functionInterface( {
	name:"ImageEffect.FUNC.BASIC.Init",callMethod:true
}
 {
	moduleId:t,imgEffOption:e,tagetOption:h,callback:Site.createImageEffectContent_photo,callbackArgs:n
}
);
	Site.restartPhotoMarquee(b)};
	Site.restartPhotoMarquee=function(a) {
	if(!a.data("first2")) {
	a.data("first2",true);
	a.on("Fai_onModuleSizeChange",function() {
	var b=a.data("options");
	Fai.stopInterval("marquee"+b.id);
	Site.loadPhotoMarquee(b.id,b.scale,b.fixHeight,b.phoMarqueeDirection)
}
);
	a.on("Fai_onModuleLayoutChange",function() {
	var b=a.data("options");
	Fai.stopInterval("marquee"+b.id);
	Site.loadPhotoMarquee(b.id,b.scale,b.fixHeight,b.phoMarqueeDirection)
}
)}};
	Site.getFormMiddleContentHeight=function(b,a) {
	var m=b.height(),f=b.find(".formTop").first(),e=b.find(".formBanner"+a).first(),i=b.find(".formMiddle").first(),k=b.find(".formBottom").first(),c=0;
	if(f.css("display")!="none") {
	c=f.outerHeight(true)
}
var j=0;
	if(e.css("display")!="none") {
	j=e.outerHeight(true)
}
var h=0;
	if(k.css("display")!="none") {
	h=k.outerHeight(true)
}
var g=m-c-j-h-Fai.getFrameHeight(i);
	var l=i.find(".formMiddleCenter").first();
	g=g-Fai.getFrameHeight(l);
	var d=i.find(".formMiddleContent").first();
	g=g-Fai.getFrameHeight(d);
	return g};
	Site.loadPhotoGallery=function(u) {
	var J=u.id,G=u.scale,e=u.cus;
	var c=$("#"+J),a=c.find("div.photo-container");
	if(u.effType>=4&&u.effType<6) {
	Site.clearImageEffectContent_photo(u.id,"prop-container")
}
if(a.length!=0) {
	for(var V=0;
	V<a.length;
	V++) {
	var T=$(a[V]).children("div.img-container"),l=T.width(),F=T.height();
	var k=T.find("img"),D=k.attr("fHeight"),z=k.attr("fWidth");
	if(G) {
	var h=Fai.Img.calcSize(z,D,l,F,Fai.Img.MODE_SCALE_FILL);
	k.width(h.width);
	k.height(h.height)
}
else {
	k.width(l);
	k.height(F)
}
}var K=c.find("a.gallery-control"),o=c.find("a.gallery-control-prev"),Q=c.find("a.gallery-control-next"),I=o.height(),d=o.width();
	var O=a.first(),R=O.children("div.img-container"),A=R.outerWidth(true),r=R.outerHeight(true),y=O.children("div.prop-container"),g=0;
	if(y.length>0) {
	g=y.first().outerHeight(true)*y.length
}
var B=r+g;
	a.height(B);
	a.width(A);
	a.find("div.prop-container").width(A);
	var w=c.find("div.photo-gallery-preview");
	w.height(B);
	var v=c.find("div.photo-gallery-inner"),n=v.outerHeight();
	if(n<I) {
	var L=v.height(),P=n-L;
	var N=Math.ceil((I-n)/2);
	var p=Math.ceil(P/2)+N;
	v.css("padding-top",p+"px").css("padding-bottom",p+"px")
}
var H=(v.outerHeight()/2)-(I/2);
	K.css("top",H+"px");
	var b=1,W=o.innerWidth()-d,C=c.find("div.formMiddleContent").width(),q=C-W-(d*2),Y=O.outerWidth(true),S=O.outerWidth(),f=Y-S;
	if(q>Y) {
	b=parseInt(q/Y)
}
var E=(b*Y)-f;
	w.width(E);
	var X=a.length;
	var s=X%b==0?X/b:Math.floor(X/b)+1;
	c.find("div.photo-gallery-container").width(X*Y);
	var m=a.length<b?a.length:b;
	for(var U=0;
	U<m;
	U++) {
	var k=$(a[U]).find("img");
	if(!k.attr("src")) {
	k.attr("src",k.attr("lzurl"))
}
k.show()}o.addClass("gallery-control-prev-disabled");
	if(s==1) {
	Q.addClass("gallery-control-next-disabled")
}
o.click(function() {
	var x=$(this);
	if(x.hasClass("gallery-control-prev-disabled")) {
	return false
}
var Z=x.parent(),j=Z.find("div.photo-gallery-container"),aa=Z.find("a.gallery-control-next");
	if(aa.hasClass("gallery-control-next-disabled")) {
	aa.removeClass("gallery-control-next-disabled")
}
if(j.position().left==0||j.is(":animated")) {
	return false
}
var i=E+f;
	j.animate( {
	left:"+="+i+"px"
}
,function() {
	if(j.position().left==0) {
	x.addClass("gallery-control-prev-disabled")
}
})});
	Q.click(function() {
	var ae=$(this);
	if(ae.hasClass("gallery-control-next-disabled")) {
	return false
}
var Z=ae.parent(),i=Z.find("div.photo-gallery-container"),x=Z.find("a.gallery-control-prev");
	if(x.hasClass("gallery-control-prev-disabled")) {
	x.removeClass("gallery-control-prev-disabled")
}
var af=E+f,ag=-(s-1)*(af);
	left_position=parseInt(i.css("left").replace("px"));
	if(left_position==ag||i.is(":animated")) {
	return false
}
if(!ae.data("loading_finish")) {
	var ad=(Math.abs(left_position)/(Y*b))+1;
	var j=ad<=1?1*b:ad*b,ab=j+b>a.length?a.length:j+b;
	for(var aa=j;
	aa<ab;
	aa++) {
	var ac=$($(a[aa]).find("img")[0]);
	if(!ac.attr("src")) {
	ac.attr("src",ac.attr("lzurl"))
}
ac.show()}}i.animate( {
	left:"-="+af+"px"
}
,function() {
	var ah=parseInt(i.css("left").replace("px",""));
	if(ah==ag) {
	ae.data("loading_finish",true);
	ae.addClass("gallery-control-next-disabled")
}
})})}else {
	var M=c.find("div.addNoProTips");
	c.find("div.photo-gallery").height(100).html(M)
}
if(c.find(".prop-wordwrap-container").length>0) {
	c.find(".photo-container").height("auto");
	var t=0;
	c.find(".photo-container").each(function() {
	var i=$(this).height();
	if(i>t) {
	t=i
}
});
	c.find(".photo-container").each(function() {
	$(this).height(t)
}
);
	c.find(".photo-gallery-preview").height(t);
	Site.unifiedAttrVal(c,".prop-wordwrap-container","height")}};
	Site.loadPhotoSmallPic=function(e) {
	var m=e.id,z=e.scale,d=e.cus;
	var c=$("#"+m);
	c.on("Fai_onModuleSizeChange",function() {
	Site.smallPicPhotoModuleFix(m)
}
);
	c.on("Fai_onModuleLayoutChange",function() {
	Site.smallPicPhotoModuleFix(m)
}
);
	var y=c.find("div.photoSmallPicBox");
	var r=c.find(".photoSmallPicUpForms").height();
	var n=c.find(".photoSmallPicDownForms").height();
	c.find(".photoSmallPicForms").height(r+n);
	var x=c.find(".photoSmallPicForms").width();
	c.find(".photoSmallPicUpForms").width(x);
	c.find(".photoSmallPicUpFormsMid").width(x);
	c.find(".photoSmallPicDownForms").width(x);
	var o=c.find(".photoSmallPrePic_control").outerWidth(true);
	c.find(".photoSmallPicDownFormsMid").css("width",x-2*o-20+"px");
	var k=c.find(".photoSmallPrePicContainer");
	var a=$(".photoSmallPrePicOuter").outerWidth(true);
	var w=0;
	if(Fai.isIE6()) {
	w=2
}
k.width(a*y.length+w);
	var f=k.width();
	var b=c.find(".photoSmallPicDownFormsMid").width();
	var t=c.find(".photoSmallPicUpFormsMid").outerHeight()/2-46;
	c.find(".photoSmallPic_control").css("top",t+"px");
	var v=y.length;
	var i=Math.floor(b/a)+1;
	var u=v%i==0?v/i:Math.floor(v/i)+1;
	if(u==1&&b<k.width()) {
	u=2
}
var l=y.length<i?y.length:i;
	for(var s=0;
	s<l;
	s++) {
	var A=$(y[s]).find("img");
	Site.loadPhotoSmallPicItem(A)
}
var p=c.find(".photoSmallPicDownForms a.g_imgPrev"),q=c.find(".photoSmallPicDownForms a.g_imgNext"),g=c.find(".photoSmallPicUpForms a.photoSmallPicArrow_left"),h=c.find(".photoSmallPicUpForms a.photoSmallPicArrow_right");
	p.addClass("photoSmallPic-control-prev-disabled");
	if(u==1) {
	q.addClass("photoSmallPic-control-next-disabled")
}
g.addClass("photoBigPic-control-prev-disabled");
	if(v==1) {
	h.addClass("photoBigPic-control-next-disabled")
}
c.find(".photoSmallPicUpFormsMid").mouseover(function() {
	$(".photoSmallPic_control").css("display","block")
}
).mouseleave(function() {
	$(".photoSmallPic_control").css("display","none")
}
);
	c.find(".photoContainerLeft").mouseenter(function() {
	var j=$(this).parents(".form").attr("id");
	if(_manageMode==true) {
	Site.initModulePhotoSmallPicItemManage(j,e.isOpenImgEff)
}
}).mouseleave(function() {
	var j=$(this).parents(".form");
	var B=j.find("div.photoContainerLeft");
	if(_manageMode==true) {
	if(e.isOpenImgEff) {
	Site.removeEditLayer(B,null,5)
}
else {
	Site.removeEditLayer(B,null,106)
}
}});
	y.mouseover(function() {
	$(this).parent().addClass("photoSmallPrePicOuterHover").addClass("g_border").addClass("g_borderHover")
}
);
	y.mouseleave(function() {
	$(this).parent().removeClass("photoSmallPrePicOuterHover").removeClass("g_borderHover").removeClass("g_border")
}
);
	y.click(function() {
	var ae=$(this).find("img");
	var F=$("#"+m);
	var J=F.find(".photoSmallPicUpFormsMid .photoContainerLeft img");
	Site.loadPhotoSmallPicItem($(this).parent().next().find("img"));
	Site.loadPhotoSmallPicItem(ae);
	var K=e.scale;
	var B=$(this).parent();
	B.siblings(".photoSmallPrePicOuter").find("div.photoSmallPicBox").removeClass("photoSmallPrePicSelected");
	$(this).addClass("photoSmallPrePicSelected");
	B.siblings(".photoSmallPrePicOuter").removeClass("photoSmallPrePicOuterClick").removeClass("g_borderSelected");
	B.addClass("photoSmallPrePicOuterClick").addClass("g_borderSelected");
	var ac=F.find("#bigImgDetail");
	ac.remove();
	F.find(".imgContainer").append(J);
	var U=F.find(".photoContainerLeft").width(),Q=F.find(".photoContainerLeft").height();
	var V=ae.attr("bigpicurl");
	var E=ae.attr("bigpicwidth");
	var I=ae.attr("bigpicheight");
	var T=ae.attr("productname");
	var j=ae.attr("ifshowname");
	var N=ae.attr("aattribute");
	if(K) {
	var P=Fai.Img.calcSize(E,I,U,Q,Fai.Img.MODE_SCALE_FILL);
	J.width(P.width);
	J.height(P.height)
}
else {
	J.css("width",U).css("height",Q)
}
var C=[];
	C.push("<div class='loadingImg' style='width:"+U+"px;
	height:"+Q+"px;
	'>");
	C.push("<table cellspacing='0' cellpadding='0' class='loadingImgTable' style='width:"+U+"px;
	height:"+Q+"px;
	'><tbody><tr><td class='loadingImgTd'>");
	C.push("<div class='ajaxLoading2' style='margin:0 auto;
	'></div>");
	C.push("</td></tr></tbody></table>");
	C.push("</div>");
	F.find(".photoSmallPic_td").append(C.join(""));
	var X=J.attr("src");
	if(X==V) {
	J.attr("src","")
}
J.attr("src",V);
	J.css("margin","auto");
	var ad=ae.attr("alt");
	J.attr("alt",ad);
	F.find(".photoContainerLeft").css("overflow","hidden");
	J.wrap("<a id='bigImgDetail' "+N+"></a>");
	F.find("#imgInnerNameDiv p").text(T);
	var Z=F.find("#imgInnerNameDiv");
	Z.width(J.width());
	F.find(".photoNameContainer").width(J.width());
	var S=(F.find(".photoContainerLeft").height()-J.height())/2+J.height()-Z.outerHeight(true);
	var ab=S%2==0?S:Math.floor(S/2)*2;
	Z.css("top",ab+"px");
	var W=(F.find(".photoSmallPicUpFormsMid").width()-J.width())/2;
	Z.css("left",W+"px").css("overflow","hidden");
	if(e.isOpenImgEff) {
	Site.bindImageEffectCusEvent_photo(F.find(".photoSmallPic_td"),e.tgOpt)
}
var O=F.find(".photoSmallPrePicSelected").parent().index();
	g.removeClass("photoBigPic-control-prev-disabled");
	h.removeClass("photoBigPic-control-next-disabled");
	p.removeClass("photoSmallPic-control-prev-disabled");
	q.removeClass("photoSmallPic-control-next-disabled");
	var M=F.find(".photoSmallPicDownForms").find(".photoSmallPrePicContainer");
	var Y=parseInt(M.css("left").replace("px"));
	var D=Math.abs(Y)/a;
	var aa=D+i-1>v-1?v-1:D+i-1;
	var L=F.find(".photoSmallPicDownFormsMid").width();
	var H,G;
	if(O==0) {
	g.addClass("photoBigPic-control-prev-disabled");
	if(Y==0) {
	p.addClass("photoSmallPic-control-prev-disabled")
}
}if(O==(v-1)) {
	h.addClass("photoBigPic-control-next-disabled");
	H=D;
	G=v-1;
	if((G-H+1)*a<=L&&Y>=(v-i-1)*a) {
	q.addClass("photoSmallPic-control-next-disabled")
}
}F.data("positionLeft",Y);
	var R=F.find(".photoSmallPrePicSelected").attr("phoid");
	F.find("div.photoContainerLeft").attr("phoid",R).attr("photoname",T).attr("id","containerLeft_PhotosmallPic"+R)});
	g.click(function() {
	var F=$(this);
	if(F.hasClass("photoBigPic-control-prev-disabled")) {
	return false
}
var B=$("#"+m);
	var j=B.find(".photoSmallPicDownForms").find(".photoSmallPrePicContainer");
	var D=Math.floor(B.find(".photoSmallPicDownFormsMid").width()/a)+1;
	var I=B.data("positionLeft");
	var E=Math.abs(I)/a;
	var H=E+D-1>v-1?v-1:E+D-1;
	var G=B.find(".photoSmallPrePicSelected").parent();
	var J=G.index();
	if(J>=E&&J<=H) {
	if(J==E) {
	I+=a
}
}else {
	I=-(J-1)*a;
	j.css("left","0px")
}
if(j.is(":animated")) {
	return false
}
$(".img_ProductPhoto_LR_Border").remove();
	$(".img_ProductPhoto_TB_Border").remove();
	$(".editLayer").remove();
	var C=G.prev().find("div.photoSmallPicBox");
	B.find("div.photoContainerLeft").attr("phoid",C.attr("phoid")).attr("photoname",C.find("img").attr("productname")).attr("id","containerLeft_PhotosmallPic"+C.attr("phoid"));
	j.animate( {
	left:I+"px"
}
,function() {
	G.prev().find("div.photoSmallPicBox").click()
}
)});
	h.click(function() {
	var F=$(this);
	if(F.hasClass("photoBigPic-control-next-disabled")) {
	return false
}
var B=$("#"+m);
	var j=$(".photoSmallPicDownForms").find(".photoSmallPrePicContainer");
	var D=Math.floor(B.find(".photoSmallPicDownFormsMid").width()/a)+1;
	var I=B.data("positionLeft");
	var E=Math.abs(I)/a;
	var H=E+D-1>v-1?v-1:E+D-1;
	var G=B.find(".photoSmallPrePicSelected").parent();
	var J=G.index();
	if(J>=E&&J<=H) {
	if(J==H) {
	I-=2*a
}
}else {
	I=-(J-1)*a;
	j.css("left","0px")
}
if(j.is(":animated")) {
	return false
}
$(".img_ProductPhoto_LR_Border").remove();
	$(".img_ProductPhoto_TB_Border").remove();
	$(".editLayer").remove();
	var C=G.next().find("div.photoSmallPicBox");
	B.find("div.photoContainerLeft").attr("phoid",C.attr("phoid")).attr("photoname",C.find("img").attr("productname")).attr("id","containerLeft_PhotosmallPic"+C.attr("phoid"));
	j.animate( {
	left:I+"px"
}
,function() {
	G.next().find("div.photoSmallPicBox").click()
}
)});
	q.click(function() {
	var M=$(this);
	var D=$("#"+m);
	if(M.hasClass("photoSmallPic-control-next-disabled")) {
	return false
}
var j=M.parents(".photoSmallPicDownForms").find(".photoSmallPrePicContainer"),F=M.parents(".photoSmallPicDownForms").find("a.g_imgPrev"),E=Math.floor(D.find(".photoSmallPicDownFormsMid").width()/a)+1;
	if(F.hasClass("photoSmallPic-control-prev-disabled")) {
	F.removeClass("photoSmallPic-control-prev-disabled")
}
var N=(E-1)*a,L=parseInt(j.css("left").replace("px"));
	var K=Math.abs(L)/a;
	var O=K+E-1>v-1?v-1:K+E-1;
	var J=D.find(".photoSmallPicDownFormsMid").width();
	if(j.is(":animated")) {
	return false
}
var C;
	var B,H;
	if(O>=v-1) {
	B=K;
	H=v-1;
	if((H-B+1)*a<=J) {
	C=true;
	M.addClass("photoSmallPic-control-next-disabled")
}
}else {
	B=O;
	H=O+E-1
}
for(var G=B;
	G<=H;
	G++) {
	var I=$(y[G]).find("img");
	Site.loadPhotoSmallPicItem(I)
}
if(!C) {
	j.animate( {
	left:"-="+N+"px"
}
)}});
	p.click(function() {
	var F=$(this);
	if(F.hasClass("photoSmallPic-control-prev-disabled")) {
	return false
}
var B=F.parents(".photoSmallPicDownForms").find(".photoSmallPrePicContainer");
	var H=Math.floor(c.find(".photoSmallPicDownFormsMid").width()/a)+1;
	var E=F.parents(".photoSmallPicDownForms").find("a.g_imgNext");
	if(E.hasClass("photoSmallPic-control-next-disabled")) {
	E.removeClass("photoSmallPic-control-next-disabled")
}
var D=parseInt(B.css("left").replace("px"));
	var G=Math.abs(D)/a;
	var C=G-H+1>0?G-H+1:0;
	if(C==0) {
	F.addClass("photoSmallPic-control-prev-disabled")
}
var j=(G-C)*a;
	if(B.is(":animated")) {
	return false
}
B.animate( {
	left:"+="+j+"px"
}
)});
	y.eq(0).click()};
	Site.removePhotoSmallPicMask=function(a) {
	$("#module"+a).find(".loadingImg").remove()
}
;Site.loadPhotoSmallPicItem=function(d) {
	if(!d.attr("src")) {
	d.attr("src",d.attr("lzurl"))
}
var e=parseInt(d.attr("sWidth")),b=parseInt(d.attr("sHeight"));
	var a=e>b?e:b;
	var c=e>b?"width":"height";
	if(a>71) {
	d.css(c,71)
}
else {
	d.css("width",e).css("height",b)
}
d.show()};
	Site.smallPicPhotoModuleFix=function(u) {
	var c=$("#"+u),x=c.find("div.photoSmallPicBox");
	var p=c.find(".photoSmallPicUpForms").height();
	var l=c.find(".photoSmallPicDownForms").height();
	c.find(".photoSmallPicForms").height(p+l);
	var w=c.find(".photoSmallPicForms").width();
	c.find(".photoSmallPicUpFormsMid").width(w);
	c.find(".photoSmallPicDownForms").width(w);
	c.find(".photoSmallPicUpForms").width(w);
	var m=c.find(".photoSmallPrePic_control").outerWidth(true);
	c.find(".photoSmallPicDownFormsMid").css("width",w-2*m-20+"px");
	var d=$(".photoSmallPicUpForms").width();
	var i=c.find(".photoSmallPrePicContainer");
	var a=$(".photoSmallPrePicOuter").outerWidth(true);
	var v=0;
	if(Fai.isIE6()) {
	v=2
}
i.width(a*x.length+v);
	var e=i.width();
	var b=c.find(".photoSmallPicDownFormsMid").width();
	var r=c.find(".photoSmallPicUpFormsMid").outerHeight()/2-46;
	c.find(".photoSmallPic_control").css("top",r+"px");
	var s=x.length;
	var h=Math.floor(b/a)+1;
	var t=s%h==0?s/h:Math.floor(s/h)+1;
	if(t==1&&b<i.width()) {
	t=2
}
var n=c.find(".photoSmallPicDownForms a.g_imgPrev"),o=c.find(".photoSmallPicDownForms a.g_imgNext"),f=c.find(".photoSmallPicUpForms a.photoSmallPicArrow_left"),g=c.find(".photoSmallPicUpForms a.photoSmallPicArrow_right");
	if(t==1) {
	n.addClass("photoSmallPic-control-prev-disabled");
	o.addClass("photoSmallPic-control-next-disabled")
}
var k=x.length<h?x.length:h;
	for(var q=0;
	q<k;
	q++) {
	var y=$(x[q]).find("img");
	if(!y.attr("src")) {
	Site.loadPhotoSmallPicItem(y)
}
}c.find(".photoSmallPrePicSelected").click()};
	Site.loadPhotoList=function(b,e,f,h) {
	var c=$("#module"+b);
	if(Fai.isNull(c)) {
	return
}
var i=0;
	if(!f) {
	c.find(".photoForm").each(function() {
	var k=$(this).attr("faiWidth");
	var j=$(this).attr("faiHeight");
	if(Fai.isNull(j)) {
	return
}
var o=$(this).find(".imgDiv");
	var n=o.width();
	var l=o.height();
	var m=Fai.Img.calcSize(k,j,n,l,Fai.Img.MODE_SCALE_FILL);
	if(m.height>i) {
	i=m.height
}
})}if(h>=4&&h<6) {
	Site.clearImageEffectContent_photo("module"+b,"parametersDiv")
}
var g=c.find(".nameWordWrap");
	if(g.length>0) {
	var a=0;
	g.each(function() {
	var j=$(this).height();
	if(j>a) {
	a=j
}
});
	g.each(function() {
	$(this).height(a)
}
)}var d=0;
	c.find(".photoForm").each(function() {
	var j=$(this).attr("faiHeight");
	if(Fai.isNull(j)) {
	return
}
var l=$(this).attr("faiWidth");
	var p=$(this).find(".imgDiv");
	var o=p.width();
	if(f) {
	i=p.height()
}
var n= {
	width:o,height:i
}
;if(e) {
	n=Fai.Img.calcSize(l,j,o,i,Fai.Img.MODE_SCALE_FILL)
}
var k=p.find("img");
	k.css("width",n.width+"px");
	k.css("height",n.height+"px");
	p.css("height",i+"px");
	var m=$(this).height();
	if(m>d) {
	d=m
}
});
	c.find(".photoForm").css("height",d+"px")};
	Site.multiPhoto=function(m,l,e) {
	var o="leftIcon";
	var r="rightIcon";
	var q="horizontal";
	var b=false;
	var n= {
	};
	n=$.extend( {
	},n,e);
	if(n.leftIconID!=null) {
	o=n.leftIconID
}
if(n.rightIconID!=null) {
	r=n.rightIconID
}
if(n.direction!=null) {
	q=n.direction
}
if(n.zoom!=null) {
	b=n.zoom=="true"?true:false
}
var g=m;
	var s=m.width();
	var c=m.height();
	var h=g.find("> ul");
	var d=g.find("li");
	var j=g.find("li .g_border");
	var a=d.outerWidth(true);
	var f=d.outerHeight(true);
	var k=d.length;
	var p=0;
	if(q=="horizontal") {
	p=parseInt(s/a)
}
else {
	p=parseInt(c/f)
}
if(q=="horizontal") {
	if(Fai.isIE6()) {
	a++
}
var i=(a)*k;
	h.css("width",i+"px")}else {
	var t=f*k;
	h.css("height",t+"px")
}
$("#"+o).mouseover(function() {
	if((k>=p)&&((Math.abs(h.position().left)+g.width())>=h.width())) {
	$(this).addClass("g_imgPrevHover")
}
}).mouseout(function() {
	$(this).removeClass("g_imgPrevHover")
}
).click(function() {
	if(h.position().left<0) {
	if(q=="horizontal") {
	if(h.is(":animated")) {
	return
}
else {
	h.animate( {
	left:(h.position().left+a)+"px"
}
,"slow")}}else {
	h.animate( {
	top:(h.position().top+f)+"px"
}
,"slow")}if(Math.abs(h.position().left)<=a) {
	$(this).addClass("g_imgPrevNotClick")
}
$("#"+r).removeClass("g_imgNextNotClick")}});
	$("#"+r).mouseover(function() {
	if((k>=p)&&((Math.abs(h.position().left)+g.width())<=h.width())) {
	$(this).addClass("g_imgNextHover")
}
}).mouseout(function() {
	$(this).removeClass("g_imgNextHover")
}
).click(function() {
	if(k>=p) {
	if(q=="horizontal") {
	if((Math.abs(h.position().left)+g.width())<h.width()) {
	if((Math.abs(h.position().left)+g.width()+a)>=h.width()) {
	$(this).addClass("g_imgNextNotClick")
}
$("#"+o).removeClass("g_imgPrevNotClick");
	if(h.is(":animated")) {
	return
}
else {
	h.animate( {
	left:(h.position().left-a)+"px"
}
,"slow")}}else {
	$(this).removeClass("g_imgNextHover");
	$(this).addClass("g_imgNextNotClick")
}
}else {
	if((Math.abs(h.position().top)+g.height())<h.height()) {
	h.animate( {
	top:(h.position().top-f)+"px"
}
,"slow")}else {
	$(this).removeClass("g_imgNextHover");
	$(this).addClass("g_imgNextNotClick")
}
}}});
	d.mouseover(function() {
	d.removeClass("g_borderHover");
	$(this).addClass("g_borderHover");
	var u=$(this).find("a").attr("href");
	if(u==l.find("a").attr("href")) {
	return
}
l.find("a").attr("href",u);
	var A=$(this).attr("faiWidth");
	var D=$(this).attr("faiHeight");
	var B=l.width();
	var x=l.height();
	if(l.data("divWidth")) {
	B=l.data("divWidth")
}
if(l.data("divHeight")) {
	x=l.data("divHeight")
}
var C=Fai.Img.calcSize(A,D,B,x,Fai.Img.MODE_SCALE_DEFLATE_FILL);
	var y=l.find("img");
	if(y.is(":animated")) {
	return
}
var w=l.find("td");
	var v=w.width();
	var E=w.height();
	var z=[];
	z.push("<div class='ProductDetailloadingImg' style='width:"+v+"px;
	height:"+E+"px;
	'>");
	z.push("<table cellspacing='0' cellpadding='0' class='ProductDetailloadingImgTable' style='width:"+v+"px;
	height:"+E+"px;
	'><tbody><tr><td class='ProductDetailloadingImgTd'>");
	z.push("<div class='ajaxLoading2' style='margin:0 auto;
	'></div>");
	z.push("</td></tr></tbody></table>");
	z.push("</div>");
	w.append(z.join(""));
	$(y).load(function() {
	$(".ProductDetailloadingImg").remove();
	$(".multiPhotoImgLoad").fadeOut("slow",function() {
	$(this).remove()
}
)});
	setTimeout(function() {
	if(!$(y).load()) {
	var F=$("<div class='multiPhotoImgLoad'></div>");
	if(l.find(".multiPhotoImgLoad").length==0) {
	F.appendTo(l)
}
}},1000);
	y.css("width",C.width+"px");
	y.css("height",C.height+"px");
	y.attr("src",u);
	l.attr("faiHref",u);
	if(b) {
	l.find(".cloud-zoom").data("zoom").destroy();
	l.find(".cloud-zoom").CloudZoom( {
	imageWidth:A,imageHeight:D
}
)}}).mouseleave(function() {
	})
}
;Site.createImageEffectContent_photo=function(i,k,b,n) {
	var e=$(i).parents("."+b.targetParent);
	var j=$(i).find(".imageEffects");
	var c=$(e).attr("photoName");
	var l=$(e).attr("photoDisc");
	var h=k[Site.ImageEffect.DATA.KEY.FULL_MASK_OPEN_DISC];
	var m=b.nameHidden;
	if(m&&!h) {
	return
}
f();
	g(k,b.nameWordWrap);
	function f() {
	var p=[];
	var o=k.effType;
	p.push("<div class='props "+(o==4?"photoFullMask":"")+"'>");
	p.push("<div class='propList g_specialClass'>");
	if(!m) {
	p.push("<div class='photoName'>"+c+"</div>")
}
if(h&&l.length>0) {
	p.push("<div class='photoDisc'>"+l+"</div>")
}
p.push("</div>");
	p.push("</div>");
	$(j).append(p.join(""))}function g(s,o) {
	var r=$(j).find(".photoName");
	var u=$(j).find(".photoDisc");
	var w=3;
	if(r.length!=0&&!m) {
	d(s,o);
	Site.clamp($(r)[0] {
	clamp:w
}
)}if(u.length!=0&&s.effType==4&&h) {
	a(s);
	Site.clamp($(u)[0] {
	clamp:w
}
);
	setTimeout(function() {
	var y=$(j).height();
	var A=$(j).find(".props").height();
	if(A>y&&!m) {
	var x=$(u).height();
	var z=A-y;
	w=(x)-z+"px";
	Site.clamp($(u)[0] {
	clamp:w
}
)}},100)}if(s.effType==5) {
	var p=$(j).height()/3;
	var v=$(j).find(".props");
	var t=$(v).height()+10;
	var q=p;
	if(t>p) {
	q=t
}
$(j).css("height",q).css("bottom","-"+q+"px")}}function d(s,t) {
	var p=$(j).find(".photoName");
	var r="";
	$(p).removeAttr("style");
	if(s.effType==4) {
	var q=s[Site.ImageEffect.DATA.KEY.FULL_MASK_CUS_NAME];
	var u=s[Site.ImageEffect.DATA.KEY.FULL_MASK_NAME_ALIG];
	var o=s[Site.ImageEffect.DATA.KEY.FULL_MASK_NAME_STYLE];
	if(q&&typeof o=="string"&&o.length>0) {
	o=$.parseJSON(o);
	r+="color:"+o.fc+";
	";r+=(o.fb==1)?" font-weight:bold;
	":""
}
if(typeof u=="number") {
	r+=" text-align:"+((u==1)?"center;
	":(u==2)?"left;
	":"right;
	")
}
}if(t) {
	if(k.effType==4) {
	r+=" word-wrap:break-word;
	"
}
else {
	r+=" overflow:visible;
	text-overflow:clip;
	white-space:normal;
	word-wrap:break-word;
	"
}
}else {
	r+=" overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	"
}
if(s.effType==5) {
	r+=" padding-top:2.5%;
	"
}
$(p).attr("style",r)}function a(u) {
	var o=$(j).find(".photoDisc");
	var t="";
	var q=u[Site.ImageEffect.DATA.KEY.FULL_MASK_CUS_DISC];
	var p=u[Site.ImageEffect.DATA.KEY.FULL_MASK_DISC_STYLE];
	var s=u[Site.ImageEffect.DATA.KEY.FULL_MASK_DISC_ALIG];
	$(o).removeAttr("style");
	if(q&&typeof p=="string"&&p.length>0) {
	p=$.parseJSON(p);
	t+=" color:"+p.fc+";
	"
}
if(typeof s=="number") {
	t+=" text-align:"+((s==1)?"center;
	":(s==2)?"left;
	":"right;
	")
}
if(!m) {
	var r=(Fai.isIE6()||Fai.isIE7())?16:18;
	t+=" margin-top:"+r+"px;
	"
}
$(o).attr("style",t)}};
	Site.clearImageEffectContent_photo=function(b,a) {
	$("#"+b).find("."+a).remove()
}
;Site.bindImageEffectCusEvent_photo=function(g,c) {
	var f=$(g).find(".imageEffects");
	var a=true;
	var e=$(g).parents("."+c.targetParent).find("a");
	var d=$(e).attr("href");
	var b=(typeof d=="undefined"||d.length==0||d.indexOf("javascirpt")>0||d.indexOf("return")>0||e.length==0)?false:true;
	if(!b) {
	a=false
}
if(a) {
	$(f).css("cursor","pointer")
}
else {
	$(f).css("cursor","default")
}
$(f).unbind("click").bind("click",function() {
	var l=$(this).parents("."+c.targetParent).find("a");
	if(Fai.isNull(l)) {
	return
}
var i=$(l).attr("href");
	var h=$(l).attr("onclick");
	var j=$(l).attr("target");
	var k=(typeof i=="undefined"||i.length==0||i.indexOf("javascirpt")>0||i.indexOf("return")>0||e.length==0)?false:true;
	if(typeof h!="undefined") {
	$(l).click()
}
else {
	if(k) {
	window.open(i,j)
}
}})};
	Site.formMiddleContentWidthArray=new Array();
	Site.initModuleWeather=function(a,b,d,c) {
	Site.initIframeLoading(a,b,d,c)
}
;Site.initModuleWeather2=function(b,i,a,d) {
	var f=(a==11?2:1),h=0,j="json",e=Fai.isIE6(),g=[];
	var k="//platform.sina.com.cn/weather/forecast?app_key=1315597423&city="+encodeURIComponent(i)+"&startday="+h+"&lenday="+f+"&format="+j+"&auth_type=uuid&auth_value=0123456789012345&callback=?";
	var c="//wthrcdn.etouch.cn/weather_mini?city="+encodeURIComponent(i)+"&callback=?";
	$(".formMiddleContent"+b).css("overflow","hidden");
	$(".formMiddleContent"+b).append("<div class='weather2Loading'></div>");
	if($("#toolTips"+a).length>0) {
	$("#toolTips"+a).remove()
}
if(a==13||a==14||a==15) {
	$.getJSON(c,function(s) {
	if(!s||s.status!=1000) {
	if(!d) {
	return
}
Site.initModuleWeather2(b,d,a);
	return}var o=s.data.city;
	var m=s.data.wendu;
	var l=s.data.forecast[0].fengli;
	var q=s.data.forecast[0].fengxiang;
	var p=s.data.forecast[0].type;
	var r="";
	switch(p) {
	case"暴雨":r="baoyu";
	break;
	case"大暴雨":r="dabaoyu";
	break;
	case"大雪":r="daxue";
	break;
	case"大雨":r="dayu";
	break;
	case"多云":r="duoyun";
	break;
	case"雷阵雨":r="leizhenyu";
	break;
	case"霾":r="mai";
	break;
	case"晴":r="qing";
	break;
	case"雾":r="wu";
	break;
	case"小雪":r="xiaoxue";
	break;
	case"小雨":r="xiaoyu";
	break;
	case"雪":r="xue";
	break;
	case"阴":r="yin";
	break;
	case"雨夹雪":r="yujiaxue";
	break;
	case"阵雨":r="zhenyu";
	break;
	case"中雪":r="zhongxue";
	break;
	case"中雨":r="zhongyu";
	break;
	case"中到大雨":r="zhongyu";
	break;
	case"小到中雨":r="xiaoyu";
	break;
	case"中到大雪":r="zhongxue";
	break;
	case"小到中雪":r="xiaoxue";
	break;
	case"大到暴雨":r="baoyu";
	break;
	default:r="kongbai"
}
if(a==13) {
	if(e) {
	$(".formMiddleContent"+b).css("height",80+"px")
}
g.push("<div class='weather2' style='width:300px;
	'>");
	g.push("<div class='left"+a+"'>");
	g.push("<div class='firstLine"+a+"'>");
	g.push("<div class='cityName"+a+"'>"+o+"</div>");
	g.push("<div class='currentTemperature"+a+"'>");
	g.push("<font face='微软雅黑' color='#fdbf43'>"+m+"℃</font>");
	g.push("</div>");
	g.push("</div>");
	g.push("<div class='secondLine"+a+"'>");
	g.push("<div class='weatherCon"+a+"'>");
	g.push("<span class='weatherCon2"+a+"'>"+p+"</span>");
	g.push("</div>");
	g.push("<div class='fenli"+a+"'>"+l+"</div>");
	g.push("</div>");
	g.push("</div>");
	g.push("<div class='right"+a+"'>");
	g.push("<div class='images"+a+"'>");
	g.push("<img class='image1"+a+"' title='"+p+"' src='"+_resRoot+"/image/site/weather/"+r+"22."+(e?"gif'":"png'")+"/>");
	g.push("</div>");
	g.push("</div>")}else {
	if(a==14) {
	if(e) {
	$(".formMiddleContent"+b).css("height",80+"px")
}
g.push("<div class='weather2' style='width:250px;
	'>");
	g.push("<div class='left"+a+"' style='width:90px;
	'>");
	g.push("<div class='images"+a+"'>");
	g.push("<img class='image1"+a+"' title='"+p+"' src='"+_resRoot+"/image/site/weather/"+r+"11."+(e?"gif'":"png'")+"/>");
	g.push("</div>");
	g.push("</div>");
	g.push("<div class='right"+a+"'>");
	g.push("<div class='firstLine"+a+"'>");
	g.push("<div class='cityName"+a+"'>"+o+"</div>");
	g.push("<div class='currentTemperature"+a+"'>");
	g.push("<font face='微软雅黑' color='#fdbf43'>"+m+"℃</font>");
	g.push("</div>");
	g.push("</div>");
	g.push("<div class='secondLine"+a+"'>");
	g.push("<div class='weatherCon"+a+"'>");
	g.push("<span class='weatherCon2"+a+"'>"+p+"</span>");
	g.push("</div>");
	g.push("<div class='fenli"+a+"'>"+l+"</div>");
	g.push("</div>");
	g.push("</div>")}else {
	if(a==15) {
	if(e) {
	$(".formMiddleContent"+b).css("height",80+"px")
}
g.push("<div class='weather2' style='width:350px;
	'>");
	g.push("<div class='left"+a+"' style='width:90px;
	'>");
	g.push("<div class='images"+a+"'>");
	g.push("<img class='image1"+a+"' title='"+p+"' src='"+_resRoot+"/image/site/weather/"+r+"33."+(e?"gif'":"png'")+"/>");
	g.push("</div>");
	g.push("</div>");
	g.push("<div class='right"+a+"'>");
	g.push("<div class='firstLine"+a+"'>");
	g.push("<div class='cityName"+a+"'>"+o+"</div>");
	g.push("<div class='windDirection"+a+"'>");
	g.push(""+q+"</div>");
	g.push("<div class='fenli"+a+"'>"+l+"</div>");
	g.push("</div>");
	g.push("<div class='secondLine"+a+"'>");
	g.push("<div class='currentTemperature"+a+"'>");
	g.push("<font face='微软雅黑'>"+m+"℃</font>");
	g.push("</div>");
	g.push("<div class='weatherCon"+a+"'>");
	g.push("<span class='weatherCon2"+a+"'>"+p+"</span>");
	g.push("</div>");
	g.push;
	g.push("</div>");
	g.push("</div>")}}}if(g.length==0) {
	var n="<div id='toolTips"+a+"' style='margin:0 auto;
	width:120px;
	cursor:pointer;
	' onclick='Site.initModuleWeather2( "+b+',"'+i+'",'+a+',"'+d+"\")'>网络缓慢，请重新加载</div>";
	$(".formMiddleContent"+b+" .includeWeather"+a).append(n)
}
else {
	$(".formMiddleContent"+b+" .includeWeather"+a).append(g.join(""))
}
$(".formMiddleContent"+b+" .weather2Loading").remove()})}else {
	$.getJSON(k,function(r) {
	if(!r||r.status.code!=0) {
	if(!d) {
	return
}
Site.initModuleWeather2(b,d,a);
	return}var o=$(".formMiddleContent"+b+" .weather2"),w=r.data.city[0].days.day,v=false;
	for(var t=0;
	t<w.length;
	t++) {
	var y=w[t].f1?w[t].f1:"qing",x=w[t].f2?w[t].f2:"qing",s=(y==x?true:false),q=w[t].t1?w[t].t1:"0",n=w[t].t2?w[t].t2:"0",p=w[t].s1,m=w[t].s2,u=w[t].d1,B=w[t].p1,z=r.data.city[0].info.name;
	o.find(".cityName"+a).text(z);
	if(a!=12&&a!=11) {
	g.push("<ul class='weather2'>");
	g.push("<li class='cityName"+a+"'>");
	g.push(""+z+"</li>");
	g.push("<li class='weatherCon"+a+"'>");
	if(a==1) {
	if(e) {
	$(".formMiddleContent"+b).css("height",27+"px")
}
g.push(""+p+"")}else {
	if(e) {
	$(".formMiddleContent"+b).css("height",33+"px")
}
if(a==3||a==11) {
	if(!s) {
	g.push("<img style='margin-right:5px;
	' class='image1"+a+"' title='"+p+"' src='"+_resRoot+"/image/site/weather/"+y+"1."+(e?"gif'":"png'")+"/>")
}
}g.push("<img class='image2"+a+"' title='"+m+"' src='"+_resRoot+"/image/site/weather/"+x+"1."+(e?"gif'":"png'")+"/>")}g.push("</li>");
	g.push("<li class='temperature"+a+"'>");
	g.push("<span class='temperature1"+a+"'>");
	g.push(""+q+"</span> ~");
	g.push("<span class='temperature2"+a+"'>");
	g.push(""+n+"</span>");
	g.push("</li>");
	if(a==7) {
	g.push("<li class='weatherCondition"+a+"'>");
	g.push(""+u+"</li>")
}
g.push("</ul>")}else {
	if(a==11) {
	$(".formMiddleContent"+b+" .includeWeather"+a).width(560);
	if(e) {
	$(".formMiddleContent"+b).css("height",81+"px")
}
var l="";
	t==0?l="今天":l="明天";
	g.push("<div class='weather2'  style='width:278px;
	'>");
	g.push("<div class='cityName"+a+"'>"+(!v?z:"")+"</div>");
	g.push("<img class='image1"+a+"' title='"+p+"' src='"+_resRoot+"/image/site/weather/"+y+"11."+(e?"gif'":"png'")+"/>");
	g.push("<div class='weatherToday"+a+"'>");
	g.push("<div class='weatherTodayInfo"+a+"'>");
	g.push("<span class='weatherTodayDate"+a+"'>"+l+" ");
	g.push(""+q+" ~ </span>");
	g.push(""+n+"<span class='temperature1"+a+"'>");
	g.push("</span> ");
	g.push("<span class='temperature2"+a+"'>");
	g.push("</span>");
	g.push("</div>");
	g.push("<div class='weatherCon"+a+"'>");
	if(!s) {
	g.push("<span class='weatherCon1"+a+"'>"+p+"</span>");
	g.push("<span>转</span>")
}
g.push("<span class='weatherCon2"+a+"'>"+m+"</span>");
	g.push("</div>");
	g.push("</div>");
	g.push("</div>");
	v=true}else {
	if(a==12) {
	if(e) {
	$(".formMiddleContent"+b).css("height",135+"px")
}
g.push("<div class='weather2' style='width:250px;
	'>");
	g.push("<div class='left"+a+"' style='width:90px;
	'>");
	g.push("<div class='cityName"+a+"'>"+z+"</div>");
	g.push("<div class='images"+a+"'>");
	g.push("<img class='image1"+a+"' title='"+p+"' src='"+_resRoot+"/image/site/weather/"+y+"11."+(e?"gif'":"png'")+"/>");
	g.push("</div>");
	g.push("<div class='weatherCon"+a+"'>");
	if(!s) {
	g.push("<span class='weatherCon1"+a+"'>"+p+"</span>");
	g.push("<span>转</span>")
}
g.push("<span class='weatherCon2"+a+"'>"+m+"</span>");
	g.push("</div>");
	g.push("</div>");
	g.push("<div class='right"+a+"'>");
	g.push("<div class='temperatureInclude"+a+"'>");
	g.push("<div style='float:left;
	'>温度：</div>");
	g.push("<div class='temperature"+a+"'>");
	g.push("<span class='temperature1"+a+"'>"+q+"");
	g.push("</span> ~");
	g.push("<span class='temperature2"+a+"'>"+n+"");
	g.push("</span>");
	g.push("</div>");
	g.push("</div>");
	g.push("<div class='windInclude"+a+"'>");
	g.push("<div style='float:left;
	'>风力:</div>");
	g.push("<div class='wind"+a+"'>");
	g.push(""+B+"</div>");
	g.push("</div>");
	g.push("<div class='windDirectionInclude"+a+"'>");
	g.push("<div style='float:left;
	'>风向：</div>");
	g.push("<div class='windDirection"+a+"'>");
	g.push(""+u+"</div>");
	g.push("</div>");
	g.push("</div>")}}}}if(g.length==0) {
	var A="<div id='toolTips"+a+"' style='margin:0 auto;
	width:120px;
	cursor:pointer;
	' onclick='Site.initModuleWeather2( "+b+',"'+i+'",'+a+',"'+d+"\")'>网络缓慢，请重新加载</div>";
	$(".formMiddleContent"+b+" .includeWeather"+a).append(A)
}
else {
	$(".formMiddleContent"+b+" .includeWeather"+a).append(g.join(""))
}
$(".formMiddleContent"+b+" .weather2Loading").remove()})}};
	Site.initWeatherOfIP=function(b,a) {
	$.ajax( {
	url:"http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",type:"POST",dataType:"script",success:function(c) {
	var d=remote_ip_info.city;
	Site.initModuleWeather2(b,d,a)
}
})};
	Site.initModuleDate=function() {
	var a=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],c=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d,e,b;
	return {
	init:function(f,g) {
	d=f,e=g;
	b=$("#module"+d+"Date");
	this.start()
}
,start:function() {
	this.go();
	if(e==2||e==3||e==5||e==7||e==8) {
	setInterval(this.go,8001)
}
},go:function() {
	var n=new Date(),l=n.getFullYear(),i=n.getMonth()+1,p=n.getDate(),o=n.getDay(),f=a[o],j=c[o],k=n.getHours()+"",g=n.getMinutes()+"",q="";
	if(k.length==1) {
	k="0"+k
}
if(g.length==1) {
	g="0"+g
}
if(e==1) {
	q=l+"年"+i+"月"+p+"日 "+f
}
else {
	if(e==2) {
	q=l+"年"+i+"月"+p+"日 "+k+":"+g
}
else {
	if(e==3) {
	q=l+"年"+i+"月"+p+"日 "+f+" "+k+":"+g
}
else {
	if(e==4) {
	q=l+"-"+i+"-"+p
}
else {
	if(e==5) {
	q=l+"-"+i+"-"+p+" "+k+":"+g
}
else {
	if(e==6) {
	q=i+"/"+p+"/"+l+" "+j
}
else {
	if(e==7) {
	q=i+"/"+p+"/"+l+" "+k+":"+g
}
else {
	q=i+"/"+p+"/"+l+" "+j+" "+k+":"+g
}
}}}}}}b.text(q)}}}();
	(function(a) {
	jQuery.fn.extend( {
	bannerImageSwitch:function(c) {
	if(typeof Fai=="undefined") {
	alert("must import fai.js");
	return
}
var b=a.extend( {
	title:true,desc:false,btn:true,repeat:"no-repeat",position:"50% 50%",titleSize:14,titleFont:"Verdana,宋体",titleColor:"#FFF",titleTop:4,titleLeft:4,descSize:12,descFont:"Verdana,宋体",descColor:"#FFF",descTop:2,descLeft:4,btnWidth:15,btnHeight:15,btnMargin:4,btnType:1,playTime:4000,animateTime:1500,animateStyle:"o",index:0,wideScreen:false,btnFunc:function() {
	}
}
,c);
	return a(this).each(function() {
	var f=a(this);
	var D=b.width||f.width();
	var N=b.height||f.height();
	var I=b.data.length;
	var L=b.index;
	var e=D<f.width()?D:f.width();
	var E=f.width();
	var t=(Site.checkBrowser()&&Fai.top._bannerData.at>0)?true:false;
	f.css("overflow","hidden");
	f.height(N);
	var P=a('<div class="imageSwitchShowName photoSwitchBg" />').appendTo(f).css("position","absolute").css("display","none").css("zIndex",2).css("width",a.browser.msie&&a.browser.version==6?a(f).parent().parent().width()+"px":a(f).parent().width()+"px").css("height",30+"px").css("line-height",30+"px");
	if(I==0) {
	P.css("visibility","hidden")
}
if(b.showImageName) {
	P.css("display","block")
}
var H="none";
	if(b.data.length>1) {
	H=b.btn?"block":"none"
}
if(b.btnType!=0) {
	var R=a('<div class="imageSwitchBtnArea"/>').appendTo(f).css("position","absolute").css("zIndex",3).css("display",H)
}
a("<div />").appendTo(f);
	var O="";
	if(t) {
	O="billboard billboard"+Fai.top._bannerData.at
}
var l=a('<div class="switchGroup '+O+'"/>').appendTo(f).css("width",(b.width<=f.width())?b.width:"100%").css("position","relative").height("y,show-y".indexOf(b.animateStyle)!=-1?N*I:N).css("overflow","hidden").css("margin","0 auto");
	if(b.wideScreen) {
	l.css("width","100%")
}
var T=0;
	var r="100%";
	if(b.btnType==0) {
	b.animateStyle="x"
}
var M=[];
	var U="";
	var s="";
	var g="";
	var h="";
	var x="";
	var m="";
	var K="";
	if(b.btnType==0) {
	U="arrowImg"
}
else {
	if(b.btnType==1) {
	U="numImg"
}
else {
	U="dotImg"
}
}a.each(b.data,function(X,aa) {
	var W="";
	var Z="";
	K="";
	x="";
	m="";
	if(a.trim(aa.edgeLeft)!="") {
	x="background:"+aa.edgeLeft+";
	"
}
if(a.trim(aa.edgeRight)!="") {
	m="background:"+aa.edgeRight+";
	"
}
if(!aa.href) {
	W="onclick='return false;
	'"
}
if(aa.onclick) {
	W="onclick='"+aa.onclick+"'"
}
M=[];
	s="";
	s+="position:absolute;
	width:100%;
	";if(b.btnType==0) {
	if(b.wideScreen) {
	s+="left:"+((X-L)*E)+"px;
	"
}
else {
	s+="left:"+((X-L)*b.width)+"px;
	"
}
}if(t) {
	M.push("<div class='billboard_item "+U+"'>\n")
}
else {
	M.push("<div class='"+U+"' id='"+U+X+"' style='"+s+"'>\n")
}
g="";
	g+="width:100%;
	";g+="height:"+N+"px;
	";g+="cursor:"+(aa.href?"pointer":"default")+";
	";g+="background-position:"+b.position+";
	";g+="background-repeat:"+b.repeat+";
	";g+="overflow:hidden;
	";g+="display:block;
	";g+="outline:none;
	";g+="margin:0 auto;
	";g+="position:relative;
	";g+="z-index:1;
	";if(aa.width&&aa.width>0) {
	h=("<img src='"+aa.src+"' width='"+aa.width+"' height='"+aa.height+"' />\n")
}
else {
	h="";
	g+="background-image:url("+aa.src+");
	"
}
if(b.wideScreen) {
	M.push("<a class='J_bannerEdge J_bannerEdgeLeft bannerEdge bannerEdgeLeft' hidefocus='true' title='"+(aa.tip?aa.tip:"")+"' href='"+(aa.href?Fai.encodeHtml(aa.href):"javascript:;
	")+"' target='"+(aa.target?aa.target:"")+"' "+W+" style='"+x+"'></a>");
	M.push("<a class='J_bannerEdge J_bannerEdgeRight bannerEdge bannerEdgeRight' hidefocus='true' title='"+(aa.tip?aa.tip:"")+"' href='"+(aa.href?Fai.encodeHtml(aa.href):"javascript:;
	")+"' target='"+(aa.target?aa.target:"")+"' "+W+" style='"+m+"'></a>")
}
M.push("<a class='J_bannerItem' hidefocus='true' title='"+(aa.tip?aa.tip:"")+"' href='"+(aa.href?Fai.encodeHtml(aa.href):"javascript:;
	")+"' target='"+(aa.target?aa.target:"")+"' style='"+g+"' "+W+">\n");
	M.push(h);
	M.push("</a>\n");
	M.push("</div>\n");
	l.append(M.join(""));
	if(b.btnType==1) {
	var Y=a('<a class="imageSwitchBtn" />').appendTo(R).html("<span>"+(X+1)+"</span>")
}
else {
	if(b.btnType==2) {
	var Y=a('<a class="imageSwitchBtn_dot" />').appendTo(R)
}
}if(X==L) {
	K="spanShowName"
}
var V=a('<span class="spanHiddenName '+K+'"/>').appendTo(P).css("margin-left",10+"px").text(aa.name);
	if(b.btnType!=0) {
	if(X==L) {
	if(b.btnType==1) {
	Y.addClass("imageSwitchBtnSel")
}
else {
	Y.addClass("imageSwitchBtnSel_dot")
}
}}if(b.btnType==1) {
	T+=Fai.getDivWidth(Y)
}
});
	if(b.btnType==0) {
	if(I>1) {
	var C=a('<a class="imageSwitchBtn_arrow arrow_prev" />').appendTo(f).css( {
	position:"absolute",zIndex:3
}
);
	var Q=a('<a class="imageSwitchBtn_arrow arrow_next" />').appendTo(f).css( {
	position:"absolute",zIndex:3
}
)}}if(b.btnType==1) {
	R.width(T)
}
var k=f.parent();
	var u=k.width();
	if(a.browser.msie&&a.browser.version==6) {
	u=k.parent().width()
}
var J=k.height();
	if(u>b.width) {
	u=b.width+(u-b.width)/2
}
if(u>f.width()) {
	u=f.width()
}
if(J>N) {
	J=N
}
if(I>1) {
	if(b.btnType!=0) {
	if(Fai.top.$("#banner").length>0) {
	if(b.btnType==1) {
	if(D>=f.width()) {
	R.css("right","0px")
}
else {
	R.css("right","50%");
	R.css("marginRight","-"+D/2+"px")
}
}else {
	if(b.btnType==2) {
	R.css("left","50%");
	R.css("marginLeft","-"+R.width()/2+"px")
}
}}else {
	R.css("left",(u-T)+"px")
}
}else {
	var v=f.width()-D;
	if(D<=f.width()) {
	v=v-v*0.5
}
else {
	v=0
}
C.css("left",v);
	Q.css("right",v)}}if(b.btnType!=0) {
	var G=R.children("a");
	var w=l.find(".J_bannerItem")
}
else {
	var d=Q;
	var y=C
}
var A=P.children("span");
	var n=u-T;
	if(I>1) {
	if(b.btnType!=0) {
	P.css("top",(J-R.height()-9)+"px").css("left",0+"px")
}
else {
	P.css("top",J+"px").css("left",0+"px")
}
var z=a.browser.msie&&a.browser.version==6?parseInt(j()+30):parseInt(j()+20);
	if(n>z) {
	if(b.btnType==1) {
	R.css("top",(J-R.height()-6)+"px")
}
else {
	if(b.btnType==2) {
	R.css("bottom","5px")
}
else {
	C.css("top","50%");
	C.css("marginTop","-"+C.height()/2+"px");
	Q.css("top","50%");
	Q.css("marginTop","-"+Q.height()/2+"px")
}
}}else {
	if(b.btnType==1) {
	R.css("top",(J-R.height()-30)+"px")
}
else {
	if(b.btnType==2) {
	R.css("bottom","5px")
}
else {
	C.css("top","50%");
	C.css("marginTop","-"+C.height()/2+"px");
	Q.css("top","50%");
	Q.css("marginTop","-"+Q.height()/2+"px")
}
}}}function j() {
	if(A.length>0) {
	var W=a(A[0]).width();
	for(var V=1;
	V<A.length;
	V++) {
	if(W<a(A[V]).width()) {
	W=a(A[V]).width()
}
}return W}return 0}if("o,show,none".indexOf(b.animateStyle)!=-1) {
	w.each(function(V,W) {
	if(L!=V) {
	if(!t) {
	a(this).hide()
}
if(b.wideScreen) {
	a(this).siblings(".J_bannerEdge").hide()
}
}})}if(I==1) {
	A.eq(0).addClass("spanShowName")
}
if(I>1) {
	if(t) {
	Site.bannerAnimate.init( {
	container:Fai.top.$("#banner .switchGroup"),effectIndex:Fai.top._bannerData.at,currentIndex:b.index,speed:Fai.top._bannerData.a,duration:Fai.top._bannerData.i
}
);
	if(b.btnType!=0) {
	G.click(function(W) {
	W.stopPropagation();
	var V=G.index(this);
	Site.bannerAnimate.stop();
	Site.bannerAnimate.goTo(V)
}
)}else {
	d.click(function(V) {
	V.stopPropagation();
	Site.bannerAnimate.next()
}
);
	y.click(function(V) {
	V.stopPropagation();
	Site.bannerAnimate.prev()
}
)}f.mouseover(function() {
	Site.bannerAnimate.stop()
}
);
	f.mouseout(function() {
	Site.bannerAnimate.autoPlay()
}
)}else {
	if(b.btnType!=0) {
	G.click(function(W) {
	W.stopPropagation();
	var V=G.index(this);
	if(V==L) {
	return
}
if(b.btnType==1) {
	G.eq(L).removeClass("imageSwitchBtnSel");
	G.eq(V).addClass("imageSwitchBtnSel")
}
else {
	G.eq(L).removeClass("imageSwitchBtnSel_dot");
	G.eq(V).addClass("imageSwitchBtnSel_dot")
}
A.eq(L).removeClass("spanShowName");
	A.eq(V).addClass("spanShowName");
	switch(b.animateStyle) {
	case"o":w.eq(L).fadeOut(b.animateTime,"failinear");
	w.eq(V).fadeIn(b.animateTime,"failinear");
	if(b.wideScreen) {
	w.eq(L).siblings().fadeOut(b.animateTime,"failinear");
	w.eq(V).siblings().fadeIn(b.animateTime,"failinear")
}
break;
	case"x":l.animate( {
	marginLeft:-V*D
}
,b.animateTime);
	break;
	case"y":l.animate( {
	marginTop:-V*N
}
,b.animateTime);
	break;
	case"show":case"show-x":case"show-y":w.eq(L).hide(b.animateTime);
	w.eq(V).show(b.animateTime);
	break;
	case"none":w.eq(L).hide();
	w.eq(V).show();
	if(b.wideScreen) {
	w.eq(L).siblings().hide();
	w.eq(V).siblings().show()
}
break}L=V;
	var X=Fai.top.$("#bannerGetHref");
	if(X) {
	X.css( {
	width:b.data[V].imgWidth,left:(f.width()-b.data[V].imgWidth)/2+"px"
}
);
	X.css( {
	height:b.data[V].imgHeight,top:(f.height()-b.data[V].imgHeight)/2+"px"
}
)}});
	function q() {
	G.eq((L+1)%I).click()
}
}else {
	var p=L;
	A.eq(p).addClass("spanShowName");
	function o(W) {
	W.stopPropagation();
	if(Fai.top.$(".arrowImg").is(":animated")) {
	return
}
A.eq(p).removeClass("spanShowName");
	if(p==I-1) {
	p=-1
}
A.eq(++p).addClass("spanShowName");
	var V=e;
	if(b.wideScreen) {
	V=E
}
Fai.top.$("#arrowImg"+p).css( {
	left:V+"px"
}
);
	Fai.top.$(".arrowImg").animate( {
	left:"-="+V+"px"
}
,b.animateTime);
	var X=Fai.top.$("#bannerGetHref");
	if(X) {
	X.css( {
	width:b.data[p].imgWidth,left:(f.width()-b.data[p].imgWidth)/2+"px"
}
);
	X.css( {
	height:b.data[p].imgHeight,top:(f.height()-b.data[p].imgHeight)/2+"px"
}
)}}d.on("click",o);
	d.hover(function() {
	d.addClass("arrow_next_hover")
}
,function() {
	d.removeClass("arrow_next_hover")
}
);
	function i(W) {
	W.stopPropagation();
	if(Fai.top.$(".arrowImg").is(":animated")) {
	return
}
A.eq(p).removeClass("spanShowName");
	if(p==0) {
	p=I
}
var V=e;
	if(b.wideScreen) {
	V=E
}
A.eq(--p).addClass("spanShowName");
	Fai.top.$("#arrowImg"+p).css( {
	left:"-"+V+"px"
}
);
	Fai.top.$(".arrowImg").animate( {
	left:"+="+V+"px"
}
,b.animateTime);
	var X=Fai.top.$("#bannerGetHref");
	if(X) {
	X.css( {
	width:b.data[p].imgWidth,left:(f.width()-b.data[p].imgWidth)/2+"px"
}
);
	X.css( {
	height:b.data[p].imgHeight,top:(f.height()-b.data[p].imgHeight)/2+"px"
}
)}}y.on("click",i);
	y.hover(function() {
	y.addClass("arrow_prev_hover")
}
,function() {
	y.removeClass("arrow_prev_hover")
}
);
	function B() {
	d.click()
}
}var S="imageSwitch"+Math.random();
	if(b.btnType!=0) {
	Fai.addInterval(S,q,parseInt(b.playTime+b.animateTime))
}
else {
	Fai.addInterval(S,B,parseInt(b.playTime+b.animateTime))
}
var F=setTimeout(function() {
	if(b.btnType!=0) {
	q()
}
else {
	B()
}
Fai.startInterval(S)},b.playTime);
	if(typeof b.mouseoverId!="undefined") {
	a(Fai.top.$(f).find("."+b.mouseoverId)[0]).mouseover(function() {
	F&&clearTimeout(F);
	Fai.stopInterval(S)
}
);
	a(Fai.top.$(f).find("."+b.mouseoverId)[0]).mouseout(function() {
	F&&clearTimeout(F);
	Fai.startInterval(S)
}
)}else {
	f.mouseover(function() {
	F&&clearTimeout(F);
	Fai.stopInterval(S)
}
);
	f.mouseout(function() {
	F&&clearTimeout(F);
	Fai.startInterval(S)
}
)}}}})}})})(jQuery);
	Site.initBanner=function(s,e,g) {
	var m=false;
	var a=Fai.top.$("#webBanner");
	var c=Fai.top.$("#banner");
	if(Fai.top._templateLayout==0||Fai.top._templateLayout==1) {
	var n=Fai.top._manageMode?Site.getWebBackgroundData().wbh:Fai.top._webBannerHeight;
	if(n>-1) {
	s.height=n;
	if(c.siblings(".nav").length>0) {
	var o=c.attr("normalheight");
	if(o==-1) {
	o=c.css("height").replace("px","")
}
var q=c.siblings(".nav").height()||0;
	if(n>-1) {
	s.height=a.height()-q;
	if(a.height()<(parseInt(o)+parseInt(q))) {
	m=true
}
}if(c.attr("normalheight")==-1&&m) {
	c.css( {
	height:s.height+"px"
}
)}}}}if(s._open) {
	if(e._open&&Fai.flashChecker().f) {
	s.mouseoverId="bannerGetHref"
}
else {
	s.mouseoverId="switchGroup"
}
c.children().remove();
	c.bannerImageSwitch(s);
	var p=c.width();
	var b=c.height();
	if(m) {
	b=s.height
}
var d=(Fai.top.$("#containerFormsCenter").find("div").eq(0).attr("id"));
	var k=Fai.top.$("#banner .switchGroup");
	Fai.top.$("#banner .switchGroup .J_bannerItem").each(function(w) {
	if(!s.data[w]) {
	return false
}
var v=s.data[w]?s.data[w].imgWidth:0;
	if(p>=v) {
	$(this).css("width",s.data[w].imgWidth);
	var u=k.width()-s.data[w].imgWidth;
	if(Fai.isIE()) {
	u=u+(u%2)
}
$(this).siblings(".J_bannerEdge").css("width",u/2)}else {
	$(this).css("width",p);
	var u=k.width()-p;
	if(Fai.isIE()) {
	u=u+(u%2)
}
$(this).siblings(".J_bannerEdge").css("width",u/2)}if(b>=s.data[w].imgHeight) {
	if(Site.checkBrowser()&&Fai.top._bannerData.at>0) {
	$(this).css("height",b)
}
else {
	$(this).css("height",s.data[w].imgHeight);
	$(this).parent().css("paddingTop",(b-s.data[w].imgHeight)/2+"px")
}
$(this).siblings(".J_bannerEdge").height(s.data[w].imgHeight);
	$(this).siblings(".J_bannerEdge").css("top",(b-s.data[w].imgHeight)/2+"px")}else {
	$(this).css("height",b);
	$(this).siblings(".J_bannerEdge").height(b)
}
});
	c.css("background","none")}else {
	Site.refreshDefaultBannerEdge()
}
if(e._open&&Fai.flashChecker().f) {
	var h=0;
	var t=0;
	var f=Fai.top.$("#banner").width();
	if(f>960) {
	f=960;
	h=parseInt((Fai.top.$("#webBanner").width()-960)/2)
}
var i=Fai.top.$("#banner").height();
	if(e.position==1) {
	f=f/2
}
else {
	if(e.position==2) {
	f=f/2;
	h+=f
}
else {
	if(e.position==3) {
	h+=e.positionLeft;
	t=e.positionTop
}
}}if(typeof Fai!="undefined"&&typeof Fai.top._resRoot!="undefined") {
	resRoot=Fai.top._resRoot
}
if(typeof e.color1=="undefined") {
	e.color1="#000"
}
if(typeof e.color2=="undefined") {
	e.color2="#FFFFFF"
}
var r="text1="+Fai.encodeUrl(e.text1)+"&text2="+Fai.encodeUrl(e.text2)+"&size1="+e.size1+"&size2="+e.size2+"&color1=0x"+e.color1.substr(1,e.color1.length-1)+"&color2=0x"+e.color2.substr(1,e.color2.length-1)+"&style1="+e.style1+"&style2="+e.style2;
	var l=['<div class="effectShow" id="effectShow" style="position:absolute;
	top:'+t+"px;
	left:"+h+'px;
	z-index:1;
	">','<object id="effectShow_swf" type="application/x-shockwave-flash"  data="'+Fai.top._resRoot+"/image/site/effects/"+e.type+".swf?"+$.md5(r)+'" width="'+f+'" height="'+i+'">','<param name="movie" value="'+Fai.top._resRoot+"/image/site/effects/"+e.type+".swf?"+$.md5(r)+'"/>','<param name="quality" value="high" />','<param name="wmode" value="transparent" />','<param name="flashvars" value="'+r+'"/>','<embed id="effectShowEmbed" name="effectShow_swf" type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-4445535400000" src="',Fai.top._resRoot,"/image/site/effects/"+e.type+".swf?"+$.md5(r)+'" wmode="transparent" quality="high" menu="false" play="true" loop="true" width="',f,'" height="',i,'flashvars="'+r+'"','" >',"</embed>","</object>","</div>"];
	l=l.join("");
	if(g==4) {
	var j='<div id="bannerGetHref" class="bannerGetHref" style="position:absolute;
	top:0;
	left:'+h+"px;
	width:"+f+"px;
	height:100%;
	z-index:1;
	background:url('"+resRoot+'/image/site/transpace.png\');
	" onmouseover="Site.bannerInitHref();
	"  onmouseout="Site.startBannerInterval();
	" onclick="Site.bannerGetHref();
	"></div>';
	l=l+j
}
c.append(l);
	var b=c.height();
	var p=c.width();
	if(s.data&&s.data.length>0) {
	Fai.top.$("#bannerGetHref").css( {
	width:s.data[0].imgWidth,height:s.data[0].imgHeight,left:(p-s.data[0].imgWidth)/2+"px",top:(b-s.data[0].imgHeight)/2+"px"
}
)}}if(s._open&&$(".webBanner").width()!=960) {
	$(window).resize(function(u) {
	if(!u.target.nodeType||u.target.nodeType==9) {
	setTimeout(function() {
	Site.refreshBanner(0)
}
,10)}})}Site.adjustBannerFlash()};
	Site.adjustBannerWidth=(function() {
	function b() {
	var i=Fai.top.$(window),f=Fai.top.$("#webBanner"),e=Fai.top.$("#web");
	webBgData=Fai.top._templateBackgroundData;
	if(f.length<1) {
	return
}
if(webBgData.wbw!=-1) {
	var d=Fai.top._manageMode?Fai.getScrollWidth():0,h=(parseInt(f.css("borderLeftWidth").replace("px",""))+parseInt(f.css("borderRightWidth").replace("px","")))||0,g=webBgData.wbw+h,c=e.width();
	if(c-d<g&&c<g) {
	a(c-h)
}
i.off("resize.banner");
	i.on("resize.banner",function() {
	c=e.width();
	if(i.width()-d<g&&c<g) {
	a(c-h)
}
else {
	a(webBgData.wbw)
}
})}else {
	i.off("resize.banner")
}
}function a(c) {
	Fai.top.Fai.setCtrlStyleCss("styleWebSite","",".webBanner","width",c+"px !important");
	Fai.top.Fai.setCtrlStyleCss("styleWebSite","",".webBanner .banner","width","auto !important");
	Fai.top.Fai.setCtrlStyleCss("styleWebSite","",".webBanner .switchGroup","width",c+"px !important")
}
return b})();
	Site.startBannerInterval=function() {
	var a=0;
	if(Fai.intervalFunc!=undefined) {
	a=Fai.intervalFunc.length
}
if(a>0) {
	var b=Fai.intervalFunc[0].id;
	if(typeof b!="undefined"&&b.substring(0,11)=="imageSwitch") {
	Fai.startInterval(b)
}
}if(Fai.top._bannerData.n&&Fai.top._bannerData.n.length>1&&Site.checkBrowser()&&Fai.top._bannerData.at>0) {
	Site.bannerAnimate.autoPlay()
}
};
	Site.stopBannerInterval=function() {
	var a=0;
	if(Fai.intervalFunc!=undefined) {
	a=Fai.intervalFunc.length
}
if(a>0) {
	var b=Fai.intervalFunc[0].id;
	if(typeof b!="undefined"&&b.substring(0,11)=="imageSwitch") {
	Fai.stopInterval(b)
}
}if(Fai.top._bannerData.n&&Fai.top._bannerData.n.length>1&&Site.checkBrowser()&&Fai.top._bannerData.at>0) {
	Site.bannerAnimate.stop()
}
};
	Site.bannerInitHref=function() {
	Site.stopBannerInterval();
	var c=false;
	var a=Fai.top.$("#banner");
	var b=-1;
	a.find(".spanHiddenName").each(function(d,e) {
	if($(this).hasClass("spanShowName")) {
	b=d;
	return false
}
});
	if(b==-1) {
	return
}
a.find(".switchGroup").children().each(function(d,e) {
	if(d==b&&Fai.top.$(e).find("a").eq(0).attr("href")!="javascript:;
	") {
	Fai.top.$("#bannerGetHref").css("cursor","pointer");
	c=true;
	return false
}
});
	if(c==false) {
	Fai.top.$("#bannerGetHref").css("cursor","default")
}
};
	Site.bannerGetHref=function() {
	var a=Fai.top.$("#banner");
	var c=-1;
	a.find(".spanHiddenName").each(function(d,e) {
	if($(this).hasClass("spanShowName")) {
	c=d;
	return false
}
});
	if(c==-1) {
	return
}
var b="";
	a.find(".switchGroup").children().each(function(d,f) {
	if(d==c) {
	var e=Fai.top.$(f).find("a").eq(0);
	b=e.attr("href");
	if(b=="javascript:;
	") {
	$(e).click()
}
return false}});
	if(b!="javascript:;
	") {
	window.open(b)
}
};
	Site.adjustBannerFlash=function() {
	var b=Fai.top.$("#banner");
	var c=Fai.top.$("#imgPageFlash");
	if(c.length>0) {
	var a=b.width();
	var d=c.width();
	if(a<d) {
	c.css( {
	position:"absolute",left:-(d-a)/2+"px"
}
)}else {
	c.css( {
	position:"",left:""
}
)}}};
	Site.refreshBanner=function(i) {
	var a=Fai.top.$("#webBanner");
	var e=Fai.top.$("#banner");
	if(Fai.top._bannerData.h) {
	Fai.top.$("#banner").css("display","none");
	return
}
if(typeof i=="undefined") {
	i=0
}
if(Fai.top._bannerData.s==3&&!Fai.top._bannerData.f.p) {
	Fai.top._bannerData.s=0
}
if(Fai.top._bannerData.s==4&&Fai.top._bannerData.n.length==0) {
	Fai.top._bannerData.s=0
}
Fai.top.$("#banner").css("display","block");
	if(Fai.top._bannerData.s==0) {
	Fai.top.$("#banner").removeAttr("style");
	Fai.top.$("#banner").children().remove();
	var o=[];
	o.push("<div class='"+e.attr("class")+" defaultBannerMain'></div>");
	o.push("<div class='defaultBannerEdge defaultBannerEdgeLeft'></div>");
	o.push("<div class='defaultBannerEdge defaultBannerEdgeRight'></div>");
	e.append(o.join(""));
	if(Fai.top._templateLayout==0||Fai.top._templateLayout==1) {
	var j=Fai.top._manageMode?Site.getWebBackgroundData().wbh:Fai.top._webBannerHeight;
	if(j>-1) {
	if(e.siblings(".nav").length>0) {
	var f=e.css("height").replace("px","");
	var d=e.siblings(".nav").height();
	if(a.height()<(parseInt(f)+d)) {
	f=a.height()-d;
	e.css( {
	height:f+"px"
}
)}}}}Site.refreshDefaultBannerEdge()}else {
	if(Fai.top._bannerData.s==3) {
	Fai.top.$("#banner").css("background","none");
	Fai.top.$("#banner").css("height",Fai.top._bannerData.f.h+"px");
	Fai.top.$("#banner").children().remove();
	var g='<embed type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-4445535400000" id="imgPageFlash" src="'+Fai.top._bannerData.f.p+'" wmode="opaque" quality="high" menu="false" play="true" loop="true" width="'+Fai.top._bannerData.f.w+'" height="'+Fai.top._bannerData.f.h+'" ></embed>';
	Fai.top.$("#banner").append(g);
	Site.adjustBannerFlash()
}
else {
	if(Fai.top._bannerData.s==4) {
	Site.refreshBannerImageSwitch(i)
}
}}if(Fai.top._bannerData.o) {
	var p=0;
	var m=0;
	var l=Fai.top.$("#banner").width();
	var c=Fai.top.$("#banner").height();
	if(l>960) {
	l=960;
	p=parseInt((Fai.top.$("#webBanner").width()-960)/2)
}
if(Fai.top._bannerData.p==1) {
	l=l/2
}
else {
	if(Fai.top._bannerData.p==2) {
	l=l/2;
	p+=l
}
else {
	if(Fai.top._bannerData.p==3) {
	p+=Fai.top._bannerData.pl;
	m=Fai.top._bannerData.pt
}
}}if(typeof Fai!="undefined"&&typeof Fai.top._resRoot!="undefined") {
	resRoot=Fai.top._resRoot
}
if(typeof Fai.top._bannerData.ce.c1=="undefined") {
	Fai.top._bannerData.ce.c1="#000"
}
if(typeof Fai.top._bannerData.ce.c2=="undefined") {
	Fai.top._bannerData.ce.c2="#FFFFFF"
}
var k="text1="+Fai.encodeUrl(Fai.top._bannerData.ce.t1)+"&text2="+Fai.encodeUrl(Fai.top._bannerData.ce.t2)+"&size1="+Fai.top._bannerData.ce.sz1+"&size2="+Fai.top._bannerData.ce.sz2+"&color1=0x"+Fai.top._bannerData.ce.c1.substr(1,Fai.top._bannerData.ce.c1.length-1)+"&color2=0x"+Fai.top._bannerData.ce.c2.substr(1,Fai.top._bannerData.ce.c2.length-1)+"&style1="+Fai.top._bannerData.ce.s1+"&style2="+Fai.top._bannerData.ce.s2;
	var h=Fai.top._resRoot+"/image/site/effects/"+Fai.top._bannerData.t+".swf?"+$.md5(k);
	var b=['<div class="effectShow" id="effectShow" style="position:absolute;
	top:'+m+"px;
	left:"+p+'px;
	z-index:1;
	">','<object id="effectShow_swf"  type="application/x-shockwave-flash"  data="'+h+'" width="'+l+'" height="'+c+'">','<param name="movie" value="'+h+'" />','<param name="quality" value="high" />','<param name="flashvars" value="'+k+'"/>','<param name="wmode" value="transparent" />','<embed name="effectShow_swf" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-4445535400000" id="effectFlash" src="'+h+'" wmode="transparent" quality="high" menu="false" play="true" loop="true" width="'+l+'" height="'+c+'" flashvars="'+k+'" >',"</embed>","</object>","</div>"];
	b=b.join("");
	if(Fai.top._bannerData.s==4) {
	var n='<div id="bannerGetHref" class="bannerGetHref" style="position:absolute;
	top:0;
	left:'+p+"px;
	width:"+l+"px;
	height:100%;
	z-index:1;
	background:url('"+resRoot+'/image/site/transpace.png\');
	"  onmouseover="Site.bannerInitHref();
	" onmouseout="Site.startBannerInterval();
	" onclick="Site.bannerGetHref();
	"></div>';
	b=b+n
}
Fai.top.$("#banner").append(b);
	if(Fai.top._bannerData.n&&Fai.top._bannerData.n.length>0) {
	Fai.top.$("#bannerGetHref").css( {
	width:Fai.top._bannerData.n[i].w,height:Fai.top._bannerData.n[i].h,left:(Fai.top.$("#banner").width()-Fai.top._bannerData.n[i].w)/2+"px",top:(Fai.top.$("#banner").height()-Fai.top._bannerData.n[i].h)/2+"px"
}
)}}else {
	Fai.top.$("#effectShow").remove()
}
};
	Site.getWebBackgroundData=function() {
	return Fai.top._useTemplateBackground?Fai.top._templateBackgroundData:Fai.top._customBackgroundData
}
;Site.refreshBannerImageSwitch=function(h) {
	var q=0;
	var n=0;
	var o=new Array();
	var j=new Array();
	var k=new Array();
	var i=Fai.top._bannerData.bt;
	var m=false;
	var a=Fai.top.$("#webBanner");
	var e=Fai.top.$("#banner");
	$.each(Fai.top._bannerData.n,function(t,x) {
	var v=x.el||"";
	var w=x.er||"";
	var s=parseInt(x.h);
	var u=parseInt(x.w);
	if(s>q) {
	q=s
}
if(u>n) {
	n=u
}
if(x.e!=0) {
	var r=x.jUrl||"javascript:;
	";if(Fai.top._manageMode) {
	if($(".panelLibItem[vid="+x.i+"]").data("JURL")!=undefined) {
	r=$(".panelLibItem[vid="+x.i+"]").data("JURL")
}
if(x.urlChange==1) {
	r=x.jUrl||"javascript:;
	"
}
}if(r.length>12&&r.substring(0,10)=="javascript") {
	o.push( {
	src:x.p,href:"javascript:;
	",onclick:r.substring(11)+"return false;
	",target:"_blank",imgWidth:u,imgHeight:s,edgeLeft:v,edgeRight:w
}
)}else {
	o.push( {
	src:x.p,href:r,target:"_blank",imgWidth:u,imgHeight:s,edgeLeft:v,edgeRight:w
}
)}}else {
	o.push( {
	src:x.p,imgWidth:u,imgHeight:s,edgeLeft:v,edgeRight:w
}
)}j.push(u);
	k.push(s)});
	if(Fai.top._templateLayout==0||Fai.top._templateLayout==1) {
	var b=Fai.top._manageMode?Site.getWebBackgroundData().wbh:Fai.top._webBannerHeight;
	if(b>-1) {
	q=b;
	if(e.siblings(".nav").length>0) {
	var f=e.attr("normalheight");
	if(f==-1) {
	f=e.css("height").replace("px","")
}
var d=d=e.siblings(".nav").height()||0;
	if(b>-1&&a.height()<(f+d)) {
	m=true;
	q=a.height()-d
}
}}}Fai.top.$("#banner").css("background","none");
	Fai.top.$("#banner").children().remove();
	Fai.top.$("#banner").css("height",q+"px");
	Fai.top.$("#banner").bannerImageSwitch( {
	data:o,index:h,width:n,height:q,from:"banner",playTime:Fai.top._bannerData.i,animateTime:Fai.top._bannerData.a,btnType:i,wideScreen:Fai.top._bannerData.ws
}
);
	var p=Fai.top.$("#banner").width();
	var l=Fai.top.$("#banner").height();
	if(m) {
	l=q
}
var c=(Fai.top.$("#containerFormsCenter").find("div").eq(0).attr("id"));
	var g=Fai.top.$("#banner .switchGroup");
	Fai.top.$("#banner .switchGroup .J_bannerItem").each(function(s) {
	if(p>=j[s]) {
	$(this).css("width",j[s]);
	var r=g.width()-j[s];
	if(Fai.isIE()) {
	r=r+(r%2)
}
$(this).siblings(".J_bannerEdge").css("width",(r/2)+"px")}else {
	$(this).css("width",p);
	var r=g.width()-p;
	if(Fai.isIE()) {
	r=r+(r%2)
}
$(this).siblings(".J_bannerEdge").css("width",(r/2)+"px")}if(l>=k[s]) {
	if(Site.checkBrowser()&&Fai.top._bannerData.at>0) {
	$(this).css("height",l)
}
else {
	$(this).css("height",k[s]);
	$(this).parent().css("paddingTop",(l-k[s])/2+"px")
}
$(this).siblings(".J_bannerEdge").css("height",k[s]);
	$(this).siblings(".J_bannerEdge").css("top",(l-k[s])/2+"px")}else {
	$(this).css("height",l);
	$(this).siblings(".J_bannerEdge").css("height",l)
}
})};
	Site.refreshDefaultBannerEdge=function() {
	var b=Fai.top.$("#banner");
	if(b.length>0) {
	var c=b.attr("defaultwidth")||960;
	if(b.children(".defaultBannerEdge").length>0) {
	var a=b.width()-c;
	a=(a+(a%2))/2;
	b.children(".defaultBannerEdge").css("width",a)
}
}};
	Site.checkBrowser=(function() {
	var c=["animation","MozAnimation","webkitAnimation","msAnimation","OAnimation"],e=["transform","MozTransform","webkitTransform","msTransform","OTransform"],b=["opacity","MozOpacity","webkitOpacity","msOpacity","OOpacity"],d=document.createElement("div"),a= {
	};
	return function(g) {
	if(typeof a[g]=="boolean") {
	return a[g]
}
switch(g) {
	case"animation":props=c;
	break;
	case"transform":props=e;
	break;
	case"opacity":props=b;
	break;
	default:props=c
}
for(var h=0,f=props.length;
	h<f;
	h++) {
	if(d.style[props[h]]!==undefined) {
	a[g]=true;
	return a[g]
}
}a[g]=false;
	return a[g]}})();
	Site.bannerAnimate= {
	};
	(function(g,p,h) {
	var B=false,t=1,b=0,f=-1,d=-1,c= {
	autoPlay:true,currentIndex:0,speed:1500,duration:4000,effectIndex:1
}
,D,s=false,v=true,l,n,x=0,z=0,i=0,r;
	p.init=function(E) {
	B=Site.checkBrowser();
	if(!B) {
	return
}
if(!E.container) {
	return
}
k();
	C(E);
	j();
	y()};
	function k() {
	s=false;
	clearTimeout(l);
	for(var E=0;
	E<x;
	E++) {
	q(r.eq(E)[0],o)
}
}function y() {
	m();
	if(D.autoPlay) {
	A()
}
}function A() {
	if(!s) {
	clearTimeout(l);
	l=setTimeout(p.next,D.duration)
}
}function u() {
	Site.refreshBanner(b)
}
p.autoPlay=function() {
	v=true;
	A()
}
;p.next=function() {
	var E=b+1;
	if(E>=r.length) {
	E=0
}
p.goTo(E,false)};
	p.prev=function() {
	var E=b-1;
	if(E<0) {
	E=r.length-1
}
p.goTo(E,true)};
	p.stop=function() {
	if(!v) {
	return
}
v=false;
	clearTimeout(l)};
	p.goTo=function(K,J) {
	if(isNaN(K)||K>=x||K<0||K==b) {
	return
}
if(s) {
	return
}
d=K;
	if(typeof J==="undefined") {
	var J=(d>b?false:true)
}
var L=Fai.top.$("#banner").find(".imageSwitchBtnArea"),E=Fai.top.$("#banner").find(".imageSwitchShowName"),G=E.children("span"),I=L.children("a"),P=r.eq(b),H=r.eq(d);
	if(Fai.top._bannerData.bt==0) {
	}else {
	if(Fai.top._bannerData.bt==1) {
	I.removeClass("imageSwitchBtnSel");
	I.eq(d).addClass("imageSwitchBtnSel")
}
else {
	if(Fai.top._bannerData.bt==2) {
	I.removeClass("imageSwitchBtnSel_dot");
	I.eq(d).addClass("imageSwitchBtnSel_dot")
}
}}G.removeClass("spanShowName");
	G.eq(d).addClass("spanShowName");
	H.css("display","block");
	if(t==11) {
	var N=["15% 15%","85% 85%","15% 85%","85% 15%"];
	var F=["billboardItem_11_on_zoomOut","billboardItem_11_on_zoomIn"];
	var O=N[Math.floor(Math.random()*N.length)];
	var M=F[Math.floor(Math.random()*F.length)];
	H.addClass(M).removeClass("billboardItem_11_off");
	w(H,"transformOrigin",O);
	P.addClass("billboardItem_11_off");
	P.removeClass("billboardItem_11_on_zoomIn billboardItem_11_on_zoomOut billboardItem_11_start")
}
else {
	P.removeClass("billboardItem_"+t+"_on billboardItem_"+t+"_on_reverse");
	P.addClass("billboardItem_"+t+"_off");
	H.removeClass("billboardItem_"+t+"_off billboardItem_"+t+"_off_reverse");
	H.addClass("billboardItem_"+t+"_on");
	if(J) {
	P.addClass("billboardItem_"+t+"_off_reverse");
	H.addClass("billboardItem_"+t+"_on_reverse")
}
}s=true;
	f=b;
	b=d;
	e(H[0],o)};
	function o() {
	if(q(this,o)) {
	s=false;
	r.eq(f).css("display","none");
	if(v) {
	clearTimeout(l);
	if(D.effectIndex==13) {
	u()
}
else {
	l=setTimeout(function() {
	p.next()
}
,D.duration)}}else {
	if(D.effectIndex==13) {
	u()
}
}}}function m() {
	var G;
	for(var F=0;
	F<r.length;
	F++) {
	G=r.eq(F);
	w(G,"animationDuration",D.speed+"ms")
}
var E=r.eq(D.currentIndex);
	E.addClass("billboardItem_"+t+"_start");
	r.css("display","none");
	E.css("display","block")}function e(E,F) {
	E.addEventListener("animationend",F,false);
	E.addEventListener("webkitAnimationEnd",F,false);
	E.addEventListener("oAnimationEnd",F,false);
	E.addEventListener("oanimationend",F,false);
	E.addEventListener("msAnimationEnd",F,false);
	return true
}
function q(E,F) {
	E.removeEventListener("animationend",F,false);
	E.removeEventListener("webkitAnimationEnd",F,false);
	E.removeEventListener("oAnimationEnd",F,false);
	E.removeEventListener("oanimationend",F,false);
	E.removeEventListener("msAnimationEnd",F,false);
	return true
}
function j() {
	z=n.width()||0;
	i=Fai.top.$("#banner").height()||0;
	var I;
	if(D.effectIndex==13) {
	n.addClass("billboard"+t)
}
n.css("height",i+"px");
	for(var H=0;
	H<r.length;
	H++) {
	I=r.eq(H);
	I.addClass("billboardItem_"+t+" billboardAnim");
	I.css( {
	width:z+"px",height:i+"px"
}
);
	if(t==6) {
	w(I,"transformOrigin","50% 50% "+(-z/2)+"px")
}
else {
	if(t==7) {
	w(I,"transformOrigin","50% 50% "+(-i/2)+"px")
}
else {
	if(t==8||t==9) {
	var G=g(document.createElement("div"));
	G.addClass("billboard_item billboardItem_"+t+" billboardItem_"+t+"_"+(H+1));
	for(var F=1;
	F<=3;
	F++) {
	var K=g(document.createElement("div"));
	K.addClass("billboardTile billboardTile_"+F+" billboardAnim");
	w(K,"animationDuration",D.speed+"ms");
	if(t==8) {
	w(K,"transformOrigin","50% 50% "+(-z/2)+"px")
}
else {
	w(K,"transformOrigin","50% 50% "+(-i/2)+"px")
}
var E=I.clone();
	E.attr("class","billboardImg").removeAttr("style");
	E.find(".J_bannerItem").addClass("billboardImgInner");
	g(K).append(E);
	g(G).append(K)}I.before(G);
	I.remove()}else {
	if(t==10||t==12) {
	var G=g(document.createElement("div"));
	G.addClass("billboard_item billboardItem_"+t+" billboardItem_"+t+"_"+(H+1));
	G.css( {
	width:"100%",height:i+"px"
}
);
	for(var F=1;
	F<=4;
	F++) {
	var K=g(document.createElement("div"));
	K.addClass("billboardTile billboardTile_"+F);
	var J=g(document.createElement("div"));
	J.addClass("billboardAnim billboardTileImg");
	w(J,"animationDuration",D.speed+"ms");
	K.append(J);
	var E=I.clone();
	E.attr("class","billboardImg").removeAttr("style");
	E.find(".J_bannerItem").addClass("billboardImgInner");
	J.append(E);
	G.append(K)
}
I.before(G);
	I.remove()}}}}}if(t==8||t==9||t==10||t==12) {
	r=n.children();
	x=r.length
}
}function C(E) {
	f=-1;
	d=-1;
	D=g.extend( {
	},c,E);
	t=D.effectIndex;
	if(D.effectIndex==13) {
	t=a(1,12)
}
b=D.currentIndex;
	v=D.autoPlay;
	n=D.container;
	r=n.children();
	x=r.length}function w(G,H,F) {
	var E=H.substring(0,1).toUpperCase()+H.substring(1);
	G.css("Webkit"+E,F);
	G.css("Moz"+E,F);
	G.css("ms"+E,F);
	G.css("O"+E,F);
	G.css(H,F)
}
function a(G,E) {
	var F=E-G+1;
	return Math.floor(Math.random()*F+G)
}
})(jQuery,Site.bannerAnimate);
	Site.initModuleProductSearch=function(e) {
	var d=$("#module"+e+" .productSearch");
	d.autocomplete( {
	source:function(g,f) {
	jQuery.ajax( {
	url:"ajax/product_h.jsp",data:"cmd=getKeywordList&limit=6&term="+Fai.encodeUrl(d.val())+"&prgmid="+e,type:"GET",dataType:"json",success:function(h) {
	f($.map(h,function(i) {
	return {
	label:i,value:i
}
}))}})},delay:100,select:function(g,h) {
	var f=h.item.label;
	Site.searchProduct(e,f)
}
});
	d.keypress(function(f) {
	if(f.keyCode==13) {
	Site.searchProduct(e)
}
});
	var c=$("#module"+e);
	var b=c.find(".searchBox").attr("class");
	var a=c.find(".recommandKeyBox");
	if(b=="searchBox") {
	a.css("vertical-align","7px")
}
else {
	a.css("vertical-align","11px")
}
};
	Site.searchProduct=function(b,a) {
	var c=$("#module"+b+" .g_itext").val();
	if(a) {
	c=a
}
Fai.top.location.href="pr.jsp?keyword="+Fai.encodeUrl($.trim(c))+"&_pp=0_"+b};
	Site.searchProductByKey=function(c,d,b) {
	var a="pr.jsp?keyword="+Fai.encodeUrl($.trim(d))+"&_pp=0_"+c;
	if(Fai.top._manageMode) {
	Site.redirectUrl(a,"_self",b,1,0)
}
else {
	Fai.top.location.href=a
}
};
	Site.memberCenterInit=function(a) {
	$(".mCenter .mCenterLeft li").click(function() {
	$(".mCenter .mCenterTitle").text($(this).find("span").html());
	var c=$(this).attr("id");
	var b=$(".mCenter .mCenterRight ."+c+"Panel");
	b.show();
	b.siblings().hide();
	$(this).addClass("selected");
	$(this).find("span").addClass("g_selected");
	$(this).siblings().removeClass("selected");
	$(this).siblings().find("span").removeClass("g_selected")
}
);
	switch(a) {
	case"memberOrder":$("#memberOrder")[0].click();
	break;
	case"memberIntegral":if($("#memberIntegral").length>0) {
	$("#memberIntegral")[0].click();
	break
}
case"memberInfo":$("#addrMsg").click();
	break;
	default:$("#memberProfile")[0].click();
	break}};
	Site.memberHeadPicInit=function(b) {
	if(typeof(headPic)!="undefined") {
	headPic=$.parseJSON(headPic);
	var a=headPic.width/100;
	$("#memberHeadPic").css( {
	width:headPic.imgW/a+"px",height:headPic.imgH/a+"px",top:-(headPic.top/a)+"px",left:-headPic.left/a+"px"
}
)}$(".memberHeadPic").on( {
	hover:function() {
	$(".hoverTip").toggle()
}
,click:function() {
	var c="memberHeadPicEdit.jsp?id="+b+"&headPic="+Fai.encodeUrl($.toJSON(headPic))+"&mCenter=1";
	Fai.popupWindow( {
	title:"自定义头像",bannerDisplay:false,frameSrcUrl:c,width:650,height:650,closeFunc:function(d) {
	if(d) {
	newImg=d.newImg;
	if(d.headPic.thumbId||newImg) {
	headPic=d.headPic;
	Site.showMemberHeadPic($("#memberHeadPic"),headPic,100);
	Site.showMemberHeadPic($("#topBarMemberPic"),headPic,30);
	$(".memberProfileBtn").click()
}
}}});
	$(".formDialog .formX_old").removeClass("formX_old").removeClass("formX").addClass("formXSite").css("margin-top","10px");
	$(".formDialog").addClass("formBox")}})};
	Site.img_sf=function(d) {
	var A=document.body,B=document.getElementById("img_1"),z=document.getElementById("img_2"),x=document.getElementById("img_3"),m=document.getElementById("imgShadow3"),g=document.getElementById("imgShadow1"),b=document.getElementById("imgShadow4"),c=document.getElementById("imgShadow5"),i=document.getElementById("imgShadow2"),p= {
	};
	if(d.width>350) {
	d.style.width=350;
	$(".imgArea").css("width","350px")
}
else {
	if(d.height>350) {
	d.style.height=350;
	$(".imgArea").css("height","350px")
}
}var e=d.height,s=d.width,j=Math.min(e,s),C=document.getElementById("img_dsf"),r=coverImgHeight=m.style.width==""?j:$(m).width(),a,f=$(".editPicArea");
	$(".imgArea").css("height",e+"px");
	coverImgLeft=m.style.width==""?(s-r)/2:m.offsetLeft,coverImgTop=m.style.width==""?(e-coverImgHeight)/2:m.offsetTop;
	t();
	$(".imgArea").css( {
	top:(f.height()-e)/2+"px",left:(f.width()-s)/2-10+"px"
}
);
	var l,w,o,u,k,n,y,v;
	var q=false;
	$("body").on("mouseup",function() {
	q=false
}
);
	$(".imgArea .coverBox,#layerImg").on( {
	mousedown:function(E) {
	E=E?E:window.event;
	l=m.offsetTop;
	w=m.offsetLeft;
	o=$(m).width();
	k= {
	x:E.clientX,y:E.clientY
}
;q=true;
	Site.enablePopupBtn("save",true);
	var D=E.target.id;
	if(D=="dragBotCenter"||D=="dragRightCenter"||D=="dragRightBot") {
	h(1)
}
else {
	if(D=="dragLeftCenter"||D=="dragLeftBot") {
	h(2)
}
else {
	if(D=="dragTopCenter"||D=="dragRightTop") {
	h(3)
}
else {
	if(D=="dragLeftTop") {
	h(4)
}
else {
	h(0)
}
}}}},mouseup:function() {
	q=false
}
});
	function h(D) {
	document.onmousemove=function(E) {
	if(!q) {
	return
}
E=E?E:window.event;
	n= {
	x:E.clientX,y:E.clientY
}
;y=n.x-k.x;
	v=n.y-k.y;
	switch(D) {
	case 0:r=o;
	coverImgTop=l+v;
	coverImgLeft=w+y;
	break;
	case 1:r=o+y;
	coverImgTop=l;
	coverImgLeft=w;
	break;
	case 2:r=o-y;
	coverImgTop=l;
	coverImgLeft=w+y;
	break;
	case 3:r=o+y;
	coverImgTop=l-y;
	coverImgLeft=w;
	break;
	case 4:r=o-y;
	coverImgTop=l+y;
	coverImgLeft=w+y;
	break
}
t()}}function t() {
	if(r<100) {
	r=100;
	coverImgHeight=100
}
else {
	if(r>Math.min(s,e)) {
	r=Math.min(s,e);
	coverImgHeight=Math.min(s,e)
}
}if(coverImgTop<0) {
	coverImgTop=0
}
else {
	if(coverImgTop>e-r) {
	coverImgTop=e-r
}
}if(coverImgLeft<0) {
	coverImgLeft=0
}
else {
	if(coverImgLeft>s-r) {
	coverImgLeft=s-r
}
}if(coverImgTop>=0&&coverImgTop<=e-r&&coverImgLeft>=0&&coverImgLeft<=s-r) {
	$(m).css( {
	width:r,height:r,top:coverImgTop,left:coverImgLeft
}
);
	$("#coverBox").css( {
	width:r-2,height:r-2,top:coverImgTop,left:coverImgLeft
}
);
	$(g).css( {
	width:s,height:coverImgTop,top:0,left:0
}
);
	$(i).css( {
	width:coverImgLeft,height:r,top:coverImgTop,left:0
}
);
	$(b).css( {
	width:s-r-coverImgLeft,height:r,top:coverImgTop,left:r+coverImgLeft
}
);
	$(c).css( {
	width:s,height:e-r-coverImgTop,top:r+coverImgTop,left:0
}
);
	a=[r/100,r/50,r/30];
	$("#img_1").css( {
	width:s/a[0],height:e/a[0],top:-coverImgTop/a[0],left:-coverImgLeft/a[0]
}
);
	$("#img_2").css( {
	width:s/a[1],height:e/a[1],top:-coverImgTop/a[1],left:-coverImgLeft/a[1]
}
);
	$("#img_3").css( {
	width:s/a[2],height:e/a[2],top:-coverImgTop/a[2],left:-coverImgLeft/a[2]
}
)}}};
	Site.showMemberHeadPic=function(d,a,b) {
	d.attr("src",a.path);
	var c=a.width/b;
	d.css( {
	width:a.imgW/c,height:a.imgH/c,top:-a.top/c,left:-a.left/c
}
)};
	Site.memberImgFileUpload=function(a,c,e) {
	var d=e.split(",");
	var b= {
	file_post_name:"Filedata",upload_url:"/static/web/ajax/memberHeadImgUp_h.jsp",button_placeholder_id:c,file_size_limit:a+"MB",file_queue_limit:1,button_cursor:SWFUpload.CURSOR.HAND,button_width:"80",button_height:"30",requeue_on_error:false,post_params: {
	ctrl:"Filedata",app:21
}
,file_types:d.join(";
	"),file_dialog_complete_handler:function(f) {
	this._allSuccess=false;
	this.startUpload()
}
,file_queue_error_handler:function(g,f,h) {
	switch(f) {
	case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:Fai.ing(LS.siteFormSubmitCheckFileSizeErr,true);
	break;
	case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:Site.initPopupBox(LS.mobiFormSubmitFileUploadNotAllow,"alert","");
	break;
	case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:Site.initPopupBox(jm.format(LS.mobiFormSubmitFileUploadOneTimeNum,"1"),"alert","");
	break;
	default:Site.initPopupBox(LS.mobiFormSubmitFileUploadReSelect,"alert","");
	break
}
},upload_success_handler:function(g,f) {
	var h=jQuery.parseJSON(f);
	this._allSuccess=h.success;
	this._sysResult=h.msg;
	if(h.success) {
	onFileUploadEvent("upload",h)
}
else {
	$("#imgShadow3").removeClass("loading");
	$("#imgShadow3").children().show();
	Fai.ing("文件"+g.name+"，"+h.msg)
}
},upload_error_handler:function(g,f,h) {
	if(f==-280) {
	Fai.ing("文件取消成功",false)
}
else {
	if(f==-270) {
	Fai.ing("已经存在名称为"+g.name+"的文件。",true)
}
else {
	Fai.ing("服务繁忙，文件"+g.name+"上传失败，请稍候重试。")
}
}$("#imgShadow3").removeClass("loading");
	$("#imgShadow3").children().show()},upload_complete_handler:function(f) {
	if(f.filestatus==SWFUpload.FILE_STATUS.COMPLETE&&this._allSuccess) {
	swfObj.startUpload()
}
else {
	if(f.filestatus==SWFUpload.FILE_STATUS.ERROR) {
	Fai.ing("服务繁忙，文件"+f.name+"上传失败，请稍候重试。");
	$("#imgShadow3").removeClass("loading");
	$("#imgShadow3").children().show()
}
}},upload_start_handler:function(f) {
	Fai.enablePopupWindowBtn(0,"save",false);
	Fai.ing("读取文件准备上传",false)
}
,view_progress:function(f,i,h,g) {
	Fai.ing("正在上传"+g+"%",false);
	$("#imgShadow3").addClass("loading");
	$("#imgShadow3").children().hide()
}
};
	swfObj=SWFUploadCreator.create(b);
	onFileUploadEvent=function(n,j) {
	if(n=="upload") {
	var k=j.name,i=j.size,h=j.path,m=j.id,f=j.width,l=j.height;
	smallPath=j.smallPath;
	newImg=j;
	var g=new Image();
	g.src=smallPath;
	g.onload=function() {
	Fai.ing(Fai.format(LS.siteFormSubmitFileUploadSucess,Fai.encodeHtml(k)),true);
	$("#imgShadow3").removeClass("loading");
	$("#imgShadow3").children().show();
	$(".formBodyContent").find(".editPicArea #memberHeadPic").attr("src",smallPath);
	$(".formBodyContent").find(".viewPicArea img").attr("src",smallPath);
	$("#imgShadow3").css("width","")
}
;Site.enablePopupBtn("save",true)}}};
	Site.initPopupBox=function(f,d,e) {
	var b=["<div style='padding:5px 20px;
	font-size:1rem;
	font-weight:bold;
	'>",f,"</div>"];
	if(d=="confirm") {
	b.push("<div style='display:inline-block;
	width:100%;
	text-align:center;
	'>");
	b.push("		<div class='confirmBtn' style='display:inline-block;
	zoom:1;
	*display:inline;
	width:70px;
	height:35px;
	text-align:center;
	margin:10px 10px 10px auto;
	line-height:35px;
	border-radius:4px;
	background:#F00180;
	color:#FFF;
	font-size:15px;
	'>确 定</div>");
	b.push("		<div class='cancelBtn' style='display:inline-block;
	zoom:1;
	*display:inline;
	width:70px;
	height:35px;
	text-align:center;
	margin:10px auto 10px 10px;
	line-height:35px;
	border-radius:4px;
	border:1px solid #a1a1a1;
	font-size:15px;
	' >取 消</div>");
	b.push("</div>")
}
else {
	b.push("		<div class='confirmBtn' style='width:70px;
	height:35px;
	text-align:center;
	margin:10px auto;
	line-height:35px;
	border-radius:4px;
	background:#F00180;
	color:#FFF;
	font-size:15px;
	'>确 定</div>")
}
var a= {
	};
	a.htmlContent=b.join("");
	a.width=320;
	a.height=130;
	var c=Site.popupBox(a);
	c.find(".popupBClose").css("margin","10px 0px auto auto");
	c.on("click",".confirmBtn",function() {
	c.find(".popupBClose").click();
	e()
}
);
	c.on("click",".cancelBtn",function() {
	c.find(".popupBClose").click()
}
)};
	Site.enablePopupBtn=function(c,a) {
	var b=$("#"+c);
	if(a) {
	b.removeAttr("disabled");
	b.removeClass("saveButton-disabled");
	b.faiButton("enable")
}
else {
	b.attr("disabled",true);
	b.faiButton("disable")
}
};
	Site.memberAddrMsgOpera=function(e,b,f,d,j) {
	var n="-----------",l=[],h,m,c,g,a,i,k;
	if(j==2052||j==1028) {
	k=site_cityUtil.getProvince();
	site_cityUtil.simpleProvinceName(k)
}
else {
	k=site_cityUtil.getProvinceEn();
	site_cityUtil.simpleProvinceNameEn(k)
}
$(".addAddrMsgPanel,.edit").click(function() {
	var u="",t=0,p="",s="",C="";
	if($(this).attr("class")=="edit") {
	C=$(this).parent().parent().attr("_item");
	u="ajax/memberAdm_h.jsp?cmd=set&opera=edit&id="+e+"&item="+C;
	p=f[C];
	t=p.isDefault;
	s="edit"
}
else {
	u="ajax/memberAdm_h.jsp?cmd=set&opera=add&id="+e;
	if(f.length==0) {
	t=1
}
else {
	t=0
}
s="add"}var x="<div style='width:130px;
	height:1px;
	font-size:0;
	background-color:#44a5ff;
	margin-left:26px;
	float:left;
	' />";
	x+="<div style='width:234px;
	height:1px;
	font-size:0;
	background-color:#dadada;
	margin-left:146px;
	' />";
	x+="<div class='editAddrInfo'>";
	for(var v=0;
	v<b.length;
	v++) {
	var A=b[v].fieldKey;
	var o=b[v].name;
	var y=b[v].required;
	x+="<div class='addrInfoItem'>";
	if(A!="addr") {
	x+="<div class='propItemName'>"+o+":</div>"
}
if(A=="addr") {
	x+="<div class='propItemName'>"+LS.province+":</div>";
	x+="<div class='propItemValue'><select id='addrInfo_province'></select></div>";
	if(y) {
	x+="<div class='g_stress'>*</div>"
}
x+="<div class='propItemName'>"+LS.city+":</div>";
	x+="<div class='propItemValue'><select id='addrInfo_city'></select></div>";
	if(y) {
	x+="<div class='g_stress'>*</div>"
}
x+="<div class='propItemName'>"+LS.county+":</div>";
	x+="<div class='propItemValue'><select id='addrInfo_county'></select></div>";
	x+="<div id='addrInfoStreet'>";
	x+="<div class='propItemName'>"+LS.streetAddress+":</div>";
	x+="<div class='propItemValue'><textarea id='addrInfo_street' style='height:80px;
	'></textarea></div>";
	if(y) {
	x+="<div class='g_stress'>*</div>"
}
x+="</div>"}else {
	x+="<div class='propItemValue'><input id='"+A+"' class='propItemEdit' style='-webkit-border-radius:0;
	-moz-border-radius:0;
	border:1px solid #e7e7e7;
	text-indent:6px;
	' maxlength=50></input></div>";
	if(y) {
	x+="<div class='g_stress'>*</div>"
}
}x+="</div>"}x+="</div>";
	x+="<div class='saveOrCancel'>";
	x+="<div class='cancel popupBClose' style='width:76px;
	height:35px;
	'>"+LS.cancel+"</div>";
	x+="<div class='save' style='width:86px;
	height:35px;
	'>"+LS.confirm+"</div>";
	x+="</div>";
	var B=parseInt(Math.random()*10000);
	var D= {
	boxId:B,title:LS.editAddrMsg,htmlContent:x,width:410,boxName:"addrInfo"
}
;var w=Site.popupBox(D);
	if(Fai.isIE6()||Fai.isIE7()) {
	$(".editAddrInfo").find(".addrInfoItem").attr("style","width:100%;
	");
	$(".editAddrInfo").find(".addrInfoItem").find("#addrInfoStreet").attr("style","width:100%;
	")
}
$.each(k,function(E,F) {
	if(j==2052||j==1028) {
	l.push("<option value='"+F.id+"'>"+site_cityUtil.simpleCityNameStr(F.name)+"</option>")
}
else {
	l.push("<option value='"+F.id+"'>"+site_cityUtil.simpleCityNameStrEn(F.name)+"</option>")
}
});
	$("#addrInfo_province").html("").html("<option value='-1'>"+n+"</option>"+l.join("")).change(function(E) {
	h=$("#addrInfo_province").val();
	if(isNaN(h)||h<=0) {
	$("#addrInfo_city").html("").html("<option value='-1'>"+n+"</option>");
	$("#addrInfo_county").html("").html("<option value='-1'>"+n+"</option>")
}
c=[];
	if(j==2052||j==1028) {
	m=site_cityUtil.getCities(h);
	site_cityUtil.simpleCityName(m)
}
else {
	m=site_cityUtil.getCitiesEn(h);
	site_cityUtil.simpleCityNameEn(m)
}
$.each(m,function(F,G) {
	c.push("<option value='"+G.id+"' >"+G.name+"</option>")
}
);
	$("#addrInfo_city").html("").html("<option value='-1'>"+n+"</option>"+c.join("")).unbind().bind("change",function(F) {
	g=$("#addrInfo_city").val();
	if(isNaN(g)||g<=0) {
	$("#addrInfo_county").html("").html("<option value='-1'>"+n+"</option>")
}
i=[];
	if(j==2052||j==1028) {
	a=site_cityUtil.getCounty(g)
}
else {
	a=site_cityUtil.getCountyEn(g)
}
$.each(a,function(G,H) {
	i.push("<option value='"+H.id+"' >"+H.name+"</option>")
}
);
	$("#addrInfo_county").html("").html("<option value='-1'>"+n+"</option>"+i.join("")).unbind().bind("change",function(G) {
	})
}
)});
	$("#addrInfo_city").html("").html("<option value='-1'>"+n+"</option>");
	$("#addrInfo_county").html("").html("<option value='-1'>"+n+"</option>");
	if($(this).attr("class")=="edit") {
	for(var v=0;
	v<b.length;
	v++) {
	var A=b[v].fieldKey;
	var r=p[A];
	if(A=="addr") {
	var q=p.addr_info;
	if(q!=null) {
	$("#addrInfo_province").val(q.provinceCode);
	$("#addrInfo_province").change();
	$("#addrInfo_city").val(q.cityCode);
	$("#addrInfo_city").change();
	$("#addrInfo_county").val(q.countyCode);
	$("#addrInfo_street").val(q.streetAddr)
}
else {
	$("#addrInfo_street").val(p.addr)
}
}if(r==null) {
	r=""
}
$(".propItemValue").find("#"+A).val(r)}}var p= {
	};
	var z= {
	};
	w.find(".saveOrCancel .save").on("click",function() {
	for(var I=0;
	I<b.length;
	I++) {
	var L=b[I].fieldKey;
	var E=b[I].name;
	var K=b[I].required;
	if(L=="addr") {
	var G=$("#addrInfo_county");
	var J=$("#addrInfo_city");
	var H=$("#addrInfo_province");
	var M=$("#addrInfo_street");
	if(K&&H.val()=="-1") {
	Fai.ing(LS.mallStlSubmitAddrErr,1);
	return
}
if(K&&J.val()=="-1") {
	Fai.ing(LS.mallStlSubmitAddrErr,1);
	return
}
if(K&&M.val()=="") {
	Fai.ing(LS.editStreetAddr,1);
	return
}
z.provinceCode=H.val();
	z.cityCode=J.val();
	z.countyCode=G.val();
	z.streetAddr=M.val();
	p.addr_info=z;
	p.addr=(H.val()=="-1"?"":H.find("option:selected").text())+(J.val()=="-1"?"":J.find("option:selected").text())+(G.val()=="-1"?"":G.find("option:selected").text())+M.val()}else {
	var F=$(".editAddrInfo").find("#"+L).val();
	if(K&&F.length==0) {
	Fai.ing(LS.addrInfoInputError+E,1);
	return
}
if((L=="email"&&!Fai.isEmail(F)&&K)||(L=="phone"&&!Fai.isPhone(F)&&K)) {
	Fai.ing(LS.addrInfoInputError+E,1);
	return
}
p[L]=F}}p.isDefault=t;
	$.ajax( {
	type:"post",url:u,data:"info="+Fai.encodeUrl($.toJSON(p)),success:function(N) {
	if(d==1) {
	var O=document.location.search.search(/imme/)>-1?"?imme&":"?";
	if(s=="add") {
	document.location.href="mstl.jsp"+O+"opera=add"
}
else {
	if(s=="edit") {
	document.location.href="mstl.jsp"+O+"opera=edit&_item="+C
}
else {
	document.location.href="mstl.jsp"+O
}
}}else {
	document.location.href="mCenter.jsp?item=memberInfo"
}
},error:function() {
	Fai.ing("服务繁忙，请稍后重试")
}
})})});
	$(".delete").click(function() {
	var o=$(this).parent().parent().attr("_item");
	var q=["<div class='fk-cancelOrder'>","<div style='padding:10px;
	'>",LS.conCancelAddrInfo,"</div>","<div style='padding:10px 0 18px 0;
	'>","<span class='J-rpt-cancel popupBClose' style='margin-right:20px;
	'>",LS.cancel,"</span>","<span class='J-rpt-save con-hover'>"+LS.confirm+"</span>","</div>","</div>"];
	var t=parseInt(Math.random()*10000);
	var p= {
	boxId:t,title:"",htmlContent:q.join(""),width:300
}
;var r=Site.popupBox(p);
	var s="ajax/memberAdm_h.jsp?cmd=set&opera=delete&id="+e+"&item="+o;
	r.find(".J-rpt-save").on("click",function() {
	$.ajax( {
	type:"post",url:s,error:function() {
	Fai.ing(LS.systemError,false)
}
,success:function(u) {
	var v=$.parseJSON(u);
	if(v.success) {
	if(d==1) {
	var w=document.location.search.search(/imme/)>-1?"?imme":"";
	document.location.href="mstl.jsp"+w
}
else {
	document.location.href="mCenter.jsp?item=memberInfo"
}
}else {
	Fai.ing(v.msg,true)
}
}})})});
	$(".makeDefault").click(function() {
	var p=$(this).parent().parent().attr("_item");
	var o="ajax/memberAdm_h.jsp?cmd=set&opera=default&id="+e+"&item="+p;
	$.ajax( {
	type:"post",url:o,error:function() {
	Fai.ing(LS.systemError,false)
}
,success:function(q) {
	var r=$.parseJSON(q);
	if(r.success) {
	if(d==1) {
	var s=document.location.search.search(/imme/)>-1?"?imme":"";
	document.location.href="mstl.jsp"+s
}
else {
	document.location.href="mCenter.jsp?item=memberInfo"
}
}else {
	Fai.ing(r.msg,true)
}
}})});
	if(Fai.isIE6()) {
	$(".addrMsg,.addrMsg_default").hover(function() {
	if($(this).hasClass("isDefault")) {
	$(this).find(".edit").attr("style","margin-left:85px;
	")
}
else {
	$(this).find(".edit").attr("style","margin-left:70px;
	")
}
$(this).find(".other").attr("style","top:90px;
	")},function() {
	$(this).find(".other").attr("style","top:150px;
	")
}
)}};
	Site.memberIntegralInit=function(a) {
	$("#integralTabLine").find(".integralTab").click(function() {
	$("#integralTabLine").find(".g_title").removeClass("g_title");
	$(this).addClass("g_title")
}
);
	if(a==="income") {
	$("#incomeTab").addClass("g_title")
}
else {
	if(a==="expense") {
	$("#expenseTab").addClass("g_title")
}
else {
	$("#totalTab").addClass("g_title")
}
}};
	Site.loadPdCollectionList=function(b,a) {
	this.pIdList=a;
	this.mid=b;
	this.panel=$(".memberCollectionPanel")
}
;(function(f,b,e) {
	var g=b.prototype,o,h,a,l=[],m=12,k;
	g.init=function() {
	h=this.pIdList,a=this.panel;
	o=this.mid;
	c();
	p();
	var r=h.slice(0,m);
	k=r.length;
	d(r);
	q()
}
;function c() {
	f.post("ajax/product_h.jsp" {
	mid:o,cmd:"updateCollections",ids:f.toJSON(h)
}
,function(r) {
	if(r.success) {
	h=r.list
}
},"json")}function d(r) {
	f.ajax( {
	url:"ajax/product_h.jsp",data: {
	cmd:"batchGetPd",ids:f.toJSON(r)
}
,async:false,type:"POST",dataType:"json",success:function(s) {
	if(s.success) {
	j(r,s.list)
}
}})}function i() {
	var s= {
	},r=false;
	s.productCollections=h.reverse()+"";
	f.ajax( {
	url:"ajax/member_h.jsp",data: {
	cmd:"set",id:o,info:f.toJSON(s)
}
,async:false,type:"POST",dataType:"json",success:function(t) {
	if(t.success) {
	r=true
}
else {
	r=false
}
}});
	return r}function p() {
	var r=Math.ceil(h.length/m);
	if(a.find(".pagination").length==0) {
	a.append('<div class="pagination"><a id="upPage">'+LS.prevPager+'</a> <span id="currentPage">1</span>/<span id="totalPage">'+r+'</span>页 <a id="downPage">'+LS.nextPager+"</a></div>")
}
else {
	f("#totalPage").text(r)
}
if(r>Number(f("#currentPage").text())) {
	f("#downPage").addClass("g_border")
}
else {
	f("#downPage").removeClass("g_border")
}
if(f("#currentPage").text()!="1") {
	f("#upPage").addClass("g_border")
}
else {
	f("#upPage").removeClass("g_border")
}
}function j(r,s) {
	var t=[];
	f.each(s,function(w,u) {
	t.push("<li>");
	t.push('	<div class="pdImg">');
	t.push('		<a href="pd.jsp?id='+u.id+'">');
	t.push('			<div class="delColl" data-id="'+u.id+'">');
	t.push('				<div class="delCollBg"></div>');
	t.push('				<div class="delCollIcon"></div>');
	t.push("			</div>  ");
	t.push('			<img src="'+u.picPath+'" />');
	t.push("		</a>");
	t.push("	</div>  ");
	t.push('	<div class="pdName">'+u.name+"</div>");
	t.push('	<div class="pdPrice">');
	if(u.mallPrice!=-1) {
	t.push('		<div class="mallPrice">￥ '+u.mallPrice+"</div>")
}
if(u.mallMarketPrice!=-1) {
	t.push('		<div class="mallMarketPrice">￥ '+u.mallMarketPrice+"</div>")
}
t.push("	</div>");
	t.push("</li>")});
	a.find(".collectionList").append(t.join(""))}function q() {
	a.on( {
	hover:function() {
	f(this).find(".delColl").show()
}
,mouseleave:function() {
	f(this).find(".delColl").hide()
}
},".pdImg");
	a.on("click",".delColl",function() {
	var s=f(this);
	s.parents("a").attr("href","javascript:;
	");
	var r=s.attr("data-id");
	var u=h.indexOf(Number(r));
	if(u>-1) {
	h.splice(u,1)
}
var v=["<div class='fk-cancelOrder'>","<div style='padding:10px;
	'>",LS.sureDelCollection,"</div>","<div style='padding:10px 0 18px 0;
	'>","<span class='J-rpt-cancel popupBClose' style='margin-right:20px;
	'>",LS.cancel,"</span>","<span class='J-rpt-save con-hover'>"+LS.confirm+"</span>","</div>","</div>"];
	var x=parseInt(Math.random()*10000);
	var t= {
	boxId:x,title:"",htmlContent:v.join(""),width:300
}
;var w=Site.popupBox(t);
	w.find(".J-rpt-save").on("click",function() {
	if(i()) {
	s.parents("li").remove()
}
else {
	Fai.ing(LS.systemError);
	return
}
p();
	if(h.length>k) {
	var A=h[k];
	k=k+1;
	var z=[];
	z.push(A);
	d(z)
}
n();
	if(h.length==0) {
	a.find(".collectionList").html("<div class='noCollIcon'></div><div class='noCollTip'>"+LS.notCollection+"</div>");
	a.find(".pagination").remove()
}
var y=true;
	f(".collectionList li").each(function() {
	if(!f(this).is(":hidden")) {
	y=false;
	return true
}
});
	if(y) {
	f("#upPage").click()
}
w.find(".popupBClose").click()})});
	a.on("click","#downPage",function() {
	if(f(this).hasClass("g_border")) {
	f("#currentPage").text(Number(f("#currentPage").text())+1);
	p();
	if(h.length>k) {
	var r=h.slice(k,k+m);
	k=k+r.length;
	if(r.length>0) {
	d(r)
}
}n()}});
	a.on("click","#upPage",function() {
	if(f(this).hasClass("g_border")) {
	f("#currentPage").text(Number(f("#currentPage").text())-1);
	p();
	n()
}
})}function n() {
	var r=Number(f("#currentPage").text())-1;
	a.find(".collectionList").children().hide();
	var t=r*m;
	for(var s=t;
	s<t+12;
	s++) {
	a.find(".collectionList li:eq("+s+")").show()
}
}})(jQuery,Site.loadPdCollectionList);
	Site.memberProfileResetPwd=function(c) {
	var a=Fai.top.$("#module"+c);
	var b=a.find(".itemPwd");
	if(b.is(":visible")) {
	b.hide();
	a.find(".resetPwd").html(LS.memberProfileResetPwd)
}
else {
	b.show();
	a.find(".resetPwd").html(LS.memberProfileCanelPwd)
}
};
	Site.memberProfileSubmit=function(b,o) {
	var d=$("#module"+b);
	d.find(".memberProfileMsg").show();
	var e=d.find(".memberProfileMsg .msgText");
	var f= {
	};
	$(".userEditItem").each(function() {
	userEditItemName=$(this).attr("id");
	a=$(this).val();
	f[userEditItemName]=a
}
);
	var p=d.find(".itemPwd");
	if(p.is(":visible")) {
	var g=$("#memberProfileOldPwd").val();
	if(g==null||g=="") {
	e.html(LS.memberProfileOldPwdEmpty);
	$("#memberProfileOldPwd").focus();
	return
}
var n=$("#memberProfilePwd").val();
	if(n==null||n=="") {
	e.html(LS.memberProfilePwdEmpty);
	$("#memberProfilePwd").focus();
	return
}
if(n.length<4) {
	e.html(LS.memberProfilePwdMinLength);
	$("#memberProfilePwd").focus();
	return
}
var i=$("#memberProfileRepwd").val();
	if(n!=i) {
	e.html(LS.memberProfilePwdNotMatch);
	$("#memberProfileRepwd").focus();
	return
}
f.oldPwd=$.md5(g);
	f.pwd=$.md5(n)}var m="";
	var a="";
	var l=0;
	$(".userEditItem").each(function() {
	userEditItemID=$(this).attr("id");
	a=$(this).val();
	userEditItemName=$(this).attr("name");
	userEditItemMaxLength=$(this).attr("maxlength");
	f[m]=a;
	if(userEditItemID=="email"&&a.length>0) {
	if(!Fai.isEmail(a)) {
	e.html(Fai.format(LS.memberProfileItemCorrect,userEditItemName));
	$(this).focus();
	l=1;
	return false
}
}if(a.length>userEditItemMaxLength) {
	e.html(Fai.format(LS.memberProfileUserEditItemMaxLength,userEditItemName,userEditItemMaxLength));
	$(this).focus();
	l=1;
	return false
}
});
	if(l==1) {
	return
}
var h=0;
	var j=0;
	var k="";
	$(".isCheckUAI").each(function() {
	userEditItemID=$(this).attr("id");
	a=$(this).val();
	userEditItemName=$(this).attr("name");
	if(a==null||a=="") {
	if($(this).is("input")) {
	e.html(Fai.format(LS.memberSignupUserAddItemIsEmpty,userEditItemName))
}
else {
	e.html(Fai.format(LS.memberSignupUserAddItemIsEmpty2,userEditItemName))
}
$(this).focus();
	h=1;
	return false}if(userEditItemID=="email"&&a.length>0) {
	if(!Fai.isEmail(a)) {
	e.html(Fai.format(LS.memberProfileItemCorrect,userEditItemName));
	$(this).focus();
	j=1;
	return false
}
}});
	if(h==1) {
	return
}
if(j==1) {
	return
}
var c=d.find(".memberProfileBtn");
	c.attr("disabled",true);
	e.html(LS.memberProfileSubmitting);
	if("id" in newImg&&oldImgId!=newImg.id) {
	$.ajax( {
	type:"post",url:"../static/web/ajax/member_h.jsp?cmd=cimg",data:"oldImgId="+oldImgId+"&mid="+o+"&newImg="+Fai.encodeUrl($.toJSON(newImg)),async:false,error:function() {
	Fai.ing("服务繁忙，请稍后重试")
}
,success:function(q) {
	q=jQuery.parseJSON(q);
	if(q.success) {
	headPic.thumbId=q.fileId
}
}})}f.headPic=headPic;
	$.ajax( {
	type:"post",async:false,url:"ajax/member_h.jsp?cmd=set",data:"id="+o+"&info="+Fai.encodeUrl($.toJSON(f)),error:function() {
	c.removeAttr("disabled");
	e.html(LS.memberProfileError)
}
,success:function(q) {
	c.removeAttr("disabled");
	var r=jQuery.parseJSON(q);
	if(r.success) {
	e.html(LS.memberProfileOK);
	setTimeout(function() {
	e.html("");
	e.parent().hide()
}
,3000);
	d.find(".itemPwd").hide();
	d.find(".itemPwd input").val("");
	d.find(".resetPwd").html(LS.memberProfileResetPwd)}else {
	if(r.rt=-3) {
	e.html(LS.memberProfileOldPwdIncorrectError)
}
else {
	e.html(LS.memberProfileError)
}
}}})};
	Site.initModuleMemberSignup=function(b,e,d,a) {
	$("#memberSignupAcct").focus();
	if(e==2) {
	$("#module"+b).find(".formMiddle").addClass("memberSignupMiddle");
	var c=$("#module"+b).find("#memberSignupButton");
	$(c).unbind("click").bind("click",function() {
	if(d) {
	Fai.ing("您目前处于网站管理状态，请先点击网站右上方的“退出”后再注册会员。")
}
else {
	Site.memberSignupSubmit(b,a,e)
}
});
	Site.memberSignupCompatibility(b)}};
	Site.memberSignupCompatibility=function(a) {
	if(Fai.isIE6()) {
	var c=$("#module"+a).find(".J_memberSignupPanel");
	$(c).removeAttr("style");
	var b=$(c).width();
	if(b>313||b<200) {
	b=(b>313)?"313px":(b<200)?"200px":"auto";
	$(c).css("width",b)
}
}};
	Site.memberSignupSubmit=function(b,a,i) {
	if(_siteDemo) {
	Fai.ing("当前为“样板网站”，请先“复制网站”再进行注册。");
	return
}
var c=$("#module"+b);
	var h=c.find("#memberSignupAcct").val();
	var f=c.find("#memberSignupPwd").val();
	var g=Site.checkSignupValid(b,i);
	if(!g.checkResult) {
	return
}
var d=c.find(".memberSignupBtn");
	var e=c.find(".memberSignupMsg .msgText");
	d.attr("disabled",true);
	e.html(LS.memberSignupRegisterIng);
	$.ajax( {
	type:"post",url:"ajax/member_h.jsp?cmd=add",data:"info="+Fai.encodeUrl($.toJSON(g.info))+"&validateCode="+g.captcha,error:function() {
	d.removeAttr("disabled");
	Site.showSignupMsg(i,b,"",LS.memberSignupRegisterError,true)
}
,success:function(j) {
	var k=jQuery.parseJSON(j);
	if(k.success) {
	if(k.active) {
	Site.memberActiveDialog(g.info.email,Fai.encodeUrl(g.info.acct),function() {
	if(a) {
	Fai.top.location.href="login.jsp?errno=12&url="+Fai.encodeUrl(a)
}
else {
	Fai.top.location.href="login.jsp?errno=12"
}
Fai.top.event.returnValue=false})}else {
	if(a) {
	Site.autoLogin(h,f,a)
}
else {
	Fai.top.location.href="login.jsp?errno=12"
}
}}else {
	d.removeAttr("disabled");
	Site.changeCaptchaImg($("#memberSignupCaptchaImg")[0]);
	$("#memberSignupCaptcha").val("");
	if(k.rt==-401) {
	Site.showSignupMsg(i,b,"memberSignupCaptcha",LS.memberSignupRegisterCaptchaNotMatch)
}
else {
	if(k.rt==-6) {
	Site.showSignupMsg(i,b,"memberSignupAcct",LS.memberSignupRegisterExisted)
}
else {
	if(k.rt==-4) {
	Site.showSignupMsg(i,b,"",LS.memberSignupRegisterLimit,true)
}
else {
	Site.showSignupMsg(i,b,"",LS.memberSignupRegisterError,true)
}
}}}}})};
	Site.autoLogin=function(c,b,a) {
	b=$.md5(b);
	$.ajax( {
	type:"post",url:"ajax/login_h.jsp",data:"cmd=loginMember&acct="+Fai.encodeUrl(c)+"&pwd="+Fai.encodeUrl(b),error:function() {
	Fai.top.location.href="login.jsp?errno=-1&url="+Fai.encodeUrl(a)+"&acct="+Fai.encodeUrl(c)
}
,success:function(d) {
	var d=jQuery.parseJSON(d);
	if(d.success) {
	Fai.top.location.href=a;
	return
}
else {
	Fai.top.location.href="login.jsp?returnUrl="+Fai.encodeUrl(a)
}
}})};
	Site.memberSignup=function(a) {
	if(a) {
	Fai.top.location.href="signup.jsp?url="+Fai.encodeUrl(a)
}
else {
	Fai.top.location.href="signup.jsp"
}
};
	Site.checkSignupValid=function(r,e) {
	var b= {
	checkResult:true,captcha:"",info: {
	}
}
;var a=$("#module"+r);
	a.find(".memberSignupMsg").show();
	var d=a.find(".memberSignupMsg .msgText");
	var k=$.trim($("#memberSignupAcct").val());
	if(k==null||k=="") {
	Site.showSignupMsg(e,r,"memberSignupAcct",LS.memberSignupRegisterAcctEmpty);
	b.checkResult=false;
	return b
}
var g=$("#memberSignupPwd").val();
	if(g==null||g=="") {
	Site.showSignupMsg(e,r,"memberSignupPwd",LS.memberSignupRegisterPwdEmpty);
	b.checkResult=false;
	return b
}
if(g.length<4) {
	Site.showSignupMsg(e,r,"memberSignupPwd",LS.memberSignupRegisterPwdMinLength);
	b.checkResult=false;
	return b
}
var m=$("#memberSignupRepwd").val();
	if(g!=m) {
	Site.showSignupMsg(e,r,"memberSignupRepwd",LS.memberSignupRegisterPwdNotMatch);
	b.checkResult=false;
	return b
}
var n="";
	if($("#memberSignupRemark").length>0) {
	n=$("#memberSignupRemark").val();
	var s=$("#memberSignupRemark").attr("maxlength");
	if(n.length>s) {
	Site.showSignupMsg(e,r,"memberSignupRemark",Fai.format(LS.memberSignupRegisterRemarkMaxLength,s));
	b.checkResult=false;
	return b
}
}b.info.acct=k;
	b.info.pwd=$.md5(g);
	b.info.remark=n;
	var c="";
	var o="";
	var h="";
	var q=0;
	var l="";
	var f=0;
	var j="";
	$(".userAddItem").each(function() {
	userAddItemID=$(this).attr("id");
	h=$(this).val();
	c=$(this).attr("name");
	l=$(this).attr("maxlength");
	b.info[userAddItemID]=h;
	if(h.length>l) {
	Site.showSignupMsg(e,r,userAddItemID,Fai.format(LS.memberSignupUserAddItemMaxLength,c,l));
	q=1;
	b.checkResult=false;
	return b
}
if(userAddItemID=="phone"&&h.length>0) {
	if(!Fai.isPhone(h)) {
	Site.showSignupMsg(e,r,userAddItemID,Fai.format(LS.memberSignupUserAddItemCorrect,c));
	f=1;
	b.checkResult=false;
	return b
}
}if(userAddItemID=="email"&&h.length>0) {
	if(!Fai.isEmail(h)) {
	Site.showSignupMsg(e,r,userAddItemID,Fai.format(LS.memberSignupUserAddItemCorrect,c));
	f=1;
	b.checkResult=false;
	return b
}
}});
	if(f==1) {
	b.checkResult=false;
	return b
}
if(q==1) {
	b.checkResult=false;
	return b
}
var i=0;
	$(".isCheckUAI").each(function() {
	userAddItemID=$(this).attr("id");
	h=$(this).val();
	c=$(this).attr("name");
	if(h==null||h=="") {
	if($(this).is("input")) {
	Site.showSignupMsg(e,r,userAddItemID,Fai.format(LS.memberSignupUserAddItemIsEmpty,c))
}
else {
	Site.showSignupMsg(e,r,userAddItemID,Fai.format(LS.memberSignupUserAddItemIsEmpty2,c))
}
i=1;
	return false}if(userAddItemID=="email"&&h.length>0) {
	if(!Fai.isEmail(h)) {
	Site.showSignupMsg(e,r,userAddItemID,Fai.format(LS.memberSignupUserAddItemCorrect,c));
	i=1;
	return false
}
}});
	if(i==1) {
	b.checkResult=false;
	return b
}
b.captcha=$("#memberSignupCaptcha").val();
	if(b.captcha==null||b.captcha=="") {
	Site.showSignupMsg(e,r,"memberSignupCaptcha",LS.memberSignupRegisterCaptchaEmpty);
	b.checkResult=false;
	return b
}
var p=$("#memberAgreePro");
	if(p.length>0) {
	if(!p.prop("checked")) {
	Site.showSignupMsg(e,r,"memberAgreePro",LS.memberProtocolNotAgree,true);
	b.checkResult=false;
	return b
}
}b.checkResult=true;
	return b};
	Site.showSignupMsg=function(g,a,h,f,i) {
	var b=$("#module"+a);
	var e=new Object();
	var d="";
	if(h.length>0) {
	e=$(b).find("#"+h);
	d=$(e).prop("tagName").toLocaleLowerCase()
}
if(g==1) {
	var c=b.find(".memberSignupMsg .msgText");
	if(d.length>0&&d=="input") {
	$(e).focus();
	c.html(f)
}
else {
	c.html(f)
}
return}if(i) {
	Fai.ing(f,false);
	return
}
if(g==2) {
	var j= {
	moduleId:"module"+a,targetId:h,tipText:f
}
;Site.floatTip(j);
	$(e).addClass("focusBg");
	return}};
	Site.initModuleMemberLogin=function(a,c,d,b) {
	if(c==2) {
	$("#module"+a).find(".J_loginButton").bind("click",function() {
	if(b) {
	Fai.ing("您目前处于网站管理状态，请先点击网站右上方的“退出”后再登录会员。")
}
else {
	if(d) {
	Site.memberLogin1(a)
}
else {
	Site.memberLogin2(a,c)
}
}})}Site.memberLoginCompatibility(a)};
	Site.memberLoginCompatibility=function(b) {
	if(Fai.isIE6()) {
	var e=$("#module"+b).find(".J_memberLoginPanel");
	$(e).removeAttr("style");
	var d=$(e).width();
	if(d>260||d<180) {
	d=(d>260)?"260px":(d<180)?"180px":"auto";
	$(e).css("width",d)
}
}var c=!("placeholder" in document.createElement("input"));
	if(c) {
	var a=$("#module"+b).find(".J_memberLoginItem");
	$.each(a,function(k,m) {
	var n=$(m).find("span");
	var h=$(n).width();
	var l=$(n).height();
	var g=$(m).position().top+(Fai.isIE6()?2:0);
	var f=$(m).position().left;
	if($(m).hasClass("memberCaptcha")) {
	f+=10
}
else {
	f+=25
}
$(n).css( {
	top:g+"px",left:f+"px","line-height":l+"px",padding:"0px 0px 0px 4px",width:h+"px"
}
);
	var j=$(m).find("input").val();
	if(j.length>0) {
	$(n).hide()
}
})}};
	Site.memberLogin=function(a) {
	var b="login.jsp?url="+Fai.encodeUrl(Fai.getUrlRoot(Fai.top.location.href));
	if(a!==undefined) {
	b+="&errno="+a
}
Fai.top.location.href=b};
	Site.memberLogin1=function(b) {
	var a=Fai.getUrlParam(Fai.top.location.href,"url");
	if(!a) {
	a="./index.jsp"
}
var c=$("#module"+b);
	var h=c.find(".memberAcctInput").val();
	var g=c.find(".memberPwdInput").val();
	if(h==null||h=="") {
	Fai.top.location.href="login.jsp?errno=1&url="+Fai.encodeUrl(a);
	return
}
if(g==null||g=="") {
	Fai.top.location.href="login.jsp?errno=2&url="+Fai.encodeUrl(a)+"&acct="+Fai.encodeUrl(h);
	return
}
g=$.md5(g);
	var f=c.find(".member");
	f.hide();
	var i=c.find(".memberMsg");
	i.html(LS.memberLogining);
	i.show();
	var e=false;
	var d=c.find("#autoLogin"+b);
	if(d&&d.attr("checked")) {
	e=true
}
$.ajax( {
	type:"post",url:"ajax/login_h.jsp",data:"cmd=loginMember&acct="+Fai.encodeUrl(h)+"&pwd="+Fai.encodeUrl(g)+"&autoLogin="+Fai.encodeUrl(e),error:function() {
	Fai.top.location.href="login.jsp?errno=-1&url="+Fai.encodeUrl(a)+"&acct="+Fai.encodeUrl(h)
}
,success:function(j) {
	var j=jQuery.parseJSON(j);
	if(j.success) {
	Fai.top.location.href=a;
	return
}
else {
	if(j.active) {
	Site.memberInactiveDialog(j.mail,j.memName);
	f.show();
	i.hide()
}
else {
	Fai.top.location.href="login.jsp?errno="+j.rt+"&captcha="+j.captcha+"&url="+Fai.encodeUrl(a)+"&acct="+Fai.encodeUrl(h)
}
}}})};
	Site.mbLogining=false;
	Site.memberLogin2=function(b,l) {
	if(Site.mbLogining) {
	return
}
Site.mbLogining=true;
	var a=Fai.getUrlParam(Fai.top.location.href,"url");
	if(!a) {
	a="./index.jsp"
}
var n=Fai.getUrlParam(Fai.top.location.href,"mid");
	var d=Fai.getUrlParam(Fai.top.location.href,"fid");
	var c=$("#module"+b);
	var k=$.trim(c.find(".memberAcctInput").val());
	var h=c.find(".memberPwdInput").val();
	var g=(c.find(".memberCaptcha").css("display")!="none");
	var i=c.find(".memberCaptchaInput").val();
	if(k==null||k=="") {
	Site.showMemberLoginMsg(b,1,false,l);
	return
}
if(h==null||h=="") {
	Site.showMemberLoginMsg(b,2,false,l);
	return
}
if(g&&(i==null||i=="")) {
	Site.showMemberLoginMsg(b,3,false,l);
	return
}
h=$.md5(h);
	var m=c.find(".memberLoginMsg");
	m.show();
	m.find(".msgText").html(LS.memberLogining);
	var j=c.find(".memberLoginBtn");
	j.attr("disabled",true);
	var f=false;
	var e=c.find("#autoLogin"+b);
	if(e&&e.attr("checked")) {
	f=true
}
$.ajax( {
	type:"post",url:"ajax/login_h.jsp",data:"cmd=loginMember&acct="+Fai.encodeUrl(k)+"&pwd="+Fai.encodeUrl(h)+"&captcha="+Fai.encodeUrl(i)+"&autoLogin="+Fai.encodeUrl(f),error:function() {
	Site.mbLogining=false;
	j.removeAttr("disabled");
	Site.showMemberLoginMsg(b,-1,l)
}
,success:function(o) {
	Site.mbLogining=false;
	j.removeAttr("disabled");
	var o=jQuery.parseJSON(o);
	if(o.success) {
	if(n!=null&&d!=null) {
	$.cookie("_moduleid",n {
	expires:1
}
);
	$.cookie("_fileid",d {
	expires:1
}
)}Fai.top.location.href=a;
	return}else {
	if(o.active) {
	Site.memberInactiveDialog(o.mail,o.memName)
}
else {
	Site.showMemberLoginMsg(b,o.rt,o.captcha,l)
}
}}})};
	Site.showMemberLoginMsg=function(a,b,e,f) {
	var c=$("#module"+a);
	var d="";
	var h="";
	var i=false;
	if(b==1) {
	d=LS.memberInputAcct;
	c.find(".memberAcctInput").focus();
	h="memberLoginAcct"
}
else {
	if(b==2) {
	d=LS.memberInputPwd;
	c.find(".memberPwdInput").focus();
	h="memberLoginPwd"
}
else {
	if(b==3) {
	d=LS.memberInputCaptcha;
	h="memberLoginCaptcha"
}
else {
	if(b==11) {
	d=LS.memberLoginFirst;
	i=true
}
else {
	if(b==12) {
	d=LS.memberLoginSignup;
	i=true
}
else {
	if(b==13) {
	d=LS.memberLoginToView;
	i=true
}
else {
	if(b==14) {
	d=LS.memberLoginNoPermission;
	i=true
}
else {
	if(b==-3) {
	d=LS.memberPwdError;
	h="memberLoginPwd"
}
else {
	if(b==-301) {
	d=LS.memberCaptchError;
	h="memberLoginCaptcha"
}
else {
	if(b==-302) {
	d=LS.memberAcctError;
	h="memberLoginAcct"
}
else {
	if(b==-303) {
	d=LS.memberNoAuth;
	h="memberLoginAcct"
}
else {
	if(b==-305) {
	d=LS.memberPwdError;
	h="memberLoginPwd"
}
else {
	d=LS.memberLoginError;
	i=true
}
}}}}}}}}}}}if(e) {
	c.find(".memberCaptcha").show();
	c.find(".memberCaptchaImg").attr("src","validateCode.jsp?"+Math.random()*1000);
	Site.memberLoginCompatibility(a)
}
if(i) {
	Fai.ing(d,false);
	return
}
if(f==1) {
	var g=c.find(".memberLoginMsg");
	g.show();
	g.find(".msgText").html(d)
}
if(f==2) {
	var j= {
	moduleId:"module"+a,targetId:h,tipText:d
}
;setTimeout(function() {
	Site.floatTip(j)
}
,50)}};
	Site.changeCaptchaImg=function(a) {
	$(a).attr("src","validateCode.jsp?"+Math.random()*1000)
}
;Site.wbListener= {
	timer:"",winOpen:"",w_uid:"",c:0
}
;Site.initWBLogin=function(f,a,c,b,d,e) {
	$("#"+e).click(function() {
	if(Site.wbListener.c==0) {
	Site.wbListener.winOpen=window.open("https://api.weibo.com/oauth2/authorize?client_id="+f+"&redirect_uri="+a+"/wbLogin.jsp&response_type=code","","height=525,width=585,toolbar=no,menubar=no,scrollbars=no,status=no,location=yes,resizable=yes");
	Site.wbListener.timer=window.setInterval("Site.wbWinListener('"+c+"',"+b+","+d+")",500);
	++Site.wbListener.c
}
})};
	Site.wbWinListener=function(c,b,d) {
	if(Site.wbListener.winOpen.closed==true) {
	window.clearInterval(Site.wbListener.timer);
	Site.wbListener.c=0;
	if(Site.wbListener.w_uid!=null&&Site.wbListener.w_uid!="") {
	var a=Fai.getUrlParam(Fai.top.location.href,"url");
	if(!a) {
	a="./index.jsp"
}
$.ajax( {
	type:"post",url:"ajax/login_h.jsp?cmd=otherLoginMember",data:"loginType=2&openId="+Site.wbListener.w_uid,error:function() {
	Fai.ing(LS.memberLoginError,true)
}
,success:function(e) {
	var e=jQuery.parseJSON(e);
	if(e.success) {
	Fai.top.location.href=a;
	return
}
else {
	if(e.active) {
	Site.memberInactiveDialog(e.mail,e.memName)
}
else {
	if(e.rt==-3) {
	Site.memberOtherLoginAdd("",Site.wbListener.w_uid,jQuery.parseJSON(c),b,d,2)
}
else {
	if(e.rt==-303) {
	Fai.ing(LS.memberNoAuth,true)
}
else {
	Fai.ing(LS.argsError,true)
}
}}}}})}}};
	Site.qqPopupID="";
	Site.initQQLogin=function(f,a,c,b,d,e) {
	Site.qqLoginPC(f,a,c,b,d,e)
}
;Site.qqLoginMobile=function(f,a,c,b,d,e) {
	$("#"+e).click(function() {
	Site.qqPopupID=Fai.popupWindow( {
	title:"",width:800,height:500,frameScrolling:false,frameSrcUrl:"https://graph.qq.com/oauth2.0/authorize?client_id="+f+"&redirect_uri="+a+"/qqLogin.jsp&response_type=token&scope=all",closeFunc:function(g) {
	if(g) {
	Site.qqWinListenerMobile(g,c,b,d)
}
}})})};
	Site.qqWinListenerMobile=function(e,c,b,d) {
	if(e.q_uid!=null&&e.q_uid!="") {
	var a=Fai.getUrlParam(Fai.top.location.href,"url");
	if(!a) {
	a="./index.jsp"
}
$.ajax( {
	type:"post",url:"ajax/login_h.jsp?cmd=otherLoginMember",data:"loginType=1&openId="+e.q_uid,error:function() {
	Fai.ing(LS.memberLoginError,true)
}
,success:function(f) {
	var f=jQuery.parseJSON(f);
	if(f.success) {
	Fai.top.location.href=a;
	return
}
else {
	if(f.active) {
	Site.memberInactiveDialog(f.mail,f.memName)
}
else {
	if(f.rt==-3) {
	Site.memberOtherLoginAdd(e.q_name,e.q_uid,jQuery.parseJSON(c),b,d,1)
}
else {
	if(f.rt==-303) {
	Fai.ing(LS.memberNoAuth,true)
}
else {
	Fai.ing(LS.argsError,true)
}
}}}}})}};
	Site.qqListener= {
	timer:"",winOpen:"",q_uid:"",c:0,q_name:"",q_avator:""
}
;Site.qqLoginPC=function(f,a,c,b,d,e) {
	$("#"+e).click(function() {
	if(Site.qqListener.c==0) {
	Site.qqListener.winOpen=window.open("https://graph.qq.com/oauth2.0/authorize?client_id="+f+"&redirect_uri="+a+"/qqLoginPC.jsp&response_type=token&scope=all","","height=525,width=585,toolbar=no,menubar=no,scrollbars=no,status=no,location=yes,resizable=yes");
	Site.qqListener.timer=window.setInterval("Site.qqWinListenerPC('"+c+"',"+b+","+d+")",500);
	++Site.qqListener.c
}
})};
	Site.qqWinListenerPC=function(c,b,d) {
	if(Site.qqListener.winOpen.closed==true) {
	window.clearInterval(Site.qqListener.timer);
	Site.qqListener.c=0;
	if(Site.qqListener.q_uid!=null&&Site.qqListener.q_uid!="") {
	var a=Fai.getUrlParam(Fai.top.location.href,"url");
	if(!a) {
	a="./index.jsp"
}
$.ajax( {
	type:"post",url:"ajax/login_h.jsp?cmd=otherLoginMember",data:"loginType=1&openId="+Site.qqListener.q_uid,error:function() {
	Fai.ing(LS.memberLoginError,true)
}
,success:function(e) {
	var e=jQuery.parseJSON(e);
	if(e.success) {
	Fai.top.location.href=a;
	return
}
else {
	if(e.active) {
	Site.memberInactiveDialog(e.mail,e.memName)
}
else {
	if(e.rt==-3) {
	Site.memberOtherLoginAdd(Site.qqListener.q_name,Site.qqListener.q_uid,jQuery.parseJSON(c),b,d,1)
}
else {
	if(e.rt==-303) {
	Fai.ing(LS.memberNoAuth,true)
}
else {
	Fai.ing(LS.argsError,true)
}
}}}}})}}};
	Site.memberOtherLoginAdd=function(e,a,f,b,c,d) {
	var h=parseInt(Math.random()*10000);
	var i=['<div style="width:190px;
	height:1px;
	font-size:0;
	background-color:#44a5ff;
	margin-left:33px;
	float:left;
	"/>','<div style="width:130px;
	height:1px;
	font-size:0;
	background-color:#dadada;
	margin-left:223px;
	"/>','<div style="width:40px;
	height:40px;
	margin-top:10px;
	margin-left:170px;
	background:url(',Site.qqListener.q_avator,');
	"/>','<div style="padding:6px 2px;
	">','<div style="padding:5px 0;
	">','<div style="width:140px;
	float:left;
	">&nbsp;
	</div>','<div id="bindAcct" class="checkBoxStyle_unCheck"/><div id="bindAcctLabel" style="vertical-align:middle;
	font-size:14px;
	cursor:pointer;
	">',LS.memberOtherLgnBindAcct,"</div>","</div>",'<div style="width:280px;
	height:1px;
	font-size:0;
	background-color:#dadada;
	margin-left:45px;
	margin-top:10px;
	margin-bottom:10px;
	"/>','<table cellpadding="0" cellspacing="0" style="_margin:0 auto">','<tr style="display:block;
	margin-top:10px;
	width:320px;
	">','<td style="width:120px;
	_width:auto;
	text-align:right;
	color:rgb(99,99,99);
	font-size:12px;
	">',LS.memberOtherLgnAcct,'</td><td><input id="acct" type="text" maxlength="50" value="',e,'" style="width:168px;
	height:25px;
	margin-left:5px;
	-webkit-border-radius:0;
	-moz-border-radius:0;
	border:1px solid #e7e7e7;
	text-indent:6px;
	"/><span style="font-size:14px;
	color:rgb(255,36,46);
	margin-left:5px;
	">*</span><input id="openId" type="password" disabled style="display:none;
	"/></td>',"</tr>",'<tr style="display:block;
	margin-top:10px;
	width:320px;
	">','<td style="width:120px;
	_width:auto;
	text-align:right;
	color:rgb(99,99,99);
	font-size:12px;
	">',LS.memberOtherLgnPwd,'</td><td><input id="pwd" type="password" maxlength="20" style="width:168px;
	height:25px;
	margin-left:5px;
	-webkit-border-radius:0;
	-moz-border-radius:0;
	border:1px solid #e7e7e7;
	text-indent:6px;
	"/><span style="font-size:14px;
	color:rgb(255,36,46);
	margin-left:5px;
	">*</span></td>',"</tr>",'<tr style="display:block;
	margin-top:10px;
	width:320px;
	">','<td style="width:120px;
	_width:auto;
	text-align:right;
	color:rgb(99,99,99);
	font-size:12px;
	">',LS.memberOtherLgnRePwd,'</td><td><input id="repwd" type="password" maxlength="20" style="width:168px;
	height:25px;
	margin-left:5px;
	-webkit-border-radius:0;
	-moz-border-radius:0;
	border:1px solid #e7e7e7;
	text-indent:6px;
	"/><span style="font-size:14px;
	color:rgb(255,36,46);
	margin-left:5px;
	">*</span></td>',"</tr>"];
	$.each(f,function(k,m) {
	var l=['<tr class="bindAcctHidn" style="display:block;
	margin-top:10px;
	width:320px;
	">','<td style="width:120px;
	_width:auto;
	text-align:right;
	color:rgb(99,99,99);
	font-size:12px;
	">',m.name,'：</td><td><input id="',m.fieldKey,'" type="text" name="',m.name,'" maxlength="50" class="userAddItem',m.must?" isCheckUAI":"",'" style="width:168px;
	height:25px;
	margin-left:5px;
	-webkit-border-radius:0;
	-moz-border-radius:0;
	border:1px solid #e7e7e7;
	text-indent:6px;
	"/>',m.must?'<span style="font-size:14px;
	color:rgb(255,36,46);
	margin-left:5px;
	">*</span></td>':"</td>","</tr>",];
	i.push(l.join(""))
}
);
	if(b) {
	i.push('<tr class="bindAcctHidn" style="display:block;
	margin-top:10px;
	width:320px;
	">');
	i.push('<td style="width:120px;
	_width:auto;
	text-align:right;
	color:rgb(99,99,99);
	font-size:12px;
	">'+LS.memberOtherLgnRemark+"</td>");
	i.push('<td><textarea id="remark" maxlength="'+c+'" style="width:168px;
	height:50px;
	margin-left:5px;
	-webkit-border-radius:0;
	-moz-border-radius:0;
	border:1px solid #e7e7e7;
	text-indent:6px;
	"></textarea></td>');
	i.push("</tr>")
}
var g="";
	if(d==1) {
	g=LS.memberOtherLgnQQMsg
}
else {
	if(d==2) {
	g=LS.memberOtherLgnSinaMsg
}
}i.push("</table>");
	i.push('<div id="oLoginBindMsg" style="text-align:center;
	display:none;
	padding:10px 0;
	font-family:MicrosoftYaHei Regular;
	font-size:12px;
	color:rgb(157,157,157);
	">( '+g+")</div>");
	i.push('<div id="oLoginTip" style="text-align:center;
	padding-top:6px;
	color:red;
	"></div>');
	i.push('<div style="height:30px;
	line-height:30px;
	text-align:center;
	padding:5px 0;
	">');
	i.push('<a hidefocus="true" class="formBtn" style="width:142px;
	height:35px;
	background:#1779ff;
	font-size:14px;
	" href="javascript:;
	" onclick="Site.memberOtherLoginSubmit('+h+","+d+');
	return false;
	">'+LS.confirm+"</a>");
	i.push("</div></div>");
	i=i.join("");
	var j= {
	boxId:h,boxName:"qqLogin",title:LS.memberOtherLgnAddTitle,htmlContent:i,width:380
}
;Site.popupBox(j);
	$("#openId").val(a);
	$("#bindAcct,#bindAcctLabel").click(function() {
	if($("#bindAcct").attr("class")=="checkBoxStyle_unCheck") {
	$("#bindAcct").attr("class","checkBoxStyle_check");
	$("#oLoginTip").text("");
	$(".bindAcctHidn").hide();
	$("#oLoginBindMsg").show()
}
else {
	$("#bindAcct").attr("class","checkBoxStyle_unCheck");
	$("#oLoginTip").text("");
	$(".bindAcctHidn").show();
	$("#oLoginBindMsg").hide()
}
})};
	Site.memberOtherLoginSubmit=function(a,i) {
	var e=$("#bindAcct").attr("class")=="checkBoxStyle_check";
	var o="cmd=bindAcct";
	var d=$("#oLoginTip");
	var k=$.trim($("#acct").val());
	if(k==null||k=="") {
	d.html(LS.memberSignupRegisterAcctEmpty);
	$("#acct").focus();
	return
}
var g=$("#pwd").val();
	if(g==null||g=="") {
	d.html(LS.memberSignupRegisterPwdEmpty);
	$("#pwd").focus();
	return
}
if(g.length<4) {
	d.html(LS.memberSignupRegisterPwdMinLength);
	$("#pwd").focus();
	return
}
var m=$("#repwd").val();
	if(g!=m) {
	d.html(LS.memberSignupRegisterPwdNotMatch);
	$("#repwd").focus();
	return
}
var r= {
	};
	r.acct=k;
	r.pwd=$.md5(g);
	if(i==1) {
	r.qqOpenId=$("#openId").val()
}
else {
	if(i==2) {
	r.sinaOpenId=$("#openId").val()
}
}if(!e) {
	o="cmd=otherAdd";
	var n="";
	if($("#remark").length>0) {
	n=$("#remark").val();
	var s=$("#remark").attr("maxlength");
	if(n.length>s) {
	d.html(Fai.format(LS.memberSignupRegisterRemarkMaxLength,s));
	$("#remark").focus();
	return
}
}r.remark=n;
	var c="",p="",h="",q=0,l="",f=0;
	$(".userAddItem").each(function() {
	userAddItemID=$(this).attr("id");
	h=$(this).val();
	c=$(this).attr("name");
	l=$(this).attr("maxlength");
	r[userAddItemID]=h;
	if(h.length>l) {
	d.html(Fai.format(LS.memberSignupUserAddItemMaxLength,c,l));
	$(this).focus();
	q=1;
	return false
}
if(userAddItemID=="phone"&&h.length>0) {
	if(!Fai.isPhone(h)) {
	d.html(Fai.format(LS.memberSignupUserAddItemCorrect,c));
	$(this).focus();
	f=1;
	return false
}
}});
	if(f==1) {
	return
}
if(q==1) {
	return
}
var j=0;
	$(".isCheckUAI").each(function() {
	userAddItemID=$(this).attr("id");
	h=$(this).val();
	c=$(this).attr("name");
	if(h==null||h=="") {
	d.html(Fai.format(LS.memberSignupUserAddItemIsEmpty,c));
	$(this).focus();
	j=1;
	return false
}
if(userAddItemID=="email"&&h.length>0) {
	if(!Fai.isEmail(h)) {
	d.html(Fai.format(LS.memberSignupUserAddItemCorrect,c));
	$(this).focus();
	j=1;
	return false
}
}});
	if(j==1) {
	return
}
}d.html(LS.memberSignupRegisterIng);
	var b=Fai.getUrlParam(Fai.top.location.href,"url");
	if(!b) {
	b="./index.jsp"
}
$.ajax( {
	type:"post",url:"ajax/member_h.jsp?"+o,data:"info="+Fai.encodeUrl($.toJSON(r))+"&loginType="+i,error:function() {
	d.html(LS.memberSignupRegisterError)
}
,success:function(t) {
	var u=jQuery.parseJSON(t);
	if(u.success) {
	if(u.fromBind) {
	Fai.top.$("#popupBg"+a).remove();
	Fai.top.$("#popupBox"+a).remove();
	Site.memberInactiveDialog(u.mail,u.memName)
}
else {
	if(u.active) {
	Fai.top.$("#popupBg"+a).remove();
	Fai.top.$("#popupBox"+a).remove();
	Site.memberActiveDialog(r.email,Fai.encodeUrl(r.acct),function() {
	Fai.top.location.href=b;
	Fai.top.event.returnValue=false
}
)}else {
	Fai.top.location.href=b
}
}}else {
	if(u.rt==-6) {
	d.html(LS.memberSignupRegisterExisted)
}
else {
	if(u.rt==-4) {
	d.html(LS.memberSignupRegisterLimit)
}
else {
	if(u.rt==-3) {
	d.html(LS.memberDialogNotFound)
}
else {
	if(u.rt==Site.otherLoginErrno.acctAlreadyBind) {
	d.html(LS.memberOtherLgnAcctAlreadyBind)
}
else {
	d.html(LS.memberSignupRegisterError)
}
}}}}}})};
	Site.otherLoginErrno= {
	acctAlreadyBind:1
}
;Site.memberFdPwdStepOne=function(c) {
	var d=parseInt(Math.random()*10000);
	var a=$.trim($("#module"+c+" .memberAcct").val());
	var e=["<div class='memberFdPwdStepOne' style='height:100%;
	'>","<div style='width:80px;
	height:1px;
	font-size:0;
	background-color:#44a5ff;
	margin-left:26px;
	float:left;
	'></div>","<div style='width:250px;
	height:1px;
	font-size:0;
	background-color:#dadada;
	margin-left:96px;
	'></div>","<div class='itemLine' style='margin-top:8px;
	'>","<div class='itemTitle' style='font-family:微软雅黑;
	font-size:14px;
	color:rgb(99,99,99);
	width:110px;
	'>",LS.memberDialogFwdAcct,"</div>","<div class='itemCtrl'><input type='text' id='macct' name='macct' style='-webkit-border-radius:0;
	-moz-border-radius:0;
	border:1px solid #e7e7e7;
	width:168px;
	height:30px;
	' class='acctInput' value='",Fai.encodeHtml(a),"'/></div>","</div>","<div class='itemLine'>","<div class='itemTitle'></div>","<div class='itemCtrl'><a hidefocus='true' class='formBtn' style='background:#1779ff;
	margin-left:50px;
	' href='javascript:;
	' onclick='Site.memberFdPwdStepTwo(",d,");
	return false;
	'>",LS.memberDialogNextStep,"</a></div>","</div>","</div>"];
	e=e.join("");
	var b= {
	boxId:d,title:LS.memberDialogFwdStepOneTitle,htmlContent:e,width:372,height:176,boxName:"memberFdPwd"
}
;Site.popupBox(b)};
	Site.memberFdPwdStepTwo=function(b) {
	var a=$.trim($("#macct").val());
	if(a=="") {
	Fai.ing(LS.memberDialogPleaseEnterAcct,true);
	$("#macct").focus();
	return
}
$.ajax( {
	type:"post",url:"ajax/member_h.jsp?cmd=getMAcctMail",data:"mAcct="+Fai.encodeUrl(a),error:function() {
	Fai.ing(LS.systemError,false)
}
,success:function(c) {
	var c=jQuery.parseJSON(c);
	if(c.success) {
	if(c.noMail) {
	var f=["<div>","<div style='padding:8px 26px;
	text-align:center;
	height:60px;
	'>",LS.memberDialogNoEmailMsg,"</div>","<a href='javascript:void(0);
	' class='formBtn popupBClose' style='margin-left:128px;
	'>",LS.confirm,"</a>","</div>"];
	f=f.join("");
	var d= {
	htmlContent:f,width:378,height:120
}
;Site.popupBox(d);
	Fai.top.$("#popupBg"+b).remove();
	Fai.top.$("#popupBox"+b).remove();
	return}Fai.top.$("#popupBg"+b).remove();
	Fai.top.$("#popupBox"+b).remove();
	var e=parseInt(Math.random()*10000);
	var f=["<div class='memberFdPwdStepTwo' style='height:100%;
	'>","<div style='width:80px;
	height:1px;
	font-size:0;
	background-color:#44a5ff;
	margin-left:26px;
	float:left;
	'></div>","<div style='width:390px;
	height:1px;
	font-size:0;
	background-color:#dadada;
	margin-left:96px;
	'></div>","<div class='memberFdPwdTwoMsg'>","<div class='itemStepLine'>",LS.memberDialogFwdOneStep,"<a href='javascript:;
	' hidefocus='true' style='color:#ff6d00' id='memSendPwdCode' onclick='Site.sendMemberEmailPwdCode();
	return false;
	'>",LS.memberDialogClickHere,"</a><span id='menWaitMsg'></span>",Fai.format(LS.memberDialogFwdOneStepThirdMsg,c.mail),"</div>","<div class='itemStepLine'>",LS.memberDialogFwdTwoStep,"</div>","<div class='itemStepLine'>",LS.memberDialogFwdThreeStep,"</div>","</div>","<div style='height:26px;
	margin-top:30px;
	'><div class='itemTitle2' style='padding-top:3px;
	width:124px;
	font-family:微软雅黑;
	font-size:14px;
	color:rgb(99,99,99);
	'>",LS.memberDialogFwdMailCode,"</div><input type='text' id='memEmailCode' style='width:284px;
	height:26px;
	border:1px solid #e7e7e7;
	-webkit-border-radius:0;
	-moz-border-radius:0px;
	'/></div>","<div style='display:none;
	'><div class='itemTitle2'></div><input type='text' id='memMailCodeSign' disabled/></div>","<div style='display:none;
	'><div class='itemTitle2'></div><input type='text' id='macct2' value='",Fai.encodeHtml(a),"' disabled/></div>","<div style='height:26px;
	margin-top:20px;
	'><div class='itemTitle2' style='padding-top:3px;
	width:124px;
	font-family:微软雅黑;
	font-size:14px;
	color:rgb(99,99,99);
	'>",LS.memberDialogFwd,"</div><input type='password' id='memPwd' style='width:284px;
	height:26px;
	border:1px solid #e7e7e7;
	-webkit-border-radius:0;
	-moz-border-radius:0px;
	'/></div>","<div style='height:26px;
	margin-top:20px;
	'><div class='itemTitle2' style='padding-top:3px;
	width:124px;
	font-family:微软雅黑;
	font-size:14px;
	color:rgb(99,99,99);
	'>",LS.memberDialogFwd2,"</div><input type='password' id='memPwd2' style='width:284px;
	height:26px;
	border:1px solid #e7e7e7;
	-webkit-border-radius:0;
	-moz-border-radius:0px;
	'/></div>","<div id='memPwdItemErrorWrap' style='display:none;
	padding:0 10px;
	margin-top:10px;
	text-align:center;
	'><span style='color:red;
	height:24px;
	line-height:24px;
	font-family:微软雅黑;
	font-size:14px;
	' id='memPwdItemError'></span></div>","<div style='margin-top:35px;
	'><div class='itemTitle2' style='height:34px;
	width:173px;
	'></div><a hidefocus='true' style='background:#1779ff;
	width:166px;
	height:35px;
	' class='formBtn' href='javascript:;
	' onclick='Site.memberFdPwdStepLast(",e,");
	return false;
	'>",LS.memberDialogNextStep," </a></div>","</div>"];
	f=f.join("");
	var d= {
	boxId:e,title:LS.memberDialogFwdStepOneTitle,htmlContent:f,width:510,height:427,boxName:"memberFdPwd"
}
;Site.popupBox(d)}else {
	if(c.notFound) {
	Fai.ing(LS.memberDialogNotFound,true)
}
else {
	Fai.ing(LS.argsError,true)
}
}}})};
	Site.memberFdPwdStepLast=function(f) {
	var d=$("#macct2").val();
	if(d=="") {
	Fai.ing(LS.memberDialogPleaseEnterAcct,true);
	return
}
var g;
	var b=$("#memEmailCode").val();
	var c=$("#memMailCodeSign").val();
	var a=$("#memPwd").val();
	var h=$("#memPwd2").val();
	if(!c) {
	g=LS.memberDialogPleaseSendCode
}
else {
	if(!b) {
	g=LS.memberDialogPleaseEnterCode
}
else {
	if(!a) {
	g=LS.memberDialogPleaseEnterPwd
}
else {
	if(!h) {
	g=LS.memberDialogPleaseEnterPwd2
}
else {
	if(a!=h) {
	g=LS.memberDialogPwdDifToPwd2
}
else {
	if(a.length<4||a.length>20) {
	g=Fai.format(LS.memberDialogPwdLimit,4,20)
}
}}}}}if(g) {
	$("#memPwdItemErrorWrap").show();
	$("#memPwdItemError").html(g);
	return
}
$("#memPwdItemErrorWrap").show();
	$("#memPwdItemError").html(LS.memberDialogResetting);
	var e="memEmailCode="+Fai.encodeUrl(b)+"&memMailCodeSign="+Fai.encodeUrl(c)+"&memPwd="+$.md5(a)+"&memName="+Fai.encodeUrl(d);
	$.ajax( {
	type:"post",url:"ajax/member_h.jsp?cmd=setMemberPwdByCode",data:e,error:function() {
	Fai.ing(LS.systemError,false)
}
,success:function(i) {
	var i=jQuery.parseJSON(i);
	if(i.success) {
	Fai.top.$("#popupBg"+f).remove();
	Fai.top.$("#popupBox"+f).remove();
	var k=["<div style='padding-left:60px;
	'>","<div class='alertWarn memberFdPwdLastMsg' style='margin-top:17px;
	'>",LS.memberDialogReSetPwdSucess,"</div>","<div style='padding:10px 0 10px 30px;
	font-family:微软雅黑;
	font-size:14px;
	color:rgb(99,99,99);
	'>",LS.memberDialogFwdAcct,i.macct,"</div>","<a href='javascript:void(0);
	' class='formBtn popupBClose' style='margin-left:45px;
	margin-top:16px;
	background:#1779ff;
	width:166px;
	height:35px;
	'>",LS.login,"</a>","</div>"];
	k=k.join("");
	var j= {
	htmlContent:k,width:372,height:176
}
;Site.popupBox(j)}else {
	if(i.rt==1) {
	$("#memMailCodeSign").val("");
	$("#memPwdItemErrorWrap").show();
	$("#memPwdItemError").html(LS.memberDialogCodeMailFailure)
}
else {
	if(i.notFound) {
	Fai.ing(LS.memberDialogNotFound,true)
}
else {
	Fai.ing(LS.argsError,true)
}
}}}})};
	Site.sendMemberEmailPwdCode=function() {
	if($("#memSendPwdCode").data("_disable")) {
	return
}
var a=$("#macct2").val();
	if(a=="") {
	Fai.ing(LS.memberDialogPleaseEnterAcct,true);
	return
}
$.ajax( {
	type:"post",url:"ajax/mail_h.jsp?cmd=sendMemberPwdEmail",data:"memName="+Fai.encodeUrl(a),error:function() {
	$("#memSendPwdCode").data("_disable",false);
	Fai.ing(LS.systemError,false)
}
,success:function(b) {
	$("#memSendPwdCode").data("_disable",false);
	var b=jQuery.parseJSON(b);
	if(b.success) {
	$("#memMailCodeSign").val(b.emailCodeSign);
	$("#memPwdItemErrorWrap").show();
	$("#memPwdItemError").html(LS.memberDialogSendMailSucess);
	$("#memSendPwdCode").hide();
	$("#menWaitMsg").show();
	$("#menWaitMsg").text(Fai.format(LS.memberDialogCountDown,60));
	$("#menWaitMsg").data("_time",60);
	Site.memberDisableTimeout("memSendPwdCode",1)
}
else {
	if(b.aliasNotF) {
	$("#memPwdItemErrorWrap").show();
	$("#memPwdItemError").html(LS.memberDialogAliasNotFound)
}
else {
	if(b.notFound) {
	Fai.ing(LS.memberDialogNotFound,true)
}
else {
	Fai.ing(LS.argsError,true)
}
}}}});
	$("#memSendPwdCode").data("_disable",true)};
	Site.memberInactiveDialog=function(a,c) {
	var d=["<div class='formPanel'>","<div class='itemLine2 reActWarn'>",LS.memberDialogAcctInactive,"</div>","<div class='itemLine2'>",Fai.format(LS.memberDialogShowLoginMail,a),"</div>","<div class='itemLine2 reActWarn'>",LS.memberDialogNoRevSureEmail,"</div>","<div class='itemLine2' style='padding-top:0;
	padding-bottom:0;
	'>",LS.memberDialogPleaseConfirmYourMail,"<input type='text' id='memEmail' class='memEmailAlterInput' value='",a,"'/><a id='memSendMail' hidefocus='true' onclick='Site.memberSendActiveMail(\"",Fai.encodeHtml(c),"\");
	' href='javascript:void(0);
	'>",LS.memberDialogClickReSendMsg,"</a><span id='menWaitMsg'></span></div>","<div class='itemLine2' id='showOKorErrorMsg' style='color:red;
	'></div>","</div>"];
	d=d.join("");
	var b= {
	title:LS.memberDialogTips,htmlContent:d,width:465,height:226
}
;Site.popupBox(b)};
	Site.memberActiveDialog=function(a,c,e) {
	var d=["<div class='formPanel'>","<div class='itemLine2 reActWarn'>",LS.memberDialogRegSuccess,"</div>","<div class='itemLine2'>",Fai.format(LS.memberDialogShowLoginMail,a),"</div>","<div class='itemLine2 reActWarn'>",LS.memberDialogNoRevSureEmail,"</div>","<div class='itemLine2' style='padding-top:0;
	padding-bottom:0;
	'>",LS.memberDialogPleaseConfirmYourMail,"<input type='text' id='memEmail' class='memEmailAlterInput' value='",a,"'/><a id='memSendMail' hidefocus='true' onclick='Site.memberSendActiveMail(\"",Fai.encodeHtml(c),"\");
	' href='javascript:void(0);
	'>",LS.memberDialogClickReSendMsg,"</a><span id='menWaitMsg'></span></div>","<div class='itemLine2' id='showOKorErrorMsg' style='color:red;
	'></div>","</div>"];
	d=d.join("");
	var b= {
	title:LS.memberDialogActiveAcctTitle,htmlContent:d,width:465,height:226,closeFunc:e
}
;Site.popupBox(b);
	$.ajax( {
	type:"post",url:"ajax/mail_h.jsp?cmd=sendMemberActiveMail",data:"memName="+Fai.encodeUrl(c)+"&memEmail="+a,error:function() {
	Fai.ing("服务繁忙，请稍后再试。",false)
}
,success:function(f) {
	}
}
)};
	Site.memberSendActiveMail=function(b) {
	if($("#memSendMail").data("_disable")) {
	return
}
var a=$.trim($("#memEmail").val());
	if(!Fai.isEmail(a)) {
	Fai.ing(LS.memberDialogPleaseSureMail,true);
	return
}
$.ajax( {
	type:"post",url:"ajax/mail_h.jsp?cmd=sendMemberActiveMail",data:"memName="+Fai.encodeUrl(b)+"&memEmail="+a,error:function() {
	$("#memSendMail").data("_disable",false);
	Fai.ing("服务繁忙，请稍后再试。",false)
}
,success:function(c) {
	$("#memSendMail").data("_disable",false);
	var c=jQuery.parseJSON(c);
	if(c.success) {
	Fai.top.$("#showOKorErrorMsg").html(LS.memberDialogOKorErrorMsg);
	Fai.top.$("#memSendMail").hide();
	Fai.top.$("#menWaitMsg").show();
	Fai.top.$("#menWaitMsg").text(Fai.format(LS.memberDialogAfterTimeToResend,60));
	Fai.top.$("#menWaitMsg").data("_time",60);
	Site.memberDisableTimeout("memSendMail",0)
}
else {
	if(c.AliaNotF) {
	$("#showOKorErrorMsg").html(LS.memberDialogAliasNotFound);
	$("#showOKorErrorMsg").show()
}
}}});
	$("#memSendMail").data("_disable",true)};
	Site.memberDisableTimeout=function(d,b) {
	var c=Fai.top.$("#menWaitMsg");
	var a=parseInt(c.data("_time"));
	if(a>0) {
	a--;
	setTimeout(function() {
	var e=LS.memberDialogAfterTimeToResend;
	if(b==1) {
	e=LS.memberDialogCountDown
}
c.text(Fai.format(e,a));
	Site.memberDisableTimeout(d,b)},1000);
	$("#menWaitMsg").data("_time",a)}else {
	Fai.top.$("#"+d).show();
	c.text("").hide()
}
};
	Site.initModuleBdMap=function(b,e,a,d) {
	var h=Fai.top.$("#mapframe"+e);
	var g=h.attr("width");
	var f=h.attr("height");
	var i="<iframe id='mapframe"+e+"' name='mapframe' frameborder='0' scrolling='no' height='"+f+"' width='"+g+"' src='about:blank'></iframe>";
	h.replaceWith(i);
	var c=Fai.top.$("#mapframe"+e).parent().width();
	var j=a+c+"&ran="+Math.random();
	Site.initIframeLoading(b,e,j,d);
	$("#refreshChlid"+e).css("padding-top","40%")
}
;Site.initModuleSiteSearch=function(f) {
	var g=$("#module"+f),c=$(g.find("input.g_itext")[0]),e=$(g.find(".g_btn")[0]);
	c.keypress(function(h) {
	if(h.keyCode==13&&e.length>0) {
	e[0].click()
}
});
	var d=$("#module"+f);
	var b=d.find(".searchBox").attr("class");
	var a=d.find(".recommandKeyBox");
	if(b=="searchBox") {
	a.css("vertical-align","7px")
}
else {
	a.css("vertical-align","11px")
}
};
	Site.searchInSite=function(d) {
	var c=$("#module"+d+" input.g_itext"),b=c.val(),a=c.attr("_nSL");
	Fai.top.location.href="sr.jsp?skeyword="+Fai.encodeUrl($.trim(b))+"&nSL="+a
}
;Site.searchInSiteByKey=function(e,f,d) {
	var c=$("#module"+e+" input.g_itext"),a=c.attr("_nSL"),b="sr.jsp?skeyword="+Fai.encodeUrl($.trim(f))+"&nSL="+a;
	if(Fai.top._manageMode) {
	Site.redirectUrl(b,"_self",d,1,0)
}
else {
	Fai.top.location.href=b
}
};
	Site.msgBoardShowMsg=function(a) {
	$("#msgAdd .msgTips").show();
	$("#msgAdd .msgTips").html(a)
}
;Site.msgBoardAddMsg=function(k) {
	if(_siteDemo) {
	Fai.ing("当前为“样板网站”，请先“复制网站”再进行留言。");
	return
}
$msgBoard=$(".msgBoard");
	var a=$("#reqName").val();
	var g=$("#reqPhone").val();
	var h=$("#reqEmail").val();
	var f=$("#reqContent").val();
	var j=$("#msgBoardCaptcha").val();
	var b=$(".msgTips").show();
	var e=0;
	$("input.msg_isMust").each(function() {
	var m=$(this).attr("id");
	var n=$(this).attr("name");
	var l=$(this).val();
	if(l==""||l==null) {
	b.html(Fai.format(LS.msgBoardInputIsEmpty,Fai.encodeHtml(n)));
	$("#"+m).focus();
	e=1;
	return false
}
if(m=="reqPhone"&&!Fai.isPhone(l)) {
	b.html(Fai.format(LS.msgBoardInputCorrect,Fai.encodeHtml(n)));
	$("#"+m).focus();
	e=1;
	return false
}
if(m=="reqEmail"&&!Fai.isEmail(l)) {
	b.html(Fai.format(LS.msgBoardInputCorrect,Fai.encodeHtml(n)));
	$("#"+m).focus();
	e=1;
	return false
}
});
	if(e==1) {
	return false
}
var d=0;
	$("input.msg_ipt").each(function() {
	var m=$(this).attr("id");
	var o=$(this).attr("name");
	var l=$(this).val();
	var n=$(this).attr("maxlength");
	if(l.length>n) {
	b.html(Fai.format(LS.msgBoardInputMaxLength,Fai.encodeHtml(o),n));
	$("#"+m).focus();
	d=1;
	return false
}
if(m=="reqPhone"&&l.length&&!Fai.isPhone(l)) {
	b.html(Fai.format(LS.msgBoardInputCorrect,Fai.encodeHtml(o)));
	$("#"+m).focus();
	d=1;
	return false
}
if(m=="reqEmail"&&l.length&&!Fai.isEmail(l)) {
	b.html(Fai.format(LS.msgBoardInputCorrect,Fai.encodeHtml(o)));
	$("#"+m).focus();
	d=1;
	return false
}
});
	if(d==1) {
	return false
}
if(f==null||f=="") {
	Site.msgBoardShowMsg(LS.msgBoardInputContent);
	$("#reqContent").focus();
	return
}
var c=200;
	if(f.length>c) {
	Site.msgBoardShowMsg(Fai.format(LS.msgBoardInputContent2,c));
	$("#reqContent").focus();
	return
}
if(j==null||j=="") {
	Site.msgBoardShowMsg(LS.msgBoardInputValidateCode);
	$("#msgBoardCaptcha").focus();
	return
}
Site.msgBoardShowMsg(LS.msgBoardDoing);
	var i= {
	};
	$("input.msg_ipt").each(function() {
	var m=$(this).attr("id");
	var l=$(this).val();
	i[m]=l
}
);
	i.reqContent=f;
	$.ajax( {
	type:"post",url:"ajax/msgBoard_h.jsp",data:"cmd=add&msgBdData="+Fai.encodeUrl($.toJSON(i))+"&validateCode="+Fai.encodeUrl(j),error:function() {
	Site.msgBoardShowMsg(LS.systemError)
}
,success:function(l) {
	l=jQuery.parseJSON(l);
	if(l.success) {
	if(k) {
	Site.msgBoardShowMsg(LS.msgBoardSendOkAutoOpen);
	setTimeout(function() {
	Fai.top.location.reload()
}
,1000)}else {
	Site.msgBoardShowMsg(LS.msgBoardSendOk)
}
$('#msgAdd input[type="text"]').val("");
	$msgBoard.find("#reqContent").val("")}else {
	if(l.errno==1) {
	Site.msgBoardShowMsg(LS.captchaError)
}
else {
	if(l.errno==2) {
	Site.msgBoardShowMsg(LS.argsError)
}
else {
	if(l.errno==-4) {
	Site.msgBoardShowMsg(LS.msgBoardAddCountLimit)
}
else {
	Site.msgBoardShowMsg(LS.systemError)
}
}}}Site.changeMsgBoardValidateCode()}})};
	Site.changeMsgBoardValidateCode=function() {
	$("#msgBoardCaptchaImg").attr("src","validateCode.jsp?"+Math.random()*1000)
}
;Site.setStarSelect=function(a) {
	_getBackgroundColor=function(c) {
	var d="";
	while(c[0].tagName.toLowerCase()!="html") {
	d=c.css("background-color");
	if(d!="rgba(0,0,0,0)"&&d!="transparent") {
	break
}
c=c.parent()}return d};
	var b="";
	if($(".submitStarList").length>0) {
	b=_getBackgroundColor($(".submitStarList"))
}
if(!b) {
	b="#FFF"
}
$("body").on( {
	click:function() {
	a=$(this).index();
	if(a<5) {
	var c=$(this).parent();
	c.attr("star",a+1);
	_changeSelectStar(a,c)
}
},hover:function() {
	var d=$(this).index();
	if(d<5) {
	var c=$(this).parent();
	_changeSelectStar(d,c)
}
},mouseleave:function(d) {
	if(a<5) {
	var c=$(this).parent();
	_changeSelectStar(a,c)
}
}},".submitStarList li");
	if($(".statisticCommSwap").length!=0) {
	$(".statisticBox .percent span").css( {
	"border-color":"transparent "+b+" transparent transparent"
}
)}_changeSelectStar=function(e,g) {
	for(var f=0;
	f<5;
	f++) {
	var c=g.find("li").eq(f);
	if(f<e+1) {
	if(e<2) {
	c.removeClass("select_more");
	c.addClass("select_less")
}
else {
	c.removeClass("select_less");
	c.addClass("select_more")
}
}else {
	c.removeClass("select_more");
	c.removeClass("select_less")
}
}var h="";
	var d="";
	if(e==0) {
	h=LS.badComment;
	d="#b7b6b6"
}
else {
	if(e==1) {
	h=LS.moderateComment;
	d="#b7b6b6"
}
else {
	if(e==2) {
	h=LS.moderateComment;
	d="#ffb600"
}
else {
	h=LS.highComment;
	d="#ffb600"
}
}}if(e==-1) {
	g.find("li:last").removeClass("scoreTipHover")
}
else {
	g.find("li:last").html("<em></em><span></span>"+(e+1)+LS.score+h);
	g.find("li:last").css( {
	color:d
}
);
	g.find("li:last").addClass("scoreTipHover")}g.find("li:last em").css( {
	"border-color":"transparent "+d+" transparent transparent"
}
);
	g.find("li:last span").css( {
	"border-color":"transparent "+b+" transparent transparent"
}
)}};
	Site.msgSubmitShowMsg=function(b,a) {
	$("#msgSubmit"+a).find("#msgSAdd .msgSTips").show();
	$("#msgSubmit"+a).find("#msgSAdd .msgSTips").html(b)
}
;Site.msgSubmitAddMsg=function(l,b) {
	$msgSubmit=$("#msgSubmit"+b);
	var a=$msgSubmit.find("#reqName").val();
	var h=$msgSubmit.find("#reqPhone").val();
	var i=$msgSubmit.find("#reqEmail").val();
	var g=$msgSubmit.find("#reqContent").val();
	var k=$msgSubmit.find("#msgSubmitCaptcha").val();
	var c=$msgSubmit.find(".msgSTips").show();
	var f=0;
	$msgSubmit.find("input.msgSubmit_isMust").each(function() {
	var n=$(this).attr("id");
	var o=$(this).attr("name");
	var m=$(this).val();
	if(m==""||m==null) {
	c.html(Fai.format(LS.msgBoardInputIsEmpty,Fai.encodeHtml(o)));
	$msgSubmit.find("#"+n).focus();
	f=1;
	return false
}
if(n=="reqPhone"&&!Fai.isPhone(m)) {
	c.html(Fai.format(LS.msgBoardInputCorrect,Fai.encodeHtml(o)));
	$msgSubmit.find("#"+n).focus();
	f=1;
	return false
}
if(n=="reqEmail"&&!Fai.isEmail(m)) {
	c.html(Fai.format(LS.msgBoardInputCorrect,Fai.encodeHtml(o)));
	$msgSubmit.find("#"+n).focus();
	f=1;
	return false
}
});
	if(f==1) {
	return false
}
var e=0;
	$msgSubmit.find("input.msgSubmit_ipt").each(function() {
	var n=$(this).attr("id");
	var p=$(this).attr("name");
	var m=$(this).val();
	var o=$(this).attr("maxlength");
	if(m.length>o) {
	c.html(Fai.format(LS.msgBoardInputMaxLength,Fai.encodeHtml(p),o));
	$msgSubmit.find("#"+n).focus();
	e=1;
	return false
}
if(n=="reqPhone"&&m.length&&!Fai.isPhone(m)) {
	c.html(Fai.format(LS.msgBoardInputCorrect,Fai.encodeHtml(p)));
	$msgSubmit.find("#"+n).focus();
	e=1;
	return false
}
if(n=="reqEmail"&&m.length&&!Fai.isEmail(m)) {
	c.html(Fai.format(LS.msgBoardInputCorrect,Fai.encodeHtml(p)));
	$msgSubmit.find("#"+n).focus();
	e=1;
	return false
}
});
	if(e==1) {
	return false
}
if(g==null||g=="") {
	Site.msgSubmitShowMsg(LS.msgBoardInputContent,b);
	$msgSubmit.find("#reqContent").focus();
	return
}
var d=200;
	if(g.length>d) {
	Site.msgSubmitShowMsg(Fai.format(LS.msgBoardInputContent2,d),b);
	$msgSubmit.find("#reqContent").focus();
	return
}
if(k==null||k=="") {
	Site.msgSubmitShowMsg(LS.msgBoardInputValidateCode,b);
	$msgSubmit.find("#msgSubmitCaptcha").focus();
	return
}
Site.msgSubmitShowMsg(LS.msgBoardDoing,b);
	var j= {
	};
	$msgSubmit.find("input.msgSubmit_ipt").each(function() {
	var n=$(this).attr("id");
	var m=$(this).val();
	j[n]=m
}
);
	j.reqContent=g;
	$.ajax( {
	type:"post",url:"ajax/msgBoard_h.jsp",data:"cmd=add&msgBdData="+Fai.encodeUrl($.toJSON(j))+"&validateCode="+Fai.encodeUrl(k)+"&vCodeId="+Fai.encodeUrl(b),error:function() {
	Site.msgSubmitShowMsg(LS.systemError,b)
}
,success:function(m) {
	m=jQuery.parseJSON(m);
	if(m.success) {
	if(l) {
	Site.msgSubmitShowMsg(LS.msgBoardSendOkAutoOpen,b);
	setTimeout(function() {
	Fai.top.location.reload()
}
,1000)}else {
	Site.msgSubmitShowMsg(LS.msgBoardSendOk,b)
}
$msgSubmit.find('#msgSAdd input[type="text"]').val("");
	$msgSubmit.find("#reqContent").val("")}else {
	if(m.errno==1) {
	Site.msgSubmitShowMsg(LS.captchaError,b)
}
else {
	if(m.errno==2) {
	Site.msgSubmitShowMsg(LS.argsError,b)
}
else {
	if(m.errno==-4) {
	Site.msgSubmitShowMsg(LS.msgBoardAddCountLimit,b)
}
else {
	Site.msgSubmitShowMsg(LS.systemError,b)
}
}}}Site.changeMsgSubmitValidateCode(b)}})};
	Site.changeMsgSubmitValidateCode=function(a) {
	$("#msgSubmit"+a).find("#msgSubmitCaptchaImg").attr("src","validateCode.jsp?"+Math.random()*1000+"&vCodeId="+a)
}
;Site.desMallBuyCount=function(c) {
	var a=$("#cartbuyCount"+c).val();
	var b=1;
	if(Fai.isInteger(a)) {
	b=parseInt(a)
}
b--;
	if($("#limitAmountDiv").text()=="") {
	if(b<2) {
	b=1;
	$("#buyCountDes"+c).addClass("disableMallJian");
	$("#buyCountInc"+c).removeClass("disableMallJia")
}
else {
	if(b>9999998) {
	b=9999999;
	$("#buyCountDes"+c).removeClass("disableMallJian");
	$("#buyCountInc"+c).addClass("disableMallJia")
}
else {
	$("#buyCountDes"+c).removeClass("disableMallJian");
	$("#buyCountInc"+c).removeClass("disableMallJia")
}
}}$("#cartbuyCount"+c).val(b)};
	Site.incMallBuyCount=function(c) {
	var a=$("#cartbuyCount"+c).val();
	var b=0;
	if(Fai.isInteger(a)) {
	b=parseInt(a)
}
b++;
	if($("#limitAmountDiv").text()=="") {
	if(b<2) {
	b=1;
	$("#buyCountDes"+c).addClass("disableMallJian");
	$("#buyCountInc"+c).removeClass("disableMallJia")
}
else {
	if(b>9999998) {
	b=9999999;
	$("#buyCountDes"+c).removeClass("disableMallJian");
	$("#buyCountInc"+c).addClass("disableMallJia")
}
else {
	$("#buyCountDes"+c).removeClass("disableMallJian");
	$("#buyCountInc"+c).removeClass("disableMallJia")
}
}}$("#cartbuyCount"+c).val(b)};
	Site.mallBuyCountChange=function(c) {
	if($("#limitAmountDiv").text()=="") {
	var a=$("#cartbuyCount"+c).val();
	var b=1;
	if(Fai.isInteger(a)) {
	b=parseInt(a)
}
if(b<2) {
	b=1;
	$("#buyCountDes"+c).addClass("disableMallJian");
	$("#buyCountInc"+c).removeClass("disableMallJia")
}
else {
	if(b>9999998) {
	b=9999999;
	$("#buyCountDes"+c).removeClass("disableMallJian");
	$("#buyCountInc"+c).addClass("disableMallJia")
}
else {
	$("#buyCountDes"+c).removeClass("disableMallJian");
	$("#buyCountInc"+c).removeClass("disableMallJia")
}
}$("#cartbuyCount"+c).val(b)}};
	Site.mallBuy=function(e,b,g) {
	var d="mbuy.jsp?id="+e;
	if(b&&b!="undefined") {
	var c=$("#module"+b);
	var h=c.find(".optionMsg");
	if(Fai.isNull(c)) {
	return
}
var i=true;
	var f=[];
	d+="&fromDetail=true";
	c.find(".optionItemWrap").each(function() {
	var k=$(this).parent().parent().find(".propName").text();
	if($(this).find(".optionItemHover").length==1) {
	var l=$(this).attr("data");
	var j=$(this).find(".optionItemHover").attr("data");
	var m= {
	};
	m.name=l;
	m.value=parseInt(j);
	f.push(m);
	h.hide()
}
else {
	h.show();
	h.html(Fai.format(LS.mallCartChoiceItemError,Fai.encodeHtml(k)));
	i=false;
	return false
}
});
	if(!i) {
	return false
}
if(f.length>0) {
	d+="&optionList="+Fai.encodeUrl($.toJSON(f))
}
}if(g&&g.length>0) {
	d+="&"+g
}
var a=window.open(d+"&ram="+Math.random(),"mallcart");
	a.focus();
	if(Fai.isIE()) {
	window.event.cancelBubble=true;
	window.event.returnValue=false
}
else {
	event.stopPropagation();
	event.preventDefault()
}
};
	Site.MallAjaxErrno= {
	ok:0,error:1,manager:2,login:3,idNotExist:4,orderSettle:5,noMall:6,toProductDetail:7,orderNotExist:8,networkError:9,outOfMallAmount:10,mallAmountZero:11,mallOptionStop:12,OutOfAllowAmount:13,notAdded:14,payDomainError:15
}
;Site.getDialogHtml=function(r,g) {
	if(!Fai.isInteger(r.rt)) {
	r.rt=1
}
var h=parseInt(r.rt),d=0,m=0,k="",e="about:blant;
	",p=LS.goToMallCartStr,a=LS.continueShopping,b=LS.resultFailMsg,n="resultFailIcon";
	if(!g) {
	g="javascript:;
	"
}
var i="mcart.jsp";
	var q="target='_blank'";
	var f;
	switch(h) {
	case Site.MallAjaxErrno.ok:n="suc-ico";
	b=LS.resultSuccessMsg;
	if(typeof(r.totalPrice)!="undefined") {
	d=r.totalPrice
}
if(typeof(r.totalAmount)!="undefined") {
	m=r.totalAmount
}
if(typeof(r.choiceCurrencyVal)!="undefiend") {
	k=r.choiceCurrencyVal
}
var j=k+d;
	f=Fai.format(LS.cartDetailInfo,m,j);
	break;
	case Site.MallAjaxErrno.error:top.location.href="mcart.jsp?msg=2";
	return false;
	break;
	case Site.MallAjaxErrno.manager:n="resultFailIcon";
	b="购买失败。";
	var p="去购物车结算";
	var a="继续购物";
	f="当前为管理状态，购买失败。";
	r.success=true;
	break;
	case Site.MallAjaxErrno.login:i="login.jsp?url="+Fai.encodeUrl(Fai.getUrlRoot(top.location.href))+"&errno=11";
	top.location.href=i;
	return false;
	break;
	case Site.MallAjaxErrno.idNotExist:top.location.href="mcart.jsp?msg=1";
	return false;
	break;
	case Site.MallAjaxErrno.orderSettle:top.location.href="mcart.jsp";
	return false;
	break;
	case Site.MallAjaxErrno.noMall:top.location.href="mcart.jsp";
	return false;
	break;
	case Site.MallAjaxErrno.toProductDetail:top.location.href="pd.jsp?id="+productId+"&ram="+Math.random();
	return false;
	break;
	case Site.MallAjaxErrno.orderNotExist:top.location.href="mcart.jsp?msg=1";
	return false;
	break;
	case Site.MallAjaxErrno.networkError:f=LS.networkError;
	break;
	case Site.MallAjaxErrno.outOfMallAmount:f=LS.mallAmountOverFlow;
	break;
	case Site.MallAjaxErrno.mallAmountZero:f=LS.mallAmountZero;
	break;
	case Site.MallAjaxErrno.mallOptionStop:f=LS.mallOptionStop;
	break;
	case Site.MallAjaxErrno.OutOfAllowAmount:f=LS.allowAmountOverFlow;
	break;
	case Site.MallAjaxErrno.notAdded:f=LS.mallProductNotAdded;
	break;
	default:top.location.href.reload();
	return false}var l=[];
	if(r.success) {
	l=["<div class='mallCartOperate'>","<a id='settleAccountsBtn' class='formBtn' "+q+" href='"+i+"' style='width:108px;
	height:35px;
	background:#ff6d00;
	font-size:14px;
	'>"+p+"</a>","<a id='dialogContinueShopping' href='javascript:;
	' class='shopping popupBClose' style='font-size:14px;
	color:#636363 !important;
	'>",a,"</a>","</div>"]
}
var c="";
	if(top._lcid===1033) {
	c="letter-spacing:0px;
	"
}
var o=["<table style='width:100%;
	height:100%;
	'>","<tr>","<td style='width:50px;
	'></td>","<td style='width:280px;
	'>","<div class='"+n+" addItemTextTips' style='font-size:14px;
	color:#636363' >"+b+"</div>","<div class='cartInfoContent' style='"+c+"' >"+f+"</div>",l.join(""),"</td>","<td style='width:50px;
	'></td>","</tr>","</table>"];
	if(h==Site.MallAjaxErrno.mallAmountZero||h==Site.MallAjaxErrno.OutOfAllowAmount||h==Site.MallAjaxErrno.outOfMallAmount) {
	o[0]="<table style='width:100%;
	height:100%;
	margin-top:10px;
	'>"
}
return o.join("")};
	Site.mallBuying= {
	};
	Site.mallBuy2=function(e,a,o) {
	if(_siteDemo) {
	Fai.ing("当前为“样板网站”，请先“复制网站”再进行购买。");
	return
}
if(typeof(Site.mallBuying[e])=="undefined") {
	Site.mallBuying[e]=false
}
var f=false;
	$.each(Site.mallBuying,function(j,i) {
	if(i) {
	f=true;
	return false
}
});
	if(f) {
	return
}
Site.mallBuying[e]=true;
	var m="id="+e;
	if(a&&a!="undefined") {
	var c=$("#module"+a);
	var p=c.find(".optionMsg");
	if(Fai.isNull(c)) {
	Site.mallBuying[e]=false;
	return
}
var q=true;
	var k=[];
	m+="&fromDetail=true";
	c.find(".optionItemWrap").each(function() {
	var t=$(this);
	if(t.find(".optionItemHover").length==1) {
	var s=t.attr("data"),r=t.attr("type"),i=t.find(".optionItemHover").attr("data"),u= {
	};
	u.name=s;
	u.value=parseInt(i);
	if(r!=null) {
	u.type=parseInt(r)
}
k.push(u);
	p.hide()}else {
	var j=t.parent().parent().find(".propName").text();
	p.show();
	p.html(Fai.format(LS.mallCartChoiceItemError,Fai.encodeHtml(j)));
	q=false;
	return false
}
});
	if(Site.optionsStr.oldOptionsStr!="null"&&Site.optionsStr.oldOptionsStr) {
	var n=Site.optionsStr.oldOptionsStr.split("_"),d=[];
	for(var h=0;
	h<n.length;
	h++) {
	for(var g=0;
	g<k.length;
	g++) {
	if(k[g].name==n[h]) {
	d.push(k[g])
}
}}k=d}if(!q) {
	Site.mallBuying[e]=false;
	return false
}
if(k.length>0) {
	m+="&optionList="+Fai.encodeUrl($.toJSON(k))
}
}var b=$("#cartbuyCount"+a).val();
	var l=1;
	if(Fai.isInteger(b)) {
	l=parseInt(b)
}
if(l<1) {
	l=1
}
else {
	if(l>9999999) {
	l=9999999
}
}$("#cartbuyCount"+a).val(l);
	m+="&amount="+l;
	$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=addCartItem",data:m,error:function() {
	var j=Site.getDialogHtml( {
	rt:Site.MallAjaxErrno.networkError
}
,o);
	var i= {
	htmlContent:j,width:382,height:115
}
;Site.popupBox(i);
	Site.mallBuying[e]=false},success:function(i) {
	var t=$.parseJSON(i);
	Site.refreshTopBarMallCartNum();
	var u=Site.getDialogHtml(t);
	Site.mallBuying[e]=false;
	if(!u) {
	return
}
var s= {
	};
	var r=parseInt(t.rt);
	if(r==Site.MallAjaxErrno.mallAmountZero||r==Site.MallAjaxErrno.outOfMallAmount) {
	s= {
	htmlContent:u,width:240,height:116,boxName:"mallAmountZero"
}
}else {
	if(r==Site.MallAjaxErrno.OutOfAllowAmount) {
	s= {
	htmlContent:u,width:240,height:116,boxName:"allowAmountFlow"
}
}else {
	if(r==Site.MallAjaxErrno.notAdded) {
	s= {
	htmlContent:u,width:240,height:116,boxName:"notAdded"
}
}else {
	s= {
	htmlContent:u,width:372,height:150,boxName:"mallBuy"
}
}}}var j=Site.popupBox(s)}});
	if(Fai.isIE()) {
	window.event.cancelBubble=true;
	window.event.returnValue=false
}
else {
	if(!Fai.isMozilla()) {
	event.stopPropagation();
	event.preventDefault()
}
}};
	Site.initOptionsStr=function(a) {
	Site.optionsStr.oldOptionsStr=a
}
;Site.optionsStr= {
	};
	Site.mallImmeBuying=false;
	Site.mallImmeBuy=function(f,b) {
	if(_siteDemo) {
	Fai.ing("当前为“样板网站”，请先“复制网站”再进行立刻购买。");
	return
}
if(Site.mallImmeBuying) {
	return
}
Site.mallImmeBuying=true;
	var m="id="+f;
	var d=$("#module"+b);
	if(b&&b!="undefined") {
	var o=d.find(".optionMsg");
	if(Fai.isNull(d)) {
	return
}
var q=true;
	var k=[];
	m+="&fromDetail=true";
	d.find(".optionItemWrap").each(function() {
	var t=$(this);
	if(t.find(".optionItemHover").length==1) {
	var s=t.attr("data"),r=t.attr("type"),i=t.find(".optionItemHover").attr("data"),u= {
	};
	u.name=s;
	u.value=parseInt(i);
	if(r!=null) {
	u.type=parseInt(r)
}
k.push(u);
	o.hide()}else {
	var j=t.parent().parent().find(".propName").text();
	o.show();
	o.html(Fai.format(LS.mallCartChoiceItemError,Fai.encodeHtml(j)));
	q=false;
	return false
}
});
	if(Site.optionsStr.oldOptionsStr!="null"&&Site.optionsStr.oldOptionsStr) {
	var n=Site.optionsStr.oldOptionsStr.split("_"),e=[];
	for(var h=0;
	h<n.length;
	h++) {
	for(var g=0;
	g<k.length;
	g++) {
	if(k[g].name==n[h]) {
	e.push(k[g])
}
}}k=e}if(!q) {
	Site.mallImmeBuying=false;
	return false
}
if(k.length>0) {
	m+="&optionList="+Fai.encodeUrl($.toJSON(k))
}
}var p=$("#cartbuyCount"+b),c=p.val(),l=1;
	if(Fai.isInteger(c)) {
	l=parseInt(c)
}
if(l<1) {
	l=1
}
else {
	if(l>9999999) {
	l=9999999
}
}p.val(l);
	var a= {
	pid:f,amount:l,optList:$.toJSON(k)
}
;m+="&amount="+l+"&codata="+$.toJSON(a);
	$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=addIme",data:m,error:function() {
	Site.mallImmeBuying=false;
	Fai.ing(LS.networkError,true)
}
,success:function(i) {
	Site.mallImmeBuying=false;
	var j=$.parseJSON(i);
	if(j.rt==Site.MallAjaxErrno.login) {
	Fai.top.location.href="login.jsp?url="+Fai.encodeUrl(Fai.getUrlRoot(top.location.href))+"&errno=11"
}
else {
	if(j.rt==Site.MallAjaxErrno.mallAmountZero) {
	Fai.ing(LS.mallAmountZero,true)
}
else {
	if(j.rt==Site.MallAjaxErrno.mallOptionStop) {
	Fai.ing(LS.mallOptionStop,true)
}
else {
	if(j.rt==Site.MallAjaxErrno.outOfMallAmount) {
	Fai.ing(LS.mallAmountOverFlow,true)
}
else {
	if(j.rt==Site.MallAjaxErrno.OutOfAllowAmount) {
	Fai.ing(LS.allowAmountOverFlow,true)
}
else {
	if(j.rt==Site.MallAjaxErrno.notAdded) {
	Fai.ing(LS.mallProductNotAdded,true)
}
else {
	Fai.top.location.href="mstl.jsp?imme"
}
}}}}}}});
	if(Fai.isIE()) {
	window.event.cancelBubble=true;
	window.event.returnValue=false
}
else {
	if(!Fai.isMozilla()) {
	event.stopPropagation();
	event.preventDefault()
}
}};
	Site.desMallCartAmount=function(c,d,f,l,g,o) {
	var e=Fai.top.$("#module"+c);
	var q=e.find(".itemLine"+d);
	var n=q.find(".amountEdit");
	var k=parseInt(n.val());
	var j=q.find(".J_mcart-pdSelect").prop("checked");
	var i=k;
	k--;
	if(k<g||k==g) {
	k=g;
	$("#buyCountDes"+c+"_"+d).addClass("disableMallJian");
	$("#buyCountInc"+c+"_"+d).removeClass("disableMallJia")
}
else {
	if(k>9999998) {
	k=9999999;
	$("#buyCountDes"+c+"_"+d).removeClass("disableMallJian");
	$("#buyCountInc"+c+"_"+d).addClass("disableMallJia")
}
else {
	$("#buyCountDes"+c+"_"+d).removeClass("disableMallJian");
	$("#buyCountInc"+c+"_"+d).removeClass("disableMallJia")
}
}n.val(k);
	if(i!=k&&j) {
	Site.mallCartAmountChange(c,d,f,l,g,o)
}
else {
	var b=parseFloat(q.find(".amountEdit").attr("_itemprice"),2);
	var m=parseInt(q.find(".amountEdit").val());
	var h=(b*m);
	h=h.toFixed(2);
	q.find(".itemTotalText").text(h)
}
};
	Site.incMallCartAmount=function(c,d,f,l,g,o) {
	var e=Fai.top.$("#module"+c);
	var q=e.find(".itemLine"+d);
	var n=q.find(".amountEdit");
	var k=parseInt(n.val());
	var i=k;
	var j=q.find(".J_mcart-pdSelect").prop("checked");
	k++;
	if(k<2) {
	k=1;
	$("#buyCountDes"+c+"_"+d).addClass("disableMallJian");
	$("#buyCountInc"+c+"_"+d).removeClass("disableMallJia")
}
else {
	if((k>o||k==o)&&o!=0) {
	k=o;
	$("#buyCountDes"+c+"_"+d).removeClass("disableMallJian");
	$("#buyCountInc"+c+"_"+d).addClass("disableMallJia")
}
else {
	if(k>9999998) {
	k=9999999;
	$("#buyCountDes"+c+"_"+d).removeClass("disableMallJian");
	$("#buyCountInc"+c+"_"+d).addClass("disableMallJia")
}
else {
	$("#buyCountDes"+c+"_"+d).removeClass("disableMallJian");
	$("#buyCountInc"+c+"_"+d).removeClass("disableMallJia")
}
}}n.val(k);
	if(i!=k&&j) {
	Site.mallCartAmountChange(c,d,f,l,g,o)
}
else {
	var b=parseFloat(q.find(".amountEdit").attr("_itemprice"),2);
	var m=parseInt(q.find(".amountEdit").val());
	var h=(b*m);
	h=h.toFixed(2);
	q.find(".itemTotalText").text(h)
}
};
	Site.mallCartAmountChange=function(a,b,d,k,h,l) {
	var c=Fai.top.$("#module"+a);
	var m=c.find(".itemLine"+b);
	var e=m.find(".amountEdit");
	var g=e.val();
	var f=1;
	var i=m.find(".J_mcart-pdSelect").prop("checked");
	if(Fai.isInteger(g)) {
	f=parseInt(g)
}
if(f<h) {
	f=h;
	$("#buyCountDes"+a+"_"+b).addClass("disableMallJian");
	$("#buyCountInc"+a+"_"+b).removeClass("disableMallJia")
}
else {
	if((f>l||f==l)&&l!=0) {
	f=l;
	$("#buyCountDes"+a+"_"+b).removeClass("disableMallJian");
	$("#buyCountInc"+a+"_"+b).addClass("disableMallJia")
}
else {
	if(f>9999998) {
	f=9999999;
	$("#buyCountDes"+a+"_"+b).removeClass("disableMallJian");
	$("#buyCountInc"+a+"_"+b).addClass("disableMallJia")
}
else {
	$("#buyCountDes"+a+"_"+b).removeClass("disableMallJian");
	$("#buyCountInc"+a+"_"+b).removeClass("disableMallJia")
}
}}e.val(f);
	var j=c.find(".cartMsg");
	if(isNaN(f)||f<=0||f>9999999) {
	j.html(LS.mallCartAmountError);
	return
}
c.find(".amountEdit").attr("disabled",true);
	j.show();
	j.html(LS.mallCartUpdating);
	$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=setItem&orderId="+d,data:"itemId="+k+"&amount="+f,error:function() {
	c.find(".amountEdit").removeAttr("disabled");
	j.html(LS.mallCartUpdateError)
}
,success:function(n) {
	c.find(".amountEdit").removeAttr("disabled");
	var n=jQuery.parseJSON(n);
	if(n.success) {
	j.html(LS.mallCartUpdateOk);
	Site.reCountCartMoney(c)
}
else {
	if(n.rt==-3) {
	j.html(LS.mallCartUpdateNotFound)
}
else {
	if(n.rt==-9) {
	j.html(LS.mallCartUpdateStatusError)
}
else {
	j.html(LS.mallCartUpdateError)
}
}}}})};
	Site.reCountCartMoney=function(d) {
	var b=d.find(".cartTotalValue");
	var g=b.attr("choiceCurrencyVal");
	var c=b.attr("levelDiscount");
	var a=b.attr("levelName");
	var f=0;
	var e=0;
	d.find(".itemListcount").each(function() {
	var p=$.parseJSON($(this).attr("saleInfo"));
	var n=$(this).find(".itemLine");
	if(typeof(n)!="undefined"&&n!=null&&n.length>0) {
	var u=0;
	if(typeof(p)!="undefined"&&p!=null&&Site.checkSaleProVal(p)) {
	var j=$(this).attr("lineno");
	var q=p.other.ruleData.d;
	if(p.other.ruleData.s=="1"||p.other.ruleData.s=="2") {
	var h=0;
	var l=0;
	n.each(function() {
	var i=Site.getEachItemPrice(this);
	var v=$(this).find(".J_mcart-pdSelect").prop("checked");
	$(this).find(".itemTotalText").text(i.toFixed(2));
	if(v) {
	l+=i
}
});
	var q=p.other.ruleData.d;
	var t=0;
	var m=0;
	for(var o=0;
	o<q.length;
	o++) {
	var s=parseFloat(q[o].m);
	var k=parseFloat(q[o].n);
	if(s<=0) {
	s=0;
	k=0
}
if(l>=s) {
	if(s>t) {
	t=s;
	m=k
}
}}f+=l;
	e+=l-m;
	if(m>0) {
	var r=[];
	r.push("<div class='needPay'>");
	r.push(g+(l-m).toFixed(2));
	r.push("</div>");
	r.push("<div class='itemTotalPay'>");
	r.push(g+l.toFixed(2));
	r.push("</div>");
	$(".J_salePrice_"+j).html(r.join(""));
	$(".J_salePrice_"+j).css("bottom","1px");
	$(".J_salePrice_"+j).parent(".showRedsalePro").find(".fullReduceCalss").addClass("fullReduceRed");
	$(".J_salePrice_"+j).parent(".showRedsalePro").find(".fullReduceCalss").removeClass("fullReduceGray");
	$(".J_salePrice_"+j).parent(".showRedsalePro").find(".fullReduceCalssRect").addClass("fullReduceRectRed");
	$(".J_salePrice_"+j).parent(".showRedsalePro").find(".fullReduceCalssRect").removeClass("fullReduceRectGray")
}
else {
	$(".J_salePrice_"+j).removeAttr("style");
	$(".J_salePrice_"+j).html(g+l.toFixed(2));
	$(".J_salePrice_"+j).parent(".showRedsalePro").find(".fullReduceCalss").addClass("fullReduceGray");
	$(".J_salePrice_"+j).parent(".showRedsalePro").find(".fullReduceCalss").removeClass("fullReduceRed");
	$(".J_salePrice_"+j).parent(".showRedsalePro").find(".fullReduceCalssRect").addClass("fullReduceRectGray");
	$(".J_salePrice_"+j).parent(".showRedsalePro").find(".fullReduceCalssRect").removeClass("fullReduceRectRed")
}
}}else {
	n.each(function() {
	p=$.parseJSON($(this).attr("saleInfo"));
	var v=$(this).find(".J_mcart-pdSelect").prop("checked");
	var i=Site.getEachItemPrice(this);
	if(v) {
	u+=i;
	f+=i
}
$(this).find(".itemTotalText").text(i.toFixed(2))})}e+=u}});
	Site.refreshTopBarMallCartNum();
	$(".J_countTotal").html(LS.shoppingCartCountMoney+g+f.toFixed(2));
	$(".J_countSave").html("&nbsp;
	&nbsp;
	&nbsp;
	"+LS.shoppingCartCountReduce+g+(f-e).toFixed(2));
	d.find(".cartTotalValue").html(g+e.toFixed(2))};
	Site.getEachItemPrice=function(d) {
	var c=parseFloat($(d).find(".amountEdit").attr("_itemprice"),2);
	var b=parseInt($(d).find(".amountEdit").val());
	if(isNaN(b)) {
	return parseFloat($(d).find(".itemTotalText").html())
}
else {
	return(c*b)
}
};
	Site.showSaleRedPromotion=function(e,c,a,m,k) {
	if(typeof(e)=="undefined"||typeof(c)=="undefined"||e==null||c==null) {
	return
}
if(c<0) {
	return
}
var h=$(".showRedsalePro").eq(0).width();
	var l=$(".J_fullReduceCalss_"+c).eq(0).width();
	if(Site.checkSaleProVal(e)) {
	var f=e.other.ruleData.d;
	if(f.length>0) {
	var g="";
	var b=[];
	for(var d=0;
	d<f.length;
	d++) {
	if(typeof(f[d].m)!="undefined"&&typeof(f[d].n)!="undefined") {
	if(d!=0) {
	b.push(LS.comma)
}
b.push(Fai.format(LS.salePromotionFullReduce,f[d].m,f[d].n))}}if(e.other.ruleData.s=="1") {
	g=Fai.format(LS.salePromotionSigle,b.join(""))
}
else {
	if(e.other.ruleData.s=="2") {
	g=Fai.format(LS.salePromotionGroup,b.join(""))
}
}$(".J_saleWord_"+c).css( {
	left:(45+l)+"px",width:(h-235-l)+"px"
}
);
	$(".J_saleWord_"+c).html(g);
	$(".J_saleWord_"+c).attr("title",g)}}if(typeof(a)=="undefined"||typeof(m)=="undefined"||typeof(k)=="undefined"||a==null||m==null||k==null) {
	return
}
if(a==m) {
	$(".J_salePrice_"+c).html(k+a.toFixed(2))
}
else {
	var j=[];
	j.push("<div class='needPay'>");
	j.push(k+a.toFixed(2));
	j.push("</div>");
	j.push("<div class='itemTotalPay'>");
	j.push(k+m.toFixed(2));
	j.push("</div>");
	$(".J_salePrice_"+c).html(j.join(""));
	$(".J_salePrice_"+c).css("bottom","1px");
	$(".J_salePrice_"+c).parent(".showRedsalePro").find(".fullReduceCalss").addClass("fullReduceRed");
	$(".J_salePrice_"+c).parent(".showRedsalePro").find(".fullReduceCalss").removeClass("fullReduceGray");
	$(".J_salePrice_"+c).parent(".showRedsalePro").find(".fullReduceCalssRect").addClass("fullReduceRectRed");
	$(".J_salePrice_"+c).parent(".showRedsalePro").find(".fullReduceCalssRect").removeClass("fullReduceRectGray")
}
};
	Site.showCountPrice=function(d,b,f,c,a) {
	if(typeof(d)=="undefined"||typeof(b)=="undefined"||typeof(f)=="undefined"||d==null||b==null||f==null) {
	return
}
var g=b-d;
	$(".J_countTotal").html(LS.shoppingCartCountMoney+f+b.toFixed(2));
	$(".J_countSave").html("&nbsp;
	&nbsp;
	&nbsp;
	"+LS.shoppingCartCountReduce+f+g.toFixed(2));
	var e=[];
	e.push("<span class='cartTotalName'>");
	e.push(LS.shouldPayMoney);
	e.push("</span>");
	e.push("<span class='cartTotalValue g_stress' choiceCurrencyVal ='"+f+"' levelDiscount='"+c+"' levelName='"+a+"'  >");
	e.push(f+d.toFixed(2));
	e.push("</span>");
	$(".J_countNeedPay").html(e.join(""))};
	Site.showSaleMemOrRedPrice=function(d,a,i,h,b) {
	if(typeof(d)!="undefined"&&d!=null) {
	if(Site.checkSaleProVal(d)) {
	var e=d.other.ruleData.d;
	if(e.length>0) {
	var f="";
	var c=e[0].m;
	if(d.other.ruleData.s=="1") {
	if(_lcid==2052||_lcid==1028) {
	f=Fai.format(LS.salePromotionPdDisCount,c.toFixed(1))
}
else {
	f=Fai.format(LS.salePromotionPdDisCount,10*(10-c))
}
}else {
	if(d.other.ruleData.s=="2") {
	f=Fai.format(LS.salePromotionPdLapse,h+c.toFixed(2))
}
}var g=[];
	g.push("<div class='saleMemOrRedName'>");
	g.push("<table cellpadding='0' cellspacing='0'><tr>");
	g.push("<td>");
	g.push(LS.salePromotionName);
	g.push("</td>");
	g.push("<td>");
	g.push("<div class='saleMemOrJt'>");
	g.push("</div>");
	g.push("</td>");
	g.push("</tr></table>");
	g.push("</div>");
	g.push("<div class='saleMemOrRedVal'>");
	g.push(LS.salePromotionActivity+Fai.encodeHtml(d.name));
	g.push("<div style='height:3px;
	'></div>");
	g.push(f);
	g.push("</div>");
	$(".J_itemPrice_"+b).css("margin-top","-18px");
	$(".J_saleMemOrRedPrice_"+b).html(g.join(""))}}}else {
	if(a>0&&a<1) {
	var g=[];
	g.push("<div class='saleMemOrRedName'>");
	g.push("<table cellpadding='0' cellspacing='0'><tr>");
	g.push("<td>");
	g.push(LS.memberPrice);
	g.push("</td>");
	g.push("<td>");
	g.push("<div class='saleMemOrJt'>");
	g.push("</div>");
	g.push("</td>");
	g.push("</tr></table>");
	g.push("</div>");
	g.push("</div>");
	g.push("<div class='saleMemOrRedVal'>");
	a=Math.round(a*100);
	g.push(i+Fai.format(LS.salePromotionRedVal,"*"+a+"%"));
	g.push("</div>");
	$(".J_itemPrice_"+b).css("margin-top","-18px");
	$(".J_saleMemOrRedPrice_"+b).html(g.join(""))
}
}};
	Site.checkSaleProVal=function(a) {
	if(typeof(a.other)!="undefined") {
	if(typeof(a.other.ruleData)!="undefined") {
	if(typeof(a.other.ruleData.s)!="undefined"&&typeof(a.other.ruleData.d)!="undefined") {
	if(a.other.ruleData.d!=null&&a.other.ruleData.d.length>0) {
	return true
}
}}}return false};
	Site.showSaleMemOrRedValInIE=function() {
	$(".saleProSignHover").hover(function() {
	$(this).find(".saleMemOrRedName").css("border-bottom-width","0px");
	$(this).find(".saleMemOrRedVal").css( {
	"background-color":"#ffefe9",display:"block"
}
);
	$(this).find(".saleMemOrJt").addClass("saleMemOrJtUp")},function() {
	$(this).find(".saleMemOrRedName").css("border-bottom-width","1px");
	$(this).find(".saleMemOrRedVal").css( {
	"background-color":"#ffefe9",display:"none"
}
);
	$(this).find(".saleMemOrJt").removeClass("saleMemOrJtUp")})};
	Site.mallCartItemDel=function(h,e,a,g,d,c) {
	var b=Fai.top.$("#module"+h);
	var f=b.find(".cartMsg");
	f.show();
	f.html(LS.mallCartUpdating);
	$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=delItem&orderId="+a,data:"itemId="+g,error:function() {
	f.html(LS.mallCartUpdateError)
}
,success:function(s) {
	var s=jQuery.parseJSON(s);
	if(s.success) {
	f.html(LS.mallCartUpdateOk);
	var q=b.find(".itemLine"+e);
	var p=q.parent();
	var m=p.find(".itemLine");
	var j=m.length;
	var n=0;
	for(var l=0;
	l<j;
	l++) {
	if(q.attr("class")==m.eq(l).attr("class")) {
	n=l;
	break
}
}if(j>1) {
	if(n==(j-1)) {
	p.find(".separatorLine").eq((n-1)).remove();
	var k=m.eq((j-1)).find(".J_saleXuXian").attr("style");
	m.eq((j-2)).find(".J_saleXuXian").attr("style",k)
}
else {
	b.find(".separatorLine"+e).remove()
}
}q.remove();
	if(j==1) {
	var o=p.attr("lineno");
	b.find(".J_saleRemove_"+o).remove()
}
setTimeout(function() {
	var i=b.find(".J_saleTabItem_"+c).length;
	if(i<=0) {
	b.find(".J_saleTabRemove_"+c).remove()
}
},100);
	var r=b.find(".itemLine");
	if(r.length==0) {
	Fai.top.location.reload()
}
else {
	Site.reCountCartMoney(b)
}
}else {
	if(s.rt==-3) {
	f.html(LS.mallCartUpdateNotFound)
}
else {
	if(s.rt==-9) {
	f.html(LS.mallCartUpdateStatusError)
}
else {
	f.html(LS.mallCartUpdateError)
}
}}}})};
	Site.mallSettle=function(b) {
	var c=$(".J_mcart-pdSelect").not("input:checked");
	var a=$(".J_mcart-pdSelect").filter("input:checked");
	var d=new Array();
	$(c).each(function() {
	var e=$(this).attr("itemId");
	d.push(e)
}
);
	$(".J_mallCart .itemInvalid").each(function() {
	var e=$(this).attr("itemid");
	d.push(e)
}
);
	if(a.length) {
	if(b>0) {
	Fai.top.location.href="mstl.jsp?id="+b+"&unCheckedItemIds="+d
}
else {
	Fai.top.location.href="mstl.jsp"
}
}else {
	Fai.ing(LS.mallSelectSettleItem)
}
};
	Site.mallSelectAllShop=function(g,e) {
	var d=$("#module"+g),f=d.find("#selectAll"),h=d.find(".J_mcart-pdSelect"),b=d.find(".J_mcart-pdSelect:checked"),a=h.not("input:checked");
	var c=f.prop("checked");
	if(!e) {
	if(c) {
	a.click();
	f.prop("checked",true)
}
else {
	b.click();
	f.prop("checked",false)
}
}else {
	h.prop("checked",c)
}
};
	Site.mallSelectShop=function(f,g,a,h,d) {
	var c=$("#module"+f),e=c.find(".J_mcart-pdSelect"),b=c.find("#selectAll");
	b.prop("checked",true);
	$.each(e,function(j,k) {
	if(!$(k).prop("checked")) {
	b.prop("checked",false);
	return false
}
});
	if(!d) {
	Site.mallCartAmountChange(f,g,a,h)
}
};
	Site.mallStlPayMode=function(b,c) {
	var a=Fai.top.$("#module"+b);
	a.find("input[name=mallPay]").val(c);
	if(c==2) {
	a.find(".bankList").show()
}
else {
	a.find(".bankList").hide()
}
if(c==3||c==4||c==5||c==6||c==7||c==9||c==8||c==10) {
	a.find(".payOnlinePanel").show();
	a.find(".payOnlinePanel input[value='"+c+"']").click();
	if(c===8) {
	$(a.find(".payOnlinePanel input[type='radio']")[0]).click()
}
}else {
	a.find(".payOnlinePanel").hide()
}
};
	Site.mallStlCalcTotal=function(h) {
	var b=Fai.top.$("#module"+h);
	var f=parseFloat(b.find(".cartTotalPrice").text());
	if(isNaN(f)) {
	return
}
var d=parseFloat(b.find("input[name=mallShip]:checked").attr("price"));
	if(isNaN(d)) {
	d=0
}
if($("#mallShipTemplate_province").length>0) {
	var a=b.find("input[name=mallShip]:checked");
	a.attr("provinceCode",$.trim($("#mallShipTemplate_province").val()));
	a.attr("cityCode",$.trim($("#mallShipTemplate_city").val()));
	a.attr("countyCode",$.trim($("#mallShipTemplate_county").val()))
}
var g=0;
	if($("#offsetMoney").length>0) {
	var c=$("#offsetMoney").attr("_offsetmoney");
	if(!isNaN(c)) {
	g=parseFloat(c);
	if((f+d)<g) {
	Fai.ing(Fai.format(LS.integral_maxUse,$("#useItg").attr("_maxuse"),Fai.encodeHtml($("#useItg").attr("__itegName"))),true);
	$("#useItg").focus();
	b.find(".mallStlTotal .totalValue").text((f+d).toFixed(2));
	return
}
}var e=parseInt(b.find("#presentItg").attr("value"));
	if(e>0) {
	b.find("#presentItg").text(parseInt((f-g).toFixed(2)*e))
}
}b.find(".mallStlTotal .totalValue").text((f+d-g).toFixed(2))};
	Site.mallStlChangeBank=function(a) {
	$("#"+a).attr("checked",true)
}
;Site.mallNumeric=function(a) {
	$("#module"+a+" .numeric").numeric( {
	decimal:" ",negative:false
}
)};
	Site.getMallSubmitData=function(e,t,r,d,p) {
	var i="";
	e.find(".propItemValue").each(function() {
	var A=$(this),D=A.attr("_required")==1;
	if(A.hasClass("J-pccS")&&p) {
	var z=$("#addrInfo_province"),w=$("#addrInfo_province").val();
	if(D&&w==-1) {
	i=LS.mallStlSubmitAddrErr;
	return false
}
var x=$("#addrInfo_city"),B=$("#addrInfo_city").val();
	if(D&&B==-1) {
	i=LS.mallStlSubmitAddrErr;
	return false
}
var y=$("#addrInfo_county"),G=$("#addrInfo_county").val(),u=$("#addrInfo_street"),H=$.trim($("#addrInfo_street").val());
	if(D&&H==="") {
	i=LS.editStreetAddr;
	return false
}
var C=[w==-1?"":z.find("option:selected").text(),B==-1?"":x.find("option:selected").text(),G==-1?"":y.find("option:selected").text(),H];
	C=C.join("");
	if(d!=0) {
	var E= {
	};
	E.provinceCode=w;
	E.cityCode=B;
	E.countyCode=G;
	E.streetAddr=H;
	r.addr_info=E;
	r.addr=C;
	r.isDefault=1
}
t.addr=C}else {
	var v=A.find("input").val();
	if(D==1&&!v) {
	i=LS.mallStlSubmitInput+A.attr("_prop");
	return false
}
var F=A.attr("_field");
	if(v&&v.length>0) {
	if(F==="email"&&!Fai.isEmail(v)) {
	i=LS.mallStlSubmitInput2+A.attr("_prop");
	return false
}
if(F==="phone"&&!Fai.isPhone(v)) {
	i=LS.mallStlSubmitInput2+A.attr("_prop");
	return false
}
}if(typeof F!=="undefined") {
	t[F]=v;
	if(d!=0&&p) {
	r[F]=v
}
}}});
	if(i!="") {
	return i
}
if(Site.orderMessageOpen) {
	var o=Fai.decodeHtml($("#orderLeveaMsgIn").val());
	if(o.length>Site.orderMessageMaxNum) {
	o=o.substring(0,Site.orderMessageMaxNum)
}
if(o!==Site.orderLeveaMsgTip) {
	t.msg=o
}
else {
	t.msg=""
}
}else {
	t.msg=""
}
var b=e.find("input[name=mallShip]:checked");
	if($("#mallShipTemplate_province").length===1&&b.length===1) {
	var h=parseInt(b.attr("provinceCode")),k=parseInt(b.attr("cityCode")),g=parseInt(b.attr("countyCode"));
	if(!h||isNaN(h)||!site_cityUtil.isValidProvince(h)) {
	i=LS.mallStlSubmitAddrErr;
	return i
}
if(!k||isNaN(k)||!site_cityUtil.isValidCity(k,h)) {
	i=LS.mallStlSubmitAddrErr;
	return i
}
var j= {
	type:parseInt(b.val()),templateId:parseInt(b.attr("templateId")),provinceCode:h,cityCode:k,countyCode:g,streetAddr:$.trim($("#streetAddress").val())
}
;t.shipType=j}else {
	if(b.length===1) {
	t.shipType=parseInt(b.val())
}
}var l=e.find("input[name=mallPay]:checked");
	if(l.length==1) {
	t.payMode=parseInt(l.val())
}
var m=parseInt(l.val());
	if(m==3) {
	var n=e.find("input[name=onlineTenpayBankType]:checked")
}
else {
	var n=e.find("input[name=onlineAlipayBankType]:checked")
}
if(n.length==1) {
	if(m!=6&&m!=7&&m!=9) {
	t.payBankType=parseInt(n.val())
}
}var s=$("#useItg");
	if(s.length>0) {
	var c=s.val();
	if(Fai.isInteger(c)) {
	var f=parseInt(s.attr("_maxUse")),a=parseInt(s.attr("_currentitg")),q=s.attr("_itgname");
	if(c>a) {
	i=Fai.format(LS.integral_notOverCurrent,Fai.encodeHtml(q),Fai.encodeHtml(q));
	return i
}
if(c>f) {
	i=Fai.format(LS.integral_notOver,Fai.encodeHtml(q),f);
	return i
}
if(c<0) {
	i=LS.integral_inputInteger;
	return i
}
t.useItg=parseInt(c)}else {
	if(c.length!=0) {
	i=LS.integral_inputInteger;
	return i
}
}}if($("#presentItgShow").length>0) {
	t.presentItg=true
}
return i};
	Site.mallImmeSubmit=function(e,b,c) {
	var f= {
	},g= {
	},e=Fai.top.$("#module"+e),a=e.find(".stlMsg");
	var h=Site.getMallSubmitData(e,f,g,b,c);
	if(h!="") {
	a.show();
	a.html(h);
	Site.scrollToDiv(e);
	return
}
var d=e.find(".mallStlOpt input");
	d.attr("disabled",true);
	a.show();
	a.html(LS.mallStlSubmitting);
	Site.scrollToDiv(e);
	if(b!=0&&c) {
	$.ajax( {
	type:"post",url:action="ajax/memberAdm_h.jsp?cmd=set&opera=add&id="+b,data:"info="+Fai.encodeUrl($.toJSON(g)),success:function(i) {
	},error:function() {
	}
}
)}$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=settle&imme",data:"data="+Fai.encodeUrl($.toJSON(f)),error:function() {
	d.removeAttr("disabled");
	a.html(LS.mallStlSubmitError)
}
,success:function(i) {
	d.removeAttr("disabled");
	var i=jQuery.parseJSON(i);
	if(i.success) {
	Fai.top.location.href="mdetail.jsp?id="+i.oid+"&suc=true"
}
else {
	if(i.rt==-3) {
	a.html(LS.mallStlSubmitNotFound)
}
else {
	if(i.rt==-9) {
	a.html(LS.mallStlSubmitStatusError)
}
else {
	if(i.rt==Site.MallAjaxErrno.outOfMallAmount) {
	a.html(Fai.format(LS.mallAmountOverNameList,i.productsName))
}
else {
	a.html(LS.mallStlSubmitError)
}
}}}}})};
	Site.mallSubmit=function(d,a,b,k,i,j) {
	if(a==0) {
	Fai.top.location.href="mdetail.jsp";
	return
}
var h= {
	},f= {
	},d=Fai.top.$("#module"+d),g=d.find(".stlMsg");
	var e=Site.getMallSubmitData(d,h,f,i,j);
	if(e!="") {
	g.show();
	g.html(e);
	Site.scrollToDiv(d);
	return
}
var c=d.find(".mallStlOpt input");
	c.attr("disabled",true);
	g.show();
	g.html(LS.mallStlSubmitting);
	Site.scrollToDiv(d);
	if(i!=0&&j) {
	$.ajax( {
	type:"post",url:action="ajax/memberAdm_h.jsp?cmd=set&opera=add&id="+i,data:"info="+Fai.encodeUrl($.toJSON(f)),success:function(l) {
	},error:function() {
	}
}
)}$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=delItem&orderId="+a,data:"itemIds="+Fai.encodeUrl($.toJSON(b)),error:function() {
	c.removeAttr("disabled");
	g.html(LS.mallStlSubmitError)
}
,success:function() {
	$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=settle&orderId="+a,data:"data="+Fai.encodeUrl($.toJSON(h)),error:function() {
	c.removeAttr("disabled");
	g.html(LS.mallStlSubmitError)
}
,success:function(l) {
	c.removeAttr("disabled");
	var l=jQuery.parseJSON(l);
	if(l.success) {
	$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=addAfterShop",data:"data="+Fai.encodeUrl($.toJSON(k)),error:function() {
	c.removeAttr("disabled");
	g.html(LS.mallStlSubmitError)
}
,success:function(m) {
	Fai.top.location.href="mdetail.jsp?id="+a+"&suc=true"
}
})}else {
	if(l.rt==-3) {
	g.html(LS.mallStlSubmitNotFound)
}
else {
	if(l.rt==-9) {
	g.html(LS.mallStlSubmitStatusError)
}
else {
	if(l.rt==Site.MallAjaxErrno.outOfMallAmount) {
	g.html(Fai.format(LS.mallAmountOverNameList,l.productsName))
}
else {
	if(l.rt==Site.MallAjaxErrno.OutOfAllowAmount) {
	g.html(Fai.format(LS.allowAmountOverNameList,l.productsName))
}
else {
	g.html(LS.mallStlSubmitError)
}
}}}}}})}})};
	Site.initModuleMallAddrInfo=function(b,a,d,m) {
	var l="-----------",q=[],f,s,k,p,t,g,r;
	if(m==2052||m==1028) {
	r=site_cityUtil.getProvince();
	site_cityUtil.simpleProvinceName(r)
}
else {
	r=site_cityUtil.getProvinceEn();
	site_cityUtil.simpleProvinceNameEn(r)
}
$.each(r,function(j,u) {
	if(m==2052||m==1028) {
	q.push("<option value='"+u.id+"'>"+site_cityUtil.simpleCityNameStr(u.name)+"</option>")
}
else {
	q.push("<option value='"+u.id+"'>"+site_cityUtil.simpleCityNameStrEn(u.name)+"</option>")
}
});
	$("#addrInfo_province").html("").html("<option value='-1'>"+l+"</option>"+q.join("")).change(function(i) {
	f=$("#addrInfo_province").val();
	if(isNaN(f)||f<=0) {
	$("#addrInfo_city").html("").html("<option value='-1'>"+l+"</option>");
	$("#addrInfo_county").html("").html("<option value='-1'>"+l+"</option>")
}
$("#mallShipTemplate_province").val($("#addrInfo_province").val());
	$("#mallShipTemplate_province").change();
	k=[];
	if(m==2052||m==1028) {
	s=site_cityUtil.getCities(f);
	site_cityUtil.simpleCityName(s)
}
else {
	s=site_cityUtil.getCitiesEn(f);
	site_cityUtil.simpleCityNameEn(s)
}
$.each(s,function(j,u) {
	k.push("<option value='"+u.id+"' >"+u.name+"</option>")
}
);
	$("#addrInfo_city").html("").html("<option value='-1'>"+l+"</option>"+k.join("")).unbind().bind("change",function(j) {
	p=$("#addrInfo_city").val();
	if(isNaN(p)||p<=0) {
	$("#addrInfo_county").html("").html("<option value='-1'>"+l+"</option>")
}
$("#mallShipTemplate_city").val($("#addrInfo_city").val());
	$("#mallShipTemplate_city").change();
	g=[];
	if(m==2052||m==1028) {
	t=site_cityUtil.getCounty(p)
}
else {
	t=site_cityUtil.getCountyEn(p)
}
$.each(t,function(u,v) {
	g.push("<option value='"+v.id+"' >"+v.name+"</option>")
}
);
	$("#addrInfo_county").html("").html("<option value='-1'>"+l+"</option>"+g.join("")).unbind().bind("change",function(u) {
	$("#mallShipTemplate_county").val($("#addrInfo_county").val());
	$("#mallShipTemplate_county").change()
}
)});
	$("#addrInfo_street").change(function(j) {
	$("#streetAddress").val($("#addrInfo_street").val())
}
)});
	$("#addrInfo_city").html("").html("<option value='-1'>"+l+"</option>");
	$("#addrInfo_county").html("").html("<option value='-1'>"+l+"</option>");
	$(".addrMsg_default,.addrMsg").click(function() {
	var w=$(this).attr("_item");
	$(this).find(".selected").show();
	if($(this).parent().find(".addrMsg_default").hasClass("isDefault")) {
	$(this).parent().find(".addrMsg_default").attr("class","addrMsg isDefault")
}
else {
	$(this).parent().find(".addrMsg_default").attr("class","addrMsg notDefault")
}
if($(this).hasClass("isDefault")) {
	$(this).attr("class","addrMsg_default isDefault")
}
else {
	$(this).attr("class","addrMsg_default notDefault")
}
$(this).parent().find(".addrMsg_default,.addrMsg").each(function() {
	if($(this).attr("_item")!=w) {
	$(this).find(".selected").hide()
}
});
	var u=b[w];
	setTimeout(function() {
	$("#mallShipTemplate_province").val(u.addr_info["provinceCode"]);
	$("#mallShipTemplate_province").trigger("change");
	setTimeout(function() {
	$("#mallShipTemplate_city").val(u.addr_info["cityCode"]);
	$("#mallShipTemplate_city").trigger("change");
	setTimeout(function() {
	$("#mallShipTemplate_county").val(u.addr_info["countyCode"]);
	$("#mallShipTemplate_county").trigger("change")
}
,0)},0)},0);
	$("#streetAddress").val(u.addr_info["streetAddr"]);
	for(var v=0;
	v<a.length;
	v++) {
	if(a[v]!=null) {
	var j=a[v]["fieldKey"];
	var x=u[j];
	$(".propList").find(".propItemValue").each(function() {
	if($(this).attr("_field")==j) {
	$(this).find("input").val(x)
}
})}}});
	for(var o=0;
	o<b.length;
	o++) {
	var c=b[o];
	if(c.isDefault==1) {
	for(var n=0;
	n<a.length;
	n++) {
	if(a[n]!=null) {
	var e=a[n]["fieldKey"];
	var h=c[e];
	$(".propList").find(".propItemValue").each(function() {
	if($(this).attr("_field")==e) {
	$(this).find("input").val(h)
}
})}}if(c.addr_info!=null) {
	$(".addrMsg_default,.addrMsg").each(function() {
	if($(this).attr("_item")==o) {
	$(this).click()
}
})}}}if(d==7) {
	$(".addrMsg_default,.addrMsg").each(function() {
	if($(this).attr("_item")==(b.length-1)) {
	$(this).click()
}
})}else {
	if(d!=6) {
	$(".addrMsg_default,.addrMsg").each(function() {
	if($(this).attr("_item")==d) {
	$(this).click()
}
})}}if(Fai.isIE6()) {
	if(b.length>2) {
	$(".addrMsgList").attr("style","cursor:pointer;
	height:300px;
	width:690px;
	")
}
else {
	$(".addrMsgList").attr("style","cursor:pointer;
	height:150px;
	")
}
}};
	Site.initPayOrder=function(a) {
	var b=new Site.payOrder(a);
	b.init()
}
;Site.payOrder=function(a) {
	this.orderId=a
}
;(function(f,a,c) {
	var g=a.prototype;
	var b,h=f(".dtlSubmit"),d=f(".detailMsg");
	g.init=function() {
	b=this.orderId;
	i()
}
;function i() {
	h.on("click",function() {
	var j=e(b);
	if(j) {
	var k=f(this).attr("_href");
	if(k!="WXPAY") {
	top.location.href=k
}
else {
	Site.getWxpayUrl(b)
}
}})}function e() {
	var j=true;
	f.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=checkOrder",data:"orderId="+b,async:false,dataType:"json",error:function() {
	Fai.ing(LS.mallStlSubmitError)
}
,success:function(k) {
	if(!k.success) {
	j=false;
	if(k.rt==-3) {
	d.html(LS.mallStlSubmitNotFound)
}
else {
	if(k.rt==-9) {
	d.html(LS.mallStlSubmitStatusError)
}
else {
	if(k.rt==Site.MallAjaxErrno.outOfMallAmount) {
	d.html(Fai.format(LS.mallAmountOverNameList,k.productsName))
}
else {
	if(k.rt==Site.MallAjaxErrno.OutOfAllowAmount) {
	d.html(Fai.format(LS.allowAmountOverNameList,k.productsName))
}
else {
	if(k.rt==Site.MallAjaxErrno.payDomainError) {
	d.html(LS.mallPayDomainError)
}
else {
	d.html(LS.mallStlSubmitError)
}
}}}}d.show()}}});
	return j}})(jQuery,Site.payOrder);
	Site.initModuleMallShipTemplate=function(p,q,b,s,g,c,a,k) {
	var e=s.vType||1,l=s.sco||0,d=s.openItemList;
	var j="-----------",o=[],f,r,i,m,t,h,n;
	if(k==2052||k==1028) {
	n=site_cityUtil.getProvince();
	site_cityUtil.simpleProvinceName(n)
}
else {
	n=site_cityUtil.getProvinceEn();
	site_cityUtil.simpleProvinceNameEn(n)
}
$.each(n,function(u,v) {
	if(k==2052||k==1028) {
	o.push("<option value='"+v.id+"' >"+site_cityUtil.simpleCityNameStr(v.name)+"</option>")
}
else {
	o.push("<option value='"+v.id+"' >"+site_cityUtil.simpleCityNameStrEn(v.name)+"</option>")
}
});
	$("#mallShipTemplate_province").html("").html("<option value='-1'>"+j+"</option>"+o.join("")).change(function(u) {
	f=$("#mallShipTemplate_province").val();
	if(isNaN(f)||f<=0) {
	$("#mallShipTemplate_city").html("").html("<option value='-1'>"+j+"</option>");
	$("#mallShipTemplate_county").html("").html("<option value='-1'>"+j+"</option>");
	$.each(d,function(v,w) {
	$("#template_item_money"+w.type).html("").html(g+w.defaultPrice.toFixed(1));
	$("#template_item_"+w.type).attr("price",w.defaultPrice.toFixed(1))
}
);
	Site.mallStlCalcTotal(p);
	return}i=[];
	if(k==2052||k==1028) {
	r=site_cityUtil.getCities(f);
	site_cityUtil.simpleCityName(r)
}
else {
	r=site_cityUtil.getCitiesEn(f);
	site_cityUtil.simpleCityNameEn(r)
}
$.each(r,function(v,w) {
	i.push("<option value='"+w.id+"' >"+w.name+"</option>")
}
);
	$("#mallShipTemplate_city").html("").html("<option value='-1'>"+j+"</option>"+i.join("")).unbind().bind("change",function(v) {
	m=$("#mallShipTemplate_city").val();
	if(isNaN(m)||m<=0) {
	$("#mallShipTemplate_county").html("").html("<option value='-1'>"+j+"</option>");
	$.each(d,function(w,x) {
	$("#template_item_money"+x.type).html("").html(g+x.defaultPrice.toFixed(1));
	$("#template_item_"+x.type).attr("price",x.defaultPrice.toFixed(1))
}
);
	Site.mallStlCalcTotal(p);
	return}h=[];
	if(k==2052||k==1028) {
	t=site_cityUtil.getCounty(m)
}
else {
	t=site_cityUtil.getCountyEn(m)
}
$.each(t,function(w,x) {
	h.push("<option value='"+x.id+"' >"+x.name+"</option>")
}
);
	$("#mallShipTemplate_county").html("").html("<option value='-1'>"+j+"</option>"+h.join("")).unbind().bind("change",function(w) {
	Site.mallStlCalcTotal(p)
}
);
	if(q===0) {
	Site.mallStlCalcTotal(p);
	return
}
$.each(d,function(x,z) {
	if(l) {
	var y=false,w=s.scrl||[];
	$.each(w,function(B,A) {
	if(A.st===z.type) {
	if($.inArray(parseInt(m),A.arl)>-1) {
	if(A.fc===1) {
	if(e===1) {
	if(q>=A.d1) {
	y=true;
	return false
}
}else {
	if(q<=A.d1) {
	y=true;
	return false
}
}}if(A.fc===2) {
	if(b>=A.d2) {
	y=true;
	return false
}
}if(A.fc===3) {
	if(e===1) {
	if(q>=A.d1&&b>=A.d2) {
	y=true;
	return false
}
}else {
	if(q<=A.d1&&b>=A.d2) {
	y=true;
	return false
}
}}if(A.fc===4) {
	if(e===1) {
	if(q>=A.d1||b>=A.d2) {
	y=true;
	return false
}
}else {
	if(q<=A.d1||b>=A.d2) {
	y=true;
	return false
}
}}}}});
	if(y) {
	$("#template_item_money"+z.type).html("").html(LS.freeShipping);
	$("#template_item_"+z.type).attr("price",0);
	return
}
}if(!z.regionList||z.regionList.length<=0) {
	$("#template_item_money"+z.type).html("").html((g+z.defaultPrice.toFixed(1)));
	$("#template_item_"+z.type).attr("price",z.defaultPrice.toFixed(1));
	return true
}
$.each(z.regionList,function(F,I) {
	if($.inArray(parseInt(m),I.areaList)<0) {
	$("#template_item_money"+z.type).html("").html((g+z.defaultPrice.toFixed(1)));
	$("#template_item_"+z.type).attr("price",z.defaultPrice.toFixed(1));
	return true
}
var E=0,B=I.price,G=I.rha==null?1:I.rha,H=I.ria==null?1:I.ria,C=I.rip||0;
	var D=q;
	if(G>0) {
	E=B;
	D-=G
}
if(H>0&&D>0) {
	var A=(D/H).toFixed(1);
	A=Math.ceil(A);
	E+=C*A
}
$("#template_item_money"+z.type).html("").html((g+E.toFixed(1)));
	$("#template_item_"+z.type).attr("price",E.toFixed(1));
	return false})});
	Site.mallStlCalcTotal(p)});
	$("#mallShipTemplate_county").html("").html("<option value='-1'>"+j+"</option>");
	$.each(d,function(v,w) {
	$("#template_item_money"+w.type).html("").html(g+w.defaultPrice.toFixed(1));
	$("#template_item_"+w.type).attr("price",w.defaultPrice.toFixed(1))
}
);
	Site.mallStlCalcTotal(p)});
	$("#mallShipTemplate_city").html("").html("<option value='-1'>"+j+"</option>");
	$("#mallShipTemplate_county").html("").html("<option value='-1'>"+j+"</option>");
	$("#template_item_"+c.type).click()};
	Site.initPresentIpt=function() {
	var a=$("#useItg");
	if(a.length>0) {
	a.bind("change",function() {
	var b=parseInt(a.attr("_needitg"));
	var g=parseInt(a.val());
	var f=a.attr("_itgname");
	var c=parseInt(a.attr("_maxuse"));
	if(isNaN(g)) {
	g=0
}
if(g>c) {
	Fai.ing(Fai.format(LS.integral_maxUse,$("#useItg").attr("_maxuse"),Fai.encodeHtml($("#useItg").attr("_itgName"))),true);
	return
}
if(g>parseInt(a.attr("_currentItg"))) {
	Fai.ing(Fai.format(LS.integral_notOverCurrent,Fai.encodeHtml(f),Fai.encodeHtml(f)));
	a.focus();
	return
}
if(g<0) {
	Fai.ing(LS.integral_inputInteger);
	a.focus();
	return
}
var d=(g/b).toFixed(2);
	$("#offsetMoney").text(d);
	$("#offsetMoney").attr("_offsetmoney",d);
	var e=$(this).attr("moduleId");
	Site.mallStlCalcTotal(e)})}};
	Site.showBankList=function(c) {
	var a=$("#"+c).attr("value");
	$("#mallPay").attr("value",a);
	$(".onlineBankList").hide();
	if(c!="chinabankpay"&&c!="paypal") {
	var b=parseInt($("#"+c)[0].offsetLeft);
	$("#bankArrow").css("left",b+60);
	$("#bankArrow").show();
	$("#"+c+"Bank").show()
}
else {
	$("#bankArrow").hide()
}
};
	Site.initOnlineBankList=function() {
	$("#payOnlinePanel").insertAfter($("#onlineItem")[0])
}
;Site.getWxpayUrl=function(b) {
	var a=$("#wxpayBtn");
	if(a.attr("_sending")==="true") {
	Fai.ing("您的操作太频繁，请稍后再试。",true);
	return
}
a.attr("_sending","true");
	$.ajax( {
	type:"post",url:"ajax/mall_h.jsp?cmd=getWxpayUrl",data:"orderId="+b,error:function() {
	Fai.ing("系统错误。")
}
,success:function(c) {
	var d=$.parseJSON(c);
	if(d.success) {
	Site.showWxQRCode(d.url,b)
}
else {
	Fai.ing("系统错误，请刷新重试。")
}
}})};
	Site.showWxQRCode=function(a,b) {
	var h=parseInt(Math.random()*10000);
	var i=480;
	var d=800;
	var f=["<div  id='wxpayQrCodeBox"+h+"' class='popupBg'  style='filter:alpha(opacity=50);
	opacity:0.5;
	'></div>","<div id='wxPayQRCodeDisplay"+h+"' class='webSiteQRCodeDisplay' style='z-index:9032;
	display:block;
	width:"+d+"px;
	height:"+i+"px;
	left:"+(Fai.top.document.documentElement.clientWidth-d)/2+"px;
	'>","<div class='wxqrCodeTitileBox'>","<div class='wxqrCodeTitile'>微信支付</div>","<a hidefocus='true' href='javascript:;
	' class='cancelBtn' onclick='Site.closeWxQrcodeDiv("+h+");
	return false;
	'></a>","<div style='clear:both;
	'></div>","</div>","<div class='wxpayQrCodeBox'>","<div class='wxpayQrCodeImgBox'>","<img title='' src='/qrCode.jsp?cmd=wxPayQrCode&&url="+a+"' >","</div>","<div class='wxpayQrCodeTips'></div>","</div>","<div  class='wxGuardImg'></div>","<div style='clear:both;
	'></div>","<div class='paidTips'>完成支付5秒后没跳转，请刷新页面。</div>","</div>"];
	Fai.top.$(f.join("")).appendTo("body");
	var e=Fai.top.document.documentElement.clientHeight;
	var g=(e-i)/2;
	var c=$(window).scrollTop();
	$("#wxPayQRCodeDisplay"+h).css("top",g+c);
	$("#wxpayBtn").attr("_sending","false");
	setInterval("Site.checkOrderStatue("+b+")",2000)
}
;Site.closeWxQrcodeDiv=function(a) {
	Fai.top.$("#wxpayQrCodeBox"+a).remove();
	Fai.top.$("#wxPayQRCodeDisplay"+a).remove()
}
;Site.checkOrderStatue=function(a) {
	$.ajax( {
	type:"post",url:"ajax/mall_h.jsp?cmd=checkOrderStatue",data:"orderId="+a,error:function() {
	Fai.ing("系统错误。")
}
,success:function(b) {
	var c=$.parseJSON(b);
	if(c.success) {
	window.location.reload()
}
}})};
	Site.mallCartInit=function(b) {
	var a=Fai.top.$("#memberBar").find("#mallCart_js");
	var c=Fai.top.$("#memberBar").find(".mallCartPanel");
	$(a).find(".mallCartItem").bind("click",function() {
	window.open("mcart.jsp","_blank")
}
);
	$(c).find(".checkMallCartBtn").bind("click",function() {
	window.open("mcart.jsp","_blank")
}
);
	Site.refreshTopBarMallCartNum();
	if(b!=13&&b!=14) {
	$(a).bind("mouseenter",function(d) {
	var e=Fai.top.$("#memberBar").find(".mallCartPanel");
	$(this).attr("_mouseIn",1);
	$(this).find(".mallCartItem").addClass("mallCartItem_hover");
	if(!$(e).is(":visible")) {
	Site.refreshTopBarMallCart(this)
}
}).bind("mouseleave",function() {
	$(this).attr("_mouseIn",0);
	setTimeout(function() {
	var d=Fai.top.$("#memberBar").find(".mallCartPanel");
	var e=$(d).attr("_mouseIn");
	if(e!=1) {
	$(d).hide();
	Fai.top.$("#memberBar").find(".mallCartItem").removeClass("mallCartItem_hover")
}
},50)});
	$(c).bind("mouseenter",function() {
	$(this).attr("_mouseIn",1)
}
).bind("mouseleave",function() {
	$(this).attr("_mouseIn",0);
	setTimeout(function() {
	var d=Fai.top.$("#memberBar").find("#mallCart_js");
	var e=$(d).attr("_mouseIn");
	if(e!=1) {
	Fai.top.$("#memberBar").find(".mallCartPanel").hide();
	Fai.top.$("#memberBar").find(".mallCartItem").removeClass("mallCartItem_hover")
}
},50)})}};
	Site.mobiWebInit=function() {
	var b=Fai.top.$("#memberBar").find("#mobiWeb_js");
	var a=Fai.top.$("#memberBar").find(".mobiWebPanel");
	$(b).bind("mouseenter",function(d) {
	$(this).attr("_mouseIn",1);
	$(this).find(".mobiWebItem").addClass("mobiWebItem_hover");
	var c=parseInt($(b).css("margin-left"));
	var e=$(b).position().left+c;
	$(a).css("left",e+"px");
	$(a).show()
}
).bind("mouseleave",function() {
	$(this).attr("_mouseIn",0);
	setTimeout(function() {
	var c=Fai.top.$("#memberBar").find(".mobiWebPanel");
	var d=$(c).attr("_mouseIn");
	if(d!=1) {
	$(c).hide();
	Fai.top.$("#memberBar").find(".mobiWebItem").removeClass("mobiWebItem_hover")
}
},50)});
	$(a).bind("mouseenter",function(c) {
	$(this).attr("_mouseIn",1)
}
).bind("mouseleave",function() {
	$(this).attr("_mouseIn",0);
	setTimeout(function() {
	var c=Fai.top.$("#memberBar").find("#mobiWeb_js");
	var d=$(c).attr("_mouseIn");
	if(d!=1) {
	Fai.top.$("#memberBar").find(".mobiWebPanel").hide();
	Fai.top.$("#memberBar").find(".mobiWebItem").removeClass("mobiWebItem_hover")
}
},50)})};
	Site.refreshTopBarMallCart=function(a) {
	var b=$(a).position().top+$(a).height();
	var c=parseInt($(a).css("margin-left"));
	var d=$(a).position().left+c;
	var e=Fai.top.$("#memberBar").find(".mallCartPanel");
	$(e).css("top",b+"px").css("left",d+"px");
	$(e).show().children().before("<div class='mallCartLoad'></div>");
	if(Fai.isIE6()) {
	var f=$(e).height();
	$(e).find(".mallCartLoad").css("height",f+"px")
}
$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=getTopBarMallCartList",data:"",success:function(g) {
	var h=$.parseJSON(g);
	var j=h.topBarProductList;
	if(h.success&&j.length>0) {
	Site.refreshTopBarMallCartNum();
	Site.createTopBarMallCartList(j,h.orderId,h.choiceCurrencyVal)
}
else {
	var i=Fai.top.$("#memberBar").find(".mallCartPanel");
	Site.refreshTopBarMallCartNum();
	$(i).find(".mcProductList").html(LS.memberMallCartNoProduct);
	$(i).find(".checkMallCartBtn").removeClass("checkMallCartBtn_hasPro");
	$(i).find(".mall_cart_total").remove()
}
Fai.top.$("#memberBar").find(".mallCartPanel").find(".mallCartLoad").remove()}})};
	Site.createTopBarMallCartList=function(c,a,k) {
	Fai.top.$("#memberBar").find(".mcProductList").attr("data-orderId",a).html("");
	var i=[];
	var b=0,m=0;
	var g=0;
	for(var h in c) {
	b+=c[h].amount
}
for(h=0;
	h<c.length;
	h++) {
	var d=c[h],e=d.amount;
	if(d.isValid) {
	m+=d.price*e
}
}var j=[];
	j.push("<div class='mall_cart_total'>");
	j.push("<div>");
	j.push(Fai.format(LS.shoppingCartCalculatePro,b));
	j.push("</div>");
	j.push("<div>");
	j.push("<span class='sC-priceTotal'>"+LS.shoppingCartCountMoney+"<b>"+k.toString()+m.toFixed(2)+"</b></span>");
	j.push("</div>");
	j.push("</div>");
	i.push("<ul>");
	i.push("<div style='text-align:left;
	padding:0 15px;
	'>"+LS.memberMallCartJoin+"：</div>");
	for(var h in c) {
	var d=c[h];
	var e=d.amount;
	if(g==5) {
	break
}
b=b-e;
	f(d);
	g++}i.push("<li class='mcProductListTip'></li>");
	Fai.top.$("#memberBar").find(".checkMallCartBtn").css("margin-top","12px");
	i.push("</ul>");
	Fai.top.$("#memberBar").find(".mcProductList").append(i.join(""));
	Fai.top.$("#memberBar").find(".mall_cart_total").remove();
	Fai.top.$("#memberBar").find(".mcProductList").after(j.join(""));
	var l=[];
	Fai.top.$("#memberBar").find(".mcProductList .mcPdInvalid").each(function() {
	l.push($(this).prop("outerHTML"));
	$(this).remove()
}
);
	Fai.top.$("#memberBar").find(".mcProductListTip").before(l.join(""));
	Fai.top.$("#memberBar").find(".checkMallCartBtn").addClass("checkMallCartBtn_hasPro");
	function f(r) {
	var s=d.isValid?"":" mcPdInvalid ";
	var p=d.inValidType;
	var q=[];
	if(d.picId!="") {
	q.push("<div class='mcProductList_proPic'>");
	q.push("<img alt="+Fai.encodeHtml(d.name)+" src="+d.picPath+">");
	q.push("</div>")
}
else {
	q.push("<div class='mcProductList_proNoPic'></div>")
}
var o="";
	if(s!="") {
	if(p=="notAdded") {
	o="title='"+LS.notAdded+"'"
}
else {
	o=" title='"+LS.inventoryIsZero+"' "
}
}i.push("<li class='mcProductList_pro "+s+"' data-itemId='"+d.id+"'"+o+">");
	i.push(q.join(""));
	i.push("<div class='mcProductList_proName'>");
	i.push("<span "+o+" title='"+Fai.encodeHtml(d.name)+"'>"+Fai.encodeHtml(d.name)+"</span>");
	i.push("<span "+o+" title='"+Fai.encodeHtml(d.optionType)+"'>"+Fai.encodeHtml(d.optionType)+"</span>");
	i.push("</div>");
	i.push("<div class='mcProductList_proPrice'>");
	i.push("<span>"+k.toString()+"</span><span class='s_price'>"+d.price.toFixed(2)+"</span>");
	i.push("</div>");
	var n=r.amount;
	if(r.amount>9999) {
	n=(n+"").substring(0,3)+"..."
}
i.push("<div class='mcProductList_proDel'><a hidefocus='true' href='javascript:;
	' ");
	i.push("onclick='Site.delTopBarMallCartItem("+a+","+d.id+");
	return false;
	'>"+LS.memberMallCartDel+"</a>");
	i.push("<span>×"+n+"</span></div>");
	i.push("</li>")}};
	Site.delTopBarMallCartItem=function(a,b) {
	$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=delItem",data: {
	orderId:a,itemId:b,isTopBarMallCart:true
}
,error:function(c) {
	var d=$.parseJSON(c);
	if(!d.success) {
	Fai.ing("系统繁忙，请稍后重试。",true)
}
},success:function(c) {
	var e=$.parseJSON(c);
	if(e.success) {
	var d=Fai.top.$("#memberBar").find("#mallCart_js");
	$(d).find("[data-itemId="+b+"]").first().remove();
	Site.refreshTopBarMallCart(d)
}
else {
	if(e.rt==-2) {
	Fai.ing("参数错误，请稍后重试。",true)
}
}}})};
	Site.refreshTopBarMallCartNum=function() {
	$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=getMallCartProductNum",data:"",success:function(a) {
	var d=$.parseJSON(a);
	if(d.success) {
	if(d.rt==1) {
	var c=$.trim(d.productAmount);
	var b=Fai.top.$("#memberBar").find("#mallCart_js");
	if(b.length>0) {
	c=(c>99)?"99+":c;
	$(b).find(".mallCart_proNum").text("("+c+")")
}
var e=Fai.top.$(".shoppingAmount");
	if(c>0||c=="99+") {
	e.css("display","block").text(c)
}
else {
	e.css("display","none").text(c)
}
}}}})};
	Site.showContacterExtMsg=function(f) {
	var e=$("#module"+f),g=e.find(".J-head-more"),b=e.find(".J-cont-msg-ext"),a=e.find(".fk-order-dt").width(),c=b.width(),d=a-g.position().left;
	g.hover(function() {
	b.css( {
	top:g.position().top+g.height()+14
}
);
	if(d>=c) {
	b.css( {
	left:g.position().left-140
}
)}else {
	b.find(".cont-tri").css( {
	left:c-50
}
);
	b.css( {
	left:g.position().left-(c-d)-10
}
)}b.show()},function() {
	b.hide()
}
)};
	Site.initFlowMsg=function(c,a) {
	var b=$("#module"+c);
	$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=flowMsg",data:"id="+a,success:function(e) {
	var f=$.parseJSON(e);
	b.find(".J-ajaxLoad").hide();
	if(f.msgList==null||f.msgList.length===0||!f.success) {
	b.find(".J-no-msg").show()
}
else {
	var g="",d=[];
	if(f.msgList.indexOf("http")>=0) {
	b.find(".J-flow-msg").css("overflow-x","auto");
	d.push("<iframe name='kuaidi100' src='");
	d.push(f.msgList+"'  ");
	d.push("width='600' height='380' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no'></iframe>");
	b.find(".J-flow-msg").append(d.join(""))
}
else {
	d.push("<ul>");
	$.each(f.msgList,function(h,j) {
	if(h===f.msgList.length-1) {
	g=" class='g_stress'"
}
d.push("<li"+g+">");
	d.push("<span class='f-time'>"+j.time+"</span>");
	d.push("<span>"+j.context+"</span>");
	d.push("</li>")});
	d.push("</ul>");
	b.find(".J-flow-msg").append(d.join(""))}}if(f.success) {
	}else {
	Fai.ing(f.msg,true)
}
}})};
	Site.initmCenterFlowQuery=function(b) {
	var a=$("#module"+b),c=a.find(".J-mallOrder");
	c.find(".J-flow").hover(function() {
	var h=$(this),e=h.attr("_oi"),i=h.offset().top+h.outerHeight()+8,j=h.offset().left-100,k=$("#m"+b+"-f-"+e);
	if(k.length>0) {
	k.show();
	if(Fai.isIE6()||Fai.isIE7()) {
	i+=10
}
k.css( {
	top:i,left:j
}
);
	return true}var d=h.attr("_fn"),f=h.attr("_fnu");
	var g=["<div id='m",b,"-f-",e,"' class='fk-flow g_border J-f-block' style='top:",i,"px;
	left:",j,"px;
	'>","<div class='b-head-ico'></div>","<div class='b-head'>","<span>",d,"</span>","<span class='head-bill'>",LS.flowBill,f,"</span>","</div>","<div class='flow-ajaxLoading J-ajaxLoad'>&nbsp;
	</div>","<div class='no-msg J-no-msg'>",LS.flowNoMsg,"</div>","<div class='flow-msg J-flow-msg'></div>","</div>"];
	k=$(g.join(""));
	k.appendTo("body");
	$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=flowMsg",data:"id="+e,success:function(m) {
	var p=$.parseJSON(m);
	k.find(".J-ajaxLoad").hide();
	if(p.msgList==null||p.msgList.length===0||!p.success) {
	k.find(".J-no-msg").show()
}
else {
	var n=0,l=[];
	l.push("<ul>");
	if(p.msgList.indexOf("http")<0) {
	for(var o=p.msgList.length-1;
	o>=0;
	o--) {
	var q=p.msgList[o];
	firstCls="";
	if(n===0) {
	firstCls=" class='g_stress'"
}
l.push("<li"+firstCls+">");
	l.push("<div>"+q.context+"</div>");
	l.push("<div class='f-time'>"+q.time+"</div>");
	l.push("</li>");
	++n;
	if(n===3) {
	break
}
}l.push("</ul>");
	k.find(".J-flow-msg").append(l.join(""))}}if(p.success) {
	}else {
	Fai.ing(p.msg,true)
}
}})},function() {
	var e=$(this),d=e.attr("_oi");
	$("#m"+b+"-f-"+d).hide()
}
)};
	Site.initOrderSuc=function(c) {
	var b=$("#module"+c);
	var a=["<div class='fk-order-tip formBox' style='width:205px;
	height:78px;
	padding:0 0;
	'>","<div class='J-close formXSite' style='margin-top:3px;
	width:30px;
	'></div>","<div class='ico suc-ico' style='margin-top:27px;
	float:left;
	margin-left:30px;
	'>&nbsp;
	</div>","<div class='t-txt' style='margin-top:30px;
	'>"+LS.orderDetailSubmitSuc+"</div>","<div>"];
	tip=$(a.join(""));
	b.prepend(tip);
	tip.find(".J-close").click(function() {
	tip.remove()
}
);
	tip.css( {
	top:20,left:(b.width()-tip.width())/2
}
);
	tip.fadeOut(5000);
	Fai.top.window.setTimeout(function() {
	tip.remove()
}
,5000)};
	Site.initConfirmReceipt=function(b) {
	var a=$("#module"+b);
	a.find(".J-con-rpt").click(function() {
	var g=$(this),d=g.parent().parent();
	orderId=g.attr("_oid");
	var e=["<div class='fk-conRpt' style='margin-top:16px;
	'>","<div style='padding:10px;
	font-family:微软雅黑;
	font-size:12px;
	color:rgb(99,99,99);
	'>",LS.orderConfirmMsg,"</div>","<div style='padding:10px 0 18px 0;
	'>","<span class='J-rpt-cancel popupBClose' title='",LS.cancel,"' style='margin-right:20px;
	width:60px;
	height:26px;
	line-height:25px;
	'>",LS.cancel,"</span>","<span class='J-rpt-save con-hover' title='",LS.orderSure,"' style='width:77px;
	height:26px;
	background:#1779ff;
	line-height:25px;
	border:0;
	'>"+LS.orderSure+"</span>","</div>","</div>"];
	var i=parseInt(Math.random()*10000);
	var c= {
	boxId:i,title:"",htmlContent:e.join(""),width:372,height:150,boxName:"confirmReceipt"
}
;var f=Site.popupBox(c);
	var h="cmd=setStatus&id="+orderId+"&status=20";
	f.find(".J-rpt-save").on("click",function() {
	$.ajax( {
	type:"post",url:"ajax/order_h.jsp",data:h,error:function() {
	Fai.ing(LS.systemError,false)
}
,success:function(j) {
	var k=$.parseJSON(j);
	if(k.success) {
	document.location.reload()
}
else {
	Fai.ing(k.msg,true)
}
}})})})};
	Site.initConOrderCancel=function(b) {
	var a=$("#module"+b);
	a.find(".J-order-cancel").hover(function() {
	var c=$(this);
	c.attr("class","order-cancel-hover")
}
,function() {
	var c=$(this);
	c.attr("class","order-cancel")
}
);
	a.find(".J-order-cancel").click(function() {
	var g=$(this),d=g.parent().parent();
	orderId=g.attr("_oid");
	var e=["<div class='fk-cancelOrder'>","<div style='padding:10px;
	'>",LS.orderCancelMsg,"</div>","<div style='padding:10px 0 18px 0;
	'>","<span class='J-rpt-cancel popupBClose' style='margin-right:20px;
	'>",LS.cancel,"</span>","<span class='J-rpt-save con-hover'>"+LS.confirm+"</span>","</div>","</div>"];
	var i=parseInt(Math.random()*10000);
	var c= {
	boxId:i,title:"",htmlContent:e.join(""),width:360
}
;var f=Site.popupBox(c);
	var h="cmd=setStatus&id="+orderId+"&status=25";
	f.find(".J-rpt-save").on("click",function() {
	$.ajax( {
	type:"post",url:"ajax/order_h.jsp",data:h,error:function() {
	Fai.ing(LS.systemError,false)
}
,success:function(j) {
	var k=$.parseJSON(j);
	if(k.success) {
	Fai.ing(LS.orderCanceled,true);
	setTimeout(function() {
	document.location.reload()
}
,200)}else {
	Fai.ing(k.msg,true)
}
}})})})};
	Site.initPdComment=function(b) {
	var a=$("#module"+b);
	a.find(".J-pd-ct").click(function() {
	var e=$(this),c=e.attr("_oid"),d=a.find(".J-pd-panel"+c),f=d.find(".msgImgList");
	if(Fai.isIE6()) {
	f.css("display","none")
}
if(d.is(":visible")) {
	d.hide()
}
else {
	d.show();
	if(Fai.isIE6()) {
	setTimeout(function() {
	f.css( {
	display:"block"
}
);
	var g=f.find("td");
	if(typeof(g)!="undefined"&&g!=null) {
	f.find("td").eq(0).find("div").click()
}
},20)}}})};
	Site.commMenUpAllImgList=null;
	Site.setMenCommUpAllImgList=function(list) {
	Site.commMenUpAllImgList=eval("("+list+")");
	if(Fai.isIE6()||Fai.isIE7()) {
	$(".msgBoard_upImg_border").css( {
	width:"50px",height:"50px"
}
)}};
	Site.siteMenCommImgFileUpload=function(b,e,g,a,d) {
	var f=g.split(",");
	var c= {
	file_post_name:"Filedata",upload_url:"/static/web/ajax/commUpsiteimg_h.jsp",button_placeholder_id:e,file_size_limit:b+"MB",button_image_type:3,file_queue_limit:a,button_width:"50px",button_height:"50px",button_cursor:SWFUpload.CURSOR.HAND,button_image_url:_resRoot+"/image/site/msgUpImg/upload.png",requeue_on_error:false,post_params: {
	ctrl:"Filedata",app:21,type:0,fileUploadLimit:5,isSiteForm:true
}
,file_types:f.join(";
	"),file_dialog_complete_handler:function(h) {
	this._allSuccess=false;
	this.startUpload()
}
,file_queue_error_handler:function(i,h,j) {
	switch(h) {
	case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:Fai.ing(LS.siteFormSubmitCheckFileSizeErr,true);
	break;
	case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:Fai.ing(LS.siteFormSubmitFileUploadNotAllow,true);
	break;
	case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:Fai.ing(Fai.format(LS.siteFormSubmitFileUploadOneTimeNum,a),true);
	break;
	default:Fai.ing(LS.siteFormSubmitFileUploadReSelect,true);
	break
}
},upload_success_handler:function(i,h) {
	var j=jQuery.parseJSON(h);
	this._allSuccess=j.success;
	this._sysResult=j.msg;
	if(j.success) {
	Fai.ing(Fai.format(LS.siteFormSubmitFileUploadSucess,Fai.encodeHtml(i.name)),true);
	j.tbNum=d;
	onFileUploadEvent("upload",j)
}
else {
	Fai.ing(LS.siteFormSubmitFileUploadFile+i.name+"   "+j.msg)
}
},upload_error_handler:function(i,h,j) {
	if(h==-280) {
	Fai.ing(LS.siteFormSubmitFileUploadFileCancle,false)
}
else {
	if(h==-270) {
	Fai.ing(Fai.format(LS.siteFormSubmitFileUploadFileExist,Fai.encodeHtml(i.name)),true)
}
else {
	Fai.ing(Fai.format(LS.siteFormSubmitFileUploadSvrBusy,Fai.encodeHtml(i.name)))
}
}},upload_complete_handler:function(i) {
	if(i.filestatus==SWFUpload.FILE_STATUS.COMPLETE) {
	if(a==null||typeof(a)=="undefined") {
	a=5
}
var j=$("#msgBoardAddImgTb"+d).eq(0);
	var h=j.find("td").length;
	if(h>=(a+1)) {
	Fai.ing(LS.siteFormSubmitFileUploadOfMax,true);
	var k=j.find("td").eq(j.find("td").length-1);
	k.css("display","none");
	return
}
if(typeof(swfObjList)=="undefined") {
	swfObjList= {
	}
}
swfObj=swfObjList[d];
	setTimeout(function() {
	swfObj.startUpload()
}
,swfObj.upload_delay)}else {
	if(i.filestatus==SWFUpload.FILE_STATUS.ERROR) {
	Fai.ing(Fai.format(LS.siteFormSubmitFileUploadSvrBusy,Fai.encodeHtml(i.name)))
}
}},upload_start_handler:function(h) {
	Fai.enablePopupWindowBtn(0,"save",false);
	Fai.ing(LS.siteFormSubmitFileUploadPrepare,false)
}
,view_progress:function(h,k,j,i) {
	Fai.ing(LS.siteFormSubmitFileUploadIng+i+"%",false)
}
};
	if(typeof(swfObjList)=="undefined") {
	swfObjList= {
	}
}
swfObjList[d]=SWFUploadCreator.create(c);
	onFileUploadEvent=function(p,m) {
	if(p=="upload") {
	var j=m.id;
	var o=m.name;
	var l=m.size;
	var k=m.path;
	var q=m.pathSmall;
	var i=m.fileId;
	var h=m.width;
	var n=m.height;
	Site.productMenCommImgTableCtrl(k,o,j,l,a,i,m.tbNum,q)
}
}};
	Site.productMenCommImgTableCtrl=function(l,a,b,g,c,d,j,k) {
	var h=$("#msgBoardAddImgTb"+j).eq(0);
	var i=h.find("td").length;
	var e=h.find("td").eq(i-1);
	e.find(".msgBoard_showImgCount").html((i)+"/"+c);
	var f=[];
	if(Fai.isIE6()||Fai.isIE7()) {
	f.push("<td class='msgBoard_upImg_tb_td2' style='border:0px !important;
	padding-right:3px;
	'>");
	f.push("<div class='msgBoard_upImg_border' style='width:50px !important;
	height:50px !important;
	margin-left:3px;
	'>")
}
else {
	f.push("<td class='msgBoard_upImg_tb_td2' style='border:0px !important;
	'>");
	f.push("<div class='msgBoard_upImg_border'>")
}
f.push("<span onclick='Site.productMenCommImgDelete(this,"+j+")' class='msgBoard_upImgTop_set'/>");
	if(Fai.isIE6()||Fai.isIE7()) {
	f.push("<div><p><img alt='' class='msgBoard_upImg_set' src='"+k+"' _name='"+a+"'  _id='"+b+"' _file_size='"+g+"' _file_id='"+d+"' _path='"+l+"'  _smallPath='"+k+"'></p></div>")
}
else {
	f.push("<div><p><img alt='' class='msgBoard_upImg_set' src='"+k+"' _name='"+a+"'   _id='"+b+"' _file_size='"+g+"' _file_id='"+d+"'  _path='"+l+"' _smallPath='"+k+"' style='margin-left:-1px;
	'></p></div>")
}
f.push("</div>");
	f.push("</td>");
	e.before(f.join(""))};
	Site.productMenCommImgDelete=function(a,d) {
	var e=$("#msgBoardAddImgTb"+d).eq(0);
	var b=e.find("td").length;
	for(var c=0;
	c<b;
	c++) {
	if(e.find("td").eq(c).find(".msgBoard_upImgTop_set")[0]===a) {
	e.find("td").eq(c).remove();
	break
}
}b=e.find("td").length;
	var f=e.find("td").eq(b-1);
	f.find(".msgBoard_showImgCount").html((b-1)+"/"+f.attr("maxNum"));
	if(b<=f.attr("maxNum")) {
	if(Fai.isIE6()||Fai.isIE7()) {
	f.css( {
	display:"block","padding-top":"7px"
}
)}else {
	if(Fai.isIE()) {
	f.css( {
	display:"block","padding-top":"8px"
}
)}else {
	f.css( {
	display:"block","padding-top":"12px"
}
)}}}};
	Site.showMenCommImgList=function(h,k,c,g,b) {
	var e=$("#"+c);
	if(e!=null&&typeof(e)!="undefined") {
	e.remove()
}
var j=$("#"+h);
	var f=j.parent().parent().parent().parent().parent().parent().parent();
	f.attr("chooseTr",g);
	f.attr("chooseTd",b);
	var d=f.find("td");
	d.find(".show_msg_border_rect").remove();
	var i="<div class='show_msg_border_rect'><div class='show_msg_triangle_down'></div></div>";
	d.eq(b).prepend(i);
	var a=[];
	a.push("<div id='"+c+"' class='show_msg_outer_div'>");
	if(Fai.isIE6()||Fai.isIE7()) {
	a.push("<span onclick=Site.commShowPicClose('"+c+"','"+h+"') class='msg_close_show_img_icon' style='margin-top:-8px;
	'/>");
	a.push("<div class='show_msg_bordered_div' style='width:298px !important;
	margin-top:-8px;
	'></div>");
	a.push("<div class='show_msg_border_div' style='width:299px !important;
	margin-top:-8px;
	'>")
}
else {
	a.push("<span onclick=Site.commShowPicClose('"+c+"','"+h+"') class='msg_close_show_img_icon'/>");
	a.push("<div class='show_msg_bordered_div'  style='width:299px;
	'></div>");
	a.push("<div class='show_msg_border_div' style='margin-top:-8px;
	margin-left:1px;
	'>")
}
a.push("<div><p><img alt='' class='msg_up_show_img_set' src='"+k+"'></p></div>");
	a.push("</div>");
	a.push("</div>");
	f.after(a.join(""));
	setTimeout(function() {
	$("#"+c).hover(function() {
	var l=$("#"+c);
	if(l.find("#J_showCommPicMoveSign").attr("class")==null||typeof(l.find("#J_showCommPicMoveSign").attr("class"))=="undefined") {
	var m=[];
	m.push("<div id='J_showCommPicMoveSign'>");
	m.push("<img alt='' class='showCommPicMoveLeftClickArea' onclick=Site.showMenCommImgMove('"+h+"','"+c+"','left')>");
	m.push("<img alt='' src='"+_resRoot+"/image/site/msgUpImg/mLeft.png' onclick=Site.showMenCommImgMove('"+h+"','"+c+"','left') class='showCommPicMoveLeft'>");
	m.push("<img alt='' class='showCommPicMoveRightClickArea' onclick=Site.showMenCommImgMove('"+h+"','"+c+"','right')>");
	m.push("<img alt='' src='"+_resRoot+"/image/site/msgUpImg/mRight.png' onclick=Site.showMenCommImgMove('"+h+"','"+c+"','right') class='showCommPicMoveRight'>");
	m.push("</div>");
	l.prepend(m.join(""))
}
},function() {
	var l=$("#"+c);
	if(Fai.isIE7()) {
	setTimeout(function() {
	l.find("#J_showCommPicMoveSign").remove()
}
,500)}else {
	l.find("#J_showCommPicMoveSign").remove()
}
})},10)};
	Site.showMenCommImgMove=function(g,a,f) {
	if(g==null||f==null) {
	return
}
var i=$("#"+g);
	var c=i.parent().parent().parent().parent().parent().parent().parent();
	currentChooseTr=c.attr("chooseTr");
	currentChooseTd=c.attr("chooseTd");
	if(currentChooseTr==null||currentChooseTd==null) {
	return
}
if(Site.commMenUpAllImgList==null) {
	return
}
var j=0;
	var b=c.find("td");
	var e=parseInt(b.length);
	if(e<=1) {
	return
}
if(f=="left") {
	if(currentChooseTd=="0"||currentChooseTd==0) {
	j=e-1
}
else {
	j=parseInt(currentChooseTd)-1
}
}else {
	if(f=="right") {
	j=parseInt(currentChooseTd)+1;
	if(j>=Site.commMenUpAllImgList[currentChooseTr].data.length) {
	j=0
}
}}b.eq(currentChooseTd).find(".show_msg_border_rect").remove();
	var h="<div class='show_msg_border_rect'><div class='show_msg_triangle_down'></div></div>";
	b.eq(j).prepend(h);
	c.attr("chooseTd",j);
	var d=$("#"+a).find(".msg_up_show_img_set").parent();
	$("#"+a).find(".msg_up_show_img_set").remove();
	d.append("<img alt='' class='msg_up_show_img_set' src='"+Site.commMenUpAllImgList[currentChooseTr].data[j].data+"'>")};
	Site.orderPdCommentAddCom=function(n,p,j,l) {
	if(_siteDemo) {
	Fai.ing("当前为“样板网站”，请先“复制网站”再进行评论。");
	return
}
var s=$(".J-ct-panel-"+n+"-"+p),z=$("#pc_"+n+"_"+p),d=$.trim(z.val()),h=z.attr("minlength");
	if(typeof(d)!="string"||""==d) {
	z.focus();
	Fai.ing(LS.commentNotEmpty,true);
	return
}
if(d.length<h) {
	Fai.ing(Fai.format(LS.commentLenTips,Fai.encodeHtml(h)),true);
	return
}
var q=$("#msgBoardAddImgTb"+j);
	var g=[];
	var k=[];
	if(q!=null&&typeof(q)!="undefined") {
	var c=q.eq(0);
	var f=c.find("td").length;
	if(f>1) {
	for(var v=0;
	v<(f-1);
	v++) {
	var e=c.find("td").eq(v).find(".msgBoard_upImg_set");
	if(e!=null&&e!="undefined") {
	var w= {
	};
	var b= {
	};
	var u=e.attr("_id");
	var y=e.attr("_name");
	var t=e.attr("_path");
	var a=e.attr("_smallpath");
	var o=e.attr("_file_size");
	var r=e.attr("_file_id");
	w.imgId=u;
	w.imgName=y;
	w.imgSize=o;
	w.tempFileId=r;
	g.push(w);
	b.path=t;
	b.smallPath=a;
	k.push(b)
}
}}}var x=$(".submitStarList").attr("star");
	if(!x) {
	x=5
}
var m= {
	oid:n,iid:p,commImgList:$.toJSON(g),comment:d,star:x
}
;$.ajax( {
	type:"post",url:"ajax/order_h.jsp?cmd=addPC",data:m,error:function() {
	Fai.ing(LS.systemError)
}
,success:function(P) {
	var G=jQuery.parseJSON(P);
	if(G.success) {
	Fai.ing(LS.submitSuccess,true);
	var M=s.find(".g_textarea").parent();
	var L=s.find(".ct-area3");
	var K=s.find(".g_ibutton").parent();
	var C=s.find(".ct-comm-title"),i=s.find(".submitStarList");
	M.remove();
	L.css( {
	visibility:"hidden",position:"absolute","z-index":"-1"
}
);
	K.remove();
	C.remove();
	i.remove();
	var D=0;
	if(typeof(Site.commMenUpAllImgList)!="undefined"&&Site.commMenUpAllImgList!=null) {
	D=Site.commMenUpAllImgList.length
}
else {
	Site.commMenUpAllImgList=[]
}
var H=[];
	H.push("<div class='ct-area2'>"+d+"</div>");
	H.push("<div  class='msgImgList ct-area3' style='margin-top:-12px;
	'>");
	H.push("<table>");
	H.push("<tr style='border:0px !important;
	'>");
	var B=[];
	if(g!="[]"&&g.length>0&&G.imgsPathStr!="null"&&g.length==G.imgsPathStr.length) {
	for(var E=0;
	E<g.length;
	E++) {
	var A=g[E].imgId;
	var O=G.imgsPathStr[E].path;
	var N=k[E].smallPath;
	H.push("<td class='msgBoard_showImg_tb_td' style='border:0px !important;
	'>");
	H.push("<div onclick=Site.showMenCommImgList('"+A+"','"+O+"','picGroupId_"+D+"','"+D+"','"+E+"') class='msgBoard_upImg_border'>");
	H.push("<div><p><img alt='' class='msgBoard_upImg_set' id='"+A+"' src='"+N+"'></p></div>");
	H.push("</div>");
	H.push("</td>");
	var J=new Object();
	J.data=O;
	B.push(J)
}
}H.push("</tr>");
	H.push("</table>");
	H.push("</div>");
	H.push("<div class='ct-time'>");
	H.push("<span style='margin-right:10px;
	'>"+G.ctime+"</span>");
	H.push("<span class='g_stress'>"+LS.commentOK+"</span>");
	H.push("</div>");
	if(l) {
	H.push("<div class='commStarList comm-star-list'>");
	for(var E=1;
	E<=5;
	E++) {
	if(E<=x) {
	H.push("<li class='fk-icons-star lt_select_more'></li>")
}
else {
	H.push("<li class='fk-icons-star lt_no_select'></li>")
}
}H.push("</div>")}var F=new Object();
	F.data=B;
	Site.commMenUpAllImgList.push(F);
	s.append(H.join(""));
	if(Fai.isIE6()||Fai.isIE7()) {
	setTimeout(function() {
	$(".msgBoard_upImg_border").css( {
	width:"50px",height:"50px"
}
)},50)}}else {
	var I="";
	switch(G.rt) {
	case 1:I=LS.commentError;
	break;
	case 2:I=LS.mallStlSubmitNotFound;
	break;
	case 3:I=LS.commentError;
	break;
	case 5:I=LS.paramError;
	break;
	case 6:Fai.top.location.href="login.jsp?url="+Fai.encodeUrl(Fai.getUrlRoot(top.location.href))+"&errno=11";
	return false;
	break;
	case 7:I=LS.commentClosed;
	break;
	case 8:I=LS.commentExist;
	break;
	case 9:I=LS.commentCountLimit;
	break;
	default:I=LS.systemError;
	break
}
Fai.ing(I)}}})};
	Site.changeIEMsgInputWidth=function() {
	if(isIE=navigator.userAgent.indexOf("MSIE")!=-1) {
	$("#orderLeveaMsgIn").css( {
	height:"17px","line-height":"17px",width:"98%"
}
)}};
	Site.orderLeveaMsgTip="";
	Site.orderMessageOpen=false;
	Site.orderMessageMaxNum=0;
	Site.setLisMsgInput=function(c,a,b) {
	Site.orderMessageOpen=a;
	Site.orderLeveaMsgTip=c;
	Site.orderMessageMaxNum=b;
	$(function() {
	$("#orderLeveaMsgIn").focusin(function() {
	if($(this).val()===Site.orderLeveaMsgTip) {
	$(this).val("")
}
$(this).css("color","#333")});
	$("#orderLeveaMsgIn").focusout(function() {
	$(this).css("color","black");
	if($(this).val()=="") {
	$(this).val(Site.orderLeveaMsgTip);
	$(this).css("color","#b8b8b8")
}
})})};
	Site.setLisMsgInputInit=function(a) {
	$(function() {
	$("#orderLeveaMsgIn").val(a);
	$("#orderLeveaMsgIn").css("color","#b8b8b8")
}
)};
	Site.showTopBar=function() {
	if(Fai.top.$("#arrow").hasClass("g_arrow_up")) {
	Fai.top.$("#arrow").removeClass("g_arrow_up");
	Fai.top.$("#topBar").hide()
}
else {
	Fai.top.$("#arrow").addClass("g_arrow_up");
	Fai.top.$("#topBar").show()
}
Site.resetGmainPos()};
	Site.copyWebSite=function(b) {
	var a=$.browser.msie;
	if(a) {
	clipboardData.setData("Text",b)
}
else {
	prompt(LS.shareTips,b)
}
};
	Site.initModuleFileList=function(a) {
	$("#module"+a+" .line table").mouseover(function() {
	$(this).addClass("g_hover")
}
).mouseleave(function() {
	$(this).removeClass("g_hover")
}
)};
	Site.richMarquee=function(c) {
	var r= {
	direction:"up",speed:"normal",loop:"infinite",moveout:false,isScrolling:false
}
;$.extend(r,c);
	if(r.speed=="normal") {
	$.extend(r {
	speed:28
}
)}else {
	if(r.speed=="slow") {
	$.extend(r {
	speed:60
}
)}else {
	$.extend(r {
	speed:13
}
)}}if($("#module"+r.id).data("restart")) {
	var h=r.id;
	Fai.top.$("#richmarqueeNewParent"+h).after($("#module"+r.id).data("content"));
	Fai.top.$("#richmarqueeNewParent"+h).remove()
}
if(!$("#module"+r.id).data("content")) {
	var l=Fai.top.$(".formMiddleContent"+r.id).html();
	$("#module"+r.id).data("content",l)
}
var h=r.id,p=$("#richMarquee"+h),e=p.outerHeight(true),d=p.outerWidth(true),g=(d>a())?d:a(),v=r.direction,s=0,f="top",n=r.speed,t=(r.loop!="infinite"||r.loop<=0)?1:r.loop,j=r.moveout,w=r.isScrolling,u=20,q=$("<div id='richMarqueeCopy"+h+"' class='richMarquee' style='position:absolute;
	overflow:hidden;
	width:"+g+"px;
	height:"+p.height()+"px ' ></div>"),k=$("<div id='richmarqueeNewParent"+h+"' style='overflow:hidden;
	width:"+g*2+"'></div>");
	function m() {
	Fai.stopInterval("rm"+h);
	k.appendTo(p.parent());
	p.appendTo(k);
	q.appendTo(k);
	if(!w&&!j) {
	}else {
	$(p.html()).appendTo(q)
}
if(v=="up") {
	s=e;
	f="top"
}
else {
	if(v=="down") {
	s=0-e;
	if(w&&!j) {
	s=0
}
f="top"}else {
	if(v=="left") {
	s=e;
	f="left"
}
else {
	s=0-g;
	if(w&&!j) {
	s=0
}
if(w&&j) {
	s=-g
}
f="left"}}}if(j) {
	p.css(f,0)
}
else {
	p.css(f,s)
}
if(v=="up"||v=="down") {
	p.css("left",0)
}
if(v=="left"||v=="right") {
	p.css("top",0)
}
$("#richmarqueeNewParent"+h).mouseover(function() {
	Fai.stopInterval("rm"+h)
}
).mouseout(function() {
	if(t=="infinite"||t>0) {
	Fai.startInterval("rm"+h)
}
});
	b();
	i(v)}function a() {
	var x=p.find("img");
	if(x.length>0) {
	var z=x[0].width;
	for(var y=0;
	y<x.length;
	y++) {
	if(z<x[y].width) {
	z=x[y].width
}
}return z}return 0}function b() {
	var x=p.find("img");
	$(x).load(function() {
	var y=p.height();
	if(e!=y) {
	e=y;
	i(v)
}
})}function i(x) {
	if(x=="left"||x=="right") {
	k.css("position","relative");
	k.css("width",g);
	q.css("top",0);
	k.css("height",e);
	if(x=="left") {
	q.css("margin-left",u);
	if(w&&!j) {
	p.css("left",g);
	q.css("left",g*2)
}
if(w&&j) {
	q.css("left",g)
}
if(!w&&!j) {
	p.css("left",d);
	q.css("left",g+d)
}
if(!w&&j) {
	q.css("left",g+d)
}
}else {
	q.css("left",0);
	p.css("margin-left",u);
	p.css("width",(g)+"px");
	if(w&&!j) {
	p.css("padding-left",g);
	p.css("padding-right",g);
	k.scrollLeft(g*2+u)
}
if(w&&j) {
	p.css("padding-left",g);
	k.scrollLeft(g*2)
}
if(!w&&!j) {
	p.css("padding-right",g+d);
	p.css("padding-left",g+d);
	k.scrollLeft(g+d+u)
}
if(!w&&j) {
	p.css("padding-right",g+d);
	p.css("padding-left",g+d);
	k.scrollLeft(g+d+u)
}
}}if(x=="up"||x=="down") {
	k.css("position","relative");
	k.css("height",e);
	k.css("width",g);
	q.css("left",0);
	q.css("height",e);
	p.css("width",g);
	if(x=="up") {
	q.css("top",e*2);
	q.css("margin-top",u);
	if(w&&!j) {
	k.scrollTop(0)
}
if(w&&j) {
	q.css("top",e);
	k.scrollTop(0)
}
if(!w&&!j) {
	k.scrollTop(0)
}
if(!w&&j) {
	k.scrollTop(0)
}
}else {
	p.css("height",e);
	q.css("top",0);
	p.css("margin-top",u);
	if(w&&!j) {
	p.css("padding-top",e);
	p.css("padding-bottom",e);
	k.scrollTop(e*2+u)
}
if(w&&j) {
	p.css("padding-top",e);
	k.scrollTop(e*2)
}
if(!w&&!j) {
	p.css("padding-top",e*2);
	p.css("padding-bottom",e*2);
	k.scrollTop(e*2+u)
}
if(!w&&j) {
	p.css("padding-top",e*2);
	p.css("padding-bottom",e*2);
	k.scrollTop(e*2+u)
}
}}}function o() {
	if(v=="left") {
	var x=k.scrollLeft();
	x++;
	if(w&&!j) {
	if(x==g*2+u) {
	k.scrollLeft(g)
}
else {
	k.scrollLeft(x)
}
}if(w&&j) {
	if(x==g+u) {
	k.scrollLeft(0)
}
else {
	k.scrollLeft(x)
}
}if(!w&&!j) {
	if(x==(g+d)+u) {
	k.scrollLeft(0)
}
else {
	k.scrollLeft(x)
}
}if(!w&&j) {
	if(x==g+d+u) {
	k.scrollLeft(0)
}
else {
	k.scrollLeft(x)
}
}}else {
	if(v=="right") {
	var x=k.scrollLeft();
	x--;
	if(w&&!j) {
	if(x==0) {
	k.scrollLeft(g+u)
}
else {
	k.scrollLeft(x)
}
}if(w&&j) {
	if(x==0) {
	k.scrollLeft(g+u)
}
else {
	k.scrollLeft(x)
}
}if(!w&&!j) {
	if(x==0) {
	k.scrollLeft(g+d+u)
}
else {
	k.scrollLeft(x)
}
}if(!w&&j) {
	if(x==0) {
	k.scrollLeft(g+d+u)
}
else {
	k.scrollLeft(x)
}
}}else {
	if(v=="up") {
	var x=k.scrollTop();
	x++;
	if(w&&!j) {
	if(x==k.height()*2+u) {
	k.scrollTop(e)
}
else {
	k.scrollTop(x)
}
}if(w&&j) {
	if(x==k.height()+u) {
	k.scrollTop(0)
}
else {
	k.scrollTop(x)
}
}if(!w&&!j) {
	if(x==k.height()*2) {
	k.scrollTop(0)
}
else {
	k.scrollTop(x)
}
}if(!w&&j) {
	if(x==k.height()*2+u) {
	k.scrollTop(0)
}
else {
	k.scrollTop(x)
}
}}else {
	var x=k.scrollTop();
	x--;
	if(w&&!j) {
	if(x==0) {
	k.scrollTop(e+u)
}
else {
	k.scrollTop(x)
}
}if(w&&j) {
	if(x==0) {
	k.scrollTop(e+u)
}
else {
	k.scrollTop(x)
}
}if(!w&&!j) {
	if(x==0) {
	k.scrollTop(e*2+u)
}
else {
	k.scrollTop(x)
}
}if(!w&&j) {
	if(x==0) {
	k.scrollTop(e*2+u)
}
else {
	k.scrollTop(x)
}
}}}}}m();
	Fai.stopInterval("rm"+h);
	Fai.addInterval("rm"+h,o,n);
	Fai.startInterval("rm"+h);
	if(!$("#module"+r.id).data("first1")) {
	$("#module"+r.id).data("first1",true);
	$("#module"+r.id).data("options",r)
}
Site.restartRichMarquee(r)};
	Site.restartRichMarquee=function(a) {
	var b=$("#module"+a.id);
	if(!b.data("first2")) {
	b.data("first2",true);
	if(a.speed==28) {
	a.speed="normal"
}
else {
	if(a.speed==60) {
	a.speed="slow"
}
else {
	a.speed="fast"
}
}b.on("Fai_onModuleSizeChange",function() {
	Fai.stopInterval("rm"+a.id);
	b.data("restart",true);
	Site.richMarquee(a)
}
);
	b.on("Fai_onModuleLayoutChange",function() {
	Fai.stopInterval("rm"+a.id);
	b.data("restart",true);
	Site.richMarquee(a)
}
)}};
	Site.productScroll=function(k) {
	var f= {
	pauseDuration:3000,showDuration:600,scrollMode:"up"
}
;var c=$.extend( {
	},f,k);
	var d=$("#module"+c.moduleId),b=d.find(".J_productTextList"),g=b.parent(),j=b.find(".productTextListTable"),h=j.outerHeight(),a="proScroll"+c.moduleId;
	if(j.length<2) {
	return
}
b.css( {
	position:"relative",height:b.height()+"px"
}
);
	g.css( {
	overflow:"hidden"
}
);
	b.mouseover(function() {
	Fai.stopInterval(a)
}
).mouseout(function() {
	Fai.startInterval(a)
}
);
	function i() {
	function l() {
	if(c.scrollMode=="up") {
	b.animate( {
	top:"-="+h
}
,c.showDuration,function() {
	var m=b.find(".productTextListTable:first");
	m.appendTo(b).end().hide().fadeIn(400);
	b.css( {
	top:0
}
);
	e()})}else {
	b.animate( {
	top:"+="+h
}
,c.showDuration,function() {
	var m=b.find(".productTextListTable:last");
	m.insertBefore(b.find(".productTextListTable:first")).end().hide().fadeIn(400);
	b.css( {
	top:0
}
);
	e()})}}Fai.addTimeout(a,l,c.pauseDuration);
	Fai.startInterval(a)}function e() {
	i()
}
i()};
	Site.loadProductMarquee=function(v,H,C,t) {
	var f=Fai.top["Product"+v].ieOpt,h=Fai.top["Product"+v].tgOpt,o=Fai.top["Product"+v].callbackArgs;
	var c=Fai.top.$("#module"+v);
	if(Fai.isNull(c)) {
	return
}
c.find(".demo0>div").each(function() {
	if($(this).attr("cloneDiv")) {
	$(this).remove()
}
});
	var s=c.find(".productMarqueeForm");
	var w=0;
	if(!C) {
	if(s.length>=1) {
	var i=s.first().find(".imgDiv");
	var E=i.width();
	var x=i.height();
	s.each(function() {
	var J=$(this).attr("faiWidth");
	var I=$(this).attr("faiHeight");
	if(Fai.isNull(I)) {
	return
}
var K=Fai.Img.calcSize(J,I,E,x,Fai.Img.MODE_SCALE_FILL);
	if(K.height>w) {
	w=K.height
}
})}}if(f.effType>=4&&f.effType<6) {
	Site.clearImageEffectContent_product(v,"propDiv")
}
var e=0;
	var g=0;
	var B=0;
	var D=0;
	var n=0;
	var G=Site.getFormMiddleContentHeight(c,v);
	s.each(function() {
	var J=$(this);
	var P=J.attr("faiHeight");
	if(Fai.isNull(P)) {
	return
}
var O=J.attr("faiWidth");
	var T=J.find(".imgDiv");
	var Q=T.width();
	if(C) {
	w=T.height()
}
var N= {
	width:Q,height:w
}
;if(H) {
	if(C) {
	N=Fai.Img.calcSize(O,P,Q,w,Fai.Img.MODE_SCALE_FILL)
}
else {
	N=Fai.Img.calcSize(O,P,Q,w,Fai.Img.MODE_SCALE_DEFLATE_HEIGHT)
}
}var K=T.width();
	if(K<N.width) {
	K=N.width
}
var L=T.find("img");
	L.css("width",N.width+"px");
	L.css("height",N.height+"px");
	if(J.find(".propWordWrapDiv").length>0) {
	J.find(".propWordWrapDiv").width(K);
	J.find(".propWordWrapDiv").height("auto")
}
else {
	var M=0;
	J.find(".productName > a").each(function() {
	if($(this).width()>M) {
	M=$(this).width()
}
});
	if(M>K) {
	K=M
}
}var S=J.find(".propDiv");
	S.css("width",K+"px");
	if(T.width()!=K) {
	T.css("width",K+"px")
}
if(T.height()!=w) {
	T.css("height",w+"px");
	if($.browser.msie&&$.browser.version==6) {
	T.addClass("wocaie6").removeClass("wocaie6")
}
}if($(".propWordWrapDiv").length>0) {
	Site.unifiedAttrVal(c,".propWordWrapDiv","height")
}
if(J.height()>g&&(t==0||t==1)) {
	g=J.height()
}
if(G>g&&(t==2||t==3)) {
	g=G
}
var I=J.outerWidth(true);
	var R=J.outerHeight(true);
	if(I>B) {
	B=I
}
e+=I});
	var m=c.find(".demo");
	var A=c.find(".demo0");
	D=A.height();
	if(g>0) {
	m.css("height",g+"px")
}
if(t==0||t==1) {
	A.css("width",e+"px");
	if(s.length==0) {
	return
}
var a=m.width(),z=A.width();
	if(z<=a) {
	Site.functionInterface( {
	name:"ImageEffect.FUNC.BASIC.Init",callMethod:true
}
 {
	moduleId:v,imgEffOption:f,tagetOption:h,callback:Site.createImageEffectContent_product,callbackArgs:o
}
);
	return}}if(t==2||t==3) {
	var g=m.height(),j=A.height();
	if(j<=g) {
	Site.functionInterface( {
	name:"ImageEffect.FUNC.BASIC.Init",callMethod:true
}
 {
	moduleId:v,imgEffOption:f,tagetOption:h,callback:Site.createImageEffectContent_product,callbackArgs:o
}
);
	return}}var l=s.first().outerWidth(true);
	if(l==0) {
	return
}
var F=Fai.top.productMarqueelist;
	var r=0,d=s.length-1;
	s.each(function(J,L) {
	if(r>a) {
	return false
}
var I=$(L).clone().attr("cloneDiv","true"),M=I.children("div.imgDiv").attr("id");
	I.children("div.imgDiv").attr("id",M+"_clone");
	A.append(I);
	r+=I.outerWidth(true);
	if(0===J&&(t==2||t==3)) {
	$(L).css("clear","both");
	I.css("clear","both")
}
if(Fai.isIE6()||Fai.isIE7()) {
	if(J===d) {
	$(s[J]).after('<div style="clear:both;
	"></div>');
	I.after('<div style="clear:both;
	"></div>')
}
}if(typeof F!="undefined") {
	for(var J=0;
	J<F.length;
	J++) {
	var K=F[J];
	if(K.cloneflag&&K.cloneflag==M) {
	$("#"+K.cloneflag+"_clone").mouseover(function() {
	var N=Site.addEditLayer(this,K,6);
	if(!N) {
	return
}
N.mouseover(function() {
	Fai.stopInterval("marquee"+v)
}
).mouseout(function() {
	Fai.startInterval("marquee"+v)
}
)}).mouseleave(function() {
	Site.removeEditLayer(this)
}
);
	break}}}});
	var q=e+r;
	if(t==0||t==1) {
	A.css("width",q+"px")
}
function p() {
	var I=m.scrollLeft();
	I++;
	m.scrollLeft(I);
	if(I==e) {
	m.scrollLeft(0)
}
}function b() {
	var I=m.scrollLeft();
	I--;
	m.scrollLeft(I);
	if(I==0) {
	m.scrollLeft(e)
}
}function y() {
	var I=m.scrollTop();
	I--;
	m.scrollTop(I);
	if(I==0) {
	m.scrollTop(D)
}
}function u() {
	var I=m.scrollTop();
	I++;
	m.scrollTop(I);
	if(I==D) {
	m.scrollTop(0)
}
}if(t==0) {
	m.scrollLeft(2*e);
	Fai.addInterval("marquee"+v,b,35)
}
else {
	if(t==1) {
	Fai.addInterval("marquee"+v,p,35)
}
else {
	if(t==2) {
	m.scrollTop(2*D);
	Fai.addInterval("marquee"+v,y,35)
}
else {
	if(t==3) {
	Fai.addInterval("marquee"+v,u,35)
}
}}}m.mouseover(function() {
	Fai.stopInterval("marquee"+v)
}
).mouseleave(function() {
	Fai.startInterval("marquee"+v)
}
);
	Fai.startInterval("marquee"+v);
	if(!c.data("first1")) {
	c.data("first1",true);
	c.data("options" {
	id:v,scale:H,fixHeight:C,proMarqueeDirection:t,ieOpt:f,tgOpt:h,callback:Site.createImageEffectContent_product,callbackArgs:o
}
)}if(c.data("first2")&&Fai.top._manageMode) {
	var k=c.data("productOptions");
	Site.initModuleProductListItemManage(k)
}
Site.functionInterface( {
	name:"ImageEffect.FUNC.BASIC.Init",callMethod:true
}
 {
	moduleId:v,imgEffOption:f,tagetOption:h,callback:Site.createImageEffectContent_product,callbackArgs:o
}
);
	Site.restartProductMarquee(c)};
	Site.restartProductMarquee=function(a) {
	if(!a.data("first2")) {
	a.data("first2",true);
	a.on("Fai_onModuleSizeChange",function() {
	var b=a.data("options");
	Fai.stopInterval("marquee"+b.id);
	Site.loadProductMarquee(b.id,b.scale,b.fixHeight,b.proMarqueeDirection,b.ieOpt,b.tgOpt,b.callback,b.callbackArgs)
}
);
	a.on("Fai_onModuleLayoutChange",function() {
	var b=a.data("options");
	Fai.stopInterval("marquee"+b.id);
	Site.loadProductMarquee(b.id,b.scale,b.fixHeight,b.proMarqueeDirection,b.ieOpt,b.tgOpt,b.callback,b.callbackArgs)
}
)}};
	Site.initModuleProductFilter=function(c,b) {
	$("#module"+c+" .productFilterValue").mouseover(function() {
	$(this).addClass("g_hover")
}
).mouseleave(function() {
	$(this).removeClass("g_hover")
}
);
	if(b) {
	var a=$("#module"+c).find(".formMiddle"+c).find("table.productFilterContent").find(".productFilterContentCenter");
	var d=a.find(".productFilterName");
	$.each(d,function(e,g) {
	var f=$(g);
	f.css("cursor","pointer");
	f.click(function() {
	var h=$(this).next();
	if(h.is(":visible")) {
	f.removeClass("productFilterUnfold").addClass("productFilterFold");
	h.hide()
}
else {
	f.removeClass("productFilterFold").addClass("productFilterUnfold");
	h.show()
}
})})}};
	Site.initModuleProductCatalog=function(c,a) {
	$("#module"+c+" .productFilterValue").mouseover(function() {
	$(this).addClass("g_tableHover");
	$(this).find(".productFilterValueCenter").addClass("g_hover")
}
).mouseleave(function() {
	$(this).removeClass("g_tableHover");
	$(this).find(".productFilterValueCenter").removeClass("g_hover")
}
);
	if(a) {
	var d=$("#module"+c).find(".formMiddle"+c).find("table .parentClickedTd");
	var b=$("#module"+c).find(".formMiddle"+c).find("table .parentCatalog a");
	$.each(d,function(e,g) {
	var f=$(g);
	f.css("cursor","pointer");
	f.click(function() {
	var i=parseInt($(this).attr("prodId"));
	var h=$("#prodDiv"+i);
	if(h.is(":visible")) {
	$(this).removeClass("productFilterUnfold").addClass("productFilterFold");
	h.hide()
}
else {
	$(this).removeClass("productFilterFold").addClass("productFilterUnfold");
	h.show()
}
})});
	$.each(b,function(e,g) {
	var f=$(g);
	f.click(function(l) {
	l.preventDefault();
	var i=parseInt($(this).attr("prodId"));
	var h=$("#prodDiv"+i);
	var k=$("#provId"+i);
	var j=$(this).parent().find(".parentClickedTd");
	if(h.is(":visible")) {
	h.hide();
	k.removeClass("productFilterUnfold").addClass("productFilterFold")
}
else {
	k.removeClass("productFilterFold").addClass("productFilterUnfold");
	h.show()
}
})})}};
	Site.loadProductTextList=function(b) {
	var a=$("#module"+b);
	if(Fai.isNull(a)) {
	return
}
if(!_manageMode) {
	a.find(".productTextListTable").on("mouseenter.manage",function() {
	$(this).addClass("g_hover")
}
).on("mouseleave.manage",function() {
	$(this).removeClass("g_hover")
}
)}};
	Site.loadProductTile=function(g,f,d,c,e) {
	var a=$("#module"+g);
	if(Fai.isNull(a)) {
	return
}
var b=0;
	if(!d) {
	a.find(".productTileForm").each(function() {
	var i=$(this).attr("faiWidth");
	var h=$(this).attr("faiHeight");
	if(Fai.isNull(h)) {
	return
}
var m=$(this).find(".imgDiv");
	var l=m.width();
	var j=m.height();
	var k=Fai.Img.calcSize(i,h,l,j,Fai.Img.MODE_SCALE_FILL);
	if(k.height>b) {
	b=k.height
}
})}a.find(".productTileForm").each(function() {
	var h=$(this).attr("faiHeight");
	if(Fai.isNull(h)) {
	return
}
var j=$(this).attr("faiWidth");
	var m=$(this).find(".imgDiv");
	var l=m.width();
	if(d) {
	b=m.height()
}
var k= {
	width:l,height:b
}
;if(f) {
	k=Fai.Img.calcSize(j,h,l,b,Fai.Img.MODE_SCALE_FILL)
}
var i=m.find("img");
	i.css("width",k.width+"px");
	i.css("height",k.height+"px");
	m.css("height",b+"px")});
	if(e>=4&&e<6) {
	Site.clearImageEffectContent_product(g,"propList");
	return
}
if(c==-1&&a.find(".productNameWordWrap").length==0) {
	Site.unifiedAttrVal(a,".productTileForm","height")
}
if(a.find(".productNameWordWrap").length>0) {
	Site.unifiedAttrVal(a,".productNameWordWrap","height");
	Site.unifiedAttrVal(a,".productTileForm","height")
}
};
	Site.initProductRestrict=function(id,limitAmount_mall,onlineMallMinAmount,onlineMallMaxAmount,productRestrictInfo) {
	if(limitAmount_mall) {
	var buyedCount=0;
	if(productRestrictInfo.count!=null) {
	buyedCount=productRestrictInfo.count
}
var allowAmount=0;
	allowAmount=onlineMallMaxAmount-buyedCount;
	if(eval(allowAmount)<0) {
	allowAmount=-1
}
var min=1,max=-1;
	if(onlineMallMinAmount>1&&onlineMallMaxAmount!=0) {
	$("#limitAmountDiv").text("( "+LS.minAmount+":"+onlineMallMinAmount+";
	"+LS.maxAmount+":"+allowAmount+" )");
	min=onlineMallMinAmount;
	max=allowAmount
}
else {
	if(onlineMallMinAmount==1&&onlineMallMaxAmount!=0) {
	$("#limitAmountDiv").text("( "+LS.maxAmount+":"+allowAmount+" )");
	max=allowAmount
}
else {
	if(onlineMallMinAmount>1&&onlineMallMaxAmount==0) {
	$("#limitAmountDiv").text("( "+LS.minAmount+":"+onlineMallMinAmount+" )");
	min=onlineMallMinAmount
}
}}$("#cartbuyCount"+id).unbind("change");
	$("#cartbuyCount"+id).val(min);
	$("#cartbuyCount"+id).change(function() {
	var countStr=$("#cartbuyCount"+id).val();
	var count=1;
	if(Fai.isInteger(countStr)) {
	count=parseInt(countStr)
}
if(count<min||count==min) {
	count=min;
	$("#buyCountDes"+id).addClass("disableMallJian");
	$("#buyCountInc"+id).removeClass("disableMallJia");
	if((min>max||min==max)&&max!=-1) {
	$("#buyCountInc"+id).addClass("disableMallJia")
}
}else {
	if(max!=-1&&(count>max||count==max)) {
	count=max;
	$("#buyCountInc"+id).addClass("disableMallJia");
	$("#buyCountDes"+id).removeClass("disableMallJian")
}
else {
	if(count>9999998) {
	count=9999999;
	$("#buyCountDes"+id).removeClass("disableMallJian");
	$("#buyCountInc"+id).addClass("disableMallJia")
}
else {
	$("#buyCountDes"+id).removeClass("disableMallJian");
	$("#buyCountInc"+id).removeClass("disableMallJia")
}
}}$("#cartbuyCount"+id).val(count)});
	$("#cartbuyCount"+id).change();
	$("#buyCountDes"+id).click(function() {
	var countStr=$("#cartbuyCount"+id).val();
	var count=1;
	if(Fai.isInteger(countStr)) {
	count=parseInt(countStr)
}
if(count<min+1) {
	$("#cartbuyCount"+id).val(min);
	$("#buyCountDes"+id).addClass("disableMallJian")
}
else {
	$("#buyCountInc"+id).removeClass("disableMallJia")
}
});
	$("#buyCountInc"+id).click(function() {
	var countStr=$("#cartbuyCount"+id).val();
	var count=1;
	if(Fai.isInteger(countStr)) {
	count=parseInt(countStr)
}
if(count>max-1&&max!=-1) {
	if(max>min) {
	$("#cartbuyCount"+id).val(max);
	$("#buyCountInc"+id).addClass("disableMallJia")
}
else {
	$("#cartbuyCount"+id).val(min);
	$("#buyCountInc"+id).addClass("disableMallJia")
}
}else {
	$("#buyCountDes"+id).removeClass("disableMallJian")
}
})}};
	Site.wipeOffRunOne=true;
	Site.initProductOptions=function(id,optionsAmountList,isRelateAmount,realMallPrice,limitAmount_options,productRestrictInfo,oldOptionsStr,newOptionsStr) {
	var module=$("#module"+id);
	if(Fai.isNull(module)) {
	return
}
var optionItemWrap=module.find(".optionItemWrap");
	optionItemWrap.find(".J-item").hover(function() {
	$(this).addClass("g_borderSelected")
}
,function() {
	if(!$(this).hasClass("optionItemHover")) {
	$(this).removeClass("g_borderSelected")
}
});
	optionItemWrap.find(".optionItem img").hover(function() {
	var that=$(this).parent();
	if(that.find("img").length===0) {
	return false
}
var imgTip=that.find(".J-img-tip");
	if(imgTip.length>0) {
	imgTip.stop(true,true).fadeIn();
	return false
}
var itemN=that.find("span").text();
	imgTip=["<div class='img-tip J-img-tip'>","<div>",itemN,"</div>","<div class='tip-ico J-ico'></div>","</div>"];
	imgTip=$(imgTip.join(""));
	that.append(imgTip);
	imgTip.find(".J-ico").css("left",(imgTip.outerWidth()-11)/2);
	imgTip.css("left",-((imgTip.outerWidth()-38)/2));
	imgTip.fadeIn()},function() {
	$(this).parent().find(".J-img-tip").fadeOut()
}
);
	var countStr=$("#cartbuyCount"+id).val();
	var imgDiv=$("#imgDiv"+id);
	var imgTriHtml="<div class='J-img-tri img-selected g_borderSelected'></div><div class='J-img-tri op-selected-ico'></div>";
	var newOptionsArr=[],oldOptionsArr=[],delOptionsArr=[],delFlag=true,order=[];
	if(oldOptionsStr!="null") {
	newOptionsArr=newOptionsStr.split("_");
	oldOptionsArr=oldOptionsStr.split("_");
	for(var i=0;
	i<oldOptionsArr.length;
	i++) {
	for(var j=0;
	j<newOptionsArr.length;
	j++) {
	if(oldOptionsArr[i]==newOptionsArr[j]) {
	order.push(j);
	delFlag=false
}
}if(delFlag) {
	delOptionsArr.push(i)
}
}}optionItemWrap.find(".optionItem").bind("click",function() {
	var opItem=$(this),otherItem=opItem.siblings(),thisItem=opItem.find(".J-item");
	thisItem.addClass("optionItemHover g_borderSelected");
	otherItem.find(".J-item").removeClass("optionItemHover g_borderSelected");
	otherItem.find(".J-img-tri").remove();
	if(thisItem.hasClass("J-item-img")) {
	opItem.append(imgTriHtml)
}
var originalPic=thisItem.attr("_fk-org");
	if(imgDiv.length>0&&originalPic) {
	imgDiv.find("img").attr("src",originalPic);
	var cloudZoom=imgDiv.find(".cloud-zoom");
	if(cloudZoom.length>0) {
	imgDiv.attr("faihref",originalPic);
	cloudZoom.attr("href",originalPic).data("zoom").destroy();
	cloudZoom.CloudZoom( {
	imageWidth:parseInt(thisItem.attr("faiwidth")),imageHeight:parseInt(thisItem.attr("faiheight"))
}
)}}var optionsSize=optionItemWrap.length;
	var optionsSelect=optionItemWrap.find(".J-item.g_borderSelected");
	if(optionsSize==optionsSelect.length) {
	var type="",price,amount,minAmount,maxAmount,weight;
	$.each(optionsSelect,function(i,n) {
	type+=$(n).attr("data")+"_"
}
);
	$.each(optionsAmountList,function(i,n) {
	var t2=n.t2;
	if(oldOptionsStr!="null") {
	var type2Arr=n.t2.split("_"),newType2Arr=[],newType2="";
	for(var j=0;
	j<order.length;
	j++) {
	for(var k=0;
	k<newOptionsArr.length;
	k++) {
	if(k==order[j]) {
	newType2Arr[k]=type2Arr[j]
}
}}for(var j=0;
	j<newType2Arr.length;
	j++) {
	if(newType2Arr[j]!=null) {
	newType2+=newType2Arr[j]+"_"
}
}t2=newType2.substring(0,newType2.length-1)}if((t2+"_")==type) {
	price=n.oPrice;
	amount=n.oAmount;
	minAmount=n.minAmount;
	maxAmount=n.maxAmount;
	weight=n.w
}
if(oldOptionsStr!="null"&&order.length!=oldOptionsArr.length) {
	amount=0
}
});
	if(limitAmount_options) {
	$("#limitAmountDiv").text("");
	var buyedCount=0;
	var optionsCount=productRestrictInfo.optionsCount;
	if(optionsCount!=null&&optionsCount.d!=null) {
	for(var i=0;
	i<optionsCount.d.length;
	i++) {
	if((optionsCount.d[i].t+"_")==type) {
	buyedCount=optionsCount.d[i].c
}
}}var allowAmount=0;
	allowAmount=maxAmount-buyedCount;
	if(eval(allowAmount)<0) {
	allowAmount=-1
}
var min=1;
	var max=-1;
	if(minAmount>1&&maxAmount!=0) {
	$("#limitAmountDiv").text("( "+LS.minAmount+":"+minAmount+";
	"+LS.maxAmount+":"+allowAmount+" )");
	min=minAmount;
	max=allowAmount
}
else {
	if(minAmount==1&&maxAmount!=0) {
	$("#limitAmountDiv").text("( "+LS.maxAmount+":"+allowAmount+" )");
	max=allowAmount
}
else {
	if(minAmount>1&&maxAmount==0) {
	$("#limitAmountDiv").text("( "+LS.minAmount+":"+minAmount+" )");
	min=minAmount
}
}}$("#cartbuyCount"+id).val(min);
	$("#cartbuyCount"+id).unbind("change");
	$("#cartbuyCount"+id).bind("change");
	$("#cartbuyCount"+id).change(function() {
	var countStr=$("#cartbuyCount"+id).val();
	var count=1;
	if(Fai.isInteger(countStr)) {
	count=parseInt(countStr)
}
if(count<min||count==min) {
	count=min;
	$("#buyCountDes"+id).addClass("disableMallJian");
	$("#buyCountInc"+id).removeClass("disableMallJia");
	if((min>max||min==max)&&max!=-1) {
	$("#buyCountInc"+id).addClass("disableMallJia")
}
}else {
	if(max!=-1&&(count>max||count==max)) {
	count=max;
	$("#buyCountInc"+id).addClass("disableMallJia");
	$("#buyCountDes"+id).removeClass("disableMallJian")
}
else {
	if(count>9999998) {
	count=9999999;
	$("#buyCountDes"+id).removeClass("disableMallJian");
	$("#buyCountInc"+id).addClass("disableMallJia")
}
else {
	$("#buyCountDes"+id).removeClass("disableMallJian");
	$("#buyCountInc"+id).removeClass("disableMallJia")
}
}}$("#cartbuyCount"+id).val(count)});
	$("#cartbuyCount"+id).change();
	$("#buyCountDes"+id).unbind("click");
	$("#buyCountInc"+id).unbind("click");
	$("#buyCountDes"+id).click(function() {
	var countStr=$("#cartbuyCount"+id).val();
	var count=1;
	if(Fai.isInteger(countStr)) {
	count=parseInt(countStr)
}
if(count<min+1) {
	$("#cartbuyCount"+id).val(min);
	$("#buyCountDes"+id).addClass("disableMallJian")
}
else {
	$("#buyCountInc"+id).removeClass("disableMallJia")
}
});
	$("#buyCountInc"+id).click(function() {
	var countStr=$("#cartbuyCount"+id).val();
	var count=1;
	if(Fai.isInteger(countStr)) {
	count=parseInt(countStr)
}
if(count>max-1&&max!=-1) {
	if(max>min) {
	$("#cartbuyCount"+id).val(max);
	$("#buyCountInc"+id).addClass("disableMallJia")
}
else {
	$("#cartbuyCount"+id).val(min);
	$("#buyCountInc"+id).addClass("disableMallJia")
}
}else {
	$("#buyCountDes"+id).removeClass("disableMallJian")
}
})}if(isRelateAmount) {
	$("#mallAmount").text(amount)
}
if(price==null) {
	$("#realMallAmount").text(realMallPrice);
	Site.onlyChangeSalePrice(realMallPrice)
}
else {
	$("#realMallAmount").text(price);
	Site.onlyChangeSalePrice(price);
	if(Fai.isIE10()) {
	if(Site.wipeOffRunOne) {
	$(".pd_J .pd_propTable .propName").each(function(index,element) {
	$(element).removeClass("propName");
	setTimeout(function() {
	$(element).addClass("propName")
}
,0)})}Site.wipeOffRunOne=false}}if(weight!=null) {
	$("#mallWeight").text(weight)
}
}var selectArr=[],flag=false;
	for(var i=0;
	i<optionItemWrap.length;
	i++) {
	var optionItem=optionItemWrap.eq(""+i+"");
	if(optionItem.find(".J-item").hasClass("g_borderSelected")) {
	selectArr.push(optionItem.find(".J-item.g_borderSelected").attr("data"))
}
else {
	break
}
}if(selectArr.length<=optionItemWrap.length&&selectArr.length>1) {
	var selectArrLen=selectArr.length;
	for(var i=0;
	i<selectArrLen;
	i++) {
	$.each(optionsAmountList,function(j,n) {
	var t2=n.t2;
	if(oldOptionsStr!="null") {
	var type2Arr=n.t2.split("_"),newType2Arr=[],newType2="";
	for(var k=0;
	k<delOptionsArr.length;
	k++) {
	type2Arr.splice(delOptionsArr[k],1)
}
for(var k=0;
	k<order.length;
	k++) {
	for(var j=0;
	j<newOptionsArr.length;
	j++) {
	if(j==order[k]) {
	newType2Arr[j]=type2Arr[k]
}
}}for(var k=0;
	k<newType2Arr.length;
	k++) {
	if(newType2Arr[k]!=null) {
	newType2+=newType2Arr[k]+"_"
}
}t2=newType2.substring(0,newType2.length-1)}var t2Arr=t2.split("_");
	if(n.flag==undefined) {
	n.flag=1
}
if(n.flag==1&&arrHasSameBegin(t2Arr,selectArr)) {
	flag=true;
	return false
}
});
	if(!flag) {
	var items=optionItemWrap.eq(selectArr.length-1).find(".J-item");
	var lastData=selectArr.pop();
	items.each(function() {
	if($(this).attr("data")==lastData) {
	var parent=$(this).parent();
	parent.hide()
}
});
	items.parent().find(".J-img-tri").remove();
	items.removeClass("g_borderSelected").removeClass("optionItemHover")}else {
	break
}
}}var opIndx=optionItemWrap.index(opItem.parent());
	for(var j=opIndx;
	j<selectArr.length;
	j++) {
	var subSelectArr=selectArr.slice(0,j+1);
	flag=false;
	for(var i=subSelectArr.length;
	i<optionItemWrap.length;
	i++) {
	var optionItemUl=optionItemWrap.eq(""+i+"");
	optionItemUl.find(".optionItem").each(function() {
	var data=$(this).find(".J-item").attr("data");
	flag=false;
	$.each(optionsAmountList,function(j,n) {
	var t2=n.t2;
	if(oldOptionsStr!="null") {
	var type2Arr=n.t2.split("_"),newType2Arr=[],t2="",newType2="";
	for(var k=0;
	k<delOptionsArr.length;
	k++) {
	type2Arr.splice(delOptionsArr[k],1)
}
for(var k=0;
	k<order.length;
	k++) {
	for(var h=0;
	h<newOptionsArr.length;
	h++) {
	if(h==order[k]) {
	newType2Arr[h]=type2Arr[k]
}
}}for(var k=0;
	k<newType2Arr.length;
	k++) {
	if(newType2Arr[k]!=null) {
	newType2+=newType2Arr[k]+"_"
}
}t2=newType2.substring(0,newType2.length-1)}var t2Arr=t2.split("_");
	if(n.flag==undefined) {
	n.flag=1
}
if(data==t2Arr[i]&&n.flag==1&&arrHasSameBegin(t2Arr,subSelectArr)) {
	flag=true;
	return false
}
});
	if(!flag) {
	$(this).hide()
}
else {
	$(this).show()
}
})}}})};
	function arrHasSameBegin(b,d) {
	var a=true;
	for(var c=0;
	c<d.length;
	c++) {
	if(d[c]!=b[c]) {
	a=false
}
}return a}Site.initMbPdCollection= {
	};
	(function(e,g,f) {
	g.init=function(k,j,h,i) {
	g.sessionMid=k;
	g.collectionList=j==null?[]:j;
	g.pid=h;
	g._manageMode=i;
	a();
	c();
	if(e("#_TOKEN").length!=0&&!i&&Fai.Cookie.get("collectId")==h&&!e("#pdCollection .collectionIcon").hasClass("collectionIconSelect")) {
	e("#pdCollection").click()
}
Fai.Cookie.clear("collectId")};
	function b(h) {
	var i= {
	};
	i.productCollections=g.collectionList+"";
	e.post("ajax/member_h.jsp" {
	cmd:"set",id:g.sessionMid,info:e.toJSON(i)
}
,function(j) {
	if(j.success) {
	d(h)
}
},"json")}function d(i) {
	var j= {
	height:72
}
;if(i=="suc") {
	j.width=183;
	j.htmlContent='<div class="suc-ico addItemTextTips" style="font-size:14px;
	color:#636363;
	margin-left:29px;
	padding-left:39px;
	">'+LS.sucCollection+"</div>"
}
else {
	if(i=="warn") {
	j.width=210;
	j.htmlContent='<div class="warn-ico addItemTextTips" style="font-size:14px;
	color:#636363;
	margin-left:29px;
	padding-left:39px;
	">'+LS.cancelCollection+"</div>"
}
else {
	if(i=="err") {
	j.height=90;
	j.width=280;
	j.htmlContent='<div class="resultFailIcon addItemTextTips" style="font-size:14px;
	color:#636363;
	margin-left:39px;
	padding-left:35px;
	margin-top:7px;
	">';
	j.htmlContent+=LS.isManagefailCollection+"</div>"
}
}}var h=Site.popupBox(j);
	h.find(".popupBClose").css( {
	"margin-top":"9px",right:"9px",width:"12px",height:"12px","background-position":"-1665px -110px"
}
);
	if(i!="err") {
	setTimeout(function() {
	h.find(".popupBClose").click()
}
,3000)}}function c() {
	e("#pdCollection").on("click",function() {
	if(g.sessionMid==0) {
	if(g._manageMode) {
	d("err")
}
else {
	window.location.href="login.jsp?url="+Fai.encodeUrl(window.location.href);
	Fai.Cookie.set("collectId",g.pid)
}
}else {
	if(e.inArray(g.pid,g.collectionList)==-1) {
	g.collectionList.push(g.pid);
	e("#pdCollection .collectionIcon").addClass("collectionIconSelect");
	b("suc")
}
else {
	if(e.inArray(g.pid,g.collectionList)!=-1) {
	g.collectionList.splice(e.inArray(g.pid,g.collectionList),1);
	e("#pdCollection .collectionIcon").removeClass("collectionIconSelect");
	b("warn")
}
}}})}function a() {
	if(g.sessionMid!=0&&e.inArray(g.pid,g.collectionList)!=-1) {
	e("#pdCollection .collectionIcon").addClass("collectionIconSelect")
}
if(e(".shareInfo_J").length>0) {
	e(".shareInfo_J").css( {
	left:e("#pdShare").offset().left-e("#pdShare").parent().offset().left+"px"
}
)}}})(jQuery,Site.initMbPdCollection);
	Site.getQueryString=function(a) {
	var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)");
	var c=window.location.search.substr(1).match(b);
	if(c!=null) {
	return unescape(c[2])
}
return null};
	Site.loadProductDetail=function(l,o,i,g) {
	var c=$("#module"+l);
	if(Fai.isNull(c)) {
	return
}
var h=c.find(".imgDiv");
	var j=h.attr("faiWidth");
	var q=h.attr("faiHeight");
	if(Fai.isNull(q)) {
	return
}
if(o==null&&i==null) {
	var s=h.width();
	var n=h.height()
}
else {
	var s=o;
	var n=i
}
var b=Fai.Img.calcSize(j,q,s,n,Fai.Img.MODE_SCALE_DEFLATE_FILL);
	var m=b.height;
	var p=b.width;
	var t=c.find(".imgGroupDiv");
	t.each(function() {
	var y=$(this).attr("faiWidth");
	var A=$(this).attr("faiHeight");
	if(Fai.isNull(A)) {
	return
}
var x=Fai.Img.calcSize(y,A,s,n,Fai.Img.MODE_SCALE_DEFLATE_FILL);
	if(x.height>m) {
	m=x.height
}
if(x.width>p) {
	p=x.width
}
var w=$(this).find("img");
	var z=w.width();
	var B=w.height();
	y=w.attr("faiWidth");
	A=w.attr("faiHeight");
	x=Fai.Img.calcSize(z,B,y,A,Fai.Img.MODE_SCALE_FILL);
	w.css("width",x.width+"px");
	w.css("height",x.height+"px");
	w.css("display","block")});
	var v=h.find("img");
	v.css("width",b.width+"px");
	v.css("height",b.height+"px");
	v.css("display","block");
	h.data("divWidth",s);
	h.data("divHeight",n);
	if(o!=null&&i!=null) {
	h.css("height",i+"px");
	h.css("width",o+"px")
}
if(g==2) {
	$(".pd_J .imgContainer_J").css("margin","0px auto");
	$(".pd_J .imgContainer_J").css("float","none");
	$(".pd_J .imgContainer_J").parent().css("width","100%")
}
var a=h.find(".cloud-zoom");
	if(a.length==1) {
	a.attr("rel","adjustX:-4,adjustY:-4,maxWidth:"+s+",maxHeight:"+m+',position:"inside"');
	a.CloudZoom( {
	imageHeight:q,imageWidth:j
}
)}if(t.length>1) {
	var f=$("#imgGroup"+l).width()-$("#leftIcon"+l).outerWidth(true)-$("#rightIcon"+l).outerWidth(true);
	$("#imgDivs"+l).width(f);
	var u=(a.length==1)?"true":"false";
	Site.multiPhoto($("#imgDivs"+l),$("#imgDiv"+l) {
	leftIconID:"leftIcon"+l,rightIconID:"rightIcon"+l,zoom:u
}
)}var d=c.find(".pd_J").width(),e=c.find(".imgContainer_J").width(),r=c.find(".pdLayoutR_J"),k=c.find(".pdAppendLayout_J");
	if((d-e)<200) {
	r.appendTo(k)
}
};
	Site.initPdCommentSwitch=function() {
	var a=0;
	if(document.cookie.length>0) {
	cStart=document.cookie.indexOf("tabSwitch=");
	if(-1!=cStart) {
	cStart=cStart+10;
	cEnd=document.cookie.indexOf(";
	",cStart);
	if(-1==cEnd) {
	cEnd=document.cookie.length
}
a=unescape(document.cookie.substring(cStart,cEnd))}}$(".tabSwitch").eq(a).click()};
	Site.pdSaleRecordPagenation=function(b,a) {
	$("#saleRecordSwitch").on("click",function() {
	if($("#saleRecordPanel .tableBody").children().length==0) {
	Site.loadSaleRecord(b,a,1)
}
});
	$("body").on( {
	hover:function() {
	$(this).addClass("g_hover")
}
,mouseleave:function() {
	$(this).removeClass("g_hover")
}
,click:function() {
	var d=$("#saleRecordPanel .pagenation .pageNo").not(":has('.g_border')").text();
	var c=1;
	if($(this).parent().hasClass("pagePrev")) {
	c=Number(d)-1
}
else {
	if($(this).parent().hasClass("pageNext")) {
	c=Number(d)+1
}
else {
	c=Number($(this).text())
}
}Site.loadSaleRecord(b,a,c)}},"#saleRecordPanel .pagenation .g_border")};
	Site.loadSaleRecord=function(c,a,b) {
	$.ajax( {
	url:"ajax/product_h.jsp?cmd=getSaleRecordList",data:"pid="+c+"&pno="+b,type:"post",dataType:"json",success:function(e) {
	if(e.success) {
	$(".saleRecordBody tr").remove();
	var g=[];
	$.each(e.list,function(i,h) {
	g.push("<tr class='b_li'>");
	g.push("<td class='b_creator'><span class='msgBoard_msgUser_level' style='margin-right:12px;
	'></span>"+h.createName+"</td>");
	if(a) {
	g.push("<td class='b_optionType'>"+h.optionType+"</td>")
}
g.push("<td class='b_amount'>"+h.amount+"</td>");
	var j=new Date(h.paidTime);
	g.push("<td class='b_paidTime'><span>"+$.format.date(j,"yyyy-MM-dd")+"</span><br><span>"+$.format.date(j,"HH:mm:ss")+"</span></td>");
	g.push("</tr>")});
	$(".saleRecordBody .tableBody").html(g.join(""));
	if($(".saleRecordFooter .pagenation").length!=0) {
	var d=[];
	d.push("<div class='pagePrev'>");
	if(b==1) {
	d.push("<span>"+LS.prevPager+"</span>")
}
else {
	d.push("<a hidefocus='true' class='g_border' href='javascript:;
	'><span>"+LS.prevPager+"</span></a>")
}
d.push("</div>");
	if(b==1) {
	d.push("<div class='pageNo'><span>1</span></div>")
}
else {
	d.push("<div class='pageNo'><a hidefocus='true' class='g_border' href='javascript:;
	'><span>1</span></a></div>")
}
if(b-2>2) {
	d.push("<div class='pageEllipsis'><span>...</span></div>");
	for(var f=b-2;
	f<b;
	f++) {
	d.push("<div class='pageNo'><a hidefocus='true' class='g_border' href='javascript:;
	'><span>"+f+"</span></a></div>")
}
}else {
	for(var f=2;
	f<b;
	f++) {
	d.push("<div class='pageNo'><a hidefocus='true' class='g_border' href='javascript:;
	'><span>"+f+"</span></a></div>")
}
}if(b!=1&&b!=e.totalPage) {
	d.push("<div class='pageNo'><span>"+b+"</span></div>")
}
if(b+2<e.totalPage-1) {
	for(var f=b+1;
	f<=b+2;
	f++) {
	d.push("<div class='pageNo'><a hidefocus='true' class='g_border' href='javascript:;
	'><span>"+f+"</span></a></div>")
}
d.push("<div class='pageEllipsis'><span>...</span></div>")}else {
	for(var f=b+1;
	f<=e.totalPage-1;
	f++) {
	d.push("<div class='pageNo'><a hidefocus='true' class='g_border' href='javascript:;
	'><span>"+f+"</span></a></div>")
}
}if(b==e.totalPage) {
	d.push("<div class='pageNo'><span>"+e.totalPage+"</span></div>")
}
else {
	d.push("<div class='pageNo'><a hidefocus='true' class='g_border' href='javascript:;
	'><span>"+e.totalPage+"</span></a></div>")
}
d.push("<div class='pageNext'>");
	if(b==e.totalPage) {
	d.push("<span>"+LS.nextPager+"</span>")
}
else {
	d.push("<a hidefocus='true' class='g_border' href='javascript:;
	'><span>"+LS.nextPager+"</span></a>")
}
d.push("</div>");
	$(".saleRecordFooter .pagenation").children().remove();
	$(".saleRecordFooter .pagenation").html(d.join(""))}}},error:function() {
	Fai.ing(LS.systemError)
}
})};
	Site.loadPdShareMore=function() {
	$("body").on( {
	hover:function() {
	$("#pdShare").addClass("pdShareHover");
	$("#pdShare").css( {
	"z-index":"999"
}
);
	$(".shareInfo_J").css( {
	"z-index":"998"
}
);
	$(".productOpera .shareInfo").show();
	$(".shareDown").addClass("shareUp");
	$(".share").addClass("operaTextHover")},mouseleave:function() {
	$("#pdShare").removeClass("pdShareHover");
	$("#pdShare").css( {
	"z-index":""
}
);
	$(".shareInfo_J").css( {
	"z-index":""
}
);
	$(".productOpera .shareInfo").hide();
	$(".shareDown").removeClass("shareUp");
	$(".share").removeClass("operaTextHover")}},".productOpera .pdShare,.productOpera .shareInfo");
	var c=$(".pd_J .pd_t_l_left_J"),b=c.find(".imgContainer_J"),a=c.find(".shareContainer_J"),d=a.find(".shareInfo_J");
	if(Fai.isIE6()||Fai.isIE7()) {
	c.width(b.width())
}
setTimeout(function() {
	var f=a.height(),g=d.height(),e=d.find(".shareMore_J");
	if(g>f+5) {
	$(e).click(function() {
	if(a.hasClass("s_expand")) {
	a.removeClass("s_expand");
	e.find("div").removeClass("s_more_up")
}
else {
	a.addClass("s_expand");
	e.find("div").addClass("s_more_up")
}
})}else {
	e.remove()
}
},0)};
	Site.loadProductSlide=function(a) {
	var b=$(".slide");
	if(Fai.isNull(b)) {
	return
}
var l=b.find(".imgDiv");
	var i=l.attr("faiWidth");
	var j=l.attr("faiHeight");
	var g=l.width();
	var d=l.height();
	var c=b.find(".imgGroupDiv");
	c.each(function() {
	var p=$(this).width();
	var r=$(this).height();
	var m=$(this).find("img");
	var o=m.attr("faiWidth");
	var q=m.attr("faiHeight");
	var n=Fai.Img.calcSize(o,q,p,r,Fai.Img.MODE_SCALE_FILL);
	m.css("width",n.width+"px");
	m.css("height",n.height+"px");
	m.css("display","block")
}
);
	var h=Fai.Img.calcSize(i,j,g,d,Fai.Img.MODE_SCALE_DEFLATE_FILL);
	var e=l.find("img");
	e.css("width",h.width+"px");
	e.css("height",h.height+"px");
	e.css("display","block");
	var k=l.find(".cloud-zoom");
	if(k.length==1) {
	k.attr("rel","adjustX:-4,adjustY:-4,maxWidth:"+g+",maxHeight:"+d+',position:"inside"');
	k.CloudZoom( {
	imageHeight:j,imageWidth:i
}
)}if(c.length>1) {
	var f=(k.length==1)?"true":"false";
	Site.multiPhoto($("#imgDivs"+a),$("#imgDiv"+a) {
	leftIconID:"leftIcon"+a,rightIconID:"rightIcon"+a,zoom:f
}
)}};
	Site.loadProductPicList=function(d,c,b) {
	var a=$("#module"+d);
	if(Fai.isNull(a)) {
	return
}
a.find(".productPicListForm").each(function() {
	var e=$(this).attr("faiHeight");
	if(Fai.isNull(e)) {
	return
}
var g=$(this).attr("faiWidth");
	var k=$(this).find(".imgDiv");
	var j=k.width();
	var i=k.height();
	if(b) {
	j=g;
	i=e
}
var h= {
	width:j,height:i
}
;if(c) {
	h=Fai.Img.calcSize(g,e,j,i,Fai.Img.MODE_SCALE_FILL)
}
var f=k.find("img");
	f.css("width",h.width+"px");
	f.css("height",h.height+"px");
	k.css("height",h.height+"px")})};
	Site.loadProductDoublePicList=function(f,e,c) {
	var b=$("#module"+f);
	if(Fai.isNull(b)) {
	return
}
var d=0;
	var a=0;
	b.find(".doubleProduct").each(function() {
	$(this).find(".productDoublePicListForm").each(function() {
	var h=$(this).attr("faiHeight");
	if(Fai.isNull(h)) {
	return
}
var j=$(this).attr("faiWidth");
	var n=$(this).find(".imgDiv");
	var g=$(this).find(".propList");
	var m=n.width();
	var l=n.height();
	if(c) {
	m=j;
	l=h
}
var k= {
	width:m,height:l
}
;if(e) {
	k=Fai.Img.calcSize(j,h,m,l,Fai.Img.MODE_SCALE_FILL)
}
var i=n.find("img");
	i.css("width",k.width+"px");
	i.css("height",k.height+"px");
	n.css("height",l+"px");
	if(Number(l)>Number(a)) {
	if(Number(l)>Number(g.height())) {
	a=l
}
else {
	a=g.height()
}
d=Number(a)+20+Number($(this).css("margin-top").replace("px",""))+Number($(this).css("margin-bottom").replace("px",""));
	$(this).parent().css("height",(d)+"px")}});
	d=0;
	a=0})};
	Site.loadProductHotTextList=function(d,c,b) {
	var a=$("#module"+d);
	if(Fai.isNull(a)) {
	return
}
a.find(".productHotTextListHot").each(function() {
	var e=$(this).attr("faiHeight");
	if(Fai.isNull(e)) {
	return
}
var g=$(this).attr("faiWidth");
	var k=$(this).find(".imgDiv");
	var j=k.width();
	var i=k.height();
	if(b) {
	j=g;
	i=e
}
var h= {
	width:j,height:i
}
;if(c) {
	h=Fai.Img.calcSize(g,e,j,i,Fai.Img.MODE_SCALE_FILL)
}
var f=k.find("img");
	f.css("width",h.width+"px");
	f.css("height",h.height+"px");
	k.css("height",h.height+"px")});
	a.find(".productHotTextListTable").each(function() {
	var j=$(this).find("tr");
	for(var h=0;
	h<j.length;
	++h) {
	var m=j[h];
	var g=$(m).find("td");
	$(g[1]).css("width","30%");
	var f=g.length;
	var o=100;
	o-=30;
	for(var e=2;
	e<f;
	++e) {
	if(e==g.length-1) {
	var l=$(g[e]).attr("buybtn");
	if(l) {
	$(g[e]).css("width","15%");
	o-=15;
	break
}
}var k=parseInt(o/f);
	$(g[e]).css("width",k+"%")}}$(this).mouseover(function() {
	$(this).addClass("g_hover")
}
).mouseleave(function() {
	$(this).removeClass("g_hover")
}
)});
	a.find(".productHotTextListProp").each(function() {
	var j=$(this).find("tr");
	for(var h=0;
	h<j.length;
	++h) {
	var m=j[h];
	var g=$(m).find("td");
	$(g[1]).css( {
	width:"30%","margin-left":"5px"
}
);
	var f=g.length;
	var f=g.length;
	var o=100;
	o-=30;
	for(var e=2;
	e<f;
	++e) {
	if(e==g.length-1) {
	var l=$(g[e]).attr("buybtn");
	if(l) {
	$(g[e]).css( {
	width:"15%","margin-right":"5px"
}
);
	o-=15;
	break}}var k=parseInt(o/f);
	$(g[e]).css("width",k+"%")}}})};
	Site.unifiedAttrVal=function(b,d,a) {
	var c=b.find(d);
	var e=0;
	c.each(function() {
	var f=$(this).css(a);
	f=parseInt(f);
	if(f>e) {
	e=f
}
});
	c.each(function() {
	$(this).css(a,e+"px")
}
)};
	Site.loadProductGallery=function(w) {
	var K=w.id,H=w.scale,d=w.cus;
	var b=$("#module"+K),v=b.find("div.product-container");
	if(w.effType>=4&&w.effType<6) {
	Site.clearImageEffectContent_product(w.id,"prop-container")
}
if(v.length!=0) {
	for(var V=0;
	V<v.length;
	V++) {
	var T=$(v[V]).children("div.img-container"),l=T.width(),G=T.height();
	var k=T.find("img"),E=k.attr("fHeight"),B=k.attr("fWidth");
	if(H) {
	var h=Fai.Img.calcSize(B,E,l,G,Fai.Img.MODE_SCALE_FILL);
	k.width(h.width);
	k.height(h.height)
}
else {
	k.width(l);
	k.height(G)
}
}var L=b.find("a.gallery-control"),o=b.find("a.gallery-control-prev"),Q=b.find("a.gallery-control-next"),J=o.height(),c=o.width();
	var g=v.first(),R=g.children("div.img-container"),C=R.outerWidth(true),s=R.outerHeight(true),A=g.find("div.prop-container"),f=0;
	if(A.length>0) {
	f=A.first().outerHeight(true)*A.length
}
var r=s+f;
	v.height(r);
	v.width(C);
	v.find("div.prop-container").width(C);
	var z=b.find("div.product-gallery-preview");
	z.height(r);
	var y=b.find("div.product-gallery-inner"),n=y.outerHeight();
	if(n<J) {
	var M=y.height(),P=n-M;
	var O=Math.ceil((J-n)/2);
	var p=Math.ceil(P/2)+O;
	y.css("padding-top",p+"px").css("padding-bottom",p+"px")
}
var I=(y.outerHeight()/2)-(J/2);
	L.css("top",I+"px");
	var a=1,W=o.innerWidth()-c,D=b.find("div.formMiddleContent").width(),q=D-W-(c*2),Y=g.outerWidth(true),S=g.outerWidth(),e=Y-S;
	if(q>Y) {
	a=parseInt(q/Y)
}
var F=(a*Y)-e;
	z.width(F);
	var X=v.length;
	var t=X%a==0?X/a:Math.floor(X/a)+1;
	b.find("div.product-gallery-container").width(X*Y);
	var m=v.length<a?v.length:a;
	for(var U=0;
	U<m;
	U++) {
	var k=$(v[U]).find("img");
	if(!k.attr("src")) {
	k.attr("src",k.attr("lzurl"))
}
k.show()}o.addClass("gallery-control-prev-disabled");
	if(t==1) {
	Q.addClass("gallery-control-next-disabled")
}
o.click(function() {
	var x=$(this);
	if(x.hasClass("gallery-control-prev-disabled")) {
	return false
}
var Z=x.parent(),j=Z.find("div.product-gallery-container"),aa=Z.find("a.gallery-control-next");
	if(aa.hasClass("gallery-control-next-disabled")) {
	aa.removeClass("gallery-control-next-disabled")
}
if(j.position().left==0||j.is(":animated")) {
	return false
}
var i=F+e;
	j.animate( {
	left:"+="+i+"px"
}
,function() {
	if(j.position().left==0) {
	x.addClass("gallery-control-prev-disabled")
}
})});
	Q.click(function() {
	var ae=$(this);
	if(ae.hasClass("gallery-control-next-disabled")) {
	return false
}
var Z=ae.parent(),i=Z.find("div.product-gallery-container"),x=Z.find("a.gallery-control-prev");
	if(x.hasClass("gallery-control-prev-disabled")) {
	x.removeClass("gallery-control-prev-disabled")
}
var af=F+e,ag=-(t-1)*(af);
	left_position=parseInt(i.css("left").replace("px"));
	if(left_position==ag||i.is(":animated")) {
	return false
}
if(!ae.data("loading_finish")) {
	var ad=(Math.abs(left_position)/(Y*a))+1;
	var j=ad<=1?1*a:ad*a,ab=j+a>v.length?v.length:j+a;
	for(var aa=j;
	aa<ab;
	aa++) {
	var ac=$(v[aa]).find("img");
	if(!ac.attr("src")) {
	ac.attr("src",ac.attr("lzurl"))
}
ac.show()}}i.animate( {
	left:"-="+af+"px"
}
,function() {
	var ah=parseInt(i.css("left").replace("px",""));
	if(ah==ag) {
	ae.data("loading_finish",true);
	ae.addClass("gallery-control-next-disabled")
}
})})}else {
	var N=b.find("div.addNoProTips");
	b.find("div.product-gallery").height(100).html(N)
}
if(b.find(".prop-wordwrap-container").length>0) {
	b.find(".product-container").height("auto");
	var u=0;
	b.find(".product-container").each(function() {
	var i=$(this).height();
	if(i>u) {
	u=i
}
});
	b.find(".product-container").each(function() {
	$(this).height(u)
}
);
	b.find(".product-gallery-preview").height(u);
	Site.unifiedAttrVal(b,".prop-wordwrap-container","height");
	var y=b.find("div.product-gallery-inner"),L=b.find("a.gallery-control"),o=b.find("a.gallery-control-prev"),J=o.height(),I=(y.outerHeight()/2)-(J/2);
	L.css("top",I+"px")}};
	Site.loadProductSmallPic=function(i) {
	var r=i.id,F=i.scale,h=i.cus,D=i.dataObjs,E=i.bigPicObjs;
	var e=$("#"+r);
	e.on("Fai_onModuleSizeChange",function() {
	Site.smallPicModuleFix(r)
}
);
	e.on("Fai_onModuleLayoutChange",function() {
	Site.smallPicModuleFix(r)
}
);
	var g=e.find("div.productSmallPicBox");
	var w=e.find(".smallPicUpForms").height();
	var s=e.find(".smallPicDownForms").height();
	e.find(".productSmallPicForms").height(w+s);
	var p=e.find(".productSmallPicForms").width();
	var f=e.find(".smallPic_control").outerWidth(true);
	var d=p-f*2-e.find(".containerLeft").width();
	var b=d>150?d:150;
	e.find(".containerRight").width(b);
	e.find(".smallPicUpForms").css("width",p+"px");
	e.find(".smallPicDownForms").css("width",p+"px");
	var t=e.find(".smallPrePic_control").outerWidth(true);
	e.find(".smallPicDownFormsMid").css("width",p-2*t-20+"px");
	var z=e.find(".containerLeft").width()+e.find(".containerRight").width();
	e.find(".smallPicUpFormsMid").width(z);
	var n=e.find(".smallPrePicContainer");
	var a=e.find(".smallPrePicOuter").outerWidth(true);
	var C=0;
	if(Fai.isIE6()) {
	C=2
}
n.width(a*g.length+C);
	var k=n.width();
	var y=e.find(".smallPicUpFormsMid").outerHeight()/2-30;
	e.find(".smallPic_control").css("top",y+"px");
	var c=e.find(".smallPicDownFormsMid").width();
	var B=g.length;
	var o=Math.floor(c/a)+1;
	var A=B%o==0?B/o:Math.floor(B/o)+1;
	if(A==1&&c<n.width()) {
	A=2
}
var q=g.length<o?g.length:o;
	for(var x=0;
	x<q;
	x++) {
	var G=$(g[x]).find("img");
	Site.loadProductSmallPicItem(G)
}
var u=e.find(".smallPicDownForms a.g_imgPrev"),v=e.find(".smallPicDownForms a.g_imgNext"),l=e.find(".smallPicUpForms a.g_control_prev"),m=e.find(".smallPicUpForms a.g_control_next");
	u.addClass("smallPic-control-prev-disabled");
	if(A==1) {
	v.addClass("smallPic-control-next-disabled")
}
l.addClass("bigPic-control-prev-disabled");
	if(B==1) {
	m.addClass("bigPic-control-next-disabled")
}
e.find(".smallPicUpForms").mouseover(function() {
	$(".smallPic_control").css("display","block")
}
).mouseleave(function() {
	$(".smallPic_control").css("display","none")
}
);
	u.click(function() {
	var L=$(this);
	if(L.hasClass("smallPic-control-prev-disabled")) {
	return false
}
var H=L.parents(".smallPicDownForms").find(".smallPrePicContainer");
	var N=Math.floor(e.find(".smallPicDownFormsMid").width()/a)+1;
	var K=L.parents(".smallPicDownForms").find("a.g_imgNext");
	if(K.hasClass("smallPic-control-next-disabled")) {
	K.removeClass("smallPic-control-next-disabled")
}
var J=parseInt(H.css("left").replace("px"));
	var M=Math.abs(J)/a;
	var I=M-N+1>0?M-N+1:0;
	if(I==0) {
	L.addClass("smallPic-control-prev-disabled")
}
var j=(M-I)*a;
	if(H.is(":animated")) {
	return false
}
H.animate( {
	left:"+="+j+"px"
}
)});
	v.click(function() {
	var S=$(this);
	var J=$("#"+r);
	if(S.hasClass("smallPic-control-next-disabled")) {
	return false
}
var j=S.parents(".smallPicDownForms").find(".smallPrePicContainer"),L=S.parents(".smallPicDownForms").find("a.g_imgPrev"),K=Math.floor(J.find(".smallPicDownFormsMid").width()/a)+1;
	if(L.hasClass("smallPic-control-prev-disabled")) {
	L.removeClass("smallPic-control-prev-disabled")
}
var T=(K-1)*a,R=parseInt(j.css("left").replace("px"));
	var Q=Math.abs(R)/a;
	var U=Q+K-1>B-1?B-1:Q+K-1;
	var P=J.find(".smallPicDownFormsMid").width();
	if(j.is(":animated")) {
	return false
}
var I;
	var H,N;
	if(U>=B-1) {
	H=Q;
	N=B-1;
	if((N-H+1)*a<=P) {
	I=true;
	S.addClass("smallPic-control-next-disabled")
}
}else {
	H=U;
	N=U+K-1
}
for(var M=H;
	M<=N;
	M++) {
	var O=$(g[M]).find("img");
	Site.loadProductSmallPicItem(O)
}
if(!I) {
	j.animate( {
	left:"-="+T+"px"
}
)}});
	g.mouseover(function() {
	$(this).parent().addClass("smallPrePicOuterHover").addClass("g_border").addClass("g_borderHover")
}
);
	g.mouseleave(function() {
	$(this).parent().removeClass("smallPrePicOuterHover").removeClass("g_borderHover").removeClass("g_border")
}
);
	e.find(".smallPicUpFormsMid").mouseenter(function() {
	var j=$(this).parents(".form").attr("id");
	if(_manageMode==true) {
	Site.initModuleProductSmallPicItemManage(j,i.productSelect,i.isOpenImgEff)
}
}).mouseleave(function() {
	var j=$(this).parents(".form");
	var H=j.find("div.containerLeft");
	if(_manageMode==true) {
	if(i.isOpenImgEff) {
	Site.removeEditLayer(H)
}
else {
	Site.removeEditLayer(H,null,106)
}
}});
	l.click(function() {
	var L=$(this);
	if(L.hasClass("bigPic-control-prev-disabled")) {
	return false
}
var H=$("#"+r);
	var j=H.find(".smallPicDownForms").find(".smallPrePicContainer");
	var J=Math.floor(H.find(".smallPicDownFormsMid").width()/a)+1;
	var O=H.data("positionLeft");
	var K=Math.abs(O)/a;
	var N=K+J-1>B-1?B-1:K+J-1;
	var M=H.find(".smallPrePicSelected").parent();
	var P=M.index();
	if(P>=K&&P<=N) {
	if(P==K) {
	O+=a
}
}else {
	O=-(P-1)*a;
	j.css("left","0px")
}
if(j.is(":animated")) {
	return false
}
$(".img_ProductPhoto_LR_Border").remove();
	$(".img_ProductPhoto_TB_Border").remove();
	$(".editLayer").remove();
	var I=M.prev().find("div.productSmallPicBox");
	H.find("div.containerLeft").attr("productId",I.attr("proid")).attr("productName",I.find("img").attr("productname")).attr("topClassName",I.find("img").attr("classname")).attr("topSwitch",I.find("img").attr("topswitch")).attr("id","containerLeft_ProdsmallPic"+I.attr("proid"));
	j.animate( {
	left:O+"px"
}
,function() {
	M.prev().find("div.productSmallPicBox").click()
}
)});
	m.click(function() {
	var L=$(this);
	if(L.hasClass("bigPic-control-next-disabled")) {
	return false
}
var H=$("#"+r);
	var j=$(".smallPicDownForms").find(".smallPrePicContainer");
	var J=Math.floor(H.find(".smallPicDownFormsMid").width()/a)+1;
	var O=H.data("positionLeft");
	var K=Math.abs(O)/a;
	var N=K+J-1>B-1?B-1:K+J-1;
	var M=H.find(".smallPrePicSelected").parent();
	var P=M.index();
	if(P>=K&&P<=N) {
	if(P==N) {
	O-=2*a
}
}else {
	O=-(P-1)*a;
	j.css("left","0px")
}
if(j.is(":animated")) {
	return false
}
$(".img_ProductPhoto_LR_Border").remove();
	$(".img_ProductPhoto_TB_Border").remove();
	$(".editLayer").remove();
	var I=M.next().find("div.productSmallPicBox");
	H.find("div.containerLeft").attr("productId",I.attr("proid")).attr("productName",I.find("img").attr("productname")).attr("topClassName",I.find("img").attr("classname")).attr("topSwitch",I.find("img").attr("topswitch")).attr("id","containerLeft_ProdsmallPic"+I.attr("proid"));
	j.animate( {
	left:O+"px"
}
,function() {
	M.next().find("div.productSmallPicBox").click()
}
)});
	g.click(function() {
	var S=$(this).find("img");
	Site.loadProductSmallPicItem($(this).parent().next().find("img"));
	Site.loadProductSmallPicItem(S);
	var L=$("#"+r);
	var H=L.find(".smallPicUpFormsMid .containerLeft img");
	L.find(".containerRight").children().remove();
	var ae=i.scale;
	var K=$(this).parent();
	K.siblings(".smallPrePicOuter").find("div.productSmallPicBox").removeClass("smallPrePicSelected");
	$(this).addClass("smallPrePicSelected");
	K.siblings(".smallPrePicOuter").removeClass("smallPrePicOuterClick").removeClass("g_borderSelected");
	K.addClass("smallPrePicOuterClick").addClass("g_borderSelected");
	var aa=L.find("#bigImgDetail");
	aa.remove();
	L.find(".smallPic_td").append(H);
	var ai=$(this).attr("proid");
	var al=E[ai]["bigPicThumbPath"];
	var Q=E[ai]["bWidth"];
	var T=E[ai]["bHeight"];
	var j=L.find(".containerLeft").width(),I=L.find(".containerLeft").height();
	if(ae) {
	var R=Fai.Img.calcSize(Q,T,j,I,Fai.Img.MODE_SCALE_FILL);
	H.width(R.width);
	H.height(R.height)
}
else {
	H.css("width",j).css("height",I)
}
var Y=[];
	Y.push("<div class='loadingImg' style='width:"+j+"px;
	height:"+I+"px;
	'>");
	Y.push("<table cellspacing='0' cellpadding='0' class='loadingImgTable' style='width:"+j+"px;
	height:"+I+"px;
	'><tbody><tr><td class='loadingImgTd'>");
	Y.push("<div class='ajaxLoading2' style='margin:0 auto;
	'></div>");
	Y.push("</td></tr></tbody></table>");
	Y.push("</div>");
	L.find(".smallPic_td").append(Y.join(""));
	var ag=H.attr("src");
	if(ag==al) {
	H.attr("src","")
}
H.attr("src",al);
	H.css("margin","auto");
	var U=S.attr("alt");
	H.attr("alt",U);
	L.find(".containerLeft").height(L.find(".containerLeft").height());
	L.find(".containerLeft").css("overflow","hidden");
	var at=$(this).find("img");
	var ar=at.attr("ifcenter");
	var ao=at.attr("ifshowname");
	var ad=at.attr("ifwordwrap");
	var M=at.attr("ifmallbtn");
	var am=at.attr("aattribute");
	var O=at.attr("click");
	var ab=at.attr("btntext");
	H.wrap("<a id='bigImgDetail' "+am+"></a>");
	var N="text-align:center";
	var J="margin:0 auto;
	";if(ar=="false") {
	N="text-align:left";
	J="margin-left:0;
	"
}
var ak="word-break:normal;
	white-space:normal;
	overflow:visible;
	text-overflow:clip";
	if(ad=="false") {
	ak="white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis"
}
var Y=[];
	var X=L.find(".containerRight").width();
	Y.push("<div class='productParamContainer' style='width:"+X+"px;
	"+J+"'>");
	if(ao=="true") {
	Y.push("<a "+am+" title='"+$(this).find("img").attr("productname")+"' style='text-decoration:none;
	'><div style='width:"+(X-20)+"px;
	margin:auto;
	"+N+";
	margin-top:20px;
	margin-bottom:8px;
	"+ak+";
	'>"+Fai.encodeHtml($(this).find("img").attr("productname"))+"</div></a>")
}
var P=D[ai];
	for(var Z in P) {
	if(typeof(P[Z])!="function") {
	var an="";
	if(Z=="市场价") {
	an="g_minor mallMarketPrice"
}
if(Z=="商城价") {
	an="g_stress mallPrice"
}
Y.push("<div style='margin:auto;
	height:20px;
	line-height:20px;
	padding:5px 0;
	width:"+(X-20)+"px;
	"+N+";
	text-overflow:ellipsis;
	white-space:nowrap;
	overflow:hidden;
	'>");
	if(i.propNameShow) {
	Y.push("<span>"+Z+"：</span>")
}
Y.push("<span class='"+an+"'>"+P[Z]+"</span>");
	Y.push("</div>")}}if(M=="true") {
	Y.push("<div style='margin-left:9px;
	height:20px;
	line-height:20px;
	padding:5px 0;
	width:"+(X-20)+"px;
	"+N+";
	text-overflow:ellipsis;
	white-space:nowrap;
	overflow:hidden;
	'>");
	Y.push("<a hidefocus='true' class='fk-mallBuy' href='javascript:;
	' onclick='"+O+"'><span>");
	Y.push(ab);
	Y.push("</span></a>");
	Y.push("</div>")
}
Y.push("</div>");
	L.find(".containerRight").append(Y.join(""));
	var ap=L.find(".smallPrePicSelected").parent().index();
	l.removeClass("bigPic-control-prev-disabled");
	m.removeClass("bigPic-control-next-disabled");
	u.removeClass("smallPic-control-prev-disabled");
	v.removeClass("smallPic-control-next-disabled");
	var ah=L.find(".smallPicDownForms").find(".smallPrePicContainer");
	var aq=parseInt(ah.css("left").replace("px"));
	var aj=Math.abs(aq)/a;
	var af=aj+o-1>B-1?B-1:aj+o-1;
	var V=L.find(".smallPicDownFormsMid").width();
	var ac,W;
	if(ap==0) {
	l.addClass("bigPic-control-prev-disabled");
	if(aq==0) {
	u.addClass("smallPic-control-prev-disabled")
}
}if(ap==(B-1)) {
	m.addClass("bigPic-control-next-disabled");
	ac=aj;
	W=B-1;
	if((W-ac+1)*a<=V&&aq>=(B-o-1)*a) {
	v.addClass("smallPic-control-next-disabled")
}
}L.data("positionLeft",aq);
	L.find("div.containerLeft").attr("productId",ai).attr("productName",S.attr("productname")).attr("topClassName",S.attr("classname")).attr("topSwitch",S.attr("topswitch")).attr("id","containerLeft_ProdsmallPic"+ai)});
	g.eq(0).click()};
	Site.removeProductSmallPicMask=function(a) {
	$("#module"+a).find(".loadingImg").remove()
}
;Site.loadProductSmallPicItem=function(d) {
	if(!d.attr("src")) {
	d.attr("src",d.attr("lzurl"))
}
var e=parseInt(d.attr("sWidth")),b=parseInt(d.attr("sHeight"));
	var a=e>b?e:b;
	var c=e>b?"width":"height";
	if(a>71) {
	d.css(c,71)
}
else {
	d.css("width",e).css("height",b)
}
d.show()};
	Site.smallPicModuleFix=function(w) {
	var e=$("#"+w),g=e.find("div.productSmallPicBox");
	var n=e.find(".productSmallPicForms").width();
	var f=e.find(".smallPic_control").outerWidth(true);
	var d=n-f*2-e.find(".containerLeft").width();
	var b=d>150?d:150;
	e.find(".containerRight").width(b);
	e.find(".smallPicUpForms").css("width",n+"px");
	e.find(".smallPicDownForms").css("width",n+"px");
	var p=e.find(".smallPrePic_control").outerWidth(true);
	e.find(".smallPicDownFormsMid").css("width",n-2*p-20+"px");
	var t=e.find(".containerLeft").width()+e.find(".containerRight").width();
	$(".smallPicUpFormsMid").width(t);
	var l=e.find(".smallPrePicContainer");
	var a=$(".smallPrePicOuter").outerWidth(true);
	var x=0;
	if(Fai.isIE6()) {
	x=2
}
l.width(a*g.length+x);
	var h=l.width();
	var c=e.find(".smallPicDownFormsMid").width();
	var u=g.length;
	var m=Math.floor(c/a)+1;
	var v=u%m==0?u/m:Math.floor(u/m)+1;
	if(v==1&&c<l.width()) {
	v=2
}
var q=e.find(".smallPicDownForms a.g_imgPrev"),r=e.find(".smallPicDownForms a.g_imgNext"),i=e.find(".smallPicUpForms a.g_control_prev"),k=e.find(".smallPicUpForms a.g_control_next");
	if(v==1) {
	q.addClass("smallPic-control-prev-disabled");
	r.addClass("smallPic-control-next-disabled")
}
var o=g.length<m?g.length:m;
	for(var s=0;
	s<o;
	s++) {
	var y=$(g[s]).find("img");
	if(!y.attr("src")) {
	Site.loadProductSmallPicItem(y)
}
}e.find(".smallPrePicSelected").click()};
	Site.productInfoSwitchClick=function(a) {
	$("#pdInfoSwitchTable .tabSwitch").removeClass("g_borderSelected").removeClass("selected");
	$("#pdInfoSwitchTable .tabSwitch div").removeClass("pdNoBottomBorder");
	$("#pdInfoSwitchTable .tabSwitch:last").css( {
	"border-right-width":"1px"
}
);
	$("#pdInfoSwitchTable .tabSwitch").css( {
	"border-left-width":"1px"
}
);
	var b=0;
	if(a=="comm") {
	$("#msgBoardCaptchaImg").attr( {
	src:"validateCode.jsp?"+Math.random()*1000
}
);
	$("#accComSwitch").addClass("selected");
	$(".selected").addClass("g_borderSelected");
	$(".selected div").addClass("pdNoBottomBorder");
	$("#detailedDesc").hide();
	$("#saleRecordPanel").hide();
	$("#accumulativeComment").show();
	$("#accComSwitch").next().css( {
	"border-left-width":"0"
}
);
	$("#pdInfoSwitchTable .tabSwitch").each(function(c) {
	if($(this).attr("id")=="accComSwitch") {
	b=c;
	return true
}
})}else {
	if(a=="detail") {
	$("#detDescSwitch").addClass("selected");
	$(".selected").addClass("g_borderSelected");
	$(".selected div").addClass("pdNoBottomBorder");
	$("#accumulativeComment").hide();
	$("#saleRecordPanel").hide();
	$("#detailedDesc").show();
	$("#detDescSwitch").next().css( {
	"border-left-width":"0"
}
);
	$("#pdInfoSwitchTable .tabSwitch").each(function(c) {
	if($(this).attr("id")=="detDescSwitch") {
	b=c;
	return true
}
})}else {
	if(a=="sale") {
	$("#saleRecordSwitch").addClass("selected");
	$(".selected").addClass("g_borderSelected");
	$(".selected div").addClass("pdNoBottomBorder");
	$("#accumulativeComment").hide();
	$("#detailedDesc").hide();
	$("#saleRecordPanel").show();
	$("#saleRecordSwitch").next().css( {
	"border-left-width":"0"
}
);
	$("#pdInfoSwitchTable .tabSwitch").each(function(c) {
	if($(this).attr("id")=="saleRecordSwitch") {
	b=c;
	return true
}
})}}}document.cookie="tabSwitch="+b;
	Fai.refreshClass($("body"))};
	Site.initModuleProductCommentItemManage=function(b,a) {
	Fai.top.$("#"+b).mouseover(function() {
	Site.addEditLayer(b,a,1)
}
).mouseleave(function() {
	Site.removeEditLayer(b)
}
)};
	Site.siteCommImgFileUpload=function(b,d,f,a) {
	var e=f.split(",");
	var c= {
	file_post_name:"Filedata",upload_url:"/static/web/ajax/commUpsiteimg_h.jsp",button_placeholder_id:d,file_size_limit:b+"MB",button_image_type:3,file_queue_limit:a,button_width:"50px",button_height:"50px",button_cursor:SWFUpload.CURSOR.HAND,button_image_url:_resRoot+"/image/site/msgUpImg/upload.png",requeue_on_error:false,post_params: {
	ctrl:"Filedata",app:21,type:0,fileUploadLimit:5,isSiteForm:true
}
,file_types:e.join(";
	"),file_dialog_complete_handler:function(g) {
	this._allSuccess=false;
	this.startUpload()
}
,file_queue_error_handler:function(h,g,i) {
	switch(g) {
	case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:Fai.ing(LS.siteFormSubmitCheckFileSizeErr,true);
	break;
	case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:Fai.ing(LS.siteFormSubmitFileUploadNotAllow,true);
	break;
	case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:Fai.ing(Fai.format(LS.siteFormSubmitFileUploadOneTimeNum,a),true);
	break;
	default:Fai.ing(LS.siteFormSubmitFileUploadReSelect,true);
	break
}
},upload_success_handler:function(h,g) {
	var i=jQuery.parseJSON(g);
	this._allSuccess=i.success;
	this._sysResult=i.msg;
	if(i.success) {
	Fai.ing(Fai.format(LS.siteFormSubmitFileUploadSucess,Fai.encodeHtml(h.name)),true);
	onFileUploadEvent("upload",i)
}
else {
	Fai.ing(LS.siteFormSubmitFileUploadFile+h.name+"   "+i.msg)
}
},upload_error_handler:function(h,g,i) {
	if(g==-280) {
	Fai.ing(LS.siteFormSubmitFileUploadFileCancle,false)
}
else {
	if(g==-270) {
	Fai.ing(Fai.format(LS.siteFormSubmitFileUploadFileExist,Fai.encodeHtml(h.name)),true)
}
else {
	Fai.ing(Fai.format(LS.siteFormSubmitFileUploadSvrBusy,Fai.encodeHtml(h.name)))
}
}},upload_complete_handler:function(h) {
	if(h.filestatus==SWFUpload.FILE_STATUS.COMPLETE) {
	if(a==null||typeof(a)=="undefined") {
	a=5
}
var i=$("#msgBoardAddImgTb").eq(0);
	var g=i.find("td").length;
	if(g>=(a+1)) {
	Fai.ing(LS.siteFormSubmitFileUploadOfMax,true);
	var j=i.find("td").eq(i.find("td").length-1);
	j.css("display","none");
	return
}
setTimeout(function() {
	swfObj.startUpload()
}
,swfObj.upload_delay)}else {
	if(h.filestatus==SWFUpload.FILE_STATUS.ERROR) {
	Fai.ing(Fai.format(LS.siteFormSubmitFileUploadSvrBusy,Fai.encodeHtml(h.name)))
}
}},upload_start_handler:function(g) {
	Fai.enablePopupWindowBtn(0,"save",false);
	Fai.ing(LS.siteFormSubmitFileUploadPrepare,false)
}
,view_progress:function(g,j,i,h) {
	Fai.ing(LS.siteFormSubmitFileUploadIng+h+"%",false)
}
};
	swfObj=SWFUploadCreator.create(c);
	onFileUploadEvent=function(o,l) {
	if(o=="upload") {
	var i=l.id;
	var n=l.name;
	var k=l.size;
	var j=l.path;
	var p=l.pathSmall;
	var h=l.fileId;
	var g=l.width;
	var m=l.height;
	Site.productCommImgTableCtrl(p,n,i,k,a,h)
}
}};
	Site.commUpAllImgList=null;
	Site.setCommUpAllImgList=function(list) {
	Site.commUpAllImgList=eval("("+list+")");
	if(Fai.isIE6()||Fai.isIE7()) {
	$(".msgBoard_upImg_border").css( {
	width:"50px",height:"50px"
}
)}$(function() {
	setTimeout(function() {
	var commentLists=$(".J_countRecSize");
	if(typeof(commentLists)!="undefined"&&commentLists!=null) {
	for(var i=0;
	i<commentLists.length;
	i++) {
	var commTemp=commentLists[i];
	var commRight=commTemp.getBoundingClientRect().right;
	var commLevel=$(commTemp).parent().parent().parent().parent().find(".msgBoard_msgUser_level");
	if(typeof(commLevel)!="undefined"&&commLevel!=null&&commLevel.width()!=null) {
	var levelRight=commLevel[0].getBoundingClientRect().left;
	var countNum=levelRight-commRight-5;
	commLevel.css("margin-left","-"+countNum+"px")
}
}}},200)})};
	Site.productCommImgTableCtrl=function(j,a,b,g,c,d) {
	var h=$("#msgBoardAddImgTb").eq(0);
	var i=h.find("td").length;
	var e=h.find("td").eq(i-1);
	e.find(".msgBoard_showImgCount").html((i)+"/"+c);
	var f=[];
	f.push("<td class='msgBoard_upImg_tb_td2'>");
	if(Fai.isIE6()||Fai.isIE7()) {
	f.push("<div class='msgBoard_upImg_border' style='width:50px !important;
	height:50px !important;
	'>")
}
else {
	f.push("<div class='msgBoard_upImg_border'>")
}
f.push("<span onclick='Site.productCommImgDelete(this)' class='msgBoard_upImgTop_set'/>");
	if(Fai.isIE6()||Fai.isIE7()) {
	f.push("<div><p><img alt='' class='msgBoard_upImg_set' src='"+j+"' _name='"+a+"' _id='"+b+"' _file_size='"+g+"' _file_id='"+d+"'></p></div>")
}
else {
	f.push("<div><p><img alt='' class='msgBoard_upImg_set' src='"+j+"' _name='"+a+"' _id='"+b+"' _file_size='"+g+"' _file_id='"+d+"' style='margin-left:-1px;
	'></p></div>")
}
f.push("</div>");
	f.push("</td>");
	e.before(f.join(""))};
	Site.productCommImgDelete=function(a) {
	var d=$("#msgBoardAddImgTb").eq(0);
	var b=d.find("td").length;
	for(var c=0;
	c<b;
	c++) {
	if(d.find("td").eq(c).find(".msgBoard_upImgTop_set")[0]===a) {
	d.find("td").eq(c).remove();
	break
}
}b=d.find("td").length;
	var e=d.find("td").eq(b-1);
	e.find(".msgBoard_showImgCount").html((b-1)+"/"+e.attr("maxNum"));
	if(b<=e.attr("maxNum")) {
	if(Fai.isIE6()||Fai.isIE7()) {
	e.css( {
	display:"block","padding-top":"7px"
}
)}else {
	if(Fai.isIE()) {
	e.css( {
	display:"block","padding-top":"8px"
}
)}else {
	e.css( {
	display:"block","padding-top":"10px"
}
)}}}};
	Site.showCommImgList=function(h,k,c,g,b) {
	var e=$("#"+c);
	if(e!=null&&typeof(e)!="undefined") {
	e.remove()
}
var j=$("#"+h);
	var f=j.parent().parent().parent().parent().parent().parent().parent();
	f.attr("chooseTr",g);
	f.attr("chooseTd",b);
	var d=f.find("td");
	d.find(".show_msg_border_rect").remove();
	var i="<div class='show_msg_border_rect'><div class='show_msg_triangle_down'></div></div>";
	d.eq(b).prepend(i);
	var a=[];
	a.push("<div id='"+c+"' class='show_msg_outer_div'>");
	a.push("<span onclick=Site.commShowPicClose('"+c+"','"+h+"') class='msg_close_show_img_icon'/>");
	if(Fai.isIE6()||Fai.isIE7()) {
	a.push("<div class='show_msg_bordered_div' style='width:298px !important;
	'></div>");
	a.push("<div class='show_msg_border_div' style='width:299px !important;
	'>")
}
else {
	a.push("<div class='show_msg_bordered_div' style='width:299px;
	'></div>");
	a.push("<div class='show_msg_border_div' style='margin-left:1px;
	'>")
}
a.push("<div><p><img alt='' class='msg_up_show_img_set' src='"+k+"'></p></div>");
	a.push("</div>");
	a.push("</div>");
	f.after(a.join(""));
	setTimeout(function() {
	$("#"+c).hover(function() {
	var l=$("#"+c);
	if(l.find("#J_showCommPicMoveSign").attr("class")==null||typeof(l.find("#J_showCommPicMoveSign").attr("class"))=="undefined") {
	var m=[];
	m.push("<div id='J_showCommPicMoveSign'>");
	m.push("<img alt='' class='showCommPicMoveLeftClickArea' onclick=Site.showCommImgMove('"+h+"','"+c+"','left')>");
	m.push("<img alt='' src='"+_resRoot+"/image/site/msgUpImg/mLeft.png' onclick=Site.showCommImgMove('"+h+"','"+c+"','left') class='showCommPicMoveLeft'>");
	m.push("<img alt='' class='showCommPicMoveRightClickArea' onclick=Site.showCommImgMove('"+h+"','"+c+"','right')>");
	m.push("<img alt='' src='"+_resRoot+"/image/site/msgUpImg/mRight.png' onclick=Site.showCommImgMove('"+h+"','"+c+"','right') class='showCommPicMoveRight'>");
	m.push("</div>");
	l.prepend(m.join(""))
}
},function() {
	var l=$("#"+c);
	if(Fai.isIE7()) {
	setTimeout(function() {
	l.find("#J_showCommPicMoveSign").remove()
}
,500)}else {
	l.find("#J_showCommPicMoveSign").remove()
}
})},10)};
	Site.showCommImgMove=function(g,a,f) {
	if(g==null||f==null) {
	return
}
var i=$("#"+g);
	var c=i.parent().parent().parent().parent().parent().parent().parent();
	currentChooseTr=c.attr("chooseTr");
	currentChooseTd=c.attr("chooseTd");
	if(currentChooseTr==null||currentChooseTd==null) {
	return
}
if(Site.commUpAllImgList==null) {
	return
}
var b=c.find("td");
	var e=parseInt(b.length);
	if(e<=1) {
	return
}
var j=0;
	if(f=="left") {
	if(currentChooseTd=="0"||currentChooseTd==0) {
	j=e-1
}
else {
	j=parseInt(currentChooseTd)-1
}
}else {
	if(f=="right") {
	j=parseInt(currentChooseTd)+1;
	if(j>=Site.commUpAllImgList[currentChooseTr].data.length) {
	j=0
}
}}b.eq(currentChooseTd).find(".show_msg_border_rect").remove();
	var h="<div class='show_msg_border_rect'><div class='show_msg_triangle_down'></div></div>";
	b.eq(j).prepend(h);
	c.attr("chooseTd",j);
	var d=$("#"+a).find(".msg_up_show_img_set").parent();
	$("#"+a).find(".msg_up_show_img_set").remove();
	d.append("<img alt='' class='msg_up_show_img_set' src='"+Site.commUpAllImgList[currentChooseTr].data[j].data+"'>")};
	Site.commShowPicClose=function(d,c) {
	var b=$("#"+d);
	if(b!=null&&typeof(b)!="undefined") {
	b.remove()
}
var e=$("#"+c);
	var a=e.parent().parent().parent().parent().parent().parent().parent();
	a.find("td").find(".show_msg_border_rect").remove()};
	Site.productCommentAddCom=function() {
	if(_siteDemo) {
	Fai.ing("当前为“样板网站”，请先“复制网站”再进行评论。");
	return
}
var k=$.trim($("#productCommentCreator").val());
	var o=$("#productCommentCreator").attr("minlength");
	var b=$("#productCommentInput").val();
	var h=$("#productCommentInput").attr("minlength");
	var f=$("#validateCodeInput").val();
	var p=$("#productCommentInput").attr("productId");
	var e=$("#submitTips").attr("isDefaultTips");
	if(typeof(e)=="string"&&e=="true") {
	$("#submitTips").show();
	return
}
if(typeof(k)!="string") {
	$("#submitTips").text(LS.creatorTips).show();
	return
}
if(typeof(b)!="string"||""==b) {
	$("#submitTips").text(LS.commentNotEmpty).show();
	return
}
if(b.length<h) {
	$("#submitTips").text(Fai.format(LS.commentLenTips,Fai.encodeHtml(h))).show();
	return
}
if(typeof(f)!="string"||""==f) {
	$("#submitTips").text(LS.memberInputCaptcha).show();
	return
}
var m=$("#msgBoardAddImgTb");
	var g=[];
	if(m!=null&&typeof(m)!="undefined") {
	var a=m.eq(0);
	var d=a.find("td").length;
	if(d>1) {
	for(var r=0;
	r<(d-1);
	r++) {
	var c=a.find("td").eq(r).find(".msgBoard_upImg_set");
	if(c!=null&&c!="undefined") {
	var t= {
	};
	var q=c.attr("_id");
	var v=c.attr("_name");
	var l=c.attr("_file_size");
	var n=c.attr("_file_id");
	t.imgId=q;
	t.imgName=v;
	t.imgSize=l;
	t.tempFileId=n;
	g.push(t)
}
}}}var u=$(".submitStarList").attr("star");
	if(!u) {
	u=5
}
var j= {
	validateCode:f,productId:p,creator:k,commImgList:$.toJSON(g),comment:b,star:u
}
;var s="ajax/productComment_h.jsp?cmd=submitPC";
	$("#submitTips").text(LS.siteFormSubmitIng).show();
	$.ajax( {
	type:"POST",url:s,data:j,error:function() {
	Fai.ing(LS.systemError);
	$("#msgBoardCaptchaImg").click()
}
,success:function(i) {
	var w=jQuery.parseJSON(i);
	if(!w||!w.success) {
	$("#msgBoardCaptchaImg").click()
}
Fai.removeBg();
	switch(w.msg) {
	case 1:$("#submitTips").text(LS.captchaError).show();
	break;
	case 2:$("#submitTips").text(LS.creatorError).show();
	break;
	case 3:$("#submitTips").text(LS.commentError).show();
	break;
	case 4:Fai.top.location.reload();
	$("#submitTips").text(LS.submitSuccess).show();
	break;
	case 5:$("#submitTips").text(LS.paramError).show();
	break;
	case 6:$("#submitTips").html(Fai.format(LS.commentOnlyMember,'<a href="login.jsp?url='+Fai.encodeUrl(window.location.href)+'">'+Fai.encodeHtml(LS.login)+"</a>")).show();
	break;
	case 7:$("#submitTips").text(LS.commentClosed).show();
	break;
	case 8:$("#submitTips").text(LS.commentSubmitError).show();
	break;
	case 9:$("#submitTips").text(LS.commentCountLimit).show();
	break;
	default:
}
}})};
	Site.showProductQRCode=function(c,a) {
	var b=["<div id='productQRCodeDisplay' class='webSiteQRCodeDisplay'>","<img title='' src='/qrCode.jsp?cmd=mobiDetailQR&&id=",c,"&lcid=",a,"&t=2' >","<span>",LS.productORCodeMsg,"</span>","</div>"];
	Fai.top.$(b.join("")).appendTo("body");
	$("#productQrCode").mouseenter(function(d) {
	$("#productQRCodeDisplay").css("top",$(this).offset().top+"px");
	$("#productQRCodeDisplay").css("left",($(this).offset().left+24)+"px");
	$("#productQRCodeDisplay").show()
}
).mouseleave(function(d) {
	$("#productQRCodeDisplay").hide()
}
)};
	Site.initRepPropValueOfURL=function() {
	var a=new RegExp("https?|ftp|file://");
	$(".pd_J .propValue").each(function(b,d) {
	var c=$(this).text();
	if(a.test(c)) {
	$(this).html(Fai.replaceContentOfURL(c))
}
})};
	Site.salePromotionDetail= {
	salePromotionParam:"",showType:"2",styleType:"1",saleCountTimeInterval: {
	}
}
;Site.initSalePromotion=function(b,a) {
	Site.salePromotionDetail.salePromotionParam=b;
	Site.salePromotionDetail.styleType=a
}
;Site.onlyChangeSalePrice=function(b) {
	b=parseFloat(b);
	if(isNaN(b)) {
	return
}
var c=Site.salePromotionDetail.salePromotionParam;
	if(typeof(c)=="undefined"||c==null||c=="") {
	return
}
if(c.saleType=="1") {
	var a=parseFloat(c.other.ruleData.d[0].m);
	if(c.other.ruleData.s=="1") {
	b=b*(a/10)
}
else {
	b=b-a
}
if(b<0) {
	b=0
}
$(".J_realMallAmount").html(b.toFixed(2))}};
	Site.showSalePromotionDl=function(p,o) {
	if(Site.salePromotionDetail.showType!="2") {
	return
}
if(typeof(p)=="undefined"||p==null||p=="") {
	return
}
var g=$("#realMallAmount").css("color");
	if(typeof(g)=="undefined"||g==null||g=="") {
	g="#FC4643"
}
var c=$(".J_saleFullReduce").find(".propName").attr("style");
	var k=[];
	if(p.saleType=="1") {
	var n="";
	var f=parseFloat(p.other.ruleData.d[0].m);
	var b=$(".J_saleFullReduce").find(".propName").html();
	var m=$("#realMallAmount").html();
	var j=m.indexOf("~");
	if(j>0) {
	priceNumber=parseFloat(m.substring(0,j))
}
else {
	priceNumber=parseFloat(m);
	m=parseFloat(m).toFixed(2)
}
if(isNaN(priceNumber)) {
	priceNumber=0
}
var a=0;
	var l=$("#realMallAmount").attr("curval");
	if(p.other.ruleData.s=="1") {
	if(_lcid==2052||_lcid==1028) {
	n=Fai.format(LS.salePromotionDisCount,f)
}
else {
	n=Fai.format(LS.salePromotionDisCount,10*(10-f))
}
a=priceNumber*(f/10)}else {
	n=Fai.format(LS.salePromotionLapse,f);
	a=priceNumber-f
}
if(isNaN(a)||a<0) {
	a=0
}
$("#realMallAmount").html(a.toFixed(2));
	$("#realMallAmount").addClass("J_realMallAmount");
	$("#realMallAmount").removeAttr("id");
	$(".J_saleFullReduce").addClass("J_salePromotionRemove");
	var e=[];
	if(o==4) {
	$(".J_saleFullReduce").find(".propName").html(LS.promotionPrice);
	e.push("<tr>");
	e.push("<td valign='top' class='propName g_minor' style='"+c+"'>");
	e.push(b);
	e.push("</td>");
	e.push("<td valign='top' class='propColon'>");
	e.push(LS.colon);
	e.push("</td>");
	e.push("<td valign='top' class='propValue g_minor mallMarketPrice realMallAmount'>");
	e.push("<span>");
	e.push(l);
	e.push("</span>");
	e.push("<span curval='"+l+"' id='realMallAmount' class='mallPrice'>");
	e.push(m);
	e.push("</span>");
	e.push("</td>");
	e.push("</tr>")
}
else {
	$(".J_saleFullReduce").find(".propName").html(LS.promotionPrice+LS.colon);
	e.push("<tr>");
	e.push("<td valign='top' class='propName g_minor' style='"+c+"'>");
	e.push(b);
	e.push("</td>");
	e.push("<td valign='top' class='propValue g_minor mallMarketPrice realMallAmount'>");
	e.push("<span>");
	e.push(l);
	e.push("</span>");
	e.push("<span curval='"+l+"' id='realMallAmount' class='mallPrice'>");
	e.push(m);
	e.push("</span>");
	e.push("</td>");
	e.push("</tr>")
}
$(".J_saleFullReduce").before(e.join(""));
	var d="";
	if((o==1||o==2||o==3)&&Fai.isIE6()) {
	d="padding-bottom:10px;
	margin:0px;
	line-height:25px;
	"
}
k.push("<td class='saleHoverDefault showSaleReducePrice J_salePromotionRemove' style='"+d+"'>");
	k.push("<table border='0' cellspacing='0' cellpadding='0'><tr>");
	k.push("<td style='vertical-align:bottom;
	padding:0;
	margin:0;
	'>");
	k.push("<div  style='width:0;
	height:0;
	border-bottom:5px solid "+g+";
	border-left:5px solid transparent;
	' class='J_changeSaleCrBb'>");
	k.push("</div>");
	k.push("</td>");
	k.push("<td style='vertical-align:bottom;
	padding:0;
	margin:0;
	width:auto;
	height:auto;
	'>");
	k.push("<div style='font-size:12px;
	background-color:"+g+";
	padding:0px 3px;
	word-wrap:normal;
	height:20px;
	line-height:20px;
	'  class='J_changeSaleCrBd' title='"+p.name+"'>");
	k.push(n);
	k.push("</div>");
	k.push("</td>");
	k.push("</tr></table>");
	k.push("</td>");
	$(".J_realMallAmount").parent().after(k.join(""))}else {
	if(typeof(p.other.ruleData.d.length)=="undefined") {
	return
}
k.push("<tr class='J_salePromotionRemove saleFullCutPding'>");
	if(o==4) {
	k.push("<td valign='top' class='propName g_minor' style='"+c+"'>");
	k.push(LS.salePromotionName);
	k.push("</td>");
	k.push("<td valign='top' class='propColon'>");
	k.push(LS.colon);
	k.push("</td>")
}
else {
	k.push("<td valign='top' class='propName g_minor' style='"+c+"'>");
	k.push(LS.salePromotionName+LS.colon);
	k.push("</td>")
}
k.push("<td valign='top' class='saleHoverDefault propValue J_changeSaleCrW' style='color:"+g+";
	'  title='"+p.name+"' >");
	for(var h=0;
	h<p.other.ruleData.d.length;
	h++) {
	if(h>0) {
	k.push("<div class='saleFullReMgTop'>")
}
else {
	k.push("<div>")
}
k.push("<span class='saleFullReBg J_changeSaleCrBd' style='margin:0;
	background-color:"+g+";
	'>");
	k.push(Fai.format(LS.salePromotionOnlyFullReduce));
	k.push("</span>");
	k.push("<span style='margin:0;
	margin-left:8px;
	'>");
	k.push(Fai.format(LS.salePromotionFullReduce,p.other.ruleData.d[h].m,p.other.ruleData.d[h].n));
	k.push("</span>");
	k.push("</div>")}k.push("</td>");
	k.push("</tr>");
	$(".J_saleFullReduce").after(k.join(""))}};
	Site.changeSaleColor=function() {
	var a=top.$(".J_realMallAmount").css("color");
	if(typeof(a)=="undefined"||a==null||a=="") {
	a=top.$("#realMallAmount").css("color");
	if(typeof(a)=="undefined"||a==null||a=="") {
	a="#FC4643"
}
}top.$(".J_changeSaleCrBb").css("border-bottom-color",a);
	top.$(".J_changeSaleCrW").css("color",a);
	top.$(".J_changeSaleCrBd").css("background-color",a)};
	Site.saleCountTimeInterval= {
	};
	Site.showSaleTimeCountDown=function(b,f,d,e) {
	var h="";
	var c=LS.salePromotionBegin;
	var g=LS.salePromotionEnd;
	var a=0;
	Site.salePromotionDetail.showType=d;
	if(d==1) {
	h=c;
	a=b
}
else {
	h=g;
	a=f
}
clearInterval(Site.salePromotionDetail.saleCountTimeInterval);
	Site.salePromotionDetail.saleCountTimeInterval=setInterval(function() {
	var q=parseInt(a/(3600*24));
	var o=parseInt(a/3600)-(q*24);
	var m=parseInt(a/60)-(q*24*60)-(o*60);
	var p=parseInt(a%60);
	if(_lcid!=2052&&_lcid!=1028) {
	if(o<10) {
	o="0"+o
}
if(m<10) {
	m="0"+m
}
if(p<10) {
	p="0"+p
}
}a--;
	var j=Fai.format(h,q,o,m,p);
	if(e==2||e==3) {
	var l=j.indexOf(":");
	if(l<0) {
	l=j.indexOf("：")
}
if(l>0) {
	var n=j.substring(0,l+1);
	var k=j.substring(l+1,j.length);
	$(".showSaleTimeNameClass").html(n);
	$(".showSaleTimeClass").html(k)
}
else {
	$(".showSaleTimeClass").html(Fai.format(h,q,o,m,p))
}
}else {
	$(".showSaleTimeClass").html(j)
}
if(a<0) {
	if(d==1) {
	a=f;
	h=g;
	d=2;
	Site.salePromotionDetail.showType=2;
	Site.showSalePromotionDl(Site.salePromotionDetail.salePromotionParam,Site.salePromotionDetail.styleType)
}
else {
	clearInterval(Site.salePromotionDetail.saleCountTimeInterval);
	Site.salePromotionDetail.showType=1;
	var i=$(".J_realMallAmount").attr("style");
	$(".realMallAmount").removeClass("g_minor mallMarketPrice");
	$(".realMallAmount").addClass("g_stress mallPriceBig");
	$(".realMallAmount").attr("style",i);
	$(".J_salePromotionRemove").remove()
}
}},1000)};
	Site.initModuleProductMallGroups=function(a,d,g,e) {
	var b=$("#module"+a),h=b.find(".pd_mall_G_J .p_m_cotainer_J");
	var c=false;
	b.find(".pd_mall_G_J").menuAim( {
	rowSelector:" .p_m_cotainer_J",activate:j,deactivate:i,exitActRow:function() {
	return true
}
});
	function j(x) {
	var J=$(x);
	J.find(".p_m_cotainerR_J").removeClass("p_m_more");
	J.find(".p_m_value_J").addClass("g_stress");
	J.addClass("bold p_m_hover g_border");
	var B=J.attr("_id"),t=d[B];
	if(t==null||t.list.length===0) {
	return true
}
var G=f(t);
	var q= {
	that:J,moduleId:a,clsStr:"pd_m_panel "+(g===1||g===2?"pd_m_jd":"pd_m_yhd"),idStr:"group"+B+"Panel",contentStr:G.join("")
}
;panel=Site.moduleSubPanel(q);
	var l=b.find(".formBanner"),M=0;
	if(l.length>0&&l.is(":visible")) {
	M=l.outerHeight()
}
var y=b.find(".formMiddleRight").outerWidth();
	if(Fai.isIE8()) {
	y=0
}
var n=b.find(".formMiddleCenter").width(),r=b.find(".pd_mall_G_J").width(),L=b.offset().top+M,p=b.offset().left+b.outerWidth()-((n-r)/2)-2-y;
	panel.css( {
	top:L,left:p
}
).show();
	if(Fai.isIE6()) {
	var N=panel.find(".p_m_body_J").outerWidth();
	panel.width(N)
}
var w=0,k=0,H=J.outerHeight()-J.innerHeight();
	m_border=parseInt((b.outerHeight()-b.innerHeight())/2);
	oFormMiddle=b.find(".formMiddle"),m_content_innerPaddingTopStr=oFormMiddle.find(".formMiddleContent").css("margin-top"),m_content_innerPaddingTop=parseInt(m_content_innerPaddingTopStr.replace("px",""));
	if(g===2) {
	var v=20,C=J.outerHeight(),o=panel.outerHeight(),A=$(window).height(),E=J.offset().top-$(window).scrollTop(),u=A-E,F=0;
	if(u<o) {
	F=o-u+v
}
if(F>J.position().top) {
	F=J.position().top
}
if(C<o&&F+C>o) {
	F=o-u
}
var z=oFormMiddle.height(),I=parseInt((oFormMiddle.outerHeight()-oFormMiddle.innerHeight())/2);
	L+=J.position().top-F+m_border+I+m_content_innerPaddingTop;
	panel.css( {
	top:L
}
);
	k=F+H/2;
	w=C>o?o-4:J.outerHeight()-H}else {
	var K=b.find(".formMiddleContent").offset().top-b.find(".formMiddleCenter").offset().top,D=J.position().top+J.outerHeight()+K,m=panel.outerHeight();
	if(m-5<D) {
	var s=panel.find(".p_m_body_J");
	s.height(D)
}
k=J.position().top+H/2+m_border+m_content_innerPaddingTop;
	w=J.outerHeight()-H}$(panel).find(".p_m_cover_J").css( {
	top:k,height:w
}
)}function i(l) {
	var k=$(l);
	Fai.top.$(".g_m_s_J").each(function() {
	var m=$(this);
	if(m.length!=1) {
	return
}
m.remove()});
	k.removeClass("bold p_m_hover g_border");
	k.find(".p_m_value_J").removeClass("g_stress");
	if(k.attr("_chd")==1) {
	k.find(".p_m_cotainerR_J").addClass("p_m_more")
}
}function f(k) {
	var m=[];
	m.push("<div class='p_m_cover p_m_cover_J'></div>");
	m.push("<div class='"+(k.hasGrand?"p_m_body2":"p_m_body")+" g_border p_m_body_J'>");
	var l="";
	if(e===1) {
	l="target='_blank'"
}
if(k.hasGrand) {
	if(g===1||g===2) {
	$.each(k.list,function(n,o) {
	if(e!==1&&_manageMode) {
	l="onclick=\"Site.redirectUrl('"+o._href+"','_self',event,1,0);
	return false;
	\""
}
m.push("<dl>");
	m.push("<dt><a class='g_stress' href='"+o._href+"' "+l+">"+Fai.encodeHtml(o.name)+"</a></dt>");
	m.push("<dd>");
	$.each(o.children,function(p,q) {
	if(e!==1&&_manageMode) {
	l="onclick=\"Site.redirectUrl('"+q._href+"','_self',event,1,0);
	return false;
	\""
}
m.push("<a href='"+q._href+"' "+l+" title='"+Fai.encodeHtml(q.name)+"'>"+Fai.encodeHtml(q.name)+"</a>")});
	m.push("</dd>");
	m.push("</dl>");
	m.push("<div class='p_m_sep'></div>")})}else {
	$.each(k.list,function(n,o) {
	if(e!==1&&_manageMode) {
	l="onclick=\"Site.redirectUrl('"+o._href+"','_self',event,1,0);
	return false;
	\""
}
m.push("<dl>");
	m.push("<dt><a class='g_stress' href='"+o._href+"' "+l+">"+Fai.encodeHtml(o.name)+"</a></dt>");
	$.each(o.children,function(p,q) {
	if(e!==1&&_manageMode) {
	l="onclick=\"Site.redirectUrl('"+q._href+"','_self',event,1,0);
	return false;
	\""
}
m.push("<dd><a href='"+q._href+"' "+l+" title='"+Fai.encodeHtml(q.name)+"'>"+Fai.encodeHtml(q.name)+"</a></dd>")});
	m.push("</dl>");
	if((n+1)%3==0||(n+1)==k.list.length) {
	m.push("<div class='p_m_sep'></div>")
}
})}}else {
	$.each(k.list,function(n,o) {
	if(e!==1&&_manageMode) {
	l="onclick=\"Site.redirectUrl('"+o._href+"','_self',event,1,0);
	return false;
	\""
}
m.push("<a class='p_m_line g_stress' href='"+o._href+"' "+l+">"+Fai.encodeHtml(o.name)+"</a>")})}m.push("</div>");
	return m}};
	Site.createImageEffectContent_product=function(target,ieParam,tgParam,extData) {
	if(!extData) {
	return
}
var fullmaskBackgroundandWord= {
	fwc:(ieParam.wordType)?ieParam.fullmaskWordColor:"#fff",fwr:(ieParam.wordType)?ieParam.fullmaskWordResize:12,fws:(ieParam.wordType)?ieParam.fullmaskWordStyle:"SimSun"
}
;var targetImgEff=$(target).find(".imageEffects");
	var targetId=$(target).attr("id");
	if(typeof targetId=="undefined") {
	var productId=$(targetImgEff).parents("."+tgParam.targetParent).attr("productid");
	targetId=tgParam.targetParent+productId
}
var propHeight=(ieParam.effType==5)?($(target).height()*0.75)*0.5:($(targetImgEff).height()*0.5);
	var propWidth=$(targetImgEff).width();
	var productBuyBtnClick="";
	var productBuyBtnText="";
	generateProps();
	generatePropBuy();
	bindPropsEvent();
	function generateProps() {
	var props=[];
	var propStr="";
	var productName="";
	var propListStyle="";
	propListStyle+=(ieParam.effType==5?"padding-top:2.5%;
	":"");
	propListStyle+=(tgParam.productTextCenter?"text-align:center;
	":"text-align:left;
	");
	var propContent="<div class='props'><div class='propList g_specialClass' style='"+propListStyle+"'></div><div class='propBuy'></div></div>";
	$(targetImgEff).append(propContent);
	if(tgParam.targetParent=="productMarqueeForm") {
	targetId=targetId.replace("_clone","")
}
for(var index in extData) {
	if(extData[index][targetId]!=undefined) {
	props=jQuery.parseJSON(extData[index][targetId]);
	productName=extData[index]["productName"];
	productBuyBtnText=extData[index]["productBuyBtnText"];
	productBuyBtnClick=extData[index]["productBuyBtnClick"];
	break
}
}var propsList=$(targetImgEff).find(".props .propList");
	if(tgParam.productNameShow) {
	$(propsList).append("<a href='javascript:;
	' onclick='return false;
	' class='imgEffPropName "+(tgParam.productNameWordWrap?"":"noNameWrap")+"'>"+productName+"</a>")
}
if(props.length>0) {
	for(var index in props) {
	var prop=props[index];
	var propName=prop.propName;
	var propValue=prop.propValue;
	if(!tgParam.propNameShow) {
	propName=""
}
else {
	propName+="："
}
if($(propsList).height()<propHeight) {
	tempStr=propName+propValue;
	$(propsList).append("<p class='prop'>"+tempStr+"</p>")
}
else {
	var lastProp=$(propsList).children().last();
	if($(lastProp).width()<propWidth) {
	var innerText=$(propsList).children().last().text();
	$(propsList).children().last().text(innerText+"...")
}
break}}}$(".imgEffPropName").css( {
	color:fullmaskBackgroundandWord.fwc,"font-size":fullmaskBackgroundandWord.fwr+"px","font-family":fullmaskBackgroundandWord.fws
}
);
	$(".prop").css( {
	color:fullmaskBackgroundandWord.fwc,"font-size":fullmaskBackgroundandWord.fwr+"px","font-family":fullmaskBackgroundandWord.fws
}
)}function generatePropBuy() {
	if(tgParam.mallShowBuy) {
	var propBuy="<span>"+productBuyBtnText+"</span>";
	$(targetImgEff).find(".props .propBuy").append(propBuy);
	if(Fai.isIE6()||Fai.isIE7()) {
	productBuyBtnClick=productBuyBtnClick.replace("return false;
	","");
	$(targetImgEff).find(".props .propBuy").attr("data-click",productBuyBtnClick)
}
else {
	$(targetImgEff).find(".props .propBuy").attr("onclick",productBuyBtnClick)
}
}else {
	$(targetImgEff).find(".props .propBuy").remove()
}
}function bindPropsEvent() {
	$(targetImgEff).find(".propBuy").bind("mouseenter",function() {
	$(this).addClass("propBuy_hover")
}
).bind("mouseleave",function() {
	$(this).removeClass("propBuy_hover")
}
);
	if(Fai.isIE6()||Fai.isIE7()) {
	$(targetImgEff).find(".propBuy").bind("click",function() {
	var clickFunStr=$(this).attr("data-click");
	if(clickFunStr.length>0) {
	eval(clickFunStr)
}
})}}};
	Site.clearImageEffectContent_product=function(b,a) {
	$("#module"+b).find("."+a).remove();
	if($("#module"+b).find(".mallPanel").length>0) {
	$("#module"+b).find(".mallPanel").remove()
}
};
	Site.bindImageEffectCusEvent_product=function(target,tgOpt) {
	var imageEffect=$(target).find(".imageEffects");
	$(imageEffect).css("cursor","pointer");
	$(imageEffect).bind("click",function() {
	var target_a=$(this).parents("."+tgOpt.targetParent).find("a");
	if(Fai.isNull(target_a)) {
	return
}
var _href=$(target_a).attr("href");
	var _onclick=$(target_a).attr("onclick");
	var _target=$(target_a).attr("target");
	if(typeof _onclick!="undefined") {
	eval(_onclick)
}
else {
	if(_href.length>0) {
	window.open(_href,_target)
}
}})};
	Site.initModuleProductResultPropFilter=function(d) {
	var c=$("#module"+d),e=c.find(".fp_list_J"),f=e.find(".fp_block_J");
	if(Fai.isIE6()||Fai.isIE7()||Fai.isIE8()) {
	var a=e.find(".block_head_J").outerWidth();
	e.find(".block_body_J").width(e.width()-a)
}
$.each(f,function(j,k) {
	var k=$(k),h=k.find(".block_head_J"),g=k.find(".block_body_J"),l=h.outerHeight();
	blockBodyH=g.outerHeight();
	if(blockBodyH>l+10) {
	g.attr("_h",blockBodyH);
	$(k).find(".block_tail_J .more_btn_J").text(LS.productResultMore);
	return
}
$(k).find(".block_tail_J").remove()});
	var b=c.find(".fp_list_J .block_tail_J");
	b.click(function() {
	var j=$(this),k=j.parent(),g=k.find(".block_body_J"),h=j.find(".more_btn_J"),i=j.find(".more_down");
	if(i.hasClass("more_up")) {
	k.removeAttr("style");
	h.text(LS.productResultMore);
	i.removeClass("more_up")
}
else {
	k.height(g.attr("_h"));
	h.text(LS.productResultColl);
	i.addClass("more_up")
}
});
	$("#conds_body_sel").change(function() {
	window.location.href=$(this).val()
}
);
	if(Fai.top._manageMode) {
	$("#pf_tips").hover(function() {
	var g=$(this);
	tipImgW=g.width(),tipTop=g.offset().top,tipLeft=g.offset().left,str="<div id='pf_tips_Msg' class='pf_tips_Msg g_tip'>"+g.attr("_tipVal")+"</div>";
	Fai.top.$(str).appendTo("body");
	var h=$("#pf_tips_Msg");
	h.offset( {
	top:tipTop-h.outerHeight()-10,left:tipLeft
}
)},function() {
	$("#pf_tips_Msg").remove()
}
)}};
	Site.newsScroll=function(l) {
	var g= {
	pauseDuration:2400,showDuration:600,scrollMode:"up"
}
;var c=$.extend( {
	},g,l);
	var d=$("#module"+c.moduleId),b=d.find(".newsList"),h=b.parent(),k=b.find(".line"),j=b.find(".separatorLine");
	var a="scroll"+c.moduleId;
	var f=c.leader||0;
	d.mouseover(function() {
	b.stop();
	Fai.stopInterval(a);
	$(this).attr("scrollInterval",0)
}
).mouseout(function() {
	if($(this).attr("scrollInterval")==0) {
	b.stop();
	Fai.stopInterval(a);
	Fai.startInterval(a);
	$(this).attr("scrollInterval",1)
}
});
	k.mouseover(function() {
	b.stop();
	Fai.stopInterval(a);
	$(this).attr("scrollInterval",0)
}
).mouseout(function() {
	if($(this).attr("scrollInterval")==0) {
	b.stop();
	Fai.stopInterval(a);
	Fai.startInterval(a);
	$(this).attr("scrollInterval",1)
}
});
	function i() {
	b.css( {
	position:"relative"
}
);
	h.css( {
	overflow:"hidden",position:"relative"
}
);
	b.height(b.height());
	h.height(b.height());
	function m() {
	if(c.scrollMode=="up") {
	var s=b.find(".line").eq(f);
	var o=b.find(".separatorLine").eq(f);
	var p=s.outerHeight();
	var q=o.is(":visible");
	var n=q?o.outerHeight(true):0;
	if(f==0) {
	b.animate( {
	top:"-="+(p+n)
}
,c.showDuration*((p+n)/32),function() {
	s.appendTo(b).end().hide().fadeIn(400);
	o.appendTo(b).end().hide();
	if(q) {
	o.fadeIn(400)
}
s.insertAfter(b.find(".separatorLine:last")).end().hide().fadeIn(400);
	o.insertAfter(b.find(".line:last")).end().hide();
	if(q) {
	o.fadeIn(400)
}
b.css( {
	top:0
}
);
	e()})}else {
	s.animate( {
	opacity:0
}
,400).slideUp(600,function() {
	s.css( {
	opacity:1
}
).appendTo(b).end().hide().fadeIn(400);
	o.appendTo(b).end().hide();
	if(q) {
	o.fadeIn(400)
}
});
	e()}}else {
	var t=b.find(".line:last");
	var v=b.find(".separatorLine:last");
	var q=v.is(":visible");
	var u=t.outerHeight();
	var r=q?v.outerHeight(true):0;
	if(f==0) {
	b.animate( {
	top:"+="+(u+r)
}
,c.showDuration*((u+r)/32),function() {
	v.insertBefore(b.find(".line").eq(f)).end().hide();
	if(q) {
	v.fadeIn(400)
}
t.insertBefore(b.find(".separatorLine").eq(f)).end().hide().fadeIn(400);
	b.css( {
	top:0
}
);
	e()})}else {
	v.insertBefore(b.find(".line").eq(f)).end().hide();
	if(q) {
	v.slideDown().css( {
	opacity:0
}
).animate( {
	opacity:1
}
)}t.insertBefore(b.find(".separatorLine").eq(f)).end().hide().slideDown().css( {
	opacity:0
}
).animate( {
	opacity:1
}
);
	e()}}}Fai.addTimeout(a,m,c.pauseDuration);
	Fai.startInterval(a)}function e() {
	i()
}
i()};
	Site.loadNewsList=function(d,c) {
	var b=$("#module"+d).find(".newsList");
	if(b.length==0) {
	return
}
var a= {
	};
	b.find(".lineBody").each(function() {
	var l=$(this);
	var n=l.find(".newsType");
	if(n.length!=0) {
	var p=n.find(">a");
	var q=0;
	$.each(p,function(s,r) {
	q+=$(r).outerWidth()+Fai.getCssInt($(r),"margin-right")
}
);
	var g=q+Fai.getCssInt(n,"padding-left")+Fai.getCssInt(n,"padding-right")+5;
	if(typeof a.nt=="undefined"||a.nt<g) {
	if(g>300) {
	g=300
}
a.nt=g}}var m=l.find(".newsTypePicList");
	if(m.length!=0) {
	var j=$(m).prevAll();
	var e=0;
	$.each(j,function(r,s) {
	if(!$(s).hasClass("articlePhotoBox")) {
	e+=$(s).outerHeight()
}
});
	var h=l.outerWidth()-l.find(".articlePhotoBox").outerWidth();
	$(m).css("width",h+"px");
	var f=l.find(".articlePhotoBox img").outerHeight()-e-$(m).outerHeight();
	f=(f<0?0:f);
	$(m).css("margin-top",f+"px")}var i=l.find(".newsCalendar");
	if(i.length!=0) {
	var k=i.find(">a").first().outerWidth();
	var o=k+Fai.getCssInt(i,"padding-left")+Fai.getCssInt(i,"padding-right")+5;
	if(typeof a.nc=="undefined"||a.nc<o) {
	a.nc=o
}
}});
	b.find(".lineBody").each(function() {
	var e=$(this);
	e.find(".newsTitle").css("width","100%");
	if(typeof a.nt!="undefined") {
	e.find(".newsType").css("width",a.nt+"px").css("text-overflow","ellipsis")
}
if(typeof a.nc!="undefined") {
	e.find(".newsCalendar").css("width",a.nc+"px")
}
if(e.find(".newsCalendar").width()<e.find(".newsCalendar>a").width()) {
	e.find(".newsCalendar").width(e.find(".newsCalendar>a").width())
}
});
	b.find(".word").css( {
	display:"block",width:"100%"
}
);
	if(Fai.isIE6()&&(b.find(".wWLine").length>0)) {
	b.find(".line").each(function() {
	$(this).height($(this).height())
}
);
	if(b.find(".g_topFlag").length>0) {
	b.find(".newsTitle a").each(function() {
	$(this).height($(this).height())
}
)}}b.find(".line").mouseover(function() {
	if(!$(this).hasClass("noHover")) {
	$(this).addClass("g_hover")
}
}).mouseleave(function() {
	if(!$(this).hasClass("noHover")) {
	$(this).removeClass("g_hover")
}
});
	b.find(".lineHeader").first().addClass("firstHeader")};
	Site.afterAddNews=function(a) {
	if(typeof(a)!="undefined") {
	document.location.reload()
}
};
	Site.newsAddComment=function() {
	if(_siteDemo) {
	Fai.ing("当前为“样板网站”，请先“复制网站”再进行评论。");
	return
}
var b=$.trim($("#commentCreator").val());
	var g=$("#commentCreator").attr("minlength");
	var f=$("#commentInput").val();
	var h=$("#commentInput").attr("minlength");
	var i=$("#validateCodeInput").val();
	var a=$("#commentInput").attr("newsId");
	var c=$("#submitTips").attr("isDefaultTips");
	if(typeof(c)=="string"&&c=="true") {
	$("#submitTips").show();
	return
}
if(typeof(b)!="string") {
	$("#submitTips").text(LS.creatorTips).show();
	return
}
if(typeof(f)!="string"||""==f) {
	$("#submitTips").text(LS.commentNotEmpty).show();
	return
}
if(f.length<h) {
	$("#submitTips").text(Fai.format(LS.commentLenTips,Fai.encodeHtml(h))).show();
	return
}
if(typeof(i)!="string"||""==i) {
	$("#submitTips").text(LS.memberInputCaptcha).show();
	return
}
var d= {
	validateCode:i,newsId:a,creator:b,comment:f
}
;var e="ajax/newsComment_h.jsp?cmd=submitComment";
	$("#submitTips").text(LS.siteFormSubmitIng).show();
	$.ajax( {
	type:"POST",url:e,data:d,error:function() {
	Fai.ing(LS.systemError,false);
	$("#msgBoardCaptchaImg").click()
}
,success:function(j) {
	var k=jQuery.parseJSON(j);
	if(!k||!k.success) {
	$("#msgBoardCaptchaImg").click()
}
Fai.removeBg();
	switch(k.msg) {
	case 1:$("#submitTips").text(LS.captchaError).show();
	break;
	case 2:$("#submitTips").text(LS.creatorError).show();
	break;
	case 3:$("#submitTips").text(LS.commentError).show();
	break;
	case 4:Fai.top.location.reload();
	$("#submitTips").text(LS.submitSuccess).show();
	break;
	case 5:$("#submitTips").text(LS.paramError).show();
	break;
	case 6:$("#submitTips").html(Fai.format(LS.commentOnlyMember,'<a href="login.jsp?url='+Fai.encodeUrl(window.location.href)+'">'+Fai.encodeHtml(LS.login)+"</a>")).show();
	break;
	case 7:$("#submitTips").text(LS.commentClosed).show();
	break;
	case 8:$("#submitTips").text(LS.commentSubmitError).show();
	break;
	case 9:$("#submitTips").text(LS.commentCountLimit).show();
	break;
	default:
}
}})};
	Site.showNewsQRCode=function(c,a) {
	var b=["<div id='newsQRCodeDisplay' class='webSiteQRCodeDisplay'>","<img title='' src='/qrCode.jsp?cmd=mobiDetailQR&id=",c,"&lcid=",a,"&t=1' >","<span>",LS.newsQRCodeMsg,"</span>","</div>"];
	Fai.top.$(b.join("")).appendTo("body");
	$("#newsQrCode").mouseenter(function(d) {
	$("#newsQRCodeDisplay").css("top",$(this).offset().top+"px");
	$("#newsQRCodeDisplay").css("left",($(this).offset().left+24)+"px");
	$("#newsQRCodeDisplay").show()
}
).mouseleave(function(d) {
	$("#newsQRCodeDisplay").hide()
}
)};
	Site.initMixNews=function(l) {
	var g=l.leader||0;
	var e=$("#module"+l.moduleId),b=e.find(".newsList"),i=b.parent();
	var d=b.find(".mixNewsStyleTitle");
	if(d.attr("mix")==1) {
	var a=b.find("td.newsTitle").width()||0;
	var f=b.find(".mixNewsStyleDate").width()||0;
	var k=b.find(".articlePhotoBox img").width()||0;
	var h=parseInt(a)-parseInt(f)-parseInt(k)-40;
	if(Fai.isIE6()) {
	h-=20
}
d.css( {
	width:h+"px"
}
);
	if(h<1) {
	d.addClass("mixNewsStyleTitle-hide")
}
else {
	d.removeClass("mixNewsStyleTitle-hide")
}
}if(Fai.isIE6()&&g!=0) {
	var j=b.find("td.newsTitle").height();
	b.find(".line").eq(0).css( {
	height:j+"px"
}
)}var c=Fai.top.$("#module"+l.moduleId);
	c.on("Fai_onModuleLayoutChange",function() {
	var p=$(this).find(".newsList");
	var t=p.parent();
	var s=p.find(".mixNewsStyleTitle");
	p.css( {
	height:"auto"
}
);
	t.css( {
	height:"auto"
}
);
	if(Fai.isIE6()&&g!=0) {
	var m=p.find("td.newsTitle").height();
	p.find(".line").eq(0).css( {
	height:m+"px"
}
)}if(p.find(".mixNewsStyleTitle").attr("mix")==1) {
	var r=p.find("td.newsTitle").width()||0;
	var o=p.find(".mixNewsStyleDate").width()||0;
	var n=p.find(".articlePhotoBox img").width()||0;
	var q=parseInt(r)-parseInt(o)-parseInt(n)-40;
	if(Fai.isIE6()) {
	q-=20
}
p.find(".mixNewsStyleTitle").css( {
	width:q+"px"
}
);
	if(q<1) {
	s.addClass("mixNewsStyleTitle-hide")
}
else {
	s.removeClass("mixNewsStyleTitle-hide")
}
}if(Fai.isIE6()&&g!=0) {
	var m=p.find("td.newsTitle").height();
	p.find(".line").eq(0).css( {
	height:m+"px"
}
)}})};
	Site.siteFormAdd=function(b,o,m,e,a) {
	if(_siteDemo) {
	Fai.ing("当前为“样板网站”，请先“复制网站”再进行提交。");
	return
}
var g=[];
	var n=m;
	var c=true;
	var j=100;
	var d=1000;
	var l=e;
	var k=$("#M"+b+"F"+o+"siteFormValidateCode");
	var h=k.val();
	var i=[];
	if(n.length>0) {
	$.each(n,function(y,u) {
	if(u.hide) {
	return true
}
var s=u.id;
	var p=u.name;
	var B=u.must;
	var z=u.type;
	var C=u.size;
	var w= {
	};
	w.id=s;
	if(z==0) {
	var t=$("#M"+b+"F"+o+"siteFormInput"+s).val();
	if(B&&t=="") {
	Site.siteFormShowMsg(Fai.format(LS.siteFormSubmitInputIsEmpty,Fai.encodeHtml(p)),o,b);
	c=false;
	return false
}
if(t.length>j) {
	Site.siteFormShowMsg(Fai.format(LS.siteFormSubmitInputMaxLength,Fai.encodeHtml(p),j),o,b);
	c=false;
	return false
}
w.val=t}else {
	if(z==1) {
	var r=$("#M"+b+"F"+o+"siteFormTextArea"+s).val();
	if(B&&r=="") {
	Site.siteFormShowMsg(Fai.format(LS.siteFormSubmitInputIsEmpty,Fai.encodeHtml(p)),o,b);
	c=false;
	return false
}
if(r.length>d) {
	Site.siteFormShowMsg(Fai.format(LS.siteFormSubmitInputMaxLength,Fai.encodeHtml(p),d),o,b);
	c=false;
	return false
}
w.val=r}else {
	if(z==2) {
	if(B&&$("input[name=M"+b+"F"+o+"siteFormRadioR"+s+"]:checked").length==0) {
	Site.siteFormShowMsg(Fai.format(LS.siteFormSubmitCheckIsEmpty,Fai.encodeHtml(p)),o,b);
	c=false;
	return false
}
if($("input[name=M"+b+"F"+o+"siteFormRadioR"+s+"]:checked").length>0) {
	w.val=$("input[name=M"+b+"F"+o+"siteFormRadioR"+s+"]:checked").first().val()
}
else {
	w.val=""
}
}else {
	if(z==3) {
	if(B&&$("input[name=M"+b+"F"+o+"siteFormCheckboxR"+s+"]:checked").length==0) {
	Site.siteFormShowMsg(Fai.format(LS.siteFormSubmitCheckIsEmpty,Fai.encodeHtml(p)),o,b);
	c=false;
	return false
}
var x=[];
	$("input[name=M"+b+"F"+o+"siteFormCheckboxR"+s+"]:checked").each(function(D,E) {
	x.push($(this).val())
}
);
	w.val=x.join("\n")}else {
	if(z==4) {
	if(B&&($("#M"+b+"F"+o+"siteFormSelect"+s+" option:selected").length==0||$("#M"+b+"F"+o+"siteFormSelect"+s+" option:selected").val()=="none")) {
	Site.siteFormShowMsg(Fai.format(LS.siteFormSubmitCheckIsEmpty,Fai.encodeHtml(p)),o,b);
	c=false;
	return false
}
var A=[];
	$("#M"+b+"F"+o+"siteFormSelect"+s+" option:selected").each(function(D,E) {
	A.push($(this).val())
}
);
	w.val=A.join("\n")}else {
	if(z==5) {
	return true
}
else {
	if(z==6) {
	var t=$("#M"+b+"F"+o+"siteFormInput"+s).val();
	if(B&&t=="") {
	Site.siteFormShowMsg(Fai.format(LS.siteFormSubmitCheckIsEmpty,Fai.encodeHtml(p)),o,b);
	c=false;
	return false
}
w.val=t}else {
	if(z==7) {
	var q=$("#module"+b).find("#siteForm"+b+"fileName"+s);
	var v= {
	};
	if(B&&q.attr("_tmpFileId")=="") {
	Site.siteFormShowMsg(Fai.format(LS.siteFormSubmitCheckHasFileUpload,Fai.encodeHtml(p)),o,b);
	c=false;
	return false
}
if(q.attr("_tmpFileId")=="") {
	w.val=""
}
else {
	w.val=q.attr("_fileId");
	v.tmpFileName=q.attr("_tmpFileName");
	v.fileId=w.val;
	v.tmpFileId=q.attr("_tmpFileId");
	i.push(v)
}
}}}}}}}}g.push(w)})}if(!c) {
	return false
}
if(l&&h=="") {
	Site.siteFormShowMsg(Fai.format(LS.siteFormSubmitInputIsEmpty,k.attr("msg")),o,b);
	c=false;
	return false
}
var f="&submitContentList="+Fai.encodeUrl($.toJSON(g));
	Site.siteFormShowMsg(LS.siteFormSubmitIng,o,b);
	$.ajax( {
	type:"post",url:"ajax/siteForm_h.jsp",data:"cmd=addSubmit&formId="+o+"&submitContentList="+Fai.encodeUrl($.toJSON(g))+"&vCodeId="+b+o+"&validateCode="+h+"&tmpFileList="+Fai.encodeUrl($.toJSON(i)),error:function() {
	Site.siteFormShowMsg(LS.systemError,o,b)
}
,success:function(p) {
	p=$.parseJSON(p);
	if(p.success) {
	Site.siteFormShowMsg(Fai.format(LS.siteFormSubmitOk),o,b);
	setTimeout(function() {
	Fai.top.$("#siteFormMsgM"+b+"F"+o).hide()
}
,1000);
	Site.siteFormValidation(o,b);
	Fai.top.$("#module"+b+" .siteForm input[type=text]").val("");
	Fai.top.$("#module"+b+" .siteForm textarea").val("");
	Fai.top.$("#module"+b+" .siteForm input[type=radio]").each(function() {
	$(this)[0].checked=false
}
);
	Fai.top.$("#module"+b+" .siteForm input[type=checkbox]").each(function() {
	$(this)[0].checked=false
}
);
	if(Fai.top.$("#module"+b+" .siteForm select")[0]!=undefined) {
	Fai.top.$("#module"+b+" .siteForm select")[0].selectedIndex=0
}
Fai.top.$("#module"+b).find(".siteFormFileName").html(LS.siteFormSubmitNotSeletcFile);
	Fai.top.$("#module"+b).find(".siteFormFileName").removeAttr("_tmpFileId").removeAttr("_tmpFileName").removeAttr("title").removeAttr("_fileId")}else {
	if(p.rt==-4) {
	Site.siteFormShowMsg(LS.siteFormSubmitCountLimit,o,b)
}
else {
	if(p.rt==-7) {
	Site.siteFormShowMsg(LS.siteImgFull,o,b)
}
else {
	if(p.rt==-401) {
	Site.siteFormShowMsg(LS.siteFormSubmitValidateCodeErr,o,b);
	$("#M"+b+"F"+o+"siteFormValidateCode").val("");
	Site.siteFormValidation(o,b)
}
else {
	Site.siteFormShowMsg(p.msg,o,b)
}
}}}}})};
	Site.siteFormNotLogin=function(d,c) {
	var b=Fai.encodeUrl(Fai.top.location.href);
	var a=LS.siteFormSubmitNotLogin+"<a href='login.jsp?url="+b+"'>"+LS.login+"</a>"+LS.period;
	Site.siteFormShowMsg(a,d,c)
}
;Site.siteFormShowMsg=function(c,b,a) {
	Fai.top.$("#siteFormMsgM"+a+"F"+b).show();
	Fai.top.$("#siteFormMsgM"+a+"F"+b).html(c)
}
;Site.siteFormTimeBtn=function() {
	$(".siteFormTimer6").each(function(b,c) {
	var a=parseInt($.format.date(new Date(),"yyyy"))+10;
	a="1900:"+a;
	$(c).on("mousedown",function() {
	$(this).datepicker( {
	dateFormat:"yy-mm-dd",changeYear:true,changeMonth:true,showButtonPanel:true,yearRange:a,onSelect:function() {
	$(this).addClass("timeButtonInputChange")
}
})})})};
	Site.siteFormValidation=function(b,a) {
	$("#M"+a+"F"+b+"validateCodeImg").attr("src","validateCode.jsp?"+parseInt(Math.random()*1000)+"&vCodeId="+a+b)
}
;Site.siteFormFileUpload=function(c,g,f,b,a,d,e) {
	var i=$("#siteForm"+b+"fileUpload"+g).parent().width()*0.31;
	if(e) {
	if($("#siteForm"+b+"fileUpload"+g).parent().width()*0.31<111) {
	i=111
}
else {
	if($("#siteForm"+b+"fileUpload"+g).parent().width()*0.31>161) {
	i=161
}
}}var h= {
	file_post_name:"Filedata",upload_url:"/static/web/ajax/upsiteimg_h.jsp",button_placeholder_id:"siteForm"+b+"fileUpload"+g,file_size_limit:c+"MB",button_image_type:e?5:3,file_queue_limit:1,requeue_on_error:false,button_height:e?"34":"22",button_width:e?(i-2):"71",button_text:e?"<span class='fk_btText'>"+d+"</span>":"",button_text_style:e?".fk_btText {
	text-align:center;
	font-family:微软雅黑;
	color:#666666;
}
":"",button_text_top_padding:e?8:"",post_params: {
	ctrl:"Filedata",app:21,type:0,isSiteForm:true
}
,file_types:a.join(""),file_dialog_complete_handler:function(j) {
	this._allSuccess=false;
	this.startUpload()
}
,file_queue_error_handler:function(k,j,l) {
	switch(j) {
	case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:Fai.ing(LS.siteFormSubmitCheckFileSizeErr,true);
	break;
	case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:Fai.ing("不允许的文件类型",true);
	break;
	case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:Fai.ing("一次只能上传一个文件",true);
	break;
	default:Fai.ing("请重新选择文件上传。",true);
	break
}
},upload_success_handler:function(k,j) {
	var l=jQuery.parseJSON(j);
	this._allSuccess=l.success;
	this._sysResult=l.msg;
	if(l.success) {
	Fai.ing(Fai.format(LS.siteFormSubmitFileUploadSucess,Fai.encodeHtml(k.name)),true);
	onFileUploadEvent("upload",l,b,g)
}
else {
	Fai.ing("文件"+k.name+"，"+l.msg)
}
},upload_error_handler:function(k,j,l) {
	if(j==-280) {
	Fai.ing("文件取消成功",false)
}
else {
	if(j==-270) {
	Fai.ing("已经存在名称为"+k.name+"的文件。",true)
}
else {
	Fai.ing("服务繁忙，文件"+k.name+"上传失败，请稍候重试。")
}
}},upload_complete_handler:function(j) {
	if(j.filestatus==SWFUpload.FILE_STATUS.COMPLETE) {
	setTimeout(function() {
	swfObj.startUpload()
}
,swfObj.upload_delay)}else {
	if(j.filestatus==SWFUpload.FILE_STATUS.ERROR) {
	Fai.ing("服务繁忙，文件"+j.name+"上传失败，请稍候重试。")
}
}},upload_start_handler:function(j) {
	Fai.enablePopupWindowBtn(0,"save",false);
	Fai.ing("读取文件准备上传",false)
}
,view_progress:function(j,m,l,k) {
	Fai.ing("正在上传"+k+"%",false)
}
};
	swfObj=SWFUploadCreator.create(h);
	onFileUploadEvent=function(w,t,x,q) {
	if(w=="upload") {
	var n=t.id;
	var v=t.name;
	var l=t.type;
	var s=t.size;
	var r=t.path;
	var m=t.createTime;
	var j=t.groupId;
	var o="";
	var k=100;
	var u=100;
	var p=t.fileId;
	$("#module"+x).find("#siteForm"+x+"fileName"+q).html(v);
	$("#module"+x).find("#siteForm"+x+"fileName"+q).attr("_tmpFileId",n).attr("_tmpFileName",v).attr("title",v).attr("_fileId",p)
}
}};
	Site.fixSiteFormStyle=function(d,c,f) {
	Fai.top.$(".siteFormItem_N_U").find(".F"+d+"siteFormItemShowVal").find("textarea").next().css( {
	height:"100px","float":"none"
}
);
	Fai.top.$(".siteFormItem_N_U").find(".F"+d+"siteFormItemShowVal").find("textarea").parent().css( {
	height:"102px"
}
);
	if(Fai.top.$("#module"+c+"").find(".siteFormAddButton").find("#buttonStyle").find(".middle").width()>241) {
	Fai.top.$("#module"+c+"").find(".siteFormAddButton").find("#buttonStyle").find(".middle").css( {
	width:"240px"
}
)}$(Fai.top.$(".siteFormItem_N_U").find("select")).each(function() {
	$($(this).find("option")[0]).hide()
}
);
	if($(Fai.top.$("#module"+c+"").find(".siteFormItem_N_U").find(".siteFormItemCheckItem_N_U_F")).length>0) {
	var e=Fai.top.$("#module"+c+"").find(".siteFormItemCheckItem_N_U_F").width();
	var b=(e/f-10)+"px";
	var a=(e/f-27)+"px";
	Fai.top.$("#module"+c+"").find(".siteFormRadioFix").css( {
	width:b
}
);
	Fai.top.$("#module"+c+"").find(".siteFormRadioCententFix").css( {
	width:a
}
)}};
	Site.addFlashModuleFlash=function(a) {
	var c="Opaque";
	if(a.transparent!=1) {
	c="transparent"
}
var b=['<embed id="'+a.moduleId+'" width="'+a.width+'" height="'+a.height+'" allowscriptaccess="'+a.allowScriptAccess+'" style="visibility:visible;
	" pluginspage="http://get.adobe.com/cn/flashplayer/" flashvars="playMovie=true&amp;
	auto=1" allowfullscreen="true" quality="hight" src="'+a.path+'" type="application/x-shockwave-flash" wmode="'+c+'"></embed>'];
	$("#flashModuleFlash"+a.moduleId).append(b.join(""))};
	Site.noticeMarquee=function(f,x) {
	var w= {
	direction:"up",speed:"normal",loop:"infinite",moveout:false,isScrolling:false
}
;$.extend(w,f);
	if(w.speed=="normal") {
	$.extend(w {
	speed:28
}
)}else {
	if(w.speed=="slow") {
	$.extend(w {
	speed:60
}
)}else {
	$.extend(w {
	speed:13
}
)}}$("#noticeMarquee"+w.id).data("options",f);
	var m=w.id,u=$("#noticeMarquee"+m),h=u.outerHeight(true),g=u.outerWidth(true),p=u.children().width(),c=$("#noticeContainer"+m),d=c.outerWidth(),l=(p>d)?p:d;
	if(x!=null) {
	var k=$("#noticeMarquee"+x).width();
	k=k?k:0;
	g=k;
	l=(g>d)?g:d;
	Fai.stopInterval("rm"+x);
	$("#noticeMarqueeCopy"+x).remove();
	$(u).appendTo($("#noticeContainer"+x));
	$("#noticeMarqueeNewParent"+x).remove()
}
var B=w.direction,z=0,j="left",r=w.speed,A=(w.loop!="infinite"||w.loop<=0)?1:w.loop,n=w.moveout,C=w.isScrolling,v=w.noticeType,y=20,t=$("<div id='noticeMarqueeCopy"+m+"' class='noticeMarquee' style='overflow:hidden;
	width:"+l+"px;
	' ></div>");
	var i="<div id='noticeMarqueeNewParent"+m+"' style='position:relative;
	overflow:hidden;
	width:"+l*2+";
	";if(v!=4) {
	i+="left:23px;
	'></div>"
}
else {
	i+="'></div>"
}
var o=$(i);
	function q() {
	o.appendTo(u.parent());
	u.appendTo(o);
	t.appendTo(o);
	if(!C&&!n) {
	}else {
	$(u.html()).appendTo(t)
}
if(B=="left") {
	z=h;
	j="left"
}
else {
	z=0-l;
	if(C&&!n) {
	z=0
}
if(C&&n) {
	z=-l
}
j="left"}if(n) {
	u.css(j,0)
}
else {
	u.css(j,z)
}
if(B=="left"||B=="right") {
	u.css("top",0)
}
$("#module"+m+" .noticeContainer").mouseover(function() {
	Fai.stopInterval("rm"+m)
}
).mouseout(function() {
	if(A=="infinite"||A>0) {
	Fai.startInterval("rm"+m)
}
});
	e();
	a(B)}function b() {
	var D=u.find("img");
	if(D.length>0) {
	var F=D[0].width;
	for(var E=0;
	E<D.length;
	E++) {
	if(F<D[E].width) {
	F=D[E].width
}
}return F}return 0}function e() {
	var D=u.find("img");
	$(D).load(function() {
	var E=u.height();
	if(h!=E) {
	h=E;
	a(B)
}
})}function a(D) {
	if(D=="left"||D=="right") {
	o.css("position","relative");
	o.css("width",l);
	t.css("top",0);
	if(D=="left") {
	t.css("margin-left",y);
	if(C&&!n) {
	u.css("left",l);
	t.css("left",l*2)
}
if(C&&n) {
	t.css("left",l)
}
if(!C&&!n) {
	u.css("left",g);
	t.css("left",l+g)
}
if(!C&&n) {
	t.css("left",l+g)
}
}else {
	t.css("left",0);
	u.css("margin-left",y);
	u.css("width",(l)+"px");
	if(C&&!n) {
	u.css("padding-left",l);
	u.css("padding-right",l);
	o.scrollLeft(l*2+y)
}
if(C&&n) {
	u.css("padding-left",l);
	o.scrollLeft(l*2)
}
if(!C&&!n) {
	u.css("padding-right",l+g);
	u.css("padding-left",l+g);
	o.scrollLeft(l+g+y)
}
if(!C&&n) {
	u.css("padding-right",l+g);
	u.css("padding-left",l+g);
	o.scrollLeft(l+g+y)
}
}}}function s() {
	if(B=="left") {
	var D=o.scrollLeft();
	D++;
	if(C&&!n) {
	if(D==l*2+y) {
	o.scrollLeft(l)
}
else {
	o.scrollLeft(D)
}
}if(C&&n) {
	if(D==l+y) {
	o.scrollLeft(0)
}
else {
	o.scrollLeft(D)
}
}if(!C&&!n) {
	if(D==(l+g)+y) {
	o.scrollLeft(0)
}
else {
	o.scrollLeft(D)
}
}if(!C&&n) {
	if(D==l+g+y) {
	o.scrollLeft(0)
}
else {
	o.scrollLeft(D)
}
}}else {
	if(B=="right") {
	var D=o.scrollLeft();
	D--;
	if(C&&!n) {
	if(D==-1) {
	o.scrollLeft(l+y)
}
else {
	o.scrollLeft(D)
}
}if(C&&n) {
	if(D==-1) {
	o.scrollLeft(l+y)
}
else {
	o.scrollLeft(D)
}
}if(!C&&!n) {
	if(D==-1) {
	o.scrollLeft(l+g+y)
}
else {
	o.scrollLeft(D)
}
}if(!C&&n) {
	if(D==-1) {
	o.scrollLeft(l+g+y)
}
else {
	o.scrollLeft(D)
}
}}}}if(f!=null) {
	q();
	Fai.addInterval("rm"+m,s,r);
	Fai.startInterval("rm"+m)
}
};
	Site.saveNoticeMarqueeProps=function(a) {
	if(a!=null) {
	$("#noticeMarquee"+a.id).data("options",a)
}
$("#module"+a.id).on("Fai_onModuleSizeChange",function() {
	Site.noticeMarquee($("#noticeMarquee"+a.id).data("options"),a.id)
}
);
	$("#module"+a.id).on("Fai_onModulePositionChange",function() {
	Site.noticeMarquee($("#noticeMarquee"+a.id).data("options"),a.id)
}
)};
	Site.noticeMarqueeUpDown=function(c) {
	var b= {
	direction:"top",speed:"normal",stopTime:1000
}
;$.extend(b,c);
	if("fast"===b.speed) {
	$.extend(b {
	speed:500
}
)}else {
	if("slow"===b.speed) {
	$.extend(b {
	speed:1100
}
)}else {
	$.extend(b {
	speed:850
}
)}}var g=$("#noticeScrollbar"+b.id+" li");
	if(g.length==1) {
	var f=$(g.get(0));
	var a="<li class='scrollbarLi'>"+f.html()+"</li>";
	$(a).insertAfter(f)
}
$("#noticeScrollbar"+b.id).marquee( {
	yScroll:b.direction,showSpeed:b.speed,pauseSpeed:b.stopTime,hoverChange:false
}
);
	var e=$("#module"+b.id+" .formMiddleContent");
	e.css("overflow","hidden");
	e.css("width","98%");
	var d=$("#module"+b.id+" .formMiddleCenter");
	d.css("overflow","hidden")};
	Site.noticeUpDownSizeChange=function(d) {
	var b=$("#noticeMarquee"+d),a=b.height(),c=b.children().children();
	$.each(c,function(e,f) {
	$(f).css("top",-(a+2)+"px")
}
);
	$("#noticeScrollbar"+d).removeData("_innerHeight")};
	Site.setSerTextOverflow=function(d) {
	var c=$("#serOnline-container"+d);
	var e=c.find(".serOnline-service").children(".serOnline-list-h");
	var a=c.find(".serOnline-contact").children(".serOnline-list-h");
	var b=c.outerWidth(),f=c.outerHeight();
	Site.setSerListCSS(e,b);
	Site.setSerListCSS(a,b)
}
;Site.setSerListCSS=function(a,d) {
	var c,f,e,b;
	$.each(a,function(h,g) {
	c=$(g).outerWidth();
	if(c>d-3) {
	if(f!=null&&f<d-3) {
	$('<div style="clear:both;
	"></div>').insertAfter($(g).prev())
}
b=$(g).outerWidth();
	$(g).css("white-space","normal");
	$(g).css("word-break","break-all");
	e=true}f=e?b:$(g).outerWidth();
	e=false})};
	Site.initCustomIframe=function(d) {
	var f=Fai.top.$("#iframe"+d);
	var b=f.attr("width");
	var c=f.attr("height");
	var a=f.attr("src");
	var e="<iframe id='iframe"+d+"' frameborder='0' height='"+c+"' width='"+b+"' src='"+a+"'></iframe>";
	f.replaceWith(e)
}
;Site.initModuleWeiboShow=function(b,e,a,d) {
	var h=Fai.top.$("#wbShowFrame"+e);
	var g=h.attr("width");
	var f=h.attr("height");
	var i="<iframe id='wbShowFrame"+e+"' name='wbShowFrame' frameborder='0' scrolling='no' height='"+f+"' width='"+g+"' src='about:blank'></iframe>";
	h.replaceWith(i);
	var c=Fai.top.$("#wbShowFrame"+e).parent().width();
	var j=a+c+"&ran="+Math.random();
	Site.initIframeLoading(b,e,j,d);
	$("#refreshChlid"+e).css("padding-top","40%")
}
;Site.initLocaler=function(b,a) {
	if(typeof Fai.top._localerJsonTmp=="undefined") {
	Fai.top._localerJsonTmp=b
}
if(a) {
	Site.initLocalerManage(b)
}
else {
	Site.initLocalerSite()
}
Site.checkLocalerItemWidthForIE();
	Site.bindLocalerItemEvent()};
	Site.initLocaleStyle=function(b) {
	var a=$("#webTop").width();
	if(b>a) {
	$("#localer").css("left","auto");
	$("#localer").css("right",a-b-$("#localer").width()+"px")
}
else {
	$("#localer").css("left",b);
	$("#localer").css("right","auto")
}
};
	Site.initLocalerSite=function() {
	$("#localer").bind("mouseenter",function() {
	Site.openLocalerList()
}
).bind("mouseleave",function() {
	Site.closeLocalerList(this)
}
)};
	Site.openLocalerList=function() {
	var b=parseInt($("#localer").attr("_moduleStyle"));
	if(b>=1&&b<=3) {
	return
}
var a=$("#localer").find(".J_localerList").height();
	if(Fai.isIE()) {
	$("#localer").find(".J_localerPanel").stop().animate( {
	height:a
}
 {
	duration:200
}
)}else {
	$("#localer").find(".J_localerPanel").css("height",a+"px")
}
$("#localer").find(".J_localerPanel .J_localerList .first .arrow").addClass("arrow_hover")};
	Site.closeLocalerList=function(c) {
	var b=parseInt($("#localer").attr("_moduleStyle"));
	if(b>=1&&b<=3) {
	return
}
var a=$("#localer").find(".J_localerPanel .J_localerList .first").height();
	if(Fai.isIE()) {
	$("#localer").find(".J_localerPanel").stop().animate( {
	height:a
}
 {
	duration:200
}
)}else {
	$("#localer").find(".J_localerPanel").css("height",a+"px")
}
$("#localer").find(".J_localerPanel .J_localerList .first .arrow").removeClass("arrow_hover")};
	Site.bindLocalerItemEvent=function() {
	$("#localer").find(".J_localerPanel .J_localerList .localerItemContent").bind("mouseenter",function() {
	if($(this).hasClass("first")) {
	return
}
$(this).addClass("localerItemContent_hover")}).bind("mouseleave",function() {
	if($(this).hasClass("first")) {
	return
}
$(this).removeClass("localerItemContent_hover")})};
	Site.checkLocalerItemWidthForIE=function() {
	Fai.top.$("#localer").find(".localerItemContent").removeAttr("style");
	var b=parseInt(Fai.top.$("#localer").attr("_moduleStyle"));
	if((Fai.isIE6()||Fai.isIE7())&&(b>=4&&b<=9)) {
	var c=Fai.top.$("#localer").find(".J_localerPanel").width();
	Fai.top.$("#localer").find(".localerItemContent").css("width",c+"px")
}
if((Fai.isIE6())&&(b>=1&&b<=3)) {
	var a=Fai.top.$("#localer").find(".J_localerPanel").height();
	Fai.top.$("#localer").find(".J_localerPanel").css("line-height",a+"px")
}
};
	Site.initFloatImg=function(a) {
	Site.hoverChangeImage()
}
;Site.initForms=function() {
	$(".form").each(function() {
	var a=$(this);
	var b=a.attr("id");
	if(b) {
	b=b.replace("module","");
	if(a.attr("_autoHeight")!="1") {
	Site.setModuleHeight2(b,a.height())
}
else {
	if(a.hasClass("formStyle29")) {
	Site.setModuleHeight2(b,a.height())
}
}}})};
	Site.setModuleHeight2=function(m,l) {
	var b=Fai.top.$("#module"+m);
	b.css("height",l+"px");
	if(b.hasClass("formStyle80")) {
	return
}
var g=b.find(".formTop"+m);
	var k=b.find(".formBanner"+m);
	var j=b.find(".formMiddle"+m);
	var q=b.find(".formBottom"+m);
	var a=g.is(":visible")?g.outerHeight(true):0;
	var f=k.is(":visible")?k.outerHeight(true):0;
	var r=q.is(":visible")?q.outerHeight(true):0;
	var s=l-a-f-r-Fai.getFrameHeight(j);
	j.css("height",s+"px");
	var n=j.find(".formMiddleCenter"+m);
	s=s-Fai.getFrameHeight(n);
	var o=j.find(".formMiddleContent"+m);
	s=s-Fai.getFrameHeight(o);
	if(!b.hasClass("formStyle81")&&!b.hasClass("formStyle82")) {
	o.css("height",s+"px");
	o.css("overflow-y","hidden")
}
if(b.hasClass("formStyle29")) {
	var p=b.find(".titleTable"),i=b.find(".formTabButtonList");
	if(p.length==1) {
	var h=p.outerHeight(true);
	if(b.find(".formTabDirectionY").length>0) {
	h=i.outerHeight(true)
}
var c=b.find(".formTabContent"+m);
	var e=s-h-Fai.getCssInt(c,"border-top-width")-Fai.getCssInt(c,"border-bottom-width");
	if(Fai.isIE6()) {
	e+=1
}
c.css("height",e+"px");
	var d=b.find(".formTabCntId");
	d.css("height",e+"px")}}if(b.hasClass("formStyle79")) {
	b.find("#float_img_"+m).css("height",s+"px")
}
};
	Site.refreshForms=function() {
	Site.refreshFormIndexClass();
	Site.displayAddModule();
	Fai.top.Fai.delayLoadImg(20)
}
;Site.displayAddModule=function() {
	if(!Fai.top._designAuth) {
	return
}
Site.addAddModuleButton(1);
	Site.addAddModuleButton(2);
	Site.addAddModuleButton(3);
	Site.addAddModuleButton(4);
	Site.addAddModuleButton(5);
	Site.addAddModuleButton(6);
	Site.addAddModuleButton(7);
	Site.addAddModuleButton(8);
	Site.addAddModuleButton(10);
	Site.addAddModuleButton(11);
	Site.addAddModuleButton(12);
	Site.addAddModuleButton(13);
	Site.addAddModuleButton(20);
	Site.addAddModuleButton(22);
	Site.addAddModuleButton(23);
	Site.addAddModuleButton(24);
	Site.addAddModuleButton(25)};
	Site.checkFloatModulePosition=function(a) {
	var e=a.parent().attr("id");
	var f=a.offset().top;
	f=f-Fai.top.$("body").scrollTop();
	var b=a.offset().left;
	var g=a.height();
	var j=f+g;
	if(e=="floatLeftBottomForms"||e=="floatRightBottomForms") {
	var i=0;
	var c=Fai.top.Fai.getBrowserHeight()-i;
	if(j>c) {
	var d=c-g;
	a.offset( {
	left:b,top:f-i
}
);
	a.offset( {
	left:b,top:d
}
)}var h=Fai.top.$("#web").offset().top;
	if(j<h) {
	a.offset( {
	top:h+Fai.top.Fai.getBrowserHeight()/2
}
)}if(f<h) {
	a.offset( {
	top:h+Fai.top.Fai.getBrowserHeight()/2
}
)}}else {
	if(e=="floatLeftTopForms"||e=="floatRightTopForms") {
	var h=Fai.top.$("#web").offset().top;
	if(h<0) {
	h=0
}
if(f>(h+Fai.top.Fai.getBrowserHeight())) {
	a.offset( {
	top:h+Fai.top.Fai.getBrowserHeight()/2-g
}
)}if(j<h) {
	a.offset( {
	top:h
}
)}if(f<h) {
	a.offset( {
	top:h
}
)}}}};
	Site.closeAd=function(a) {
	$("#"+a).data("top",$("#"+a).position().top);
	$("#"+a).data("left",$("#"+a).position().left);
	$("#"+a).hide()
}
;Site.checkSideModule=function(a) {
	Site.reSetSidePosition(a)
}
;Site.reSetSidePosition=function(b) {
	var g=b.attr("id");
	var q=b.offset().top;
	var k=Fai.top.Fai.getBrowserWidth();
	var a=Fai.top.Fai.getBrowserHeight();
	var j=b.outerWidth();
	var r=b.height();
	var t=Fai.getCssInt(b,"border-left-width");
	var n=b.parent().attr("id");
	var c=b.attr("_side");
	var e=0;
	var f=[];
	var o=Fai.top.$("#"+g+"SideBtn");
	o.remove();
	var i=b.find(".titleText").first().text();
	if(c==1) {
	if(n=="floatLeftTopForms"||n=="floatLeftBottomForms") {
	b.offset( {
	top:q,left:0
}
);
	e=1;
	f=["<div id='"+g+"SideBtn' class='g_sideBtn'><div class='g_sideBtn_t g_sB_lt'></div><div class='g_sideBtn_c g_sB_lc'><span class='g_sideBtn_tl'>"+i+"</span></div><div class='g_sideBtn_b g_sB_lb'></div><div class='g_sideBtn_extend g_sB_le'></div></div>"];
	b.animate( {
	left:-j
}
 {
	queue:false,duration:0
}
);
	b.off("mouseenter.sideModule").on("mouseenter.sideModule",Site.bindSideIn1);
	b.off("mouseleave.sideModule").on("mouseleave.sideModule",Site.bindSideOut1)}else {
	if(n=="floatRightTopForms"||n=="floatRightBottomForms") {
	b.offset( {
	top:q,left:k-j
}
);
	e=0;
	f=["<div id='"+g+"SideBtn' class='g_sideBtn'><div class='g_sideBtn_t g_sB_rt'></div><div class='g_sideBtn_c g_sB_rc'><span class='g_sideBtn_tl'>"+i+"</span></div><div class='g_sideBtn_b g_sB_rb'></div><div class='g_sideBtn_extend g_sB_re'></div></div>"];
	b.animate( {
	left:0
}
 {
	queue:false,duration:0
}
);
	b.off("mouseenter.sideModule").on("mouseenter.sideModule",Site.bindSideIn2);
	b.off("mouseleave.sideModule").on("mouseleave.sideModule",Site.bindSideOut2)}else {
	b.attr("_side",0)
}
}b.css("overflow","visible")}b.append(f.join(""));
	var h=Fai.top.$("#"+g+"SideBtn");
	if(h.length>0) {
	var p=h.width();
	var d=h.height();
	var m=parseInt((r-d)/2);
	if(e==0) {
	h.css( {
	top:m,left:-p-t
}
)}else {
	h.css( {
	top:m,left:j-t
}
)}var l=h.position().top;
	var s=h.position().top+d;
	if(c==1) {
	if(n=="floatLeftTopForms"||n=="floatRightTopForms") {
	if(s<=0) {
	h.css( {
	top:r-d
}
)}}else {
	if(n=="floatLeftBottomForms"||n=="floatRightBottomForms") {
	if((l-a)>=0) {
	h.css( {
	top:0
}
)}}}}}};
	Site.checkFlutterModule=function(b) {
	var a=b.attr("_side");
	if(a==2) {
	Site.flutterStart(b)
}
};
	var flutterCount=1000;
	Site.flutterInternel=function(d) {
	var i=d.attr("_flutterSwitch");
	if(i=="true") {
	Site.stopFlutterInterval(d)
}
var m=1;
	var b=document.body.scrollTop;
	var g=document.body.scrollLeft;
	if(Fai.isIE8()||Fai.isIE7()||Fai.isIE10()||Fai.isIE9()||Fai.isIE11()) {
	b=document.documentElement.scrollTop
}
var a=$("#g_main").offset().top+b;
	var e=0+g;
	var c=document.documentElement.clientWidth-d.width()+g;
	var h=document.documentElement.clientHeight-d.height()+b;
	if(Fai.isIE6()) {
	c=document.body.clientWidth-d.width()
}
var l=d.data("flutterXPos");
	var f=d.data("flutterYPos");
	d.offset( {
	left:l,top:f
}
);
	var k=d.data("flutterXPos")+m*(d.data("flutterXon")?1:-1);
	d.data("flutterXPos",k);
	if(d.data("flutterXPos")<=e) {
	d.data("flutterXon",true);
	d.data("flutterXPos",e)
}
if(d.data("flutterXPos")>=c) {
	d.data("flutterXon",false);
	d.data("flutterXPos",c)
}
var j=d.data("flutterYPos")+m*(d.data("flutterYon")?1:-1);
	d.data("flutterYPos",j);
	if(d.data("flutterYPos")<=a) {
	d.data("flutterYon",true);
	d.data("flutterYPos",a)
}
if(d.data("flutterYPos")>=h) {
	d.data("flutterYon",false);
	d.data("flutterYPos",h)
}
};
	Site.stopFlutterInterval=function(a) {
	Fai.stopInterval("flutter"+a.attr("id"))
}
;Site.startFlutterInterval=function(b) {
	var a=b.attr("_side");
	if(a!=2) {
	return
}
if(b.attr("_edit")=="true") {
	return
}
Site.stopFlutterInterval(b);
	var d=function() {
	var f=b.attr("_side");
	var g=b.attr("_flutterSwitch");
	if(f==2) {
	Site.flutterInternel(b)
}
else {
	Site.stopFlutterInterval(b)
}
};
	var e=10;
	var c="flutter"+b.attr("id");
	Fai.addInterval(c,d,e);
	Fai.startInterval(c)};
	Site.flutterStart=function(b,a) {
	var g=0;
	var f=document.body.scrollLeft;
	if(Fai.isIE6()) {
	rightBoundary=document.body.clientWidth-b.width()
}
else {
	rightBoundary=document.documentElement.clientWidth-b.width()+f
}
if(b.offset().left>rightBoundary) {
	b.offset( {
	left:rightBoundary-b.outerWidth()
}
)}var h=b.position().left;
	var c=b.position().top;
	var i=b.data("toFlutterFlag");
	var k=b.attr("_flutterSwitch");
	if(!i) {
	b.data("startFlutterXPos",h);
	b.data("startFlutterYPos",c)
}
else {
	var j=b.data("startFlutterXPos");
	var d=b.data("startFlutterYPos");
	if(!j&&!d) {
	b.data("startFlutterXPos",h);
	b.data("startFlutterYPos",c)
}
}var l=b.data("startFlutterParentId");
	if(!l) {
	b.data("startFlutterParentId",b.parent().attr("id"))
}
b.data("flutterXPos",b.offset().left);
	b.data("flutterYPos",b.offset().top);
	b.data("flutterXon",true);
	b.data("flutterYon",true);
	var e=b.attr("_side");
	if(_manageMode==true&&e==2&&!a) {
	b.attr("_flutterSwitch",true)
}
var k=b.attr("_flutterSwitch");
	if(k=="false"||!k) {
	Site.startFlutterInterval(b)
}
b.on("mouseenter",function() {
	Site.stopFlutterInterval($(this))
}
);
	b.on("mouseleave",function() {
	var m=$(this).attr("_flutterSwitch");
	if(m=="false"||!m) {
	Site.startFlutterInterval($(this))
}
})};
	Site.bindSideIn1=function(b) {
	var b=$(this);
	var c=b.attr("_side");
	var a=b.outerWidth();
	var d=b.parent().attr("id");
	if(Fai.top._manageMode) {
	Site.disableEditLayer();
	b.animate( {
	left:0
}
 {
	queue:false,duration:500,complete:function() {
	Site.enableEditLayer();
	if(c==1) {
	b.unbind("mouseenter.sideModule",Site.bindSideIn1).unbind("mouseleave.sideModule",Site.bindSideOut1).unbind("mouseenter.sideModule",Site.bindSideIn2).unbind("mouseleave.sideModule",Site.bindSideOut2)
}
}})}else {
	b.animate( {
	left:0
}
 {
	queue:false,duration:500
}
)}$(b).find("img").trigger("appear")};
	Site.bindSideIn2=function(b) {
	var b=$(this);
	var c=b.attr("_side");
	var a=b.outerWidth();
	var d=b.parent().attr("id");
	b.find("img").trigger("appear");
	if(Fai.top._manageMode) {
	Site.disableEditLayer();
	b.animate( {
	left:-a
}
 {
	queue:false,duration:500,complete:function() {
	Site.enableEditLayer();
	if(c==1) {
	b.unbind("mouseenter.sideModule",Site.bindSideIn1).unbind("mouseleave.sideModule",Site.bindSideOut1).unbind("mouseenter.sideModule",Site.bindSideIn2).unbind("mouseleave.sideModule",Site.bindSideOut2)
}
}})}else {
	b.animate( {
	left:-a
}
 {
	queue:false,duration:500
}
)}};
	Site.bindSideOut1=function(b) {
	var b=$(this);
	var c=b.attr("_side");
	var a=b.outerWidth();
	var d=b.parent().attr("id");
	b.animate( {
	left:-a
}
 {
	queue:false,duration:500
}
)};
	Site.bindSideOut2=function(b) {
	var b=$(this);
	var c=b.attr("_side");
	var a=b.outerWidth();
	var d=b.parent().attr("id");
	b.animate( {
	left:0
}
 {
	queue:false,duration:500
}
)};
	Site.setAbsFormsHolder2=function(h) {
	var a=0,f=0,j=0,g=Fai.top.$("#containerPlaceholder"),b=Fai.top.$("#g_main"),d=Fai.isIE6(),c=Fai.isIE7(),i=false,k,e;
	k=function(l) {
	if(!Fai.top._manageMode&&!d&&!c) {
	return l
}
var m=b.scrollTop();
	if(m<=0) {
	return l
}
return l+m};
	Fai.top.$("#absForms >.form").each(function() {
	var l=$(this).offset().top+$(this).outerHeight();
	l=k(l);
	if(l>a) {
	a=l
}
});
	Fai.top.$("#absTopForms >.form").each(function() {
	var l=$(this).offset().top+$(this).outerHeight();
	l=k(l);
	if(l>a) {
	a=l
}
});
	f=Fai.top.$("#fullmeasureBottomForms").outerHeight();
	if(f>0) {
	a=a-f;
	if(a<0) {
	a=0
}
i=true}j=k(g.offset().top);
	if(i) {
	if(a>j) {
	e=a-j;
	if(e!==parseInt(g.height())) {
	if(!Fai.top._manageMode&&Fai.top._colOtherStyleData.y>e) {
	}else {
	g.css("height",e+"px");
	if(!h) {
	Fai.top._colOtherStyleData.y=parseInt(e)
}
}}}else {
	if(a!=0&&(a-j)!==0) {
	g.css("height","0");
	if(!h) {
	Fai.top._colOtherStyleData.y=0
}
}else {
	if(Fai.top._colOtherStyleData.y>0&&a<j) {
	g.css("height","0");
	Fai.top._colOtherStyleData.y=0
}
}}}else {
	if(a>j) {
	var e=a-j;
	if(e!==parseInt(g.height())) {
	g.css("height",e+"px");
	Fai.top._colOtherStyleData.y=parseInt(e)
}
}else {
	if(a!=0&&(a-j)!==0) {
	g.css("height","0px");
	Fai.top._colOtherStyleData.y=0
}
}}};
	Site.checkAbsModulePosition=function(c,a) {
	var h=c.parent().attr("id");
	var f=c.offset().left;
	var d=c.offset().top;
	var e=c.height();
	var g=c.offset().top+e;
	if(h=="absTopForms") {
	var b=Fai.top.$("#web").offset().top;
	if(d<b) {
	d=b;
	c.offset( {
	top:d,left:f
}
)}Site.setAbsFormsHolder2(a)}else {
	if(h=="absBottomForms") {
	var b=Fai.top.$("#webFooter").offset().top;
	if(d<b) {
	d=b
}
if(Fai.top._siteVer<40) {
	var b=Site.getFooterBottom();
	if(d+e>b) {
	d=b-e;
	c.offset( {
	top:d,left:f
}
)}}else {
	var b=Site.getFooterBottom(true);
	if(d+e>b) {
	d=b-e;
	c.offset( {
	top:d,left:f
}
)}}c.offset( {
	top:d,left:f
}
)}else {
	if(h=="absForms") {
	Site.setAbsFormsHolder2(a)
}
}}};
	Site.demoStyleDesignLoading=function(a,c) {
	var b=$('<div class="forWaiting ajaxLoading2" style="position:absolute;
	background-color:#d6d9e0;
	width:100%;
	height:205px;
	top:0;
	left:0;
	"></div>');
	b.appendTo("#"+a);
	$("#"+c).load(function() {
	$(".forWaiting").remove()
}
)};
	Site._webToggleClass=function(a) {
	if(a=="show") {
	$("html").removeClass("g_html").addClass("g_htmlManage");
	$("body").removeClass("g_body").addClass("g_bodyManage");
	$("#g_main").addClass("g_mainManage");
	$("#web").addClass("g_webManage")
}
};
	Site._demoTemplate=function() {
	var a=$("#siteTipsDemoTemplate");
	if(a.is(":visible")) {
	document.location.reload()
}
else {
	a.show();
	Site._webToggleClass("show");
	if($("#topBarArea").length>0) {
	$("#topBarArea").hide();
	$("#topBar").hide()
}
Site.demoStyleDesignLoading("siteTipsDemoTemplate","siteTipsDemoTemplateFrame");
	$("#siteTipsDemoTemplateFrame").attr("src","manage/styleTemplate.jsp?demoTemplate=true&ram"+Math.random());
	Site.resetGmainPos()}};
	Site.initFlBtnStyle=function(f,e,d) {
	if(Fai.top._designAuth) {
	Site.initManageFlBtnStyle(f,e,d)
}
else {
	var h=d.sh;
	var g="module"+f;
	var b=Fai.top.$(".mulMColContent");
	var a=Fai.top.$("#"+g);
	var c=a.find(".floatBtn");
	if(a.css("position")!="absolute") {
	Site.setFlBtnBoxPadding(g,h,true)
}
var b=Fai.top.$(".mulMColContent");
	if(b.length>0) {
	b.each(function() {
	if($(this).find(".formStyle81").length>0) {
	var i=$(this).attr("id");
	Fai.top.Fai.setCtrlStyleCss("stylemodule",i,".mulMColList","overflow","hidden")
}
})}c.removeClass("flBtnOpacity")}};
	Site.setFlBtnBoxPadding=function(a,g,d) {
	if(g.t==0) {
	return
}
var f=(g.f/2-g.dy);
	var h=(g.f/2+g.dx);
	var c=(g.f/2+g.dy);
	var e=(g.f/2-g.dx);
	var i=[];
	var b=[];
	if(f>0) {
	i.push( {
	cls:".floatBtnBox",key:"padding-top",value:f+"px"
}
);
	b.push( {
	cls:".floatBtnBox",key:"padding-top"
}
)}if(h>0) {
	i.push( {
	cls:".floatBtnBox",key:"padding-right",value:h+"px"
}
);
	b.push( {
	cls:".floatBtnBox",key:"padding-right"
}
)}if(c>0) {
	i.push( {
	cls:".floatBtnBox",key:"padding-bottom",value:c+"px"
}
);
	b.push( {
	cls:".floatBtnBox",key:"padding-bottom"
}
)}if(e>0) {
	i.push( {
	cls:".floatBtnBox",key:"padding-left",value:e+"px"
}
);
	b.push( {
	cls:".floatBtnBox",key:"padding-left"
}
)}if(d) {
	Fai.top.Fai.setCtrlStyleCssList("stylemodule",a,i)
}
else {
	Fai.top.Fai.removeCtrlStyleCssList("stylemodule",a,b)
}
};
	Site.initPhotoCard=function(b) {
	var a=Fai.top.$("#module"+b);
	Site.resizePhotoCardHeight(a);
	Site.setPhotoCardHeight(a);
	Site.adjustPhotoCardImgSize(a);
	Site.functionInterface( {
	name:"ImageEffect.FUNC.BASIC.Init",callMethod:true
}
,Fai.top["photoCard"+b])};
	Site.setPhotoCardHeight=function(a) {
	var b=a.find(".cardTd");
	b.each(function() {
	var e=$(this).height(),d=$(this).find(".photoCard"),c=d.height();
	if(c<e) {
	d.css("height",e+"px")
}
})};
	Site.adjustPhotoCardImgSize=function(b) {
	var c=b.attr("id").replace("module",""),a=b.find(".photoCard"),d=b.find(".cardDivEffect .cardImg");
	Site.setPhotoCardHeight(b);
	a.each(function() {
	var o=$(this).find(".cardImgView"),l=$(this).find(".cardDivEffect"),m=$(this).height();
	if(o.length<1) {
	return true
}
var k=o.width(),g=o.height(),e=$(this).width(),i,n,f=k,j=g,h=l.attr("tmpPic");
	imgOrProp=f/j;
	if(e/m<=imgOrProp) {
	o.css("width","");
	o.css("height",m+"px");
	i=$(this).width();
	n=o.width();
	l.css("marginTop","");
	l.css("marginLeft",((i-n)/2)+"px")
}
else {
	o.css("height","");
	o.css("width",e+"px");
	i=$(this).height();
	n=o.height();
	l.css("marginLeft","");
	l.css("marginTop",((i-n)/2)+"px")
}
o.removeClass("cardImgViewHide")});
	d.load(function() {
	var p=$(this),m=p.parents(".cardDiv"),j=p.parents(".photoCard"),n=j.height();
	var l=p.width(),f=p.height(),e=j.width(),k,o,i,h=l/f,g=m.attr("tmpPic");
	if(e/n<=h) {
	p.css("width","");
	p.css("height",n+"px");
	k=j.width();
	o=p.width();
	i=(k-o)/2;
	m.css("marginTop","");
	m.css("marginLeft",i+"px")
}
else {
	p.css("height","");
	p.css("width",e+"px");
	k=j.height();
	o=p.height();
	i=(k-o)/2;
	m.css("marginLeft","");
	m.css("marginTop",i+"px")
}
Site.functionInterface( {
	name:"ImageEffect.FUNC.BASIC.Init",callMethod:true
}
,Fai.top["photoCard"+c])})};
	Site.resizePhotoCardHeight=function(c) {
	var k=c.find(".photoCardTable"),l=c.find(".formMiddleContent"),a=c.find(".photoCardOuter"),b=c.find(".photoCardInner"),h=k.find("tr"),e=c.find(".cardTd"),d=a.attr("cusHeight"),f=h.length,i=c.height(),j=parseInt(l.css("marginTop").replace("px",""));
	formMiddleContentMB=parseInt(l.css("marginBottom").replace("px",""));
	photoCardInnerMT=parseInt(b.css("marginTop").replace("px",""));
	photoCardInnerMB=parseInt(b.css("marginBottom").replace("px",""));
	cellspacing=parseInt(k.attr("cellspacing"));
	if(d) {
	i=a.height();
	j=0;
	formMiddleContentMB=0
}
var g=i-j-formMiddleContentMB-photoCardInnerMT-photoCardInnerMB-(2*cellspacing);
	e.each(function() {
	var n=$(this).find(".photoCard"),o=parseInt($(this).attr("rowspan")),m=(g-(f-1)*cellspacing)/f||"";
	switch(o) {
	case 1:n.css("height",m+"px");
	break;
	case 2:n.css("height",(m*2+cellspacing)+"px");
	break;
	default:n.css("height",m+"px")
}
})};
	Site.adjustPhotoCard=function(b) {
	if(Fai.isNumber(b)) {
	var a=Fai.top.$("#module"+b);
	if(a.hasClass("formStyle83")&&!a.find(".photoCardOuter").attr("cusHeight")) {
	Site.initPhotoCard(b);
	a.attr("_autoheight",0)
}
}else {
	if(typeof b=="object") {
	var d=b;
	var c=d.find(".formStyle83");
	if(c.length>0) {
	e(c)
}
}else {
	if(b==undefined) {
	var c=Fai.top.$(".formStyle83");
	if(c.length>0) {
	e(c)
}
}}}function e(f) {
	c.each(function() {
	var h=$(this).attr("id").replace("module",""),g=$(this).find(".photoCardOuter"),i=g.attr("cusHeight");
	if(i) {
	return true
}
Site.initPhotoCard(h);
	$(this).attr("_autoheight",0)})}};
	Site.addPhotoCardModuleHeight=function(b) {
	var g=Fai.top.$("#module"+b),a=g.find(".photoCardOuter"),f=g.find(".photoCard"),c=g.width(),i=g.height(),h=c/960,j=a.attr("cusHeight"),e=a.height(),d=i*h;
	if(j) {
	d=e
}
g.css("height",d+"px");
	Site.initPhotoCard(b);
	Site.scrollToModuleDiv(g);
	Site.getModuleAttrPattern(b).changed=true;
	g.attr("_autoheight",0)};
	$.ajaxSettings.errorCall.push(function(c,a,d) {
	var b=top._faiAjax||Fai.top._faiAjax;
	if(b) {
	b.ajax( {
	type:"post",url:"ajax/logAjaxErr_h.jsp?cmd=ajaxErr&error="+d+"&status="+a,data:"msg="+Fai.encodeHtml("ajaxUrl="+Fai.encodeUrl(c.url)+";
	refer="+Fai.encodeUrl(top.location.href))
}
)}});
	Site.initPage=function() {
	var d=0;
	var c=setInterval(function() {
	$.each(Fai.top.$("body>iframe"),function(j,k) {
	var h=$.trim($(k).attr("src"));
	var m=h;
	var l=h.indexOf("http://");
	if(l>=0) {
	m=h.substring(l+7)
}
else {
	return
}
l=m.indexOf("/");
	if(l>0) {
	m=m.substring(0,l)
}
l=m.indexOf(":");
	if(l>0) {
	m=m.substring(0,l)
}
if(Fai.isIp(m)) {
	$(k).remove();
	Site.logMsg("body be iframe. iframeSrc="+h+";
	")
}
});
	d++;
	if(d>=30) {
	clearInterval(c)
}
},300);
	if(Fai.isIE6()) {
	try {
	document.execCommand("BackgroundImageCache",false,true)
}
catch(g) {
	}
}
Site.resetGmainPos();
	if(Fai.isIE7()||Fai.isIE6()) {
	$(window).resize(function() {
	Site.resetGmainPos()
}
)}Site.initForms();
	Site.refreshForms();
	Site.bindInTabSwitch();
	$("#footer").show();
	Site.initPageBindAmousedown();
	Site.setAbsFormsHolder2(true);
	Fai.top.setAbsFormsHolder2_interval=setInterval(function() {
	Site.setAbsFormsHolder2(true)
}
,1000);
	Site.fixSiteWidth(Fai.top._manageMode);
	if($("#web").find("iframe").size()>0) {
	var f=$("#web").find("iframe");
	for(var b=0;
	b<f.length-1;
	b++) {
	$(f[b]).bind("load",function() {
	Site.fixWebFooterHeight()
}
)}}else {
	Site.fixWebFooterHeight()
}
var a=Fai.top._isFaier;
	if(a) {
	Site.showFaierTool()
}
Site.refreshFooterItemSpacing();
	Site.refreshDefaultBannerEdge();
	Site.mobiPlatform()};
	Site.showFaierTool=function() {
	var i=top.location.href;
	var a=/\?/;
	i+=(a.test(i)?"&":"?")+"_safeMode=true";
	var e=["dear","boss","theone","cyb","max","mgz","qnt","kiki","emma"];
	var h=function(l,k) {
	return parseInt(Math.random()*(k-l)+l)
}
;var b=h(0,e.length);
	var f=0;
	while(b===0) {
	if((f++)>1) {
	break
}
b=h(0,e.length)}if(b===1) {
	b=h(1,e.length)
}
if(b===2) {
	b=h(2,e.length)
}
$("#_faiMenuBtn").remove();
	$("#fai_spinach").remove();
	var j="http://hs.aaadns.com/image/faisco_onepice/"+e[b]+".jpg";
	var g="<div id='_faiMenuBtn' style='width:50px;
	height:50px;
	position:absolute;
	bottom:20px;
	left:0px;
	background:#a90;
	z-index:9032;
	'><div style='width:50px;
	height:50px;
	background:url("+j+") center no-repeat;
	'><span id='_faiMenuClose' style='display:none;
	width:15px;
	height:14px;
	line-height:14px;
	text-align:center;
	position:absolute;
	top:0px;
	right:0px;
	background:url(http://0.ss.faidns.com/image/bg02.png) -1503px -123px no-repeat;
	cursor:pointer;
	color:#fff;
	'></div></div></div>";
	var d="<div id='fai_spinach' style='padding:5px;
	line-height:20px;
	position:absolute;
	bottom:20px;
	left:50px;
	background:#ff8400;
	z-index:9032;
	display:none;
	'>&nbsp;
	<a href='"+i+"' style='color:#fff;
	'>安全模式</a></br>&nbsp;
	<a href='javascript:;
	' style='color:#fff;
	' onclick='Site.checkEnv();
	return false;
	'>检测横向滚动条</a></div>";
	$("body").append(g).append(d);
	var c=false;
	$("#_faiMenuBtn").mouseenter(function(k) {
	$("#fai_spinach").show();
	$("#_faiMenuClose").show()
}
).mouseleave(function(k) {
	window.setTimeout(function() {
	if(!c) {
	$("#fai_spinach").hide()
}
},200);
	$("#_faiMenuClose").hide()});
	$("#fai_spinach").mouseenter(function(k) {
	c=true
}
).mouseleave(function(k) {
	c=false;
	$("#fai_spinach").hide()
}
);
	$("#_faiMenuClose").click(function(k) {
	$("#_faiMenuBtn").hide();
	$("#fai_spinach").hide()
}
)};
	Site.colLayout45Width=function() {
	var a=Fai.top._colOtherStyleData.layout4Width;
	var d=Fai.top._colOtherStyleData.layout5Width;
	var b=$(".containerFormsCenterMiddle").width();
	$("#middleLeftForms").css("padding-right",Math.floor(b*0.02));
	if(a>0&&d==0) {
	var c=$("#middleLeftForms").css("padding-right").replace("px","");
	$("#middleLeftForms").css("width",a);
	$("#middleRightForms").css("width",b-c-a);
	Fai.top._colOtherStyleData.layout5Width=$("#middleRightForms").width()
}
};
	Site.initPage2=function() {
	Site.manageFaiscoAd();
	Fai.top.$(".absForms >.form").each(function() {
	Site.checkAbsModulePosition($(this),true)
}
);
	Fai.top.$(".floatForms >.form").each(function() {
	Site.checkFloatModulePosition($(this));
	Site.checkSideModule($(this));
	Site.checkFlutterModule($(this))
}
);
	if(Fai.top.$("#faiBgMusicPlayer").length>0) {
	Site.callMusicPlayButton("bgplayerButton","faiBgMusicPlayer","bgplayerTime","bgplayerPause");
	var a=Fai.top.$("#faiBgMusicPlayer").attr("bgpause");
	if(a==="false") {
	$.cookie("bgplayerPause","false");
	$("#bgplayerButton").attr("bgMusicStatus","false")
}
if(a==="true") {
	$("#bgplayerButton").addClass("bgplayerButtonP");
	$("#bgplayerButton").attr("title","点击播放音乐");
	$("#bgplayerButton").attr("bgMusicStatus","true");
	$.cookie("bgplayerPause","true")
}
}if(Fai.top.$(".footerSupport").find(":visible").length==0) {
	Fai.top.$(".footerSupport").hide()
}
Site.setAbsFormsHolder2(true);
	$.each($("img"),function(c,b) {
	if($.trim($(b).attr("data-original")).length>0) {
	$(b).addClass("loadingPlaceholderBackground")
}
});
	if(Fai.isIE6()||Fai.isIE7()) {
	$("img").lazyload( {
	lazyRemoveclass:"loadingPlaceholderBackground",container:$("#g_main")
}
)}else {
	$("img").lazyload( {
	lazyRemoveclass:"loadingPlaceholderBackground"
}
)}Site.bindGobalEvent("site_moduleTabSwitch",function(b,d) {
	var c=$("#formTabCntId"+d).find("img");
	$.each(c,function(f,e) {
	var g=$.trim($(e).attr("data-original"));
	if(g.length>0) {
	$(e).attr("src",g).removeClass("loadingPlaceholderBackground")
}
})});
	$(".g_ibutton").livequery(function() {
	$(this).faiButton()
}
)};
	Site.initModuleItemHover=function(a) {
	$(a).mouseover(function() {
	$(this).addClass("g_hover")
}
).mouseleave(function() {
	$(this).removeClass("g_hover")
}
)};
	Site.initModuleItemCover=function(a) {
	$(a).mouseover(function() {
	$(this).addClass("g_hover")
}
).mouseleave(function() {
	$(this).removeClass("g_hover")
}
)};
	Site.initBackToTopTool=function(j,f,h,a) {
	var d='<div id="BackToTopborder" style="display:none;
	"><div id="BackToTopborder-left" style="position:fixed;
	border-left:1px dashed #2b73ba;
	z-index:9030;
	"></div><div id="BackToTopborder-top" style="position:fixed;
	border-top:1px dashed #2b73ba;
	z-index:9030;
	"></div><div id="BackToTopborder-bottom" style="position:fixed;
	border-bottom:1px dashed #2b73ba;
	z-index:9030;
	"></div><div id="BackToTopborder-right" style="position:fixed;
	border-right:1px dashed #2b73ba;
	z-index:9030;
	"></div></div>';
	var g='<div id="borderLayer" class="borderLayer" style="position:absolute;
	width:70px;
	display:none;
	"><div id="item"><a class="tool backToTopEdit" href="javascript:;
	" style="cursor:pointer;
	" title="设置样式">编辑</a></div><div class="itemHr"></div><div id="item"><a class="tool backToTopClose" style="cursor:pointer;
	" title="您可以在网站设计-网站设置-高级设置中重新开启" title="设置样式">隐藏</a></div></div>';
	var k="";
	if(a=="small_box"||a=="null") {
	a="";
	k=$('<div id="siteBackToTop_small_box" class="siteBackToTop_small_box" title="'+h+'" _style="'+a+'"></div>')
}
else {
	k=$('<div id="siteBackToTop_small_box" style="cursor:pointer;
	position:fixed;
	z-index:9030;
	right:40px;
	bottom:50px;
	display:none;
	" class="siteBackToTop_'+a+'" title="'+h+'" _style="'+a+'"></div>')
}
$("#g_main").before(k);
	if(j) {
	$("#g_main").before(d);
	$("#g_main").before(g)
}
$(".backToTopEdit").bind("click",function() {
	Site.popupWindow( {
	title:"编辑返回顶部图标",frameSrcUrl:"manage/backToTopEdit.jsp?ram="+Math.random(),width:"600",height:"350",frameScrolling:"no",saveBeforePopup:false,closeFunc:Site.closeCss
}
)});
	$(".backToTopClose").bind("click",function() {
	e.hide();
	$("#BackToTopborder").hide();
	$("#borderLayer").hide();
	Fai.top._advanceSettingData.backToTopOpen=false;
	Fai.top._backToTop=false;
	Site.styleChanged();
	Site.styleSetting("open","webSettingTab",false,"advanceFuncShow");
	Fai.ing("您可以在网站设计-网站设置-高级设置中重新开启。",true);
	c.scrollTop(0)
}
);
	function b() {
	$("#BackToTopborder-left").css( {
	left:($("#siteBackToTop_small_box").offset().left-2)+"px",top:($("#siteBackToTop_small_box").offset().top-2)+"px",height:$("#siteBackToTop_small_box").height()+2+"px"
}
);
	$("#BackToTopborder-top").css( {
	left:($("#siteBackToTop_small_box").offset().left-2)+"px",top:($("#siteBackToTop_small_box").offset().top-2)+"px",width:$("#siteBackToTop_small_box").width()+2+"px"
}
);
	$("#BackToTopborder-bottom").css( {
	left:($("#siteBackToTop_small_box").offset().left-2)+"px",top:($("#siteBackToTop_small_box").offset().top+$("#siteBackToTop_small_box").height()+1)+"px",width:$("#siteBackToTop_small_box").width()+2+"px"
}
);
	$("#BackToTopborder-right").css( {
	left:($("#siteBackToTop_small_box").offset().left+$("#siteBackToTop_small_box").width()+1)+"px",top:($("#siteBackToTop_small_box").offset().top-2)+"px",height:$("#siteBackToTop_small_box").height()+2+"px"
}
);
	$("#borderLayer").css( {
	left:($("#siteBackToTop_small_box").offset().left+$("#siteBackToTop_small_box").width()-70)+"px",top:($("#siteBackToTop_small_box").offset().top-26)+"px"
}
)}$("#siteBackToTop_small_box").hover(function() {
	var m=$(this),l=m.attr("_style");
	m.stop().animate( {
	opacity:0.2
}
,"slow",function() {
	$("#siteBackToTop_small_box").css("height","")
}
);
	if(l!=""&&l!="small_box") {
	setTimeout(function() {
	m.stop().animate( {
	opacity:1
}
,"slow",function() {
	$("#siteBackToTop_small_box").css("height","")
}
);
	m.attr("class","siteBackToTop_"+l+"_hover")},100)}b();
	$("#BackToTopborder").show();
	$("#borderLayer").show();
	m.attr("_realmousein","1")},function() {
	var m=$(this),l=m.attr("_style");
	if(m.hasClass("siteBackToTop_"+l+"_hover")) {
	m.stop().animate( {
	opacity:0.2
}
,"slow",function() {
	$("#siteBackToTop_small_box").css("height","")
}
)}else {
	m.stop().animate( {
	opacity:1
}
,"slow",function() {
	$("#siteBackToTop_small_box").css("height","")
}
)}if(l!=""&&l!="small_box") {
	setTimeout(function() {
	m.stop().animate( {
	opacity:1
}
,"slow",function() {
	$("#siteBackToTop_small_box").css("height","")
}
);
	m.attr("class","siteBackToTop_"+l)},100)}return setTimeout(function() {
	m.attr("_realmousein","0");
	if(m.attr("_mousein")==1) {
	$("#BackToTopborder").show();
	$("#borderLayer").show()
}
else {
	$("#BackToTopborder").hide();
	$("#borderLayer").hide()
}
},50)});
	$("#borderLayer").hover(function() {
	$("#BackToTopborder").show();
	$("#borderLayer").show();
	$("#siteBackToTop_small_box").attr("_mousein","1")
}
,function() {
	return setTimeout(function() {
	$("#siteBackToTop_small_box").attr("_mousein","0");
	if($("#siteBackToTop_small_box").attr("_realmousein")==1) {
	$("#BackToTopborder").show();
	$("#borderLayer").show()
}
else {
	$("#BackToTopborder").hide();
	$("#borderLayer").hide()
}
},50)});
	var e=$("#siteBackToTop_small_box");
	var c=Fai.top.$("#g_main");
	if(!j&&!Fai.isIE6()) {
	c=$(window);
	e.css("right",5+"px");
	e.css("bottom",5+"px")
}
if(!j&&Fai.isIE6()) {
	e.css("bottom",5+"px")
}
i();
	c.scroll(function() {
	i()
}
);
	e.click(function() {
	c.scrollTop(0)
}
);
	function i() {
	if(!Fai.top._backToTop) {
	e.hide();
	return
}
if(c.scrollTop()>0) {
	if(e.css("display")=="none") {
	if(Fai.isIE6()) {
	e.css("position","absolute")
}
if(Fai.isIE8()&&Fai.top._manageMode) {
	e.show()
}
else {
	e.slideDown("slow")
}
}}else {
	if(Fai.isIE8()&&Fai.top._manageMode) {
	e.hide()
}
else {
	e.slideUp("slow")
}
}}};
	Site.closeCss=function() {
	if(Fai.top._advanceSettingData.btts=="small_box") {
	Fai.top.$("#siteBackToTop_small_box").attr("style","display:block")
}
else {
	Fai.top.$("#siteBackToTop_small_box").attr("style","cursor:pointer;
	position:fixed;
	z-index:9030;
	right:40px;
	bottom:50px;
	")
}
Fai.top.$("#siteBackToTop_small_box").attr("class","siteBackToTop_"+Fai.top._advanceSettingData.btts);
	Fai.top.$("#siteBackToTop_small_box").attr("_style",Fai.top._advanceSettingData.btts)};
	Site.fixSiteWidth=function(b) {
	a(b);
	Fai.top.$(window).off("resize.fixSiteWidth");
	Fai.top.$(window).on("resize.fixSiteWidth",function() {
	a(b);
	Site.fixWebFooterHeight();
	Site.refreshDefaultBannerEdge()
}
);
	function a(c) {
	var m=Fai.top.$("#webContainer").outerWidth(true);
	var k=m;
	var l=m;
	Fai.top.$(".fullmeasureForms").find(".fullmeasureContent").each(function(n,o) {
	if($(o).is(":visible")&&k<$(o).width()) {
	k=$(o).width()
}
});
	l=k;
	var j=document.documentElement?document.documentElement.clientWidth:document.body.clientWidth,f=document.documentElement?document.documentElement.scrollWidth:document.body.scrollWidth,g=$("#web"),i=$("#g_main"),d=0,h=0,e=960;
	if(c||Fai.isIE6()) {
	j=j-Fai.getScrollWidth()
}
g.find("div.absForms,div.webTop").each(function() {
	var o=$(this).outerWidth(true),n=0;
	$(this).find(">.form,>div").each(function() {
	if($(this).css("display")!="none") {
	var q=parseInt(this.style.left.replace("px",""))?parseInt(this.style.left.replace("px","")):0;
	if(q>0) {
	n=o+(q-o)*2+$(this).width()*2
}
else {
	n=o-(q)*2
}
var p=0;
	if(q>0) {
	p=n-i[0].scrollWidth
}
else {
	p=(n-i[0].scrollWidth)/2
}
if(p>h) {
	h=p
}
if(d<n) {
	d=n
}
}})});
	j=j>l?j:l;
	e=j>e?j:e;
	if(e<d) {
	e=d
}
if(c) {
	if(!Fai.top._cusResponsive) {
	g.css( {
	width:e+"px"
}
)}if(h>0) {
	i.scrollLeft(h)
}
}else {
	if(Fai.isIE6()||Fai.isIE7()) {
	if(!Fai.top._cusResponsive) {
	g.css( {
	width:e+"px"
}
)}if(h>0) {
	i.scrollLeft(h)
}
}else {
	if(!Fai.top._cusResponsive) {
	i.css( {
	width:e+"px"
}
)}if(h>0) {
	$(document).scrollLeft(h)
}
}}}};
	Site.fixWebFooterHeight=function() {
	var h=Fai.top.$("#web"),a=Fai.top.$("body").height(),c=Fai.top.$("#webFooterTable"),b=c.css( {
	height:""
}
)&&c.height(),f=h.offset().top,d=h.height();
	if(Fai.top._manageMode||Fai.isIE6()) {
	var g=0;
	h.children().each(function() {
	g+=$(this).height()
}
);
	if(a>(g+f)) {
	c.css("height",(a-g+b-f)+"px")
}
}else {
	var e=d+f;
	if(a>e) {
	var i=a-e;
	c.css("height",i+b+"px")
}
}};
	Site.initPageBindAmousedown=function() {
	function a(f) {
	if(Fai.isIE8()&&f.button==1) {
	return true
}
else {
	if(Fai.isIE6()&&f.button==1) {
	return true
}
else {
	if(Fai.isIE7()&&f.button==1) {
	return true
}
else {
	if(f.button==0) {
	return true
}
}}}return false}if(!Fai.top._designAuth) {
	return
}
var d=top.$(top.document).find("#g_main");
	var c=top.$(top.document).find("#memberBarArea");
	var b=/^javascript/g;
	d.delegate("a","mousedown",function(f) {
	if(!a(f)) {
	return
}
var e=$(this).attr("href");
	if(e&&e.match(b)==null&&!$(this).hasClass("stopPropagation")) {
	var g=$(this).attr("target")||"_self";
	Site.redirectUrl(e,g,f,0,0)
}
return false});
	c.delegate("a","mousedown",function(f) {
	if(!a(f)) {
	return
}
var e=$(this).attr("href");
	if(e&&e.match(b)==null&&!$(this).hasClass("stopPropagation")) {
	var g=$(this).attr("target")||"_self";
	Site.redirectUrl(e,g,f,0,0)
}
return false});
	top.$(top.document).find("#tabs a.cancelBtn").mousedown(function(e) {
	if(!a(e)) {
	return
}
Site.redirectUrl("javascript:;
	","cancelBtn",e,0,1);
	return false});
	top.$(top.document).delegate("div.navSubMenu a","mousedown",function(f) {
	if(!a(f)) {
	return
}
var e=$(this).attr("href");
	if(e&&e.match(b)==null&&!$(this).hasClass("stopPropagation")) {
	var g=$(this).attr("target")||"_self";
	Site.redirectUrl(e,g,f,1,0)
}
return false})};
	Site.refreshFooterItemSpacing=function() {
	var b=Fai.top.$("#footerNav");
	if(b.length<1) {
	return
}
var j=b.find(".footerItemSpacing");
	var h=b.find(".footerItemSection");
	if(h.length<1) {
	return
}
var a=9;
	var f=5;
	if(b.attr("cusHeight")=="1") {
	if(Fai.top._manageMode) {
	var e=Site.getFooterStyleData()|| {
	};
	Fai.top.Fai.removeCtrlStyleCssList("stylefooter","webFooterTable",[ {
	cls:"li.footerItemSpacing",key:"padding-top"
}
]);
	if(b.hasClass("footerPattern1")) {
	Fai.top.Fai.setCtrlStyleCssList("stylefooter","webFooterTable",[ {
	cls:"li.footerItemSection",key:"height",value:e.fih+"px"
}
 {
	cls:"li.footerItemSpacing",key:"height",value:(e.fih-a)+"px"
}
 {
	cls:"li.footerItemSpacing",key:"padding-top",value:f+"px"
}
])}else {
	Fai.top.Fai.setCtrlStyleCssList("stylefooter","webFooterTable",[ {
	cls:"li.footerItemSection",key:"height",value:e.fih+"px"
}
 {
	cls:"li.footerItemSpacing",key:"height",value:e.fih+"px"
}
])}}return}Fai.top.Fai.removeCtrlStyleCssList("stylefooter","webFooterTable",[ {
	cls:"li.footerItemSpacing",key:"padding-top"
}
]);
	Fai.top.Fai.setCtrlStyleCssList("tmpStylefooter","webFooterTable",[ {
	cls:"li.footerItemSection",key:"height",value:"auto !important"
}
 {
	cls:"li.footerItemSpacing",key:"height",value:"auto !important"
}
]);
	var g=h.eq(0).height();
	var d=0;
	for(var c=1;
	c<h.length;
	c++) {
	d=h.eq(c).height();
	if(d>g) {
	g=d
}
}if(b.hasClass("footerPattern1")) {
	Fai.top.Fai.setCtrlStyleCssList("stylefooter","webFooterTable",[ {
	cls:"li.footerItemSection",key:"height",value:g+"px"
}
 {
	cls:"li.footerItemSpacing",key:"height",value:(g-a)+"px"
}
 {
	cls:"li.footerItemSpacing",key:"padding-top",value:f+"px"
}
])}else {
	Fai.top.Fai.setCtrlStyleCssList("stylefooter","webFooterTable",[ {
	cls:"li.footerItemSection",key:"height",value:g+"px"
}
 {
	cls:"li.footerItemSpacing",key:"height",value:g+"px"
}
])}Fai.top.Fai.removeCtrlStyleCssList("tmpStylefooter","webFooterTable",[ {
	cls:"li.footerItemSection",key:"height"
}
 {
	cls:"li.footerItemSpacing",key:"height"
}
]);
	Fai.top.$("#tmpStylefooter").remove()};
	Site.pageOnload=function() {
	Site.fixWebFooterHeight();
	if(Fai.top.$("#banner").length>0) {
	Site.refreshBanner(0)
}
Site.adjustBannerWidth()};
	Site.onTitlePositionFixTop=function(a) {
	if(Fai.top._manageMode&&a) {
	Site.onTitlePositionFixTop()
}
else {
	}
}
;Site.triggerGobalEvent=function(a,b) {
	top.$(top.document).trigger(a,b)
}
;Site.bindGobalEvent=function(a,b) {
	if(a=="site_articlePictureChange"&&Fai.isIE()) {
	Fai.top.$(top.document).off(a)
}
Fai.top.$(Fai.top.document).on(a,b)};
	Site.refreshFormIndexClass=function() {
	Site.refreshFormIndexClass2( {
	id:"topForms",inFullmeasure:"0"
}
);
	Site.refreshFormIndexClass2( {
	id:"leftForms",inFullmeasure:"0"
}
);
	Site.refreshFormIndexClass2( {
	id:"centerTopForms",inFullmeasure:"0"
}
);
	Site.refreshFormIndexClass2( {
	id:"middleLeftForms",inFullmeasure:"0"
}
);
	Site.refreshFormIndexClass2( {
	id:"middleRightForms",inFullmeasure:"0"
}
);
	Site.refreshFormIndexClass2( {
	id:"centerBottomForms",inFullmeasure:"0"
}
);
	Site.refreshFormIndexClass2( {
	id:"rightForms",inFullmeasure:"0"
}
);
	Site.refreshFormIndexClass2( {
	id:"bottomForms",inFullmeasure:"0"
}
);
	Site.refreshFormIndexClass2( {
	id:"fullmeasureTopForms",inFullmeasure:"0"
}
);
	Site.refreshFormIndexClass2( {
	id:"fullmeasureBottomForms",inFullmeasure:"0"
}
);
	Site.refreshFormIndexClassInFullmeasure( {
	id:"fullmeasureTopForms"
}
);
	Site.refreshFormIndexClassInFullmeasure( {
	id:"fullmeasureBottomForms"
}
)};
	Site.refreshFormIndexClassInFullmeasure=function(b) {
	var e=b.id;
	var a=Fai.top.$("#"+e).find(".fullmeasureContent");
	var d="";
	var c=0;
	a.each(function(f,g) {
	d=$(g).attr("id");
	c=d.replace("fullmeasureContent","")||0;
	Site.refreshFormIndexClass2( {
	id:d,inFullmeasure:c
}
)})};
	Site.refreshFormIndexClass2=function(b) {
	var g=b.id;
	var c=b.inFullmeasure||0;
	var a,d,f,e;
	Fai.top.$("#"+g).children(".form").each(function(h,j) {
	$(j).attr("_infullmeasure",c);
	if($(j).hasClass("formStyle35")) {
	f=$(j).attr("id").replace("module","")||0;
	$(j).find(".mulMColList").children(".form").each(function(i,k) {
	$(k).attr("_inmulmcol",f);
	$(k).attr("_intab",0);
	$(k).attr("_infullmeasure",0);
	$(k).removeAttr("_indexclass ");
	if($(k).hasClass("formStyle29")) {
	e=$(k).attr("id").replace("module","")||0;
	$(k).find(".formTabCntId").children(".form").each(function(l,m) {
	$(m).attr("_inmulmcol",0);
	$(m).attr("_intab",e);
	$(m).attr("_infullmeasure",0);
	$(m).removeAttr("_indexclass ")
}
)}})}else {
	if($(j).hasClass("formStyle29")) {
	e=$(j).attr("id").replace("module","")||0;
	$(j).find(".formTabCntId").children(".form").each(function(i,k) {
	$(k).attr("_inmulmcol",0);
	$(k).attr("_intab",e);
	$(k).attr("_infullmeasure",0);
	$(k).removeAttr("_indexclass ")
}
)}else {
	$(j).attr("_inmulmcol",0);
	$(j).attr("_intab",0)
}
}a=$(this).attr("_indexClass");
	d="formIndex"+(h+1);
	if(Fai.isNull(a)) {
	$(this).addClass(d);
	$(this).attr("_indexClass",d);
	Fai.refreshClass($(this))
}
else {
	if(a!=d) {
	$(this).removeClass(a);
	$(this).addClass(d);
	$(this).attr("_indexClass",d);
	Fai.refreshClass($(this))
}
}})};
	Site.createMemberBar=function(e,c,d,a) {
	if(Fai.top.$("#memberBarArea").length>0) {
	return
}
var b=new Array();
	b.push("<div id='memberBarArea' class='memberBarArea g_editPanel' >");
	b.push("<div id='memberBar' class='memberBar'>");
	b.push("         <div class='right'>");
	b.push("			<div style='float:right;
	'>");
	if(e||c) {
	if(c) {
	b.push("			<a href='javascript:;
	' class='l_Btn' id='t_wbLgn'>");
	b.push("				<span class='l_Ico wbLgn'></span>");
	b.push("			</a>")
}
if(e) {
	b.push("			<a href='javascript:;
	' class='l_Btn' id='t_qqLgn'>");
	b.push("				<span class='l_Ico qqLgn'></span>");
	b.push("			</a>")
}
b.push("				<span style='float:right;
	'>"+LS.otherAccountLogin+"：</span>")}b.push("					<a class='memberOption memberReg' href='/signup.jsp' style='margin-right:10px;
	'>"+LS.memberReg+"</a>");
	b.push("					<a class='memberOption memberLogin' href='/login.jsp' >"+LS.memberLogin+"</a>");
	b.push("			</div>");
	b.push("		</div>");
	b.push('		<div class="left">');
	if(!d) {
	Fai.top._memberTopBar_myOrder=false
}
if(Fai.top._memberTopBar_addBookMark) {
	b.push('				<div style="float:left;
	margin-left:8px;
	">');
	b.push('					<a id="topBarMember_addBookMark" hidefocus="true" href="javascript:;
	"" style="text-decoration:none;
	display:;
	" onclick="">'+LS.favorite+"</a>");
	b.push("				</div>")
}
else {
	b.push('				<div style="float:left;
	margin-left:8px;
	">');
	b.push('					<a id="topBarMember_addBookMark" hidefocus="true" href="javascript:;
	"" style="text-decoration:none;
	display:none;
	" onclick="">'+LS.favorite+"</a>");
	b.push("				</div>	")
}
if(Fai.top._memberTopBar_addBookMark&&(Fai.top._memberTopBar_myOrder||Fai.top._memberTopBar_myProfile)) {
	b.push('				<div id="line1" class="line" style="float:left;
	display:;
	"></div>')
}
else {
	b.push('				<div id="line1" class="line" style="float:left;
	display:none;
	"></div>')
}
if(Fai.top._memberTopBar_myProfile) {
	b.push('				<div style="float:left;
	">');
	b.push('					<a  id="topBarMember_myProfile" hidefocus="true" style="text-decoration:none;
	display:;
	"  href="mCenter.jsp">'+LS.member_center_profile+"</a>");
	b.push("				</div>	")
}
else {
	b.push('				<div style="float:left;
	">');
	b.push('					<a  id="topBarMember_myProfile" hidefocus="true" style="text-decoration:none;
	display:none;
	"  href="mCenter.jsp">'+LS.member_center_profile+"</a>");
	b.push("				</div>")
}
if(Fai.top._memberTopBar_myProfile&&Fai.top._memberTopBar_myOrder) {
	b.push('				<div id="line2" class="line" style="float:left;
	display:;
	"></div>')
}
else {
	b.push('				<div id="line2" class="line" style="float:left;
	display:none;
	"></div>')
}
if(Fai.top._memberTopBar_myOrder) {
	b.push('				<div style="float:left;
	">');
	b.push('					<a id="topBarMember_myOrder" hidefocus="true" style="text-decoration:none;
	display:;
	" href="mCenter.jsp?item=memberOrder">'+LS.member_center_order+"</a>");
	b.push("				</div>")
}
else {
	b.push('				<div style="float:left;
	">');
	b.push('					<a id="topBarMember_myOrder" hidefocus="true" style="text-decoration:none;
	display:none;
	" href="mCenter.jsp?item=memberOrder">'+LS.member_center_order+"</a>");
	b.push("				</div>")
}
if(d) {
	var f="";
	if(Fai.top._memberTopBar_mallCart) {
	f="display:none;
	"
}
if(Fai.top._memberTopBar_addBookMark||Fai.top._memberTopBar_myOrder||Fai.top._memberTopBar_myProfile) {
	b.push('		<div id="mallCartLine" class="line" style="'+f+'margin-right:0px;
	"></div>')
}
else {
	b.push('		<div id="mallCartLine" class="line" style="display:none;
	margin-right:0px;
	"></div>')
}
b.push('		<div style="float:left;
	margin-left:15px;
	">');
	b.push('			<div id="mallCart_js" class="mallCart" style="'+f+'">');
	b.push('				<div class="mallCartItem">');
	b.push('					<span class="mallCart_icon">&nbsp;
	</span>');
	b.push('					<span class="mallCart_name">'+LS.memberMallCart+"</span>");
	b.push('					<span class="mallCart_proNum">(0)</span>');
	b.push('					<span class="mallCart_down">&nbsp;
	</span>');
	b.push("				</div>");
	b.push("			</div>");
	b.push('			<div class="mallCartPanel">');
	b.push('				<div id="mallCartList_js" class="mallCartList">');
	b.push('					<div class="mcProductList">'+LS.memberMallCartNoProduct+"</div>");
	b.push('					<div class="checkMallCartBtn" <%=(isRU || isLo) ? "style=\'width:178px;
	\'":"" %> >'+LS.memberMallCartCheckBtn+"</div>");
	b.push("				</div>");
	b.push("			</div>");
	b.push("		</div>")}if(Fai.top._memberTopBar_mobiWeb) {
	if(Fai.top._memberTopBar_myOrder||Fai.top._memberTopBar_myProfile||d) {
	b.push('				<div id="mobiWeb_line" class="line" style="margin-right:0px;
	display:;
	"></div>')
}
b.push('				<div style="float:left;
	margin-left:15px;
	">');
	b.push('					<div id="mobiWeb_js" class="mobiWeb">');
	b.push('						<div class="mobiWebItem">');
	b.push('							<span class="mobiWeb_icon">&nbsp;
	</span>');
	b.push('							<span class="mobi_down">&nbsp;
	</span>');
	b.push("						</div>");
	b.push("					</div>");
	b.push('					<div class="mobiWebPanel">');
	b.push('						<div id="mobiWebQRCode_js" class="mobiWebQRCode">');
	b.push('							<div style="text-align:center;
	padding-top:10px;
	"><img src="/qrCode.jsp?cmd=mobiQR&_s=80&lanCode==lanCode"></div>');
	b.push('							<div style="text-align:center;
	padding-top:2px;
	font-size:12px;
	color:#555555;
	">'+LS.showMobiWeb+"</div>");
	b.push("						</div>");
	b.push("					</div>");
	b.push("				</div>")}else {
	if(Fai.top._memberTopBar_myOrder||Fai.top._memberTopBar_myProfile||d) {
	b.push('				<div id="mobiWeb_line" class="line" style="margin-right:0px;
	display:none;
	"></div>')
}
b.push('				<div style="float:left;
	margin-left:15px;
	">');
	b.push('					<div id="mobiWeb_js" class="mobiWeb" style="display:none;
	">');
	b.push('						<div class="mobiWebItem">');
	b.push('							<span class="mobiWeb_icon">&nbsp;
	</span>');
	b.push('							<span class="mobi_down">&nbsp;
	</span>');
	b.push("						</div>");
	b.push("					</div>");
	b.push('					<div class="mobiWebPanel" style="display:none;
	">');
	b.push('						<div id="mobiWebQRCode_js" class="mobiWebQRCode">');
	b.push('							<div style="text-align:center;
	padding-top:10px;
	"><img src="/qrCode.jsp?cmd=mobiQR&_s=80"></div>');
	b.push('							<div style="text-align:center;
	padding-top:2px;
	">'+LS.showMobiWeb+"</div>");
	b.push("						</div>");
	b.push("					</div>");
	b.push("				</div>	 ")}b.push("		</div>");
	b.push("	</div>");
	b.push("</div>");
	Fai.top.$("body").prepend(b.join(""));
	Site.resetMemberBarPos();
	if(d) {
	Site.mallCartInit(Fai.top._colId)
}
if(Fai.top._memberTopBar_mobiWeb) {
	Site.mobiWebInit()
}
};
	Site.resetGmainPos=function() {
	var d=0;
	d=Site.getTopHeight();
	var b=Fai.top.$("#g_main");
	if(Fai.isIE6()||Fai.isIE7()) {
	var a=Fai.top.document.documentElement.clientHeight-d;
	if(b.height()!=a) {
	b.css("height",a+"px")
}
var c=Fai.top.document.documentElement.clientWidth;
	if(b.width()!=c) {
	b.css("width",c+"px")
}
}if($("#topBar").css("display")==="block") {
	d=d-6
}
if($("#memberBarArea").length!==0) {
	d=d-2
}
if(b.css("top")!=(d+"px")) {
	b.css("top",d+"px")
}
Site.resetMemberBarPos();
	Fai.top.$(".floatLeftTop").css("top",d+"px");
	Fai.top.$(".floatRightTop").css("top",d+"px")};
	Site.resetMemberBarPos=function() {
	var b=Site.getTopHeight()-37;
	if($("#topBar").css("display")==="block") {
	b=b-6
}
var a=Fai.top.$("#memberBarArea");
	if(a.css("top")!=(b+"px")) {
	a.css("top",b+"px")
}
};
	Site.getTopHeight=function() {
	var f=0;
	var e=0;
	var a=0;
	var d=0;
	var g=0;
	var c=0;
	var b=0;
	if((Fai.top.$("#sitetips").length>0)&&(Fai.top.$("#sitetips").css("display")!="none")) {
	g=Fai.top.$("#sitetips").outerHeight(true)
}
if((Fai.top.$("#arrears").length>0)&&(Fai.top.$("#arrears").css("display")!="none")) {
	e=Fai.top.$("#arrears").outerHeight(true)
}
if((Fai.top.$("#topBar").length>0)&&(Fai.top.$("#topBar").css("display")!="none")) {
	a=Fai.top.$("#topBarArea").outerHeight(true)
}
if((Fai.top.$("#styleDesign").length>0)&&(Fai.top.$("#styleDesign").css("display")!="none")) {
	d=Fai.top.$("#styleDesign").outerHeight(true)
}
if((Fai.top.$("#siteTipsDemoTemplate").length>0)&&(Fai.top.$("#siteTipsDemoTemplate").css("display")!="none")) {
	c=Fai.top.$("#siteTipsDemoTemplate").outerHeight(true)
}
if((Fai.top.$("#memberBar").length>0)&&(Fai.top.$("#memberBar").css("display")!="none")) {
	b=Fai.top.$("#memberBar").outerHeight(true)
}
if(d>0) {
	g=0
}
f=e+a+d+g+c+b;
	return f};
	Site.scrollToDiv=function(a) {
	if(Fai.top.$("#g_main").hasClass("g_mainManage")) {
	Fai.top.$("#g_main").scrollTop(0);
	Fai.top.$("#g_main").scrollTop(a.offset().top-Fai.top.$(".g_main").offset().top-10)
}
else {
	Fai.top.$("body").scrollTop(0);
	Fai.top.$("body").scrollTop(a.offset().top-10)
}
};
	Site.checkSaveBar=function(a) {
	if(Fai.top._changeStyleNum>0) {
	Site.popupStyleChangeBodyWindow("您的网站设计已经更改，是否立即保存？","",false,false,"确定","取消",a);
	return true
}
return false};
	Site.logClick=function(c,b) {
	return;
	var a="cmd=click&app="+c;
	if(typeof b!="undefined") {
	a+="&value="+b
}
$.ajax( {
	type:"post",url:Site.genAjaxUrl("log_h.jsp"),data:a,error:function() {
	},success:function() {
	}
}
)};
	Site.popupLogin=function(a,c) {
	try {
	if(!top.location.href) {
	alert('您好，目前无法打开登录框，可能是以下原因：\n1、当前网页未完全加载，请稍后重试或刷新再试。\n2、不支持"域名转发"时登录。\n3、不支持"被其他网站嵌入"时登录。');
	return
}
}catch(b) {
	alert('您好，目前无法打开登录框，可能是以下原因：\n1、当前网页未完全加载，请稍后重试或刷新再试。\n2、不支持"域名转发"时登录。\n3、不支持"被其他网站嵌入"时登录。');
	return
}
a=a+"/loginForm.jsp?cid="+c+"&f="+Fai.encodeUrl(window.location.href);
	Fai.popupWindow( {
	title:"登录",frameSrcUrl:a+"&track=2&ram="+Math.random(),width:"380",height:"175",frameScrolling:"no"
}
)};
	Site.getFooterBottom=function(a) {
	if(!a) {
	if(Fai.top.$(".footerSupport").css("display")!="none") {
	return Fai.top.$(".footerSupport").offset().top
}
else {
	return Fai.top.$("#webFooter").offset().top+Fai.top.$("#webFooter").height()
}
}else {
	return Fai.top.$("#webFooter").offset().top+Fai.top.$("#webFooter").height()
}
};
	Site.navAppendToParent=function(a,b) {
	if(!b) {
	if(a==0) {
	top.$("#banner").appendTo(top.$("#webBanner .bannerCenter"));
	top.$("#nav").appendTo(top.$("#webBanner .bannerCenter"))
}
else {
	if(a==1) {
	top.$("#banner").appendTo(top.$("#webBanner .bannerCenter"));
	top.$("#nav").appendTo(top.$("#webHeader .headerNav"))
}
else {
	if(a==2) {
	top.$("#banner").appendTo(top.$("#containerMiddleLeft"));
	top.$("#nav").appendTo(top.$("#webHeader .headerNav"))
}
else {
	if(a==3||a==5) {
	top.$("#nav").appendTo(top.$("#containerMiddleLeft"));
	top.$("#banner").appendTo(top.$("#containerMiddleLeft"))
}
else {
	if(a==4||a==6) {
	top.$("#banner").appendTo(top.$("#containerMiddleCenterTop"));
	top.$("#nav").appendTo(top.$("#containerMiddleLeft"))
}
else {
	if(a==7) {
	top.$("#banner").prependTo(top.$("#containerFormsCenter"));
	top.$("#nav").appendTo(top.$("#webHeader .headerNav"))
}
else {
	if(a==8) {
	top.$("#banner").prependTo(top.$("#centerTopForms"));
	top.$("#nav").appendTo(top.$("#webHeader .headerNav"))
}
}}}}}}}};
	Site.initTemplateLayout=function(c,d,b) {
	var a=Fai.top.$("#webBanner");
	Site.navAppendToParent(c,d);
	if(c==0) {
	a.show();
	Site.showNavSubMenu(0);
	setTimeout(function() {
	Site.showNavItemContainer()
}
,200)}else {
	if(c==1) {
	a.show();
	Site.showNavSubMenu(0);
	setTimeout(function() {
	Site.showNavItemContainer()
}
,200)}else {
	if(c==2) {
	a.hide();
	Site.showNavSubMenu(0);
	setTimeout(function() {
	Site.showNavItemContainer()
}
,200)}else {
	if(c==3) {
	a.hide();
	Site.showNavSubMenu(1);
	setTimeout(function() {
	Site.showNavItemContainer()
}
,200);
	Site.hideNavItemContainer()}else {
	if(c==4) {
	a.hide();
	Site.showNavSubMenu(1);
	setTimeout(function() {
	Site.showNavItemContainer()
}
,200);
	Site.hideNavItemContainer()}else {
	if(c==5) {
	a.hide();
	Site.showNavSubMenu(1);
	setTimeout(function() {
	Site.showNavItemContainer()
}
,200);
	Site.hideNavItemContainer()}else {
	if(c==6) {
	a.hide();
	Site.showNavSubMenu(100);
	setTimeout(function() {
	Site.showNavItemContainer()
}
,200);
	Site.hideNavItemContainer()}else {
	if(c==7) {
	a.hide();
	Site.showNavSubMenu(0);
	setTimeout(function() {
	Site.showNavItemContainer()
}
,200)}else {
	if(c==8) {
	a.hide();
	Site.showNavSubMenu(0);
	setTimeout(function() {
	Site.showNavItemContainer()
}
,200)}}}}}}}}}if(Fai.top._manageMode) {
	setTimeout(function() {
	Site.absoluteNavDraggableAndResize(c,b)
}
,300)}};
	Site.logout=function(a) {
	Fai.ing("正在退出系统...",false);
	$.ajax( {
	type:"post",url:"ajax/login_h.jsp?cmd=logout",error:function() {
	Fai.ing("系统繁忙，请稍后重试。",false)
}
,success:function(b) {
	Fai.successHandle(b,"","系统繁忙，请稍后重试。",a,1,1)
}
})};
	Site.manageFaiscoAd=function() {
	if(_manageMode) {
	$(".siteAdvertisement_box").mouseover(function() {
	$(".siteAdvertisement_boxTip").css("display","block")
}
).mouseleave(function() {
	$(".siteAdvertisement_boxTip").css("display","none")
}
)}$(".reportUrl").mouseover(function() {
	$(this).text("举报此网站").css("text-decoration","underline")
}
).mouseleave(function() {
	$(this).text("举报").css("text-decoration","none")
}
);
	$(".closeImg").click(function() {
	if(_manageMode) {
	$.cookie("faiscoAd",false {
	path:"/"
}
)}$(".siteAdvertisement_box").css("display","none")});
	$(".siteAdvertisement_adImg").click(function() {
	if(_manageMode==true) {
	if(_cid%2==0) {
	Site.logDog(200004,2)
}
else {
	Site.logDog(200004,6)
}
}else {
	Site.logDog(200004,0)
}
});
	$(".freeJZ").click(function() {
	if(_manageMode==true) {
	if(_cid%2==0) {
	Site.logDog(200004,3)
}
else {
	Site.logDog(200004,7)
}
}else {
	Site.logDog(200004,1)
}
})};
	Site.initMulColModuleInIE=function(a) {
	if(Fai.isIE10()) {
	$(a).find(".mulModuleColStyleLine").css("height",$(a).height()-25+"px")
}
};
	Site.initCorpTitleJump=function() {
	$("#corpTitle").click(function() {
	var b=$(this).attr("_href");
	if(b==""||b==null) {
	return false
}
var a=parseInt($(this).attr("_linktype"));
	if(Fai.top._titleData!=null&&Fai.top._titleData!="") {
	if(Fai.top._titleData.jm.ot===1) {
	window.open(b)
}
else {
	Fai.top.location.href=b
}
}else {
	if(a===1) {
	window.open(b)
}
else {
	Fai.top.location.href=b
}
}})};
	Site.onTitleSiteFixTop=function() {
	var f,h=false,a=false,r=Fai.isIE6(),q=Fai.isIE7(),z=Fai.top.$("#corpTitle"),u=Fai.top.$(window),n=Fai.top.$("#g_main"),d=Fai.top.$("#web"),k=Fai.top.$("body"),w=Fai.top.$(".webTopTable"),g=Fai.top.$(".floatLeftTop"),e=z.parent(),m=Fai.top.$("#sitetips"),l,v=parseInt(z.css("top").replace("px","")),s=z.offset().top-n.offset().top,j=z.position().left,p=m.height()||0,c=s,b=g.css("top").replace("px","")||0,o=Fai.top.$(window),y=o;
	if(r||q) {
	a=true;
	y=n
}
var x=z.offset().left-e.offset().left;
	var t,i;
	y.off("scroll.title");
	y.on("scroll.title",function() {
	var B=y.scrollTop(),A=parseInt(g.css("top").replace("px",""))-1;
	b=A||0;
	f=Site.getNavInClientPosition(z).left;
	if(w.find("#corpTitle").length>0) {
	l=w;
	l.css( {
	zIndex:"60",position:"relative"
}
)}if(!h&&c<B) {
	if(r) {
	t=z.parent();
	i=z.offset().left-t.offset().left;
	k.prepend(z);
	z.css( {
	position:"absolute",left:f+"px",top:b+"px"
}
)}else {
	z.addClass("titlefixtop");
	z.css( {
	left:f+"px",top:b+"px",position:"fixed"
}
)}h=true}if(h&&c>B) {
	if(r) {
	e.append(z);
	z.css( {
	position:"absolute",left:j,top:s,zIndex:""
}
)}else {
	z.removeClass("titlefixtop");
	z.css( {
	position:"absolute",left:j,top:s
}
)}h=false}});
	Fai.top.$(window).on("resize.title",function() {
	if(r&&z.offset().top==0) {
	z.css("left",t.offset().left+i)
}
else {
	if(z.hasClass("titlefixtop")) {
	setTimeout(function() {
	z.css("left",e.offset().left+x)
}
,0)}}})};
	Site.onLogoSiteFixTop=function() {
	var f,j=false,a=false,s=Fai.isIE6(),q=Fai.isIE7(),g=Fai.top.$("#logo"),w=Fai.top.$(window),n=Fai.top.$("#g_main"),e=Fai.top.$("#web"),k=Fai.top.$("body"),x=Fai.top.$(".webTopTable"),i=Fai.top.$(".floatLeftTop"),h=g.parent(),m=Fai.top.$("#sitetips"),l,v=parseInt(g.css("top").replace("px","")),y=g.offset().top-n.offset().top,r=g.position().left,p=m.height()||0,d=y,c=i.css("top").replace("px","")||0,o=Fai.top.$(window),z=o;
	if(s||q) {
	a=true;
	z=n
}
var u=g.offset().left-h.offset().left;
	var t,b;
	z.off("scroll.logo");
	z.on("scroll.logo",function() {
	var B=z.scrollTop(),A=parseInt(i.css("top").replace("px",""))-1;
	c=A||0;
	f=Site.getNavInClientPosition(g).left;
	if(x.find("#logo").length>0) {
	l=x;
	l.css( {
	zIndex:"60",position:"relative"
}
)}if(!j&&d<B) {
	if(s) {
	t=g.parent();
	b=g.offset().left-t.offset().left;
	k.prepend(g);
	g.css( {
	position:"absolute",left:f+"px",top:c+"px",zIndex:60
}
)}else {
	g.addClass("logofixtop");
	g.css( {
	left:f+"px",top:c+"px",position:"fixed"
}
)}j=true}if(j&&d>B) {
	if(s) {
	h.append(g);
	g.css( {
	position:"absolute",left:r,top:y,zIndex:""
}
)}else {
	g.removeClass("logofixtop");
	g.css( {
	position:"absolute",left:r,top:y
}
)}j=false}});
	Fai.top.$(window).on("resize.logo",function() {
	if(s&&g.offset().top==0) {
	g.css("left",t.offset().left+b)
}
else {
	if(g.hasClass("logofixtop")) {
	setTimeout(function() {
	g.css("left",h.offset().left+u)
}
,0)}}})};
	Site.voidFun=function() {
	};
	Site.codeInsertButtom=function(d) {
	var b=/document.write/g;
	d=d.replace(b,"Site.voidFun");
	var a=document.createElement("script");
	a.type="text/javascript";
	try {
	a.appendChild(document.createTextNode(d))
}
catch(c) {
	a.text=d
}
document.body.appendChild(a)};
	Site.computeTabsWidthHideMore=function(e) {
	var d=Fai.top.$("#module"+e).find(".formTabButtonTopCenter");
	var c=parseInt(d.css("width"))+4;
	var b=0;
	var a=d.find(".formTabButton");
	$.each(a,function(f,h) {
	var g=parseInt($(h).css("width"));
	b+=g+5
}
);
	b+=40;
	if(b>c) {
	d.find(".formTabButtonMore").hide()
}
else {
	d.find(".formTabButtonMore").show()
}
};
	Site.wxShareAlter=function(a) {
	var c=new Array();
	c.push("<div class='wxShare'>");
	c.push("<div class='wxShareContent'>");
	c.push("<div class='wxShareDesc'>");
	c.push('<span>打开微信"扫一扫"，打开网页后点击屏幕右上角分享按钮</span>');
	c.push("</div>");
	c.push("<div class='wxShareQrcode'><img alt='' src='"+a+"' /></div>");
	c.push("</div>");
	c.push("</div>");
	var b=top.Fai.popupWindow( {
	width:480,height:420,frameScrolling:"no",bannerDisplay:false,bgClose:true,closeBtnClass:"wxSharehideCloseBtn",divContent:c.join("")
}
);
	if(Fai.isIE6()&&Fai.top.$("#fixSelectIframe"+b).length>0) {
	Fai.top.$("#fixSelectIframe"+b).remove()
}
};
	Site.hoverChangeImage=function() {
	var j=$("img[_defImg][_hovImg]");
	var f=$(".J_hoverImage");
	var n=false;
	var k=this.body?this.body:(this.editor?this.editor.body:false);
	if(k) {
	j=$(k).find("img[_defImg][_hovImg]")
}
if(k) {
	f=$(k).find(".J_hoverImage")
}
if(j.length==0) {
	return
}
f.remove();
	for(var o=0;
	o<j.length;
	o++) {
	var r=j[o];
	var l=$(r).parent();
	var e=$(r).position().top;
	var c=$(r).position().left;
	var p=$(r).width();
	var m=$(r).height();
	var d=$(r).attr("title")||"";
	var h="";
	var g=$(r).attr("_hovImg");
	var s="position:absolute;
	opacity:0;
	";n=($(r).parents(".richContent").length>0||k)&&$(l).is("p,span,td");
	if(n) {
	if(!(l[0].nodeName.toLowerCase()==="span"&&$(l).hasClass("J_hoverImageParent"))) {
	var a="display:inline-block;
	width:"+p+"px;
	height:"+m+"px;
	_display:block;
	_zoom:1;
	";$(r).after("<span class='J_hoverImageParent' style='"+a+"'></span>");
	l=$(r).next("span");
	$(l).append($(r))
}
}var h=$(l).find(".J_hoverImage");
	if(h.length==0) {
	s+="top:0px;
	left:0px;
	width:"+p+"px;
	height:"+m+"px;
	";h="<img class='J_hoverImage' src='"+g+"' style='"+s+(g?"":"visibility:hidden;
	")+"' title='"+d+"' alt='"+d+"' >";
	$(r).after(h)
}
$(r).css("opacity","")}var q=$(j).parent();
	$.each(q,function(u,v) {
	var w=$(this).find("img[_defImg]")[0];
	if($(w).attr("_hovImg").length==0) {
	return
}
var t=$(v).parents(".form");
	if(Fai.isChrome()&&!$(t).hasClass("formStyle31")) {
	$(v).css("position","relative")
}
$(v).off(".hoverImage");
	$(v).on("mouseenter.hoverImage",function() {
	var i=$(this).find("img[_defImg]")[0];
	var x=$(this).find(".J_hoverImage");
	b(i,x);
	$(i).stop(false,true).animate( {
	opacity:0
}
,200);
	$(x).stop(false,true).animate( {
	opacity:1
}
,200)}).on("mouseleave.hoverImage",function() {
	var i=$(this).find("img[_defImg]")[0];
	var x=$(this).find(".J_hoverImage");
	b(i,x);
	$(x).stop(false,true).animate( {
	opacity:0
}
,200);
	$(i).stop(false,true).animate( {
	opacity:1
}
,200)})});
	function b(w,z) {
	var u=$(w).width();
	var t=$(w).height();
	var v=$(w).position().top;
	var i=$(w).position().left;
	var y=$(w).css("margin-left");
	var x=$(w).css("margin-top");
	if(!!y) {
	y=parseInt(y.replace("px",""));
	i+=y
}
if(!!x) {
	x=parseInt(x.replace("px",""));
	v+=x
}
$(z).css( {
	top:v+"px",left:i+"px",width:u+"px",height:t+"px"
}
)}};
	Site.hoverStyle=function() {
	var h=$("a[aStyle_h]");
	var a=false;
	var j=this.body?this.body:(this.editor?this.editor.body:false);
	var f;
	var c;
	var d;
	var g=true;
	if(j) {
	h=$(j).find("a[aStyle_h]")
}
if(h.length==0) {
	return
}
for(var e=0;
	e<h.length;
	e++) {
	var b=h[e];
	$(b).off(".hoverStyle");
	$(b).on("mouseenter.hoverStyle",function() {
	var k=$.parseJSON($(this).attr("stylehover"));
	var i=$.parseJSON($(this).attr("wbackColor_h"));
	if(k==null&&i==null) {
	return
}
else {
	if(k!=null&&i==null) {
	if($(this).find("span").length==2) {
	$(this).find("span").children().remove()
}
d=$(this).css("text-decoration");
	c=$(this).css("color");
	f=$(this).find("span").clone();
	if($(this).find("span").length==1) {
	$(this).css( {
	"text-decoration":(k.u?"underline":"none"),color:k.c
}
);
	if(!k.u) {
	g=false
}
$(this).find("span").css( {
	"font-size":k.fs,"font-weight":k.b?"bold":"normal","font-family":k.ff,color:k.c,"text-decoration":k.u?"underline":"none"
}
)}}else {
	if(i!=null&&k==null) {
	if($(this).find("span").length==2) {
	$(this).find("span").children().remove()
}
f=$(this).find("span").clone();
	if($(this).find("span").length==1) {
	$(this).find("span").css( {
	"background-color":i.bc
}
)}}else {
	if($(this).find("span").length==2) {
	$(this).find("span").children().remove()
}
d=$(this).css("text-decoration");
	c=$(this).css("color");
	f=$(this).find("span").clone();
	if($(this).find("span").length==1) {
	$(this).css( {
	"text-decoration":(k.u?"underline":"none"),color:k.c
}
);
	if(!k.u) {
	g=false
}
$(this).find("span").first().css( {
	"font-size":k.fs,"font-weight":k.b?"bold":"normal","font-family":k.ff,color:k.c,"background-color":i.bc,"text-decoration":k.u?"underline":"none"
}
)}}}}}).on("mouseleave.hoverStyle",function() {
	var k=$.parseJSON($(this).attr("stylehover"));
	var i=$.parseJSON($(this).attr("wbackColor_h"));
	if(k==null&&i==null) {
	return
}
if(!g) {
	$(this).css( {
	"text-decoration":"none"
}
);
	g=true}if($(this).attr("astyle_h")==1) {
	$(this).css( {
	color:""+c+""
}
);
	$(this).css( {
	"text-decoration":""+d.split(" ")[0]+""
}
);
	d=null;
	c=null}else {
	if($(this).attr("astyle_h")==2) {
	$(this).css( {
	color:""
}
);
	$(this).css( {
	"text-decoration":""
}
)}}if($(this).find("span").length==1) {
	if($(this).find("strong").length==1) {
	$(this).find("strong").append(f)
}
else {
	$(this).append(f)
}
$(this).find("span").first().remove()}})}};
	Site.setFullMeasureBgHightInIe6=function(b) {
	if(Fai.isIE6()) {
	var a=Fai.top.$("#module"+b),c=a.height();
	a.find(".fullmeasureOuterContentBg"+b).css("height",c+"px");
	a.find(".fullmeasureContentBg"+b).css("height",c+"px")
}
};
	Site.popupPwdTips=function(b) {
	top.$.cookie("hasLoginSite","true" {
	expires:1,path:"/"
}
);
	top.$(".formDialog .formX").trigger("click");
	Fai.ing2("<span class = 'textSpan'>亲，你的密码不安全</span><div style = 'clear:both'></div><div class='tipsText'>为避免盗号造成损失，请修改密码</div><a class = 'setPwdButton' href='"+b+"/portal.jsp#appId=setPwd' onclick='Site.logDog(100068,9);
	'>修改密码</a><div class='tipsClose' onclick='tipsClose()'></div>",false);
	if(Fai.isMozilla()) {
	var a=Fai.top.$("html").scrollTop();
	top.$("#ing2").css( {
	top:a
}
)}top.$("#ing2").css( {
	transition:"opacity 0s ease",position:"absolute"
}
);
	Fai.bg()};
	/*!
* Clamp.js 0.5.1
*
* Copyright 2011-2013,Joseph Schmitt http://joe.sh
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* 第三方 多行省略代码
*/
(function(a,c) {
	function b(i,k) {
	k=k|| {
	};
	var u=this,l=window,g= {
	clamp:k.clamp||2,useNativeClamp:typeof(k.useNativeClamp)!="undefined"?k.useNativeClamp:true,splitOnChars:k.splitOnChars||[".","-","–","—"," "],animate:k.animate||false,truncationChar:k.truncationChar||"…",truncationHTML:k.truncationHTML
}
,s=i.style,A=i.innerHTML,w=typeof(i.style.webkitLineClamp)!="undefined",f=g.clamp,n=f.indexOf&&(f.indexOf("px")>-1||f.indexOf("em")>-1),p;
	if(g.truncationHTML) {
	p=document.createElement("span");
	p.innerHTML=g.truncationHTML
}
var e=g.splitOnChars.slice(0),x=e[0],r,z;
	if(f=="auto") {
	f=j()
}
else {
	if(n) {
	f=j(parseInt(f))
}
}var q;
	if(w&&g.useNativeClamp) {
	s.overflow="hidden";
	s.textOverflow="ellipsis";
	s.webkitBoxOrient="vertical";
	s.display="-webkit-box";
	s.webkitLineClamp=f;
	if(n) {
	s.height=g.clamp+"px"
}
}else {
	var v=y(f);
	if(v<=i.clientHeight) {
	q=h(d(i),v)
}
}return {
	original:A,clamped:q
}
;function t(B,C) {
	if(!l.getComputedStyle) {
	l.getComputedStyle=function(D,E) {
	this.el=D;
	this.getPropertyValue=function(G) {
	var F=/(\-([a-z]) {
	1
}
)/g;
	if(G=="float") {
	G="styleFloat"
}
if(F.test(G)) {
	G=G.replace(F,function() {
	return arguments[2].toUpperCase()
}
)}return D.currentStyle&&D.currentStyle[G]?D.currentStyle[G]:null};
	return this}}return l.getComputedStyle(B,null).getPropertyValue(C)}function j(B) {
	var C=B||i.clientHeight,D=o(i);
	return Math.max(Math.floor(C/D),0)
}
function y(B) {
	var C=o(i);
	return C*B
}
function o(C) {
	var B=t(C,"line-height");
	if(B=="normal") {
	B=parseInt(t(C,"font-size"))*1.2
}
return parseInt(B)}function d(B) {
	if(B.lastChild.children&&B.lastChild.children.length>0) {
	return d(Array.prototype.slice.call(B.children).pop())
}
else {
	if(!B.lastChild||!B.lastChild.nodeValue||B.lastChild.nodeValue==""||B.lastChild.nodeValue==g.truncationChar) {
	B.lastChild.parentNode.removeChild(B.lastChild);
	return d(i)
}
else {
	return B.lastChild
}
}}function h(E,D) {
	if(!D) {
	return
}
function C() {
	e=g.splitOnChars.slice(0);
	x=e[0];
	r=null;
	z=null
}
var B=E.nodeValue.replace(g.truncationChar,"");
	if(!r) {
	if(e.length>0) {
	x=e.shift()
}
else {
	x=""
}
r=B.split(x)}if(r.length>1) {
	z=r.pop();
	m(E,r.join(x))
}
else {
	r=null
}
if(p) {
	E.nodeValue=E.nodeValue.replace(g.truncationChar,"");
	i.innerHTML=E.nodeValue+" "+p.innerHTML+g.truncationChar
}
if(r) {
	if(i.clientHeight<=D) {
	if(e.length>=0&&x!="") {
	m(E,r.join(x)+x+z);
	r=null
}
else {
	return i.innerHTML
}
}}else {
	if(x=="") {
	m(E,"");
	E=d(i);
	C()
}
}if(g.animate) {
	setTimeout(function() {
	h(E,D)
}
,g.animate===true?10:g.animate)}else {
	return h(E,D)
}
}function m(B,C) {
	B.nodeValue=C+g.truncationChar
}
}a.clamp=b})(Site);