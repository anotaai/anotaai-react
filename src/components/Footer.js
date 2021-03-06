import React, { Component } from 'react'
import { connect } from 'react-redux'

class Footer extends Component {


    render() {

        let greyLighten = null;

        if (this.props.loginState == null) {
            greyLighten = "grey lighten-4";
        }

        return (
            <div>
                <footer className={greyLighten}>
                    <div>
                        <p>Powered by <a href="https://goo.gl/93I0At" target="_blank" rel="noopener noreferrer">Aline Solutions</a></p>
                        <p>Contato: <strong>(31) 9 8774-9131 | Copyright @2017 </strong></p>
                    </div>
                </footer>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return { loginState: state.auth.loginState} 
}

const FooterContainer = connect(mapStateToProps)(Footer);

export default FooterContainer;