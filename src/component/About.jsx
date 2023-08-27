import React, { useState } from 'react'

export default function About() {
 
  function lowercase(){
    console.log("Lower function running on click function")
    let textformatarea =document.getElementById('textformatarea').value
  let lowercase= textformatarea.toLowerCase()
  document.getElementById('textformatarea').value = lowercase
  }

// Upper Case function defeindex Start Here
  function uppercase(){
    console.log("UpperCase function running on click function")
    let textformatarea =document.getElementById('textformatarea').value
  let uppercase= textformatarea.toUpperCase()
  document.getElementById('textformatarea').value = uppercase
  }

// Upper Case function defeindex Completed Here

const [text, textlength] = useState(" ")
const [tag, settag] = useState([])
function countword(){
  let countword =document.getElementById('textformatarea').value

  textlength(countword.length + " " + "words "+ "and" + " " + countword.split(" ").length +" "+ "character")

   let wordcharacter =document.getElementById('wordcharacter').innerText = text
   console.log(countword)
   


}

function clearText(){
  let cleartext =document.getElementById('textformatarea').value =""

  document.getElementById('textformatarea').value = cleartext
}
let results
function ReverseText(){
  let reversetext =document.getElementById('textformatarea').value 
 let reverse =  reversetext.split(" ").reverse()
 console.log(reverse)

}
function findHashtags() {
let searchText = document.querySelector('#textformatarea').value 

  var regexp = /\#\w\w+\s?/g
  let result = searchText.match(regexp);
  if (result) {
      result.map(function(s) { return s.trim() });
      results = result
      settag(result)
      console.log(result);

  return results
  } else {
      return false
  }
}
  return (
   
  <>
  
 <div className="container mt-74">
  <h1 class="mt-3 text-center aboutheading">Enter Your Text to Format</h1>

<div className="mb-3">
  <label forHTML="exampleFormControlTextarea1" className="form-label">Enter text to format</label>
  <textarea class="form-control" onChange={countword} id="textformatarea" rows="6"></textarea>
</div>
<div className="container mb-2">
  <strong id="wordcharacter"> 0 word & 0 character</strong>
</div>
<div className="button d-flex">
<button className="btn btn-primary" onClick={uppercase}>Convert to uppercase</button>
<button className="btn btn-primary lowercasebtn" onClick={lowercase}>Convert to Lowercase</button>
<button className="btn btn-primary lowercasebtn" onClick={clearText}>Clear Text</button>
<button className="btn btn-primary lowercasebtn" onClick={ReverseText}>Resverse Text </button>

<button className="btn btn-primary lowercasebtn" onClick={findHashtags}>Find Hashtag </button>

</div>
<h1 class="text-center my-2">Your Hashtag</h1>
<ul>
{
  tag.map((element)=>
  
  {
 return <li>{element}</li>
  })
  
  }
</ul>
 </div>
  
  </>
  )
}
