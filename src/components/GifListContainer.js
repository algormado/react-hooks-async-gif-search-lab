import React, { Component } from 'react';
import GifList from './GifList';
import GifSearch from './GifSearch';

class GifListContainer extends Component {
  state = {
    gifs: []
  };

  componentDidMount() {
    this.fetchGifs();
  }

  fetchGifs = (query = "cats") => {
    // Replace 'YOUR_API_KEY' with your actual Giphy API key
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=3`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const gifs = data.data.map(gif => ({ id: gif.id, url: gif.images.fixed_height.url }));
        this.setState({ gifs });
      })
      .catch(error => {
        console.error('Error fetching gifs:', error);
      });
  };

  handleSubmit = (query) => {
    this.fetchGifs(query);
  };

  render() {
    return (
      <div>
        <GifSearch handleSubmit={this.handleSubmit} />
        <GifList gifs={this.state.gifs} />
      </div>
    );
  }
}

export default GifListContainer;
