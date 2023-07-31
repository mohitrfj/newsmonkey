import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country : "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes ={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(){
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page:1,
            totalResults: 0
        }
    }
    async updateNews(){
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        this.props.setProgress(70)
        let parsedData = await data.json();
        this.setState({articles:parsedData.articles, 
            totalResults:parsedData.totalResults, 
            loading:false
        });
        this.props.setProgress(100)
    }

    async componentDidMount(){
        this.updateNews()
    }

    // handleNextClick = async () => {
        
    //     this.setState({page: this.state.page+1});
    //     this.updateNews()
    // }

    // handlePrevClick = async () => {
    //     this.setState({page: this.state.page-1});
    //     this.updateNews()
    // }

    fetchMoreData = async () => {
        this.setState({page: this.state.page+1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles:this.state.articles.concat(parsedData.articles), 
            totalResults:parsedData.totalResults, 
        });
      };

    render() {
        return (
            <div className="container my-3">
                <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>}
                >
                    <div className="container">
                <div className="row"> 
                {this.state.articles.map((element)=>{   //this line is iterating over jsx that is stored in the state articles above and below we need to use unique key when we are using map()..,,, Here this.state.loading means id loading is true then dont show any content on the screen.
                    return <div className="col-md-4" key={element.url} >  
                    <NewsItem title={element.title?element.title.slice(0,45):""}  description={element.description?element.description.slice(0,88):""} 
                    imageUrl={element.urlToImage} newsUrl={element.url}/> 
                    {/* slicing title to 45 ch and desc to 88 ch above using slice function and element contains all the objects of json (here it will return 4 objects for now) */}
                </div>
                })}
                </div> 
                </div>
                </InfiniteScroll>
                <div className="container d-flex justify-content-between">

                {/* <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>Previous</button>
                <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next</button> */}

                </div>
            </div>
        )
    }
}

export default News