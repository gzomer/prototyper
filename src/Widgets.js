import Icons from './Icons'
import Images from './Images'

const convertInnerWidgets = (data, styles, size) => {
	let result =  data.map(item => Widgets[item.widgetType](item, styles, size)).join('\n')
	return result
}

const Card = (content, styles, size) => {
	const defaultProps = {
		height: 200,
		width: 300,
		title: content.defaultValue || 'Title',
		subtitle : content.subtitle || '',
		widgets : content.innerWidgets ? convertInnerWidgets(content.innerWidgets, styles, size) : '',
	}
	let props = Object.assign(defaultProps, content)

	const imageTemplate = ImageTemplate(props.image, props)

	const extraStyle = size == 'desktop'?'float:left;':''

	return `<div style="margin:20px;${extraStyle}">
        <div style="border-radius:10px; border: 1px solid #f0f0f0;padding: 10px;overflow:hidden">
          <div style="margin:-10px;height:150px;overflow:hidden">
          ${imageTemplate}
          </div>
          <h2 style="margin-top:20px;margin-bottom:0px;font-size: 20px">${props.title}</h2>
          <p style="margin-top:5px;font-size:14px;color: #5b708b">${props.subtitle}</p>
          ${props.widgets}
        </div>
      </div>`
}

const Tab = (content, styles, size) => {
	const defaultProps = {
		color: 'black',
		label: content.defaultValue || 'Tab',
		size: 16,
	}

	let props = Object.assign(defaultProps, content)

	const parseIcon = (icon) => {
		let iconContent = Icons[content.icon]
		if (!iconContent) {
			return ''
		}

		return iconContent.replace('<svg ',`<svg width="${props.size}" fill="${props.color}" `)
	}

	props.iconContent = parseIcon(content.icon)

	return `<div style="flex:1;align-items: center;justify-content:center;display:flex;flex-direction:column">
        <div id="icon">
        	${props.iconContent || ''}
        </div>
        <div style="font-size:12px;color:${props.color}">${props.label}</div>
    </div>`
}

const Tabs = (content, styles, size) => {
	const defaultProps = {
		widgets : content.innerWidgets ? convertInnerWidgets(content.innerWidgets, styles, size) : '',
	}
	let props = Object.assign(defaultProps, content)

	return `<div style="border-top:1px solid #ccc; position:absolute;bottom:4px;background:#fbfbfb;height:50px;width:calc(100% - 8px);border-radius: 0px 0px 17px 17px;display:flex">
		${props.widgets}
      </div>`
}

const Link = (content, styles, size) => {

	const defaultProps = {
		label: content.defaultValue || 'Link',
		color: styles.colors.primary,
		align: 'center',
	}
	let props = Object.assign(defaultProps, content)

	return `<div style="margin-top:5px;padding:0px 20px;">
            <div style="background:${props.background};color:${props.color};width:100%px;padding: 10px;text-align:${props.align};border-radius:10px">
              ${props.label}
            </div>
     </div>`
}

const Button = (content, styles, size) => {

	const defaultProps = {
		label: content.defaultValue || 'Submit',
		background: styles.colors.primary,
		color: 'white',
		align: 'center',
	}
	let props = Object.assign(defaultProps, content)

	return `<div style="margin-top:5px;padding:10px 20px;">
            <div style="background:${props.background};color:${props.color};width:100%px;padding: 10px;text-align:${props.align};border-radius:10px">
              ${props.label}
            </div>
     </div>`
}

const IconContent = (icon, props) => {
	let iconContent = Icons[icon]
	if (!iconContent) {
		return ''
	}

	return iconContent.replace('<svg ',`<svg width="${props.size}" fill="${props.color}" `)
}

const Header = (content, styles, size) => {
	const defaultProps = {
		height: 40,
		background: styles.colors.primary,
		color: 'white',
		height: 30
	}
	const props = Object.assign(defaultProps, content)

	const iconLeftContent = IconContent(props.left, {size:12, color:props.color})
	const iconRightContent = IconContent(props.right, {size:12, color:props.color})
	const iconLeft = iconLeftContent? `<div  style="position: absolute;left: 12px;top: 19px;">
			${iconLeftContent}
        </div>`:''

    const iconRight = iconRightContent? `<div style="position: absolute;right: 12px;top: 19px;">
		${iconRightContent}
    </div>`:''

	return `<div style="position:relative;height:${props.height}px;background:${props.background};color:${props.color};text-align: center;padding-top:20px;">
        ${iconLeft}
        ${content.text || content.defaultValue}
        ${iconRight}
      </div>`
}

const Label = (content, styles, size) => {
	const defaultProps = {
		text: content.defaultValue || 'Label',
		color: 'black',
		size: 14,
		align: 'left',
	}
	const props = Object.assign(defaultProps, content)

	return `<div style="margin-top:5px;padding:0px 20px;">
				<div style="font-size: ${props.size}px;height:${props.height}px;;color:${props.color};text-align: ${props.align};">
        			${content.text || content.defaultValue}
      			</div>
      		</div>`
}

const Title = (content, styles, size) => {
	const defaultProps = {
		text: content.defaultValue || 'Title',
		color: 'black',
		size: 18,
		align: 'left',
		bottom: 5,
		top: 5,
	}
	const props = Object.assign(defaultProps, content)

	return `<div style="margin-top:${props.top}px;padding:0px 20px;margin-bottom: ${props.bottom}px">
				<div style="font-size: ${props.size}px;height:${props.height}px;;color:${props.color};text-align: ${props.align};">
        			${content.text || content.defaultValue}
      			</div>
      		</div>`
}

const Separator = (content, styles, size) => {
	const defaultProps = {
		height: content.defaultValue || 40
	}
	const props = Object.assign(defaultProps, content)

	return `<div style="margin-top: ${props.height}px">
      </div>`
}

const Search = (content, styles, size) => {
	const defaultProps = {
		label: content.defaultValue || 'Search',
		color: 'white',
		innerColor :'#ccc',
		background: styles.colors.primary,
	}
	const props = Object.assign(defaultProps, content)

	return `<div style="margin-top:0px;padding:0px 10px;background:${props.background}">
        <div style="width:100%px;padding: 10px;height:15px;">
          <div style="text-align:left;float:left ;margin-top:-2px;width:30px">
              <div style="border-radius: 100%;height:20px;width:20px;text-align:center">
				<svg width="10" fill="${props.color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
              </div>
          </div>
          <div style="width:calc(100% - 30px);text-align:left;font-size: 14px;float:left;color:${props.innerColor};border-bottom: 0px solid #ccc;padding-bottom:5px">
              ${props.label}
          </div>
        </div>
      </div>`
}


// TODO
const Alert = (content, styles, size) => {
	const defaultProps = {
		height: content.defaultValue || 40
	}
	const props = Object.assign(defaultProps, content)

	return `<div style="margin-top: ${props.height}px">
      </div>`
}

const Input = (content, styles, size) => {

	const defaultProps = {
		label: content.defaultValue || 'Field'
	}
	let props = Object.assign(defaultProps, content)

	if (!props.placeholder) {
		props.placeholder = 'Type your ' + props.label.toLowerCase()
	}

	return `<div style="margin-top: 5px">
	            <div style="height:15px;margin-left:20px;font-size:12px">
	              ${props.label}
	            </div>
            <div style="border-bottom: 1px solid #ccc;height:35px;">
              <div style="margin-left:20px;color:#ccc;padding-top:6px">
                ${props.placeholder}
              </div>
            </div>
    </div>`
}

const CheckBox = (content, styles, size) => {
	const defaultProps = {
		label: content.defaultValue || 'Label',
		color: 'white',
		background: styles.colors.primary,
	}
	const props = Object.assign(defaultProps, content)

	return `<div style="margin-top:5px;padding:0px 10px;">
        <div style="width:100%px;padding: 10px;height:15px">
          <div style="text-align:left;float:left ;margin-top:-2px;width:30px">
              <div style="background: ${props.background};border-radius: 100%;height:20px;width:20px;text-align:center">
                <svg width="10" fill="${props.color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
              </div>
          </div>
          <div style="width:calc(100% - 30px);text-align:left;font-size: 14px;float:left;color:grey;border-bottom: 0px solid #ccc;padding-bottom:5px">
              ${props.label}
          </div>
        </div>
      </div>`
}

const Option = (content, styles, size) => {
	const defaultProps = {
		label: content.defaultValue || 'Option',
		color: styles.colors.primary
	}
	const props = Object.assign(defaultProps, content)

	let iconTemplate = `<div style="text-align:left;float:right;margin-top:-2px;width:30px">
	      <div style="border-radius: 100%;height:20px;width:20px;text-align:center">
	        <svg width="10" fill="${props.color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
	      </div>
	  </div>`
	let icon = content.active ? iconTemplate : ''

	return `<div style="width:100%px;padding: 10px 0px;height:15px">
      <div style="width:100%;text-align:left;font-size: 14px;float:left;color:grey;border-bottom: 1px solid #ccc;padding-bottom:5px">
          ${props.label}
          ${icon}
      </div>
    </div>`
}

const Radio = (content, styles, size) => {

	if (content.innerWidgets) {
		content.innerWidgets[0].active = true
	}
	const defaultProps = {
		label: content.defaultValue || 'Radio',
		top: 10,
		widgets : content.innerWidgets ? convertInnerWidgets(content.innerWidgets, styles, size) : '',
	}
	const props = Object.assign(defaultProps, content)

	return `<div style="margin-top:${props.top}px;padding:0px 20px;">
			<div style="height:15px;font-size:12px;margin-bottom: 5px">
	              ${props.label}
	        </div>
	        ${props.widgets}
      </div>`
}

const Select = (content, styles, size) => {
	const defaultProps = {
		label: content.defaultValue || 'Field',
		placeholder: content.placeholder || 'Select',
		radius: 0,
		top: 10
	}
	let props = Object.assign(defaultProps, content)

	return `<div style="margin-top:${props.top}px;padding:0px 20px;">
        <div style="height:15px;font-size:12px;margin-bottom: 5px">
              ${props.label}
        </div>
        <div style="border:1px solid #ccc;width:100%px;padding: 10px;border-radius:${props.radius}px;height:15px">
          <div style="text-align:left;font-size: 14px;float:left;color:grey">
              ${props.placeholder}
          </div>
          <div style="text-align:right;float:right;margin-top:-4px">
              <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"/></svg>

          </div>
        </div>
      </div>`
}

const List = (content, styles, size) => {
	const defaultProps = {
		title: content.defaultValue,
		size: 18,
		widgets : content.innerWidgets ? convertInnerWidgets(content.innerWidgets, styles, size) : '',
	}
	const props = Object.assign(defaultProps, content)

	const title = props.title? `<div style="height:15px;font-size:${props.title}px;margin-bottom: 5px">
	              ${props.title}
	        </div>`: ''
	return `<div style="margin-top:10px;padding:0px 20px 15px 20px;">
			${title}
	        ${props.widgets}
      </div>`
}

const ImageTemplate = (image, props) => {
	const template = Images[image]
	const placeholder = `<div style="display:flex;height:100%;justify-content:center;align-items:center;width:100%;background:#ccc;color:black"> ${props.width}px x ${props.height}px</div>`
	return template?`<img src="${template}"/>`:placeholder
}

const Image = (content, styles, size) => {
	const defaultProps = {
		height: content.height || 200,
		width: content.width || 300,
	}
	const props = Object.assign(defaultProps, content)

	const imageTemplate = ImageTemplate(props.type, props)

	return `<div style="height: ${props.height}px;width:100%">
			${imageTemplate}
      </div>`
}


const Color = (content, styles, size) => {
	const defaultProps = {}
	const props = Object.assign(defaultProps, content)

	return ``
}

const Goto = (content, styles, size) => {
	return ``
}

const Line = (content, styles, size) => {
	const defaultProps = {
		height: content.defaultValue || 40
	}
	const props = Object.assign(defaultProps, content)

	return `<div style="margin-top: ${props.height}px;padding:0px 20px">
			<hr/>
      </div>`
}

const Item = (content, styles, size) => {
	const defaultProps = {
		color: 'black',
		size: 14,
		lineColor: '#ccc',
		label: content.defaultValue || 'Label',
	}
	const props = Object.assign(defaultProps, content)

	const subtitle = props.subtitle?`
		<div style="font-size:12px;color:gray">${props.subtitle}</div>
	`:''

	const iconRightContent = IconContent(props.right, {size:12, color:props.color})
	const marginTop = iconRightContent?19:10
	const iconRight = props.right? `<div  style="position: absolute;right: 12px;top: ${marginTop}px;">
			${iconRightContent || props.right}
        </div>`:''

	return `<div style="position:relative;font-size:${props.size}px;padding:10px 0px;border-bottom: 1px solid ${props.lineColor};color:${props.color}">
		${props.label}
		${subtitle}
		${iconRight}
	</div>`
}

const Menu = (content, styles, size) => {
	const defaultProps = {
		background: 'white',
		lineColor: "#ccc",
		title: content.defaultValue || 'Title',
		widgets : content.innerWidgets ? convertInnerWidgets(content.innerWidgets, styles, size) : '',
	}
	const props = Object.assign(defaultProps, content)

	return `<div style="display:block;position:absolute;width:100%;height:calc(100% - 8px);top:4px;z-index:10;margin-left:0px;border-radius:15px;overflow:hidden">
        <div style="width:80%;height:100%;background:${props.background};float:left">
          <div>
              <div style="height:34px;text-align: center;padding-top:15px;color:${props.color};border-bottom: 1px solid ${props.lineColor}">
              ${props.title}
            </div>
              <div style="padding:10px">
                  ${props.widgets}
              </div>
          </div>
        </div>
        <div style="width:calc(20% - 8px);background:rgba(0,0,0,0.5);height:100%;float:left">
        </div>
      </div>`
}

const Widgets = {
	'Card': Card,
	'List': List,
	'Item' :Item,
	'Tab' : Tab,
	'Tabs': Tabs,
	'Menu': Menu,
	'Label': Label,
	'Title': Title,
	'Header' : Header,
	'Search' : Search,
	'Link' : Link,
	'Alert': Alert, //TODO
	'Separator' : Separator,
	'Line' : Line,
	'Input' : Input,
	'Button' : Button,
	'CheckBox': CheckBox,
	'Radio' : Radio,
	'Option' : Option,
	'Select' : Select,
	'Image' : Image,
	'Color': Color,
	'Goto': Goto,
}

export default Widgets