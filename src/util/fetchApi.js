export default async function fetchApi (formData, callbackData, callbackError) {
  const OPTIONS = { method: 'POST', body: JSON.stringify(formData) }
  let data
  try {
    const response = await fetch('https://api-formfolio.onrender.com/api/jpaz/sendmail', OPTIONS)
    data = await response.json()
    if (!response.ok) throw new Error(data)
  } catch (error) {
    console.error(error)
    callbackError(error)
    return
  }

  try {
    callbackData(data)
  } catch (error) {
    console.error(error)
    const err = { mensaje: 'Ocurrio un error.' }
    callbackError(err)
  }
}
