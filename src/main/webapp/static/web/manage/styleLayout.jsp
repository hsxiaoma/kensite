<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/taglib/common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="g_htmlManage">

<head>
<title>智慧星河</title>
<%@ include file="/WEB-INF/view/taglib/header.jsp"%>
<%
	String popupID = request.getParameter("popupID");
%>
<meta name="renderer" content="webkit" />
<meta name="mobile-agent"
	content="format=html5;url=http://m.seeyoui.icoc.in/" />
<link href="${ctx_web}/css/manage.css" rel="stylesheet" type="text/css" />
<script type="text/javascript"
	src="${ctx_web}/js/comm/jquery/jquery-core.min.js?v=201503161711"></script>
<script type="text/javascript"
	src="${ctx_web}/js/comm/fai.min.js?v=201512071738"></script>
<script type="text/javascript"
	src="${ctx_web}/js/comm/jquery/jquery-ui-core.min.js?v=201511231730"></script>
<script type="text/javascript"
	src="${ctx_web}/js/comm/pinyin.min.js?v=201306041217"></script>
<script type="text/javascript"
	src="${ctx_web}/js/comm/faiui.min.js?v=201601111801"></script>
<script type="text/javascript"
	src="${ctx_web}/js/site.min.js?v=201601131153"></script>
<script type="text/javascript"
	src="${ctx_web}/js/manage.min.js?v=201601121610"></script>
<script type="text/javascript">
	try {
		Fai.top = parent.Fai.top;
	} catch (e) {
	}
</script>
<link rel="stylesheet" type="text/css"
	href="${ctx_web}/css/styleLayout.css" />
<script type="text/javascript">
	var nowTemplateLayout = -1;

	// 给外面调用的
	function refreshAllLayout() {
		$('.layoutItem').data('display', 0);
		var layoutList = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
		for (var i = 0; i < layoutList.length; ++i) {
			if (!Site.isLayoutHidden(layoutList[i])) {
				$('#layout' + layoutList[i]).data('display', 1);
			}
		}
		if (nowTemplateLayout != top._templateLayout) {
			nowTemplateLayout = top._templateLayout;
			refreshLayout(false, nowTemplateLayout, -1);
		}
	}

	function refreshLayout(setTop, templateLayout, itemLayout) {
		// 设置要隐藏的layout
		if (templateLayout != -1) {
			$('.layoutItem').data('close', 0);
			if (templateLayout == 2 || templateLayout == 3
					|| templateLayout == 4 || templateLayout == 5
					|| templateLayout == 7) {
				$('#layout3').data('close', '1');
			} else if (templateLayout == 8) {
				$('#layout1').data('close', '1');
			}
			$('#layoutPanel').attr("class", "layoutPanel" + templateLayout);
			Fai.refreshClass($('#layoutPanel'));

			refreshQuickLayout(templateLayout);
		}

		var panel = $('#layoutPanel');
		$('.layoutItem').each(function() {
			var layout = parseInt($(this).attr('layout'));
			if (itemLayout != -1 && itemLayout != layout) {
				return;
			}
			if ($(this).data('close') == 1) {
				/*
				在切换模版那边做了
				if (setTop) {
					// 只是界面上隐藏，这样下次在此打开这个区域时还有数据
					Site.hideLayout(layout, true);
				}
				 */
			} else {
				$(this).removeClass('layoutItemClose' + layout);
				if ($(this).data('display') == 1) {
					/*
					if (layout == 1) {
						top._templateChangeLayoutList.left = true;
					}
					if (layout == 3) {
						top._templateChangeLayoutList.right = true;
					}
					 */
					if (setTop) {
						Site.showLayout(layout);
					}
					panel.removeClass('layoutPanelHide' + layout);
					$(this).addClass('layoutItemShow');
					$(this).attr('title', '点击隐藏此区域');
				} else {
					/*
					if (layout == 1) {
						top._templateChangeLayoutList.left = false;
					}
					if (layout == 3) {
						top._templateChangeLayoutList.right = false;
					}
					 */
					if (setTop) {
						Site.hideLayout(layout, false);
					}
					panel.addClass('layoutPanelHide' + layout);
					$(this).removeClass('layoutItemShow');
					$(this).attr('title', '点击显示此区域');
				}
			}
		});
		refreshFreeToQuick();
		Site.displayAddModule();
	}

	//根据自由版式情况选择标准版式
	function refreshFreeToQuick() {
		var free1 = $("#layout1").hasClass("layoutItemShow");
		var free2 = $("#layout2").hasClass("layoutItemShow");
		var free3 = $("#layout3").hasClass("layoutItemShow");
		var free4 = $("#layout4").hasClass("layoutItemShow");
		var free5 = $("#layout5").hasClass("layoutItemShow");
		var free6 = $("#layout6").hasClass("layoutItemShow");
		var free7 = $("#layout7").hasClass("layoutItemShow");
		var free8 = $("#layout8").hasClass("layoutItemShow");
		if ($(".checkItem")) { //选择不同版式时，选择的版式打勾勾~
			$(".checkItem").addClass("uncheckItem").removeClass("checkItem");

		}
		if (top._templateLayout == 0 || top._templateLayout == 1) {
			//1
			if (free1 == true && free2 == true && free3 == false
					&& free4 == false && free5 == false && free6 == false
					&& free7 == false && free8 == false) {
				$(".item1 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//5
			else if (free1 == true && free2 == true && free3 == false
					&& free4 == true && free5 == true && free6 == false
					&& free7 == false && free8 == false) {
				$(".item5 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//6
			else if (free1 == true && free2 == true && free3 == false
					&& free4 == true && free5 == true && free6 == true
					&& free7 == false && free8 == false) {
				$(".item6 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//3
			else if (free1 == false && free2 == true && free3 == true
					&& free4 == false && free5 == false && free6 == false
					&& free7 == false && free8 == false) {
				$(".item3 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//4
			else if (free1 == false && free2 == true && free3 == false
					&& free4 == false && free5 == false && free6 == false
					&& free7 == false && free8 == false) {
				$(".item4 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//2
			else if (free1 == true && free2 == true && free3 == true
					&& free4 == false && free5 == false && free6 == false
					&& free7 == false && free8 == false) {
				$(".item2 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//8
			else if (free1 == true && free2 == true && free3 == true
					&& free4 == true && free5 == true && free6 == false
					&& free7 == false && free8 == true) {
				$(".item8 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//7
			else if (free1 == true && free2 == true && free3 == false
					&& free4 == true && free5 == true && free6 == false
					&& free7 == false && free8 == true) {
				$(".item7 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
		} else if (top._templateLayout == 7) {//15-17的layout不能使用layout3判断
			//15
			if (free1 == true && free2 == true && free4 == false
					&& free5 == false && free6 == false && free7 == false
					&& free8 == false) {
				$(".item15 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//16
			else if (free1 == true && free2 == true && free4 == true
					&& free5 == true && free6 == true && free7 == false
					&& free8 == false) {
				$(".item16 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//17
			else if (free1 == true && free2 == true && free4 == true
					&& free5 == true && free6 == false && free7 == false
					&& free8 == false) {
				$(".item17 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
		} else if (top._templateLayout == 8) {//18的layout不能使用layout1判断
			//18
			if (free2 == true && free3 == true && free4 == false
					&& free5 == false && free6 == false && free7 == false
					&& free8 == false) {
				$(".item18 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
		} else if (top._templateLayout == 4) {//21-25的layout不能使用layout3判断
			//22
			if (free1 == true && free2 == true && free4 == false
					&& free5 == false && free6 == false && free7 == false
					&& free8 == false) {
				$(".item22 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//23
			else if (free1 == true && free2 == true && free4 == true
					&& free5 == true && free6 == true && free7 == false
					&& free8 == false) {
				$(".item23 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//24
			else if (free1 == true && free2 == true && free4 == true
					&& free5 == true && free6 == false && free7 == false
					&& free8 == false) {
				$(".item24 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//21
			else if (free1 == false && free2 == true && free4 == false
					&& free5 == false && free6 == false && free7 == false
					&& free8 == false) {
				$(".item21 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
			//25
			else if (free1 == true && free2 == true && free4 == true
					&& free5 == true && free6 == false && free7 == false
					&& free8 == true) {
				$(".item25 .uncheckItem").addClass("checkItem").removeClass(
						"uncheckItem");
			}
		}
	}

	function addQuickLayoutItem(id) {
		//var item = '<div class="quickLayoutItem" style="background:url(${ctx_web}/image/site/layout/' + id + '.gif);"></div>';

		//导航和横幅在一行
		if (id == 1) {
			var item = '<div class="quickLayoutItem item1"  style="background:url(${ctx_web}/image/site/layout/layout.png) 1px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) 1px -380px "></div></div>';
		} else if (id == 4) {
			var item = '<div class="quickLayoutItem item4" style="background:url(${ctx_web}/image/site/layout/layout.png) -144px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -144px -380px "></div></div>';
		} else if (id == 6) {
			var item = '<div class="quickLayoutItem item6" style="background:url(${ctx_web}/image/site/layout/layout.png) -289px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -289px -380px "></div></div>';
		} else if (id == 2) {
			var item = '<div class="quickLayoutItem item2" style="background:url(${ctx_web}/image/site/layout/layout.png) -434px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -434px -380px "></div></div>';
		} else if (id == 5) {
			var item = '<div class="quickLayoutItem item5" style="background:url(${ctx_web}/image/site/layout/layout.png) -579px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -579px -380px "></div></div>';
		} else if (id == 8) {
			var item = '<div class="quickLayoutItem item8" style="background:url(${ctx_web}/image/site/layout/layout.png) -724px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -724px -380px "></div></div>';
		} else if (id == 7) {
			var item = '<div class="quickLayoutItem item7" style="background:url(${ctx_web}/image/site/layout/layout.png) -869px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -869px -380px"></div></div>';
		} else if (id == 3) {
			var item = '<div class="quickLayoutItem item3" style="background:url(${ctx_web}/image/site/layout/layout.png) -1014px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -1014px -380px "></div></div>';
		}
		//导航一行、横幅在右上
		else if (id == 15) {
			var item = '<div class="quickLayoutItem item15" style="background:url(${ctx_web}/image/site/layout/layout.png) 1px -190px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) 1px -570px "></div></div>';
		} else if (id == 16) {
			var item = '<div class="quickLayoutItem item16" style="background:url(${ctx_web}/image/site/layout/layout.png) -144px -190px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -144px -570px "></div></div>';
		} else if (id == 17) {
			var item = '<div class="quickLayoutItem item17" style="background:url(${ctx_web}/image/site/layout/layout.png) -289px -190px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -289px -570px "></div></div>';
		}
		//导航一行、横幅在左上
		else if (id == 18) {
			var item = '<div class="quickLayoutItem item18" style="background:url(${ctx_web}/image/site/layout/layout.png) -434px -190px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -434px -570px "></div></div>';
		}
		//
		else if (id == 21) {
			var item = '<div class="quickLayoutItem item21" style="background:url(${ctx_web}/image/site/layout/layout.png) -144px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -144px -380px "></div></div>';
		} else if (id == 22) {
			var item = '<div class="quickLayoutItem item22" style="background:url(${ctx_web}/image/site/layout/layout.png) 1px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) 1px -380px "></div></div>';
		} else if (id == 23) {
			var item = '<div class="quickLayoutItem item23" style="background:url(${ctx_web}/image/site/layout/layout.png) -289px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -289px -380px "></div></div>';
		} else if (id == 24) {
			var item = '<div class="quickLayoutItem item24" style="background:url(${ctx_web}/image/site/layout/layout.png) -579px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -579px -380px "></div></div>';
		} else if (id == 25) {
			var item = '<div class="quickLayoutItem item25" style="background:url(${ctx_web}/image/site/layout/layout.png) -869px 0px "><div class="item_bg" style="background:url(${ctx_web}/image/site/layout/layout.png) -869px -380px "></div></div>';
		}

		item = $(item).appendTo($(".quickLayoutPanel"));
		var item_id = ".item" + id;
		var checkItem = '<div class="uncheckItem" style="background:url(${ctx_web}/image/site/layout/layout.png) 2px -760px"></div>';
		$(checkItem).appendTo($(item_id));

		//$(item).fadeIn();

		item.click(function() {
			Site.logDog(100042, 100 + id);
			if (id == 1) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 0);
				$("#layout5").data("display", 0);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 2) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 1);
				$("#layout4").data("display", 0);
				$("#layout5").data("display", 0);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 3) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 0);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 1);
				$("#layout4").data("display", 0);
				$("#layout5").data("display", 0);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 4) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 0);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 0);
				$("#layout5").data("display", 0);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 5) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 6) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 1);
				$("#layout8").data("display", 0);
			} else if (id == 7) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 1);
			} else if (id == 8) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 1);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 1);
			} else if (id == 9) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 0);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 1);
				$("#layout8").data("display", 0);
			} else if (id == 10) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 0);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 11) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 0);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 0);
				$("#layout5").data("display", 0);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 12) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 0);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 0);
				$("#layout5").data("display", 0);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 13) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 0);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 14) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 0);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 1);
				$("#layout8").data("display", 0);
			} else if (id == 15) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 0);
				$("#layout5").data("display", 0);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 16) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 1);
				$("#layout8").data("display", 0);
			} else if (id == 17) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 18) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 0);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 1);
				$("#layout4").data("display", 0);
				$("#layout5").data("display", 0);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 19) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 0);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 1);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 1);
				$("#layout8").data("display", 0);
			} else if (id == 20) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 0);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 1);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 21) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 0);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 0);
				$("#layout5").data("display", 0);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 22) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 0);
				$("#layout5").data("display", 0);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 23) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 1);
				$("#layout8").data("display", 0);
			} else if (id == 24) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 0);
			} else if (id == 25) {
				$("#layout7").data("display", 0);
				$("#layout1").data("display", 1);
				$("#layout2").data("display", 1);
				$("#layout3").data("display", 0);
				$("#layout4").data("display", 1);
				$("#layout5").data("display", 1);
				$("#layout6").data("display", 0);
				$("#layout8").data("display", 1);
			}
			refreshLayout(true, -1, -1);
			Site.refreshAllAbsForms();
			Site.adjustLayout4And5Width();
			top._layoutChanged++;
			Site.styleChanged();
			Site.scrollToDiv(top.$("#webFooterTable")); //内容区滚动条滚到底
			Site.logClick(88);
			Site.triggerGobalEvent("siteLayoutChange", "");
			Site.setRefreshInfo("siteLayout", true);
			Site.adjustPhotoCard();
		});

		// 鼠标移动到版式时的hover效果
		var item_id_bg = item_id + " .item_bg";
		$(item_id).hover(function() { //透明度从0到1的渐变
			$(item_id_bg).css({
				"opacity" : "1"
			});
			//var opacity = $(item_id_bg).css("opacity");
			//itemFadeIn(opacity,item_id_bg);
		}, function() {
			$(item_id_bg).css({
				"opacity" : "0"
			});
			//var opacity = $(item_id_bg).css("opacity");
			//itemFadeOut(opacity,item_id_bg);
		});

	}
	//鼠标移动到版式时的淡入效果
	function itemFadeIn(opacity, item) {
		if (opacity < 1) {
			opacity = Number(opacity) + 0.25;
			$(item).css({
				"opacity" : opacity
			});
			setTimeout(function() {
				itemFadeIn(opacity, item);
			}, 50);
		} else {
			$(item).css({
				"opacity" : "1"
			});
		}
	}
	//鼠标移动到版式时的淡出效果
	function itemFadeOut(opacity, item) {
		if (opacity > 0) {
			opacity = Number(opacity) - 0.25;
			$(item).css({
				"opacity" : opacity
			});
			setTimeout(function() {
				itemFadeOut(opacity, item);
			}, 50);
		} else {
			$(item).css({
				"opacity" : "0"
			});
		}
	}

	function refreshQuickLayout(templateLayout) {
		$(".quickLayoutItem").remove();
		if (templateLayout == 0 || templateLayout == 1) {
			addQuickLayoutItem(1);
			addQuickLayoutItem(4);
			addQuickLayoutItem(6);
			addQuickLayoutItem(2);
			addQuickLayoutItem(5);
			addQuickLayoutItem(8);
			addQuickLayoutItem(7);
			addQuickLayoutItem(3);
		} else if (templateLayout == 2) {
			addQuickLayoutItem(9);
			addQuickLayoutItem(10);
			addQuickLayoutItem(11);
		} else if (templateLayout == 3) {
			addQuickLayoutItem(12);
			addQuickLayoutItem(13);
			addQuickLayoutItem(14);
		} else if (templateLayout == 4) {
			addQuickLayoutItem(21);
			addQuickLayoutItem(22);
			addQuickLayoutItem(23);
			addQuickLayoutItem(24);
			addQuickLayoutItem(25);
		} else if (templateLayout == 5) {
			addQuickLayoutItem(12);
			addQuickLayoutItem(13);
			addQuickLayoutItem(14);
		} else if (templateLayout == 6) {
		} else if (templateLayout == 7) {
			addQuickLayoutItem(15);
			addQuickLayoutItem(16);
			addQuickLayoutItem(17);
		} else if (templateLayout == 8) {
			addQuickLayoutItem(18);
			//addQuickLayoutItem(19);
			//addQuickLayoutItem(20);
		}
	}

	$(function() {
		var styleDesignHeight = ~~($.cookie('styleDesignHeight', {
			path : '/'
		}));
		if (styleDesignHeight > 100) {
			var tabsHeight = Fai.top.$("#styleDesign").children(".tabsWrap")
					.height() || 37;
			var panelsHeight = styleDesignHeight - tabsHeight;
			$('.quickLayoutPanel').height(panelsHeight + "px");
			$('.contentLeft').height((panelsHeight - 20) + "px");
		}

		//当拖动设置面板调节显示区高度时，触发
		Site.bindGobalEvent("styleDesignResize", function(event, option) {
			$('.quickLayoutPanel').height(option + "px");
			$('.contentLeft').height((option - 20) + "px");
		});

		// 二级tab的hover和check
		$('.menu').hover(function() {
			$(this).addClass('menuHovor');
		}, function() {
			$(this).removeClass('menuHovor');
		});
		$('#quickLayoutShow').click();

		$('.layoutItem').hover(function() {
			$(this).addClass('layoutItemHover');
		}, function() {
			$(this).removeClass('layoutItemHover');
		});
		$('.layoutItem')
				.click(
						function() {
							var layout = $(this).attr('layout');

							if ($(this).data('close') == 1) {
								return;
							}
							if ($(this).data('display') == 1) {
								$(this).data('display', 0);
							} else {
								$(this).data('display', 1);
							}

							refreshLayout(true, -1, layout);
							Site.refreshAllAbsForms();
							top._layoutChanged++;
							Site.styleChanged();

							top.$('div.form').each(
									function(i, form) {
										var jform = $(form);
										if (jform.hasClass('formStyle30')) {
											top.Site.moduleSizeChange(jform
													.attr('id'));
										}
									})

							if ($(this).data('display') == 1) {
								Site.scrollToDiv(top.$('#'
										+ Site.getLayoutForms(layout)));
							}

							/***每次版式隐藏和显示都判断是否影响到4 5的宽度调整操作***/
							var middleLeftForms = Fai.top.$("#middleLeftForms");
							var middleRightForms = Fai.top
									.$("#middleRightForms");

							Fai.top.$('#middleLeftFormsHider').remove();

							if (layout == 4 || layout == 5 || layout == 1
									|| layout == 3) { //当layout4或layout5隐藏时他们的宽度会重设为默认值
								var containerFormsCenterMiddle = Fai.top
										.$('.containerFormsCenterMiddle');
								middleLeftForms.css('width', '49%');
								middleRightForms.css('width', '49%');
								Fai.top._colOtherStyleData.layout4Width = 0;
								Fai.top._colOtherStyleData.layout5Width = 0;
								//layout4的padding-right
								middleLeftForms.css('padding-right', Math
										.floor(containerFormsCenterMiddle
												.width() * 0.02));
							}
							//当两个layout4和layout5同时存在就重新绑定事件
							if (middleLeftForms.css('display') == 'block'
									&& middleRightForms.css('display') == 'block') {
								if (middleLeftForms.height() < middleRightForms
										.height()) {

									var middleLeftFormsHider = $(
											"<div id='middleLeftFormsHider' class='middleLeftFormsHider'></div>")
											.appendTo(middleLeftForms);
									middleLeftFormsHider.css('height',
											middleRightForms.height()
													- middleLeftForms.height());
								}
								Fai.top.Site.bindInLayoutResizableModule();
							}
							/***end***/

							Site.logClick(49);
							Site.triggerGobalEvent("siteLayoutChange", "");
							Site.setRefreshInfo("siteLayout", true);
						});

		refreshAllLayout();
		Site.logDog(100039, 3);
		Site.logDog(100042, 0);
	});

	function quickLayoutShow() {
		$('.quickLayout').show();
		$('.freeLayout').hide();
		var menu = $('#quickLayoutShow');
		tabCheck(menu);
	}

	function freeLayoutShow() {
		Site.logDog(100042, 1);
		$('.freeLayout').show();
		$('.quickLayout').hide();
		var menu = $('#freeLayoutShow');
		tabCheck(menu);
	}

	function tabCheck(ctrl) {
		var allTab = $('.menu');
		if (!ctrl.hasClass('menuCheck')) {
			allTab.removeClass('menuCheck');
			ctrl.addClass('menuCheck');
		}
	}
</script>
<style type="text/css">
html {
	overflow: hidden;
}

body {
	font-size: 12px;
	overflow: hidden;
	width: 100%;
	*width: expression(document.body.offsetWidth);
	_width: expression(document.body.offsetWidth-17); /*height:205px;*/
}

image {
	border: 0px;
}

.quickLayout {
	padding: 0 0 0 20px; /*height:205px;*/
}

.quickLayoutType {
	padding: 0px;
	margin: 0px;
	height: 19px;
	line-height: 19px;
}

.quickLayoutPanel {
	clear: both;
	width: 100%;
	height: auto;
	height: 205px;
	float: left;
	overflow-x: hidden;
	overflow-y: auto;
	_position: relative;
}

.quickLayoutItem {
	float: left;
	width: 117px;
	height: 141px;
	margin: 20px 25px 3px 0px;
	border: solid #bbb 1px;
	border-top: 0;
	border-left: 0;
	cursor: pointer;
	opacity: 1;
	filter: alpha(opacity = 100);
}

.item_bg {
	display: block;
	width: 117px;
	height: 141px;
	opacity: 0;
	filter: alpha(opacity = 0);
}

.checkItem {
	display: block;
	position: relative;
	width: 33px;
	height: 33px;
	margin-top: -30px;
	margin-left: 85px;
	_margin-top: -33px;
	_margin-left: 84px;
	_zoom: 1;
	_overflow: auto;
}

.uncheckItem {
	display: none;
}

.layoutItem {
	border: 1px #88b7ff dashed;
	background: #fff;
	text-align: center;
	color: #666;
	cursor: pointer;
}

.layoutItemHover {
	background: #e8f3fe;
	border-style: solid;
	border-color: #3298fe;
}

.layoutItemShow {
	background: #1ebfba;
	border-style: solid;
	border-color: #88b7ff;
}

.layoutItemClose {
	background: #ccc;
	border-style: solid;
}

#layoutPanel {
	margin-top: 10px;
	width: 120px;
}

#layoutNavBannerHeader {
	clear: both;
	width: 100%;
	font-size: 12px;
	height: 15px;
	background: #ffffd6;
	border: 1px #e8ffff solid;
	margin-bottom: 3px;
}

#layoutNavHeader {
	display: none;
	clear: both;
	width: 100%;
	font-size: 12px;
	height: 15px;
	background: #FFC;
	border: 1px #D2DCEC solid;
	margin-bottom: 3px;
}

#layoutNavBannerLeft {
	display: none;
	clear: both;
	float: left;
	width: 20px;
	height: 140px;
	margin-right: 3px;
	background: #FFC;
	border: 1px #D2DCEC solid;
}

#layoutBannerLeft {
	display: none;
	float: left;
	width: 20px;
	height: 140px;
	margin-right: 3px;
	background: #FFC;
	border: 1px #D2DCEC solid;
}

#layoutNavLeft {
	display: none;
	float: left;
	width: 20px;
	height: 140px;
	margin-right: 3px;
	background: #FFC;
	border: 1px #D2DCEC solid;
}

#layoutBannerTop {
	display: none;
	float: left;
	width: 100%;
	height: 15px;
	margin-bottom: 3px;
	background: #FFC;
	border: 1px #D2DCEC solid;
}

#layoutBannerCenterTop {
	display: none;
	float: left;
	width: 100%;
	height: 15px;
	margin-bottom: 3px;
	background: #FFC;
	border: 1px #D2DCEC solid;
}

#layoutContainer {
	float: left;
	width: 120px;
}

#layoutMiddle {
	clear: both;
	width: 100%;
}

#layoutLeft {
	width: 25px;
	padding-right: 5px;
	overflow: hidden;
}

#layoutCenter {
	overflow: hidden;
	padding-right: 2px;
}

#layoutRight {
	width: 25px;
	padding-left: 5px;
	overflow: hidden;
}

#layoutCenterMiddle {
	clear: both;
	float: left;
	width: 100%;
	margin-bottom: 3px;
}

#layout7 {
	clear: both;
	height: 20px;
	width: 100%;
	margin-bottom: 3px;
}

#layout1 {
	height: 90px;
}

#layout2 {
	clear: both;
	width: 100%;
	height: 20px;
	margin-bottom: 3px;
}

#layout4 {
	float: left;
	width: 45%;
	height: 40px;
}

#layout5 {
	float: right;
	width: 45%;
	height: 40px;
}

#layout6 {
	clear: both;
	width: 100%;
	height: 20px;
}

#layout3 {
	height: 90px;
}

#layout8 {
	clear: both;
	width: 100%;
	height: 20px;
	margin-top: 3px;
}

.layoutPanel2 #layoutNavBannerHeader {
	display: none;
}

.layoutPanel2 #layoutNavHeader {
	display: block;
}

.layoutPanel2 #layoutBannerLeft {
	display: block;
}

.layoutPanel2 #layoutRight {
	display: none;
}

.layoutPanel2 #layoutCenter {
	
}

.layoutPanel2 #layoutContainer {
	width: 90px;
}

.layoutPanel3 #layoutNavBannerHeader {
	display: none;
}

.layoutPanel3 #layoutNavBannerLeft {
	display: block;
}

.layoutPanel3 #layoutRight {
	display: none;
}

.layoutPanel3 #layoutCenter {
	
}

.layoutPanel3 #layoutContainer {
	width: 90px;
}

.layoutPanel4 #layoutNavBannerHeader {
	display: none;
}

.layoutPanel4 #layoutNavLeft {
	display: block;
	height: 160px;
}

.layoutPanel4 #layoutRight {
	display: none;
}

.layoutPanel4 #layoutCenter {
	
}

.layoutPanel4 #layoutContainer {
	width: 90px;
}

.layoutPanel4 #layoutBannerTop {
	display: block;
}

.layoutPanel5 #layoutNavBannerHeader {
	display: none;
}

.layoutPanel5 #layoutNavBannerLeft {
	display: block;
}

.layoutPanel5 #layoutRight {
	display: none;
}

.layoutPanel5 #layoutCenter {
	
}

.layoutPanel5 #layoutContainer {
	width: 90px;
}

.layoutPanel6 #layoutNavBannerHeader {
	display: none;
}

.layoutPanel6 #layoutNavLeft {
	display: block;
	height: 160px;
}

.layoutPanel6 #layoutCenter {
	
}

.layoutPanel6 #layoutLeft {
	width: 15px;
}

.layoutPanel6 #layoutRight {
	width: 15px;
}

.layoutPanel6 #layoutContainer {
	width: 90px;
}

.layoutPanel6 #layoutBannerTop {
	display: block;
}

.layoutPanel7 #layoutNavBannerHeader {
	display: none;
}

.layoutPanel7 #layoutNavHeader {
	display: block;
}

.layoutPanel7 #layoutCenter {
	
}

.layoutPanel7 #layoutRight {
	display: none;
}

.layoutPanel7 #layoutBannerCenterTop {
	display: block;
}

.layoutPanel7 #layout4 {
	height: 25px;
}

.layoutPanel7 #layout5 {
	height: 25px;
}

.layoutPanel8 #layoutNavBannerHeader {
	display: none;
}

.layoutPanel8 #layoutNavHeader {
	display: block;
}

.layoutPanel8 #layoutCenter {
	
}

.layoutPanel8 #layoutLeft {
	display: none;
}

.layoutPanel8 #layoutBannerCenterTop {
	display: block;
}

.layoutPanel8 #layout4 {
	height: 25px;
}

.layoutPanel8 #layout5 {
	height: 25px;
}

.layoutPanelHide7 #layout7 { /*height:10px;*/
	
}

.layoutPanelHide1 #layoutLeft {
	width: 10px;
}

.layoutPanelHide3 #layoutRight {
	width: 10px;
}

.layoutPanelHide2 #layout2 { /*height:10px;*/
	
}

.layoutPanelHide6 #layout6 { /*height:10px;*/
	
}

.layoutPanelHide8 #layout8 { /*height:10px;*/
	
}
</style>

</head>
<body>
	<table style="table-layout: fixed; width: 1000px; margin: 0 auto;"
		cellpadding="0" cellspacing="0">
		<tbody>
			<tr>
				<td style="width: 100%;">
					<div class="contentLeft" style="*height: 205px;">
						<div class="contentTopBg"></div>
						<div class="contentBottomBg"></div>
						<ul>
							<li id="quickLayoutShow" class="menu" onclick="quickLayoutShow()">标准版式</li>
							<li id="freeLayoutShow" class="menu menuCheck"
								onclick="freeLayoutShow()">自由版式</li>
						</ul>
					</div>
					<div class="contentRight">
						<div style="display: none;" class="quickLayout">

							<div class="quickLayoutPanel">
								<div class="quickLayoutItem item1"
									style="background: url(${ctx_web}/image/site/layout/layout.png) 1px 0px">
									<div class="item_bg"
										style="background: transparent url(&quot;${ctx_web}/image/site/layout/layout.png&quot;) repeat scroll 1px -380px; opacity: 0;"></div>
									<div class="uncheckItem"
										style="background: url(${ctx_web}/image/site/layout/layout.png) 2px -760px"></div>
								</div>
								<div class="quickLayoutItem item4"
									style="background: url(${ctx_web}/image/site/layout/layout.png) -144px 0px">
									<div class="item_bg"
										style="background: transparent url(&quot;${ctx_web}/image/site/layout/layout.png&quot;) repeat scroll -144px -380px; opacity: 0;"></div>
									<div class="checkItem"
										style="background: url(${ctx_web}/image/site/layout/layout.png) 2px -760px"></div>
								</div>
								<div class="quickLayoutItem item6"
									style="background: url(${ctx_web}/image/site/layout/layout.png) -289px 0px">
									<div class="item_bg"
										style="background: transparent url(&quot;${ctx_web}/image/site/layout/layout.png&quot;) repeat scroll -289px -380px; opacity: 0;"></div>
									<div class="uncheckItem"
										style="background: url(${ctx_web}/image/site/layout/layout.png) 2px -760px"></div>
								</div>
								<div class="quickLayoutItem item2"
									style="background: url(${ctx_web}/image/site/layout/layout.png) -434px 0px">
									<div class="item_bg"
										style="background: transparent url(&quot;${ctx_web}/image/site/layout/layout.png&quot;) repeat scroll -434px -380px; opacity: 0;"></div>
									<div class="uncheckItem"
										style="background: url(${ctx_web}/image/site/layout/layout.png) 2px -760px"></div>
								</div>
								<div class="quickLayoutItem item5"
									style="background: url(${ctx_web}/image/site/layout/layout.png) -579px 0px">
									<div class="item_bg"
										style="background: transparent url(&quot;${ctx_web}/image/site/layout/layout.png&quot;) repeat scroll -579px -380px; opacity: 0;"></div>
									<div class="uncheckItem"
										style="background: url(${ctx_web}/image/site/layout/layout.png) 2px -760px"></div>
								</div>
								<div class="quickLayoutItem item8"
									style="background: url(${ctx_web}/image/site/layout/layout.png) -724px 0px">
									<div class="item_bg"
										style="background: url(${ctx_web}/image/site/layout/layout.png) -724px -380px"></div>
									<div class="uncheckItem"
										style="background: url(${ctx_web}/image/site/layout/layout.png) 2px -760px"></div>
								</div>
								<div class="quickLayoutItem item7"
									style="background: url(${ctx_web}/image/site/layout/layout.png) -869px 0px">
									<div class="item_bg"
										style="background: url(${ctx_web}/image/site/layout/layout.png) -869px -380px"></div>
									<div class="uncheckItem"
										style="background: url(${ctx_web}/image/site/layout/layout.png) 2px -760px"></div>
								</div>
								<div class="quickLayoutItem item3"
									style="background: url(${ctx_web}/image/site/layout/layout.png) -1014px 0px">
									<div class="item_bg"
										style="background: url(${ctx_web}/image/site/layout/layout.png) -1014px -380px"></div>
									<div class="uncheckItem"
										style="background: url(${ctx_web}/image/site/layout/layout.png) 2px -760px"></div>
								</div>
							</div>
						</div>

						<div class="freeLayout"
							style="padding: 10px 0px 0px 30px; height: 195px; display: block;">
							<div
								class="layoutPanel1 layoutPanelHide7 layoutPanelHide1 layoutPanelHide4 layoutPanelHide5 layoutPanelHide6 layoutPanelHide3 layoutPanelHide8"
								id="layoutPanel">
								<div id="layoutNavBannerHeader">
									<table cellpadding="0" cellspacing="0" height="100%" width="100%">
										<tbody>
											<tr>
												<td align="center" valign="middle">横幅和导航</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="layoutNavHeader">
									<table cellpadding="0" cellspacing="0" height="100%"
										width="100%">
										<tbody>
											<tr>
												<td align="center" valign="middle">导航</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="layoutNavBannerLeft">
									<table cellpadding="0" cellspacing="0" height="100%"
										width="100%">
										<tbody>
											<tr>
												<td align="center" valign="middle">横<br>幅<br>和<br>导<br>航</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="layoutBannerLeft">
									<table cellpadding="0" cellspacing="0" height="100%"
										width="100%">
										<tbody>
											<tr>
												<td align="center" valign="middle">横<br>幅</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="layoutNavLeft">
									<table cellpadding="0" cellspacing="0" height="100%"
										width="100%">
										<tbody>
											<tr>
												<td align="center" valign="middle">导<br>航</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="layoutContainer">
									<div id="layoutBannerTop">
										<table cellpadding="0" cellspacing="0" height="100%"
											width="100%">
											<tbody>
												<tr>
													<td align="center" valign="middle">横幅</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div title="点击显示此区域" id="layout7" layout="7" class="layoutItem">
										<table cellpadding="0" cellspacing="0" height="100%"
											width="100%">
											<tbody>
												<tr>
													<td align="center" valign="middle">7</td>
												</tr>
											</tbody>
										</table>
									</div>
									<table id="layoutMiddle" cellpadding="0" cellspacing="0">
										<tbody>
											<tr>
												<td id="layoutLeft" valign="top">
													<div title="点击显示此区域" id="layout1" layout="1"
														class="layoutItem">
														<table cellpadding="0" cellspacing="0" height="100%"
															width="100%">
															<tbody>
																<tr>
																	<td align="center" valign="middle">1</td>
																</tr>
															</tbody>
														</table>
													</div>
												</td>
												<td id="layoutCenter" valign="top">
													<div id="layoutBannerCenterTop">
														<table cellpadding="0" cellspacing="0" height="100%"
															width="100%">
															<tbody>
																<tr>
																	<td align="center" valign="middle">横幅</td>
																</tr>
															</tbody>
														</table>
													</div>
													<div title="点击隐藏此区域" id="layout2" layout="2"
														class="layoutItem layoutItemShow">
														<table cellpadding="0" cellspacing="0" height="100%"
															width="100%">
															<tbody>
																<tr>
																	<td align="center" valign="middle">2</td>
																</tr>
															</tbody>
														</table>
													</div>
													<div id="layoutCenterMiddle" cellpadding="0"
														cellspacing="0">
														<div title="点击显示此区域" id="layout4" layout="4"
															class="layoutItem">
															<table cellpadding="0" cellspacing="0" height="100%"
																width="100%">
																<tbody>
																	<tr>
																		<td align="center" valign="middle">4</td>
																	</tr>
																</tbody>
															</table>
														</div>
														<div title="点击显示此区域" id="layout5" layout="5"
															class="layoutItem">
															<table cellpadding="0" cellspacing="0" height="100%"
																width="100%">
																<tbody>
																	<tr>
																		<td align="center" valign="middle">5</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
													<div title="点击显示此区域" id="layout6" layout="6"
														class="layoutItem">
														<table cellpadding="0" cellspacing="0" height="100%"
															width="100%">
															<tbody>
																<tr>
																	<td align="center" valign="middle">6</td>
																</tr>
															</tbody>
														</table>
													</div>
												</td>
												<td id="layoutRight" valign="top">
													<div title="点击显示此区域" id="layout3" layout="3"
														class="layoutItem">
														<table cellpadding="0" cellspacing="0" height="100%"
															width="100%">
															<tbody>
																<tr>
																	<td align="center" valign="middle">3</td>
																</tr>
															</tbody>
														</table>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
									<div title="点击显示此区域" id="layout8" layout="8" class="layoutItem">
										<table cellpadding="0" cellspacing="0" height="100%"
											width="100%">
											<tbody>
												<tr>
													<td align="center" valign="middle">8</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</td>
			</tr>
		</tbody>
	</table>

	<!--
<a href='javascript:;' class="tabClose" hidefocus="true" title="关闭" onclick="window.parent.panesHide();"></a>
-->
</body>
</html>