// Admin-related functionality for managing Kafka topics, consumers, and producers
// What does admin do?
// The admin client is responsible for managing and inspecting Kafka resources.
// It provides functionality to create, delete, and modify topics, as well as to
// describe consumer groups and their offsets.
// What about partitions?
// The admin client can also manage partitions, including creating, deleting, and
// modifying them, as well as retrieving information about their status and
// configuration.

import { kafka } from "./client"



async function init() {
  const admin = kafka.admin()
  console.log("Admin connecting...")
  try {
    await admin.connect()
    console.log("Admin connected successfully.")
  } catch (err) {
    console.error("Error connecting admin:", err)
  }

  // Creating topics
  try {
    await admin.createTopics({
      topics: [
        {
          topic: "rider-updates",
          numPartitions: 2,
        },
      ]
    })
    console.log("Topics created successfully")
    // Disconnecting admin to save resources
    try {
      await admin.disconnect()
      console.log(`Admin disconnected successfully.`)
    } catch (err) {
      console.error("Error while disconnecting admin:", err)
    }

  } catch (error) {
    console.error("Error while creating topics:", error)
  }
}

init()