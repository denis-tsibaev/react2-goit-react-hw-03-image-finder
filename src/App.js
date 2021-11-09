import React, { Component } from 'react';
import imageApi from './components/Api';
import Button from './components/Button';
import Container from './components/Container';
import { mapper } from './components/helpers/mapper';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';
import Spinner from './components/Spinner';

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
                    // hits: [...prevState.hits, ...result],
                    hits: [...prevState.hits, ...mapper(result)],
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

    handleModalOpen = largeImage => {
        window.addEventListener('keydown', this.handleModalEscape);
        this.setState({ modal: true, modalImage: largeImage });
    };

    handleModalEscape = e => {
        if (e.keyCode === 27) this.resetModal();
    };

    handleBackdropClick = e => {
        if (e.target === e.currentTarget) this.resetModal();
    };

    resetModal = () => {
        this.setState({ modal: false, modalImage: '' });
    };

    render() {
        const { hits, query, modal, modalImage, isLoading } = this.state;
        const {
            handleInputChange,
            handleModalOpen,
            fetchImg,
            handleModalEscape,
            handleBackdropClick,
        } = this;

        return (
            <Container>
                <Searchbar onSubmit={handleInputChange} />
                {query && (
                    <ImageGallery hits={hits} onImageClick={handleModalOpen} />
                )}

                {isLoading && <Spinner />}

                {hits.length > 0 && (
                    <Button onLoadClick={fetchImg} text="Load more" />
                )}

                {modal && (
                    <Modal
                        modalClose={handleModalEscape}
                        handleBackdropClick={handleBackdropClick}
                    >
                        <img src={modalImage} alt="" />
                    </Modal>
                )}
            </Container>
        );
    }
}
