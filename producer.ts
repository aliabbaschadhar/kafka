import { kafka } from "./client";

async function init() {
  const producer = kafka.producer()
  await producer.connect()
  console.log("Connected Successfully Producer!")


}
init()