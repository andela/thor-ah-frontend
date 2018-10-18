import React from 'react';
import { connect } from 'react-redux';
import { addFavorite } from '../../actions/favorite'

export class Favorite extends React.Component {

    favorite = () => {
        const { articleId, hideOptions, dispatch } = this.props
        hideOptions() // hide more options popup
        dispatch(addFavorite(articleId))
    }

    render() {
        const { setMessasge, message } = this.props
        setMessasge(message) // show response message

        return <button type='button' onClick={this.favorite}> Add to favorite</button>
    }
}

const mapStateToProps = (state) => {
    const { favorite } = state;
    const message = favorite.message ? favorite.message : favorite.error;
    return {
        message
    }
}

export default connect(mapStateToProps)(Favorite)
