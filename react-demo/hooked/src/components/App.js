import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Head';
import Search from './Search';
import Movie from './Movie';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b';

function App() {
  /**
   * useState 其实就是同时定义了state与改变state的函数
   * 设置state
   * 同时可以this.setState({})
   */
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errMsg, setErrMsg] = useState(null);


  /**
   * 没有设置依赖，effect会在每次渲染后执行一次，然后在effect中更新了状态引起渲染并再次触发effect。
   * 无限循环的发生也可能是因为你设置的依赖总是会改变。 
   */
  useEffect(() => {
    console.log(movies, loading);
    fetch(MOVIE_API_URL).then(res => res.json()).then(jsonRes => {
      setMovies(jsonRes.Search);
      setLoading(false);
      console.log(movies, loading);
    });
    console.log(movies, loading);
  }, [loading]);

  const search = searchValue => {
    // this.setState({ loading: true })
    setLoading(true);
    setErrMsg(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.Response === 'True') {
          setMovies(jsonRes.Search);
        } else {
          setErrMsg(jsonRes.Error);
        }
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errMsg
          ? <span>loading...</span>
          : errMsg
            ? <div className="errorMessage">
                {errMsg}
              </div>
            : movies.map((movie, index) =>
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
              )}
      </div>
    </div>
  );
}

export default App;
