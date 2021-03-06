import { findBestAvailableLanguage } from 'react-native-localize'

const translations = {
	en: () => require('./en.json'),
	fr: () => require('./fr.json'),
}

var languageTag = findBestAvailableLanguage(Object.keys(translations)).languageTag
languageTag = 'en'

const translate = key => {
	return translations[languageTag]()[key]
}

export {
	translate
}