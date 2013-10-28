// pimpmytext.js
// helper function to remove empty items from array, thanks internet
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

function izzleIt(text)
{
	return text.replace(/\./g, "-izzle.");
}

function pigLatin(text)
{
	var vowels = "aeiou";
	var consonants = "bcdfghjklmnpqrstvwxyz";
	text = text.toLowerCase();
	var fixedSentences = [];
	var closingPeriod = "";
	var punctuation = "";

	// is there a period at the very end of the text?
	// if so, we'll need to replace it later.
	// Our join will only add back the ones in the middle.
	if(text[text.length - 1] == ".")
	{
		closingPeriod = ".";
	}

	var sentences = text.split(".").clean("");

	for(var i = 0; i < sentences.length; i++)
	{
		var words = sentences[i].split(" ").clean("");

		$.each(words, function(idx, val){

			if(vowels.indexOf(val[val.length - 1]) == -1 &&
				consonants.indexOf(val[val.length - 1]) == -1)
			{
				// the last character in the word must be punctuation
				// save it to add back at the end of the word
				punctuation = words[idx].slice(-1)
				words[idx] = words[idx].replace(punctuation, "");
			}
			else
			{
				punctuation = "";
			}

			if(vowels.indexOf(val[0]) > -1)
			{
				// first letter is a vowel
				words[idx] += "ay" + punctuation;
			}
			else
			{
				// first letter is a consonant
				var cluster = "";

				// check letters in word for consonants
				var letter;
				for (var j = 0; j < words[idx].length; j++) 
				{
					letter = words[idx][j];
					if(consonants.indexOf(letter) > -1)
					{
						// consonant found, add to cluster
						cluster += letter;
					}
					else
					{
						// vowel or punctuation found, get out of here!
						break;
					}
				}
				// add the consonant cluster to the end + ay		
				words[idx] += cluster + "ay" + punctuation;
			}
		});
		
		fixedSentences[i] = words.join(" ");
	}
	return fixedSentences.join(". ") + closingPeriod;
}

$(function(){
	// set initial font size for text so that it
	// can be incremented later
	$('#text')[0].style.fontSize = "12pt";

	$('#bigpimp').click(function(){
		// cannot use $().css because it gets the calculated style (in px only)
		// we're working with pt
		var embiggen = setInterval(function(){
			var numericTextSize = parseInt($('#text')[0].style.fontSize);
			numericTextSize += 2;
			textSize = numericTextSize + "pt";
			$('#text')[0].style.fontSize = textSize;
		}, 500);
		// prevent multiple timer spawns by removing the click handler
		$(this).unbind();
	});

	$('#bling').change(function(){
		$('#text').toggleClass('bling');
		$('body').toggleClass('bodyback');
		if($(this).prop('checked'))
		{
			// text blinking browser support died long ago
			$('#text').modernBlink('start');
		}
		else
		{
			$('#text').modernBlink('stop');
		}
	});

	$('#snoopify').click(function(){
		var theText = $('#text').val();
		$('#text').val(izzleIt(theText).toUpperCase());
	});

	$('#pigLatin').click(function(){
		var theText = $('#text').val();
		$('#text').val(pigLatin(theText));
	});
});