import React from 'react'
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

const match = (s, arr) => {
  if (s.length > 0) s = s.charAt(0).toUpperCase() + s.slice(1)
  const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '')
  const re = RegExp(p)

  return arr.filter(v => v.match(re))
}

const SearchAutoComplete = props => {
  const {
    searchQuery,
    searchSuggestions,
    onSearchQueryChange,
    onSearchSuggestionClicked
  } = props

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
                  value={searchQuery}
                  onChange={onSearchQueryChange}
                />
              </MDBFormInline>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      {searchSuggestions.length > 0 ? (
        <MDBRow className='position-absolute w-100 z-index-501 mx-0'>
          <MDBCol
            className='d-flex mt-5 justify-content-center'
            style={{
              zIndex: 500
            }}>
            <MDBCard style={{ width: '22rem', maxWidth: '75%' }}>
              <MDBCardBody className='p-0 mt-3'>
                <MDBListGroup style={{ width: '100%' }}>
                  {searchSuggestions.map(searchSuggestion => (
                    <MDBListGroupItem
                      id={searchSuggestion}
                      onClick={onSearchSuggestionClicked}>
                      {searchSuggestion}
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
