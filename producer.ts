import { kafka } from "./client";
import readline from "readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function init() {
  const producer = kafka.producer()
  await producer.connect()
  console.log("Connected Successfully Producer!")

  // Getting prompt from user
  rl.setPrompt("> ") // To show user to input
  rl.prompt() // To get value from user

  // When user will input the value this event will trigger
  rl.on("line", async (line) => {
    const [riderName, location] = line.split(" ")
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location?.toLowerCase() === "punjab" ? 0 : 1,
          key: "location-updates",
          value: JSON.stringify({ name: riderName, location })
        }
      ]
    })
  }).on("close", async () => {

    await producer.disconnect()
    console.log("Producer disconnected!")
  })


}
init()