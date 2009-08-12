Date.Locale = {
	locale: 'en',

	dateOrder: 'mdy',

	patterns: {		
		// days
		mon: /^mo(n(day)?)?\b/,
		tue: /^tu(e(sday)?)?\b/,
		wed: /^wed(nesday)?\b/,
		thu: /^th(u(rsday)?)?\b/,
		fri: /^fr(i(day)?)?\b/,
		sat: /^sa(t(urday)?)?\b/,
		sun: /^su(n(day)?)?\b/,
	
		// months
		jan: /^jan(?:uary)?(\s+\d{2,4})?/,
		feb: /^feb(?:ruary)?(\s+\d{2,4})?/,
		mrz: /^mar(?:ch)?(\s+\d{2,4})?/,
		apr: /^apr(?:il)?(\s+\d{2,4})?/,
		may: /^may(\s+\d{2,4})?/,
		jun: /^june?(\s+\d{2,4})?/,
		jul: /^july?(\s+\d{2,4})?/,
		aug: /^aug(?:ust)?(\s+\d{2,4})?/,
		sep: /^sep(?:t(?:ember)?)?(\s+\d{2,4})?/,
		oct: /^oct(?:ober)?(\s+\d{2,4})?/,
		nov: /^nov(?:ember)?(\s+\d{2,4})?/,
		dec: /^dec(?:ember)?(\s+\d{2,4})?/,
	
		// units
		day: /^(\d+)?\s*d(ays?)?\b/,
		week: /^(\d+)?\s*w(eeks?|k)?\b/,
		month: /^(\d+)?\s*m(onths?)?\b/,
		year: /^(\d+)?\s*y(ears?)?\b/,
	
		// specials
		today: /^t(oday)?\b/i,
		tomorrow: /^tomorrow\b/i,	
		add: /^(?:next|nx|in|\+)\s*(.*)$/i,
	
		// seasons
		spring: /^spring(\s+\d{2,4})?/i,
		summer: /^summer(\s+\d{2,4})?/i,
		fall:   /^fall(\s+\d{2,4})?/i,
		winter: /^winter(\s+\d{2,4})?/i
	}
};