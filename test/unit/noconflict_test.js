$(function() {
	module('noconflict');
	
	function _c(d) { return d.chronic_clone(); }
	
	test("is Date.prototype.add == Date.prototype.chronic_add", function() {
		base = new Date(2000, 1, 12);
		ok(Date.prototype.add == Date.prototype.chronic_add, 'Protoypes are equal');
		same(_c(base).add(5), _c(base).chronic_add(5));
	});
	
	test("is Date.prototype.reset == Date.prototype.chronic_reset", function() {
		base = new Date(2000, 1, 12, 13, 12, 12);
		ok(Date.prototype.reset == Date.prototype.chronic_reset, 'Prototypes are equal');
		same(_c(base).reset(), _c(base).chronic_reset());
	});
	
	test("is Date.prototype.clone == Date.prototype.chronic_clone", function() {
		base = new Date(2000, 1, 12, 13, 12, 12);
		ok(Date.prototype.reset == Date.prototype.chronic_reset, 'Prototypes are equal');
		same(base.clone(), base.chronic_clone());
	});
	
	test("is Date.today == Date.chronic_today", function() {
		ok(Date.today == Date.chronic_today, 'Prototypes are equal');
		same(Date.today(), Date.chronic_today());
	});
	
	test("is Date.rparse == Date.chronic_parse", function() {
		ok(Date.rparse == Date.chronic_parse, 'Prototypes are equal');
		same(Date.rparse('2d'), Date.chronic_parse('2d'));
	});
	
	test("if Chronic.noConflict called -> Date.add no longer existent!", function() {
		Date.chronic_noConflict();
		ok(Date.today == undefined);
		ok(Date.prototype.reset == undefined);
		ok(Date.chronic_today());
	});
});