import ForgeUI, {
  Image,
} from '@forge/ui';

const SVGView = ({content}) => {
	const externalQuotesValue = 'double'
	const symbols = /[\r\n%#()<>?\[\\\]^`{|}]/g;

	const encodeSVG = ( data ) => {
	    // Use single quotes instead of double to avoid encoding.
	    if ( externalQuotesValue === 'double') {
	        data = data.replace( /"/g, '\'' );
	    }
	    else {
	       data = data.replace( /'/g, '"' );
	    }

	    data = data.replace( />\s{1,}</g, "><" );
	    data = data.replace( /\s{2,}/g, " " );

	    return data.replace( symbols, encodeURIComponent );
	}


	const encodeContent = () => {
		let encoded = encodeSVG(content);
		let svgEncoded = `data:image/svg+xml,${encoded}`
		return svgEncoded
	}

	const svg = encodeContent()

	return 	(
		<Image src={svg}/>
	)
}

export default SVGView