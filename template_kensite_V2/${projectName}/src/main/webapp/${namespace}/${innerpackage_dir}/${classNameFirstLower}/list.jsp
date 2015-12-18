<#include "/custom.include">
<#assign className = table.className>
<#assign classNameLower = className?uncap_first>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/taglib/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>${table.tableAlias}</title>
		<%@ include file="/WEB-INF/view/taglib/header.jsp" %>
		<%@ include file="/WEB-INF/view/taglib/easyui.jsp" %>
		<%@ include file="/WEB-INF/view/taglib/layer.jsp" %>
	</head>
<body>
 	<div style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;">
		<div style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;">
		<table id="dataList" title="${table.tableAlias}列表" class="easyui-datagrid" style="width:100%;height:100%"
			url="${"${"}ctx${"}"}/${moduleC}${table.classNameFirstLower}/list/data"
			toolbar="#toolbar" pagination="true"
			rownumbers="true" fitColumns="true" singleSelect="true">
			<thead>
				<tr>
					<th data-options="field:'id',hidden:true">ID</th>
					<#list table.columns as column>
					<#if (column.columnName?lower_case=="id"||column.columnName?lower_case=="createuser"||column.columnName?lower_case=="createdate"||column.columnName?lower_case=="updateuser"||column.columnName?lower_case=="updatedate"||column.columnName?lower_case=="delflag") ><#else>
					<ks:listTag table="${table.sqlName}" column="${column.sqlName}"/>
					</#if>
					</#list>
				</tr>
			</thead>
		</table>
		<div id="toolbar">
			<shiro:hasPermission name="${moduleP}${table.classNameFirstLower}:insert">
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="$.${table.classNameFirstLower}.newInfo()">新建</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="${moduleP}${table.classNameFirstLower}:update">
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="$.${table.classNameFirstLower}.editInfo()">修改</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="${moduleP}${table.classNameFirstLower}:delete">
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="$.${table.classNameFirstLower}.destroyInfo()">删除</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="${moduleP}${table.classNameFirstLower}:export">
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-page_excel" plain="true" onclick="$.${table.classNameFirstLower}.exportExcel()">导出</a>
			</shiro:hasPermission>
			<#list table.columns as column>
			<#if (column.columnName?lower_case=="id"||column.columnName?lower_case=="createuser"||column.columnName?lower_case=="createdate"||column.columnName?lower_case=="updateuser"||column.columnName?lower_case=="updatedate"||column.columnName?lower_case=="delflag") ><#else>
			<ks:queryTag table="${table.sqlName}" column="${column.sqlName}"/>
			</#if>
			</#list>
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="$.${table.classNameFirstLower}.selectData()">查询</a>
		</div>
	</div>
	</div>
		<script type="text/javascript">
			$(document).ready(function(){
			});
			var url, loadi;
			var iframeWin = null, iframeBody=null;
			$.${table.classNameFirstLower} = {
		 		selectData : function () {
					$('#dataList').datagrid('load',{
						<#list table.columns as column>
						<#if (column.columnName?lower_case=="id"||column.columnName?lower_case=="createuser"||column.columnName?lower_case=="createdate"||column.columnName?lower_case=="updateuser"||column.columnName?lower_case=="updatedate"||column.columnName?lower_case=="delflag") ><#else>
						<ks:queryJsTag table="${table.sqlName}" column="${column.sqlName}"/>
						</#if>
						</#list>
					});
				},
				reloadData : function () {
					$.${table.classNameFirstLower}.selectData();
				},
				newInfo : function (){
					$('#dataList').datagrid('clearSelections');
					$.${table.classNameFirstLower}.layerOpen(url);
				},
				editInfo : function (){
					var row = $('#dataList').datagrid('getSelected');
					if (row){
						$.${table.classNameFirstLower}.layerOpen(url);
					}
				},
				exportExcel : function () {
					window.open("${"${"}ctx${"}"}/${moduleC}${table.classNameFirstLower}/export");
				},
				destroyInfo : function (){
					var row = $('#dataList').datagrid('getSelected');
					if (row){
						layer.confirm('是否确认删除？', {
						btn: ['确定','取消'] //按钮
						}, function(){
							$.ajax({
								type: "post",
								url: '${"${"}ctx${"}"}/${moduleC}${table.classNameFirstLower}/delete',
								data: {id:row.id},
								dataType: 'json',
								timeout: layerLoadMaxTime,
								beforeSend: function(XMLHttpRequest){
									loadi = layer.load(2, {shade: layerLoadShade,time: layerLoadMaxTime});
								},
								success: function(data, textStatus){
									layer.close(loadi);
									if (data.success==TRUE){
										layer.msg("操作成功！", {offset: 'rb',icon: 6,shift: 8,time: layerMsgTime});
										$.${table.classNameFirstLower}.reloadData();
									} else {
										layer.msg("操作失败！", {offset: 'rb',icon: 5,shift: 8,time: layerMsgTime});
									}
								}
							});
						}, function(){
						});
					}
				},
				layerOpen : function (url) {
					if(url == null || url == '') {
						url = '${"${"}ctx${"}"}/${moduleC}${table.classNameFirstLower}/form';
					}
					layer.open({
						type: 2,
						title: '${table.tableAlias}基本信息',
						area: ['310px', '350px'],
						fix: false, //不固定
						maxmin: false,
						content: url,
						btn: ['保存', '取消'],
						success: function(layero, index){
							iframeBody = layer.getChildFrame('body', index);
							iframeWin = window[layero.find('iframe')[0]['name']];
						},
						yes: function(index, layero) {
							if(iframeWin != null) {
								iframeWin.submitInfo();
							}
						},
						cancel: function(index){
							layer.close(index);
						}
					});
				}
			}
		</script>
	</body>
</html>
