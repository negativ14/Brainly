import './App.css'
// import Button from './components/Button'
import Cards from './components/Cards'
// import ShareIcon from './Icons/ShareIcon'


function App() {

  return (
    <div className='flex flex-wrap gap-4 bg-gray-300'>
      <Cards contentType='Tweets' title='Ajj ki khabar' link="https://twitter.com/kirat_tw/status/1633685473821425666"/>
      <Cards contentType='Videos' title='kal ki khabar' link="https://www.youtube.com/embed/ofHGE-85EIA?si=yhnD62Ft5ZeCc3po" tags={['cd','cddcbydh','cd','cddcbydh','cd']}/>
      <Cards contentType='Posts' title='parsu ki taja khabar aaj batata hu'/>
      <Cards contentType='Documents' title='khabar' description='AAJ KAL PARSU b hjvgyuvhyjyvfujfut' tags={['cd','cddcbydh','cd','cddcbydh','cd','cddcbydh','cd','cddcbydh','cd','cddcbydh',]}/>
    </div>
  )
}

export default App
