# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static music website for "dr dr aardvark" - a personal music project. The site displays albums and tracks in an interactive JavaScript-based interface. It's built as a simple static HTML/CSS/JavaScript website without any build tools or package managers.

## Architecture

- **Static HTML Site**: Single-page application using jQuery for DOM manipulation
- **Data-driven Music Display**: Track and album information is stored in JavaScript objects in `js/tracklist.js`
- **RDF Metadata**: Album metadata stored as RDF+N3 files in the `data/` directory
- **External Assets**: MP3 files served from AWS S3, artwork from Glitch CDN

### Key Files

- `index.html`: Main page with RDFa metadata and Creative Commons licensing
- `js/tracklist.js`: Core application logic with Set, TrackList, and Track classes
- `css/dda2.css`: Styling with collapsible album sections
- `data/*.n3`: RDF metadata files for albums and tracks

### JavaScript Architecture

The application uses a class-based approach with:
- `DDA` object containing site configuration and album data
- `Set` class for album containers with artwork and metadata links
- `TrackList` class for managing collections of tracks
- `Track` class for individual track links to MP3 files

### Data Structure

Albums are defined in `DDA.sets` array with:
- Artist and title information
- Optional artwork URLs (from Glitch CDN)
- Track arrays (track names used to construct MP3 URLs)
- Optional metadata links to RDF+N3 files

## Development

This is a static website with no build process. Files can be edited directly and viewed in a browser.

### Testing Changes
- Open `index.html` in a web browser
- Enable JavaScript to see the dynamic track listing
- Verify MP3 links point to correct S3 URLs

### File Structure
```
/
├── index.html          # Main page
├── css/
│   ├── dda.css         # Legacy styles
│   └── dda2.css        # Current styles
├── js/
│   ├── jquery-1.1.3.1.pack.js  # jQuery library
│   ├── jquery-dom.js   # jQuery extensions
│   └── tracklist.js    # Main application
├── data/               # RDF metadata files
├── images/             # Local artwork and icons
└── atom.xml           # RSS feed
```

### External Dependencies
- MP3 files: `https://s3-ap-southeast-2.amazonaws.com/alphajuliet-s3-mp3/drdraardvark/`
- Artwork: Glitch CDN URLs in the JavaScript data
- jQuery 1.1.3.1 (included locally)