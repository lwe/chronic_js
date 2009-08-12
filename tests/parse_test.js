$(function() {
	module('parse');
	
	test("is Date.ChronicParser available?", function() {
		ok(Date.ChronicParser);
	});
	
	test("parsing 'today' should return current date", function() {
		today = (new Date()).reset();
		parsed = Date.parse('today');
		
		same(parsed, today, "is today");
	});
	
	test("parsing 'tomorrow' returns current date + 1 day", function() {
		tomorrow = (new Date()).add(1).reset();
		parsed = Date.parse('tomorrow');
		
		same(parsed, tomorrow, "is tomorrow");
	});
	
	test("parsing 'next week' is equals today + 7 days", function() {
		next_week = Date.today().add(7, 'days');
		parsed = Date.parse('next week');
		
		same(parsed, next_week, "is next week");
		same(Date.parse('nx wk'), next_week, "and with different schreibweise: 'nx wk'");
	});
	
	test("adding using '5 days' = new Date().addDays(5)", function() {
		in_5_days = Date.today().add(5, 'days');
		parsed = Date.parse('5 days');
		
		same(parsed, in_5_days, 'is in 5 days...');
		same(Date.parse('in 5 days'), in_5_days, 'other schreibweise, prefixed with "in"');
		same(Date.parse('+5d'), in_5_days, 'and the short form "+5d"');
		same(Date.parse('5d'), in_5_days, 'and even shorter :) "5d"');
	});
	
	test("using the season keywords, like 'winter'", function() {
		winter_2020 = new Date(2020, 11, 21);
		same(Date.parse('winter 2020'), winter_2020);
	});
	
	test("ensure that season is advanced if season already passed...", function() {
		base = new Date(2009, 6, 30);
		next_summer = new Date(2010, 5, 21);
		this_fall = new Date(2009, 8, 22);
		same(Date.parse('summer', base), next_summer);
		same(Date.parse('next summer', base), next_summer, 'and using the next keyword');
		same(Date.parse('fall', base), this_fall, 'yet fall is in the year 2009...');
	});
	
	test("parsing day names, like 'monday' or 'next friday'", function() {
		base = new Date(2009, 7, 12);
		next_mon = new Date(2009, 7, 17);
		next_wed = new Date(2009, 7, 19);
		next_thu = new Date(2009, 7, 13);
		
		same(Date.parse('monday', base), next_mon, "next monday");
		same(Date.parse('wed', base), next_wed, 'next wednesday => + 1 week');
		same(Date.parse('next thu', base), next_thu, 'next thuesday => tomorrow');
	});
	
	test("parsing month names, to advance to this month, like 'next jan'", function() {
		base = new Date(2009, 7, 12);
		next_jan = new Date(2010, 0, 12);
		next_aug = new Date(2010, 7, 12);
		
		same(Date.parse('jan', base), next_jan, 'next january');
		same(Date.parse('next august', base), next_aug, 'next august');
	});
	
	test("advance to month in a certain year, like 'jan 2020'", function() {		
		base = new Date(2009, 5, 1);
		jan_2012 = new Date(2012, 0, 1);
		jan_2020 = new Date(2020, 0, 1);
		feb_1999 = new Date(1999, 1, 1);
		same(Date.parse('jan 2020', base), jan_2020, "to january 2020");
		same(Date.parse('jan 12', base), jan_2012, "to january 2020 using 'jan 12'");
		same(Date.parse('feb 1999', base), feb_1999, "to februar 1999");
	});
	
	test("parsing any numbers...", function() {
		same(Date.parse('15'), Date.today().add(15), 'adding 15 days');
	});
	
	test("parsing any dates, like 7/1 or 2009-12-09", function() {
		first_jul = new Date(2010, 6, 1);
		nine_dec = new Date(2009, 11, 9);
		
		same(Date.parse('7/1', new Date(2009, 7, 1)), first_jul, "advance to next july");
		same(Date.parse('2009-12-09'), nine_dec, 'set to 9th of december');
	});
		
	test('parsing a number as date using the "." suffix -> "15." => advance to the 15th', function() {
		base = new Date(2009, 7, 12);
		on_15_sep = new Date(2009, 8, 15);
		on_11_sep = new Date(2009, 8, 11);
		
		same(Date.parse('15.', base), on_15_sep, "go to to '15.'");
		same(Date.parse('11.', base), on_11_sep, "go to next month if '11.' and current date > 11");
	});
});