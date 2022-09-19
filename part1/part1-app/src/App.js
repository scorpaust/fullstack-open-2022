import Hello from "./Hello"
import Footer from "./Footer"

function App() {
  const name = 'Peter'  
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />      
      <Hello name={name} age={age} />    
      <Footer />
    </div>
  )
}

export default App;
