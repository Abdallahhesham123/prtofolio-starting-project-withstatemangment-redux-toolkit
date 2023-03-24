import React from 'react'
import Post from './Post/Post.jsx'
import useStyles from "./styles"
const Posts = () => {
  const classes = useStyles();
  return (
    <>
        <h1 className={classes.actionDiv}>Posts</h1>
            <Post/>
            <Post/>
            <Post/>
    </>

  )
}

export default Posts