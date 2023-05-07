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

LocalizationPackage.languageSelection = function(languageCode, f) {
	if (LocalizationPackage.languageForm === undefined) {
		let table = document.createElement("table");
		table.classList.add("bordered");
		table.innerHTML =
`
<tr><th>Select language
<tr><td><select size=10>
`;

		let select = table.rows[1].cells[0].firstChild;
		let option;

		Formulae.languageCodes.forEach(code => {
			option = document.createElement("option");
			option.value = code;
			option.appendChild(document.createTextNode(Formulae.messages["language_" + code]));
			select.appendChild(option);
		});

		LocalizationPackage.languageForm = table;
	}

	let select = LocalizationPackage.languageForm.rows[1].cells[0].firstChild;
	select.value = languageCode;

	select.onclick = () => {
		Formulae.resetModal();
		f(select.value);
	};
	
	Formulae.setModal(LocalizationPackage.languageForm);
};

LocalizationPackage.editionLanguage = function() {
	LocalizationPackage.languageSelection(
		Formulae.locale.substring(0, 2),
		languageCode => {
			let newExpression = Formulae.createExpression("Localization.Language.Language");
			newExpression.set("Value", languageCode);

			Formulae.sExpression.replaceBy(newExpression);
			Formulae.sHandler.prepareDisplay();
			Formulae.sHandler.display();
			Formulae.setSelected(Formulae.sHandler, newExpression, false);
		}
	);
}

LocalizationPackage.actionLanguage = {
	isAvailableNow: () => Formulae.sHandler.type != Formulae.ROW_OUTPUT,
	getDescription: () => "Select language...",
	doAction: () => {
		LocalizationPackage.languageSelection(
			Formulae.sExpression.get("Value"),
			languageCode => {
				Formulae.sExpression.set("Value", languageCode);

				Formulae.sHandler.prepareDisplay();
				Formulae.sHandler.display();
				Formulae.setSelected(Formulae.sHandler, Formulae.sExpression, false);
			}
		);
	}
};

// Countries

LocalizationPackage.countrySelection = function(countryCode, f) {
	if (LocalizationPackage.countryForm === undefined) {
		let table = document.createElement("table");
		table.classList.add("bordered");
		table.innerHTML =
`
<tr><th>Select country
<tr><td><select size=10>
`;

		let select = table.rows[1].cells[0].firstChild;
		let option;

		Formulae.countryCodes.forEach(code => {
			option = document.createElement("option");
			option.value = code;
			option.appendChild(document.createTextNode(Formulae.messages["country_" + code]));
			select.appendChild(option);
		});

		LocalizationPackage.countryForm = table;
	}

	let select = LocalizationPackage.countryForm.rows[1].cells[0].firstChild;
	if (countryCode != null) {
		select.value = countryCode;
	}

	select.onclick = () => {
		Formulae.resetModal();
		f(select.value);
	};
	
	Formulae.setModal(LocalizationPackage.countryForm);
};

LocalizationPackage.editionCountry = function() {
	LocalizationPackage.countrySelection(
		Formulae.locale.substring(3, 5),
		countryCode => {
			let newExpression = Formulae.createExpression("Localization.Country.Country");
			newExpression.set("Value", countryCode);

			Formulae.sExpression.replaceBy(newExpression);
			Formulae.sHandler.prepareDisplay();
			Formulae.sHandler.display();
			Formulae.setSelected(Formulae.sHandler, newExpression, false);
		}
	);
}

LocalizationPackage.actionCountry = {
	isAvailableNow: () => Formulae.sHandler.type != Formulae.ROW_OUTPUT,
	getDescription: () => "Select country...",
	doAction: () => {
		LocalizationPackage.countrySelection(
			Formulae.sExpression.get("Value"),
			countryCode => {
				Formulae.sExpression.set("Value", countryCode);

				Formulae.sHandler.prepareDisplay();
				Formulae.sHandler.display();
				Formulae.setSelected(Formulae.sHandler, Formulae.sExpression, false);
			}
		);
	}
};

// Scripts

LocalizationPackage.scriptSelection = function(scriptCode, f) {
	if (LocalizationPackage.scriptForm === undefined) {
		let table = document.createElement("table");
		table.classList.add("bordered");
		table.innerHTML =
`
<tr><th>Select script
<tr><td><select size=10>
`;

		let select = table.rows[1].cells[0].firstChild;
		let option;

		Formulae.scriptCodes.forEach(code => {
			option = document.createElement("option");
			option.value = code;
			option.appendChild(document.createTextNode(Formulae.messages["script_" + code]));
			select.appendChild(option);
		});

		LocalizationPackage.scriptForm = table;
	}

	let select = LocalizationPackage.scriptForm.rows[1].cells[0].firstChild;
	select.value = scriptCode;

	select.onclick = () => {
		Formulae.resetModal();
		f(select.value);
	};
	
	Formulae.setModal(LocalizationPackage.scriptForm);
};

LocalizationPackage.editionScript = function() {
	LocalizationPackage.scriptSelection(
		Formulae.locales[Formulae.locale][2],
		scriptCode => {
			let newExpression = Formulae.createExpression("Localization.Script.Script");
			newExpression.set("Value", scriptCode);

			Formulae.sExpression.replaceBy(newExpression);
			Formulae.sHandler.prepareDisplay();
			Formulae.sHandler.display();
			Formulae.setSelected(Formulae.sHandler, newExpression, false);
		}
	);
}

LocalizationPackage.actionScript = {
	isAvailableNow: () => Formulae.sHandler.type != Formulae.ROW_OUTPUT,
	getDescription: () => "Select script...",
	doAction: () => {
		LocalizationPackage.scriptSelection(
			Formulae.sExpression.get("Value"),
			scriptCode => {
				Formulae.sExpression.set("Value", scriptCode);

				Formulae.sHandler.prepareDisplay();
				Formulae.sHandler.display();
				Formulae.setSelected(Formulae.sHandler, Formulae.sExpression, false);
			}
		);
	}
};

// Numeral systems

LocalizationPackage.numeralSelection = function(numeralCode, f) {
	if (LocalizationPackage.numeralForm === undefined) {
		let table = document.createElement("table");
		table.classList.add("bordered");
		table.innerHTML =
`
<tr><th>Select numeral
<tr><td><select size=10>
`;

		let select = table.rows[1].cells[0].firstChild;
		let option;

		Formulae.numeralCodes.forEach(code => {
			option = document.createElement("option");
			option.value = code;
			option.appendChild(document.createTextNode(Formulae.messages["numeral_" + code]));
			select.appendChild(option);
		});

		LocalizationPackage.numeralForm = table;
	}

	let select = LocalizationPackage.numeralForm.rows[1].cells[0].firstChild;
	select.value = numeralCode;

	select.onclick = () => {
		Formulae.resetModal();
		f(select.value);
	};
	
	Formulae.setModal(LocalizationPackage.numeralForm);
};

LocalizationPackage.editionNumeral = function() {
	LocalizationPackage.numeralSelection(
		Formulae.locales[Formulae.locale][3],
		numeralCode => {
			let newExpression = Formulae.createExpression("Localization.Numeral.Numeral");
			newExpression.set("Value", numeralCode);

			Formulae.sExpression.replaceBy(newExpression);
			Formulae.sHandler.prepareDisplay();
			Formulae.sHandler.display();
			Formulae.setSelected(Formulae.sHandler, newExpression, false);
		}
	);
}

LocalizationPackage.actionNumeral = {
	isAvailableNow: () => Formulae.sHandler.type != Formulae.ROW_OUTPUT,
	getDescription: () => "Select numeral...",
	doAction: () => {
		LocalizationPackage.numeralSelection(
			Formulae.sExpression.get("Value"),
			numeralCode => {
				Formulae.sExpression.set("Value", numeralCode);

				Formulae.sHandler.prepareDisplay();
				Formulae.sHandler.display();
				Formulae.setSelected(Formulae.sHandler, Formulae.sExpression, false);
			}
		);
	}
};

// Calendars

LocalizationPackage.calendarSelection = function(calendarCode, f) {
	if (LocalizationPackage.calendarForm === undefined) {
		let table = document.createElement("table");
		table.classList.add("bordered");
		table.innerHTML =
`
<tr><th>Select calendar
<tr><td><select size=10>
`;

		let select = table.rows[1].cells[0].firstChild;
		let option;

		Formulae.calendarCodes.forEach(code => {
			option = document.createElement("option");
			option.value = code;
			option.appendChild(document.createTextNode(Formulae.messages["calendar_" + code]));
			select.appendChild(option);
		});

		LocalizationPackage.calendarForm = table;
	}

	let select = LocalizationPackage.calendarForm.rows[1].cells[0].firstChild;
	select.value = calendarCode;

	select.onclick = () => {
		Formulae.resetMoal();
		f(select.value);
	};
	
	Formulae.setModal(LocalizationPackage.calendarForm);
};

LocalizationPackage.editionCalendar = function() {
	LocalizationPackage.calendarSelection(
		Formulae.locales[Formulae.locale][5],
		calendarCode => {
			let newExpression = Formulae.createExpression("Localization.Calendar.Calendar");
			newExpression.set("Value", calendarCode);
			
			Formulae.sExpression.replaceBy(newExpression);
			Formulae.sHandler.prepareDisplay();
			Formulae.sHandler.display();
			Formulae.setSelected(Formulae.sHandler, newExpression, false);
		}
	);
}

LocalizationPackage.actionCalendar = {
	isAvailableNow: () => Formulae.sHandler.type != Formulae.ROW_OUTPUT,
	getDescription: () => "Select calendar...",
	doAction: () => {
		LocalizationPackage.calendarSelection(
			Formulae.sExpression.get("Value"),
			calendarCode => {
				Formulae.sExpression.set("Value", calendarCode);

				Formulae.sHandler.prepareDisplay();
				Formulae.sHandler.display();
				Formulae.setSelected(Formulae.sHandler, Formulae.sExpression, false);
			}
		);
	}
};

// Locales

LocalizationPackage.editionLocale = function() {
	Formulae.Forms.localeSelection(Formulae.locale, locale => {
		let newExpression = Formulae.createExpression("Localization.Locale.Locale");
		newExpression.set("Value", locale);

		Formulae.sExpression.replaceBy(newExpression);
		Formulae.sHandler.prepareDisplay();
		Formulae.sHandler.display();
		Formulae.setSelected(Formulae.sHandler, newExpression, false);
	});
};

LocalizationPackage.actionLocale = {
	isAvailableNow: () => Formulae.sHandler.type != Formulae.ROW_OUTPUT,
	getDescription: () => "Select locale...",
	doAction: () => {
		Formulae.Forms.localeSelection(Formulae.sExpression.get("Value"), locale => {
			let newExpression = Formulae.createExpression("Localization.Locale.Locale");
			newExpression.set("Value", locale);

			Formulae.sExpression.replaceBy(newExpression);
			Formulae.sHandler.prepareDisplay();
			Formulae.sHandler.display();
			Formulae.setSelected(Formulae.sHandler, newExpression, false);
		});
	}
};

// Time zones

LocalizationPackage.editionTimeZone = function() {
	Formulae.Forms.timeZoneSelection(Formulae.timeZone, timeZone => {
		let newExpression = Formulae.createExpression("Localization.TimeZone.TimeZone");
		newExpression.set("Value", timeZone);

		Formulae.sExpression.replaceBy(newExpression);
		Formulae.sHandler.prepareDisplay();
		Formulae.sHandler.display();
		Formulae.setSelected(Formulae.sHandler, newExpression, false);
	});
};

LocalizationPackage.actionTimeZone = {
	isAvailableNow: () => Formulae.sHandler.type != Formulae.ROW_OUTPUT,
	getDescription: () => "Select timezone...",
	doAction: () => {
		Formulae.Forms.timeZoneSelection(Formulae.sExpression.get("Value"), timeZone => {
			let newExpression = Formulae.createExpression("Localization.TimeZone.TimeZone");
			newExpression.set("Value", timeZone);

			Formulae.sExpression.replaceBy(newExpression);
			Formulae.sHandler.prepareDisplay();
			Formulae.sHandler.display();
			Formulae.setSelected(Formulae.sHandler, newExpression, false);
		});
	}
};

LocalizationPackage.setEditions = function() {
	Formulae.addEdition(this.messages.pathLanguage, null, this.messages.leafLanguage,           LocalizationPackage.editionLanguage);
	Formulae.addEdition(this.messages.pathLanguage, null, this.messages.leafGetCurrentLanguage, () => Expression.replacingEdition("Localization.Language.GetCurrentLanguage"));
	Formulae.addEdition(this.messages.pathLanguage, null, this.messages.leafGetLanguageList,    () => Expression.replacingEdition("Localization.Language.GetLanguageList"));

	Formulae.addEdition(this.messages.pathCountry, null, this.messages.leafCountry,           LocalizationPackage.editionCountry);
	Formulae.addEdition(this.messages.pathCountry, null, this.messages.leafGetCurrentCountry, () => Expression.replacingEdition("Localization.Country.GetCurrentCountry"));
	Formulae.addEdition(this.messages.pathCountry, null, this.messages.leafGetCountryList,    () => Expression.replacingEdition("Localization.Country.GetCountryList"));

	Formulae.addEdition(this.messages.pathScript, null, this.messages.leafScript,           LocalizationPackage.editionScript);
	Formulae.addEdition(this.messages.pathScript, null, this.messages.leafGetCurrentScript, () => Expression.replacingEdition("Localization.Script.GetCurrentScript"));
	Formulae.addEdition(this.messages.pathScript, null, this.messages.leafGetScriptList,    () => Expression.replacingEdition("Localization.Script.GetScriptList"));

	Formulae.addEdition(this.messages.pathNumeral, null, this.messages.leafNumeral,           LocalizationPackage.editionNumeral);
	Formulae.addEdition(this.messages.pathNumeral, null, this.messages.leafGetCurrentNumeral, () => Expression.replacingEdition("Localization.Numeral.GetCurrentNumeral"));
	Formulae.addEdition(this.messages.pathNumeral, null, this.messages.leafGetNumeralList,    () => Expression.replacingEdition("Localization.Numeral.GetNumeralList"));

	Formulae.addEdition(this.messages.pathCalendar, null, this.messages.leafCalendar,           LocalizationPackage.editionCalendar);
	Formulae.addEdition(this.messages.pathCalendar, null, this.messages.leafGetCurrentCalendar, () => Expression.replacingEdition("Localization.Calendar.GetCurrentCalendar"));
	Formulae.addEdition(this.messages.pathCalendar, null, this.messages.leafGetCalendarList,    () => Expression.replacingEdition("Localization.Calendar.GetCalendarList"));

	Formulae.addEdition(this.messages.pathLocale, null, this.messages.leafLocale,           LocalizationPackage.editionLocale);
	Formulae.addEdition(this.messages.pathLocale, null, this.messages.leafGetCurrentLocale, () => Expression.replacingEdition("Localization.Locale.GetCurrentLocale"));
	Formulae.addEdition(this.messages.pathLocale, null, this.messages.leafGetLocaleList,    () => Expression.replacingEdition("Localization.Locale.GetLocaleList"));
	Formulae.addEdition(this.messages.pathLocale, null, this.messages.leafGetLanguage,      () => Expression.wrapperEdition  ("Localization.Locale.GetLanguage"));
	Formulae.addEdition(this.messages.pathLocale, null, this.messages.leafGetCountry,       () => Expression.wrapperEdition  ("Localization.Locale.GetCountry"));
	Formulae.addEdition(this.messages.pathLocale, null, this.messages.leafGetScript,        () => Expression.wrapperEdition  ("Localization.Locale.GetScript"));
	Formulae.addEdition(this.messages.pathLocale, null, this.messages.leafGetNumeral,       () => Expression.wrapperEdition  ("Localization.Locale.GetNumeral"));
	Formulae.addEdition(this.messages.pathLocale, null, this.messages.leafGetCalendar,      () => Expression.wrapperEdition  ("Localization.Locale.GetCalendar"));
	Formulae.addEdition(this.messages.pathLocale, null, this.messages.leafWithLocale,       () => Expression.multipleEdition ("Localization.Locale.WithLocale", 2, 0));

	Formulae.addEdition(this.messages.pathTimeZone, null, this.messages.leafTimeZone,           LocalizationPackage.editionTimeZone);
	Formulae.addEdition(this.messages.pathTimeZone, null, this.messages.leafGetCurrentTimeZone, () => Expression.replacingEdition("Localization.TimeZone.GetCurrentTimeZone"));
	Formulae.addEdition(this.messages.pathTimeZone, null, this.messages.leafGetTimeZoneList,    () => Expression.replacingEdition("Localization.TimeZone.GetTimeZoneList"));
	Formulae.addEdition(this.messages.pathTimeZone, null, this.messages.leafWithTimeZone,       () => Expression.multipleEdition  ("Localization.TimeZone.WithTimeZone", 2, 0));

	Formulae.addEdition(this.messages.pathFormat, null, this.messages.leafLocaleName,     () => Expression.wrapperEdition  ("Localization.Format.LocaleName"));
	Formulae.addEdition(this.messages.pathFormat, null, this.messages.leafLanguageName,   () => Expression.wrapperEdition  ("Localization.Format.LanguageName"));
	Formulae.addEdition(this.messages.pathFormat, null, this.messages.leafCountryName,    () => Expression.wrapperEdition  ("Localization.Format.CountryName"));
	Formulae.addEdition(this.messages.pathFormat, null, this.messages.leafQuoteString,    () => Expression.wrapperEdition  ("Localization.Format.QuoteString"));
	Formulae.addEdition(this.messages.pathFormat, null, this.messages.leafFormatNumber,   () => Expression.wrapperEdition  ("Localization.Format.FormatNumber"));
	Formulae.addEdition(this.messages.pathFormat, null, this.messages.leafFormatCurrency, () => Expression.wrapperEdition  ("Localization.Format.FormatCurrency"));
	Formulae.addEdition(this.messages.pathFormat, null, this.messages.leafNumberName,     () => Expression.wrapperEdition  ("Localization.Format.NumberName"));
};

LocalizationPackage.setActions = function() {
	Formulae.addAction("Localization.Language.Language", LocalizationPackage.actionLanguage);
	Formulae.addAction("Localization.Country.Country",   LocalizationPackage.actionCountry);
	Formulae.addAction("Localization.Script.Script",     LocalizationPackage.actionScript);
	Formulae.addAction("Localization.Numeral.Numeral",   LocalizationPackage.actionNumeral);
	Formulae.addAction("Localization.Calendar.Calendar", LocalizationPackage.actionCalendar);
	Formulae.addAction("Localization.Locale.Locale",     LocalizationPackage.actionLocale);
	Formulae.addAction("Localization.TimeZone.TimeZone", LocalizationPackage.actionTimeZone);
};
