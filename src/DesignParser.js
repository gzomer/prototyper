const Parser = (text) => {

	const _MERGE_WIDGETS = {
		'Tab': 'Tabs',
	}

	const Colors = {
		'primary' : '#0352cc'
	}

	const _MAP_WIDGETS = {
		':tab' : 'Tab',
		':label': 'Label',
		':card': 'Card',
		':header' : 'Header',
		':separator': 'Separator',
		':input': 'Input',
		':button' : 'Button',
		':title' : 'Title',
		':list' : 'List',
		':item': 'Item',
		':menu' : 'Menu',
		':search': 'Search',
		':alert': 'Alert',
		':line' : 'Line',
		':checkbox' : 'CheckBox',
		':select' : 'Select',
		':image' : 'Image',
		':radio' : 'Radio',
		':option' :'Option',
		':link' : 'Link',
		':color' : 'Color',
		':goto' : 'Goto',
	}

	const groupBy = (data, property) => {
		var groups = { };
		data.forEach(function(item){
		   var list = groups[item[property]]
		   if(list){
		       list.push(item)
		   } else{
		      groups[item[property]] = [item]
		   }
		})
		return groups
	}

	const mergeWidgets = (widgets) => {
		let toMerge = widgets.filter(item => item.shouldMerge)

		let mergeGroups = groupBy(toMerge, 'widgetType')

		let mergedWidgets = []
		for (var key in mergeGroups) {
			let widget = {
				widgetType: _MERGE_WIDGETS[key]
			}
			widget.innerWidgets = mergeGroups[key].map(item => {
				item.widgetType = key
				return item
			})

			mergedWidgets.push(widget)
		}

		widgets = widgets.filter(item => !item.shouldMerge)

		mergedWidgets.map(item => {
			widgets.push(item)
		})

		return widgets
	}

	const getColorMap = (widgets) => {
		let colors = Object.assign({}, Colors)
		let colorWidgets = widgets.filter(item => item.widgetType == 'Color')

		colorWidgets.map(item => {
			for (let key in item) {
				if (['widgetType','hasParent','shouldMerge'].indexOf(key) != -1) {
					continue
				}

				colors[key] = item[key]
			}
		})

		return colors
	}

	const applyColors = function(colors, widgets) {
		return widgets.map(item => {
			if (item.background && typeof colors[item.background] !== 'undefined') {
				item.background = colors[item.background]
			}
			if (item.color && typeof colors[item.color] !== 'undefined') {
				item.color = colors[item.color]
			}

			if (item.innerWidgets) {
				item.innerWidgets = item.innerWidgets.map(inner => {
					if (inner.background && typeof colors[inner.background] !== 'undefined') {
						inner.background = colors[inner.background]
					}
					if (inner.color && typeof colors[inner.color] !== 'undefined') {
						inner.color = colors[inner.color]
					}
					return inner
				})
			}

			return item
		})
	}

	const parseRow = (row) => {
		row = row.replace(/\s\s+/g, ' ')
		let parts = row.trim().split(' ')

		let isIndented = row[0] == ' ';

		if (parts.length == 0) {
			return null
		}

		let widgetType = parts[0]
		if (widgetType.indexOf(':') === -1) {
			return null
		}

		if (typeof _MAP_WIDGETS[widgetType] === 'undefined') {
			return null
		}

		let propertiesText = row.trim().match(/([^\ .]*)+\=(([^\=.]*(?= \w+\=))|(.*)+$)/g)

		if (!propertiesText) {
			propertiesText = []
		}

		let defaultValue = parts.filter(item => item.indexOf(':') ===-1 && item.indexOf('=') ===-1)

		let widget = {
			widgetType: _MAP_WIDGETS[widgetType],
			hasParent: isIndented,
			shouldMerge: _MERGE_WIDGETS[_MAP_WIDGETS[widgetType]]
		}

		propertiesText.map(item => {
			if (item.indexOf("=") != -1 ) {
				let [propName, propValue ] = item.split('=')
				widget[propName] = propValue
			}
		})

		if (defaultValue.length > 0) {
			widget.defaultValue = defaultValue.join(' ')
		}

		return widget
	}

	let widgets = text.split('\n')
	.map(item => parseRow(item))
	.filter(item => item != null)


	function searchParent(widgets, index) {
		for (var i = index; i>=0;i--) {
			if (!widgets[i].hasParent) {
				return widgets[i]
			}
		}
		return null
	}

	// Add too parent
	widgets.map((item, index) => {
		if (item.hasParent) {
			let parent = searchParent(widgets, index)
			if (!parent) {
				delete item.hasParent
				return item
			}

			if (typeof parent.innerWidgets === 'undefined') {
				parent.innerWidgets = []
			}

			parent.innerWidgets.push(item)

			return item
		}
		return item
	})
	widgets = widgets.filter(item => !item.hasParent)

	//Merge widgets
	widgets = mergeWidgets(widgets)

	// Get colors
	let colors = getColorMap(widgets)

	// Apply colors
	widgets = applyColors(colors, widgets)

	return {
		widgets: widgets,
		styles: {
			colors: colors
		}
	}
}

export default Parser