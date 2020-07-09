import ForgeUI, {

} from '@forge/ui';

import SVGView from './SVGView'

const Wrapper = (content, height=40) => {
	return `<svg viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg" width="1000px" height="${height}px">
	  <foreignObject x="0" y="0" width="100%" height="100%">
	    <div xmlns="http://www.w3.org/1999/xhtml">
	    	${content}
	    </div>
	  </foreignObject>
	</svg>`
}

const H1 = (text) => `
<h1 style="font-family:sans-serif;margin:0px;text-align:left">
	${text}
</h1>`

const H2 = (text) => `
<h2 style="font-family:sans-serif;margin:0px;text-align:left">
	${text}
</h2>`

const HR = () => `<hr style="margin-top:0px;margin-bottom:10px"></hr>`

const HTML = {
	H1 : ({text}) => <SVGView content={Wrapper(H1(text))}/>,
	H2 : ({text}) => <SVGView content={Wrapper(H2(text))}/>,
	HR : ({text}) => <SVGView content={Wrapper(HR(), 10)}/>
}
export default HTML