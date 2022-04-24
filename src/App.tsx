import "./styles.css";
import { iOptions } from './app.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

export default function App() {

  const {
    register,
    formState: { errors },
    reset,
    setValue,
    handleSubmit } = useForm<iOptions>({
      mode: 'onBlur',
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


  const onSubmit: SubmitHandler<iOptions> = (data) => {
    console.log(data)
    reset()
  }

  // extention below helped me to  use a CORS proxy to avoid “No Access-Control-Allow-Origin header” problems 
  // https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc/related
  useEffect(() => {
    fetch(`https://fevladimir.blob.core.windows.net/vladimir/assets/options.json`)
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, [])

  const change = () => setData({ ...data, darkMode: !data.darkMode })

  const change1 = () => setData({ ...data, dismissable: !data.dismissable })



  return (
    <div className="App">
      <h1>Cross Masters' Forms App</h1>

      <button
        className="btn"
        onClick={(e) => {
          setValue('dataLayer', data.dataLayer)
          setValue('darkMode', e.target.checked ? true : false)
          setValue('primaryColor', data.primaryColor)
          setValue('borderRadius', data.borderRadius)
          setValue('dismissable', e.target.checked ? true : false)
          setValue('dismissType', data.dismissType)
          setValue('expiration', data.expiration)
          setValue('closeType', data.closeType)
        }}
      >
        Fill data
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          {...register("dataLayer",
            { required: false })}
          placeholder="Data Layer object name" />

        <label className="container">DarkMode
          <input
            {...register("darkMode",
              { required: false })}
            type="checkbox"
            checked={data.darkMode === undefined ? false : data.darkMode}
            onClick={change} />
          <span className="checkmark"></span>
        </label>


        <label htmlFor="color" className="container" >Primary Color</label>
        <input id="color" name="color" className="color" type="color"
          {...register("primaryColor",
            { required: true }
          )} />


        <input
          {...register("borderRadius",
            { required: 'Basic border radius for elements with rounded corners.' })}
          type="number"
          placeholder="borderRadius" />
        {errors?.dismissType && (
          <div >{errors.dismissType.message}</div>
        )}

        <label className="container">Dismissable
          <input
            {...register("dismissable",
              { required: true })}
            type="checkbox"
            onClick={change1}
            checked={data.dismissable} />
          <span className="checkmark"></span>
        </label>

        <select
          {...register("dismissType",
            { required: 'dismissType is require field! Type of action to dismiss consentbar.' })}>
          <option value="">dismissType</option>
          <option value="cross">cross</option>
          <option value="cross-faint">cross-faint</option>
          <option value="text">text</option>
        </select>
        {errors?.dismissType && (
          <div >{errors.dismissType.message}</div>
        )}

        <input
          {...register("expiration",
            { required: 'Expiration is require field! Basic border radius for elements with rounded corners.' })}
          placeholder="Expiration" />
        {errors?.expiration && (
          <div >{errors.expiration.message}</div>
        )}

        <select
          {...register("closeType",
            { required: 'closeType is require field! Type of the closing action for Precen.' })}>
          <option value="">closeType</option>
          <option value="cross">cross</option>
          <option value="tab">tab</option>
        </select>
        {errors?.closeType && (
          <div >{errors.closeType.message}</div>
        )}


        <input type="submit" value="Submit" />


      </form>
      <button
        className="btn"
        onClick={() => reset()} >Reset</button>
    </div>
  );
}














