const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const encodedFlag = "ZmxhZ3tjbGllbnRfc2VydmVycl9zc2xfYmFzZTY0fQ==";

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/get-flag', (req, res) => {
    res.json({ encodedFlag });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/web.html`);
});
