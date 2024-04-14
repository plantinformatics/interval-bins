
/*----------------------------------------------------------------------------*/

/* global require */
/* global exports */
/* global process */


/*----------------------------------------------------------------------------*/

/** Calculate the bin size for even-sized bins to span the given interval.
 * The bin size is rounded to be a multiple of a power of 10, only the first 1-2
 * digits are non-zero.
 * Used in @see binBoundaries().
 * @return lengthRounded
 */
function binEvenLengthRound(interval, nBins) {
  let lengthRounded;
  if (interval && (interval.length === 2) && (nBins > 0)) {
    /* if (interval[1] < interval[0])
     interval = interval.sort(); */
    /** handle -ve interval direction - could occur with only -ve features in block. */
    let intervalLength = Math.abs(interval[1] - interval[0]),
    binLength = intervalLength / nBins,
    digits = Math.floor(Math.log10(binLength)),
    eN1 = Math.exp(digits * Math.log(10)),
    mantissa = binLength / eN1,
    /** choose 1 2 or 5 as the first digit of the bin size. */
    m1 = mantissa > 5 ? 5 : (mantissa > 2 ? 2 : 1);
    if (digits >= 0) {
      lengthRounded = Math.round(m1 * eN1);
    } else {
      /** for e.g. digits===-1, eN1 is 0.09999999999999998,
       * and (m1 * eN1) is 0.4999999999999999 which will round down to 0.
       * So instead, use string operation to construct eN1, so .round() is not required.
       * This could probably be used for digits >= 0 also.
       *
       * A simpler form would be Math.round(m1 * eN1 * 100000) / 100000, but
       * that is limited to digits > -5, which would be sufficient for the
       * datasets used so far, e.g. a genetic map is ~200cM, so digits===-1, and
       * for a physical map digits==-6.
       */
      eN1 = '0.' + ('000000000000000'.substr(0, 1+digits)) + '1';
      lengthRounded = (m1 * eN1);
    }

    console.log('binEvenLengthRound', interval, nBins, intervalLength, binLength, digits, eN1, mantissa, m1, lengthRounded);
  }
  return lengthRounded;
};
exports.binEvenLengthRound = binEvenLengthRound;

/** Generate an array of even-sized bins to span the given interval.
 * Used for mongo aggregation pipeline : $bucket : boundaries.
 */
function binBoundaries(interval, lengthRounded) {
  let b;
  if (lengthRounded) {
    let
      start = interval[0],
    intervalLength = interval[1] - interval[0],
    direction = Math.sign(intervalLength),
    forward = (direction > 0) ?
      function (a,b)  {return a < b; }
    : function (a,b)  {return a > b; };

    let location = Math.floor(start / lengthRounded) * lengthRounded;
	  b = [location];
    do {
      location += lengthRounded;
      b.push(location);
    }
    while (forward(location, interval[1]));
    console.log('binBoundaries', direction, b.length, location, b[0], b[b.length-1]);
  }
  return b;
};
exports.binBoundaries = binBoundaries;

//------------------------------------------------------------------------------
