export const pushData = async (user, items) => {

  const options = {
    method: "POST",
    body: JSON.stringify({
      message: "push",
      file: JSON.stringify({[user]: {bucket: items}})
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    const update = await fetch('http://localhost:8000/S3', options)

    console.log('Data upload successful!')

  } catch (error) {
    console.log(error)
  }
}