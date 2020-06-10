import React, { useState, useEffect } from 'react'
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBFormInline,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdbreact'

// Get Matched Strings From an Array
const match = (str, arr, key) => {
  if (str.length > 0) str = str.charAt(0).toUpperCase() + str.slice(1)
  const p = Array.from(str).reduce(
    (a, v, i) => `${a}[^${str.substr(i)}]*?${v}`,
    ''
  )
  const regex = RegExp(p)
  return arr.filter(elem => elem[key].match(regex))
}

const SearchAutoComplete = props => {
  const {
    query,
    onQueryChange,
    onSuggestionClicked,
    autocompleteData,
    autocompleteKey
  } = props

  const [searchSuggestions, setSearchSuggestions] = useState([])

  useEffect(() => {
    if (query.length > 0) {
      const matchedData = match(query, autocompleteData, autocompleteKey),
        top5match = matchedData.slice(0, 5)
      setSearchSuggestions(top5match)
    } else setSearchSuggestions([])
  }, [query, autocompleteData, autocompleteKey])

  const onSuggestionClick = e => {
    // TODO: fill full name
    setSearchSuggestions([])
    onSuggestionClicked(e)
  }

  return (
    <>
      <MDBRow className='position-absolute w-100 z-index-501 mx-0'>
        <MDBCol className='d-flex mt-2 justify-content-center'>
          <MDBCard style={{ width: '22rem', maxWidth: '75%' }}>
            <MDBCardBody className='py-0 pr-0'>
              <MDBFormInline className='md-form my-2'>
                <MDBIcon icon='search' />
                <input
                  className='form-control form-control-sm ml-3 w-75'
                  type='text'
                  placeholder='Search'
                  aria-label='Search'
                  value={query}
                  onChange={onQueryChange}
                />
              </MDBFormInline>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      {searchSuggestions.length > 0 ? (
        <MDBRow className='position-absolute w-100 z-index-501 mx-0 mt-5'>
          <MDBCol className='d-flex mt-2 justify-content-center'>
            <MDBCard style={{ width: '22rem', maxWidth: '75%' }}>
              <MDBCardBody className='p-0 mt-3'>
                <MDBListGroup style={{ width: '100%' }}>
                  {searchSuggestions.map(searchSuggestion => (
                    <MDBListGroupItem
                      key={searchSuggestion.countryInfo._id}
                      id={JSON.stringify(searchSuggestion)}
                      onClick={onSuggestionClick}>
                      {searchSuggestion[autocompleteKey]}
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      ) : (
        <></>
      )}
    </>
  )
}

export default SearchAutoComplete
