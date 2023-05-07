'use strict';

export class LocalizationPackage extends Formulae.Package {}

// Languages

LocalizationPackage.Language = class extends Expression.CodeLabelExpression {
	getTag() { return "Localization.Language.Language"; }
	getLabel() { return Formulae.messages["language_" + this.code]; }
	getName() { return LocalizationPackage.messages.formatNameLanguage.replace(LocalizationPackage.messages.wilcardNameLanguage, this.getLabel()); }

	setSerializationStrings(strings, promises) {
		if (Formulae.messages["language_" + strings[0]] === undefined) {
			throw "Invalid language: " + strings[0];
		}
		
		this.set("Value", strings[0]);
	}
};

// Countries

LocalizationPackage.Country = class extends Expression.CodeLabelExpression {
	getTag() { return "Localization.Country.Country"; }
	getLabel() { return Formulae.messages["country_" + this.code]; }
	getName() { return LocalizationPackage.messages.formatNameCountry.replace(LocalizationPackage.messages.wilcardNameCountry, this.getLabel()); }

	setSerializationStrings(strings, promises) {
		if (Formulae.messages["country_" + strings[0]] === undefined) {
			throw "Invalid country: " + strings[0];
		}
		
		this.set("Value", strings[0]);
	}
};

// Scripts

LocalizationPackage.Script = class extends Expression.CodeLabelExpression {
	getTag() { return "Localization.Script.Script"; }
	getLabel() { return Formulae.messages["script_" + this.code]; }
	getName() { return LocalizationPackage.messages.formatNameScript.replace(LocalizationPackage.messages.wilcardNameScript, this.getLabel()); }

	setSerializationStrings(strings, promises) {
		if (Formulae.messages["script_" + strings[0]] === undefined) {
			throw "Invalid script: " + strings[0];
		}
		
		this.set("Value", strings[0]);
	}
};

// Numeral systems

LocalizationPackage.Numeral = class extends Expression.CodeLabelExpression {
	getTag() { return "Localization.Numeral.Numeral"; }
	getLabel() { return Formulae.messages["numeral_" + this.code]; }
	getName() { return LocalizationPackage.messages.formatNameNumeral.replace(LocalizationPackage.messages.wilcardNameNumeral, this.getLabel()); }

	setSerializationStrings(strings, promises) {
		if (Formulae.messages["numeral_" + strings[0]] === undefined) {
			throw "Invalid numeral: " + strings[0];
		}
		
		this.set("Value", strings[0]);
	}
};

// Calendars

LocalizationPackage.Calendar = class extends Expression.CodeLabelExpression {
	getTag() { return "Localization.Calendar.Calendar"; }
	getLabel() { return Formulae.messages["calendar_" + this.code]; }
	getName() { return LocalizationPackage.messages.formatNameCalendar.replace(LocalizationPackage.messages.wilcardNameCalendar, this.getLabel()); }

	setSerializationStrings(strings, promises) {
		if (Formulae.messages["calendar_" + strings[0]] === undefined) {
			throw "Invalid calendar: " + strings[0];
		}
		
		this.set("Value", strings[0]);
	}
};

// Locales

LocalizationPackage.Locale = class extends Expression.CodeLabelExpression {
	getTag() { return "Localization.Locale.Locale"; }
	getLabel() { return Formulae.getLocaleName(this.code); }
	getName() { return LocalizationPackage.messages.formatNameLocale.replace(LocalizationPackage.messages.wilcardNameLocale, this.getLabel()); }

	setSerializationStrings(strings, promises) {
		if (Formulae.locales[strings[0]] === undefined) {
			throw "Invalid locale: " + strings[0];
		}
		
		this.set("Value", strings[0]);
	}
}

// Time zones

LocalizationPackage.TimeZone = class extends Expression.CodeLabelExpression {
	getTag() { return "Localization.TimeZone.TimeZone"; }
	getLabel() { return this.code; }
	getName() { return LocalizationPackage.messages.formatNameTimeZone.replace(LocalizationPackage.messages.wilcardNameTimeZone, this.code); }

	setSerializationStrings(strings, promises) {
		if (Formulae.timeZones[strings[0]] === undefined) {
			throw "Invalid time zone: " + strings[0];
		}
		
		this.set("Value", strings[0]);
	}
};

LocalizationPackage.setExpressions = function(module) {
	Formulae.setExpression(module, "Localization.Language.Language", LocalizationPackage.Language);
	Formulae.setExpression(module, "Localization.Country.Country",   LocalizationPackage.Country);
	Formulae.setExpression(module, "Localization.Script.Script",     LocalizationPackage.Script);
	Formulae.setExpression(module, "Localization.Numeral.Numeral",   LocalizationPackage.Numeral);
	Formulae.setExpression(module, "Localization.Calendar.Calendar", LocalizationPackage.Calendar);
	Formulae.setExpression(module, "Localization.Locale.Locale",     LocalizationPackage.Locale);
	Formulae.setExpression(module, "Localization.TimeZone.TimeZone", LocalizationPackage.TimeZone);
	
	[ // get current, get list
		[ "Language", "GetCurrentLanguage" ],
		[ "Language", "GetLanguageList"    ],
		[ "Country",  "GetCurrentCountry"  ],
		[ "Country",  "GetCountryList"     ],
		[ "Script",   "GetCurrentScript"   ],
		[ "Script",   "GetScriptList"      ],
		[ "Numeral",  "GetCurrentNumeral"  ],
		[ "Numeral",  "GetNumeralList"     ],
		[ "Calendar", "GetCurrentCalendar" ],
		[ "Calendar", "GetCalendarList"    ],
		[ "Locale",   "GetCurrentLocale"   ],
		[ "Locale",   "GetLocaleList"      ],
		[ "TimeZone", "GetCurrentTimeZone" ],
		[ "TimeZone", "GetTimeZoneList"    ]
	].forEach(row => Formulae.setExpression(module, "Localization." + row[0] + "." + row[1], {
		clazz:       Expression.Function,
		getTag:      () => "Localization." + row[0] + '.' + row[1],
		getMnemonic: () => LocalizationPackage.messages["mnemonic" + row[1]],
		getName:     () => LocalizationPackage.messages["name" + row[1]],
		min: 0, max: 0
	}
	));
	
	// getters
	[ "GetLanguage", "GetCountry", "GetScript", "GetNumeral", "GetCalendar" ].forEach(tag => Formulae.setExpression(module, "Localization.Locale." + tag, {
		clazz:        Expression.Function,
		getTag:       () => "Localization.Locale." + tag,
		getMnemonic:  () => LocalizationPackage.messages["mnemonic" + tag],
		getName:      () => LocalizationPackage.messages["name" + tag],
		getChildName: index => LocalizationPackage.messages.childGet
	}));
	
	[ // with (locale/timezone)
		[ "Locale",   "WithLocale"   ],
		[ "TimeZone", "WithTimeZone" ]
	].forEach(row => Formulae.setExpression(module, "Localization." + row[0] + "." + row[1], {
		clazz:        Expression.Function,
		getTag:       () => "Localization." + row[0] + '.' + row[1],
		getMnemonic:  () => LocalizationPackage.messages["mnemonic" + row[1]],
		getName:      () => LocalizationPackage.messages["name" + row[1]],
		getChildName: index => LocalizationPackage.messages["children" + row[1]][index],
		min: 2, max: 2
	}
	));
	
	// locale-dependent formatting
	[ "LocaleName", "LanguageName", "CountryName", "QuoteString", "FormatNumber", "FormatCurrency", "NumberName" ].forEach(tag => Formulae.setExpression(module, "Localization.Format." + tag, {
		clazz:        Expression.Function,
		getTag:       () => "Localization.Format." + tag,
		getMnemonic:  () => LocalizationPackage.messages["mnemonic" + tag],
		getName:      () => LocalizationPackage.messages["name" + tag],
		getChildName: index => LocalizationPackage.messages["children" + tag][index],
		min: 1, max: 2
	}));
};
