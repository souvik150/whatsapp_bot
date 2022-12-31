const qrcode = require("qrcode-terminal");

const { Client, MessageMedia } = require("whatsapp-web.js");
const client = new Client();

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

  const numbers = ["+919690020087"];
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
