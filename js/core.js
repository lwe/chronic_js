(function() {
	var $D = Date;
	var $P = $D.prototype;
	
	$D.ChronicInfo = {
		version: "@VERSION@",
		date: "@DATE@",
		name: "chronic.js - the regex-based, internationalized, date-expressions parser"		
	};
	
	/**
	 * Returns a new date instance, with the time reseted to
	 * midnight (00:00:00.000).
	 * @returns {Date} today
	 */
	$D.chronic_today = function() {
		return (new Date()).chronic_reset();
	}
	
	/**
	 * Internal method to check wheter supplied
	 * year is a leap year or not.
	 * @return {Boolean} true if year is a leap year, else false
	 */
	$D.chronic_leapYear = function(year) {
    return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);		
	}
	
	/* Kinda private */
	$D.chronic_daysInMonth = function(year, month) {
    return [31, ($D.chronic_leapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];		
	}
	
	/** Reset time to 00:00:00.000. */
	$P.chronic_reset = function() {
		this.setMilliseconds(0);
		this.setSeconds(0);
		this.setMinutes(0);
		this.setHours(0);
		return this;
	}

	/** Clones a date instance. */
	$P.chronic_clone = function() {
		return new Date(this.getTime());		
	}
	
	/**
	 * Do calculations with a date instance.
	 */
	$P.chronic_add = function() {
		n = parseInt(arguments[0]);
		value = n || 1;
		unit = isNaN(n) ? arguments[0] : arguments[1];
		switch (unit) {
			case 'm':
			case 'month':
			case 'months':
				_date = this.getDate();
				this.setDate(1);
				this.setMonth(this.getMonth() + value * 1);
				this.setDate(Math.min(_date, $D.chronic_daysInMonth(this.getFullYear(), this.getMonth())));
				break;
			case 'y':
			case 'year':
			case 'years':
				this.chronic_add(value * 12, 'months');
				break;
			case 'w':
			case 'week':
			case 'weeks':
				this.chronic_add(value * 7, 'days');
				break;
			case 'd':
			case 'day':
			case 'days':
			default: /* days */
				this.setDate(this.getDate() + value * 1);
		}
		return this;
	};	
}());