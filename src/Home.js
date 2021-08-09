import { useState, useEffect } from 'react'
import './Home.scss';
import './Pagination.scss'
import axios from './axios'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom';

function Home() {
  const [characters, setcharacters] = useState([])
  const [pageNumber, setpageNumber] = useState(0)

  const charsPerPage = 10;
  const charsVisited = pageNumber * charsPerPage;

  useEffect(() => {
    axios.get('/characters')
      .then(res => {
        setcharacters(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const displayChars = characters
    .slice(charsVisited, charsVisited + charsPerPage)
    .map((char, i) => (
      <div className="char" key={i}>
        <div className="details">
          <h2>{i + 1 + charsVisited}. {char.name}</h2>
          <h3>Occupation: </h3>
          <div>
            {char.occupation.map((item, j) => (
              <div key={j}>{char.occupation.length > 1 && (`${j + 1}. `)}{item}</div>
            ))}
          </div>
          <div className="flex">
            <h3 className="inlineHeading">DOB:</h3>
            <div>{char.birthday}</div>
          </div>
          <div className="flex">
            <h3 className="inlineHeading">Status: </h3>
            <div>{char.status}</div>
          </div>
          <Link to={`/character/${char.char_id}`} className="detailsLink">View Details</Link>
        </div>
      </div>
    ))

  const totalPages = Math.ceil(characters.length / charsPerPage)

  const changePage = ({ selected }) => {
    setpageNumber(selected)
  }

  return (
    <div className="home">

      <h1 className="heading">Breaking Bad Characters</h1>

      {displayChars}

      <ReactPaginate
        previousLabel="Prev"
        nextLabel="Next"
        pageCount={totalPages}
        onPageChange={changePage}
        containerClassName="pagination"
        disabledClassName="disabled"
        activeClassName="active"
        previousLinkClassName="prev"
        nextLinkClassName="next"
      />

    </div>
  );
}

export default Home
