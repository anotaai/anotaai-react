import React, { Component } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Translator } from 'i18n-react-loader'
import registerFetchInterceptor from '../services/app/fetchInterceptor' 
import { connect } from 'react-redux';


class App extends Component {

  constructor() {
    super();
    this.renderTranslate(); 
    registerFetchInterceptor();
  }

  renderTranslate() {
    var i18nReactLoader = require("i18n-react-loader");
    i18nReactLoader.default.init({
      useExternalAPI: false,
      defaultLocale: 'pt', // key for default locale
      localSupportedLocales: require('../resources/i18n/localeSuported.json'),
      localLocaleMap: {
        en: require('../resources/i18n/locales/en.json'),
        pt: require('../resources/i18n/locales/pt.json'),
      },
    }).then(() => {
      // Render your app -- React.render(...);
    });
  }

  changeLocale(localeKey) {
    if (this.state.localeKey !== localeKey) {
      Translator.setLocale(localeKey)
        .then(() => {
          this.setState({ localeKey });
        });
    }
  }

  render() {
    
    let children = this.props.loginState != null ?  React.cloneElement(this.props.children, {loginState: this.props.loginState}) : this.props.children;

    return (
      <div>
        <header>
           <NavBar loginState={this.props.loginState}/>
        </header>
        <main>
           {children}
        </main>
        <Footer loginState={this.props.loginState}/>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {loginState : state.auth.loginState}
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer