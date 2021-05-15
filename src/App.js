import * as React from "react";
import './App.css';
import axios from "axios";

function App() {
  let styles = {
    margin: '20px',
    width: '250px',
    height: '250px',
    backgroundImage: `url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBgkIBw0SCgkNDQ0PBQUNDQ8NDQUKFBEWFhQRExUYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDg0PGisZFRkrKysrKystLSsrKysrKysrKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAZAAEAAwEBAAAAAAAAAAAAAAAAAQIEAwb/xAAXEAEBAQEAAAAAAAAAAAAAAAAAERIT/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAQDAgYB/8QAFxEBAQEBAAAAAAAAAAAAAAAAABIRE//aAAwDAQACEQMRAD8A8kLQj3ltIVFoQshUWhCyFRaELIVFoQshUWhCyFRaELIVFoQshUWhCyFRaELIVFoQshUWhCyFRaELIVFoQshUWiCyF4RaER2qhWEWhCyFYRaELIVhFoQshWEWhCyFYRaELIVhFoQshWEWhCyFYRaELIVhFoQshWEWhCyFYRaELIVhFoQshWEWhCyFYLQLISLQiW1MKi0IWQqLQhZCotCFkKi0IWQqLQhZCotCFkKi0IWQqLQhZCotCFkKi0IWQqLQhZCotCFkKi0IWQqlMCyFoRYSWohWEWCyFYRYLIVhFgshWEWCyFYRYLIVhFgshWEWCyFYRYLIVhFgshWEWCyFYRYLIVhFgshWEWCyFYLBZCRaES2plUWhCyVRaELJVFoQslUWhCyVRaELJVFoQslUWhCyVRaELJVFoQslUWhCyVRaELJVFoQslUWhCyVRaBZKwmES2plAmELJQJhCyUCYQslAmELJQJhCyUCYQslAmELJQJhCyUCYQslAmELJQJhCyUCYQslAmELJQhaBZKwkS2olAkLJQJCyUCQslAkLJQJCyUCQslAkLJQJCyUCQslAkLJQJCyUCQslAkLJQJCyVoRInpvKIRIUSiESFEohEhRKIRIUSiESFEohEhRKIRIUSiESFEohEhRKIRIUSiESFEohEhRKIRIUSiCQolIkT62xAkNMQJDTECQ0xAkNMQJDTECQ0xAkNMQJDTECQ0xAkNMQJDTECQ0xAkNMQJDTFoR0yZc6+a5wjpkyaa5wjpkyaa5wjpkyaa5wjpkyaa5wjpkyaa5wjpkyaa5wjpkyaa5wjpkyaa5wjpkyaa5wjpkyaa5wjpkyaa5wjpkyaa5wjpkyaa5wdMhprtky7YMONY045Mu2DBpTjky7YMGlOOTLtgwaU45Mu2DBpTjky7YMGlOOTLtgwaU45Mu2DBpTjky7YMGlOOTLtgwaU45Mu2DBpTjky7YMGlOOTLtgwaU45Mu2DBpTjkdsBpTRgw04MMqT2zYMNODBRbNgw04MFFs2DDTgwUWzYMNODBRbNgw04MFFs2DDTgwUWzYMNODBRbNgw04MFFs2DDTgwUWzYMNODBRbNgw04MFFs2DDTgwUWzYMNODBRbNgacBRbVzObXzObGklsnM5tfM5lFsnM5tfM5lFsnM5tfM5lFsnM5tfM5lFsnM5tfM5lFsnM5tfM5lFsnM5tfM5lFsnM5tfM5lFsnM5tfM5lFsnM5tfM5lFsnM5tfM5lFsnM5tfM5lFsnM5tfM5lFsnMa+YUW2cjk2cjkwpF0Y+RybORyKOjHyOTZyORR0Y+RybORyKOjHyOTZyORR0Y+RybORyKOjHyOTZyORR0Y+RybORyKOjHyOTZyORR0Y+RybORyKOjHyOTZyORR0Y+RybORyKOjHyOTZyORR0Y+RybORyKOjHyGzkFHRoAZJwAAAAAAAAAAAAAAAAAAAAAAAAAAAH/9k=')`
  };
  let divStyles = {
    display: 'flex',
    flexWrap: 'wrap'
  };
  const [userInfos,setUserInfos] = React.useState([]);
  const [jokeOfTheDay, setJokeOfTheDay] = React.useState('');
  const [nextPageNumber, setNextPageNumber] = React.useState(1);
  const fetchNextUser = React.useRef(() => {});
  const getJoke = (pageNumber) => {
    return axios
    .get(`https://api.chucknorris.io/jokes/random`)
    .then(({data}) => {
      return data;
    })
    .catch((err) =>{
      alert(err);
    })
  }
  const fetchData = (pageNumber) => {
    return axios
    .get(`https://randomuser.me/api?page=${pageNumber}`)
    .then(({data}) => {
      return data;
    })
    .catch((err) =>{
      alert(err);
    })
  }
  const getFullUserName = (userInfo) => {
    const {name: {first, last}} = userInfo;
    return `${first} ${last}`;
  }
  fetchNextUser.current = () => {
    fetchData(nextPageNumber).then((randomData) => {
      if(randomData === undefined) return;
      const newUserInfos = [
        ...userInfos,
        ...randomData.results,
      ]
      setUserInfos(newUserInfos || 'No joke available');
      setNextPageNumber(randomData.info.page + 1);
    });
    getJoke().then((response) => {
      setJokeOfTheDay(response.value)
    });
  }
  React.useEffect(() => {
    fetchNextUser.current();
  },[]);
  return (
    <div className="App">
      <header className="App-header">
        <h2>Insta User</h2>
        <div style={{overflowWrap: 'break-word'}}><h6>Joke of the moment: {jokeOfTheDay}</h6></div>
        <button onClick={() => fetchNextUser.current()}>Fetch next user</button>
        <div style={divStyles}>
          {
            userInfos.map((userInfo, idx) => (
              <div key={idx} style={styles}>
                  <p>{getFullUserName(userInfo)}</p>
                  <br/>
                  <img src={userInfo.picture.large} alt='not found'></img>
              </div>
            ))
          }
        </div>
      </header>
    </div>
  );
}

export default App;
