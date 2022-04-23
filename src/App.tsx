import "./styles.css";
import { iOptions } from './app.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import {useEffect, useState} from 'react'

export default function App() {

  const {
    register,
    // formState: { errors },
    reset,
    setValue,
    handleSubmit } = useForm<iOptions>({
      mode: 'onBlur',
      defaultValues: {
        // darkMode: true,
      }
    });
  const [data, setData] = useState({
    "dataLayer": "",
    "darkMode": false,
    "primaryColor": "",
    "borderRadius": 0,
    "dismissable": false,
    "dismissType": "",
    "expiration": 0,
    "closeType": ""
  });
  // const [fetchData, setFetchData] = useState({
  //   "dataLayer": "dataLayer",
  //   "darkMode": false,
  //   "primaryColor": "#f98305",
  //   "borderRadius": 6,
  //   "dismissable": false,
  //   "dismissType": "text",
  //   "expiration": 365,
  //   "closeType": "cross"
  // });

  console.log(data)

  const onSubmit: SubmitHandler<iOptions> = (data) => {
    console.log(setData(data))
    reset()
  }

// extention below helped me to  use a CORS proxy to avoid “No Access-Control-Allow-Origin header” problems
// https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc/related
  useEffect(()=>{
    fetch(`https://fevladimir.blob.core.windows.net/vladimir/assets/options.json`)
      .then(res=>res.json())
      .then(data=>{
        setData(data)
        // console.log(data)
      })
  },[])
  // console.log(fetchData)

  const change = () =>{
  }

//-----------------------------------------------------------------------------------------------
  return (
    <div className="App">
      <h1>React Hook Forms</h1>

      <button
        onClick={() => {
          setValue('dataLayer', data.dataLayer)
          setValue('darkMode', data.darkMode)
          setValue('primaryColor', data.primaryColor)
          setValue('borderRadius', data.borderRadius)
          setValue('dismissable', data.dismissable)
          setValue('dismissType', data.dismissType)
          setValue('expiration', data.expiration)
          setValue('closeType', data.closeType)
        }}
      >
        Fill data
      </button>
      <button onClick={() => reset()} >clear data</button>

      <form onSubmit={handleSubmit(onSubmit)}>



        <input {...register("dataLayer",
          { required: false })}
          placeholder="Data Layer object name" />

        {/* <input {...register("dataLayer",
          { required: false })}
        type="checkbox" name="vehicle1" value="Bike" /> */}

        <div>
          <h3>DarkMode</h3>
          <input {...register("darkMode",
          { required: false })}
        type="checkbox" name="vehicle1"  onClick={change} />
        </div>


        <input {...register("primaryColor",
        )}
          placeholder="Primary action color. Used for buttons and links." />

        <input {...register("borderRadius",
          { required: false })}
          type="number"
          placeholder="Basic border radius for elements with rounded corners." />

        {/* <input {...register("dismissable",
          { required: false })}
          placeholder="If the consentbar is dismissable without consent actions" /> */}
        <div>
          <h3>dismissable</h3>
          <input {...register("dismissable",
          { required: false })}
        type="checkbox" name="vehicle1"   checked />
        </div>

{/* <div>
          <h3>dismissable</h3>
          <label {...register("dismissable",
            { required: false })}
            className="switch">
            <input type="checkbox"  />
            <span className="slider round"></span>
          </label>
        </div> */}

        <select {...register("dismissType")}>
          <option value="">'cross' | 'cross-faint' | 'text'</option>
          <option value="cross">cross</option>
          <option value="cross-faint">cross-faint</option>
          <option value="text">text</option>
        </select>

        <input {...register("expiration",
          { required: false })}
          placeholder="Basic border radius for elements with rounded corners." />

        <select {...register("closeType")}>
          <option value="">'cross' | 'tab'</option>
          <option value="cross">cross</option>
          <option value="tab">tab</option>
        </select>

        <input type="submit" value="Submit" />
        {/* <p>{data}</p> */}
        
      </form>
    </div>
  );
}
