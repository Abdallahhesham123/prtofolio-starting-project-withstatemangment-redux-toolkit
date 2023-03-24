import { Grid, Grow } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import Form from '../../components/Form/Form.jsx'
import Posts from '../../components/Posts/Posts.jsx'
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({


})
const Home = (props) => {
  const classes = useStyles(props)
  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={2}>
            <Grid item xs={12} sm={7}>
                <Posts/>
            </Grid>
            <Grid item xs={12} sm={4}>
                    <Form/>
            </Grid>


        </Grid>
      </Container>
    </Grow>
  )
}

export default Home