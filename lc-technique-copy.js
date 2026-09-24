/*
 * Language Clarity — student-facing "why/technique" copy, one paragraph
 * per sound category (see lc-taxonomy.js for the canonical category list).
 *
 * Source: claude/phonetic-teaching-rationale-2026-09-07.md (Phil's own
 * explanation, from a solo Zoom walkthrough, of the common problem and his
 * correction technique per category) — per the Language Clarity Training
 * Module proposal's "Content source for the why/technique text" section.
 *
 * DRAFT STATUS: Stops, Fricatives, Nasals, Liquids, Glides, and Vowels are
 * drafted directly from Phil's recorded explanations. Affricatives,
 * Diphthongs, Syllabic R, Syllabic R Diphthongs, Final Consonant Clusters,
 * and Syllabic Consonants were not covered in as much depth on that
 * recording, so those six paragraphs extend Phil's stated techniques
 * (vowel-stretching, feeling voicing/vibration, discrimination pairs) to
 * the neighboring category by inference — flagged below with a REVIEW
 * comment. Per the proposal: all 12 ship before Phase 1 goes live, but
 * Phil reviews and edits every paragraph for voice before students see
 * any of them. Nothing here has been sent to a student yet.
 *
 * Tone: friendly, professional, never judgmental (standing style
 * guidance) — every pattern is framed as normal and fully correctable,
 * never as a deficiency.
 */
(function (global) {
  "use strict";

  var TECHNIQUE_COPY = {
    "Stops": "Stops are the p/b, t/d, and k/g sounds. Most students' real opportunity with " +
      "this group isn't at the start of a word — it's carrying the sound all the way through " +
      "to the end. We work on this by stretching the vowel just before the final consonant, " +
      "so you can feel and hear the stop land clearly, using practice words chosen to isolate " +
      "exactly that sound.",

    "Fricatives": "Fricatives are the “friction” sounds — f/v, th, s/z, and sh. The " +
      "th sounds (as in “thing” and “this”) are a common area to build up, and " +
      "s/z pairs often get crossed, sometimes with an extra vowel sound added before an initial " +
      "s-cluster. For a final z sound in particular, hearing the difference from s isn't always " +
      "enough on its own — we work on physically feeling the vibration, so your mouth and " +
      "voice confirm it together.",

    // REVIEW: Affricatives weren't covered directly on the source recording;
    // this paragraph combines the Stops and Fricatives techniques above,
    // since ch/j sounds are a stop and a fricative produced as one unit.
    "Affricatives": "Affricatives — the ch and j sounds — combine a stop and a " +
      "fricative into one quick sound, so they get the benefit of both techniques above: " +
      "carrying full voicing through to the end of the word, and building a clear, felt " +
      "difference between the unvoiced ch and voiced j versions. We'll isolate whichever one " +
      "needs the most attention and build it up the same way.",

    "Nasals": "Nasals are m, n, and ng, and they come up alongside the final t/d sounds as part " +
      "of finishing a word clearly. Two patterns show up often here: the j sound at the end of " +
      "a word, and “dropping the g” on -ing endings. For -ing endings specifically, we " +
      "keep the vowel sound steady all the way through, which is what actually fixes the pattern " +
      "— along with modeling how it should sound in natural phrasing.",

    "Liquids": "Liquids are l and r, and they often come with blend and glide sounds nearby — " +
      "y/j, w/v, and r inside “thr” blends like “three” and “throw” " +
      "are common places to build clarity. We use discrimination practice — sounds like the " +
      "“pl” in “please”, or b/p — to train your ear and mouth to tell two " +
      "close sounds apart on purpose, rather than by chance.",

    "Glides": "Glides are h, y, and w — quick, light sounds that lead into the vowel right " +
      "after them. The most common mix-ups here are y versus j, and w versus v. We work on these " +
      "as discrimination pairs, the same way we do with liquids: hearing and producing each one " +
      "on its own until the difference is automatic.",

    "Vowels": "Short e is the single most common vowel adjustment we see, and it usually comes " +
      "from not opening the mouth quite enough, which pulls the sound toward a neighboring " +
      "vowel. Rather than teaching each vowel by itself, we train them in discrimination pairs " +
      "— long against short, side by side — so the contrast becomes something you can " +
      "hear and feel directly, not just something you're told.",

    // REVIEW: source recording covered diphthongs as a category (the
    // eɪ/aɪ/aʊ/ɔɪ set) without a distinct technique beyond the discrimination-
    // pairs approach used for vowels generally; this paragraph applies that.
    "Diphthongs": "Diphthongs are two-vowel-sounds-in-one — the long a in “safe”, " +
      "long i in “time”, ow in “about”, and oy in “point”. The " +
      "gliding movement between the two parts is what we build, using the same discrimination-" +
      "pair approach as single vowels: hearing where the sound starts and where it lands, and " +
      "practicing that movement deliberately.",

    // REVIEW: Syllabic R (stressed ɝ / unstressed ɚ) wasn't broken out
    // separately on the source recording, only ER sounds generally; this
    // paragraph is drafted from that general mention.
    "Syllabic R": "This is the “er” sound that carries a whole syllable on its own — " +
      "stressed, as in “girl”, or unstressed, as in “cover”. We treat the " +
      "stressed and unstressed versions as their own discrimination pair, since English leans " +
      "on that difference constantly, and build each one up with practice words chosen to " +
      "isolate it.",

    // REVIEW: Syllabic R Diphthongs (ear/air/or/ar/ire/our) weren't named
    // individually on the source recording; drafted by extending the
    // Syllabic R and Diphthongs techniques together, since this category is
    // exactly that combination (a vowel gliding into the er sound).
    "Syllabic R Diphthongs": "These are vowel sounds that glide directly into an “er” " +
      "sound — “ear”, “air”, “or”, “ar”, " +
      "“ire”, and “our”. Because each one is built from a full vowel plus " +
      "that same syllabic-r glide, we build them the same way we build any discrimination pair " +
      "— comparing this sound against its closest neighbors until the distinction is clear " +
      "and repeatable.",

    // REVIEW: not a named category on the source recording; drafted from
    // the Stops/final-consonant vowel-stretching technique, since a
    // cluster is simply several of those final consonants landing in a
    // row and needs the same technique applied one sound at a time.
    "Final Consonant Clusters": "Some words end in more than one consonant sound stacked " +
      "together — like the “st” in “nest” or the “mp” in " +
      "“jump”. Rather than trying to fix the whole cluster at once, we slow it down and " +
      "isolate each sound in the stack, using the same vowel-stretching approach we use for " +
      "single final consonants, so every sound in the cluster gets to land clearly.",

    // REVIEW: not a named category on the source recording (baseline doc
    // flags l̩/n̩ as a related-but-separate concept, pending a future
    // unified S.R.I. treatment); drafted as a plain description of the
    // pattern plus the closest technique already described (feeling the
    // sound work as the vowel).
    "Syllabic Consonants": "In words like “bottle” and “mitten”, the final l " +
      "or n sound does double duty — it acts as its own syllable instead of needing a " +
      "separate vowel before it. We work on feeling that sound carry the syllable on its own, " +
      "the same way we build any other sound that needs to be felt as much as heard."
  };

  global.LCTechniqueCopy = TECHNIQUE_COPY;
})(typeof window !== "undefined" ? window : this);
