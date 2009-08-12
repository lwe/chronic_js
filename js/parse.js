(function() {
	var $D = Date;
	var $L = $D.Locale;
	var $PAT = $L.patterns;
	var $PR = $D.ChronicParser = {
		functions: {},
		log: window.console.log,
		MIN_YEAR: 1000,
		DEBUG: false,
		keywords: {}
	};
	var $FN = $PR.functions;
	var $KS = $PR.keywords;
	
	/* list of keywords for easier access/mix and match :) */
	$KS.days = " mon tue wed thu fri sat sun ";
	$KS.months = " jan feb mrz apr may jun jul aug sep oct nov dec ";
	$KS.units = " day week month year ";
	$KS.keywords = " tomorrow today ";
	$KS.orientation = " add subtract ";
	$KS.seasons = " spring summer fall winter ";
	
	/** Try to match against supplied keywords and call hanlder! */
	$PR.matchAndCall = function(str, date, keywords, functor) {
		keywords = keywords.trim().split(/\s+/);
		if ($PR.DEBUG) $PR.log("keywords => %o", keywords);
		for (var i = 0, l = keywords.length; i < l; i++) {
			var k = keywords[i];
			var match = str.match($PAT[k]);
			if ($PR.DEBUG) $PR.log("%s => %s (%o, %o)", k, str, date, match);
			if (match) {
				return $FN[k](date, (functor || function() { return match[1]; })(str, date, match));
			}
		}
	};

	// keywords
	$FN.today = function() { return Date.today(); };
	$FN.tomorrow = function() { return Date.today().add(1); };

	// orientation: future => add
	$FN.add = function(date, str) {
		return $PR.matchAndCall(str, date, $KS.days + $KS.months + $KS.units + $KS.seasons, function(s, d, m) { return parseInt(m[1]) || 1; });
	}
	
	// days
	$FN._daySet = function(date, dayOfWeek) {
		var diff = (dayOfWeek - date.getDay() + 7) % 7;
		return date.add(diff === 0 ? diff += 7 : diff);
	};
	$FN.sun = function(date) { return $FN._daySet(date, 0); };
	$FN.mon = function(date) { return $FN._daySet(date, 1); };
	$FN.tue = function(date) { return $FN._daySet(date, 2); };
	$FN.wed = function(date) { return $FN._daySet(date, 3); };
	$FN.thu = function(date) { return $FN._daySet(date, 4); };
	$FN.fri = function(date) { return $FN._daySet(date, 5); };
	$FN.sat = function(date) { return $FN._daySet(date, 6); };
	
	// months
	$FN._monthSet = function(date, year, month) {
		year = parseInt(year);
		_n = date.getDate();
		date.setDate(1);
		if (year > 1) date.setYear((year < $PR.MIN_YEAR ? year + 2000 : year) - 1);
		var diff = (month - date.getMonth() + 12) % 12;
		date.add(diff === 0 ? diff += 12 : diff, 'month');
		date.setDate(Math.min(_n, $D._daysInMonth(date.getFullYear(), date.getMonth())));
		return date;
	};
	$FN.jan = function(date, value) { return $FN._monthSet(date, value, 0); };
	$FN.feb = function(date, value) { return $FN._monthSet(date, value, 1); };
	$FN.mrz = function(date, value) { return $FN._monthSet(date, value, 2); };
	$FN.apr = function(date, value) { return $FN._monthSet(date, value, 3); };
	$FN.may = function(date, value) { return $FN._monthSet(date, value, 4); };
	$FN.jun = function(date, value) { return $FN._monthSet(date, value, 5); };
	$FN.jul = function(date, value) { return $FN._monthSet(date, value, 6); };
	$FN.aug = function(date, value) { return $FN._monthSet(date, value, 7); };
	$FN.sep = function(date, value) { return $FN._monthSet(date, value, 8); };
	$FN.oct = function(date, value) { return $FN._monthSet(date, value, 9); };
	$FN.nov = function(date, value) { return $FN._monthSet(date, value, 10); };
	$FN.dec = function(date, value) { return $FN._monthSet(date, value, 11); };
	
	// units: day, week, month, year etc.
	$FN.day   = function(date, value) { return date.add(value, 'day'); };
	$FN.week  = function(date, value) { return date.add(value, 'week'); };
	$FN.month = function(date, value) { return date.add(value, 'month'); };
	$FN.year  = function(date, value) { return date.add(value, 'year'); };
	
	// seasons
	$FN._seasonSet = function(date, year, day, month) {
		date.setDate(day);
		date.setMonth(month);
		if (year > 1) {
			date.setYear(year);
		}
		else if (date < date._base){
			date.add('year'); // advance a year
		}
		return date;
	};	
	$FN.spring = function(date, value) { return $FN._seasonSet(date, value, 20, 2); };
	$FN.summer = function(date, value) { return $FN._seasonSet(date, value, 21, 5); };
	$FN.fall = function(date, value) { return $FN._seasonSet(date, value, 22, 8); };
	$FN.winter = function(date, value) { return $FN._seasonSet(date, value, 21, 11); };
	
	// unmatched... (date formats / numeric)
	
	/** Called if no handler was able to parse the input up to this point. */
	$FN.unmatched = function(date, str) {
		if (str.match(/^\d{1,3}$/)) return $FN.number(date, parseInt(str));
		return $FN.date(date, str);
	}
	
	/** Numbers are just added as days... */
	$FN.number = function(date, value) { return date.add(value, 'days'); }
	
	$FN.date = function(date, values) {
		if (values.match(/^\d+\s*(\.|st|nd|rd|th)$/)) {
			// just an ordinal
			date.setDate(parseInt(values));
			if (date < date._base) date.add('month'); // add a month
		}
		else {
			values = values.split(/[\s\.\-\/]+/);

			// evaluate dayOfMonth (day), month and year
			year = $FN._parseInt(values[$L.dateOrder.indexOf('y')]) || date.getFullYear();
			month = $FN._parseInt(values[$L.dateOrder.indexOf('m')]) || date.getMonth();
			day = $FN._parseInt(values[$L.dateOrder.indexOf('d')]) || date.getDate();

			if (month > 12) { // switch day <-> month
				_tmp = day;
				day = month;
				month = _tmp;
			}
			if (day > 31) { // switch day <-> year
				_tmp = year;
				year = day;
				day = _tmp;
			}
			
			date.setYear(year < $PR.MIN_YEAR ? year + 2000 : year);
			date.setMonth(month - 1);
			date.setDate(day);
			if (date <= date._base) date.add('year');
		}
		
		return date;
	}
	
	/** Parse integer, but strip leading zeros (0). */
	$FN._parseInt = function(i) {
		if (i instanceof Number) return i;
		return parseInt((i + "").replace(/^0+/, ''));
	}
	
	/**
	 * Start parsing user input!
	 */
	$D.parse = function(str, date) {
		date = (date || Date.today()).clone();
		date._base = date.clone();
		var result = $PR.matchAndCall(str.trim(), date, $KS.keywords + $KS.orientation + $KS.days + $KS.months + $KS.units + $KS.seasons);
		if ( ! result) result = $FN.unmatched(date, str); // handle unmatched...
		return result;
	};
}());