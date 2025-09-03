import { kafka } from "./client";

async function init() {
  const producer = kafka.producer()
  await producer.connect()
  console.log("Connected Successfully Producer!")

  await producer.send({
    topic: "rider-updates",
    messages: [
      {
        partition: 0, // bad mai solve karein ge
        key: "location-updates",
        value: JSON.stringify({ name: "Tony Stark", loc: "Hafizabad" })
      }
    ]
  })

  await producer.disconnect()
  console.log("Producer disconnected!")
}
init()