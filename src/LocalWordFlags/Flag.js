import React from 'react'
import flags from './flags'
import { getAlphaTwoCode } from './country'
import countries from "world-countries";

function findCountry(code){
	const uc = String(code).toUpperCase()
	// const country = countries.find(
	//     c => c.cca2 === uc || c.ccn3 === uc || c.cca3 == uc
	// )
	for(let i = 0; i<countries.length; i++){
		if(countries[i].cca2 === uc || countries[i].ccn3 === uc || countries[i].cca3 === uc){
			return countries[i].cca2
		}
	}
}

export default props => {
  const { code, fallback = null, ...styleProps } = props
  const alphaTwo = findCountry(code)
	console.log('alphaTwo: ', alphaTwo)
	const previewPath = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/';
  const flag = previewPath + alphaTwo.toLowerCase() + '.svg';
	  // <img {...rest} src={flag} />
	console.log('flag: ', flag)
  return flag ?
    <span
	    aria-label={alphaTwo}
	    role="img"
	    title={alphaTwo}
		style={{
			position: "relative",
			display: "inline-block",
			width: "1.3333333333em",
			height: "1em",
			backgroundImage: `url(${flag})`,
			backgroundPosition: "50%",
			backgroundRepeat: "no-repeat",
			backgroundSize: "contain",
			fontSize: "1em",
			lineHeight: "1em",
			verticalAlign: "middle",
			...styleProps
		}}
	/>
	  : fallback
}
