export function MyForm() {
  return (
    <form action="" onSubmit={handleChange}>
      <label>Enter student's name:
        <input type="text" name="name"/>
      </label><br/>
      <label>Enter birthday:
        <input type="date" name="birthday"/>
      </label><br/>
    </form>
  )
}

const handleChange = (e) => {
    e.preventDefault()
    const newTransaction = {
      sname: name,
      date: birthday,

    }
    fetch('http://localhost:8001/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
      .then((resp) => resp.json())
      .then((newQuestion) => console.log(newQuestion))
  }
