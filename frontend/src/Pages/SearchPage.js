import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from "../components/AppHeader";

function SearchPage() {
  const navigation = useNavigate()
  const [entityValue, setEntityValue] = useState('')
  const [searchParamValue, setSearchParamValue] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const [isParamDisabled, setIsParamDisabled] = useState(true)
  const [isInputDisabled, setIsInputDisabled] = useState(true)
  const [searchParams, setSearchParams] = useState([])

  const searchEntities = [
    {
      "label": "Course",
      "value": "course"
    }
  ]

  const searchParamMappings = {
    "course": [
      {
        "label": "Name",
        "value": "course_name"
      },
      {
        "label": "Number",
        "value": "course_number"
      },
      {
        "label": "Description",
        "value": "description"
      },
      {
        "label": "Instructor",
        "value": "instructor"
      }
    ]
  }

  const handleEntityChange = (event) => {
    const entity = event.target.value
    setEntityValue(entity)
    setSearchParams(searchParamMappings[entity])
    setIsParamDisabled(false)
  }

  const handleSearchParamChange = (event) => {
    const paramValue = event.target.value
    setSearchParamValue(paramValue)
    setIsInputDisabled(false)
  }

  const performSearch = () => {
    const apiMapping = {
      "course": '/search/course'
    }
    const apiUrl = apiMapping[entityValue]
    axios.post(apiUrl, {
      search: searchInput,
      searchParam: searchParamValue
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("hoosier_room_token"),
      }
    })
    .then((resp) => {
      console.log(resp.data.searchResults)
      setSearchResults(resp.data.searchResults)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <AppHeader />
      <div className="page-container">
        <Paper elevation={2} style={{ padding: "10px 20px" }}>
          <h2>Search</h2>
          <Box>
            <FormControl sx={{ width: 300, marginRight: "10px" }}>
              <InputLabel id="search">Entity</InputLabel>
              <Select
                labelId="search"
                id="search"
                value={entityValue}
                onChange={handleEntityChange}
                label="Entity"
              >
                {searchEntities.map((item) => (<MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>))}
              </Select>
            </FormControl>

            <FormControl sx={{ width: 300, marginRight: "10px" }} disabled={isParamDisabled}>
              <InputLabel id="searchParameter">Parameter</InputLabel>
              <Select
                labelId="searchParameter"
                id="searchParameter"
                value={searchParamValue}
                onChange={handleSearchParamChange}
                label="searchParameter">
              {searchParams.map((item) => (<MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>))}
              </Select>
            </FormControl>
            <FormControl style={{width: 300}} >
              <TextField
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                id="search-input" label="Input" variant="outlined" disabled={isInputDisabled}/>
            </FormControl>
            <FormControl >
              <Button 
                color="primary"
                onClick={performSearch}
                style={{marginTop: "10px"}}>
                  Search
              </Button>
            </FormControl>
            
          </Box>
          <Box style={{marginTop: "10px"}}>
            Searching with: <br/><br/>
            <b>Entity</b>: {entityValue} <br/>
            <b>Parameter</b>: {searchParamValue} <br/>
            <b>Input</b>: {searchInput} <br/>
            <h2>Results</h2>
            {searchResults.length === 0 && <p>No Results</p>}
            {entityValue === 'course' && (searchResults.map((item) => (
              <Box 

                onClick={() => navigation('/course/' + item.course_id)}
                key={item.course_id} 
                style={{padding: 10, margin: 2, border: "1px solid grey", cursor: "pointer"}}
                >
                <label>Number: </label><p>{item.course_number}</p>
                <label>Name: </label><p>{item.course_name}</p>
                <label>Description: </label><p>{item.description}</p>
              </Box>
            )))}
          </Box>
        </Paper>
      </div>
    </div>
  );
}

export default SearchPage;
