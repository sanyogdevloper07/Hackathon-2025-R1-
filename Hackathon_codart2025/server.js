const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const scores = {};

// Flags securely stored on server by challenge index

    const FLAGS = {
      0: "flag{client_serverr_ssl_base64}",
      1: "flag{stego_challange}",
      2: "flag{qv_ihddena_vauler}",
      3: "flag{COOL_ENCRYPTION}",
      4: "flag{hereyou_go}",
      5: "flag{codart25}",
      6: "flag{safqdehnbrco}",
      7: "flag{incorrect}",
      8: "flag{willy_wonka}",
      9: "flag{letmein}",
      10: "flag{met_a_data}",
      11: "flag{toomanyencryptions}",
      12: "flag{coder_authenticated_009}",
      13: "flag{web_sur4ing}",
      14: "flag{easy_logic}"

};

    // Hints securely stored on server by challenge index
    const HINTS = [
      //0
      "The secrets you seek aren't just on the page itself. You have been given a bunch of files right? Might want to explore them.",
  //1
      "Images are known to hide texts within them now-a-days, you might know some tools to uncover the same.",
     //2 
      "Decode, then decode again; what you find at first is just the surface.",
      //3
      "Decode the dots and dashes to find your key—this password is your gateway but don't stop when the file opens.",
      //4
      "The simplest way to hide data is in the LSB, you should have a thought about encryption using a key",
      //5
      "common sense is not so common now-a-days",
      //6
      "decoding the file provided will reveal all the mysteries",
      //7
      "contents of an image are not just restricted to the surface, there is much more beyond that.",
      //8
      "browse through the commonly used encryption[cryptography]",
      //9
      "DECODE - COMBINE",
      //10
      "Numbers and alphabets are not too distinguished if you look carefully. ",
      //11
      "A decoding method uses shifting of letters, try shift of one",
      //12
      "Before the SHA-256 hashing happens, the transformed data is Base64 encoded. <br> Base64 has a limited alphabet. <br> This means it’s possible to search for a Base64-looking string whose SHA-256 matches the target.",
      //13
      "Think beyond captions/text",
      //14
      "Sometimes code alone cannot reveal the truth; it is human intelligence that uncovers it."
    ];



// Serve main.html by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// Register Team Name
app.post('/register-team', (req, res) => {
  const { teamName } = req.body;
  if (!teamName) return res.status(400).json({ message: "Team name required" });

  if (!scores[teamName]) scores[teamName] = 0;
  res.json({ message: "Team registered", score: scores[teamName] });
});

// Fetch Scores for Scorecard
app.get('/scorecard/data', (req, res) => {
  res.json(scores);
});

// Manually Update Score (Add/Deduct Points)
app.post('/scorecard/update', (req, res) => {
  const { teamName, points } = req.body;
  if (!scores[teamName]) scores[teamName] = 0;

  scores[teamName] += points;
  res.status(200).send('Score updated');
});

// Submit flag for validation
app.post('/submit-flag', (req, res) => {
  const { teamName, challengeIndex, flag } = req.body;

  if (!teamName || challengeIndex === undefined || !flag) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const correctFlag = FLAGS[challengeIndex];
  if (!correctFlag) {
    return res.status(400).json({ message: "Invalid challenge" });
  }

  if (flag === correctFlag) {
    if (!scores[teamName]) scores[teamName] = 0;
    scores[teamName] += 30; // Add fixed points for challenge
    return res.json({ message: "Correct flag!", score: scores[teamName] });
  } else {
    return res.json({ message: "Wrong flag, try again." });
  }
});

// Serve hints for given challenge index
app.get('/hints/:challengeIndex', (req, res) => {
  const idx = parseInt(req.params.challengeIndex);
  if (isNaN(idx) || idx < 0 || idx >= HINTS.length) {
    return res.status(400).json({ error: 'Invalid challenge index' });
  }
  res.json({ hint: HINTS[idx] });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});
