import React, { Component } from "react";
import PropTypes from "prop-types";
import { getAlphaTwoCode } from '../LocalWordFlags/country'
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

export default class ReactCountryFlag extends Component {
    static propTypes = {
        cdnUrl: PropTypes.string,
        code: PropTypes.string.isRequired,
        styleProps: PropTypes.object,
        svg: PropTypes.bool
    };

    static defaultProps = {
        cdnUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/",
        svg: false
    };

    render() {
        const { cdnUrl, code, styleProps, svg } = this.props;
        const alphaTwo = findCountry(code)
        const flagUrl = !(!alphaTwo)? `${cdnUrl}${alphaTwo.toLowerCase()}.svg`: '';

        return (
            <span
                aria-label={alphaTwo}
                role="img"
                style={{
                    position: "relative",
                    display: "inline-block",
                    width: "1.3333333333em",
                    height: "1em",
                    backgroundImage: `url(${flagUrl})`,
                    backgroundPosition: "50%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    fontSize: "1em",
                    lineHeight: "1em",
                    verticalAlign: "middle",
                    ...styleProps
                }}
                title={alphaTwo}
            />
        )
    }
}
