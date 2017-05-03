import React, { Component } from 'react'
import Menu from './Menu'
import Footer from './Footer'
import { Translator } from 'i18n-react-loader'

export default class App extends Component {

  constructor() {
    var t = {};
    console.log(t);
    super();
    this.renderTranslate();
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
          <Menu />
        </header>
        <main>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }

}