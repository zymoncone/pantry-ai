export const getData = async (user) => {

  const options = {
    method: "POST",
    body: JSON.stringify({
      message: "fetch"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    const response = await fetch('http://localhost:8000/S3', options)
    const data = await response.json()

    // console.log(Array.from(data[user]))
    return Array.from(data[user].bucket)

  } catch (error) {
    console.log(error)
  }
}