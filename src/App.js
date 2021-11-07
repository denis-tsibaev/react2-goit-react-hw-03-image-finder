import React, { Component } from 'react';
import imageApi from './components/Api';
import Container from './components/Container';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/Searchbar';

export default class App extends Component {
    state = {
        query: '',
        hits: [],
        currentPage: 1,
        modal: false,
        modalImage: '',
        isLoading: false,
        error: null,
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.query !== this.state.query) {
            this.fetchImg();
        }
    }

    handleInputChange = data => {
        this.setState({ query: data.trim(), currentPage: 1, hits: [] });
    };

    fetchImg = () => {
        const { query, currentPage } = this.state;
        const option = { query, currentPage };
        if (!query) return;

        this.setState({ isLoading: true });

        imageApi(option)
            .then(result => {
                this.setState(prevState => ({
                    hits: [...prevState.hits, ...result],
                    currentPage: prevState.currentPage + 1,
                }));

                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                });
            })
            .catch(error => this.setState({ error }))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    };

    render() {
        const { hits, query } = this.state;
        return (
            <Container>
                <Searchbar onSubmit={this.handleInputChange} />
                {query && <ImageGallery hits={hits} />}
            </Container>
        );
    }
}
