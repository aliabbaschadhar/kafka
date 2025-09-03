import { kafka } from "./client"
const group = process.argv[2] || "default-group";

async function init() {
  const consumer = kafka.consumer({
    groupId: group
  })

  await consumer.connect()

  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      const valueStr = message.value ? message.value.toString() : "";
      console.log(`${group} : [${topic}]: PART:${partition}: ${valueStr}`)
    }
  })

}

init()