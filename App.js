import React,{useState} from "react";

function App() {
  const [search,setSearch] = useState("");
  const [data,setData] = useState([]);
  const submitHandler = e =>{
    e.preventDefault();
    fetch (`https://www.omdbapi.com/?s=${search}&apikey=263d22d8`).then(
      Response => Response.json()
      ).then(value => setData (value.Search))
  }
  const download = url => {
    fetch(url).then(responce =>{
      responce.arrayBuffer().then(function(buffer){
        const url = window.URLcreateObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("downlod","image.png");
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch(err =>{
      console.log(err);
    });
  };

  return (
    <div>
      <center>
        <h2>Search your favorite movie</h2><br/>
        <form onSubmit={submitHandler}>
          <input  className="sivaji" size="50" type='text' value={search} onChange={(e) => setSearch(e.target.value)}/><br/><br/>
          <input type="submit" class="btn btn-outline-danger"  value="Search"/><br/><br/><br/>
        </form><br/>
        <div className="row">
        {data.map(movie=>
            <div className="col-md-2">
          <div class="card" style={{"width": "12rem"}}>
          <img src={movie.Poster} class="card-img-top" alt={movie.Title}/>
          <div class="card-body">
            <h6 class="card-title">{movie.Title}</h6>
            <a  className="btn btn-primary" onClick={() => download(movie.Poster)} > Downlod Poster</a>
          </div>
        </div>
        </div>
          )}
          </div>
          
          
        
      </center>
      
     
    </div>
  );
}

export default App;
