// tracklist.js
// Music download manager -- Smalltalk style :)
// AJ 2007-04-30
// Requires jQuery 3.7.1

(function(window, $) {
	'use strict';

	var DDA = {
	site: "https://drdraardvark.glitch.me/",
	path: "https://drdraardvark.glitch.me/",
  mp3dir: "https://s3-ap-southeast-2.amazonaws.com/alphajuliet-s3-mp3/drdraardvark/",
	sets: [
			{
				artist: "dr dr aardvark",
				title: "2009",
				tracks: ["Telekom"]
			},
			{
				artist: "dr dr aardvark",
				title: "Myriad (2008)",
				artwork: "images/myriad.jpg",
				tracks: ["Aerosol", "Biollay", "Barberaz", "ToolsForSuccess", "Cognin", "Prime", "Nickel", "Mold", "Thorium", "P-N", "LongDistance"]
			},
			{
				artist: "dr dr aardvark",
				title: "Particles (2007)",
				artwork: "images/particles.jpg",
				metadata: "data/Particles.n3",
				tracks: ["Depart", "Servolex", "Aftos", "Bissy", "Roort", "Potential", "Coumt", "Teld", "Ilmeg", "Argoil", "Coil", "Gament", "Darius", "Aketh"]
			},
			{
				artist: "dr dr aardvark",
				title: "Carousel (2006)",
				artwork: "images/carousel.jpg",
				metadata: "data/Carousel.n3",
				tracks: ["Stati", "Tiproof", "Strond", "Chilt"]
			},
			{
				artist: "dr dr aardvark",
				title: "Derivative (1999)",
				artwork: "images/derivative.jpg",
				tracks: ["Ascent", "Derivative", "AsianSeas", "Sexkontakt", "Disuse", "PoliceAndThieves", "NakedMile", "Dynix", "Spystar", "Sanctum", "SnowAtEaster"]
			},
			{
				artist: "dr dr aardvark",
				title: "Astralux (1996)",
				artwork: "images/astralux.jpg",
				tracks: ["FunPark", "Aerobic", "Follicle", "Dustbowl", "Feature", "Shelter", "Puncture", "Beach"]
			},
			{
				artist: "dr dr aardvark",
				title: "Selected (1991-2008)",
				tracks: ["SandDunes", "Delb", "Demons", "Plaster"]
			},
			{
				artist: "Citystate",
				title: "Vault Tracks (1996-2000)",
				tracks: ["Excision", "SystemShock", "LuminousSandsOfTime", "LawnDogs", "Sundial"]
			}
	]
	};

	// ----------------------------------
	// Load the current tracks into the download selector
	function loadTracks() {
		var target = $('#tracklist');
		if (!target)
			return;
		target.html('');  	// Remove the no-Javascript text from the XHTML
		
		DDA.sets.forEach(function (set, i) {
			var album = new Set(set);
			album.attachTo(target);
		});
		
		// Hide all the tracklists initially and set up event handlers
		$('div.set_body').hide();
		$('div.set_header').click(function() {
			$(this).next('div').toggle('slow');
		});
	}

	// ----------------------------------
	// Class: Set
	// Make a set of music... Set := {Artist, Title, Artwork?, Metadata?, Track+}
	function Set(aSet) {
		
		// Public method
		this.attachTo = function (target) {
			target.append(createHeader(aSet));
			
			var container = $(`<div class='set_body'></div>`);		
			container.append(createArtwork(aSet));

			var tracks = new TrackList(aSet.tracks);
			tracks.attachTo(container);

			container.append(createMetadata(aSet));
			
			target.append(container);
		};

		// private methods
		var createHeader = function (aSet) {
			if (!aSet) return;
			var heading = $(`<p>${aSet.artist}: ${aSet.title}</p>`);
			var header = $(`<div class='set_header'></div>`);
			header.append(heading);
			return header;
		};
		
		var createArtwork = function (aSet) {
			if (!aSet) return;
			if (aSet.artwork != null) {
				var artwork = $(`<img src='${aSet.artwork}' alt='${aSet.title}' height='150' width='150' class='artwork'/>`);
				return artwork;
			}
			else
				return null;
		};
		
		var createMetadata = function (aSet) {
			if (!aSet) return;
			if (aSet.metadata != null) {
				var rdf_link = $(`<a href=${aSet.metadata}>[rdf+n3]</a>`);
				var metadata = $(`<p class='small'></p>`);
				metadata.append(rdf_link);
				return metadata;
			}
			return null;
		};
	}

	// ----------------------------------
	// Class: TrackList
	function TrackList(anArray) {
		this.trackNames = anArray || [];
		
		this.attachTo = function (target) {
			var container = $(`<ol class='track_list'></ol>`);
			this.trackNames.forEach(function (name, i) {
				var track = new Track(name);
				track.attachTo(container);
			});
			target.append(container);
		};
	}

	// ----------------------------------
	// Class: Track
	function Track(aName) {
		this.name = aName || 'untitled';

		this.attachTo = function (target) {
			var trackUrl = `${DDA.mp3dir}${this.name}.mp3`;
			var a = $(`<a href='${trackUrl}' target='_blank'>${this.name}</a>`);

			var container = $('<li></li>');
			container.append(a);
			target.append(container);
		};
	}


	// ----------------------------------
	// Initialize when DOM is ready
	$(document).ready(loadTracks);

	// Expose only what's needed to global scope (none in this case)
	// window.DrDrAardvark = { loadTracks: loadTracks };

})(window, jQuery);

// The End
