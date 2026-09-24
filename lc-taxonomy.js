/*
 * Language Clarity — canonical sound taxonomy (shared).
 *
 * This is a direct JS port of the category tables in psa_build.py
 * (CONSONANT_INFO / VOWEL_INFO / FINAL_CLUSTERS / SYLLABIC_CONSONANTS /
 * CATEGORY_ORDER / classify()). It is the single source of truth for
 * phoneme -> category + plain-English gloss, used by:
 *   - admin.html (Language Clarity — sound assignments panel)
 *   - clarity-focus.html (student "Your Clarity Focus" page)
 *   - trainer.html (student progress summaries)
 *
 * Do NOT hand-maintain a second copy of this mapping anywhere else in the
 * site. If the taxonomy changes, change it here (and in psa_build.py,
 * which stays the source for the PSA document itself) and nowhere else —
 * this is exactly the "hand-maintained duplicate" failure mode flagged in
 * the funnel skill (trainer.html's vocab-summary drift) that this module
 * exists to avoid repeating for Language Clarity.
 *
 * Keep this file in sync with psa_build.py by hand until/unless the two
 * pipelines are unified. Last synced: 2026-09-22.
 */
(function (global) {
  "use strict";

  // (position, phoneme) -> [category, gloss]
  var CONSONANT_INFO = {
    "initial|p": ["Stops", "p as in pop"], "final|p": ["Stops", "p as in pop"],
    "initial|b": ["Stops", "b as in boat"], "final|b": ["Stops", "b as in cab"],
    "initial|t": ["Stops", "t as in time"], "final|t": ["Stops", "t as in boat"],
    "initial|d": ["Stops", "d as in duct"], "final|d": ["Stops", "d as in read"],
    "initial|k": ["Stops", "k as in cab"], "final|k": ["Stops", "k as in book"],
    "initial|g": ["Stops", "g as in good"], "final|g": ["Stops", "g as in leg"],
    "initial|f": ["Fricatives", "f as in five"], "final|f": ["Fricatives", "f as in safe"],
    "initial|v": ["Fricatives", "v as in van"], "final|v": ["Fricatives", "v as in five"],
    "initial|θ": ["Fricatives", "th as in thing"], "final|θ": ["Fricatives", "th as in bath"],
    "initial|ð": ["Fricatives", "th as in this"], "final|ð": ["Fricatives", "th as in bathe"],
    "initial|s": ["Fricatives", "s as in sun"], "final|s": ["Fricatives", "s as in bus"],
    "initial|z": ["Fricatives", "z as in zoom"], "final|z": ["Fricatives", "z as in nose"],
    "initial|ʃ": ["Fricatives", "sh as in ship"], "final|ʃ": ["Fricatives", "sh as in wish"],
    "initial|ʒ": ["Fricatives", "s as in the French ‘genre’"], "final|ʒ": ["Fricatives", "s as in beige"],
    "initial|tʃ": ["Affricatives", "ch as in chair"], "final|tʃ": ["Affricatives", "ch as in watch"],
    "initial|dʒ": ["Affricatives", "j as in jump"], "final|dʒ": ["Affricatives", "j as in cage"],
    "initial|m": ["Nasals", "m as in man"], "final|m": ["Nasals", "m as in him"],
    "initial|n": ["Nasals", "n as in nose"], "final|n": ["Nasals", "n as in sun"],
    "final|ŋ": ["Nasals", "ng as in thing"],
    "initial|l": ["Liquids", "l as in leg"], "final|l": ["Liquids", "l as in ball"],
    "initial|r": ["Liquids", "r as in read"],
    "initial|h": ["Glides", "h as in him"], "final|h": ["Glides", "h"],
    "initial|j": ["Glides", "y as in yes"],
    "initial|w": ["Glides", "w as in wish"]
  };

  var FINAL_CLUSTERS = ["sp", "st", "sk", "ft", "pt", "kt", "mp", "nt", "nd", "ŋk", "lt", "ld", "lk", "ks", "ts", "dz"];
  var SYLLABIC_CONSONANTS = ["n̩", "l̩"];

  var VOWEL_INFO = {
    "i": ["Vowels", "long e as in these"],
    "ɪ": ["Vowels", "short i as in wish"],
    "ɛ": ["Vowels", "short e as in leg"],
    "æ": ["Vowels", "short a as in cab"],
    "ɑ": ["Vowels", "short o as in pop"],
    "ɔ": ["Vowels", "aw as in ball"],
    "ʊ": ["Vowels", "short oo as in book"],
    "u": ["Vowels", "long oo as in zoom"],
    "ʌ": ["Vowels", "short u as in bus"],
    "ə": ["Vowels", "schwa (unstressed ‘uh’)"],
    "ɝ": ["Syllabic R", "stressed ‘er’ as in girl"],
    "ɚ": ["Syllabic R", "unstressed ‘er’ as in cover"],
    "eɪ": ["Diphthongs", "long a as in safe"],
    "oʊ": ["Diphthongs", "long o as in boat"],
    "aɪ": ["Diphthongs", "long i as in time"],
    "aʊ": ["Diphthongs", "ow as in about"],
    "ɔɪ": ["Diphthongs", "oy as in point"],
    "ɪɚ": ["Syllabic R Diphthongs", "‘ear’ as in ear"],
    "ɛɚ": ["Syllabic R Diphthongs", "‘air’ as in chair"],
    "ɑɚ": ["Syllabic R Diphthongs", "‘ar’ as in far"],
    "ɔɚ": ["Syllabic R Diphthongs", "‘or’ as in or"],
    "aɪɚ": ["Syllabic R Diphthongs", "‘ire’ as in fire"],
    "aʊɚ": ["Syllabic R Diphthongs", "‘our’ as in our"]
  };

  var CATEGORY_ORDER = [
    "Stops", "Fricatives", "Affricatives", "Nasals", "Liquids", "Glides",
    "Vowels", "Diphthongs", "Syllabic R", "Syllabic R Diphthongs",
    "Final Consonant Clusters", "Syllabic Consonants"
  ];

  // Only the syllabic FORMS (n̩, l̩, and everything in VOWEL_INFO tagged
  // "Syllabic R"/"Syllabic R Diphthongs") are pending migration to the future
  // S.R.I. module, per the proposal's 2026-09-21 resolution. Plain initial-
  // consonant l/m/n/r are ordinary consonants and are NOT flagged here.
  var SRI_PENDING_CATEGORIES = ["Syllabic R", "Syllabic R Diphthongs", "Syllabic Consonants"];

  function isSriPending(category) {
    return SRI_PENDING_CATEGORIES.indexOf(category) !== -1;
  }

  /**
   * classify(position, phoneme) -> {category, gloss}
   * position is one of "initial" | "final" | "vowel".
   */
  function classify(position, phoneme) {
    if (position === "vowel") {
      var v = VOWEL_INFO[phoneme];
      return v ? { category: v[0], gloss: v[1] } : { category: "Vowels", gloss: "" };
    }
    if (position === "final" && FINAL_CLUSTERS.indexOf(phoneme) !== -1) {
      return { category: "Final Consonant Clusters", gloss: "final cluster" };
    }
    if (position === "final" && SYLLABIC_CONSONANTS.indexOf(phoneme) !== -1) {
      return { category: "Syllabic Consonants", gloss: "syllabic consonant" };
    }
    var c = CONSONANT_INFO[position + "|" + phoneme];
    return c ? { category: c[0], gloss: c[1] } : { category: "Consonants", gloss: "" };
  }

  /**
   * soundLabel(position, phoneme, gloss) -> "/f/ (initial) — f as in five"
   * Matches psa_build.py's _sound_label() formatting exactly, for visual
   * consistency between the PSA document and the on-site display.
   */
  function soundLabel(position, phoneme, gloss) {
    var tag = position === "initial" ? " (initial)" : position === "final" ? " (final)" : "";
    var base = "/" + phoneme + "/" + tag;
    return gloss ? base + " — " + gloss : base;
  }

  /** Sort a list of {category, ...} objects by the canonical category order. */
  function sortByCategory(items, categoryKey) {
    categoryKey = categoryKey || "category";
    var order = CATEGORY_ORDER;
    return items.slice().sort(function (a, b) {
      var ia = order.indexOf(a[categoryKey]);
      var ib = order.indexOf(b[categoryKey]);
      if (ia === -1) ia = order.length;
      if (ib === -1) ib = order.length;
      return ia - ib;
    });
  }

  global.LCTaxonomy = {
    CONSONANT_INFO: CONSONANT_INFO,
    VOWEL_INFO: VOWEL_INFO,
    FINAL_CLUSTERS: FINAL_CLUSTERS,
    SYLLABIC_CONSONANTS: SYLLABIC_CONSONANTS,
    CATEGORY_ORDER: CATEGORY_ORDER,
    SRI_PENDING_CATEGORIES: SRI_PENDING_CATEGORIES,
    isSriPending: isSriPending,
    classify: classify,
    soundLabel: soundLabel,
    sortByCategory: sortByCategory
  };
})(typeof window !== "undefined" ? window : this);
