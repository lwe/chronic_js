$(function() {		
	module('core');
	
	test("date.reset() -> ensures that hours = minutes = seconds = milliseconds = 0", function() {
		d = new Date();
		d.chronic_reset();
		
		equals(d.getHours(), 0, "hours == 0");
		equals(d.getMinutes(), 0, "minutes == 0");
		equals(d.getSeconds(), 0, "seconds == 0");
		equals(d.getMilliseconds(), 0, "milliseconds == 0");
		same(d, Date.chronic_today(), "and is same is Date.chronic_today()");
	});
	
	test("that 2009 is no leap year", function() {
		equals(Date.chronic_leapYear(2009), false, "2009 is not a leap year");
	});
	
	test("that 2008 is a leap year", function() {
		equals(Date.chronic_leapYear(2008), true, "2008 is a leap yar");
	});
	
	test("use add() to add everything :)", function() {
		d = new Date(2000, 0, 1);
		d.chronic_add(17); /* days */
		d.chronic_add(-1, 'week'); /* subtract a week! */
		d.chronic_add('month'); /* add 1 moth */
		d.chronic_add(6, 'years'); /* add 6 years */
		
		equals(d.getYear(), 106, "Year 2006");
		equals(d.getMonth(), 1, "February (0 = January)");
		equals(d.getDate(), 11, "11th");
		equals(d.getHours(), 0, "reseted => 0");
		equals(d.getMinutes(), 0, "reseted => 0");
		equals(d.getSeconds(), 0, "reseted => 0");
		equals(d.getMilliseconds(), 0, "reseted => 0");
	});
	
	test("use add() to add a year during a leap year", function() {
		d = new Date(2008, 1, 29);
		d.chronic_add('year'); // adding a year => 28th Feb 2009 (!)

		same(d, new Date(2009, 1, 28), "is the 28th Feb 2009");
	});
});