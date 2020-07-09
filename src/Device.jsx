import ForgeUI, {

} from '@forge/ui';

import Widgets from './Widgets'

const Device = (content, size) => {

	const responsiveWidgets = ['List','Item','Label','Title','Link' ,'Separator' ,'Line' ,'Input' ,'Button' ,'CheckBox','Radio' ,'Option' ,'Select' ,'Image' ,'Color']

	const transformWidgets = (data, styles) => {
		if (!data) {
			return ''
		}

		return data.map(item => {
			let widget = Widgets[item.widgetType](item, styles, size)
			if (size == 'desktop' && responsiveWidgets.indexOf(item.widgetType) != -1) {
				return `<div style="width:50%;margin: 0 auto;">
					${widget}
				</div>`
			}
			return widget
		}).join('\n')
	}
	const htmlWidgets = transformWidgets(content.widgets, content.styles)

	const width = size == 'desktop'?700:300

	return `<svg viewBox="0 0 ${width} 550" xmlns="http://www.w3.org/2000/svg" width="${width}px" height="550px">
	  <foreignObject x="0" y="0" width="${width}px" height="550px">
	    <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;box-sizing:border-box;overflow:hidden;height:100%;font-family:sans-serif;background:white;padding:0px;border-radius:20px;border: 4px solid black;">
	    	${htmlWidgets}
	    </div>
	  </foreignObject>
	</svg>`
}

export default Device