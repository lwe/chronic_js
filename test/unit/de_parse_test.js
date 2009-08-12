$(function() {
	module('parse');
	
	test("is Date.ChronicParser available?", function() {
		ok(Date.ChronicParser);
	});
	
	test("parsing 'heute', 't' or 'today' should return current date", function() {
		same(Date.chronic_parse('today'), Date.chronic_today(), "is today");
		same(Date.chronic_parse('heute'), Date.chronic_today(), "is today");
		same(Date.chronic_parse('t'), Date.chronic_today(), "is today");		
	});
	
	test("parsing 'tomorrow' or 'morgen' returns current date + 1 day", function() {
		same(Date.chronic_parse('morgen'), Date.chronic_today().chronic_add(1), "is tomorrow");
		same(Date.chronic_parse('tomorrow'), Date.chronic_today().chronic_add(1), "is tomorrow");		
	});
	
	test("parsing 'nachste woche' is equals today + 7 days", function() {
		next_week = Date.chronic_today().chronic_add(7, 'days');
		
		same(Date.chronic_parse('+ week'), next_week, "is next week '+ week'");
		same(Date.chronic_parse('nachste woche'), next_week, "and with different schreibweise: 'nachste Woche'");
	});
	
	test("adding using '5 days' = new Date().addDays(5)", function() {
		in_5_days = Date.chronic_today().chronic_add(5, 'days');
		
		same(Date.chronic_parse('5 tage'), in_5_days, 'is in 5 days...');
		same(Date.chronic_parse('in 5 tagen'), in_5_days, 'other schreibweise, prefixed with "in"');
		same(Date.chronic_parse('+5t'), in_5_days, 'and the short form "+5t"');
		same(Date.chronic_parse('5d'), in_5_days, 'and even shorter :) "5d"');
	});
	
	test("using the season keywords, like 'winter'", function() {
		winter_2020 = new Date(2020, 11, 21);
		same(Date.chronic_parse('winter 2020'), winter_2020);
	});
	
	test("ensure that season is advanced if season already passed...", function() {
		base = new Date(2009, 6, 30);
		next_summer = new Date(2010, 5, 21);
		this_fall = new Date(2009, 8, 22);
		same(Date.chronic_parse('summer', base), next_summer);
		same(Date.chronic_parse('next sommer', base), next_summer, 'and using the next keyword');
		same(Date.chronic_parse('herbst', base), this_fall, 'yet fall is in the year 2009...');
		// still allow englisch schreibweise
		same(Date.chronic_parse('fall 2010'), new Date(2010, 8, 22), 'using english writing...');		
	});
	
	test("parsing day names, like 'monday' or 'next friday'", function() {
		base = new Date(2009, 7, 12);
		next_mon = new Date(2009, 7, 17);
		next_wed = new Date(2009, 7, 19);
		next_thu = new Date(2009, 7, 13);
		
		same(Date.chronic_parse('montag', base), next_mon, "next monday");
		same(Date.chronic_parse('mi', base), next_wed, 'next wednesday => + 1 week');
		same(Date.chronic_parse('nachster donnerstag', base), next_thu, 'next thuesday => tomorrow');
	});
	
	test("parsing month names, to advance to this month, like 'next jan'", function() {
		base = new Date(2009, 7, 12);
		next_jan = new Date(2010, 0, 12);
		next_aug = new Date(2010, 7, 12);
		next_oct = new Date(2009, 9, 12);
		
		same(Date.chronic_parse('jan', base), next_jan, 'next january');
		same(Date.chronic_parse('next august', base), next_aug, 'next august');
		same(Date.chronic_parse('next okt', base), next_oct, 'next okt');
		same(Date.chronic_parse('next oct', base), next_oct, 'next oct');		
	});
	
	test("advance to month in a certain year, like 'jan 2020'", function() {		
		base = new Date(2009, 5, 1);
		jan_2012 = new Date(2012, 0, 1);
		jan_2020 = new Date(2020, 0, 1);
		feb_1999 = new Date(1999, 1, 1);
		same(Date.chronic_parse('jan 2020', base), jan_2020, "to january 2020");
		same(Date.chronic_parse('jan 12', base), jan_2012, "to january 2020 using 'jan 12'");
		same(Date.chronic_parse('feb 1999', base), feb_1999, "to februar 1999");
	});
	
	test("parsing any numbers...", function() {
		same(Date.chronic_parse('15'), Date.chronic_today().chronic_add(15), 'adding 15 days');
	});
	
	test('parsing a number as date using the "." suffix -> "15." => advance to the 15th', function() {
		base = new Date(2009, 7, 12);
		on_15_aug = new Date(2009, 7, 15);
		on_11_sep = new Date(2009, 8, 11);
		
		same(Date.chronic_parse('15th', base), on_15_aug, "go to to '15.'");
		same(Date.chronic_parse('11.', base), on_11_sep, "go to next month if '11.' and current date > 11");
	});
	
	test("parsing any dates, like 7/1/2009 or 2009-12-09", function() {
		first_jan = new Date(2010, 0, 1);
		nine_dec = new Date(2009, 11, 9);
		nine_sep = new Date(2009, 8, 9);
		
		same(Date.chronic_parse('1.1.2010', new Date(2009, 6, 1)), first_jan, "1.1.2009");
		same(Date.chronic_parse('2009-12-09'), nine_dec, '2009-12-09');
		same(Date.chronic_parse('9/9/09'), nine_sep, '9/9/09');		
	});
	
	test("parsing dates with missing parameters like, no year etc.", function() {
		base = new Date(2009, 5, 1);
		
		first_jan_2010 = new Date(2010, 0, 7);
		same(Date.chronic_parse('7.1', base), first_jan_2010, '7.1 -> from base 2010-01-07');
	});
});