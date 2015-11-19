
things happen:

global-init
-Shuffler
  -rungame
    -getoptions
    -parseoptions
    -assignrightanswer
    -shuffle
      -pickrandomshuffle
        -animate 1, 2, 3
      shuffle
    -*WAIT*
-Responder
  -event listeners
    -spot 1/2/3 click
      -reveal
      -ishighscore
      -formlisten
