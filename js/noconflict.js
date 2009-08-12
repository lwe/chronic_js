(function() {
	var $D = Date;
	var $P = Date.prototype;
	
	var CLASS_METHODS = ["today", "rparse"];
	var INSTANCE_METHODS = ["clone", "add", "reset"];
	
	for (var i = 0, l = CLASS_METHODS.length; i < l; i++) {
		m = CLASS_METHODS[i];
		if ($D[m]) $D['_' + m] = $D[m]; // save old method
		$D[m] = $D["chronic_" + m];
	}
	
	for (var i = 0, l = INSTANCE_METHODS.length; i < l; i++) {
		m = INSTANCE_METHODS[i];
		if ($P[m]) $P['_' + m] = $P[m]; // save old method
		$P[m] = $P["chronic_" + m];
	}
	
	/** Retain all functionality back to original owner. */
	$D.chronic_noConflict = function() {
		for (var i = 0, l = CLASS_METHODS.length; i < l; i++) {
			m = CLASS_METHODS[i];
			$D[m] = $D['_' + m]; // retain old behaviour!
		}
		for (var i = 0, l = INSTANCE_METHODS.length; i < l; i++) {
			m = INSTANCE_METHODS[i];
			$P[m] = $P['_' + m]; // retain old behaviour!
		}
	};	
}());