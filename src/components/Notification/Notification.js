import React from 'react'
import { withRouter } from 'react-router'
import { FaBell } from 'react-icons/fa'
import Pusher from 'pusher-js';
import { connect } from 'react-redux';
import styles from './Notification.module.css'
import { fetchNotifications, deleteNotification } from '../../actions/notification'


const pusher = new Pusher('4ae9ed5cdec2db4a53e6', {
    cluster: 'eu',
    forceTLS: true
});

class Notification extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            notificationVisibility: false
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);

        const { dispatch, auth } = this.props
        const channel = pusher.subscribe('notifications');

        // eslint-disable-next-line
        channel.bind(`${auth.user.id}-event`, function (data) {
            dispatch(fetchNotifications())
        });

        // populate notification on page load 
        dispatch(fetchNotifications())
    }

    // to enable hide dropdown when on click outside target
    // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ notificationVisibility: false })
        }
    }

    toggleNotification = () => {
        const { notificationVisibility } = this.state;
        this.setState({ notificationVisibility: !notificationVisibility })
    }

    // handle notification item click
    handleClick = (event) => {
        const { dispatch, history } = this.props
        const { slug, id } = event.target.dataset
        dispatch(deleteNotification(id))
        this.setState({ notificationVisibility: false })
        history.push(`/articles/${slug}`)
    }

    render() {
        const { notificationVisibility } = this.state
        const { notification } = this.props
        const { notifications } = notification

        const notificationStyle = {
            display: notificationVisibility ? 'block' : 'none'
        }

        const badgeStyle = {
            display: notifications.length ? 'inherit' : 'none'
        }

        return (
            <span ref={this.setWrapperRef}>
                <span className={styles.bagde} onClick={this.toggleNotification} tabIndex={0} role="button">
                    <span style={badgeStyle}>{notifications.length}</span>
                    <FaBell />
                </span>
                <div className={styles.notification} style={notificationStyle}>
                    <ul>
                        <li disabled >{notifications.length ? 'Notifications' : 'No notifications'}</li>
                        {notifications.map(notif => {
                            const { articleSlug, id, message } = notif
                            return (
                                <li data-id={id} data-slug={articleSlug} key={id} onClick={this.handleClick}>{message}</li>
                            )
                        })}
                    </ul>
                </div>
            </span>
        )
    }
}

const mapStateToProps = (state) => state
export default withRouter(connect(mapStateToProps)(Notification))
