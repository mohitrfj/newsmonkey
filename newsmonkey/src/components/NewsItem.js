import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl} = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={imageUrl?imageUrl:"https://tinyurl.com/284tyyxt"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        {/* 3 dots to show that title is continued as we are limiting it to 45 ch in NewsItem.js */}
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-dark">Read More</a>
                        {/* target='_blank' is used to open the hyperlink in new tab. added rel='noreferrer as terminal was suggesting to use with target due to security reasons */}
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem