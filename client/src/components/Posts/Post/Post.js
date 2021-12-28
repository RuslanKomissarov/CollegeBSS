import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import PhoneCallback from '@material-ui/icons/PhoneCallback'
import Done from '@material-ui/icons/Done'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId}) =>{
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('profile'))

    const Calls = () => {
        if (post.calls.length > 0) {
          return post.calls.find((call) => call === (user?.result?.googleId || user?.result?._id))
            ? (
              <><PhoneCallback fontSize="small" />&nbsp;{post.calls.length > 2 ? `You and ${post.calls.length - 1} others received ` : `${post.calls.length} call${post.calls.length > 1 ? 's' : ''}` }</>
            ) : (
              <><PhoneCallback fontSize="small" />&nbsp;{post.calls.length} {post.calls.length === 1 ? 'Call' : 'Calls'}</>
            );
        }
        return <><PhoneCallback fontSize="small" />&nbsp;Call</>;
    }

    return(
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id===post?.creator) && (
                <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size='small' onClick={()=>setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize='default' />
                </Button>
            </div>
            )}
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=>`#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' disabled={!user?.result} color='primary' onClick={()=> dispatch(likePost(post._id))}>
                    <Calls/>
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id===post?.creator) && (
                    <Button size='small' color='secondary' onClick={()=>dispatch(deletePost(post._id))}>
                    <Done fontSize='small'/> Done
                </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post