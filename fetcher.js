const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const request = require('request');
const args = process.argv.slice(2, 4);
console.log(args);
const url = args[0];
console.log(url);
const path = args[1];
//send request and save body to string
request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  if (fs.existsSync(path)) { //does file exists
    rl.question("File already exists! Would you like to overwrite: 'Y' or 'N' ", (userInput) => {
      rl.close();
      if (userInput === 'Y') {
        fs.writeFile(path, body, (err) => {
          if (err) throw err;

          fs.stat(path, (err, stats) => { //find size of file
            if (err) throw err;
            console.log(`Downloaded and saved ${stats.size} bytes to ${path}`);
          });
        });
      } else process.exit;
    });
  } else {
    fs.writeFile(path, body, (err) => {
      if (err) throw err;

      fs.stat(path, (err, stats) => { //find size of file
        if (err) throw err;
        console.log(`Downloaded and saved ${stats.size} bytes to ${path}`);
        rl.close();
      });
    });
  }
});


