//Loading the json file.
const fs = require("fs");
const data = fs.readFileSync("./jsonData.json");

//Generate a QR code in the terminal.
const qrcode = require("qrcode-terminal");

//Libraries to make whatsapp-web.js work.
const { Client, MessageMedia } = require("whatsapp-web.js");
const client = new Client();

// Generating an array of numbers where you want to send the message.
const objects = JSON.parse(data);
const key = "Phone 1 - Value";
const numbers = objects.map((object) =>
  object[key].toString().replace(/\s/g, "")
);

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i].startsWith("0")) {
    numbers[i] = numbers[i].substring(1);
  }

  if (!numbers[i].startsWith("+91")) {
    numbers[i] = "+91" + numbers[i];
  }

  if (numbers[i].length !== 13) {
    numbers.splice(i, 1);
  }
}

console.log(numbers);

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

client.on("ready", () => {
  console.log("Client is ready!");

  // Your message.
  const text =
    "Happy New Year 2023, everyone! 🎉🎊 I hope this year brings you all the happiness, success, and love you deserve. May all your dreams come true and may you have a wonderful year ahead. 🎆 I hope this message brings a smile to your friends' faces and helps you ring in the new year with lots of positivity and joy. Have a great New Year!";

  const chatIds = numbers.map(convertId);

  function convertId(num) {
    return num.substring(1) + "@c.us";
  }

  // Sending message.
  const media = MessageMedia.fromFilePath("./image.jpg");

  chatIds.forEach((chatId) => {
    client.sendMessage(chatId, media);
    setTimeout(() => {
      client.sendMessage(chatId, text);
    }, 2000);
  });
});
