import JWJWSearchBox from './components/JWJWSearchBox';
import './App.css';
import axios, { AxiosInstance } from 'axios';

const Http:AxiosInstance = axios.create({
  baseURL : "https://piyou.com",
  timeout : 100000,
  headers : {'Content-Type' : 'application/json'},
  withCredentials : true,
});


function App() {
  return (
    <>
      <JWJWSearchBox baseApi={Http} getFlag={true} url={'/test'} result={(data: unknown) => console.log(data)}/>      
    </>
  )
}

export default App
