package com.seeyoui.kensite.common.taglib;

import java.util.List;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import com.seeyoui.kensite.common.constants.StringConstant;
import com.seeyoui.kensite.common.util.DBUtils;
import com.seeyoui.kensite.common.util.SpringContextHolder;
import com.seeyoui.kensite.common.util.StringUtils;
import com.seeyoui.kensite.framework.mod.tableColumn.domain.TableColumn;
import com.seeyoui.kensite.framework.mod.tableColumn.persistence.TableColumnMapper;
import com.seeyoui.kensite.framework.plugin.dict.domain.Dict;
import com.seeyoui.kensite.framework.system.util.DictUtils;

public class ComponentTag extends TagSupport {
	private static final long serialVersionUID = 1L;
	private static final String TEXTBOX = "textbox";
	private static final String NUMBERBOX = "numberbox";
	private static final String COMBOBOX = "combobox";
	private static final String RADIOBOX = "radiobox";
	private static final String CHECKBOX = "checkbox";
	private static final String DATEBOX = "datebox";
	private static final String HTMLDESIGN = "htmldesign";
	private static final String TEXTAREA = "textarea";
	private static final String COMBOTREE = "combotree";
	private static final String COMBOGRID = "combogrid";
	
	private String table;
	private String column;
	
	private static TableColumnMapper sysUserMapper = SpringContextHolder.getBean(TableColumnMapper.class);
	
	@Override
	public int doStartTag() throws JspException {
		//如果返回SKIP_BODY则忽略标签之中的内容，如果返回EVAL_BODY_INCLUDE则将标签体的内容进行输出
		try {
			TableColumn tableColumn = new TableColumn();
			tableColumn.setTableName(table);
			tableColumn.setName(column);
			tableColumn = sysUserMapper.findTableColumn(tableColumn);
			if (StringUtils.isBlank(tableColumn.getId())) {
				return SKIP_BODY;
			}
			JspWriter out = this.pageContext.getOut();
			StringBuffer result = new StringBuffer();
			column = StringUtils.toCamelCase(column);
			result.append("<label>"+tableColumn.getComments()+"</label>");
			if(TEXTBOX.equals(tableColumn.getCategory()) || TEXTAREA.equals(tableColumn.getCategory())) {
				result.append("<input class=\"easyui-textbox\" id=\"");
				result.append(column);
				result.append("\" name=\"");
				result.append(column);
				result.append("\" data-options=\"");
				if(TEXTAREA.equals(tableColumn.getCategory())) {
					result.append("multiline:true,");
				}
				if(StringConstant.NO.equals(tableColumn.getIsEdit())) {
					result.append("editable:false,");
				}
				if(StringConstant.YES.equals(tableColumn.getIsNull())) {
					result.append("required:true,");
				}
				if(StringUtils.isNoneBlank(tableColumn.getValidType())) {
					result.append("validType:'"+tableColumn.getValidType()+"',");
				}
				if(StringUtils.isNoneBlank(tableColumn.getDefaultValue())) {
					result.append("value:'"+tableColumn.getDefaultValue()+"',");
				}
				if(StringUtils.isNoneBlank(tableColumn.getSettings())) {
					result.append(tableColumn.getSettings());
				}
				result.append("\" "+tableColumn.getHtmlInner());
				result.append("/>");
			}
			if(NUMBERBOX.equals(tableColumn.getCategory())) {
				result.append("<input class=\"easyui-numberbox\" id=\"");
				result.append(column);
				result.append("\" name=\"");
				result.append(column);
				result.append("\" data-options=\"");
				if(StringConstant.NO.equals(tableColumn.getIsEdit())) {
					result.append("editable:false,");
				}
				if(StringConstant.YES.equals(tableColumn.getIsNull())) {
					result.append("required:true,");
				}
				if(StringUtils.isNoneBlank(tableColumn.getValidType())) {
					result.append("validType:'"+tableColumn.getValidType()+"',");
				}
				if(StringUtils.isNoneBlank(tableColumn.getDefaultValue())) {
					result.append("value:'"+tableColumn.getDefaultValue()+"',");
				}
				if(StringUtils.isNoneBlank(tableColumn.getSettings())) {
					result.append(tableColumn.getSettings());
				}
				result.append("\" "+tableColumn.getHtmlInner());
				result.append("/>");
			}
			if(COMBOBOX.equals(tableColumn.getCategory()) || RADIOBOX.equals(tableColumn.getCategory()) || CHECKBOX.equals(tableColumn.getCategory())) {
				result.append("<input class=\"easyui-combobox\" id=\"");
				result.append(column);
				result.append("\" name=\"");
				result.append(column);
				result.append("\" data-options=\"");
				if(StringConstant.NO.equals(tableColumn.getIsEdit())) {
					result.append("editable:false,");
				}
				if(StringConstant.YES.equals(tableColumn.getIsNull())) {
					result.append("required:true,");
				}
				if(StringUtils.isNoneBlank(tableColumn.getValidType())) {
					result.append("validType:'"+tableColumn.getValidType()+"',");
				}
				if(StringUtils.isNoneBlank(tableColumn.getDefaultValue())) {
					result.append("value:'"+tableColumn.getDefaultValue()+"',");
				}
				int dataCount = 0;
				if(StringUtils.isNoneBlank(tableColumn.getSettings())) {
					result.append("valueField: 'value',textField: 'label',");
					if(CHECKBOX.equals(tableColumn.getCategory())) {
						result.append("multiple:true,");
					}
					String settings = tableColumn.getSettings();
					if(settings.indexOf("SQL>") != -1) {
						result.append("data: [");
						String[] settingsArr = settings.split("\\|");
						String sql = settingsArr[0].replace("SQL>", "");
						String value = settingsArr[1];
						String label = settingsArr[2];
						List<Map<Object, Object>> list = DBUtils.executeQuery(sql);
						for(Map<Object, Object> map : list) {
							dataCount++;
							result.append("{value: '"+map.get(value.toUpperCase())+"',label: '"+map.get(label.toUpperCase())+"'},");
						}
						result.substring(0, result.lastIndexOf(",")-1);
						result.append("]");
					} else if(settings.indexOf("DICT>") != -1) {
						result.append("data: [");
						List<Dict> dictList = DictUtils.getDictList(DictUtils.getDict(settings.replace("DICT>", "")).getValue());
						for(Dict dict : dictList) {
							dataCount++;
							result.append("{value: '"+dict.getValue()+"',label: '"+dict.getLabel()+"'},");
						}
						result.substring(0, result.lastIndexOf(",")-1);
						result.append("]");
					} else  {
						result.append("data: [");
						String[] settingsArr = settings.split("\\|");
						for(String set : settingsArr) {
							dataCount++;
							if(set.indexOf(":") == -1) {
								result.append("{label: '"+set+"',value: '"+set+"'},");
							} else {
								String[] setArr = set.split(":");
								result.append("{value: '"+setArr[0]+"',label: '"+setArr[1]+"'},");
							}
						}
						result.substring(0, result.lastIndexOf(",")-1);
						result.append("]");
					}
				}
				if(dataCount <= 5) {
					result.append(",panelHeight:'auto',");
				}
				result.append("\" "+tableColumn.getHtmlInner());
				result.append("/>");
			}
			if(DATEBOX.equals(tableColumn.getCategory())) {
				result.append("<input id=\"");
				result.append(column);
				result.append("\" name=\"");
				result.append(column);
				result.append("\" "+tableColumn.getHtmlInner());
				if(StringUtils.isNoneBlank(tableColumn.getSettings())) {
					result.append(" onClick=\"WdatePicker({");
					result.append(tableColumn.getSettings());
					result.append("})\"");
				} else {
					result.append(" onClick=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\"");
				}
				result.append("/>");
			}
			if(HTMLDESIGN.equals(tableColumn.getCategory())) {
				result.append("<script id=\"");
				result.append(column);
				result.append("\" name=\"");
				result.append(column);
				result.append("\" type=\"text/plain\">");
				if(StringUtils.isNoneBlank(tableColumn.getDefaultValue())) {
					result.append(tableColumn.getDefaultValue());
				}
				result.append("</script>");
				result.append("<script type=\"text/javascript\">");
				result.append("var ue = UE.getEditor('"+column+"', {autoHeight: false});");
				if(StringUtils.isNoneBlank(tableColumn.getSettings())) {
					result.append("ue.ready(function() {ue.setHeight("+tableColumn.getSettings()+");});");
				}
				result.append("</script>");
			}
			result.append("<span id=\"msg-"+column+"\" class=\"err-msg\"></span>");
			out.println(result.toString());
		} catch (Exception e) {
			throw new JspException(e.getMessage());
		}
		return SKIP_BODY;
	}

	@Override
	public int doEndTag() throws JspException {
		//返回SKIP_PAGE跳过整个jsp页面后面的输出，返回EVAL_PAGE执行页面余下部分
		//返回EVAL_BODY_AGAIN那么将重新执行此方法
		return EVAL_PAGE;
	}

	@Override
	public void release() {
		super.release();
		this.table = null;
		this.column = null;
	}

	public void setTable(String table) {
		this.table = table;
	}

	public void setColumn(String column) {
		this.column = column;
	}
	
}