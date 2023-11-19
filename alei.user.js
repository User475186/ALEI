// ==UserScript==
// @name         ALE Improvements
// @version      3.5
// @description  Changes to make ALE better.
// @author       mici1234, wanted2001, gCP5o
// @match        *://www.plazmaburst2.com/level_editor/map_edit.php*
// @run-at       document-end
// @icon         https://github.com/ZenoABC/ALEI/blob/main/icon.png?raw=true
// @grant        none
// ==/UserScript==

// ALE+

{

let script = document.createElement("script");

script.src = "data:text," + escape(`

// Style

let saveMap = document.getElementsByClassName("field_btn")[0];
let leftPanel = document.getElementById("left_panel");
let download = document.createElement("a");
let p = document.createElement("p");

p.style.fontSize = "16px";
p.style.fontFamily = "monospace";
p.style.color = "#eee";
p.style.backgroundColor = "#000";
p.style.padding = "6px";
p.style.width = "fit-content";
p.style.borderRadius = "4px";
p.style.wordBreak = "break-all";
p.style.position = "absolute";
p.style.left = "-100px";
p.style.top = "-100px";

document.body.append(p);

function updateStyle() {
	let topPanel = document.getElementById("top_panel");
	let rightPanel = document.getElementById("right_panel");
	let objectBoxHider = document.getElementById("objboxhider");
	let versionRights = document.getElementById("version_rights");
	let editAsText;
	let rights = document.getElementsByClassName("field_dis_left")[1];
	let mapRights = document.getElementById("maprights");
	let parambox = document.getElementById("parambox");
	let versionText = versionRights.childNodes[0];

	let buttonElements = document.getElementsByClassName("tool_btn tool_wid");

	for (let i = 0; i < buttonElements.length; i++) {
		if (buttonElements[i].style.width == "100%") {
			editAsText = buttonElements[i];
		}
	}

	topPanel.style.backgroundColor = "rgb(8, 8, 8)";
	leftPanel.style.backgroundColor = "rgb(8, 8, 8)";
	rightPanel.style.backgroundColor = "rgb(8, 8, 8)";

	topPanel.style.backgroundImage = "none";
	leftPanel.style.backgroundImage = "none";
	rightPanel.style.backgroundImage = "none";

	objectBoxHider.style.marginBottom = "4px";

	if (editAsText) {
		editAsText.style.marginTop = "4px";
	}

	versionRights.style.marginTop = "4px";
	versionRights.style.width = "240px";
	versionText.style.fontSize = "16px";
	versionText.style.fontFamily = "monospace";
	versionText.style.fontWeight = "bold";
	versionText.style.color = "#FFFF00";
	versionText.style.width = "230px";
	versionText.innerHTML = "ALEI+ by mici1234 & gCP5o";

	if (innerWidth >= 1510) {
		versionRights.style.display = "block";
	} else {
		versionRights.style.display = "none";
	}

	if (innerWidth >= 1280) {
		rights.style.display = "inline-block";
		mapRights.style.display = "inline-block";
	} else {
		rights.style.display = "none";
		mapRights.style.display = "none";
	}

	topPanel.style.height = "48px";

	leftPanel.style.top = "48px";
	rightPanel.style.top = "48px";

	document.querySelectorAll("*").forEach(elem => {
		if (elem.className != "notediv" && elem != versionText && elem != p) {
			if (elem.parentElement) {
				if (elem.parentElement.parentElement) {
					if (elem.parentElement.parentElement != parambox && elem.parentElement.className != "pa2 p_u2" && elem.parentElement.parentElement.className != "pa2 p_u2") {
						elem.style.color = "#aaa";
						elem.style.opacity = 1;
					}
				} else {
					if (elem.parentElement.parentElement != parambox && elem.parentElement.className != "pa2 p_u2") {
						elem.style.color = "#aaa";
						elem.style.opacity = 1;
					}
				}
			}

			if (elem.style.marginTop == "-100px") {
				elem.style.marginTop = "";
			}

			if (elem.getBoundingClientRect().y == 48 && elem.className == "field_btn") {
				elem.style.marginTop = "-100px";
			}

			if (elem.title) {
				elem.dataset.title = elem.title;
				elem.title = "";
			}
		}
	});
}

function downloadXML() {
	let newstr = "";

	for (let i = 0; i < es.length; i++) {
		if (es[i].exists) {
			newstr += compi_obj(i);
		}
	}

	download.href = "data:text," + escape(newstr);
	download.download = mapid_field.value + ".xml";

	download.click();
	download.href = "";
}

document.querySelectorAll("input").forEach(elem => {
	if (elem.onclick == "function onclick(event) {\\nwindow.open('../level_editor_manual/','_blank');\\n}") {
		elem.onclick = function() {
			window.open("https://eaglepb2.gitbook.io/pb2-editor-manual/");
		}

		elem.dataset.title = "Editor Manual by EaglePB2";
	}

	if (elem.onclick == "function onclick(event) {\\nTestMap()\\n}") {
		elem.onclick = function() {
			downloadXML();
		}

		elem.value = "Download XML";
	}
});

llcGIODil = "#111";
licOIODIl = "48px";

need_redraw = 1;

document.onmousedown = function() {
	setTimeout(function() {
		updateStyle();
	}, 100);
}

document.onmouseup = function() {
	setTimeout(function() {
		updateStyle();
	}, 100);
}

document.addEventListener("mousemove", e => {
	if (e.target.dataset.title) {
		p.style.left = e.clientX + 20 + "px";
		p.style.top = e.clientY + "px";
		p.innerHTML = e.target.dataset.title;

		if (p.getBoundingClientRect().height != 31) {
			p.style.left = "0px";
			p.style.left = e.clientX - 20 - p.getBoundingClientRect().width + "px";
		}
	} else if (e.target.parentElement) {
		if (e.target.parentElement.dataset.title) {
			p.style.left = e.clientX + 20 + "px";
			p.style.top = e.clientY + "px";
			p.innerHTML = e.target.parentElement.dataset.title;

			if (p.getBoundingClientRect().height != 31) {
				p.style.left = "0px";
				p.style.left = e.clientX - 20 - p.getBoundingClientRect().width + "px";
			}
		} else {
			p.style.left = "-100px";
			p.style.top = "-100px";
		}
	} else {
		p.style.left = "-100px";
		p.style.top = "-100px";
	}
});

document.body.onresize = function() {
	updateStyle();
	resize();
}

document.body.onload = function() {
	ThemeSet(THEME_DARK);
	updateStyle();
}

function findObjects(name) {
	let notFound = 1;

	for (let i = 0; i < es.length; i++) {
		es[i].selected = 0;

		if (es[i].pm.uid) {
			if (es[i].pm.uid.includes(name) && MatchLayer(es[i])) {
				es[i].selected = 1;
				notFound = 0;
			}
		}
	}

	need_GUIParams_update = 1;
	need_redraw = 1;

	setTimeout(function() {
		updateStyle();
	}, 100);

	return notFound;
}

document.addEventListener("keydown", e => {
	if (e.ctrlKey && e.code == "KeyS") {
		e.preventDefault();
		saveMap.click();
	}

	if (e.ctrlKey && e.code == "KeyF") {
		e.preventDefault();

		let name = prompt("Find objects:", "");

		if (name !== null && name !== "") {
			let notFound = findObjects(name);

			if (notFound) {
				alert("Nothing found.");
			}
		}
	}

	if (e.ctrlKey && e.code == "KeyZ") {
		setTimeout(function() {
			updateStyle();
		}, 100);
	}

	if (e.ctrlKey && e.code == "KeyY") {
		setTimeout(function() {
			updateStyle();
		}, 100);
	}

	if (e.code == "KeyR" && canvas_focus) {
		let selected = [];

		for (let i = 0; i < es.length; i++) {
			if (es[i].selected) {
				selected.push(es[i]);
			}
		}

		let minX = 1e+6;
		let minY = 1e+6;

		for (let i = 0; i < selected.length; i++) {
			if (selected[i].pm.x < minX) {
				minX = selected[i].pm.x;
			}

			if (selected[i].pm.y < minY) {
				minY = selected[i].pm.y;
			}
		}

		for (let i = 0; i < selected.length; i++) {
			if (selected[i].pm.hasOwnProperty("w")) {
				let save = selected[i].pm.w;

				selected[i].pm.w = selected[i].pm.h;
				selected[i].pm.h = save;

				let offsetX = selected[i].pm.x - minX;
				let offsetY = selected[i].pm.y - minY;

				selected[i].pm.x = minX + offsetY;
				selected[i].pm.y = minY + offsetX;
			}
		}

		need_GUIParams_update = 1;

		setTimeout(function() {
			updateStyle();
		}, 100);
	}
});

document.addEventListener("keyup", e => {
	if (e.key == "Alt") {
		e.preventDefault();
	}
});

active_layers = "";

NewNote("ALE+ by gCP5o", "#FF0");
NewNote("ALEI by mici1234", "#FF0");

// Logic

function CopyToClipBoard(ClipName) {
    var str = llcDlCl;
    var clipboard = new Array();
    for (var i = 0; i < es.length; i++)
        if (es[i].exists)
            if (es[i].selected)
                if (MatchLayer(es[i])) {
                    clipboard[clipboard.length] = es[i];
                }
    str = serialize(clipboard);
    localStorage[ClipName] = str;
}

function PasteFromClipBoard(ClipName) {
    var clipboard = new Object();
    if (localStorage[ClipName] == undefined) {
        return false;
    }
    clipboard = unserialize(localStorage[ClipName]);
    lcz();
    for (var i = 0; i < es.length; i++)
        if (es[i].exists) {
            if (es[i].selected) {
                ldn(llCGIcGIl + i + liOGlOGIl);
                lnd(llCGIcGIl + i + llODiCOil);
                es[i].selected = false;
            }
        }
    var min_x = 0;
    var max_x = 0;
    var min_y = 0;
    var max_y = 0;
    i = 0;
    var from_obj = es.length;
    while (typeof (clipboard[i]) !== llcGiOl) {
        var newparam = es.length;
        ldn(llCGIcGIl + newparam + licGICDll);
        lnd(llCGIcGIl + newparam + llcGiCDil);
        es[newparam] = new E(clipboard[i]._class);
        for (param in clipboard[i]) {
            es[newparam][param] = clipboard[i][param];
        }
        if (typeof (es[newparam].pm.x) !== llcGiOl)
            if (typeof (es[newparam].pm.y) !== llcGiOl) {
                if (i == 0) {
                    min_x = es[newparam].pm.x;
                    min_y = es[newparam].pm.y;
                    max_x = es[newparam].pm.x;
                    max_y = es[newparam].pm.y;
                    if (typeof (es[newparam].pm.w) !== llcGiOl)
                        if (typeof (es[newparam].pm.h) !== llcGiOl) {
                            min_x += es[newparam].pm.w / 2;
                            max_x += es[newparam].pm.w / 2;
                            min_y += es[newparam].pm.h / 2;
                            max_y += es[newparam].pm.h / 2;
                        }
                } else {
                    min_x = Math.min(min_x, es[newparam].pm.x);
                    min_y = Math.min(min_y, es[newparam].pm.y);
                    max_x = Math.max(max_x, es[newparam].pm.x);
                    max_y = Math.max(max_y, es[newparam].pm.y);
                    if (typeof (es[newparam].pm.w) !== llcGiOl)
                        if (typeof (es[newparam].pm.h) !== llcGiOl) {
                            max_x = Math.max(max_x, es[newparam].pm.x + es[newparam].pm.w);
                            max_y = Math.max(max_y, es[newparam].pm.y + es[newparam].pm.h);
                        }
                }
            }
        i++;
    }
    ldn(lICGicDll);
    ldn(llODiCGil);
    ldn(lICOIcDIl);
    lnd(llCOlcDIl);
    lnd(llOGiODIl);
    lnd(lICDiCOIl);
    ldis = true;
    paint_draw_mode = true;
    quick_pick_ignore_one_click = true;
    m_drag_x = mouse_x;
    m_drag_y = mouse_y;
    lmdrwa = lmwa;
    lmdrwb = lmwb;
    var lo_x = lmwa - (max_x + min_x) / 2;
    var lo_y = lmwb - (max_y + min_y) / 2;
    for (var i2 = from_obj; i2 < es.length; i2++) {
        if (typeof (es[i2].pm.uid) !== llcGiOl) {
            var old_uid = es[i2].pm.uid;
            es[i2].exists = false;
            es[i2].pm.uid = RandomizeName(es[i2].pm.uid);
            es[i2].exists = true;
            for (var i3 = from_obj; i3 < es.length; i3++) {
                for (param in es[i3].pm) {
                    if (typeof (es[i3].pm[param]) == llcGICl) {
                        if (es[i3].pm[param] == old_uid) {
                            es[i3].pm[param] = es[i2].pm.uid;
                        }
                    }
                }
            }
        }
        if (typeof (es[i2].pm.x) !== llcGiOl)
            if (typeof (es[i2].pm.y) !== llcGiOl) {
                lnd(llCGIcGIl + i2 + llcGiODil + es[i2].pm.x + liODlcGIl);
                lnd(llCGIcGIl + i2 + liODlcDil + es[i2].pm.y + liODlcGIl);
                es[i2].pm.x += lo_x;
                es[i2].pm.y += lo_y;
                es[i2].fixPos();
                ldn(llCGIcGIl + i2 + llcGiODil + es[i2].pm.x + liODlcGIl);
                ldn(llCGIcGIl + i2 + liODlcDil + es[i2].pm.y + liODlcGIl);
            }
    }
    lfz(false);
    return true;
}

function setletedit(val1, val2, defval) {
    quick_pick = false;
    quick_pick_ignore_one_click = false;
	if (val1.indexOf) {
		if (val1.indexOf(lIOGiCOl) != -1) {
			defval = Math.abs(Number(defval));
			var txt = prompt(lIODlODil, defval);
			var gotval;
			if (txt == null || txt == llcDlCl) {
				gotval = Math.abs(defval);
			} else {
				gotval = Math.abs(txt);
			}
			val1 = eval(val1.replace(lIOGiCOl, gotval));
			val2 = val2.replace(llOGICDil, gotval);
		} else if (val1.indexOf(lICOlCOil) != -1) {
			defval = Math.abs(Number(defval));
			var gotval = prompt(liCDlcDil, defval);
			if (gotval.charAt(0) != llOGICDil) {
				gotval = llOGICDil + gotval;
			}
			if (gotval.length != 7)
				alert(liCGICDll + gotval + licOiOOil);
			val1 = val1.replace(lICOlCOil, gotval);
			val2 = val2.replace(llOGICDil, gotval);
		}
	}
    ff.value = llOGIcDIl + val1 + llCGICOIl + val2 + llOOICDll;
    lettarget.innerHTML = ff.value;
    ff.style.display = lIOGIOGll;
    ff_drop.style.display = lIOGIOGll;
    letediting = false;
    UpdatePhysicalParam((lettarget.id.replace(lIcDIOOIl, llcDlCl)), val1);
    var parameter_updated = lettarget.id.replace(lIcDIOOIl, llcDlCl);
    if (parameter_updated == lICGICl || (parameter_updated.indexOf(llCDiOOl) != -1 && parameter_updated.indexOf(licOIcGl) != -1))
        StreetMagic();
}

function stopedit(e) {
	if (e) {
		if (e.keyCode == 13 && e.type == "keydown") {
			let chvalue = ff.value;

			if (!isNaN(Number(chvalue))) {
				UpdatePhysicalParam((lettarget.id.replace(lIcDIOOIl, llcDlCl)), Number(chvalue));

				lettarget.innerHTML = chvalue;

				need_GUIParams_update = 1;

				setTimeout(function() {
					updateStyle();
				}, 100);
			} else {
				chvalue = chvalue.replaceAll("<", "&lt;");
				chvalue = chvalue.replaceAll(">", "&gt;");
				chvalue = chvalue.replaceAll('"', "&quot;");

				UpdatePhysicalParam((lettarget.id.replace(lIcDIOOIl, llcDlCl)), chvalue);

				lettarget.innerHTML = chvalue;

				need_GUIParams_update = 1;

				setTimeout(function() {
					updateStyle();
				}, 100);
			}
		}
	}
}

function UpdatePhysicalParam(paramname, chvalue) {
    lcz();
    var layer_mismatch = false;
    var list_changes = llcDlCl;
    for (var elems = 0; elems < es.length; elems++)
        if (es[elems].exists)
            if (es[elems].selected) {
                if (es[elems].pm.hasOwnProperty(paramname)) {
                    if (MatchLayer(es[elems])) {
                        var lup = (typeof (paramname) == llcGICl) ? llcOIODll + paramname + llcOIODll : paramname;
                        if (typeof (chvalue) == lICDIODIl || chvalue == 0) {
                            lnd(llCGIcGIl + elems + llCDlODll + lup + licDICOIl + es[elems].pm[paramname] + liODlcGIl);
                            ldn(llCGIcGIl + elems + llCDlODll + lup + licDICOIl + chvalue + liODlcGIl);

							if (chvalue !== "") {
								es[elems].pm[paramname] = Number(chvalue);
							} else {
								es[elems].pm[paramname] = "";
							}
                        } else if (typeof (chvalue) == llcGICl) {
                            lnd(llCGIcGIl + elems + llCDlODll + lup + llCGicOIl + es[elems].pm[paramname] + llOGicGIl);
                            ldn(llCGIcGIl + elems + llCDlODll + lup + llCGicOIl + chvalue + llOGicGIl);
                            es[elems].pm[paramname] = chvalue;
                        } else {
                            alert(llOOlCOll + typeof (chvalue));
                        }
                        list_changes += llODlOOIl + paramname + lIcOicDil + (es[elems].pm.uid != null ? es[elems].pm.uid : es[elems]._class) + llOGIOGil + chvalue + llcGICOil;
                    } else
                        layer_mismatch = true;
                }
            }
    need_redraw = true;
    NewNote(llCGicDll + list_changes, note_passive);
    if (layer_mismatch)
        NewNote(liCDlcGll, note_neutral);
    lfz(false);
}

document.addEventListener("keydown", e => {
	if (e.code == "AltLeft" && letediting) {
		let value = prompt("Enter string-value:", "");

		if (value !== null) {
			setletedit(value, "Custom Value", "");

			need_GUIParams_update = 1;

			setTimeout(function() {
				updateStyle();
			}, 100);
		}
	}

	if (e.code == "AltRight") {
		let value = prompt("Enter snapping:", "");

		if (value !== null) {
			GridSnappingSet(Math.round(value * 10));

			setTimeout(function() {
				updateStyle();
			}, 100);
		}
	}
});

function DeleteSelection() {
    lcz();
    for (var i = 0; i < es.length; i++)
        if (es[i].exists)
            if (es[i].selected)
                if (MatchLayer(es[i])) {
                    ldn(llCGIcGIl + i + liCDlODIl + i + llcGiCDil);
                    lnd(llCGIcGIl + i + llCOlODIl + es[i].selected + liOGicGll + i + lIcOICDll + es[i].exists + liODlcGIl);
                }
    lfz(true);
    need_GUIParams_update = true;
    need_redraw = true;

	setTimeout(function() {
		updateStyle();
	}, 100);
}

console.clear();

`);

document.body.append(script);

}

// ALEI

{

// Shorthand things
function $id(id) {
    return document.getElementById(id);
}
function $query(selector) {
    return document.querySelector(selector);
}

const stylesheets = document.styleSheets;
const INFO = 0
const DEBUG = 1

let aleiSettings = {
    rightPanelSize: "30vw",
    inpValueWidth: "100%",
    triggerEditTextSize: "12px",
    starsImage: "stars2.jpg",
    logLevel: 0,
    showTriggerIDs: false
}
let levelToNameMap = {
    0: "INFO",
    1: "DEBUG"
}

function aleiLog(level, text) {
    if (level <= aleiSettings.logLevel)
        console.log(`[ALEI:${levelToNameMap[level]}]: ${text}`)
}
aleiLog(INFO, "Starting up...");

// Original functions, globally saved here if needed
// JS_ prefix for JavaScript ones, ALE_ for ALE ones
let JS_setTimeout = window.setTimeout;

let aleiSessionID = null; // ID of this session
let aleiSessionList = []; // Set of known session IDs

function updateParameters() {
    // Adds parameters that game accepts but does not exist in ALE.
    function add(key, type, name, objType) {
        param_type[param_type.length] = [key, type, name, "", objType];
    }
    add("moving", "bool", "Is Moving?", "door");
    add("tarx", "value", "Target X", "door");
    add("tary", "value", "Target Y", "door");
}

function updateSounds() {
    // Adds sounds that exist in game but not in ALE
    let SVTS = special_values_table["sound"];
    SVTS['am_base'] = 'Indoor Ambience';
    SVTS['am_wind'] = 'Outdoor Ambience';
    SVTS['android2_die'] = 'DT-148 - Death';
    SVTS['android2_hurt'] = 'DT-148 - Hurt';
    SVTS['android2_welcome2'] = 'DT-148 - Alerted';
    SVTS['arrin_death1'] = 'Arrin - Death';
    SVTS['arrin_dying'] = 'Arrin - Dying';
    SVTS['arrin_hurt1'] = 'Arrin - Hurt 1';
    SVTS['arrin_hurt2'] = 'Arrin - Hurt 2';
    SVTS['arrin_welcome1'] = 'Arrin - Alerted 1';
    SVTS['arrin_welcome2'] = 'Arrin - Alerted 2';
    SVTS['arrin_welcome3'] = 'Arrin - Alerted 3';
    SVTS['bounce_bullet'] = 'Falkonian PSI Cutter - Shot Bounce';
    SVTS['dart4'] = 'Medic Pistol';
    SVTS['exp_event_stop'] = 'EXP - Stop';
    SVTS['exp_level'] = 'EXP - Level Up';
    SVTS['exp_tick'] = 'EXP - Gain';
    SVTS['gameplay_song'] = 'Katharsys - Erges';
    SVTS['gravitator2'] = 'Floor gravitator noice';
    SVTS['helm_proxy_alert_over_hereB'] = 'Proxy - Over here!';
    SVTS['helm_proxy_alert_take_coverB'] = 'Proxy - Take cover!';
    SVTS['helm_proxy_alert_up_thereA'] = 'Proxy - Up there!';
    SVTS['helm_proxy_death3'] = 'Proxy - Death 1';
    SVTS['helm_proxy_death4'] = 'Proxy - Death 2';
    SVTS['helm_proxy_death5'] = 'Proxy - Death 3';
    SVTS['helm_proxy_death6'] = 'Proxy - Death 4';
    SVTS['helm_proxy_dyingC'] = 'Proxy - Help! 1';
    SVTS['helm_proxy_dyingF'] = 'Proxy - Help! 2';
    SVTS['helm_proxy_enemy_down_fantasticA'] = 'Proxy - Fantastic.';
    SVTS['helm_proxy_enemy_down_got_oneD'] = 'Proxy - Got one.';
    SVTS['helm_proxy_enemy_down_niceA'] = 'Proxy - Nice. 1';
    SVTS['helm_proxy_enemy_down_niceC'] = 'Proxy - Nice. 2';
    SVTS['helm_proxy_hurt11'] = 'Proxy - Hurt 1';
    SVTS['helm_proxy_hurt12'] = 'Proxy - Hurt 2';
    SVTS['helm_proxy_hurt13'] = 'Proxy - Hurt 3';
    SVTS['helm_proxy_hurt14'] = 'Proxy - Hurt 4';
    SVTS['helm_proxy_hurt15'] = 'Proxy - Hurt 5';
    SVTS['helm_proxy_hurt17'] = 'Proxy - Hurt 6';
    SVTS['helm_proxy_hurt4'] = 'Proxy - Hurt 7';
    SVTS['helm_proxy_hurt5'] = 'Proxy - Hurt 8';
    SVTS['helm_proxy_hurt8'] = 'Proxy - Hurt 9';
    SVTS['helm_proxy_hurt9'] = 'Proxy - Hurt 10';
    SVTS['hexagon_death1'] = 'Hexagon - Death 1';
    SVTS['hexagon_death2'] = 'Hexagon - Death 2';
    SVTS['hexagon_pain1'] = 'Hexagon - Hurt 1';
    SVTS['hexagon_pain2'] = 'Hexagon - Hurt 2';
    SVTS['hexagon_pain3'] = 'Hexagon - Hurt 3';
    SVTS['hexagon_pain4'] = 'Hexagon - Hurt 4';
    SVTS['hexagon_welcome1'] = 'Hexagon - Alerted 1';
    SVTS['hexagon_welcome2'] = 'Hexagon - Alerted 2';
    SVTS['hexagon_welcome3'] = 'Hexagon - Alerted 3';
    SVTS['main_song'] = 'NPhonix - Antigravity';
    SVTS['orakin_death1'] = 'Orakin - Death 1';
    SVTS['orakin_death2'] = 'Orakin - Death 2';
    SVTS['orakin_hurt'] = 'Orakin - Hurt';
    SVTS['orakin_welcome'] = 'Orakin - Alerted';
    SVTS['proxy_alert_over_hereB'] = 'No Helm Proxy - Over here!';
    SVTS['proxy_alert_take_coverB'] = 'No Helm Proxy - Take cover!';
    SVTS['proxy_alert_up_thereA'] = 'No Helm Proxy - Up there!';
    SVTS['proxy_death3'] = 'No Helm Proxy - Death 1';
    SVTS['proxy_death4'] = 'No Helm Proxy - Death 2';
    SVTS['proxy_death5'] = 'No Helm Proxy - Death 3';
    SVTS['proxy_death6'] = 'No Helm Proxy - Death 4';
    SVTS['proxy_dyingC'] = 'No Helm Proxy - Help! 1';
    SVTS['proxy_dyingF'] = 'No Helm Proxy - Help! 2 ';
    SVTS['proxy_enemy_down_fantasticA'] = 'No Helm Proxy - Fantastic.';
    SVTS['proxy_enemy_down_got_oneD'] = 'No Helm Proxy - Got one.';
    SVTS['proxy_enemy_down_niceA'] = 'No Helm Proxy - Nice. 1';
    SVTS['proxy_enemy_down_niceC'] = 'No Helm Proxy - Nice. 2';
    SVTS['proxy_hurt11'] = 'No Helm Proxy - Hurt 1';
    SVTS['proxy_hurt12'] = 'No Helm Proxy - Hurt 2';
    SVTS['proxy_hurt13'] = 'No Helm Proxy - Hurt 3';
    SVTS['proxy_hurt14'] = 'No Helm Proxy - Hurt 4';
    SVTS['proxy_hurt15'] = 'No Helm Proxy - Hurt 5';
    SVTS['proxy_hurt17'] = 'No Helm Proxy - Hurt 6';
    SVTS['proxy_hurt4'] = 'No Helm Proxy - Hurt 7';
    SVTS['proxy_hurt5'] = 'No Helm Proxy - Hurt 8';
    SVTS['proxy_hurt8'] = 'No Helm Proxy - Hurt 9';
    SVTS['proxy_hurt9'] = 'No Helm Proxy - Hurt 10';
    SVTS['silk_alert_contactA'] = 'Silk - Contact!';
    SVTS['silk_alert_i_see_oneA'] = 'Silk - I see one.';
    SVTS['silk_alert_there_is_oneA'] = 'Silk - There is one...!';
    SVTS['silk_death1B'] = 'Silk - Death 1';
    SVTS['silk_death2B'] = 'Silk - Death 2';
    SVTS['silk_dyingB'] = 'Silk - Not good...';
    SVTS['silk_enemy_down_brilliantC'] = 'Silk - Brilliant.';
    SVTS['silk_enemy_down_eliminatedB'] = 'Silk - Eliminated.';
    SVTS['silk_enemy_down_hell_yeahB'] = 'Silk - Hell yeah!';
    SVTS['silk_enemy_down_ive_got_oneB'] = 'Silk - I got one!';
    SVTS['silk_enemy_down_minus_oneB'] = 'Silk - -1.';
    SVTS['silk_enemy_down_no_kicking_for_youB'] = 'Silk - No kicking for you.';
    SVTS['silk_hurt1B'] = 'Silk - Hurt 1';
    SVTS['silk_hurt2B'] = 'Silk - Hurt 2';
    SVTS['silk_hurt5'] = 'Silk - Hurt 3';
    SVTS['silk_hurt6'] = 'Silk - Hurt 4';
    SVTS['silk_hurt9B'] = 'Silk - Hurt 5';
    SVTS['wea_crossfire2'] = 'Crossfire CR-145 Vortex';
    SVTS['wea_ditzy_cs_ik'] = 'Assault Rifle CS-IK';
    SVTS['wea_glhf'] = 'Grenade Launcher CS-GLHF';
    SVTS['wea_incompetence_archetype_27xx_fire'] = 'Archetype 27XX';
    SVTS['wea_lazyrain_gravy_rl'] = 'Falkonian Anti-Grav Rocket Launcher';
    SVTS['wea_m202'] = 'Rocket Launcher CS-Barrage';
    SVTS['wea_moonhawk_railgun'] = 'Crossfire CR-34 Marauder';
    SVTS['wea_ph01'] = 'Crossfire CR-54 Viper';
    SVTS['wea_plasma_shotgun'] = 'Plasma Shotgun';
    SVTS['wea_rail_alt2'] = 'Falkonian PSI Cutter';
    SVTS['wea_thetoppestkek_shotgun_nxs25'] = 'Shotgun NXS-25';
    SVTS['xin_celebrate'] = 'Xin - Celebrating';
    SVTS['xin_death'] = 'Xin - Death';
    SVTS['xin_enemy_spotted'] = 'Xin - Alerted';
    SVTS['xin_hit'] = 'Xin - Hurt';
    let groskVoices = [
        ["death", "Death", 2],
        ["dying", "Dying", 2],
        ["edown", "Celebrating", 3],
        ["welcome", "Alerted", 5],
        ["hurt", "Hurt", 3]
    ];
    for (let i = 0; i < groskVoices.length; i++) {
        let voice = groskVoices[i];
        for (let j = 1; j <= voice[2]; j++) {
            SVTS["grosk_" + voice[0] + j] = "Grosk - " + voice[1] + " " + j;
        }
    }
}

function updateVoicePresets() {
    // Adds voice presets that exist in game but not in ALE
    let VP = special_values_table['voice_preset'];
    VP['proxy_helmetless'] = 'Proxy (helmetless)';
    VP['silk'] = 'Silk';
    VP['orakin'] = 'Orakin';
    VP['arrin'] = 'Arrin';
    VP['civilian_male'] = 'Civilian Male';
    VP['vulture'] = 'Vulture';
    VP['crossfire_sentinel'] = 'Crossfire Sentinel';
    VP['xin'] = 'Xin';
    VP["grosk"] = "Grosk";
}

function updateStyles() {
    // Changes some stylesheets to open up to things like resizable right panel.
    for(let i1 = 0; i1 < stylesheets.length; i1++) {
        let styleSheet = stylesheets[i1];
        for (let i2 = 0; i2 < styleSheet.rules.length; i2++) {
            let rule = styleSheet.rules[i2];
            switch(rule.selectorText) {
                case ".p_i":
                    rule.style.setProperty("display", "flex");
                    break;
                case ".rightui":
                    rule.style.setProperty("width", aleiSettings.rightPanelSize);
                    break;
                case ".pa1":
                    rule.style.setProperty("flex-grow", 0);
                    rule.style.setProperty("flex-shrink", 0);
                    break;
                case ".pa2":
                    rule.style.setProperty("width", "100%");
                    break;
                case ".opcode_field":
                    rule.style.setProperty("font-size", aleiSettings.triggerEditTextSize);
                    break;
                case "#rparams":
                    rule.style.setProperty("height", "var(--ALEI_RPARAMS_HEIGHT)");
                    break;
                default:
                    break;
            }
        }
    }
    $id("stars").style.setProperty("background-image", `url(${aleiSettings.starsImage})`)
    let _th = THEME;
    ThemeSet(THEME_BLUE);
    ThemeSet(_th);
}

function updateSkins() {
    // Adds skins that exist in game but not in ALE.
    let charlists = [
        [10, "Head Gib"],
        [20, "Arm Gib"],
        [30, "Leg Gib"],
        [50, "Heavy Hero (Only Head and Arms)"],
        [60, "Proxy (Only Head and Arms)"],
        [62, "Proxy (No Limbs)"],

        [38, "GoldenKnife Noir Lime"],
        [39, "RootZ Noir Lime"],

        [151, "Purple Xin"],
        [152, "Golden Xin"],
        [153, "Blue Xin"],
        [154, "Red Xin"],
        [155, "Amber Xin"],

        [156, "Nirvana Noir Lime"],

        [157, "Purple Gallynew"],
        [158, "Golden Gallynew"],
        [159, "Blue Gallynew"],
        [160, "Red Gallynew"],
        [161, "Amber Gallynew"],

        [162, "Pinkine"],
        [163, "Oryx"],
        [164, "Blue Heavy Hero"],
        [165, "Red Heavy Hero"],
        [166, "Orakin"],
        [167, "Husk"],
        [168, "Hex"],
        [169, "Arrin"],
        [170, "Heavy Usurpation Soldier"],

        [171, "Cyber Grub by S1lk"],
        [172, "Grosk"],
        [173, "Futuristic Knight"],
        [174, "Uncivil Proxy"],
        [175, "Nexxon Contractor"],
        [176, "Assimilated Reakhohsha Operative"],
        [177, "Slayer"],

        [178, "Nexxon Captain"],
        [179, "Savage Falkok"],
        [180, "Savage Phoenix"]

    ]
    for(let li = 0; li < charlists.length; li++) {
        let charID = charlists[li][0];
        let paddedCharID = charID.toString().padStart(4, "0")
        let charName = charlists[li][1];
        let src = "https://www.plazmaburst2.com/level_editor/chars_full/char" + paddedCharID + ".png"
        special_values_table['char'][charID] = '<span style=\'background:url(' + src + '); width: 16px; height: 16px; display: inline-block; background-position: center; background-position-x: 30%; background-position-y: 26%; background-size: 67px;vertical-align: -4px;\'></span> ' + charName;
        img_chars_full[charID] = new Image();
        img_chars_full[charID].src = 'chars_full/char' + paddedCharID + '.png';
    }
}

function optimize() {
    // VSync.
    window.setTimeout = (f, ms) => {
        if (f == ani) {window.requestAnimationFrame(ani)}
        else return JS_setTimeout(f, ms);
    }
    let _browseImages = window.BrowseImages;
    let ogImageLists = {};
    // Image caching.
    window.BrowseImages = function(for_class = 'bg_model', current_value = '', callback = null) {
        // If cache doesn't have the class we are looking for, we will just set default value.
        if (ogImageLists[for_class] == undefined) {
            ogImageLists[for_class] = "[ALEI] Loading...";
            aleiLog(INFO, `Will cache response of ${for_class}`);
        }
        // Overwrite setTimeout temporarily, as BrowseImages calls setTimeout for ServerRequest which sets the innerHTML of image_list
        let ost = window.setTimeout;
        window.setTimeout = (f, ms) => {
            window.setTimeout = ost; // Assign original setTimeout
            setTimeout(() => { // Make function that calls original function and sets cache.
                f();
                ogImageLists[for_class] = image_list.innerHTML;
            }, ms);
        }
        _browseImages(for_class, current_value, callback);
        image_list.innerHTML = ogImageLists[for_class]; // Show what is in cache. (If cache didn't have the class, it will just show the previously set default value)
    }
}

function updateVehicles() {
    // Adding vehicles that exist in game but not in ALE. Currently only veh_hh, which is grabbable ledge.
    let _SVTV = special_values_table["vehicle_model"];
    let vehicles = [
        ["veh_hh", "Grabbable Ledge", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACLSURBVEhLYxhxgBFE2M3/r/vvH0MQWISGgImJYd2hRMbLIDbYYpu5/+t/MzEEf2diuALi0wJw/mPQYf3HsPZIMmMjiA+3+BMLg/olIYblID4tgN47hki+Pww3YRYzgUUHAIxaTDcwajHdwKjFdAOjFtMNjFpMNzBqMd3AqMV0AwPbrh6InsQAAQYGAA8CLDKAAcpOAAAAAElFTkSuQmCC"]
    ]
    for(let i = 0; i < vehicles.length; i++) {
        let vehicle = vehicles[i];
        let model = vehicle[0];
        let name = vehicle[1];
        let image = vehicle[2];
        _SVTV[model] = `<img src='${image}' border=0 height=12 style=vertical-align:middle title='${name}' > ${name}`
        img_vehicles[model] = new Image();
        img_vehicles[model].src = image;
    }
}

function updateGuns() {
    // Adds guns that exist in game but not in ALE. Currently only one isn't visible in ALE, and that is joke weapon: NARL
    let guns = [
        ["gun_rl0", "BETA Rocket Launcher", "data:image/png;base64,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"]
    ];
    for(let i = 0; i < guns.length; i++) {
        let gun = guns[i];
        let gun_model = gun[0];
        let gun_name = gun[1];
        let gun_image = gun[2];
        special_values_table["gun_model"][gun_model] = `<img src='${gun_image}' border=0 width=80 height=20 style=vertical-align:baseline title='${gun_name}'>`
        img_guns[gun_model] = new Image();
        img_guns[gun_model].src = gun_image;
    }
}

function updateDecors() {
    // Adds decors that exist in game, but not in ALE. Currently only hakase easter egg is known.
    let decors = [
        ["hakase", "Hakase", "data:image/png;base64,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"]
    ];
    for(let i = 0; i < decors.length; i++) {
        let decor = decors[i];
        let decor_model = decor[0];
        let decor_name = decor[1];
        let decor_image = decor[2];
        special_values_table["decor_model"][decor_model] = decor_name; // Add to known decors.
        img_decors[decor_model] = new Image();
        img_decors[decor_model].src = decor_image;
        CACHED_DECORS[decor_model] = img_decors[decor_model];
        CUSTOM_IMAGES_APPROVED[decor_model] = true; // Since it's obviously vanilla, and other vanilla decors are approved, it's only natural if we approve added decors too
    }
    let _serverRequest = ServerRequest;
    window.ServerRequest = function(req, op, callback) {
        let addDecors = false;
        if (req.indexOf("a=get_images") != -1 && req.indexOf("for_class=decor_model") != -1) addDecors = true; // We don't want to mess with background business, only decors
        _serverRequest(req, op, callback);
        if (addDecors) {
            let list_native = $id("list_native");
            for(let i = 0; i < decors.length; i++) {
                let decor = decors[i];
                let decor_model = decor[0];
                let decor_name = decor[1];
                let decor_image = decor[2];
                try {list_native.innerHTML += `
                <div class="img_option img_option_selected" onClick="CustomImageSelected('${decor_model}', '${decor_name}' )">
                     <div class="imgdiv" style="background:url(${decor_image})"></div>
                     <div>
                         ${decor_name}
                     </div>
                </div>
                `} catch(e) {} // We assume we are not in decor list yet.
            }
            aleiLog(DEBUG, "Updated decor list.");
        }
    }
}

function updateOffsets() {
    // Because hakase decor and grabbable ledge image is made with hand manually and doesn't come from website, and that there is no
    // inbuilt offset, we have to offset those to make sure they show up in ALE correctly.
    let toosc = window.ThinkOfOffsetClass;
    window.ThinkOfOffsetClass = function(tc, esi) {
        if (tc == "vehicle" && offsets[esi.pm.model] != undefined) {
            return "alei_" + esi.pm.model;
        } else if (tc == "decor" && offsets[esi.pm.model] != undefined) {
            return "alei_" + esi.pm.model;
        } else return toosc(tc, esi);
    }
    let offsets = {
        veh_hh: {x: -15, y: -15, w: 30, h: 30},
        hakase: {x: -18, y: -57, w: 40, h: 60}
    }
    for (let key in offsets) {
        let off = offsets[key];
        lo_x["alei_" + key] = off.x;
        lo_y["alei_" + key] = off.y;
        lo_w["alei_" + key] = off.w;
        lo_h["alei_" + key] = off.h;
    }
}

function updateTriggers() {
    // This is where we will rename some triggers.
    // For now it's only 378, but we got more triggers like renaming 328
    addTrigger(378, "Gun &#8250; Add hex color 'B' to gun 'A'", "gun", "string");
}

function updateObjects() {
    // Shorthand for object-related functions as to not clutter console.
    updateGuns();
    updateVehicles();
    updateDecors();
    updateTriggers();
}

function updateButtons() {
    let topPanel = $id("top_panel");
    let childs = topPanel.children;

    // We will pad buttons, so we'll make our own pad and keep them here for now
    let bigPad = document.createElement("div");
    bigPad.setAttribute("class", "q3");

    let pad = document.createElement("div");
    pad.setAttribute("class", "q");

    // We dont want our new buttons to appear after "rights", so we will store "rights" beforehand and remove them, we'll add them back once we are done
    let appendBack = (topPanel.removeChild(childs[childs.length - 1])).outerHTML;
    appendBack = (topPanel.removeChild(childs[childs.length - 1])).outerHTML + appendBack;

    // Remove pad (we will add our own later).
    topPanel.removeChild(childs[childs.length - 1])

    window.aleiButtonClicks = {};

    // Convenience function for doing easy top panel buttons
    function createButton(text, internalName, onClick) {
        let button = document.createElement("input");
        button.setAttribute("class", "field_btn");
        button.setAttribute("type", "button");
        button.setAttribute("value", text);
        button.setAttribute("onclick", `aleiButtonClicks['${internalName}']()`);
        window.aleiButtonClicks[internalName] = onClick;
        topPanel.appendChild(button);
        topPanel.appendChild(pad);
    }
    topPanel.appendChild(bigPad);

    // Readd 'rights' back.
    topPanel.innerHTML += appendBack;
    // Update original reference
    window.mapid_field = $id("mapid_field");

	if (mapid) {
		mapid_field.value = mapid; // And update map id field value manually.
	}
}

function addPropertyPanelResize() {
    // Gives right panel ability to be resized.

    let splitter_is_down = false;
    const splitter = document.createElement("div");
    const root = document.documentElement;

    splitter.style.position = "absolute";
    splitter.style.width = "5px";
    splitter.style.top = "50px";
    splitter.style.height = "100%";
    splitter.style.cursor = "w-resize";
    // splitter.style["background-color"] = "black";
    $id('floattag').appendChild(splitter);

    function splitter_resize(e) {
        let new_width = Math.min(root.clientWidth - 100, Math.max(100, root.clientWidth - e.clientX));
        right_panel.style.width = new_width + 'px';
        splitter.style.right = new_width + 'px';
    }

    splitter.addEventListener('mousedown', (e) => {
        splitter_is_down = true;
    });

    root.addEventListener('mouseup', (e) => {
        splitter_is_down = false;
        localStorage['RIGHT_PANEL_WIDTH'] = right_panel.clientWidth + 'px';
    });

    root.addEventListener('mousemove', (e) => {
        if (splitter_is_down) splitter_resize(e);
    });

    if (localStorage['RIGHT_PANEL_WIDTH'] != undefined)
        aleiSettings.rightPanelSize = localStorage['RIGHT_PANEL_WIDTH'];

    splitter.style.right = aleiSettings.rightPanelSize;
    window.splitter = splitter;
}

function addTriggerIDs() {
    if (!aleiSettings.showTriggerIDs) return;

    let SVTTP = special_values_table['trigger_type'];
    for (let i in SVTTP) {
        SVTTP[i] = i + " " + SVTTP[i];
    }
}

function patchShowHideButton() {
    let og = window.ShowHideObjectBox;
    window.ShowHideObjectBox = function() {
        let height = "";
        if(ObjectBox_visible) { // This will be not visible.
            height = "calc(100vh - 155px)";
        } else { // This will be visible.
            height = "calc(100vh - 270px)";
        }
        // We then set variable and call original function.
        document.documentElement.style.setProperty("--ALEI_RPARAMS_HEIGHT", height);
        og();
    }
    ShowHideObjectBox();
    ShowHideObjectBox(); // Hacky way to fix bug
}

function addSnappingOptions_helper() {
    // Remove default snapping options except for "1", we will replace it them later
    $query(`a[onmousedown="GridSnappingSet(50);"]`).remove();
    $query(`a[onmousedown="GridSnappingSet(100);"]`).remove();

    let newHTML = ""
    let snappingOptions = [
        1,  5, 10,
        40, 50, 100
    ];

    for (let snappingIndex in snappingOptions) {
        let snapping = snappingOptions[snappingIndex];

        if ((snappingIndex % 3 == 0) && (snappingIndex != 0)) {
            // We have to break into new row.
            newHTML += "<br>";
        }

        let element = document.createElement("a");
        // Set relevant attributes.
        element.innerHTML = snapping / 10;
        let toolClass = "tool_btn";
        if (GRID_SNAPPING == snapping) {
           toolClass = "tool_btn2";
        }
        element.setAttribute("class", `${toolClass} tool_wid`);
        element.setAttribute("style", "width: 21px;");
        element.setAttribute("onmousedown", `GridSnappingSet(${snapping})`);
        newHTML += element.outerHTML;
        // Add to main HTML.
    }
    // Replace original `1` snapping with new HTML.
    $query(`a[onmousedown="GridSnappingSet(10);"]`).outerHTML = newHTML;
}

function onToolUpdate() {
    // Thanks eric.
    addSnappingOptions_helper();
}

function patchUpdateTools() {
    let ut = UpdateTools;
    window.UpdateTools = function() {
        ut();
        onToolUpdate();
    }
    UpdateTools();
    aleiLog(DEBUG, "Patched updateTools.");
}

(async function() {
   'use strict';
    // Handling rest of things
    addPropertyPanelResize();
    updateStyles();
    updateSkins();
    updateSounds();
    updateVoicePresets();
    updateParameters();
    updateOffsets();
    updateObjects();
    updateButtons();
    addTriggerIDs();
    patchShowHideButton();
    optimize();
    patchUpdateTools();
    NewNote("ALEI: Welcome!", "#7777FF");
    aleiLog(INFO, "Welcome!")
})();

}
