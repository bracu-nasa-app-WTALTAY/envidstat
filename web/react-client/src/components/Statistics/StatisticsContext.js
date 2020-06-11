import React, { useState, useEffect, createContext } from 'react'
import request from 'axios'

import { API_COVID19_SUMMARY, API_COVID19_COMBINED } from '../../config'

const DEFAULT = {
  summaryData: {
    Global: {
      NewConfirmed: 135514,
      TotalConfirmed: 6149975,
      NewDeaths: 4355,
      TotalDeaths: 376268,
      NewRecovered: 71158,
      TotalRecovered: 2564042
    },
    Countries: []
  },
  setSummaryData: summaryData => {},
  countries: [],
  setCountries: countries => {}
}

export const StatisticsContext = createContext(DEFAULT)

export const StatisticsProvider = props => {
  const [summaryData, setSummaryData] = useState(DEFAULT.summaryData)
  const [countries, setCountries] = useState(DEFAULT.countries)

  useEffect(() => {
    request(API_COVID19_COMBINED)
      .then(res => res.data)
      .then(res => setCountries(res))
      .catch(() => console.log('error fetching combined data'))
  }, [])

  useEffect(() => {
    request(API_COVID19_SUMMARY)
      .then(res => res.data)
      .then(res => {
        setSummaryData(res)
      })
      .catch(() => console.log('error fetching summary data'))
  }, [])

  return (
    <StatisticsContext.Provider
      value={{ summaryData, setSummaryData, countries, setCountries }}>
      {props.children}
    </StatisticsContext.Provider>
  )
}

// TODO: implement
// const continuousFetch = () => {
//   let retries = 0
//   let data = ''
//   let fetchDataTimer

//   const fetchJson = () => Promise.reject({ data: false })

//   const fetchData = async () => {
//     const fetchedData = await fetchJson()
//       .then(res => JSON.parse(res))
//       .then(res => res.data)
//       .catch(err => false)
//     console.log('fetched', fetchedData)

//     if (fetchedData) {
//       clearInterval(fetchDataTimer)
//       data = fetchedData
//       console.log('success', 'data', data)
//     } else {
//       retries++
//       if (retries >= 5) {
//         clearInterval(fetchDataTimer)
//         console.log('failed')
//       }
//     }
//   }
//   fetchDataTimer = setInterval(fetchData, 1000)
// }
