import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { deletePost, addLike, removeLike } from '../../actions/postAction';
import Post from '../postComments/Post';
import Moment from 'moment';


class PostItem extends Component {

  constructor(props) {
    super(props);
    this.state = { likes: 0 };
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(post) {
    const { auth } = this.props;
    if (post.likes) {
      if (post.likes.filter(like => like.user === auth.user.id).length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  render() {
    const { post, auth } = this.props;
    Moment.locale('en');

    return (

      <div className="container jiref-bg" style={{ marginBottom: '10px', padding: '10px' }}>
        <div className="jiref-profile-image">
          <img src={post.avatar} alt="profile" className="rounded-circle rounded-circle-post" />
          <div className="jiref-post-header">
            <p><Link to={`/profile/user/${post.user}`}>{post.name}</Link> <br /> <span style={{ fontSize: '10px' }}>Posted on {' '}{Moment(post.date).format('d MMM')}</span></p>
          </div>
        </div>

        <div className="jiref-post-content">
          <p>{post.text}</p>
          <div className="jiref-likes"><i className="far fa-heart"></i>{' '}{post.likes.length} <span style={{ paddingLeft: '10px' }}><Link to={`/post/${post._id}`} className="like"><i className="fas fa-comment" />{' '}{post.comments.length}</Link></span></div>
        </div>

        <span className="like">
          <button onClick={this.onLikeClick.bind(this, post._id)}
            type="button">
            <i className={classnames('far fa-heart', { 'text-info': this.findUserLike(post) })} />
          </button>

          {/* <button
            onClick={this.onUnlikeClick.bind(this, post._id)}
            type="button">
            <i className="text-secondary fas fa-thumbs-down" />
          </button> */}

          <span style={{ paddingLeft: '10px' }}> <Link to={`/post/${post._id}`} className="like">Reply</Link></span>
          {post.user === auth.user.id ? (
            <button
              onClick={this.onDeleteClick.bind(this, post._id)}
              type="button"
              className="delete">
              <i className="fas fa-trash" />{' '} Delete
                   </button>
          ) : null}
        </span>
      </div>
    )
  }
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
