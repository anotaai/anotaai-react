import React, { Component } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Translator } from 'i18n-react-loader'
import registerFetchInterceptor from '../services/app/fetchInterceptor'
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar'


export default class App extends Component {

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

    return (
      <div>
        <header>
           <NavBar />
           <LoadingBar/>
        </header>
        <main>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }

}