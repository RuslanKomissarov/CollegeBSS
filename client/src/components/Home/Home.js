import React, { useState, useEffect } from "react"
import {Container, Grow, Grid, Paper, AppBar, TextField, Button, Input} from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useDispatch } from "react-redux"
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Pagination from '../Pagination'
import { useHistory, useLocation } from "react-router-dom"
import useStyles from './styles'


function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () =>{
    const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch()
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const classes = useStyles()
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    useEffect(()=>{
        dispatch(getPosts())
    }, [currentId, dispatch])

    const searchPost = () =>{
        if(search.trim()){
            dispatch(getPostsBySearch({search}))
            history.push(`/posts/search?searchQuery=${search || 'none'}`)
        } else{
            history.push('/')
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            searchPost()
        }
    }
    return(
        <Grow in>
        <Container maxWidth="xl">
            <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField 
                        name="search" 
                        variant="outlined" 
                        label="Search Requests"
                        onKeyPress={handleKeyPress} 
                        fullWidth 
                        value={search} 
                        onChange={(e)=> setSearch(e.target.value)} 
                        />
                        <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    <Paper elevation={6} >
                        <Pagination />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Grow>
    )
}

export default Home