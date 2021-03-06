Site.faiSettingPanel = {}; (function(d, a, f) {
    a.init = function(k) {
        if (Fai.top.$("#panes").is(":visible")) {
            Site.stylePanesHide()
        }
        if (Fai.top.$("#faiFloatPanel").attr("status") == 1) {
            Site.functionInterface({
                name: "hideFaiFloatPanel"
            })
        }
        if (k.entrance == 1) {
            Site.removeOverlay()
        }
        var h = Fai.top.$("#faiSettingPanel");
        var m = {
            id: k.id,
            styleId: k.styleId,
            entrance: k.entrance
        };
        Site.addModuleMask({
            id: m.id,
            enableTopBar: true,
            extFn: [{
                name: "click.moduleMask",
                fn: function() {
                    Site.removeModuleMask();
                    a.hide()
                }
            }]
        });
        a.initModuleData(m);
        var j = 300;
        if (h.length < 1) {
            this.firstInitFlag = true;
            if (Fai.top.$("head").find("link[href='" + Fai.top._panelOptionData.faiSettingPanelStyleLink + "']").length < 1) {
                var g = document.createElement("link");
                g.setAttribute("type", "text/css");
                g.setAttribute("rel", "stylesheet");
                g.setAttribute("href", Fai.top._panelOptionData.faiSettingPanelStyleLink);
                Fai.top.$("head").append(g)
            }
            var l = [];
            l.push("<div id='faiSettingPanel' class='m-fsp faiSettingPanel' status='0' location='0' style='display:none;'>");
            l.push("	<div class='m-fnav-wrap'>");
            l.push("		<ul id='faiSettingPanelNav' class='m-fnav'>");
            l.push("			<li><a href='javascript:;' class='u-tab-cusStyle'  title='自定义样式' hidefocus='true' onclick='Site.faiSettingPanel.showContent(0);return false;'><span>&nbsp;</span>换皮肤</a></li>");
            l.push("			<li><a href='javascript:;' class='u-tab-pattern'  title='系统样式' hidefocus='true' onclick='Site.faiSettingPanel.showContent(1);return false;'><span>&nbsp;</span>自定义</a></li>");
            l.push("		</ul>");
            l.push("		<div class='u-closeBtn-wrap'><a href='javascript:;' title='关闭'  class='u-closeBtn' hidefocus='true' onclick='Site.faiSettingPanel.hide();return false;'></a></div>");
            l.push("	</div>");
            l.push("	<div class='m-fsp-content-wrap'>");
            l.push("		<ul id='faiSettingPanelContent' class='m-fsp-content'>");
            l.push("		</ul>");
            l.push("	</div>");
            l.push("	<div class='J_overlay u-overlay' style='display:none;'></div>");
            l.push("</div>");
            Fai.top.$("body").append(l.join(""));
            a.initModulePatternContent();
            a.initModuleCusStyleContent();
            if (Fai.top._oem && !Fai.top._panelOptionData.allowedStyle) {
                l = [];
                l.push("<div class='J_panelOemPrompt u-prompt-box'><p class='u-prompt'>系统样式为<span class='panelSiteGroupOMid2' >&nbsp;</span>中级版功能，选择中级版以上主题可试用</p></div>");
                Fai.top.$("#modulePatternContentContainerTopLine").before(l.join(""));
                l = [];
                l.push("<div class='J_panelOemPrompt u-prompt-box'><p class='u-prompt'>模块样式为<span class='panelSiteGroupOMid2' >&nbsp;</span>中级版功能，选择中级版以上主题可试用</p></div>");
                Fai.top.$("#moduleCusStyleContentContainerTopLine").before(l.join(""))
            }
            a.initEvent();
            a.initPanelData();
            setTimeout(function() {
                a.refreshPanelStyle();
                a.show();
                var n = parseInt(d.cookie("settingPanelTab")) || a.showTabIndex() || 0;
                a.showContent(n);
                a.firstInitFlag = false
            },
            j)
        } else {
            j = 30;
            a.initPanelData();
            setTimeout(function() {
                a.refreshPanelStyle();
                a.show();
                a.patternMenuList.removeClass("on").eq(0).addClass("on");
                a.filterModulePattern(0);
                a.modulePatternFindSwitch.removeClass("findSwitch-on");
                a.modulePatternFindInput.val("");
                a.modulePatternfindInputContainer.hide();
                a.cusStyleMenuList.removeClass("on").eq(0).addClass("on");
                if (Fai.isIE6() || Fai.isIE7()) {
                    a.cusStyleContentContainer.scrollTop(0)
                } else {
                    a.cusStyleContentContainer.mCustomScrollbar("scrollTo", "top", {
                        scrollInertia: 0
                    })
                }
                var n = parseInt(d.cookie("settingPanelTab")) || a.showTabIndex() || 0;
                a.showContent(n)
            },
            j)
        }
        setTimeout(function() {
            a.scrollToCheckedPattern()
        },
        j)
    };
    a.showTabIndex = function() {
        var v = 0,
        h = this.id;
        $module = Fai.top.$("#module" + h),
        moduleAttrPattern = Site.getModuleAttrPattern(h),
        borderY = false,
        bannerType = false,
        contentBgY = false,
        innerY = false;
        var u = (this.styleId == this.moduleStyleList.sysSiteSearch),
        k = (this.styleId == this.moduleStyleList.sysIndexFavorite),
        s = (this.styleId == this.moduleStyleList.sysLocation),
        w = (this.styleId == this.moduleStyleList.sysDate),
        l = (this.styleId == this.moduleStyleList.sysWebsiteQrcode),
        r = (this.styleId == this.moduleStyleList.sysMemberCenter),
        q = (this.styleId == this.moduleStyleList.floatBtn),
        n = $module.hasClass("formStyle29"),
        j = $module.hasClass("formStyle35"),
        t = $module.attr("_inTab") == 0 ? false: true;
        var p = u || k || s || w || q,
        g = p || r || n || j;
        if (moduleAttrPattern.border.y != 0) {
            if (!g) {
                return 1
            }
        } else {
            if (moduleAttrPattern.border.y == 0) {
                if (g) {
                    return 1
                }
            }
        }
        var m = g || t;
        if (moduleAttrPattern.bannerType != 0) {
            if (!m) {
                return 1
            }
        } else {
            if (moduleAttrPattern.bannerType == 0) {
                if (m) {
                    return 1
                }
            }
        }
        if (moduleAttrPattern.bannerText.y != 0) {
            return 1
        }
        if (moduleAttrPattern.bannerMore.y != 0) {
            return 1
        }
        if (moduleAttrPattern.bannerAutoHeight != true) {
            return 1
        }
        if (moduleAttrPattern.bannerBg.y != 0) {
            if (!p) {
                return 1
            }
        } else {
            if (moduleAttrPattern.bannerBg.y == 0) {
                if (p) {
                    return 1
                }
            }
        }
        if (moduleAttrPattern.bannerIcon.y != 0) {
            return 1
        }
        var o = r || n;
        if (moduleAttrPattern.inner.y != 0) {
            if (!o) {
                return 1
            }
        } else {
            if (moduleAttrPattern.inner.y == 0) {
                if (o) {
                    return 1
                }
            }
        }
        if (moduleAttrPattern.contentText.y != 0) {
            return 1
        }
        if (moduleAttrPattern.contentLink.y != 0) {
            return 1
        }
        if (moduleAttrPattern.contentBg.y != 0) {
            return 1
        }
        if (moduleAttrPattern.contentHoverFont.y != 0) {
            return 1
        }
        if (moduleAttrPattern.contentHoverBg.y != 0) {
            return 1
        }
        return v
    };
    a.initPanelLocation = function() {
        var g = Fai.top.$(".floatRightBottom").offset().left / 2;
        var h = this.panel.outerWidth() || 340;
        var j = this.module.offset().left;
        if (j > h || g < j) {
            this.panel.attr({
                location: 0
            }).removeClass("m-fsp-right")
        } else {
            this.panel.attr({
                location: 1
            }).addClass("m-fsp-right")
        }
    };
    a.show = function() {
        a.initPanelLocation();
        var j = this.panel.outerWidth();
        var g = Fai.top.$(".floatRightBottom").offset().left;
        var h = 300;
        if (this.panel.attr("location") == 0) {
            this.panel.css("left", ( - j) + "px").show().animate({
                left: 0
            },
            h)
        } else {
            this.panel.css("left", g + "px").show().animate({
                left: (g - j) + "px"
            },
            h)
        }
        this.panel.attr("status", 1)
    };
    a.hide = function(h, k) {
        var m = Fai.top.$("#faiSettingPanel");
        if (m.length < 1) {
            return
        }
        var n = Fai.top.$("#faiSettingPanelNav").find("li.on").index();
        d.cookie("settingPanelTab", n, {
            expires: 365,
            path: "/"
        });
        var l = this.panel.outerWidth();
        var g = Fai.top.$(".floatRightBottom").offset().left;
        var j = 300;
        if (h) {
            j = 0
        }
        if (this.panel.attr("location") == 0) {
            this.panel.animate({
                left: ( - l) + "px"
            },
            j,
            function() {
                d(this).hide();
                Site.removeModuleMask()
            })
        } else {
            this.panel.animate({
                left: g + "px"
            },
            j,
            function() {
                d(this).hide();
                Site.removeModuleMask()
            })
        }
        this.panel.attr("status", 0);
        if (this.module.attr("_side") == 2) {
            if (this.module.attr("_flutterswitch") == "false") {
                Site.flutterStart(this.module, true)
            }
        }
        a.saveValueChangeEvent();
        if (!k) {
            if (this.entrance == 1) {
                Site.functionInterface({
                    name: "faiFloatPanel"
                },
                1)
            }
        } else {
            this.entrance = 0
        }
    };
    a.initModulePatternContent = function() {
        var k = {};
        k.menuListId = "modulePatternMenuList";
        k.contentId = "modulePatternContentContainer";
        k.menuList = [];
        var o = {};
        var n = 0;
        var j = "";
        o.name = "全部";
        o.anchor = "colorType0";
        o.colorType = "0";
        o.script = "";
        k.menuList.push(o);
        for (var m = 0,
        g = Fai.top._panelOptionData.colorDefList.length; m < g; m++) {
            o = {};
            n = Fai.top._panelOptionData.colorDefList[m].key;
            j = Fai.top._panelOptionData.colorDefList[m].name;
            o.name = j;
            o.anchor = "colorType" + n;
            o.colorType = n;
            o.script = "";
            k.menuList.push(o)
        }
        var h = a.initCaseOfModulePatternContent(k);
        Fai.top.$("#faiSettingPanelContent").append(h);
        Fai.top.$("#modulePatternContentContainer").append(a.getModulePatternContent());
        var l = [];
        l.push("<div class='panelFootBtnBox'><a href='javascript:;' onclick='Site.faiSettingPanel.initPanelData({\"patternResetDefault\":1});Site.faiSettingPanel.refreshPanelStyle();return false;' class='u-fspBtn u-fspBtn-reset'>恢复默认</a></div>");
        Fai.top.$("#modulePatternContentContainer").after(l.join(""))
    };
    a.getModulePatternContent = function() {
        var k = [];
        var m = 0;
        var h = 0;
        var j = "";
        k.push("<div class='moduleStyleContent'>");
        k.push("	<ul id='moduleStyleItemContainer' class='moduleStyleItemContainer'>");
        for (var l = 0,
        g = Fai.top._panelOptionData.patternDefList.length; l < g; l++) {
            m = Fai.top._panelOptionData.patternDefList[l].id;
            h = Fai.top._panelOptionData.patternDefList[l].colorType;
            j = Fai.top._panelOptionData.patternDefList[l].styleName;
            k.push("		<li class='moduleStyleItem moduleStyleItem" + m + "' patternid='" + m + "' colortype='" + h + "'>");
            k.push("			<a href='javascript:;' class='J_mPattern" + m + " moduleStyleItemImgContainer' onclick='Site.faiSettingPanel.modulePatternSelect(" + m + ");return false;'>");
            k.push("				<div class='moduleStyleItemImgInner'>");
            k.push("					<div class='moduleStyleItemImg'></div>");
            k.push("					<div class='moduleStyleTip'><div class='moduleStyleTipBg'></div><span>" + j + "</span></div>");
            k.push("				</div>");
            k.push("			</a>");
            k.push("		</li>")
        }
        k.push("	</ul>");
        k.push("</div>");
        k.push("<div class='panelContentFillDiv'></div>");
        return k.join("")
    };
    a.initCaseOfModulePatternContent = function(p) {
        var o = p.menuListId;
        var l = p.menuList;
        var g = p.contentId;
        var h = [];
        h.push("<li style='display:none;'>");
        h.push("	<div class='J_panelMenu m-menu2-wrap'>");
        h.push("		<ul class='J_panelMenuList m-menu2' id='" + o + "'>");
        for (var j = 0; j < l.length; j++) {
            var m = l[j].anchor;
            var k = l[j].colorType;
            var n = "";
            if (l[j].script) {
                n = l[j].script
            }
            h.push("			<li class='menu_" + m + "'><a href='javascript:;' class='menu' nav='" + m + "' id='" + (o + j) + "' onclick='Site.faiSettingPanel.filterModulePattern(" + k + ");" + n + "return false;' hidefocus='true'>" + l[j].name + "<span class='z-corner'></span></a><span class='z-triangle'></span></li>")
        }
        h.push("		</ul>");
        h.push("		<a href='javascript:;' hidefocus='true' id='modulePatternFindSwitch' class='findSwitch' onclick='Site.faiSettingPanel.switchFindInputStatus();return false;'></a>");
        h.push("	</div>");
        h.push("	<div id='modulePatternfindInputContainer' class='findInputContainer' style='display:none;'>");
        h.push("		<input id='modulePatternFindInput' class='modulePatternFindInput' type='text' hidefocus='true' maxlength='4' title='请输入编号' placeholder='请输入样式的编号' onkeyup='Site.faiSettingPanel.findOutModulePattern();' onchange='Site.faiSettingPanel.findOutModulePattern();' />");
        h.push("		<a href='javascript:;' class='J_mPatternFindBtn modulePatternFindBtn findIcon' onclick='return false;'></a>");
        h.push("		<a href='javascript:;' class='J_mPatternResetBtn modulePatternFindBtn clearIcon' title='清除输入' style='display:none;' onclick='Site.faiSettingPanel.resetFindOutModulePattern();Site.faiSettingPanel.scrollToCheckedPattern();return false;'></a>");
        h.push("	</div>");
        h.push("	<div id='" + g + "TopLine'></div>");
        h.push("	<div class='J_pContentContainer m-fsp-realContent-wrap " + g + "' id='" + g + "' style='position:relative;'>");
        h.push("	</div>");
        h.push("</li>");
        return h.join("")
    };
    a.initModuleCusStyleContent = function() {
        var h = {};
        h.menuListId = "moduleCusStyleMenuList";
        h.contentId = "moduleCusStyleContentContainer";
        h.menuList = [];
        var j = {};
        j.name = "常规";
        j.id = "panelItemContainer_mnormal";
        j.anchor = "moduleNormal";
        j.script = "";
        j.list = a.getModuleNormalOptionList();
        h.menuList.push(j);
        j = {};
        j.name = "边框";
        j.id = "panelItemContainer_mborder";
        j.anchor = "moduleBorder";
        j.script = "";
        j.list = a.getModuleBorderOptionList();
        h.menuList.push(j);
        j = {};
        j.name = "标题栏";
        j.id = "panelItemContainer_mtitle";
        j.anchor = "moduleTitle";
        j.script = "";
        j.list = a.getModuleTitleOptionList();
        h.menuList.push(j);
        j = {};
        j.name = "内容区";
        j.id = "panelItemContainer_mcontent";
        j.anchor = "moduleContent";
        j.script = "";
        j.list = a.getModuleContentOptionList();
        h.menuList.push(j);
        j = {};
        j.name = "侧栏";
        j.id = "panelItemContainer_mside";
        j.anchor = "moduleSide";
        j.script = "";
        j.list = a.getModuleSideOptionList();
        h.menuList.push(j);
        var g = a.initCaseOfPanelContent(h);
        Fai.top.$("#faiSettingPanelContent").append(g);
        a.addSetSiteStyleContent(h)
    };
    a.initCaseOfPanelContent = function(k) {
        var h = k.menuListId;
        var n = k.menuList;
        var o = k.contentId;
        var m = [];
        m.push("<li style='display:none;'>");
        m.push("	<div class='J_panelMenu m-menu-wrap'>");
        m.push("		<ul class='J_panelMenuList m-menu' id='" + h + "'>");
        for (var l = 0; l < n.length; l++) {
            var g = n[l].anchor;
            var j = "";
            if (n[l].script) {
                j = n[l].script
            }
            m.push("			<li class='menu_" + g + "'><a href='javascript:;' class='menu' nav='" + g + "' id='" + (h + l) + "' onclick='" + j + "return false;' hidefocus='true'>" + n[l].name + "<span class='z-corner'></span></a><span class='z-triangle'></span></li>")
        }
        m.push("		</ul>");
        m.push("	</div>");
        m.push("	<div id='" + o + "TopLine'></div>");
        m.push("	<div class='J_pContentContainer m-fsp-realContent-wrap " + o + "' id='" + o + "' style='position:relative;'>");
        m.push("	</div>");
        m.push("</li>");
        return m.join("")
    };
    a.addSetSiteStyleContent = function(w) {
        var g = w.contentId;
        var u = w.menuList;
        var m = [];
        for (var n = 0; n < u.length; n++) {
            var l = u[n];
            var v = l.name;
            var r = l.list;
            var s = l.anchor;
            var q = l.id;
            m.push("<div class='J_" + s + "Line splitLine'></div>");
            m.push("<div class='panelItemContainer' id='" + q + "'>");
            m.push("	<fieldset class='panelItemBox'>");
            if (Fai.top._oem) {
                m.push("		<legend class='panelSiteGroupOMid' title='" + v + "样式为“网站中级版”功能'>" + v + "</legend>")
            } else {
                m.push("		<legend>" + v + "</legend>")
            }
            m.push("		<div class='panelItemContent'>");
            m.push("				<ul>");
            for (var h = 0; h < r.length; h++) {
                var t = r[h].title;
                var k = r[h].content;
                var p = "";
                var o = "";
                if (r[h].id) {
                    p = "id='" + r[h].id + "'"
                }
                if (r[h].extclass) {
                    o = r[h].extclass
                }
                m.push("					<li " + p + " class='" + o + " u-tb'>");
                m.push("						<p class='u-tb-title'>" + t + "</p>");
                m.push("						<div class='u-tb-content'>");
                m.push("							\n" + k.join(""));
                m.push("						</div>");
                m.push("					</li>")
            }
            m.push("				</ul>");
            m.push("		</div>");
            m.push("	</fieldset>");
            m.push("</div>")
        }
        m.push("<div class='panelContentFillDiv'></div>");
        Fai.top.$("#" + g).append(m.join(""));
        m = [];
        m.push("<div class='panelFootBtnBox'><a href='javascript:;' onclick='Site.faiSettingPanel.initPanelData({\"cusStyleResetDefault\":1});Site.faiSettingPanel.refreshPanelStyle();return false;' class='u-fspBtn u-fspBtn-reset'>恢复默认</a></div>");
        Fai.top.$("#" + g).after(m.join(""))
    };
    a.getModuleNormalOptionList = function() {
        var h = [];
        var g = [];
        g = [];
        g.push("<div class='u-tb-content-f'>");
        g.push("	<input id='moduleBorder_show' type='radio' name='moduleBorderDisplay' onClick='Site.faiSettingPanel.moduleBorderSwitch(0);'/><label for='moduleBorder_show' class='labelForInput'>显示</label>");
        g.push("	<input id='moduleBorder_hide' type='radio' name='moduleBorderDisplay' onClick='Site.faiSettingPanel.moduleBorderSwitch(1);'/><label for='moduleBorder_hide' class='labelForInput'>隐藏</label>");
        g.push("</div>");
        h.push({
            title: "边框",
            content: g
        });
        g = [];
        g.push("<div class='u-tb-content-f'>");
        g.push("	<input id='moduleTitle_show' type='radio' name='moduleTitleDisplay' onClick='Site.faiSettingPanel.moduleTitleSwitch(0);'/><label for='moduleTitle_show' class='labelForInput'>显示</label>");
        g.push("	<input id='moduleTitle_hide' type='radio' name='moduleTitleDisplay' onClick='Site.faiSettingPanel.moduleTitleSwitch(1);'/><label for='moduleTitle_hide' class='labelForInput'>隐藏</label>");
        g.push("</div>");
        h.push({
            title: "标题栏",
            content: g
        });
        g = [];
        g.push("<div class='u-tb-content-f optionRow'>");
        g.push("	<div class='left optionRowOfInput'>");
        g.push("		<input id='moduleHeight_sys' type='radio' name='moduleHeight' onclick='Site.faiSettingPanel.moduleHeightSwitch(0);' /><label for='moduleHeight_sys' class='labelForInput'>默认</label>");
        g.push("		<input id='moduleHeight_cus' type='radio' name='moduleHeight' onclick='Site.faiSettingPanel.moduleHeightSwitch(1);' /><label for='moduleHeight_cus' class='labelForInput'>自定义</label>");
        g.push("	</div>");
        g.push("	<div class='J_mHeightInputWrap settingHeightInputWrap'>");
        g.push("		<input class='J_mHeightInput settingHeightInput' type='text' onKeyUp='Site.faiSettingPanel.moduleHeightChange();' onChange='Site.faiSettingPanel.moduleHeightChange();' onkeypress='javascript:return Fai.isNumberKey(event);' />");
        g.push("		<span>像素</span>");
        g.push("	</div>");
        g.push("</div>");
        h.push({
            title: "高度",
            content: g
        });
        g = [];
        g.push("<div class='J_mWidthInputWrap u-tb-content-f optionRow'>");
        g.push("		<label>宽度：</label>");
        g.push("		<input class='J_mWidthInput settingHeightInput' type='text' onKeyUp='Site.faiSettingPanel.moduleWidthChange();' onChange='Site.faiSettingPanel.moduleWidthChange();' onkeypress='javascript:return Fai.isNumberKey(event);' />");
        g.push("		<span>像素</span>");
        g.push("</div>");
        h.push({
            title: "宽度",
            content: g,
            extclass: "J_mWidthSettingContent"
        });
        g = [];
        g.push("<div class='J_mPosInputWrap u-tb-content-s footOptionRow'>");
        g.push("<label class='J_mPosSetting_left'>左：</label><input type='text' class='J_mPosSetting_left J_mPosInput_left input posInput numeric' onKeyUp='Site.faiSettingPanel.modulePosLeftChange();' onChange='Site.faiSettingPanel.modulePosLeftChange();' />");
        g.push("<label class='J_mPosSetting_right'>右：</label><input type='text' class='J_mPosSetting_right J_mPosInput_right input posInput numeric' onKeyUp='Site.faiSettingPanel.modulePosRightChange();' onChange='Site.faiSettingPanel.modulePosRightChange();' />");
        g.push("<label class='J_mPosSetting_top'>上：</label><input type='text' class='J_mPosSetting_top J_mPosInput_top input posInput numeric' onKeyUp='Site.faiSettingPanel.modulePosTopChange();' onChange='Site.faiSettingPanel.modulePosTopChange();' />");
        g.push("<label class='J_mPosSetting_bottom'>下：</label><input type='text' class='J_mPosSetting_bottom J_mPosInput_bottom input posInput numeric' onKeyUp='Site.faiSettingPanel.modulePosBottomChange();' onChange='Site.faiSettingPanel.modulePosBottomChange();' />");
        g.push("</div>");
        h.push({
            title: "位置",
            content: g,
            extclass: "J_mPosSettingContent"
        });
        g = [];
        g.push("<div class='u-tb-content-f'>");
        g.push("	<input id='moduleOutPadding_sys' type='radio' name='moduleOutPadding' onClick='Site.faiSettingPanel.moduleOutPaddingSwitch(0);'/><label for='moduleOutPadding_sys' class='labelForInput'>默认</label>");
        g.push("	<input id='moduleOutPadding_cus' class='freeDisableOld' type='radio' name='moduleOutPadding' onClick='Site.faiSettingPanel.moduleOutPaddingSwitch(1);'/><label for='moduleOutPadding_cus' class='labelForInput'>自定义</label>");
        g.push("</div>");
        g.push("<div class='J_mOutPaddingInputWrap u-tb-content-s footOptionRow'>");
        g.push("<label>上：</label><input type='text' class='J_mOutPaddingInput_top input posInput numeric' onKeyUp='Site.faiSettingPanel.moduleOutPaddingChange();' onChange='Site.faiSettingPanel.moduleOutPaddingChange();' />");
        g.push("<label>左：</label><input type='text' class='J_mOutPaddingInput_left input posInput numeric' onKeyUp='Site.faiSettingPanel.moduleOutPaddingChange(0);' onChange='Site.faiSettingPanel.moduleOutPaddingChange(0);' />");
        g.push("<label>下：</label><input type='text' class='J_mOutPaddingInput_bottom input posInput numeric' onKeyUp='Site.faiSettingPanel.moduleOutPaddingChange();' onChange='Site.faiSettingPanel.moduleOutPaddingChange();' />");
        g.push("<label>右：</label><input type='text' class='J_mOutPaddingInput_right input posInput numeric' onKeyUp='Site.faiSettingPanel.moduleOutPaddingChange(1);' onChange='Site.faiSettingPanel.moduleOutPaddingChange(1);' />");
        g.push("</div>");
        h.push({
            title: "外边距",
            content: g,
            extclass: "J_mOutPaddingSettingContent"
        });
        g = [];
        g.push("<div class='J_mOpacityWrap u-tb-content-f'>");
        g.push("	<div class='optionRow' >");
        g.push("		<div class='labelForLeftTitle'>透明度：</div>");
        g.push("		<div class='optionRowOfInput setOperate ' style='position:relative;'>");
        g.push("			<div class='freeDisable J_freeDisableCover freeDisableCover'></div>");
        g.push("			<div class='J_mOpacitySliderBar setSliderBar'></div>");
        g.push("			<div class='setSliderLetter'>");
        g.push("				<span class='J_mOpacitySliderLetter' style='float:left;'>0%</span>");
        g.push("			</div>");
        g.push("		</div>");
        g.push("	</div>");
        g.push("</div>");
        h.push({
            title: "透明度",
            content: g
        });
        return h
    };
    a.getModuleBorderOptionList = function() {
        var j = [];
        var g = [];
        g = [];
        g.push("<div class='u-tb-content-f'>");
        g.push("	<input id='moduleBorderStyle_sys' type='radio' name='moduleBorderStyle' onClick='Site.faiSettingPanel.moduleBorderStyleSwitch(0);'/><label for='moduleBorderStyle_sys' class='labelForInput'>默认</label>");
        g.push("	<input id='moduleBorderStyle_cus' class='freeDisable' type='radio' name='moduleBorderStyle' onClick='Site.faiSettingPanel.moduleBorderStyleSwitch(2);'/><label for='moduleBorderStyle_cus' class='labelForInput'>自定义</label>");
        g.push("</div>");
        g.push("<div class='J_mborderWrap u-tb-content-s' >");
        g.push("	<div class='optionRow'>");
        g.push("		<label class='labelForLeftTitle'>颜色：</label>");
        g.push("		<div class='J_mBorderColorPicker colorPicker'></div>");
        g.push("	</div>");
        g.push("	<div class='optionRow'>");
        g.push("		<label class='labelForLeftTitle'>宽度：</label>");
        g.push("		<select class='J_mborderWidth left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleBorderWidthChange();'>");
        for (var h = 1; h < 11; h++) {
            g.push("			<option value='" + h + "'>" + h + "</option>")
        }
        g.push("		</select>");
        g.push("	</div>");
        g.push("	<div class='optionRow'>");
        g.push("		<label class='labelForLeftTitle'>样式：</label>");
        g.push("		<select class='J_mborderLineStyle left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleBorderLineStyleChange();'>");
        g.push("			<option value='0'>实线</option>");
        g.push("			<option value='1'>点线</option>");
        g.push("			<option value='2'>虚线</option>");
        g.push("		</select>");
        g.push("	</div>");
        g.push("</div>");
        j.push({
            title: "边框",
            content: g
        });
        return j
    };
    a.getModuleTitleOptionList = function() {
        var k = [];
        var h = [];
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleTitleText_sys' type='radio' name='moduleTitleText' onClick='Site.faiSettingPanel.moduleTitleTextSwitch(0);' /><label for='moduleTitleText_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleTitleText_hide' class='freeDisableOld' type='radio' name='moduleTitleText' onClick='Site.faiSettingPanel.moduleTitleTextSwitch(1);' /><label for='moduleTitleText_hide' class='labelForInput'>隐藏</label>");
        h.push("	<input id='moduleTitleText_cus' class='freeDisableOld' type='radio' name='moduleTitleText' onClick='Site.faiSettingPanel.moduleTitleTextSwitch(2);' /><label for='moduleTitleText_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mTitleTextWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>大小：</label>");
        h.push("		<select class='J_mTitleTextSize left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleTitleTextSizeChange();'>");
        for (var j = 12; j < 31; j++) {
            h.push("			<option value='" + j + "'>" + j + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow footerNavTextCus '>");
        h.push("		<label>加粗：</label>");
        h.push("		<input class='J_mTitleTextBold' type='checkbox' onClick='Site.faiSettingPanel.moduleTitleTextWeightChange();'/>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>样式：</label>");
        h.push("		<select class='J_mTitleTextFamily left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleTitleTextFamilyChange();'>");
        for (var j = 0; j < Fai.top._panelOptionData.fontFamilyList.length; j++) {
            var g = Fai.top._panelOptionData.fontFamilyList[j];
            h.push("			<option value='" + g.first + "'>" + g.second + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle2'>颜色：</label>");
        h.push("		<div class='optionRowOfInput2 left'>");
        h.push("			<input id='moduleTitleTextColor_sys' type='radio' name='moduleTitleTextColor'  value='0' onclick='Site.faiSettingPanel.moduleTitleTextColorSwitch(0);' /><label for='moduleTitleTextColor_sys' class='labelForInput'>默认</label>");
        h.push("			<input id='moduleTitleTextColor_cus' type='radio' name='moduleTitleTextColor'  value='1' onclick='Site.faiSettingPanel.moduleTitleTextColorSwitch(1);' /><label for='moduleTitleTextColor_cus' class='labelForInput'>自定义</label>");
        h.push("		</div>");
        h.push("		<div class='J_mTitleTextColorWrap settingHeightInputWrap2'>");
        h.push("		<div class='J_mTitleTextColorPicker colorPicker'></div>");
        h.push("		</div>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle2'>位置：</label>");
        h.push("		<div class='optionRowOfInput2'>");
        h.push("			<input id='moduleTitleTextPadding_sys' type='radio' name='moduleTitleTextPadding'  value='0' onclick='Site.faiSettingPanel.moduleTitleTextPaddingSwitch(0);' /><label for='moduleTitleTextPadding_sys' class='labelForInput'>默认</label>");
        h.push("			<input id='moduleTitleTextPadding_cus' type='radio' name='moduleTitleTextPadding'  value='1' onclick='Site.faiSettingPanel.moduleTitleTextPaddingSwitch(1);' /><label for='moduleTitleTextPadding_cus' class='labelForInput'>自定义</label>");
        h.push("		</div>");
        h.push("		<div class='J_mTitleTextPaddingWrap optionRow3'>");
        h.push("			<label>左：</label><input type='text' class='J_mTitleTextPadding_left input posInput numeric' onKeyUp='Site.faiSettingPanel.moduleTitleTextPosChange();' onChange='Site.faiSettingPanel.moduleTitleTextPosChange();' />");
        h.push("			<label>上：</label><input type='text' class='J_mTitleTextPadding_top input posInput numeric' onKeyUp='Site.faiSettingPanel.moduleTitleTextPosChange();' onChange='Site.faiSettingPanel.moduleTitleTextPosChange();' />");
        h.push("		</div>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "标题文字",
            content: h
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleTitleTextMore_sys' type='radio' name='moduleTitleTextMore' onClick='Site.faiSettingPanel.moduleTitleTextMoreSwitch(0);' /><label for='moduleTitleTextMore_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleTitleTextMore_cus' class='freeDisableOld' type='radio' name='moduleTitleTextMore' onClick='Site.faiSettingPanel.moduleTitleTextMoreSwitch(1);' /><label for='moduleTitleTextMore_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mTitleTextMoreWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>大小：</label>");
        h.push("		<select class='J_mTitleTextMoreSize left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleTitleTextMoreSizeChange();'>");
        for (var j = 12; j < 31; j++) {
            h.push("			<option value='" + j + "'>" + j + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow footerNavTextCus '>");
        h.push("		<label>加粗：</label>");
        h.push("		<input class='J_mTitleTextMoreBold' type='checkbox' onClick='Site.faiSettingPanel.moduleTitleTextMoreWeightChange();' />");
        h.push("		<label>下划线：</label>");
        h.push("		<input class='J_mTitleTextMoreDecoration' type='checkbox' onClick='Site.faiSettingPanel.moduleTitleTextMoreDecorationChange();' />");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>样式：</label>");
        h.push("		<select class='J_mTitleTextMoreFamily left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleTitleTextMoreFamilyChange();'>");
        for (var j = 0; j < Fai.top._panelOptionData.fontFamilyList.length; j++) {
            var g = Fai.top._panelOptionData.fontFamilyList[j];
            h.push("			<option value='" + g.first + "'>" + g.second + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle2'>颜色：</label>");
        h.push("		<div class='optionRowOfInput2 left'>");
        h.push("			<input id='moduleTitleTextMoreColor_sys' type='radio' name='moduleTitleTextMoreColor'  value='0' onclick='Site.faiSettingPanel.moduleTitleTextMoreColorSwitch(0);' /><label for='moduleTitleTextMoreColor_sys' class='labelForInput'>默认</label>");
        h.push("			<input id='moduleTitleTextMoreColor_cus' type='radio' name='moduleTitleTextMoreColor'  value='1' onclick='Site.faiSettingPanel.moduleTitleTextMoreColorSwitch(1);' /><label for='moduleTitleTextMoreColor_cus' class='labelForInput'>自定义</label>");
        h.push("		</div>");
        h.push("		<div class='J_mTitleTextMoreColorWrap settingHeightInputWrap2'>");
        h.push("			<div class='J_mTitleTextMoreColorPicker colorPicker'></div>");
        h.push("		</div>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle2'>位置：</label>");
        h.push("		<div class='optionRowOfInput2'>");
        h.push("			<input id='moduleTitleTextMorePadding_sys' type='radio' name='moduleTitleTextMorePadding'  value='0' onclick='Site.faiSettingPanel.moduleTitleTextMorePaddingSwitch(0);' /><label for='moduleTitleTextMorePadding_sys' class='labelForInput'>默认</label>");
        h.push("			<input id='moduleTitleTextMorePadding_cus' type='radio' name='moduleTitleTextMorePadding'  value='1' onclick='Site.faiSettingPanel.moduleTitleTextMorePaddingSwitch(1);' /><label for='moduleTitleTextMorePadding_cus' class='labelForInput'>自定义</label>");
        h.push("		</div>");
        h.push("		<div class='J_mTitleTextMorePaddingWrap optionRow3'>");
        h.push("			<label>右：</label><input type='text' class='J_mTitleTextMorePadding_right input posInput numeric' onKeyUp='Site.faiSettingPanel.moduleTitleTextMorePosChange();' onChange='Site.faiSettingPanel.moduleTitleTextMorePosChange();' />");
        h.push("			<label>上：</label><input type='text' class='J_mTitleTextMorePadding_top input posInput numeric' onKeyUp='Site.faiSettingPanel.moduleTitleTextMorePosChange();' onChange='Site.faiSettingPanel.moduleTitleTextMorePosChange();' />");
        h.push("		</div>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: '"更多"文字',
            content: h,
            extclass: "J_mTitleTextMoreSettingContent"
        });
        h = [];
        h.push("<div class='u-tb-content-f optionRow'>");
        h.push("	<div class='left optionRowOfInput'>");
        h.push("		<input id='moduleTitleHeight_sys' type='radio' name='moduleTitleHeight' onclick='Site.faiSettingPanel.moduleTitleHeightSwitch(0);' /><label for='moduleTitleHeight_sys' class='labelForInput'>默认</label>");
        h.push("		<input id='moduleTitleHeight_cus' class='freeDisable' type='radio' name='moduleTitleHeight' onclick='Site.faiSettingPanel.moduleTitleHeightSwitch(1);' /><label for='moduleTitleHeight_cus' class='labelForInput'>自定义</label>");
        h.push("	</div>");
        h.push("	<div class='J_mTitleHeightInputWrap settingHeightInputWrap'>");
        h.push("		<input class='J_mTitleHeightInput settingHeightInput' type='text' onKeyUp='Site.faiSettingPanel.moduleTitleHeightChange();' onChange='Site.faiSettingPanel.moduleTitleHeightChange();' onkeypress='javascript:return Fai.isNumberKey(event);' />");
        h.push("		<span>像素</span>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "标题栏高度",
            content: h
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleTitleBg_sys' type='radio' name='moduleTitleBg' onclick='Site.faiSettingPanel.moduleTitleBgSwitch(0);' /><label for='moduleTitleBg_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleTitleBg_hide' class='freeDisableOld' type='radio' name='moduleTitleBg' onclick='Site.faiSettingPanel.moduleTitleBgSwitch(1);' /><label for='moduleTitleBg_hide' class='labelForInput'>隐藏</label>");
        h.push("	<input id='moduleTitleBg_cus' class='freeDisable' type='radio' name='moduleTitleBg' onclick='Site.faiSettingPanel.moduleTitleBgSwitch(2);' /><label for='moduleTitleBg_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mTitleBgWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>颜色：</label>");
        h.push("		<div class='J_mTitleBgColorPicker colorPicker'></div>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='imgLabel labelForLeftTitle'>图片：</label>");
        h.push("		<div><input type='button' id='moduleTitleBgFileButton' class='left faiButton' value='添加图片'/></div>");
        h.push("		<div class='J_mTitleBgUploadmsg uploadmsg'></div>");
        h.push(" </div>");
        h.push("<div class='J_previewContent optionRow f-previewContent-none'>");
        h.push("<div class='f-previewWrap'>");
        h.push("<div class='f-preview J_preview'>");
        h.push("</div>");
        h.push("</div>");
        h.push("</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>图片平铺：</label>");
        h.push("		<select class='J_mTitleBgRepeat left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleTitleBgRepeatChange();'>");
        h.push("			<option value='-1'>不使用背景图片</option>");
        h.push("			<option value='0'>不平铺（居中）</option>");
        h.push("			<option value='3'>完全平铺</option>");
        h.push("			<option value='4'>拉伸平铺</option>");
        h.push("			<option value='5'>缩放平铺（等比例）</option>");
        h.push("			<option value='21'>纵向平铺（左边对齐）</option>");
        h.push("			<option value='2'>纵向平铺（中间对齐）</option>");
        h.push("			<option value='22'>纵向平铺（右边对齐）</option>");
        h.push("			<option value='11'>横向平铺（顶部对齐）</option>");
        h.push("			<option value='1'>横向平铺（中部对齐）</option>");
        h.push("			<option value='12'>横向平铺（底部对齐）</option>");
        h.push("			<option value='6'>不平铺（左对齐）</option>");
        h.push("			<option value='7'>不平铺（右对齐）</option>");
        h.push("			<option value='8'>不平铺（上对齐）</option>");
        h.push("			<option value='9'>不平铺（下对齐）</option>");
        h.push("			<option value='13'>不平铺（左上对齐）</option>");
        h.push("			<option value='14'>不平铺（右上对齐）</option>");
        h.push("			<option value='15'>不平铺（左下对齐）</option>");
        h.push("			<option value='16'>不平铺（右下对齐）</option>");
        h.push("		</select>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "标题栏背景",
            content: h
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleTitleIcon_sys' type='radio' name='moduleTitleIcon' onclick='Site.faiSettingPanel.moduleTitleIconSwitch(0);'/><label for='moduleTitleIcon_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleTitleIcon_hide' class='freeDisableOld' type='radio' name='moduleTitleIcon' onclick='Site.faiSettingPanel.moduleTitleIconSwitch(1);'/><label for='moduleTitleIcon_hide' class='labelForInput'>隐藏</label>");
        h.push("	<input id='moduleTitleIcon_cus' class='freeDisable' type='radio' name='moduleTitleIcon' onclick='Site.faiSettingPanel.moduleTitleIconSwitch(2);'/><label for='moduleTitleIcon_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mTitleIconWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='imgLabel labelForLeftTitle'>图片：</label>");
        h.push("		<div><input type='button' id='moduleTitleIconFileButton' class='left faiButton' value='添加图片'/></div>");
        h.push("		<div class='J_mTitleIconUploadmsg uploadmsg'></div>");
        h.push("	</div>");
        h.push("<div class='J_previewContent optionRow f-previewContent-none'>");
        h.push("<div class='f-previewWrap'>");
        h.push("<div class='f-preview J_preview'>");
        h.push("</div>");
        h.push("</div>");
        h.push("</div>");
        h.push("</div>");
        k.push({
            title: "标题栏图标",
            content: h
        });
        return k
    };
    a.getModuleContentOptionList = function() {
        var k = [];
        var h = [];
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleInnerPadding_sys'  type='radio' name='moduleInnerPadding' onClick='Site.faiSettingPanel.moduleInnerPaddingSwitch(0);' /><label for='moduleInnerPadding_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleInnerPadding_cus' class='freeDisableOld' type='radio' name='moduleInnerPadding' onClick='Site.faiSettingPanel.moduleInnerPaddingSwitch(1);' /><label for='moduleInnerPadding_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mInnerPaddingInputWrap u-tb-content-s footOptionRow'>");
        h.push("<label>左：</label><input type='text' class='J_mInnerPaddingInput_left input posInput numeric' onKeyUp='Site.faiSettingPanel.moduleInnerPaddingChange();' onChange='Site.faiSettingPanel.moduleInnerPaddingChange();'  />");
        h.push("<label>右：</label><input type='text' class='J_mInnerPaddingInput_right input posInput numeric' onKeyUp='Site.faiSettingPanel.moduleInnerPaddingChange();' onChange='Site.faiSettingPanel.moduleInnerPaddingChange();'  />");
        h.push("<label>上：</label><input type='text' class='J_mInnerPaddingInput_top input posInput numeric' onKeyUp='Site.faiSettingPanel.moduleInnerPaddingChange();' onChange='Site.faiSettingPanel.moduleInnerPaddingChange();'  />");
        h.push("<label>下：</label><input type='text' class='J_mInnerPaddingInput_bottom input posInput numeric' onKeyUp='Site.faiSettingPanel.moduleInnerPaddingChange();' onChange='Site.faiSettingPanel.moduleInnerPaddingChange();' />");
        h.push("</div>");
        k.push({
            title: "内边距",
            content: h
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleNormalText_sys'  type='radio' name='moduleNormalText' onClick='Site.faiSettingPanel.moduleNormalTextSwitch(0);' /><label for='moduleNormalText_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleNormalText_cus' class='freeDisableOld' type='radio' name='moduleNormalText' onClick='Site.faiSettingPanel.moduleNormalTextSwitch(1);' /><label for='moduleNormalText_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mNormalTextWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>大小：</label>");
        h.push("		<select class='J_mNormalTextSize left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleNormalTextSizeChange();'>");
        for (var j = 12; j < 31; j++) {
            h.push("			<option value='" + j + "'>" + j + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>样式：</label>");
        h.push("		<select class='J_mNormalTextFamily left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleNormalTextFamilyChange();'>");
        for (var j = 0; j < Fai.top._panelOptionData.fontFamilyList.length; j++) {
            var g = Fai.top._panelOptionData.fontFamilyList[j];
            h.push("			<option value='" + g.first + "'>" + g.second + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle2'>颜色：</label>");
        h.push("		<div class='optionRowOfInput2 left'>");
        h.push("			<input id='moduleNormalTextColor_sys' type='radio' name='moduleNormalTextColor'  value='0' onclick='Site.faiSettingPanel.moduleNormalTextColorSwitch(0);' /><label for='moduleNormalTextColor_sys' class='labelForInput'>默认</label>");
        h.push("			<input id='moduleNormalTextColor_cus' type='radio' name='moduleNormalTextColor'  value='1' onclick='Site.faiSettingPanel.moduleNormalTextColorSwitch(1);' /><label for='moduleNormalTextColor_cus' class='labelForInput'>自定义</label>");
        h.push("		</div>");
        h.push("		<div class='J_mNormalTextColorWrap settingHeightInputWrap2'>");
        h.push("		<div class='J_mNormalTextColorPicker colorPicker'></div>");
        h.push("		</div>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "普通文字",
            content: h,
            extclass: "J_mNormalTextSettingContent"
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleLinkText_sys' type='radio' name='moduleLinkText' onClick='Site.faiSettingPanel.moduleLinkTextSwitch(0);' /><label for='moduleLinkText_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleLinkText_cus' class='freeDisableOld' type='radio' name='moduleLinkText' onClick='Site.faiSettingPanel.moduleLinkTextSwitch(1);' /><label for='moduleLinkText_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mLinkTextWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>大小：</label>");
        h.push("		<select class='J_mLinkTextSize left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleLinkTextSizeChange();'>");
        for (var j = 12; j < 31; j++) {
            h.push("			<option value='" + j + "'>" + j + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow footerNavTextCus2' style='margin-left:12px;'>");
        h.push("		<label>加粗：</label>");
        h.push("		<input class='J_mTitleTextMoreThick' type='checkbox' onClick='Site.faiSettingPanel.moduleLinkFontWeightChange();' />");
        h.push("		<label>下划线：</label>");
        h.push("		<input class='J_mTitleTextMoreDecoration' type='checkbox' onClick='Site.faiSettingPanel.moduleLinkTextDecorationChange();' />");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>样式：</label>");
        h.push("		<select class='J_mLinkTextFamily left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleLinkTextFamilyChange();'>");
        for (var j = 0; j < Fai.top._panelOptionData.fontFamilyList.length; j++) {
            var g = Fai.top._panelOptionData.fontFamilyList[j];
            h.push("			<option value='" + g.first + "'>" + g.second + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle2'>颜色：</label>");
        h.push("		<div class='optionRowOfInput2 left'>");
        h.push("			<input id='moduleLinkTextColor_sys' type='radio' name='moduleLinkTextColor'  value='0' onclick='Site.faiSettingPanel.moduleLinkTextColorSwitch(0);' /><label for='moduleLinkTextColor_sys' class='labelForInput'>默认</label>");
        h.push("			<input id='moduleLinkTextColor_cus' type='radio' name='moduleLinkTextColor'  value='1' onclick='Site.faiSettingPanel.moduleLinkTextColorSwitch(1);' /><label for='moduleLinkTextColor_cus' class='labelForInput'>自定义</label>");
        h.push("		</div>");
        h.push("		<div class='J_mLinkTextColorWrap settingHeightInputWrap2'>");
        h.push("			<div class='J_mLinkTextColorPicker colorPicker'></div>");
        h.push("		</div>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "链接文字",
            content: h,
            extclass: "J_mLinkTextSettingContent"
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleContentHoverFont_sys' type='radio' name='moduleContentHoverFont' onClick='Site.faiSettingPanel.moduleContentHoverFontSwitch(0);' /><label for='moduleContentHoverFont_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleContentHoverFont_cus' class='freeDisableOld' type='radio' name='moduleContentHoverFont' onClick='Site.faiSettingPanel.moduleContentHoverFontSwitch(1);' /><label for='moduleContentHoverFont_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mContentHoverFontWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>大小：</label>");
        h.push("		<select class='J_mContentHoverFontSize left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleContentHoverFontSizeChange();'>");
        for (var j = 12; j < 31; j++) {
            h.push("			<option value='" + j + "'>" + j + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow footerNavTextCus'>");
        h.push("		<label>加粗：</label>");
        h.push("		<input class='J_mContentHoverFontTextBold' type='checkbox' onClick='Site.faiSettingPanel.moduleContentHoverFontBoldChange(this);'/>");
        h.push("		<label>下划线：</label>");
        h.push("		<input class='J_mContentHoverFontUnderline' type='checkbox' onClick='Site.faiSettingPanel.moduleContentHoverFontUnderlineChange();' />");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>样式：</label>");
        h.push("		<select class='J_mContentHoverFontFamily left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleContentHoverFontFamilyChange();'>");
        for (var j = 0; j < Fai.top._panelOptionData.fontFamilyList.length; j++) {
            var g = Fai.top._panelOptionData.fontFamilyList[j];
            h.push("			<option value='" + g.first + "'>" + g.second + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle2'>颜色：</label>");
        h.push("		<div class='J_mContentHoverFontColorPicker colorPicker'></div>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "鼠标移入文字",
            content: h,
            extclass: "J_mContentHoverFontSettingContent"
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleContentSelectFont_sys' type='radio' name='moduleContentSelectFont' onClick='Site.faiSettingPanel.moduleContentSelectFontSwitch(0);' /><label for='moduleContentSelectFont_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleContentSelectFont_cus' class='freeDisableOld' type='radio' name='moduleContentSelectFont' onClick='Site.faiSettingPanel.moduleContentSelectFontSwitch(1);' /><label for='moduleContentSelectFont_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mContentSelectFontWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>大小：</label>");
        h.push("		<select class='J_mContentSelectFontSize left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleContentSelectFontSizeChange();'>");
        for (var j = 12; j < 31; j++) {
            h.push("			<option value='" + j + "'>" + j + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow footerNavTextCus'>");
        h.push("		<label>加粗：</label>");
        h.push("		<input class='J_mContentSelectFontTextBold' type='checkbox' onClick='Site.faiSettingPanel.moduleContentSelectFontBoldChange(this);'/>");
        h.push("		<label>下划线：</label>");
        h.push("		<input class='J_mContentSelectFontUnderline' type='checkbox' onClick='Site.faiSettingPanel.moduleContentSelectFontUnderlineChange();' />");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>样式：</label>");
        h.push("		<select class='J_mContentSelectFontFamily left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleContentSelectFontFamilyChange();'>");
        for (var j = 0; j < Fai.top._panelOptionData.fontFamilyList.length; j++) {
            var g = Fai.top._panelOptionData.fontFamilyList[j];
            h.push("			<option value='" + g.first + "'>" + g.second + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle2'>颜色：</label>");
        h.push("		<div class='J_mContentSelectFontColorPicker colorPicker'></div>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "鼠标选中文字",
            content: h,
            extclass: "J_mContentSelectFontSettingContent"
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleContentBg_sys' type='radio' name='moduleContentBg' onclick='Site.faiSettingPanel.moduleContentBgSwitch(0);' /><label for='moduleContentBg_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleContentBg_hide' type='radio' name='moduleContentBg' onclick='Site.faiSettingPanel.moduleContentBgSwitch(1);' /><label for='moduleContentBg_hide' class='labelForInput'>隐藏</label>");
        h.push("	<input id='moduleContentBg_cus' class='freeDisable' type='radio' name='moduleContentBg' onclick='Site.faiSettingPanel.moduleContentBgSwitch(2);' /><label for='moduleContentBg_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mContentBgWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>颜色：</label>");
        h.push("		<div class='J_mContentBgColorPicker colorPicker'></div>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='imgLabel labelForLeftTitle'>图片：</label>");
        h.push("		<div><input type='button' id='moduleContentBgFileButton' class='left faiButton' value='添加图片'/></div>");
        h.push("		<div class='J_mContentBgUploadmsg uploadmsg'></div>");
        h.push("	</div>");
        h.push("<div class='J_previewContent optionRow f-previewContent-none'>");
        h.push("<div class='f-previewWrap'>");
        h.push("<div class='f-preview J_preview'>");
        h.push("</div>");
        h.push("</div>");
        h.push("</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>图片平铺：</label>");
        h.push("		<select class='J_mContentBgRepeat left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleContentBgRepeatChange();'>");
        h.push("			<option value='-1'>不使用背景图片</option>");
        h.push("			<option value='0'>不平铺（居中）</option>");
        h.push("			<option value='3'>完全平铺</option>");
        h.push("			<option value='4'>拉伸平铺</option>");
        h.push("			<option value='5'>缩放平铺（等比例）</option>");
        h.push("			<option value='21'>纵向平铺（左边对齐）</option>");
        h.push("			<option value='2'>纵向平铺（中间对齐）</option>");
        h.push("			<option value='22'>纵向平铺（右边对齐）</option>");
        h.push("			<option value='11'>横向平铺（顶部对齐）</option>");
        h.push("			<option value='1'>横向平铺（中部对齐）</option>");
        h.push("			<option value='12'>横向平铺（底部对齐）</option>");
        h.push("			<option value='6'>不平铺（左对齐）</option>");
        h.push("			<option value='7'>不平铺（右对齐）</option>");
        h.push("			<option value='8'>不平铺（上对齐）</option>");
        h.push("			<option value='9'>不平铺（下对齐）</option>");
        h.push("			<option value='13'>不平铺（左上对齐）</option>");
        h.push("			<option value='14'>不平铺（右上对齐）</option>");
        h.push("			<option value='15'>不平铺（左下对齐）</option>");
        h.push("			<option value='16'>不平铺（右下对齐）</option>");
        h.push("		</select>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "默认背景",
            content: h
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleContentHoverBg_sys' type='radio' name='moduleContentHoverBg' onclick='Site.faiSettingPanel.moduleContentHoverBgSwitch(0);' /><label for='moduleContentHoverBg_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleContentHoverBg_hide' type='radio' name='moduleContentHoverBg' onclick='Site.faiSettingPanel.moduleContentHoverBgSwitch(1);' /><label for='moduleContentHoverBg_hide' class='labelForInput'>隐藏</label>");
        h.push("	<input id='moduleContentHoverBg_cus' class='freeDisable' type='radio' name='moduleContentHoverBg' onclick='Site.faiSettingPanel.moduleContentHoverBgSwitch(2);' /><label for='moduleContentHoverBg_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mContentHoverBgWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>颜色：</label>");
        h.push("		<div class='J_mContentHoverBgColorPicker colorPicker'></div>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='imgLabel labelForLeftTitle'>图片：</label>");
        h.push("		<div><input type='button' id='moduleContentHoverBgFileButton' class='left faiButton' value='添加图片'/></div>");
        h.push("		<div class='J_mContentHoverBgUploadmsg uploadmsg'></div>");
        h.push("	</div>");
        h.push("<div class='J_previewContent optionRow f-previewContent-none'>");
        h.push("<div class='f-previewWrap'>");
        h.push("<div class='f-preview J_preview'>");
        h.push("</div>");
        h.push("</div>");
        h.push("</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>图片平铺：</label>");
        h.push("		<select class='J_mContentHoverBgRepeat left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleContentHoverBgRepeatChange();'>");
        h.push("			<option value='-1'>不使用背景图片</option>");
        h.push("			<option value='0'>不平铺（居中）</option>");
        h.push("			<option value='3'>完全平铺</option>");
        h.push("			<option value='4'>拉伸平铺</option>");
        h.push("			<option value='5'>缩放平铺（等比例）</option>");
        h.push("			<option value='21'>纵向平铺（左边对齐）</option>");
        h.push("			<option value='2'>纵向平铺（中间对齐）</option>");
        h.push("			<option value='22'>纵向平铺（右边对齐）</option>");
        h.push("			<option value='11'>横向平铺（顶部对齐）</option>");
        h.push("			<option value='1'>横向平铺（中部对齐）</option>");
        h.push("			<option value='12'>横向平铺（底部对齐）</option>");
        h.push("			<option value='6'>不平铺（左对齐）</option>");
        h.push("			<option value='7'>不平铺（右对齐）</option>");
        h.push("			<option value='8'>不平铺（上对齐）</option>");
        h.push("			<option value='9'>不平铺（下对齐）</option>");
        h.push("			<option value='13'>不平铺（左上对齐）</option>");
        h.push("			<option value='14'>不平铺（右上对齐）</option>");
        h.push("			<option value='15'>不平铺（左下对齐）</option>");
        h.push("			<option value='16'>不平铺（右下对齐）</option>");
        h.push("		</select>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "鼠标移入背景",
            content: h,
            extclass: "J_mContentHoverBgSettingContent"
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleContentSelectBg_sys' type='radio' name='moduleContentSelectBg' onclick='Site.faiSettingPanel.moduleContentSelectBgSwitch(0);' /><label for='moduleContentSelectBg_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleContentSelectBg_hide' type='radio' name='moduleContentSelectBg' onclick='Site.faiSettingPanel.moduleContentSelectBgSwitch(1);' /><label for='moduleContentSelectBg_hide' class='labelForInput'>隐藏</label>");
        h.push("	<input id='moduleContentSelectBg_cus' class='freeDisable' type='radio' name='moduleContentSelectBg' onclick='Site.faiSettingPanel.moduleContentSelectBgSwitch(2);' /><label for='moduleContentSelectBg_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mContentSelectBgWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>颜色：</label>");
        h.push("		<div class='J_mContentSelectBgColorPicker colorPicker'></div>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='imgLabel labelForLeftTitle'>图片：</label>");
        h.push("		<div><input type='button' id='moduleContentSelectBgFileButton' class='left faiButton' value='添加图片'/></div>");
        h.push("		<div class='J_mContentSelectBgUploadmsg uploadmsg'></div>");
        h.push("	</div>");
        h.push("<div class='J_previewContent optionRow f-previewContent-none'>");
        h.push("<div class='f-previewWrap'>");
        h.push("<div class='f-preview J_preview'>");
        h.push("</div>");
        h.push("</div>");
        h.push("</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>图片平铺：</label>");
        h.push("		<select class='J_mContentSelectBgRepeat left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleContentSelectBgRepeatChange();'>");
        h.push("			<option value='-1'>不使用背景图片</option>");
        h.push("			<option value='0'>不平铺（居中）</option>");
        h.push("			<option value='3'>完全平铺</option>");
        h.push("			<option value='4'>拉伸平铺</option>");
        h.push("			<option value='5'>缩放平铺（等比例）</option>");
        h.push("			<option value='21'>纵向平铺（左边对齐）</option>");
        h.push("			<option value='2'>纵向平铺（中间对齐）</option>");
        h.push("			<option value='22'>纵向平铺（右边对齐）</option>");
        h.push("			<option value='11'>横向平铺（顶部对齐）</option>");
        h.push("			<option value='1'>横向平铺（中部对齐）</option>");
        h.push("			<option value='12'>横向平铺（底部对齐）</option>");
        h.push("			<option value='6'>不平铺（左对齐）</option>");
        h.push("			<option value='7'>不平铺（右对齐）</option>");
        h.push("			<option value='8'>不平铺（上对齐）</option>");
        h.push("			<option value='9'>不平铺（下对齐）</option>");
        h.push("			<option value='13'>不平铺（左上对齐）</option>");
        h.push("			<option value='14'>不平铺（右上对齐）</option>");
        h.push("			<option value='15'>不平铺（左下对齐）</option>");
        h.push("			<option value='16'>不平铺（右下对齐）</option>");
        h.push("		</select>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "鼠标选中背景",
            content: h,
            extclass: "J_mContentSelectBgSettingContent"
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleSplitLine_sys' type='radio' name='moduleSplitLine' onClick='Site.faiSettingPanel.moduleSplitLineSwitch(0);' /><label for='moduleSplitLine_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleSplitLine_hide' type='radio' name='moduleSplitLine' onClick='Site.faiSettingPanel.moduleSplitLineSwitch(1);' /><label for='moduleSplitLine_hide' class='labelForInput'>隐藏</label>");
        h.push("	<input id='moduleSplitLine_cus' class='freeDisable' type='radio' name='moduleSplitLine' onClick='Site.faiSettingPanel.moduleSplitLineSwitch(2);' /><label for='moduleSplitLine_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mSplitLineWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>颜色：</label>");
        h.push("		<div class='J_mSplitLineColorPicker colorPicker'></div>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>宽度：</label>");
        h.push("		<select class='J_mSplitLineWidth left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleSplitLineWidthChange();'>");
        for (var j = 1; j < 11; j++) {
            h.push("			<option value='" + j + "'>" + j + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>样式：</label>");
        h.push("		<select class='J_mSplitLineStyle left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleSplitLineStyleChange();'>");
        h.push("			<option value='0'>实线</option>");
        h.push("			<option value='1'>虚线</option>");
        h.push("		</select>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "分割线",
            content: h,
            extclass: "J_mSplitLineSettingContent"
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("<input id='moduleRowHeight_sys' type='radio' name='moduleRowHeightDisplay' onClick='Site.faiSettingPanel.moduleRowHeightSwitch(0);'/><label for='moduleRowHeight_sys' class='labelForInput'>默认</label>");
        h.push("<input id='moduleRowHeight_cus' class='freeDisable' type='radio' name='moduleRowHeightDisplay' onClick='Site.faiSettingPanel.moduleRowHeightSwitch(1);'/><label for='moduleRowHeight_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mRowHeightWrap u-tb-content-s'>");
        h.push("<div class='optionRow' >");
        h.push("<div class='labelForLeftTitle'>行高：</div>");
        h.push("<div class='optionRowOfInput setOperate ' style='position:relative;'>");
        h.push("<div class='J_freeDisableCover freeDisable freeDisableCover'></div>");
        h.push("<div class='J_mRowHeightSliderBar setSliderBar'></div>");
        h.push("<div class='setSliderLetter'>");
        h.push("<span class='J_mRowHeightSliderLetter' style='float:left;'>0%</span>");
        h.push("</div>");
        h.push("</div>");
        h.push("</div>");
        h.push("</div>");
        k.push({
            title: "行高",
            content: h,
            extclass: "J_mRowHeightSettingContent"
        });
        h = [];
        h.push("<div class='u-tb-content-f optionRow'>");
        h.push("	<div class='left optionRowOfInput'>");
        h.push("		<input id='moduleItemSpace_sys' type='radio' name='moduleItemSpace' onclick='Site.faiSettingPanel.moduleItemSpaceSwitch(0);' /><label for='moduleItemSpace_sys' class='labelForInput'>默认</label>");
        h.push("		<input id='moduleItemSpace_cus' class='freeDisable' type='radio' name='moduleItemSpace' onclick='Site.faiSettingPanel.moduleItemSpaceSwitch(1);' /><label for='moduleItemSpace_cus' class='labelForInput'>自定义</label>");
        h.push("	</div>");
        h.push("	<div class='J_mItemSpaceInputWrap settingHeightInputWrap'>");
        h.push("		<input class='J_mItemSpaceInput settingHeightInput' type='text' onKeyUp='Site.faiSettingPanel.moduleItemSpaceWidthChange();' onChange='Site.faiSettingPanel.moduleItemSpaceWidthChange();' onkeypress='javascript:return Fai.isNumberKey(event);' />");
        h.push("		<span>像素</span>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "项间隔",
            content: h,
            extclass: "J_mItemSpaceSettingContent"
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleLineIconSetting_sys' type='radio' name='moduleLineIconSetting' onclick='Site.faiSettingPanel.moduleLineIconSwitch(0);' /><label for='moduleLineIconSetting_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleLineIconSetting_hide' type='radio' name='moduleLineIconSetting' onclick='Site.faiSettingPanel.moduleLineIconSwitch(1);' /><label for='moduleLineIconSetting_hide' class='labelForInput'>隐藏</label>");
        h.push("	<input id='moduleLineIconSetting_cus' class='freeDisable' type='radio' name='moduleLineIconSetting' onclick='Site.faiSettingPanel.moduleLineIconSwitch(2);' /><label for='moduleLineIconSetting_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mLineIconWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='imgLabel labelForLeftTitle'>图片：</label>");
        h.push("		<div><input type='button' id='moduleLineIconFileButton' class='left faiButton' value='添加图片'/></div>");
        h.push("	</div>");
        h.push("<div class='J_previewContent optionRow f-previewContent-none'>");
        h.push("<div class='f-previewWrap'>");
        h.push("<div class='f-preview J_preview'>");
        h.push("</div>");
        h.push("</div>");
        h.push("</div>");
        h.push("</div>");
        k.push({
            title: "列表图标",
            content: h,
            extclass: "J_mLineIconSettingContent"
        });
        return k
    };
    a.getModuleSideOptionList = function() {
        var k = [];
        var h = [];
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleSideText_sys' type='radio' name='moduleSideText' onClick='Site.faiSettingPanel.moduleSideTextSwitch(0);' /><label for='moduleSideText_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleSideText_hide' class='freeDisableOld' type='radio' name='moduleSideText' onClick='Site.faiSettingPanel.moduleSideTextSwitch(1);' /><label for='moduleSideText_hide' class='labelForInput'>隐藏</label>");
        h.push("	<input id='moduleSideText_cus' class='freeDisableOld' type='radio' name='moduleSideText' onClick='Site.faiSettingPanel.moduleSideTextSwitch(2);' /><label for='moduleSideText_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mSideTextWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>大小：</label>");
        h.push("		<select class='J_mSideTextSize left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleSideTextSizeChange();'>");
        for (var j = 12; j < 31; j++) {
            h.push("			<option value='" + j + "'>" + j + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow footerNavTextCus '>");
        h.push("		<label>加粗：</label>");
        h.push("		<input class='J_mSideTextBold' type='checkbox' onClick='Site.faiSettingPanel.moduleSideTextWeightChange();' />");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>样式：</label>");
        h.push("		<select class='J_mSideTextFamily left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleSideTextFamilyChange();'>");
        for (var j = 0; j < Fai.top._panelOptionData.fontFamilyList.length; j++) {
            var g = Fai.top._panelOptionData.fontFamilyList[j];
            h.push("			<option value='" + g.first + "'>" + g.second + "</option>")
        }
        h.push("		</select>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle2'>颜色：</label>");
        h.push("		<div class='optionRowOfInput2 left'>");
        h.push("			<input id='moduleSideTextColor_sys' type='radio' name='moduleSideTextColor'  value='0' onclick='Site.faiSettingPanel.moduleSideTextColorSwitch(0);' /><label for='moduleSideTextColor_sys' class='labelForInput'>默认</label>");
        h.push("			<input id='moduleSideTextColor_cus' type='radio' name='moduleSideTextColor'  value='1' onclick='Site.faiSettingPanel.moduleSideTextColorSwitch(1);' /><label for='moduleSideTextColor_cus' class='labelForInput'>自定义</label>");
        h.push("		</div>");
        h.push("		<div class='J_mSideTextColorWrap settingHeightInputWrap2'>");
        h.push("			<div class='J_mSideTextColorPicker colorPicker'></div>");
        h.push("		</div>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "标题文字",
            content: h
        });
        h = [];
        h.push("<div class='u-tb-content-f optionRow'>");
        h.push("	<div class='left optionRowOfInput'>");
        h.push("		<input id='moduleSideWidth_sys' type='radio' name='moduleSideWidth' onclick='Site.faiSettingPanel.moduleSideWidthSwitch(0);' /><label for='moduleSideWidth_sys' class='labelForInput'>默认</label>");
        h.push("		<input id='moduleSideWidth_cus' class='freeDisable' type='radio' name='moduleSideWidth' onclick='Site.faiSettingPanel.moduleSideWidthSwitch(1);' /><label for='moduleSideWidth_cus' class='labelForInput'>自定义</label>");
        h.push("	</div>");
        h.push("	<div class='J_mSideWidthInputWrap settingHeightInputWrap'>");
        h.push("		<input class='J_mSideWidthInput settingHeightInput' type='text' onKeyUp='Site.faiSettingPanel.moduleSideWidthChange();' onChange='Site.faiSettingPanel.moduleSideWidthChange();' onkeypress='javascript:return Fai.isNumberKey(event);' />");
        h.push("		<span>像素</span>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "侧栏宽度",
            content: h
        });
        h = [];
        h.push("<div class='u-tb-content-f optionRow'>");
        h.push("	<div class='left optionRowOfInput'>");
        h.push("		<input id='moduleSideHeight_sys' type='radio' name='moduleSideHeight' onclick='Site.faiSettingPanel.moduleSideHeightSwitch(0);' /><label for='moduleSideHeight_sys' class='labelForInput'>默认</label>");
        h.push("		<input id='moduleSideHeight_cus' class='freeDisable' type='radio' name='moduleSideHeight' onclick='Site.faiSettingPanel.moduleSideHeightSwitch(1);' /><label for='moduleSideHeight_cus' class='labelForInput'>自定义</label>");
        h.push("	</div>");
        h.push("	<div class='J_mSideHeightInputWrap settingHeightInputWrap'>");
        h.push("		<input class='J_mSideHeightInput settingHeightInput' type='text' onKeyUp='Site.faiSettingPanel.moduleSideHeightChange();' onChange='Site.faiSettingPanel.moduleSideHeightChange();' onkeypress='javascript:return Fai.isNumberKey(event);' />");
        h.push("		<span>像素</span>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "侧栏高度",
            content: h
        });
        h = [];
        h.push("<div class='u-tb-content-f'>");
        h.push("	<input id='moduleSideBg_sys' type='radio' name='moduleSideBg' onclick='Site.faiSettingPanel.moduleSideBgSwitch(0);' /><label for='moduleSideBg_sys' class='labelForInput'>默认</label>");
        h.push("	<input id='moduleSideBg_cus' class='freeDisable' type='radio' name='moduleSideBg' onclick='Site.faiSettingPanel.moduleSideBgSwitch(1);' /><label for='moduleSideBg_cus' class='labelForInput'>自定义</label>");
        h.push("</div>");
        h.push("<div class='J_mSideBgWrap u-tb-content-s'>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>颜色：</label>");
        h.push("		<div class='J_mSideBgColorPicker colorPicker'></div>");
        h.push("	</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='imgLabel labelForLeftTitle'>图片：</label>");
        h.push("		<div><input type='button' id='moduleSideBgFileButton' class='left faiButton' value='添加图片'/></div>");
        h.push("		<div class='J_mSideBgUploadmsg uploadmsg'></div>");
        h.push("	</div>");
        h.push("<div class='J_previewContent optionRow f-previewContent-none'>");
        h.push("<div class='f-previewWrap'>");
        h.push("<div class='f-preview J_preview'>");
        h.push("</div>");
        h.push("</div>");
        h.push("</div>");
        h.push("	<div class='optionRow'>");
        h.push("		<label class='labelForLeftTitle'>图片平铺：</label>");
        h.push("		<select class='J_mSideBgRepeat left optionRowOfSelect' onChange='Site.faiSettingPanel.moduleSideBgRepeatChange();'>");
        h.push("			<option value='-1'>不使用背景图片</option>");
        h.push("			<option value='0'>不平铺</option>");
        h.push("			<option value='3'>完全平铺</option>");
        h.push("			<option value='4'>拉伸平铺</option>");
        h.push("			<option value='5'>缩放平铺（等比例）</option>");
        h.push("			<option value='21'>纵向平铺（左边对齐）</option>");
        h.push("			<option value='2'>纵向平铺（中间对齐）</option>");
        h.push("			<option value='22'>纵向平铺（右边对齐）</option>");
        h.push("			<option value='11'>横向平铺（顶部对齐）</option>");
        h.push("			<option value='1'>横向平铺（中部对齐）</option>");
        h.push("			<option value='12'>横向平铺（底部对齐）</option>");
        h.push("		</select>");
        h.push("	</div>");
        h.push("</div>");
        k.push({
            title: "背景",
            content: h
        });
        return k
    };
    a.initEvent = function() {
        var g = Fai.top.$("#faiSettingPanel");
        if (g.length < 1) {
            return
        }
        this.logDog = [];
        this.panel = g;
        this.fNav = g.find("#faiSettingPanelNav");
        this.fNav_li = this.fNav.children();
        this.fcontent = g.find("#faiSettingPanelContent");
        this.fcontent_li = this.fcontent.children();
        this.cusStyleMenuList = this.fcontent.find("#moduleCusStyleMenuList").children();
        this.patternMenuList = this.fcontent.find("#modulePatternMenuList").children();
        this.cusStyleContentContainer = this.fcontent.find("#moduleCusStyleContentContainer");
        this.patternContentContainer = this.fcontent.find("#modulePatternContentContainer");
        this.moduleStyleItemContainer = this.patternContentContainer.find("#moduleStyleItemContainer");
        this.modulePatternfindInputContainer = this.fcontent.find("#modulePatternfindInputContainer");
        this.modulePatternFindInput = this.fcontent.find("#modulePatternFindInput");
        this.modulePatternFindSwitch = this.fcontent.find("#modulePatternFindSwitch");
        this.allModuleStyleItem = this.moduleStyleItemContainer.children();
        this.moduleStyleItem_0 = this.allModuleStyleItem.filter("[colortype=0]");
        this.moduleStyleItem_1 = this.allModuleStyleItem.filter("[colortype=1]");
        this.moduleStyleItem_2 = this.allModuleStyleItem.filter("[colortype=2]");
        this.moduleStyleItem_4 = this.allModuleStyleItem.filter("[colortype=4]");
        this.moduleStyleItem_8 = this.allModuleStyleItem.filter("[colortype=8]");
        this.moduleStyleItem_16 = this.allModuleStyleItem.filter("[colortype=16]");
        this.moduleStyleItem_32 = this.allModuleStyleItem.filter("[colortype=32]");
        this.cusStyleTopLine = this.fcontent.find("#moduleCusStyleContentContainerTopLine");
        this.patternTopLine = this.fcontent.find("#modulePatternContentContainerTopLine");
        this.overlay = g.find(".J_overlay");
        this.content_mnormal = this.cusStyleContentContainer.find("#panelItemContainer_mnormal");
        this.content_mborder = this.cusStyleContentContainer.find("#panelItemContainer_mborder");
        this.content_mtitle = this.cusStyleContentContainer.find("#panelItemContainer_mtitle");
        this.content_mcontent = this.cusStyleContentContainer.find("#panelItemContainer_mcontent");
        this.content_mside = this.cusStyleContentContainer.find("#panelItemContainer_mside");
        this.content_splitLine = this.cusStyleContentContainer.children(".splitLine");
        this.fileSizeLimit = 1;
        this.modulePatternCssList = d.parseJSON(Fai.top._panelOptionData.modulePatternCssList);
        this.moduleTypeList = d.parseJSON(Fai.top._panelOptionData.moduleTypeList);
        this.moduleStyleList = d.parseJSON(Fai.top._panelOptionData.moduleStyleList);
        a.initPanelDrag();
        a.initSecondTabEvent_cusStyle();
        a.initSecondTabEvent_pattern();
        a.initScrollEvent();
        a.initMNormalEvent();
        a.initMBorderEvent();
        a.initMTitleEvent();
        a.initMContentEvent();
        a.initMSideEvent()
    };
    a.setModuleAttrPatternToDefault = function(g) {
        var k = this.id;
        var j = this.module;
        var h = Site.getModuleAttrPattern(k);
        if (g.patternResetDefault) {
            h.systemPattern = 0
        }
        if (g.cusStyleResetDefault) {
            h.border.y = 0;
            h.bannerType = 0;
            j.attr("_autoHeight", 1);
            h.outside.y = 0;
            h.transparent = 100;
            h.bannerText.y = 0;
            h.bannerMore.y = 0;
            h.bannerAutoHeight = true;
            h.bannerBg.y = 0;
            h.bannerIcon.y = 0;
            h.inner.y = 0;
            h.contentText.y = 0;
            h.contentLink.y = 0;
            h.contentSplitLine.y = 0;
            h.contentBg.y = 0;
            h.contentItemSpace.y = 0;
            h.contentHoverFont.y = 0;
            h.contentHoverBg.y = 0;
            h.contentSelectFont.y = 0;
            h.contentSelectBg.y = 0;
            h.sideText.y = 0;
            h.sideSize.w = -1;
            h.sideSize.h = -1;
            h.sideBg.y = 0;
            h.contentLineIcon.y = 0;
            h.contentRowHeight.y = 0
        }
    };
    a.initModuleData = function(g) {
        this.id = g.id;
        this.styleId = g.styleId;
        this.module = Fai.top.$("#module" + this.id);
        this.entrance = g.entrance;
        var h = Site.getModuleAttrPattern(this.id);
        this.hasPattern = [];
        if (h.systemPattern != 0) {
            this.hasPattern.push("modulePattern" + h.systemPattern)
        }
    };
    a.showContent = function(k) {
        var h = k || 0;
        this.fNav_li.removeClass("on");
        this.fNav_li.eq(h).addClass("on");
        this.fcontent_li.hide().eq(h).show();
        a.refreshFillDiv();
        if (k == 1) {
            if (! (Fai.isIE6() || Fai.isIE7())) {
                var j = this.cusStyleMenuList.filter(".on").children();
                var g = this.content_splitLine;
                this.cusStyleContentContainer.mCustomScrollbar("scrollTo", g.filter(".J_" + j.attr("nav") + "Line"), {
                    scrollInertia: 0
                })
            }
        }
    };
    a.initSecondTabEvent_cusStyle = function() {
        var l = this.panel;
        var h = this.cusStyleMenuList;
        var k = this.cusStyleContentContainer;
        var j = this.cusStyleTopLine;
        var g = this.content_splitLine;
        h.eq(0).addClass("on");
        h.children(".menu").hover(function() {
            d(this).parent().addClass("hover")
        },
        function() {
            d(this).parent().removeClass("hover")
        }).click(function() {
            h.removeClass("on");
            d(this).parent().addClass("on");
            if (Fai.isIE6() || Fai.isIE7()) {
                k.scrollTop(0).scrollTop(g.filter(".J_" + d(this).attr("nav") + "Line").offset().top - j.offset().top)
            } else {
                k.mCustomScrollbar("scrollTo", g.filter(".J_" + d(this).attr("nav") + "Line"), {
                    scrollInertia: 0
                })
            }
        })
    };
    a.initSecondTabEvent_pattern = function() {
        var j = this.panel;
        var g = this.patternMenuList;
        var h = this.patternContentContainer;
        g.eq(0).addClass("on");
        g.children(".menu").hover(function() {
            d(this).parent().addClass("hover")
        },
        function() {
            d(this).parent().removeClass("hover")
        }).click(function() {
            g.removeClass("on");
            d(this).parent().addClass("on")
        })
    };
    a.initPanelDrag = function() {
        var h = this.panel;
        var g = this.overlay;
        h.draggable({
            axis: "x",
            scroll: false,
            cursor: "move",
            distance: 3,
            opacity: 0.8,
            cancel: ".J_pContentContainer, .findInputContainer",
            start: function() {
                g.show();
                Fai.top.$("#colorpanel").remove();
                Fai.top.$(".faiColorPicker").remove()
            },
            stop: function() {
                var l = Fai.top.$(".floatRightTop").offset().left;
                var k = l / 2;
                var m = l - d(this).outerWidth() + 1;
                var j = 300;
                if ((d(this).offset().left + (d(this).outerWidth() / 2)) < k) {
                    d(this).attr("location", 0).removeClass("m-fsp-right").animate({
                        left: "0"
                    },
                    j)
                } else {
                    d(this).attr("location", 1).addClass("m-fsp-right").animate({
                        left: m + "px"
                    },
                    j)
                }
                g.hide()
            }
        })
    };
    a.refreshPanelStyle = function() {
        var s = this.panel;
        if (!s) {
            return
        }
        var j = Fai.top.$("#memberBarArea");
        var q = 0;
        if (j.length > 0) {
            q = j.is(":visible") ? j.height() : 0
        }
        var h = Fai.top.$(".floatLeftTop").offset().top - q;
        var o = Fai.top.$(".floatLeftBottom").offset().top;
        var n = Fai.top.$(".floatRightBottom").offset().left;
        var g = s.outerWidth();
        var m = o - h;
        s.css({
            height: (m + 6) + "px",
            top: h + "px"
        });
        var p = m - 38 - 38 - 10;
        var r = p - 24;
        if (this.fcontent.find(".J_panelOemPrompt").length > 0) {
            r -= 30
        }
        var l = r;
        var k = r;
        if (this.modulePatternfindInputContainer.is(":visible")) {
            l -= this.modulePatternfindInputContainer.height()
        }
        this.cusStyleContentContainer.css({
            height: k + "px"
        });
        this.patternContentContainer.css({
            height: l + "px"
        });
        a.refreshFillDiv();
        if (s.attr("location") == 1) {
            s.css({
                left: (n - g) + "px"
            })
        }
        Fai.top.$(window).off("resize.faiSettingPanel_refreshStyle");
        Fai.top.$(window).on("resize.faiSettingPanel_refreshStyle",
        function() {
            a.refreshPanelStyle()
        })
    };
    a.refreshFillDiv = function() {
        var l = this.patternContentContainer;
        var p = l.find(".panelContentFillDiv");
        var h = l.outerHeight();
        var o = h - (l.find(".moduleStyleItem").first().outerHeight() * 3) || 0;
        p.css({
            height: o + "px"
        });
        var m = this.cusStyleContentContainer;
        var g = m.find(".panelContentFillDiv");
        var k = m.outerHeight();
        var j = m.find(".panelItemContainer");
        var q = j.last();
        for (var n = (j.length - 1); n >= 0; n--) {
            q = j.eq(n);
            if (q.is(":visible")) {
                break
            }
        }
        var r = k - q.outerHeight() || 0;
        g.css({
            height: r + "px"
        })
    };
    a.filterModulePattern = function(g) {
        if ( !! g) {
            this.allModuleStyleItem.hide();
            this["moduleStyleItem_" + g].show()
        } else {
            this.allModuleStyleItem.show()
        }
        this.modulePatternFindInput.val("");
        this.modulePatternfindInputContainer.find(".J_mPatternFindBtn").show();
        this.modulePatternfindInputContainer.find(".J_mPatternResetBtn").hide();
        if (Fai.isIE6() || Fai.isIE7()) {
            this.patternContentContainer.scrollTop(0)
        } else {
            this.patternContentContainer.mCustomScrollbar("update");
            this.patternContentContainer.mCustomScrollbar("scrollTo", "top", {
                scrollInertia: 0
            })
        }
    };
    a.switchFindInputStatus = function() {
        var g = this.modulePatternfindInputContainer;
        if (g.is(":visible")) {
            this.modulePatternFindSwitch.removeClass("findSwitch-on");
            g.hide()
        } else {
            this.modulePatternFindSwitch.addClass("findSwitch-on");
            g.show()
        }
        a.refreshPanelStyle()
    };
    a.findOutModulePattern = function() {
        var l = this.modulePatternFindInput;
        var j = /^[pP]*[0-9]+$/;
        var h = d.trim(l.val());
        if (h.length < 1) {
            this.modulePatternFindInput.val("");
            this.allModuleStyleItem.show();
            this.patternMenuList.removeClass("on");
            this.patternMenuList.eq(0).addClass("on");
            this.modulePatternfindInputContainer.find(".J_mPatternFindBtn").show();
            this.modulePatternfindInputContainer.find(".J_mPatternResetBtn").hide();
            return
        }
        if (j.test(h)) {
            var g = /^[pP]+/;
            var k = g.test(h) ? (h.split(/[pP]/)[1] || 0) : h;
            this.allModuleStyleItem.hide();
            this.allModuleStyleItem.filter("[patternid=" + parseInt(k) + "]").show()
        } else {
            this.allModuleStyleItem.hide()
        }
        this.patternMenuList.removeClass("on");
        this.patternMenuList.eq(0).addClass("on");
        if (!this.mPatternFindBtn) {
            this.mPatternFindBtn = this.modulePatternfindInputContainer.find(".J_mPatternFindBtn")
        }
        if (!this.mPatternResetBtn) {
            this.mPatternResetBtn = this.modulePatternfindInputContainer.find(".J_mPatternResetBtn")
        }
        this.mPatternFindBtn.hide();
        this.mPatternResetBtn.show()
    };
    a.resetFindOutModulePattern = function() {
        if (!this.mPatternFindBtn) {
            this.mPatternFindBtn = this.modulePatternfindInputContainer.find(".J_mPatternFindBtn")
        }
        if (!this.mPatternResetBtn) {
            this.mPatternResetBtn = this.modulePatternfindInputContainer.find(".J_mPatternResetBtn")
        }
        this.mPatternFindBtn.show();
        this.mPatternResetBtn.hide();
        a.filterModulePattern(0);
        this.modulePatternFindInput.val("")
    };
    a.moduleBorderSwitch = function(g, h) {
        var k = this.id;
        if (g == 0) {
            this.cusStyleMenuList.filter(".menu_moduleBorder").show();
            this.content_mborder.show();
            this.content_splitLine.filter(".J_moduleBorderLine").show()
        } else {
            this.cusStyleMenuList.filter(".menu_moduleBorder").hide();
            this.content_mborder.hide();
            this.content_splitLine.filter(".J_moduleBorderLine").hide()
        }
        if (!h) {
            var j = Site.getModuleAttrPattern(k);
            if (g == 0) {
                if (this.content_mborder.find("#moduleBorderStyle_sys").prop("checked")) {
                    j.border.y = 0;
                    this.content_mborder.find(".J_mborderWrap").hide();
                    Site.showModuleBorder(k)
                } else {
                    j.border.y = 2;
                    this.content_mborder.find(".J_mborderWrap").show();
                    a.refreshBorder()
                }
            } else {
                Site.hideModuleBorder(k);
                j.border.y = 1
            }
            Site.logDog(100090, 2);
            a.onStyleChange()
        }
    };
    a.moduleTitleSwitch = function(g, h) {
        var k = this.id;
        if (g == 0) {
            this.cusStyleMenuList.filter(".menu_moduleTitle").show();
            this.content_mtitle.show();
            this.content_splitLine.filter(".J_moduleTitleLine").show()
        } else {
            this.cusStyleMenuList.filter(".menu_moduleTitle").hide();
            this.content_mtitle.hide();
            this.content_splitLine.filter(".J_moduleTitleLine").hide()
        }
        if (!h) {
            var j = Site.getModuleAttrPattern(k);
            if (g == 0) {
                Site.removeModuleStyleCss(k, ".formBanner" + k, "display");
                j.bannerType = 0
            } else {
                Site.setModuleStyleCss(k, ".formBanner" + k, "display", "none");
                j.bannerType = 1
            }
            if (Fai.top.$("#module" + k).hasClass("formStyle81")) {
                Site.setFlBtnHasBannerModuleHeight(k)
            }
            Site.logDog(100090, 3);
            a.onStyleChange()
        }
    };
    a.moduleHeightSwitch = function(g, h) {
        var l = this.id;
        var k = this.module;
        if (!this.mnormal_mheightInputWrap) {
            this.mnormal_mheightInputWrap = this.content_mnormal.find(".J_mHeightInputWrap");
            this.mnormal_mheightInput = this.mnormal_mheightInputWrap.find(".J_mHeightInput")
        }
        if (g == 0) {
            this.mnormal_mheightInputWrap.hide()
        } else {
            this.mnormal_mheightInputWrap.show()
        }
        if (!h) {
            var j = Site.getModuleAttrPattern(l);
            if (g == 0) {
                Site.removeModuleStyleCss(l, "", "height");
                Site.autoModuleHeight(l);
                k.attr("_autoHeight", "1");
                Site.refreshAbsFloatForm(k);
                a.saveValueChangeEvent(true);
                a.onStyleChange();
                Site.refreshModuleSizeHandle(k)
            } else {
                a.moduleHeightChange()
            }
            Site.logDog(100090, 4)
        } else {
            this.mnormal_mheightInput.val(k.height())
        }
    };
    a.moduleHeightChange = function() {
        var j = this.id;
        var h = this.module;
        if (!this.mnormal_mheightInput) {
            this.mnormal_mheightInput = this.mnormal_mheightInputWrap.find(".J_mHeightInput")
        }
        var g = d.trim(this.mnormal_mheightInput.val()) || h.height();
        if (g.length < 1) {
            return
        }
        if (isNaN(g)) {
            Fai.ing("请输入合法数字！", true);
            this.mnormal_mheightInput.val(h.height());
            return
        }
        if (g < 0 || g >= 2000) {
            Fai.ing("请输入大于0小于2000的数值", true);
            return
        }
        Site.setModuleHeight(j, g);
        Site.refreshAbsFloatForm(h);
        Site.setModuleStyleCss(j, "", "height", g + "px");
        Site.adjustPhotoCard(j);
        a.onStyleChange();
        Site.refreshModuleSizeHandle(h)
    };
    a.moduleWidthChange = function() {
        var k = this.id;
        var h = this.module;
        var j = this.content_mnormal.find(".J_mWidthInput");
        var g = d.trim(j.val());
        if (g.length < 1) {
            return
        }
        if (isNaN(g)) {
            if (g != "-") {
                Fai.ing("请输入合法数字！", true);
                j.val(h.width())
            }
            return
        }
        g = parseInt(g);
        if (g <= 0 || g >= 2000) {
            Fai.ing("请输入大于0小于2000的数值", true);
            return
        }
        if (h.css("position") == "absolute") {
            h.css("width", g + "px");
            Site.refreshAbsFloatForm(h);
            a.refreshModulePos();
            a.onStyleChange()
        }
        if (d.inArray(5, this.logDog) < 0) {
            this.logDog.push(5);
            Site.logDog(100090, 5)
        }
    };
    a.modulePosLeftChange = function() {
        if (!this.mPosInput_left) {
            this.mPosInput_left = this.content_mnormal.find(".J_mPosInput_left")
        }
        var g = d.trim(this.mPosInput_left.val());
        if (g.length < 1) {
            return
        }
        if (isNaN(g)) {
            if (g != "-") {
                Fai.ing("请输入合法数字！", true);
                this.mPosInput_left.val("")
            }
            return
        }
        g = parseInt(g);
        if (g < 0 || g >= 2000) {
            Fai.ing("请输入大于0小于2000的数值", true);
            return
        }
        var k = this.id;
        var h = this.module;
        var j = h.parent().attr("id");
        if (j == "absForms" || j == "absTopForms" || j == "absBottomForms") {
            h.offset({
                left: g
            })
        } else {
            if (j == "floatLeftTopForms" || j == "floatLeftBottomForms") {
                h.css("left", g + "px")
            } else {
                return
            }
        }
        if (d.inArray(6, this.logDog) < 0) {
            this.logDog.push(6);
            Site.logDog(100090, 6)
        }
        Site.refreshAbsFloatForm(h);
        a.refreshModulePos();
        a.onStyleChange()
    };
    a.modulePosRightChange = function() {
        if (!this.mPosInput_right) {
            this.mPosInput_right = this.content_mnormal.find(".J_mPosInput_right")
        }
        var g = d.trim(this.mPosInput_right.val());
        if (g.length < 1) {
            return
        }
        if (isNaN(g)) {
            if (g != "-") {
                Fai.ing("请输入合法数字！", true);
                this.mPosInput_right.val("")
            }
            return
        }
        g = parseInt(g);
        if (g < 0 || g >= 2000) {
            Fai.ing("请输入大于0小于2000的数值", true);
            return
        }
        var k = this.id;
        var h = this.module;
        var j = h.parent().attr("id");
        if (j == "floatRightTopForms" || j == "floatRightBottomForms") {
            h.css("left", (0 - g - h.width()) + "px")
        } else {
            return
        }
        if (d.inArray(6, this.logDog) < 0) {
            this.logDog.push(6);
            Site.logDog(100090, 6)
        }
        Site.refreshAbsFloatForm(h);
        a.refreshModulePos();
        a.onStyleChange()
    };
    a.modulePosTopChange = function() {
        if (!this.mPosInput_top) {
            this.mPosInput_top = this.content_mnormal.find(".J_mPosInput_top")
        }
        var h = d.trim(this.mPosInput_top.val());
        if (h.length < 1) {
            return
        }
        if (isNaN(h)) {
            if (h != "-") {
                Fai.ing("请输入合法数字！", true);
                this.mPosInput_top.val("")
            }
            return
        }
        h = parseInt(h);
        if (h < 0 || h >= 20000) {
            Fai.ing("请输入大于0小于20000的数值", true);
            return
        }
        var l = this.id;
        var j = this.module;
        var k = j.parent().attr("id");
        if (k == "absForms" || k == "absTopForms") {
            var g = Fai.top.$("#web");
            h += g.offset().top;
            j.offset({
                top: h
            })
        } else {
            if (k == "floatLeftTopForms" || k == "floatRightTopForms") {
                j.css("top", h + "px")
            } else {
                return
            }
        }
        if (d.inArray(6, this.logDog) < 0) {
            this.logDog.push(6);
            Site.logDog(100090, 6)
        }
        Site.refreshAbsFloatForm(j);
        a.refreshModulePos();
        a.onStyleChange()
    };
    a.modulePosBottomChange = function() {
        if (!this.mPosInput_bottom) {
            this.mPosInput_bottom = this.content_mnormal.find(".J_mPosInput_bottom")
        }
        var h = d.trim(this.mPosInput_bottom.val());
        if (h.length < 1) {
            return
        }
        if (isNaN(h)) {
            if (h != "-") {
                Fai.ing("请输入合法数字！", true);
                this.mPosInput_bottom.val("")
            }
            return
        }
        h = parseInt(h);
        if (h < 0 || h >= 20000) {
            Fai.ing("请输入大于0小于20000的数值", true);
            return
        }
        var k = this.id;
        var g = this.module;
        var j = g.parent().attr("id");
        if (j == "absBottomForms") {
            h = Site.getFooterBottom() - h - g.height();
            g.offset({
                top: h
            })
        } else {
            if (j == "floatLeftBottomForms" || j == "floatRightBottomForms") {
                g.css("top", (0 - h - g.height()) + "px")
            } else {
                return
            }
        }
        if (d.inArray(6, this.logDog) < 0) {
            this.logDog.push(6);
            Site.logDog(100090, 6)
        }
        Site.refreshAbsFloatForm(g);
        a.refreshModulePos();
        a.onStyleChange()
    };
    a.refreshModulePos = function() {
        var j = this.id;
        var q = this.module;
        var r = q.parent();
        var n = r.attr("id");
        if (!this.mPosInputWrap) {
            this.mPosInputWrap = this.content_mnormal.find(".J_mPosInputWrap");
            this.mPosSetting_top = this.mPosInputWrap.find(".J_mPosSetting_top");
            this.mPosSetting_bottom = this.mPosInputWrap.find(".J_mPosSetting_bottom");
            this.mPosSetting_left = this.mPosInputWrap.find(".J_mPosSetting_left");
            this.mPosSetting_right = this.mPosInputWrap.find(".J_mPosSetting_right");
            this.mPosInput_top = this.mPosInputWrap.find(".J_mPosInput_top");
            this.mPosInput_bottom = this.mPosInputWrap.find(".J_mPosInput_bottom");
            this.mPosInput_left = this.mPosInputWrap.find(".J_mPosInput_left");
            this.mPosInput_right = this.mPosInputWrap.find(".J_mPosInput_right")
        }
        var g = Fai.top.$("#web");
        var k = parseInt(g.offset().left);
        var l = parseInt(g.offset().top);
        var o = parseInt(q.offset().left);
        var h = parseInt(q.offset().top);
        var s = parseInt(q.position().left);
        var p = parseInt(q.position().top);
        var m = 0;
        if (n == "absForms" || n == "absTopForms") {
            this.mPosSetting_top.show();
            this.mPosSetting_left.show();
            this.mPosSetting_right.hide();
            this.mPosSetting_bottom.hide();
            if (o != parseInt(this.mPosInput_left.val())) {
                this.mPosInput_left.val(o)
            }
            m = parseInt(h - l);
            if (m != parseInt(this.mPosInput_top.val())) {
                this.mPosInput_top.val(m)
            }
        } else {
            if (n == "absBottomForms") {
                this.mPosSetting_left.show();
                this.mPosSetting_bottom.show();
                this.mPosSetting_right.hide();
                this.mPosSetting_top.hide();
                if (o != parseInt(this.mPosInput_left.val())) {
                    this.mPosInput_left.val(o)
                }
                m = parseInt(Site.getFooterBottom() - (h + q.height()));
                if (m != parseInt(this.mPosInput_bottom.val())) {
                    this.mPosInput_bottom.val(m)
                }
            } else {
                if (n == "floatLeftTopForms") {
                    this.mPosSetting_top.show();
                    this.mPosSetting_left.show();
                    this.mPosSetting_right.hide();
                    this.mPosSetting_bottom.hide();
                    if (s != parseInt(this.mPosInput_left.val())) {
                        this.mPosInput_left.val(s)
                    }
                    if (p != parseInt(this.mPosInput_top.val())) {
                        this.mPosInput_top.val(p)
                    }
                } else {
                    if (n == "floatRightTopForms") {
                        this.mPosSetting_right.show();
                        this.mPosSetting_top.show();
                        this.mPosSetting_left.hide();
                        this.mPosSetting_bottom.hide();
                        m = parseInt(Math.abs(s + q.width()));
                        if (m != parseInt(this.mPosInput_right.val())) {
                            this.mPosInput_right.val(m)
                        }
                        if (p != parseInt(this.mPosInput_top.val())) {
                            this.mPosInput_top.val(p)
                        }
                    } else {
                        if (n == "floatLeftBottomForms") {
                            this.mPosSetting_left.show();
                            this.mPosSetting_bottom.show();
                            this.mPosSetting_right.hide();
                            this.mPosSetting_top.hide();
                            if (s != parseInt(this.mPosInput_left.val())) {
                                this.mPosInput_left.val(s)
                            }
                            m = parseInt(Math.abs(p + q.height()));
                            if (m != parseInt(this.mPosInput_bottom.val())) {
                                this.mPosInput_bottom.val(m)
                            }
                        } else {
                            if (n == "floatRightBottomForms") {
                                this.mPosSetting_right.show();
                                this.mPosSetting_bottom.show();
                                this.mPosSetting_left.hide();
                                this.mPosSetting_top.hide();
                                m = parseInt(Math.abs(s + q.width()));
                                if (m != parseInt(this.mPosInput_right.val())) {
                                    this.mPosInput_right.val(m)
                                }
                                m = parseInt(Math.abs(p + q.height()));
                                if (m != parseInt(this.mPosInput_bottom.val())) {
                                    this.mPosInput_bottom.val(m)
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    a.moduleOutPaddingSwitch = function(g, h) {
        var k = this.id;
        if (!this.mnormal_mOutPaddingInputWrap) {
            this.mnormal_mOutPaddingInputWrap = this.content_mnormal.find(".J_mOutPaddingInputWrap");
            this.mnormal_mOutPaddingInput_top = this.mnormal_mOutPaddingInputWrap.find(".J_mOutPaddingInput_top");
            this.mnormal_mOutPaddingInput_left = this.mnormal_mOutPaddingInputWrap.find(".J_mOutPaddingInput_left");
            this.mnormal_mOutPaddingInput_bottom = this.mnormal_mOutPaddingInputWrap.find(".J_mOutPaddingInput_bottom");
            this.mnormal_mOutPaddingInput_right = this.mnormal_mOutPaddingInputWrap.find(".J_mOutPaddingInput_right")
        }
        if (g == 0) {
            this.mnormal_mOutPaddingInputWrap.hide()
        } else {
            this.mnormal_mOutPaddingInputWrap.show()
        }
        var j = Site.getModuleAttrPattern(k).outside;
        if (!h) {
            if (g == 0) {
                j.y = 0;
                Site.removeModuleStyleCssList(k, [{
                    cls: "",
                    key: "padding"
                },
                {
                    cls: "",
                    key: "margin-right"
                },
                {
                    cls: "",
                    key: "margin-left"
                },
                {
                    cls: "",
                    key: "margin-top"
                },
                {
                    cls: "",
                    key: "margin-bottom"
                }]);
                Site.refreshModuleHeight(k)
            } else {
                j.y = 1;
                a.moduleOutPaddingChange()
            }
            Site.logDog(100090, 22);
            a.onStyleChange()
        } else {
            this.mnormal_mOutPaddingInput_left.val(j.l || 0);
            this.mnormal_mOutPaddingInput_right.val(j.r || 0);
            this.mnormal_mOutPaddingInput_top.val(j.t || 0);
            this.mnormal_mOutPaddingInput_bottom.val(j.b || 0)
        }
    };
    a.moduleOutPaddingChange = function(j) {
        if (!this.mnormal_mOutPaddingInputWrap) {
            this.mnormal_mOutPaddingInputWrap = this.content_mnormal.find(".J_mOutPaddingInputWrap");
            this.mnormal_mOutPaddingInput_top = this.mnormal_mOutPaddingInputWrap.find(".J_mOutPaddingInput_top");
            this.mnormal_mOutPaddingInput_left = this.mnormal_mOutPaddingInputWrap.find(".J_mOutPaddingInput_left");
            this.mnormal_mOutPaddingInput_bottom = this.mnormal_mOutPaddingInputWrap.find(".J_mOutPaddingInput_bottom");
            this.mnormal_mOutPaddingInput_right = this.mnormal_mOutPaddingInputWrap.find(".J_mOutPaddingInput_right")
        }
        var h = this.id;
        var l = this.module;
        var p = d.trim(this.mnormal_mOutPaddingInput_left.val());
        var g = d.trim(this.mnormal_mOutPaddingInput_right.val());
        var o = d.trim(this.mnormal_mOutPaddingInput_top.val());
        var n = d.trim(this.mnormal_mOutPaddingInput_bottom.val());
        if (p.length < 1 && g.length < 1 && o.length < 1 && n.length < 1) {
            return
        }
        var m = l.parent().outerWidth() - 2;
        var k = Site.getModuleAttrPattern(h).outside;
        if (p.length > 0 && isNaN(p)) {
            Fai.ing("请输入合法数字！", true);
            this.mnormal_mOutPaddingInput_left.val(k.l || 0);
            return
        }
        if (g.length > 0 && isNaN(g)) {
            Fai.ing("请输入合法数字！", true);
            this.mnormal_mOutPaddingInput_right.val(k.r || 0);
            return
        }
        if (o.length > 0 && isNaN(o)) {
            Fai.ing("请输入合法数字！", true);
            this.mnormal_mOutPaddingInput_top.val(k.t || 0);
            return
        }
        if (n.length > 0 && isNaN(n)) {
            Fai.ing("请输入合法数字！", true);
            this.mnormal_mOutPaddingInput_bottom.val(k.b || 0);
            return
        }
        p = parseInt(p);
        g = parseInt(g);
        if (j == 0) {
            if (p > (m - g)) {
                Fai.ing("左右最大值的和不能超过" + m + "！", true);
                this.mnormal_mOutPaddingInput_left.val(k.l || 0);
                return
            }
        } else {
            if (j == 1) {
                if (g > (m - p)) {
                    Fai.ing("左右最大值的和不能超过" + m + "！", true);
                    this.mnormal_mOutPaddingInput_right.val(k.r || 0);
                    return
                }
            }
        }
        if (p < 0) {
            Fai.ing("请输入大于0的数值", true);
            return
        }
        if (g < 0) {
            Fai.ing("请输入大于0的数值", true);
            return
        }
        o = parseInt(o);
        if (o < 0 || o > 1000) {
            Fai.ing("上边距在0~1000之间的数值", true);
            this.mnormal_mOutPaddingInput_top.val(k.t || 0);
            return
        }
        n = parseInt(n);
        if (n < 0 || n > 1000) {
            Fai.ing("下边距在0~1000之间的数值", true);
            this.mnormal_mOutPaddingInput_bottom.val(k.b || 0);
            return
        }
        k.l = p;
        k.r = g;
        k.t = o;
        k.b = n;
        Site.setModuleStyleCssList(h, [{
            cls: "",
            key: "padding",
            value: 0 + "px"
        },
        {
            cls: "",
            key: "margin-right",
            value: g + "px"
        },
        {
            cls: "",
            key: "margin-left",
            value: p + "px"
        },
        {
            cls: "",
            key: "margin-top",
            value: o + "px"
        },
        {
            cls: "",
            key: "margin-bottom",
            value: n + "px"
        }]);
        Site.refreshModuleHeight(h);
        a.onStyleChange()
    };
    a.moduleBorderStyleSwitch = function(g, h) {
        if (!this.mborder_styleWrap) {
            this.mborder_styleWrap = this.content_mborder.find(".J_mborderWrap");
            this.mborder_mBorderWidth = this.mborder_styleWrap.find(".J_mborderWidth");
            this.mborder_mBorderLineStyle = this.mborder_styleWrap.find(".J_mborderLineStyle")
        }
        if (g == 0) {
            this.mborder_styleWrap.hide()
        } else {
            if (g == 1) {
                this.mborder_styleWrap.hide()
            } else {
                this.mborder_styleWrap.show()
            }
        }
        var k = this.id;
        if (!h) {
            var j = Site.getModuleAttrPattern(k);
            if (g == 2) {
                j.border.y = 2;
                Site.hideModuleBorder(k);
                a.refreshBorder()
            } else {
                if (g == 1) {
                    j.border.y = 1
                } else {
                    j.border.y = 0;
                    Site.showModuleBorder(k)
                }
            }
            Site.logDog(100090, 8);
            a.onStyleChange()
        }
    };
    a.moduleBorderWidthChange = function() {
        var h = this.id;
        if (!this.mborder_styleWrap) {
            this.mborder_styleWrap = this.content_mborder.find(".J_mborderWrap");
            this.mborder_mBorderWidth = this.mborder_styleWrap.find(".J_mborderWidth");
            this.mborder_mBorderLineStyle = this.mborder_styleWrap.find(".J_mborderLineStyle")
        }
        var g = Site.getModuleAttrPattern(h);
        g.border.w = parseInt(this.mborder_mBorderWidth.val()) || 1;
        a.refreshBorder();
        a.onStyleChange()
    };
    a.moduleBorderLineStyleChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h);
        g.border.s = parseInt(this.mborder_mBorderLineStyle.val()) || 0;
        a.refreshBorder();
        a.onStyleChange()
    };
    a.refreshBorder = function() {
        var m = this.id;
        if (!this.mborder_styleWrap) {
            this.mborder_styleWrap = this.content_mborder.find(".J_mborderWrap");
            this.mborder_mBorderWidth = this.mborder_styleWrap.find(".J_mborderWidth");
            this.mborder_mBorderLineStyle = this.mborder_styleWrap.find(".J_mborderLineStyle")
        }
        var k = Site.getModuleAttrPattern(m);
        var j = parseInt(this.mborder_mBorderWidth.val());
        var h = parseInt(this.mborder_mBorderLineStyle.val());
        var l = k.border.c || "#000";
        k.border.w = j;
        k.border.s = h;
        k.border.c = l;
        var g = "";
        if (h == 1) {
            g = "dotted"
        } else {
            if (h == 2) {
                g = "dashed"
            } else {
                g = "solid"
            }
        }
        Site.setModuleStyleCss(m, "", "border", j + "px " + l + " " + g)
    };
    a.moduleTitleTextSwitch = function(g, j) {
        if (!this.mtitle_titleTextWrap) {
            this.mtitle_titleTextWrap = this.content_mtitle.find(".J_mTitleTextWrap")
        }
        if (g == 2) {
            this.mtitle_titleTextWrap.show()
        } else {
            if (g == 1) {
                this.mtitle_titleTextWrap.hide()
            } else {
                this.mtitle_titleTextWrap.hide()
            }
        }
        var k = this.id;
        if (!j) {
            var h = Site.getModuleAttrPattern(k).bannerText;
            if (g == 1) {
                h.y = 1
            } else {
                if (g == 2) {
                    h.y = 2
                } else {
                    h.y = 0
                }
            }
            Site.logDog(100090, 9);
            a.refreshBannerText();
            a.onStyleChange()
        }
    };
    a.refreshBannerText = function() {
        var m = this.id;
        var j = Site.getModuleAttrPattern(m).bannerText;
        var k = "bolder";
        var g = "left";
        if (j.w == 0) {
            k = "normal"
        } else {
            j.w = 1
        }
        var h = j.c || "#000";
        j.c = h;
        var l = j.py;
        j.py = l || 0;
        if (j.y == 1) {
            Site.setModuleStyleCss(m, ".titleText" + m, "display", "none")
        } else {
            if (j.y == 2) {
                Site.removeModuleStyleCssList(m, [{
                    cls: ".titleText" + m,
                    key: "display"
                }]);
                if (typeof j.s == "undefined") {
                    j.s = parseInt(this.content_mtitle.find(".J_mTitleTextSize").val())
                }
                if (typeof j.f == "undefined") {
                    j.f = this.content_mtitle.find(".J_mTitleTextFamily").val()
                }
                Site.setModuleStyleCssList(m, [{
                    cls: ".titleText" + m,
                    key: "display",
                    value: "block"
                },
                {
                    cls: ".titleText" + m,
                    key: "font-size",
                    value: j.s + "px"
                },
                {
                    cls: ".titleText" + m,
                    key: "font-family",
                    value: j.f
                },
                {
                    cls: ".titleText" + m,
                    key: "font-weight",
                    value: k
                },
                {
                    cls: ".formBannerTitle" + m,
                    key: "float",
                    value: g
                }]);
                if (j.fct == 1) {
                    Site.setModuleStyleCssList(m, [{
                        cls: ".titleText" + m,
                        key: "color",
                        value: j.c
                    }])
                } else {
                    j.fct = 0;
                    Site.removeModuleStyleCssList(m, [{
                        cls: ".titleText" + m,
                        key: "color"
                    }])
                }
                if (j.py != 0) {
                    if (typeof j.r == "undefined") {
                        j.r = 0
                    }
                    if (typeof j.u == "undefined") {
                        j.u = 0
                    }
                    if (typeof j.p == "undefined") {
                        j.p = "relative"
                    }
                    Site.setModuleStyleCssList(m, [{
                        cls: ".titleText" + m + " span",
                        key: "padding",
                        value: 0 + "px"
                    },
                    {
                        cls: ".titleText" + m + " span",
                        key: "left",
                        value: j.r + "px"
                    },
                    {
                        cls: ".titleText" + m + " span",
                        key: "top",
                        value: j.u + "px"
                    },
                    {
                        cls: ".titleText" + m + " span",
                        key: "position",
                        value: j.p
                    },
                    {
                        cls: ".titleText" + m,
                        key: "position",
                        value: "relative"
                    },
                    {
                        cls: ".titleText" + m,
                        key: "width",
                        value: "100%"
                    },
                    {
                        cls: ".titleCenter" + m,
                        key: "width",
                        value: "86%"
                    },
                    {
                        cls: ".titleCenter" + m,
                        key: "overflow",
                        value: "visible"
                    },
                    {
                        cls: ".formBannerTitle" + m,
                        key: "display",
                        value: "table"
                    }]);
                    Site.refreshModuleHeight(m)
                } else {
                    Site.removeModuleStyleCssList(m, [{
                        cls: ".titleText" + m + " span",
                        key: "padding"
                    },
                    {
                        cls: ".titleText" + m + " span",
                        key: "left"
                    },
                    {
                        cls: ".titleText" + m + " span",
                        key: "top"
                    },
                    {
                        cls: ".titleText" + m + " span",
                        key: "position"
                    },
                    {
                        cls: ".titleText" + m,
                        key: "position"
                    },
                    {
                        cls: ".titleText" + m,
                        key: "width"
                    },
                    {
                        cls: ".titleCenter" + m,
                        key: "width"
                    },
                    {
                        cls: ".titleCenter" + m,
                        key: "overflow"
                    },
                    {
                        cls: ".formBannerTitle" + m,
                        key: "display"
                    }]);
                    Site.refreshModuleHeight(m)
                }
            } else {
                Site.removeModuleStyleCssList(m, [{
                    cls: ".titleText" + m,
                    key: "display"
                },
                {
                    cls: ".titleText" + m,
                    key: "font-size"
                },
                {
                    cls: ".titleText" + m,
                    key: "font-family"
                },
                {
                    cls: ".titleText" + m,
                    key: "font-weight"
                },
                {
                    cls: ".formBannerTitle" + m,
                    key: "margin"
                },
                {
                    cls: ".formBannerTitle" + m,
                    key: "float"
                },
                {
                    cls: ".titleText" + m + " span",
                    key: "padding"
                },
                {
                    cls: ".titleText" + m + " span",
                    key: "left"
                },
                {
                    cls: ".titleText" + m + " span",
                    key: "top"
                },
                {
                    cls: ".titleText" + m + " span",
                    key: "position"
                },
                {
                    cls: ".titleText" + m,
                    key: "position"
                },
                {
                    cls: ".titleText" + m,
                    key: "width"
                },
                {
                    cls: ".titleCenter" + m,
                    key: "width"
                },
                {
                    cls: ".formBannerTitle" + m,
                    key: "width"
                },
                {
                    cls: ".titleText" + m,
                    key: "color"
                }])
            }
        }
    };
    a.moduleTitleTextColorSwitch = function(g, j) {
        if (!this.mtitle_titleTextColorWrap) {
            this.mtitle_titleTextColorWrap = this.content_mtitle.find(".J_mTitleTextColorWrap")
        }
        if (g == 0) {
            this.mtitle_titleTextColorWrap.hide()
        } else {
            this.mtitle_titleTextColorWrap.show()
        }
        var k = this.id;
        if (!j) {
            var h = Site.getModuleAttrPattern(k).bannerText;
            if (g == 0) {
                h.fct = 0
            } else {
                h.fct = 1
            }
            a.refreshBannerText();
            a.onStyleChange()
        }
    };
    a.moduleTitleTextPosChange = function() {
        var m = this.id;
        var k = this.content_mtitle.find(".J_mTitleTextPadding_left");
        var l = this.content_mtitle.find(".J_mTitleTextPadding_top");
        var g = d.trim(k.val());
        var h = d.trim(l.val());
        var j = Site.getModuleAttrPattern(m).bannerText;
        if (g.length < 1) {
            return
        }
        if (h.length < 1) {
            return
        }
        if (isNaN(g)) {
            if (g != "-") {
                Fai.ing("请输入合法数字！", true);
                k.val((typeof j.r == "undefined" || isNaN(j.r)) ? 0 : j.r)
            }
            return
        }
        if (isNaN(h)) {
            if (h != "-") {
                Fai.ing("请输入合法数字！", true);
                l.val((typeof j.u == "undefined" || isNaN(j.u)) ? 0 : j.u)
            }
            return
        }
        g = parseInt(g);
        if (g < -100 || g > 1000) {
            Fai.ing("请输入大于-100小于1000的数值", true);
            k.val((typeof j.r == "undefined" || isNaN(j.r)) ? 0 : j.r);
            return
        }
        h = parseInt(h);
        if (h < -100 || h > 1000) {
            Fai.ing("请输入大于-100小于1000的数值", true);
            l.val((typeof j.u == "undefined" || isNaN(j.u)) ? 0 : j.u);
            return
        }
        j.r = g;
        j.u = h;
        j.p = "relative";
        a.refreshBannerText();
        a.onStyleChange()
    };
    a.moduleTitleTextSizeChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).bannerText;
        g.s = parseInt(this.content_mtitle.find(".J_mTitleTextSize").val());
        a.refreshBannerText();
        a.onStyleChange()
    };
    a.moduleTitleTextWeightChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).bannerText;
        if (this.content_mtitle.find(".J_mTitleTextBold").prop("checked")) {
            g.w = 1
        } else {
            g.w = 0
        }
        a.refreshBannerText();
        a.onStyleChange()
    };
    a.moduleTitleTextFamilyChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).bannerText;
        g.f = this.content_mtitle.find(".J_mTitleTextFamily").val();
        a.refreshBannerText();
        a.onStyleChange();
        Site && Site.logFontFamilyUse && Site.logFontFamilyUse(g.f)
    };
    a.moduleTitleTextPaddingSwitch = function(g, j) {
        if (!this.mtitle_titleTextPaddingWrap) {
            this.mtitle_titleTextPaddingWrap = this.content_mtitle.find(".J_mTitleTextPaddingWrap")
        }
        if (g == 0) {
            this.mtitle_titleTextPaddingWrap.hide()
        } else {
            this.mtitle_titleTextPaddingWrap.show()
        }
        if (!j) {
            var k = this.id;
            var h = Site.getModuleAttrPattern(k).bannerText;
            if (g == 0) {
                h.py = 0
            } else {
                h.py = 1
            }
            a.refreshBannerText();
            a.onStyleChange()
        }
    };
    a.moduleTitleTextMoreSwitch = function(h, j) {
        if (!this.mtitle_titleTextMoreWrap) {
            this.mtitle_titleTextMoreWrap = this.content_mtitle.find(".J_mTitleTextMoreWrap")
        }
        if ( !! h) {
            this.mtitle_titleTextMoreWrap.show()
        } else {
            this.mtitle_titleTextMoreWrap.hide()
        }
        var k = this.id;
        if (!j) {
            var g = Site.getModuleAttrPattern(k).bannerMore;
            if (h == 1) {
                g.y = 1
            } else {
                g.y = 0
            }
            a.refreshBannerTextMore();
            a.onStyleChange()
        }
    };
    a.moduleTitleTextMoreColorSwitch = function(h, j) {
        if (!this.mtitle_titleTextMoreColorWrap) {
            this.mtitle_titleTextMoreColorWrap = this.content_mtitle.find(".J_mTitleTextMoreColorWrap")
        }
        if (h == 0) {
            this.mtitle_titleTextMoreColorWrap.hide()
        } else {
            this.mtitle_titleTextMoreColorWrap.show()
        }
        var k = this.id;
        if (!j) {
            var g = Site.getModuleAttrPattern(k).bannerMore;
            if (h == 0) {
                g.fct = 0
            } else {
                g.fct = 1
            }
            a.refreshBannerTextMore();
            a.onStyleChange()
        }
    };
    a.moduleTitleTextMoreSizeChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).bannerMore;
        g.s = parseInt(this.content_mtitle.find(".J_mTitleTextMoreSize").val());
        a.refreshBannerTextMore();
        a.onStyleChange()
    };
    a.moduleTitleTextMoreWeightChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).bannerMore;
        if (this.content_mtitle.find(".J_mTitleTextMoreBold").prop("checked")) {
            g.w = 1
        } else {
            g.w = 0
        }
        a.refreshBannerTextMore();
        a.onStyleChange()
    };
    a.moduleTitleTextMoreDecorationChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).bannerMore;
        if (this.content_mtitle.find(".J_mTitleTextMoreDecoration").prop("checked")) {
            g.d = 1
        } else {
            g.d = 0
        }
        a.refreshBannerTextMore();
        a.onStyleChange()
    };
    a.moduleTitleTextMoreFamilyChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).bannerMore;
        g.f = this.content_mtitle.find(".J_mTitleTextMoreFamily").val();
        a.refreshBannerTextMore();
        a.onStyleChange()
    };
    a.moduleTitleTextMorePaddingSwitch = function(h, j) {
        if (!this.mtitle_titleTextMorePaddingWrap) {
            this.mtitle_titleTextMorePaddingWrap = this.content_mtitle.find(".J_mTitleTextMorePaddingWrap")
        }
        if (h == 0) {
            this.mtitle_titleTextMorePaddingWrap.hide()
        } else {
            this.mtitle_titleTextMorePaddingWrap.show()
        }
        var k = this.id;
        if (!j) {
            var g = Site.getModuleAttrPattern(k).bannerMore;
            if (h == 0) {
                g.py = 0
            } else {
                g.py = 1
            }
            a.refreshBannerTextMore();
            a.onStyleChange()
        }
    };
    a.moduleTitleTextMorePosChange = function() {
        var m = this.id;
        var h = Site.getModuleAttrPattern(m).bannerMore;
        var k = this.content_mtitle.find(".J_mTitleTextMorePadding_right");
        var l = this.content_mtitle.find(".J_mTitleTextMorePadding_top");
        var j = d.trim(k.val());
        var g = d.trim(l.val());
        if (j.length < 1 && g.length < 1) {
            return
        }
        if (isNaN(j)) {
            if (j != "-") {
                Fai.ing("请输入合法数字！", true);
                k.val(d.isNumeric(h.r) ? h.r: 0)
            }
            return
        }
        j = parseInt(j);
        if (j < 0 || j >= 1000) {
            Fai.ing("请输入大于0小于1000的数值", true);
            k.val(h.r);
            return
        }
        if (isNaN(g)) {
            if (g != "-") {
                Fai.ing("请输入合法数字！", true);
                l.val(d.isNumeric(h.u) ? h.u: 0)
            }
            return
        }
        g = parseInt(g);
        if (g < -1000 || g >= 1000) {
            Fai.ing("请输入大于-1000小于1000的数值", true);
            l.val(h.u);
            return
        }
        h.r = j;
        h.u = g;
        a.refreshBannerTextMore();
        a.onStyleChange()
    };
    a.refreshBannerTextMore = function() {
        var l = this.id;
        var g = Site.getModuleAttrPattern(l).bannerMore;
        var k = "normal";
        if (g.w == 1) {
            k = "bolder"
        } else {
            g.w = 0
        }
        var j = "none";
        if (g.d == 1) {
            j = "underline"
        } else {
            g.d = 0
        }
        var h = g.c || "#000";
        g.c = h;
        if (g.y == 1) {
            Site.setModuleStyleCssList(l, [{
                cls: ".formBannerMore" + l + " a",
                key: "font-size",
                value: g.s + "px"
            },
            {
                cls: ".formBannerMore" + l + " a",
                key: "font-family",
                value: g.f
            },
            {
                cls: ".formBannerMore" + l + " a",
                key: "font-weight",
                value: k
            },
            {
                cls: ".formBannerMore" + l + " a",
                key: "text-decoration",
                value: j
            }]);
            if (g.fct != 1) {
                g.fct = 0;
                Site.removeModuleStyleCssList(l, [{
                    cls: ".formBannerMore" + l + " a",
                    key: "color"
                }])
            } else {
                Site.setModuleStyleCss(l, ".formBannerMore" + l + " a", "color", g.c)
            }
            if (g.py == 1) {
                Site.setModuleStyleCssList(l, [{
                    cls: ".formBannerOther" + l,
                    key: "right",
                    value: g.r + "px"
                },
                {
                    cls: ".formBannerOther" + l,
                    key: "top",
                    value: g.u + "px"
                }])
            } else {
                Site.removeModuleStyleCssList(l, [{
                    cls: ".formBannerOther" + l,
                    key: "right"
                },
                {
                    cls: ".formBannerOther" + l,
                    key: "top"
                }])
            }
        } else {
            Site.removeModuleStyleCssList(l, [{
                cls: ".formBannerMore" + l + " a",
                key: "font-size"
            },
            {
                cls: ".formBannerMore" + l + " a",
                key: "font-family"
            },
            {
                cls: ".formBannerMore" + l + " a",
                key: "font-weight"
            },
            {
                cls: ".formBannerMore" + l + " a",
                key: "text-decoration"
            },
            {
                cls: ".formBannerMore" + l + " a",
                key: "color"
            },
            {
                cls: ".formBannerOther" + l,
                key: "right"
            },
            {
                cls: ".formBannerOther" + l,
                key: "top"
            }])
        }
    };
    a.moduleTitleHeightSwitch = function(g, h) {
        if (!this.mtitle_titleHeightInputWrap) {
            this.mtitle_titleHeightInputWrap = this.content_mtitle.find(".J_mTitleHeightInputWrap");
            this.mtitle_titleHeightInput = this.mtitle_titleHeightInputWrap.find(".J_mTitleHeightInput")
        }
        if (g == 0) {
            this.mtitle_titleHeightInputWrap.hide()
        } else {
            this.mtitle_titleHeightInputWrap.show()
        }
        var l = this.id;
        var k = this.module;
        if (!h) {
            var j = Site.getModuleAttrPattern(l);
            if (g == 0) {
                j.bannerAutoHeight = true;
                Site.removeModuleStyleCssList(l, [{
                    cls: ".formBanner" + l,
                    key: "height"
                },
                {
                    cls: ".formBanner" + l,
                    key: "line-height"
                },
                {
                    cls: ".formBanner" + l + " td",
                    key: "height"
                },
                {
                    cls: ".formBanner" + l + " td",
                    key: "line-height"
                },
                {
                    cls: ".formBanner" + l + " td",
                    key: "padding-top"
                },
                {
                    cls: ".formBanner" + l + " td",
                    key: "padding-bottom"
                },
                {
                    cls: ".formBanner" + l + " table",
                    key: "height"
                },
                {
                    cls: ".formBanner" + l + " table",
                    key: "line-height"
                },
                {
                    cls: ".formBanner" + l + " div",
                    key: "height"
                },
                {
                    cls: ".formBanner" + l + " div",
                    key: "line-height"
                }]);
                Site.refreshAbsFloatForm(k);
                a.onStyleChange()
            } else {
                j.bannerAutoHeight = false;
                a.moduleTitleHeightChange()
            }
            Site.logDog(100090, 10)
        } else {
            this.mtitle_titleHeightInput.val(k.find(".formBanner" + l)[0].clientHeight)
        }
    };
    a.moduleTitleHeightChange = function() {
        var k = this.id;
        var h = this.module;
        var j = this.content_mtitle.find(".J_mTitleHeightInput");
        var g = d.trim(j.val());
        if (g.length < 1) {
            return
        }
        if (isNaN(g)) {
            if (g != "-") {
                Fai.ing("请输入合法数字！", true);
                j.val(h.find(".formBanner" + k).height())
            }
            return
        }
        g = parseInt(g) || 0;
        if (g <= 0 || g >= 2000) {
            Fai.ing("请输入大于0小于2000的数值", true);
            return
        }
        Site.setModuleStyleCssList(k, [{
            cls: ".formBanner" + k,
            key: "height",
            value: g + "px"
        },
        {
            cls: ".formBanner" + k,
            key: "line-height",
            value: g + "px"
        },
        {
            cls: ".formBanner" + k + " td",
            key: "height",
            value: g + "px"
        },
        {
            cls: ".formBanner" + k + " td",
            key: "line-height",
            value: g + "px"
        },
        {
            cls: ".formBanner" + k + " td",
            key: "padding-top",
            value: 0
        },
        {
            cls: ".formBanner" + k + " td",
            key: "padding-bottom",
            value: 0
        },
        {
            cls: ".formBanner" + k + " table",
            key: "height",
            value: g + "px"
        },
        {
            cls: ".formBanner" + k + " table",
            key: "line-height",
            value: g + "px"
        },
        {
            cls: ".formBanner" + k + " div",
            key: "height",
            value: g + "px"
        },
        {
            cls: ".formBanner" + k + " div",
            key: "line-height",
            value: g + "px"
        }]);
        Site.refreshAbsFloatForm(h);
        a.onStyleChange()
    };
    a.moduleTitleBgSwitch = function(g, j) {
        if (!this.mtitle_titleBgWrap) {
            this.mtitle_titleBgWrap = this.content_mtitle.find(".J_mTitleBgWrap")
        }
        if (g == 2) {
            this.mtitle_titleBgWrap.show()
        } else {
            if (g == 1) {
                this.mtitle_titleBgWrap.hide()
            } else {
                this.mtitle_titleBgWrap.hide()
            }
        }
        var k = this.id;
        if (!j) {
            var h = Site.getModuleAttrPattern(k).bannerBg;
            if (g == 2) {
                h.y = 2;
                Site.hideModuleBannerBg(k);
                a.refreshBannerBg()
            } else {
                if (g == 1) {
                    h.y = 1;
                    Site.hideModuleBannerBg(k)
                } else {
                    h.y = 0;
                    Site.showModuleBannerBg(k)
                }
            }
            Site.logDog(100090, 11);
            a.onStyleChange()
        }
    };
    a.moduleTitleBgRepeatChange = function() {
        var k = this.id;
        var j = this.content_mtitle.find(".J_mTitleBgRepeat");
        var g = Site.getModuleAttrPattern(k).bannerBg;
        var h = parseInt(j.val());
        g.r = h;
        if (!g.f) {
            if (h != -1) {
                Fai.ing("请先添加背景图片。", true);
                return
            }
        }
        Site.showRepeatTip(h);
        a.refreshBannerBg();
        a.onStyleChange()
    };
    a.refreshBannerBg = function() {
        var o = this.id;
        var j = Site.getModuleAttrPattern(o).bannerBg;
        var g = j.c || "#000";
        j.c = g;
        j.r = (typeof j.r == "undefined") ? 0 : j.r;
        var k = j.r;
        var h = "";
        h += j.c;
        var m = j.p;
        if (m) {
            if (k != -1) {
                var l = "";
                if (k == 0 || k == 6 || k == 7 || k == 8 || k == 9 || k == 13 || k == 14 || k == 15 || k == 16) {
                    l = "no-repeat"
                }
                if (k == 1 || k == 11 || k == 12) {
                    l = "repeat-x"
                }
                if (k == 2 || k == 21 || k == 22) {
                    l = "repeat-y"
                }
                if (k == 3) {
                    l = "repeat"
                }
                if (k == 4 || k == 5) {
                    l = "repeat"
                }
                var n = "center";
                if (k == 9 || k == 12) {
                    n = "bottom"
                }
                if (k == 6 || k == 21) {
                    n = "left"
                }
                if (k == 7 || k == 22) {
                    n = "right"
                }
                if (k == 4 || k == 5 || k == 8 || k == 11) {
                    n = "top"
                }
                if (k == 13) {
                    n = "left top"
                }
                if (k == 14) {
                    n = "right top"
                }
                if (k == 15) {
                    n = "left bottom"
                }
                if (k == 16) {
                    n = "right bottom"
                }
                h += " url(" + m + ") " + l + " " + n
            }
        }
        Site.setModuleStyleCss(o, ".formBanner" + o, "background", h);
        if (k == 4) {
            Site.setModuleStyleCss(o, ".formBanner" + o, "background-size", "100% 100%")
        } else {
            if (k == 5) {
                Site.setModuleStyleCss(o, ".formBanner" + o, "background-size", "100%")
            }
        }
    };
    a.moduleTitleIconSwitch = function(h, j) {
        if (!this.mtitle_titleIconWrap) {
            this.mtitle_titleIconWrap = this.content_mtitle.find(".J_mTitleIconWrap")
        }
        if (h == 2) {
            this.mtitle_titleIconWrap.show()
        } else {
            if (h == 1) {
                this.mtitle_titleIconWrap.hide()
            } else {
                this.mtitle_titleIconWrap.hide()
            }
        }
        var k = this.id;
        if (!j) {
            var g = Site.getModuleAttrPattern(k).bannerIcon;
            if (h == 2) {
                g.y = 2;
                a.refreshBannerIcon()
            } else {
                if (h == 1) {
                    g.y = 1;
                    Site.hideModuleBannerIcon(k)
                } else {
                    g.y = 0;
                    Site.defaultModuleBannerIcon(k)
                }
            }
            Site.logDog(100090, 12);
            a.onStyleChange()
        }
    };
    a.refreshBannerIcon = function() {
        var j = this.id;
        var g = Site.getModuleAttrPattern(j).bannerIcon;
        if (g.p) {
            var h = "url(" + g.p + ") 5px no-repeat;";
            Site.hideModuleBannerIcon(j);
            Site.setModuleStyleCssList(j, [{
                cls: ".formBanner" + j + " .center" + j + " .titleLeft" + j,
                key: "background",
                value: h
            },
            {
                cls: ".formBanner" + j + " .center" + j + " .titleLeft" + j,
                key: "width",
                value: "30px"
            },
            {
                cls: ".formBanner" + j + " .center" + j + " .titleLeft" + j,
                key: "display",
                value: "block"
            }]);
            Fai.top.$(".titleLeft" + j).html("&nbsp;")
        }
    };
    a.moduleInnerPaddingSwitch = function(g, j) {
        if (!this.mcontent_mInnerPaddingInputWrap) {
            this.mcontent_mInnerPaddingInputWrap = this.content_mcontent.find(".J_mInnerPaddingInputWrap");
            this.mcontent_mInnerPaddingInput_top = this.mcontent_mInnerPaddingInputWrap.find(".J_mInnerPaddingInput_top");
            this.mcontent_mInnerPaddingInput_left = this.mcontent_mInnerPaddingInputWrap.find(".J_mInnerPaddingInput_left");
            this.mcontent_mInnerPaddingInput_bottom = this.mcontent_mInnerPaddingInputWrap.find(".J_mInnerPaddingInput_bottom");
            this.mcontent_mInnerPaddingInput_right = this.mcontent_mInnerPaddingInputWrap.find(".J_mInnerPaddingInput_right")
        }
        if (g == 1) {
            this.mcontent_mInnerPaddingInputWrap.show()
        } else {
            this.mcontent_mInnerPaddingInputWrap.hide()
        }
        var k = this.id;
        var h = Site.getModuleAttrPattern(k).inner;
        if (!j) {
            if (g == 1) {
                h.y = 1;
                a.moduleInnerPaddingChange()
            } else {
                h.y = 0;
                if (d(a.module).hasClass("formStyle76")) {
                    Site.removeModuleStyleCssList(k, [{
                        cls: ".formMiddleContent" + k,
                        key: "padding"
                    },
                    {
                        cls: ".formMiddleContent" + k + " .p_m_cotainer",
                        key: "margin-right"
                    },
                    {
                        cls: ".formMiddleContent" + k + " .p_m_cotainer",
                        key: "margin-left"
                    },
                    {
                        cls: ".formMiddleContent" + k,
                        key: "margin-top"
                    },
                    {
                        cls: ".formMiddleContent" + k,
                        key: "margin-bottom"
                    }])
                } else {
                    Site.removeModuleStyleCssList(k, [{
                        cls: ".formMiddleContent" + k,
                        key: "padding"
                    },
                    {
                        cls: ".formMiddleContent" + k,
                        key: "margin-right"
                    },
                    {
                        cls: ".formMiddleContent" + k,
                        key: "margin-left"
                    },
                    {
                        cls: ".formMiddleContent" + k,
                        key: "margin-top"
                    },
                    {
                        cls: ".formMiddleContent" + k,
                        key: "margin-bottom"
                    }])
                }
                Site.refreshModuleHeight(k);
                a.onStyleChange()
            }
            Site.logDog(100090, 13)
        } else {
            if (isNaN(h.l)) {
                h.l = 10
            }
            if (Fai.isNull(h.l)) {
                h.l = Fai.getCssInt(ctrl, "margin-left")
            }
            if (isNaN(h.r)) {
                h.r = 10
            }
            if (Fai.isNull(h.r)) {
                h.r = Fai.getCssInt(ctrl, "margin-right")
            }
            if (isNaN(h.t)) {
                h.t = 5
            }
            if (Fai.isNull(h.t)) {
                h.t = Fai.getCssInt(ctrl, "margin-top")
            }
            if (isNaN(h.b)) {
                h.b = 5
            }
            if (Fai.isNull(h.b)) {
                h.b = Fai.getCssInt(ctrl, "margin-bottom")
            }
            this.mcontent_mInnerPaddingInput_left.val(h.l || 0);
            this.mcontent_mInnerPaddingInput_right.val(h.r || 0);
            this.mcontent_mInnerPaddingInput_top.val(h.t || 0);
            this.mcontent_mInnerPaddingInput_bottom.val(h.b || 0)
        }
    };
    a.moduleInnerPaddingChange = function() {
        var m = this.id;
        if (!this.mcontent_mInnerPaddingInputWrap) {
            this.mcontent_mInnerPaddingInputWrap = this.content_mcontent.find(".J_mInnerPaddingInputWrap");
            this.mcontent_mInnerPaddingInput_top = this.mcontent_mInnerPaddingInputWrap.find(".J_mInnerPaddingInput_top");
            this.mcontent_mInnerPaddingInput_left = this.mcontent_mInnerPaddingInputWrap.find(".J_mInnerPaddingInput_left");
            this.mcontent_mInnerPaddingInput_bottom = this.mcontent_mInnerPaddingInputWrap.find(".J_mInnerPaddingInput_bottom");
            this.mcontent_mInnerPaddingInput_right = this.mcontent_mInnerPaddingInputWrap.find(".J_mInnerPaddingInput_right")
        }
        var j = d.trim(this.mcontent_mInnerPaddingInput_left.val());
        var l = d.trim(this.mcontent_mInnerPaddingInput_right.val());
        var h = d.trim(this.mcontent_mInnerPaddingInput_top.val());
        var k = d.trim(this.mcontent_mInnerPaddingInput_bottom.val());
        if (j.length < 1 && l.length < 1 && h.length < 1 && k.length < 1) {
            return
        }
        var g = Site.getModuleAttrPattern(m).inner;
        if (isNaN(j)) {
            if (j != "-") {
                Fai.ing("请输入合法数字！", true);
                this.mcontent_mInnerPaddingInput_left.val((typeof g.l == "undefined" || isNaN(g.l)) ? 0 : g.l);
                return
            }
        }
        j = parseInt(j);
        if (j < -100 || j >= 1000) {
            Fai.ing("请输入大于-100小于1000的数值", true);
            this.mcontent_mInnerPaddingInput_left.val((typeof g.l == "undefined" || isNaN(g.l)) ? 0 : g.l);
            return
        }
        if (isNaN(l)) {
            if (l != "-") {
                Fai.ing("请输入合法数字！", true);
                this.mcontent_mInnerPaddingInput_right.val((typeof g.r == "undefined" || isNaN(g.r)) ? 0 : g.r);
                return
            }
        }
        l = parseInt(l);
        if (l < -100 || l >= 1000) {
            Fai.ing("请输入大于-100小于1000的数值", true);
            this.mcontent_mInnerPaddingInput_right.val((typeof g.r == "undefined" || isNaN(g.r)) ? 0 : g.r);
            return
        }
        if (isNaN(h)) {
            if (h != "-") {
                Fai.ing("请输入合法数字！", true);
                this.mcontent_mInnerPaddingInput_top.val((typeof g.t == "undefined" || isNaN(g.t)) ? 0 : g.t);
                return
            }
        }
        h = parseInt(h);
        if (h < -100 || h >= 1000) {
            Fai.ing("请输入大于-100小于1000的数值", true);
            this.mcontent_mInnerPaddingInput_top.val((typeof g.t == "undefined" || isNaN(g.t)) ? 0 : g.t);
            return
        }
        if (isNaN(k)) {
            if (k != "-") {
                Fai.ing("请输入合法数字！", true);
                this.mcontent_mInnerPaddingInput_bottom.val((typeof g.b == "undefined" || isNaN(g.b)) ? 0 : g.b);
                return
            }
        }
        k = parseInt(k);
        if (k < -100 || k >= 1000) {
            Fai.ing("请输入大于-100小于1000的数值", true);
            this.mcontent_mInnerPaddingInput_bottom.val((typeof g.b == "undefined" || isNaN(g.b)) ? 0 : g.b);
            return
        }
        g.l = j;
        g.r = l;
        g.t = h;
        g.b = k;
        if (d(a.module).hasClass("formStyle76")) {
            Site.setModuleStyleCssList(m, [{
                cls: ".formMiddleContent" + m,
                key: "padding",
                value: 0 + "px"
            },
            {
                cls: ".formMiddleContent" + m + " .p_m_cotainer",
                key: "padding-right",
                value: l + "px"
            },
            {
                cls: ".formMiddleContent" + m + " .p_m_cotainer",
                key: "padding-left",
                value: j + "px"
            },
            {
                cls: ".formMiddleContent" + m,
                key: "margin-top",
                value: h + "px"
            },
            {
                cls: ".formMiddleContent" + m,
                key: "margin-bottom",
                value: k + "px"
            }])
        } else {
            Site.setModuleStyleCssList(m, [{
                cls: ".formMiddleContent" + m,
                key: "padding",
                value: 0 + "px"
            },
            {
                cls: ".formMiddleContent" + m,
                key: "margin-right",
                value: l + "px"
            },
            {
                cls: ".formMiddleContent" + m,
                key: "margin-left",
                value: j + "px"
            },
            {
                cls: ".formMiddleContent" + m,
                key: "margin-top",
                value: h + "px"
            },
            {
                cls: ".formMiddleContent" + m,
                key: "margin-bottom",
                value: k + "px"
            }])
        }
        Site.refreshModuleHeight(m);
        a.onStyleChange()
    };
    a.moduleNormalTextSwitch = function(g, j) {
        if (!this.mcontent_mNormalTextWrap) {
            this.mcontent_mNormalTextWrap = this.content_mcontent.find(".J_mNormalTextWrap")
        }
        if (g == 1) {
            this.mcontent_mNormalTextWrap.show()
        } else {
            this.mcontent_mNormalTextWrap.hide()
        }
        var k = this.id;
        if (!j) {
            var h = Site.getModuleAttrPattern(k).contentText;
            if (g == 1) {
                h.y = 1
            } else {
                h.y = 0
            }
            Site.logDog(100090, 14);
            a.refreshModuleNormalText();
            a.onStyleChange()
        }
    };
    a.refreshModuleNormalText = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentText;
        if (g.y == 1) {
            if (typeof g.f == "undefined") {
                g.f = this.content_mcontent.find(".J_mNormalTextFamily").val()
            }
            if (typeof g.cs == "undefined") {
                g.cs = this.content_mcontent.find(".J_mNormalTextSize").val()
            }
            Site.setModuleStyleCssList(h, [{
                cls: ".formMiddle" + h,
                key: "font-family",
                value: g.f
            },
            {
                cls: ".formMiddle" + h,
                key: "font-size",
                value: g.cs + "px"
            },
            {
                cls: ".formMiddle" + h + " .pic-mixNewsStyleSummary",
                key: "font-size",
                value: g.cs + "px"
            },
            {
                cls: ".title",
                key: "font-size",
                value: g.cs + "px"
            },
            {
                cls: ".formMiddle" + h + " .productFilterNameCenter",
                key: "font-family",
                value: g.f
            },
            {
                cls: ".formMiddle" + h + " .productFilterNameCenter",
                key: "font-size",
                value: g.cs + "px"
            },
            {
                cls: ".formMiddle" + h + " .memberLoginItem",
                key: "font-family",
                value: g.f
            },
            {
                cls: ".formMiddle" + h + " .memberLoginItem",
                key: "font-size",
                value: g.cs + "px"
            }]);
            if (g.fct == 1) {
                g.c = g.c || "#000";
                Site.setModuleStyleCssList(h, [{
                    cls: ".formMiddle" + h + " .g_minor",
                    key: "color",
                    value: g.c
                },
                {
                    cls: ".formMiddle" + h + " .g_specialClass",
                    key: "color",
                    value: g.c
                },
                {
                    cls: ".formMiddle" + h + " .formMiddleContent",
                    key: "color",
                    value: g.c
                },
                {
                    cls: ".formMiddle" + h + " .formMiddleContent .pic-mixNewsStyleSummary",
                    key: "color",
                    value: g.c
                },
                {
                    cls: ".formMiddle" + h + " .productFilterNameCenter",
                    key: "color",
                    value: g.c
                }])
            } else {
                g.fct = 0;
                Site.removeModuleStyleCssList(h, [{
                    cls: ".formMiddle" + h + " .g_minor",
                    key: "color"
                },
                {
                    cls: ".formMiddle" + h + " .g_specialClass",
                    key: "color"
                },
                {
                    cls: ".formMiddle" + h + " .formMiddleContent",
                    key: "color"
                },
                {
                    cls: ".formMiddle" + h + " .formMiddleContent .pic-mixNewsStyleSummary",
                    key: "color"
                },
                {
                    cls: ".formMiddle" + h + " .productFilterNameCenter",
                    key: "color"
                }])
            }
        } else {
            Site.removeModuleStyleCssList(h, [{
                cls: ".formMiddle" + h,
                key: "font-family"
            },
            {
                cls: ".formMiddle" + h,
                key: "font-size"
            },
            {
                cls: ".formMiddle" + h + " .pic-mixNewsStyleSummary",
                key: "font-size"
            },
            {
                cls: ".title",
                key: "font-size"
            },
            {
                cls: ".formMiddle" + h + " .productFilterNameCenter",
                key: "font-family"
            },
            {
                cls: ".formMiddle" + h + " .productFilterNameCenter",
                key: "font-size"
            },
            {
                cls: ".formMiddle" + h + " .formMiddleContent",
                key: "font-family"
            },
            {
                cls: ".formMiddle" + h + " .formMiddleContent .pic-mixNewsStyleSummary",
                key: "font-family"
            },
            {
                cls: ".formMiddle" + h + " .formMiddleContent",
                key: "font-size"
            },
            {
                cls: ".formMiddle" + h + " .formMiddleContent .pic-mixNewsStyleSummary",
                key: "font-size"
            },
            {
                cls: ".formMiddle" + h + " .memberLoginItem",
                key: "font-family"
            },
            {
                cls: ".formMiddle" + h + " .memberLoginItem",
                key: "font-size"
            }]);
            Site.removeModuleStyleCssList(h, [{
                cls: ".formMiddle" + h + " .g_minor",
                key: "color"
            },
            {
                cls: ".formMiddle" + h + " .g_specialClass",
                key: "color"
            },
            {
                cls: ".formMiddle" + h + " .formMiddleContent",
                key: "color"
            },
            {
                cls: ".formMiddle" + h + " .formMiddleContent .pic-mixNewsStyleSummary",
                key: "color"
            },
            {
                cls: ".formMiddle" + h + " .productFilterNameCenter",
                key: "color"
            }])
        }
    };
    a.moduleNormalTextSizeChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentText;
        g.cs = this.content_mcontent.find(".J_mNormalTextSize").val();
        a.refreshModuleNormalText();
        a.onStyleChange();
        if (Fai.top.$("#noticeScrollbar" + h).data("_innerHeight")) {
            Fai.top.Site.noticeUpDownSizeChange(h)
        }
    };
    a.moduleNormalTextFamilyChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentText;
        g.f = this.content_mcontent.find(".J_mNormalTextFamily").val();
        a.refreshModuleNormalText();
        a.onStyleChange();
        Site && Site.logFontFamilyUse && Site.logFontFamilyUse(g.f)
    };
    a.moduleNormalTextColorSwitch = function(g, j) {
        if (!this.mcontent_mNormalTextColorWrap) {
            this.mcontent_mNormalTextColorWrap = this.content_mcontent.find(".J_mNormalTextColorWrap")
        }
        if (g == 1) {
            this.mcontent_mNormalTextColorWrap.show()
        } else {
            this.mcontent_mNormalTextColorWrap.hide()
        }
        var k = this.id;
        if (!j) {
            var h = Site.getModuleAttrPattern(k).contentText;
            if (g == 1) {
                h.fct = 1
            } else {
                h.fct = 0
            }
            a.refreshModuleNormalText();
            a.onStyleChange()
        }
    };
    a.moduleLinkTextSwitch = function(h, j) {
        if (!this.mcontent_mLinkTextWrap) {
            this.mcontent_mLinkTextWrap = this.content_mcontent.find(".J_mLinkTextWrap")
        }
        if (h == 1) {
            this.mcontent_mLinkTextWrap.show()
        } else {
            this.mcontent_mLinkTextWrap.hide()
        }
        var k = this.id;
        if (!j) {
            var g = Site.getModuleAttrPattern(k).contentLink;
            if (h == 1) {
                g.y = 1
            } else {
                g.y = 0
            }
            Site.logDog(100090, 15);
            a.refreshModuleLinkText();
            a.onStyleChange()
        }
    };
    a.refreshModuleLinkText = function() {
        var k = this.id;
        var g = Site.getModuleAttrPattern(k).contentLink;
        var h = "none";
        var j = "normal";
        if (g.d == 1) {
            h = "underline"
        }
        if (g.b == 1) {
            j = "bold"
        }
        if (g.y == 1) {
            if (typeof g.f == "undefined") {
                g.f = this.content_mcontent.find(".J_mLinkTextFamily").val()
            }
            if (typeof g.ls == "undefined") {
                g.ls = this.content_mcontent.find(".J_mLinkTextSize").val()
            }
            Site.setModuleStyleCssList(k, [{
                cls: ".formMiddle" + k + " a",
                key: "font-family",
                value: g.f
            },
            {
                cls: ".formMiddle" + k + " a",
                key: "text-decoration",
                value: h
            },
            {
                cls: ".formMiddle" + k + " a",
                key: "font-size",
                value: g.ls + "px"
            },
            {
                cls: ".formMiddle" + k + " a",
                key: "font-weight",
                value: j
            }]);
            if (g.fct == 1) {
                g.c = g.c || "#000";
                Site.setModuleStyleCssList(k, [{
                    cls: ".formMiddle" + k + " a",
                    key: "color",
                    value: g.c
                }])
            } else {
                g.fct = 0;
                Site.removeModuleStyleCssList(k, [{
                    cls: ".formMiddle" + k + " a",
                    key: "color"
                }])
            }
        } else {
            Site.removeModuleStyleCssList(k, [{
                cls: ".formMiddle" + k + " a",
                key: "font-family"
            },
            {
                cls: ".formMiddle" + k + " a",
                key: "text-decoration"
            },
            {
                cls: ".formMiddle" + k + " a",
                key: "font-size"
            },
            {
                cls: ".formMiddle" + k + " a",
                key: "color"
            },
            {
                cls: ".formMiddle" + k + " a",
                key: "font-weight"
            }])
        }
    };
    a.moduleLinkTextSizeChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentLink;
        g.ls = this.content_mcontent.find(".J_mLinkTextSize").val();
        a.refreshModuleLinkText();
        a.onStyleChange();
        if (Fai.top.$("#noticeScrollbar" + h).data("_innerHeight")) {
            Fai.top.Site.noticeUpDownSizeChange(h)
        }
    };
    a.moduleLinkTextFamilyChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentLink;
        g.f = this.content_mcontent.find(".J_mLinkTextFamily").val();
        a.refreshModuleLinkText();
        a.onStyleChange();
        Site && Site.logFontFamilyUse && Site.logFontFamilyUse(g.f)
    };
    a.moduleLinkFontWeightChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentLink;
        if (this.content_mcontent.find(".J_mTitleTextMoreThick").prop("checked")) {
            g.b = 1
        } else {
            g.b = 0
        }
        a.refreshModuleLinkText();
        a.onStyleChange()
    };
    a.moduleLinkTextDecorationChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentLink;
        if (this.content_mcontent.find(".J_mTitleTextMoreDecoration").prop("checked")) {
            g.d = 1
        } else {
            g.d = 0
        }
        a.refreshModuleLinkText();
        a.onStyleChange()
    };
    a.moduleLinkTextColorSwitch = function(h, j) {
        if (!this.mcontent_mLinkTextColorWrap) {
            this.mcontent_mLinkTextColorWrap = this.content_mcontent.find(".J_mLinkTextColorWrap")
        }
        if (h == 1) {
            this.mcontent_mLinkTextColorWrap.show()
        } else {
            this.mcontent_mLinkTextColorWrap.hide()
        }
        var k = this.id;
        if (!j) {
            var g = Site.getModuleAttrPattern(k).contentLink;
            if (h == 1) {
                g.fct = 1
            } else {
                g.fct = 0
            }
            a.refreshModuleLinkText();
            a.onStyleChange()
        }
    };
    a.moduleSplitLineSwitch = function(g, h) {
        if (!this.mcontent_mSplitLineWrap) {
            this.mcontent_mSplitLineWrap = this.content_mcontent.find(".J_mSplitLineWrap")
        }
        if (g == 2) {
            this.mcontent_mSplitLineWrap.show()
        } else {
            if (g == 1) {
                this.mcontent_mSplitLineWrap.hide()
            } else {
                this.mcontent_mSplitLineWrap.hide()
            }
        }
        var k = this.id;
        if (!h) {
            var j = Site.getModuleAttrPattern(k).contentSplitLine;
            if (g == 2) {
                j.y = 2
            } else {
                if (g == 1) {
                    j.y = 1
                } else {
                    j.y = 0
                }
            }
            Site.logDog(100090, 16);
            a.refreshModuleSplitLine();
            a.onStyleChange()
        }
    };
    a.moduleSplitLineWidthChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentSplitLine;
        g.w = this.content_mcontent.find(".J_mSplitLineWidth").val();
        a.refreshModuleSplitLine();
        a.onStyleChange()
    };
    a.moduleSplitLineStyleChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentSplitLine;
        g.s = this.content_mcontent.find(".J_mSplitLineStyle").val();
        a.refreshModuleSplitLine();
        a.onStyleChange()
    };
    a.refreshModuleSplitLine = function() {
        var l = this.id;
        var k = Site.getModuleAttrPattern(l).contentSplitLine;
        if (k.y == 2) {
            Site.showModuleContentSplitLine(l);
            var g = k.w ? k.w: 1;
            k.w = g;
            var j = k.c ? k.c: "#000";
            k.c = j;
            var h = k.s == 1 ? "dashed": "solid";
            Site.setModuleStyleCssList(l, [{
                cls: ".g_separator",
                key: "display",
                value: "block"
            },
            {
                cls: ".g_separator",
                key: "border-width",
                value: k.w + "px"
            },
            {
                cls: ".g_separator",
                key: "border-color",
                value: k.c
            },
            {
                cls: ".g_separator",
                key: "border-style",
                value: h
            },
            {
                cls: ".g_separator",
                key: "border-left",
                value: "none"
            },
            {
                cls: ".g_separator",
                key: "border-top",
                value: "none"
            },
            {
                cls: ".g_separator",
                key: "border-right",
                value: "none"
            }])
        } else {
            if (k.y == 1) {
                Site.hideModuleContentSplitLine(l)
            } else {
                Site.showModuleContentSplitLine(l)
            }
        }
    };
    a.moduleRowHeightSwitch = function(g, h) {
        if (!a.mcontent_mRowHeightWrap) {
            a.mcontent_mRowHeightWrap = a.content_mcontent.find(".J_mRowHeightWrap")
        }
        if (g == 1) {
            a.mcontent_mRowHeightWrap.show()
        } else {
            a.mcontent_mRowHeightWrap.hide()
        }
        var k = a.id;
        if (!h) {
            var j = Site.getModuleAttrPattern(k).contentRowHeight;
            if (g == 1) {
                j.y = 1
            } else {
                j.y = 0
            }
            Site.logDog(100090, 30);
            c();
            a.onStyleChange()
        }
    };
    a.moduleLineIconSwitch = function(g, h) {
        if (!this.mcontent_mLineIconWrap) {
            this.mcontent_mLineIconWrap = this.content_mcontent.find(".J_mLineIconWrap")
        }
        if (g == 2) {
            this.mcontent_mLineIconWrap.show()
        } else {
            if (g == 1) {
                this.mcontent_mLineIconWrap.hide()
            } else {
                this.mcontent_mLineIconWrap.hide()
            }
        }
        var k = this.id;
        var j = Site.getModuleAttrPattern(k).contentLineIcon;
        if (!h) {
            if (g == 2) {
                j.y = 2;
                a.refreshContentLineIcon()
            } else {
                if (g == 1) {
                    j.y = 1;
                    Site.hideModuleContentLineIcon(k)
                } else {
                    j.y = 0;
                    Site.defaultModuleLineIcon(k)
                }
            }
            Site.logDog(100090, 24);
            a.onStyleChange()
        }
    };
    a.refreshContentLineIcon = function() {
        var j = this.id;
        var h = Site.getModuleAttrPattern(j).contentLineIcon;
        if (h.p) {
            var g = "url(" + h.p + ") no-repeat center;";
            Site.hideModuleContentLineIcon(j);
            if (Fai.top.$("#module" + j).find(".contentLineIcon").attr("style") == "width: 0.1%;") {
                Fai.top.$("#module" + j).find(".contentLineIcon").removeAttr("style")
            }
            Site.setModuleStyleCssList(j, [{
                cls: ".contentLineIcon",
                key: "background",
                value: g
            },
            {
                cls: ".contentLineIcon",
                key: "display",
                value: "table-cell"
            },
            {
                cls: ".contentLineIcon",
                key: "width",
                value: "1%;"
            }]);
            if (Fai.top.$("#module" + j).find("#newsList" + j).find(".contentLineIcon").length > 1) {
                Site.setModuleStyleCssList(j, [{
                    cls: ".contentLineIcon",
                    key: "padding-right",
                    value: "10px"
                }]);
                if (Fai.top.$("#module" + j).find("#newsList" + j).find(".top_with_line_icon").length > 0) {
                    Site.setModuleStyleCssList(j, [{
                        cls: ".top_with_line_icon",
                        key: "padding-left",
                        value: "5px"
                    },
                    {
                        cls: ".contentLineIcon",
                        key: "width",
                        value: "13px"
                    }])
                }
            }
        }
    };
    a.moduleContentBgSwitch = function(g, j) {
        if (!this.mcontent_mContentBgWrap) {
            this.mcontent_mContentBgWrap = this.content_mcontent.find(".J_mContentBgWrap")
        }
        if (g == 2) {
            this.mcontent_mContentBgWrap.show()
        } else {
            if (g == 1) {
                this.mcontent_mContentBgWrap.hide()
            } else {
                this.mcontent_mContentBgWrap.hide()
            }
        }
        var k = this.id;
        if (!j) {
            var h = Site.getModuleAttrPattern(k).contentBg;
            if (g == 2) {
                h.y = 2
            } else {
                if (g == 1) {
                    h.y = 1
                } else {
                    h.y = 0
                }
            }
            Site.logDog(100090, 17);
            a.refreshModuleContentBg();
            a.onStyleChange()
        }
    };
    a.moduleContentBgRepeatChange = function() {
        var j = this.id;
        var g = Site.getModuleAttrPattern(j).contentBg;
        var h = this.content_mcontent.find(".J_mContentBgRepeat").val();
        g.r = h;
        if (!g.f) {
            if (h != -1) {
                Fai.ing("请先添加背景图片。", true);
                return
            }
        }
        Site.showRepeatTip(h);
        a.refreshModuleContentBg();
        a.onStyleChange()
    };
    a.refreshModuleContentBg = function() {
        var o = this.id;
        var j = Site.getModuleAttrPattern(o).contentBg;
        if (j.y == 2) {
            Site.hideModuleContentBg(o);
            var g = j.c || "#000";
            j.c = g;
            if (typeof j.r == "undefined") {
                j.r = 0
            }
            var k = j.r;
            var h = "";
            h += j.c;
            var m = j.p;
            if (m) {
                if (k != -1) {
                    var l = "";
                    if (k == 0 || k == 6 || k == 7 || k == 8 || k == 9 || k == 13 || k == 14 || k == 15 || k == 16) {
                        l = "no-repeat"
                    }
                    if (k == 1 || k == 11 || k == 12) {
                        l = "repeat-x"
                    }
                    if (k == 2 || k == 21 || k == 22) {
                        l = "repeat-y"
                    }
                    if (k == 3) {
                        l = "repeat"
                    }
                    if (k == 4 || k == 5) {
                        l = "repeat"
                    }
                    var n = "center";
                    if (k == 9 || k == 12) {
                        n = "bottom"
                    }
                    if (k == 6 || k == 21) {
                        n = "left"
                    }
                    if (k == 7 || k == 22) {
                        n = "right"
                    }
                    if (k == 4 || k == 5 || k == 8 || k == 11) {
                        n = "top"
                    }
                    if (k == 13) {
                        n = "left top"
                    }
                    if (k == 14) {
                        n = "right top"
                    }
                    if (k == 15) {
                        n = "left bottom"
                    }
                    if (k == 16) {
                        n = "right bottom"
                    }
                    h += " url(" + m + ") " + l + " " + n
                }
            }
            Site.setModuleStyleCss(o, ".formMiddle" + o, "background", h);
            if (k == 4) {
                Site.setModuleStyleCss(o, ".formMiddle" + o, "background-size", "100% 100%")
            } else {
                if (k == 5) {
                    Site.setModuleStyleCss(o, ".formMiddle" + o, "background-size", "100%")
                }
            }
        } else {
            if (j.y == 1) {
                Site.hideModuleContentBg(o)
            } else {
                Site.showModuleContentBg(o)
            }
        }
    };
    a.moduleItemSpaceSwitch = function(g, j) {
        if (!this.mcontent_mItemSpaceWrap) {
            this.mcontent_mItemSpaceWrap = this.content_mcontent.find(".J_mItemSpaceInputWrap")
        }
        if (g == 1) {
            this.mcontent_mItemSpaceWrap.show()
        } else {
            if (g == 0) {
                this.mcontent_mItemSpaceWrap.hide()
            }
        }
        var k = this.id;
        if (!j) {
            var h = Site.getModuleAttrPattern(k).contentItemSpace;
            if (g == 1) {
                h.y = 1
            } else {
                if (g == 0) {
                    h.y = 0
                }
            }
            Site.logDog(100090, 25);
            a.refreshModuleItemSpace();
            a.onStyleChange()
        }
    };
    a.moduleItemSpaceWidthChange = function() {
        var l = this.id;
        var h = d("#module" + l);
        var g = Site.getModuleAttrPattern(l).contentItemSpace;
        var k = this.content_mcontent.find(".J_mItemSpaceInput");
        var j = k.val();
        if (j.length < 1) {
            return
        }
        if (isNaN(j)) {
            if (j != "-") {
                Fai.ing("请输入合法数字！", true);
                k.val(1)
            }
            return
        }
        if (j == 0 || j >= 100) {
            Fai.ing("请输入大于0小于100的数值", true);
            k.val(g.w || 1);
            return
        }
        g.w = k.val();
        a.refreshModuleItemSpace();
        a.onStyleChange();
        if (h.hasClass("formStyle51") || h.hasClass("formStyle53")) {
            Site.memberLoginCompatibility(l)
        }
    };
    a.refreshModuleItemSpace = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentItemSpace;
        if (g.y == 1) {
            Site.setModuleStyleCss(h, ".formMiddle" + h + " .formMiddleCenter" + h + " .itemSpace", "margin-bottom", g.w + "px")
        } else {
            if (g.y == 0) {
                Site.removeModuleStyleCss(h, ".formMiddle" + h + " .formMiddleCenter" + h + " .itemSpace", "margin-bottom")
            }
        }
    };
    a.moduleContentHoverBgSwitch = function(h, j) {
        if (!this.mcontent_mContentHoverBgWrap) {
            this.mcontent_mContentHoverBgWrap = this.content_mcontent.find(".J_mContentHoverBgWrap")
        }
        if (h == 2) {
            this.mcontent_mContentHoverBgWrap.show()
        } else {
            if (h == 1) {
                this.mcontent_mContentHoverBgWrap.hide()
            } else {
                this.mcontent_mContentHoverBgWrap.hide()
            }
        }
        var k = this.id;
        if (!j) {
            var g = Site.getModuleAttrPattern(k).contentHoverBg;
            if (h == 2) {
                g.y = 2
            } else {
                if (h == 1) {
                    g.y = 1
                } else {
                    g.y = 0
                }
            }
            Site.logDog(100090, 28);
            a.refreshModuleContentHoverBg();
            a.onStyleChange()
        }
    };
    a.moduleContentHoverBgRepeatChange = function() {
        var j = this.id;
        var g = Site.getModuleAttrPattern(j).contentHoverBg;
        var h = this.content_mcontent.find(".J_mContentHoverBgRepeat").val();
        g.r = h;
        if (!g.f) {
            if (h != -1) {
                Fai.ing("请先添加背景图片。", true);
                return
            }
        }
        Site.showRepeatTip(h);
        a.refreshModuleContentHoverBg();
        a.onStyleChange()
    };
    a.refreshModuleContentHoverBg = function() {
        var o = this.id;
        var g = Site.getModuleAttrPattern(o).contentHoverBg;
        if (g.y == 2) {
            Site.hideModuleContentHoverBg(o);
            var l = g.c || "#000";
            g.c = l;
            if (typeof g.r == "undefined") {
                g.r = 0
            }
            var j = g.r;
            var h = "";
            h += g.c;
            var m = g.p;
            if (m) {
                if (j != -1) {
                    var k = "";
                    if (j == 0 || j == 6 || j == 7 || j == 8 || j == 9 || j == 13 || j == 14 || j == 15 || j == 16) {
                        k = "no-repeat"
                    }
                    if (j == 1 || j == 11 || j == 12) {
                        k = "repeat-x"
                    }
                    if (j == 2 || j == 21 || j == 22) {
                        k = "repeat-y"
                    }
                    if (j == 3) {
                        k = "repeat"
                    }
                    if (j == 4 || j == 5) {
                        k = "repeat"
                    }
                    var n = "center";
                    if (j == 9 || j == 12) {
                        n = "bottom"
                    }
                    if (j == 6 || j == 21) {
                        n = "left"
                    }
                    if (j == 7 || j == 22) {
                        n = "right"
                    }
                    if (j == 4 || j == 5 || j == 8 || j == 11) {
                        n = "top"
                    }
                    if (j == 13) {
                        n = "left top"
                    }
                    if (j == 14) {
                        n = "right top"
                    }
                    if (j == 15) {
                        n = "left bottom"
                    }
                    if (j == 16) {
                        n = "right bottom"
                    }
                    h += " url(" + m + ") " + k + " " + n
                }
            }
            Site.cusModuleContentHoverBg(o, h, j)
        } else {
            if (g.y == 1) {
                Site.hideModuleContentHoverBg(o)
            } else {
                Site.showModuleContentHoverBg(o)
            }
        }
    };
    a.moduleContentSelectBgSwitch = function(h, j) {
        if (!this.mcontent_mContentSelectBgWrap) {
            this.mcontent_mContentSelectBgWrap = this.content_mcontent.find(".J_mContentSelectBgWrap")
        }
        if (h == 2) {
            this.mcontent_mContentSelectBgWrap.show()
        } else {
            if (h == 1) {
                this.mcontent_mContentSelectBgWrap.hide()
            } else {
                this.mcontent_mContentSelectBgWrap.hide()
            }
        }
        var k = this.id;
        if (!j) {
            var g = Site.getModuleAttrPattern(k).contentSelectBg;
            if (h == 2) {
                g.y = 2
            } else {
                if (h == 1) {
                    g.y = 1
                } else {
                    g.y = 0
                }
            }
            Site.logDog(100090, 29);
            a.refreshModuleContentSelectBg();
            a.onStyleChange()
        }
    };
    a.moduleContentSelectBgRepeatChange = function() {
        var j = this.id;
        var g = Site.getModuleAttrPattern(j).contentSelectBg;
        var h = this.content_mcontent.find(".J_mContentSelectBgRepeat").val();
        g.r = h;
        if (!g.f) {
            if (h != -1) {
                Fai.ing("请先添加背景图片。", true);
                return
            }
        }
        Site.showRepeatTip(h);
        a.refreshModuleContentSelectBg();
        a.onStyleChange()
    };
    a.refreshModuleContentSelectBg = function() {
        var o = this.id;
        var g = Site.getModuleAttrPattern(o).contentSelectBg;
        if (g.y == 2) {
            Site.hideModuleContentSelectBg(o);
            var m = g.c || "#000";
            g.c = m;
            if (typeof g.r == "undefined") {
                g.r = 0
            }
            var j = g.r;
            var h = "";
            h += g.c;
            var l = g.p;
            if (l) {
                if (j != -1) {
                    var k = "";
                    if (j == 0 || j == 6 || j == 7 || j == 8 || j == 9 || j == 13 || j == 14 || j == 15 || j == 16) {
                        k = "no-repeat"
                    }
                    if (j == 1 || j == 11 || j == 12) {
                        k = "repeat-x"
                    }
                    if (j == 2 || j == 21 || j == 22) {
                        k = "repeat-y"
                    }
                    if (j == 3) {
                        k = "repeat"
                    }
                    if (j == 4 || j == 5) {
                        k = "repeat"
                    }
                    var n = "center";
                    if (j == 9 || j == 12) {
                        n = "bottom"
                    }
                    if (j == 6 || j == 21) {
                        n = "left"
                    }
                    if (j == 7 || j == 22) {
                        n = "right"
                    }
                    if (j == 4 || j == 5 || j == 8 || j == 11) {
                        n = "top"
                    }
                    if (j == 13) {
                        n = "left top"
                    }
                    if (j == 14) {
                        n = "right top"
                    }
                    if (j == 15) {
                        n = "left bottom"
                    }
                    if (j == 16) {
                        n = "right bottom"
                    }
                    h += " url(" + l + ") " + k + " " + n
                }
            }
            Site.cusModuleContentSelectBg(o, h, j)
        } else {
            if (g.y == 1) {
                Site.hideModuleContentSelectBg(o)
            } else {
                Site.showModuleContentSelectBg(o)
            }
        }
    };
    a.moduleContentHoverFontSwitch = function(g, j) {
        if (!this.mcontent_mContentHoverFontWrap) {
            this.mcontent_mContentHoverFontWrap = this.content_mcontent.find(".J_mContentHoverFontWrap")
        }
        if (g == 1) {
            this.mcontent_mContentHoverFontWrap.show()
        } else {
            this.mcontent_mContentHoverFontWrap.hide()
        }
        var k = this.id;
        if (!j) {
            var h = Site.getModuleAttrPattern(k).contentHoverFont;
            if (g == 1) {
                h.y = 1
            } else {
                h.y = 0
            }
            Site.logDog(100090, 26);
            a.refreshModuleContentHoverFont();
            a.onStyleChange()
        }
    };
    a.moduleContentHoverFontSizeChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentHoverFont;
        g.s = this.content_mcontent.find(".J_mContentHoverFontSize").val();
        a.refreshModuleContentHoverFont();
        a.onStyleChange();
        if (Fai.top.$("#noticeScrollbar" + h).data("_innerHeight")) {
            Fai.top.Site.noticeUpDownSizeChange(h)
        }
    };
    a.moduleContentHoverFontBoldChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentHoverFont;
        g.w = this.content_mcontent.find(".J_mContentHoverFontTextBold").prop("checked") ? 1 : 0;
        a.refreshModuleContentHoverFont();
        a.onStyleChange()
    };
    a.moduleContentHoverFontUnderlineChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentHoverFont;
        g.u = this.content_mcontent.find(".J_mContentHoverFontUnderline").prop("checked") ? 1 : 0;
        a.refreshModuleContentHoverFont();
        a.onStyleChange()
    };
    a.moduleContentHoverFontFamilyChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentHoverFont;
        g.f = this.content_mcontent.find(".J_mContentHoverFontFamily").val();
        a.refreshModuleContentHoverFont();
        a.onStyleChange()
    };
    a.refreshModuleContentHoverFont = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentHoverFont;
        if (g.y == 1) {
            Site.cusModuleHoverFont(h, g)
        } else {
            Site.sysModuleHoverFont(h)
        }
    };
    a.moduleContentSelectFontSwitch = function(h, j) {
        if (!this.mcontent_mContentSelectFontWrap) {
            this.mcontent_mContentSelectFontWrap = this.content_mcontent.find(".J_mContentSelectFontWrap")
        }
        if (h == 1) {
            this.mcontent_mContentSelectFontWrap.show()
        } else {
            this.mcontent_mContentSelectFontWrap.hide()
        }
        var k = this.id;
        if (!j) {
            var g = Site.getModuleAttrPattern(k).contentSelectFont;
            if (h == 1) {
                g.y = 1
            } else {
                g.y = 0
            }
            Site.logDog(100090, 27);
            a.refreshModuleContentSelectFont();
            a.onStyleChange()
        }
    };
    a.moduleContentSelectFontSizeChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentSelectFont;
        g.s = this.content_mcontent.find(".J_mContentSelectFontSize").val();
        a.refreshModuleContentSelectFont();
        a.onStyleChange()
    };
    a.moduleContentSelectFontBoldChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentSelectFont;
        g.w = this.content_mcontent.find(".J_mContentSelectFontTextBold").prop("checked") ? 1 : 0;
        a.refreshModuleContentSelectFont();
        a.onStyleChange()
    };
    a.moduleContentSelectFontUnderlineChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentSelectFont;
        g.u = this.content_mcontent.find(".J_mContentSelectFontUnderline").prop("checked") ? 1 : 0;
        a.refreshModuleContentSelectFont();
        a.onStyleChange()
    };
    a.moduleContentSelectFontFamilyChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentSelectFont;
        g.f = this.content_mcontent.find(".J_mContentSelectFontFamily").val();
        a.refreshModuleContentSelectFont();
        a.onStyleChange()
    };
    a.refreshModuleContentSelectFont = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).contentSelectFont;
        if (g.y == 1) {
            Site.cusModuleSelectFont(h, g)
        } else {
            Site.sysModuleSelectFont(h)
        }
    };
    a.moduleSideSwitch = function(g) {
        if ( !! g) {
            this.cusStyleMenuList.filter(".menu_moduleSide").show();
            this.content_mside.show();
            this.content_splitLine.filter(".J_moduleSideLine").show()
        } else {
            this.cusStyleMenuList.filter(".menu_moduleSide").hide();
            this.content_mside.hide();
            this.content_splitLine.filter(".J_moduleSideLine").hide()
        }
    };
    a.moduleSideTextSwitch = function(g, h) {
        if (!this.mside_mSideTextWrap) {
            this.mside_mSideTextWrap = this.content_mside.find(".J_mSideTextWrap")
        }
        if (g == 2) {
            this.mside_mSideTextWrap.show()
        } else {
            if (g == 1) {
                this.mside_mSideTextWrap.hide()
            } else {
                this.mside_mSideTextWrap.hide()
            }
        }
        var k = this.id;
        if (!h) {
            var j = Site.getModuleAttrPattern(k).sideText;
            if (g == 2) {
                j.y = 2
            } else {
                if (g == 1) {
                    j.y = 1
                } else {
                    j.y = 0
                }
            }
            Site.logDog(100090, 18);
            a.refreshSideText();
            a.onStyleChange()
        }
    };
    a.moduleSideTextSizeChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).sideText;
        g.s = this.content_mside.find(".J_mSideTextSize").val();
        a.refreshSideText();
        a.onStyleChange()
    };
    a.moduleSideTextWeightChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).sideText;
        g.w = this.content_mside.find(".J_mSideTextBold").prop("checked") ? 1 : 0;
        a.refreshSideText();
        a.onStyleChange()
    };
    a.moduleSideTextFamilyChange = function() {
        var h = this.id;
        var g = Site.getModuleAttrPattern(h).sideText;
        g.f = this.content_mside.find(".J_mSideTextFamily").val();
        a.refreshSideText();
        a.onStyleChange();
        Site && Site.logFontFamilyUse && Site.logFontFamilyUse(g.f)
    };
    a.moduleSideTextColorSwitch = function(g, h) {
        if (!this.mside_mSideTextColorWrap) {
            this.mside_mSideTextColorWrap = this.content_mside.find(".J_mSideTextColorWrap")
        }
        if (g == 1) {
            this.mside_mSideTextColorWrap.show()
        } else {
            this.mside_mSideTextColorWrap.hide()
        }
        var k = this.id;
        if (!h) {
            var j = Site.getModuleAttrPattern(k).sideText;
            if (g == 1) {
                j.fct = 1
            } else {
                j.fct = 0
            }
            a.refreshSideText();
            a.onStyleChange()
        }
    };
    a.refreshSideText = function() {
        var j = this.id;
        var h = Site.getModuleAttrPattern(j).sideText;
        a.checkSideSetting();
        if (h.y == 2) {
            var g = "normal";
            if (h.w == 1) {
                g = "bolder"
            } else {
                h.w = 0
            }
            if (typeof h.s == "undefined") {
                h.s = this.content_mside.find(".J_mSideTextSize").val()
            }
            if (typeof h.f == "undefined") {
                h.f = this.content_mside.find(".J_mSideTextFamily").val()
            }
            Site.setModuleStyleCssList(j, [{
                cls: ".g_sideBtn_tl",
                key: "display",
                value: "block"
            },
            {
                cls: ".g_sideBtn_tl",
                key: "font-size",
                value: h.s + "px"
            },
            {
                cls: ".g_sideBtn_tl",
                key: "font-family",
                value: h.f
            },
            {
                cls: ".g_sideBtn_tl",
                key: "font-weight",
                value: g
            }]);
            if (h.fct == 1) {
                h.c = h.c || "#000";
                Site.setModuleStyleCssList(j, [{
                    cls: ".g_sideBtn_tl",
                    key: "color",
                    value: h.c
                }])
            } else {
                h.fct = 0;
                Site.removeModuleStyleCssList(j, [{
                    cls: ".g_sideBtn_tl",
                    key: "color"
                }])
            }
        } else {
            if (h.y == 1) {
                Site.setModuleStyleCss(j, ".g_sideBtn_tl", "display", "none")
            } else {
                Site.removeModuleStyleCssList(j, [{
                    cls: ".g_sideBtn_tl",
                    key: "display"
                },
                {
                    cls: ".g_sideBtn_tl",
                    key: "font-size"
                },
                {
                    cls: ".g_sideBtn_tl",
                    key: "font-family"
                },
                {
                    cls: ".g_sideBtn_tl",
                    key: "font-weight"
                },
                {
                    cls: ".g_sideBtn_tl",
                    key: "color"
                }])
            }
        }
    };
    a.checkSideSetting = function(g) {
        var l = this.id;
        var j = Site.getModuleAttrPattern(l);
        var k = j.sideText;
        var h = j.sideBg;
        if (k.y == 1 && h.y == 2) {
            a.moduleSideHeightSwitch(1, g);
            this.content_mside.find("#moduleSideHeight_sys").attr("disabled", "disabled").attr("checked", false);
            this.content_mside.find("#moduleSideHeight_cus").attr("checked", "checked")
        } else {
            this.content_mside.find("#moduleSideHeight_sys").attr("disabled", false)
        }
    };
    a.moduleSideWidthSwitch = function(g, j) {
        if (!this.mside_mSideWidthWrap) {
            this.mside_mSideWidthWrap = this.content_mside.find(".J_mSideWidthInputWrap")
        }
        if (g == 1) {
            this.mside_mSideWidthWrap.show()
        } else {
            this.mside_mSideWidthWrap.hide()
        }
        var k = this.id;
        var h = Site.getModuleAttrPattern(k).sideSize;
        if (!j) {
            if (g == 1) {
                a.moduleSideWidthChange()
            } else {
                h.w = -1;
                Site.autoSideWidth(k);
                a.onStyleChange()
            }
            Site.logDog(100090, 19)
        } else {
            this.content_mside.find(".J_mSideWidthInput").val(h.w <= -1 ? 25 : h.w)
        }
    };
    a.moduleSideWidthChange = function() {
        var k = this.id;
        var j = this.content_mside.find(".J_mSideWidthInput");
        var h = d.trim(j.val());
        if (h.length < 1) {
            return
        }
        var g = Site.getModuleAttrPattern(k).sideSize;
        if (isNaN(h)) {
            if (h != "-") {
                Fai.ing("请输入合法数字！", true);
                j.val(g.w || 25)
            }
            return
        }
        h = parseInt(h);
        if (h <= 0 || h >= 2000) {
            Fai.ing("请输入大于0小于2000的数值宽度", true);
            j.val(g.w || 25);
            return
        }
        g.w = h;
        Site.setModuleStyleCss(k, ".g_sideBtn", "width", h + "px");
        Site.setModuleStyleCss(k, ".g_sideBtn_c", "width", h + "px");
        a.onStyleChange()
    };
    a.moduleSideHeightSwitch = function(g, j) {
        if (!this.mside_mSideHeightWrap) {
            this.mside_mSideHeightWrap = this.content_mside.find(".J_mSideHeightInputWrap")
        }
        if (g == 1) {
            this.mside_mSideHeightWrap.show()
        } else {
            this.mside_mSideHeightWrap.hide()
        }
        var k = this.id;
        var h = Site.getModuleAttrPattern(k).sideSize;
        if (!j) {
            if (g == 1) {
                a.moduleSideHeightChange()
            } else {
                h.h = -1;
                Site.autoSideHeight(k);
                a.onStyleChange()
            }
            Site.logDog(100090, 20)
        } else {
            this.content_mside.find(".J_mSideHeightInput").val(h.h <= -1 ? 25 : h.h)
        }
    };
    a.moduleSideHeightChange = function() {
        var k = this.id;
        var j = this.content_mside.find(".J_mSideHeightInput");
        var g = d.trim(j.val());
        if (g.length < 1) {
            return
        }
        var h = Site.getModuleAttrPattern(k).sideSize;
        if (isNaN(g)) {
            if (g != "-") {
                Fai.ing("请输入合法数字！", true);
                j.val(h.h || 25)
            }
            return
        }
        g = parseInt(g);
        if (g <= 0 || g >= 2000) {
            Fai.ing("请输入大于0小于2000的数值高度", true);
            j.val(h.h || 25);
            return
        }
        h.h = g;
        Site.setModuleStyleCss(k, ".g_sideBtn_c", "height", g + "px");
        a.onStyleChange()
    };
    a.moduleSideBgSwitch = function(g, h) {
        if (!this.mside_mSideBgWrap) {
            this.mside_mSideBgWrap = this.content_mside.find(".J_mSideBgWrap")
        }
        if (g == 1) {
            this.mside_mSideBgWrap.show()
        } else {
            this.mside_mSideBgWrap.hide()
        }
        var k = this.id;
        if (!h) {
            var j = Site.getModuleAttrPattern(k).sideBg;
            if (g == 1) {
                j.y = 2
            } else {
                j.y = 0
            }
            Site.logDog(100090, 21);
            a.refreshModuleSideBg();
            a.onStyleChange()
        }
    };
    a.moduleSideBgRepeatChange = function() {
        var j = this.id;
        var g = Site.getModuleAttrPattern(j).sideBg;
        var h = this.content_mside.find(".J_mSideBgRepeat").val();
        g.r = h;
        if (!g.f) {
            if (g.r != -1) {
                Fai.ing("请先添加背景图片。", true);
                return
            }
        }
        Site.showRepeatTip(h);
        a.refreshModuleSideBg();
        a.onStyleChange()
    };
    a.refreshModuleSideBg = function() {
        var n = this.id;
        var h = Site.getModuleAttrPattern(n).sideBg;
        a.checkSideSetting();
        if (h.y == 2) {
            Site.hideModuleSideBg(n);
            h.c = h.c || "#000";
            var k = (typeof h.r == "undefined") ? 0 : h.r;
            h.r = k;
            var g = "";
            g += h.c;
            var l = h.p;
            if (l) {
                if (k != -1) {
                    var j = "";
                    if (k == 0) {
                        j = "no-repeat"
                    }
                    if (k == 1 || k == 11 || k == 12) {
                        j = "repeat-x"
                    }
                    if (k == 2 || k == 21 || k == 22) {
                        j = "repeat-y"
                    }
                    if (k == 3) {
                        j = "repeat"
                    }
                    if (k == 4 || k == 5) {
                        j = "repeat"
                    }
                    var m = "center";
                    if (k == 11) {
                        m = "top"
                    }
                    if (k == 12) {
                        m = "bottom"
                    }
                    if (k == 21) {
                        m = "left"
                    }
                    if (k == 22) {
                        m = "right"
                    }
                    if (k == 4 || k == 5) {
                        m = "top"
                    }
                    g += " url(" + l + ") " + j + " " + m
                }
            }
            Site.setModuleStyleCss(n, ".g_sideBtn_t", "display", "none");
            Site.setModuleStyleCss(n, ".g_sideBtn_c", "background", g);
            Site.setModuleStyleCss(n, ".g_sideBtn_b", "display", "none");
            if (k == 4) {
                Site.setModuleStyleCss(n, ".g_sideBtn_c", "background-size", "100% 100%")
            } else {
                if (k == 5) {
                    Site.setModuleStyleCss(n, ".g_sideBtn_c", "background-size", "100%")
                }
            }
        } else {
            Site.showModuleSideBg(n)
        }
    };
    a.initPanelData = function(I) {
        var W = I || {};
        var V = this.id;
        var m = this.module;
        var D = true;
        var u = a.content_mcontent;
        if (W.patternResetDefault || W.cusStyleResetDefault) {
            this.resetDefault = true;
            D = false
        } else {
            this.logDog = [];
            this.resetDefault = false;
            Site.logDog(100045, 31);
            if (this.entrance == 1) {
                Site.logDog(100090, 23)
            } else {
                Site.logDog(100090, 0)
            }
        }
        a.setModuleAttrPatternToDefault(W);
        if (W.patternResetDefault) {
            this.modulePatternFindInput.val("");
            this.modulePatternfindInputContainer.hide();
            this.allModuleStyleItem.show();
            a.modulePatternSelect(0);
            this.modulePatternFindSwitch.removeClass("findSwitch-on")
        }
        var l = Site.getModuleAttrPattern(V);
        var X = l.systemPattern;
        if (!this.moduleStyleItemImgContainer) {
            this.moduleStyleItemImgContainerList = this.moduleStyleItemContainer.find(".moduleStyleItemImgContainer")
        }
        this.moduleStyleItemImgContainerList.removeClass("moduleStyleItemImgContainer-on");
        this.moduleStyleItemImgContainerList.filter(".J_mPattern" + X).addClass("moduleStyleItemImgContainer-on");
        if (W.patternResetDefault) {
            a.scrollToCheckedPattern()
        }
        if (W.cusStyleResetDefault || D) {
            this.content_mnormal.find("#moduleBorder_show").attr("disabled", false);
            this.content_mnormal.find("#moduleBorder_hide").attr("disabled", false);
            this.content_mnormal.find("#moduleTitle_show").attr("disabled", false);
            this.content_mnormal.find("#moduleTitle_hide").attr("disabled", false);
            this.content_mcontent.find("#moduleNormalText_sys").attr("disabled", false);
            this.content_mcontent.find("#moduleNormalText_cus").attr("disabled", false);
            this.content_mcontent.find("#moduleLinkText_sys").attr("disabled", false);
            this.content_mcontent.find("#moduleLinkText_cus").attr("disabled", false);
            if (!Fai.top._panelOptionData.allowedOldStyle && (Fai.top._templateType == Fai.top._panelOptionData.templateType_free) && Fai.top._oem) {
                this.fcontent.find(".freeDisableOld").attr("disabled", "disabled")
            } else {
                this.fcontent.find(".freeDisableOld").removeAttr("disabled")
            }
            if (!Fai.top._panelOptionData.allowedStyle && (Fai.top._templateType == Fai.top._panelOptionData.templateType_free)) {
                this.content_mnormal.find(".J_freeDisableCover").show();
                this.content_mcontent.find(".J_freeDisableCover").show();
                this.fcontent.find(".freeDisable").attr("disabled", "disabled")
            } else {
                this.content_mnormal.find(".J_freeDisableCover").hide();
                this.content_mcontent.find(".J_freeDisableCover").hide();
                this.fcontent.find(".freeDisable").removeAttr("disabled")
            }
            if (this.id == this.moduleTypeList.sysLocation || this.id == this.moduleTypeList.sysIndexFavorite) {
                this.content_mnormal.find("#moduleBorder_show").attr("disabled", "disabled");
                this.content_mnormal.find("#moduleBorder_hide").attr("disabled", "disabled");
                this.content_mnormal.find("#moduleTitle_show").attr("disabled", "disabled");
                this.content_mnormal.find("#moduleTitle_hide").attr("disabled", "disabled");
                l.border.y = 1;
                l.bannerType = 1
            }
            if (m.hasClass("formStyle29")) {
                this.content_mcontent.find("#moduleNormalText_sys").attr("disabled", "disabled");
                this.content_mcontent.find("#moduleNormalText_cus").attr("disabled", "disabled");
                this.content_mcontent.find("#moduleLinkText_sys").attr("disabled", "disabled");
                this.content_mcontent.find("#moduleLinkText_cus").attr("disabled", "disabled")
            } else {
                if (m.attr("_inTab") > 0) {
                    this.content_mnormal.find("#moduleBorder_show").attr("disabled", "disabled");
                    this.content_mnormal.find("#moduleBorder_hide").attr("disabled", "disabled");
                    l.border.y = 1;
                    this.content_mnormal.find("#moduleTitle_show").attr("disabled", "disabled");
                    this.content_mnormal.find("#moduleTitle_hide").attr("disabled", "disabled");
                    l.bannerType = 1
                }
            }
            if (m.hasClass("formStyle81")) {
                this.content_mcontent.find("#moduleNormalText_sys").attr("disabled", "disabled");
                this.content_mcontent.find("#moduleNormalText_cus").attr("disabled", "disabled")
            }
            if ((this.styleId == this.moduleStyleList.weather) || (this.styleId == this.moduleStyleList.bdMap) || (this.styleId == this.moduleStyleList.iframe)) {
                this.content_mcontent.find("#moduleNormalText_sys").attr("disabled", "disabled");
                this.content_mcontent.find("#moduleNormalText_cus").attr("disabled", "disabled");
                this.content_mcontent.find("#moduleLinkText_sys").attr("disabled", "disabled");
                this.content_mcontent.find("#moduleLinkText_cus").attr("disabled", "disabled");
                this.content_mcontent.find(".J_mNormalTextSettingContent").css("color", "#AFB4B9");
                this.content_mcontent.find(".J_mLinkTextSettingContent").css("color", "#AFB4B9")
            }
            if (W.cusStyleResetDefault) {
                if (this.styleId == this.moduleStyleList.sysSiteSearch) {
                    l.border.y = 1;
                    l.bannerType = 1;
                    l.contentBg.y = 1
                } else {
                    if (this.styleId == this.moduleStyleList.sysIndexFavorite) {
                        l.border.y = 1;
                        l.bannerType = 1;
                        l.contentBg.y = 1
                    } else {
                        if (this.styleId == this.moduleStyleList.sysLocation) {
                            l.border.y = 1;
                            l.bannerType = 1;
                            l.contentBg.y = 1
                        } else {
                            if (this.styleId == this.moduleStyleList.sysDate) {
                                l.border.y = 1;
                                l.bannerType = 1;
                                l.contentBg.y = 1
                            } else {
                                if (this.styleId == this.moduleStyleList.sysWebsiteQrcode) {
                                    l.bannerType = 1
                                } else {
                                    if (this.styleId == this.moduleStyleList.sysMemberCenter) {
                                        l.border.y = 1;
                                        l.bannerType = 1;
                                        l.inner.y = 1
                                    } else {
                                        if (this.styleId == this.moduleStyleList.floatBtn) {
                                            l.border.y = 1;
                                            l.bannerType = 1;
                                            l.inner.y = 0;
                                            l.contentBg.y = 1
                                        } else {
                                            if (this.styleId == this.moduleStyleList.photoCard) {
                                                l.border.y = 1;
                                                l.bannerType = 1;
                                                l.inner.y = 0;
                                                l.contentBg.y = 1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (m.hasClass("formStyle29")) {
                    l.border.y = 1;
                    l.bannerType = 1;
                    l.inner.y = 1;
                    m.attr("_autoHeight", 0);
                    this.content_mnormal.find(".J_mHeightInput").val(200);
                    this.mcontent_mInnerPaddingInput_left.val(0);
                    this.mcontent_mInnerPaddingInput_right.val(0);
                    this.mcontent_mInnerPaddingInput_top.val(0);
                    this.mcontent_mInnerPaddingInput_bottom.val(0)
                } else {
                    if (m.hasClass("formStyle35")) {
                        l.border.y = 1;
                        l.bannerType = 1
                    } else {
                        if (m.attr("_inTab") > 0) {
                            l.bannerType = 1
                        }
                    }
                }
            }
            var O = l.border.y;
            if (O == 0 || O == 2) {
                a.moduleBorderSwitch(0, D);
                this.content_mnormal.find("#moduleBorder_show").attr("checked", "checked");
                this.content_mnormal.find("#moduleBorder_hide").attr("checked", false)
            } else {
                if (O == 1) {
                    a.moduleBorderSwitch(1, D);
                    this.content_mnormal.find("#moduleBorder_show").attr("checked", false);
                    this.content_mnormal.find("#moduleBorder_hide").attr("checked", "checked")
                }
            }
            var x = l.bannerType;
            if (x == 0) {
                a.moduleTitleSwitch(0, D);
                this.content_mnormal.find("#moduleTitle_show").attr("checked", "checked");
                this.content_mnormal.find("#moduleTitle_hide").attr("checked", false)
            } else {
                a.moduleTitleSwitch(1, D);
                this.content_mnormal.find("#moduleTitle_show").attr("checked", false);
                this.content_mnormal.find("#moduleTitle_hide").attr("checked", "checked")
            }
            if (m.attr("_autoHeight") == 1) {
                a.moduleHeightSwitch(0, D);
                this.content_mnormal.find("#moduleHeight_sys").attr("checked", "checked");
                this.content_mnormal.find("#moduleHeight_cus").attr("checked", false)
            } else {
                a.moduleHeightSwitch(1, D);
                this.content_mnormal.find("#moduleHeight_sys").attr("checked", false);
                this.content_mnormal.find("#moduleHeight_cus").attr("checked", "checked")
            }
            if (m.css("position") == "absolute") {
                this.content_mnormal.find(".J_mWidthSettingContent").show();
                this.content_mnormal.find(".J_mPosSettingContent").show();
                this.content_mnormal.find(".J_mOutPaddingSettingContent").hide();
                this.content_mnormal.find(".J_mWidthInput").val(m.width());
                a.refreshModulePos()
            } else {
                this.content_mnormal.find(".J_mWidthSettingContent").hide();
                this.content_mnormal.find(".J_mPosSettingContent").hide();
                this.content_mnormal.find(".J_mOutPaddingSettingContent").show();
                var U = l.outside.y;
                if (U == 0) {
                    a.moduleOutPaddingSwitch(0, D);
                    this.content_mnormal.find("#moduleOutPadding_sys").attr("checked", "checked");
                    this.content_mnormal.find("#moduleOutPadding_cus").attr("checked", false)
                } else {
                    a.moduleOutPaddingSwitch(1, D);
                    this.content_mnormal.find("#moduleOutPadding_sys").attr("checked", false);
                    this.content_mnormal.find("#moduleOutPadding_cus").attr("checked", "checked")
                }
            }
            if (D) {
                var y = 100 - l.transparent;
                this.mOpacitySliderBar.slider("option", "value", y);
                this.mOpacitySliderLetter.html(y + "%")
            } else {
                var y = 100 - l.transparent;
                this.mOpacitySliderBar.slider("option", "value", y);
                this.mOpacitySliderLetter.html(y + "%");
                a.refreshModuleOpacity(y)
            }
            var R = l.border.c || "#000";
            var k = l.border.w || 1;
            var ah = l.border.s;
            this.content_mborder.find(".J_mBorderColorPicker").css("background-color", R);
            this.content_mborder.find(".J_mborderWidth").val(k);
            this.content_mborder.find(".J_mborderLineStyle").val(ah);
            if (O == 0) {
                a.moduleBorderStyleSwitch(0, D);
                this.content_mborder.find("#moduleBorderStyle_sys").attr("checked", "checked");
                this.content_mborder.find("#moduleBorderStyle_cus").attr("checked", false)
            } else {
                if (O == 1) {
                    this.content_mborder.find("#moduleBorderStyle_sys").attr("checked", "checked");
                    this.content_mborder.find("#moduleBorderStyle_cus").attr("checked", false)
                } else {
                    a.moduleBorderStyleSwitch(2, D);
                    this.content_mborder.find("#moduleBorderStyle_sys").attr("checked", false);
                    this.content_mborder.find("#moduleBorderStyle_cus").attr("checked", "checked")
                }
            }
            var ae = l.bannerText;
            if (ae.y == 0) {
                a.moduleTitleTextSwitch(0, D);
                this.content_mtitle.find("#moduleTitleText_sys").attr("checked", "checked");
                this.content_mtitle.find("#moduleTitleText_hide").attr("checked", false);
                this.content_mtitle.find("#moduleTitleText_cus").attr("checked", false)
            } else {
                if (ae.y == 1) {
                    a.moduleTitleTextSwitch(1, D);
                    this.content_mtitle.find("#moduleTitleText_sys").attr("checked", false);
                    this.content_mtitle.find("#moduleTitleText_hide").attr("checked", "checked");
                    this.content_mtitle.find("#moduleTitleText_cus").attr("checked", false)
                } else {
                    a.moduleTitleTextSwitch(2, D);
                    this.content_mtitle.find("#moduleTitleText_sys").attr("checked", false);
                    this.content_mtitle.find("#moduleTitleText_hide").attr("checked", false);
                    this.content_mtitle.find("#moduleTitleText_cus").attr("checked", "checked")
                }
            }
            this.content_mtitle.find(".J_mTitleTextSize").val(ae.s);
            this.content_mtitle.find(".J_mTitleTextBold").attr("checked", ae.w == 0 ? false: "checked");
            this.content_mtitle.find(".J_mTitleTextFamily ").val(ae.f);
            if (ae.fct == 1) {
                a.moduleTitleTextColorSwitch(1, D);
                this.content_mtitle.find("#moduleTitleTextColor_sys").attr("checked", false);
                this.content_mtitle.find("#moduleTitleTextColor_cus").attr("checked", "checked")
            } else {
                a.moduleTitleTextColorSwitch(0, D);
                this.content_mtitle.find("#moduleTitleTextColor_sys").attr("checked", "checked");
                this.content_mtitle.find("#moduleTitleTextColor_cus").attr("checked", false)
            }
            var M = ae.c || "#000";
            this.content_mtitle.find(".J_mTitleTextColorPicker").css("background-color", M);
            if (ae.py == 1) {
                a.moduleTitleTextPaddingSwitch(1, D);
                this.content_mtitle.find("#moduleTitleTextPadding_sys").attr("checked", false);
                this.content_mtitle.find("#moduleTitleTextPadding_cus").attr("checked", "checked")
            } else {
                a.moduleTitleTextPaddingSwitch(0, D);
                this.content_mtitle.find("#moduleTitleTextPadding_sys").attr("checked", "checked");
                this.content_mtitle.find("#moduleTitleTextPadding_cus").attr("checked", false)
            }
            this.content_mtitle.find(".J_mTitleTextPadding_left").val(ae.r || 0);
            this.content_mtitle.find(".J_mTitleTextPadding_top").val(ae.u || 0);
            var B = m.find(".formBanner").first();
            if (B.find(".formBannerMore").length < 1) {
                this.content_mtitle.find(".J_mTitleTextMoreSettingContent").hide()
            } else {
                this.content_mtitle.find(".J_mTitleTextMoreSettingContent").show();
                var aj = l.bannerMore;
                if (aj.y == 0) {
                    a.moduleTitleTextMoreSwitch(0, D);
                    this.content_mtitle.find("#moduleTitleTextMore_sys").attr("checked", "checked");
                    this.content_mtitle.find("#moduleTitleTextMore_hide").attr("checked", false);
                    this.content_mtitle.find("#moduleTitleTextMore_cus").attr("checked", false)
                } else {
                    a.moduleTitleTextMoreSwitch(1, D);
                    this.content_mtitle.find("#moduleTitleTextMore_sys").attr("checked", false);
                    this.content_mtitle.find("#moduleTitleTextMore_hide").attr("checked", false);
                    this.content_mtitle.find("#moduleTitleTextMore_cus").attr("checked", "checked")
                }
                this.content_mtitle.find(".J_mTitleTextMoreSize").val(aj.s);
                if (aj.w == 1) {
                    this.content_mtitle.find(".J_mTitleTextMoreBold").attr("checked", "checked")
                } else {
                    this.content_mtitle.find(".J_mTitleTextMoreBold").attr("checked", false)
                }
                if (aj.d == 1) {
                    this.content_mtitle.find(".J_mTitleTextMoreDecoration").attr("checked", "checked")
                } else {
                    this.content_mtitle.find(".J_mTitleTextMoreDecoration").attr("checked", false)
                }
                this.content_mtitle.find(".J_mTitleTextMoreFamily").val(aj.f);
                if (aj.fct == 1) {
                    a.moduleTitleTextMoreColorSwitch(1, D);
                    this.content_mtitle.find("#moduleTitleTextMoreColor_sys").attr("checked", false);
                    this.content_mtitle.find("#moduleTitleTextMoreColor_cus").attr("checked", "checked")
                } else {
                    a.moduleTitleTextMoreColorSwitch(0, D);
                    this.content_mtitle.find("#moduleTitleTextMoreColor_sys").attr("checked", "checked");
                    this.content_mtitle.find("#moduleTitleTextMoreColor_cus").attr("checked", false)
                }
                var z = aj.c || "#000";
                this.content_mtitle.find(".J_mTitleTextMoreColorPicker").css("background-color", z);
                if (aj.py == 1) {
                    a.moduleTitleTextMorePaddingSwitch(1, D);
                    this.content_mtitle.find("#moduleTitleTextMorePadding_sys").attr("checked", false);
                    this.content_mtitle.find("#moduleTitleTextMorePadding_cus").attr("checked", "checked")
                } else {
                    a.moduleTitleTextMorePaddingSwitch(0, D);
                    this.content_mtitle.find("#moduleTitleTextMorePadding_sys").attr("checked", "checked");
                    this.content_mtitle.find("#moduleTitleTextMorePadding_cus").attr("checked", false)
                }
                this.content_mtitle.find(".J_mTitleTextMorePadding_right").val(aj.r || 0);
                this.content_mtitle.find(".J_mTitleTextMorePadding_top").val(aj.u || 0)
            }
            if (l.bannerAutoHeight) {
                a.moduleTitleHeightSwitch(0, D);
                this.content_mtitle.find("#moduleTitleHeight_sys").attr("checked", "checked");
                this.content_mtitle.find("#moduleTitleHeight_cus").attr("checked", false)
            } else {
                a.moduleTitleHeightSwitch(1, D);
                this.content_mtitle.find("#moduleTitleHeight_sys").attr("checked", false);
                this.content_mtitle.find("#moduleTitleHeight_cus").attr("checked", "checked")
            }
            var q = l.bannerBg;
            if (q.y == 2) {
                a.moduleTitleBgSwitch(2, D);
                this.content_mtitle.find("#moduleTitleBg_sys").attr("checked", false);
                this.content_mtitle.find("#moduleTitleBg_hide").attr("checked", false);
                this.content_mtitle.find("#moduleTitleBg_cus").attr("checked", "checked")
            } else {
                if (q.y == 1) {
                    a.moduleTitleBgSwitch(1, D);
                    this.content_mtitle.find("#moduleTitleBg_sys").attr("checked", false);
                    this.content_mtitle.find("#moduleTitleBg_hide").attr("checked", "checked");
                    this.content_mtitle.find("#moduleTitleBg_cus").attr("checked", false)
                } else {
                    a.moduleTitleBgSwitch(0, D);
                    this.content_mtitle.find("#moduleTitleBg_sys").attr("checked", "checked");
                    this.content_mtitle.find("#moduleTitleBg_hide").attr("checked", false);
                    this.content_mtitle.find("#moduleTitleBg_cus").attr("checked", false)
                }
            }
            var C = q.c || "#000";
            this.content_mtitle.find(".J_mTitleBgColorPicker").css("background-color", C);
            if (q.f) {
                this.content_mtitle.find(".J_mTitleBgUploadmsg").html("<a href='javascript:;' onclick='Site.faiSettingPanel.view(\"" + q.f + "\");return false;'>查看</a>");
                this.content_mtitle.find(".J_mTitleBgWrap .J_previewContent").removeClass("f-previewContent-none");
                this.content_mtitle.find(".J_mTitleBgWrap .J_preview").html("<img class='f-previewImg' src='" + q.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
            } else {
                this.content_mtitle.find(".J_mTitleBgUploadmsg").empty();
                this.content_mtitle.find(".J_mTitleBgWrap .J_previewContent").addClass("f-previewContent-none");
                this.content_mtitle.find(".J_mTitleBgWrap .J_preview").empty()
            }
            var ad = (typeof q.r == "undefined") ? 0 : q.r;
            this.content_mtitle.find(".J_mTitleBgRepeat").val(ad);
            var Q = l.bannerIcon;
            if (Q.y == 2) {
                a.moduleTitleIconSwitch(2, D);
                this.content_mtitle.find("#moduleTitleIcon_sys").attr("checked", false);
                this.content_mtitle.find("#moduleTitleIcon_hide").attr("checked", false);
                this.content_mtitle.find("#moduleTitleIcon_cus").attr("checked", "checked")
            } else {
                if (Q.y == 1) {
                    a.moduleTitleIconSwitch(1, D);
                    this.content_mtitle.find("#moduleTitleIcon_sys").attr("checked", false);
                    this.content_mtitle.find("#moduleTitleIcon_hide").attr("checked", "checked");
                    this.content_mtitle.find("#moduleTitleIcon_cus").attr("checked", false)
                } else {
                    a.moduleTitleIconSwitch(0, D);
                    this.content_mtitle.find("#moduleTitleIcon_sys").attr("checked", "checked");
                    this.content_mtitle.find("#moduleTitleIcon_hide").attr("checked", false);
                    this.content_mtitle.find("#moduleTitleIcon_cus").attr("checked", false)
                }
            }
            if (Q.f) {
                this.content_mtitle.find(".J_mTitleIconUploadmsg").html("<a href='javascript:;' onclick='Site.faiSettingPanel.view(\"" + Q.f + "\");return false;'>查看</a>");
                this.content_mtitle.find(".J_mTitleIconWrap .J_previewContent").removeClass("f-previewContent-none");
                this.content_mtitle.find(".J_mTitleIconWrap .J_preview").html("<img class='f-previewImg' src='" + Q.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
            } else {
                this.content_mtitle.find(".J_mTitleIconUploadmsg").empty();
                this.content_mtitle.find(".J_mTitleIconWrap .J_previewContent").addClass("f-previewContent-none");
                this.content_mtitle.find(".J_mTitleIconWrap .J_preview").empty()
            }
            var L = l.inner;
            if (L.y == 1) {
                a.moduleInnerPaddingSwitch(1, D);
                this.content_mcontent.find("#moduleInnerPadding_sys").attr("checked", false);
                this.content_mcontent.find("#moduleInnerPadding_cus").attr("checked", "checked")
            } else {
                a.moduleInnerPaddingSwitch(0, D);
                this.content_mcontent.find("#moduleInnerPadding_sys").attr("checked", "checked");
                this.content_mcontent.find("#moduleInnerPadding_cus").attr("checked", false)
            }
            var af = l.contentText;
            if (af.y == 1) {
                a.moduleNormalTextSwitch(1, D);
                this.content_mcontent.find("#moduleNormalText_sys").attr("checked", false);
                this.content_mcontent.find("#moduleNormalText_cus").attr("checked", "checked")
            } else {
                a.moduleNormalTextSwitch(0, D);
                this.content_mcontent.find("#moduleNormalText_sys").attr("checked", "checked");
                this.content_mcontent.find("#moduleNormalText_cus").attr("checked", false)
            }
            if (af.fct == 1) {
                a.moduleNormalTextColorSwitch(1, D);
                this.content_mcontent.find("#moduleNormalTextColor_sys").attr("checked", false);
                this.content_mcontent.find("#moduleNormalTextColor_cus").attr("checked", "checked")
            } else {
                a.moduleNormalTextColorSwitch(0, D);
                this.content_mcontent.find("#moduleNormalTextColor_sys").attr("checked", "checked");
                this.content_mcontent.find("#moduleNormalTextColor_cus").attr("checked", false)
            }
            this.content_mcontent.find(".J_mNormalTextSize").val(af.cs);
            this.content_mcontent.find(".J_mNormalTextFamily").val(af.f);
            var g = af.c || "#000";
            this.content_mcontent.find(".J_mNormalTextColorPicker").css("background-color", g);
            var K = l.contentLink;
            if (K.y == 1) {
                a.moduleLinkTextSwitch(1, D);
                this.content_mcontent.find("#moduleLinkText_sys").attr("checked", false);
                this.content_mcontent.find("#moduleLinkText_cus").attr("checked", "checked")
            } else {
                a.moduleLinkTextSwitch(0, D);
                this.content_mcontent.find("#moduleLinkText_sys").attr("checked", "checked");
                this.content_mcontent.find("#moduleLinkText_cus").attr("checked", false)
            }
            if (K.fct == 1) {
                a.moduleLinkTextColorSwitch(1, D);
                this.content_mcontent.find("#moduleLinkTextColor_sys").attr("checked", false);
                this.content_mcontent.find("#moduleLinkTextColor_cus").attr("checked", "checked")
            } else {
                a.moduleLinkTextColorSwitch(0, D);
                this.content_mcontent.find("#moduleLinkTextColor_sys").attr("checked", "checked");
                this.content_mcontent.find("#moduleLinkTextColor_cus").attr("checked", false)
            }
            this.content_mcontent.find(".J_mLinkTextSize").val(K.ls);
            this.content_mcontent.find(".J_mTitleTextMoreThick").attr("checked", K.b == 1 ? "checked": false);
            this.content_mcontent.find(".J_mTitleTextMoreDecoration").attr("checked", K.d == 1 ? "checked": false);
            this.content_mcontent.find(".J_mLinkTextFamily").val(K.f);
            var Y = K.c || "#000";
            this.content_mcontent.find(".J_mLinkTextColorPicker").css("background-color", Y);
            if (Fai.top.$("#module" + V + "").find(".g_separator").length < 1) {
                this.content_mcontent.find(".J_mSplitLineSettingContent").hide()
            } else {
                this.content_mcontent.find(".J_mSplitLineSettingContent").show();
                var h = l.contentSplitLine;
                if (h.y == 2) {
                    a.moduleSplitLineSwitch(2, D);
                    this.content_mcontent.find("#moduleSplitLine_sys").attr("checked", false);
                    this.content_mcontent.find("#moduleSplitLine_hide").attr("checked", false);
                    this.content_mcontent.find("#moduleSplitLine_cus").attr("checked", "checked")
                } else {
                    if (h.y == 1) {
                        this.content_mcontent.find(".J_mTitleIconUploadmsg").html("");
                        a.moduleSplitLineSwitch(1, D);
                        this.content_mcontent.find("#moduleSplitLine_sys").attr("checked", false);
                        this.content_mcontent.find("#moduleSplitLine_hide").attr("checked", "checked");
                        this.content_mcontent.find("#moduleSplitLine_cus").attr("checked", false)
                    } else {
                        this.content_mcontent.find(".J_mTitleIconUploadmsg").html("");
                        a.moduleSplitLineSwitch(0, D);
                        this.content_mcontent.find("#moduleSplitLine_sys").attr("checked", "checked");
                        this.content_mcontent.find("#moduleSplitLine_hide").attr("checked", false);
                        this.content_mcontent.find("#moduleSplitLine_cus").attr("checked", false)
                    }
                }
                var n = h.c || "#000";
                this.content_mcontent.find(".J_mSplitLineColorPicker").css("background-color", n);
                this.content_mcontent.find(".J_mSplitLineWidth").val(h.w);
                this.content_mcontent.find(".J_mSplitLineStyle").val(h.s)
            }
            if (!b()) {
                a.content_mcontent.find(".J_mRowHeightSettingContent").hide()
            } else {
                a.content_mcontent.find(".J_mRowHeightSettingContent").show();
                var N = l.contentRowHeight;
                if (N.y == 0) {
                    a.moduleRowHeightSwitch(0, D);
                    u.find("#moduleRowHeight_sys").attr("checked", "checked");
                    u.find("#moduleRowHeight_cus").attr("checked", false)
                } else {
                    a.moduleRowHeightSwitch(1, D);
                    u.find("#moduleRowHeight_sys").attr("checked", false);
                    u.find("#moduleRowHeight_cus").attr("checked", "checked")
                }
                if (D) {
                    a.mRowHeightSliderBar.slider("option", "value", (N.h || 32));
                    a.mRowHeightSliderLetter.html((N.h || 32) + "px")
                }
            }
            if (Fai.top.$("#module" + V + "").find(".contentLineIcon").length < 1) {
                this.content_mcontent.find(".J_mLineIconSettingContent").hide()
            } else {
                this.content_mcontent.find(".J_mLineIconSettingContent").show();
                var ai = l.contentLineIcon;
                if (ai.y == 2) {
                    a.moduleLineIconSwitch(2, D);
                    this.content_mcontent.find("#moduleLineIconSetting_sys").attr("checked", false);
                    this.content_mcontent.find("#moduleLineIconSetting_hide").attr("checked", false);
                    this.content_mcontent.find("#moduleLineIconSetting_cus").attr("checked", "checked")
                } else {
                    if (ai.y == 1) {
                        a.moduleLineIconSwitch(1, D);
                        this.content_mcontent.find("#moduleLineIconSetting_sys").attr("checked", false);
                        this.content_mcontent.find("#moduleLineIconSetting_hide").attr("checked", "checked");
                        this.content_mcontent.find("#moduleLineIconSetting_cus").attr("checked", false)
                    } else {
                        a.moduleLineIconSwitch(0, D);
                        this.content_mcontent.find("#moduleLineIconSetting_sys").attr("checked", "checked");
                        this.content_mcontent.find("#moduleLineIconSetting_hide").attr("checked", false);
                        this.content_mcontent.find("#moduleLineIconSetting_cus").attr("checked", false)
                    }
                }
            }
            var ab = Fai.top.$("#module" + V + "");
            var E = l.contentItemSpace;
            if (! (ab.hasClass("formStyle51") || ab.hasClass("formStyle52") || ab.hasClass("formStyle53"))) {
                this.content_mcontent.find(".J_mItemSpaceSettingContent").hide()
            } else {
                this.content_mcontent.find(".J_mItemSpaceSettingContent").show();
                if (E.y == 1) {
                    a.moduleItemSpaceSwitch(1, D);
                    this.content_mcontent.find("#moduleItemSpace_cus").attr("checked", "checked");
                    this.content_mcontent.find("#moduleItemSpace_sys").attr("checked", false)
                } else {
                    a.moduleItemSpaceSwitch(0, D);
                    this.content_mcontent.find("#moduleItemSpace_cus").attr("checked", false);
                    this.content_mcontent.find("#moduleItemSpace_sys").attr("checked", "checked")
                }
            }
            E.w = E.w || 13;
            this.content_mcontent.find(".J_mItemSpaceInput").val(E.w);
            var t = o(m);
            var w = j(m);
            var G = l.contentHoverFont;
            if (!t) {
                this.content_mcontent.find(".J_mContentHoverFontSettingContent").hide()
            } else {
                this.content_mcontent.find(".J_mContentHoverFontSettingContent").show();
                if (G.y == 1) {
                    a.moduleContentHoverFontSwitch(1, D);
                    this.content_mcontent.find("#moduleContentHoverFont_sys").attr("checked", false);
                    this.content_mcontent.find("#moduleContentHoverFont_cus").attr("checked", "checked")
                } else {
                    a.moduleContentHoverFontSwitch(0, D);
                    this.content_mcontent.find("#moduleContentHoverFont_sys").attr("checked", "checked");
                    this.content_mcontent.find("#moduleContentHoverFont_cus").attr("checked", false)
                }
                this.content_mcontent.find(".J_mContentHoverFontSize").val(G.s);
                this.content_mcontent.find(".J_mContentHoverFontUnderline").attr("checked", G.u == 1 ? "checked": false);
                this.content_mcontent.find(".J_mContentHoverFontFamily").val(G.f);
                var aa = G.c || "#000";
                this.content_mcontent.find(".J_mContentHoverFontColorPicker").css("background-color", aa)
            }
            var A = l.contentSelectFont;
            if (!w) {
                this.content_mcontent.find(".J_mContentSelectFontSettingContent").hide()
            } else {
                if (A.y == 1) {
                    a.moduleContentSelectFontSwitch(1, D);
                    this.content_mcontent.find("#moduleContentSelectFont_sys").attr("checked", false);
                    this.content_mcontent.find("#moduleContentSelectFont_cus").attr("checked", "checked")
                } else {
                    a.moduleContentSelectFontSwitch(0, D);
                    this.content_mcontent.find("#moduleContentSelectFont_sys").attr("checked", "checked");
                    this.content_mcontent.find("#moduleContentSelectFont_cus").attr("checked", false)
                }
                this.content_mcontent.find(".J_mContentSelectFontSize").val(A.s);
                this.content_mcontent.find(".J_mContentSelectFontUnderline").attr("checked", A.u == 1 ? "checked": false);
                this.content_mcontent.find(".J_mContentSelectFontFamily").val(A.f);
                var r = A.c || "#000";
                this.content_mcontent.find(".J_mContentSelectFontColorPicker").css("background-color", r)
            }
            var T = l.contentHoverBg;
            if (!t) {
                this.content_mcontent.find(".J_mContentHoverBgSettingContent").hide()
            } else {
                this.content_mcontent.find(".J_mContentHoverBgSettingContent").show();
                if (T.y == 2) {
                    a.moduleContentHoverBgSwitch(2, D);
                    this.content_mcontent.find("#moduleContentHoverBg_sys").attr("checked", false);
                    this.content_mcontent.find("#moduleContentHoverBg_hide").attr("checked", false);
                    this.content_mcontent.find("#moduleContentHoverBg_cus").attr("checked", "checked")
                } else {
                    if (T.y == 1) {
                        a.moduleContentHoverBgSwitch(1, D);
                        this.content_mcontent.find("#moduleContentHoverBg_sys").attr("checked", false);
                        this.content_mcontent.find("#moduleContentHoverBg_hide").attr("checked", "checked");
                        this.content_mcontent.find("#moduleContentHoverBg_cus").attr("checked", false)
                    } else {
                        a.moduleContentHoverBgSwitch(0, D);
                        this.content_mcontent.find("#moduleContentHoverBg_sys").attr("checked", "checked");
                        this.content_mcontent.find("#moduleContentHoverBg_hide").attr("checked", false);
                        this.content_mcontent.find("#moduleContentHoverBg_cus").attr("checked", false)
                    }
                }
                var P = T.c || "#000";
                this.content_mcontent.find(".J_mContentHoverBgColorPicker").css("background-color", P);
                if (T.f) {
                    this.content_mcontent.find(".J_mContentHoverBgUploadmsg").html("<a href='javascript:;' onclick='Site.faiSettingPanel.view(\"" + T.f + "\");return false;'>查看</a>");
                    this.content_mcontent.find(".J_mContentHoverBgWrap .J_previewContent").removeClass("f-previewContent-none");
                    this.content_mcontent.find(".J_mContentHoverBgWrap .J_preview").html("<img class='f-previewImg' src='" + T.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
                } else {
                    this.content_mcontent.find(".J_mContentHoverBgUploadmsg").empty();
                    this.content_mcontent.find(".J_mContentHoverBgWrap .J_previewContent").addClass("f-previewContent-none");
                    this.content_mcontent.find(".J_mContentHoverBgWrap .J_preview").empty()
                }
                var F = (typeof T.r == "undefined") ? 0 : T.r;
                this.content_mcontent.find(".J_mContentHoverBgRepeat").val(F)
            }
            var ag = l.contentSelectBg;
            if (!w) {
                this.content_mcontent.find(".J_mContentSelectBgSettingContent").hide()
            } else {
                this.content_mcontent.find(".J_mContentSelectBgSettingContent").show();
                if (ag.y == 2) {
                    a.moduleContentSelectBgSwitch(2, D);
                    this.content_mcontent.find("#moduleContentSelectBg_sys").attr("checked", false);
                    this.content_mcontent.find("#moduleContentSelectBg_hide").attr("checked", false);
                    this.content_mcontent.find("#moduleContentSelectBg_cus").attr("checked", "checked")
                } else {
                    if (ag.y == 1) {
                        a.moduleContentSelectBgSwitch(1, D);
                        this.content_mcontent.find("#moduleContentSelectBg_sys").attr("checked", false);
                        this.content_mcontent.find("#moduleContentSelectBg_hide").attr("checked", "checked");
                        this.content_mcontent.find("#moduleContentSelectBg_cus").attr("checked", false)
                    } else {
                        a.moduleContentSelectBgSwitch(0, D);
                        this.content_mcontent.find("#moduleContentSelectBg_sys").attr("checked", "checked");
                        this.content_mcontent.find("#moduleContentSelectBg_hide").attr("checked", false);
                        this.content_mcontent.find("#moduleContentSelectBg_cus").attr("checked", false)
                    }
                }
                var p = ag.c || "#000";
                this.content_mcontent.find(".J_mContentSelectBgColorPicker").css("background-color", p);
                if (ag.f) {
                    this.content_mcontent.find(".J_mContentSelectBgUploadmsg").html("<a href='javascript:;' onclick='Site.faiSettingPanel.view(\"" + ag.f + "\");return false;'>查看</a>");
                    this.content_mcontent.find(".J_mContentSelectBgWrap .J_previewContent").removeClass("f-previewContent-none");
                    this.content_mcontent.find(".J_mContentSelectBgWrap .J_preview").html("<img class='f-previewImg' src='" + ag.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
                } else {
                    this.content_mcontent.find(".J_mContentSelectBgUploadmsg").empty();
                    this.content_mcontent.find(".J_mContentSelectBgWrap .J_previewContent").addClass("f-previewContent-none");
                    this.content_mcontent.find(".J_mContentSelectBgWrap .J_preview").empty()
                }
                var ac = (typeof ag.r == "undefined") ? 0 : ag.r;
                this.content_mcontent.find(".J_mContentSelectBgRepeat").val(ac)
            }
            var H = l.contentBg;
            if (H.y == 2) {
                a.moduleContentBgSwitch(2, D);
                this.content_mcontent.find("#moduleContentBg_sys").attr("checked", false);
                this.content_mcontent.find("#moduleContentBg_hide").attr("checked", false);
                this.content_mcontent.find("#moduleContentBg_cus").attr("checked", "checked")
            } else {
                if (H.y == 1) {
                    a.moduleContentBgSwitch(1, D);
                    this.content_mcontent.find("#moduleContentBg_sys").attr("checked", false);
                    this.content_mcontent.find("#moduleContentBg_hide").attr("checked", "checked");
                    this.content_mcontent.find("#moduleContentBg_cus").attr("checked", false)
                } else {
                    a.moduleContentBgSwitch(0, D);
                    this.content_mcontent.find("#moduleContentBg_sys").attr("checked", "checked");
                    this.content_mcontent.find("#moduleContentBg_hide").attr("checked", false);
                    this.content_mcontent.find("#moduleContentBg_cus").attr("checked", false)
                }
            }
            var J = H.c || "#000";
            this.content_mcontent.find(".J_mContentBgColorPicker").css("background-color", J);
            if (H.f) {
                this.content_mcontent.find(".J_mContentBgUploadmsg").html("<a href='javascript:;' onclick='Site.faiSettingPanel.view(\"" + H.f + "\");return false;'>查看</a>");
                this.content_mcontent.find(".J_mContentBgWrap .J_previewContent").removeClass("f-previewContent-none");
                this.content_mcontent.find(".J_mContentBgWrap .J_preview").html("<img class='f-previewImg' src='" + H.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
            } else {
                this.content_mcontent.find(".J_mContentBgUploadmsg").empty();
                this.content_mcontent.find(".J_mContentBgWrap .J_previewContent").addClass("f-previewContent-none");
                this.content_mcontent.find(".J_mContentBgWrap .J_preview").empty()
            }
            var al = (typeof H.r == "undefined") ? 0 : H.r;
            this.content_mcontent.find(".J_mContentBgRepeat").val(al);
            var ai = l.contentLineIcon;
            if (ai.f) {
                this.content_mcontent.find(".J_mLineIconWrap .J_previewContent").removeClass("f-previewContent-none");
                this.content_mcontent.find(".J_mLineIconWrap .J_preview").html("<img class='f-previewImg' src='" + ai.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
            } else {
                this.content_mcontent.find(".J_mLineIconWrap .J_previewContent").addClass("f-previewContent-none");
                this.content_mcontent.find(".J_mLineIconWrap .J_preview").empty()
            }
            var Z = m.attr("_side");
            if (Z == 1) {
                a.moduleSideSwitch(1);
                var S = l.sideText;
                if (S.y == 2) {
                    a.moduleSideTextSwitch(2, D);
                    this.content_mside.find("#moduleSideText_sys").attr("checked", false);
                    this.content_mside.find("#moduleSideText_hide").attr("checked", false);
                    this.content_mside.find("#moduleSideText_cus").attr("checked", "checked")
                } else {
                    if (S.y == 1) {
                        a.moduleSideTextSwitch(1, D);
                        this.content_mside.find("#moduleSideText_sys").attr("checked", false);
                        this.content_mside.find("#moduleSideText_hide").attr("checked", "checked");
                        this.content_mside.find("#moduleSideText_cus").attr("checked", false)
                    } else {
                        a.moduleSideTextSwitch(0, D);
                        this.content_mside.find("#moduleSideText_sys").attr("checked", "checked");
                        this.content_mside.find("#moduleSideText_hide").attr("checked", false);
                        this.content_mside.find("#moduleSideText_cus").attr("checked", false)
                    }
                }
                if (S.fct == 1) {
                    a.moduleSideTextColorSwitch(1, D);
                    this.content_mside.find("#moduleSideTextColor_sys").attr("checked", false);
                    this.content_mside.find("#moduleSideTextColor_cus").attr("checked", "checked")
                } else {
                    a.moduleSideTextColorSwitch(0, D);
                    this.content_mside.find("#moduleSideTextColor_sys").attr("checked", "checked");
                    this.content_mside.find("#moduleSideTextColor_cus").attr("checked", false)
                }
                this.content_mside.find(".J_mSideTextSize").val(S.s);
                this.content_mside.find(".J_mSideTextBold").attr("checked", S.w == 1 ? "checked": false);
                this.content_mside.find(".J_mSideTextFamily").val(S.f);
                var ak = S.c || "#000";
                this.content_mside.find(".J_mSideTextColorPicker").css("background-color", ak);
                var s = l.sideSize;
                if (s.w <= -1) {
                    a.moduleSideWidthSwitch(0, D);
                    this.content_mside.find("#moduleSideWidth_sys").attr("checked", "checked");
                    this.content_mside.find("#moduleSideWidth_cus").attr("checked", false)
                } else {
                    a.moduleSideWidthSwitch(1, D);
                    this.content_mside.find("#moduleSideWidth_sys").attr("checked", false);
                    this.content_mside.find("#moduleSideWidth_cus").attr("checked", "checked")
                }
                this.content_mside.find(".J_mSideWidthInput").val(s.w <= -1 ? 25 : s.w);
                if (s.h <= -1) {
                    a.moduleSideHeightSwitch(0, D);
                    this.content_mside.find("#moduleSideHeight_sys").attr("checked", "checked");
                    this.content_mside.find("#moduleSideHeight_cus").attr("checked", false)
                } else {
                    a.moduleSideHeightSwitch(1, D);
                    this.content_mside.find("#moduleSideHeight_sys").attr("checked", false);
                    this.content_mside.find("#moduleSideHeight_cus").attr("checked", "checked")
                }
                this.content_mside.find(".J_mSideHeightInput").val(s.h <= -1 ? 25 : s.h);
                var v = l.sideBg;
                if (v.y == 2) {
                    a.moduleSideBgSwitch(1, D);
                    this.content_mside.find("#moduleSideBg_sys").attr("checked", false);
                    this.content_mside.find("#moduleSideBg_cus").attr("checked", "checked")
                } else {
                    a.moduleSideBgSwitch(0, D);
                    this.content_mside.find("#moduleSideBg_cus").attr("checked", false);
                    this.content_mside.find("#moduleSideBg_sys").attr("checked", "checked")
                }
                this.content_mside.find(".J_mSideBgColorPicker").css("background-color", v.c || "#000");
                this.content_mside.find(".J_mSideBgRepeat").val((typeof v.r == "undefined") ? 0 : v.r);
                if (v.f) {
                    this.content_mside.find(".J_mSideBgUploadmsg").html("<a href='javascript:;' onclick='Site.faiSettingPanel.view(\"" + v.f + "\");return false;'>查看</a>");
                    this.content_mside.find(".J_mSideBgWrap .J_previewContent").removeClass("f-previewContent-none");
                    this.content_mside.find(".J_mSideBgWrap .J_preview").html("<img class='f-previewImg' src='" + v.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
                } else {
                    this.content_mside.find(".J_mSideBgUploadmsg").empty();
                    this.content_mside.find(".J_mSideBgWrap .J_previewContent").addClass("f-previewContent-none");
                    this.content_mside.find(".J_mSideBgWrap .J_preview").empty()
                }
                a.checkSideSetting(D)
            } else {
                a.moduleSideSwitch(0)
            }
        }
        if (W.patternResetDefault) {
            if (Fai.isIE6() || Fai.isIE7()) {
                this.patternContentContainer.scrollTop(0)
            } else {
                this.patternContentContainer.mCustomScrollbar("scrollTo", "top", {
                    scrollInertia: 0
                })
            }
            this.patternMenuList.removeClass("on").eq(0).addClass("on")
        }
        if (W.cusStyleResetDefault) {
            if (Fai.isIE6() || Fai.isIE7()) {
                this.cusStyleContentContainer.scrollTop(0)
            } else {
                this.cusStyleContentContainer.mCustomScrollbar("scrollTo", "top", {
                    scrollInertia: 0
                })
            }
            this.cusStyleMenuList.removeClass("on").eq(0).addClass("on")
        }
        if (W.patternResetDefault || W.cusStyleResetDefault) {
            this.resetDefault = false;
            a.onStyleChange();
            a.refreshPanelStyle()
        }
        function o(ap) {
            var aq = ap.hasClass("formStyle26") || ap.hasClass("formStyle13") || ap.hasClass("formStyle38") || ap.hasClass("formStyle21") || ap.hasClass("formStyle9");
            var ar = ap.hasClass("formStyle24");
            var ao = ap.hasClass("formStyle11") || ap.hasClass("formStyle10");
            if (ap.hasClass("formStyle7") || ap.hasClass("formStyle6") || ap.hasClass("formStyle47")) {
                var am = ap.find(".newsList").attr("_showSetting");
                if (am == 1) {
                    ar = false
                } else {
                    ar = true
                }
            }
            if (ap.hasClass("formStyle27")) {
                var an = m.find(".photoList").length;
                if (an > 0) {
                    ao = false
                } else {
                    ao = true
                }
            }
            return aq || ar || ao
        }
        function j(ao) {
            var ap = ao.hasClass("formStyle26") || ao.hasClass("formStyle38") || ao.hasClass("formStyle21") || ao.hasClass("formStyle9");
            var aq = ao.hasClass("formStyle24");
            var an = ao.hasClass("formStyle11");
            if (ao.hasClass("formStyle27")) {
                var am = m.find(".photoList").length;
                if (am > 0) {
                    an = false
                } else {
                    an = true
                }
            }
            return ap || aq || an
        }
    };
    a.initScrollEvent = function() {
        var l = this.cusStyleTopLine;
        var j = this.cusStyleContentContainer;
        var m = this.cusStyleMenuList;
        var k = this.content_splitLine;
        var g = k.length - 1;
        var h = 20;
        if (! (Fai.isIE6() || Fai.isIE7())) {
            this.panel.find(".J_pContentContainer").mCustomScrollbar({
                theme: "dark-3",
                scrollButtons: {
                    enable: true
                },
                advanced: {
                    updateOnContentResize: true
                },
                axis: "y",
                callbacks: {
                    whileScrolling: function() {
                        if (d(this).attr("id") == "modulePatternContentContainer") {
                            return
                        }
                        var n = a.cusStyleTopLine.offset().top + 20;
                        for (i = g; i > -1; i--) {
                            if (a.content_splitLine.eq(i).is(":visible") && (a.content_splitLine.eq(i).offset().top - n) < 0) {
                                a.cusStyleMenuList.removeClass("on").eq(i).addClass("on");
                                break
                            }
                        }
                    }
                }
            })
        } else {
            j.scroll(function() {
                var n = l.offset().top + h;
                for (i = g; i > -1; i--) {
                    if (k.eq(i).is(":visible") && (k.eq(i).offset().top - n) < 0) {
                        m.removeClass("on").eq(i).addClass("on");
                        break
                    }
                }
            })
        }
    };
    a.initMNormalEvent = function() {
        var g = this.id;
        var m = this.module;
        var n = Site.getModuleAttrPattern(g);
        var l = n.transparent;
        if (!this.mnormal_mOpacityWrap) {
            this.mnormal_mOpacityWrap = this.content_mnormal.find(".J_mOpacityWrap");
            this.mOpacitySliderBar = this.mnormal_mOpacityWrap.find(".J_mOpacitySliderBar");
            this.mOpacitySliderLetter = this.mnormal_mOpacityWrap.find(".J_mOpacitySliderLetter")
        }
        var q = this.mOpacitySliderBar;
        var p = this.mOpacitySliderLetter;
        var o = {
            animate: true,
            max: 90,
            min: 0,
            orientation: "horizontal",
            step: 1,
            value: 100 - l,
            start: k,
            slide: h,
            stop: j
        };
        q.slider(o);
        p.html((100 - l) + "%");
        function k(s, t) {
            var r = parseInt(t.value);
            p.html(r + "%");
            a.refreshModuleOpacity(r)
        }
        function h(s, t) {
            var r = parseInt(t.value);
            p.html(r + "%");
            a.refreshModuleOpacity(r)
        }
        function j(s, t) {
            var r = parseInt(t.value);
            p.html(r + "%");
            a.refreshModuleOpacity(r);
            a.onStyleChange();
            if (d.inArray(7, a.logDog) < 0) {
                a.logDog.push(7);
                Site.logDog(100090, 7)
            }
        }
    };
    a.refreshModuleOpacity = function(j) {
        var k = this.id;
        var g = 100 - j;
        var h = Site.getModuleAttrPattern(k);
        h.transparent = g;
        if (Fai.isIE6() && Fai.top.$("#module" + k).attr("_side") == 1) {
            Site.setModuleStyleCss(k, ".formBanner" + k, "filter", "alpha(opacity=" + g + ")");
            Site.setModuleStyleCss(k, ".formMiddle" + k, "filter", "alpha(opacity=" + g + ")");
            Site.setModuleStyleCss(k, ".formTop" + k, "filter", "alpha(opacity=" + g + ")");
            Site.setModuleStyleCss(k, ".formBottom" + k, "filter", "alpha(opacity=" + g + ")");
            Site.setModuleStyleCss(k, "#module" + k + "SideBtn", "filter", "alpha(opacity=" + g + ")")
        } else {
            Site.setModuleStyleCss(k, "", "filter", "alpha(opacity=" + g + ")");
            Site.setModuleStyleCss(k, "", "opacity", "" + g / 100);
            if (Fai.isIE8()) {
                Site.setModuleStyleCss(k, ".formBanner" + k, "filter", "alpha(opacity=" + g + ")");
                Site.setModuleStyleCss(k, ".formMiddle" + k, "filter", "alpha(opacity=" + g + ")");
                Site.setModuleStyleCss(k, ".formMiddle" + k + " .formMiddleContent" + k, "filter", "alpha(opacity=" + g + ")");
                Site.setModuleStyleCss(k, ".formMiddle" + k + " .formMiddleContent" + k + " .productTileForm", "filter", "alpha(opacity=" + g + ")");
                Site.setModuleStyleCss(k, "#module" + k + "SideBtn", "filter", "alpha(opacity=" + g + ")");
                Site.setModuleStyleCss(k, ".formBannerBtn" + k, "filter", "alpha(opacity=" + g + ")")
            }
        }
    };
    a.initMBorderEvent = function() {
        var k = this.id;
        var j = Site.getModuleAttrPattern(k);
        var h = j.border.c || "#000";
        this.content_mborder.find(".J_mBorderColorPicker").faiColorPicker({
            onchange: g,
            defaultcolor: h
        });
        function g(l) {
            var n = a.id;
            var m = Site.getModuleAttrPattern(n);
            m.border.c = l;
            a.refreshBorder();
            a.onStyleChange()
        }
    };
    a.initMTitleEvent = function() {
        var k = this.id;
        var t = Site.getModuleAttrPattern(k);
        var o = t.bannerText.c || "#000";
        this.content_mtitle.find(".J_mTitleTextColorPicker").faiColorPicker({
            onchange: j,
            defaultcolor: o
        });
        function j(x) {
            var z = a.id;
            var y = Site.getModuleAttrPattern(z);
            y.bannerText.c = x;
            a.refreshBannerText();
            a.onStyleChange()
        }
        var h = t.bannerMore.c || "#000";
        this.content_mtitle.find(".J_mTitleTextMoreColorPicker").faiColorPicker({
            onchange: m,
            defaultcolor: h
        });
        function m(x) {
            var z = a.id;
            var y = Site.getModuleAttrPattern(z);
            y.bannerMore.c = x;
            a.refreshBannerTextMore();
            a.onStyleChange()
        }
        var w = t.bannerBg.c || "#000";
        this.content_mtitle.find(".J_mTitleBgColorPicker").faiColorPicker({
            onchange: l,
            defaultcolor: w
        });
        function l(x) {
            var z = a.id;
            var y = Site.getModuleAttrPattern(z);
            y.bannerBg.c = x;
            a.refreshBannerBg();
            a.onStyleChange()
        }
        var g = {
            title: "添加图片",
            maxSize: parseInt(this.fileSizeLimit),
            imgMaxWidth: 24,
            imgMaxHeight: 24,
            type: ["jpg", "jpeg", "gif", "png"],
            from: "ms",
            entry: "m_titleIcon"
        };
        Site.fileUpload2("#moduleTitleIconFileButton", g, u);
        function u(z) {
            if (z) {
                var C = a.id;
                var B = d.parseJSON(z);
                var y = B.data[0].fileId;
                var A = B.data[0].filePath;
                var x = Site.getModuleAttrPattern(C).bannerIcon;
                x.f = y;
                x.p = A;
                a.refreshBannerIcon();
                a.onStyleChange();
                a.content_mtitle.find(".J_mTitleIconUploadmsg").html("<a href='javascript:;' onclick='Site.faiSettingPanel.view(\"" + y + "\");return false;'>查看</a>");
                a.content_mtitle.find(".J_mTitleIconWrap .J_previewContent").removeClass("f-previewContent-none");
                a.content_mtitle.find(".J_mTitleIconWrap .J_preview").html("<img class='f-previewImg' src='" + x.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
            }
        }
        var v = {
            title: "添加图片",
            maxSize: parseInt(this.fileSizeLimit),
            type: ["jpg", "jpeg", "gif", "png"],
            from: "ms",
            entry: "m_titleBg"
        };
        Site.fileUpload2("#moduleTitleBgFileButton", v, s);
        var r = this.content_mtitle.find(".J_mTitleBgRepeat");
        var p = this.content_mtitle.find(".J_mTitleBgUploadmsg");
        var n = this.content_mtitle.find(".J_mTitleBgWrap .J_previewContent");
        var q = this.content_mtitle.find(".J_mTitleBgWrap .J_preview");
        function s(x) {
            if (x) {
                var B = a.id;
                var A = d.parseJSON(x);
                var y = A.data[0] || {};
                var z = Site.getModuleAttrPattern(B).bannerBg;
                z.f = y.fileId;
                z.p = y.filePath;
                if (y.isMatBg) {
                    z.r = 3;
                    r.val(3)
                }
                a.refreshBannerBg();
                a.onStyleChange();
                p.html("<a href='javascript:;' onclick='Site.faiSettingPanel.view(\"" + z.f + "\");return false;'>查看</a>");
                n.removeClass("f-previewContent-none");
                q.html("<img class='f-previewImg' src='" + z.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
            }
        }
    };
    a.initMContentEvent = function() {
        var x = this.id;
        var g = Site.getModuleAttrPattern(x);
        function C(J) {
            var L = a.id;
            var K = Site.getModuleAttrPattern(L);
            K.contentLink.c = J;
            a.refreshModuleLinkText();
            a.onStyleChange()
        }
        var q = g.contentSplitLine;
        var p = q.c || "#000";
        this.content_mcontent.find(".J_mSplitLineColorPicker").faiColorPicker({
            onchange: A,
            defaultcolor: p
        });
        function A(J) {
            var L = a.id;
            var K = Site.getModuleAttrPattern(L);
            K.contentSplitLine.c = J;
            a.refreshModuleSplitLine();
            a.onStyleChange()
        }
        var n = g.contentBg;
        var o = n.c || "#000";
        this.content_mcontent.find(".J_mContentBgColorPicker").faiColorPicker({
            onchange: y,
            defaultcolor: o
        });
        function y(J) {
            var L = a.id;
            var K = Site.getModuleAttrPattern(L);
            K.contentBg.c = J;
            a.refreshModuleContentBg();
            a.onStyleChange()
        }
        var m = g.contentText.c || "#000";
        this.content_mcontent.find(".J_mNormalTextColorPicker").faiColorPicker({
            onchange: v,
            defaultcolor: m
        });
        function v(J) {
            var L = a.id;
            var K = Site.getModuleAttrPattern(L);
            K.contentText.c = J;
            a.refreshModuleNormalText();
            a.onStyleChange()
        }
        var E = g.contentLink.c || "#000";
        this.content_mcontent.find(".J_mLinkTextColorPicker").faiColorPicker({
            onchange: C,
            defaultcolor: E
        });
        var l = g.contentHoverFont.c || "#000";
        this.content_mcontent.find(".J_mContentHoverFontColorPicker").faiColorPicker({
            onchange: u,
            defaultcolor: l
        });
        function u(J) {
            var L = a.id;
            var K = Site.getModuleAttrPattern(L);
            K.contentHoverFont.c = J;
            a.refreshModuleContentHoverFont();
            a.onStyleChange()
        }
        var k = g.contentSelectFont.c || "#000";
        this.content_mcontent.find(".J_mContentSelectFontColorPicker").faiColorPicker({
            onchange: t,
            defaultcolor: k
        });
        function t(J) {
            var L = a.id;
            var K = Site.getModuleAttrPattern(L);
            K.contentSelectFont.c = J;
            a.refreshModuleContentSelectFont();
            a.onStyleChange()
        }
        var j = g.contentSelectBg.c || "#000";
        this.content_mcontent.find(".J_mContentSelectBgColorPicker").faiColorPicker({
            onchange: s,
            defaultcolor: j
        });
        function s(J) {
            var L = a.id;
            var K = Site.getModuleAttrPattern(L);
            K.contentSelectBg.c = J;
            a.refreshModuleContentSelectBg();
            a.onStyleChange()
        }
        var h = g.contentHoverBg.c || "#000";
        this.content_mcontent.find(".J_mContentHoverBgColorPicker").faiColorPicker({
            onchange: r,
            defaultcolor: h
        });
        function r(J) {
            var L = a.id;
            var K = Site.getModuleAttrPattern(L);
            K.contentHoverBg.c = J;
            a.refreshModuleContentHoverBg();
            a.onStyleChange()
        }
        var D = {
            title: "添加图片",
            maxSize: parseInt(this.fileSizeLimit),
            type: ["jpg", "jpeg", "gif", "png"],
            from: "ms",
            entry: "m_contentBg"
        };
        Site.fileUpload2("#moduleContentBgFileButton", D, I);
        function I(J) {
            if (J) {
                var N = a.id;
                var M = d.parseJSON(J);
                var K = M.data[0] || {};
                var L = Site.getModuleAttrPattern(N).contentBg;
                L.f = K.fileId;
                L.p = K.filePath;
                if (K.isMatBg) {
                    L.r = 3;
                    a.content_mcontent.find(".J_mContentBgRepeat").val(3)
                }
                a.refreshModuleContentBg();
                a.onStyleChange();
                a.content_mcontent.find(".J_mContentBgUploadmsg").html("<a href='javascript:;' onclick='Site.faiSettingPanel.view(\"" + L.f + "\");return false;'>查看</a>");
                a.content_mcontent.find(".J_mContentBgWrap .J_previewContent").removeClass("f-previewContent-none");
                a.content_mcontent.find(".J_mContentBgWrap .J_preview").html("<img class='f-previewImg' src='" + L.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
            }
        }
        var w = {
            title: "添加图片",
            maxSize: parseInt(this.fileSizeLimit),
            type: ["jpg", "jpeg", "gif", "png"],
            from: "ms",
            entry: "m_contentLineIcon"
        };
        Site.fileUpload2("#moduleLineIconFileButton", w, H);
        function H(J) {
            if (J) {
                var N = a.id;
                var L = d.parseJSON(J);
                var K = L.data[0] || {};
                var M = Site.getModuleAttrPattern(N).contentLineIcon;
                M.f = K.fileId;
                M.p = K.filePath;
                a.content_mcontent.find(".J_mLineIconWrap .J_previewContent").removeClass("f-previewContent-none");
                a.content_mcontent.find(".J_mLineIconWrap .J_preview").html("<img class='f-previewImg' src='" + M.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />");
                a.refreshContentLineIcon();
                a.onStyleChange()
            }
        }
        var B = {
            title: "添加图片",
            maxSize: parseInt(this.fileSizeLimit),
            type: ["jpg", "jpeg", "gif", "png"],
            from: "ms",
            entry: "m_contentBg"
        };
        Site.fileUpload2("#moduleContentSelectBgFileButton", B, G);
        function G(K) {
            if (K) {
                var N = a.id;
                var M = d.parseJSON(K);
                var L = M.data[0] || {};
                var J = Site.getModuleAttrPattern(N).contentSelectBg;
                J.f = L.fileId;
                J.p = L.filePath;
                if (L.isMatBg) {
                    J.r = 3;
                    a.content_mcontent.find(".J_mContentSelectBgRepeat").val(3)
                }
                a.refreshModuleContentSelectBg();
                a.onStyleChange();
                a.content_mcontent.find(".J_mContentSelectBgUploadmsg").html("<a href='javascript:;' onclick='Site.faiSettingPanel.view(\"" + J.f + "\");return false;'>查看</a>");
                a.content_mcontent.find(".J_mContentSelectBgWrap .J_previewContent").removeClass("f-previewContent-none");
                a.content_mcontent.find(".J_mContentSelectBgWrap .J_preview").html("<img class='f-previewImg' src='" + J.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
            }
        }
        var z = {
            title: "添加图片",
            maxSize: parseInt(this.fileSizeLimit),
            type: ["jpg", "jpeg", "gif", "png"],
            from: "ms",
            entry: "m_contentBg"
        };
        Site.fileUpload2("#moduleContentHoverBgFileButton", z, F);
        function F(K) {
            if (K) {
                var N = a.id;
                var M = d.parseJSON(K);
                var L = M.data[0] || {};
                var J = Site.getModuleAttrPattern(N).contentHoverBg;
                J.f = L.fileId;
                J.p = L.filePath;
                if (L.isMatBg) {
                    J.r = 3;
                    a.content_mcontent.find(".J_mContentHoverBgRepeat").val(3)
                }
                a.refreshModuleContentHoverBg();
                a.onStyleChange();
                a.content_mcontent.find(".J_mContentHoverBgUploadmsg").html("<a href='javascript:;' onclick='Site.faiSettingPanel.view(\"" + J.f + "\");return false;'>查看</a>");
                a.content_mcontent.find(".J_mContentHoverBgWrap .J_previewContent").removeClass("f-previewContent-none");
                a.content_mcontent.find(".J_mContentHoverBgWrap .J_preview").html("<img class='f-previewImg' src='" + J.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
            }
        }
        e()
    };
    a.initMSideEvent = function() {
        var o = this.id;
        var l = Site.getModuleAttrPattern(o);
        var k = l.sideText.c || "#000";
        this.content_mside.find(".J_mSideTextColorPicker").faiColorPicker({
            onchange: g,
            defaultcolor: k
        });
        function g(p) {
            var r = a.id;
            var q = Site.getModuleAttrPattern(r);
            q.sideText.c = p;
            a.refreshSideText();
            a.onStyleChange()
        }
        var m = l.sideBg.c || "#000";
        this.content_mside.find(".J_mSideBgColorPicker").faiColorPicker({
            onchange: j,
            defaultcolor: m
        });
        function j(p) {
            var r = a.id;
            var q = Site.getModuleAttrPattern(r);
            q.sideBg.c = p;
            a.refreshModuleSideBg();
            a.onStyleChange()
        }
        var h = {
            title: "添加图片",
            maxSize: parseInt(this.fileSizeLimit),
            type: ["jpg", "jpeg", "gif", "png"],
            from: "ms",
            entry: "m_sideBg"
        };
        Site.fileUpload2("#moduleSideBgFileButton", h, n);
        function n(p) {
            if (p) {
                var t = a.id;
                var s = d.parseJSON(p);
                var q = s.data[0] || {};
                var r = Site.getModuleAttrPattern(t).sideBg;
                r.f = q.fileId;
                r.p = q.filePath;
                if (q.isMatBg) {
                    r.r = 3;
                    a.content_mside.find(".J_mSideBgRepeat").val(3)
                }
                a.refreshModuleSideBg();
                a.onStyleChange();
                a.content_mside.find(".J_mSideBgUploadmsg").html("<a href='javascript:;' onclick='Site.faiSettingPanel.view(\"" + r.f + "\");return false;'>查看</a>");
                a.content_mside.find(".J_mSideBgWrap .J_previewContent").removeClass("f-previewContent-none");
                a.content_mside.find(".J_mSideBgWrap .J_preview").html("<img class='f-previewImg' src='" + r.p + "' onload='Fai.Img.optimize(this, {width:180, height:75, mode:Fai.Img.MODE_SCALE_DEFLATE_FILL});' alt='' />")
            }
        }
    };
    a.scrollToCheckedPattern = function(g) {
        var h = Site.getModuleAttrPattern(this.id).systemPattern;
        var k = this.allModuleStyleItem.filter(".moduleStyleItem" + h);
        if (!k.is(":visible")) {
            return
        }
        var m = k.position().top;
        var n = this.patternContentContainer.scrollTop();
        var l = this.patternContentContainer.height();
        var j = 0;
        if ( !! g) {
            j = n + m - (l / 2) + k.height()
        } else {
            j = n + m - 20
        }
        if (Fai.isIE6() || Fai.isIE7()) {
            this.patternContentContainer.scrollTop(j || 0)
        } else {
            this.patternContentContainer.mCustomScrollbar("scrollTo", (j || 0), {
                scrollInertia: 0
            })
        }
    };
    a.modulePatternSelect = function(j) {
        if (!this.head) {
            this.head = Fai.top.$("head")
        }
        var g = this.head;
        var l = this.id;
        var k = this.module;
        if (k.length < 1) {
            return
        }
        if (this.hasPattern.length > 0) {
            k.removeClass(this.hasPattern.pop())
        }
        if (!Fai.top._panelOptionData.allowedPattern && Fai.top._templateType == Fai.top._panelOptionData.templateType_free) {
            k.removeClass("modulePattern");
            Fai.ing("此为" + Fai.top._panelOptionData.minVerNamePattern + "功能，您可以先选择" + Fai.top._panelOptionData.trialTemplate + "，再进行试用。", true);
            return
        }
        if (j != 0) {
            k.addClass("modulePattern modulePattern" + j);
            this.hasPattern.push("modulePattern" + j)
        } else {
            k.removeClass("modulePattern")
        }
        if (!this.moduleStyleItemImgContainer) {
            this.moduleStyleItemImgContainerList = this.moduleStyleItemContainer.find(".moduleStyleItemImgContainer")
        }
        this.moduleStyleItemImgContainerList.removeClass("moduleStyleItemImgContainer-on");
        this.moduleStyleItemImgContainerList.filter(".J_mPattern" + j).addClass("moduleStyleItemImgContainer-on");
        Site.getModuleAttrPattern(this.id).systemPattern = j;
        a.onStyleChange();
        Site.logDog(100090, 1);
        if (g.find("link[href='" + this.modulePatternCssList.css_pattern1 + "']").length < 1 && j < 21 && j > 0) {
            var h = document.createElement("link");
            h.setAttribute("type", "text/css");
            h.setAttribute("rel", "stylesheet");
            h.setAttribute("href", this.modulePatternCssList.css_pattern1);
            g.append(h)
        }
        if (g.find("link[href='" + this.modulePatternCssList.css_pattern2 + "']").length < 1 && j < 41 && j > 20) {
            var h = document.createElement("link");
            h.setAttribute("type", "text/css");
            h.setAttribute("rel", "stylesheet");
            h.setAttribute("href", this.modulePatternCssList.css_pattern2);
            g.append(h)
        }
        if (g.find("link[href='" + this.modulePatternCssList.css_pattern3 + "']").length < 1 && j < 61 && j > 40) {
            var h = document.createElement("link");
            h.setAttribute("type", "text/css");
            h.setAttribute("rel", "stylesheet");
            h.setAttribute("href", this.modulePatternCssList.css_pattern3);
            g.append(h)
        }
        if (g.find("link[href='" + this.modulePatternCssList.css_pattern4 + "']").length < 1 && j < 81 && j > 60) {
            var h = document.createElement("link");
            h.setAttribute("type", "text/css");
            h.setAttribute("rel", "stylesheet");
            h.setAttribute("href", this.modulePatternCssList.css_pattern4);
            g.append(h)
        }
        if (g.find("link[href='" + this.modulePatternCssList.css_pattern5 + "']").length < 1 && j < 101 && j > 80) {
            var h = document.createElement("link");
            h.setAttribute("type", "text/css");
            h.setAttribute("rel", "stylesheet");
            h.setAttribute("href", this.modulePatternCssList.css_pattern5);
            g.append(h)
        }
        if (g.find("link[href='" + this.modulePatternCssList.css_pattern6 + "']").length < 1 && j < 121 && j > 100) {
            var h = document.createElement("link");
            h.setAttribute("type", "text/css");
            h.setAttribute("rel", "stylesheet");
            h.setAttribute("href", this.modulePatternCssList.css_pattern6);
            g.append(h)
        }
    };
    a.onStyleChange = function() {
        if (this.resetDefault) {
            return
        }
        var m = this.id;
        var k = this.module;
        var j = k.attr("_side");
        if (j == 1) {
            var h = k.parent();
            var l = h.attr("id");
            Fai.top.Site.reSetSidePosition(k);
            if (l == "floatLeftTopForms" || l == "floatLeftBottomForms") {
                k.css({
                    left: 0
                })
            } else {
                if (l == "floatRightTopForms" || l == "floatRightBottomForms") {
                    var g = k.outerWidth();
                    k.css({
                        left: -g
                    })
                }
            }
        }
        if (k.length > 0 && k.attr("_autoheight") == 1) {
            Site.autoModuleHeight(m)
        }
        Site.getModuleAttrPattern(m).changed = true;
        Fai.top._moduleMoved++;
        Site.styleChanged();
        Site.setRefreshInfo("moduleStyle", true);
        Site.triggerGobalEvent("resizableModuleChange", m);
        Site.addModuleMask({
            id: m,
            refresh: true,
            enableTopBar: true
        });
        setTimeout(function() {
            Site.changeSaleColor()
        },
        200)
    };
    a.saveValueChangeEvent = function(h) {
        var j = this.id;
        var g = this.styleId;
        if (g === this.moduleStyleList.productListMarquee || g === this.moduleStyleList.photoMarquee) {
            Site.restartMarquee(j, true);
            if (h) {
                Fai.top.$("#module" + j + " .demo").removeAttr("style")
            }
        } else {
            if (g === this.moduleStyleList.newsList || g === this.moduleStyleList.newsLatest) {
                Fai.top.Site.loadNewsList(j, true)
            }
        }
    };
    a.view = function(g) {
        var h = "../view.jsp?fileID=" + g;
        window.open(h)
    };
    function e() {
        var o = a.id,
        l = Site.getModuleAttrPattern(o).contentRowHeight.h || 32;
        if (!a.mcontent_mRowHeightWrap) {
            a.mcontent_mRowHeightWrap = a.content_mcontent.find(".J_mRowHeightWrap");
            a.mRowHeightSliderBar = a.mcontent_mRowHeightWrap.find(".J_mRowHeightSliderBar");
            a.mRowHeightSliderLetter = a.mcontent_mRowHeightWrap.find(".J_mRowHeightSliderLetter")
        }
        var g = a.mRowHeightSliderBar,
        k = a.mRowHeightSliderLetter;
        var n = {
            animate: true,
            max: 80,
            min: 32,
            orientation: "horizontal",
            step: 1,
            value: l,
            start: j,
            slide: m,
            stop: h
        };
        g.slider(n);
        k.html(l + "px");
        function j(q, r) {
            var p = parseInt(r.value);
            k.html(p + "px");
            c(p)
        }
        function m(q, r) {
            var p = parseInt(r.value);
            k.html(p + "px");
            c(p)
        }
        function h(q, r) {
            var p = parseInt(r.value);
            k.html(p + "px");
            c(p);
            a.onStyleChange()
        }
    }
    function c(g) {
        var m = a.id,
        k = a.module,
        j = Site.getModuleAttrPattern(m),
        l = j.contentRowHeight,
        h = l.y || 0;
        if (g) {
            l.h = parseInt(g) || 0
        }
        if (h == 0) {
            if (l.h > 0) {
                if (k.hasClass("formStyle6") || k.hasClass("formStyle7") || k.hasClass("formStyle47")) {
                    Site.removeModuleStyleCssList(m, [{
                        cls: ".fk-newsLineHeight",
                        key: "height"
                    },
                    {
                        cls: ".fk-newsLineHeight .lineBody",
                        key: "height"
                    },
                    {
                        cls: ".fk-newsLineHeight .newsTitle",
                        key: "vertical-align"
                    },
                    {
                        cls: ".fk-newsLineHeight .newsCalendar",
                        key: "vertical-align"
                    }])
                } else {
                    if (k.hasClass("formStyle24") || k.hasClass("formStyle21") || k.hasClass("formStyle26") || k.hasClass("formStyle38") || k.hasClass("formStyle9")) {
                        Site.removeModuleStyleCssList(m, [{
                            cls: ".g_foldContainerValue",
                            key: "height"
                        }])
                    } else {
                        if (k.hasClass("formStyle10")) {
                            Site.removeModuleStyleCssList(m, [{
                                cls: ".fileList .line",
                                key: "height"
                            },
                            {
                                cls: ".fileList .line",
                                key: "line-height"
                            },
                            {
                                cls: ".fileList .mainBodyContainer",
                                key: "height"
                            },
                            {
                                cls: ".fileList .fileNameText",
                                key: "height"
                            }])
                        } else {
                            if (k.hasClass("formStyle76")) {
                                Site.removeModuleStyleCssList(m, [{
                                    cls: ".pd_mall_Group .p_m_cotainer",
                                    key: "height"
                                }])
                            }
                        }
                    }
                }
            }
        } else {
            if (l.h > 0) {
                if (k.hasClass("formStyle6") || k.hasClass("formStyle7") || k.hasClass("formStyle47")) {
                    Site.setModuleStyleCssList(m, [{
                        cls: ".fk-newsLineHeight",
                        key: "height",
                        value: l.h + "px"
                    },
                    {
                        cls: ".fk-newsLineHeight .lineBody",
                        key: "height",
                        value: "100%"
                    },
                    {
                        cls: ".fk-newsLineHeight .newsTitle",
                        key: "vertical-align",
                        value: "middle"
                    },
                    {
                        cls: ".fk-newsLineHeight .newsCalendar",
                        key: "vertical-align",
                        value: "middle"
                    }])
                } else {
                    if (k.hasClass("formStyle24") || k.hasClass("formStyle21") || k.hasClass("formStyle26") || k.hasClass("formStyle38") || k.hasClass("formStyle9")) {
                        Site.setModuleStyleCssList(m, [{
                            cls: ".g_foldContainerValue",
                            key: "height",
                            value: l.h + "px"
                        }])
                    } else {
                        if (k.hasClass("formStyle10")) {
                            Site.setModuleStyleCssList(m, [{
                                cls: ".fileList .line",
                                key: "height",
                                value: l.h + "px"
                            },
                            {
                                cls: ".fileList .line",
                                key: "line-height",
                                value: "normal"
                            },
                            {
                                cls: ".fileList .mainBodyContainer",
                                key: "height",
                                value: "100%"
                            },
                            {
                                cls: ".fileList .fileNameText",
                                key: "height",
                                value: "auto"
                            }])
                        } else {
                            if (k.hasClass("formStyle76")) {
                                Site.setModuleStyleCssList(m, [{
                                    cls: ".pd_mall_Group .p_m_cotainer",
                                    key: "height",
                                    value: l.h + "px"
                                }])
                            }
                        }
                    }
                }
            }
        }
    }
    function b() {
        var h = a.id,
        g = a.module;
        return (g.hasClass("formStyle7") && g.find(".pic-mixNewsList").length < 1) || (g.hasClass("formStyle6") && g.find(".pic-mixNewsList").length < 1) || (g.hasClass("formStyle47") && g.find(".pic-mixNewsList").length < 1) || g.hasClass("formStyle24") || g.hasClass("formStyle21") || g.hasClass("formStyle26") || g.hasClass("formStyle38") || g.hasClass("formStyle9") || g.hasClass("formStyle10") || g.hasClass("formStyle76")
    }
})(jQuery, Site.faiSettingPanel);