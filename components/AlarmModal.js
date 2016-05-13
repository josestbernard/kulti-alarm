//TODO: view that pops up when the alarm is activated. Contains words with translations, no snooze option



playAlarm(){
  var whoosh = new Sound('alarm.aac', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    dl('failed to load the sound');
  } else { // loaded successfully
  dl(null, 'duration in seconds: ' + whoosh.getDuration() +
        'number of channels: ' + whoosh.getNumberOfChannels());
  whoosh.play((success) => {
    if (success) {
    dl(null, 'successfully finished playing');
    } else {
    dl('playback failed due to audio decoding errors');
    }
  });
  }
});
}
getBrokenWords(){
  return this.state.words.join("\n");
}
async getAlarmData() {
  try {
    const start = new Date().getTime();
    const JSON_HEADERS = {'Accept': 'application/json','Content-Type': 'application/json'};
    dl(null, 'Loading...');
    const response = await fetch(duolingo.USER_SETTINGS_URL);
    const end = new Date().getTime();

    dl(null, `Finished after ${end-start} milliseconds`);

    const body = await response.json();
    const currentLearning = body.languages.filter(filterCurrentlyLearning)

    /*
    TODO: What if they're learning multiple languages at the same time? (set language per alarm?)
          What if they are not learning any language in Duolingo (random words in the first week calibrate with duolingo levels? )
          Connect with The Weather Channel API and show the Weather conditions after the alarm is deactivated

    */
    const learningTarget = currentLearning.length > 0 ? currentLearning[0].language : DEFAULT_LANGUAGE;
    const languageSkills = body.language_data[learningTarget].skills;
    const learnedSkills = languageSkills.filter(filterOnlyLearned).sort(sortByLearntDate);

    //TODO: Random skill? less practiced? harder by snoozes?

    data = learnedSkills[0];
    this.setState(
      {
        title: data.title,
        words: data.words,
        lang_known: data.ui_language,
        lang_learning: learningTarget.language,
        loadad: true
      }
    )
  } catch(error) {
    dl(error);
  }
}
