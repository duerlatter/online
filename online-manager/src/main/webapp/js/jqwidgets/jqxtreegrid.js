/*
jQWidgets v3.9.1 (2015-Oct)
Copyright (c) 2011-2015 jQWidgets.
License: http://jqwidgets.com/license/
 */

(function(a) {
	a.jqx.jqxWidget("jqxTreeGrid", "jqxDataTable", {});
	a
			.extend(
					a.jqx._jqxTreeGrid.prototype,
					{
						defineInstance : function() {
							this.base.treeGrid = this;
							this.base.exportSettings = {
								recordsInView : false,
								columnsHeader : true,
								hiddenColumns : false,
								serverURL : null,
								characterSet : null,
								collapsedRecords : false,
								fileName : "jqxTreeGrid"
							};
							var b = {
								pageSizeMode : "default",
								checkboxes : false,
								hierarchicalCheckboxes : false,
								icons : false,
								showSubAggregates : false,
								rowDetailsRenderer : null,
								virtualModeCreateRecords : null,
								virtualModeRecordCreating : null,
								loadingFailed : false
							};
							a.extend(true, this, b);
							return b
						},
						createInstance : function(b) {
							this.theme = this.base.theme;
							var c = this
						},
						deleteRow : function(b) {
							var c = this.base;
							c.deleterowbykey(b)
						},
						updateRow : function(b, d) {
							var c = this.base;
							c.updaterowbykey(b, d)
						},
						setCellValue : function(c, b, e) {
							var d = this.base;
							d.setCellValueByKey(c, b, e)
						},
						getCellValue : function(c, b) {
							var d = this.base;
							return d.getCellValueByKey(c, b)
						},
						lockRow : function(b) {
							var c = this.base;
							c.lockrowbykey(b)
						},
						unlockRow : function(b) {
							var c = this.base;
							c.unlockrowbykey(b)
						},
						selectRow : function(b) {
							var c = this.base;
							c.selectrowbykey(b)
						},
						unselectRow : function(b) {
							var c = this.base;
							c.unselectrowbykey(b)
						},
						ensureRowVisible : function(b) {
							var c = this.base;
							c.ensurerowvisiblebykey(b)
						},
						beginCellEdit : function(c, b) {
							var e = this.base;
							var d = e.getColumn(b);
							e.beginroweditbykey(c, d)
						},
						beginRowEdit : function(b) {
							var c = this.base;
							c.beginroweditbykey(b)
						},
						endCellEdit : function(c, b, e) {
							var d = this.base;
							d.endroweditbykey(c, e)
						},
						endRowEdit : function(b, d) {
							var c = this.base;
							c.endroweditbykey(b, d)
						},
						_showLoadElement : function() {
							var b = this.base;
							if (b.host.css("display") == "block") {
								if (b.autoShowLoadElement) {
									a(b.dataloadelement).css("visibility",
											"visible");
									a(b.dataloadelement)
											.css("display", "block");
									b.dataloadelement.width(b.host.width());
									b.dataloadelement.height(b.host.height())
								}
							}
						},
						_hideLoadElement : function() {
							var b = this.base;
							if (b.host.css("display") == "block") {
								if (b.autoShowLoadElement) {
									a(b.dataloadelement).css("visibility",
											"hidden");
									a(b.dataloadelement).css("display", "none");
									b.dataloadelement.width(b.host.width());
									b.dataloadelement.height(b.host.height())
								}
							}
						},
						getKey : function(b) {
							if (b) {
								return b.uid
							}
						},
						getRows : function() {
							var b = this.base;
							if (b.source.hierarchy) {
								if (b.source.hierarchy.length != 0) {
									return b.source.hierarchy
								}
							}
							return b.source.records
						},
						getCheckedRows : function() {
							var c = this.base;
							var d = c._names();
							var e = new Array();
							var b = function(j, g) {
								if (!g) {
									return
								}
								for (var h = 0; h < g.length; h++) {
									if (!g[h]) {
										continue
									}
									var f = a.extend({}, g[h]);
									var k = c.rowinfo[g[h].uid];
									if (k && k[d.checked]) {
										j.push(f)
									} else {
										if (f[d.checked]) {
											j.push(f)
										}
									}
									b(e, g[h].records)
								}
							};
							b(e, c.dataViewRecords);
							return e
						},
						getRow : function(d) {
							var e = this.base;
							var b = e.source.records;
							if (e.source.hierarchy) {
								var f = function(h) {
									for (var j = 0; j < h.length; j++) {
										if (!h[j]) {
											continue
										}
										if (h[j].uid == d) {
											return h[j]
										}
										if (h[j].records) {
											var k = f(h[j].records);
											if (k) {
												return k
											}
										}
									}
								};
								var g = f(e.source.hierarchy);
								return g
							} else {
								for (var c = 0; c < b.length; c++) {
									if (!b[c]) {
										continue
									}
									if (b[c].uid == d) {
										return b[c]
									}
								}
							}
						},
						_renderrows : function() {
							var N = this.base;
							var ar = this;
							if (N._loading) {
								return
							}
							if (N._updating) {
								return
							}
							var J = N._names();
							if (N.source.hierarchy.length === 0
									&& !N.loadingFailed) {
								if (this.virtualModeCreateRecords) {
									var am = function(c) {
										if (c === false || (c && c.length == 0)) {
											N._loading = false;
											N.loadingFailed = true;
											N.source.hierarchy = new Array();
											ar._hideLoadElement();
											N._renderrows();
											N._updateScrollbars();
											N._arrange();
											return
										}
										for (var j = 0; j < c.length; j++) {
											c[j].level = 0;
											ar.virtualModeRecordCreating(c[j]);
											N.rowsByKey[c[j].uid] = c[j]
										}
										N.source.hierarchy = c;
										if (!N.source._source.hierarchy) {
											N.source._source.hierarchy = {}
										}
										N._loading = false;
										ar._hideLoadElement();
										N._renderrows();
										N._updateScrollbars();
										N._arrange()
									};
									N._loading = true;
									this.virtualModeCreateRecords(null, am);
									this._showLoadElement()
								}
							}
							if (N.rendering) {
								N.rendering()
							}
							var ay = 0;
							N.table[0].rows = new Array();
							var aI = N.toTP("jqx-cell") + " "
									+ N.toTP("jqx-widget-content") + " "
									+ N.toTP("jqx-item");
							if (N.rtl) {
								aI += " " + N.toTP("jqx-cell-rtl")
							}
							var b = N.columns.records.length;
							var O = a.jqx.browser.msie
									&& a.jqx.browser.version < 8;
							if (O) {
								N.host.attr("hideFocus", "true")
							}
							var v = new Array();
							var aF = function(s, w) {
								for (var aJ = 0; aJ < s.length; aJ++) {
									var c = s[aJ];
									if (!c) {
										continue
									}
									var j = !N.rowinfo[c.uid] ? c.expanded
											: N.rowinfo[c.uid].expanded;
									if (N.dataview.filters.length == 0) {
										c._visible = true
									}
									if (c._visible !== false) {
										if (j || c[J.leaf]) {
											w.push(c);
											if (c.records
													&& c.records.length > 0) {
												var aK = aF(c.records,
														new Array());
												for (var x = 0; x < aK.length; x++) {
													w.push(aK[x])
												}
											}
										} else {
											w.push(c)
										}
									}
								}
								return w
							};
							var ao = N.source.hierarchy.length === 0 ? N.source.records
									: N.source.hierarchy;
							ao = N.dataview.evaluate(ao);
							N.dataViewRecords = ao;
							if (this.showSubAggregates) {
								var p = function(s, c) {
									if (s != 0) {
										if (c.length > 0) {
											if (c[c.length - 1]) {
												if (!c[c.length - 1].aggregate) {
													c.push({
														_visible : true,
														level : s,
														siblings : c,
														aggregate : true,
														leaf : true
													})
												}
											} else {
												if (a.jqx.browser.msie
														&& a.jqx.browser.version < 9) {
													if (c[c.length - 2]) {
														if (!c[c.length - 2].aggregate) {
															c
																	.push({
																		_visible : true,
																		level : s,
																		siblings : c,
																		aggregate : true,
																		leaf : true
																	})
														}
													}
												}
											}
										}
									}
									for (var j = 0; j < c.length; j++) {
										if (c[j] && c[j].records) {
											p(s + 1, c[j].records)
										}
									}
								};
								p(0, ao)
							}
							var ap = function(s) {
								var w = 0;
								var i = new Array();
								for (var c = 0; c < s.length; c++) {
									var j = s[c];
									if (j[J.level] == 0) {
										w++
									}
									if (w > N.dataview.pagesize
											* N.dataview.pagenum
											&& w <= N.dataview.pagesize
													* N.dataview.pagenum
													+ N.dataview.pagesize) {
										i.push(j)
									}
									if (w > N.dataview.pagesize
											* N.dataview.pagenum
											+ N.dataview.pagesize) {
										break
									}
								}
								return i
							};
							if (N.source.hierarchy.length === 0) {
								if (N.dataview.pagesize == "all" || !N.pageable
										|| N.serverProcessing) {
									var ak = ao;
									if (N.pageable && N.serverProcessing
											&& ao.length > N.dataview.pagesize) {
										var ak = ao.slice(N.dataview.pagesize
												* N.dataview.pagenum,
												N.dataview.pagesize
														* N.dataview.pagenum
														+ N.dataview.pagesize)
									}
								} else {
									var ak = ao.slice(N.dataview.pagesize
											* N.dataview.pagenum,
											N.dataview.pagesize
													* N.dataview.pagenum
													+ N.dataview.pagesize)
								}
								var v = ak
							} else {
								var ao = aF.call(N, ao, new Array());
								if (N.dataview.pagesize == "all" || !N.pageable) {
									var ak = ao
								} else {
									var ak = ao.slice(N.dataview.pagesize
											* N.dataview.pagenum,
											N.dataview.pagesize
													* N.dataview.pagenum
													+ N.dataview.pagesize);
									if (this.pageSizeMode == "root") {
										ak = ap(ao)
									}
								}
								var v = ak;
								var I = N.dataview.pagenum;
								N.updatepagerdetails();
								if (N.dataview.pagenum != I) {
									if (N.dataview.pagesize == "all"
											|| !N.pageable) {
										var ak = ao
									} else {
										var ak = ao.slice(N.dataview.pagesize
												* N.dataview.pagenum,
												N.dataview.pagesize
														* N.dataview.pagenum
														+ N.dataview.pagesize);
										if (this.pageSizeMode == "root") {
											ak = ap(ao)
										}
									}
									var v = ak
								}
							}
							N.renderedRecords = v;
							var D = v.length;
							var aG = N.tableZIndex;
							var k = 0;
							var aq = 0;
							if (O) {
								for (var P = 0; P < b; P++) {
									var T = N.columns.records[P];
									var aw = T.width;
									if (aw < T.minwidth) {
										aw = T.minwidth
									}
									if (aw > T.maxwidth) {
										aw = T.maxwidth
									}
									var av = a('<table><tr><td role="gridcell" style="max-width: '
											+ aw
											+ "px; width:"
											+ aw
											+ 'px;" class="'
											+ aI
											+ '"></td></tr></table>');
									a(document.body).append(av);
									var ag = av.find("td");
									k = 1 + parseInt(ag.css("padding-left"))
											+ parseInt(ag.css("padding-right"));
									av.remove();
									break
								}
							}
							var B = N.rtl ? " " + N.toTP("jqx-grid-table-rtl")
									: "";
							var y = "<table cellspacing='0' class='"
									+ N.toTP("jqx-grid-table") + B
									+ "' id='table" + N.element.id
									+ "'><colgroup>";
							var W = "<table cellspacing='0' class='"
									+ N.toTP("jqx-grid-table") + B
									+ "' id='pinnedtable" + N.element.id
									+ "'><colgroup>";
							var ab = null;
							for (var P = 0; P < b; P++) {
								var T = N.columns.records[P];
								if (T.hidden) {
									continue
								}
								ab = T;
								var aw = T.width;
								if (aw < T.minwidth) {
									aw = T.minwidth
								}
								if (aw > T.maxwidth) {
									aw = T.maxwidth
								}
								aw -= k;
								if (aw < 0) {
									aw = 0
								}
								if (O) {
									var H = aw;
									if (P == 0) {
										H++
									}
									W += "<col style='max-width: " + aw
											+ "px; width: " + H + "px;'>";
									y += "<col style='max-width: " + aw
											+ "px; width: " + H + "px;'>"
								} else {
									W += "<col style='max-width: " + aw
											+ "px; width: " + aw + "px;'>";
									y += "<col style='max-width: " + aw
											+ "px; width: " + aw + "px;'>"
								}
								aq += aw
							}
							y += "</colgroup>";
							W += "</colgroup>";
							N._hiddencolumns = false;
							var r = false;
							if (D === 0) {
								var n = '<tr role="row">';
								var q = N.host.height();
								if (N.pageable) {
									q -= N.pagerHeight;
									if (N.pagerPosition === "both") {
										q -= N.pagerHeight
									}
								}
								q -= N.columnsHeight;
								if (N.filterable) {
									var aB = N.filter.find(".filterrow");
									var A = N.filter.find(".filterrow-hidden");
									var E = 1;
									if (A.length > 0) {
										E = 0
									}
									q -= N.filterHeight + N.filterHeight
											* aB.length * E
								}
								if (N.showstatusbar) {
									q -= N.statusBarHeight
								}
								if (N.showAggregates) {
									q -= N.aggregatesHeight
								}
								if (q < 25) {
									q = 25
								}
								if (N.hScrollBar[0].style.visibility != "hidden") {
									q -= N.hScrollBar.outerHeight()
								}
								if (N.height === "auto" || N.height === null
										|| N.autoheight) {
									q = 100
								}
								var aw = N.host.width() + 2;
								var av = '<td colspan="'
										+ N.columns.records.length
										+ '" role="gridcell" style="border-right-color: transparent; min-height: '
										+ q + "px; height: " + q
										+ "px;  min-width:" + aq
										+ "px; max-width:" + aq + "px; width:"
										+ aq + "px;";
								var aI = N.toTP("jqx-cell") + " "
										+ N.toTP("jqx-grid-cell") + " "
										+ N.toTP("jqx-item");
								aI += " " + N.toTP("jqx-center-align");
								av += '" class="' + aI + '">';
								if (!N._loading) {
									av += N.gridlocalization.emptydatastring
								}
								av += "</td>";
								n += av;
								y += n;
								W += n;
								N.table[0].style.width = aq + 2 + "px";
								ay = aq
							}
							var m = N.source._source.hierarchy
									&& N.source._source.hierarchy.groupingDataFields ? N.source._source.hierarchy.groupingDataFields.length
									: 0;
							for (var Q = 0; Q < v.length; Q++) {
								var at = v[Q];
								var ac = at.uid;
								if (m > 0) {
									if (at[J.level] < m) {
										ac = at.uid
									}
								}
								if (at.uid === undefined) {
									at.uid = N.dataview.generatekey()
								}
								var n = '<tr data-key="' + ac
										+ '" role="row" id="row' + Q
										+ N.element.id + '">';
								var an = '<tr data-key="' + ac
										+ '" role="row" id="row' + Q
										+ N.element.id + '">';
								if (at.aggregate) {
									var n = '<tr data-role="summaryrow" role="row" id="row'
											+ Q + N.element.id + '">';
									var an = '<tr data-role="summaryrow" role="row" id="row'
											+ Q + N.element.id + '">'
								}
								var U = 0;
								if (!N.rowinfo[ac]) {
									var z = at[J.checked];
									if (z === undefined) {
										z = false
									}
									N.rowinfo[ac] = {
										selected : at[J.selected],
										checked : z,
										icon : at[J.icon],
										aggregate : at.aggregate,
										row : at,
										leaf : at[J.leaf],
										expanded : at[J.expanded]
									}
								} else {
									if (N.rowinfo[ac].checked === undefined) {
										N.rowinfo[ac].checked = at[J.checked]
									}
									if (N.rowinfo[ac].icon === undefined) {
										N.rowinfo[ac].icon = at[J.icon]
									}
									if (N.rowinfo[ac].aggregate === undefined) {
										N.rowinfo[ac].aggregate = at[J.aggregate]
									}
									if (N.rowinfo[ac].row === undefined) {
										N.rowinfo[ac].row = at
									}
									if (N.rowinfo[ac].leaf === undefined) {
										N.rowinfo[ac].leaf = at[J.leaf]
									}
									if (N.rowinfo[ac].expanded === undefined) {
										N.rowinfo[ac].expanded = at[J.expanded]
									}
								}
								var h = N.rowinfo[ac];
								h.row = at;
								if (at.originalRecord) {
									h.originalRecord = at.originalRecord
								}
								var o = 0;
								for (var P = 0; P < b; P++) {
									var M = N.columns.records[P];
									if (M.pinned
											|| (N.rtl && N.columns.records[b - 1].pinned)) {
										r = true
									}
									var aw = M.width;
									if (aw < M.minwidth) {
										aw = M.minwidth
									}
									if (aw > M.maxwidth) {
										aw = M.maxwidth
									}
									aw -= k;
									if (aw < 0) {
										aw = 0
									}
									var aI = N.toTP("jqx-cell") + " "
											+ N.toTP("jqx-grid-cell") + " "
											+ N.toTP("jqx-item");
									if (M.pinned) {
										aI += " "
												+ N
														.toTP("jqx-grid-cell-pinned")
									}
									if (N.sortcolumn === M.displayfield) {
										aI += " "
												+ N.toTP("jqx-grid-cell-sort")
									}
									if (N.altRows && Q % 2 != 0) {
										aI += " " + N.toTP("jqx-grid-cell-alt")
									}
									if (N.rtl) {
										aI += " " + N.toTP("jqx-cell-rtl")
									}
									var R = "";
									if (m > 0 && !O && !at.aggregate) {
										if (at[J.level] < m) {
											R += ' colspan="' + b + '"';
											var H = 0;
											for (var K = 0; K < b; K++) {
												var S = N.columns.records[K];
												if (S.hidden) {
													continue
												}
												var Z = S.width;
												if (Z < S.minwidth) {
													aw = S.minwidth
												}
												if (Z > S.maxwidth) {
													aw = S.maxwidth
												}
												Z -= k;
												if (Z < 0) {
													Z = 0
												}
												H += Z
											}
											aw = H
										}
									}
									var av = '<td role="gridcell"' + R
											+ ' style="max-width:' + aw
											+ "px; width:" + aw + "px;";
									var aj = '<td role="gridcell"'
											+ R
											+ ' style="pointer-events: none; visibility: hidden; border-color: transparent; max-width:'
											+ aw + "px; width:" + aw + "px;";
									if (P == b - 1 && b == 1) {
										av += "border-right-color: transparent;";
										aj += "border-right-color: transparent;"
									}
									if (m > 0 && at[J.level] < m
											&& !at.aggregate) {
										if (N.rtl) {
											aI += " "
													+ N.toTP("jqx-right-align")
										}
									} else {
										if (M.cellsalign != "left") {
											if (M.cellsalign === "right") {
												aI += " "
														+ N
																.toTP("jqx-right-align")
											} else {
												aI += " "
														+ N
																.toTP("jqx-center-align")
											}
										}
									}
									if (h) {
										if (h.selected) {
											if (N.editKey !== ac) {
												if (N.selectionMode !== "none") {
													aI += " "
															+ N
																	.toTP("jqx-grid-cell-selected");
													aI += " "
															+ N
																	.toTP("jqx-fill-state-pressed")
												}
											}
										}
										if (h.locked) {
											aI += " "
													+ N
															.toTP("jqx-grid-cell-locked")
										}
										if (h.aggregate) {
											aI += " "
													+ N
															.toTP("jqx-grid-cell-pinned")
										}
									}
									if (!(M.hidden)) {
										if (o == 0 && !N.rtl) {
											av += "border-left-width: 0px;";
											aj += "border-left-width: 0px;"
										} else {
											av += "border-right-width: 0px;";
											aj += "border-right-width: 0px;"
										}
										o++;
										U += k + aw
									} else {
										av += "display: none;";
										aj += "display: none;";
										N._hiddencolumns = true
									}
									if (M.pinned) {
										av += "pointer-events: auto;";
										aj += "pointer-events: auto;"
									}
									var u = "";
									if ((N.source.hierarchy.length == 0 || (!at.records || (at.records && at.records.length === 0)))
											&& !this.virtualModeCreateRecords) {
										h.leaf = true
									}
									if (at.records && at.records.length > 0) {
										h.leaf = false
									}
									if (N.dataview.filters.length > 0) {
										if (at.records && at.records.length > 0) {
											var aa = false;
											for (var L = 0; L < at.records.length; L++) {
												if (at.records[L]._visible !== false
														&& at.records[L].aggregate == undefined) {
													aa = true;
													break
												}
											}
											if (!aa) {
												h.leaf = true
											} else {
												h.leaf = false
											}
										}
									}
									if (h && !h.leaf) {
										if (h.expanded) {
											u += N
													.toTP("jqx-tree-grid-expand-button")
													+ " ";
											if (!N.rtl) {
												u += N
														.toTP("jqx-grid-group-expand")
											} else {
												u += N
														.toTP("jqx-grid-group-expand-rtl")
											}
											u += " "
													+ N
															.toTP("jqx-icon-arrow-down")
										} else {
											u += N
													.toTP("jqx-tree-grid-collapse-button")
													+ " ";
											if (!N.rtl) {
												u += N
														.toTP("jqx-grid-group-collapse");
												u += " "
														+ N
																.toTP("jqx-icon-arrow-right")
											} else {
												u += N
														.toTP("jqx-grid-group-collapse-rtl");
												u += " "
														+ N
																.toTP("jqx-icon-arrow-left")
											}
										}
									}
									if (!N.autoRowHeight
											|| o === 1
											|| (N.autoRowHeight && !M.autoCellHeight)) {
										aI += " "
												+ N
														.toTP("jqx-grid-cell-nowrap")
									}
									var V = N._getcellvalue(M, h.row);
									if (m > 0 && !at.aggregate) {
										if (at[J.level] < m) {
											V = at.label
										}
									}
									if (M.cellsFormat != "") {
										if (a.jqx.dataFormat) {
											if (a.jqx.dataFormat.isDate(V)) {
												V = a.jqx.dataFormat
														.formatdate(
																V,
																M.cellsFormat,
																N.gridlocalization)
											} else {
												if (a.jqx.dataFormat
														.isNumber(V)
														|| (!isNaN(parseFloat(V)) && isFinite(V))) {
													V = a.jqx.dataFormat
															.formatnumber(
																	V,
																	M.cellsFormat,
																	N.gridlocalization)
												}
											}
										}
									}
									if (M.cellclassname != ""
											&& M.cellclassname) {
										if (typeof M.cellclassname == "string") {
											aI += " " + M.cellclassname
										} else {
											var aH = M.cellclassname(Q,
													M.datafield, N
															._getcellvalue(M,
																	h.row),
													h.row, V);
											if (aH) {
												aI += " " + aH
											}
										}
									}
									if (M.cellsRenderer != ""
											&& M.cellsRenderer) {
										var C = M.cellsRenderer(ac,
												M.datafield, N._getcellvalue(M,
														h.row), h.row, V);
										if (C !== undefined) {
											V = C
										}
									}
									if (h.aggregate) {
										if (M.aggregates) {
											var au = at.siblings.slice(0,
													at.siblings.length - 1);
											var X = N._calculateaggregate(M,
													null, true, au);
											at[M.displayfield] = "";
											if (X) {
												if (M.aggregatesRenderer) {
													if (X) {
														var G = M
																.aggregatesRenderer(
																		X[M.datafield],
																		M,
																		null,
																		N
																				.getcolumnaggregateddata(
																						M.datafield,
																						M.aggregates,
																						false,
																						au),
																		"subAggregates");
														V = G;
														at[M.displayfield] += name
																+ ":"
																+ X[M.datafield]
																+ "\n"
													}
												} else {
													V = "";
													at[M.displayfield] = "";
													a
															.each(
																	X,
																	function() {
																		var i = this;
																		for (obj in i) {
																			var c = obj;
																			c = N
																					._getaggregatename(c);
																			var j = '<div style="position: relative; margin: 0px; overflow: hidden;">'
																					+ c
																					+ ":"
																					+ i[obj]
																					+ "</div>";
																			V += j;
																			at[M.displayfield] += c
																					+ ":"
																					+ i[obj]
																					+ "\n"
																		}
																	})
												}
											} else {
												V = ""
											}
										}
									}
									if ((o === 1 && !N.rtl)
											|| (M == ab && N.rtl)
											|| (m > 0 && at[J.level] < m)) {
										var ae = "";
										var d = N
												.toThemeProperty("jqx-tree-grid-indent");
										var Y = h.leaf ? 1 : 0;
										for (var F = 0; F < at[J.level] + Y; F++) {
											ae += "<span class='" + d
													+ "'></span>"
										}
										var al = "<span class='" + u
												+ "'></span>";
										var az = "";
										var e = "";
										if (this.checkboxes && !at.aggregate) {
											var aC = N
													.toThemeProperty("jqx-tree-grid-checkbox")
													+ " "
													+ d
													+ " "
													+ N
															.toThemeProperty("jqx-checkbox-default")
													+ " "
													+ N
															.toThemeProperty("jqx-fill-state-normal")
													+ " "
													+ N
															.toThemeProperty("jqx-rc-all");
											var g = true;
											if (a.isFunction(this.checkboxes)) {
												g = this.checkboxes(ac, at);
												if (g == undefined) {
													g = false
												}
											}
											if (g) {
												if (h) {
													var ax = h.checked;
													if (this.hierarchicalCheckboxes == false
															&& ax === null) {
														ax = false
													}
													if (ax) {
														az += "<span class='"
																+ aC
																+ "'><div class='"
																+ N
																		.toThemeProperty("jqx-tree-grid-checkbox-tick")
																+ " "
																+ N
																		.toThemeProperty("jqx-checkbox-check-checked")
																+ "'></div></span>"
													} else {
														if (ax === false) {
															az += "<span class='"
																	+ aC
																	+ "'></span>"
														} else {
															az += "<span class='"
																	+ aC
																	+ "'><div class='"
																	+ N
																			.toThemeProperty("jqx-tree-grid-checkbox-tick")
																	+ " "
																	+ N
																			.toThemeProperty("jqx-checkbox-check-indeterminate")
																	+ "'></div></span>"
														}
													}
												} else {
													az += "<span class='" + aC
															+ "'></span>"
												}
											}
										}
										if (this.icons && !at.aggregate) {
											var af = N
													.toThemeProperty("jqx-tree-grid-icon")
													+ " " + d;
											if (N.rtl) {
												var af = N
														.toThemeProperty("jqx-tree-grid-icon")
														+ " "
														+ N
																.toThemeProperty("jqx-tree-grid-icon-rtl")
														+ " " + d
											}
											var aA = N
													.toThemeProperty("jqx-tree-grid-icon-size")
													+ " " + d;
											var f = h.icon;
											if (a.isFunction(this.icons)) {
												h.icon = this.icons(ac, at);
												if (h.icon) {
													f = true
												}
											}
											if (f) {
												if (h.icon) {
													e += "<span class='" + af
															+ "'><img class='"
															+ aA + "' src='"
															+ h.icon
															+ "'/></span>"
												} else {
													e += "<span class='" + af
															+ "'></span>"
												}
											}
										}
										var ad = N.autoRowHeight && o === 1
												&& M.autoCellHeight ? " "
												+ N.toTP("jqx-grid-cell-wrap")
												: "";
										var ai = ae
												+ al
												+ az
												+ e
												+ "<span class='"
												+ N
														.toThemeProperty("jqx-tree-grid-title")
												+ ad + "'>" + V + "</span>";
										if (!N.rtl) {
											V = ai
										} else {
											V = "<span class='"
													+ N
															.toThemeProperty("jqx-tree-grid-title")
													+ ad + "'>" + V + "</span>"
													+ e + az + al + ae
										}
									}
									if (m > 0 && O && P >= m) {
										if (at[J.level] < m) {
											av += "padding-left: 5px; border-left-width: 0px;";
											aj += "padding-left: 5px; border-left-width: 0px;";
											V = "<span style='visibility: hidden;'>-</span>"
										}
									}
									av += '" class="' + aI + '">';
									av += V;
									av += "</td>";
									aj += '" class="' + aI + '">';
									aj += V;
									aj += "</td>";
									if (!M.pinned) {
										n += av;
										if (r) {
											an += aj
										}
									} else {
										an += av;
										n += av
									}
									if (m > 0 && !O) {
										if (at[J.level] < m && !at.aggregate) {
											break
										}
									}
								}
								if (ay == 0) {
									N.table[0].style.width = U + 2 + "px";
									ay = U
								}
								n += "</tr>";
								an += "</tr>";
								y += n;
								W += an;
								if (N.rowDetails && !at.aggregate
										&& this.rowDetailsRenderer) {
									var l = '<tr data-role="row-details"><td valign="top" align="left" style="pointer-events: auto; max-width:'
											+ aw
											+ "px; width:"
											+ aw
											+ 'px; overflow: hidden; border-left: none; border-right: none;" colspan="'
											+ N.columns.records.length
											+ '" role="gridcell"';
									var aI = N.toTP("jqx-cell") + " "
											+ N.toTP("jqx-grid-cell") + " "
											+ N.toTP("jqx-item");
									aI += " " + N.toTP("jqx-details");
									aI += " " + N.toTP("jqx-reset");
									var ah = this.rowDetailsRenderer(ac, at);
									if (ah) {
										l += '" class="'
												+ aI
												+ '"><div style="pointer-events: auto; overflow: hidden;"><div data-role="details">'
												+ ah + "</div></div></td></tr>";
										y += l;
										W += l
									}
								}
							}
							y += "</table>";
							W += "</table>";
							if (r) {
								if (N.WinJS) {
									MSApp.execUnsafeLocalFunction(function() {
										N.table.html(W + y)
									})
								} else {
									N.table[0].innerHTML = W + y
								}
								var aD = N.table.find("#table" + N.element.id);
								var aE = N.table.find("#pinnedtable"
										+ N.element.id);
								aE.css("float", "left");
								aE.css("pointer-events", "none");
								aD.css("float", "left");
								aE[0].style.position = "absolute";
								aD[0].style.position = "relative";
								aD[0].style.zIndex = aG - 10;
								aE[0].style.zIndex = aG + 10;
								N._table = aD;
								N._table[0].style.left = "0px";
								N._pinnedTable = aE;
								if (O) {
									aE[0].style.left = "0px"
								}
								N._table[0].style.width = ay + "px";
								N._pinnedTable[0].style.width = ay + "px";
								if (N.rtl && N._haspinned) {
									N._pinnedTable[0].style.left = 3 - ay
											+ parseInt(N.element.style.width)
											+ "px"
								}
							} else {
								if (N.WinJS) {
									MSApp.execUnsafeLocalFunction(function() {
										N.table.html(y)
									})
								} else {
									N.table[0].innerHTML = y
								}
								var K = N.table.find("#table" + N.element.id);
								N._table = K;
								if (a.jqx.browser.msie
										&& a.jqx.browser.version < 10) {
									N._table[0].style.width = ay + "px"
								}
								if (D === 0) {
									N._table[0].style.width = (2 + ay) + "px"
								}
							}
							if (D === 0) {
								N._table[0].style.tableLayout = "auto";
								if (N._pinnedTable) {
									N._pinnedTable[0].style.tableLayout = "auto"
								}
							}
							if (N.showAggregates) {
								N._updatecolumnsaggregates()
							}
							if (N._loading && D == 0) {
								N._arrange();
								this._showLoadElement()
							}
							if (N.rendered) {
								N.rendered()
							}
						},
						propertyChangedHandler : function(b, c, e, d) {
							if (b.isInitialized == undefined
									|| b.isInitialized == false) {
								return
							}
							if (c == "pageSizeMode"
									|| c == "hierarchicalCheckboxes") {
								b._renderrows()
							}
						},
						checkRow : function(c, d, b) {
							var e = this.base;
							var g = e._names();
							if (e._loading) {
								return
							}
							var f = e.rowinfo[c];
							if (f) {
								f.checked = true;
								f.row[g.checked] = true;
								if (f.originalRecord) {
									f.originalRecord[g.checked] = true
								}
								if (b == undefined
										&& this.hierarchicalCheckboxes) {
									this.checkRows(f.row, f.row)
								}
								if (d !== false) {
									e._renderrows()
								}
								e._raiseEvent("rowCheck", {
									key : c,
									row : f.row
								})
							} else {
								var h = this.getRow(c);
								if (h) {
									e.rowinfo[c] = {
										row : h,
										checked : true
									};
									e.rowinfo[c].row[g.checked] = true;
									if (h.originalRecord) {
										e.rowinfo[c].originalRecord = h.originalRecord
									}
									e._raiseEvent("rowCheck", {
										key : c,
										row : h
									});
									if (b == undefined
											&& this.hierarchicalCheckboxes) {
										this.checkRows(h, h)
									}
									if (d !== false) {
										e._renderrows()
									}
								}
							}
						},
						checkRows : function(d, n) {
							var e = this.base;
							var j = this;
							var i = e._names();
							var l = function(o) {
								var p = new Array();
								var q = function(s) {
									for (var r = 0; r < s.length; r++) {
										p.push(s[r]);
										if (s[r].records) {
											q(s[r].records)
										}
									}
								};
								if (o.records) {
									q(o.records)
								}
								return p
							};
							if (d != null) {
								var f = 0;
								var c = false;
								var g = 0;
								var b = function(o) {
									for (var p = 0; p < o.length; p++) {
										var q = o[p][i.checked];
										if (q === undefined) {
											q = false
										}
										if (q != false) {
											if (o[p][i.checked] == null) {
												c = true
											}
											if (o[p].records) {
												b(o[p].records)
											}
											f++
										}
										g++
									}
								};
								if (d.records) {
									b(d.records)
								}
								if (d != n) {
									if (f == g) {
										this.checkRow(d.uid, false, "tree")
									} else {
										if (f > 0) {
											this.indeterminateRow(d.uid, false,
													"tree")
										} else {
											this.uncheckRow(d.uid, false,
													"tree")
										}
									}
								} else {
									var k = n[i.checked];
									var h = l(n);
									a.each(h, function() {
										if (k === true) {
											j.checkRow(this.uid, false, "tree")
										} else {
											if (k === false) {
												j.uncheckRow(this.uid, false,
														"tree")
											} else {
												j.indeterminateRow(this.uid,
														false, "tree")
											}
										}
									})
								}
								var m = d[i.parent] ? d[i.parent] : null;
								this.checkRows(m, n)
							} else {
								var k = n[i.checked];
								var h = l(n);
								a.each(h, function() {
									if (k === true) {
										j.checkRow(this.uid, false, "tree")
									} else {
										if (k === false) {
											j.uncheckRow(this.uid, false,
													"tree")
										} else {
											j.indeterminateRow(this.uid, false,
													"tree")
										}
									}
								})
							}
						},
						indeterminateRow : function(c, d, b) {
							var f = this.base;
							var h = f._names();
							if (f._loading) {
								return
							}
							var e = this;
							var g = f.rowinfo[c];
							if (g) {
								g.checked = null;
								g.row[h.checked] = null;
								if (g.originalRecord) {
									g.originalRecord[h.checked] = null
								}
								if (b == undefined
										&& this.hierarchicalCheckboxes) {
									this.checkRows(g.row, g.row)
								}
								if (d !== false) {
									f._renderrows()
								}
							} else {
								var i = this.getRow(c);
								if (i) {
									f.rowinfo[c] = {
										row : i,
										checked : null
									};
									f.rowinfo[c].row[h.checked] = null;
									if (i.originalRecord) {
										f.rowinfo[c].originalRecord = i.originalRecord
									}
									if (b == undefined
											&& this.hierarchicalCheckboxes) {
										this.checkRows(i, i)
									}
									if (d !== false) {
										f._renderrows()
									}
								}
							}
						},
						uncheckRow : function(c, d, b) {
							var f = this.base;
							var h = f._names();
							if (f._loading) {
								return
							}
							var e = this;
							var g = f.rowinfo[c];
							if (g) {
								g.checked = false;
								g.row[h.checked] = false;
								if (g.originalRecord) {
									g.originalRecord[h.checked] = false
								}
								if (b == undefined
										&& this.hierarchicalCheckboxes) {
									this.checkRows(g.row, g.row)
								}
								if (d !== false) {
									f._renderrows()
								}
								f._raiseEvent("rowUncheck", {
									key : c,
									row : g.row
								})
							} else {
								var i = this.getRow(c);
								if (i) {
									f.rowinfo[c] = {
										row : i,
										checked : false
									};
									f.rowinfo[c].row[h.checked] = false;
									if (i.originalRecord) {
										f.rowinfo[c].originalRecord = i.originalRecord
									}
									f._raiseEvent("rowUncheck", {
										key : c,
										row : i
									});
									if (b == undefined
											&& this.hierarchicalCheckboxes) {
										this.checkRows(i, i)
									}
									if (d !== false) {
										f._renderrows()
									}
								}
							}
						},
						expandRows : function(c) {
							var e = this;
							if (!c) {
								return
							}
							if (e.virtualModeCreateRecords) {
								a.each(c, function() {
									var f = this;
									var g = function() {
										e.base._loading = false;
										e.expandRows(f.records)
									};
									e.base._loading = false;
									e.expandRow(f.uid, g)
								})
							} else {
								for (var d = 0; d < c.length; d++) {
									var b = c[d];
									e.expandRow(b.uid);
									e.expandRows(b.records)
								}
							}
						},
						collapseRows : function(b) {
							if (!b) {
								return
							}
							for (var c = 0; c < b.length; c++) {
								this.collapseRow(b[c].uid);
								this.collapseRows(b[c].records)
							}
						},
						expandAll : function() {
							var b = this.base;
							b.beginUpdate();
							this.expandRows(this.getRows());
							b.endUpdate()
						},
						collapseAll : function() {
							var b = this.base;
							b.beginUpdate();
							this.collapseRows(this.getRows());
							b.endUpdate()
						},
						expandRow : function(h, j) {
							var d = this.base;
							if (d._loading) {
								return
							}
							var e = d._names();
							var f = this;
							var b = d.rowinfo[h];
							if (!b) {
								var k = this.getRow(h);
								if (k) {
									d.rowinfo[h] = {
										row : k
									};
									if (k.originalRecord) {
										d.rowinfo[h].originalRecord = k.originalRecord
									}
									b = d.rowinfo[h]
								}
							}
							if (b) {
								if (b.expanded) {
									b.row[e.expanded] = true;
									return
								}
								b.expanded = true;
								b.row[e.expanded] = true;
								if (b.originalRecord) {
									b.originalRecord[e.expanded] = true
								}
								if (this.virtualModeCreateRecords
										&& !b.row._loadedOnDemand) {
									var c = function(m) {
										b.row._loadedOnDemand = true;
										if (m === false) {
											d._loading = false;
											f._hideLoadElement();
											b.leaf = true;
											b.row[e.leaf] = true;
											d._renderrows();
											if (j) {
												j()
											}
											return
										}
										for (var n = 0; n < m.length; n++) {
											m[n][e.level] = b.row[e.level] + 1;
											m[n][e.parent] = b.row;
											if (d.rowsByKey[m[n].uid]) {
												d._loading = false;
												f._hideLoadElement();
												b.leaf = true;
												b.row[e.leaf] = true;
												d._renderrows();
												if (j) {
													j()
												}
												throw new Error(
														"Please, check whether you Add Records with unique ID/Key. ")
											}
											d.rowsByKey[m[n].uid] = m[n];
											f.virtualModeRecordCreating(m[n])
										}
										if (!b.row.records) {
											b.row.records = m
										} else {
											b.row.records = b.row.records
													.concat(m)
										}
										if ((!m) || (m && m.length == 0)) {
											b.leaf = true;
											b.row[e.leaf] = true
										}
										if (b.originalRecord) {
											b.originalRecord.records = m;
											b.originalRecord[e.expanded] = true;
											if (m.length == 0) {
												b.originalRecord[e.leaf] = true
											}
										}
										d._loading = false;
										f._hideLoadElement();
										var l = d.vScrollBar.css("visibility");
										d._renderrows();
										d._updateScrollbars();
										var o = l != d.vScrollBar
												.css("visibility");
										if (d.height === "auto"
												|| d.height === null
												|| d.autoheight || o) {
											d._arrange()
										}
										d._renderhorizontalscroll();
										if (j) {
											j()
										}
									};
									if (!b.row[e.leaf]) {
										d._loading = true;
										this._showLoadElement();
										this.virtualModeCreateRecords(b.row, c);
										return
									}
								}
								if (!d.updating()) {
									var g = d.vScrollBar.css("visibility");
									d._renderrows();
									d._updateScrollbars();
									var i = g != d.vScrollBar.css("visibility");
									if (d.height === "auto"
											|| d.height === null
											|| d.autoheight || i) {
										d._arrange()
									}
									d._renderhorizontalscroll();
									d._raiseEvent("rowExpand", {
										row : b.row,
										key : h
									})
								}
							}
						},
						collapseRow : function(c) {
							var d = this.base;
							var g = d._names();
							if (d._loading) {
								return
							}
							var f = d.rowinfo[c];
							if (!f) {
								var h = this.getRow(c);
								if (h) {
									d.rowinfo[c] = {
										row : h
									};
									if (h.originalRecord) {
										d.rowinfo[c].originalRecord = h.originalRecord
									}
									f = d.rowinfo[c]
								}
							}
							if (f) {
								if (!f.expanded) {
									f.row[g.expanded] = false;
									return
								}
								f.expanded = false;
								f.row[g.expanded] = false;
								if (f.originalRecord) {
									f.originalRecord[g.expanded] = false
								}
								if (!d.updating()) {
									var b = d.vScrollBar.css("visibility");
									d._renderrows();
									d._updateScrollbars();
									var e = b != d.vScrollBar.css("visibility");
									if (d.height === "auto"
											|| d.height === null
											|| d.autoheight || e) {
										d._arrange()
									}
									d._renderhorizontalscroll();
									d._raiseEvent("rowCollapse", {
										row : f.row,
										key : c
									})
								}
							}
						}
					})
})(jqxBaseFramework);