import React, { useState } from 'react'

export default function Hashtag() {
 
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

const [text, textlength] = useState("")
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
 let reverse =  reversetext.split(" ").reverse().join(",", " ").replaceAll(",", " ")
 console.log(typeof reverse)

 document.getElementById('textformatarea').value = reverse
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
  <h1 class="mt-3 text-center app_heading mb-3">Enter Your Text to Format</h1>

<div className="mb-3">
  <label forHTML="exampleFormControlTextarea1" className="form-label app_short_content">Enter text to format</label>
  <textarea className="form-control" onChange={countword} id="textformatarea" rows="6"></textarea>
</div>
<div className="container p-0">
  <span id="wordcharacter" className='app_short_content'> 0 word & 0 character</span>
</div>
<div className="button d-flex app_section_margin">
<button className="btn btn-primary brand_color hashtags_button" onClick={uppercase}>Convert to uppercase</button>
<button className="btn btn-primary lowercasebtn brand_color hashtags_button" onClick={lowercase}>Convert to Lowercase</button>
<button className="btn btn-primary lowercasebtn brand_color hashtags_button" onClick={clearText}>Clear Text</button>
<button className="btn btn-primary lowercasebtn brand_color hashtags_button" onClick={ReverseText}>Resverse Text </button>

<button className="btn btn-primary lowercasebtn brand_color hashtags_button" onClick={findHashtags}>Find Hashtag </button>

</div>

<h1 className="brand_heading">Collect Hashtag</h1>
<p className="app_short_content">Enter your social media title or discription in our input so you can collect all the hashtag in single click</p>
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
