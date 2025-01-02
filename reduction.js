/*
Fōrmulæ localization package. Module for reduction.
Copyright (C) 2015-2025 Laurence R. Ugalde

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

'use strict';

export class LocalizationPackage extends Formulae.Package {}

const MAX =
	999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999n
;

// English

const small = [
	"", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
	"eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
];

const tens = [
	"", "", "twenty", "thirty", "forty",
	"fifty", "sixty", "seventy", "eighty", "ninety"
];

const big = [
	"",
	"thousand",
	"m",     //  1
	"b",     //  2
	"tr",    //  3
	"quadr", //  4
	"quint", //  5
	"sext",  //  6
	"sept",  //  7
	"oct",   //  8
	"non",   //  9
	"dec",   // 10
	
	"undec",       // 11
	"duodec",      // 12
	"tredec",      // 13
	"quattuordec", // 14
	"quinquadec",  // 15
	"sedec",       // 16
	"septendec",   // 17
	"octodec",     // 18
	"novendec",    // 19
	
	"vigint",         // 20
	"unvigint",       // 21
	"duovigint",      // 22
	"tresvigint",     // 23
	"quattuorvigint", // 24
	"quinquavigint",  // 25
	"sesvigint",      // 26
	"septemvigint",   // 27
	"octovigint",     // 28
	"novemvigint",    // 29
	
	"trigint",         // 30
	"untrigint",       // 31
	"duotrigint",      // 32
	"trestrigint",     // 33
	"quattuortrigint", // 34
	"quinquatrigint",  // 35
	"sestrigint",      // 36
	"septentrigint",   // 37
	"octotrigint",     // 38
	"noventrigint",    // 39
	
	"quadragint",         // 40
	"unquadragint",       // 41
	"duoquadragint",      // 42
	"tresquadragint",     // 43
	"quattuorquadragint", // 44
	"quinquaquadragint",  // 45
	"sesquadragint",      // 46
	"septenquadragint",   // 47
	"octoquadragint",     // 48
	"novenquadragint",    // 49
	
	"quinquagint",         // 50
	"unquinquagint",       // 51
	"duoquinquagint",      // 52
	"tresquinquagint",     // 53
	"quattuorquinquagint", // 54
	"quinquaquinquagint",  // 55
	"sesquinquagint",      // 56
	"septenquinquagint",   // 57
	"octoquinquagint",     // 58
	"novenquinquagint",    // 59
	
	"sexagint",         // 60
	"unsexagint",       // 61
	"duosexagint",      // 62
	"tressexagint",     // 63
	"quattuorsexagint", // 64
	"quinquasexagint",  // 65
	"sessexagint",      // 66
	"septensexagint",   // 67
	"octosexagint",     // 68
	"novensexagint",    // 69
	
	"septuagint",         // 70
	"unseptuagint",       // 71
	"duoseptuagint",      // 72
	"tresseptuagint",     // 73
	"quattuorseptuagint", // 74
	"quinquaseptuagint",  // 75
	"sesseptuagint",      // 76
	"septenseptuagint",   // 77
	"octoseptuagint",     // 78
	"novenseptuagint",    // 79
	
	"octogint",         // 80
	"unoctogint",       // 81
	"duooctogint",      // 82
	"tresoctogint",     // 83
	"quattuoroctogint", // 84
	"quinquaoctogint",  // 85
	"sesoctogint",      // 86
	"septenoctogint",   // 87
	"octooctogint",     // 88
	"novenoctogint",    // 89
	
	"nonagint",         // 90
	"unononagint",      // 91
	"duononagint",      // 92
	"tresnonagint",     // 93
	"quattuornonagint", // 94
	"quinquanonagint",  // 95
	"sesnonagint",      // 96
	"septennonagint",   // 97
	"octononagint",     // 98
	"novennonagint",    // 99
];

//const _100  = 100n;
//const _1000 = 1000n;

let numberNameEnglish = (number, session) => {
	if (number.isZero()) {
		return "zero";
	}
	
	const _10 = CanonicalArithmetic.createInteger(10, session);
	const _100 = CanonicalArithmetic.createInteger(100, session);
	const _1000 = CanonicalArithmetic.createInteger(1000, session);
	
	let name = "";
	let unit = 1;
	let rem100, rem1000, hundreds;
	
	while (true) {
		rem100 = number.remainder(_100).toNative();
		
		if (rem100 >= 20) {
			if (Math.floor(rem100 % 10) == 0) {
				name = tens[Math.floor(rem100 / 10)] + " " + name;
			} else {
				name = tens[Math.floor(rem100 / 10)] + "-" + small[Math.floor(rem100 % 10)] + " " + name;
			}
		} else if (rem100 != 0) {
			name = small[rem100] + " " + name;
		}
		
		hundreds = Math.floor(number.remainder(_1000).toNative() / 100);
		//hundreds = Math.floor(Number(number % 1000n) / 100);
		if (hundreds !== 0) {
			name =  small[hundreds] + " hundred " + name;
		}
		
		number = number.integerDivisionForGCD(_1000);
		//number = number / 1000n;
		
		if (number.isZero()) {
			break;
		}
		
		let rem1000 = number.remainder(_1000).toNative();
		//let rem1000 = Number(number % 1000n);
		if (rem1000 !== 0) {
			if (unit < 2) {
				name = big[unit] + " " + name;
			}
			else {
				name = big[unit] + "illion " + name;
			}
		}
		
		++unit;
	}
	
	return name.trim();
};

// spanish

const unidades = [
	null, "un ", "dos ", "tres ", "cuatro ",
	"cinco ", "seis ", "siete ", "ocho ", "nueve "
];

const decenas = [
	null, "dieci", "veinti", "treinta ", "cuarenta ",
	"cincuenta ", "sesenta ", "setenta ", "ochenta ", "noventa "
];

const centenas = [
	null, "ciento ", "doscientos ", "trescientos ", "cuatrocientos ",
	"quinientos ", "seiscientos ", "setecientos ", "ochocientos ", "novecientos "
];

const especiales = [
	"diez ", "once ", "doce ", "trece ", "catorce ", "quince "
];

const llones = [
	null,
	"m",
	"b",     // 2
	"tr",    // 3
	"cuatr", // 4
	"quint", // 5
	"sext",  // 6
	"sept",  // 7
	"oct",   // 8
	"non",   // 9
	
	"dec",       // 10
	"undec",     // 11
	"duodec",    // 12
	"tridec",    // 13
	"cuatridec", // 14
	"quintidec", // 15
	"sextidec",  // 16
	"septidec",  // 17
	"octidec",   // 18
	"nonidec",   // 19
	
	"vigec",       // 20
	"unvigec",     // 21
	"duovigec",    // 22
	"trivigec",    // 23
	"cuatrivigec", // 24
	"quintivigec", // 25
	"sextivigec",  // 26
	"septivigec",  // 27
	"octivigec",   // 28
	"nonivigec",   // 29
	
	"trigec",       // 30
	"untrigec",     // 31
	"duotrigec",    // 32
	"tritrigec",    // 33
	"cuatritrigec", // 34
	"quintitrigec", // 35
	"sextitrigec",  // 66
	"septitrigec",  // 37
	"octitrigec",   // 38
	"nonitrigec",   // 39
	
	"cuatrigec",       // 40
	"uncuatrigec",     // 41
	"duocuatrigec",    // 42
	"tricuatrigec",    // 43
	"cuatricuatrigec", // 44
	"quinticuatrigec", // 45
	"sexticuatrigec",  // 46
	"septicuatrigec",  // 47
	"octicuatrigec",   // 48
	"nonicuatrigec",   // 49
	
	"quintigec",       // 50
	"unquintigec",     // 51
	"duoquintigec",    // 52
	"triquintigec",    // 53
	"cuatriquintigec", // 54
	"quintiquintigec", // 55
	"sextiquintigec",  // 56
	"septiquintigec",  // 57
	"octiquintigec",   // 58
	"noniquintigec",   // 59
	
	"sextigec",       // 60
	"unsextigec",     // 61
	"duosextigec",    // 62
	"trisextigec",    // 63
	"cuatrisextigec", // 64
	"quintisextigec", // 65
	"sextisextigec",  // 66
	"septisextigec",  // 67
	"octisextigec",   // 68
	"nonisextigec",   // 69
	
	"septigec",       // 70
	"unseptigec",     // 71
	"duoseptigec",    // 72
	"triseptigec",    // 73
	"cuatriseptigec", // 74
	"quintiseptigec", // 75
	"sextiseptigec",  // 76
	"septiseptigec",  // 77
	"octiseptigec",   // 78
	"noniseptigec",   // 79
	
	"octigec",       // 80
	"unoctigec",     // 81
	"duooctigec",    // 82
	"trioctigec",    // 83
	"cuatrioctigec", // 84
	"quintioctigec", // 85
	"sextioctigec",  // 86
	"septioctigec",  // 87
	"octioctigec",   // 88
	"nonioctigec",   // 89
	
	"nonigec",       // 90
	"unnonigec",     // 91
	"duononigec",    // 92
	"trinonigec",    // 93
	"cuatrinonigec", // 94
	"quintinonigec", // 95
	"sextinonigec",  // 96
	"septinonigec",  // 97
	"octinonigec",   // 98
	"noninonigec",   // 99
];

let numberNameSpanish = n => {
	let s = n.toString();
	let len = s.length;
	
	let u, d, c;
	let ternas = Math.floor((len + 2) / 3);
	switch ((ternas * 3) - len) {
		case 1: s =  "0" + s; break;
		case 2: s = "00" + s; break;
	}
	
	let nominal = "";
	let terna;
	let miles = false;
	let huboMiles = false;
	let sumaTerna;
	
	for (let t = 0; t < ternas; ++t) {
		terna = ternas - t;
		c = s.charAt(3 * t    ) - '0';
		d = s.charAt(3 * t + 1) - '0';
		u = s.charAt(3 * t + 2) - '0';
		
		sumaTerna = (100 * c) + (10 * d) + u;
		
		terna: {
			miles = (terna % 2) == 0;
			
			if (miles) huboMiles = sumaTerna > 0;
			
			if (sumaTerna == 100) {
				nominal += "cien ";
				break terna;
			}
			
			if (sumaTerna == 1 && miles) { // 001 y miles -> nada
				break terna;
			}
			
			if (c > 0) nominal += centenas[c];
			
			if (d == 1 && u <= 5) { // 10 .. 15
				nominal += especiales[u];
				break terna;
			}
			
			if (d == 2 && u == 0) { // ?20
				nominal += "veinte ";
				break terna;
			}
			
			if (d > 0) nominal += decenas[d];
			
			if (u > 0) {
				if (d >= 3) {
					nominal += "y ";
				}
				
				if (u == 1 && terna == 1) {
					nominal += "uno ";
					break terna;
				}
				
				nominal += unidades[u];
			}
		}
		
		if (miles) {
			if (huboMiles) nominal += "mil ";
		}
		else { // millones
			if (terna > 1) {
				if (huboMiles || sumaTerna > 0) {
					nominal += llones[(terna - 1) / 2];
					
					if (huboMiles || sumaTerna > 1) {
						nominal += "illones";
					}
					else {
						nominal += "illón";
					}
					
					nominal += " ";
				}
			}
		}
	}
	
	//return nominal.substring(0, nominal.length - 1);
	return nominal.trim();
};

LocalizationPackage.numberName = async (numberName, session) => {
	let i = numberName.children[0];
	
	let locale = Formulae.locale;
	if (numberName.children.length >= 2) {
		let l = numberName.children[1];
		if (l.getTag() !== "String.String") return false;
		locale = l.get("Value");
	}
	
	//if (!i.isInternalNumber()) return false;
	//let bi = i.get("Value");
	//if (!CanonicalArithmetic.isInteger(bi)) return false;
	//if (bi.isNegative() || CanonicalArithmetic.comparison(bi, MAX) > 0) return false;
	
	let n = CanonicalArithmetic.getInteger(i);
	if (n === undefined || n.isNegative()) return false;
	
	let str;
	
	if (locale.startsWith("en")) {
		str = numberNameEnglish(n, session);
	}
	else if (locale.startsWith("es")) {
		str = numberNameSpanish(n, session);
	}
	else {
		return false;
	}
	
	let result = Formulae.createExpression("String.String");
	result.set("Value", str)
	
	numberName.replaceBy(result);
	return true;
};

LocalizationPackage.setReducers = () => {
	ReductionManager.addReducer("Localization.Format.NumberName", LocalizationPackage.numberName, "LocalizationPackage.numberName");
};
