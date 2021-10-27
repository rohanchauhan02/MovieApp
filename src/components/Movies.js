import React, { Component } from "react";
import axios from 'axios'
export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currPage:1,
      movies:[]
    };
  }
  async componentDidMount(){
    //side effects
    const res=await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=6d3c60220ff59117c0f5b40265dc4509&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.currPage}`)
    let data=res.data;
    this.setState({
      movies:[...data.results]
    })
  }
  changeMovies=async ()=>{
    const res=await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=6d3c60220ff59117c0f5b40265dc4509&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.currPage}`)
    let data=res.data;
    this.setState({
      movies:[...data.results]
    })
  }
  handleNext=async()=>{
    let temparr=[];
    for(let i=1;i<=this.state.parr.length+1;i++){
      temparr.push(i);   
    }
    this.setState({
      parr:[...temparr],
      currPage:this.state.currPage+1
    })
  }
  render() {
    return (
      <>
        {this.state.movies.length == 0 ? (
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
                <div
                  className="card movies-card"
                  onMouseEnter={() => this.setState({ hover: movieObj.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top movies-img"
                    alt={movieObj.title}
                  />
                  <h5 className="card-title movies-title">
                    {movieObj.original_title}
                  </h5>
                  <div
                    classNmae="button-wrapper"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.hover == movieObj.id && (
                      <a className="btn btn-primary movies-button">
                        Add to Favourite
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  {this.state.parr.map((value) => (
                    <li className="page-item">
                      <a className="page-link" href="#">
                        {value}
                      </a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a className="page-link" onClick={this.handleNext} >Next </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
