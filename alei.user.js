// Insert XML

function toNumber(x) {
	if (!isNaN(Number(x))) {
		return Number(x);
	} else {
		return x;
	}
}

function insertXML(xml) {
	xml = "<map>" + xml.replaceAll("&", "&amp;") + "</map>";
	
	let parser = new DOMParser();
	let map = parser.parseFromString(xml, "application/xml");
	let objects = map.querySelectorAll("*");
	
	for (let i = 1; i < objects.length; i++) {
		let object = new E(objects[i].tagName);
		
		for (let j = 0; j < objects[i].attributes.length; j++) {
			let name = objects[i].attributes[j].name;
			let value = objects[i].attributes[j].value;
			
			object.pm[name] = toNumber(value);
		}
		
		es.push(object);
	}
}

// Show same parameters of selection with same type of objects

function setParameter(index, value) {
	let rightParams = document.getElementById("rparams");
	
	rightParams.childNodes[index].childNodes[1].innerHTML = value;
}

function getSelection() {
	let objects = [];
	
	for (let i = 0; i < es.length; i++) {
		if (es[i].selected) {
			objects.push(es[i]);
		}
	}
	
	return objects;
}

function areObjectsOfSameType(objects) {
	let same = 1;
	
	for (let i = 0; i < objects.length; i++) {
		if (objects[i]._class != objects[0]._class) {
			same = 0;
		}
	}
	
	return same;
}

function removeSameItems(array) {
	return Array.from(new Set(array));
}

function removeItems(array, items) {
	let copy = JSON.parse(JSON.stringify(array));
	
	for (let i = 0; i < items.length; i++) {
		copy.splice(copy.indexOf(items[i]), 1);
	}
	
	return copy;
}

function parameterNamesToIndexes(parameters, objectParameters) {
	let indexes = [];
	
	for (let i = 0; i < parameters.length; i++) {
		indexes.push(objectParameters.indexOf(parameters[i]));
	}
	
	return indexes;
}

function getSameParameters(objects) {
	let differentParameters = [];
	let parameters = Object.keys(objects[0].pm);
	
	for (let i = 0; i < objects.length; i++) {
		for (let j = 0; j < parameters.length; j++) {
			if (objects[i].pm[parameters[j]] != objects[0].pm[parameters[j]]) {
				differentParameters.push(parameters[j]);
			}
		}
	}
	
	differentParameters = removeSameItems(differentParameters);
	differentParameters = removeItems(parameters, differentParameters);
	
	return parameterNamesToIndexes(differentParameters, parameters);
}

function toBoolean(str) {
	if (isNaN(Number(str))) {
		return str == "true";
	} else {
		return Boolean(str);
	}
}

function fixIndex(index, objectType) {
	let fixedIndex = index;
	
	if (objectType == "trigger") {
		if (index > 4) {
			fixedIndex = index + Math.floor((index - 2) / 3);
		}
	}
	
	return fixedIndex;
}

function fixParameterValue(name, value, objectType) {
	let fixedValue;
	
	if (special_values_table[name]) {
		fixedValue = special_values_table[name][value];
	} else {
		switch (name) {
			case "m":
				fixedValue = special_values_table["box_model"][value];
				break;
			
			case "moving":
				fixedValue = special_values_table["bool"][toBoolean(value)];
				break;
			
			case "vis":
				fixedValue = special_values_table["bool"][toBoolean(value)];
				break;
			
			case "use_on":
				fixedValue = special_values_table["region_activation"][value];
				break;
			
			case "f":
				fixedValue = special_values_table["draw_in_front"][value];
				break;
			
			case "s":
				fixedValue = special_values_table["bool"][toBoolean(value)];
				break;
			
			case "friction":
				fixedValue = special_values_table["bool"][toBoolean(value)];
				break;
			
			case "model":
				if (objectType == "vehicle") {
					fixedValue = special_values_table["vehicle_model"][value];
				}
				
				if (objectType == "decor") {
					fixedValue = special_values_table["decor_model"][value];
				}
				
				if (objectType == "gun") {
					fixedValue = special_values_table["gun_model"][value];
				}
				
				if (objectType == "barrel") {
					fixedValue = special_values_table["barrel_model"][value];
				}
				
				break;
			
			case "command":
				fixedValue = special_values_table["team+any"][value];
				break;
			
			case "upg":
				fixedValue = special_values_table["gun_upgrade"][value];
				break;
			
			case "flare":
				fixedValue = special_values_table["bool"][toBoolean(value)];
				break;
			
			case "enabled":
				fixedValue = special_values_table["bool"][toBoolean(value)];
				break;
			
			case "actions_1_type":
				fixedValue = special_values_table["trigger_type"][value];
				break;
			
			case "actions_2_type":
				fixedValue = special_values_table["trigger_type"][value];
				break;
			
			case "actions_3_type":
				fixedValue = special_values_table["trigger_type"][value];
				break;
			
			case "actions_4_type":
				fixedValue = special_values_table["trigger_type"][value];
				break;
			
			case "actions_5_type":
				fixedValue = special_values_table["trigger_type"][value];
				break;
			
			case "actions_6_type":
				fixedValue = special_values_table["trigger_type"][value];
				break;
			
			case "actions_7_type":
				fixedValue = special_values_table["trigger_type"][value];
				break;
			
			case "actions_8_type":
				fixedValue = special_values_table["trigger_type"][value];
				break;
			
			case "actions_9_type":
				fixedValue = special_values_table["trigger_type"][value];
				break;
			
			case "actions_10_type":
				fixedValue = special_values_table["trigger_type"][value];
				break;
			
			default:
				fixedValue = value;
		}
	}
	
	return fixedValue;
}

function setSameParameters() {
	let objects = getSelection();
	
	if (areObjectsOfSameType(objects) && objects.length >= 2) {
		let indexes = getSameParameters(objects);
		let parameters = Object.keys(objects[0].pm);
		
		for (let i = 0; i < indexes.length; i++) {
			let name = parameters[indexes[i]];
			let value = objects[0].pm[parameters[indexes[i]]];
			let objectType = objects[0]._class;
			
			setParameter(fixIndex(indexes[i], objectType), fixParameterValue(name, value, objectType));
		}
	}
}

function ani() {
    var start = +new Date();
    if (speed_x != 0) {
        var speed_power = zoom * 10 * (k_shift ? 5 : 1);
        dis_from_x += speed_x * speed_power;
        dis_to_x += speed_x * speed_power;
        zoom_validate();
        need_redraw = true;
        lmwa = s2w_x(mouse_x);
        lmwb = s2w_y(mouse_y);
        lmd = false;
        m_move();
    }
    if (speed_y != 0) {
        var speed_power = zoom * 10 * (k_shift ? 5 : 1);
        dis_from_y += speed_y * speed_power;
        dis_to_y += speed_y * speed_power;
        zoom_validate();
        need_redraw = true;
        lmwa = s2w_x(mouse_x);
        lmwb = s2w_y(mouse_y);
        lmd = false;
        m_move();
    }
    if (need_redraw) {
        need_redraw = false;
        Render();
    }
    if (need_GUIParams_update) {
        need_GUIParams_update = false;
        UpdateGUIParams();
        UpdateGUIObjectsList();
		
		setSameParameters();
    }
    var end = +new Date();
    var diff = end - start;
    timer_panic = (timer_panic + diff) * 0.7;
    if (false)
        if (timer_panic > 100) {
            if (ENABLE_SHADOWS) {
                ENABLE_SHADOWS = false;
                timer_panic = 0;
            } else if (ENABLE_TEXT) {
                ENABLE_TEXT = false;
                timer_panic = 0;
            }
        }
    setTimeout(ani, 10);
}
