Date.Locale = {
	locale: 'de',

	dateOrder: 'dmy',

	patterns: {		
		// days
		mon: /^mo(ntag)?\b/,
		tue: /^di(enstag)?\b/,
		wed: /^mi(ttwoch)?\b/,
		thu: /^do(nnerstag)?\b/,
		fri: /^fr(eitag)?\b/,
		sat: /^sa(mstag)?\b/,
		sun: /^so(nntag)?\b/,
	
		// months
		jan: /^jan(?:uar)?(\s+\d{2,4})?/,
		feb: /^feb(?:ruar)?(\s+\d{2,4})?/,
		mrz: /^m.r(?:z)?(\s+\d{2,4})?/,
		apr: /^apr(?:il)?(\s+\d{2,4})?/,
		may: /^mai(\s+\d{2,4})?/,
		jun: /^juni?(\s+\d{2,4})?/,
		jul: /^juli?(\s+\d{2,4})?/,
		aug: /^aug(?:ust)?(\s+\d{2,4})?/,
		sep: /^sep(?:t(?:ember)?)?(\s+\d{2,4})?/,
		oct: /^o[ck]t(?:ober)?(\s+\d{2,4})?/,
		nov: /^nov(?:ember)?(\s+\d{2,4})?/,
		dec: /^de[cz](?:ember)?(\s+\d{2,4})?/,
	
		// units
		day: /^(\d+)?\s*(d(ays?)?|t(agen?)?)\b/,
		week: /^(\d+)?\s*w(eeks?|k|o(chen?)?)?\b/,
		month: /^(\d+)?\s*m(onths?|onate?)?\b/,
		year: /^(\d+)?\s*(y(ears?)?|j(ahre?)?)\b/,
	
		// specials
		today: /^t(oday)?|heute\b/i,
		tomorrow: /^tomorrow|morgen\b/i,	
		add: /^(?:next|nx|in|n.chster?|\+)\s*(.*)$/i,
	
		// seasons
		spring: /^fr.hling|spring(\s+\d{2,4})?/i,
		summer: /^s[uo]mmer(\s+\d{2,4})?/i,
		fall:   /^herbst|fall(\s+\d{2,4})?/i,
		winter: /^winter(\s+\d{2,4})?/i
	}
};