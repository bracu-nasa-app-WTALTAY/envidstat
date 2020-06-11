import prediction_data from './prediction_data'

export default {
  columns: [
    {
      label: "Country",
      field: "Country",
      sort: "asc",
      width: 150
    },
    {
      label: "Wind",
      field: "WND",
      sort: "asc",
      width: 270
    },
    {
      label: "Temperature",
      field: "TEMP",
      sort: "asc",
      width: 200
    },
    {
      label: "Threat Level",
      field: "THREAT_LEVEL",
      sort: "asc",
      width: 100
    }
  ],
  rows: prediction_data
};
